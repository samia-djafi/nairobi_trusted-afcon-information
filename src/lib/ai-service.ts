import { getLocalizedKnowledgeBase, AFCON_KNOWLEDGE_BASE } from './knowledge-base';
import { AFCONInfoItem, Category, TokenUsage, SourceInfo, Language } from '@/types';

// Rate Limiter Memory Store
interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

/**
 * Sliding window rate limiter
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 15,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier) || { timestamps: [] };

  // Filter out timestamps outside current window
  const validTimestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    const oldest = validTimestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return {
      allowed: false,
      remaining: 0,
      resetMs,
    };
  }

  validTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: validTimestamps });

  return {
    allowed: true,
    remaining: maxRequests - validTimestamps.length,
    resetMs: windowMs,
  };
}

/**
 * Sanitizes user input to prevent prompt injections and script cross-site execution
 */
export function sanitizeUserInput(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  let clean = raw
    // Strip HTML/script tags
    .replace(/<[^>]*>?/gm, '')
    // Filter adversarial prompt-injection keywords
    .replace(/(ignore (all )?previous instructions|disregard previous|system prompt override|<\|im_start\|>|<\|im_end\|>)/gi, '[REDACTED]')
    // Normalize excessive whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Enforce reasonable length limit for civic questions
  if (clean.length > 1000) {
    clean = clean.substring(0, 1000);
  }

  return clean;
}

/**
 * Rough token estimation (standard rule of thumb: ~4 characters per token)
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.trim().length / 3.8);
}

export interface RetrievedContext {
  primaryMatch: AFCONInfoItem | null;
  secondaryMatches: AFCONInfoItem[];
  contextPrompt: string;
}

/**
 * Retrieves accredited civic grounding context from the official AFCON knowledge base,
 * localized in the user's selected language.
 */
export function retrieveCivicContext(
  query: string,
  categoryScope?: Category | 'all',
  lang: Language = 'en'
): RetrievedContext {
  const clean = query.toLowerCase().trim();
  const pool = getLocalizedKnowledgeBase(lang).filter((item) =>
    !categoryScope || categoryScope === 'all' ? true : item.category === categoryScope
  );

  const words = clean.split(/\s+/).filter((w) => w.length > 2);

  let primaryMatch: AFCONInfoItem | null = null;
  let highestScore = 0;
  const scoredItems: Array<{ item: AFCONInfoItem; score: number }> = [];

  for (const item of pool) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const summaryLower = item.summary.toLowerCase();
    const tags = item.tags.map((t) => t.toLowerCase());

    if (titleLower.includes(clean)) score += 25;
    if (summaryLower.includes(clean)) score += 12;

    for (const w of words) {
      if (titleLower.includes(w)) score += 6;
      if (tags.some((t) => t.includes(w))) score += 4;
      if (summaryLower.includes(w)) score += 2;
    }

    if (score > 0) {
      scoredItems.push({ item, score });
    }

    if (score > highestScore) {
      highestScore = score;
      primaryMatch = item;
    }
  }

  scoredItems.sort((a, b) => b.score - a.score);
  const secondary = scoredItems.slice(1, 3).map((s) => s.item);

  // Fallback to top item if general inquiry
  if (!primaryMatch && pool.length > 0) {
    primaryMatch = pool[0];
  }

  const contextText = primaryMatch
    ? `Accredited Source: ${primaryMatch.source.institution}
Published: ${primaryMatch.source.publishedDate}, Verified: ${primaryMatch.source.lastVerifiedDate}
Official Reference: ${primaryMatch.source.officialDocReference || 'Public Gazette'}
Official Summary: ${primaryMatch.summary}
Full Answer: ${primaryMatch.fullAnswer}`
    : 'General AFCON 2027 Nairobi Civic Information';

  return {
    primaryMatch,
    secondaryMatches: secondary,
    contextPrompt: contextText,
  };
}

export function getSystemPrompt(lang: Language = 'en'): string {
  if (lang === 'sw') {
    return `Wewe ni Msaidizi Rasmi wa Akili Bandia ya Kiraia kwa ajili ya AFCON 2027 jijini Nairobi, uliyeundwa kutoa majibu yenye mamlaka, yaliyothibitishwa, na kwa lugha nyepesi ya Kiswahili.

Maagizo Makuu:
1. Jibu kwa ufasaha, uwazi, na mamlaka kuhusu miundombinu ya Kenya, njia za usafiri wa mechi, sheria za viwanja, na miongozo ya dharura.
2. Thibitisha kila jibu kutoka magazeti rasmi ya Kenya (KeNHA, Jeshi la Polisi, CAF, Wizara ya Michezo).
3. Taja taasisi inayohusika, tarehe ya kuchapishwa, na hadhi ya uhakiki.
4. Toa nambari za simu za dharura pale inapofaa (999/112 au Msalaba Mwekundu 1199).
5. Toa majibu yote kwa lugha fasaha ya Kiswahili.`;
  }

  if (lang === 'fr') {
    return `Vous êtes l'Assistant Officiel d'Intelligence Civique de la CAN 2027 à Nairobi, conçu pour fournir des conseils fiables, vérifiés et en français clair.

Directives Fondamentales :
1. Répondez avec précision et autorité sur les infrastructures kényanes, les transports vers les stades, les règlements des stades et les consignes d'urgence.
2. Basez chaque réponse sur les journaux officiels et avis des autorités kényanes (KeNHA, Police Nationale, CAF, Ministère des Sports).
3. Mentionnez l'institution émettrice, la date de publication et le statut de vérification.
4. Indiquez les numéros d'urgence utiles (999/112 ou Croix-Rouge 1199).
5. Rédigez l'ensemble de la réponse en français soigné et accessible.`;
  }

  return `You are the official Nairobi AFCON 2027 Civic Intelligence Assistant, built to deliver authoritative, verified, and plain-language civic guidance.

Core Directives:
1. Speak with precision, clarity, and authority on Kenyan public infrastructure, match transit corridors, stadium entry rules, and emergency guidelines.
2. Ground every answer in accredited Kenyan public authority gazettes (KeNHA, National Police Service, CAF, Ministry of Sports).
3. Mention the responsible institution, publication date, and verification status.
4. Keep the answer easily readable, avoiding bureaucratic jargon while preserving factual accuracy.
5. Provide actionable next steps or emergency hotline numbers when appropriate (e.g. 999/112 or Kenya Red Cross 1199).`;
}

export const SYSTEM_PROMPT = getSystemPrompt('en');
