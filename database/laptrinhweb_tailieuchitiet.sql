-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: laptrinhweb
-- ------------------------------------------------------
-- Server version	5.7.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tailieuchitiet`
--

DROP TABLE IF EXISTS `tailieuchitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tailieuchitiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaVach` varchar(45) NOT NULL,
  `TaiLieuId` int(11) NOT NULL,
  `NgayCN` date NOT NULL,
  `MaNV` varchar(45) NOT NULL,
  `TinhTrang` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieuchitiet`
--

LOCK TABLES `tailieuchitiet` WRITE;
/*!40000 ALTER TABLE `tailieuchitiet` DISABLE KEYS */;
INSERT INTO `tailieuchitiet` VALUES (1,'TLCT00001',2,'2019-03-20','NV001','mượn'),(2,'TLCT00002',1,'2019-03-20','NV002','chưa mượn'),(3,'TLCT00003',3,'2019-05-05','NV003','chưa mượn'),(4,'TLCT00004',4,'2019-04-05','NV005','mượn'),(5,'TLCT00005',5,'2019-04-02','NV004','mượn');
/*!40000 ALTER TABLE `tailieuchitiet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-11 15:27:50
