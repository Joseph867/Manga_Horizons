-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 08:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ikt_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `id` int(11) NOT NULL,
  `mangaId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `filepath` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`id`, `mangaId`, `name`, `filepath`) VALUES
(1, 9, 'chapter-1', 'manga/one_piece/chapters/chap1/01.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cover`
--

CREATE TABLE `cover` (
  `id` int(11) NOT NULL,
  `mangaId` int(11) NOT NULL,
  `filepath` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cover`
--

INSERT INTO `cover` (`id`, `mangaId`, `filepath`) VALUES
(3, 9, 'manga/one_piece/OP.png'),
(6, 10, 'manga/my_hero_academia/MHA.png'),
(7, 11, 'manga/dandadan/DDD.png'),
(8, 12, 'manga/demon_slayer/DS.png'),
(9, 13, 'manga/blue_lock/BL.png');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `mangaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manga`
--

CREATE TABLE `manga` (
  `id` int(11) NOT NULL,
  `author` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `manga`
--

INSERT INTO `manga` (`id`, `author`, `description`, `title`) VALUES
(9, 'Eiichiro Oda', 'A great pirate adventure', 'One Piece'),
(10, 'Kohei Horikoshi', 'hero story', 'My Hero academia'),
(11, 'Yukinobu Tatsu', 'yokai and alien', 'Dandadan'),
(12, 'Koyoharu Gotouge', 'Hunt the demons', 'Demon Slayer'),
(13, 'Muneyuki Kaneshiro', 'Football', 'Blue Lock');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `chapterId` int(11) NOT NULL,
  `filepath` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `chapterId`, `filepath`) VALUES
(2, 1, 'manga/one_piece/chapters/chap1/02.jpg'),
(3, 1, 'manga/one_piece/chapters/chap1/03.jpg'),
(4, 1, 'manga/one_piece/chapters/chap1/04.jpg'),
(5, 1, 'manga/one_piece/chapters/chap1/05.jpg'),
(6, 1, 'manga/one_piece/chapters/chap1/06.jpg'),
(7, 1, 'manga/one_piece/chapters/chap1/07.jpg'),
(8, 1, 'manga/one_piece/chapters/chap1/08.jpg'),
(9, 1, 'manga/one_piece/chapters/chap1/09.jpg'),
(10, 1, 'manga/one_piece/chapters/chap1/10.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `mangaId` int(11) NOT NULL,
  `chapterId` int(11) NOT NULL,
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `token` varchar(191) NOT NULL,
  `expiration` datetime(3) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`token`, `expiration`, `userId`) VALUES
('21f153f2f1dc593ae5af91be4f70deb6a79f9eb53536bbafbe55e7ef1010de7e', '2025-04-09 14:54:10.265', 3),
('9324bc76eed947b2c030345321d4eca11f86d144fbec9a6d1fa902230bbf5e3a', '2025-04-09 14:53:51.295', 3),
('9cfeb39614bc7011288966aef807810ff3ad850ee0545ed9b4c5d3de5154d212', '2025-04-09 14:35:32.003', 3),
('be41f24dfc55ec2ba0d76ab42c3a5633a8bbe4cb3044e15b23c4f859777ff3ee', '2025-04-08 12:50:39.622', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `password` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `profilename` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `password`, `email`, `profilename`) VALUES
(3, '$argon2id$v=19$m=65536,t=3,p=4$pBGc4NDU96cD70m6xzsuow$EzM/6FKdlQwTszW0GziZia0L4OTon/OTs6EIxXBLXjA', 'example2@gmail.com', 'adam');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1f3ab419-6a8c-4f68-b370-839b9fa14ef8', '63edf4b1494faa55de6b1641e4e787fcfdf3cfcfc215ca97eaeafe22095f65a4', '2025-03-31 19:27:44.046', '20250331192550_het', NULL, NULL, '2025-03-31 19:27:44.015', 1),
('215a13df-faac-4c9f-8ee3-5c0a703659a8', '5533f774ecd1b89a50b44d4e7d83be05147b3081e376a86776829d165f6d08af', '2025-03-31 19:27:44.005', '20250320094025_sixth', NULL, NULL, '2025-03-31 19:27:43.998', 1),
('21a787bc-2599-43cd-8070-c19a387ab4bf', 'cb75756b30aadf1dd3c21ef46721ae96b8410d812cd99708169fe1a7300b10cd', '2025-04-09 12:07:47.685', '20250409120747_add_favorites', NULL, NULL, '2025-04-09 12:07:47.618', 1),
('24b85a49-02ea-4d95-9290-c0dd6ef73616', 'bf98b44f5ad204603d7b59c71a2909b82249d4b91604466f4097a2a3409cd5b0', '2025-03-31 19:27:43.844', '20250313191232_first', NULL, NULL, '2025-03-31 19:27:43.786', 1),
('358aee64-a4d5-4db8-beb1-e75e5daafaaf', 'b1065e8a72e623008f506a2b62a546975a8543e67e50f2996788035b30cd60d0', '2025-03-31 20:42:10.207', '20250331204210_ten', NULL, NULL, '2025-03-31 20:42:10.199', 1),
('3e9ee59f-d6b0-4984-89ba-5c57d15f3a1c', '55dfeee2ff44ceed6221d677fd5b3c55316f3c8ef641700eb87a2256660a40eb', '2025-04-02 15:29:46.724', '20250402152946_twelve', NULL, NULL, '2025-04-02 15:29:46.718', 1),
('546b9670-469f-46bf-a84d-f7b8947c14e5', '936724579f8b4f2dec84d69dc63db887c7239e7ae0e6f638565cb7fa715a1217', '2025-04-11 14:08:55.760', '20250411140855_add_progress', NULL, NULL, '2025-04-11 14:08:55.671', 1),
('5a26c3fc-8f99-4ac2-a390-aa897f3a4061', '5f100f61a9bb38cbd87e9ff9022cd70cddfa18b557807e18f4d59e2f0bc3ce1f', '2025-03-31 19:28:23.798', '20250331192823_nyoc', NULL, NULL, '2025-03-31 19:28:23.759', 1),
('5f4a70e5-340a-4999-bf80-d10f9320c4d5', 'e2ef0079dbb3b66a3eeb1e19741408cdff5a60100d018644331de0bd11547b90', '2025-03-31 20:33:32.122', '20250331203332_kilenc', NULL, NULL, '2025-03-31 20:33:32.111', 1),
('7be2ee1f-4cc3-4f0e-a550-c9294de491be', '730190d9ef10836df919c7298f2158d78b8fdc7ebfb10879a05e26beb69c8ac9', '2025-03-31 19:27:43.997', '20250319155832_fifth', NULL, NULL, '2025-03-31 19:27:43.992', 1),
('9110e889-8cd5-46da-8902-0148fd54f710', 'bf255e00870eea44eb81cc2ff73473b6779add9173f69d50583e15482509ff8e', '2025-03-31 19:27:43.991', '20250319154545_fourth', NULL, NULL, '2025-03-31 19:27:43.859', 1),
('dfce009a-ecae-451b-8524-d66615f339d6', '56c73ba54e3304829aa1471b85001aba500b3ef6f45e4af2f60eee250d969251', '2025-03-31 19:27:43.858', '20250313201636_third', NULL, NULL, '2025-03-31 19:27:43.851', 1),
('e031bf7f-eb84-4227-b237-1c17605fcd2f', '3fef6aa70b51caf823c8ee6f0f5e26b883b96924faa35a15295a4ab3491232d3', '2025-03-31 19:27:43.850', '20250313194238_second', NULL, NULL, '2025-03-31 19:27:43.845', 1),
('f547e534-012b-4b6a-9564-809f5afd1f76', '7d3f8640e85b4de5853453f3ff7c7ecddd9b88eba9c5838965c6d8d07954cbfd', '2025-04-02 12:59:59.434', '20250402125959_eleventh', NULL, NULL, '2025-04-02 12:59:59.421', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Chapter_mangaId_fkey` (`mangaId`);

--
-- Indexes for table `cover`
--
ALTER TABLE `cover`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Cover_mangaId_key` (`mangaId`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Favorite_userId_mangaId_key` (`userId`,`mangaId`),
  ADD KEY `Favorite_mangaId_fkey` (`mangaId`);

--
-- Indexes for table `manga`
--
ALTER TABLE `manga`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Page_chapterId_fkey` (`chapterId`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Progress_userId_mangaId_key` (`userId`,`mangaId`),
  ADD KEY `Progress_mangaId_fkey` (`mangaId`),
  ADD KEY `Progress_chapterId_fkey` (`chapterId`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`),
  ADD KEY `Token_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_profilename_key` (`profilename`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chapter`
--
ALTER TABLE `chapter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cover`
--
ALTER TABLE `cover`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `manga`
--
ALTER TABLE `manga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapter`
--
ALTER TABLE `chapter`
  ADD CONSTRAINT `Chapter_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cover`
--
ALTER TABLE `cover`
  ADD CONSTRAINT `Cover_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `Favorite_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `Page_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `Progress_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Progress_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
