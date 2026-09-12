/*
  Warnings:

  - The values [RESERVED] on the enum `InventoryStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROFESSIONAL] on the enum `SubscriptionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InventoryStatus_new" AS ENUM ('IN_STOCK', 'SOLD');
ALTER TABLE "public"."InventoryDevice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "InventoryDevice" ALTER COLUMN "status" TYPE "InventoryStatus_new" USING ("status"::text::"InventoryStatus_new");
ALTER TYPE "InventoryStatus" RENAME TO "InventoryStatus_old";
ALTER TYPE "InventoryStatus_new" RENAME TO "InventoryStatus";
DROP TYPE "public"."InventoryStatus_old";
ALTER TABLE "InventoryDevice" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionType_new" AS ENUM ('TRIAL', 'BASIC');
ALTER TYPE "SubscriptionType" RENAME TO "SubscriptionType_old";
ALTER TYPE "SubscriptionType_new" RENAME TO "SubscriptionType";
DROP TYPE "public"."SubscriptionType_old";
COMMIT;
