import { NextRequest, NextResponse } from 'next/server';
import { AFCON_KNOWLEDGE_BASE } from '@/lib/knowledge-base';
import { Category, AFCONInfoItem } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';
  const category = searchParams.get('category') as Category | null;

  let results = [...AFCON_KNOWLEDGE_BASE];

  if (category) {
    results = results.filter(item => item.category === category);
  }

  if (q) {
    const words = q.split(/\s+/).filter(w => w.length > 2);
    results = results.filter(item => {
      const titleLower = item.title.toLowerCase();
      const summaryLower = item.summary.toLowerCase();
      const tags = item.tags.map(t => t.toLowerCase());

      return (
        titleLower.includes(q) ||
        summaryLower.includes(q) ||
        words.some(w => titleLower.includes(w) || tags.some(t => t.includes(w)))
      );
    });
  }

  return NextResponse.json({
    total: results.length,
    query: q,
    results,
  });
}
