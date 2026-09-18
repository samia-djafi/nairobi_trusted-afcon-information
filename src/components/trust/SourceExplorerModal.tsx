'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { BADGE_CONFIG } from './VerificationBadge';
import { 
  X, 
  ExternalLink, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  History,
  AlertCircle
} from 'lucide-react';

export default function SourceExplorerModal() {
  const { selectedSourceItem, closeSourceExplorer, language } = useApp();
  const t = TRANSLATIONS[language]?.badges || TRANSLATIONS.en.badges;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSourceExplorer();
    };
    if (selectedSourceItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedSourceItem, closeSourceExplorer]);

  if (!selectedSourceItem) return null;

  const { title, status, source, statusReason } = selectedSourceItem;
  const config = BADGE_CONFIG[status];
  const BadgeIcon = config.icon;

  const getExplanation = () => {
    switch (status) {
      case 'verified': return t.verifiedDesc;
      case 'recently_updated': return t.recentlyUpdatedDesc;
      case 'unverified': return t.unverifiedDesc;
      case 'unverifiable': return t.couldNotVerifyDesc;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSourceExplorer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-explorer-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-savannah-200 overflow-hidden text-obsidian transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with African styled top border accent */}
        <div className="h-2 w-full bg-gradient-to-r from-earth-500 via-sun-500 to-rift-500" />

        <div className="p-6 border-b border-savannah-200 flex items-start justify-between gap-4 bg-savannah-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-earth-50 text-earth-600 border border-earth-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-earth-600">
                Civic Trust Verification Layer
              </span>
              <h2 id="source-explorer-title" className="text-lg sm:text-xl font-bold text-obsidian leading-snug">
                Source Explorer & Audit Trail
              </h2>
            </div>
          </div>
          <button
            onClick={closeSourceExplorer}
            aria-label="Close modal"
            className="p-2 rounded-lg text-savannah-700 hover:text-obsidian hover:bg-savannah-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Query context snippet */}
          <div className="p-4 rounded-xl bg-savannah-100/70 border border-savannah-300">
            <span className="text-xs font-medium text-savannah-700 uppercase tracking-wider block mb-1">
              Referenced Civic Notice
            </span>
            <p className="font-semibold text-obsidian text-sm sm:text-base">
              &ldquo;{title}&rdquo;
            </p>
          </div>

          {/* Verification Status & Meaning */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-savannah-200 bg-white gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${config.bgClass}`}>
                <BadgeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-obsidian">Status:</span>
                  <span className="font-bold text-sm uppercase text-earth-700">{t[config.labelKey]}</span>
                </div>
                <p className="text-xs text-savannah-700 mt-0.5">
                  {getExplanation()}
                </p>
              </div>
            </div>
            {source.officialDocReference && (
              <div className="text-xs font-mono bg-savannah-100 px-2.5 py-1.5 rounded-md border border-savannah-300 text-savannah-800 self-start sm:self-center">
                Ref: {source.officialDocReference}
              </div>
            )}
          </div>

          {statusReason && (
            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{statusReason}</span>
            </div>
          )}

          {/* Primary Source Institution Details */}
          <div className="border border-savannah-200 rounded-xl p-5 space-y-3 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-earth-600">
              <Building2 className="w-4 h-4" />
              <span>Accredited Public Authority</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div>
                <h3 className="font-bold text-base text-obsidian">
                  {source.institution}
                </h3>
                {source.department && (
                  <p className="text-xs text-savannah-700">
                    {source.department}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-savannah-200 text-xs">
              <div className="flex items-center gap-2 text-savannah-700">
                <FileText className="w-4 h-4 text-earth-500" />
                <span>Original Publication: <strong className="text-obsidian">{source.publishedDate}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-savannah-700">
                <Calendar className="w-4 h-4 text-rift-600" />
                <span>Last Verified Check: <strong className="text-obsidian">{source.lastVerifiedDate}</strong></span>
              </div>
            </div>
          </div>

          {/* Audit Trail Timeline */}
          {source.auditTrail && source.auditTrail.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-savannah-700">
                <History className="w-4 h-4 text-earth-500" />
                <span>Verification Audit Trail</span>
              </div>
              <div className="relative pl-6 border-l-2 border-earth-200 space-y-4 py-1 ml-2">
                {source.auditTrail.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-earth-500 text-white text-[10px] ring-4 ring-white">
                      ✓
                    </span>
                    <div className="bg-savannah-50 p-3 rounded-lg border border-savannah-200">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-obsidian">{step.stage}</span>
                        <span className="text-[11px] text-savannah-600 font-mono">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-savannah-700 mt-1">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explicit AI vs Source Distinction Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-sun-300 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sun-500 text-white shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong className="font-bold block text-sm mb-0.5 text-earth-900">
                AI Interpretation vs. Official Sourced Fact
              </strong>
              This plain-language explanation was synthesized by our civic AI parser for clarity and rapid reading. 
              The verified underlying facts and public notices originate directly from{' '}
              <strong className="underline decoration-earth-400 font-semibold">{source.institution}</strong>. Always confirm critical safety and travel logistics against the original public gazette below.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-savannah-200 bg-savannah-50 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeSourceExplorer}
            className="px-4 py-2.5 rounded-xl border border-savannah-300 text-savannah-800 hover:bg-savannah-200 text-sm font-medium transition-colors"
          >
            Close Explorer
          </button>
          <a
            href={source.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-sm font-bold shadow-md shadow-earth-600/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>View Original Source Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
