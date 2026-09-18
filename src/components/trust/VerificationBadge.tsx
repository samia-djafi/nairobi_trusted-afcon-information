'use client';

import React from 'react';
import { VerificationStatus, AFCONInfoItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Info } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  item?: AFCONInfoItem;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export const BADGE_CONFIG = {
  verified: {
    labelKey: 'verified' as const,
    icon: CheckCircle2,
    bgClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300',
    dotClass: 'bg-emerald-500 ring-emerald-300',
    ariaLabel: 'Verified by official institution',
  },
  recently_updated: {
    labelKey: 'recentlyUpdated' as const,
    icon: Clock,
    bgClass: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-300',
    dotClass: 'bg-sky-500 ring-sky-300',
    ariaLabel: 'Recently updated by official institution',
  },
  unverified: {
    labelKey: 'unverified' as const,
    icon: AlertTriangle,
    bgClass: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300',
    dotClass: 'bg-amber-500 ring-amber-300',
    ariaLabel: 'Unverified - not yet officially confirmed',
  },
  unverifiable: {
    labelKey: 'couldNotVerify' as const,
    icon: XCircle,
    bgClass: 'bg-red-50 hover:bg-red-100 text-red-800 border-red-300',
    dotClass: 'bg-red-500 ring-red-300',
    ariaLabel: 'Could not verify against official sources',
  },
};

export default function VerificationBadge({
  status,
  item,
  size = 'md',
  interactive = true,
  className = '',
}: VerificationBadgeProps) {
  const { language, openSourceExplorer } = useApp();
  const t = TRANSLATIONS[language]?.badges || TRANSLATIONS.en.badges;
  const config = BADGE_CONFIG[status] || BADGE_CONFIG.unverified;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3.5 py-1.5 gap-2',
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    if (interactive && item) {
      e.stopPropagation();
      openSourceExplorer(item);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!interactive || !item}
      aria-label={`${config.ariaLabel}. Click to view verification source.`}
      title={interactive && item ? 'Click to inspect official verification source & audit trail' : undefined}
      className={`inline-flex items-center rounded-full border transition-all duration-200 shadow-sm ${config.bgClass} ${sizeClasses} ${
        interactive && item ? 'cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-95' : 'cursor-default'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${config.dotClass}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotClass}`} />
      </span>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{t[config.labelKey]}</span>
      {interactive && item && (
        <Info className="w-3 h-3 opacity-60 ml-0.5" />
      )}
    </button>
  );
}
