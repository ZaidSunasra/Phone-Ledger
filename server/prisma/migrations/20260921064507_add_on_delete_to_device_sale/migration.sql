-- DropForeignKey
ALTER TABLE "DeviceSale" DROP CONSTRAINT "DeviceSale_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "DeviceSale" ADD CONSTRAINT "DeviceSale_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "InventoryDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
