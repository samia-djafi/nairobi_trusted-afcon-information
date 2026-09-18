'use client';

import React from 'react';
import Link from 'next/link';
import { TRUSTED_INSTITUTIONS } from '@/lib/knowledge-base';
import VerificationBadge from '@/components/trust/VerificationBadge';
import {
  ShieldCheck,
  Search,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Building2,
  Compass,
  Sparkles,
  MapPin,
  Clock,
  AlertTriangle,
  XCircle,
  ExternalLink
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-earth-50 border border-earth-200 text-earth-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-earth-600" />
          <span>Transparency & Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-obsidian tracking-tight">
          How Civic Trust Works
        </h1>
        <p className="text-base text-savannah-700 leading-relaxed">
          Nairobi — Trusted AFCON Info is an open civic verification system built to eliminate rumor and confusion during the 2027 Africa Cup of Nations in Nairobi.
        </p>
      </div>

      {/* 1. The Core Loop Explained: FIND -> UNDERSTAND -> VERIFY -> ACT */}
      <section id="methodology" className="space-y-8">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-earth-600">
            The User Experience Loop
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian">
            FIND → UNDERSTAND → VERIFY → ACT
          </h2>
          <p className="text-xs sm:text-sm text-savannah-700 max-w-xl">
            Every screen and interaction on this platform is structured around this 4-stage integrity principle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl border border-savannah-200 p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-african-warm transition-all">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-sun-100 text-sun-700 flex items-center justify-center font-extrabold text-sm">
                01
              </span>
              <h3 className="text-xl font-extrabold text-obsidian">1. FIND</h3>
            </div>
            <p className="text-xs sm:text-sm text-savannah-700 leading-relaxed">
              Users can phrase questions in natural English, Kiswahili, or French, or browse structured categories (Transport, Venues, Safety, Public Services). There are no rigid keywords or hidden menus; the civic search matches intent and context directly.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-savannah-200 p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-african-warm transition-all">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-earth-100 text-earth-700 flex items-center justify-center font-extrabold text-sm">
                02
              </span>
              <h3 className="text-xl font-extrabold text-obsidian">2. UNDERSTAND</h3>
            </div>
            <p className="text-xs sm:text-sm text-savannah-700 leading-relaxed">
              Legal documents, gazettes, and transport notices are often filled with bureaucratic jargon. Our civic language engine converts lengthy administrative orders into 2-3 clear, readable sentences with bulleted rules and audience criteria.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-savannah-200 p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-african-warm transition-all">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-sm">
                03
              </span>
              <h3 className="text-xl font-extrabold text-obsidian">3. VERIFY</h3>
            </div>
            <p className="text-xs sm:text-sm text-savannah-700 leading-relaxed">
              Trust is never hidden in fine print. Every card carries an inspectable trust badge showing the issuing government or tournament authority, publication date, and last verified timestamp. Tapping any badge opens the Source Explorer with full audit trails.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-savannah-200 p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-african-warm transition-all">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-ember-100 text-ember-700 flex items-center justify-center font-extrabold text-sm">
                04
              </span>
              <h3 className="text-xl font-extrabold text-obsidian">4. ACT</h3>
            </div>
            <p className="text-xs sm:text-sm text-savannah-700 leading-relaxed">
              Information is only valuable if it leads to confident action. Answers provide contextual next-step action buttons: one-tap emergency calling, transit routing, official gazette links, or issue reporting.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Verification Badge Legend Table */}
      <section id="badge-legend" className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-earth-600">
            Trust Nomenclature
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian">
            Verification Badge Legend
          </h2>
          <p className="text-xs sm:text-sm text-savannah-700">
            A standardized 4-tier visual taxonomy that users can inspect on any screen.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-2xl border border-savannah-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-savannah-100/70 border-b border-savannah-200 text-obsidian font-extrabold text-xs uppercase tracking-wider">
                  <th className="p-4">Badge UI</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Color</th>
                  <th className="p-4">Meaning & Freshness Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-savannah-100">
                <tr className="hover:bg-savannah-50/50">
                  <td className="p-4">
                    <VerificationBadge status="verified" interactive={false} size="sm" />
                  </td>
                  <td className="p-4 font-bold text-emerald-800">Verified</td>
                  <td className="p-4 text-savannah-600">Forest Emerald</td>
                  <td className="p-4 text-savannah-800">
                    Confirmed directly against an official statutory gazette or press communique within the last 72 hours.
                  </td>
                </tr>

                <tr className="hover:bg-savannah-50/50">
                  <td className="p-4">
                    <VerificationBadge status="recently_updated" interactive={false} size="sm" />
                  </td>
                  <td className="p-4 font-bold text-sky-800">Recently Updated</td>
                  <td className="p-4 text-savannah-600">Cobalt Sky</td>
                  <td className="p-4 text-savannah-800">
                    Officially confirmed, but key dates, routes, or timetable details were modified within the last 24 hours. Worth re-checking.
                  </td>
                </tr>

                <tr className="hover:bg-savannah-50/50">
                  <td className="p-4">
                    <VerificationBadge status="unverified" interactive={false} size="sm" />
                  </td>
                  <td className="p-4 font-bold text-amber-800">Unverified</td>
                  <td className="p-4 text-savannah-600">Ochre Gold</td>
                  <td className="p-4 text-savannah-800">
                    Reported publicly in local news or community discourse, but not yet gazetted by an accredited authority.
                  </td>
                </tr>

                <tr className="hover:bg-savannah-50/50">
                  <td className="p-4">
                    <VerificationBadge status="unverifiable" interactive={false} size="sm" />
                  </td>
                  <td className="p-4 font-bold text-red-800">Could Not Verify</td>
                  <td className="p-4 text-savannah-600">Brick Red</td>
                  <td className="p-4 text-savannah-800">
                    No credible public authority or official match found. Triggers the specialized &ldquo;I Can&apos;t Verify This&rdquo; safety fallback.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Our Accredited Sources */}
      <section id="sources" className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-earth-600">
            Institutional Roster
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian">
            Our Public Sources
          </h2>
          <p className="text-xs sm:text-sm text-savannah-700">
            We aggregate exclusively from accredited Kenyan government ministries, emergency response agencies, and the CAF tournament committee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUSTED_INSTITUTIONS.map((inst, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-savannah-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-earth-50 text-earth-700 text-xs font-mono font-bold">
                  {inst.acronym}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {inst.verifiedCount} notices
                </span>
              </div>
              <h3 className="font-bold text-sm text-obsidian">
                {inst.name}
              </h3>
              <p className="text-xs text-savannah-600">
                {inst.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. What This Is / What This Isn't */}
      <section className="bg-savannah-100/80 rounded-3xl border border-savannah-300 p-6 sm:p-10 space-y-6">
        <h2 className="text-2xl font-extrabold text-obsidian">
          What This Is / What This Isn&apos;t
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-5 rounded-2xl bg-white border border-emerald-200">
            <span className="font-extrabold text-sm text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              WHAT WE ARE
            </span>
            <ul className="space-y-2 text-xs text-savannah-800">
              <li>• A transparent civic translation layer that makes official gazettes instantly readable.</li>
              <li>• An open verification engine cross-referencing public statements with official portals.</li>
              <li>• A privacy-first civic utility that works without requiring login accounts or collecting personal data.</li>
            </ul>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-white border border-red-200">
            <span className="font-extrabold text-sm text-red-800 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              WHAT WE ARE NOT
            </span>
            <ul className="space-y-2 text-xs text-savannah-800">
              <li>• We are not an official government department or CAF police arm.</li>
              <li>• We are not a speculative sports betting or commercial fan merchandise store.</li>
              <li>• We do not replace emergency telephone operators; in acute danger, always call 999 / 112 directly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Scalability Roadmap */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-earth-600">
            Scalability & Future Growth
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-obsidian">
            Roadmap: From Nairobi to All-Africa Civic Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-savannah-200 space-y-2">
            <span className="text-xs font-mono font-bold text-earth-600">PHASE 1 (CURRENT MVP)</span>
            <h3 className="font-bold text-base text-obsidian">Nairobi AFCON 2027</h3>
            <p className="text-xs text-savannah-700 leading-relaxed">
              Talanta Sports City, Kasarani, and Nyayo stadiums. Nairobi transit rerouting, emergency lines, and fan festivals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-savannah-200 space-y-2">
            <span className="text-xs font-mono font-bold text-sun-600">PHASE 2</span>
            <h3 className="font-bold text-base text-obsidian">East Africa Pamoja Bid</h3>
            <p className="text-xs text-savannah-700 leading-relaxed">
              Expansion across Kenya, Uganda (Kampala Mandela Stadium), and Tanzania (Dar es Salaam Mkapa Stadium) cross-border coordination.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-savannah-200 space-y-2">
            <span className="text-xs font-mono font-bold text-rift-600">PHASE 3</span>
            <h3 className="font-bold text-base text-obsidian">Pan-African Civic Network</h3>
            <p className="text-xs text-savannah-700 leading-relaxed">
              A generalizable, open civic verification architecture for major sporting and cultural gatherings across all 54 African nations.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTAs */}
      <div className="text-center pt-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-obsidian">
          Ready to experience trusted civic information?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ask"
            className="px-6 py-3.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sun-300" />
            <span>Ask AI a Question</span>
          </Link>
          <Link
            href="/browse"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-savannah-100 border-2 border-savannah-300 text-obsidian font-extrabold text-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-earth-600" />
            <span>Browse Information Directory</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
