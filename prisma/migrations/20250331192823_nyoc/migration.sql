-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
