export type VerificationStatus = 'verified' | 'recently_updated' | 'unverified' | 'unverifiable';

export type Category = 'transport' | 'venues' | 'safety' | 'public_services';

export type Language = 'en' | 'sw' | 'fr';

export interface AuditStep {
  stage: string;
  timestamp: string;
  note: string;
  officerOrSystem?: string;
}

export interface SourceInfo {
  institution: string;
  department?: string;
  publishedDate: string;
  lastVerifiedDate: string;
  sourceUrl: string;
  officialDocReference?: string;
  auditTrail: AuditStep[];
}

export interface NextStepAction {
  label: string;
  actionType: 'link' | 'call' | 'route' | 'report' | 'directions';
  target: string;
  isPrimary?: boolean;
}

export interface AFCONInfoItem {
  id: string;
  title: string;
  category: Category;
  summary: string;
  fullAnswer: string;
  status: VerificationStatus;
  statusReason?: string;
  source: SourceInfo;
  nextSteps: NextStepAction[];
  tags: string[];
  relatedQuestionIds: string[];
  lastUpdatedRelative?: string;
}

export interface OfficialAnnouncement {
  id: string;
  title: string;
  institution: string;
  date: string;
  category: Category;
  status: VerificationStatus;
  originalText: string;
  plainExplanation: string;
  keyPoints: string[];
  whoIsAffected: string;
  whenItApplies: string;
  requiredAction: string;
  sourceUrl: string;
}

export interface SavedItem {
  id: string;
  type: 'answer' | 'explanation' | 'emergency';
  title: string;
  summary: string;
  category: Category;
  status: VerificationStatus;
  savedAt: string;
  link: string;
}

export interface IssueReport {
  id: string;
  reportType: 'safety' | 'incorrect_info' | 'broken_source' | 'other';
  description: string;
  location?: string;
  contact?: string;
  submittedAt: string;
  status: 'received' | 'triaging';
}

export interface NotificationAlert {
  id: string;
  title: string;
  summary: string;
  category: Category;
  institution: string;
  timestamp: string;
  status: VerificationStatus;
  targetId: string;
  isEmergency?: boolean;
  read: boolean;
}

// ----------------------------------------------------
// Core Module 1: Offline-First & Sync Types
// ----------------------------------------------------
export type SyncOperation = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncStatus = 'pending' | 'syncing' | 'synced' | 'failed';

export interface SyncQueueItem {
  id: string;
  operation: SyncOperation;
  entityType: 'saved_item' | 'chat_message' | 'report';
  payload: any;
  createdAt: string;
  lastAttemptAt?: string;
  retryCount: number;
  status: SyncStatus;
  errorMessage?: string;
}

export interface AIChatMessage {
  id: string;
  sessionId: string;
  query: string;
  answer: string;
  category?: Category;
  status: VerificationStatus;
  timestamp: string;
  tokensUsed?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  sources?: SourceInfo[];
}

// ----------------------------------------------------
// Core Module 2: Real Incident Reporting & Dispatch Types
// ----------------------------------------------------
export type ReportCategory =
  | 'safety'
  | 'transport_hazard'
  | 'medical_emergency'
  | 'crowd_control'
  | 'incorrect_info'
  | 'broken_source'
  | 'other';

export interface GPSMetadata {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  altitudeMeters?: number | null;
  headingDegrees?: number | null;
  speedMps?: number | null;
  timestamp: string;
}

export interface MediaAttachment {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  base64Data?: string;
  sha256Hash: string;
}

export interface ReportDispatchPayload {
  reportId: string;
  category: ReportCategory;
  description: string;
  locationName?: string;
  gps?: GPSMetadata;
  attachments?: MediaAttachment[];
  contactInfo?: string;
  timestamp: string;
  sessionToken: string;
  clientSignature: string;
}

export type DeliveryStatus = 'pending' | 'transmitted' | 'acknowledged' | 'failed';

export interface DispatchResult {
  success: boolean;
  reportId: string;
  trackingNumber: string;
  acknowledgmentId: string;
  deliveryStatus: DeliveryStatus;
  routedAgencies: string[];
  slaResponseMinutes: number;
  timestamp: string;
  auditHash: string;
  hotlineEscalation?: string;
  message: string;
}

export interface AuditLogEntry {
  auditId: string;
  reportId: string;
  category: string;
  receivedAt: string;
  clientIpHash: string;
  sessionTokenMasked: string;
  gpsCoordinates?: { lat: number; lng: number };
  rawPayloadHash: string;
  dispatchedTo: string[];
  acknowledgmentRef: string;
  status: DeliveryStatus;
}

// ----------------------------------------------------
// Core Module 3: AI Ask & Streaming Types
// ----------------------------------------------------
export interface AIQueryPayload {
  query: string;
  categoryScope?: Category | 'all';
  sessionToken?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latencyMs: number;
}

