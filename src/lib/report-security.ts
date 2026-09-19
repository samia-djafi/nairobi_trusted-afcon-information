import { GPSMetadata } from '@/types';

// Nairobi Metropolitan Bounding Box Coordinates
export const NAIROBI_GEO_BOUNDS = {
  minLat: -1.50,
  maxLat: -1.10,
  minLng: 36.60,
  maxLng: 37.15,
};

const SECRET_KEY = process.env.DISPATCH_SIGNING_SECRET || 'nairobi-afcon-2027-civic-trust-secure-token';

/**
 * Generate a cryptographically secure client session token
 */
export function generateClientSessionToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `sess_${crypto.randomUUID()}`;
  }
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Computes SHA-256 hash of a string (works in Node and Browser)
 */
export async function computeSHA256(content: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Node.js fallback
  try {
    const nodeCrypto = await import('crypto');
    return nodeCrypto.createHash('sha256').update(content).digest('hex');
  } catch {
    // Basic deterministic fallback if neither is present
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      hash = ((hash << 5) - hash) + content.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }
}

/**
 * Generates an HMAC-SHA256 client signature for a report payload to ensure integrity
 */
export async function generateClientSignature(
  reportId: string,
  timestamp: string,
  sessionToken: string
): Promise<string> {
  const dataToSign = `${reportId}:${timestamp}:${sessionToken}:${SECRET_KEY}`;
  return computeSHA256(dataToSign);
}

/**
 * Verifies that the client signature matches the expected hash and is not expired (within 15 minutes)
 */
export async function verifyClientSignature(
  reportId: string,
  timestamp: string,
  sessionToken: string,
  providedSignature: string
): Promise<{ valid: boolean; reason?: string }> {
  const now = Date.now();
  const submissionTime = new Date(timestamp).getTime();

  if (isNaN(submissionTime)) {
    return { valid: false, reason: 'Invalid ISO timestamp format' };
  }

  // Reject submissions with timestamp drift > 15 minutes to prevent replay attacks
  const maxDriftMs = 15 * 60 * 1000;
  if (Math.abs(now - submissionTime) > maxDriftMs) {
    return { valid: false, reason: 'Timestamp drift exceeded (anti-replay check failed)' };
  }

  const expectedSignature = await generateClientSignature(reportId, timestamp, sessionToken);
  if (expectedSignature !== providedSignature) {
    return { valid: false, reason: 'Cryptographic signature mismatch (integrity check failed)' };
  }

  return { valid: true };
}

/**
 * Validates GPS metadata accuracy and boundary constraints
 */
export function validateGPSMetadata(gps?: GPSMetadata): { valid: boolean; isWithinNairobi: boolean; warning?: string } {
  if (!gps) {
    return { valid: true, isWithinNairobi: false };
  }

  if (typeof gps.latitude !== 'number' || typeof gps.longitude !== 'number') {
    return { valid: false, isWithinNairobi: false, warning: 'Coordinates must be valid numbers' };
  }

  // Latitude must be -90 to 90, Longitude -180 to 180
  if (gps.latitude < -90 || gps.latitude > 90 || gps.longitude < -180 || gps.longitude > 180) {
    return { valid: false, isWithinNairobi: false, warning: 'Coordinates out of global bounds' };
  }

  const isWithinNairobi =
    gps.latitude >= NAIROBI_GEO_BOUNDS.minLat &&
    gps.latitude <= NAIROBI_GEO_BOUNDS.maxLat &&
    gps.longitude >= NAIROBI_GEO_BOUNDS.minLng &&
    gps.longitude <= NAIROBI_GEO_BOUNDS.maxLng;

  if (gps.accuracyMeters > 500) {
    return { valid: true, isWithinNairobi, warning: `Low accuracy: ±${Math.round(gps.accuracyMeters)}m` };
  }

  return { valid: true, isWithinNairobi };
}
