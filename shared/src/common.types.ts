export type User = {
    name: string;
    email: string;
    password: string;
    id: string;
    trialStartedAt: Date | null;
    trialEndsAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export type VerificationRequest = {
    name: string | null;
    email: string;
    resendAvailableAt: Date;
    id: string;
    createdAt: Date;
    passwordHash: string | null;
    otpHash: string;
    expiresAt: Date;
    verifiedAt: Date | null;
}

export type SuccessResponse = {
    message: string
}

export type ErrorResponse = {
    message: string,
    error?: any
}

export type Author = {
    id: string,
    name: string,
    email: string,
    hasUsedTrial: boolean
}