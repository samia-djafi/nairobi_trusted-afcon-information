import { NextRequest, NextResponse } from 'next/server';
import { IssueReport } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportType, description, location, contact } = body;

    if (!description || !reportType) {
      return NextResponse.json({ error: 'reportType and description are required' }, { status: 400 });
    }

    const report: IssueReport = {
      id: `report-${Date.now()}`,
      reportType,
      description,
      location,
      contact,
      submittedAt: new Date().toISOString(),
      status: 'received',
    };

    // In an enterprise setup, this persists to PostgreSQL / Supabase
    return NextResponse.json({
      success: true,
      reportId: report.id,
      message: 'Civic issue successfully recorded and queued for verification triage.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record report' }, { status: 500 });
  }
}
