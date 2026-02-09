export const ConsentPolicy = {
    AI_ALLOWED: 'AI_ALLOWED',
    AI_RESTRICTED: 'AI_RESTRICTED',
    PLATFORM_ONLY: 'PLATFORM_ONLY',
} as const;

export type ConsentPolicy = (typeof ConsentPolicy)[keyof typeof ConsentPolicy];

export const ConsentStatus = {
    ACTIVE: 'active',
    SUPERSEDED: 'superseded',
    DELETED: 'deleted',
} as const;

export type ConsentStatus = (typeof ConsentStatus)[keyof typeof ConsentStatus];

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
    result?: 'ALLOWED' | 'RESTRICTED' | 'NO_RECORD';
    matched_policy?: ConsentPolicy | null;
    matched_at?: string | null;
}

export interface RegisterConsentResponse {
    success: true;
    consent_id: number;
    image_hash: string;
    policy: ConsentPolicy;
    timestamp: string;
}

export interface VerifyImageResponse extends VerificationResult {
    // Extends VerificationResult to match backend response structure
}
