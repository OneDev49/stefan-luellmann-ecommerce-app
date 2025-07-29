/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "rating",
DROP COLUMN "reviewCount",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "fiveStarReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fourStarReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "oneStarReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "threeStarReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "twoStarReviews" INTEGER NOT NULL DEFAULT 0;
