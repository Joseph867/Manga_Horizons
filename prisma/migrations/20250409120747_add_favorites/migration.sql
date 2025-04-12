-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `mangaId` INTEGER NOT NULL,

    UNIQUE INDEX `Favorite_userId_mangaId_key`(`userId`, `mangaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
