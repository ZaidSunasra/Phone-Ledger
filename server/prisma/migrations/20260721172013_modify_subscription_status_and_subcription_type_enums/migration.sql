/*
  Warnings:

  - The values [TRIAL] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [BASIC,PREMIUM] on the enum `SubscriptionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED');
ALTER TABLE "UserSubscription" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionType_new" AS ENUM ('TRIAL', 'PROFESSIONAL');
ALTER TABLE "UserSubscription" ALTER COLUMN "type" TYPE "SubscriptionType_new" USING ("type"::text::"SubscriptionType_new");
ALTER TYPE "SubscriptionType" RENAME TO "SubscriptionType_old";
ALTER TYPE "SubscriptionType_new" RENAME TO "SubscriptionType";
DROP TYPE "public"."SubscriptionType_old";
COMMIT;
