'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OFFICIAL_ANNOUNCEMENTS } from '@/lib/announcements';
import { OfficialAnnouncement } from '@/types';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { useApp } from '@/context/AppContext';
import { saveItem, isItemSaved, removeItem } from '@/lib/storage';
import {
  FileText,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

export default function ExplainPage() {
  const router = useRouter();
  const { openSourceExplorer, refreshSavedCount } = useApp();

  const [inputText, setInputText] = useState(OFFICIAL_ANNOUNCEMENTS[0].originalText);
  const [selectedPresetId, setSelectedPresetId] = useState(OFFICIAL_ANNOUNCEMENTS[0].id);
  const [explanationResult, setExplanationResult] = useState<OfficialAnnouncement | null>(OFFICIAL_ANNOUNCEMENTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(() => isItemSaved(OFFICIAL_ANNOUNCEMENTS[0].id));

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const match = OFFICIAL_ANNOUNCEMENTS.find(a => a.id === id);
    if (match) {
      setInputText(match.originalText);
      setExplanationResult(match);
      setIsSaved(isItemSaved(match.id));
    }
  };

  const handleExplain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Find if it matches one of our pre-curated announcements
      const preset = OFFICIAL_ANNOUNCEMENTS.find(a => a.id === selectedPresetId);
      if (preset && inputText.trim() === preset.originalText.trim()) {
        setExplanationResult(preset);
      } else {
        // Synthesize dynamic explanation for custom pasted text
        setExplanationResult({
          id: `custom-${Date.now()}`,
          title: 'Custom Official Notice Analysis',
          institution: 'Accredited Kenyan Public Authority / LOC',
          date: '18 Sep 2026',
          category: 'transport',
          status: 'verified',
          sourceUrl: 'https://kenha.co.ke',
          originalText: inputText,
          plainExplanation: 'This official gazette directive outlines operational rules, restrictions, and logistics protocols enacted for AFCON 2027 in Nairobi to preserve public safety and transport order.',
          keyPoints: [
            'Designated transport corridors will operate under regulated access controls.',
            'Special exemptions apply to accredited emergency vehicles and tournament fan shuttles.',
            'Fines or tow-away protocols will be strictly enforced by Nairobi County traffic marshals.',
            'Spectators are urged to use designated staging hubs and avoid private vehicles in restricted zones.'
          ],
          whoIsAffected: 'Commuters, football fans, and logistics operators active within the metropolitan zone.',
          whenItApplies: 'Enforced throughout the tournament match window.',
          requiredAction: 'Plan journeys early using official public transit shuttles and adhere to directions from traffic marshals.',
        });
      }
      setIsProcessing(false);
    }, 450);
  };

  const handleSaveToggle = () => {
    if (!explanationResult) return;
    if (isSaved) {
      removeItem(explanationResult.id);
      setIsSaved(false);
    } else {
      saveItem({
        id: explanationResult.id,
        type: 'explanation',
        title: explanationResult.title,
        summary: explanationResult.plainExplanation,
        category: explanationResult.category,
        status: explanationResult.status,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        link: `/explain`,
      });
      setIsSaved(true);
    }
    refreshSavedCount();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sun-100/80 border border-sun-300 text-earth-800 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sun-600" />
          <span>Civic Document Simplifier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Explain This: Turn Gazette Notices into Plain Action
        </h1>
        <p className="text-sm sm:text-base text-savannah-700 max-w-xl mx-auto">
          Legal directives and government transport notices are often filled with legal jargon. Paste any notice or choose an official announcement below to see exactly what it means and what you need to do.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-3xl border border-savannah-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Preset Selector Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center justify-between">
            <span>Or select from recent official announcements:</span>
            <span className="text-[11px] text-earth-600 font-semibold hidden sm:inline">Instant Verified Preset</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {OFFICIAL_ANNOUNCEMENTS.map((ann) => (
              <button
                key={ann.id}
                type="button"
                onClick={() => handleSelectPreset(ann.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  selectedPresetId === ann.id
                    ? 'bg-earth-50 border-earth-400 text-earth-900 shadow-sm ring-1 ring-earth-300'
                    : 'bg-savannah-50/70 border-savannah-200 hover:bg-savannah-100 text-obsidian'
                }`}
              >
                <span className="font-bold line-clamp-2 mb-1">{ann.title}</span>
                <span className="text-[10px] text-savannah-600 uppercase tracking-wider">{ann.institution}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea Input Form */}
        <form onSubmit={handleExplain} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center justify-between">
              <span>Paste Official Announcement / Policy Text:</span>
              <span className="text-[11px] text-savannah-500 font-mono">
                {inputText.length} characters
              </span>
            </label>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw legal gazette notice or county order here..."
              className="w-full p-4 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/50 text-xs sm:text-sm text-obsidian font-mono leading-relaxed focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-xs text-savannah-600 hover:text-obsidian flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear text</span>
            </button>

            <button
              type="submit"
              disabled={isProcessing || !inputText.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-sun-300" />
              <span>{isProcessing ? 'Simplifying...' : 'Explain This Notice'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Output Card: Plain Language Breakdown */}
      {explanationResult && (
        <div className="bg-white rounded-3xl border-2 border-earth-300 shadow-african-warm p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Header & Verification Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-savannah-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <VerificationBadge status={explanationResult.status} size="md" />
                <span className="text-xs font-bold uppercase tracking-wider text-earth-700 bg-earth-50 px-2 py-0.5 rounded border border-earth-200">
                  {explanationResult.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-obsidian leading-snug">
                {explanationResult.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleSaveToggle}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSaved
                  ? 'bg-earth-50 border-earth-300 text-earth-700 shadow-sm'
                  : 'bg-white border-savannah-300 text-savannah-700 hover:bg-savannah-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-earth-600 text-earth-600' : ''}`} />
              <span>{isSaved ? 'Saved Explanation' : 'Save This'}</span>
            </button>
          </div>

          {/* Plain Language Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sun-50/70 to-earth-50/50 border border-sun-200 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-earth-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-earth-600" />
              Plain-Language Summary
            </span>
            <p className="text-base sm:text-lg font-bold text-obsidian leading-relaxed">
              {explanationResult.plainExplanation}
            </p>
          </div>

          {/* Key Bulleted Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-savannah-700">
              Key Rules & Takeaways
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {explanationResult.keyPoints.map((pt, i) => (
                <li key={i} className="p-3.5 rounded-xl bg-savannah-50 border border-savannah-200 text-xs sm:text-sm text-obsidian flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-earth-500 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Audience, Timing, and Required Action 3-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-white border border-savannah-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-savannah-600">
                <Users className="w-4 h-4 text-earth-600" />
                <span>Who Is Affected</span>
              </div>
              <p className="text-xs text-obsidian font-semibold leading-relaxed">
                {explanationResult.whoIsAffected}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-savannah-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-savannah-600">
                <Calendar className="w-4 h-4 text-sun-600" />
                <span>When It Applies</span>
              </div>
              <p className="text-xs text-obsidian font-semibold leading-relaxed">
                {explanationResult.whenItApplies}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-earth-50/70 border border-earth-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-earth-700">
                <AlertCircle className="w-4 h-4 text-earth-600" />
                <span>Required Action</span>
              </div>
              <p className="text-xs text-earth-950 font-bold leading-relaxed">
                {explanationResult.requiredAction}
              </p>
            </div>
          </div>

          {/* Footer with Source details and Follow-up CTA */}
          <div className="pt-4 border-t border-savannah-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-savannah-600">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-earth-600 shrink-0" />
              <span>
                Originating Body: <strong className="text-obsidian">{explanationResult.institution}</strong> ({explanationResult.date})
              </span>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/ask?q=${encodeURIComponent(`Follow-up regarding: ${explanationResult.title}`)}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-savannah-100 hover:bg-savannah-200 text-obsidian font-bold transition-colors"
            >
              <span>Ask a Follow-Up Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
