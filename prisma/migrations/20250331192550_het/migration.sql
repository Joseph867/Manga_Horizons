/*
  Warnings:

  - You are about to drop the column `hash` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `cover` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `cover` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `page` table. All the data in the column will be lost.
  - Added the required column `filepath` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `manga` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_mangaId_fkey`;
DROP INDEX `Chapter_mangaId_key` ON `chapter`;

-- AlterTable
ALTER TABLE `chapter` DROP COLUMN `hash`,
    ADD COLUMN `filepath` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cover` DROP COLUMN `data`,
    DROP COLUMN `mimeType`;

-- AlterTable
ALTER TABLE `manga` MODIFY `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `page` DROP COLUMN `data`,
    DROP COLUMN `mimeType`;
