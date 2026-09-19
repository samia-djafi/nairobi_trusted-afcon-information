import { NextRequest, NextResponse } from 'next/server';
import { ReportDispatchPayload, ReportCategory } from '@/types';
import { verifyClientSignature, validateGPSMetadata } from '@/lib/report-security';
import { dispatchReportToAuthorities } from '@/lib/dispatch-service';

const VALID_CATEGORIES: ReportCategory[] = [
  'safety',
  'transport_hazard',
  'medical_emergency',
  'crowd_control',
  'incorrect_info',
  'broken_source',
  'other',
];

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const body: ReportDispatchPayload = await request.json();
    const {
      reportId,
      category,
      description,
      locationName,
      gps,
      attachments,
      contactInfo,
      timestamp,
      sessionToken,
      clientSignature,
    } = body;

    // 1. Structural validation
    if (!reportId || typeof reportId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "reportId"' }, { status: 400 });
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      return NextResponse.json(
        { error: 'Description must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (description.length > 3000) {
      return NextResponse.json(
        { error: 'Description exceeds maximum allowed size (3000 characters)' },
        { status: 400 }
      );
    }

    // 2. Cryptographic Session & Signature Verification
    if (!sessionToken || !clientSignature || !timestamp) {
      return NextResponse.json(
        { error: 'Missing security credentials (sessionToken, clientSignature, or timestamp)' },
        { status: 401 }
      );
    }

    const sigCheck = await verifyClientSignature(reportId, timestamp, sessionToken, clientSignature);
    if (!sigCheck.valid) {
      return NextResponse.json(
        { error: `Security verification failed: ${sigCheck.reason}` },
        { status: 401 }
      );
    }

    // 3. Geospatial GPS Validation
    if (gps) {
      const gpsCheck = validateGPSMetadata(gps);
      if (!gpsCheck.valid) {
        return NextResponse.json(
          { error: `GPS metadata invalid: ${gpsCheck.warning}` },
          { status: 400 }
        );
      }
    }

    // 4. Attachments Validation (Max 3 files, Max 5MB each)
    if (attachments && Array.isArray(attachments)) {
      if (attachments.length > 3) {
        return NextResponse.json(
          { error: 'Maximum of 3 media attachments allowed per report' },
          { status: 400 }
        );
      }

      for (const att of attachments) {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowedMimes.includes(att.mimeType)) {
          return NextResponse.json(
            { error: `Unsupported media format: ${att.mimeType}` },
            { status: 400 }
          );
        }
        if (att.sizeBytes > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: `Attachment ${att.filename} exceeds maximum size limit of 5MB` },
            { status: 400 }
          );
        }
      }
    }

    // 5. Dispatch to Authorities Gateway & Log Audit
    const dispatchResult = await dispatchReportToAuthorities(body, clientIp);

    return NextResponse.json(dispatchResult, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal dispatch error';
    console.error('[API Dispatch Error]:', error);
    return NextResponse.json({ error: 'Dispatch pipeline failure', details: message }, { status: 500 });
  }
}
