'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { AFCON_KNOWLEDGE_BASE } from '@/lib/knowledge-base';
import { X, Bell, CheckCheck, ExternalLink, ShieldAlert } from 'lucide-react';

export default function NotificationDrawer() {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationsAsRead,
    openSourceExplorer,
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsNotificationDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl border-l border-savannah-300 flex flex-col z-50 animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* African stripe top edge */}
        <div className="h-1.5 w-full bg-gradient-to-r from-earth-500 via-sun-500 to-rift-500" />

        <div className="p-5 border-b border-savannah-200 flex items-center justify-between bg-savannah-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-earth-100 text-earth-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-obsidian">
                Official Updates & Alerts
              </h2>
              <span className="text-xs text-savannah-600">
                AFCON 2027 Nairobi Live Dispatch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markNotificationsAsRead}
              title="Mark all as read"
              className="p-1.5 rounded-lg text-savannah-700 hover:text-obsidian hover:bg-savannah-200 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-rift-600" />
              <span className="hidden sm:inline">Mark read</span>
            </button>
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1.5 rounded-lg text-savannah-700 hover:text-obsidian hover:bg-savannah-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of notification alerts */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.map(item => {
            const kbMatch = AFCON_KNOWLEDGE_BASE.find(kb => kb.id === item.targetId);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  item.read
                    ? 'bg-white border-savannah-200 opacity-90'
                    : 'bg-sun-50/40 border-sun-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-earth-700">
                    {item.institution}
                  </span>
                  <span className="text-[11px] text-savannah-500 font-mono">
                    {item.timestamp}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-obsidian mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-savannah-700 mb-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-savannah-100">
                  <VerificationBadge status={item.status} size="sm" item={kbMatch} />

                  <Link
                    href={`/ask?q=${encodeURIComponent(item.title)}`}
                    onClick={() => setIsNotificationDrawerOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-earth-600 hover:text-earth-700"
                  >
                    <span>View Answer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info strip */}
        <div className="p-4 border-t border-savannah-200 bg-savannah-50/70 text-center">
          <Link
            href="/emergency"
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-earth-50 hover:bg-earth-100 border border-earth-200 text-earth-700 text-xs font-bold transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-earth-600" />
            <span>Emergency Contacts Directory (999 / 112)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
