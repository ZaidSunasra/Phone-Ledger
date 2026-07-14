/*
  Warnings:

  - Added the required column `resendAvailableAt` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "resendAvailableAt" TIMESTAMP(3) NOT NULL;
