/*
  Warnings:

  - You are about to drop the `Make` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MakeToVehicleType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MakeToVehicleType" DROP CONSTRAINT "_MakeToVehicleType_A_fkey";

-- DropForeignKey
ALTER TABLE "_MakeToVehicleType" DROP CONSTRAINT "_MakeToVehicleType_B_fkey";

-- DropTable
DROP TABLE "Make";

-- DropTable
DROP TABLE "_MakeToVehicleType";

-- CreateTable
CREATE TABLE "VehicleMake" (
    "makeId" INTEGER NOT NULL,
    "makeName" TEXT NOT NULL,

    CONSTRAINT "VehicleMake_pkey" PRIMARY KEY ("makeId")
);

-- CreateTable
CREATE TABLE "_VehicleMakeToVehicleType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleMakeToVehicleType_AB_unique" ON "_VehicleMakeToVehicleType"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleMakeToVehicleType_B_index" ON "_VehicleMakeToVehicleType"("B");

-- AddForeignKey
ALTER TABLE "_VehicleMakeToVehicleType" ADD CONSTRAINT "_VehicleMakeToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES "VehicleMake"("makeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleMakeToVehicleType" ADD CONSTRAINT "_VehicleMakeToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleType"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;
