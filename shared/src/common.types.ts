export type User = {
    name: string;
    id: string;
    email: string;
    password: string;
    hasUsedTrial: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type VerificationRequest = {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    passwordHash: string | null;
    otpHash: string;
    resendAvailableAt: Date;
    expiresAt: Date;
}

export type SuccessResponse = {
    message: string
}

export type ErrorResponse = {
    message: string,
    error?: any
}
