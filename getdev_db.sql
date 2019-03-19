-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2019 at 11:36 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `getdev_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_users`
--

CREATE TABLE `app_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `time_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_users`
--

INSERT INTO `app_users` (`user_id`, `username`, `password`, `created_by`, `time_created`) VALUES
(1, 'ikenna', '$2a$10$8c48Phu62ltztUD3Ep.0ieV8x4mqV8dhBue9VucRA7RusereCjqd2', 0, 1552913694),
(2, 'samuel', '$2a$10$RvnGAd8GkAaakPacXywtvu7JsdCgCIr/S5T2mSRuh5tTaCaSsEKG2', 1, 1552913849),
(3, 'sammy', '$2a$10$ULqUneghbGxUcLitJBe3LudHyf3rzSWh89QcCj9sqwGtAxHI4.5WK', 1, 1552913929),
(4, 'Vianney', '$2a$10$xzA0SiV.mMKp7mmXqmlZjukUiRnrdf7cA0awh0uDQhg1xzP3ZSDWq', 3, 1552947304),
(5, 'Emma', '$2a$10$gDYjlYaPXoL9.JHhj5k1QehgmfiE0ISgE7PSubH0nIYVdsg8w4gKq', 3, 1552947387),
(6, 'Gift', '$2a$10$IAjCXW1LN5DiaqKZilCaO.0nDPKmo4JnuBjluopldUqIMrBgaNLNy', 3, 1552983721),
(7, 'Ikeman', '$2a$10$gYVaH9if2nbJz8dfsvxAhOpkn9NqkGGT7GhvaQbtCE93GXKIAycQ.', 3, 1552984652);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `book_name` varchar(100) NOT NULL,
  `total_stock` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `time_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `cat_id`, `book_name`, `total_stock`, `created_by`, `time_created`) VALUES
(3, 1, 'Sample Booking', 45, 3, 1552989695);

-- --------------------------------------------------------

--
-- Table structure for table `book_categories`
--

CREATE TABLE `book_categories` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `time_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_categories`
--

INSERT INTO `book_categories` (`cat_id`, `cat_name`, `created_by`, `time_created`) VALUES
(1, 'African Classics', 1, 1537478807),
(3, 'Children Books', 3, 1552947028),
(4, 'Comtemporary Books', 3, 1552947115),
(5, 'Good New Category', 3, 1552986885);

-- --------------------------------------------------------

--
-- Table structure for table `book_rating`
--

CREATE TABLE `book_rating` (
  `rating_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` enum('1 star','2 stars','3 stars','4 stars','5 stars') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_rating`
--

INSERT INTO `book_rating` (`rating_id`, `book_id`, `user_id`, `rating`) VALUES
(3, 3, 3, '1 star');

-- --------------------------------------------------------

--
-- Table structure for table `book_stocking`
--

CREATE TABLE `book_stocking` (
  `stock_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `qty_supplied` int(11) NOT NULL,
  `supply_date` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `time_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_stocking`
--

INSERT INTO `book_stocking` (`stock_id`, `book_id`, `qty_supplied`, `supply_date`, `created_by`, `time_created`) VALUES
(2, 3, 45, '2019-01-20', 3, 1552990893);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_users`
--
ALTER TABLE `app_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `book_categories`
--
ALTER TABLE `book_categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `book_rating`
--
ALTER TABLE `book_rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `book_stocking`
--
ALTER TABLE `book_stocking`
  ADD PRIMARY KEY (`stock_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_users`
--
ALTER TABLE `app_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `book_categories`
--
ALTER TABLE `book_categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `book_rating`
--
ALTER TABLE `book_rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `book_stocking`
--
ALTER TABLE `book_stocking`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
