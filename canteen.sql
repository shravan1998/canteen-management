-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2020 at 04:49 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canteen`
--

-- --------------------------------------------------------

--
-- Table structure for table `canteen_records`
--

CREATE TABLE `canteen_records` (
  `food_item` varchar(200) NOT NULL,
  `additional_food_item` varchar(200) DEFAULT NULL,
  `cost` int(11) NOT NULL,
  `record_rid` int(11) NOT NULL,
  `food_file` varchar(200) NOT NULL,
  `uid` int(11) NOT NULL,
  `cart` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `rating` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `canteen_records`
--

INSERT INTO `canteen_records` (`food_item`, `additional_food_item`, `cost`, `record_rid`, `food_file`, `uid`, `cart`, `quantity`, `rating`) VALUES
('Biriyani          ', '', 50, 2, 'Biriyani.jpg', 2, 1, 3, 5),
('Rice  ', 'Kebab', 45, 3, 'Rice.jpg', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `subject` varchar(200) NOT NULL,
  `descrption` text DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`subject`, `descrption`, `uid`, `name`) VALUES
('Excellent', '             ', 2, 'Contact');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `contact` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user`, `password`, `uid`, `name`, `contact`) VALUES
('admin@email.com', 'password', 1, 'Admin', '888888888'),
('contact@email.com', 'password', 2, 'Contact', '9999999'),
('contact2@email.com', 'password', 3, 'Contact 2', '5555555'),
('contact3@email.com', 'password', 4, 'Contact 3', '66666666'),
('contact5@email.com', 'password', 5, 'Contact 5', '33333333'),
('contact6@email.com', 'password', 6, 'Contact 6', '6666666666'),
('contact8@email.com', 'password', 7, 'Contact 8', '9999999999');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `canteen_records`
--
ALTER TABLE `canteen_records`
  ADD PRIMARY KEY (`record_rid`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `canteen_records`
--
ALTER TABLE `canteen_records`
  MODIFY `record_rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
