/*
  Warnings:

  - You are about to drop the column `filepath` on the `manga` table. All the data in the column will be lost.
  - Added the required column `filepath` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filepath` to the `Cover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filepath` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chapter` ADD COLUMN `filepath` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cover` ADD COLUMN `filepath` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `manga` DROP COLUMN `filepath`;

-- AlterTable
ALTER TABLE `page` ADD COLUMN `filepath` VARCHAR(191) NOT NULL;
