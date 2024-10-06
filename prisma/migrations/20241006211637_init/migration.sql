-- CreateTable
CREATE TABLE "Make" (
    "makeId" INTEGER NOT NULL,
    "makeName" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("makeId")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "typeId" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "_MakeToVehicleType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MakeToVehicleType_AB_unique" ON "_MakeToVehicleType"("A", "B");

-- CreateIndex
CREATE INDEX "_MakeToVehicleType_B_index" ON "_MakeToVehicleType"("B");

-- AddForeignKey
ALTER TABLE "_MakeToVehicleType" ADD CONSTRAINT "_MakeToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES "Make"("makeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MakeToVehicleType" ADD CONSTRAINT "_MakeToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleType"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;
