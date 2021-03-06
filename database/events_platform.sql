-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 26, 2022 at 08:35 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `event_date` varchar(255) NOT NULL,
  `event_time` varchar(255) DEFAULT NULL,
  `speaker_id` int(11) DEFAULT NULL,
  `meeting_link` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_type`, `event_date`, `event_time`, `speaker_id`, `meeting_link`, `description`) VALUES
(2, 'Test Event', 'Conference', '2022-01-27', '17:00', 1, 'https://meet.google.com/cfn-djya-fkd', 'Test event description');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `f_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `suggestions` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`f_id`, `event_id`, `p_id`, `rating`, `suggestions`) VALUES
(1, 2, 1, 4, 'Test feedback');

--
-- Triggers `feedback`
--
DELIMITER $$
CREATE TRIGGER `check_feedback` BEFORE INSERT ON `feedback` FOR EACH ROW BEGIN
        IF EXISTS(SELECT * FROM feedback WHERE p_id=NEW.p_id AND event_id=NEW.event_id)
        THEN 
            signal SQLSTATE '45000' SET message_text = "You have already submitted the feedback for this event";
        END IF;
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `org_id` int(11) NOT NULL,
  `org_name` varchar(255) DEFAULT NULL,
  `org_logo` varchar(255) DEFAULT NULL,
  `org_email` varchar(255) DEFAULT NULL,
  `org_password` varchar(255) DEFAULT NULL,
  `org_mobile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organisations`
--

INSERT INTO `organisations` (`org_id`, `org_name`, `org_logo`, `org_email`, `org_password`, `org_mobile`) VALUES
(1, 'DTlabz', 'dtlabz.png', 'shobith@dtlabz.com', '$2a$10$3Z/Dp.HW8Aw3huNmxzXgXOxQppWuPbWoXOeZUhdJajkIP9ZlfcHN.', '9741274712');

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `p_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `p_name` varchar(255) DEFAULT NULL,
  `p_email` varchar(255) DEFAULT NULL,
  `p_mobile` varchar(255) DEFAULT NULL,
  `linked_in` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`p_id`, `event_id`, `p_name`, `p_email`, `p_mobile`, `linked_in`) VALUES
(1, 2, 'Sujith', 'sujithsuji1098@gmail.com', '9876543210', 'https://www.linkedin.com/developers/apps/136009286/auth'),
(2, 2, 'Shobith', 'shobith.mallya8@gmail.com', '7899496873', 'https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context');

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

CREATE TABLE `speakers` (
  `speaker_id` int(11) NOT NULL,
  `speaker_name` varchar(255) DEFAULT NULL,
  `speaker_email` varchar(255) DEFAULT NULL,
  `linked_in` varchar(255) DEFAULT NULL,
  `speaker_desg` varchar(255) DEFAULT NULL,
  `speaker_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `speakers`
--

INSERT INTO `speakers` (`speaker_id`, `speaker_name`, `speaker_email`, `linked_in`, `speaker_desg`, `speaker_photo`) VALUES
(1, 'Vaishnavi', 'gg@gg.com', 'https://linkedin.com/gg', 'GG', 'speaker_photo_1642619251572.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `speaker_id` (`speaker_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`f_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `organisations`
--
ALTER TABLE `organisations`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`speaker_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `organisations`
--
ALTER TABLE `organisations`
  MODIFY `org_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `speaker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`speaker_id`) REFERENCES `speakers` (`speaker_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `participants` (`p_id`);

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
