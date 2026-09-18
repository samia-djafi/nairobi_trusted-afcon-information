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
