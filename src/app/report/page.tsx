'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { saveReport } from '@/lib/storage';
import { IssueReport } from '@/types';
import {
  AlertTriangle,
  ShieldAlert,
  FileWarning,
  Link2Off,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  Send,
  MapPin,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';

function ReportContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as 'safety' | 'incorrect_info' | 'broken_source' | 'other') || 'safety';
  const initialVenue = searchParams.get('venue') || '';

  const [reportType, setReportType] = useState<'safety' | 'incorrect_info' | 'broken_source' | 'other'>(initialType);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(initialVenue ? `${initialVenue} Stadium` : '');
  const [contact, setContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    {
      id: 'safety',
      label: 'Safety Concern',
      desc: 'Active crowd hazard, perimeter issue, medical urgency, or security risk',
      icon: ShieldAlert,
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 'incorrect_info',
      label: 'Incorrect Information',
      desc: 'Discrepancy in bus timetable, ticket pricing, gate times, or venue rules',
      icon: FileWarning,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'broken_source',
      label: 'Broken / Outdated Source',
      desc: 'Official gazette link is dead, inaccessible, or obsolete',
      icon: Link2Off,
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'other',
      label: 'General Feedback / Other',
      desc: 'General civic inquiry, translation request, or suggestion',
      icon: HelpCircle,
      badgeColor: 'bg-savannah-100 text-savannah-800 border-savannah-300',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    const newReport: IssueReport = {
      id: `report-${Date.now()}`,
      reportType,
      description: description.trim(),
      location: location.trim() || undefined,
      contact: contact.trim() || undefined,
      submittedAt: new Date().toISOString(),
      status: 'received',
    };

    setTimeout(() => {
      saveReport(newReport);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>Civic Oversight & Protection Hotline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Report an Issue or Safety Concern
        </h1>
        <p className="text-sm sm:text-base text-savannah-700 max-w-lg mx-auto">
          Help maintain civic accuracy and community safety during AFCON 2027. Flag incorrect information, reported route closures, or urgent safety hazards.
        </p>
      </div>

      {/* Immediate Emergency Warning Banner (Especially if safety is selected) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-600 to-earth-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <PhoneCall className="w-6 h-6 text-sun-300 shrink-0 hidden sm:block animate-bounce" />
          <div className="text-xs sm:text-sm">
            <strong className="block font-bold">Is there immediate danger or injury?</strong>
            <span>Do not wait for a form response. Call emergency services directly right now.</span>
          </div>
        </div>

        <a
          href="tel:999"
          className="shrink-0 px-4 py-2 rounded-xl bg-white text-red-700 hover:bg-red-50 text-xs font-black shadow-sm transition-transform hover:scale-105"
        >
          Call 999 / 112 Now
        </a>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-savannah-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* 1. Report Type Selector */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 block">
              1. What kind of issue are you reporting?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = reportType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setReportType(type.id as typeof reportType)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-earth-50/80 border-earth-500 ring-2 ring-earth-300 shadow-sm'
                        : 'bg-white border-savannah-200 hover:bg-savannah-50 hover:border-savannah-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${type.badgeColor} shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-sm text-obsidian block">
                        {type.label}
                      </span>
                      <p className="text-xs text-savannah-600 leading-snug">
                        {type.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Short Description */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center justify-between">
              <span>2. Description of the issue *</span>
              <span className="text-[11px] text-savannah-500">Provide specific facts</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened or what information is incorrect (e.g. 'The matatu shuttle stop on Ngong Road was moved 200m south due to roadworks')..."
              className="w-full p-4 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none leading-relaxed"
            />
          </div>

          {/* 3. Location / Stadium Field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-earth-600" />
                <span>Location or Venue (Optional)</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Talanta Gate 4, Ngong Road"
                className="w-full p-3 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none"
              />
            </div>

            {/* 4. Privacy-First Contact Field */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-earth-600" />
                <span>Contact Email / Phone (Optional)</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Only if you wish to receive updates"
                className="w-full p-3 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-savannah-200">
            <span className="text-xs text-savannah-500 text-center sm:text-left">
              Reports are triaged by the civic integrity desk and cross-referenced with public authorities.
            </span>

            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Civic Report'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="bg-white rounded-3xl border-2 border-emerald-300 p-8 sm:p-12 text-center space-y-6 shadow-african-warm animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-obsidian">
              Report Submitted Successfully
            </h2>
            <p className="text-sm text-savannah-700 leading-relaxed">
              Thank you for keeping Nairobi safe and informed. Your report has been recorded in our civic queue and forwarded to the appropriate desk.
            </p>
          </div>

          {reportType === 'safety' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 max-w-md mx-auto space-y-2">
              <strong>Reminder for Safety Hazards:</strong>
              <p>
                If this incident escalates or someone requires medical attention, call <strong>1199 (Kenya Red Cross)</strong> or <strong>999 / 112</strong> immediately.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setDescription('');
              }}
              className="px-5 py-2.5 rounded-xl bg-savannah-100 hover:bg-savannah-200 font-bold text-xs text-obsidian transition-colors"
            >
              Submit Another Report
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-bold text-xs shadow-sm transition-transform hover:scale-105"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-savannah-600">Loading Report Form...</div>}>
      <ReportContent />
    </Suspense>
  );
}
