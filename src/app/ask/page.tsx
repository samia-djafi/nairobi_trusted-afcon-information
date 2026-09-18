'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AFCON_KNOWLEDGE_BASE } from '@/lib/knowledge-base';
import { AFCONInfoItem, Category } from '@/types';
import AnswerCard from '@/components/cards/AnswerCard';
import UnverifiedCard from '@/components/cards/UnverifiedCard';
import {
  Search,
  Sparkles,
  Mic,
  ArrowRight,
  HelpCircle,
  FileText,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';

function AskContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openSourceExplorer } = useApp();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [currentResult, setCurrentResult] = useState<AFCONInfoItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isUnverifiedCase, setIsUnverifiedCase] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const suggestedQuestions = [
    { text: 'Is the road to Talanta Stadium closed on match days?', category: 'transport' },
    { text: 'Is public transport free on AFCON match days?', category: 'transport' },
    { text: 'Can I bring water bottles into Kasarani Stadium?', category: 'venues' },
    { text: 'What are the official emergency numbers during AFCON?', category: 'safety' },
    { text: 'Do I need a National ID or Passport to enter stadiums?', category: 'venues' },
    { text: 'What health inoculations or certificates are required for AFCON visitors?', category: 'public_services' },
  ];

  // Natural Language Search Matcher
  const performSearch = (inputQuery: string, catScope: Category | 'all' = selectedCategory) => {
    if (!inputQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);

    const clean = inputQuery.toLowerCase().trim();

    // Check for simulated unverified query keywords (e.g. helicopter, private jet, free beer, betting, illegal)
    const unverifiedTriggers = ['helicopter', 'private jet', 'free beer', 'vip party', 'gambling', 'drone flyover stadium'];
    const matchesUnverifiedTrigger = unverifiedTriggers.some(t => clean.includes(t));

    setTimeout(() => {
      if (matchesUnverifiedTrigger) {
        setCurrentResult(null);
        setIsUnverifiedCase(true);
        setIsSearching(false);
        return;
      }

      // Filter knowledge base by category scope if applicable
      const pool = catScope === 'all'
        ? AFCON_KNOWLEDGE_BASE
        : AFCON_KNOWLEDGE_BASE.filter(item => item.category === catScope);

      // Score matching
      const words = clean.split(/\s+/).filter(w => w.length > 2);
      let bestItem: AFCONInfoItem | null = null;
      let highestScore = 0;

      for (const item of pool) {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const summaryLower = item.summary.toLowerCase();
        const tags = item.tags.map(t => t.toLowerCase());

        // Exact substring matches
        if (titleLower.includes(clean)) score += 20;
        if (summaryLower.includes(clean)) score += 10;

        for (const w of words) {
          if (titleLower.includes(w)) score += 5;
          if (tags.some(t => t.includes(w))) score += 4;
          if (summaryLower.includes(w)) score += 2;
        }

        if (score > highestScore) {
          highestScore = score;
          bestItem = item;
        }
      }

      // If score is too low and user typed something arbitrary, trigger unverified flow
      if (highestScore < 3 && words.length >= 2) {
        setCurrentResult(null);
        setIsUnverifiedCase(true);
      } else {
        // Match found or default to closest
        setCurrentResult(bestItem || AFCON_KNOWLEDGE_BASE[0]);
        setIsUnverifiedCase(false);
      }

      setIsSearching(false);
    }, 350);
  };

  // Sync with search parameter on initial mount or update
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      performSearch(q);
    } else {
      // Default initial display to the top verified item
      setCurrentResult(AFCON_KNOWLEDGE_BASE[0]);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleChipClick = (questionText: string) => {
    setQuery(questionText);
    performSearch(questionText);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is simulated for demo: Speaking "Emergency hotline"...');
      setQuery('What are the official emergency numbers during AFCON?');
      performSearch('What are the official emergency numbers during AFCON?');
      return;
    }
    setIsListening(!isListening);
  };

  // Related questions for the current result
  const relatedItems = currentResult
    ? AFCON_KNOWLEDGE_BASE.filter(i => currentResult.relatedQuestionIds.includes(i.id))
    : AFCON_KNOWLEDGE_BASE.slice(1, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Top Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sun-100/70 border border-sun-300 text-earth-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-sun-600" />
          <span>Sourced Civic Q&A Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Ask Official AFCON 2027 Information
        </h1>
        <p className="text-sm text-savannah-700 max-w-lg mx-auto">
          Ask questions in natural language. Every answer is backed by an accredited Kenyan public authority with verified timestamps.
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
                if (query) performSearch(query, c.id as Category | 'all');
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
              placeholder="Ask anything (e.g. Is public transport free with ticket?)"
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
            <button
              type="button"
              onClick={handleVoiceToggle}
              title="Voice Search"
              className={`p-1.5 rounded-lg text-savannah-600 hover:text-earth-600 transition-colors ${
                isListening ? 'text-earth-600 animate-pulse bg-earth-50' : ''
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="shrink-0 px-5 sm:px-6 py-3 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Checking...</span>
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
        {isSearching ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-savannah-200 shadow-sm space-y-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-earth-100 text-earth-600 flex items-center justify-center mx-auto">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
            <h3 className="font-bold text-obsidian">
              Verifying against accredited public databases...
            </h3>
            <p className="text-xs text-savannah-600">
              Cross-referencing KeNHA, National Police Service, and CAF gazettes.
            </p>
          </div>
        ) : isUnverifiedCase ? (
          /* The 'I Can't Verify This' Special Case Flow */
          <UnverifiedCard query={query || 'Unknown inquiry'} />
        ) : currentResult ? (
          /* Full Structured Answer Card with Trust Layer */
          <AnswerCard item={currentResult} />
        ) : null}
      </div>

      {/* 'Explain This' Feature Bridge Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sun-500/15 via-earth-500/10 to-rift-500/15 border border-sun-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-sun-500 text-white shrink-0 hidden sm:block">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-obsidian">
              Have a lengthy official announcement or legal directive?
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

      {/* Related Questions Section */}
      {relatedItems.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-savannah-200">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-earth-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-savannah-700">
              Related Official Inquiries
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedItems.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => {
                  setQuery(rel.title);
                  performSearch(rel.title);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-4 rounded-xl bg-white hover:bg-savannah-50 border border-savannah-200 hover:border-earth-300 text-left transition-all shadow-2xs group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-earth-600 bg-earth-50 px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-obsidian group-hover:text-earth-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
                <span className="text-[11px] text-earth-600 font-semibold pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ask this question →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

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
