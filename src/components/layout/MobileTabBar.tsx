'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { Home, Sparkles, Compass, Bookmark } from 'lucide-react';

export default function MobileTabBar() {
  const pathname = usePathname();
  const { language, savedCount } = useApp();
  const t = TRANSLATIONS[language]?.nav || TRANSLATIONS.en.nav;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-savannah-300 pb-safe">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/') && pathname === '/'
              ? 'text-earth-600 font-bold'
              : 'text-savannah-600 hover:text-obsidian'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{t.home}</span>
        </Link>

        <Link
          href="/ask"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/ask')
              ? 'text-earth-600 font-bold'
              : 'text-savannah-600 hover:text-obsidian'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sun-500 animate-ping" />
          </div>
          <span className="text-[10px] tracking-tight">{t.askAi}</span>
        </Link>

        <Link
          href="/browse"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/browse')
              ? 'text-earth-600 font-bold'
              : 'text-savannah-600 hover:text-obsidian'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{t.browse}</span>
        </Link>

        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
            isActive('/saved')
              ? 'text-earth-600 font-bold'
              : 'text-savannah-600 hover:text-obsidian'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-earth-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">{t.saved}</span>
        </Link>
      </div>
    </div>
  );
}
