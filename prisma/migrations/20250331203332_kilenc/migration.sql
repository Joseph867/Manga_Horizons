/*
  Warnings:

  - You are about to drop the column `hash` on the `cover` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cover` DROP COLUMN `hash`;

-- AlterTable
ALTER TABLE `page` DROP COLUMN `hash`;
