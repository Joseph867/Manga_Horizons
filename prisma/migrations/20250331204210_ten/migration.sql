/*
  Warnings:

  - You are about to drop the column `filepath` on the `chapter` table. All the data in the column will be lost.
  - Added the required column `filepath` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chapter` DROP COLUMN `filepath`;

-- AlterTable
ALTER TABLE `manga` ADD COLUMN `filepath` VARCHAR(191) NOT NULL;
