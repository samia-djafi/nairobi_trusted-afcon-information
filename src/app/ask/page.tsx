'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AFCON_KNOWLEDGE_BASE } from '@/lib/knowledge-base';
import { AFCONInfoItem, Category, TokenUsage } from '@/types';
import AnswerCard from '@/components/cards/AnswerCard';
import { saveChatMessage } from '@/lib/db';
import {
  Search,
  Sparkles,
  Mic,
  ArrowRight,
  HelpCircle,
  FileText,
  RefreshCw,
  Building2,
  ExternalLink,
  PhoneCall,
  Zap,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Share2,
  Check,
} from 'lucide-react';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { saveItem, isItemSaved, removeItem } from '@/lib/storage';

function AskContent() {
  const searchParams = useSearchParams();
  const { openSourceExplorer, refreshSavedCount } = useApp();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  // AI Streaming State
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingStatus, setStreamingStatus] = useState<string>('');
  const [streamedAnswer, setStreamedAnswer] = useState<string>('');
  const [citationData, setCitationData] = useState<any | null>(null);
  const [tokenMetrics, setTokenMetrics] = useState<TokenUsage | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);

  // Fallback initial answer
  const [initialItem, setInitialItem] = useState<AFCONInfoItem | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const suggestedQuestions = [
    { text: 'Is the road to Talanta Stadium closed on match days?', category: 'transport' },
    { text: 'Is public transport free on AFCON match days?', category: 'transport' },
    { text: 'Can I bring water bottles into Kasarani Stadium?', category: 'venues' },
    { text: 'What are the official emergency numbers during AFCON?', category: 'safety' },
    { text: 'Do I need a National ID or Passport to enter stadiums?', category: 'venues' },
    { text: 'What health inoculations or certificates are required for AFCON visitors?', category: 'public_services' },
  ];

  // Execute real streaming AI Query via Server-Sent Events (SSE)
  const executeAIStreamQuery = async (inputQuery: string, catScope: Category | 'all' = selectedCategory) => {
    if (!inputQuery.trim()) return;

    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsStreaming(true);
    setStreamingStatus('Contacting accredited civic intelligence engine...');
    setStreamedAnswer('');
    setCitationData(null);
    setTokenMetrics(null);
    setStreamError(null);
    setInitialItem(null);

    try {
      const response = await fetch('/api/v1/ai/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          query: inputQuery.trim(),
          categoryScope: catScope,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded (15 queries/min). Please wait a moment before asking again.');
        }
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('ReadableStream not supported by browser.');

      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedAnswer = '';
      let capturedCitation: any = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const block of lines) {
          if (!block.trim()) continue;

          let eventType = 'message';
          let eventData = '';

          const blockLines = block.split('\n');
          for (const line of blockLines) {
            if (line.startsWith('event: ')) {
              eventType = line.substring(7).trim();
            } else if (line.startsWith('data: ')) {
              eventData = line.substring(6).trim();
            }
          }

          if (!eventData) continue;

          try {
            const parsed = JSON.parse(eventData);

            if (eventType === 'status') {
              setStreamingStatus(parsed.message || 'Processing query...');
            } else if (eventType === 'citation') {
              capturedCitation = parsed;
              setCitationData(parsed);
            } else if (eventType === 'token') {
              if (parsed.delta) {
                accumulatedAnswer += parsed.delta;
                setStreamedAnswer((prev) => prev + parsed.delta);
              }
            } else if (eventType === 'complete') {
              if (parsed.usage) {
                setTokenMetrics(parsed.usage);
              }
              setStreamingStatus('');
            } else if (eventType === 'error') {
              setStreamError(parsed.error || 'Stream error occurred');
            }
          } catch {
            // non-JSON SSE chunk
          }
        }
      }

      // Persist completed conversation to local IndexedDB chat history
      if (accumulatedAnswer) {
        saveChatMessage({
          id: `chat_${Date.now()}`,
          sessionId: 'afcon_session_v1',
          query: inputQuery,
          answer: accumulatedAnswer,
          category: catScope === 'all' ? 'transport' : catScope,
          status: capturedCitation?.status || 'verified',
          timestamp: new Date().toISOString(),
          sources: capturedCitation?.source ? [capturedCitation.source] : undefined,
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('AI stream aborted by user');
      } else {
        const msg = err instanceof Error ? err.message : 'AI Query failure';
        setStreamError(msg);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  // Sync with search parameter on initial mount
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      executeAIStreamQuery(q);
    } else {
      setInitialItem(AFCON_KNOWLEDGE_BASE[0]);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeAIStreamQuery(query);
  };

  const handleChipClick = (questionText: string) => {
    setQuery(questionText);
    executeAIStreamQuery(questionText);
  };

  const handleSaveToggle = () => {
    const title = citationData?.title || query;
    const summary = citationData?.summary || streamedAnswer.substring(0, 150);
    const category = citationData?.category || (selectedCategory === 'all' ? 'transport' : selectedCategory);
    const status = citationData?.status || 'verified';
    const id = `ai_saved_${Date.now()}`;

    if (isSaved) {
      removeItem(id);
      setIsSaved(false);
    } else {
      saveItem({
        id,
        type: 'answer',
        title,
        summary,
        category,
        status,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        link: `/ask?q=${encodeURIComponent(query)}`,
      });
      setIsSaved(true);
    }
    refreshSavedCount();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: query,
          text: streamedAnswer,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${query}\n\n${streamedAnswer}\n\nOfficial AFCON 2027 Nairobi Trust Platform`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Top Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sun-100/70 border border-sun-300 text-earth-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-sun-600" />
          <span>Real-Time Streaming Civic Q&A Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Ask Official AFCON 2027 Information
        </h1>
        <p className="text-sm text-savannah-700 max-w-lg mx-auto">
          Query in natural language. Responses stream in real-time with Server-Sent Events, verified against accredited Kenyan public authority gazettes with token provenance.
        </p>
      </div>

      {/* Search Bar & Category Scope Controls */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-savannah-300 shadow-african-warm space-y-3">
        {/* Category Scope Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-savannah-500 font-semibold uppercase text-[10px] mr-1 hidden sm:inline">
            Scope:
          </span>
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'transport', label: '🚗 Transport' },
            { id: 'venues', label: '🏟️ Venues' },
            { id: 'safety', label: '🛡️ Safety' },
            { id: 'public_services', label: '🏛️ Public Services' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSelectedCategory(c.id as Category | 'all');
                if (query) executeAIStreamQuery(query, c.id as Category | 'all');
              }}
              className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-earth-600 text-white shadow-sm'
                  : 'bg-savannah-100 text-savannah-700 hover:bg-savannah-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-savannah-50 rounded-xl border border-savannah-300 focus-within:border-earth-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-earth-100 transition-all px-3">
            <Search className="w-5 h-5 text-savannah-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g. Is public transport free with match ticket?)"
              className="w-full py-3 px-3 text-sm sm:text-base text-obsidian placeholder-savannah-500 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-savannah-500 hover:text-obsidian px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isStreaming || !query.trim()}
            className="shrink-0 px-5 sm:px-6 py-3 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
          >
            {isStreaming ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Streaming...</span>
              </>
            ) : (
              <>
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Question Chips */}
        <div className="pt-1 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-savannah-500 font-semibold shrink-0">Try:</span>
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleChipClick(sq.text)}
              className="shrink-0 px-3 py-1 rounded-lg bg-savannah-100 hover:bg-savannah-200 border border-savannah-200 text-earth-800 font-medium transition-colors text-left"
            >
              {sq.text}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Output Area */}
      <div className="space-y-6">
        {/* Real Streaming Answer Container */}
        {(isStreaming || streamedAnswer) && (
          <div className="bg-white rounded-2xl border border-savannah-300 shadow-african-warm overflow-hidden transition-all">
            <div className="h-1.5 w-full bg-gradient-to-r from-earth-500 via-sun-500 to-rift-600" />

            <div className="p-6 sm:p-8 space-y-6">
              {/* Header & Verification Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-savannah-200">
                <div className="flex items-center gap-2">
                  <VerificationBadge status={citationData?.status || 'verified'} size="lg" />
                  <span className="text-xs uppercase tracking-wider font-bold text-savannah-600 bg-savannah-100 px-2.5 py-1 rounded-md border border-savannah-200">
                    {(citationData?.category || selectedCategory).replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Token & Latency Metrics */}
                  {tokenMetrics && (
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-savannah-50 border border-savannah-200 text-[11px] font-mono text-savannah-700">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>{tokenMetrics.totalTokens} tokens</span>
                      <span>•</span>
                      <span>{tokenMetrics.latencyMs}ms</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveToggle}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSaved
                        ? 'bg-earth-50 border-earth-300 text-earth-700 shadow-sm'
                        : 'bg-white border-savannah-300 text-savannah-700 hover:bg-savannah-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-earth-600 text-earth-600' : ''}`} />
                    <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-xl border border-savannah-300 bg-white hover:bg-savannah-50 text-savannah-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Streaming Status Indicator */}
              {isStreaming && streamingStatus && (
                <div className="flex items-center gap-2 text-xs font-semibold text-earth-700 animate-pulse bg-earth-50/60 p-2.5 rounded-xl border border-earth-200">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{streamingStatus}</span>
                </div>
              )}

              {/* Question Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-obsidian tracking-tight leading-tight">
                {citationData?.title || query}
              </h2>

              {/* Streaming Text Body */}
              <div className="p-4 sm:p-5 rounded-xl bg-savannah-50/80 border border-savannah-200 text-obsidian text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {streamedAnswer}
                {isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-earth-600 animate-pulse align-middle" />
                )}
              </div>

              {/* Sourced Institution Strip */}
              {citationData?.source && (
                <div className="p-4 rounded-xl border border-savannah-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="p-2 rounded-lg bg-earth-50 text-earth-600 border border-earth-200 shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-obsidian">
                        <span>Source:</span>
                        <span className="text-earth-700">{citationData.source.institution}</span>
                      </div>
                      <div className="text-savannah-600 mt-0.5 flex flex-wrap items-center gap-x-2">
                        <span>Published: <strong>{citationData.source.publishedDate}</strong></span>
                        <span>•</span>
                        <span>Verified: <strong className="text-rift-700">{citationData.source.lastVerifiedDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (citationData) {
                        openSourceExplorer({
                          id: `src_${Date.now()}`,
                          title: citationData.title || query,
                          category: citationData.category || 'transport',
                          summary: citationData.summary || '',
                          fullAnswer: streamedAnswer,
                          status: citationData.status || 'verified',
                          source: citationData.source,
                          nextSteps: citationData.nextSteps || [],
                          tags: [],
                          relatedQuestionIds: [],
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-savannah-100 hover:bg-savannah-200 border border-savannah-300 text-obsidian text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95"
                  >
                    <span>View Audit Trail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Next Steps Action Buttons */}
              {citationData?.nextSteps && citationData.nextSteps.length > 0 && (
                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-savannah-700 block">
                    Recommended Next Steps
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {citationData.nextSteps.map((action: any, idx: number) => {
                      const isExternal = action.target?.startsWith('http');
                      const isCall = action.target?.startsWith('tel:');
                      return (
                        <div key={idx}>
                          {isCall ? (
                            <a
                              href={action.target}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>{action.label}</span>
                            </a>
                          ) : isExternal ? (
                            <a
                              href={action.target}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-savannah-100 border border-savannah-300 text-obsidian text-xs font-bold shadow-sm transition-all"
                            >
                              <span>{action.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-savannah-600" />
                            </a>
                          ) : (
                            <Link
                              href={action.target}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105"
                            >
                              <span>{action.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error State */}
        {streamError && (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Query Streaming Interrupted:</strong>
              <span>{streamError}</span>
            </div>
          </div>
        )}

        {/* Initial Seed Answer Card if no query yet */}
        {!isStreaming && !streamedAnswer && initialItem && (
          <AnswerCard item={initialItem} />
        )}
      </div>

      {/* 'Explain This' Feature Bridge Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sun-500/15 via-earth-500/10 to-rift-500/15 border border-sun-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-sun-500 text-white shrink-0 hidden sm:block">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-obsidian">
              Have a lengthy official announcement or legal gazette notice?
            </h3>
            <p className="text-xs text-savannah-700 mt-0.5">
              Paste or select any gazette notice in our &apos;Explain This&apos; simplifier for an instant plain-language breakdown.
            </p>
          </div>
        </div>

        <Link
          href="/explain"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-obsidian text-white hover:bg-earth-900 font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          Open Explain This Tool →
        </Link>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-savannah-600">Loading Ask AI...</div>}>
      <AskContent />
    </Suspense>
  );
}
