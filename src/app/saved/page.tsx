'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedItems, removeItem } from '@/lib/storage';
import { SavedItem } from '@/types';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { useApp } from '@/context/AppContext';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Search,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function SavedPage() {
  const { refreshSavedCount } = useApp();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'answer' | 'explanation'>('all');

  const loadItems = () => {
    setSavedItems(getSavedItems());
  };

  useEffect(() => {
    loadItems();
    const handleUpdate = () => loadItems();
    window.addEventListener('storage-saved-updated', handleUpdate);
    return () => window.removeEventListener('storage-saved-updated', handleUpdate);
  }, []);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(id);
    loadItems();
    refreshSavedCount();
  };

  const filteredItems = savedItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-savannah-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-earth-50 border border-earth-200 text-earth-800 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-earth-600 fill-earth-600" />
            <span>Device Storage • Works Offline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
            Saved Information & Answers
          </h1>
          <p className="text-sm text-savannah-700 mt-1">
            Access your bookmarked transit routes, stadium rules, and emergency guidelines anytime without re-searching.
          </p>
        </div>

        {savedItems.length > 0 && (
          <span className="text-xs text-savannah-600 font-bold bg-savannah-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
            {savedItems.length} Bookmarked Item{savedItems.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Filter Tabs */}
      {savedItems.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
              activeFilter === 'all'
                ? 'bg-obsidian text-white'
                : 'bg-white border border-savannah-300 text-savannah-700 hover:bg-savannah-100'
            }`}
          >
            All Saved ({savedItems.length})
          </button>
          <button
            onClick={() => setActiveFilter('answer')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
              activeFilter === 'answer'
                ? 'bg-obsidian text-white'
                : 'bg-white border border-savannah-300 text-savannah-700 hover:bg-savannah-100'
            }`}
          >
            Answers ({savedItems.filter(i => i.type === 'answer').length})
          </button>
          <button
            onClick={() => setActiveFilter('explanation')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
              activeFilter === 'explanation'
                ? 'bg-obsidian text-white'
                : 'bg-white border border-savannah-300 text-savannah-700 hover:bg-savannah-100'
            }`}
          >
            Official Notices ({savedItems.filter(i => i.type === 'explanation').length})
          </button>
        </div>
      )}

      {/* Items List */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-savannah-200 p-6 shadow-sm hover:shadow-african-warm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <VerificationBadge status={item.status} size="sm" />
                  <span className="text-[11px] text-savannah-500 font-mono">
                    Saved on {item.savedAt}
                  </span>
                </div>

                <h3 className="font-bold text-base text-obsidian leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-savannah-700 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-savannah-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => handleRemove(item.id, e)}
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 font-bold text-earth-600 hover:text-earth-700 hover:underline"
                >
                  <span>Re-open full</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border-2 border-dashed border-savannah-300 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-savannah-100 text-savannah-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-obsidian">
            You haven&apos;t saved anything yet.
          </h2>
          <p className="text-xs sm:text-sm text-savannah-700 leading-relaxed">
            Click the &ldquo;Save&rdquo; bookmark button on any verified answer, transport advisory, or explained notice to keep it here for quick offline access.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/ask"
              className="px-5 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-sm transition-transform hover:scale-105"
            >
              Ask a Question
            </Link>
            <Link
              href="/browse"
              className="px-5 py-2.5 rounded-xl bg-savannah-100 hover:bg-savannah-200 border border-savannah-300 text-obsidian text-xs font-bold transition-colors"
            >
              Browse Information
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
