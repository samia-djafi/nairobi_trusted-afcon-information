'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  Sparkles,
  Camera,
  Crosshair,
  RefreshCw,
  Clock,
  Building,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  ReportCategory,
  ReportDispatchPayload,
  GPSMetadata,
  MediaAttachment,
  DispatchResult,
  DeliveryStatus,
} from '@/types';
import {
  generateClientSessionToken,
  generateClientSignature,
  validateGPSMetadata,
  computeSHA256,
} from '@/lib/report-security';
import { submitReportWithRetry } from '@/lib/retry-queue';
import { saveReport } from '@/lib/storage';

function ReportContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as ReportCategory) || 'safety';
  const initialVenue = searchParams.get('venue') || '';

  const [category, setCategory] = useState<ReportCategory>(initialType);
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState(initialVenue ? `${initialVenue} Stadium` : '');
  const [contactInfo, setContactInfo] = useState('');

  // GPS Metadata State
  const [gpsData, setGpsData] = useState<GPSMetadata | null>(null);
  const [isAcquiringGps, setIsAcquiringGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Attachments State
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const [isProcessingMedia, setIsProcessingMedia] = useState(false);

  // Dispatch & Delivery Tracking State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('pending');
  const [statusMessage, setStatusMessage] = useState('');
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);

  const reportTypes = [
    {
      id: 'safety',
      label: 'Safety Concern',
      desc: 'Active crowd hazard, perimeter breach, security risk, or medical urgency',
      icon: ShieldAlert,
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 'transport_hazard',
      label: 'Transit / Road Hazard',
      desc: 'Road closure, matatu disruption, shuttle diversion, or gridlock',
      icon: AlertTriangle,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'incorrect_info',
      label: 'Incorrect Official Information',
      desc: 'Discrepancy in timetable, ticket pricing, gate times, or venue rules',
      icon: FileWarning,
      badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    },
    {
      id: 'broken_source',
      label: 'Broken / Obsolete Source',
      desc: 'Official gazette link is dead, inaccessible, or contradictory',
      icon: Link2Off,
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'other',
      label: 'General Feedback / Inquiries',
      desc: 'Civic query, language translation request, or general observation',
      icon: HelpCircle,
      badgeColor: 'bg-savannah-100 text-savannah-800 border-savannah-300',
    },
  ];

  // Geolocation Capture
  const handleAcquireLocation = () => {
    if (!('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported by your device browser.');
      return;
    }

    setIsAcquiringGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const metadata: GPSMetadata = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracyMeters: Math.round(pos.coords.accuracy),
          altitudeMeters: pos.coords.altitude ? Math.round(pos.coords.altitude) : null,
          headingDegrees: pos.coords.heading,
          speedMps: pos.coords.speed,
          timestamp: new Date(pos.timestamp).toISOString(),
        };

        const validation = validateGPSMetadata(metadata);
        if (!validation.valid) {
          setGpsError(validation.warning || 'Invalid coordinates detected.');
        } else {
          setGpsData(metadata);
        }
        setIsAcquiringGps(false);
      },
      (err) => {
        setGpsError(`GPS Error: ${err.message}. Please verify location permissions.`);
        setIsAcquiringGps(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  // Media Attachment Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachments.length >= 3) {
      alert('Maximum of 3 media attachments allowed per report.');
      return;
    }

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setIsProcessingMedia(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const sha256Hash = await computeSHA256(base64Data);

        const newAttachment: MediaAttachment = {
          filename: file.name,
          mimeType: file.type || 'image/jpeg',
          sizeBytes: file.size,
          base64Data,
          sha256Hash,
        };

        setAttachments((prev) => [...prev, newAttachment]);
        setIsProcessingMedia(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setIsProcessingMedia(false);
      alert('Failed to process attachment.');
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Submission Pipeline
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || description.length < 5) return;

    setIsSubmitting(true);
    setStatusMessage('Preparing cryptographically secured dispatch payload...');

    try {
      const reportId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const timestamp = new Date().toISOString();
      const sessionToken = generateClientSessionToken();
      const clientSignature = await generateClientSignature(reportId, timestamp, sessionToken);

      const payload: ReportDispatchPayload = {
        reportId,
        category,
        description: description.trim(),
        locationName: locationName.trim() || undefined,
        gps: gpsData || undefined,
        attachments: attachments.length > 0 ? attachments : undefined,
        contactInfo: contactInfo.trim() || undefined,
        timestamp,
        sessionToken,
        clientSignature,
      };

      // Also save locally
      saveReport({
        id: reportId,
        reportType: category === 'transport_hazard' ? 'safety' : (category as any),
        description: description.trim(),
        location: locationName.trim() || (gpsData ? `GPS: ${gpsData.latitude.toFixed(4)}, ${gpsData.longitude.toFixed(4)}` : undefined),
        contact: contactInfo.trim() || undefined,
        submittedAt: timestamp,
        status: 'received',
      });

      // Submit with exponential backoff retry and live state tracking
      const result = await submitReportWithRetry(payload, {
        onStatusUpdate: (status, attempt, msg) => {
          setDeliveryStatus(status);
          if (msg) setStatusMessage(msg);
        },
      });

      setDispatchResult(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setStatusMessage(`Error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>Real-Time Local Authorities Dispatch Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-obsidian tracking-tight">
          Report an Issue or Safety Concern
        </h1>
        <p className="text-sm sm:text-base text-savannah-700 max-w-lg mx-auto">
          Submissions are cryptographically signed, timestamped, and dispatched directly to designated Kenyan public authority command centers (NPS, KeNHA, KRCS).
        </p>
      </div>

      {/* Immediate Emergency Warning Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-600 to-earth-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <PhoneCall className="w-6 h-6 text-sun-300 shrink-0 hidden sm:block animate-bounce" />
          <div className="text-xs sm:text-sm">
            <strong className="block font-bold">Is there immediate danger or medical urgency?</strong>
            <span>Do not wait for form processing. Call national emergency dispatch directly.</span>
          </div>
        </div>

        <a
          href="tel:999"
          className="shrink-0 px-4 py-2 rounded-xl bg-white text-red-700 hover:bg-red-50 text-xs font-black shadow-sm transition-transform hover:scale-105"
        >
          Call 999 / 112 / 1199 Now
        </a>
      </div>

      {!dispatchResult ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-savannah-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* 1. Category Selector */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 block">
              1. Incident Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = category === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setCategory(type.id as ReportCategory)}
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

          {/* 2. Description */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center justify-between">
              <span>2. Description of the issue *</span>
              <span className="text-[11px] text-savannah-500">Minimum 5 characters</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident with specific facts (e.g. 'Route diversion on Thika Road near Kasarani Gate 2 due to fallen barrier')..."
              className="w-full p-4 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none leading-relaxed"
            />
          </div>

          {/* 3. Geospatial GPS Coordinates */}
          <div className="space-y-3 p-4 rounded-2xl bg-savannah-50/60 border border-savannah-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-earth-600" />
                <span>Precise Geospatial GPS Metadata</span>
              </label>

              <button
                type="button"
                onClick={handleAcquireLocation}
                disabled={isAcquiringGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-earth-50 border border-earth-300 text-earth-700 text-xs font-bold transition-all disabled:opacity-50 self-start sm:self-auto"
              >
                {isAcquiringGps ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Acquiring GPS...</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>{gpsData ? 'Re-acquire GPS' : 'Capture Current Location'}</span>
                  </>
                )}
              </button>
            </div>

            {gpsData ? (
              <div className="p-3 rounded-xl bg-white border border-emerald-300 text-xs text-obsidian flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono">
                    Lat: <strong>{gpsData.latitude.toFixed(5)}</strong>, Lng: <strong>{gpsData.longitude.toFixed(5)}</strong> (±{gpsData.accuracyMeters}m)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Nairobi Region Verified
                </span>
              </div>
            ) : gpsError ? (
              <p className="text-xs text-red-600 font-medium">{gpsError}</p>
            ) : (
              <p className="text-xs text-savannah-600">
                Optional: Click &apos;Capture Current Location&apos; to append verified coordinates to the authority dispatch payload.
              </p>
            )}
          </div>

          {/* 4. Location Name & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-earth-600" />
                <span>Venue or Landmark Name</span>
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Kasarani Stadium, Gate 4"
                className="w-full p-3 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-earth-600" />
                <span>Contact Email or Phone</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="For status updates or authority inquiries"
                className="w-full p-3 rounded-xl border border-savannah-300 focus:border-earth-500 focus:ring-2 focus:ring-earth-100 bg-savannah-50/40 text-sm text-obsidian focus:outline-none"
              />
            </div>
          </div>

          {/* 5. Media Attachments */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-savannah-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-earth-600" />
                <span>Media Attachments (Optional - Max 3)</span>
              </span>
              <span className="text-[11px] text-savannah-500">{attachments.length}/3 attached</span>
            </label>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-savannah-100 border border-savannah-300 text-xs text-obsidian"
                  >
                    <span className="font-medium truncate max-w-[150px]">{att.filename}</span>
                    <span className="text-savannah-500 text-[10px]">({Math.round(att.sizeBytes / 1024)} KB)</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {attachments.length < 3 && (
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-savannah-50 border border-dashed border-savannah-400 text-savannah-700 text-xs font-bold cursor-pointer transition-colors">
                <Camera className="w-4 h-4 text-earth-600" />
                <span>{isProcessingMedia ? 'Hashing Attachment...' : 'Upload Photo / Evidence'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isProcessingMedia}
                />
              </label>
            )}
          </div>

          {/* Submission Status & Button */}
          <div className="pt-4 border-t border-savannah-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-savannah-600 text-center sm:text-left">
              {isSubmitting ? (
                <div className="flex items-center gap-2 text-earth-700 font-semibold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{statusMessage || 'Transmitting to authority gateway...'}</span>
                </div>
              ) : (
                <span>Payload is cryptographically signed and routed to accredited authorities.</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || description.trim().length < 5}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-earth-600 hover:bg-earth-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Report to Authorities'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Real Dispatch Acknowledgment Confirmation Card */
        <div className="bg-white rounded-3xl border-2 border-emerald-400 p-8 sm:p-12 text-center space-y-6 shadow-african-warm animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              {dispatchResult.deliveryStatus === 'acknowledged' ? 'Officially Acknowledged' : 'Transmitted to Command Queue'}
            </span>
            <h2 className="text-2xl font-extrabold text-obsidian">
              Report Dispatched to Authorities
            </h2>
            <p className="text-sm text-savannah-700 leading-relaxed">
              {dispatchResult.message}
            </p>
          </div>

          {/* Dispatch Metadata Box */}
          <div className="max-w-lg mx-auto p-5 rounded-2xl bg-savannah-50/80 border border-savannah-300 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-savannah-200 pb-2">
              <span className="font-bold text-savannah-600">Official Tracking No:</span>
              <span className="font-mono font-bold text-earth-700 text-sm">{dispatchResult.trackingNumber}</span>
            </div>

            <div className="flex items-center justify-between border-b border-savannah-200 pb-2">
              <span className="font-bold text-savannah-600">Authority Ack ID:</span>
              <span className="font-mono text-obsidian font-semibold">{dispatchResult.acknowledgmentId}</span>
            </div>

            <div className="flex items-center justify-between border-b border-savannah-200 pb-2">
              <span className="font-bold text-savannah-600">Routed Command Desks:</span>
              <span className="text-right text-obsidian font-bold">
                {dispatchResult.routedAgencies.join(' • ')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-savannah-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-earth-600" />
                <span>Response SLA:</span>
              </span>
              <span className="font-bold text-emerald-700">
                Within {dispatchResult.slaResponseMinutes} Minutes
              </span>
            </div>
          </div>

          {dispatchResult.hotlineEscalation && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 max-w-lg mx-auto space-y-1 text-left">
              <strong>Emergency Services Escalation:</strong>
              <p>
                For immediate life-safety or urgent field response, dial <strong>{dispatchResult.hotlineEscalation}</strong>.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setDispatchResult(null);
                setDescription('');
                setAttachments([]);
                setGpsData(null);
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
    <Suspense fallback={<div className="p-12 text-center text-savannah-600">Loading Incident Dispatch Pipeline...</div>}>
      <ReportContent />
    </Suspense>
  );
}
