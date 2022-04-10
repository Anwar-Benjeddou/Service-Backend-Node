-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: lpTfinal
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agence`
--

DROP TABLE IF EXISTS `agence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agence` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(45) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agence`
--

LOCK TABLES `agence` WRITE;
/*!40000 ALTER TABLE `agence` DISABLE KEYS */;
INSERT INTO `agence` VALUES ('2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','O3V1A',216000002,'Adress Agence_C','city Agence_C','country Agence_C','Agence_C','2021-04-01 13:52:45',NULL),('BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1XES0',216000001,'Adress Agence_A','city Agence_A','country Agence_A','Agence_A','2021-04-01 13:52:45',NULL),('D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','MSTVC',216000002,'Adress Agence_B','city Agence_B','country Agence_B','Agence_B','2021-04-01 13:52:45',NULL);
/*!40000 ALTER TABLE `agence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agence_admin`
--

DROP TABLE IF EXISTS `agence_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agence_admin` (
  `agence` varchar(36) NOT NULL,
  `admin` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`agence`,`admin`),
  KEY `fk_agence_admin_app_user` (`admin`),
  CONSTRAINT `fk_agence_admin_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_agence_admin_app_user` FOREIGN KEY (`admin`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agence_admin`
--

LOCK TABLES `agence_admin` WRITE;
/*!40000 ALTER TABLE `agence_admin` DISABLE KEYS */;
INSERT INTO `agence_admin` VALUES ('2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','2021-04-01 13:52:00',NULL),('BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','2021-04-01 13:52:00',NULL),('BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','7C57B4E0-8A33-11EB-8A9D-D999909645CC','2021-04-01 13:52:00',NULL),('BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','D3EA2830-7B3A-11EB-A645-9795D36837FC','2021-04-01 13:52:00',NULL),('D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','2021-04-01 13:52:00',NULL);
/*!40000 ALTER TABLE `agence_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomalyDelivery`
--

DROP TABLE IF EXISTS `anomalyDelivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomalyDelivery` (
  `id` varchar(36) NOT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `colis` varchar(36) DEFAULT NULL,
  `anomaly` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `agence` varchar(36) DEFAULT NULL,
  `anomalyCategory` varchar(36) DEFAULT NULL,
  `statusPlanification` varchar(45) DEFAULT '0',
  `toProvider` varchar(45) DEFAULT '0',
  `agenceExchange` varchar(36) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_anomaly_driver_idx` (`driver`),
  KEY `fk_anomaly_colis_idx` (`colis`),
  KEY `fk_anomalyDelivery_agence` (`agence`),
  KEY `fk_anomalyDelivery_category_idx` (`anomalyCategory`),
  CONSTRAINT `fk_anomaly_colis` FOREIGN KEY (`colis`) REFERENCES `colis` (`id`),
  CONSTRAINT `fk_anomaly_driver` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_anomalyDelivery_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_anomalyDelivery_category` FOREIGN KEY (`anomalyCategory`) REFERENCES `anomaly_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomalyDelivery`
--

LOCK TABLES `anomalyDelivery` WRITE;
/*!40000 ALTER TABLE `anomalyDelivery` DISABLE KEYS */;
INSERT INTO `anomalyDelivery` VALUES ('1CE0A9D0-BF95-11EB-BE17-25C973044828','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','7949E100-B888-11EB-9993-DB409692C86F','Dameged package (exchange)','2021-05-28 10:14:32','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','3DA35E40-92D8-11EB-87F6-D75D53A493A0','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('2F981CC0-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','Unreacheable client (cancel)','2021-05-18 23:34:19','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','1','2','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('30A90FD0-B7E2-11EB-97CA-7380A37BDA38','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','13361C50-B7E1-11EB-9A89-6FF88833860C','Unreacheable client (cancel)','2021-05-18 15:06:07','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('334F7F70-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','Dameged package (exchange)','2021-05-18 23:34:25','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','3DA35E40-92D8-11EB-87F6-D75D53A493A0','1','2','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('37378F10-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','Unreachable customer','2021-05-18 23:34:32','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4EHY','1','2','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('3B120A20-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','8F011520-B81C-11EB-8A12-19E9ED793EF2','Unreachable customer','2021-05-18 23:34:38','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4EHY','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('9DAEC2A0-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','13361C50-B7E1-11EB-9A89-6FF88833860C','Unreacheable client (cancel)','2021-05-18 15:09:10','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('A24F4CD0-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','19B85ED0-B7E1-11EB-9A89-6FF88833860C','Dameged package (cancel)','2021-05-18 15:09:17','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('A5E91560-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','2F5CD630-B7E1-11EB-9A89-6FF88833860C','Dameged package (exchange)','2021-05-18 15:09:23','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','3DA35E40-92D8-11EB-87F6-D75D53A493A0','1','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('BD607E00-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','680D3090-B888-11EB-9993-DB409692C86F','Dameged package (exchange)','2021-05-27 14:59:22','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','3DA35E40-92D8-11EB-87F6-D75D53A493A0','0','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('E8A54E10-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','7A849080-BC91-11EB-A55D-579CE6C61243','Dameged package (cancel)','2021-05-27 15:00:35','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','0','2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('EC9CEE10-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','D64BBE20-BC91-11EB-A55D-579CE6C61243','Unreacheable client (cancel)','2021-05-27 15:00:42','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','0','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL),('EFD95460-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','82002720-BC91-11EB-A55D-579CE6C61243','Dameged package (exchange)','2021-05-27 15:00:47','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','3DA35E40-92D8-11EB-87F6-D75D53A493A0','0','1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL);
/*!40000 ALTER TABLE `anomalyDelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomalyPickup`
--

DROP TABLE IF EXISTS `anomalyPickup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomalyPickup` (
  `id` varchar(36) NOT NULL,
  `driver` varchar(45) DEFAULT NULL,
  `package` varchar(36) DEFAULT NULL,
  `anomaly` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `agence` varchar(36) DEFAULT NULL,
  `anomalyCategory` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_anomalyPickup_driver_idx` (`driver`),
  KEY `fk_anomalyPickup_package` (`package`),
  KEY `fk_anomalyPickup_agence` (`agence`),
  CONSTRAINT `fk_anomalyPickup_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_anomalyPickup_driver` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_anomalyPickup_package` FOREIGN KEY (`package`) REFERENCES `package` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomalyPickup`
--

LOCK TABLES `anomalyPickup` WRITE;
/*!40000 ALTER TABLE `anomalyPickup` DISABLE KEYS */;
INSERT INTO `anomalyPickup` VALUES ('00C44240-B818-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','A8D8C832-B817-11EB-8A12-19E9ED793EF2','Problem in a colis','2021-05-18 21:31:19','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('14E01340-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','0AA8D152-B812-11EB-9160-B788CA63A9C6','Problem in a colis','2021-05-18 21:24:43','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('18A112E0-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','0AA94682-B812-11EB-9160-B788CA63A9C6','Problem in a colis','2021-05-18 21:24:50','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('79B241A1-BEDC-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','8A641222-BD66-11EB-8E1B-F15C649B08E4','Problem in a colis','2021-05-27 12:12:50','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('7E16AD30-BEDC-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','8A679491-BD66-11EB-8E1B-F15C649B08E4','Problem in a colis','2021-05-27 12:12:58','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('A18B5E00-BEDC-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','8A64D572-BD66-11EB-8E1B-F15C649B08E4','Problem in a colis','2021-05-27 12:13:57','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('CABF8B00-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','38ABEDF2-B7D9-11EB-9B33-892A2715C256','Problem in a colis','2021-05-18 14:56:06','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('D00EF2D0-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','38AC6322-B7D9-11EB-9B33-892A2715C256','Problem in a colis','2021-05-18 14:56:15','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060'),('FB072480-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','A8D7DDD1-B817-11EB-8A12-19E9ED793EF2','Problem in a colis','2021-05-18 21:31:10','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060');
/*!40000 ALTER TABLE `anomalyPickup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomaly_category`
--

DROP TABLE IF EXISTS `anomaly_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomaly_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomaly_category`
--

LOCK TABLES `anomaly_category` WRITE;
/*!40000 ALTER TABLE `anomaly_category` DISABLE KEYS */;
INSERT INTO `anomaly_category` VALUES ('3DA35E40-92D8-11EB-87F6-D75D53A493A0','Exchange','2021-04-01 13:53:17'),('5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060','pickup','2021-04-15 09:47:38'),('BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','Cancel','2021-04-01 13:53:17'),('BE2C04D0-92D4-11EB-907C-29C73B1B4EHY','Reschedule','2021-04-05 13:53:17');
/*!40000 ALTER TABLE `anomaly_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomaly_history`
--

DROP TABLE IF EXISTS `anomaly_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomaly_history` (
  `id` varchar(36) NOT NULL,
  `colis` varchar(45) DEFAULT NULL,
  `users` varchar(36) DEFAULT NULL,
  `event` json DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomaly_history`
--

LOCK TABLES `anomaly_history` WRITE;
/*!40000 ALTER TABLE `anomaly_history` DISABLE KEYS */;
INSERT INTO `anomaly_history` VALUES ('1CE89910-BF95-11EB-BE17-25C973044828','7949E100-B888-11EB-9993-DB409692C86F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\"}]}','2021-05-28 10:14:32'),('2F98E010-B829-11EB-B8DA-61A52B28FD33','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\"}]}','2021-05-18 23:34:19'),('334FF4A0-B829-11EB-B8DA-61A52B28FD33','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\"}]}','2021-05-18 23:34:25'),('37380440-B829-11EB-B8DA-61A52B28FD33','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Unreachable customer\"}]}','2021-05-18 23:34:32'),('3B127F50-B829-11EB-B8DA-61A52B28FD33','8F011520-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Unreachable customer\"}]}','2021-05-18 23:34:38'),('9DB10C90-B7E2-11EB-A38A-3F932768D50B','13361C50-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\"}]}','2021-05-18 15:09:10'),('A2512190-B7E2-11EB-A38A-3F932768D50B','19B85ED0-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (cancel)\"}]}','2021-05-18 15:09:17'),('A5E98A90-B7E2-11EB-A38A-3F932768D50B','2F5CD630-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\"}]}','2021-05-18 15:09:23'),('BD61B680-BEF3-11EB-A1D1-FBE3D561BF34','680D3090-B888-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\"}]}','2021-05-27 14:59:22'),('E8A59C31-BEF3-11EB-A1D1-FBE3D561BF34','7A849080-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (cancel)\"}]}','2021-05-27 15:00:35'),('EC9D3C30-BEF3-11EB-A1D1-FBE3D561BF34','D64BBE20-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\"}]}','2021-05-27 15:00:42'),('EFD9A280-BEF3-11EB-A1D1-FBE3D561BF34','82002720-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\"}]}','2021-05-27 15:00:47');
/*!40000 ALTER TABLE `anomaly_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomaly_message`
--

DROP TABLE IF EXISTS `anomaly_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomaly_message` (
  `id` varchar(36) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message_UNIQUE` (`message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomaly_message`
--

LOCK TABLES `anomaly_message` WRITE;
/*!40000 ALTER TABLE `anomaly_message` DISABLE KEYS */;
INSERT INTO `anomaly_message` VALUES ('3DA42190-92D8-11EB-87F6-D75D53A493A0','Dameged package (exchange)','2021-04-01 13:54:26'),('5FC3C3D0-9DC7-11EB-BF51-23C1ED2C3060','Is not ready','2021-04-15 09:47:38'),('600EAF80-9DC7-11EB-BF51-23C1ED2C3060','Problem in a colis','2021-04-15 09:47:39'),('BE2E75D0-92D4-11EB-907C-29C73B1B4E6C','Unreacheable client (cancel)','2021-04-01 13:54:26'),('BE41AFB0-92D4-11EB-907C-29C73B1B4E6C','Dameged package (cancel)','2021-04-01 13:54:26'),('BE41AFB0-92D4-11EB-907C-29C73B1B4EAZ','Unreachable customer','2021-04-01 13:54:26');
/*!40000 ALTER TABLE `anomaly_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomalycategory_has_message`
--

DROP TABLE IF EXISTS `anomalycategory_has_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomalycategory_has_message` (
  `anomaly` varchar(36) NOT NULL,
  `category` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`anomaly`,`category`),
  KEY `fk_anomalycategory_has_message_1_idx` (`category`),
  CONSTRAINT `fk_anomalycategory_has_message_1` FOREIGN KEY (`category`) REFERENCES `anomaly_category` (`id`),
  CONSTRAINT `fk_anomalycategory_has_message_2` FOREIGN KEY (`anomaly`) REFERENCES `anomaly_message` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomalycategory_has_message`
--

LOCK TABLES `anomalycategory_has_message` WRITE;
/*!40000 ALTER TABLE `anomalycategory_has_message` DISABLE KEYS */;
INSERT INTO `anomalycategory_has_message` VALUES ('3DA42190-92D8-11EB-87F6-D75D53A493A0','3DA35E40-92D8-11EB-87F6-D75D53A493A0','2021-04-01 13:53:45'),('5FC3C3D0-9DC7-11EB-BF51-23C1ED2C3060','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060','2021-04-15 09:47:38'),('600EAF80-9DC7-11EB-BF51-23C1ED2C3060','5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060','2021-04-15 09:47:39'),('BE2E75D0-92D4-11EB-907C-29C73B1B4E6C','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','2021-04-01 13:53:45'),('BE41AFB0-92D4-11EB-907C-29C73B1B4E6C','BE2C04D0-92D4-11EB-907C-29C73B1B4E6C','2021-04-01 13:53:45'),('BE41AFB0-92D4-11EB-907C-29C73B1B4EAZ','BE2C04D0-92D4-11EB-907C-29C73B1B4EHY','2021-04-01 13:53:45');
/*!40000 ALTER TABLE `anomalycategory_has_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `descriminator` varchar(45) NOT NULL DEFAULT 'REGULAR_USER',
  `imageRef` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES ('027A52E0-7B60-11EB-A8A0-B17B549DCEAD','driver_A3','driver_A3','driver_A3','driver_A3','driver_A3@gmail.com','20748896','Address driver_A3','ACTIVE','DRIVER_INTERNAL',NULL,'2021-04-01 13:51:18'),('02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','adminB','adminB','adminB','adminB','adminB@gmail.com','20748896','Address adminB','ACTIVE','REGULER_USER',NULL,'2021-04-01 13:51:18'),('1','admin','admin','admin','admin','admin','71870031','TUNIS','1','REGULAR_USER',NULL,'2021-04-01 13:51:18'),('10BCBCC0-9975-11EB-AC9E-2D27E91AE8F6','ProviderA3','ProviderA3','ProviderA3','ProviderA3','ProviderA3@gmail.com','20399201','address ProviderA3','ACTIVE','PROVIDER',NULL,'2021-04-09 21:49:23'),('18A313E0-9848-11EB-8CB8-173F18D37F47','ProviderA1','ProviderA1','ProviderA1','ProviderA1','ProviderA1@gmail.com','20220022','address ProviderA1','ACTIVE','PROVIDER',NULL,'2021-04-08 09:54:07'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','ProviderA2','ProviderA2','ProviderA2','ProviderA2','ProviderA2@gmail.com','20039201','address ProviderA2','ACTIVE','PROVIDER',NULL,'2021-04-08 09:55:04'),('3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','adminC','adminC','adminC','adminC','adminC@gmail.com','22780769','Addres adminC','ACTIVE','REGULER_USER',NULL,'2021-04-01 13:51:18'),('4120D560-A364-11EB-B0D0-C3798C8972C9','magasinierA1','magasinierA1','magasinierA1','magasinierA1','magasinierA1@gmail.com','23456789','AddressMagasinierA1','ACTIVE','Magasinier',NULL,'2021-04-22 13:13:04'),('43C3F070-9975-11EB-AC9E-2D27E91AE8F6','ProviderA4','ProviderA4','ProviderA4','ProviderA4','ProviderA4@gmail.com','20388292','address ProviderA4','ACTIVE','PROVIDER',NULL,'2021-04-09 21:50:49'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','ProviderB2','ProviderB2','ProviderB2','ProviderB2','ProviderB2@gmail.com','20732883','address ProviderB2','ACTIVE','PROVIDER',NULL,'2021-04-09 21:23:12'),('6B757910-A364-11EB-B0D0-C3798C8972C9','magasinierB1','magasinierB1','magasinierB1','magasinierB1','magasinierB1@gmail.com','23456780','AddressMagasinierB1','ACTIVE','Magasinier',NULL,'2021-04-22 13:14:15'),('6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','driver_B1','driver_B1','driver_B1','driver_B1','driver_B1@yahoo.fr','54123654','address driver_B1','ACTIVE','DRIVER_INTERNAL',NULL,'2021-04-01 13:51:18'),('792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','driver_A1','driver_A1','driver_A1','driver_A1','driver_A1@gmail.com','20743885','Address driver_A1','ACTIVE','DRIVER_CONTRACTER',NULL,'2021-04-01 13:51:18'),('7C57B4E0-8A33-11EB-8A9D-D999909645CC','comptable','comptable','comptable','comptable','comptable@gmail.com','20938284','address comptable','ACTIVE','REGULER_USER',NULL,'2021-04-01 13:51:18'),('7E69C490-A364-11EB-B0D0-C3798C8972C9','magasinierC1','magasinierC1','magasinierC1','magasinierC1','magasinierC1@gmail.com','23456770','AddressMagasinierC1','ACTIVE','Magasinier',NULL,'2021-04-22 13:14:47'),('8464EC80-939C-11EB-B69D-17A841C0031C','driver_A4','driver_A4','driver_A4','driver_A4','driver_A4@gmail.com','20743885','address driver_A4','ACTIVE','DRIVER_INTERNAL',NULL,'2021-04-02 11:16:41'),('8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','magasinierA2','magasinierA2','magasinierA2','magasinierA2','magasinierA2@gmail.com','54678908',' addressMagasinierA2','ACTIVE','Magasinier',NULL,'2021-04-23 11:12:13'),('93D0BEA0-7B60-11EB-A8A0-B17B549DCEAD','driver_B2','driver_B2','driver_B2','driver_B2','driver_B2@gmail.com','20748893','address driver_B2','ACTIVE','DRIVER_INTERNAL',NULL,'2021-04-01 13:51:18'),('AF902B30-7B60-11EB-A8A0-B17B549DCEAD','driver_B3','driver_B3','driver_B3','driver_B3','driver_B3@gmail.com','54699876','Address driver_B3','ACTIVE','DRIVER_INTERNAL',NULL,'2021-04-01 13:51:18'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','ProviderB1','ProviderB1','ProviderB1','ProviderB1','ProviderB1@gmail.com','20003233','address ProviderB1','ACTIVE','PROVIDER',NULL,'2021-04-09 09:44:30'),('D3EA2830-7B3A-11EB-A645-9795D36837FC','adminA','adminA','adminA','adminA','adminA@gmail.com','71870003','address adminA AgenceA','ACTIVE','REGULER_USER',NULL,'2021-04-01 13:51:18'),('D6F7F690-9A09-11EB-96CF-9B6CD0D631B0','ProviderC1','ProviderC1','ProviderC1','ProviderC1','ProviderC1@gmail.com','20029930','address ProviderC1','ACTIVE','PROVIDER',NULL,'2021-04-10 15:34:21'),('E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','driver_A2','driver_A2','driver_A2','driver_A2','driver_A2@gmail.com','90365589','Address driver_A2','ACTIVE','DRIVER_CONTRACTER',NULL,'2021-04-01 13:51:18'),('E339DC40-7B67-11EB-A8A0-B17B549DCEAD','driver_C1','driver_C1','driver_C1','driver_C1','driver_C1@gmail.com','20192882','address driver_C1','ACTIVE','DRIVER_CONTRACTER',NULL,'2021-04-01 13:51:18'),('FAE0DA60-7B67-11EB-A8A0-B17B549DCEAD','driver_C2','driver_C2','driver_C2','driver_C2','driver_C2@gmail.com','22780720','address driver_C2','ACTIVE','DRIVER_CONTRACTER',NULL,'2021-04-01 13:51:18');
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `association_event`
--

DROP TABLE IF EXISTS `association_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `association_event` (
  `id` varchar(36) NOT NULL,
  `transportUtility` varchar(36) NOT NULL,
  `description` text NOT NULL COMMENT 'Should be either associate/disassociate',
  PRIMARY KEY (`id`),
  KEY `fk_association_event_transport_utility1_idx` (`transportUtility`),
  CONSTRAINT `fk_association_event_event1` FOREIGN KEY (`id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_association_event_transport_utility1` FOREIGN KEY (`transportUtility`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `association_event`
--

LOCK TABLES `association_event` WRITE;
/*!40000 ALTER TABLE `association_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `association_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beacon`
--

DROP TABLE IF EXISTS `beacon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beacon` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `datamatrix` varchar(24) NOT NULL,
  `mac` varchar(255) NOT NULL,
  `rfid` varchar(12) NOT NULL,
  `registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(36) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'STAGING',
  PRIMARY KEY (`id`),
  UNIQUE KEY `datamatrix_UNIQUE` (`datamatrix`),
  UNIQUE KEY `mac_UNIQUE` (`mac`),
  UNIQUE KEY `rfid_UNIQUE` (`rfid`),
  KEY `fk_beacon_location1_idx` (`location`),
  CONSTRAINT `fk_beacon_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beacon`
--

LOCK TABLES `beacon` WRITE;
/*!40000 ALTER TABLE `beacon` DISABLE KEYS */;
/*!40000 ALTER TABLE `beacon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beacon_sensor`
--

DROP TABLE IF EXISTS `beacon_sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beacon_sensor` (
  `beacon` varchar(255) NOT NULL,
  `sensor` varchar(255) NOT NULL,
  `min` double DEFAULT NULL,
  `max` double DEFAULT NULL,
  `interval` int DEFAULT NULL,
  PRIMARY KEY (`beacon`,`sensor`),
  KEY `fk_beacon_has_sensor_sensor1_idx` (`sensor`),
  KEY `fk_beacon_has_sensor_beacon1_idx` (`beacon`),
  CONSTRAINT `fk_beacon_has_sensor_beacon1` FOREIGN KEY (`beacon`) REFERENCES `beacon` (`id`),
  CONSTRAINT `fk_beacon_has_sensor_sensor1` FOREIGN KEY (`sensor`) REFERENCES `sensor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beacon_sensor`
--

LOCK TABLES `beacon_sensor` WRITE;
/*!40000 ALTER TABLE `beacon_sensor` DISABLE KEYS */;
/*!40000 ALTER TABLE `beacon_sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `box`
--

DROP TABLE IF EXISTS `box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `box` (
  `id` varchar(36) NOT NULL,
  `rfid` varchar(255) NOT NULL,
  `volume` decimal(6,3) NOT NULL DEFAULT '1.000',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_box_transport_utility1` FOREIGN KEY (`id`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `box`
--

LOCK TABLES `box` WRITE;
/*!40000 ALTER TABLE `box` DISABLE KEYS */;
/*!40000 ALTER TABLE `box` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancelColisToAgence`
--

DROP TABLE IF EXISTS `cancelColisToAgence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancelColisToAgence` (
  `id` varchar(36) NOT NULL,
  `colis` varchar(36) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `agenceTo` varchar(36) DEFAULT NULL,
  `agenceFrom` varchar(36) DEFAULT NULL,
  `status` varchar(45) DEFAULT '0',
  `anomaly` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `returnDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelColisToAgence`
--

LOCK TABLES `cancelColisToAgence` WRITE;
/*!40000 ALTER TABLE `cancelColisToAgence` DISABLE KEYS */;
INSERT INTO `cancelColisToAgence` VALUES ('2BC6CBBD-9F41-4ECF-9963-3FC806801B30','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','8464EC80-939C-11EB-B69D-17A841C0031C','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0','2F981CC0-B829-11EB-B8DA-61A52B28FD33','2021-05-18 23:37:30',NULL,NULL),('36908240-F80E-4674-9F0E-06467917DCDA','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0','334F7F70-B829-11EB-B8DA-61A52B28FD33','2021-05-28 09:53:36',NULL,NULL),('7328F35B-EF71-4E1F-A3F4-338AA9061005','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','8464EC80-939C-11EB-B69D-17A841C0031C','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0','37378F10-B829-11EB-B8DA-61A52B28FD33','2021-05-27 15:01:26',NULL,NULL);
/*!40000 ALTER TABLE `cancelColisToAgence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancelColisToprovider`
--

DROP TABLE IF EXISTS `cancelColisToprovider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancelColisToprovider` (
  `id` varchar(36) NOT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `colis` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT '0',
  `agenceProvider` varchar(36) DEFAULT NULL,
  `returnDate` datetime DEFAULT NULL,
  `anomaly` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelColisToprovider`
--

LOCK TABLES `cancelColisToprovider` WRITE;
/*!40000 ALTER TABLE `cancelColisToprovider` DISABLE KEYS */;
INSERT INTO `cancelColisToprovider` VALUES ('1552E0C1-BEEA-4551-98C7-4F8D21CC8EE2','8464EC80-939C-11EB-B69D-17A841C0031C','19B85ED0-B7E1-11EB-9A89-6FF88833860C','2021-05-18 20:39:00',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'A24F4CD0-B7E2-11EB-A38A-3F932768D50B'),('5797A7B8-BC8E-4A8F-95EF-C3265A93B9A6','8464EC80-939C-11EB-B69D-17A841C0031C','7949E100-B888-11EB-9993-DB409692C86F','2021-05-28 11:02:07',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'1CE0A9D0-BF95-11EB-BE17-25C973044828'),('5BC7C6E5-CC65-4E47-89F7-8367BA1F530A','8464EC80-939C-11EB-B69D-17A841C0031C','13361C50-B7E1-11EB-9A89-6FF88833860C','2021-05-18 20:38:56',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'9DAEC2A0-B7E2-11EB-A38A-3F932768D50B'),('A2BE26F6-1E05-408C-93CC-854B98D7D035','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','8F011520-B81C-11EB-8A12-19E9ED793EF2','2021-05-28 11:03:30',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'3B120A20-B829-11EB-B8DA-61A52B28FD33'),('C214886E-539E-4189-9D46-709D76054AF9','8464EC80-939C-11EB-B69D-17A841C0031C','2F5CD630-B7E1-11EB-9A89-6FF88833860C','2021-05-18 20:39:04',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'A5E91560-B7E2-11EB-A38A-3F932768D50B'),('F4CB58D5-6822-4E99-ACEA-BA262CE4D06B','8464EC80-939C-11EB-B69D-17A841C0031C','13361C50-B7E1-11EB-9A89-6FF88833860C','2021-05-18 20:38:50',NULL,'0','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2',NULL,'30A90FD0-B7E2-11EB-97CA-7380A37BDA38');
/*!40000 ALTER TABLE `cancelColisToprovider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkpoint`
--

DROP TABLE IF EXISTS `checkpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkpoint` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `journey` varchar(36) NOT NULL,
  `location` varchar(36) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `exchange` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_checkpoint_journey1_idx` (`journey`),
  KEY `fk_checkpoint_location1_idx` (`location`),
  KEY `fk_checkpoint_exchange1_idx` (`exchange`),
  CONSTRAINT `fk_checkpoint_exchange1` FOREIGN KEY (`exchange`) REFERENCES `exchange` (`id`),
  CONSTRAINT `fk_checkpoint_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`),
  CONSTRAINT `fk_checkpoint_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkpoint`
--

LOCK TABLES `checkpoint` WRITE;
/*!40000 ALTER TABLE `checkpoint` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colis`
--

DROP TABLE IF EXISTS `colis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colis` (
  `id` varchar(36) NOT NULL,
  `provider` varchar(36) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `customer` varchar(36) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `addressEnlevement` varchar(45) DEFAULT NULL,
  `addressLivraison` varchar(45) DEFAULT NULL,
  `dateLivraision` datetime DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `status` int DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `anomaly` int DEFAULT '0',
  `agenceExchange` varchar(36) DEFAULT NULL,
  `checkMagasinier` varchar(45) DEFAULT '0',
  `magasinier` varchar(36) DEFAULT NULL,
  `dateCheckMagasinier` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_colis_provider_idx` (`provider`),
  KEY `fk_colis_driver_idx` (`driver`),
  KEY `fk_colis_customer` (`customer`),
  KEY `fk_colis_magasinier_idx` (`magasinier`),
  CONSTRAINT `fk_colis_customer` FOREIGN KEY (`customer`) REFERENCES `customer_provider` (`id`),
  CONSTRAINT `fk_colis_driver` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_colis_magasinier` FOREIGN KEY (`magasinier`) REFERENCES `magasinier` (`id`),
  CONSTRAINT `fk_colis_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colis`
--

LOCK TABLES `colis` WRITE;
/*!40000 ALTER TABLE `colis` DISABLE KEYS */;
INSERT INTO `colis` VALUES ('00184540-B7E0-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','38AA6753-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','city manar TUNIS',NULL,'GDI9P',0,'2021-05-18 14:52:08','2021-05-18 14:50:26',0,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','1','7E69C490-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:52:08'),('13361C50-B7E1-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','38ABEDF3-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','city lkalil, bhar, marsa',NULL,'C5QPV',3,'2021-05-18 15:02:55','2021-05-18 14:58:08',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:59:50'),('19B85ED0-B7E1-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','38AC6323-B7D9-11EB-9B33-892A2715C256','Envelope','address ProviderA1','Jerba Midoune ',NULL,'L2COF',3,'2021-05-18 15:03:10','2021-05-18 14:58:19',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:59:57'),('28C7F610-B7E1-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','027A52E0-7B60-11EB-A8A0-B17B549DCEAD','38ACD853-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','city lkalil, bhar, marsa',NULL,'34G9T',0,'2021-05-18 15:00:07','2021-05-18 14:58:44',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 15:00:07'),('2F5CD630-B7E1-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','38AD4D83-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'L6JY7',3,'2021-05-18 15:03:19','2021-05-18 14:58:55',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 15:00:15'),('680D3090-B888-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','38AE5EF2-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'V2XWI',2,'2021-05-19 11:09:50','2021-05-19 10:55:56',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-19 11:08:30'),('7949E100-B888-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','38AEAD13-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'MIOXP',3,'2021-05-28 10:14:05','2021-05-19 10:56:25',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:08'),('7A849080-BC91-11EB-A55D-579CE6C61243','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AA46482-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','city SFAX rue Gabes km 3',NULL,'FPM2E',2,'2021-05-27 14:59:35','2021-05-24 14:10:57',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:17'),('7E1E4480-B81C-11EB-8A12-19E9ED793EF2','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AA83513-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','city lkalil, bhar, marsa',NULL,'636HF',3,'2021-05-18 23:30:43','2021-05-18 22:03:27',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 23:28:43'),('82002720-BC91-11EB-A55D-579CE6C61243','3A8DA240-9848-11EB-8605-ABCA64BADD5E','8464EC80-939C-11EB-B69D-17A841C0031C','4E75A092-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA2','city SFAX rue Gabes km 3',NULL,'5XYNU',2,'2021-05-27 14:59:47','2021-05-24 14:11:10',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:22'),('83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','A8D45B62-B817-11EB-8A12-19E9ED793EF2','Docs','address ProviderB2','city SFAX rue Gabes km 3',NULL,'KXH0S',3,'2021-05-18 23:30:58','2021-05-18 22:03:37',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 23:28:55'),('8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AAAA613-B812-11EB-9160-B788CA63A9C6','Envelope','address ProviderB1','Manzeh 9 TUNIS ',NULL,'HQ3DV',3,'2021-05-18 23:33:50','2021-05-18 22:03:47',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 23:29:08'),('8F011520-B81C-11EB-8A12-19E9ED793EF2','18A313E0-9848-11EB-8CB8-173F18D37F47','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','38ADE9C3-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'9MY8A',3,'2021-05-18 23:34:03','2021-05-18 22:03:56',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 23:29:27'),('95578CB0-B81C-11EB-8A12-19E9ED793EF2','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','0AA6AE73-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','city lkalil, bhar, marsa','2021-05-28 10:14:24','91EL0',2,'2021-05-28 10:14:24','2021-05-18 22:04:06',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:27'),('9B11EB50-B81C-11EB-8A12-19E9ED793EF2','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','0AA63943-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','city lkalil, bhar, marsa',NULL,'RD1J1',0,'2021-05-24 14:31:34','2021-05-18 22:04:16',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:34'),('A158D280-B81C-11EB-8A12-19E9ED793EF2','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','0AA798D3-B812-11EB-9160-B788CA63A9C6','Envelope','address ProviderB1','Jerba Midoune ',NULL,'S1X12',0,'2021-05-24 14:31:51','2021-05-18 22:04:27',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:31:51'),('D64BBE20-BC91-11EB-A55D-579CE6C61243','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','577763F3-B887-11EB-9993-DB409692C86F','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'R6PFX',2,'2021-05-27 15:00:20','2021-05-24 14:13:31',1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:32:10'),('D8E37FD0-BEDD-11EB-950A-431B543C5D1E','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AA8D153-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','Manzeh 9 TUNIS ',NULL,'CRG7Z',0,NULL,'2021-05-27 12:22:40',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0',NULL,NULL),('D9E586B0-BC91-11EB-A55D-579CE6C61243','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','5777B213-B887-11EB-9993-DB409692C86F','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'JA6R5',0,'2021-05-24 14:32:06','2021-05-24 14:13:37',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:32:06'),('DD404A70-BC91-11EB-A55D-579CE6C61243','18A313E0-9848-11EB-8CB8-173F18D37F47','8464EC80-939C-11EB-B69D-17A841C0031C','57787563-B887-11EB-9993-DB409692C86F','Docs','address ProviderA1','Manzeh 9 TUNIS ',NULL,'QKREM',0,'2021-05-24 14:32:01','2021-05-24 14:13:43',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 14:32:01'),('DDEB3040-BEDD-11EB-950A-431B543C5D1E','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AA59D03-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','city manar TUNIS',NULL,'OJJAH',0,NULL,'2021-05-27 12:22:48',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0',NULL,NULL),('E317A6C0-BEDD-11EB-950A-431B543C5D1E','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','8464EC80-939C-11EB-B69D-17A841C0031C','0AAA09D3-B812-11EB-9160-B788CA63A9C6','Docs','address ProviderB1','Manzeh 9 TUNIS ',NULL,'FFEID',0,NULL,'2021-05-27 12:22:57',0,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0',NULL,NULL),('F5733410-B7DF-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','38A81D62-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','city SFAX rue Gabes km 3',NULL,'43O7A',0,'2021-05-18 14:52:16','2021-05-18 14:50:08',0,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','1','7E69C490-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:52:16'),('FAB4E040-B7DF-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','38AB51B3-B7D9-11EB-9B33-892A2715C256','Docs','address ProviderA1','city lkalil, bhar, marsa','2021-05-18 14:53:44','DUR8Y',2,'2021-05-18 14:53:44','2021-05-18 14:50:17',0,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','1','7E69C490-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:52:24');
/*!40000 ALTER TABLE `colis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colis_history`
--

DROP TABLE IF EXISTS `colis_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colis_history` (
  `id` varchar(36) NOT NULL,
  `format` varchar(36) DEFAULT NULL,
  `users` varchar(36) DEFAULT NULL,
  `event` json DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) DEFAULT '0',
  `customer` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colis_history`
--

LOCK TABLES `colis_history` WRITE;
/*!40000 ALTER TABLE `colis_history` DISABLE KEYS */;
INSERT INTO `colis_history` VALUES ('00192FA0-B7E0-11EB-9A89-6FF88833860C','00184540-B7E0-11EB-9A89-6FF88833860C','3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"E339DC40-7B67-11EB-A8A0-B17B549DCEAD\", \"address\": \"city manar TUNIS\", \"customer\": \"38AA6753-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:50:26','0','38AA6753-B7D9-11EB-9B33-892A2715C256'),('00C63E10-B818-11EB-8A12-19E9ED793EF2','A8D8C832-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 21:31:19','0','A8D8C832-B817-11EB-8A12-19E9ED793EF2'),('014E9D60-B817-11EB-8A12-19E9ED793EF2','0AA46481-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:11','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('01BC9EB0-BC7B-11EB-A55D-579CE6C61243','57751A01-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:06','0','57751A02-B887-11EB-9993-DB409692C86F'),('033D08E0-BC96-11EB-A8FC-AB962D6F9CB8','af29d0da-8f03-4821-b5cf-2f69f789a903','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:25','0','4E7C5752-B7D9-11EB-9B33-892A2715C256'),('03B34BE0-B818-11EB-8A12-19E9ED793EF2','A8DBFC82-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:31:24','0','A8DBFC83-B817-11EB-8A12-19E9ED793EF2'),('03F2B890-BC7B-11EB-A55D-579CE6C61243','5775DD52-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:09','0','5775DD53-B887-11EB-9993-DB409692C86F'),('046E2CE0-B817-11EB-8A12-19E9ED793EF2','0AA59D02-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:16','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('06600F10-BC7B-11EB-A55D-579CE6C61243','57767992-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:13','0','57767993-B887-11EB-9993-DB409692C86F'),('06D54570-BEF4-11EB-A1D1-FBE3D561BF34','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to agence \", \"fields\": [\"\"]}','2021-05-27 15:01:26','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('070EAA50-BC96-11EB-A8FC-AB962D6F9CB8','f7daeb4e-9871-48c0-833e-05c960ce26ce','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:31','0','57720CC0-B887-11EB-9993-DB409692C86F'),('0774B620-B817-11EB-8A12-19E9ED793EF2','0AA63942-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:21','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('092EBF70-BC7B-11EB-A55D-579CE6C61243','5776EEC2-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:18','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('09BAD590-B817-11EB-8A12-19E9ED793EF2','0AA6AE72-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:25','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('09EB8B80-BC96-11EB-A8FC-AB962D6F9CB8','e739af4f-b2f4-4895-ab4b-e362c63ffe34','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:36','0','57740893-B887-11EB-9993-DB409692C86F'),('0AA59D00-B812-11EB-9160-B788CA63A9C6','0AA46483-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1B1\"}]}','2021-05-18 20:48:39','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('0AA63940-B812-11EB-9160-B788CA63A9C6','0AA59D04-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2B1\"}]}','2021-05-18 20:48:39','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('0AA6AE70-B812-11EB-9160-B788CA63A9C6','0AA63944-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3B1\"}]}','2021-05-18 20:48:39','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('0AA798D0-B812-11EB-9160-B788CA63A9C6','0AA6AE74-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16B1\"}]}','2021-05-18 20:48:39','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('0AA83510-B812-11EB-9160-B788CA63A9C6','0AA798D4-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90B1\"}]}','2021-05-18 20:48:39','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('0AA8D150-B812-11EB-9160-B788CA63A9C6','0AA83514-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100B1\"}]}','2021-05-18 20:48:39','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('0AA94680-B812-11EB-9160-B788CA63A9C6','0AA8D154-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198B1\"}]}','2021-05-18 20:48:39','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('0AAA09D0-B812-11EB-9160-B788CA63A9C6','0AA94684-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189B1\"}]}','2021-05-18 20:48:39','0','0AA94683-B812-11EB-9160-B788CA63A9C6'),('0AAAA610-B812-11EB-9160-B788CA63A9C6','0AAA09D4-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18B1\"}]}','2021-05-18 20:48:39','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('0AAB4250-B812-11EB-9160-B788CA63A9C6','0AAAA614-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278B1\"}]}','2021-05-18 20:48:39','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('0BE8AF50-BC7B-11EB-A55D-579CE6C61243','577763F2-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:23','0','577763F3-B887-11EB-9993-DB409692C86F'),('0C36AB00-B817-11EB-8A12-19E9ED793EF2','0AA798D2-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:29','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('0C77C8B0-B885-11EB-9993-DB409692C86F','38ABEDF2-B7D9-11EB-9B33-892A2715C256','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-19 10:31:54','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('0CD95CA0-BC96-11EB-A8FC-AB962D6F9CB8','e01cc67a-8647-4f22-a284-3a070ca2fd94','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:41','0','57751A02-B887-11EB-9993-DB409692C86F'),('0D064880-BF95-11EB-BE17-25C973044828','7949E100-B888-11EB-9993-DB409692C86F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-28 10:14:05','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('0E0AF310-BC7B-11EB-A55D-579CE6C61243','5777B212-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:26','0','5777B213-B887-11EB-9993-DB409692C86F'),('0FCCF120-B817-11EB-8A12-19E9ED793EF2','0AA83512-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:24:35','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('0FE69CA0-BC96-11EB-A8FC-AB962D6F9CB8','d4209128-3c66-4c25-81e0-edce898ccdd5','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:46','0','4E7886C3-B7D9-11EB-9B33-892A2715C256'),('11F6EE80-BF95-11EB-BE17-25C973044828','95578CB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-28 10:14:13','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('126E31E0-BC96-11EB-A8FC-AB962D6F9CB8','cc8e90a6-e4ff-4a0c-8bb7-4d2eaf8f3bb7','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:50','0','4E7AD0B2-B7D9-11EB-9B33-892A2715C256'),('1275EE50-BC7B-11EB-A55D-579CE6C61243','57787562-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:34','0','57787563-B887-11EB-9993-DB409692C86F'),('133706B0-B7E1-11EB-9A89-6FF88833860C','13361C50-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"38ABEDF3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:58:08','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('14E2F970-B817-11EB-8A12-19E9ED793EF2','0AA8D152-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 21:24:43','0','0AA8D152-B812-11EB-9160-B788CA63A9C6'),('163EE1C0-B7DC-11EB-88E2-C3B732A4756B','38A81D62-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-18 14:22:25','0','49654a7c-0c89-435f-94ef-2707d50230f4'),('16520870-B888-11EB-9993-DB409692C86F','38AC6322-B7D9-11EB-9B33-892A2715C256','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-19 10:53:39','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('16C09DA0-B818-11EB-8A12-19E9ED793EF2','0AA798D2-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:31:56','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('17E136C1-BF95-11EB-BE17-25C973044828','95578CB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"colis delivery\", \"fields\": [\"\"]}','2021-05-28 10:14:23','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('18A30EB0-B817-11EB-8A12-19E9ED793EF2','0AA94682-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 21:24:50','0','0AA94682-B812-11EB-9160-B788CA63A9C6'),('195E52F0-B818-11EB-8A12-19E9ED793EF2','0AA83512-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:00','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('199D8960-B819-11EB-8A12-19E9ED793EF2','32584c68-e796-4953-8848-da0f8fe88e01','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA83513-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:39:10','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('19B94930-B7E1-11EB-9A89-6FF88833860C','19B85ED0-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Envelope\", \"driver\": \"E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Jerba Midoune \", \"customer\": \"38AC6323-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:58:19','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('1AEF2360-B7DC-11EB-88E2-C3B732A4756B','38AA6753-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-18 14:22:33','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('1B0A4520-B7DF-11EB-9A89-6FF88833860C','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"38AB51B3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:44:02','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('1B42A350-B818-11EB-8A12-19E9ED793EF2','A8DBFC82-B817-11EB-8A12-19E9ED793EF2','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:04','0','A8DBFC83-B817-11EB-8A12-19E9ED793EF2'),('1CE90E40-BF95-11EB-BE17-25C973044828','7949E100-B888-11EB-9993-DB409692C86F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\", \"category\": \"3DA35E40-92D8-11EB-87F6-D75D53A493A0\"}]}','2021-05-28 10:14:32','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('1CF44AF0-B818-11EB-8A12-19E9ED793EF2','A8D6CC61-B817-11EB-8A12-19E9ED793EF2','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:06','0','A8D6CC62-B817-11EB-8A12-19E9ED793EF2'),('1DE726B0-B829-11EB-B8DA-61A52B28FD33','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 23:33:49','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('1E545020-B818-11EB-8A12-19E9ED793EF2','A8D45B61-B817-11EB-8A12-19E9ED793EF2','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:09','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('1E809AD0-B819-11EB-8A12-19E9ED793EF2','bb409989-b6e8-4816-89c0-61617c826b6b','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA8D153-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:39:19','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('1FA4BA60-B817-11EB-8A12-19E9ED793EF2','0AA8D152-B812-11EB-9160-B788CA63A9C6','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-18 21:25:01','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('20069400-B818-11EB-8A12-19E9ED793EF2','0AAAA612-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:12','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('21C7A4F0-B818-11EB-8A12-19E9ED793EF2','0AAA09D2-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:32:15','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('25C576C0-B829-11EB-B8DA-61A52B28FD33','8F011520-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 23:34:03','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('28C8E070-B7E1-11EB-9A89-6FF88833860C','28C7F610-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"027A52E0-7B60-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"38ACD853-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:58:44','0','38ACD853-B7D9-11EB-9B33-892A2715C256'),('28E2EC50-B88A-11EB-9993-DB409692C86F',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-19 11:08:29','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('2DBCF3C0-B7DF-11EB-9A89-6FF88833860C','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-18 14:44:33','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('2F5D9980-B7E1-11EB-9A89-6FF88833860C','2F5CD630-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"38AD4D83-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:58:55','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('2F995540-B829-11EB-B8DA-61A52B28FD33','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4E6C\"}]}','2021-05-18 23:34:19','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('30664030-BF92-11EB-BE17-25C973044828','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to agence \", \"fields\": [\"\"]}','2021-05-28 09:53:36','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('33501BB0-B829-11EB-B8DA-61A52B28FD33','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\", \"category\": \"3DA35E40-92D8-11EB-87F6-D75D53A493A0\"}]}','2021-05-18 23:34:25','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('342ECED0-B81C-11EB-8A12-19E9ED793EF2','b8ed0823-a06c-49f2-875e-e53fb3aa4801','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 22:01:23','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('37382B50-B829-11EB-B8DA-61A52B28FD33','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Unreachable customer\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4EHY\"}]}','2021-05-18 23:34:32','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('37EB2740-B7DF-11EB-9A89-6FF88833860C','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 14:44:50','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('38AA6750-B7D9-11EB-9B33-892A2715C256','38A81D62-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1A1\"}]}','2021-05-18 14:01:55','0','38A81D63-B7D9-11EB-9B33-892A2715C256'),('38AB51B0-B7D9-11EB-9B33-892A2715C256','38AA6753-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2A1\"}]}','2021-05-18 14:01:55','0','38AA6754-B7D9-11EB-9B33-892A2715C256'),('38ABEDF0-B7D9-11EB-9B33-892A2715C256','38AB51B3-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3A1\"}]}','2021-05-18 14:01:55','0','38AB51B4-B7D9-11EB-9B33-892A2715C256'),('38AC6320-B7D9-11EB-9B33-892A2715C256','38ABEDF3-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16A1\"}]}','2021-05-18 14:01:55','0','38ABEDF4-B7D9-11EB-9B33-892A2715C256'),('38ACD850-B7D9-11EB-9B33-892A2715C256','38AC6323-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90A1\"}]}','2021-05-18 14:01:55','0','38AC6324-B7D9-11EB-9B33-892A2715C256'),('38AD4D80-B7D9-11EB-9B33-892A2715C256','38ACD853-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100A1\"}]}','2021-05-18 14:01:55','0','38ACD854-B7D9-11EB-9B33-892A2715C256'),('38ADE9C0-B7D9-11EB-9B33-892A2715C256','38AD4D83-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198A1\"}]}','2021-05-18 14:01:55','0','38AD4D84-B7D9-11EB-9B33-892A2715C256'),('38AE37E0-B7D9-11EB-9B33-892A2715C256','38ADE9C3-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189A1\"}]}','2021-05-18 14:01:55','0','38ADE9C4-B7D9-11EB-9B33-892A2715C256'),('38AEAD10-B7D9-11EB-9B33-892A2715C256','38AE5EF2-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18A1\"}]}','2021-05-18 14:01:55','0','38AE5EF3-B7D9-11EB-9B33-892A2715C256'),('38AEFB30-B7D9-11EB-9B33-892A2715C256','38AEAD13-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278A1\"}]}','2021-05-18 14:01:55','0','38AEAD14-B7D9-11EB-9B33-892A2715C256'),('39A2D5A0-B81C-11EB-8A12-19E9ED793EF2','b8ed0823-a06c-49f2-875e-e53fb3aa4801','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 22:01:33','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('3B12A660-B829-11EB-B8DA-61A52B28FD33','8F011520-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Unreachable customer\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4EHY\"}]}','2021-05-18 23:34:38','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('3C5CBCC0-B7E0-11EB-9A89-6FF88833860C',NULL,'7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 14:52:07','0','38AA6753-B7D9-11EB-9B33-892A2715C256'),('4119FF70-B81C-11EB-8A12-19E9ED793EF2','a4b340f5-1bcf-430a-9a4b-6ba580a8c622','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 22:01:45','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('41331F00-B817-11EB-8A12-19E9ED793EF2','0AA46481-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:25:58','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('415CCC10-B7E0-11EB-9A89-6FF88833860C',NULL,'7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 14:52:16','0','38A81D62-B7D9-11EB-9B33-892A2715C256'),('430769D0-B817-11EB-8A12-19E9ED793EF2','0AA59D02-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:26:01','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('449D7DB0-B818-11EB-8A12-19E9ED793EF2','0AA94682-B812-11EB-9160-B788CA63A9C6','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-18 21:33:13','0','0AA94683-B812-11EB-9160-B788CA63A9C6'),('454A4F60-B7DF-11EB-9A89-6FF88833860C','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 14:45:13','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('45F3C210-B81C-11EB-8A12-19E9ED793EF2','a6cfa020-eaed-423a-8fe0-a08ffb4b4d87','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 22:01:53','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('46003C70-B7E0-11EB-9A89-6FF88833860C',NULL,'7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 14:52:23','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('463996F0-B817-11EB-8A12-19E9ED793EF2','0AA63942-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:26:06','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('482D9EC0-B817-11EB-8A12-19E9ED793EF2','0AA6AE72-B812-11EB-9160-B788CA63A9C6','6B757910-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 21:26:09','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('4BC9CC30-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:07','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('4E774E40-B7D9-11EB-9B33-892A2715C256','4E75A092-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1\"}]}','2021-05-18 14:02:31','0','4E75A093-B7D9-11EB-9B33-892A2715C256'),('4E781190-B7D9-11EB-9B33-892A2715C256','4E774E43-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2\"}]}','2021-05-18 14:02:31','0','4E774E44-B7D9-11EB-9B33-892A2715C256'),('4E7886C0-B7D9-11EB-9B33-892A2715C256','4E781193-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3\"}]}','2021-05-18 14:02:31','0','4E781194-B7D9-11EB-9B33-892A2715C256'),('4E78FBF0-B7D9-11EB-9B33-892A2715C256','4E7886C3-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16\"}]}','2021-05-18 14:02:31','0','4E7886C4-B7D9-11EB-9B33-892A2715C256'),('4E7A3470-B7D9-11EB-9B33-892A2715C256','4E78FBF3-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90\"}]}','2021-05-18 14:02:31','0','4E78FBF4-B7D9-11EB-9B33-892A2715C256'),('4E7AA9A0-B7D9-11EB-9B33-892A2715C256','4E7A3473-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100\"}]}','2021-05-18 14:02:31','0','4E7A3474-B7D9-11EB-9B33-892A2715C256'),('4E7B45E0-B7D9-11EB-9B33-892A2715C256','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198\"}]}','2021-05-18 14:02:31','0','4E7AD0B3-B7D9-11EB-9B33-892A2715C256'),('4E7BE220-B7D9-11EB-9B33-892A2715C256','4E7B45E3-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189\"}]}','2021-05-18 14:02:31','0','4E7B45E4-B7D9-11EB-9B33-892A2715C256'),('4E7C3040-B7D9-11EB-9B33-892A2715C256','4E7BE223-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18\"}]}','2021-05-18 14:02:31','0','4E7BE224-B7D9-11EB-9B33-892A2715C256'),('4E7CA570-B7D9-11EB-9B33-892A2715C256','4E7C5752-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278\"}]}','2021-05-18 14:02:31','0','4E7C5753-B7D9-11EB-9B33-892A2715C256'),('4FB3CC40-B7E1-11EB-9A89-6FF88833860C',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 14:59:49','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('512919B0-BEDD-11EB-950A-431B543C5D1E','8A6104E1-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:18:52','0','8A6104E2-BD66-11EB-8E1B-F15C649B08E4'),('51600100-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:17','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('52BE38A0-BEDD-11EB-950A-431B543C5D1E','8A6300B2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:18:55','0','8A6300B3-BD66-11EB-8E1B-F15C649B08E4'),('5433FD30-B7E1-11EB-9A89-6FF88833860C',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 14:59:57','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('543D5760-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:21','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('54E118A0-BEDD-11EB-950A-431B543C5D1E','8A6375E2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:18:58','0','8A6375E3-BD66-11EB-8E1B-F15C649B08E4'),('569187C0-BEDD-11EB-950A-431B543C5D1E','8A65E6E2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:19:01','0','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4'),('57736C50-B887-11EB-9993-DB409692C86F','57720CC1-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1\"}]}','2021-05-19 10:48:19','0','57720CC0-B887-11EB-9993-DB409692C86F'),('57740890-B887-11EB-9993-DB409692C86F','57736C54-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2\"}]}','2021-05-19 10:48:19','0','57736C53-B887-11EB-9993-DB409692C86F'),('5774F2F0-B887-11EB-9993-DB409692C86F','57740894-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3\"}]}','2021-05-19 10:48:19','0','57740893-B887-11EB-9993-DB409692C86F'),('5775DD50-B887-11EB-9993-DB409692C86F','57751A03-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16\"}]}','2021-05-19 10:48:19','0','57751A02-B887-11EB-9993-DB409692C86F'),('57767990-B887-11EB-9993-DB409692C86F','5775DD54-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90\"}]}','2021-05-19 10:48:19','0','5775DD53-B887-11EB-9993-DB409692C86F'),('5776EEC0-B887-11EB-9993-DB409692C86F','57767994-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100\"}]}','2021-05-19 10:48:19','0','57767993-B887-11EB-9993-DB409692C86F'),('577763F0-B887-11EB-9993-DB409692C86F','5776EEC4-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198\"}]}','2021-05-19 10:48:19','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('5777B210-B887-11EB-9993-DB409692C86F','577763F4-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189\"}]}','2021-05-19 10:48:19','0','577763F3-B887-11EB-9993-DB409692C86F'),('57787560-B887-11EB-9993-DB409692C86F','5777B214-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18\"}]}','2021-05-19 10:48:19','0','5777B213-B887-11EB-9993-DB409692C86F'),('5778C380-B887-11EB-9993-DB409692C86F','57787564-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278\"}]}','2021-05-19 10:48:19','0','57787563-B887-11EB-9993-DB409692C86F'),('578AADA0-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:27','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('58A5A360-B88A-11EB-9993-DB409692C86F','680D3090-B888-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-19 11:09:49','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('59751FB0-BEDD-11EB-950A-431B543C5D1E','E757E190-BE66-11EB-8056-53D92DA39177','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:19:06','0','E75808A0-BE66-11EB-8056-53D92DA39177'),('59D1D320-B7E1-11EB-9A89-6FF88833860C',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 15:00:06','0','38ACD853-B7D9-11EB-9B33-892A2715C256'),('5AD6D950-B7DC-11EB-88E2-C3B732A4756B','38A81D62-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 14:24:20','0','49654a7c-0c89-435f-94ef-2707d50230f4'),('5B726F20-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:34','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('5C882C10-BEDD-11EB-950A-431B543C5D1E','8A6104E1-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:19:11','0','8A6104E2-BD66-11EB-8E1B-F15C649B08E4'),('5ECEFC40-B7E1-11EB-9A89-6FF88833860C',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 15:00:15','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('6034D3D0-BEF2-11EB-A1D1-FBE3D561BF34','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 14:49:37','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('610F61E0-BEDD-11EB-950A-431B543C5D1E','8A6300B2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:19:19','0','8A6300B3-BD66-11EB-8E1B-F15C649B08E4'),('6319FEF0-BEDD-11EB-950A-431B543C5D1E','8A6375E2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:19:22','0','8A6375E3-BD66-11EB-8E1B-F15C649B08E4'),('64A11420-BEDD-11EB-950A-431B543C5D1E','8A65E6E2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:19:25','0','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4'),('64A4FF30-BEF2-11EB-A1D1-FBE3D561BF34','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 14:49:44','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('6555DE00-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:31:50','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('66C37EF0-BEDD-11EB-950A-431B543C5D1E','E757E190-BE66-11EB-8056-53D92DA39177','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:19:28','0','E75808A0-BE66-11EB-8056-53D92DA39177'),('67385600-B828-11EB-B8DA-61A52B28FD33',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 23:28:43','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('6762BF30-B819-11EB-8A12-19E9ED793EF2','f604d718-151f-40a1-9daf-e6b9f980bc91','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AAA09D3-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:41:21','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('681064C0-BEF2-11EB-A1D1-FBE3D561BF34','8A679491-BD66-11EB-8E1B-F15C649B08E4','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 14:49:50','0','8A679492-BD66-11EB-8E1B-F15C649B08E4'),('6815BC10-B888-11EB-9993-DB409692C86F','680D3090-B888-11EB-9993-DB409692C86F','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"38AE5EF2-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-19 10:55:56','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('688928B0-B817-11EB-8A12-19E9ED793EF2','b8ed0823-a06c-49f2-875e-e53fb3aa4801','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA46482-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:27:04','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('6A28D820-B7D9-11EB-9B33-892A2715C256','38A81D62-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:03:18','0','38A81D61-B7D9-11EB-9B33-892A2715C256'),('6AD4EF40-B7DC-11EB-88E2-C3B732A4756B','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 14:24:47','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('6B7036F0-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:32:00','0','57787563-B887-11EB-9993-DB409692C86F'),('6C58B070-B7D9-11EB-9B33-892A2715C256','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:03:21','0','38AA6752-B7D9-11EB-9B33-892A2715C256'),('6E26EEE0-B828-11EB-B8DA-61A52B28FD33',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 23:28:55','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('6E805D20-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:32:06','0','5777B213-B887-11EB-9993-DB409692C86F'),('6EA863A0-B817-11EB-8A12-19E9ED793EF2','bf7e2cfb-1b28-4e84-b84d-8c669f247efa','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA59D03-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:27:14','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('6EB30010-B819-11EB-8A12-19E9ED793EF2','838c12e6-fedc-4f2a-9119-099eab94c0d6','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AAAA613-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:41:33','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('6EDB63B0-B7D9-11EB-9B33-892A2715C256','38A81D62-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:03:26','0','38A81D61-B7D9-11EB-9B33-892A2715C256'),('70BE6640-BC94-11EB-A8FC-AB962D6F9CB8',NULL,'8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-24 14:32:09','0','577763F3-B887-11EB-9993-DB409692C86F'),('712CA6B0-B7D9-11EB-9B33-892A2715C256','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:03:29','0','38AA6752-B7D9-11EB-9B33-892A2715C256'),('717D7E70-B7DC-11EB-88E2-C3B732A4756B','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 14:24:58','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('71C3D970-B7E0-11EB-9A89-6FF88833860C','FAB4E040-B7DF-11EB-9A89-6FF88833860C','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 14:53:37','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('72387FC0-BEDC-11EB-950A-431B543C5D1E','8A66F851-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:12:38','0','8A66F852-BD66-11EB-8E1B-F15C649B08E4'),('74E10A80-BEDC-11EB-950A-431B543C5D1E','8A679491-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 12:12:42','0','8A679492-BD66-11EB-8E1B-F15C649B08E4'),('75B055E0-B7E0-11EB-9A89-6FF88833860C','FAB4E040-B7DF-11EB-9A89-6FF88833860C','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','{\"action\": \"colis delivery\", \"fields\": [\"\"]}','2021-05-18 14:53:43','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('76103B70-B828-11EB-B8DA-61A52B28FD33',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 23:29:08','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('76E20830-B819-11EB-8A12-19E9ED793EF2','394a4532-9946-4fe4-86ab-8291cab8721d','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"A8D45B62-B817-11EB-8A12-19E9ED793EF2\"}]}','2021-05-18 21:41:47','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('792AE400-BC7D-11EB-A55D-579CE6C61243','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:47:45','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('794AA450-B888-11EB-9993-DB409692C86F','7949E100-B888-11EB-9993-DB409692C86F','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"38AEAD13-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-19 10:56:25','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('79B28FC0-BEDC-11EB-950A-431B543C5D1E','8A641222-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-27 12:12:50','0','8A641222-BD66-11EB-8E1B-F15C649B08E4'),('7A8A83F0-BC91-11EB-A55D-579CE6C61243','7A849080-BC91-11EB-A55D-579CE6C61243','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"city SFAX rue Gabes km 3\", \"customer\": \"0AA46482-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-24 14:10:57','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('7C5FD040-BC7D-11EB-A55D-579CE6C61243','38AC6322-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:47:50','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('7E16D440-BEDC-11EB-950A-431B543C5D1E','8A679491-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-27 12:12:58','0','8A679491-BD66-11EB-8E1B-F15C649B08E4'),('7E221510-B81C-11EB-8A12-19E9ED793EF2','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"0AA83513-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 22:03:27','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('7F3E1100-BC7D-11EB-A55D-579CE6C61243','4E75A091-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:47:55','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('7FDB7230-BEDD-11EB-950A-431B543C5D1E','bb409989-b6e8-4816-89c0-61617c826b6b','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-27 12:20:10','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('81296B30-B828-11EB-B8DA-61A52B28FD33',NULL,'4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked colis\", \"fields\": [\" \"]}','2021-05-18 23:29:27','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('82015FA0-BC91-11EB-A55D-579CE6C61243','82002720-BC91-11EB-A55D-579CE6C61243','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"city SFAX rue Gabes km 3\", \"customer\": \"4E75A092-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:11:10','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('8307EA40-BC7D-11EB-A55D-579CE6C61243','4E7BE222-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:02','0','4E7BE223-B7D9-11EB-9B33-892A2715C256'),('83A97CD0-B81C-11EB-8A12-19E9ED793EF2','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"city SFAX rue Gabes km 3\", \"customer\": \"A8D45B62-B817-11EB-8A12-19E9ED793EF2\"}]}','2021-05-18 22:03:37','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('848E9EF0-B817-11EB-8A12-19E9ED793EF2','a4b340f5-1bcf-430a-9a4b-6ba580a8c622','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA63943-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:27:51','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('875C5040-BC7D-11EB-A55D-579CE6C61243','4E774E42-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:09','0','4E774E43-B7D9-11EB-9B33-892A2715C256'),('8762C8D0-BC91-11EB-A55D-579CE6C61243','825a2d32-7386-44e6-91e9-e4b3238714a4','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E774E43-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:11:19','0','4E774E43-B7D9-11EB-9B33-892A2715C256'),('8904BDC0-B817-11EB-8A12-19E9ED793EF2','86e0f275-9ab1-4ba7-8a34-3511a3775035','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA6AE73-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:27:58','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('8A106F20-B81C-11EB-8A12-19E9ED793EF2','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Envelope\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"0AAAA613-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 22:03:47','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('8A49AC30-BC7D-11EB-A55D-579CE6C61243','4E7886C2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:14','0','4E7886C3-B7D9-11EB-9B33-892A2715C256'),('8A6300B0-BD66-11EB-8E1B-F15C649B08E4','8A6104E3-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1\"}]}','2021-05-25 15:36:07','0','8A6104E2-BD66-11EB-8E1B-F15C649B08E4'),('8A6375E0-BD66-11EB-8E1B-F15C649B08E4','8A6300B4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2\"}]}','2021-05-25 15:36:07','0','8A6300B3-BD66-11EB-8E1B-F15C649B08E4'),('8A641220-BD66-11EB-8E1B-F15C649B08E4','8A6375E4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3\"}]}','2021-05-25 15:36:07','0','8A6375E3-BD66-11EB-8E1B-F15C649B08E4'),('8A64D570-BD66-11EB-8E1B-F15C649B08E4','8A641224-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16\"}]}','2021-05-25 15:36:07','0','8A641223-BD66-11EB-8E1B-F15C649B08E4'),('8A6571B0-BD66-11EB-8E1B-F15C649B08E4','8A64D574-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90\"}]}','2021-05-25 15:36:07','0','8A64D573-BD66-11EB-8E1B-F15C649B08E4'),('8A65E6E0-BD66-11EB-8E1B-F15C649B08E4','8A6571B4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100\"}]}','2021-05-25 15:36:07','0','8A6571B3-BD66-11EB-8E1B-F15C649B08E4'),('8A663500-BD66-11EB-8E1B-F15C649B08E4','8A65E6E4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198\"}]}','2021-05-25 15:36:07','0','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4'),('8A66D140-BD66-11EB-8E1B-F15C649B08E4','8A665C13-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189\"}]}','2021-05-25 15:36:07','0','8A665C12-BD66-11EB-8E1B-F15C649B08E4'),('8A676D80-BD66-11EB-8E1B-F15C649B08E4','8A66F853-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18\"}]}','2021-05-25 15:36:07','0','8A66F852-BD66-11EB-8E1B-F15C649B08E4'),('8A6830D0-BD66-11EB-8E1B-F15C649B08E4','8A679493-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278\"}]}','2021-05-25 15:36:07','0','8A679492-BD66-11EB-8E1B-F15C649B08E4'),('8C8CCE50-BC91-11EB-A55D-579CE6C61243','07cc1c08-78b8-4621-9779-ff055b7747e7','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E781193-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:11:27','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('8D765B10-BC7D-11EB-A55D-579CE6C61243','4E78FBF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:19','0','4E78FBF3-B7D9-11EB-9B33-892A2715C256'),('8F01D870-B81C-11EB-8A12-19E9ED793EF2','8F011520-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"38ADE9C3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 22:03:56','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('8F52F090-B81A-11EB-8A12-19E9ED793EF2','a4b340f5-1bcf-430a-9a4b-6ba580a8c622','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:49:37','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('8FAA18A0-B817-11EB-8A12-19E9ED793EF2','a6cfa020-eaed-423a-8fe0-a08ffb4b4d87','02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"6D01BF40-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2\", \"customer\": \"0AA798D3-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 21:28:09','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('91818310-BC7D-11EB-A55D-579CE6C61243','4E7AD0B1-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:26','0','4E7AD0B2-B7D9-11EB-9B33-892A2715C256'),('943D47B0-BC7D-11EB-A55D-579CE6C61243','4E7B45E2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:30','0','4E7B45E3-B7D9-11EB-9B33-892A2715C256'),('95589E20-B81C-11EB-8A12-19E9ED793EF2','95578CB0-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"0AA6AE73-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 22:04:06','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('95690660-BC91-11EB-A55D-579CE6C61243','d4209128-3c66-4c25-81e0-edce898ccdd5','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7886C3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:11:42','0','4E7886C3-B7D9-11EB-9B33-892A2715C256'),('97B43570-B7DC-11EB-8ECD-238ADAF99B88','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 14:26:03','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('97E9E2B0-BEF3-11EB-A1D1-FBE3D561BF34','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 14:58:19','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('98C0D400-BC7D-11EB-A55D-579CE6C61243','4E7C5751-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:38','0','4E7C5752-B7D9-11EB-9B33-892A2715C256'),('9B148360-B81C-11EB-8A12-19E9ED793EF2','9B11EB50-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"0AA63943-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 22:04:16','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('9B344500-BC7D-11EB-A55D-579CE6C61243','5771E5B1-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:42','0','57720CC0-B887-11EB-9993-DB409692C86F'),('9DB32F70-B7E2-11EB-A38A-3F932768D50B','13361C50-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4E6C\"}]}','2021-05-18 15:09:10','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('9E27F1A0-B7DF-11EB-9A89-6FF88833860C','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange To\", \"fields\": [\" \"]}','2021-05-18 14:47:42','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('9E8EA350-BEDD-11EB-950A-431B543C5D1E','bf7e2cfb-1b28-4e84-b84d-8c669f247efa','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-27 12:21:02','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('9EDBC930-BC7D-11EB-A55D-579CE6C61243','57736C52-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:48','0','57736C53-B887-11EB-9993-DB409692C86F'),('9FC85C00-BC91-11EB-A55D-579CE6C61243','6ca81b68-9865-4828-8178-d1eb77809b3b','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E78FBF3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:00','0','4E78FBF3-B7D9-11EB-9B33-892A2715C256'),('A15995D0-B81C-11EB-8A12-19E9ED793EF2','A158D280-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Envelope\", \"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"address\": \"Jerba Midoune \", \"customer\": \"0AA798D3-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-18 22:04:27','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('A1651BA0-B829-11EB-B8DA-61A52B28FD33','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to agence \", \"fields\": [\"\"]}','2021-05-18 23:37:30','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('A18BAC20-BEDC-11EB-950A-431B543C5D1E','8A64D572-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-27 12:13:57','0','8A64D572-BD66-11EB-8E1B-F15C649B08E4'),('A1E4B2E0-B7DC-11EB-8ECD-238ADAF99B88','38A81D62-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 14:26:20','0','49654a7c-0c89-435f-94ef-2707d50230f4'),('A2466B70-BC7D-11EB-A55D-579CE6C61243','57740892-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:54','0','57740893-B887-11EB-9993-DB409692C86F'),('A25148A0-B7E2-11EB-A38A-3F932768D50B','19B85ED0-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (cancel)\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4E6C\"}]}','2021-05-18 15:09:17','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('A2C60C70-BED2-11EB-89E7-5379C8B930C3','8A641222-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 11:02:24','0','8A641223-BD66-11EB-8E1B-F15C649B08E4'),('A2E672D0-B7D9-11EB-823A-3D3E24BF9832','38A81D62-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:04:53','0','38A81D61-B7D9-11EB-9B33-892A2715C256'),('A366A810-B815-11EB-8A12-19E9ED793EF2','0AA46481-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:24','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('A4C3FE80-BC91-11EB-A55D-579CE6C61243','010d126f-ff9d-4639-9699-9c853a1ded8e','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7A3473-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:08','0','4E7A3473-B7D9-11EB-9B33-892A2715C256'),('A4CA40E0-BED2-11EB-89E7-5379C8B930C3','8A64D572-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 11:02:28','0','8A64D573-BD66-11EB-8E1B-F15C649B08E4'),('A525F470-BEDD-11EB-950A-431B543C5D1E','f604d718-151f-40a1-9daf-e6b9f980bc91','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-27 12:21:13','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('A543F400-BC7D-11EB-A55D-579CE6C61243','57751A01-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:48:59','0','57751A02-B887-11EB-9993-DB409692C86F'),('A59C4CC0-B815-11EB-8A12-19E9ED793EF2','0AA59D02-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:27','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('A5E9B1A0-B7E2-11EB-A38A-3F932768D50B','2F5CD630-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\", \"category\": \"3DA35E40-92D8-11EB-87F6-D75D53A493A0\"}]}','2021-05-18 15:09:23','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('A862D0F0-BED2-11EB-89E7-5379C8B930C3','8A6571B2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-27 11:02:34','0','8A6571B3-BD66-11EB-8E1B-F15C649B08E4'),('A86D3E50-B7D9-11EB-823A-3D3E24BF9832','38AA6753-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:05:02','0','38AA6752-B7D9-11EB-9B33-892A2715C256'),('A897C2D0-BC91-11EB-A55D-579CE6C61243','cc8e90a6-e4ff-4a0c-8bb7-4d2eaf8f3bb7','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7AD0B2-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:14','0','4E7AD0B2-B7D9-11EB-9B33-892A2715C256'),('A8B43B20-B815-11EB-8A12-19E9ED793EF2','0AA63942-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:32','0','0AA63943-B812-11EB-9160-B788CA63A9C6'),('A8D6A550-B817-11EB-8A12-19E9ED793EF2','A8D45B63-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@gmail.com\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"client1B2\"}]}','2021-05-18 21:28:52','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('A8D7B6C0-B817-11EB-8A12-19E9ED793EF2','A8D6CC63-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2B2\"}]}','2021-05-18 21:28:52','0','A8D6CC62-B817-11EB-8A12-19E9ED793EF2'),('A8D8C830-B817-11EB-8A12-19E9ED793EF2','A8D7DDD3-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3B2\"}]}','2021-05-18 21:28:52','0','A8D7DDD2-B817-11EB-8A12-19E9ED793EF2'),('A8D96470-B817-11EB-8A12-19E9ED793EF2','A8D8C834-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16B2\"}]}','2021-05-18 21:28:52','0','A8D8C833-B817-11EB-8A12-19E9ED793EF2'),('A8D9D9A0-B817-11EB-8A12-19E9ED793EF2','A8D96474-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90B2\"}]}','2021-05-18 21:28:52','0','A8D96473-B817-11EB-8A12-19E9ED793EF2'),('A8DA4ED0-B817-11EB-8A12-19E9ED793EF2','A8D9D9A4-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100B2\"}]}','2021-05-18 21:28:52','0','A8D9D9A3-B817-11EB-8A12-19E9ED793EF2'),('A8DB1220-B817-11EB-8A12-19E9ED793EF2','A8DA4ED4-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198B2\"}]}','2021-05-18 21:28:52','0','A8DA4ED3-B817-11EB-8A12-19E9ED793EF2'),('A8DB8750-B817-11EB-8A12-19E9ED793EF2','A8DB1224-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189B2\"}]}','2021-05-18 21:28:52','0','A8DB1223-B817-11EB-8A12-19E9ED793EF2'),('A8DBFC80-B817-11EB-8A12-19E9ED793EF2','A8DB8754-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18B2\"}]}','2021-05-18 21:28:52','0','A8DB8753-B817-11EB-8A12-19E9ED793EF2'),('A8DC4AA0-B817-11EB-8A12-19E9ED793EF2','A8DBFC84-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278B2\"}]}','2021-05-18 21:28:52','0','A8DBFC83-B817-11EB-8A12-19E9ED793EF2'),('A93E5320-BC7D-11EB-A55D-579CE6C61243','57787562-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:06','0','57787563-B887-11EB-9993-DB409692C86F'),('ABD0E470-B815-11EB-8A12-19E9ED793EF2','0AA6AE72-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:38','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('ABFAA5D0-B810-11EB-9160-B788CA63A9C6','13361C50-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-18 20:38:50','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('AC240DF0-BC7D-11EB-A55D-579CE6C61243','5777B212-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:10','0','5777B213-B887-11EB-9993-DB409692C86F'),('AC9F6860-BC91-11EB-A55D-579CE6C61243','982358c1-682a-4a84-ab64-172a0f9350df','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7B45E3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:21','0','4E7B45E3-B7D9-11EB-9B33-892A2715C256'),('AE73CF40-B828-11EB-B8DA-61A52B28FD33','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 23:30:42','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('AEC7D060-B7E0-11EB-9A89-6FF88833860C','38ABEDF2-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:19','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('AF1A2C30-BEDD-11EB-950A-431B543C5D1E','bb409989-b6e8-4816-89c0-61617c826b6b','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-27 12:21:29','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('AF4DEF80-B810-11EB-9160-B788CA63A9C6','13361C50-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-18 20:38:56','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('AF62BDC0-B815-11EB-8A12-19E9ED793EF2','0AA798D2-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:44','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('AFF22CF0-BC7D-11EB-A55D-579CE6C61243','577763F2-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:17','0','577763F3-B887-11EB-9993-DB409692C86F'),('B09C86A0-BC91-11EB-A55D-579CE6C61243','2808d987-85e8-4b6e-a82b-67f16393de63','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7BE223-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:28','0','4E7BE223-B7D9-11EB-9B33-892A2715C256'),('B0EE59E0-B7E0-11EB-9A89-6FF88833860C','38AC6322-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:23','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('B1F3C8E0-B815-11EB-8A12-19E9ED793EF2','0AA83512-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:14:48','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('B1FB3530-B810-11EB-9160-B788CA63A9C6','19B85ED0-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-18 20:39:00','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('B255CF30-BEDD-11EB-950A-431B543C5D1E','bf7e2cfb-1b28-4e84-b84d-8c669f247efa','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-27 12:21:35','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('B3FB34D0-B819-11EB-8A12-19E9ED793EF2','32584c68-e796-4953-8848-da0f8fe88e01','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:43:29','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('B4479630-B810-11EB-9160-B788CA63A9C6','2F5CD630-B7E1-11EB-9A89-6FF88833860C','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-18 20:39:04','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('B49C6400-BC91-11EB-A55D-579CE6C61243','af29d0da-8f03-4821-b5cf-2f69f789a903','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"4E7C5752-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-24 14:12:35','0','4E7C5752-B7D9-11EB-9B33-892A2715C256'),('B5804B70-BC7D-11EB-A55D-579CE6C61243','5776EEC2-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:26','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('B60F37A0-B7E0-11EB-9A89-6FF88833860C','38ACD852-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:31','0','38ACD853-B7D9-11EB-9B33-892A2715C256'),('B74FB930-B828-11EB-B8DA-61A52B28FD33','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 23:30:57','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('B75118C0-B828-11EB-B8DA-61A52B28FD33','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 23:30:57','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('B800B4C0-BC7D-11EB-A55D-579CE6C61243','57767992-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:30','0','57767993-B887-11EB-9993-DB409692C86F'),('B844D260-BEDD-11EB-950A-431B543C5D1E','f604d718-151f-40a1-9daf-e6b9f980bc91','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-27 12:21:45','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('B845AFC0-B819-11EB-8A12-19E9ED793EF2','32584c68-e796-4953-8848-da0f8fe88e01','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 21:43:37','0','0AA83513-B812-11EB-9160-B788CA63A9C6'),('B9368590-BC91-11EB-A55D-579CE6C61243','f7daeb4e-9871-48c0-833e-05c960ce26ce','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"57720CC0-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:12:42','0','57720CC0-B887-11EB-9993-DB409692C86F'),('B97AEB50-B7E0-11EB-9A89-6FF88833860C','38AD4D82-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:37','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('BA3DFA90-BC7D-11EB-A55D-579CE6C61243','5775DD52-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-24 11:49:34','0','5775DD53-B887-11EB-9993-DB409692C86F'),('BCA661B0-B7E0-11EB-9A89-6FF88833860C','38ADE9C2-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:43','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('BD4943F0-BEDC-11EB-950A-431B543C5D1E','8A641222-BD66-11EB-8E1B-F15C649B08E4','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-27 12:14:44','0','8A641223-BD66-11EB-8E1B-F15C649B08E4'),('BD622BB0-BEF3-11EB-A1D1-FBE3D561BF34','680D3090-B888-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\", \"category\": \"3DA35E40-92D8-11EB-87F6-D75D53A493A0\"}]}','2021-05-27 14:59:22','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('BE34C020-BC91-11EB-A55D-579CE6C61243','99bd64f5-dd33-4d62-a825-b8008929ff6c','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"57736C53-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:12:51','0','57736C53-B887-11EB-9993-DB409692C86F'),('BE48AA90-B7E1-11EB-9A89-6FF88833860C','13361C50-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 15:02:55','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('BF07D150-B7E0-11EB-9A89-6FF88833860C','4E7A3472-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:55:47','0','4E7A3473-B7D9-11EB-9B33-892A2715C256'),('BF342190-B819-11EB-8A12-19E9ED793EF2','394a4532-9946-4fe4-86ab-8291cab8721d','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:43:48','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('BF74AF70-BEDC-11EB-950A-431B543C5D1E','8A64D572-BD66-11EB-8E1B-F15C649B08E4','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-27 12:14:47','0','8A64D573-BD66-11EB-8E1B-F15C649B08E4'),('C0EDD580-B887-11EB-9993-DB409692C86F','4E75A091-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-19 10:51:16','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('C11C44F0-BEDC-11EB-950A-431B543C5D1E','8A679491-BD66-11EB-8E1B-F15C649B08E4','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"reschedule package\", \"fields\": [\" \"]}','2021-05-27 12:14:50','0','8A679492-BD66-11EB-8E1B-F15C649B08E4'),('C1CD3710-B7D9-11EB-86D6-F93BB6DDE5AD','38A81D62-B7D9-11EB-9B33-892A2715C256','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"customer\": \"38A81D62-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:05:45','0','49654a7c-0c89-435f-94ef-2707d50230f4'),('C1D93710-BC91-11EB-A55D-579CE6C61243','e739af4f-b2f4-4895-ab4b-e362c63ffe34','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"57740893-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:12:57','0','57740893-B887-11EB-9993-DB409692C86F'),('C2C90820-B819-11EB-8A12-19E9ED793EF2','394a4532-9946-4fe4-86ab-8291cab8721d','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 21:43:54','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('C2D4BC90-BF9B-11EB-BE17-25C973044828','7949E100-B888-11EB-9993-DB409692C86F','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-28 11:02:07','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('C4BAD100-BEF3-11EB-A1D1-FBE3D561BF34','7A849080-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-27 14:59:35','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('C56CE520-BC91-11EB-A55D-579CE6C61243','e01cc67a-8647-4f22-a284-3a070ca2fd94','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"57751A02-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:03','0','57751A02-B887-11EB-9993-DB409692C86F'),('C718CE50-B7D9-11EB-86D6-F93BB6DDE5AD','38AA6753-B7D9-11EB-9B33-892A2715C256','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"792F61B0-7B5F-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"38AA6753-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:05:54','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('C7431900-B7E1-11EB-9A89-6FF88833860C','19B85ED0-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 15:03:10','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('C9ADE5F0-B87A-11EB-B6D9-F3F763F8DA54','4E781192-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-19 09:18:27','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('C9C0A1B0-B819-11EB-8A12-19E9ED793EF2','838c12e6-fedc-4f2a-9119-099eab94c0d6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:44:06','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('C9DAEDA0-BC91-11EB-A55D-579CE6C61243','9c84ae0b-a694-43c2-b7c9-f2d7e661cac9','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"5775DD53-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:10','0','5775DD53-B887-11EB-9993-DB409692C86F'),('CAC02740-B7E0-11EB-9A89-6FF88833860C','38ABEDF2-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 14:56:06','0','38ABEDF2-B7D9-11EB-9B33-892A2715C256'),('CBF47A90-B87A-11EB-B6D9-F3F763F8DA54','4E7886C2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-19 09:18:31','0','4E7886C3-B7D9-11EB-9B33-892A2715C256'),('CC067E00-BEF3-11EB-A1D1-FBE3D561BF34','82002720-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-27 14:59:47','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('CC0879D0-BEF3-11EB-A1D1-FBE3D561BF34','82002720-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-27 14:59:47','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('CC7052D0-B7E1-11EB-9A89-6FF88833860C','2F5CD630-B7E1-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-18 15:03:19','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('CC930890-BEDD-11EB-950A-431B543C5D1E','b6b95e1e-5392-41c6-8447-5804ed5f4af1','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"027A52E0-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"8A6104E2-BD66-11EB-8E1B-F15C649B08E4\"}]}','2021-05-27 12:22:19','0','8A6104E2-BD66-11EB-8E1B-F15C649B08E4'),('CE3C4BF0-BC91-11EB-A55D-579CE6C61243','85ad00fd-5e2f-4e41-8cb2-6f06b9e2ba70','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"57767993-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:18','0','57767993-B887-11EB-9993-DB409692C86F'),('CE696680-BC7D-11EB-A55D-579CE6C61243','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:08','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('CE7C0FD0-B87A-11EB-B6D9-F3F763F8DA54','4E781192-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-19 09:18:35','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('CEDA6570-B817-11EB-8A12-19E9ED793EF2','0AA8D152-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:29:55','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('CF1A90D0-B819-11EB-8A12-19E9ED793EF2','838c12e6-fedc-4f2a-9119-099eab94c0d6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 21:44:15','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('D00F40F0-B7E0-11EB-9A89-6FF88833860C','38AC6322-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 14:56:15','0','38AC6322-B7D9-11EB-9B33-892A2715C256'),('D03BDC90-BC7D-11EB-A55D-579CE6C61243','38AC6322-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:11','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('D0A42AC0-B7DC-11EB-8ECD-238ADAF99B88','38A81D62-B7D9-11EB-9B33-892A2715C256','7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange To\", \"fields\": [\" \"]}','2021-05-18 14:27:38','0','49654a7c-0c89-435f-94ef-2707d50230f4'),('D1599640-B817-11EB-8A12-19E9ED793EF2','0AAA09D2-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:00','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('D1650330-BC91-11EB-A55D-579CE6C61243','ac21e2d2-ce98-4663-87b0-221d1c1a7d33','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"5776EEC3-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:23','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('D1BC4AC0-BEDD-11EB-950A-431B543C5D1E','aae56cb3-64a6-45d7-8372-572e605a8946','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create exchange\", \"fields\": [{\"driver\": \"027A52E0-7B60-11EB-A8A0-B17B549DCEAD\", \"ToAgence\": \"2856CA10-7A9E-11EB-BF37-2BA4FB3989B2\", \"customer\": \"8A6104E2-BD66-11EB-8E1B-F15C649B08E4\"}]}','2021-05-27 12:22:28','0','8A6104E2-BD66-11EB-8E1B-F15C649B08E4'),('D2202CF0-BC7D-11EB-A55D-579CE6C61243','38AE5EF1-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:14','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('D465F700-B887-11EB-9993-DB409692C86F','38AEAD12-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-19 10:51:48','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('D4B0C2E0-BC7D-11EB-A55D-579CE6C61243','4E774E42-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:19','0','4E774E43-B7D9-11EB-9B33-892A2715C256'),('D5A4AF40-B7DC-11EB-8ECD-238ADAF99B88','38AA6753-B7D9-11EB-9B33-892A2715C256','7E69C490-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked exchange To\", \"fields\": [\" \"]}','2021-05-18 14:27:46','0','ea2f792c-806a-41aa-b753-6f3ee6c94b6c'),('D60D3340-B817-11EB-8A12-19E9ED793EF2','0AAAA612-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:07','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('D64DB9F0-BC91-11EB-A55D-579CE6C61243','D64BBE20-BC91-11EB-A55D-579CE6C61243','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"577763F3-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:31','0','577763F3-B887-11EB-9993-DB409692C86F'),('D66D2C00-BC95-11EB-A8FC-AB962D6F9CB8','010d126f-ff9d-4639-9699-9c853a1ded8e','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:09','0','4E7A3473-B7D9-11EB-9B33-892A2715C256'),('D676C390-BEF3-11EB-A1D1-FBE3D561BF34','82002720-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-27 15:00:04','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('D7158DE0-BC7D-11EB-A55D-579CE6C61243','4E75A091-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:23','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('D72966C0-B819-11EB-8A12-19E9ED793EF2','86e0f275-9ab1-4ba7-8a34-3511a3775035','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:44:28','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('D7B17260-B7E0-11EB-9A89-6FF88833860C','38ACD852-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:56:28','0','38ACD853-B7D9-11EB-9B33-892A2715C256'),('D84EE5E0-B817-11EB-8A12-19E9ED793EF2','A8D45B61-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:11','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('D8F3FA90-BEDD-11EB-950A-431B543C5D1E','D8E37FD0-BEDD-11EB-950A-431B543C5D1E','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"0AA8D153-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-27 12:22:40','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('D99ED0D0-BC7D-11EB-A55D-579CE6C61243','4E781192-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:27','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('D9B076B0-B7E0-11EB-9A89-6FF88833860C','38AD4D82-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:56:31','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('D9E622F0-BC91-11EB-A55D-579CE6C61243','D9E586B0-BC91-11EB-A55D-579CE6C61243','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"5777B213-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:37','0','5777B213-B887-11EB-9993-DB409692C86F'),('DA7C64C0-BEDC-11EB-950A-431B543C5D1E','8A6571B2-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:15:33','0','8A6571B3-BD66-11EB-8E1B-F15C649B08E4'),('DA819270-B819-11EB-8A12-19E9ED793EF2','86e0f275-9ab1-4ba7-8a34-3511a3775035','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"done exchange\", \"fields\": [\"\"]}','2021-05-18 21:44:34','0','0AA6AE73-B812-11EB-9160-B788CA63A9C6'),('DB1C5DC0-B817-11EB-8A12-19E9ED793EF2','A8D6CC61-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:16','0','A8D6CC62-B817-11EB-8A12-19E9ED793EF2'),('DB7C3600-B7E0-11EB-9A89-6FF88833860C','38ADE9C2-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:56:34','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('DB8A8180-B81A-11EB-8A12-19E9ED793EF2','a6cfa020-eaed-423a-8fe0-a08ffb4b4d87','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"onGoing exchange\", \"fields\": [\"\"]}','2021-05-18 21:51:45','0','0AA798D3-B812-11EB-9160-B788CA63A9C6'),('DB95E5E0-BC7D-11EB-A55D-579CE6C61243','4E781192-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:30','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('DC44AF90-BC95-11EB-A8FC-AB962D6F9CB8','07cc1c08-78b8-4621-9779-ff055b7747e7','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:19','0','4E781193-B7D9-11EB-9B33-892A2715C256'),('DCDB1540-BEDC-11EB-950A-431B543C5D1E','8A66F851-BD66-11EB-8E1B-F15C649B08E4','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-27 12:15:37','0','8A66F852-BD66-11EB-8E1B-F15C649B08E4'),('DD3E5860-B7E0-11EB-9A89-6FF88833860C','4E7A3472-B7D9-11EB-9B33-892A2715C256','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:56:37','0','4E7A3473-B7D9-11EB-9B33-892A2715C256'),('DD40E6B0-BC91-11EB-A55D-579CE6C61243','DD404A70-BC91-11EB-A55D-579CE6C61243','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"57787563-B887-11EB-9993-DB409692C86F\"}]}','2021-05-24 14:13:43','0','57787563-B887-11EB-9993-DB409692C86F'),('DD4FDF90-B817-11EB-8A12-19E9ED793EF2','A8D7DDD1-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:20','0','A8D7DDD2-B817-11EB-8A12-19E9ED793EF2'),('DDEC41B0-BEDD-11EB-950A-431B543C5D1E','DDEB3040-BEDD-11EB-950A-431B543C5D1E','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"city manar TUNIS\", \"customer\": \"0AA59D03-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-27 12:22:48','0','0AA59D03-B812-11EB-9160-B788CA63A9C6'),('DF502EC0-BC7D-11EB-A55D-579CE6C61243','57787562-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:36','0','57787563-B887-11EB-9993-DB409692C86F'),('DF517A60-BC95-11EB-A8FC-AB962D6F9CB8','2808d987-85e8-4b6e-a82b-67f16393de63','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:24','0','4E7BE223-B7D9-11EB-9B33-892A2715C256'),('DF8B49B0-BEF3-11EB-A1D1-FBE3D561BF34','D64BBE20-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"onGoing delivery colis\", \"fields\": [\"\"]}','2021-05-27 15:00:20','0','577763F3-B887-11EB-9993-DB409692C86F'),('E0DB9E60-B817-11EB-8A12-19E9ED793EF2','A8D8C832-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:26','0','A8D8C833-B817-11EB-8A12-19E9ED793EF2'),('E1AC52E0-B87A-11EB-B6D9-F3F763F8DA54','38AE5EF1-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-19 09:19:07','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('E22FE230-BC95-11EB-A8FC-AB962D6F9CB8','6ca81b68-9865-4828-8178-d1eb77809b3b','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:29','0','4E78FBF3-B7D9-11EB-9B33-892A2715C256'),('E2FCD0B0-B817-11EB-8A12-19E9ED793EF2','A8D96472-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:29','0','A8D96473-B817-11EB-8A12-19E9ED793EF2'),('E3186A10-BEDD-11EB-950A-431B543C5D1E','E317A6C0-BEDD-11EB-950A-431B543C5D1E','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"8464EC80-939C-11EB-B69D-17A841C0031C\", \"address\": \"Manzeh 9 TUNIS \", \"customer\": \"0AAA09D3-B812-11EB-9160-B788CA63A9C6\"}]}','2021-05-27 12:22:57','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('E42BD1D0-B87A-11EB-B6D9-F3F763F8DA54','38AEAD12-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-19 09:19:11','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('E449FC80-BC7D-11EB-A55D-579CE6C61243','4E7C5751-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:45','0','4E7C5752-B7D9-11EB-9B33-892A2715C256'),('E5330450-BC7A-11EB-A55D-579CE6C61243','38ABEDF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:18','0','38ABEDF3-B7D9-11EB-9B33-892A2715C256'),('E66366A0-BC7D-11EB-A55D-579CE6C61243','4E7BE222-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:48','0','4E7BE223-B7D9-11EB-9B33-892A2715C256'),('E6D46400-BC95-11EB-A8FC-AB962D6F9CB8','825a2d32-7386-44e6-91e9-e4b3238714a4','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:37','0','4E774E43-B7D9-11EB-9B33-892A2715C256'),('E6D57700-B817-11EB-8A12-19E9ED793EF2','A8DBFC82-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:30:36','0','A8DBFC83-B817-11EB-8A12-19E9ED793EF2'),('E769BBE0-BE66-11EB-8056-53D92DA39177','E75808A1-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"SFAX\", \"email\": \"zayani@yahoo.fr\", \"price\": \"543.00\", \"number\": \"1\", \"street\": \"city SFAX rue Gabes km 3\", \"weight\": \"30.00\", \"address\": \"city SFAX rue Gabes km 3\", \"payment\": \"0\", \"codePostal\": \"1008\", \"paymentMode\": \"check\", \"phoneNumber\": \"20743885\", \"nameComplete\": \"change name example\"}]}','2021-05-26 22:11:14','0','E75808A0-BE66-11EB-8056-53D92DA39177'),('E76BDEC0-BE66-11EB-8056-53D92DA39177','E769E2F3-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"ouini@gmail.com\", \"price\": \"123.00\", \"number\": \"2\", \"street\": \"Street 6 TUNIS Lafayette\", \"weight\": \"7.00\", \"address\": \"city manar TUNIS\", \"payment\": \"1\", \"codePostal\": \"2061\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000222\", \"nameComplete\": \"client2\"}]}','2021-05-26 22:11:14','0','E769E2F2-BE66-11EB-8056-53D92DA39177'),('E76F8840-BE66-11EB-8056-53D92DA39177','E76C7B03-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client3@gmail.com\", \"price\": \"654.00\", \"number\": \"3\", \"street\": \"Street 17 Marsa\", \"weight\": \"10.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000224\", \"nameComplete\": \"client3\"}]}','2021-05-26 22:11:14','0','E76C7B02-BE66-11EB-8056-53D92DA39177'),('E7702480-BE66-11EB-8056-53D92DA39177','E76FAF53-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client6@gmail.com\", \"price\": \"209.00\", \"number\": \"4\", \"street\": \"Street 35 Marsa\", \"weight\": \"7.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20000223\", \"nameComplete\": \"client16\"}]}','2021-05-26 22:11:14','0','E76FAF52-BE66-11EB-8056-53D92DA39177'),('E770E7D0-BE66-11EB-8056-53D92DA39177','E7704B93-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Jerba\", \"email\": \"trabelsi@gmail.com\", \"price\": \"309.00\", \"number\": \"5\", \"street\": \"Street 17 Jerba\", \"weight\": \"2.00\", \"address\": \"Jerba Midoune \", \"payment\": \"1\", \"codePostal\": \"1107\", \"paymentMode\": \"check\", \"phoneNumber\": \"20020221\", \"nameComplete\": \"client90\"}]}','2021-05-26 22:11:14','0','E7704B92-BE66-11EB-8056-53D92DA39177'),('E7729580-BE66-11EB-8056-53D92DA39177','E770E7D4-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"Marsa\", \"email\": \"client100@gmail.com\", \"price\": \"57.00\", \"number\": \"6\", \"street\": \"Street 17 TUNIS Lafayette\", \"weight\": \"3.00\", \"address\": \"city lkalil, bhar, marsa\", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20030226\", \"nameComplete\": \"client100\"}]}','2021-05-26 22:11:14','0','E770E7D3-BE66-11EB-8056-53D92DA39177'),('E7775070-BE66-11EB-8056-53D92DA39177','E772BC93-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"client1098@gmail.com\", \"price\": \"20.00\", \"number\": \"7\", \"street\": \"Street 102 TUNIS manzeh 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20080229\", \"nameComplete\": \"client198\"}]}','2021-05-26 22:11:14','0','E772BC92-BE66-11EB-8056-53D92DA39177'),('E77BE450-BE66-11EB-8056-53D92DA39177','E7775074-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien108@gmail.com\", \"price\": \"18.00\", \"number\": \"8\", \"street\": \"Street 1 TUNIS lafayette 9\", \"weight\": \"1.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"98563882\", \"nameComplete\": \"client189\"}]}','2021-05-26 22:11:14','0','E7775073-BE66-11EB-8056-53D92DA39177'),('E77D43E0-BE66-11EB-8056-53D92DA39177','E77C0B63-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"clien1908@gmail.com\", \"price\": \"165.00\", \"number\": \"9\", \"street\": \"Street 17benarrousse 9\", \"weight\": \"15.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"99267291\", \"nameComplete\": \"client18\"}]}','2021-05-26 22:11:14','0','E77C0B62-BE66-11EB-8056-53D92DA39177'),('E77EA370-BE66-11EB-8056-53D92DA39177','E77D43E4-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','{\"action\": \"create  customer for pickup\", \"fields\": [{\"city\": \"TUNIS\", \"email\": \"trabelsi@gmail.com\", \"price\": \"100.00\", \"number\": \"10\", \"street\": \"Street 14 TUNIS ARIANA \", \"weight\": \"25.00\", \"address\": \"Manzeh 9 TUNIS \", \"payment\": \"0\", \"codePostal\": \"1107\", \"paymentMode\": \"species\", \"phoneNumber\": \"20988921\", \"nameComplete\": \"client278\"}]}','2021-05-26 22:11:15','0','E77D43E3-BE66-11EB-8056-53D92DA39177'),('E7D46770-B87A-11EB-B6D9-F3F763F8DA54','38AE5EF1-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-19 09:19:17','0','38AE5EF2-B7D9-11EB-9B33-892A2715C256'),('E7DB6800-BC7A-11EB-A55D-579CE6C61243','38AC6322-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:22','0','38AC6323-B7D9-11EB-9B33-892A2715C256'),('E883B320-B7DE-11EB-9A89-6FF88833860C','38AB51B2-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 14:42:37','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('E8A5C340-BEF3-11EB-A1D1-FBE3D561BF34','7A849080-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (cancel)\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4E6C\"}]}','2021-05-27 15:00:35','0','0AA46482-B812-11EB-9160-B788CA63A9C6'),('E9326520-BC7D-11EB-A55D-579CE6C61243','5771E5B1-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:53','0','57720CC0-B887-11EB-9993-DB409692C86F'),('EA3CFEB0-BC7A-11EB-A55D-579CE6C61243','4E774E42-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:26','0','4E774E43-B7D9-11EB-9B33-892A2715C256'),('EA85E730-BC7D-11EB-A55D-579CE6C61243','4E7B45E2-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:55','0','4E7B45E3-B7D9-11EB-9B33-892A2715C256'),('EADAF9B0-B817-11EB-8A12-19E9ED793EF2','0AA8D152-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:30:42','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('EAFE85B0-BC95-11EB-A8FC-AB962D6F9CB8','85ad00fd-5e2f-4e41-8cb2-6f06b9e2ba70','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:44','0','57767993-B887-11EB-9993-DB409692C86F'),('EC753410-BC7D-11EB-A55D-579CE6C61243','57736C52-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:50:58','0','57736C53-B887-11EB-9993-DB409692C86F'),('EC9D3C31-BEF3-11EB-A1D1-FBE3D561BF34','D64BBE20-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Unreacheable client (cancel)\", \"category\": \"BE2C04D0-92D4-11EB-907C-29C73B1B4E6C\"}]}','2021-05-27 15:00:42','0','577763F3-B887-11EB-9993-DB409692C86F'),('ECBD40F0-BC7A-11EB-A55D-579CE6C61243','4E78FBF2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:30','0','4E78FBF3-B7D9-11EB-9B33-892A2715C256'),('ED4E6AB0-B817-11EB-8A12-19E9ED793EF2','0AAA09D2-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:30:47','0','0AAA09D3-B812-11EB-9160-B788CA63A9C6'),('ED946440-B7DE-11EB-9A89-6FF88833860C','38AB51B2-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 14:42:46','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('EEEF0DB0-BC7D-11EB-A55D-579CE6C61243','57751A01-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:03','0','57751A02-B887-11EB-9993-DB409692C86F'),('EF6CF7A0-BC7A-11EB-A55D-579CE6C61243','4E7AD0B1-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:35','0','4E7AD0B2-B7D9-11EB-9B33-892A2715C256'),('EF9833A0-B817-11EB-8A12-19E9ED793EF2','0AAAA612-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:30:50','0','0AAAA613-B812-11EB-9160-B788CA63A9C6'),('EFD9A281-BEF3-11EB-A1D1-FBE3D561BF34','82002720-BC91-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"anomaly delivery colis\", \"fields\": [{\"anomaly\": \"Dameged package (exchange)\", \"category\": \"3DA35E40-92D8-11EB-87F6-D75D53A493A0\"}]}','2021-05-27 15:00:47','0','4E75A092-B7D9-11EB-9B33-892A2715C256'),('F0E31580-BC7D-11EB-A55D-579CE6C61243','57740892-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:06','0','57740893-B887-11EB-9993-DB409692C86F'),('F0E6AB10-BC95-11EB-A8FC-AB962D6F9CB8','982358c1-682a-4a84-ab64-172a0f9350df','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:42:54','0','4E7B45E3-B7D9-11EB-9B33-892A2715C256'),('F18CB5A0-B7E0-11EB-9A89-6FF88833860C','38ACD852-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:57:11','0','38ACD853-B7D9-11EB-9B33-892A2715C256'),('F193B580-B817-11EB-8A12-19E9ED793EF2','A8D45B61-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:30:54','0','A8D45B62-B817-11EB-8A12-19E9ED793EF2'),('F25B16E0-BC7A-11EB-A55D-579CE6C61243','4E7B45E2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:40','0','4E7B45E3-B7D9-11EB-9B33-892A2715C256'),('F2791ED0-BC7D-11EB-A55D-579CE6C61243','5775DD52-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:08','0','5775DD53-B887-11EB-9993-DB409692C86F'),('F2E8EA40-B7E0-11EB-9A89-6FF88833860C','38AD4D82-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:57:14','0','38AD4D83-B7D9-11EB-9B33-892A2715C256'),('F3F02E70-BC7D-11EB-A55D-579CE6C61243','57767992-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:11','0','57767993-B887-11EB-9993-DB409692C86F'),('F40FDE10-B7E0-11EB-9A89-6FF88833860C','38ADE9C2-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:57:16','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('F4236110-B817-11EB-8A12-19E9ED793EF2','A8D6CC61-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:30:58','0','A8D6CC62-B817-11EB-8A12-19E9ED793EF2'),('F49FBB70-BC95-11EB-A8FC-AB962D6F9CB8','99bd64f5-dd33-4d62-a825-b8008929ff6c','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:00','0','57736C53-B887-11EB-9993-DB409692C86F'),('F49FEDD0-BF9B-11EB-BE17-25C973044828','8F011520-B81C-11EB-8A12-19E9ED793EF2','D3EA2830-7B3A-11EB-A645-9795D36837FC','{\"action\": \"cancel colis to provider\", \"fields\": [\"\"]}','2021-05-28 11:03:30','0','38ADE9C3-B7D9-11EB-9B33-892A2715C256'),('F4D342D0-BC7A-11EB-A55D-579CE6C61243','4E7BE222-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:44','0','4E7BE223-B7D9-11EB-9B33-892A2715C256'),('F50C3F70-B7E0-11EB-9A89-6FF88833860C','4E7A3472-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:57:17','0','4E7A3473-B7D9-11EB-9B33-892A2715C256'),('F53865E0-BC7D-11EB-A55D-579CE6C61243','5776EEC2-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:13','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('F575A510-B7DF-11EB-9A89-6FF88833860C','F5733410-B7DF-11EB-9A89-6FF88833860C','3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"E339DC40-7B67-11EB-A8A0-B17B549DCEAD\", \"address\": \"city SFAX rue Gabes km 3\", \"customer\": \"38A81D62-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:50:08','0','38A81D62-B7D9-11EB-9B33-892A2715C256'),('F6E2A820-B817-11EB-8A12-19E9ED793EF2','A8D96472-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup done\", \"fields\": [\"\"]}','2021-05-18 21:31:03','0','A8D96473-B817-11EB-8A12-19E9ED793EF2'),('F70E17A0-BC7A-11EB-A55D-579CE6C61243','4E7C5751-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:48','0','4E7C5752-B7D9-11EB-9B33-892A2715C256'),('F7B8F640-BC7D-11EB-A55D-579CE6C61243','38AEAD12-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:17','0','38AEAD13-B7D9-11EB-9B33-892A2715C256'),('F92FDED0-BC7D-11EB-A55D-579CE6C61243','4E7886C2-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:20','0','4E7886C3-B7D9-11EB-9B33-892A2715C256'),('F96FAE50-BC7A-11EB-A55D-579CE6C61243','5771E5B1-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:52','0','57720CC0-B887-11EB-9993-DB409692C86F'),('FA0DF5E0-BC95-11EB-A8FC-AB962D6F9CB8','9c84ae0b-a694-43c2-b7c9-f2d7e661cac9','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:09','0','5775DD53-B887-11EB-9993-DB409692C86F'),('FA1518D0-B816-11EB-8A12-19E9ED793EF2','0AA8D152-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:23:58','0','0AA8D153-B812-11EB-9160-B788CA63A9C6'),('FA1699E0-B7DE-11EB-9A89-6FF88833860C','38AB51B2-B7D9-11EB-9B33-892A2715C256','4120D560-A364-11EB-B0D0-C3798C8972C9','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-18 14:43:07','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('FA97D340-BC7D-11EB-A55D-579CE6C61243','4E78FBF2-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:22','0','4E78FBF3-B7D9-11EB-9B33-892A2715C256'),('FAB5CAA0-B7DF-11EB-9A89-6FF88833860C','FAB4E040-B7DF-11EB-9A89-6FF88833860C','3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','{\"action\": \"create colis\", \"fields\": [{\"type\": \"Docs\", \"driver\": \"E339DC40-7B67-11EB-A8A0-B17B549DCEAD\", \"address\": \"city lkalil, bhar, marsa\", \"customer\": \"38AB51B3-B7D9-11EB-9B33-892A2715C256\"}]}','2021-05-18 14:50:17','0','38AB51B3-B7D9-11EB-9B33-892A2715C256'),('FB0F88F0-B817-11EB-8A12-19E9ED793EF2','A8D7DDD1-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"anomaly pickup customer\", \"fields\": [{\"anomaly\": \"Problem in a colis\", \"category\": \"5FA6ED00-9DC7-11EB-BF51-23C1ED2C3060\"}]}','2021-05-18 21:31:10','0','A8D7DDD1-B817-11EB-8A12-19E9ED793EF2'),('FBCFDE10-BC7D-11EB-A55D-579CE6C61243','4E7AD0B1-B7D9-11EB-9B33-892A2715C256','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:24','0','4E7AD0B2-B7D9-11EB-9B33-892A2715C256'),('FC7EC5D0-B816-11EB-8A12-19E9ED793EF2','0AA94682-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-18 21:24:02','0','0AA94683-B812-11EB-9160-B788CA63A9C6'),('FD083700-BC7D-11EB-A55D-579CE6C61243','577763F2-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:26','0','577763F3-B887-11EB-9993-DB409692C86F'),('FD28BEB0-BC7A-11EB-A55D-579CE6C61243','57736C52-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:29:58','0','57736C53-B887-11EB-9993-DB409692C86F'),('FD6C6320-BC95-11EB-A8FC-AB962D6F9CB8','ac21e2d2-ce98-4663-87b0-221d1c1a7d33','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked exchange From \", \"fields\": [\" \"]}','2021-05-24 14:43:15','0','5776EEC3-B887-11EB-9993-DB409692C86F'),('FE216F30-BC7D-11EB-A55D-579CE6C61243','5777B212-B887-11EB-9993-DB409692C86F','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','{\"action\": \"checked package\", \"fields\": [\" \"]}','2021-05-24 11:51:28','0','5777B213-B887-11EB-9993-DB409692C86F'),('FF3BE740-BC7A-11EB-A55D-579CE6C61243','57740892-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','{\"action\": \"pickup ongoing\", \"fields\": [\"\"]}','2021-05-24 11:30:01','0','57740893-B887-11EB-9993-DB409692C86F');
/*!40000 ALTER TABLE `colis_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `composition`
--

DROP TABLE IF EXISTS `composition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composition` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `content` json NOT NULL,
  `journey` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_composition_journey1_idx` (`journey`),
  CONSTRAINT `fk_composition_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composition`
--

LOCK TABLES `composition` WRITE;
/*!40000 ALTER TABLE `composition` DISABLE KEYS */;
/*!40000 ALTER TABLE `composition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `container`
--

DROP TABLE IF EXISTS `container`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `container` (
  `id` varchar(36) NOT NULL,
  `ean` varchar(13) NOT NULL,
  `iso` varchar(40) NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_container_transport_utility1` FOREIGN KEY (`id`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `container`
--

LOCK TABLES `container` WRITE;
/*!40000 ALTER TABLE `container` DISABLE KEYS */;
/*!40000 ALTER TABLE `container` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_exchange`
--

DROP TABLE IF EXISTS `customer_exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_exchange` (
  `id` varchar(36) NOT NULL,
  `FromAgence` varchar(36) DEFAULT NULL,
  `ToAgence` varchar(36) DEFAULT NULL,
  `customer` varchar(36) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status2` int DEFAULT '0',
  `dateExchange` datetime DEFAULT NULL,
  `checkMagasinier` varchar(45) DEFAULT '0',
  `magasinier` varchar(36) DEFAULT NULL,
  `dateCheckMagasinier` datetime DEFAULT NULL,
  `checkMagasinierFrom` varchar(45) DEFAULT '0',
  `magasinierFrom` varchar(45) DEFAULT NULL,
  `dateCheckMagasinierFrom` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer_exchange_driver_idx` (`driver`),
  KEY `fk_customer_exchange_agence1` (`FromAgence`),
  KEY `fk_customer_exchange_agence2` (`ToAgence`),
  KEY `fk_customer_exchange_customer` (`customer`),
  KEY `fk_customer_exchange_magasinier_idx` (`magasinier`),
  CONSTRAINT `fk_customer_exchange_agence1` FOREIGN KEY (`FromAgence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_customer_exchange_agence2` FOREIGN KEY (`ToAgence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_customer_exchange_customer` FOREIGN KEY (`customer`) REFERENCES `customer_provider` (`id`),
  CONSTRAINT `fk_customer_exchange_driver` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_exchange`
--

LOCK TABLES `customer_exchange` WRITE;
/*!40000 ALTER TABLE `customer_exchange` DISABLE KEYS */;
INSERT INTO `customer_exchange` VALUES ('010d126f-ff9d-4639-9699-9c853a1ded8e','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7A3473-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:08',0,NULL,'0',NULL,NULL,'1','4E7A3473-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:10','2021-05-24 14:42:10'),('07cc1c08-78b8-4621-9779-ff055b7747e7','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E781193-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:11:27',0,NULL,'0',NULL,NULL,'1','4E781193-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:20','2021-05-24 14:42:20'),('2808d987-85e8-4b6e-a82b-67f16393de63','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7BE223-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:28',0,NULL,'0',NULL,NULL,'1','4E7BE223-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:25','2021-05-24 14:42:25'),('32584c68-e796-4953-8848-da0f8fe88e01','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA83513-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:39:10',1,'2021-05-18 21:43:37','0',NULL,NULL,'0',NULL,NULL,NULL),('394a4532-9946-4fe4-86ab-8291cab8721d','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','A8D45B62-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:41:47',1,'2021-05-18 21:43:55','0',NULL,NULL,'0',NULL,NULL,NULL),('49654a7c-0c89-435f-94ef-2707d50230f4','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','38A81D62-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 14:05:45',1,'2021-05-18 14:26:20','1','38A81D62-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:27:39','1','38A81D62-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:22:26','2021-05-18 14:27:39'),('6ca81b68-9865-4828-8178-d1eb77809b3b','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E78FBF3-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:00',0,NULL,'0',NULL,NULL,'1','4E78FBF3-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:30','2021-05-24 14:42:30'),('7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','38AB51B3-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 14:44:02',1,'2021-05-18 14:45:13','1','38AB51B3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:47:42','1','38AB51B3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:44:34','2021-05-18 14:47:42'),('825a2d32-7386-44e6-91e9-e4b3238714a4','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E774E43-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:11:19',0,NULL,'0',NULL,NULL,'1','4E774E43-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:37','2021-05-24 14:42:37'),('838c12e6-fedc-4f2a-9119-099eab94c0d6','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AAAA613-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:41:33',1,'2021-05-18 21:44:15','0',NULL,NULL,'0',NULL,NULL,NULL),('85ad00fd-5e2f-4e41-8cb2-6f06b9e2ba70','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','57767993-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:13:18',0,NULL,'0',NULL,NULL,'1','57767993-B887-11EB-9993-DB409692C86F','2021-05-24 14:42:44','2021-05-24 14:42:44'),('86e0f275-9ab1-4ba7-8a34-3511a3775035','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA6AE73-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:27:58',1,'2021-05-18 21:44:34','0',NULL,NULL,'0',NULL,NULL,NULL),('982358c1-682a-4a84-ab64-172a0f9350df','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7B45E3-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:21',0,NULL,'0',NULL,NULL,'1','4E7B45E3-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:42:54','2021-05-24 14:42:54'),('99bd64f5-dd33-4d62-a825-b8008929ff6c','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','57736C53-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:51',0,NULL,'0',NULL,NULL,'1','57736C53-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:01','2021-05-24 14:43:01'),('9c84ae0b-a694-43c2-b7c9-f2d7e661cac9','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','5775DD53-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:13:10',0,NULL,'0',NULL,NULL,'1','5775DD53-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:10','2021-05-24 14:43:10'),('a4b340f5-1bcf-430a-9a4b-6ba580a8c622','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA63943-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:27:51',1,'2021-05-18 22:01:46','0',NULL,NULL,'0',NULL,NULL,NULL),('a6cfa020-eaed-423a-8fe0-a08ffb4b4d87','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA798D3-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:28:09',1,'2021-05-18 22:01:54','0',NULL,NULL,'0',NULL,NULL,NULL),('aae56cb3-64a6-45d7-8372-572e605a8946','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','8A6104E2-BD66-11EB-8E1B-F15C649B08E4','027A52E0-7B60-11EB-A8A0-B17B549DCEAD',0,'2021-05-27 12:22:28',0,NULL,'0',NULL,NULL,'0',NULL,NULL,NULL),('ac21e2d2-ce98-4663-87b0-221d1c1a7d33','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','5776EEC3-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:13:23',0,NULL,'0',NULL,NULL,'1','5776EEC3-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:15','2021-05-24 14:43:15'),('af29d0da-8f03-4821-b5cf-2f69f789a903','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7C5752-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:35',0,NULL,'0',NULL,NULL,'1','4E7C5752-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:43:25','2021-05-24 14:43:25'),('b6b95e1e-5392-41c6-8447-5804ed5f4af1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','8A6104E2-BD66-11EB-8E1B-F15C649B08E4','027A52E0-7B60-11EB-A8A0-B17B549DCEAD',0,'2021-05-27 12:22:19',0,NULL,'0',NULL,NULL,'0',NULL,NULL,NULL),('b8ed0823-a06c-49f2-875e-e53fb3aa4801','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA46482-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:27:04',1,'2021-05-18 22:01:33','0',NULL,NULL,'0',NULL,NULL,NULL),('bb409989-b6e8-4816-89c0-61617c826b6b','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA8D153-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:39:19',1,'2021-05-27 12:21:30','0',NULL,NULL,'0',NULL,NULL,NULL),('bf7e2cfb-1b28-4e84-b84d-8c669f247efa','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AA59D03-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:27:14',1,'2021-05-27 12:21:35','0',NULL,NULL,'0',NULL,NULL,NULL),('cc8e90a6-e4ff-4a0c-8bb7-4d2eaf8f3bb7','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:14',0,NULL,'0',NULL,NULL,'1','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:43:51','2021-05-24 14:43:51'),('d4209128-3c66-4c25-81e0-edce898ccdd5','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','4E7886C3-B7D9-11EB-9B33-892A2715C256','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:11:42',0,NULL,'0',NULL,NULL,'1','4E7886C3-B7D9-11EB-9B33-892A2715C256','2021-05-24 14:43:46','2021-05-24 14:43:46'),('e01cc67a-8647-4f22-a284-3a070ca2fd94','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','57751A02-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:13:03',0,NULL,'0',NULL,NULL,'1','57751A02-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:41','2021-05-24 14:43:41'),('e739af4f-b2f4-4895-ab4b-e362c63ffe34','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','57740893-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:57',0,NULL,'0',NULL,NULL,'1','57740893-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:36','2021-05-24 14:43:36'),('ea2f792c-806a-41aa-b753-6f3ee6c94b6c','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','38AA6753-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 14:05:54',1,'2021-05-18 14:26:03','1','38AA6753-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:27:47','1','38AA6753-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:22:34','2021-05-18 14:27:47'),('f604d718-151f-40a1-9daf-e6b9f980bc91','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0AAA09D3-B812-11EB-9160-B788CA63A9C6','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD',2,'2021-05-18 21:41:21',1,'2021-05-27 12:21:45','0',NULL,NULL,'0',NULL,NULL,NULL),('f7daeb4e-9871-48c0-833e-05c960ce26ce','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','57720CC0-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C',0,'2021-05-24 14:12:42',0,NULL,'0',NULL,NULL,'1','57720CC0-B887-11EB-9993-DB409692C86F','2021-05-24 14:43:31','2021-05-24 14:43:31');
/*!40000 ALTER TABLE `customer_exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_provider`
--

DROP TABLE IF EXISTS `customer_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_provider` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `nameComplete` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `codePostal` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT 'CURRENT_TIMESTAMP',
  `package` varchar(36) DEFAULT NULL,
  `status1` int DEFAULT '0',
  `price` varchar(45) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `paymentStatus` varchar(45) DEFAULT '0',
  `paymentMode` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_provider`
--

LOCK TABLES `customer_provider` WRITE;
/*!40000 ALTER TABLE `customer_provider` DISABLE KEYS */;
INSERT INTO `customer_provider` VALUES ('0AA46482-B812-11EB-9160-B788CA63A9C6','client1B1','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','0AA46481-B812-11EB-9160-B788CA63A9C6',2,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('0AA59D03-B812-11EB-9160-B788CA63A9C6','client2B1','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','0AA59D02-B812-11EB-9160-B788CA63A9C6',1,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('0AA63943-B812-11EB-9160-B788CA63A9C6','client3B1','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','0AA63942-B812-11EB-9160-B788CA63A9C6',2,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('0AA6AE73-B812-11EB-9160-B788CA63A9C6','client16B1','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','0AA6AE72-B812-11EB-9160-B788CA63A9C6',2,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('0AA798D3-B812-11EB-9160-B788CA63A9C6','client90B1','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','0AA798D2-B812-11EB-9160-B788CA63A9C6',1,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('0AA83513-B812-11EB-9160-B788CA63A9C6','client100B1','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','0AA83512-B812-11EB-9160-B788CA63A9C6',1,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('0AA8D153-B812-11EB-9160-B788CA63A9C6','client198B1','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','0AA8D152-B812-11EB-9160-B788CA63A9C6',1,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('0AA94683-B812-11EB-9160-B788CA63A9C6','client189B1','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','0AA94682-B812-11EB-9160-B788CA63A9C6',0,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('0AAA09D3-B812-11EB-9160-B788CA63A9C6','client18B1','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','0AAA09D2-B812-11EB-9160-B788CA63A9C6',1,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('0AAAA613-B812-11EB-9160-B788CA63A9C6','client278B1','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','0AAAA612-B812-11EB-9160-B788CA63A9C6',1,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('38A81D62-B7D9-11EB-9B33-892A2715C256','client1A1','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','38A81D61-B7D9-11EB-9B33-892A2715C256',2,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('38AA6753-B7D9-11EB-9B33-892A2715C256','client2A1','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','38AA6752-B7D9-11EB-9B33-892A2715C256',1,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('38AB51B3-B7D9-11EB-9B33-892A2715C256','client3A1','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','38AB51B2-B7D9-11EB-9B33-892A2715C256',2,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('38ABEDF3-B7D9-11EB-9B33-892A2715C256','client16A1','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','38ABEDF2-B7D9-11EB-9B33-892A2715C256',1,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('38AC6323-B7D9-11EB-9B33-892A2715C256','client90A1','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','38AC6322-B7D9-11EB-9B33-892A2715C256',1,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('38ACD853-B7D9-11EB-9B33-892A2715C256','client100A1','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','38ACD852-B7D9-11EB-9B33-892A2715C256',1,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('38AD4D83-B7D9-11EB-9B33-892A2715C256','client198A1','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','38AD4D82-B7D9-11EB-9B33-892A2715C256',1,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('38ADE9C3-B7D9-11EB-9B33-892A2715C256','client189A1','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','38ADE9C2-B7D9-11EB-9B33-892A2715C256',1,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('38AE5EF2-B7D9-11EB-9B33-892A2715C256','client18A1','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','38AE5EF1-B7D9-11EB-9B33-892A2715C256',1,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('38AEAD13-B7D9-11EB-9B33-892A2715C256','client278A1','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','38AEAD12-B7D9-11EB-9B33-892A2715C256',1,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('4E75A092-B7D9-11EB-9B33-892A2715C256','client1','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','4E75A091-B7D9-11EB-9B33-892A2715C256',1,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('4E774E43-B7D9-11EB-9B33-892A2715C256','client2','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','4E774E42-B7D9-11EB-9B33-892A2715C256',1,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('4E781193-B7D9-11EB-9B33-892A2715C256','client3','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','4E781192-B7D9-11EB-9B33-892A2715C256',1,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('4E7886C3-B7D9-11EB-9B33-892A2715C256','client16','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','4E7886C2-B7D9-11EB-9B33-892A2715C256',1,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('4E78FBF3-B7D9-11EB-9B33-892A2715C256','client90','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','4E78FBF2-B7D9-11EB-9B33-892A2715C256',1,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('4E7A3473-B7D9-11EB-9B33-892A2715C256','client100','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','4E7A3472-B7D9-11EB-9B33-892A2715C256',1,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('4E7AD0B2-B7D9-11EB-9B33-892A2715C256','client198','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','4E7AD0B1-B7D9-11EB-9B33-892A2715C256',1,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('4E7B45E3-B7D9-11EB-9B33-892A2715C256','client189','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','4E7B45E2-B7D9-11EB-9B33-892A2715C256',1,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('4E7BE223-B7D9-11EB-9B33-892A2715C256','client18','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','4E7BE222-B7D9-11EB-9B33-892A2715C256',1,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('4E7C5752-B7D9-11EB-9B33-892A2715C256','client278','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','4E7C5751-B7D9-11EB-9B33-892A2715C256',1,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('57720CC0-B887-11EB-9993-DB409692C86F','client1','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','5771E5B1-B887-11EB-9993-DB409692C86F',1,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('57736C53-B887-11EB-9993-DB409692C86F','client2','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','57736C52-B887-11EB-9993-DB409692C86F',1,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('57740893-B887-11EB-9993-DB409692C86F','client3','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','57740892-B887-11EB-9993-DB409692C86F',1,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('57751A02-B887-11EB-9993-DB409692C86F','client16','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','57751A01-B887-11EB-9993-DB409692C86F',1,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('5775DD53-B887-11EB-9993-DB409692C86F','client90','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','5775DD52-B887-11EB-9993-DB409692C86F',1,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('57767993-B887-11EB-9993-DB409692C86F','client100','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','57767992-B887-11EB-9993-DB409692C86F',1,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('5776EEC3-B887-11EB-9993-DB409692C86F','client198','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','5776EEC2-B887-11EB-9993-DB409692C86F',1,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('577763F3-B887-11EB-9993-DB409692C86F','client189','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','577763F2-B887-11EB-9993-DB409692C86F',1,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('5777B213-B887-11EB-9993-DB409692C86F','client18','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','5777B212-B887-11EB-9993-DB409692C86F',1,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('57787563-B887-11EB-9993-DB409692C86F','client278','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','57787562-B887-11EB-9993-DB409692C86F',1,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('8A6104E2-BD66-11EB-8E1B-F15C649B08E4','client1','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','8A6104E1-BD66-11EB-8E1B-F15C649B08E4',1,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('8A6300B3-BD66-11EB-8E1B-F15C649B08E4','client2','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','8A6300B2-BD66-11EB-8E1B-F15C649B08E4',0,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('8A6375E3-BD66-11EB-8E1B-F15C649B08E4','client3','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','8A6375E2-BD66-11EB-8E1B-F15C649B08E4',0,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('8A641223-BD66-11EB-8E1B-F15C649B08E4','client16','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','8A641222-BD66-11EB-8E1B-F15C649B08E4',0,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('8A64D573-BD66-11EB-8E1B-F15C649B08E4','client90','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','8A64D572-BD66-11EB-8E1B-F15C649B08E4',0,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('8A6571B3-BD66-11EB-8E1B-F15C649B08E4','client100','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','8A6571B2-BD66-11EB-8E1B-F15C649B08E4',0,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('8A65E6E3-BD66-11EB-8E1B-F15C649B08E4','client198','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','8A65E6E2-BD66-11EB-8E1B-F15C649B08E4',0,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('8A665C12-BD66-11EB-8E1B-F15C649B08E4','client189','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','8A665C11-BD66-11EB-8E1B-F15C649B08E4',0,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('8A66F852-BD66-11EB-8E1B-F15C649B08E4','client18','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','8A66F851-BD66-11EB-8E1B-F15C649B08E4',0,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('8A679492-BD66-11EB-8E1B-F15C649B08E4','client278','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','8A679491-BD66-11EB-8E1B-F15C649B08E4',0,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('A8D45B62-B817-11EB-8A12-19E9ED793EF2','client1B2','zayani@gmail.com','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','A8D45B61-B817-11EB-8A12-19E9ED793EF2',1,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('A8D6CC62-B817-11EB-8A12-19E9ED793EF2','client2B2','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','A8D6CC61-B817-11EB-8A12-19E9ED793EF2',0,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('A8D7DDD2-B817-11EB-8A12-19E9ED793EF2','client3B2','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','A8D7DDD1-B817-11EB-8A12-19E9ED793EF2',0,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('A8D8C833-B817-11EB-8A12-19E9ED793EF2','client16B2','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','A8D8C832-B817-11EB-8A12-19E9ED793EF2',0,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('A8D96473-B817-11EB-8A12-19E9ED793EF2','client90B2','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','A8D96472-B817-11EB-8A12-19E9ED793EF2',0,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('A8D9D9A3-B817-11EB-8A12-19E9ED793EF2','client100B2','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','A8D9D9A2-B817-11EB-8A12-19E9ED793EF2',0,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('A8DA4ED3-B817-11EB-8A12-19E9ED793EF2','client198B2','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','A8DA4ED2-B817-11EB-8A12-19E9ED793EF2',0,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('A8DB1223-B817-11EB-8A12-19E9ED793EF2','client189B2','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','A8DB1222-B817-11EB-8A12-19E9ED793EF2',0,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('A8DB8753-B817-11EB-8A12-19E9ED793EF2','client18B2','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','A8DB8752-B817-11EB-8A12-19E9ED793EF2',0,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('A8DBFC83-B817-11EB-8A12-19E9ED793EF2','client278B2','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','A8DBFC82-B817-11EB-8A12-19E9ED793EF2',0,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA '),('E75808A0-BE66-11EB-8056-53D92DA39177','change name example','zayani@yahoo.fr','20743885','1008','city SFAX rue Gabes km 3','CURRENT_TIMESTAMP','E757E190-BE66-11EB-8056-53D92DA39177',0,'543.00','30.00','0','check','SFAX','city SFAX rue Gabes km 3'),('E769E2F2-BE66-11EB-8056-53D92DA39177','client2','ouini@gmail.com','20000222','2061','city manar TUNIS','CURRENT_TIMESTAMP','E769E2F1-BE66-11EB-8056-53D92DA39177',0,'123.00','7.00','1','species','TUNIS','Street 6 TUNIS Lafayette'),('E76C7B02-BE66-11EB-8056-53D92DA39177','client3','client3@gmail.com','20000224','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','E76C7B01-BE66-11EB-8056-53D92DA39177',0,'654.00','10.00','0','species','Marsa','Street 17 Marsa'),('E76FAF52-BE66-11EB-8056-53D92DA39177','client16','client6@gmail.com','20000223','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','E76FAF51-BE66-11EB-8056-53D92DA39177',0,'209.00','7.00','0','species','Marsa','Street 35 Marsa'),('E7704B92-BE66-11EB-8056-53D92DA39177','client90','trabelsi@gmail.com','20020221','1107','Jerba Midoune ','CURRENT_TIMESTAMP','E7704B91-BE66-11EB-8056-53D92DA39177',0,'309.00','2.00','1','check','Jerba','Street 17 Jerba'),('E770E7D3-BE66-11EB-8056-53D92DA39177','client100','client100@gmail.com','20030226','1107','city lkalil, bhar, marsa','CURRENT_TIMESTAMP','E770E7D2-BE66-11EB-8056-53D92DA39177',0,'57.00','3.00','0','species','Marsa','Street 17 TUNIS Lafayette'),('E772BC92-BE66-11EB-8056-53D92DA39177','client198','client1098@gmail.com','20080229','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','E772BC91-BE66-11EB-8056-53D92DA39177',0,'20.00','1.00','0','species','TUNIS','Street 102 TUNIS manzeh 9'),('E7775073-BE66-11EB-8056-53D92DA39177','client189','clien108@gmail.com','98563882','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','E7775072-BE66-11EB-8056-53D92DA39177',0,'18.00','1.00','0','species','TUNIS','Street 1 TUNIS lafayette 9'),('E77C0B62-BE66-11EB-8056-53D92DA39177','client18','clien1908@gmail.com','99267291','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','E77C0B61-BE66-11EB-8056-53D92DA39177',0,'165.00','15.00','0','species','TUNIS','Street 17benarrousse 9'),('E77D43E3-BE66-11EB-8056-53D92DA39177','client278','trabelsi@gmail.com','20988921','1107','Manzeh 9 TUNIS ','CURRENT_TIMESTAMP','E77D43E2-BE66-11EB-8056-53D92DA39177',0,'100.00','25.00','0','species','TUNIS','Street 14 TUNIS ARIANA ');
/*!40000 ALTER TABLE `customer_provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `id` varchar(36) NOT NULL,
  `descriminator` varchar(45) NOT NULL,
  `currentJourney` varchar(36) DEFAULT NULL,
  `vehicule` varchar(36) DEFAULT NULL,
  `zone` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_driver_app_user1_idx` (`id`),
  KEY `fk_driver_vehicle1_idx` (`vehicule`),
  KEY `fk_driver_zone1_idx` (`zone`),
  CONSTRAINT `fk_driver_app_user1` FOREIGN KEY (`id`) REFERENCES `app_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_driver_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES ('027A52E0-7B60-11EB-A8A0-B17B549DCEAD','DRIVER_INTERNAL',NULL,'2f578ae6-7aa1-11eb-877d-3a7d8bc40466','D93C2B80-7A9F-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','DRIVER_INTERNAL',NULL,'a6d5b462-7aa4-11eb-877d-3a7d8bc40466','2928AE20-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','DRIVER_CONTRACTER',NULL,'01dc19bd-7aa1-11eb-877d-3a7d8bc40466','46AE94C0-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('8464EC80-939C-11EB-B69D-17A841C0031C','DRIVER_INTERNAL',NULL,'4115d520-939c-11eb-aa51-a6225fd664a6','0E88BB50-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-02 11:16:41'),('93D0BEA0-7B60-11EB-A8A0-B17B549DCEAD','DRIVER_INTERNAL',NULL,'b1fcb8f4-7aa4-11eb-877d-3a7d8bc40466','2928AE20-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('AF902B30-7B60-11EB-A8A0-B17B549DCEAD','DRIVER_INTERNAL',NULL,'c2cceef6-7aa4-11eb-877d-3a7d8bc40466','2928AE20-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','DRIVER_CONTRACTER',NULL,'1f1097b2-7aa1-11eb-877d-3a7d8bc40466','D93C2B80-7A9F-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('E339DC40-7B67-11EB-A8A0-B17B549DCEAD','DRIVER_CONTRACTER',NULL,'060d948c-7aa5-11eb-877d-3a7d8bc40466','8ABED3D0-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10'),('FAE0DA60-7B67-11EB-A8A0-B17B549DCEAD','DRIVER_CONTRACTER',NULL,'11a70eee-7aa5-11eb-877d-3a7d8bc40466','8ABED3D0-7AA0-11EB-BF37-2BA4FB3989B2','2021-04-01 13:56:10');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_history`
--

DROP TABLE IF EXISTS `driver_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver_history` (
  `id` varchar(36) NOT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `action` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_colis_driver_2_idx` (`driver`),
  CONSTRAINT `fk_colis_driver_2` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_history`
--

LOCK TABLES `driver_history` WRITE;
/*!40000 ALTER TABLE `driver_history` DISABLE KEYS */;
INSERT INTO `driver_history` VALUES ('00923674-5162-4619-8A7D-9A75D17F8C1D','8464EC80-939C-11EB-B69D-17A841C0031C','package','8A679491-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:14:50','0'),('014ACCD1-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA46481-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:11','pickup'),('03B1C540-B818-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','A8DBFC82-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:31:24','pickup'),('04650521-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA59D02-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:16','pickup'),('0771F701-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA63942-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:21','pickup'),('09B927E1-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA6AE72-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:25','pickup'),('0C34D641-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA798D2-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:29','pickup'),('0FCAF551-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA83512-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:24:35','pickup'),('11BFAF6C-0398-497A-99A3-FA7D5D256893','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','package','38AC6322-B7D9-11EB-9B33-892A2715C256','2021-05-19 10:53:39','0'),('17E136C0-BF95-11EB-BE17-25C973044828','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','95578CB0-B81C-11EB-8A12-19E9ED793EF2','2021-05-28 10:14:23','delivery'),('1CE87200-BF95-11EB-BE17-25C973044828','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','7949E100-B888-11EB-9993-DB409692C86F','2021-05-28 10:14:32','anomaly delivery'),('2F98B900-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','7E1E4480-B81C-11EB-8A12-19E9ED793EF2','2021-05-18 23:34:19','anomaly delivery'),('334FCD90-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','83A6BDB0-B81C-11EB-8A12-19E9ED793EF2','2021-05-18 23:34:25','anomaly delivery'),('36A87113-EA36-4AE6-BE6B-BF150F95C425','8464EC80-939C-11EB-B69D-17A841C0031C','package','8A641222-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:14:44','0'),('3737DD30-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','8A0F36A0-B81C-11EB-8A12-19E9ED793EF2','2021-05-18 23:34:32','anomaly delivery'),('39A0D9D0-B81C-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','b8ed0823-a06c-49f2-875e-e53fb3aa4801','2021-05-18 22:01:33','exchange done'),('3B125840-B829-11EB-B8DA-61A52B28FD33','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','8F011520-B81C-11EB-8A12-19E9ED793EF2','2021-05-18 23:34:38','anomaly delivery'),('4118EE00-B81C-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','a4b340f5-1bcf-430a-9a4b-6ba580a8c622','2021-05-18 22:01:45','exchange done'),('43E6390B-EEAD-48DC-BE02-15607684D722','027A52E0-7B60-11EB-A8A0-B17B549DCEAD','package','8A64D572-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:14:47','0'),('4549B320-B7DF-11EB-9A89-6FF88833860C','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','exchange','7d7e6baf-8295-4339-ba8b-62c70d7a7d9f','2021-05-18 14:45:13','exchange done'),('45F2D7B0-B81C-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','a6cfa020-eaed-423a-8fe0-a08ffb4b4d87','2021-05-18 22:01:53','exchange done'),('463177B4-6539-45A2-BE02-D91E6BAEE1FB','8464EC80-939C-11EB-B69D-17A841C0031C','colis','2BC6CBBD-9F41-4ECF-9963-3FC806801B30','2021-05-18 23:37:30','0'),('4A122DCA-A818-4D51-B9FC-3E0249BC5D5F','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','package','38ABEDF2-B7D9-11EB-9B33-892A2715C256','2021-05-19 10:31:54','0'),('52BC69C3-7E63-4B4B-B44D-ED6FFF5D40E4','8464EC80-939C-11EB-B69D-17A841C0031C','colis','C214886E-539E-4189-9D46-709D76054AF9','2021-05-18 20:39:04','0'),('56C80E7D-8B1D-4E98-B744-1145FBDDAE2B','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA94682-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:33:13','0'),('57D09FDE-D24A-4C5A-93A0-9810672A5BAA','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','36908240-F80E-4674-9F0E-06467917DCDA','2021-05-28 09:53:36','0'),('5C878FD1-BEDD-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A6104E1-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:19:11','pickup'),('610F13C1-BEDD-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A6300B2-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:19:19','pickup'),('6319B0D1-BEDD-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A6375E2-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:19:22','pickup'),('64A0C601-BEDD-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A65E6E2-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:19:25','pickup'),('66C330D1-BEDD-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','E757E190-BE66-11EB-8056-53D92DA39177','2021-05-27 12:19:28','pickup'),('6ED98EF1-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','package','38A81D61-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:03:26','pickup'),('712AAAE1-B7D9-11EB-9B33-892A2715C256','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','package','38AA6752-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:03:29','pickup'),('75B02ED0-B7E0-11EB-9A89-6FF88833860C','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','colis','FAB4E040-B7DF-11EB-9A89-6FF88833860C','2021-05-18 14:53:43','delivery'),('79240631-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','38ABEDF2-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:47:45','pickup'),('792EC7CD-2791-4B7C-B0C9-314A8827563D','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA8D152-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:25:01','0'),('7C5EE5E1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','38AC6322-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:47:50','pickup'),('7F22E7AC-E4BA-4A67-AFC2-FF26ED313B03','8464EC80-939C-11EB-B69D-17A841C0031C','colis','F4CB58D5-6822-4E99-ACEA-BA262CE4D06B','2021-05-18 20:38:50','0'),('7F3D4DB1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E75A091-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:47:55','pickup'),('83061580-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E7BE222-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:02','pickup'),('875BB401-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E774E42-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:09','pickup'),('8A490FF1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E7886C2-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:14','pickup'),('8BDB3485-B2AB-4273-9D77-10A84ED6BE7F','8464EC80-939C-11EB-B69D-17A841C0031C','colis','5BC7C6E5-CC65-4E47-89F7-8367BA1F530A','2021-05-18 20:38:56','0'),('8D75BED1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E78FBF2-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:19','pickup'),('9180E6D1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E7AD0B1-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:26','pickup'),('943C8461-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E7B45E2-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:30','pickup'),('97A89CB0-B7DC-11EB-8ECD-238ADAF99B88','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','exchange','ea2f792c-806a-41aa-b753-6f3ee6c94b6c','2021-05-18 14:26:03','exchange done'),('98C05ED1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E7C5751-B7D9-11EB-9B33-892A2715C256','2021-05-24 11:48:38','pickup'),('9B33CFD1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','5771E5B1-B887-11EB-9993-DB409692C86F','2021-05-24 11:48:42','pickup'),('9DB0BE70-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','colis','13361C50-B7E1-11EB-9A89-6FF88833860C','2021-05-18 15:09:10','anomaly delivery'),('9EDADED1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','57736C52-B887-11EB-9993-DB409692C86F','2021-05-24 11:48:48','pickup'),('A1E43DB0-B7DC-11EB-8ECD-238ADAF99B88','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','exchange','49654a7c-0c89-435f-94ef-2707d50230f4','2021-05-18 14:26:20','exchange done'),('A245CF31-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','57740892-B887-11EB-9993-DB409692C86F','2021-05-24 11:48:54','pickup'),('A250FA80-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','colis','19B85ED0-B7E1-11EB-9A89-6FF88833860C','2021-05-18 15:09:17','anomaly delivery'),('A5437ED1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','57751A01-B887-11EB-9993-DB409692C86F','2021-05-24 11:48:59','pickup'),('A5E96380-B7E2-11EB-A38A-3F932768D50B','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','colis','2F5CD630-B7E1-11EB-9A89-6FF88833860C','2021-05-18 15:09:23','anomaly delivery'),('A93D8FD1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','57787562-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:06','pickup'),('AC2398C1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','5777B212-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:10','pickup'),('AF1941D0-BEDD-11EB-950A-431B543C5D1E','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','bb409989-b6e8-4816-89c0-61617c826b6b','2021-05-27 12:21:29','exchange done'),('AFF1B7C1-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','577763F2-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:17','pickup'),('B2558110-BEDD-11EB-950A-431B543C5D1E','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','bf7e2cfb-1b28-4e84-b84d-8c669f247efa','2021-05-27 12:21:35','exchange done'),('B43DE4A8-15A4-4A74-91A9-858C4430CCAF','8464EC80-939C-11EB-B69D-17A841C0031C','colis','1552E0C1-BEEA-4551-98C7-4F8D21CC8EE2','2021-05-18 20:39:00','0'),('B57FD641-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','5776EEC2-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:26','pickup'),('B8003F91-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','57767992-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:30','pickup'),('B8448440-BEDD-11EB-950A-431B543C5D1E','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','f604d718-151f-40a1-9daf-e6b9f980bc91','2021-05-27 12:21:45','exchange done'),('B8449E50-B819-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','32584c68-e796-4953-8848-da0f8fe88e01','2021-05-18 21:43:37','exchange done'),('BA3D8561-BC7D-11EB-A55D-579CE6C61243','8464EC80-939C-11EB-B69D-17A841C0031C','package','5775DD52-B887-11EB-9993-DB409692C86F','2021-05-24 11:49:34','pickup'),('BD616860-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','colis','680D3090-B888-11EB-9993-DB409692C86F','2021-05-27 14:59:22','anomaly delivery'),('C2C53790-B819-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','394a4532-9946-4fe4-86ab-8291cab8721d','2021-05-18 21:43:54','exchange done'),('C818A79E-BD2D-4FBE-A653-D35097502287','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','colis','A2BE26F6-1E05-408C-93CC-854B98D7D035','2021-05-28 11:03:30','0'),('CDCAE3D1-C12A-49F5-8557-54ECAAFBE8B4','8464EC80-939C-11EB-B69D-17A841C0031C','colis','7328F35B-EF71-4E1F-A3F4-338AA9061005','2021-05-27 15:01:26','0'),('CE7B4C81-B87A-11EB-B6D9-F3F763F8DA54','8464EC80-939C-11EB-B69D-17A841C0031C','package','4E781192-B7D9-11EB-9B33-892A2715C256','2021-05-19 09:18:35','pickup'),('CF18E320-B819-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','838c12e6-fedc-4f2a-9119-099eab94c0d6','2021-05-18 21:44:15','exchange done'),('D445928F-87BD-40FE-96C6-D6A9563700A2','8464EC80-939C-11EB-B69D-17A841C0031C','colis','5797A7B8-BC8E-4A8F-95EF-C3265A93B9A6','2021-05-28 11:02:07','0'),('D464BE81-B887-11EB-9993-DB409692C86F','8464EC80-939C-11EB-B69D-17A841C0031C','package','38AEAD12-B7D9-11EB-9B33-892A2715C256','2021-05-19 10:51:48','pickup'),('D7B0FD31-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','38ACD852-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:56:28','pickup'),('D9AFDA71-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','38AD4D82-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:56:31','pickup'),('DA7BC881-BEDC-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A6571B2-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:15:33','pickup'),('DA7F6F90-B819-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','exchange','86e0f275-9ab1-4ba7-8a34-3511a3775035','2021-05-18 21:44:34','exchange done'),('DB7B99C1-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','38ADE9C2-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:56:34','pickup'),('DCDAA011-BEDC-11EB-950A-431B543C5D1E','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','8A66F851-BD66-11EB-8E1B-F15C649B08E4','2021-05-27 12:15:37','pickup'),('DD3DE331-B7E0-11EB-9A89-6FF88833860C','E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','package','4E7A3472-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:56:37','pickup'),('E7D3F241-B87A-11EB-B6D9-F3F763F8DA54','8464EC80-939C-11EB-B69D-17A841C0031C','package','38AE5EF1-B7D9-11EB-9B33-892A2715C256','2021-05-19 09:19:17','pickup'),('E8A59C30-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','colis','7A849080-BC91-11EB-A55D-579CE6C61243','2021-05-27 15:00:35','anomaly delivery'),('EAD29541-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AA8D152-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:30:42','pickup'),('EC9D1520-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','colis','D64BBE20-BC91-11EB-A55D-579CE6C61243','2021-05-27 15:00:42','anomaly delivery'),('ED4B8481-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AAA09D2-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:30:47','pickup'),('ED93A0F1-B7DE-11EB-9A89-6FF88833860C','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','package','38AB51B2-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:42:46','pickup'),('EF957481-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','0AAAA612-B812-11EB-9160-B788CA63A9C6','2021-05-18 21:30:50','pickup'),('EFD97B70-BEF3-11EB-A1D1-FBE3D561BF34','8464EC80-939C-11EB-B69D-17A841C0031C','colis','82002720-BC91-11EB-A55D-579CE6C61243','2021-05-27 15:00:47','anomaly delivery'),('F1914481-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','A8D45B61-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:30:54','pickup'),('F4218C51-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','A8D6CC61-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:30:58','pickup'),('F6E08541-B817-11EB-8A12-19E9ED793EF2','6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','package','A8D96472-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:31:03','pickup');
/*!40000 ALTER TABLE `driver_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(36) NOT NULL,
  `type` varchar(45) NOT NULL COMMENT 'location/association/status',
  PRIMARY KEY (`id`),
  KEY `fk_event_app_user1_idx` (`user`),
  CONSTRAINT `fk_event_app_user1` FOREIGN KEY (`user`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange`
--

DROP TABLE IF EXISTS `exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchange` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `dep` varchar(36) NOT NULL,
  `des` varchar(36) NOT NULL,
  `code` varchar(255) NOT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `GTIN` bigint DEFAULT NULL,
  `digitalLinkUR` varchar(255) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'PENDING',
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_exchange_party1_idx` (`dep`),
  KEY `fk_exchange_party2_idx` (`des`),
  CONSTRAINT `fk_exchange_party1` FOREIGN KEY (`dep`) REFERENCES `party` (`id`),
  CONSTRAINT `fk_exchange_party2` FOREIGN KEY (`des`) REFERENCES `party` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange`
--

LOCK TABLES `exchange` WRITE;
/*!40000 ALTER TABLE `exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateway`
--

DROP TABLE IF EXISTS `gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateway` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `datamatrix` varchar(24) NOT NULL,
  `mac` varchar(255) NOT NULL,
  `rfid` varchar(12) NOT NULL,
  `registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(36) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'STAGING',
  PRIMARY KEY (`id`),
  UNIQUE KEY `datamatrix_UNIQUE` (`datamatrix`),
  UNIQUE KEY `mac_UNIQUE` (`mac`),
  UNIQUE KEY `rfid_UNIQUE` (`rfid`),
  KEY `fk_gateway_location1_idx` (`location`),
  CONSTRAINT `fk_gateway_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway`
--

LOCK TABLES `gateway` WRITE;
/*!40000 ALTER TABLE `gateway` DISABLE KEYS */;
/*!40000 ALTER TABLE `gateway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gateway_beacon`
--

DROP TABLE IF EXISTS `gateway_beacon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gateway_beacon` (
  `gateway` varchar(36) NOT NULL,
  `beacon` varchar(36) NOT NULL,
  PRIMARY KEY (`gateway`,`beacon`),
  KEY `fk_gateway_has_beacon_beacon1_idx` (`beacon`),
  KEY `fk_gateway_has_beacon_gateway1_idx` (`gateway`),
  CONSTRAINT `fk_gateway_has_beacon_beacon1` FOREIGN KEY (`beacon`) REFERENCES `beacon` (`id`),
  CONSTRAINT `fk_gateway_has_beacon_gateway1` FOREIGN KEY (`gateway`) REFERENCES `gateway` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gateway_beacon`
--

LOCK TABLES `gateway_beacon` WRITE;
/*!40000 ALTER TABLE `gateway_beacon` DISABLE KEYS */;
/*!40000 ALTER TABLE `gateway_beacon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey`
--

DROP TABLE IF EXISTS `journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'PENDING',
  `createdBy` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dueAt` time NOT NULL,
  `startedBy` varchar(36) DEFAULT NULL,
  `startedAt` datetime DEFAULT NULL,
  `endedBy` varchar(36) DEFAULT NULL,
  `endedAt` datetime DEFAULT NULL,
  `antitheft` tinyint(1) DEFAULT '0',
  `departure` varchar(45) DEFAULT NULL,
  `arrival` varchar(36) DEFAULT NULL,
  `estimation` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_UNIQUE` (`code`),
  KEY `fk_journey_user1_idx` (`createdBy`),
  KEY `fk_journey_user2_idx` (`startedBy`),
  KEY `fk_journey_user3_idx` (`endedBy`),
  CONSTRAINT `fk_journey_user1` FOREIGN KEY (`createdBy`) REFERENCES `app_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_journey_user2` FOREIGN KEY (`startedBy`) REFERENCES `app_user` (`id`),
  CONSTRAINT `fk_journey_user3` FOREIGN KEY (`endedBy`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey`
--

LOCK TABLES `journey` WRITE;
/*!40000 ALTER TABLE `journey` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_beacon`
--

DROP TABLE IF EXISTS `journey_beacon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_beacon` (
  `journey` varchar(36) NOT NULL,
  `beacon` varchar(36) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`journey`,`beacon`),
  KEY `fk_journey_has_beacon_beacon1_idx` (`beacon`),
  KEY `fk_journey_has_beacon_journey1_idx` (`journey`),
  CONSTRAINT `fk_journey_has_beacon_beacon1` FOREIGN KEY (`beacon`) REFERENCES `beacon` (`id`),
  CONSTRAINT `fk_journey_has_beacon_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_beacon`
--

LOCK TABLES `journey_beacon` WRITE;
/*!40000 ALTER TABLE `journey_beacon` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_beacon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_gateway`
--

DROP TABLE IF EXISTS `journey_gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_gateway` (
  `journey` varchar(36) NOT NULL,
  `gateway` varchar(36) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`journey`,`gateway`),
  KEY `fk_journey_has_gateway_gateway1_idx` (`gateway`),
  KEY `fk_journey_has_gateway_journey1_idx` (`journey`),
  CONSTRAINT `fk_journey_has_gateway_gateway1` FOREIGN KEY (`gateway`) REFERENCES `gateway` (`id`),
  CONSTRAINT `fk_journey_has_gateway_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_gateway`
--

LOCK TABLES `journey_gateway` WRITE;
/*!40000 ALTER TABLE `journey_gateway` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_gateway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_position`
--

DROP TABLE IF EXISTS `journey_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_position` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `journey` varchar(36) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `time` datetime NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `journey_positioncol` varchar(45) DEFAULT NULL,
  `flag` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_journey_position_journey1_idx` (`journey`),
  CONSTRAINT `fk_journey_position_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_position`
--

LOCK TABLES `journey_position` WRITE;
/*!40000 ALTER TABLE `journey_position` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_transport_utility`
--

DROP TABLE IF EXISTS `journey_transport_utility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_transport_utility` (
  `journey` varchar(36) NOT NULL,
  `transportUtility` varchar(36) NOT NULL,
  PRIMARY KEY (`journey`,`transportUtility`),
  KEY `fk_journey_has_transport_utility_transport_utility1_idx` (`transportUtility`),
  KEY `fk_journey_has_transport_utility_journey1_idx` (`journey`),
  CONSTRAINT `fk_journey_has_transport_utility_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`),
  CONSTRAINT `fk_journey_has_transport_utility_transport_utility1` FOREIGN KEY (`transportUtility`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_transport_utility`
--

LOCK TABLES `journey_transport_utility` WRITE;
/*!40000 ALTER TABLE `journey_transport_utility` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_transport_utility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  `driver` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES ('2dd3b9e2-a765-11eb-a0cc-a6225fd664a6',10.1499728,36.8350116,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD'),('2e8c9e79-a765-11eb-a0cc-a6225fd664a6',10.1499728,36.8350116,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD'),('3cf09431-bef4-11eb-be30-94e6f79e32c5',10.1392663,36.8312937,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('3d8c7a8a-bef4-11eb-be30-94e6f79e32c5',10.1392663,36.8312937,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('3e1a06ef-bef4-11eb-be30-94e6f79e32c5',10.1392663,36.8312937,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('862d3a70-bedc-11eb-8fa8-94e6f79e32c5',10.1499647,36.8350705,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('8edf8977-bedc-11eb-8fa8-94e6f79e32c5',10.1499647,36.8350705,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('9a6a4495-bedc-11eb-8fa8-94e6f79e32c5',10.1499647,36.8350705,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD'),('a165ebde-a822-11eb-a0cc-a6225fd664a6',10.1502605,36.8352142,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD'),('d93e612c-bed2-11eb-9c6b-94e6f79e32c5',10.1499561,36.8350623,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_event`
--

DROP TABLE IF EXISTS `location_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_event` (
  `id` varchar(36) NOT NULL,
  `location` varchar(36) NOT NULL,
  `description` text NOT NULL COMMENT 'Should be either arrive-to/departure-from',
  PRIMARY KEY (`id`),
  KEY `fk_location_event_location1_idx` (`location`),
  CONSTRAINT `fk_location_event_event1` FOREIGN KEY (`id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_location_event_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_event`
--

LOCK TABLES `location_event` WRITE;
/*!40000 ALTER TABLE `location_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magasinier`
--

DROP TABLE IF EXISTS `magasinier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magasinier` (
  `id` varchar(36) NOT NULL,
  `agence` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_magasinier_1` (`agence`),
  CONSTRAINT `fk_magasinier_1` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magasinier`
--

LOCK TABLES `magasinier` WRITE;
/*!40000 ALTER TABLE `magasinier` DISABLE KEYS */;
INSERT INTO `magasinier` VALUES ('7E69C490-A364-11EB-B0D0-C3798C8972C9','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2'),('4120D560-A364-11EB-B0D0-C3798C8972C9','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2'),('8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2'),('6B757910-A364-11EB-B0D0-C3798C8972C9','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2');
/*!40000 ALTER TABLE `magasinier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measure`
--

DROP TABLE IF EXISTS `measure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measure` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `value` double NOT NULL,
  `isAlarm` tinyint(1) NOT NULL,
  `gateway` varchar(36) NOT NULL,
  `beacon` varchar(36) NOT NULL,
  `sensor` varchar(36) NOT NULL,
  `journey` varchar(36) NOT NULL,
  `location` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_measure_gateway1_idx` (`gateway`),
  KEY `fk_measure_beacon1_idx` (`beacon`),
  KEY `fk_measure_journey1_idx` (`journey`),
  KEY `fk_measure_sensor1_idx` (`sensor`),
  KEY `fk_measure_location1_idx` (`location`),
  CONSTRAINT `fk_measure_beacon1` FOREIGN KEY (`beacon`) REFERENCES `beacon` (`id`),
  CONSTRAINT `fk_measure_gateway1` FOREIGN KEY (`gateway`) REFERENCES `gateway` (`id`),
  CONSTRAINT `fk_measure_journey1` FOREIGN KEY (`journey`) REFERENCES `journey` (`id`),
  CONSTRAINT `fk_measure_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`),
  CONSTRAINT `fk_measure_sensor1` FOREIGN KEY (`sensor`) REFERENCES `sensor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measure`
--

LOCK TABLES `measure` WRITE;
/*!40000 ALTER TABLE `measure` DISABLE KEYS */;
/*!40000 ALTER TABLE `measure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `provider` varchar(36) DEFAULT NULL,
  `status` int DEFAULT '0',
  `dateEnlevementS` datetime DEFAULT NULL,
  `dateEnlevement` datetime DEFAULT NULL,
  `anomaly` varchar(45) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `customer` varchar(36) DEFAULT NULL,
  `checkPickup` varchar(45) DEFAULT '0',
  `checkMagasinier` varchar(45) DEFAULT '0',
  `magasinier` varchar(36) DEFAULT NULL,
  `dateCheckMagasinier` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_package_driver1_idx` (`driver`),
  KEY `fk_package_provider_idx` (`provider`),
  KEY `fk_package_magasinier_idx` (`magasinier`),
  CONSTRAINT `fk_package_driver1` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_package_magasinier` FOREIGN KEY (`magasinier`) REFERENCES `magasinier` (`id`),
  CONSTRAINT `fk_package_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES ('0AA46481-B812-11EB-9160-B788CA63A9C6','SE22S',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:11','0','2021-05-18 20:48:39','0AA46482-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:25:58','2021-05-18 21:25:58'),('0AA59D02-B812-11EB-9160-B788CA63A9C6','OH7I7',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:16','0','2021-05-18 20:48:39','0AA59D03-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:26:01','2021-05-18 21:26:01'),('0AA63942-B812-11EB-9160-B788CA63A9C6','OUFFY',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:21','0','2021-05-18 20:48:39','0AA63943-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:26:07','2021-05-18 21:26:07'),('0AA6AE72-B812-11EB-9160-B788CA63A9C6','L7WJX',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:25','0','2021-05-18 20:48:39','0AA6AE73-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:26:10','2021-05-18 21:26:10'),('0AA798D2-B812-11EB-9160-B788CA63A9C6','V4CPE',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:29','0','2021-05-18 20:48:39','0AA798D3-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:31:57','2021-05-18 21:31:57'),('0AA83512-B812-11EB-9160-B788CA63A9C6','V3HU2',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:24:35','0','2021-05-18 20:48:39','0AA83513-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:01','2021-05-18 21:32:01'),('0AA8D152-B812-11EB-9160-B788CA63A9C6','CRO0M',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:30:43','0','2021-05-18 20:48:39','0AA8D153-B812-11EB-9160-B788CA63A9C6','1','0',NULL,NULL,NULL),('0AA94682-B812-11EB-9160-B788CA63A9C6','WYZGL',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',0,'2021-05-18 20:48:39',NULL,'0','2021-05-18 20:48:39','0AA94683-B812-11EB-9160-B788CA63A9C6','1','0',NULL,NULL,NULL),('0AAA09D2-B812-11EB-9160-B788CA63A9C6','Y7OWS',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:30:47','0','2021-05-18 20:48:39','0AAA09D3-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:15','2021-05-18 21:32:15'),('0AAAA612-B812-11EB-9160-B788CA63A9C6','527VF',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F',2,'2021-05-18 20:48:39','2021-05-18 21:30:51','0','2021-05-18 20:48:39','0AAAA613-B812-11EB-9160-B788CA63A9C6','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:12','2021-05-18 21:32:12'),('38A81D61-B7D9-11EB-9B33-892A2715C256','43KTM',1,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:03:26','0','2021-05-18 14:01:55','38A81D62-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:04:53','2021-05-18 14:04:53'),('38AA6752-B7D9-11EB-9B33-892A2715C256','AZP2N',1,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:03:30','0','2021-05-18 14:01:55','38AA6753-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:05:03','2021-05-18 14:05:03'),('38AB51B2-B7D9-11EB-9B33-892A2715C256','I2JAF',1,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:42:46','0','2021-05-18 14:01:55','38AB51B3-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:43:07','2021-05-18 14:43:07'),('38ABEDF2-B7D9-11EB-9B33-892A2715C256','9AJHV',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-24 11:47:45','0','2021-05-18 14:01:55','38ABEDF3-B7D9-11EB-9B33-892A2715C256','1','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:08','2021-05-24 11:50:08'),('38AC6322-B7D9-11EB-9B33-892A2715C256','WCK0T',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-24 11:47:51','0','2021-05-18 14:01:55','38AC6323-B7D9-11EB-9B33-892A2715C256','1','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:12','2021-05-24 11:50:12'),('38ACD852-B7D9-11EB-9B33-892A2715C256','2424Q',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:56:28','0','2021-05-18 14:01:55','38ACD853-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:57:12','2021-05-18 14:57:12'),('38AD4D82-B7D9-11EB-9B33-892A2715C256','7FOTE',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:56:32','0','2021-05-18 14:01:55','38AD4D83-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:57:14','2021-05-18 14:57:14'),('38ADE9C2-B7D9-11EB-9B33-892A2715C256','MNGGB',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-18 14:56:35','0','2021-05-18 14:01:55','38ADE9C3-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:57:16','2021-05-18 14:57:16'),('38AE5EF1-B7D9-11EB-9B33-892A2715C256','YIV2Q',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-19 09:19:18','0','2021-05-18 14:01:55','38AE5EF2-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:15','2021-05-24 11:50:15'),('38AEAD12-B7D9-11EB-9B33-892A2715C256','CXIB1',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-18 14:01:55','2021-05-19 10:51:49','0','2021-05-18 14:01:55','38AEAD13-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:18','2021-05-24 11:51:18'),('4E75A091-B7D9-11EB-9B33-892A2715C256','PQ569',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:47:56','0','2021-05-18 14:02:31','4E75A092-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:23','2021-05-24 11:50:23'),('4E774E42-B7D9-11EB-9B33-892A2715C256','OEHFI',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:09','0','2021-05-18 14:02:31','4E774E43-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:19','2021-05-24 11:50:19'),('4E781192-B7D9-11EB-9B33-892A2715C256','Q6Q8S',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-19 09:18:35','0','2021-05-18 14:02:31','4E781193-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:31','2021-05-24 11:50:31'),('4E7886C2-B7D9-11EB-9B33-892A2715C256','K6PV3',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:14','0','2021-05-18 14:02:31','4E7886C3-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:20','2021-05-24 11:51:20'),('4E78FBF2-B7D9-11EB-9B33-892A2715C256','VVFFE',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:20','0','2021-05-18 14:02:31','4E78FBF3-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:23','2021-05-24 11:51:23'),('4E7A3472-B7D9-11EB-9B33-892A2715C256','RFDFL',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-18 14:56:38','0','2021-05-18 14:02:31','4E7A3473-B7D9-11EB-9B33-892A2715C256','0','1','4120D560-A364-11EB-B0D0-C3798C8972C9','2021-05-18 14:57:18','2021-05-18 14:57:18'),('4E7AD0B1-B7D9-11EB-9B33-892A2715C256','ER3EN',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:26','0','2021-05-18 14:02:31','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:25','2021-05-24 11:51:25'),('4E7B45E2-B7D9-11EB-9B33-892A2715C256','Q02Q2',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:31','0','2021-05-18 14:02:31','4E7B45E3-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:56','2021-05-24 11:50:56'),('4E7BE222-B7D9-11EB-9B33-892A2715C256','DY7M4',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:02','0','2021-05-18 14:02:31','4E7BE223-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:49','2021-05-24 11:50:49'),('4E7C5751-B7D9-11EB-9B33-892A2715C256','6FTJL',1,'8464EC80-939C-11EB-B69D-17A841C0031C','3A8DA240-9848-11EB-8605-ABCA64BADD5E',2,'2021-05-18 14:02:32','2021-05-24 11:48:38','0','2021-05-18 14:02:31','4E7C5752-B7D9-11EB-9B33-892A2715C256','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:45','2021-05-24 11:50:45'),('5771E5B1-B887-11EB-9993-DB409692C86F','UWIMA',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:48:43','0','2021-05-19 10:48:19','57720CC0-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:53','2021-05-24 11:50:53'),('57736C52-B887-11EB-9993-DB409692C86F','EGG7H',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:48:49','0','2021-05-19 10:48:19','57736C53-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:59','2021-05-24 11:50:59'),('57740892-B887-11EB-9993-DB409692C86F','Q9NIS',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:48:54','0','2021-05-19 10:48:19','57740893-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:06','2021-05-24 11:51:06'),('57751A01-B887-11EB-9993-DB409692C86F','J496X',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:48:59','0','2021-05-19 10:48:19','57751A02-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:03','2021-05-24 11:51:03'),('5775DD52-B887-11EB-9993-DB409692C86F','GEMLF',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:35','0','2021-05-19 10:48:19','5775DD53-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:09','2021-05-24 11:51:09'),('57767992-B887-11EB-9993-DB409692C86F','OB2HL',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:31','0','2021-05-19 10:48:19','57767993-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:11','2021-05-24 11:51:11'),('5776EEC2-B887-11EB-9993-DB409692C86F','Q81FT',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:27','0','2021-05-19 10:48:19','5776EEC3-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:14','2021-05-24 11:51:14'),('577763F2-B887-11EB-9993-DB409692C86F','QKINZ',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:17','0','2021-05-19 10:48:19','577763F3-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:27','2021-05-24 11:51:27'),('5777B212-B887-11EB-9993-DB409692C86F','JVROY',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:11','0','2021-05-19 10:48:19','5777B213-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:51:29','2021-05-24 11:51:29'),('57787562-B887-11EB-9993-DB409692C86F','UW9UW',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-19 10:48:19','2021-05-24 11:49:06','0','2021-05-19 10:48:19','57787563-B887-11EB-9993-DB409692C86F','0','1','8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','2021-05-24 11:50:37','2021-05-24 11:50:37'),('8A6104E1-BD66-11EB-8E1B-F15C649B08E4','6ZP2Q',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:19:11','0','2021-05-25 15:36:07','8A6104E2-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A6300B2-BD66-11EB-8E1B-F15C649B08E4','YC71Y',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:19:19','0','2021-05-25 15:36:07','8A6300B3-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A6375E2-BD66-11EB-8E1B-F15C649B08E4','GMSK2',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:19:22','0','2021-05-25 15:36:07','8A6375E3-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A641222-BD66-11EB-8E1B-F15C649B08E4','FYR2F',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-25 15:36:07',NULL,'0','2021-05-25 15:36:07','8A641223-BD66-11EB-8E1B-F15C649B08E4','1','0',NULL,NULL,NULL),('8A64D572-BD66-11EB-8E1B-F15C649B08E4','VQ37N',1,'027A52E0-7B60-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-25 15:36:07',NULL,'0','2021-05-25 15:36:07','8A64D573-BD66-11EB-8E1B-F15C649B08E4','1','0',NULL,NULL,NULL),('8A6571B2-BD66-11EB-8E1B-F15C649B08E4','33TMZ',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:15:33','0','2021-05-25 15:36:07','8A6571B3-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A65E6E2-BD66-11EB-8E1B-F15C649B08E4','F4JIP',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:19:25','0','2021-05-25 15:36:07','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A665C11-BD66-11EB-8E1B-F15C649B08E4','SXZO3',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-25 15:36:07',NULL,'0','2021-05-25 15:36:07','8A665C12-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A66F851-BD66-11EB-8E1B-F15C649B08E4','74KL2',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-25 15:36:07','2021-05-27 12:15:37','0','2021-05-25 15:36:07','8A66F852-BD66-11EB-8E1B-F15C649B08E4','0','0',NULL,NULL,NULL),('8A679491-BD66-11EB-8E1B-F15C649B08E4','4EWLR',1,'8464EC80-939C-11EB-B69D-17A841C0031C','18A313E0-9848-11EB-8CB8-173F18D37F47',1,'2021-05-25 15:36:07',NULL,'0','2021-05-25 15:36:07','8A679492-BD66-11EB-8E1B-F15C649B08E4','1','0',NULL,NULL,NULL),('A8D45B61-B817-11EB-8A12-19E9ED793EF2','973SB',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52','2021-05-18 21:30:54','0','2021-05-18 21:28:52','A8D45B62-B817-11EB-8A12-19E9ED793EF2','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:09','2021-05-18 21:32:09'),('A8D6CC61-B817-11EB-8A12-19E9ED793EF2','KPE8F',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52','2021-05-18 21:30:58','0','2021-05-18 21:28:52','A8D6CC62-B817-11EB-8A12-19E9ED793EF2','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:07','2021-05-18 21:32:07'),('A8D7DDD1-B817-11EB-8A12-19E9ED793EF2','6781H',1,NULL,'67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52',NULL,'1','2021-05-18 21:28:52','A8D7DDD2-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8D8C832-B817-11EB-8A12-19E9ED793EF2','4G11Q',1,NULL,'67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52',NULL,'1','2021-05-18 21:28:52','A8D8C833-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8D96472-B817-11EB-8A12-19E9ED793EF2','6G8NW',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52','2021-05-18 21:31:03','0','2021-05-18 21:28:52','A8D96473-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8D9D9A2-B817-11EB-8A12-19E9ED793EF2','8BTXR',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',0,'2021-05-18 21:28:52',NULL,'0','2021-05-18 21:28:52','A8D9D9A3-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8DA4ED2-B817-11EB-8A12-19E9ED793EF2','3A8NO',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',0,'2021-05-18 21:28:52',NULL,'0','2021-05-18 21:28:52','A8DA4ED3-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8DB1222-B817-11EB-8A12-19E9ED793EF2','L0B96',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',0,'2021-05-18 21:28:52',NULL,'0','2021-05-18 21:28:52','A8DB1223-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8DB8752-B817-11EB-8A12-19E9ED793EF2','UKFJ6',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',0,'2021-05-18 21:28:52',NULL,'0','2021-05-18 21:28:52','A8DB8753-B817-11EB-8A12-19E9ED793EF2','0','0',NULL,NULL,NULL),('A8DBFC82-B817-11EB-8A12-19E9ED793EF2','0GP1J',1,'6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6',2,'2021-05-18 21:28:52','2021-05-18 21:31:25','0','2021-05-18 21:28:52','A8DBFC83-B817-11EB-8A12-19E9ED793EF2','0','1','6B757910-A364-11EB-B0D0-C3798C8972C9','2021-05-18 21:32:04','2021-05-18 21:32:04'),('E757E190-BE66-11EB-8056-53D92DA39177','CWPFP',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',2,'2021-05-26 22:11:14','2021-05-27 12:19:29','0','2021-05-26 22:11:14','E75808A0-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E769E2F1-BE66-11EB-8056-53D92DA39177','SPWKN',1,'E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E769E2F2-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E76C7B01-BE66-11EB-8056-53D92DA39177','S2MYP',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E76C7B02-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E76FAF51-BE66-11EB-8056-53D92DA39177','K7DI4',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E76FAF52-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E7704B91-BE66-11EB-8056-53D92DA39177','7XNR1',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E7704B92-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E770E7D2-BE66-11EB-8056-53D92DA39177','7H0FH',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E770E7D3-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E772BC91-BE66-11EB-8056-53D92DA39177','N2B6E',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E772BC92-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E7775072-BE66-11EB-8056-53D92DA39177','M6SWA',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E7775073-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E77C0B61-BE66-11EB-8056-53D92DA39177','DU8GA',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E77C0B62-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL),('E77D43E2-BE66-11EB-8056-53D92DA39177','KNYPR',1,NULL,'18A313E0-9848-11EB-8CB8-173F18D37F47',0,'2021-05-26 22:11:14',NULL,'0','2021-05-26 22:11:14','E77D43E3-BE66-11EB-8056-53D92DA39177','0','0',NULL,NULL,NULL);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pallet`
--

DROP TABLE IF EXISTS `pallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet` (
  `id` varchar(36) NOT NULL,
  `rfid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pallet_transport_utility1` FOREIGN KEY (`id`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pallet`
--

LOCK TABLES `pallet` WRITE;
/*!40000 ALTER TABLE `pallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `pallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `descriminator` varchar(45) NOT NULL DEFAULT 'CLIENT',
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `phoneNumber1` int NOT NULL,
  `phoneNumber2` int DEFAULT NULL,
  `fax` int DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_detail`
--

DROP TABLE IF EXISTS `pay_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_detail` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `payment` double DEFAULT NULL,
  `paymentType` double DEFAULT NULL,
  `contracter` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pay_detail_contracter1_idx` (`contracter`),
  CONSTRAINT `fk_pay_detail_contracter1` FOREIGN KEY (`contracter`) REFERENCES `contracter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_detail`
--

LOCK TABLES `pay_detail` WRITE;
/*!40000 ALTER TABLE `pay_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_provider_agence`
--

DROP TABLE IF EXISTS `payment_provider_agence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_provider_agence` (
  `id` varchar(36) NOT NULL,
  `provider` varchar(36) DEFAULT NULL,
  `agence` varchar(36) DEFAULT NULL,
  `paymentPickup_status` varchar(45) DEFAULT '0',
  `paymentDelivery_status` varchar(45) DEFAULT '0',
  `colis` varchar(36) DEFAULT NULL,
  `driverPickup` varchar(36) DEFAULT NULL,
  `driverDelivery` varchar(36) DEFAULT NULL,
  `package` varchar(36) DEFAULT NULL,
  `code` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_payment_provider_agence_1_idx` (`provider`),
  KEY `fk_payment_provider_agence_2_idx` (`agence`),
  KEY `fk_payment_provider_agence_3_idx` (`colis`),
  KEY `fk_payment_provider_agence_4_idx` (`driverPickup`),
  KEY `fk_payment_provider_agence_5_idx` (`driverDelivery`),
  CONSTRAINT `fk_payment_provider_agence_1` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`),
  CONSTRAINT `fk_payment_provider_agence_2` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_payment_provider_agence_3` FOREIGN KEY (`colis`) REFERENCES `colis` (`id`),
  CONSTRAINT `fk_payment_provider_agence_4` FOREIGN KEY (`driverPickup`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_payment_provider_agence_5` FOREIGN KEY (`driverDelivery`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_provider_agence`
--

LOCK TABLES `payment_provider_agence` WRITE;
/*!40000 ALTER TABLE `payment_provider_agence` DISABLE KEYS */;
INSERT INTO `payment_provider_agence` VALUES ('17E184E0-BF95-11EB-BE17-25C973044828','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','0','1','95578CB0-B81C-11EB-8A12-19E9ED793EF2',NULL,'792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','0AA6AE72-B812-11EB-9160-B788CA63A9C6',10,'2021-05-28 10:14:23'),('75B0A400-B7E0-11EB-9A89-6FF88833860C','18A313E0-9848-11EB-8CB8-173F18D37F47','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','0','1','FAB4E040-B7DF-11EB-9A89-6FF88833860C',NULL,'E339DC40-7B67-11EB-A8A0-B17B549DCEAD','38AB51B2-B7D9-11EB-9B33-892A2715C256',10,'2021-05-18 14:53:44');
/*!40000 ALTER TABLE `payment_provider_agence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_provider_customer`
--

DROP TABLE IF EXISTS `payment_provider_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_provider_customer` (
  `id` varchar(36) NOT NULL,
  `provider` varchar(36) DEFAULT NULL,
  `customer` varchar(36) DEFAULT NULL,
  `payment` varchar(45) DEFAULT '0',
  `price` varchar(45) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_payment_provider_customer_provider_idx` (`provider`),
  KEY `fk_payment_provider_customer_customer` (`customer`),
  KEY `fk_payment_provider_customer_driver_idx` (`driver`),
  CONSTRAINT `fk_payment_provider_customer_customer` FOREIGN KEY (`customer`) REFERENCES `customer_provider` (`id`),
  CONSTRAINT `fk_payment_provider_customer_driver` FOREIGN KEY (`driver`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_payment_provider_customer_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_provider_customer`
--

LOCK TABLES `payment_provider_customer` WRITE;
/*!40000 ALTER TABLE `payment_provider_customer` DISABLE KEYS */;
INSERT INTO `payment_provider_customer` VALUES ('0AA46483-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA46482-B812-11EB-9160-B788CA63A9C6','0','543.00','30.00',NULL,'2021-05-18 20:48:39'),('0AA59D04-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA59D03-B812-11EB-9160-B788CA63A9C6','1','123.00','7.00',NULL,'2021-05-18 20:48:39'),('0AA63944-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA63943-B812-11EB-9160-B788CA63A9C6','0','654.00','10.00',NULL,'2021-05-18 20:48:39'),('0AA6AE74-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA6AE73-B812-11EB-9160-B788CA63A9C6','1','209.00','7.00','792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','2021-05-18 20:48:39'),('0AA798D4-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA798D3-B812-11EB-9160-B788CA63A9C6','1','309.00','2.00',NULL,'2021-05-18 20:48:39'),('0AA83514-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA83513-B812-11EB-9160-B788CA63A9C6','0','57.00','3.00',NULL,'2021-05-18 20:48:39'),('0AA8D154-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA8D153-B812-11EB-9160-B788CA63A9C6','0','20.00','1.00',NULL,'2021-05-18 20:48:39'),('0AA94684-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA94683-B812-11EB-9160-B788CA63A9C6','0','18.00','1.00',NULL,'2021-05-18 20:48:39'),('0AAA09D4-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AAA09D3-B812-11EB-9160-B788CA63A9C6','0','165.00','15.00',NULL,'2021-05-18 20:48:39'),('0AAAA614-B812-11EB-9160-B788CA63A9C6','CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AAAA613-B812-11EB-9160-B788CA63A9C6','0','100.00','25.00',NULL,'2021-05-18 20:48:39'),('38A81D63-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38A81D62-B7D9-11EB-9B33-892A2715C256','0','543.00','30.00',NULL,'2021-05-18 14:01:55'),('38AA6754-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AA6753-B7D9-11EB-9B33-892A2715C256','1','123.00','7.00',NULL,'2021-05-18 14:01:55'),('38AB51B4-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AB51B3-B7D9-11EB-9B33-892A2715C256','1','654.00','10.00','E339DC40-7B67-11EB-A8A0-B17B549DCEAD','2021-05-18 14:01:55'),('38ABEDF4-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38ABEDF3-B7D9-11EB-9B33-892A2715C256','0','209.00','7.00',NULL,'2021-05-18 14:01:55'),('38AC6324-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AC6323-B7D9-11EB-9B33-892A2715C256','1','309.00','2.00',NULL,'2021-05-18 14:01:55'),('38ACD854-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38ACD853-B7D9-11EB-9B33-892A2715C256','0','57.00','3.00',NULL,'2021-05-18 14:01:55'),('38AD4D84-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AD4D83-B7D9-11EB-9B33-892A2715C256','0','20.00','1.00',NULL,'2021-05-18 14:01:55'),('38ADE9C4-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38ADE9C3-B7D9-11EB-9B33-892A2715C256','0','18.00','1.00',NULL,'2021-05-18 14:01:55'),('38AE5EF3-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AE5EF2-B7D9-11EB-9B33-892A2715C256','0','165.00','15.00',NULL,'2021-05-18 14:01:55'),('38AEAD14-B7D9-11EB-9B33-892A2715C256','18A313E0-9848-11EB-8CB8-173F18D37F47','38AEAD13-B7D9-11EB-9B33-892A2715C256','0','100.00','25.00',NULL,'2021-05-18 14:01:55'),('4E75A093-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E75A092-B7D9-11EB-9B33-892A2715C256','0','543.00','30.00',NULL,'2021-05-18 14:02:31'),('4E774E44-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E774E43-B7D9-11EB-9B33-892A2715C256','1','123.00','7.00',NULL,'2021-05-18 14:02:31'),('4E781194-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E781193-B7D9-11EB-9B33-892A2715C256','0','654.00','10.00',NULL,'2021-05-18 14:02:31'),('4E7886C4-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7886C3-B7D9-11EB-9B33-892A2715C256','0','209.00','7.00',NULL,'2021-05-18 14:02:31'),('4E78FBF4-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E78FBF3-B7D9-11EB-9B33-892A2715C256','1','309.00','2.00',NULL,'2021-05-18 14:02:31'),('4E7A3474-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7A3473-B7D9-11EB-9B33-892A2715C256','0','57.00','3.00',NULL,'2021-05-18 14:02:31'),('4E7AD0B3-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','0','20.00','1.00',NULL,'2021-05-18 14:02:31'),('4E7B45E4-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7B45E3-B7D9-11EB-9B33-892A2715C256','0','18.00','1.00',NULL,'2021-05-18 14:02:31'),('4E7BE224-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7BE223-B7D9-11EB-9B33-892A2715C256','0','165.00','15.00',NULL,'2021-05-18 14:02:31'),('4E7C5753-B7D9-11EB-9B33-892A2715C256','3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7C5752-B7D9-11EB-9B33-892A2715C256','0','100.00','25.00',NULL,'2021-05-18 14:02:31'),('57720CC1-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57720CC0-B887-11EB-9993-DB409692C86F','0','543.00','30.00',NULL,'2021-05-19 10:48:19'),('57736C54-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57736C53-B887-11EB-9993-DB409692C86F','1','123.00','7.00',NULL,'2021-05-19 10:48:19'),('57740894-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57740893-B887-11EB-9993-DB409692C86F','0','654.00','10.00',NULL,'2021-05-19 10:48:19'),('57751A03-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57751A02-B887-11EB-9993-DB409692C86F','0','209.00','7.00',NULL,'2021-05-19 10:48:19'),('5775DD54-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','5775DD53-B887-11EB-9993-DB409692C86F','1','309.00','2.00',NULL,'2021-05-19 10:48:19'),('57767994-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57767993-B887-11EB-9993-DB409692C86F','0','57.00','3.00',NULL,'2021-05-19 10:48:19'),('5776EEC4-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','5776EEC3-B887-11EB-9993-DB409692C86F','0','20.00','1.00',NULL,'2021-05-19 10:48:19'),('577763F4-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','577763F3-B887-11EB-9993-DB409692C86F','0','18.00','1.00',NULL,'2021-05-19 10:48:19'),('5777B214-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','5777B213-B887-11EB-9993-DB409692C86F','0','165.00','15.00',NULL,'2021-05-19 10:48:19'),('57787564-B887-11EB-9993-DB409692C86F','18A313E0-9848-11EB-8CB8-173F18D37F47','57787563-B887-11EB-9993-DB409692C86F','0','100.00','25.00',NULL,'2021-05-19 10:48:19'),('8A6104E3-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A6104E2-BD66-11EB-8E1B-F15C649B08E4','0','543.00','30.00',NULL,'2021-05-25 15:36:07'),('8A6300B4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A6300B3-BD66-11EB-8E1B-F15C649B08E4','1','123.00','7.00',NULL,'2021-05-25 15:36:07'),('8A6375E4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A6375E3-BD66-11EB-8E1B-F15C649B08E4','0','654.00','10.00',NULL,'2021-05-25 15:36:07'),('8A641224-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A641223-BD66-11EB-8E1B-F15C649B08E4','0','209.00','7.00',NULL,'2021-05-25 15:36:07'),('8A64D574-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A64D573-BD66-11EB-8E1B-F15C649B08E4','1','309.00','2.00',NULL,'2021-05-25 15:36:07'),('8A6571B4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A6571B3-BD66-11EB-8E1B-F15C649B08E4','0','57.00','3.00',NULL,'2021-05-25 15:36:07'),('8A65E6E4-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4','0','20.00','1.00',NULL,'2021-05-25 15:36:07'),('8A665C13-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A665C12-BD66-11EB-8E1B-F15C649B08E4','0','18.00','1.00',NULL,'2021-05-25 15:36:07'),('8A66F853-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A66F852-BD66-11EB-8E1B-F15C649B08E4','0','165.00','15.00',NULL,'2021-05-25 15:36:07'),('8A679493-BD66-11EB-8E1B-F15C649B08E4','18A313E0-9848-11EB-8CB8-173F18D37F47','8A679492-BD66-11EB-8E1B-F15C649B08E4','0','100.00','25.00',NULL,'2021-05-25 15:36:07'),('A8D45B63-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D45B62-B817-11EB-8A12-19E9ED793EF2','0','543.00','30.00',NULL,'2021-05-18 21:28:52'),('A8D6CC63-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D6CC62-B817-11EB-8A12-19E9ED793EF2','1','123.00','7.00',NULL,'2021-05-18 21:28:52'),('A8D7DDD3-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D7DDD2-B817-11EB-8A12-19E9ED793EF2','0','654.00','10.00',NULL,'2021-05-18 21:28:52'),('A8D8C834-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D8C833-B817-11EB-8A12-19E9ED793EF2','0','209.00','7.00',NULL,'2021-05-18 21:28:52'),('A8D96474-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D96473-B817-11EB-8A12-19E9ED793EF2','1','309.00','2.00',NULL,'2021-05-18 21:28:52'),('A8D9D9A4-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D9D9A3-B817-11EB-8A12-19E9ED793EF2','0','57.00','3.00',NULL,'2021-05-18 21:28:52'),('A8DA4ED4-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DA4ED3-B817-11EB-8A12-19E9ED793EF2','0','20.00','1.00',NULL,'2021-05-18 21:28:52'),('A8DB1224-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DB1223-B817-11EB-8A12-19E9ED793EF2','0','18.00','1.00',NULL,'2021-05-18 21:28:52'),('A8DB8754-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DB8753-B817-11EB-8A12-19E9ED793EF2','0','165.00','15.00',NULL,'2021-05-18 21:28:52'),('A8DBFC84-B817-11EB-8A12-19E9ED793EF2','67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DBFC83-B817-11EB-8A12-19E9ED793EF2','0','100.00','25.00',NULL,'2021-05-18 21:28:52'),('E75808A1-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E75808A0-BE66-11EB-8056-53D92DA39177','0','543.00','30.00',NULL,'2021-05-26 22:11:14'),('E769E2F3-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E769E2F2-BE66-11EB-8056-53D92DA39177','1','123.00','7.00',NULL,'2021-05-26 22:11:14'),('E76C7B03-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E76C7B02-BE66-11EB-8056-53D92DA39177','0','654.00','10.00',NULL,'2021-05-26 22:11:14'),('E76FAF53-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E76FAF52-BE66-11EB-8056-53D92DA39177','0','209.00','7.00',NULL,'2021-05-26 22:11:14'),('E7704B93-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E7704B92-BE66-11EB-8056-53D92DA39177','1','309.00','2.00',NULL,'2021-05-26 22:11:14'),('E770E7D4-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E770E7D3-BE66-11EB-8056-53D92DA39177','0','57.00','3.00',NULL,'2021-05-26 22:11:14'),('E772BC93-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E772BC92-BE66-11EB-8056-53D92DA39177','0','20.00','1.00',NULL,'2021-05-26 22:11:14'),('E7775074-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E7775073-BE66-11EB-8056-53D92DA39177','0','18.00','1.00',NULL,'2021-05-26 22:11:14'),('E77C0B63-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E77C0B62-BE66-11EB-8056-53D92DA39177','0','165.00','15.00',NULL,'2021-05-26 22:11:14'),('E77D43E4-BE66-11EB-8056-53D92DA39177','18A313E0-9848-11EB-8CB8-173F18D37F47','E77D43E3-BE66-11EB-8056-53D92DA39177','0','100.00','25.00',NULL,'2021-05-26 22:11:14');
/*!40000 ALTER TABLE `payment_provider_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilege` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES ('3930cede-8a33-11eb-9892-94e6f79e32c5','comptable','comptable'),('4ec39928-7a9d-11eb-877d-3a7d8bc40466','admin','admin principal'),('6c7ffe59-7a9d-11eb-877d-3a7d8bc40455','magasinier','magasinier'),('7cd243ea-7a9d-11eb-877d-3a7d8bc40466','provider','provider (fornisseur ou bien vendeur)'),('8c7ffe59-7a9d-11eb-877d-3a7d8bc40466','driver','chaufeur (external or internal)');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(255) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `manifacturing` datetime DEFAULT NULL,
  `expiry` datetime DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sensor`
--

DROP TABLE IF EXISTS `product_sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sensor` (
  `product` varchar(36) NOT NULL,
  `sensor` varchar(36) NOT NULL,
  `min` double DEFAULT NULL,
  `max` double DEFAULT NULL,
  `interval` int DEFAULT NULL,
  PRIMARY KEY (`product`,`sensor`),
  KEY `fk_product_has_sensor_sensor1_idx` (`sensor`),
  KEY `fk_product_has_sensor_product1_idx` (`product`),
  CONSTRAINT `fk_product_has_sensor_product1` FOREIGN KEY (`product`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_product_has_sensor_sensor1` FOREIGN KEY (`sensor`) REFERENCES `sensor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sensor`
--

LOCK TABLES `product_sensor` WRITE;
/*!40000 ALTER TABLE `product_sensor` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id` varchar(36) NOT NULL,
  `codeFiscal` varchar(45) DEFAULT NULL,
  `codePostal` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `agence` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_provider_app_user1_idx` (`id`),
  KEY `fk_provider_agence` (`agence`),
  CONSTRAINT `fk_provider_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`),
  CONSTRAINT `fk_provider_app_user1` FOREIGN KEY (`id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` VALUES ('10BCBCC0-9975-11EB-AC9E-2D27E91AE8F6','100292','2001','company ProviderA3',NULL,NULL,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-09 21:49:23'),('18A313E0-9848-11EB-8CB8-173F18D37F47','10299J','1002','company ProviderA1',NULL,NULL,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-08 09:54:07'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','2991J','10029','company ProviderA2',NULL,NULL,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-08 09:55:04'),('43C3F070-9975-11EB-AC9E-2D27E91AE8F6','299382J','1002929','company ProviderA4',NULL,NULL,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-09 21:50:49'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','100292J','102991','company ProviderB2',NULL,NULL,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-09 21:23:12'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','20336','1008','company ProviderB1',NULL,NULL,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-09 09:44:30'),('D6F7F690-9A09-11EB-96CF-9B6CD0D631B0','29292J','10029','company ProviderC1',NULL,NULL,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-10 15:34:21');
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_has_customer`
--

DROP TABLE IF EXISTS `provider_has_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_has_customer` (
  `provider` varchar(36) NOT NULL,
  `customer` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`provider`,`customer`),
  KEY `fk_provider_idx` (`provider`),
  KEY `fk_customer_idx` (`customer`),
  CONSTRAINT `fk_provider_has_customer_customer` FOREIGN KEY (`customer`) REFERENCES `customer_provider` (`id`),
  CONSTRAINT `fk_provider_has_customer_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_has_customer`
--

LOCK TABLES `provider_has_customer` WRITE;
/*!40000 ALTER TABLE `provider_has_customer` DISABLE KEYS */;
INSERT INTO `provider_has_customer` VALUES ('18A313E0-9848-11EB-8CB8-173F18D37F47','38A81D62-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AA6753-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AB51B3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38ABEDF3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AC6323-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38ACD853-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AD4D83-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38ADE9C3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AE5EF2-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','38AEAD13-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:01:55'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57720CC0-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57736C53-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57740893-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57751A02-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','5775DD53-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57767993-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','5776EEC3-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','577763F3-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','5777B213-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','57787563-B887-11EB-9993-DB409692C86F','2021-05-19 10:48:19'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A6104E2-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A6300B3-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A6375E3-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A641223-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A64D573-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A6571B3-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A65E6E3-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A665C12-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A66F852-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','8A679492-BD66-11EB-8E1B-F15C649B08E4','2021-05-25 15:36:07'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E75808A0-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E769E2F2-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E76C7B02-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E76FAF52-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E7704B92-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E770E7D3-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E772BC92-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E7775073-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E77C0B62-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('18A313E0-9848-11EB-8CB8-173F18D37F47','E77D43E3-BE66-11EB-8056-53D92DA39177','2021-05-26 22:11:14'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E75A092-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E774E43-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E781193-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7886C3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E78FBF3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7A3473-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7AD0B2-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7B45E3-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7BE223-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','4E7C5752-B7D9-11EB-9B33-892A2715C256','2021-05-18 14:02:31'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D45B62-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D6CC62-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D7DDD2-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D8C833-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D96473-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8D9D9A3-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DA4ED3-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DB1223-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DB8753-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','A8DBFC83-B817-11EB-8A12-19E9ED793EF2','2021-05-18 21:28:52'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA46482-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA59D03-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA63943-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA6AE73-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA798D3-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA83513-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA8D153-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AA94683-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AAA09D3-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','0AAAA613-B812-11EB-9160-B788CA63A9C6','2021-05-18 20:48:39');
/*!40000 ALTER TABLE `provider_has_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rescheduleColis`
--

DROP TABLE IF EXISTS `rescheduleColis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rescheduleColis` (
  `id` varchar(36) NOT NULL,
  `colis` varchar(36) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `agence` varchar(36) DEFAULT NULL,
  `anomaly` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rescheduleColis_1_idx` (`colis`),
  KEY `fk_rescheduleColis_1_idx1` (`driver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rescheduleColis`
--

LOCK TABLES `rescheduleColis` WRITE;
/*!40000 ALTER TABLE `rescheduleColis` DISABLE KEYS */;
/*!40000 ALTER TABLE `rescheduleColis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor`
--

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_event`
--

DROP TABLE IF EXISTS `status_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_event` (
  `id` varchar(36) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_status_event_event1` FOREIGN KEY (`id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_event`
--

LOCK TABLES `status_event` WRITE;
/*!40000 ALTER TABLE `status_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(255) NOT NULL,
  `serial` varchar(50) NOT NULL,
  `batch` varchar(50) NOT NULL COMMENT 'batch is unique per product',
  `quantity` int NOT NULL DEFAULT '1',
  `product` varchar(36) NOT NULL,
  `registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `manifacturing` datetime NOT NULL,
  `expiry` datetime NOT NULL,
  `delivered` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_supply_product1_idx` (`product`),
  CONSTRAINT `fk_supply_product1` FOREIGN KEY (`product`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply`
--

LOCK TABLES `supply` WRITE;
/*!40000 ALTER TABLE `supply` DISABLE KEYS */;
/*!40000 ALTER TABLE `supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply_beacon`
--

DROP TABLE IF EXISTS `supply_beacon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply_beacon` (
  `supply` varchar(36) NOT NULL,
  `beacon` varchar(36) NOT NULL,
  PRIMARY KEY (`supply`,`beacon`),
  KEY `fk_supply_has_beacon_beacon1_idx` (`beacon`),
  KEY `fk_supply_has_beacon_supply1_idx` (`supply`),
  CONSTRAINT `fk_supply_has_beacon_beacon1` FOREIGN KEY (`beacon`) REFERENCES `beacon` (`id`),
  CONSTRAINT `fk_supply_has_beacon_supply1` FOREIGN KEY (`supply`) REFERENCES `supply` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply_beacon`
--

LOCK TABLES `supply_beacon` WRITE;
/*!40000 ALTER TABLE `supply_beacon` DISABLE KEYS */;
/*!40000 ALTER TABLE `supply_beacon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply_history`
--

DROP TABLE IF EXISTS `supply_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply_history` (
  `id` varchar(36) NOT NULL,
  `supply` varchar(36) NOT NULL,
  `event` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supply_history_supply1_idx` (`supply`),
  KEY `fk_supply_history_event1_idx` (`event`),
  CONSTRAINT `fk_supply_history_event1` FOREIGN KEY (`event`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_supply_history_supply1` FOREIGN KEY (`supply`) REFERENCES `supply` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply_history`
--

LOCK TABLES `supply_history` WRITE;
/*!40000 ALTER TABLE `supply_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `supply_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switchColis`
--

DROP TABLE IF EXISTS `switchColis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switchColis` (
  `id` varchar(36) NOT NULL,
  `colis` varchar(36) DEFAULT NULL,
  `driver` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `agence` varchar(36) DEFAULT NULL,
  `exchangeAgence` varchar(36) DEFAULT NULL,
  `anomaly` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switchColis`
--

LOCK TABLES `switchColis` WRITE;
/*!40000 ALTER TABLE `switchColis` DISABLE KEYS */;
/*!40000 ALTER TABLE `switchColis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_utility`
--

DROP TABLE IF EXISTS `transport_utility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_utility` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(255) NOT NULL,
  `datamatrix` varchar(45) NOT NULL,
  `registration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(10) NOT NULL DEFAULT 'STAGING',
  `location` varchar(36) NOT NULL,
  `imageRef` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `datamatrix_UNIQUE` (`datamatrix`),
  KEY `fk_transport_utility_location1_idx` (`location`),
  CONSTRAINT `fk_transport_utility_location1` FOREIGN KEY (`location`) REFERENCES `location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_utility`
--

LOCK TABLES `transport_utility` WRITE;
/*!40000 ALTER TABLE `transport_utility` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_utility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_utility_gateway`
--

DROP TABLE IF EXISTS `transport_utility_gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_utility_gateway` (
  `transportUtility` varchar(36) NOT NULL,
  `gateway` varchar(36) NOT NULL,
  PRIMARY KEY (`transportUtility`,`gateway`),
  KEY `fk_transport_utility_has_gateway_gateway1_idx` (`gateway`),
  KEY `fk_transport_utility_has_gateway_transport_utility1_idx` (`transportUtility`),
  CONSTRAINT `fk_transport_utility_has_gateway_gateway1` FOREIGN KEY (`gateway`) REFERENCES `gateway` (`id`),
  CONSTRAINT `fk_transport_utility_has_gateway_transport_utility1` FOREIGN KEY (`transportUtility`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_utility_gateway`
--

LOCK TABLES `transport_utility_gateway` WRITE;
/*!40000 ALTER TABLE `transport_utility_gateway` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_utility_gateway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_utility_history`
--

DROP TABLE IF EXISTS `transport_utility_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_utility_history` (
  `id` varchar(36) NOT NULL,
  `transportUtility` varchar(36) NOT NULL,
  `event` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transport_utility_history_transport_utility1_idx` (`transportUtility`),
  KEY `fk_transport_utility_history_event1_idx` (`event`),
  CONSTRAINT `fk_transport_utility_history_event1` FOREIGN KEY (`event`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_transport_utility_history_transport_utility1` FOREIGN KEY (`transportUtility`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_utility_history`
--

LOCK TABLES `transport_utility_history` WRITE;
/*!40000 ALTER TABLE `transport_utility_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_utility_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_utility_supply`
--

DROP TABLE IF EXISTS `transport_utility_supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_utility_supply` (
  `transportUtility` varchar(36) NOT NULL,
  `supply` varchar(36) NOT NULL,
  PRIMARY KEY (`transportUtility`,`supply`),
  KEY `fk_transport_utility_has_supply_supply1_idx` (`supply`),
  KEY `fk_transport_utility_has_supply_transport_utility1_idx` (`transportUtility`),
  CONSTRAINT `fk_transport_utility_has_supply_supply1` FOREIGN KEY (`supply`) REFERENCES `supply` (`id`),
  CONSTRAINT `fk_transport_utility_has_supply_transport_utility1` FOREIGN KEY (`transportUtility`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_utility_supply`
--

LOCK TABLES `transport_utility_supply` WRITE;
/*!40000 ALTER TABLE `transport_utility_supply` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_utility_supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_utility_transport_utility`
--

DROP TABLE IF EXISTS `transport_utility_transport_utility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_utility_transport_utility` (
  `containing` varchar(36) NOT NULL,
  `contained` varchar(36) NOT NULL,
  PRIMARY KEY (`contained`,`containing`),
  KEY `fk_transport_utility_has_transport_utility_transport_utilit_idx` (`contained`),
  KEY `fk_transport_utility_has_transport_utility_transport_utilit_idx1` (`containing`),
  CONSTRAINT `fk_transport_utility_has_transport_utility_transport_utility1` FOREIGN KEY (`containing`) REFERENCES `transport_utility` (`id`),
  CONSTRAINT `fk_transport_utility_has_transport_utility_transport_utility2` FOREIGN KEY (`contained`) REFERENCES `transport_utility` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_utility_transport_utility`
--

LOCK TABLES `transport_utility_transport_utility` WRITE;
/*!40000 ALTER TABLE `transport_utility_transport_utility` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_utility_transport_utility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_privilege`
--

DROP TABLE IF EXISTS `user_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_privilege` (
  `users` varchar(36) NOT NULL,
  `privilege` varchar(36) NOT NULL,
  PRIMARY KEY (`users`,`privilege`),
  KEY `fk_user_has_privilege_privilege1_idx` (`privilege`),
  KEY `fk_user_has_privilege_user2_idx` (`users`),
  CONSTRAINT `fk_user_has_privilege_privilege1` FOREIGN KEY (`privilege`) REFERENCES `privilege` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_has_privilege_user2` FOREIGN KEY (`users`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_privilege`
--

LOCK TABLES `user_privilege` WRITE;
/*!40000 ALTER TABLE `user_privilege` DISABLE KEYS */;
INSERT INTO `user_privilege` VALUES ('7C57B4E0-8A33-11EB-8A9D-D999909645CC','3930cede-8a33-11eb-9892-94e6f79e32c5'),('02CB7BC0-7B42-11EB-BDE3-4F72C521B3F0','4ec39928-7a9d-11eb-877d-3a7d8bc40466'),('3CB70F20-7B42-11EB-BDE3-4F72C521B3F0','4ec39928-7a9d-11eb-877d-3a7d8bc40466'),('D3EA2830-7B3A-11EB-A645-9795D36837FC','4ec39928-7a9d-11eb-877d-3a7d8bc40466'),('4120D560-A364-11EB-B0D0-C3798C8972C9','6c7ffe59-7a9d-11eb-877d-3a7d8bc40455'),('6B757910-A364-11EB-B0D0-C3798C8972C9','6c7ffe59-7a9d-11eb-877d-3a7d8bc40455'),('7E69C490-A364-11EB-B0D0-C3798C8972C9','6c7ffe59-7a9d-11eb-877d-3a7d8bc40455'),('8A1ABDE0-A41C-11EB-BB44-D3A99C541D37','6c7ffe59-7a9d-11eb-877d-3a7d8bc40455'),('10BCBCC0-9975-11EB-AC9E-2D27E91AE8F6','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('18A313E0-9848-11EB-8CB8-173F18D37F47','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('3A8DA240-9848-11EB-8605-ABCA64BADD5E','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('43C3F070-9975-11EB-AC9E-2D27E91AE8F6','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('67F7CF60-9971-11EB-AC9E-2D27E91AE8F6','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('CCC27FB0-990F-11EB-AD4A-310C1BAEC68F','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('D6F7F690-9A09-11EB-96CF-9B6CD0D631B0','7cd243ea-7a9d-11eb-877d-3a7d8bc40466'),('027A52E0-7B60-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('6D01BF40-7B60-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('792F61B0-7B5F-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('8464EC80-939C-11EB-B69D-17A841C0031C','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('93D0BEA0-7B60-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('AF902B30-7B60-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('E2D791A0-7B5F-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('E339DC40-7B67-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466'),('FAE0DA60-7B67-11EB-A8A0-B17B549DCEAD','8c7ffe59-7a9d-11eb-877d-3a7d8bc40466');
/*!40000 ALTER TABLE `user_privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(255) NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `capacity` double NOT NULL,
  `status` int DEFAULT '0',
  `agence` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_vehicle_agence` (`agence`),
  CONSTRAINT `fk_vehicle_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES ('01dc19bd-7aa1-11eb-877d-3a7d8bc40466','GQJSJ','201 TUNIS 1008(A)',15,1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('060d948c-7aa5-11eb-877d-3a7d8bc40466','3KTHX','203 TUNIS 8001(C)',19,1,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('11a70eee-7aa5-11eb-877d-3a7d8bc40466','2P3E1','203 TUNIS 2313(C)',9,1,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('1f1097b2-7aa1-11eb-877d-3a7d8bc40466','MO1J0','201 TUNIS 3408(A)',16,1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('2f578ae6-7aa1-11eb-877d-3a7d8bc40466','ED6NH','201 TUNIS 5090(A)',20,1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('4115d520-939c-11eb-aa51-a6225fd664a6','OIAO9','109 TUNIS 2019',70,1,'BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-02 11:14:48'),('a6d5b462-7aa4-11eb-877d-3a7d8bc40466','CBD37','202 TUNIS 6231(B)',10,1,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('b1fcb8f4-7aa4-11eb-877d-3a7d8bc40466','IC4HQ','202 TUNIS 2031(B)',19,1,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('c2cceef6-7aa4-11eb-877d-3a7d8bc40466','1PTQ6','202 TUNIS 5112(B)',19,1,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('dabd9b72-7aa4-11eb-877d-3a7d8bc40466','KIU37','203 TUNIS 1922(C)',20,0,'2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11'),('e6826fac-7aa4-11eb-877d-3a7d8bc40466','UPOK7','202 TUNIS 2011(B)',10,0,'D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:11');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone`
--

DROP TABLE IF EXISTS `zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zone` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `code` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `agence` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_zone_agence_idx` (`agence`),
  CONSTRAINT `fk_zone_agence` FOREIGN KEY (`agence`) REFERENCES `agence` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES ('0E88BB50-7AA0-11EB-BF37-2BA4FB3989B2','5VDK5','adress Zone_A3','city  Zone_A3','country Zone_A3','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42'),('2928AE20-7AA0-11EB-BF37-2BA4FB3989B2','Y7UR6','Adress Zone_B1','city Zone_B1','country Zone_B1','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42'),('46AE94C0-7A9E-11EB-BF37-2BA4FB3989B2','1F1WK','Adress Zone_A1','city Zone_A1','country Zone_A1','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42'),('73AF81D0-7AA0-11EB-BF37-2BA4FB3989B2','UC9O6','Adress Zone_B2','city Zone_B2','country Zone_B','D6D3F000-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42'),('8ABED3D0-7AA0-11EB-BF37-2BA4FB3989B2','POBSH','Adress Zone_C','city Zone_C','country Zone_C','2856CA10-7A9E-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42'),('D93C2B80-7A9F-11EB-BF37-2BA4FB3989B2','EQ6CS','Adress Zone_A2','city Zone_A2','country Zone_A2','BA5E79E0-7A9D-11EB-BF37-2BA4FB3989B2','2021-04-01 14:00:42');
/*!40000 ALTER TABLE `zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-02  8:37:03
