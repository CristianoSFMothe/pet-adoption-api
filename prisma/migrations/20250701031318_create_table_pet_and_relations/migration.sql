-- CreateEnum
CREATE TYPE "CoatType" AS ENUM ('SHORT', 'MEDIUM', 'LONG', 'WIRE', 'CURLY', 'SILKY', 'FLUFFY', 'HAIRLESS');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT,
    "isPurebred" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT,
    "coatType" "CoatType",
    "age" INTEGER NOT NULL,
    "description" TEXT,
    "isAvailableForAdoption" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "ownerId" TEXT NOT NULL,
    "ownerAddressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_ownerAddressId_key" ON "Pet"("ownerAddressId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerAddressId_fkey" FOREIGN KEY ("ownerAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
