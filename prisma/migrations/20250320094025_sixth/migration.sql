/*
  Warnings:

  - Added the required column `mimeType` to the `Cover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cover` ADD COLUMN `mimeType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `page` ADD COLUMN `mimeType` VARCHAR(191) NOT NULL;
