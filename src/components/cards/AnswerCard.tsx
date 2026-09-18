'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AFCONInfoItem } from '@/types';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { useApp } from '@/context/AppContext';
import { isItemSaved, saveItem, removeItem } from '@/lib/storage';
import { 
  Building2, 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark, 
  Share2, 
  Check, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AnswerCardProps {
  item: AFCONInfoItem;
  onRelatedClick?: (id: string) => void;
}

export default function AnswerCard({ item, onRelatedClick }: AnswerCardProps) {
  const { openSourceExplorer, refreshSavedCount } = useApp();
  const [saved, setSaved] = useState(() => isItemSaved(item.id));
  const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSaveToggle = () => {
    if (saved) {
      removeItem(item.id);
      setSaved(false);
    } else {
      saveItem({
        id: item.id,
        type: 'answer',
        title: item.title,
        summary: item.summary,
        category: item.category,
        status: item.status,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        link: `/ask?q=${encodeURIComponent(item.title)}`,
      });
      setSaved(true);
    }
    refreshSavedCount();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: item.summary,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-savannah-300 shadow-african-warm overflow-hidden transition-all">
      {/* Top African accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-earth-500 via-sun-500 to-rift-600" />

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Verification Status & Category Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-savannah-200">
          <div className="flex items-center gap-2">
            <VerificationBadge status={item.status} item={item} size="lg" />
            <span className="text-xs uppercase tracking-wider font-bold text-savannah-600 bg-savannah-100 px-2.5 py-1 rounded-md border border-savannah-200">
              {item.category.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSaveToggle}
              aria-label={saved ? 'Remove from saved' : 'Save this answer'}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                saved
                  ? 'bg-earth-50 border-earth-300 text-earth-700 shadow-sm'
                  : 'bg-white border-savannah-300 text-savannah-700 hover:bg-savannah-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-earth-600 text-earth-600' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share answer"
              className="p-2 rounded-xl border border-savannah-300 bg-white hover:bg-savannah-50 text-savannah-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-obsidian tracking-tight leading-tight">
          {item.title}
        </h2>

        {/* Sourced Plain-Language Answer */}
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-savannah-50/80 border border-savannah-200 text-obsidian text-base leading-relaxed">
            <p className="font-semibold text-earth-900 mb-2">
              {item.summary}
            </p>
            <p className="text-savannah-800 text-sm leading-relaxed">
              {item.fullAnswer}
            </p>
          </div>
        </div>

        {/* Source Strip (Institution & Last Verified) */}
        <div className="p-4 rounded-xl border border-savannah-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-earth-50 text-earth-600 border border-earth-200 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-bold text-obsidian">
                <span>Source:</span>
                <span className="text-earth-700">{item.source.institution}</span>
              </div>
              <div className="text-savannah-600 mt-0.5 flex flex-wrap items-center gap-x-2">
                <span>Published: <strong>{item.source.publishedDate}</strong></span>
                <span>•</span>
                <span>Verified: <strong className="text-rift-700">{item.source.lastVerifiedDate}</strong></span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openSourceExplorer(item)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-savannah-100 hover:bg-savannah-200 border border-savannah-300 text-obsidian text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-earth-600" />
            <span>View Full Source & Audit Trail</span>
          </button>
        </div>

        {/* Next Steps: Contextual Action Buttons */}
        {item.nextSteps && item.nextSteps.length > 0 && (
          <div className="pt-2 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-savannah-700 block">
              Recommended Next Steps
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {item.nextSteps.map((action, idx) => {
                const isExternal = action.target.startsWith('http');
                const isCall = action.target.startsWith('tel:');
                return (
                  <div key={idx}>
                    {isCall ? (
                      <a
                        href={action.target}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-sm shadow-earth-600/30 transition-all hover:scale-105 active:scale-95"
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
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                          action.isPrimary
                            ? 'bg-earth-600 hover:bg-earth-700 text-white shadow-earth-600/20 hover:scale-105 active:scale-95'
                            : 'bg-white hover:bg-savannah-100 border border-savannah-300 text-obsidian'
                        }`}
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

        {/* Micro-Feedback & Disclaimer */}
        <div className="pt-4 border-t border-savannah-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-savannah-600">
          <div className="flex items-center gap-2">
            <span>Was this answer helpful?</span>
            <button
              type="button"
              onClick={() => setFeedback('helpful')}
              className={`p-1.5 rounded-lg border transition-colors ${
                feedback === 'helpful'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                  : 'border-savannah-300 hover:bg-savannah-100'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFeedback('unhelpful')}
              className={`p-1.5 rounded-lg border transition-colors ${
                feedback === 'unhelpful'
                  ? 'bg-red-50 border-red-300 text-red-700 font-bold'
                  : 'border-savannah-300 hover:bg-savannah-100'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
            {feedback && (
              <span className="text-emerald-700 font-semibold animate-in fade-in">
                Thank you for feedback!
              </span>
            )}
          </div>

          <Link
            href="/explain"
            className="text-earth-600 hover:text-earth-700 font-semibold hover:underline"
          >
            Have an official notice document? Explain it here →
          </Link>
        </div>
      </div>
    </div>
  );
}
