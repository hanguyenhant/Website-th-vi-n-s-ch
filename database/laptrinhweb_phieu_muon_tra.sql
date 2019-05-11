-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: laptrinhweb1
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `phieu_muon_tra`
--

DROP TABLE IF EXISTS `phieu_muon_tra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_muon_tra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaThe` varchar(45) NOT NULL,
  `NgayMuon` datetime NOT NULL,
  `ThoiHanMuon` varchar(45) NOT NULL,
  `NgayTra` datetime DEFAULT NULL,
  `MaNV_Muon` varchar(45) NOT NULL,
  `MaNV_Tra` varchar(45) DEFAULT NULL,
  `TongSoSach` int(11) NOT NULL,
  `TongTienCoc` int(11) NOT NULL,
  `TrangThai` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_muon_tra`
--

LOCK TABLES `phieu_muon_tra` WRITE;
/*!40000 ALTER TABLE `phieu_muon_tra` DISABLE KEYS */;
INSERT INTO `phieu_muon_tra` VALUES (1,'DG0001','2019-05-08 00:00:00','1 năm',NULL,'NV001',NULL,3,295000,'Mượn'),(2,'DG0002','2019-05-10 00:00:00','1 năm',NULL,'NV002',NULL,2,156000,'Mượn'),(3,'DG0003','2019-05-11 17:31:00','3 tháng',NULL,'NV001',NULL,3,159500,'Mượn'),(4,'DG0004','2019-05-11 17:37:11','6 tháng',NULL,'NV001',NULL,3,221250,'Mượn'),(5,'DG0005','2019-05-11 17:40:36','6 tháng',NULL,'NV001',NULL,4,225000,'Mượn');
/*!40000 ALTER TABLE `phieu_muon_tra` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-11 19:15:14
