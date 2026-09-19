'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import NairobiMonumentLoop from '@/components/3d/NairobiMonumentLoop';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { 
  AFCON_KNOWLEDGE_BASE, 
  CATEGORIES_CONFIG, 
  TRUSTED_INSTITUTIONS 
} from '@/lib/knowledge-base';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  Trophy, 
  ShieldAlert, 
  Building2, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Compass, 
  Flame, 
  ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { language, openSourceExplorer } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS.en.hero;
  const tCat = TRANSLATIONS[language]?.categories || TRANSLATIONS.en.categories;
  const tLoop = TRANSLATIONS[language]?.trustLoop || TRANSLATIONS.en.trustLoop;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ask?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const sampleQuestions = [
    'Is the road to Talanta Stadium open today?',
    'What is the official emergency number?',
    'Is public transport free with a match ticket?',
    'Can I bring water bottles into Kasarani?',
  ];

  // Pick top 3 recent updates
  const recentUpdates = AFCON_KNOWLEDGE_BASE.slice(0, 3);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Stadium': return <Trophy className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      default: return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION WITH 3D AFRICAN SPORTS MONUMENT */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 lg:pb-20 border-b border-savannah-200">
        
        {/* Subtle decorative savannah sun rays */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sun-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-earth-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Civic Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-earth-50 border border-earth-200 text-earth-800 text-xs font-bold shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-earth-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-earth-600" />
                </span>
                <span>{t.badge}</span>
              </div>

              {/* Display Headline with African/Kenyan typographic impact */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-obsidian tracking-tight leading-[1.08]">
                {t.title}{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-earth-600 via-ember-600 to-sun-500">
                  {t.titleHighlight}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-sun-400/60" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-savannah-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.subtitle}
              </p>

              {/* Embedded Quick Search Input Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto lg:mx-0 pt-2">
                <div className="relative flex items-center bg-white rounded-2xl border-2 border-earth-400/80 shadow-african-warm focus-within:border-earth-600 focus-within:ring-4 focus-within:ring-earth-100 transition-all p-1.5 sm:p-2">
                  <Search className="w-5 h-5 text-savannah-500 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.quickSearchPlaceholder}
                    className="w-full px-3 py-2 text-sm sm:text-base text-obsidian placeholder-savannah-500 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-earth-600 to-ember-600 hover:from-earth-700 hover:to-ember-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{t.askButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Rotating Suggested Questions Chips */}
                <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs">
                  <span className="text-savannah-600 font-semibold">{t.trendingSearches}</span>
                  {sampleQuestions.slice(0, 2).map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => router.push(`/ask?q=${encodeURIComponent(q)}`)}
                      className="text-earth-700 hover:text-earth-900 bg-savannah-100/90 hover:bg-savannah-200 px-2.5 py-1 rounded-full border border-savannah-300 font-medium transition-colors text-left truncate max-w-[280px]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </form>

              {/* Dual Primary / Secondary CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/ask"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-obsidian text-white hover:bg-earth-900 font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-sun-400" />
                  <span>{t.askCta}</span>
                </Link>

                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-obsidian border-2 border-savannah-300 hover:border-earth-400 font-bold text-sm shadow-sm transition-all hover:bg-savannah-50"
                >
                  <Compass className="w-4 h-4 text-earth-600" />
                  <span>{t.browseCta}</span>
                </Link>
              </div>

              {/* Institutional Sourced Trust Strip */}
              <div className="pt-6 border-t border-savannah-200 text-xs">
                <p className="text-savannah-600 font-semibold mb-2">
                  {t.trustedSourcedFrom}
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {TRUSTED_INSTITUTIONS.slice(0, 5).map((inst, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-savannah-200 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-bold text-obsidian">{inst.acronym}</span>
                      <span className="text-savannah-500 text-[10px]">({inst.role})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Living African Sports Monument */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-lg bg-gradient-to-b from-white to-savannah-100 rounded-3xl border border-savannah-300 p-2 sm:p-4 shadow-african-elevated relative">
              <NairobiMonumentLoop />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KINETIC STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-savannah-200 shadow-sm">
          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-black text-earth-600 block mb-1">
              3
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-obsidian block">
              Host Stadiums
            </span>
            <span className="text-[11px] text-savannah-600">Talanta, Kasarani, Nyayo</span>
          </div>

          <div className="text-center p-3 border-l border-savannah-200">
            <span className="text-3xl sm:text-4xl font-black text-rift-600 block mb-1">
              100%
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-obsidian block">
              Official Sourced
            </span>
            <span className="text-[11px] text-savannah-600">Public gazette backed</span>
          </div>

          <div className="text-center p-3 border-l border-savannah-200">
            <span className="text-3xl sm:text-4xl font-black text-sun-500 block mb-1">
              24/7
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-obsidian block">
              Safety Command
            </span>
            <span className="text-[11px] text-savannah-600">Police & Red Cross 1199</span>
          </div>

          <div className="text-center p-3 border-l border-savannah-200">
            <span className="text-3xl sm:text-4xl font-black text-obsidian block mb-1">
              4-Step
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-obsidian block">
              Trust Loop
            </span>
            <span className="text-[11px] text-savannah-600">Find • Understand • Verify • Act</span>
          </div>
        </div>
      </section>

      {/* 3. BROWSE BY 4 CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-earth-600 block mb-1">
              Categorized Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian tracking-tight">
              {tCat.title}
            </h2>
            <p className="text-sm text-savannah-700 mt-1">
              {tCat.subtitle}
            </p>
          </div>

          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-earth-600 hover:text-earth-700 hover:underline"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_CONFIG.map((cat) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.id}`}
              className="group bg-white rounded-2xl border border-savannah-200 hover:border-earth-500 p-6 shadow-sm hover:shadow-african-warm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-savannah-100 group-hover:bg-earth-50 text-earth-600 flex items-center justify-center mb-4 transition-colors">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="font-extrabold text-lg text-obsidian group-hover:text-earth-600 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-savannah-700 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-savannah-100 flex items-center justify-between text-xs">
                <span className="font-bold text-earth-700">
                  {cat.count} Verified Guides
                </span>
                <span className="text-savannah-500 group-hover:text-earth-600 font-bold flex items-center gap-1">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED / RECENT UPDATES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                Fresh From Official Portals
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian tracking-tight">
              Recently Verified Updates
            </h2>
          </div>

          <Link
            href="/browse?sort=recent"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-earth-600 hover:text-earth-700"
          >
            <span>View all updates</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentUpdates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-savannah-200 p-6 shadow-sm hover:shadow-african-warm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <VerificationBadge status={item.status} item={item} size="sm" />
                  <span className="text-[11px] text-savannah-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-savannah-400" />
                    {item.lastUpdatedRelative}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-obsidian leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-savannah-700 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-savannah-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openSourceExplorer(item)}
                  className="text-xs font-bold text-earth-600 hover:text-earth-700 hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Inspect Source</span>
                </button>

                <Link
                  href={`/ask?q=${encodeURIComponent(item.title)}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-savannah-100 hover:bg-savannah-200 text-xs font-bold text-obsidian transition-colors"
                >
                  <span>Read Full</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 'HOW TRUST WORKS' MINI-EXPLAINER (FIND -> UNDERSTAND -> VERIFY -> ACT) */}
      <section className="bg-gradient-to-br from-earth-900 via-obsidian to-obsidian text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden">
        
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-kenya-pattern opacity-5 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sun-400 bg-sun-500/20 px-3 py-1 rounded-full border border-sun-400/30">
              Civic Integrity Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {tLoop.title}
            </h2>
            <p className="text-sm sm:text-base text-savannah-300 max-w-xl mx-auto">
              {tLoop.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sun-500/20 text-sun-400 flex items-center justify-center font-extrabold text-sm mb-3">
                01
              </div>
              <h3 className="font-extrabold text-lg text-sun-300">
                {tLoop.find.title}
              </h3>
              <p className="text-xs text-savannah-300 leading-relaxed">
                {tLoop.find.desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-earth-500/20 text-earth-300 flex items-center justify-center font-extrabold text-sm mb-3">
                02
              </div>
              <h3 className="font-extrabold text-lg text-earth-300">
                {tLoop.understand.title}
              </h3>
              <p className="text-xs text-savannah-300 leading-relaxed">
                {tLoop.understand.desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-extrabold text-sm mb-3">
                03
              </div>
              <h3 className="font-extrabold text-lg text-emerald-300">
                {tLoop.verify.title}
              </h3>
              <p className="text-xs text-savannah-300 leading-relaxed">
                {tLoop.verify.desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sun-500/20 text-sun-300 flex items-center justify-center font-extrabold text-sm mb-3">
                04
              </div>
              <h3 className="font-extrabold text-lg text-sun-300">
                {tLoop.act.title}
              </h3>
              <p className="text-xs text-savannah-300 leading-relaxed">
                {tLoop.act.desc}
              </p>
            </div>
          </div>

          <div>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-obsidian font-bold text-xs sm:text-sm hover:bg-sun-200 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <span>Explore Detailed Verification Methodology</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. EMERGENCY CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 via-earth-700 to-ember-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 shrink-0 hidden sm:block">
              <PhoneCall className="w-8 h-8 text-sun-300 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold">
                In an emergency, don&apos;t wait for a search result.
              </h3>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl">
                National dispatch lines and ambulance evacuation teams operate 24/7 across all 3 host stadium perimeters and fan festivals.
              </p>
            </div>
          </div>

          <Link
            href="/emergency"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Emergency Contacts Directory</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
