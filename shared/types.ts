export enum ConsentPolicy {
  AI_ALLOWED = 'AI_ALLOWED',
  AI_RESTRICTED = 'AI_RESTRICTED',
  PLATFORM_ONLY = 'PLATFORM_ONLY',
}

export enum ConsentStatus {
  ACTIVE = 'active',
  SUPERSEDED = 'superseded',
  DELETED = 'deleted',
}

export interface ConsentRecord {
  id: number;
  image_hash: string;
  policy: ConsentPolicy;
  notes?: string;
  created_at: string; // ISO string
  status: ConsentStatus;
}

export interface VerificationResult {
  match: boolean;
  record?: ConsentRecord;
  confidence: number;
  policy: ConsentPolicy | 'NO_RECORD';
}

export interface ApiError {
  error: string;
}

export interface RegisterConsentResponse {
  success: true;
  consent_id: number;
  image_hash: string;
  policy: ConsentPolicy;
  timestamp: string;
}

export interface VerifyImageResponse {
  result: 'ALLOWED' | 'RESTRICTED' | 'NO_RECORD';
  confidence: number;
  matched_policy: ConsentPolicy | null;
  matched_at: string | null;
}
