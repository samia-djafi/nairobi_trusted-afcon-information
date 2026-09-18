'use client';

import React, { useState } from 'react';
import { AFCONInfoItem } from '@/types';
import VerificationBadge from '@/components/trust/VerificationBadge';
import { useApp } from '@/context/AppContext';
import { isItemSaved, saveItem, removeItem } from '@/lib/storage';
import { Bookmark, Building2, Clock, ChevronRight } from 'lucide-react';

interface InfoCardProps {
  item: AFCONInfoItem;
  onSelect: (item: AFCONInfoItem) => void;
}

export default function InfoCard({ item, onSelect }: InfoCardProps) {
  const { openSourceExplorer, refreshSavedCount } = useApp();
  const [saved, setSaved] = useState(() => isItemSaved(item.id));

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeItem(item.id);
      setSaved(false);
    } else {
      saveItem({
        id: item.id,
        type: 'answer',
        title: item.title,
        summary: item.summary,
        category: item.category,
        status: item.status,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        link: `/browse?id=${item.id}`,
      });
      setSaved(true);
    }
    refreshSavedCount();
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl border border-savannah-200 hover:border-earth-400 p-5 sm:p-6 shadow-sm hover:shadow-african-warm transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* African subtle corner marker */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-sun-500/20 to-transparent pointer-events-none rounded-tr-2xl" />

      <div>
        {/* Category & Trust Badge Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <VerificationBadge status={item.status} item={item} size="sm" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-earth-700 bg-earth-50 px-2 py-0.5 rounded border border-earth-200">
              {item.category.replace('_', ' ')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSave}
            title={saved ? 'Remove bookmark' : 'Bookmark item'}
            className={`p-1.5 rounded-lg border transition-colors ${
              saved
                ? 'bg-earth-50 border-earth-300 text-earth-600'
                : 'border-savannah-200 text-savannah-500 hover:text-obsidian hover:bg-savannah-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base sm:text-lg text-obsidian group-hover:text-earth-600 transition-colors line-clamp-2 leading-snug mb-2">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-savannah-700 line-clamp-2 leading-relaxed mb-4">
          {item.summary}
        </p>
      </div>

      {/* Footer: Source & Recency */}
      <div className="pt-3 border-t border-savannah-100 flex items-center justify-between text-xs text-savannah-600">
        <div className="flex items-center gap-1.5 truncate max-w-[200px]">
          <Building2 className="w-3.5 h-3.5 text-earth-500 shrink-0" />
          <span className="truncate">{item.source.institution}</span>
        </div>

        <div className="flex items-center gap-1 text-earth-600 font-bold group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
