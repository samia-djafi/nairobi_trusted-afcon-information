'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, HelpCircle, PhoneCall, ArrowRight, ShieldX, ExternalLink } from 'lucide-react';

interface UnverifiedCardProps {
  query: string;
  partialMatch?: string;
  suggestedInstitution?: string;
  institutionContact?: string;
  officialLink?: string;
}

export default function UnverifiedCard({
  query,
  partialMatch,
  suggestedInstitution = 'AFCON Local Organising Committee (LOC) / Nairobi City County',
  institutionContact = '0800 724 999',
  officialLink = 'https://cafonline.com',
}: UnverifiedCardProps) {
  return (
    <div className="bg-savannah-50 rounded-2xl border-2 border-dashed border-savannah-300 p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Visual warning header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
          <ShieldX className="w-7 h-7 text-amber-700" />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Could Not Verify Source</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-obsidian tracking-tight">
            We couldn&apos;t verify this information from a reliable official source.
          </h2>
          <p className="text-xs sm:text-sm text-savannah-700">
            Query: &ldquo;<strong className="text-obsidian">{query}</strong>&rdquo;
          </p>
        </div>
      </div>

      {/* Honest Civic Explanation */}
      <div className="p-4 rounded-xl bg-white border border-savannah-200 text-sm text-obsidian space-y-2">
        <p className="font-semibold text-earth-900">
          Why this happened:
        </p>
        <p className="text-savannah-700 leading-relaxed text-xs sm:text-sm">
          Our civic integrity engine cross-references queries against official gazettes from KeNHA, the National Police Service, CAF, and Nairobi City County. We found no confirmed statutory notice or verified announcement matching this request.
        </p>
        {partialMatch && (
          <div className="mt-3 p-3 bg-savannah-50 rounded-lg border border-savannah-300 text-xs">
            <span className="font-bold text-earth-700 block mb-1">
              Unverified Public Mention Found:
            </span>
            <span className="text-savannah-800 italic">&ldquo;{partialMatch}&rdquo;</span>
          </div>
        )}
      </div>

      {/* Suggested Action Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-savannah-200 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-savannah-700 block">
          Recommended Safe Actions
        </span>

        <div className="space-y-2 text-xs text-savannah-800">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-earth-500 mt-1.5 shrink-0" />
            <p>
              Check directly with the accredited authority: <strong className="text-obsidian">{suggestedInstitution}</strong>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-earth-500 mt-1.5 shrink-0" />
            <p>
              Do not rely on unverified social media claims or informal street rumors.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={`tel:${institutionContact}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Official Helpdesk ({institutionContact})</span>
          </a>

          <a
            href={officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-savannah-100 hover:bg-savannah-200 border border-savannah-300 text-obsidian text-xs font-bold transition-colors"
          >
            <span>Visit CAF Tournament Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-savannah-600" />
          </a>

          <Link
            href="/report?type=broken_source"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-earth-700 hover:text-earth-900 underline"
          >
            <span>Have an official link to suggest? Report it</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
