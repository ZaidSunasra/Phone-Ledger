/*
  Warnings:

  - You are about to drop the column `imei` on the `InventoryDevice` table. All the data in the column will be lost.
  - Added the required column `imei1` to the `InventoryDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryDevice" DROP COLUMN "imei",
ADD COLUMN     "imei1" TEXT NOT NULL,
ADD COLUMN     "imei2" TEXT;
