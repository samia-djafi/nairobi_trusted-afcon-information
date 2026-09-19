'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { AlertTriangle } from 'lucide-react';

export default function FloatingReportButton() {
  const pathname = usePathname();
  const { language } = useApp();
  const t = TRANSLATIONS[language]?.floatingReport || TRANSLATIONS.en.floatingReport;

  // Do not show on the report page itself
  if (pathname === '/report') return null;

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40">
      <Link
        href="/report"
        aria-label={t.ariaLabel}
        className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-ember-600 to-earth-600 text-white rounded-full shadow-lg shadow-ember-600/30 hover:shadow-xl hover:shadow-ember-600/40 hover:scale-105 active:scale-95 transition-all border border-white/20"
      >
        <AlertTriangle className="w-5 h-5 text-sun-300 animate-bounce group-hover:animate-none" />
        <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase">
          {t.label}
        </span>
      </Link>
    </div>
  );
}
