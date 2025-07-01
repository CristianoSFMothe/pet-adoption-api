/*
  Warnings:

  - Made the column `ownerAddressId` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerAddressId_fkey";

-- DropIndex
DROP INDEX "Pet_ownerAddressId_key";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "ownerAddressId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerAddressId_fkey" FOREIGN KEY ("ownerAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
