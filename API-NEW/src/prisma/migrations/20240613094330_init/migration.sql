/*
  Warnings:

  - You are about to drop the column `img_small` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "img_small",
ADD COLUMN     "img_urls" TEXT[];
