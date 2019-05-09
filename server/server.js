// Khoi tao server
const express = require("express"); 
const json = require("body-parser");
var app = express();   
app.listen(3000, function() {console.log("Server is running")});

app.use(json.urlencoded({ extended: true })); 
 
// Render file ejs thanh file html
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Su dung cac file tinh: bootstrap, css, images...
app.use(express.static('public'));
 
// Ket noi nodejs voi mysql
const mysql = require("mysql"); 
var connect = mysql.createConnection({
	database: 'laptrinhweb',
	host: 'localhost',
	user: 'root',
	password: '123456'
});

connect.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
});

// Trang chu 
app.get('/', async function(req, res) { 
	await getInformation();   
	res.render('views/pages/trangchu', {array_object_documents: this.array_object_documents});

})

//Xử lý tìm kiếm
app.get('/search', function(req, res) {

	var noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	var the_loai = req.query.the_loai;

	var pageSize = 8,
		pageCount,
		currentPage = 1,
		books_currentpage = []; 
	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
	}

	var sql;
	//Tìm kiếm theo tên sách
	if(the_loai == "ten_sach")
	{		
		sql = "select * from tailieu where TenTL like ?";
		sql = mysql.format(sql, "%"+[noi_dung_tim_kiem]+"%");
	}

	//Tìm kiếm theo ngôn ngữ
	else if(the_loai == "ngon_ngu")
	{		
		sql = "select * from tailieu where TenNgonNgu like ?";
		sql = mysql.format(sql, "%"+[noi_dung_tim_kiem]+"%");		 
	}

	//Tìm kiếm theo tác giả
	else if(the_loai == "tac_gia")
	{		
		sql = "select * from tailieu where TenTG like ?";
		sql = mysql.format(sql, "%"+[noi_dung_tim_kiem]+"%");
	}

	//Tìm kiếm theo nhà xuất bản
	else if(the_loai == "nha_xuat_ban")
	{		
		sql = "select * from tailieu where TenNXB like ?";
		sql = mysql.format(sql, "%"+[noi_dung_tim_kiem]+"%");
	}

	connect.query(sql, function(err, results) {
		if(err) throw err;

		pageCount = Math.ceil(results.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (results.length>i)
				{
					books_currentpage.push(results[i]);
				}
		
		res.render('views/pages/search', { 	so_ket_qua: results.length,
											ket_qua_tim_kiem: books_currentpage, 
											noi_dung_tim_kiem: noi_dung_tim_kiem, 
											the_loai: the_loai, 
											pageSize: pageSize, 
											pageCount: pageCount, 
											currentPage: currentPage});

	})
}); 

//danh sách nhân viên
app.get('/danhSachNhanVien', function(req, res) { 
	var sql = "SELECT * FROM nhanvien WHERE ChucVu = 'Nhân viên'";
	connect.query(sql, function (err, results) {
		if (err) throw err;
		res.render('views/pages/quan-ly-nhan-vien', {danhSachNhanVien: results});
	});
}); 

//Tìm kiếm nhân viên
app.get('/search_nhanvien', function(req, res) {

	var noi_dung_tim_kiem = "%"+req.query.noi_dung_tim_kiem+"%";	
	var sql;
	sql = "select * from nhanvien where MaNV like ? or HoTen like ? or DiaChi like ? or Email like ? or SoDienThoai like ?";
	
	sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem ]);	

	connect.query(sql, function(err, results) {
		if(err) throw err;
		
		res.render('views/pages/quan-ly-nhan-vien', {danhSachNhanVien: results});

	})
}); 


//Sửa nhân viên
app.post('/suaNhanVien', function(req, res) {

	
}); 
