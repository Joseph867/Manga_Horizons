-- CreateTable
CREATE TABLE `Progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `mangaId` INTEGER NOT NULL,
    `chapterId` INTEGER NOT NULL,
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Progress_userId_mangaId_key`(`userId`, `mangaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
