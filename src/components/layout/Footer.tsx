'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { TRUSTED_INSTITUTIONS } from '@/lib/knowledge-base';
import { PhoneCall, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

export default function Footer() {
  const { language, setLanguage } = useApp();
  const t = TRANSLATIONS[language]?.nav || TRANSLATIONS.en.nav;

  return (
    <footer className="bg-obsidian text-savannah-200 pt-16 pb-24 lg:pb-12 border-t border-savannah-800">
      {/* Visual African geometric top ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-savannah-800">
          
          {/* Col 1 & 2: Mission & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-earth-500 to-sun-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-obsidian rounded-[6px] flex items-center justify-center">
                  <span className="font-extrabold text-sun-400 text-xs">NBO</span>
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Nairobi — Trusted AFCON Info
              </span>
            </div>
            
            <p className="text-sm text-savannah-400 leading-relaxed max-w-sm">
              An open civic information platform engineered to deliver verified, sourced, plain-language answers for Nairobi residents and visiting football fans during the TotalEnergies AFCON 2027.
            </p>

            {/* Hackathon Attribution Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-savannah-900/80 border border-savannah-700 text-xs text-sun-300">
              <Award className="w-4 h-4 text-sun-400" />
              <span>Built for the <strong>OSF × Andela Hackathon 2026</strong></span>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-savannah-400">
              <span>Language:</span>
              <button
                onClick={() => setLanguage('en')}
                className={`hover:text-white transition-colors ${language === 'en' ? 'text-sun-400 font-bold underline' : ''}`}
              >
                English
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('sw')}
                className={`hover:text-white transition-colors ${language === 'sw' ? 'text-sun-400 font-bold underline' : ''}`}
              >
                Kiswahili
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`hover:text-white transition-colors ${language === 'fr' ? 'text-sun-400 font-bold underline' : ''}`}
              >
                Français
              </button>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Explore Platform
            </h3>
            <ul className="space-y-2 text-sm text-savannah-400">
              <li>
                <Link href="/ask" className="hover:text-white transition-colors">
                  {t.askAi}
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-white transition-colors">
                  {t.browse}
                </Link>
              </li>
              <li>
                <Link href="/explain" className="hover:text-white transition-colors">
                  {t.explainThis}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition-colors">
                  {t.saved}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  {t.howItWorks}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Trust & Verification
            </h3>
            <ul className="space-y-2 text-sm text-savannah-400">
              <li>
                <Link href="/how-it-works#methodology" className="hover:text-white transition-colors">
                  Verification Methodology
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#badge-legend" className="hover:text-white transition-colors">
                  Badge Status Legend
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#sources" className="hover:text-white transition-colors">
                  Accredited Source Roster
                </Link>
              </li>
              <li>
                <Link href="/report?type=incorrect_info" className="hover:text-white transition-colors text-sun-400">
                  Flag Incorrect Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Emergency & Reporting */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Safety & Emergency
            </h3>
            <div className="p-3 rounded-xl bg-earth-950/70 border border-earth-700/50 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sun-300">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Immediate Assistance</span>
              </div>
              <p className="text-savannah-300">
                National Emergency: <strong className="text-white">999 / 112</strong>
              </p>
              <p className="text-savannah-300">
                Red Cross Ambulance: <strong className="text-white">1199</strong>
              </p>
              <Link 
                href="/emergency" 
                className="inline-block text-sun-400 font-bold hover:underline pt-1"
              >
                View Full Emergency Directory →
              </Link>
            </div>

            <Link
              href="/report"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-savannah-800 hover:bg-savannah-700 text-xs font-bold text-white transition-colors"
            >
              <span>{t.reportIssue}</span>
            </Link>
          </div>
        </div>

        {/* Partner Institutional Trust Strip */}
        <div className="py-6 border-b border-savannah-800/80">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-savannah-400">
            <span className="font-semibold text-savannah-300">
              Aggregated from official Kenyan public institutions:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {TRUSTED_INSTITUTIONS.slice(0, 6).map((inst, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-savannah-900 border border-savannah-800 text-[11px] font-mono text-savannah-300">
                  {inst.acronym}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Civic Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-savannah-500">
          <p className="text-center sm:text-left max-w-2xl leading-relaxed">
            <strong>Civic Information Notice:</strong> Information is aggregated from verified public official sources. Always confirm critical travel and security decisions with official gazettes and security personnel on the ground.
          </p>
          <p className="shrink-0 flex items-center gap-1.5">
            Crafted for Nairobi & African Sport with <Heart className="w-3.5 h-3.5 text-earth-500 fill-earth-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
