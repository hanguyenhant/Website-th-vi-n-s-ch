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
-- Table structure for table `docgia`
--

DROP TABLE IF EXISTS `docgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docgia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaThe` varchar(45) NOT NULL,
  `HoTen` varchar(45) CHARACTER SET utf8 NOT NULL,
  `DiaChi` varchar(45) CHARACTER SET utf8 NOT NULL,
  `Email` varchar(45) NOT NULL,
  `SoDienThoai` varchar(45) NOT NULL,
  `NgayCap` date NOT NULL,
  `HanSD` date NOT NULL,
  `MaNV` varchar(45) NOT NULL,
  `NgayCN` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docgia`
--

LOCK TABLES `docgia` WRITE;
/*!40000 ALTER TABLE `docgia` DISABLE KEYS */;
INSERT INTO `docgia` VALUES (5,'DG0001','Nguyễn Thái Hà','Đống Đai','hant.hanguyen@gmail.com','0362635500','2019-03-14','2020-03-14','NV004','2019-03-14'),(6,'DG0002','Vũ Thị Ngọc','Hà Đông','vuthingoc@gmail.com','0322333445','2019-03-20','2020-03-20','NV001','2019-03-20'),(7,'DG0003','Phạm Thị Thoa','KTX ĐH BKHN','thoapham@gmail.com','0355544300','2019-04-18','2020-04-19','NV002','2019-04-18'),(8,'DG0004','Nguyễn Thị Phương','KTX ĐHBKHN','nguyenphuong@gmail.com','0388844999','2018-04-23','2020-03-20','NV003','2018-03-30'),(9,'DG0005','Đào Thị Huê','Trần Đại Nghĩa','hue123@gmail.com','0399949999','2019-03-20','2020-03-20','NV005','2019-04-20');
/*!40000 ALTER TABLE `docgia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-11 15:27:49
