/*
  Warnings:

  - You are about to drop the column `buyerId` on the `InventoryDevice` table. All the data in the column will be lost.
  - You are about to drop the column `sellDate` on the `InventoryDevice` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `InventoryDevice` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'UPI', 'CARD', 'BANK_TRANSFER', 'CHEQUE', 'FINANCE', 'OTHER');

-- DropForeignKey
ALTER TABLE "InventoryDevice" DROP CONSTRAINT "InventoryDevice_buyerId_fkey";

-- DropIndex
DROP INDEX "InventoryDevice_buyerId_idx";

-- AlterTable
ALTER TABLE "InventoryDevice" DROP COLUMN "buyerId",
DROP COLUMN "sellDate",
DROP COLUMN "sellPrice";

-- CreateTable
CREATE TABLE "DeviceSale" (
    "id" UUID NOT NULL,
    "deviceId" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "sellPrice" DECIMAL(10,2) NOT NULL,
    "sellDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalePayment" (
    "id" UUID NOT NULL,
    "saleId" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "PaymentMethod" NOT NULL,
    "referenceNumber" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceSale_deviceId_key" ON "DeviceSale"("deviceId");

-- CreateIndex
CREATE INDEX "DeviceSale_buyerId_idx" ON "DeviceSale"("buyerId");

-- CreateIndex
CREATE INDEX "DeviceSale_sellDate_idx" ON "DeviceSale"("sellDate");

-- CreateIndex
CREATE INDEX "SalePayment_saleId_idx" ON "SalePayment"("saleId");

-- CreateIndex
CREATE INDEX "SalePayment_paidAt_idx" ON "SalePayment"("paidAt");

-- CreateIndex
CREATE INDEX "InventoryDevice_imei1_idx" ON "InventoryDevice"("imei1");

-- AddForeignKey
ALTER TABLE "DeviceSale" ADD CONSTRAINT "DeviceSale_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "InventoryDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceSale" ADD CONSTRAINT "DeviceSale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "DeviceSale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
