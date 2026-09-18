'use client';

import React from 'react';
import Link from 'next/link';
import VerificationBadge from '@/components/trust/VerificationBadge';
import {
  PhoneCall,
  ShieldAlert,
  Hospital,
  AlertTriangle,
  MapPin,
  ExternalLink,
  HeartPulse,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function EmergencyPage() {
  const hotlines = [
    {
      title: 'National Emergency Dispatch',
      number: '999 / 112',
      tel: 'tel:999',
      desc: 'National Police Service, Fire & Rescue, and Central Ambulance Dispatch. Toll-free from any mobile network.',
      status: 'verified' as const,
      color: 'bg-red-600 hover:bg-red-700 text-white',
      badgeText: 'Highest Priority',
    },
    {
      title: 'Kenya Red Cross Ambulance Evacuation',
      number: '1199',
      tel: 'tel:1199',
      desc: 'Rapid paramedic emergency response, disaster medical triage, and emergency patient transport.',
      status: 'verified' as const,
      color: 'bg-earth-600 hover:bg-earth-700 text-white',
      badgeText: 'Toll-Free Direct',
    },
    {
      title: 'Nairobi Central Police Division',
      number: '020-2222181',
      tel: 'tel:0202222181',
      desc: 'Security incidents, emergency desk, tourist safety reporting, and lost child reunification.',
      status: 'verified' as const,
      color: 'bg-obsidian hover:bg-earth-900 text-white',
      badgeText: '24/7 Command',
    },
    {
      title: 'Nairobi City County Fire & Disaster Unit',
      number: '020-2222182',
      tel: 'tel:0202222182',
      desc: 'Fire suppression, structural safety issues, and hazardous spill containment.',
      status: 'verified' as const,
      color: 'bg-ember-600 hover:bg-ember-700 text-white',
      badgeText: 'County Operations',
    },
  ];

  const venueMedicalPosts = [
    {
      venue: 'Talanta Sports City (Jamhuri Grounds)',
      location: 'Behind Gate 4 & Pitch-Side Resuscitation Bay',
      staff: 'Kenyatta National Hospital Doctors & Red Cross Paramedics',
      features: 'Full trauma triage, 6 AED automated defibrillators, dedicated ambulance emergency egress route to Ngong Road.',
    },
    {
      venue: 'Moi International Sports Centre, Kasarani',
      location: 'Level 1 Concourse (Gates A & D) & Gate 1 Medical Bay',
      staff: 'Nairobi Hospital Trauma Response & St John Ambulance',
      features: 'Mobile field ICU, 8 first-aid posts, helipad emergency airlift clearance.',
    },
    {
      venue: 'Nyayo National Stadium',
      location: 'Main Stand VIP Lower Concourse & South Bleachers First Aid Post',
      staff: 'Kenya Red Cross Emergency Unit',
      features: 'Direct 6-minute emergency transit corridor to Kenyatta National Hospital via Aerodrome Road.',
    },
  ];

  const nearbyHospitals = [
    { name: 'Kenyatta National Hospital (KNH)', type: 'Level 6 National Referral Hospital', distance: '3.2 km from Nyayo / 8.5 km from Talanta', phone: '+254 20 2726300' },
    { name: 'The Nairobi Hospital', type: 'Private Tertiary Trauma Centre', distance: '4.8 km from Nyayo / 6.2 km from Talanta', phone: '+254 20 2845000' },
    { name: 'Aga Khan University Hospital', type: 'Private Tertiary Hospital (Parklands)', distance: '7.5 km from Kasarani via Thika Road', phone: '+254 20 3662000' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 border border-red-300 text-red-900 text-xs font-black uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Priority Civic Safety Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-obsidian tracking-tight">
          AFCON 2027 Nairobi Emergency Directory
        </h1>
        <p className="text-sm sm:text-base text-savannah-700 max-w-xl mx-auto">
          In an emergency, do not wait for AI answers or search results. Use the verified, 1-tap direct dial numbers below.
        </p>
      </div>

      {/* 1-Tap Direct Hotlines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hotlines.map((hotline, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border-2 border-savannah-200 p-6 sm:p-7 shadow-african-warm flex flex-col justify-between space-y-4 hover:border-earth-500 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-earth-700 bg-earth-50 px-2.5 py-0.5 rounded border border-earth-200">
                  {hotline.badgeText}
                </span>
                <VerificationBadge status={hotline.status} size="sm" interactive={false} />
              </div>

              <h2 className="text-xl font-extrabold text-obsidian">
                {hotline.title}
              </h2>
              <p className="text-xs text-savannah-700 leading-relaxed">
                {hotline.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-savannah-100">
              <a
                href={hotline.tel}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all hover:scale-102 active:scale-98 ${hotline.color}`}
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span>Call {hotline.number}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Stadium First-Aid & Medical Triage Points */}
      <section className="bg-white rounded-3xl border border-savannah-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-earth-600">
            On-Site Emergency Care
          </span>
          <h2 className="text-2xl font-extrabold text-obsidian flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-red-600" />
            <span>Stadium Medical Triage Posts</span>
          </h2>
          <p className="text-xs text-savannah-700">
            Medical care at all on-site stadium triage posts is completely free of charge for spectators.
          </p>
        </div>

        <div className="space-y-4">
          {venueMedicalPosts.map((post, i) => (
            <div key={i} className="p-5 rounded-2xl bg-savannah-50/60 border border-savannah-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-extrabold text-base text-obsidian">
                  {post.venue}
                </h3>
                <span className="text-xs font-mono font-bold text-earth-700">
                  {post.location}
                </span>
              </div>
              <p className="text-xs font-semibold text-savannah-800">
                Staffed by: {post.staff}
              </p>
              <p className="text-xs text-savannah-600 leading-relaxed">
                {post.features}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tertiary Referral Hospitals */}
      <section className="bg-white rounded-3xl border border-savannah-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-earth-600">
            Designated Trauma Facilities
          </span>
          <h2 className="text-xl font-extrabold text-obsidian flex items-center gap-2">
            <Hospital className="w-5 h-5 text-earth-600" />
            <span>Designated AFCON Emergency Hospitals</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {nearbyHospitals.map((hosp, i) => (
            <div key={i} className="p-4 rounded-xl border border-savannah-200 bg-savannah-50/40 space-y-1.5">
              <h3 className="font-bold text-obsidian">{hosp.name}</h3>
              <p className="text-savannah-600">{hosp.type}</p>
              <p className="text-earth-700 font-semibold">{hosp.distance}</p>
              <a href={`tel:${hosp.phone.replace(/[^0-9+]/g, '')}`} className="inline-block text-earth-600 hover:underline font-bold pt-1">
                {hosp.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Reporting Reminder */}
      <div className="p-6 rounded-2xl bg-earth-50 border border-earth-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-earth-900">
          <strong className="block text-sm font-bold mb-0.5">Want to document or report a non-critical hazard?</strong>
          <span>Submit a report to our civic integrity desk to help alert fellow spectators and update authorities.</span>
        </div>
        <Link
          href="/report?type=safety"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-bold transition-all shadow-sm"
        >
          Report Safety Concern →
        </Link>
      </div>

    </div>
  );
}
