'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { AlertCircle, PhoneCall, X } from 'lucide-react';

export default function SafetyBanner() {
  const { language, isSafetyBannerDismissed, dismissSafetyBanner } = useApp();
  const t = TRANSLATIONS[language]?.emergencyBanner || TRANSLATIONS.en.emergencyBanner;

  if (isSafetyBannerDismissed) return null;

  return (
    <aside aria-label="Critical safety notice" className="relative z-40 bg-gradient-to-r from-earth-700 via-ember-700 to-earth-800 text-white px-4 py-2.5 shadow-md border-b border-earth-600/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sun-400" />
          </span>
          <span className="bg-earth-900/60 text-sun-300 uppercase tracking-wider text-[10px] font-bold px-2 py-0.5 rounded border border-sun-400/30">
            {t.badge}
          </span>
          <p className="line-clamp-1">{t.text}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/emergency"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-earth-800 hover:bg-sun-100 text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-earth-600 animate-pulse" />
            <span>{t.cta}</span>
          </Link>
          <button
            onClick={dismissSafetyBanner}
            aria-label="Dismiss safety banner"
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
