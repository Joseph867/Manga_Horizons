/*
  Warnings:

  - You are about to drop the column `name` on the `manga` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `manga` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `manga` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[author]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Manga_name_key` ON `manga`;

-- AlterTable
ALTER TABLE `manga` DROP COLUMN `name`,
    DROP COLUMN `type`,
    DROP COLUMN `url`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Cover` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `mangaId` INTEGER NOT NULL,

    UNIQUE INDEX `Cover_mangaId_key`(`mangaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `pageCount` INTEGER NOT NULL,
    `mangaId` INTEGER NOT NULL,

    UNIQUE INDEX `Chapter_mangaId_key`(`mangaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `chapterId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Manga_author_key` ON `Manga`(`author`);

-- AddForeignKey
ALTER TABLE `Cover` ADD CONSTRAINT `Cover_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
