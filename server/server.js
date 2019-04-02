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

documents= new Array(); // Mang chua tai lieu
object_documents = new Object(); // Doi tuong gom ten the loai va cac tai lieu tuong ung
array_object_documents = new Array(); // Mang chua cac doi tuong (moi doi tuong co the loai va cac tai lieu tuong ung)
results = []; // Ten The Loai
 
// Xu ly bat dong bo trong cac cau truy van mysql - nodejs
const promisify = require("util").promisify; 
const queryPromise = promisify(connect.query.bind(connect));

// Lay thong tin ten the loai va cac tai lieu tuong ung voi cac the loai
async function getInformation() {
	var sql = "select distinct TenTheLoai from tailieu;"
	this.results = await queryPromise(sql);  
	for (var i = 0; i < this.results.length; i++) {
		object_documents = new Object();
		object_documents.TenTheLoai = this.results[i].TenTheLoai; 
		sql1 = "select * from tailieu where TenTheLoai = ?";
		sql1 = mysql.format(sql1, results[i].TenTheLoai);  
		this.documents = await queryPromise(sql1);
		// Them mang tai lieu vao object
		object_documents.documents = documents ; 
		// Them object vao mang object
		this.array_object_documents[i] = object_documents;
	}  
}

// Trang chu 
app.get('/', async function(req, res) { 
	await getInformation();   
	res.render('views/pages/trangchu', {array_object_documents: this.array_object_documents});
 
})
 
// Xu ly dang nhap
app.post('/', function(req, res) { 
  // Kiem tra thong tin tai khoan + mat khau cua nguoi dung
	var sql = "select * from login where TenTk = ? and MatKhau = ?";
	sql = mysql.format(sql, [req.body.username, req.body.password]);

	connect.query(sql, function(err, results) {
		if(err) throw err;

    // Sai tai khoan hoac mat khau => dua ra thong bao
		if (results.length == 0) {  
			res.render('views/pages/trangchu', {message: 'error'}); 
		}
    // Dung => chuyen sang trang da dang nhap
		else { 
			res.render('views/pages/trangchu', {data: req.body.username, message:'ok'});
		}
	})  
}) 

// Xem thong tin san pham co id = id
// Lay tham so url : req.params.id
app.get('/information/:id', function(req, res) {
	var sql = "select * from tailieu where id = ?"; 
	sql = mysql.format(sql, req.params.id);
	connect.query(sql, function(err, results) {
		if (err) throw err; 
		res.render('views/pages/document_information', {information: results});
	})
})

// Xem thong tin cac tai lieu co TenTheLoai = tenTheLoai
app.get('/theloai/:tenTheLoai', function(req, res) {
	var pageSize = 8,
		pageCount,
		currentPage = 1,
		books_currentpage = []; 

	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
	}
 
	var sql = "select * from tailieu where TenTheLoai = ?"
	sql = mysql.format(sql, req.params.tenTheLoai);

	connect.query(sql, function(err, results) {
		if(err) throw err;

		pageCount = Math.ceil(results.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (results.length>i)
				{
					books_currentpage.push(results[i]);
				} 
		res.render('views/pages/theloai', { so_ket_qua: results.length,
											ket_qua_tim_kiem: books_currentpage, 
											the_loai: req.params.tenTheLoai,  
											pageSize: pageSize, 
											pageCount: pageCount, 
											currentPage: currentPage});

	})
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

// danh sách sách
app.get('/list', function(req, res) { 
  var sql = "SELECT * FROM tailieu";
  connect.query(sql, function (err, results) {
    if (err) throw err;
    //console.log(data);
   res.render('views/pages/listtest', {data:results , message: null});
	 });
}); 

// Form them nhan vien (url vi du)
app.get('/themNhanVien', function(req, res) {
	res.render('views/pages/them-nhan-vien.ejs');
})
// Them nhan vien
app.post('/themNhanVien', json.json(), async function(req, res) { 
	var sql;
	sql = "select Max(MaNV) as MaNV from nhanvien";
	try {
		MaNV = await queryPromise(sql);
		MaNV = MaNV[0].MaNV;
		stt = MaNV.substr(2, MaNV.length - 2);
		stt = parseInt(stt) + 1;
		if (stt.length < 3) {
			MaNV = "NV0" + stt;
		}
		else MaNV = "NV" + stt; 
		sql = `insert into nhanvien(MaNV, HoTen, DiaChi, Email, SoDienThoai, ChucVu) 
		values (?, ?, ?, ?, ?, ?)`;
		sql = mysql.format(sql, [MaNV, req.body.HoTen, req.body.DiaChi, 
			req.body.Email, req.body.SoDienThoai, "Nhân viên"]); 
		connect.query(sql, function(err, results) {
			if (err) {
				console.log("vao day");
				res.write("0");
				res.end();
			}
			else {
				res.write("1");
				res.end();
			}
		}) 
	} catch (SQLException) {
		res.write("0");
		res.end();
	} 
})

// Sua nhan vien
app.get('/suaNhanVien/:id', async function(req, res) { 
	var sql = `select SoDienThoai, DiaChi, Email, HoTen from nhanvien where id = ?`;
	sql = mysql.format(sql, req.params.id);
	try {
		results = await queryPromise(sql);
		res.write(JSON.stringify({SoDienThoai: results[0].SoDienThoai, 
			DiaChi: results[0].DiaChi, Email: results[0].Email, HoTen: results[0].HoTen}));
	} catch (SQLException) {
		res.write('0');
	} 
	res.end();
})
app.get('/suaNhanVien', async function(req, res) { 
		res.render('views/pages/sua-tt-nhan-vien.ejs');
	 
})
app.post('/suaNhanVien', json.json(), function(req, res) {
	var sql = `update nhanvien set HoTen = ?, SoDienThoai = ?, DiaChi = ?, Email = ? 
	where id = ?`;
	sql = mysql.format(sql, [req.body.HoTen, req.body.SoDienThoai, req.body.DiaChi,
		req.body.Email, req.body.id]);
	console.log(sql);
	connect.query(sql, function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			res.write('1');
			res.end();
		}
	})
})