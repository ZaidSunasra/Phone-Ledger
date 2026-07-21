/*
  Warnings:

  - You are about to drop the column `subscriptionEndsAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionType` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "subscriptionEndsAt",
DROP COLUMN "subscriptionStatus",
DROP COLUMN "subscriptionType",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
