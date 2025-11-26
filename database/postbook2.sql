-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2025 at 08:11 PM
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
-- Database: `postbook2`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `commentOfPostId` int(11) NOT NULL,
  `commentedUserId` int(11) NOT NULL,
  `commentText` varchar(500) NOT NULL,
  `commentTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `commentOfPostId`, `commentedUserId`, `commentText`, `commentTime`) VALUES
(3, 2, 1002, 'my soon is very hangry', '2025-11-22 00:00:23'),
(26, 4, 1003, 'great!', '2025-11-25 23:27:32'),
(28, 4, 1001, 'very nice', '2025-11-25 23:32:01'),
(30, 4, 1002, 'nice moment ', '2025-11-25 23:33:30'),
(32, 3, 1001, 'woow!', '2025-11-25 23:35:49'),
(33, 1, 1003, 'woow! very good', '2025-11-25 23:36:23'),
(34, 9, 1001, 'my baby', '2025-11-26 02:32:20'),
(35, 9, 1001, 'kk', '2025-11-26 22:08:26'),
(36, 9, 1001, 'jobaer', '2025-11-26 22:13:52'),
(37, 9, 1001, 'my baby', '2025-11-26 22:16:03'),
(38, 10, 1001, 'ok', '2025-11-26 22:16:34'),
(39, 10, 1001, 'aj delat kora s', '2025-11-26 22:16:50'),
(40, 10, 1002, 'ok', '2025-11-26 22:17:20'),
(41, 14, 1001, 'nice', '2025-11-27 00:24:07');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `postedUserId` int(11) NOT NULL,
  `postedTime` datetime NOT NULL,
  `postText` varchar(800) NOT NULL,
  `postImageUrl` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `postedUserId`, `postedTime`, `postText`, `postImageUrl`) VALUES
(1, 1002, '2025-11-12 00:31:54', 'This is my picture', 'https://i.ibb.co.com/b5CMPs5K/munna-pic.jpg'),
(2, 1001, '2025-11-21 19:47:05', 'This is my soon', 'https://i.ibb.co.com/1GSn8n9C/abdulla.jpg'),
(3, 1001, '2025-11-21 20:03:22', 'Tee', 'https://i.ibb.co.com/rKfqrkpR/trees-new.jpg'),
(4, 1002, '2025-11-21 23:20:51', 'very nice moment', 'https://cdn.pixabay.com/photo/2024/03/09/20/09/flowers-8623299_1280.jpg'),
(5, 1003, '2025-11-25 00:07:23', 'my frist new adding post', 'https://i.ibb.co.com/v47VfPPM/md-sarour-Hossen-pic.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(20) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userPassword` varchar(20) NOT NULL,
  `userImage` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPassword`, `userImage`) VALUES
(1001, 'munna', '1995', 'https://i.ibb.co.com/b5CMPs5K/munna-pic.jpg\" '),
(1002, 'Md sarour Hossen', '2071995', 'https://i.ibb.co.com/v47VfPPM/md-sarour-Hossen-pic.jpg\"'),
(1003, 'md mominul islam', '2000', 'https://i.ibb.co.com/1GSn8n9C/abdulla.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
