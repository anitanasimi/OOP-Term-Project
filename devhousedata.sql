CREATE DATABASE  IF NOT EXISTS `devhousedata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `devhousedata`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: devhousedata
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_tweet`
--

DROP TABLE IF EXISTS `account_tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_tweet` (
  `account_tweet_id` int NOT NULL AUTO_INCREMENT,
  `original_author_id` int NOT NULL,
  `retweet_author_id` int DEFAULT NULL,
  `parent_tweet_id` int DEFAULT NULL,
  `tweet_id` int NOT NULL,
  PRIMARY KEY (`account_tweet_id`),
  KEY `account_id_original_to_account_tweet_idx` (`original_author_id`),
  KEY `account_id_retweet_to_account_tweet_idx` (`retweet_author_id`),
  KEY `tweet_id_parent_to_account_tweet_idx` (`parent_tweet_id`),
  KEY `tweet_id_to_account_tweet_idx` (`tweet_id`),
  CONSTRAINT `account_id_original_to_account_tweet` FOREIGN KEY (`original_author_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `account_id_retweet_to_account_tweet` FOREIGN KEY (`retweet_author_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `tweet_id_parent_to_account_tweet` FOREIGN KEY (`parent_tweet_id`) REFERENCES `tweet` (`tweet_id`),
  CONSTRAINT `tweet_id_to_account_tweet` FOREIGN KEY (`tweet_id`) REFERENCES `tweet` (`tweet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_tweet`
--

LOCK TABLES `account_tweet` WRITE;
/*!40000 ALTER TABLE `account_tweet` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_tweet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `commenter_id` int NOT NULL,
  `tweet_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `account_id_to_comment_idx` (`commenter_id`),
  KEY `tweet_id_to_comment_idx` (`tweet_id`),
  CONSTRAINT `account_id_to_comment` FOREIGN KEY (`commenter_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `tweet_id_to_comment` FOREIGN KEY (`tweet_id`) REFERENCES `tweet` (`tweet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `following` (
  `relationship_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `follower_id` int NOT NULL,
  PRIMARY KEY (`relationship_id`),
  KEY `account_id_followed_to_following_idx` (`account_id`),
  KEY `account_id_follower_to_following_idx` (`follower_id`),
  CONSTRAINT `account_id_followed_to_following` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `account_id_follower_to_following` FOREIGN KEY (`follower_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `following`
--

LOCK TABLES `following` WRITE;
/*!40000 ALTER TABLE `following` DISABLE KEYS */;
/*!40000 ALTER TABLE `following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `tweet_id` int NOT NULL,
  PRIMARY KEY (`like_id`),
  KEY `account_id_to_like_idx` (`account_id`),
  KEY `tweet_id_to_like_idx` (`tweet_id`),
  CONSTRAINT `account_id_to_like` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `tweet_id_to_like` FOREIGN KEY (`tweet_id`) REFERENCES `tweet` (`tweet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(45) NOT NULL,
  PRIMARY KEY (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweet`
--

DROP TABLE IF EXISTS `tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweet` (
  `tweet_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `picture_id` int DEFAULT NULL,
  PRIMARY KEY (`tweet_id`),
  KEY `picture_id_to_tweet_idx` (`picture_id`),
  CONSTRAINT `picture_id_to_tweet` FOREIGN KEY (`picture_id`) REFERENCES `picture` (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet`
--

LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;
/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'devhousedata'
--

--
-- Dumping routines for database 'devhousedata'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-05 17:18:46
