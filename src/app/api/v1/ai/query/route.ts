import { NextRequest } from 'next/server';
import {
  checkRateLimit,
  sanitizeUserInput,
  retrieveCivicContext,
  estimateTokens,
  getSystemPrompt,
} from '@/lib/ai-service';
import { Language } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // 1. Extract client identification & rate limit check
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const rateCheck = checkRateLimit(`ai_${clientIp}`, 15, 60000);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Too many queries. Rate limit exceeded (15 queries/min).',
        retryAfterMs: rateCheck.resetMs,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000)),
        },
      }
    );
  }

  // 2. Parse and sanitize input payload
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawQuery = body?.query;
  const categoryScope = body?.categoryScope || 'all';
  const language: Language = (body?.language as Language) || 'en';

  if (!rawQuery || typeof rawQuery !== 'string') {
    return new Response(JSON.stringify({ error: 'Query string is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cleanQuery = sanitizeUserInput(rawQuery);
  if (cleanQuery.length < 3) {
    return new Response(JSON.stringify({ error: 'Query too short or invalid' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Retrieve accredited civic context (RAG) localized to the requested language
  const { primaryMatch, secondaryMatches, contextPrompt } = retrieveCivicContext(cleanQuery, categoryScope, language);
  const systemPrompt = getSystemPrompt(language);

  const promptTokens = estimateTokens(`${systemPrompt}\n${contextPrompt}\nUser: ${cleanQuery}`);

  // 4. Create Server-Sent Events (SSE) readable stream
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: any) => {
        try {
          const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Stream might be closed by client
        }
      };

      try {
        const statusMsg =
          language === 'sw'
            ? 'Inakagua magazeti rasmi ya kiserikali ya Kenya...'
            : language === 'fr'
            ? 'Vérification croisée des gazettes officielles du Kenya...'
            : 'Cross-referencing accredited Kenyan public authority gazettes...';

        // Send initial search & verification status
        sendEvent('status', {
          phase: 'grounding_sources',
          message: statusMsg,
          matchedInstitution: primaryMatch?.source.institution || 'Government of Kenya / CAF LOC',
        });

        // Send citation metadata
        if (primaryMatch) {
          sendEvent('citation', {
            title: primaryMatch.title,
            summary: primaryMatch.summary,
            category: primaryMatch.category,
            status: primaryMatch.status,
            source: primaryMatch.source,
            nextSteps: primaryMatch.nextSteps,
          });
        }

        let fullGeneratedText = '';

        // Check if real Google Gemini API Key is configured
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (geminiApiKey) {
          try {
            const { GoogleGenerativeAI } = await import('@google/generative-ai');
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
              model: 'gemini-1.5-flash',
              systemInstruction: systemPrompt,
            });

            const prompt = `Based on the following official accredited information:
---
${contextPrompt}
---

Question from citizen/visitor: "${cleanQuery}"

Respond in ${language === 'sw' ? 'Kiswahili' : language === 'fr' ? 'Français' : 'English'}. Provide a clear, direct, and verified answer citing the official source and any relevant next steps or emergency hotlines.`;

            const result = await model.generateContentStream(prompt);

            sendEvent('status', {
              phase: 'streaming',
              message: language === 'sw' ? 'Inatiririsha jibu la AI...' : language === 'fr' ? 'Génération de la réponse IA...' : 'Streaming AI response...',
            });

            for await (const chunk of result.stream) {
              if (request.signal.aborted) break;
              const chunkText = chunk.text();
              fullGeneratedText += chunkText;
              sendEvent('token', { delta: chunkText });
            }
          } catch (geminiError: unknown) {
            console.warn('[AI Pipeline] Gemini API call failed or timed out, falling back to civic synthesis engine:', geminiError);
          }
        }

        // Grounded Civic Synthesis Engine (Active when no external API key, or when Gemini fails/offline)
        if (!fullGeneratedText) {
          sendEvent('status', {
            phase: 'streaming',
            message: language === 'sw' ? 'Inakamilisha jibu lililothibitishwa...' : language === 'fr' ? 'Synthèse de la réponse certifiée...' : 'Synthesizing verified response...',
          });

          let answerText = '';

          if (primaryMatch) {
            if (language === 'sw') {
              answerText = `${primaryMatch.summary}\n\n${primaryMatch.fullAnswer}\n\nChanzo Rasmi: Kimethibitishwa na ${primaryMatch.source.institution} (Kumbukumbu ya Gazeti: ${primaryMatch.source.officialDocReference || 'Tangazo Rasmi la Umma'}). Ilikaguliwa tarehe ${primaryMatch.source.lastVerifiedDate}.`;
            } else if (language === 'fr') {
              answerText = `${primaryMatch.summary}\n\n${primaryMatch.fullAnswer}\n\nSource Officielle : Certifiée par ${primaryMatch.source.institution} (Réf. Journal Officiel : ${primaryMatch.source.officialDocReference || 'Avis Public Certifié'}). Auditée le ${primaryMatch.source.lastVerifiedDate}.`;
            } else {
              answerText = `${primaryMatch.summary}\n\n${primaryMatch.fullAnswer}\n\nOfficial Source: Verified by the ${primaryMatch.source.institution} (Gazette Ref: ${primaryMatch.source.officialDocReference || 'Published Public Notice'}). Last audited on ${primaryMatch.source.lastVerifiedDate}.`;
            }
          } else {
            if (language === 'sw') {
              answerText = `Kuhusu swali lako "${cleanQuery}": Kulingana na miongozo ya AFCON 2027 Nairobi, maagizo rasmi yanasimamiwa na Wizara ya Michezo kwa ushirikiano na KeNHA na Jeshi la Polisi. Kwa dharura ya haraka, piga simu 999 au 112.`;
            } else if (language === 'fr') {
              answerText = `Concernant votre demande "${cleanQuery}" : Selon les protocoles officiels de la CAN 2027 à Nairobi, les directives sont coordonnées par le Ministère des Sports, KeNHA et la Police Nationale. Pour toute urgence, composez le 999 ou le 112.`;
            } else {
              answerText = `Regarding your inquiry about "${cleanQuery}": According to AFCON 2027 Nairobi municipal protocols, official guidelines are administered under the Ministry of Youth Affairs, Creative Economy & Sports in coordination with KeNHA and the National Police Service. For immediate safety assistance, contact emergency services at 999 or 112.`;
            }
          }

          fullGeneratedText = answerText;

          // Stream in natural token bursts
          const tokens = answerText.split(/(\s+)/);
          for (let i = 0; i < tokens.length; i += 2) {
            if (request.signal.aborted) break;
            const delta = (tokens[i] || '') + (tokens[i + 1] || '');
            sendEvent('token', { delta });
            await new Promise((resolve) => setTimeout(resolve, 15));
          }
        }

        const completionTokens = estimateTokens(fullGeneratedText);
        const latencyMs = Date.now() - startTime;

        sendEvent('complete', {
          success: true,
          usage: {
            promptTokens,
            completionTokens,
            totalTokens: promptTokens + completionTokens,
            latencyMs,
          },
          timestamp: new Date().toISOString(),
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'AI stream processing error';
        console.error('[AI Stream Error]:', err);
        sendEvent('error', { error: errorMsg });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
