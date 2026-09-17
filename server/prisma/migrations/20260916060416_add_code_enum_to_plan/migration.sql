/*
  Warnings:

  - Changed the type of `code` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlanCode" AS ENUM ('FREE', 'BASIC_MONTHLY', 'BASIC_YEARLY');

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "code",
ADD COLUMN     "code" "PlanCode" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");
