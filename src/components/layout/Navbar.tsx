'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { Language } from '@/types';
import {
  Sparkles,
  Search,
  Bell,
  Bookmark,
  ChevronDown,
  Globe,
  AlertOctagon,
  UserCheck,
  Clock,
  Menu,
  X,
  Compass,
  Car,
  Trophy,
  ShieldAlert,
  Building2,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    savedCount,
    unreadNotificationCount,
    setIsNotificationDrawerOpen,
  } = useApp();

  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAccountNoteOpen, setIsAccountNoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nairobiTime, setNairobiTime] = useState<string>('');

  const t = TRANSLATIONS[language]?.nav || TRANSLATIONS.en.nav;
  const brand = TRANSLATIONS[language]?.brandName || TRANSLATIONS.en.brandName;
  const tagline = TRANSLATIONS[language]?.brandTagline || TRANSLATIONS.en.brandTagline;

  // Live Nairobi East Africa Time (UTC+3)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const eatTime = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setNairobiTime(`${eatTime} EAT`);
      } catch {
        setNairobiTime('EAT (Nairobi)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-savannah-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Nairobi Clock */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              {/* Official AFCON 2027 Logo */}
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-earth-600 via-ember-600 to-sun-500 p-0.5 shadow-md shadow-earth-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/afcon-logo.jpg"
                    alt={brand}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-obsidian tracking-tight group-hover:text-earth-600 transition-colors">
                    Nairobi
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-earth-600 bg-earth-50 px-1.5 py-0.5 rounded border border-earth-200">
                    AFCON 2027
                  </span>
                </div>
                <span className="text-[11px] text-savannah-600 font-medium tracking-tight -mt-0.5 hidden sm:inline">
                  {tagline}
                </span>
              </div>
            </Link>

            {/* Nairobi Live EAT Clock Beacon */}
            {nairobiTime && (
              <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-savannah-200 text-[11px] text-savannah-600 font-mono">
                <Clock className="w-3 h-3 text-earth-500" />
                <span>{nairobiTime}</span>
              </div>
            )}
          </div>

          {/* Desktop Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/ask"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/ask')
                  ? 'bg-earth-50 text-earth-700 border border-earth-200'
                  : 'text-obsidian hover:text-earth-600 hover:bg-savannah-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sun-600" />
              <span>{t.askAi}</span>
            </Link>

            {/* Browse Info Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsBrowseOpen(true)}
              onMouseLeave={() => setIsBrowseOpen(false)}
            >
              <Link
                href="/browse"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/browse')
                    ? 'bg-earth-50 text-earth-700 border border-earth-200'
                    : 'text-obsidian hover:text-earth-600 hover:bg-savannah-100'
                }`}
              >
                <span>{t.browse}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {isBrowseOpen && (
                <div className="absolute top-full left-0 w-64 pt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white rounded-xl shadow-xl border border-savannah-200 p-2 space-y-1">
                    <Link
                      href="/browse?category=transport"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-savannah-50 text-xs font-medium text-obsidian transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-earth-50 text-earth-600">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block">{t.dropdown.transportTitle}</span>
                        <span className="text-savannah-600 text-[11px]">{t.dropdown.transportDesc}</span>
                      </div>
                    </Link>

                    <Link
                      href="/browse?category=venues"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-savannah-50 text-xs font-medium text-obsidian transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-sun-50 text-sun-600">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block">{t.dropdown.venuesTitle}</span>
                        <span className="text-savannah-600 text-[11px]">{t.dropdown.venuesDesc}</span>
                      </div>
                    </Link>

                    <Link
                      href="/browse?category=safety"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-savannah-50 text-xs font-medium text-obsidian transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-ember-50 text-ember-600">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block">{t.dropdown.safetyTitle}</span>
                        <span className="text-savannah-600 text-[11px]">{t.dropdown.safetyDesc}</span>
                      </div>
                    </Link>

                    <Link
                      href="/browse?category=public_services"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-savannah-50 text-xs font-medium text-obsidian transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-rift-50 text-rift-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold block">{t.dropdown.publicServicesTitle}</span>
                        <span className="text-savannah-600 text-[11px]">{t.dropdown.publicServicesDesc}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/explain"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/explain')
                  ? 'bg-earth-50 text-earth-700 border border-earth-200'
                  : 'text-obsidian hover:text-earth-600 hover:bg-savannah-100'
              }`}
            >
              {t.explainThis}
            </Link>

            <Link
              href="/saved"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/saved')
                  ? 'bg-earth-50 text-earth-700 border border-earth-200'
                  : 'text-obsidian hover:text-earth-600 hover:bg-savannah-100'
              }`}
            >
              <Bookmark className="w-4 h-4 text-earth-600" />
              <span>{t.saved}</span>
              {savedCount > 0 && (
                <span className="text-[10px] bg-earth-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>

            <Link
              href="/how-it-works"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/how-it-works')
                  ? 'bg-earth-50 text-earth-700 border border-earth-200'
                  : 'text-obsidian hover:text-earth-600 hover:bg-savannah-100'
              }`}
            >
              {t.howItWorks}
            </Link>
          </nav>

          {/* Right Tools: Lang, Notif, Report Issue, Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-lg text-savannah-800 hover:bg-savannah-100 transition-colors flex items-center gap-1 text-xs font-bold"
                aria-label={t.selectLanguage}
              >
                <Globe className="w-4 h-4 text-earth-600" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isLangOpen && (
                <div 
                  className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-savannah-200 p-1.5 z-50"
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                        language === lang.code
                          ? 'bg-earth-50 text-earth-700'
                          : 'text-obsidian hover:bg-savannah-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 rounded-lg text-savannah-800 hover:bg-savannah-100 transition-colors"
              aria-label={t.selectLanguage}
            >
              <Bell className="w-5 h-5 text-obsidian" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ember-600 text-white text-[10px] font-bold ring-2 ring-white animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Always-visible Secondary Outline 'Report an Issue' Button */}
            <Link
              href="/report"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-earth-500 text-earth-700 hover:bg-earth-500 hover:text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <AlertOctagon className="w-4 h-4 text-current" />
              <span>{t.reportIssue}</span>
            </Link>

            {/* Anonymous Session Account Indicator with Privacy Note */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountNoteOpen(!isAccountNoteOpen)}
                className="p-2 rounded-full bg-savannah-100 hover:bg-savannah-200 text-savannah-800 transition-colors flex items-center justify-center border border-savannah-300"
                aria-label={t.privacyTitle}
                title={t.privacyTitle}
              >
                <UserCheck className="w-4 h-4 text-rift-700" />
              </button>

              {isAccountNoteOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-savannah-300 p-4 z-50 text-xs text-obsidian animate-in fade-in"
                  onMouseLeave={() => setIsAccountNoteOpen(false)}
                >
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-earth-700">
                    <UserCheck className="w-4 h-4 text-rift-600" />
                    <span>{t.privacyTitle}</span>
                  </div>
                  <p className="text-savannah-700 leading-relaxed">
                    {t.privacyNote}
                  </p>
                  <div className="mt-3 pt-2 border-t border-savannah-200 text-[11px] text-savannah-500">
                    {t.privacySession}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-savannah-800 hover:bg-savannah-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Secondary navigation) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-savannah-200 space-y-2 animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.home}
            </Link>
            <Link
              href="/ask"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.askAi}
            </Link>
            <Link
              href="/browse"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.browse}
            </Link>
            <Link
              href="/explain"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.explainThis}
            </Link>
            <Link
              href="/saved"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.saved} ({savedCount})
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-obsidian hover:bg-savannah-100"
            >
              {t.howItWorks}
            </Link>
            <Link
              href="/emergency"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              {t.emergency} (999 / 112)
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
