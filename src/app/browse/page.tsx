'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AFCON_KNOWLEDGE_BASE } from '@/lib/knowledge-base';
import { AFCONInfoItem, Category, VerificationStatus } from '@/types';
import InfoCard from '@/components/cards/InfoCard';
import AnswerCard from '@/components/cards/AnswerCard';
import {
  Compass,
  Search,
  Filter,
  ArrowUpDown,
  Car,
  Trophy,
  ShieldAlert,
  Building2,
  Sparkles,
  X,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [activeStatus, setActiveStatus] = useState<VerificationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'relevant' | 'status'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailItem, setSelectedDetailItem] = useState<AFCONInfoItem | null>(null);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...AFCON_KNOWLEDGE_BASE];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Status filter
    if (activeStatus !== 'all') {
      result = result.filter(item => item.status === activeStatus);
    }

    // Search within
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'status') {
      const rank: Record<VerificationStatus, number> = {
        verified: 1,
        recently_updated: 2,
        unverified: 3,
        unverifiable: 4,
      };
      result.sort((a, b) => rank[a.status] - rank[b.status]);
    } else if (sortBy === 'relevant') {
      // alphabetically or by priority
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, activeStatus, sortBy, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Knowledge Base', icon: Compass, count: AFCON_KNOWLEDGE_BASE.length },
    { id: 'transport', label: 'Transport & Mobility', icon: Car, count: AFCON_KNOWLEDGE_BASE.filter(i => i.category === 'transport').length },
    { id: 'venues', label: 'Venue Information', icon: Trophy, count: AFCON_KNOWLEDGE_BASE.filter(i => i.category === 'venues').length },
    { id: 'safety', label: 'Safety & Assistance', icon: ShieldAlert, count: AFCON_KNOWLEDGE_BASE.filter(i => i.category === 'safety').length },
    { id: 'public_services', label: 'Public Services', icon: Building2, count: AFCON_KNOWLEDGE_BASE.filter(i => i.category === 'public_services').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-earth-50 border border-earth-200 text-earth-800 text-xs font-bold">
          <Compass className="w-3.5 h-3.5 text-earth-600" />
          <span>Structured Civic Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Browse Verified AFCON 2027 Information
        </h1>
        <p className="text-sm sm:text-base text-savannah-700 max-w-2xl">
          Explore structured policies, transit advisories, venue rules, and safety notices without needing to formulate an AI search query.
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-savannah-200">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category | 'all')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 transition-all ${
                isSelected
                  ? 'bg-earth-600 text-white shadow-md shadow-earth-600/20 scale-[1.02]'
                  : 'bg-white text-savannah-800 border border-savannah-200 hover:bg-savannah-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
              <span className={`text-[11px] px-2 py-0.2 rounded-full font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-savannah-100 text-savannah-600'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-savannah-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search within Category */}
        <div className="relative w-full md:w-80 flex items-center bg-savannah-50 rounded-xl border border-savannah-300 px-3 py-2">
          <Search className="w-4 h-4 text-savannah-500 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within items..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-obsidian placeholder-savannah-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-savannah-500">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Verification Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
          <span className="text-savannah-500 font-semibold mr-1 shrink-0">Status:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'verified', label: '✅ Verified' },
            { id: 'recently_updated', label: '🕐 Updated' },
            { id: 'unverified', label: '⚠️ Unverified' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStatus(st.id as VerificationStatus | 'all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                activeStatus === st.id
                  ? 'bg-obsidian text-white'
                  : 'bg-savannah-100 text-savannah-700 hover:bg-savannah-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 text-xs">
          <ArrowUpDown className="w-4 h-4 text-savannah-500" />
          <span className="text-savannah-600 font-semibold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'relevant' | 'status')}
            className="bg-savannah-50 border border-savannah-300 rounded-lg px-2.5 py-1.5 font-bold text-obsidian focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="status">Verification Status</option>
            <option value="relevant">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Grid of Information Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <InfoCard
              key={item.id}
              item={item}
              onSelect={(selected) => setSelectedDetailItem(selected)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-savannah-300 space-y-4">
          <div className="w-12 h-12 rounded-full bg-savannah-100 text-savannah-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-obsidian">
            No verified items match this filter criteria.
          </h3>
          <p className="text-xs sm:text-sm text-savannah-600 max-w-md mx-auto">
            Try resetting your status filter, or ask our civic intelligence engine directly to search adjacent notices.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveStatus('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-savannah-100 hover:bg-savannah-200 text-xs font-bold text-obsidian"
            >
              Reset Filters
            </button>
            <Link
              href="/ask"
              className="px-4 py-2 rounded-xl bg-earth-600 hover:bg-earth-700 text-xs font-bold text-white shadow-sm"
            >
              Ask AI Instead →
            </Link>
          </div>
        </div>
      )}

      {/* Answer / Detail Modal (Shared Component with Ask AI Answer Card) */}
      {selectedDetailItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/75 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedDetailItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedDetailItem(null)}
                aria-label="Close dialog"
                className="p-2 rounded-full bg-white/90 shadow hover:bg-white text-obsidian"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AnswerCard item={selectedDetailItem} />
          </div>
        </div>
      )}

    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-savannah-600">Loading Categories...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
