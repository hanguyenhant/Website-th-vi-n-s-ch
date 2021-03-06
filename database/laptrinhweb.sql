-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: laptrinhweb
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
-- Table structure for table `chi_tiet_muon_tra`
--

DROP TABLE IF EXISTS `chi_tiet_muon_tra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chi_tiet_muon_tra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `IdPhieuMuonTra` int(11) NOT NULL,
  `MaVach` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_muon_tra`
--

LOCK TABLES `chi_tiet_muon_tra` WRITE;
/*!40000 ALTER TABLE `chi_tiet_muon_tra` DISABLE KEYS */;
INSERT INTO `chi_tiet_muon_tra` VALUES (13,1,'TLCT00001'),(14,1,'TLCT00002'),(15,1,'TLCT00003'),(16,2,'TLCT00001'),(20,2,'TLCT00005'),(23,3,'TLCT00001'),(24,3,'TLCT00003'),(25,3,'TLCT00005'),(26,4,'TLCT00001'),(27,4,'TLCT00003'),(28,4,'TLCT00002'),(29,5,'TLCT00004'),(30,5,'TLCT00005'),(31,5,'TLCT00002'),(32,5,'TLCT00001');
/*!40000 ALTER TABLE `chi_tiet_muon_tra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docgia`
--

DROP TABLE IF EXISTS `docgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docgia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaThe` varchar(45) NOT NULL,
  `HoTen` varchar(45) CHARACTER SET utf8 COLLATE utf8_danish_ci NOT NULL,
  `DiaChi` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `SoDienThoai` varchar(45) NOT NULL,
  `NgayCap` date NOT NULL,
  `HanSD` date NOT NULL,
  `MaNV` varchar(45) NOT NULL,
  `NgayCN` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docgia`
--

LOCK TABLES `docgia` WRITE;
/*!40000 ALTER TABLE `docgia` DISABLE KEYS */;
INSERT INTO `docgia` VALUES (5,'DG0001','Nguyễn Thái Hà','Đống Đai','hant.hanguyen@gmail.com','0362635500','2019-03-14','2020-03-14','NV004','2019-03-14'),(6,'DG0002','Vũ Thị Ngọc','Hà Đông','vuthingoc@gmail.com','0322333445','2019-03-20','2020-03-20','NV001','2019-03-20'),(7,'DG0003','Phạm Thị Thoa','KTX ĐH BKHN','thoapham@gmail.com','0355544300','2019-04-18','2020-04-19','NV002','2019-04-18'),(8,'DG0004','Nguyễn Thị Phương','KTX ĐHBKHN','nguyenphuong@gmail.com','0388844999','2018-04-23','2020-03-20','NV003','2018-03-30'),(9,'DG0005','Đào Thị Huê','Trần Đại Nghĩa','hue123@gmail.com','0399949999','2019-03-20','2020-03-20','NV005','2019-04-20');
/*!40000 ALTER TABLE `docgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TenTk` varchar(45) CHARACTER SET latin1 NOT NULL,
  `MatKhau` varchar(45) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (3,'NV001','1234'),(4,'NV002','1234'),(5,'DG0001','1234'),(6,'NV003','1234'),(7,'DG0002','1234'),(8,'admin','admin');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhacungcap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NhaCungCap` varchar(45) NOT NULL,
  `DiaChi` varchar(45) NOT NULL,
  `SoDienThoai` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES (1,'Nhà sách Phương Nam','Đống Đa','19000088','nsphuongnam@gmail.com'),(2,'Nhà sách Nhã Nam','Hai Bà Trưng','13143254','nhanamstore@gmail.com'),(3,'Nhà sách Nhi Đồng','Hồ Hoàn Kiếm','24234212','nhidong@gmail.com'),(4,'Nhà sách Skybook','Trần Đại Nghĩa','24324234','skybook@gmail.com'),(5,'Nhà sách Thăng Long','Hà Đông','88994321','thanglong@gmail.com');
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhanvien` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaNV` varchar(45) NOT NULL,
  `HoTen` varchar(45) NOT NULL,
  `DiaChi` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `SoDienThoai` varchar(45) NOT NULL,
  `ChucVu` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (1,'NV0001','Hà Thị Huệ','Hà Nội','hue.hathi@hust.edu.vn','02422153287','Admin'),(2,'NV002','Hoàng Ngọc Chi','Hải Phòng','chi.hoangngoc@hust.edu.vn','02438694227','Nhân viên'),(3,'NV003','Nguyễn Ngọc Sơn','Bắc Giang','son.nguyenngoc@hust.edu.vn','02439916007','Nhân viên'),(4,'NV004','Nguyễn Thị Thu Thủy','Hưng Yên','thuy.nguyenthithu1@hust.edu.vn','02439916005','Nhân viên'),(5,'NV005','Hồ Thị Oanh','Nghệ An','oanhht@gmail.com','0908287599','Nhân viên');
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `tailieu`
--

DROP TABLE IF EXISTS `tailieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tailieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TenTL` varchar(100) NOT NULL,
  `TenTheLoai` varchar(100) NOT NULL,
  `TenTG` varchar(100) NOT NULL,
  `TenNXB` varchar(100) NOT NULL,
  `NamXB` int(11) NOT NULL,
  `TenNgonNgu` varchar(100) NOT NULL,
  `NoiDung` varchar(3000) NOT NULL,
  `SoTrang` int(11) NOT NULL,
  `KhoGiay` varchar(45) NOT NULL,
  `LanTB` varchar(100) NOT NULL,
  `GiaBia` int(11) NOT NULL,
  `SoPH` int(11) NOT NULL,
  `NgayPH` date NOT NULL,
  `TongSo` int(11) NOT NULL,
  `MaVT` varchar(45) NOT NULL,
  `NgayCN` date NOT NULL,
  `MaNV` varchar(45) NOT NULL,
  `Anh` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieu`
--

LOCK TABLES `tailieu` WRITE;
/*!40000 ALTER TABLE `tailieu` DISABLE KEYS */;
INSERT INTO `tailieu` VALUES (1,'Bước Chậm Lại Giữa Thế Gian Vội Vã','Sách văn học','Hae Min','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Chen vai thích cánh để có một chỗ bám trên xe buýt giờ đi làm, nhích từng xentimét bánh xe trên đường lúc tan sở, quay cuồng với thi cử và tiến độ công việc, lu bù vướng mắc trong những mối quan hệ cả thân lẫn sơ… bạn có luôn cảm thấy thế gian xung quanh mình đang xoay chuyển quá vội vàng?',256,'14 x 20.5cm','Tái bản lần thứ nhất',85000,1,'2018-01-01',20,'VT00001','2018-10-06','NV001','buoc-cham-lai-giua-the-gian-voi-va.jpg'),(2,'Mắt Biếc','Sách văn học','Nguyễn Nhật Ánh','Nhà Xuất Bản Trẻ',2018,'Tiếng Việt','Một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn này. Một tác phẩm đang được dịch và giới thiệu tại Nhật Bản (theo thông tin từ các báo)… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc rất, rất buồn khi suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn (cái kết thúc không như mong đợi của mọi người). Cũng bởi, mắt biếc… năm xưa nay đâu (theo lời một bài hát).',236,'14 x 20.5cm','Tái bản lần thứ ba',71000,1,'2018-11-10',20,'VT00002','2018-12-12','NV001','mat-biec.jpg'),(3,'Yêu Những Điều Không Hoàn Hảo','Sách văn học','Hae Min','Nhà Xuất Bản Thế Giới',2016,'Tiếng Việt','Đại đức Hae Min sinh ra và lớn lên tại Hàn Quốc. Sau khi hoàn thành bằng Thạc sĩ Tôn giáo học đối chiếu ở Đại học Havard và Tiến sĩ Tôn giáo học ở Đại học Princeton, ông ở lại Mỹ tham gia giảng dạy về tôn giáo ở trường Đại học Hampshire, Massachusetts. Không chỉ dừng lại ở nghiên cứu lý thuyết, mùa xuân năm 2000 ông quyết định xuất gia theo tông phái Tào Khê, một tông phái tiêu biểu của Phật giáo Hàn Quốc. Năm 2015, Đại đức Hae Min trở về Seoul, cùng nhiều chuyên gia mở trường Trị liệu tâm hồn, điều trị miễn phí cho những người gặp bất hạnh trong cuộc sống hay đang mang trong lòng nhiều khổ tâm. Đại đức Haemin là một trong những người rất có ảnh hưởng tới giới trẻ Hàn Quốc, trang Twitter cá nhân (https://twitter.com/haeminsunim) của ông hiện có tới hơn một triệu người theo dõi. Sách cùng tác giả: - Những vỡ lẽ của tuổi trẻ - Yêu lấy những điều không hoàn hảo.',300,'14 x 20.5 cm','Tái bản lần thứ hai',139000,1,'2016-02-10',20,'VT00003','2016-06-15','NV002','yeu-nhung-dieu-khong-hoan-hao.jpg'),(4,'Chuyện Con Mèo Dạy Hải Âu Bay','Sách văn học','Luis Sepulveda','Nhà Xuất Bản Hội Nhà Văn',2014,'Tiếng Việt','Có tồn tại không tình thương yêu giữa mèo và hải âu?',139,'14 x 20.5 cm','Tái bản lần thứ hai',35000,1,'2014-03-29',20,'VT00004','2016-09-10','NV002','chuyen-con-meo-day-hai-au-bay.jpg'),(5,'Khi Hơi Thở Hóa Thinh Không','Sách văn học','Paul Kalanithi','Nhà Xuất Bản Lao Động',2017,'Tiếng Việt','Khi Hơi Thở Hóa Thinh Không là tự truyện của một bác sĩ bị mắc bệnh ung thư phổi. Trong cuốn sách này, tác giả đã chia sẻ những trải nghiệm từ khi mới bắt đầu học ngành y, tiếp xúc với bệnh nhân cho tới khi phát hiện ra mình bị ung thư và phải điều trị lâu dài. Bạn bè và gia đình đã dành tặng những lời trìu mến nhất cho con người đáng kính trọng cả về tài năng lẫn nhân cách này. Dù không thể vượt qua cơn bệnh nan y, nhưng thông điệp của tác giả sẽ còn khiến người đọc nhớ mãi.',236,'14 x 20.5 cm','Tái bản lần thứ hai',109000,1,'2017-05-10',20,'VT00005','2017-10-10','NV003','khi-hoi-tho-hoa-thinh-khong.jpg'),(6,'Có Hai Con Mèo Ngồi Bên Cửa Sổ','Sách văn học','Nguyễn Nhật Ánh','Nhà Xuất Bản Trẻ',2012,'Tiếng Việt','Nhân vật chính thứ nhất tên là Gấu. Nhân vật thứ hai là Tí Hon. Nhân vật thứ ba, tên là…; còn nữa, nhân vật thứ tư, tên là… Để biết tại sao Gấu lại chơi thân với Tí Hon, thì mời bạn hãy mở sách ra. Gấu và Tí Hon thân nhau đến mức có thể chia sẻ từng chuyện vui buồn trong những phút giây mềm yếu, lo lắng và chăm sóc, giúp nhau từ miếng ăn đến “chiến lược” để tồn tại lâu dài.Tình bạn là gì? Bạn gái là gì? Tình yêu là gì? Cuốn truyện có độ dầy vừa phải, 67 hình vẽ của họa sĩ Đỗ Hoàng Tường sinh động đến từng nét nũng nịu hay kiêu căng của nàng mèo người yêu mèo Gấu, câu chuyện thì hấp dẫn duyên dáng điểm những bài thơ tình lãng mạn nao lòng song đọc to lên thì khiến cười hinh hích…',210,'14 x 20.5 cm','Tái bản lần thứ ba',85000,1,'2012-05-05',20,'VT00006','2012-06-06','NV004','co-hai-con-meo-ngoi-ben-cua-so.jpg'),(7,'Nếu Chỉ Còn Một Ngày Để Sống','Sách văn học','Nicola Yoon','Nhà Xuất Bản Văn Học',2017,'Tiếng Việt','“Nếu chỉ còn một ngày để sống” tên sách gốc Everything, Everything là cuốn tiểu thuyết bán chạy số 1 của New York Times – đồng thời được chuyển thể thành phim điện ảnh với sự góp mặt của hai diễn viên nổi tiếng là Amandla Stenberg trong vai Maddy và Nick Robinson trong vai Olly. Ngay từ khi công chiếu, bộ phim đã gây bão tại các phòng vé trên toàn thế giới kéo theo cơn sốt tìm đọc cuốn sách đặc biệt này đến từ các fan yêu thích bộ phim. Một chuyện tình cảm động được kể dưới ngòi bút tràn đầy những xúc cảm khác biệt đem đến cho người đọc những rung cảm chân thật chạm đến từng ngóc ngách trong trái tim. Một cuốn sách đã khiến hàng triệu độc giả phải khóc phải cười qua từng trang giấy. “Nếu cuộc đời là một cuốn sách thì bạn đọc ngược từ dưới lên cũng sẽ chẳng có gì thay đổi. Hôm nay chẳng khác gì hôm qua. Ngày mai cũng giống hệt ngày hôm nay. Trong cuốn sách về cuộc đời em, chương nào cũng giống hệt chương nào, cho tới khi anh xuất hiện.” Đánh đổi mọi thứ... vì tình yêu. Liệu điều đó có hoàn toàn xứng đáng ?',200,'14.5 x 20.5 cm','Tái bản lần thứ nhất',90000,1,'2017-05-05',20,'VT00007','2017-06-06','NV004','neu-chi-con-mot-ngay-de-song.jpg'),(8,'Trưởng Thành Sau Ngàn Lần Tranh Đấu','Sách văn học','Kim Ran Do','Nhà Xuất Bản Hà Nội',2018,'Tiếng Việt','“Cuốn sách này được viết cho bạn - người đang chao đảo bên ngưỡng cửa trưởng thành. Tôi trưởng thành sớm hơn bạn một chút, đôi khi vẫn còn hành xử chưa ra dáng người lớn lắm, tôi viết cuốn sách này để ‘lắng nghe’ câu chuyện của bạn. Hẳn bạn sẽ lấy làm lạ, sách là phương tiện để ‘nói’, vậy mà tôi lại muốn thông qua sách để ‘lắng nghe’? Đúng vậy, tôi không muốn đơn phương lên lớp về những bí quyết trưởng thành. Tôi chỉ muốn làm một thính giả chân tình và cởi mở, giúp bạn đích thân cất lời, nói ra những vấn đề của bản thân. Đọc chỉ giúp bạn rút ra kết luận mà thôi, nhưng một khi nói ra, bạn sẽ tìm ra cách chữa trị cho chính mình. Vậy nên, cùng với cuốn sách này, bạn hãy bắt đầu câu chuyện đè nén, chất chứa trong lòng bấy lâu nay…”',560,'14 x 20.5 cm','Tái bản lần thứ hai',95000,1,'2018-09-05',20,'VT00008','2018-12-06','NV004','truong-thanh-sau-ngan-lan-tranh-dau.jpg'),(9,'Cho Tôi Biến Mất Một Ngày','Sách văn học','Việt','Nhà Xuất Bản Văn Học',2019,'Tiếng Việt','Người ta vẫn nói, tuổi trẻ là không được sợ hãi, không được mắc sai lầm, hãy cứ dám nghĩ, dám làm cho những ý tưởng mới, những dự định mới. Người khác có thể không tin tưởng ở bạn, bố mẹ luôn muốn bạn chọn những gì an toàn và chắc chắn nhất nhưng chính tuổi trẻ lại muốn bạn làm khác đi, tạo nên những điều mới mẻ chính trong những khó khăn đó. Thế nhưng, có một điều mà chúng ta chẳng thể phủ nhận, khi còn trẻ cũng là lúc chúng ta có nhiều nỗi sợ không tên nhất. Sợ mất đi ai đó, sợ rớt môn, sợ bị xa lánh. Khi ấy, cảm giác cuộc sống không nằm trong tầm kiểm soát của bạn, mọi thứ đang tự động diễn ra mà bạn không đủ khả năng để điều khiển. Bạn có thể cảm thấy bế tắc và không hiểu tại sao mình lại ở đây, lúc này. Làm sao để giải quyết được những khủng hoảng đó ư? Chỉ có một cách duy nhất là luôn mỉm cười và tin tưởng vào bản thân mình. Và đôi khi, hãy tự giải thoát mình khỏi những áp lực đang đè nặng, thử biến mất một vài ngày để mọi thứ dễ thở hơn. “Cho tôi biến mất một ngày” – cuốn sách giúp bạn để vượt qua khủng hoảng tuổi 20.',232,'13 x 20.5 cm','Tái bản lần thứ nhất',80000,1,'2019-01-05',20,'VT00009','2019-01-06','NV004','cho-toi-bien-mat-mot-ngay.png'),(10,'D.Trump. Nghệ Thuật Đàm Phán','Sách văn học','Donald J.Trump & Tony Schwartz','Nhà Xuất Bản Trẻ',2016,'Tiếng Việt','Quyển  sách cho chúng ta thấy cách Trump  làm việc  mỗi ngày - cách ông điều hành công việc kinh doanh và cuộc sống - cũng như cách ông trò chuyện với bạn bè và gia đình, làm ăn với đối thủ, mua thành công những sòng bạc hàng đầu ở thành phố Atlantic, thay đổi bộ mặt của những cao ốc ở thành phố New York… và xây dựng những tòa nhà chọc trời trên thế giới. Quyển sách đi sâu vào đầu óc của một doanh nhân xuất sắc và khám phá một cách khoa học chưa từng thấy về cách đàm phán một thương vụ thành công. Đây là một cuốn sách thú vị về đàm phán và kinh doanh – và là một cuốn sách nên đọc cho bất kỳ ai quan tâm đến đầu tư, bất động sản và thành công.',328,'14 x 20 cm','Tái bản lần thứ nhất',105000,1,'2016-05-05',20,'VT00010','2016-06-06','NV004','nghe-thuat-dam-phan.png'),(12,'Tôi Là Bêtô','Sách văn học','Nguyễn Nhật Ánh','Nhà Xuất Bản Trẻ',2015,'Tiếng Việt','Tôi Là Bêtô là tác phẩm mới nhất của nhà văn chuyên viết cho thanh thiếu niên của Nguyễn Nhật Ánh. Anh đã được đông đảo bạn đọc biết đến qua các tác phẩm quen thuộc như Thằng quỷ nhỏ, Trại hoa vàng, Bong bóng lên trời, Cô gái đến từ hôm qua… và hai bộ truyện nhiều tập Kính vạn hoa và Chuyện xứ Lang Biang. Với Tôi là Bêtô, đây là lần đầu tiên anh viết một tác phẩm qua lời kể của một chú cún. Trong thiên truyện này, thế giới được nhìn một cách trong trẻo nhưng lồng trong đó không thiếu những ý tứ thâm trầm, khiến người đọc phải ngẫm nghĩ. Đây chắc chắn là tác phẩm không chỉ dành cho trẻ em.',100,'14 x 20.5 cm','Tái bản lần thứ hai',43000,1,'2015-05-05',20,'VT00011','2015-06-06','NV004','toi-la-beto.jpg'),(13,'Tuổi 20 Tôi Đã Sống Như Một Bông Hoa Dại','Sách văn học','Trang Xtd','Nhà Xuất Bản Trẻ',2017,'Tiếng Việt','Tác giả, một cô gái đang trong độ tuổi 20, đang nói hộ chúng ta rất nhiều điều ta không diễn đạt được bằng lời. \"Bố mẹ không hỏi các con đi học vui không, chỉ hỏi điểm cao không. Bố mẹ không hỏi đi làm vui không, mệt không, chỉ hỏi lương cao không, công ty to không. Kết hôn không hỏi có yêu nhau không, mà hỏi có hợp năm tuổi không, chúc mừng sale-off tuổi xuân thành công. Ly dị không ai hỏi vì sao không sống cùng nhau nữa, chỉ hỏi định nhìn mặt mẹ cha xóm giềng thế nào. Đâu phải đến lúc đi làm bạn mới sợ thứ Hai, bạn sợ thứ hai từ lúc đi học cơ mà. Hóa ra chúng ta vẫn là những đứa trẻ đi dưới sân trường, chỉ vì tiếng trống mà chạy đua náo loạn trong sợ hãi. Tiếng trống tuổi 25, tiếng trống tuổi 30, chưa gióng lên mà ta đã sợ hãi lao đi rồi. Người ta nói kẻ dùng trái tim là yếu đuối, thực ra chỉ kẻ mạnh mới dám dùng thôi.\"',280,'12 x 20 cm','Tái bản lần thứ nhất',82000,1,'2017-02-05',20,'VT00012','2017-06-06','NV004','tuoi-20-toi-da-song-nhu-mot-bong-hoa-dai.jpg'),(14,'Vừa Nhắm Mắt Vừa Mở Cửa Sổ','Sách văn học','Nguyễn Ngọc Thuần','Nhà Xuất Bản Trẻ',2017,'Tiếng Việt','\"Vừa nhắm mắt vừa mở cửa sổ đã thật sự là một cú đúp ngoạn mục về văn chương: Mỗi truyện ngắn nho nhỏ trong đó đã là một truyện tặng cho bạn đọc trẻ thơ, lại vừa là một truyện dành cho người lớn. Bởi chúng nhiều tầng nghĩa, giàu chất thơ, và có lẽ, bởi cả tác phẩm chính là kết quả cái nhìn độc đáo của một chủ thể thi sĩ viết văn xuôi, với động thái đắm đuối nhị nguyên rất mới lạ: vừa nhắm mắt, vừa mở cửa sổ... nhìn ra thế giới. Và chỉ để phát hiện ra rằng \'\'thế giới\'\' chính là tất cả những gì thân thuộc, thân mến nhất ngay ở trước mắt: khu vườn nhỏ cạnh cửa sổ nhà mình, cuộc sống hàng ngày êm đêm của cha mẹ, bạn bè, cô giáo, hàng xóm láng giềng kế bên, và... thật thú vị, ở ngay trong trái tim của chính mình, khiến mình phải viết... ra giấy, cho chính mình trước hết.\" - TS Nguyễn Thị Minh Thái',192,'13 x 20cm','Tái bản lần thứ hai',55000,1,'2017-03-05',20,'VT00013','2017-06-06','NV004','vua-nham-mat-vua-mo-cua-so.jpg'),(21,'Lolita','Sách văn học','Vladimir Nabokov','Nhà Xuất Bản Hội Nhà Văn',2015,'Tiếng Việt','Lolita, hiện tượng bất thường bậc nhất của văn chương thế kỷ 20, được xuất bản lần đầu vào năm 1955 tại Paris, mặc dù viết bằng tiếng Mĩ. Cũng như mọi tác phẩm kỳ vĩ và có độ lệch chuẩn lớn, như tiểu thuyết của D. H. Lawrence hay của Anthony Burgess, khởi đầu của Lolita không hề suôn sẻ. Giờ đây khi thực sự được đọc Lolita, ta hiểu tại sao Vladimir Nabokov nâng niu nó đến vậy. Thoạt tiên bị nhìn nhận một cách giản đơn quá mức, Lolita dần thoát khỏi cái định kiến coi nó là tác phẩm thuần túy gợi dục, bởi Lolita chứa đựng nhiều, rất nhiều hơn thế: nó tinh vi dò xét tâm lý con người (dù không cần viện tới tâm phân học, mà thậm chí Nabokov còn luôn luôn tìm cách bài xích Sigmund Freud), và nó còn là những nước cờ ngôn từ kiệt xuất của một trong những thiên tài văn chương lớn nhất.',362,'15 x 24 cm','Tái bản lần thứ hai',115000,1,'2015-09-05',20,'VT00014','2015-10-05','NV004','lolita.jpg'),(22,'Totto-Chan Bên Cửa Sổ','Sách văn học','Kuroyanagi Tetsuko','Nhà Xuất Bản Văn Học',2017,'Tiếng Việt','Vừa vào lớp một được vài ngày, Totto-chan đã bị đuổi học!!! Không còn cách nào khác, mẹ đành đưa Totto-chan đến một ngôi trường mới, trường Tomoe. Đấy là một ngôi trường kỳ lạ, lớp học thì ở trong toa xe điện cũ, học sinh thì được thoả thích thay đổi chỗ ngồi mỗi ngày, muốn học môn nào trước cũng được, chẳng những thế, khi đã học hết bài, các bạn còn được cô giáo cho đi dạo. Đặc biệt hơn ở đó còn có một thầy hiệu trưởng có thể chăm chú lắng nghe Totto-chan kể chuyện suốt bốn tiếng đồng hồ! Chính nhờ ngôi trường đó, một Totto-chan hiếu động, cá biệt đã thu nhận được những điều vô cùng quý giá để lớn lên thành một con người hoàn thiện, mạnh mẽ.',355,'14 x 19 cm','Tái bản lần thứ hai',90000,1,'2017-03-05',20,'VT00015','2017-04-05','NV005','totto-chan-ben-cua-so.jpg'),(24,'Đừng Quên Não Cho Đời Bớt Bão','Sách kỹ năng sống','Wada Hideki','Nhà Xuất Bản Tổng hợp TP.HCM',2016,'Tiếng Việt','Các nghiên cứu đã chỉ ra rằng cảm xúc khó chịu kéo dài làm giảm chức năng miễn dịch của con người, dễ dẫn đến các loại bệnh lý. Ngược lại, nếu tâm trạng thoải mái vui vẻ, chức năng miễn dịch được củng cố, con người có cuộc sống khỏe mạnh. Nếu vấn đề sức khỏe bạn không thấy rõ thì có thể nhìn ngay vào mối quan hệ chúng ta cũng sẽ không thể cảm thấy hạnh phúc, làm tốt công việc khi mà lúc nào cũng có nhiều cảm xúc khó chịu bủa vây đúng không? Vì vậy cuốn sách Đừng quên não để đời bớt bão do Thái Hà Books ấn hành trong tháng 8/2018 này, ngoài giới thiệu đến bạn những kỹ năng loại bỏ cảm xúc khó chịu và căng thẳng. Sẽ còn giới thiệu đến bạn các kỹ năng để có cảm xúc vui vẻ, thoải mái. Đặc biệt đó không phải là những điều xa vời mà đều là những việc bạn có thể thực hành ngay lập tức! Thêm nữa, trong sách còn có tranh minh họa phong phú để những kiến thức được truyền tải đến bạn một các dễ hiểu nhất.',220,'14.5 x 20.5 cm','Tái bản lần thứ hai',68000,1,'2017-03-05',20,'VT00017','2017-04-05','NV001','song-dung-quen-nao-cho-doi-bot-bao.jpg'),(25,'999 Lá Thư Gửi Cho Chính Mình – Mong Bạn Trở Thành Phiên Bản Hoàn Hảo Nhất','Sách kỹ năng sống','Miêu Công Tử','Nhà Xuất Bản Thanh Niên',2018,'Tiếng Việt','“999 lá thư gửi cho chính mình” là một tác phẩm đặc biệt đầy cảm hứng đến từ tác giả văn học mạng nổi tiếng Miêu Công Tử, mang một màu sắc riêng biệt qua những lời thư nhỏ nhắn nhủ đến người đọc về giá trị cuộc sống, tình yêu, tuổi trẻ, tương lai… v.v.. đã làm lay động trái tim của hàng vạn độc giả trẻ. Cầm trên tay cuốn sách “999 lá thư gửi cho chính mình” – bạn sẽ hiểu rằng: tuổi trẻ của chúng ta dù có mong manh đến đâu thì cũng sẽ thành công vượt qua mọi khó khăn một cách mạnh mẽ ngoài sức tưởng tượng. Một ngày nào đó, bạn sẽ cảm nhận được hạnh phúc, tự tin của chính bản thân và học được cách mỉm cười trước những nỗi đau của quá khứ. Bạn sẽ biết cách nói lời cảm ơn với những ai đã rời bỏ bạn, hiểu ra rằng họ không phải người thích hợp để cùng đồng hành với bạn trên đoạn đường chông gai đi tới tương lai. Đôi lúc bạn có thể yếu đuối mỏi mệt rơi nước mắt, thế nhưng khi bất chợt nhìn lại, bạn sẽ thấy thì ra mình đã rất mạnh mẽ, dũng cảm đi hết cả một quãng đường dài.',233,'12,5 x 18 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00018','2018-04-05','NV001','999-la-thu-gui-cho-chinh-minh-mong-ban-tro-thanh-phien-ban-hoan-hao-nhat.jpg'),(26,'Nghệ Thuật Tinh Tế Của Việc \"Đếch\" Quan Tâm','Sách kỹ năng sống','Mark Manson','Nhà Xuất Bản Văn Học',2018,'Tiếng Việt','\"Trong cuộc đời mình, tôi đã từng quan tâm về quá nhiều thứ. Đồng thời tôi cũng \"đếch\" quan tâm tới nhiều người, nhiều điều khác nữa. Và giống như con đường chưa từng được khai phá, chính những điều tôi chẳng thèm quan tâm ấy lại tạo nên sự khác biệt. Cuốn này sẽ không dạy bạn cách để đạt tới điều này hay điều nọ, mà là làm thế nào để vứt bớt và buông bỏ... Nó sẽ hướng dẫn bạn cách nhắm mắt lại và tin rằng bạn có thể ngã ngửa ra đằng sau mà vẫn ổn. Nó sẽ dạy bạn: ĐỪNG CỐ” ',296,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00019','2018-04-05','NV001','nghe-thuat-tinh-te-cua-viec-dech-quan-tam.jpg'),(27,'Tony Buổi Sáng - Trên Đường Băng','Sách kỹ năng sống','Tony Buổi Sáng','Nhà Xuất Bản Trẻ',2018,'Tiếng Việt','Trên đường băng là tập hợp những bài viết được ưa thích trên Facebook của Tony Buổi Sáng. Nhưng khác với một tập tản văn thông thường, nội dung các bài được chọn lọc có chủ đích, nhằm chuẩn bị về tinh thần, kiến thức…cho các bạn trẻ vào đời. Sách gồm 3 phần: “Chuẩn bị hành trang”, “Trong phòng chờ sân bay” và “Lên máy bay”, tương ứng với những quá trình một bạn trẻ phải trải qua trước khi “cất cánh” trên đường băng cuộc đời, bay vào bầu trời cao rộng.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00020','2018-04-05','NV001','tony-buoi-sang-tren-duong-bang.jpg'),(28,'Tôi, Tương Lai Và Thế Giới','Sách kỹ năng sống','Nguyễn Phi Vân','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Tôi, Tương lai & Thế giới ra đời đúng vào thời điểm cần thiết nhất đối với Việt Nam. Môi trường sống của chúng ta, kể cả ở Việt Nam đang thay đổi ở một tốc độ chưa từng có do Cách mạng công nghiệp 4.0 đem lại. Trong sự thay đổi ấy, luật tiến hóa của vạn vật sẽ là tấm lưới chọn lọc những ai tồn tại. Đó không phải người thông minh nhất, cũng không phải người mạnh nhất hay nhanh nhất mà là người có khả năng thích nghi cao nhất. Qua những trải nghiệm trong cuộc sống, tác giả Nguyễn Phi Vân giúp người đọc vượt thời gian và không gian để có một cảm nhận cho những thay đổi hằng ngày trong cuộc sống tương lai mà người đọc có thể không tưởng tượng được, và từ đó rút ra những kinh nghiệm sống và những bài học quý giá mà chúng ta cần phải chuẩn bị để không bị đào thải bởi luật tiến hóa.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00021','2018-04-05','NV001','toi-tuong-lai-va-the-gioi.png'),(29,'Giới Hạn Của Bạn Chỉ Là Xuất Phát Điểm Của Tôi','Sách kỹ năng sống','Mèo Maverick','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Giới hạn là gì? Giới hạn liệu có phải ranh giới an toàn của mỗi người? Có lẽ không, giới hạn là để phá bỏ. Bởi giới hạn của bạn chỉ là xuất phát điểm của người khác. Tôi tin rằng bạn có những ước mơ rất tuyệt vời, tôi cũng tin rằng bạn có thể thực hiện được nó. Nhưng ước mơ mà không hành động thì mãi mãi chỉ nằm trong mộng tưởng, hành trình dài mà không đi thì mãi mãi vẫn chẳng thể chạm đích. Giới hạn đặt ra để bứt phá, chứ không phải điểm tận cùng. Tôi hy vọng mỗi sáng đánh thức bạn dậy không phải là tiếng chuông đồng hồ mà là khát vọng lớn lao trong trái tim bạn. Mỗi khi bạn cảm thấy những khó khăn hiện tại đã chạm đến giới hạn của mình… Hãy đọc cuốn sách này, nó sẽ giúp bạn biến giới hạn trở thành vạch xuất phát.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00022','2018-04-05','NV002','gioi-han-cua-ban-chi-la-xuat-phat-diem-cua-toi.jpg'),(30,'Khi Bạn Đang Mơ Thì Người Khác Đang Nỗ Lực','Sách kỹ năng sống','Vĩ Nhân','Nhà Xuất Bản Văn Học',2018,'Tiếng Việt','Tại sao bạn không đủ xuất sắc? Có rất nhiều người hỏi tôi: “Tại sao em có thành tích tốt, cũng không lười, nhưng vẫn không đủ xuất sắc?”. Tôi chỉ có một câu trả lời cho vấn đề này: Bạn vẫn chưa thực sự thay đổi bản thân nhưng lại ép mình phải thành công, vì thế bạn mãi mãi không biết mình có thể xuất sắc thế nào. Một huấn luyện viên dạy bơi cho trẻ em từng nói với tôi: “Ngài có biết làm thế nào để một đứa trẻ không biết bơi lại nhanh chóng học bơi được không? Rất đơn giản, chỉ cần  thả trẻ xuống nước, để trẻ giãy giụa, làm quen với cảm giác ở dưới nước”. Tôi hỏi cậu ấy, làm như thế có nguy hiểm quá không? Huấn luyện viên nói rằng không cần quá lo lắng, chỉ cần kịp thời giúp sức, cứ luyện tập từ từ, bất kể ai cũng đều có thể biết bơi. Bởi vì trong tình huống nguy hiểm, tiềm năng của con người mới được bộc lộ rõ, học tập hay làm việc đều vừa nhanh vừa hiệu quả. Những lời của huấn luyện viên đó khiến tôi suy nghĩ, phần lớn chúng ta đều sống quá an phận. Chúng ta có mục tiêu nhưng thiếu lòng quyết tâm như những khi gặp tình huống nguy cấp, vì thế phần lớn cuộc sống của mọi người đều không có gì đặc biệt, con người khát vọng thành công nhưng lại không đủ kiên trì với bản thân. Đây chính là sự khác biệt giữa người thành công và người bình thường.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00023','2018-04-05','NV002','khi-ban-dang-mo-thi-nguoi-khac-dang-no-luc.jpg'),(31,'999 Lá Thư Gửi Cho Chính Mình - Mong Bạn Trở Thành Phiên Bản Hạnh Phúc Nhất (Phần 2)','Sách kỹ năng sống','Miêu Công Tử','Nhà Xuất Bản Thanh Niên',2018,'Tiếng Việt','“999 lá thư gửi cho chính mình” là một tác phẩm đặc biệt đầy cảm hứng đến từ tác giả văn học mạng nổi tiếng Miêu Công Tử, mang một màu sắc riêng biệt qua những lời thư nhỏ nhắn nhủ đến người đọc về giá trị cuộc sống, tình yêu, tuổi trẻ, tương lai. Tiếp nối phần 1 giúp bạn trở nên hoàn hảo, cuốn sách phần 2: “999 lá thư gửi cho chính mình” – Mong bạn trở thành phiên bản hạnh phúc nhất, giúp bạn mỗi ngày như một hoa hướng dương hướng về phía mặt trời, hấp thụ trọn vẹn năng lượng tích cực, vui vẻ mỉm cười, mọi đau buồn sẽ bốc hơi tan biến.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00024','2018-04-05','NV002','999-la-thu-gui-cho-chinh-minh-mong-ban-tro-thanh-phien-ban-hanh-phuc-nhat-phan-2.jpg'),(32,'Lối Sống Tối Giản Của Người Nhật','Sách kỹ năng sống','Sasaki Fumio','Nhà Xuất Bản Lao Động',2018,'Tiếng Việt','Chẳng có ai từ khi sinh ra đã có tài sản, đồ đạc gì trong tay. Vậy nên bất cứ ai khi mới chào đời đều là những người sống tối giản. Cứ mỗi lần bạn sở hữu trong tay những đồ dùng hơn mức cần thiết là một lần bạn lấy mất tự do của chính mình. Giá trị bản thân chúng ta không đo bằng những đồ dùng mà chúng ta sở hữu. Những đồ dùng này chỉ cho chúng ta một chút cảm giác hạnh phúc nhất thời mà thôi. Mang theo những đồ dùng hơn mức cần thiết sẽ lấy hết thời gian, năng lượng của bạn. Khi nhận ra được điều đó, tức là bạn đã bắt đầu trở thành một người sống tối giản.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00025','2018-04-05','NV002','loi-song-toi-gian-cua-nguoi-nhat.jpg'),(33,'Tâm Buông Bỏ, Đời Bình An','Sách kỹ năng sống','Natori Hougen','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Trong cuộc sống hiện tại, nhiều người thường chia sẻ: “Khi tôi đạt được một điều gì đó quan trọng, khi ước mơ của bản thân trở thành hiện thực, ngay sau khoảnh khắc hạnh phúc ngắn ngủi, tôi đều cảm thấy trống rỗng, mông lung với cuộc đời”. Tại sao lại nghịch lí như vậy? Đa số mọi người rơi vào trạng thái ấy vì họ chưa cảm thấy đủ, họ vẫn quen phóng đại hạnh phúc của người khác, làm quá nỗi khổ đau của bản thân, và không ngừng mang chính mình ra so sánh với những người xung quanh. Tất cả đều xuất phát từ sự ôm đồm cá nhân, hay nói cách khác là thái độ không bằng lòng với bản thân, cái gì cũng muốn được, muốn hơn mà không chịu “buông”.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00026','2018-04-05','NV003','tam-buong-bo-doi-binh-an.jpg'),(34,'Hành Trình Về Phương Đông','Sách Kiến Thức Tổng Hợp','Baird T. Spalding','Nhà Xuất Bản Hồng Đức',2018,'Tiếng Việt','Hành Trình Về Phương Đông kể về những trải nghiệm của một đoàn khoa học gồm các chuyên gia hàng đầu của Hội Khoa Học Hoàng Gia Anh được cử sang Ấn Độ nghiên cứu về huyền học và những khả năng siêu nhiên của con người. Suốt hai năm trời rong ruổi khắp các đền chùa Ấn Độ, chúng kiến nhiều pháp luật, nhiều cảnh mê tín dị đoan, thậm chí lừa đảo...của nhiều pháp sư, đạo sĩ...họ được tiếp xúc với những vị thế, họ được chứng kiến, trải nghiệm, hiểu biết sâu sắc về các khoa học cổ xưa và bí truyền của văn hóa Ấn Độ như Yoga, thiền định, thuật chiêm duyên, nghiệp báo, luật nhân quả, cõi sống và cõi chết....',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00027','2018-04-05','NV003','hanh-trinh-ve-phuong-dong.jpg'),(35,'Cuốn Sách Hoàn Hảo Về Ngôn Ngữ Cơ Thể','Sách Kiến Thức Tổng Hợp','Allan & Barbara Pease','Nhà Xuất Bản Tổng hợp TP.HCM',2018,'Tiếng Việt','Nếu bạn biết rèn cho mình khả năng quan sát hoạt động giao tiếp của con người, thậm chí chỉ trong cách bắt tay như thế nào cho hiệu quả, bạn sẽ thấy thành công trong giao tiếp tự nhiên đến với mình. Khi một người có thể sử dụng tốt ngôn ngữ cơ thể họ, điều đó chứng tỏ rằng họ hiểu rõ bản thân, biết cách hiểu người khác và họ tự tin. Vì thế, phần lớn các nhân vật danh tiếng đều là những \"bậc thày\" về sử dụng ngôn ngữ cơ thể. Ngoài ra, cuốn sách còn cung cấp cho người đọc nhiều kiến thức thú vị về sự khác biệt trong giao tiếp giữa con người với con người đến từ các quốc gia khác nhau.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00028','2018-04-05','NV003','cuon-sach-hoan-hao-ve-ngon-ngu-co-the.jpg'),(36,'Vũ Trụ Trong Vỏ Hạt Dẻ','Sách Kiến Thức Tổng Hợp','Stephen Hawking','Nhà Xuất Bản Trẻ',2018,'Tiếng Việt','Lòng khát khao khám phá luôn là động lực cho trí sáng tạo của con người trong mọi lĩnh vực không chỉ trong khoa học. Điều đó được kiểm chứng trong quyển Vũ trụ trong vỏ hạt dẻ.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00029','2018-04-05','NV003','vu-tru-trong-vo-hat-de.jpg'),(37,'Thế Giới Phẳng','Sách Kiến Thức Tổng Hợp','Thomas L. Friedman','Nhà Xuất Bản Trẻ',2018,'Tiếng Việt','Trong xu thế toàn cầu hóa, việc tiếp cận và tham khảo những tri thức đương đại từ những nước đã phát triển về sự chuyển động của thế giới (đang ở bước ngoặt từ “tròn” sang “phẳng”, như cách nói của tác giả) có lẽ sẽ giúp chúng ta có thêm những thông tin bổ ích để có sự chủ động trong quá trình hội nhập. Tác phẩm được xếp vào danh mục sách bán chạy nhất ở Mỹ (kể từ lần xuất bản đầu tiên tháng 4/ 2005 cho đến nay). Đây là bản dịch từ bản sách gốc mới nhất được sửa chữa, cập nhật và bổ sung hai chương mới nhất bởi chính tác giả.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00029','2018-04-05','NV003','the-gioi-phang.jpg'),(38,'Cuộc Sống Rất Giống Cuộc Đời','Sách Kiến Thức Tổng Hợp','Hoàng Hải Nguyễn','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Nếu bạn đang cảm thấy bế tắc trong cuộc sống, cần một ai đó xốc lại tinh thần để tiếp tục chiến đấu với cuộc đời thì chắc chắn không nên bỏ lỡ cuốn sách này. Cuộc sống rất giống cuộc đời sẽ đem lại cho bạn những tiếng cười sảng khoái và những phút giây thư giãn qua từng trang sách.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00030','2018-04-05','NV003','cuoc-song-rat-giong-cuoc-doi.jpg'),(39,'Ý Tưởng Này Là Của Chúng Mình','Sách Kiến Thức Tổng Hợp','Huỳnh Vĩnh Sơn','Nhà Xuất Bản Trẻ',2018,'Tiếng Việt','Quyển sách nhỏ này sẽ cung cấp cho bạn nhiều thông tin hơn về thế giới của một Công Ty Quảng Cáo Sáng Tạo (Creative Agency) và những buồn nhiều, vui chẳng thiếu của một Copywriter, nghề “thời thượng” trong mắt bạn trẻ. Tôi muốn nói lên tâm sự chung của những người trong ngành Creative. Không gì bằng niềm vui sáng tạo, vui vầy với ý tưởng mà còn được trả tiền! Đôi khi cũng có chút lăn tăn, vài bi kịch tối tạo khiến ta ngập ngừng chân bước. Không sao, dân sáng tạo chỉ thiếu tình, thiếu tiền, ý tưởng không bao giờ thiếu!',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00031','2018-04-05','NV004','y-tuong-nay-la-cua-chung-minh.jpg'),(40,'Đối Thoại Với Thượng Đế','Sách Kiến Thức Tổng Hợp','Neale Donald Walsch','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Cuốn sách này đề cập hầu hết, nếu không phải tất cả, các câu hỏi mà chúng ta vẫn luôn đặt ra về cuộc sống và tình yêu, mục đích và chức năng, con người và các mối quan hệ, thiện và ác, mặc cảm và tội lỗi, tha thứ và cứu độ, đường đưa đến Thượng đế cũng như lối vào hoả ngục… tất tần tật mọi thứ. Nó cũng bàn đến các đề tài tính dục, quyền lực, tiền bạc, chuyện con cái, hôn nhân, ly dị, về sự nghiệp, sức khoẻ, về đời sau, đời trước… về mọi thứ. Nó phân tích chiến tranh và hoà bình, biết và không biết, cho và nhận, vui và buồn. Nó xem xét cái cụ thể và trừu tượng, hữu hình và vô hình, chân lý và phi chân lý.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00032','2018-04-05','NV004','doi-thoai-voi-thuong-de.jpg'),(41,'Người Đan Chữ Xếp Thuyền','Sách Kiến Thức Tổng Hợp','Miura Shion','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Nếu ví von cuộc đời mỗi nhân vật trong Người đan chữ xếp thuyền như một đoá hoa anh đào, thì ngày mà đoá hoa ấy vào độ mãn khai rực rỡ nhất, chính là ngày cuốn từ điển Đại hải trình - “đứa con chung” được chắt chiu từ bao năm tháng của họ được ra mắt. Khoảnh khắc ấy có thể ngắn ngủi - như chính độ khai nở rực rỡ nhất của một bông hoa anh đào, nhưng điều ấy nào đâu phải thứ gì bi kịch. Ngắm nhìn những cánh hoa rơi - mà như trôi lững lờ trong không gian không phải là một khung cảnh tuyệt diệu hay sao? Vẻ đẹp ấy tuy ngắn ngủi nhưng chói sáng, và luôn khiến người ta khao khát mong chờ.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00033','2018-04-05','NV004','nguoi-dan-chu-xep-thuyen.jpg'),(42,'Vạn Vật Vận Hành Như Thế Nào?','Sách Kiến Thức Tổng Hợp','David Macaulay','Nhà Xuất Bản Dân Trí',2018,'Tiếng Việt','Vạn vật vận hành như thế nào? mô tả phần lớn các phát minh của thế giới hiện đại, giúp ta có cái nhìn sâu hơn về cơ chế hoạt động của các vật dụng tưởng chừng rất tầm thường. Được lồng ghép với một nhân vật thô kệch mà dễ thương (voi ma-mút lông), dưới lời dẫn truyện của một nhà phát minh ngờ nghệch nhưng đầy tham vọng thời tiền sử, cuốn sách này hứa hẹn là tác phẩm gần gũi với mọi lứa tuổi độc giả đam mê tìm tòi và có óc phiêu lưu hài hước.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00034','2018-04-05','NV004','van-vat-van-hanh-nhu-the-nao.jpg'),(43,'Hạnh Phúc Là...','Sách Kiến Thức Tổng Hợp','Ralph Lazar','Nhà Xuất Bản Thế Giới',2018,'Tiếng Việt','Trong trường hợp bạn cần một lời nhắc nhở, thì hãy nhớ mang Hạnh phúc là… bên mình mọi lúc mọi nơi, và mở một trang bất kì mỗi khi nỗi buồn ập đến. Cũng không nhất thiết khi buồn mới cần đọc Hạnh phúc là…, bởi bên cạnh việc vực dậy những tâm hồn đang ủ ê, cuốn sách này còn có sức mạnh nhân lên nhiều lần những niềm vui nho nhỏ.',300,'13.5 x 20.5 cm','Tái bản lần thứ hai',90000,1,'2018-03-05',20,'VT00035','2018-04-05','NV004','hanh-phuc-la.jpg');
/*!40000 ALTER TABLE `tailieu` ENABLE KEYS */;
UNLOCK TABLES;

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
  `TinhTrang` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieuchitiet`
--

LOCK TABLES `tailieuchitiet` WRITE;
/*!40000 ALTER TABLE `tailieuchitiet` DISABLE KEYS */;
INSERT INTO `tailieuchitiet` VALUES (1,'TLCT00001',2,'2019-03-20','NV001','mượn'),(2,'TLCT00002',1,'2019-03-20','NV002','chưa mượn'),(3,'TLCT00003',3,'2019-05-05','NV003','chưa mượn'),(4,'TLCT00004',4,'2019-04-05','NV005','mượn'),(5,'TLCT00005',5,'2019-04-02','NV004','mượn');
/*!40000 ALTER TABLE `tailieuchitiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vitritailieu`
--

DROP TABLE IF EXISTS `vitritailieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vitritailieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaVT` varchar(45) NOT NULL,
  `TenVT` varchar(45) NOT NULL,
  `MoTa` varchar(45) DEFAULT NULL,
  `VTKeSach` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vitritailieu`
--

LOCK TABLES `vitritailieu` WRITE;
/*!40000 ALTER TABLE `vitritailieu` DISABLE KEYS */;
INSERT INTO `vitritailieu` VALUES (1,'VT00001','Hàng 1 - cột 1',NULL,'Kệ 1'),(2,'VT00002','Hàng 2 - cột 9',NULL,'Kệ 3'),(3,'VT00003','Hàng 3 - cột 9',NULL,'Kệ 2'),(4,'VT00004','Hàng 5 - cột 10',NULL,'Kệ 4'),(5,'VT00005','Hàng 4 - cột 3',NULL,'Kệ 5');
/*!40000 ALTER TABLE `vitritailieu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-12 23:27:24
