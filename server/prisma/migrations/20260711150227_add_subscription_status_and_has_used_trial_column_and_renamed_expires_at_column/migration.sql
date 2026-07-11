/*
  Warnings:

  - The values [FREE] on the enum `SubscriptionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `expiresAt` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `subscriptionEndsAt` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionStatus` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIAL', 'ACTIVE', 'CANCELLED', 'EXPIRED');

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionType_new" AS ENUM ('TRIAL', 'BASIC', 'PREMIUM');
ALTER TABLE "Organization" ALTER COLUMN "subscriptionType" TYPE "SubscriptionType_new" USING ("subscriptionType"::text::"SubscriptionType_new");
ALTER TYPE "SubscriptionType" RENAME TO "SubscriptionType_old";
ALTER TYPE "SubscriptionType_new" RENAME TO "SubscriptionType";
DROP TYPE "public"."SubscriptionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "expiresAt",
ADD COLUMN     "subscriptionEndsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasUsedTrial" BOOLEAN NOT NULL DEFAULT false;
