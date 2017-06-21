/*
Navicat MySQL Data Transfer

Source Server         : mim
Source Server Version : 50617
Source Host           : 127.0.0.1:3306
Source Database       : quanlydaugia

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-06-21 14:30:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chitietdaugia
-- ----------------------------
DROP TABLE IF EXISTS `chitietdaugia`;
CREATE TABLE `chitietdaugia` (
  `idCHITIETDAUGIA` int(11) NOT NULL AUTO_INCREMENT,
  `idsanphamdaugia` int(11) NOT NULL,
  `idnguoidaugia` int(11) NOT NULL,
  `sotien` float DEFAULT NULL,
  `thoigiandaugia` datetime DEFAULT NULL,
  PRIMARY KEY (`idCHITIETDAUGIA`,`idsanphamdaugia`),
  KEY `fk_CHITIETDAUGIA_USER1_idx` (`idnguoidaugia`) USING BTREE,
  KEY `fk_CHITIETDAUGIA_SANPHAM1_idx` (`idsanphamdaugia`) USING BTREE,
  CONSTRAINT `fk_CHITIETDAUGIA_SANPHAM1` FOREIGN KEY (`idsanphamdaugia`) REFERENCES `sanpham` (`idSANPHAM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_CHITIETDAUGIA_USER1` FOREIGN KEY (`idnguoidaugia`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chitietdaugia
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `idnguoicomment` int(11) NOT NULL,
  `noidungcomment` varchar(300) DEFAULT NULL,
  `idnguoiduocomment` int(11) NOT NULL,
  `diemdanhgia` int(11) DEFAULT NULL,
  KEY `fk_COMMENT_USER1_idx` (`idnguoicomment`) USING BTREE,
  KEY `fk_COMMENT_USER2` (`idnguoiduocomment`),
  CONSTRAINT `fk_COMMENT_USER1` FOREIGN KEY (`idnguoicomment`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_COMMENT_USER2` FOREIGN KEY (`idnguoiduocomment`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for loaisanpham1
-- ----------------------------
DROP TABLE IF EXISTS `loaisanpham1`;
CREATE TABLE `loaisanpham1` (
  `idLOAISANPHAM1` int(11) NOT NULL,
  `tensanpham` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idLOAISANPHAM1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loaisanpham1
-- ----------------------------
INSERT INTO `loaisanpham1` VALUES ('1', 'Đồ điện tử và điện máy');
INSERT INTO `loaisanpham1` VALUES ('2', 'Thời trang');
INSERT INTO `loaisanpham1` VALUES ('3', 'Đồ hồ và đồ trang sức');
INSERT INTO `loaisanpham1` VALUES ('4', 'Sức khỏe và làm đẹp');
INSERT INTO `loaisanpham1` VALUES ('5', 'Nhà c ủa và đời sống');
INSERT INTO `loaisanpham1` VALUES ('6', 'Thể thao');
INSERT INTO `loaisanpham1` VALUES ('7', 'Giải trí và sở thích');
INSERT INTO `loaisanpham1` VALUES ('8', 'Đồ cổ và đồ sửu tập');
INSERT INTO `loaisanpham1` VALUES ('9', 'Ô tô xe máy xe đạp');
INSERT INTO `loaisanpham1` VALUES ('10', 'Hàng tiêu dùng');

-- ----------------------------
-- Table structure for loaisanpham2
-- ----------------------------
DROP TABLE IF EXISTS `loaisanpham2`;
CREATE TABLE `loaisanpham2` (
  `idLOAISANPHAM2` int(11) NOT NULL,
  `tensanpham` varchar(50) DEFAULT NULL,
  `LOAISANPHAM1_idLOAISANPHAM1` int(11) NOT NULL,
  PRIMARY KEY (`idLOAISANPHAM2`,`LOAISANPHAM1_idLOAISANPHAM1`),
  KEY `fk_LOAISANPHAM2_LOAISANPHAM11_idx` (`LOAISANPHAM1_idLOAISANPHAM1`),
  KEY `idLOAISANPHAM2` (`idLOAISANPHAM2`),
  CONSTRAINT `fk_LOAISANPHAM2_LOAISANPHAM11` FOREIGN KEY (`LOAISANPHAM1_idLOAISANPHAM1`) REFERENCES `loaisanpham1` (`idLOAISANPHAM1`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loaisanpham2
-- ----------------------------
INSERT INTO `loaisanpham2` VALUES ('1', 'Điện thoại và phụ kiện', '1');
INSERT INTO `loaisanpham2` VALUES ('2', 'Máy quay phim và chụp ảnh', '1');
INSERT INTO `loaisanpham2` VALUES ('3', 'Máy tính và tablet', '1');
INSERT INTO `loaisanpham2` VALUES ('4', 'Thiết bị nghe nhìn', '1');
INSERT INTO `loaisanpham2` VALUES ('5', 'Máy văn phòng', '1');
INSERT INTO `loaisanpham2` VALUES ('6', 'Điện máy gia đình', '1');
INSERT INTO `loaisanpham2` VALUES ('7', 'Thời trang nam', '2');
INSERT INTO `loaisanpham2` VALUES ('8', 'Thời trang nữ', '2');
INSERT INTO `loaisanpham2` VALUES ('9', 'Trang sức', '3');
INSERT INTO `loaisanpham2` VALUES ('10', 'Đồng hồ nam', '3');
INSERT INTO `loaisanpham2` VALUES ('11', 'Đồng hồ nữ', '3');
INSERT INTO `loaisanpham2` VALUES ('12', 'Nước hoa', '4');
INSERT INTO `loaisanpham2` VALUES ('13', 'Mỹ phẩm Makeup', '4');
INSERT INTO `loaisanpham2` VALUES ('14', 'Mỹ phẩm chăm sóc cơ thể', '4');
INSERT INTO `loaisanpham2` VALUES ('15', 'Dụng cụ làm đẹp', '4');
INSERT INTO `loaisanpham2` VALUES ('16', 'Thực phẩm chức năng', '4');
INSERT INTO `loaisanpham2` VALUES ('17', 'Nội thất', '5');
INSERT INTO `loaisanpham2` VALUES ('18', 'Trang trí', '5');
INSERT INTO `loaisanpham2` VALUES ('19', 'Đồ thờ và phong thủy', '5');
INSERT INTO `loaisanpham2` VALUES ('20', 'Bóng đá', '6');
INSERT INTO `loaisanpham2` VALUES ('21', 'Tenis', '6');
INSERT INTO `loaisanpham2` VALUES ('22', 'Bơi lội', '6');
INSERT INTO `loaisanpham2` VALUES ('23', 'Máy tập thể thao', '6');
INSERT INTO `loaisanpham2` VALUES ('24', 'Đồ chơi và sở thích', '7');
INSERT INTO `loaisanpham2` VALUES ('25', 'Búp bê và gấu bông', '7');
INSERT INTO `loaisanpham2` VALUES ('26', 'Trò chơi video', '7');
INSERT INTO `loaisanpham2` VALUES ('27', 'Đồ cổ ', '8');
INSERT INTO `loaisanpham2` VALUES ('28', 'Đồ sưu tập', '8');
INSERT INTO `loaisanpham2` VALUES ('29', 'Tiền xu và tiền giấy', '8');
INSERT INTO `loaisanpham2` VALUES ('30', 'Xe máy', '9');
INSERT INTO `loaisanpham2` VALUES ('31', 'Xe hơi', '9');
INSERT INTO `loaisanpham2` VALUES ('32', 'Xe đạp', '9');
INSERT INTO `loaisanpham2` VALUES ('33', 'Phụ tùng', '9');
INSERT INTO `loaisanpham2` VALUES ('34', 'Phụ kiện và trang trí', '9');
INSERT INTO `loaisanpham2` VALUES ('35', 'Chăm sóc cá nhân', '10');
INSERT INTO `loaisanpham2` VALUES ('36', 'Dụng  cụ gia đình', '10');
INSERT INTO `loaisanpham2` VALUES ('37', 'Dầu gội và sữa tăm', '10');
INSERT INTO `loaisanpham2` VALUES ('38', 'Hóa phẩm', '10');
INSERT INTO `loaisanpham2` VALUES ('39', 'Văn phòng phẩm', '10');

-- ----------------------------
-- Table structure for loaisanpham3
-- ----------------------------
DROP TABLE IF EXISTS `loaisanpham3`;
CREATE TABLE `loaisanpham3` (
  `idLOAISP3` int(11) NOT NULL AUTO_INCREMENT,
  `tensanpham` varchar(50) DEFAULT NULL,
  `LOAISANPHAM2_idLOAISANPHAM2` int(11) NOT NULL,
  PRIMARY KEY (`idLOAISP3`,`LOAISANPHAM2_idLOAISANPHAM2`),
  KEY `fk_LOAISANPHAM3_LOAISANPHAM21_idx` (`LOAISANPHAM2_idLOAISANPHAM2`),
  KEY `idLOAISP3` (`idLOAISP3`),
  CONSTRAINT `fk_LOAISANPHAM3_LOAISANPHAM21` FOREIGN KEY (`LOAISANPHAM2_idLOAISANPHAM2`) REFERENCES `loaisanpham2` (`idLOAISANPHAM2`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=230029 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loaisanpham3
-- ----------------------------
INSERT INTO `loaisanpham3` VALUES ('1', 'Điện thoại', '1');
INSERT INTO `loaisanpham3` VALUES ('2', 'Pin và sạc', '1');
INSERT INTO `loaisanpham3` VALUES ('3', 'Phụ kiện', '1');
INSERT INTO `loaisanpham3` VALUES ('4', 'Máy chụp hình', '2');
INSERT INTO `loaisanpham3` VALUES ('5', 'Máy quay phim', '2');
INSERT INTO `loaisanpham3` VALUES ('6', 'Ống kính', '2');
INSERT INTO `loaisanpham3` VALUES ('7', 'Thẻ nhớ', '2');
INSERT INTO `loaisanpham3` VALUES ('8', 'Phụ kiện khác', '2');
INSERT INTO `loaisanpham3` VALUES ('9', 'Laptop & Netbook', '3');
INSERT INTO `loaisanpham3` VALUES ('10', 'Desktop-Máy tính để bàn', '3');
INSERT INTO `loaisanpham3` VALUES ('11', 'Thiết bị mạng', '3');
INSERT INTO `loaisanpham3` VALUES ('12', 'Linh kiện máy tính', '3');
INSERT INTO `loaisanpham3` VALUES ('13', 'Ổ cứng di động', '3');
INSERT INTO `loaisanpham3` VALUES ('14', 'Dàn âm thanh-Karaoke', '4');
INSERT INTO `loaisanpham3` VALUES ('15', 'Tivi', '4');
INSERT INTO `loaisanpham3` VALUES ('16', 'Âm ly', '4');
INSERT INTO `loaisanpham3` VALUES ('17', 'Loa âm thanh', '4');
INSERT INTO `loaisanpham3` VALUES ('18', 'Tai phone', '4');
INSERT INTO `loaisanpham3` VALUES ('19', 'Máy chiếu-Màn chiếu', '5');
INSERT INTO `loaisanpham3` VALUES ('20', 'Máy in-Photocopy-Scan', '5');
INSERT INTO `loaisanpham3` VALUES ('21', 'Máy Fax', '5');
INSERT INTO `loaisanpham3` VALUES ('22', 'Lò vi sóng-Lò nướng', '6');
INSERT INTO `loaisanpham3` VALUES ('23', 'Bàn ủi', '6');
INSERT INTO `loaisanpham3` VALUES ('24', 'Quạt điện', '6');
INSERT INTO `loaisanpham3` VALUES ('25', 'Máy lọc nước', '6');
INSERT INTO `loaisanpham3` VALUES ('26', 'Thiết bị gia nhiệt', '6');
INSERT INTO `loaisanpham3` VALUES ('27', 'Quần Jean-Kaki', '7');
INSERT INTO `loaisanpham3` VALUES ('28', 'Quần Short', '7');
INSERT INTO `loaisanpham3` VALUES ('29', 'Quần Tây', '7');
INSERT INTO `loaisanpham3` VALUES ('30', 'Áo thun', '7');
INSERT INTO `loaisanpham3` VALUES ('31', 'Áo sơ mi', '7');
INSERT INTO `loaisanpham3` VALUES ('32', 'Áo len-Áo khoác', '7');
INSERT INTO `loaisanpham3` VALUES ('33', 'Quần Jean-Kaki', '8');
INSERT INTO `loaisanpham3` VALUES ('34', 'Quần Short', '8');
INSERT INTO `loaisanpham3` VALUES ('35', 'Quần Tây', '8');
INSERT INTO `loaisanpham3` VALUES ('36', 'Áo thun', '8');
INSERT INTO `loaisanpham3` VALUES ('37', 'Áo sơ mi', '8');
INSERT INTO `loaisanpham3` VALUES ('38', 'Áo voan-Áo kiểu', '8');
INSERT INTO `loaisanpham3` VALUES ('39', 'Trang sức cổ', '9');
INSERT INTO `loaisanpham3` VALUES ('40', 'Trang sức hôn lễ', '9');
INSERT INTO `loaisanpham3` VALUES ('41', 'Trang sức cho trẻ', '9');
INSERT INTO `loaisanpham3` VALUES ('42', 'Trang sức thủ công', '9');
INSERT INTO `loaisanpham3` VALUES ('43', 'Nước hoa nam', '12');
INSERT INTO `loaisanpham3` VALUES ('44', 'Nước hoa nữ', '12');
INSERT INTO `loaisanpham3` VALUES ('45', 'Dành cho da', '13');
INSERT INTO `loaisanpham3` VALUES ('46', 'Danh cho mặt', '13');
INSERT INTO `loaisanpham3` VALUES ('47', 'Dành cho tóc', '13');
INSERT INTO `loaisanpham3` VALUES ('48', 'Dành cho da', '14');
INSERT INTO `loaisanpham3` VALUES ('49', 'Dành cho mặt', '14');
INSERT INTO `loaisanpham3` VALUES ('50', 'Dành cho tóc', '14');
INSERT INTO `loaisanpham3` VALUES ('51', 'Dụng cụ làm tóc', '15');
INSERT INTO `loaisanpham3` VALUES ('52', 'Dụng cụ chăm sóc da', '15');
INSERT INTO `loaisanpham3` VALUES ('53', 'Dụng cụ trang điểm', '15');
INSERT INTO `loaisanpham3` VALUES ('54', 'Bệnh xương khớp', '16');
INSERT INTO `loaisanpham3` VALUES ('55', 'Giảm cân', '16');
INSERT INTO `loaisanpham3` VALUES ('56', 'Bổ sung dinh dưỡng', '16');
INSERT INTO `loaisanpham3` VALUES ('57', 'Bộ Sofa', '17');
INSERT INTO `loaisanpham3` VALUES ('58', 'Giường', '17');
INSERT INTO `loaisanpham3` VALUES ('59', 'Bàn', '17');
INSERT INTO `loaisanpham3` VALUES ('60', 'Ghế', '17');
INSERT INTO `loaisanpham3` VALUES ('61', 'Tủ', '17');
INSERT INTO `loaisanpham3` VALUES ('62', 'Giày', '20');
INSERT INTO `loaisanpham3` VALUES ('63', 'Quần áo', '20');
INSERT INTO `loaisanpham3` VALUES ('64', 'Quả bóng', '20');
INSERT INTO `loaisanpham3` VALUES ('65', 'Vợt', '21');
INSERT INTO `loaisanpham3` VALUES ('66', 'Giày', '21');
INSERT INTO `loaisanpham3` VALUES ('67', 'Thời trang tennis', '21');
INSERT INTO `loaisanpham3` VALUES ('68', 'Đồ bơi nam', '22');
INSERT INTO `loaisanpham3` VALUES ('69', 'Đồ bơi nữ', '22');
INSERT INTO `loaisanpham3` VALUES ('70', 'Kính bơi', '22');
INSERT INTO `loaisanpham3` VALUES ('71', 'Máy tập chạy bộ', '23');
INSERT INTO `loaisanpham3` VALUES ('72', 'Máy tập đạp xe', '23');
INSERT INTO `loaisanpham3` VALUES ('73', 'Máy tập đa năng', '23');
INSERT INTO `loaisanpham3` VALUES ('74', 'Máy tập giảm eo', '23');
INSERT INTO `loaisanpham3` VALUES ('75', 'Xe mô hình', '24');
INSERT INTO `loaisanpham3` VALUES ('76', 'Đồ chơi giáo dục', '24');
INSERT INTO `loaisanpham3` VALUES ('77', 'Đồ chơi xây dựng', '24');
INSERT INTO `loaisanpham3` VALUES ('78', 'Búp bê', '25');
INSERT INTO `loaisanpham3` VALUES ('79', 'Gấu bông', '25');
INSERT INTO `loaisanpham3` VALUES ('80', 'Búp bê giấy', '25');
INSERT INTO `loaisanpham3` VALUES ('81', 'Trò chơi', '26');
INSERT INTO `loaisanpham3` VALUES ('82', 'Thẻ chơi game', '26');
INSERT INTO `loaisanpham3` VALUES ('83', 'Bộ phụ kiện', '26');
INSERT INTO `loaisanpham3` VALUES ('84', 'Sách bán thảo cổ', '27');
INSERT INTO `loaisanpham3` VALUES ('85', 'Nhạc cụ cổ', '27');
INSERT INTO `loaisanpham3` VALUES ('86', 'Tivi', '28');
INSERT INTO `loaisanpham3` VALUES ('87', 'Đồng hồ', '28');
INSERT INTO `loaisanpham3` VALUES ('88', 'Máy quay đĩa', '28');
INSERT INTO `loaisanpham3` VALUES ('89', 'Tiền xu cổ', '29');
INSERT INTO `loaisanpham3` VALUES ('90', 'Tiền giấy thế giới', '29');
INSERT INTO `loaisanpham3` VALUES ('91', 'Xe máy', '30');
INSERT INTO `loaisanpham3` VALUES ('92', 'Xe máy điện', '30');
INSERT INTO `loaisanpham3` VALUES ('93', 'Xe máy phân khối lớn', '30');
INSERT INTO `loaisanpham3` VALUES ('94', 'Phụ tùng xe máy', '30');
INSERT INTO `loaisanpham3` VALUES ('95', 'Xe tải', '31');
INSERT INTO `loaisanpham3` VALUES ('96', 'Xe hơi', '31');
INSERT INTO `loaisanpham3` VALUES ('97', 'Xe khách', '31');
INSERT INTO `loaisanpham3` VALUES ('98', 'Xe cũ', '31');
INSERT INTO `loaisanpham3` VALUES ('99', 'Xe đạp', '32');
INSERT INTO `loaisanpham3` VALUES ('100', 'Xe đạp cũ', '32');
INSERT INTO `loaisanpham3` VALUES ('101', 'Xe đạp điện', '32');
INSERT INTO `loaisanpham3` VALUES ('102', 'Xe đạp trẻ em', '32');
INSERT INTO `loaisanpham3` VALUES ('103', 'Lốp xe', '33');
INSERT INTO `loaisanpham3` VALUES ('104', 'Dầu nhớt', '33');
INSERT INTO `loaisanpham3` VALUES ('105', 'Xe đạp', '34');
INSERT INTO `loaisanpham3` VALUES ('106', 'Xe máy', '34');
INSERT INTO `loaisanpham3` VALUES ('107', 'Xe hơi', '34');
INSERT INTO `loaisanpham3` VALUES ('108', 'Vệ sinh nam', '35');
INSERT INTO `loaisanpham3` VALUES ('109', 'Vệ sinh nữ', '35');
INSERT INTO `loaisanpham3` VALUES ('110', 'Chăm sóc răng miệng', '35');
INSERT INTO `loaisanpham3` VALUES ('111', 'Dụng cụ vệ sinh', '36');
INSERT INTO `loaisanpham3` VALUES ('112', 'Dụng cụ nhà bếp', '36');
INSERT INTO `loaisanpham3` VALUES ('113', 'Dụng cụ ăn uống', '36');
INSERT INTO `loaisanpham3` VALUES ('114', 'Dầu gội', '37');
INSERT INTO `loaisanpham3` VALUES ('115', 'Sữa tắm', '37');
INSERT INTO `loaisanpham3` VALUES ('116', 'Nước tẩy rủa-lau sàn', '38');
INSERT INTO `loaisanpham3` VALUES ('117', 'Diệt côn trùng', '38');
INSERT INTO `loaisanpham3` VALUES ('118', 'Nước hoa xịt phòng', '38');
INSERT INTO `loaisanpham3` VALUES ('119', 'Bút ky-Viết', '39');
INSERT INTO `loaisanpham3` VALUES ('120', 'Giấy vở', '39');
INSERT INTO `loaisanpham3` VALUES ('121', 'Dụng cụ bấm', '39');
INSERT INTO `loaisanpham3` VALUES ('122', 'Dụng cụ cắt gọt', '39');

-- ----------------------------
-- Table structure for nguoichan
-- ----------------------------
DROP TABLE IF EXISTS `nguoichan`;
CREATE TABLE `nguoichan` (
  `idNguoichan` int(11) DEFAULT NULL,
  `idSanpham` int(11) DEFAULT NULL,
  KEY `fk_CHANNGUOI_USER` (`idNguoichan`),
  KEY `fk_CHANNGUOI_SANPHAM` (`idSanpham`),
  CONSTRAINT `fk_CHANNGUOI_SANPHAM` FOREIGN KEY (`idSanpham`) REFERENCES `sanpham` (`idSANPHAM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_CHANNGUOI_USER` FOREIGN KEY (`idNguoichan`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nguoichan
-- ----------------------------

-- ----------------------------
-- Table structure for sanpham
-- ----------------------------
DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE `sanpham` (
  `idSANPHAM` int(11) NOT NULL AUTO_INCREMENT,
  `LOAISANPHAM3_idLOAISP3` int(11) NOT NULL,
  `tensanpham` varchar(50) DEFAULT NULL,
  `motasanphamngangon` varchar(100) DEFAULT NULL,
  `motasanphamfull` varchar(500) DEFAULT NULL,
  `gia` float DEFAULT NULL,
  `hinhanh` varchar(0) DEFAULT NULL,
  `giamualien` float DEFAULT NULL,
  `idnguoiban` int(11) NOT NULL,
  `thoigianbatdauban` datetime DEFAULT NULL,
  `thoigiankethuc` datetime DEFAULT NULL,
  `idnguoithang` int(11) NOT NULL,
  `buocgia` float DEFAULT NULL,
  `LOAISANPHAM2_idLOAISP2` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSANPHAM`,`LOAISANPHAM3_idLOAISP3`,`idnguoiban`,`idnguoithang`),
  KEY `fk_SANPHAM_USER1_idx` (`idnguoiban`) USING BTREE,
  KEY `fk_SANPHAM_USER2_idx` (`idnguoithang`) USING BTREE,
  KEY `fk_SanphamLoai3` (`LOAISANPHAM3_idLOAISP3`),
  KEY `idSANPHAM` (`idSANPHAM`),
  KEY `fk_SanphamLoai2` (`LOAISANPHAM2_idLOAISP2`),
  CONSTRAINT `fk_SanphamLoai2` FOREIGN KEY (`LOAISANPHAM2_idLOAISP2`) REFERENCES `loaisanpham2` (`idLOAISANPHAM2`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_SanphamLoai3` FOREIGN KEY (`LOAISANPHAM3_idLOAISP3`) REFERENCES `loaisanpham3` (`idLOAISP3`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_SANPHAM_USER1` FOREIGN KEY (`idnguoiban`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_SANPHAM_USER2` FOREIGN KEY (`idnguoithang`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sanpham
-- ----------------------------

-- ----------------------------
-- Table structure for sanphamconguoimua
-- ----------------------------
DROP TABLE IF EXISTS `sanphamconguoimua`;
CREATE TABLE `sanphamconguoimua` (
  `USER_idUSER` int(11) NOT NULL,
  `idsanpham` int(11) NOT NULL,
  KEY `fk_SANPHAMCONGUOIMUA_USER1_idx` (`USER_idUSER`),
  KEY `fk_SANPHAMCONGUOIMUA_SANPHAM` (`idsanpham`),
  CONSTRAINT `fk_SANPHAMCONGUOIMUA_SANPHAM` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`idSANPHAM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_SANPHAMCONGUOIMUA_USER1` FOREIGN KEY (`USER_idUSER`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sanphamconguoimua
-- ----------------------------

-- ----------------------------
-- Table structure for sanphamyeuthich
-- ----------------------------
DROP TABLE IF EXISTS `sanphamyeuthich`;
CREATE TABLE `sanphamyeuthich` (
  `USER_idUSER` int(11) NOT NULL,
  `idsanpham` int(11) NOT NULL,
  KEY `fk_SANPHAMYEUTHICH_USER_idx` (`USER_idUSER`),
  KEY `fk_SANPHAMYEUTHICH_SANPHAM` (`idsanpham`),
  CONSTRAINT `fk_SANPHAMYEUTHICH_SANPHAM` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`idSANPHAM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_SANPHAMYEUTHICH_USER` FOREIGN KEY (`USER_idUSER`) REFERENCES `user` (`idUSER`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sanphamyeuthich
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `idUSER` int(11) NOT NULL AUTO_INCREMENT,
  `tendangnhap` varchar(30) DEFAULT NULL,
  `matkhau` varchar(30) DEFAULT NULL,
  `hoten` varchar(100) DEFAULT NULL,
  `gioitinh` varchar(5) DEFAULT NULL,
  `ngaysinh` datetime DEFAULT NULL,
  `sodienthoai` varchar(20) DEFAULT NULL,
  `diachi` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ngaybatdauban` datetime DEFAULT NULL,
  PRIMARY KEY (`idUSER`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1001', 'bigterboy', '0908083087', 'Trương Phan Quí', 'Nam', '2017-06-21 15:59:30', '01227890490', 'tp hcm', 'ninatabala@gmail.com', '2017-06-21 15:59:30');
INSERT INTO `user` VALUES ('1002', 'jimber', '123456', 'trần trung hiếu', 'Nữ', '2017-06-12 16:00:30', '123456', 'TP quảng nam', 'jiper@gmail.com', '2017-06-21 15:59:30');
INSERT INTO `user` VALUES ('1003', 'honey', '15615466', 'Nguyễn Quang Hùng', 'Nam', '2017-06-15 16:03:02', '1234516889', 'TP HCM', 'horcor@gmail.com', '2017-06-21 15:59:30');
