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

// Xem thong tin tai lieu co id = id
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

// Lay danh sach nhan vien
app.get('/danhSachNhanVien', async function(req, res) {
	var pageSize = 4,
		pageCount,
		currentPage = 1;
	danhSachNhanVien = new Array(); 
	display_danhSachNhanVien = new Array();
	var k = 0;
	var sql; 
	var noi_dung_tim_kiem;
	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}

	// Hien thi danh sach nhan vien
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select id, MaNV, HoTen, DiaChi, Email, SoDienThoai from nhanvien`;
		noi_dung_tim_kiem = '';
	}
	else //Tim kiem nhan vien
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql = `select id, MaNV, HoTen, DiaChi, Email, SoDienThoai from nhanvien where MaNV like ? or HoTen like ? or DiaChi like ? or Email like ? or SoDienThoai like ?`;
		sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem, noi_dung_tim_kiem]); 
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachNhanVien = await queryPromise(sql);
		pageCount = Math.ceil(danhSachNhanVien.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachNhanVien.length>i)
				{
					display_danhSachNhanVien.push(danhSachNhanVien[i]);
				} 
		res.render('views/pages/quan-ly-nhan-vien', { danhSachNhanVien: display_danhSachNhanVien, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem });
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});

// Them nhan vien
app.post('/themNhanVien', json.json(), async function(req, res) { 
	var sql;
	sql = "select MaNV from nhanvien where id = (select max(id) from nhanvien)";
	try {
		MaNV = await queryPromise(sql);
		MaNV = MaNV[0].MaNV;
		stt = MaNV.substring(2); 
		stt = parseInt(stt) + 1;
		if (stt.toString().length == 1) {
			MaNV = "NV00" + stt;
		}
		else if (stt.toString().length == 2) {
			MaNV = "NV0" + stt;
		}
		else MaNV = "NV" + stt; 
		sql = `insert into nhanvien(MaNV, HoTen, DiaChi, Email, SoDienThoai, ChucVu) 
		values (?, ?, ?, ?, ?, ?)`;
		sql = mysql.format(sql, [MaNV, req.body.HoTen, req.body.DiaChi, 
			req.body.Email, req.body.SoDienThoai, "Nhân viên"]); 
		connect.query(sql, async function(err, results) {
			if (err) { 
				res.write("0");
				res.end();
			}
			else {
				var pageSize = 4,
					pageCount;
				danhsachnhanvien = [];
				results = await queryPromise("select * from nhanvien order by id desc");
				pageCount = Math.ceil(results.length/pageSize);
				for (var i = 0; i < pageSize; i++) {
					danhsachnhanvien[i] = results[pageSize - i - 1];
				}
				dsnv_pagecount = {
					'danhsachnhanvien': danhsachnhanvien,
					'pageCount': pageCount

				}; 
				res.write(JSON.stringify(dsnv_pagecount)); 
				res.end(); 
			}
		}) 
	} catch (SQLException) {
		res.write("0");
		res.end();
	} 
})
 
// Sua nhan vien 
app.post('/suaNhanVien', json.json(), function(req, res) {
	var sql = `update nhanvien set HoTen = ?, SoDienThoai = ?, DiaChi = ?, Email = ? 
	where id = ?`;
	sql = mysql.format(sql, [req.body.HoTen, req.body.SoDienThoai, req.body.DiaChi,
		req.body.Email, req.body.id]); 
	connect.query(sql, async function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select * from nhanvien where id = ?";
			sql = mysql.format(sql, req.body.id);
			danhsachnhanvien = await queryPromise(sql); 
			res.write(JSON.stringify(danhsachnhanvien)); 
			res.end();
		}
	})
})

// Xoa nhan vien 
app.post('/xoaNhanVien', json.json(), function(req, res) {
	var sql = `delete from nhanvien where id = ?`; 
	sql = mysql.format(sql, req.body.id);  
	connect.query(sql, async function(err, result) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select * from nhanvien"; 
			sql = mysql.format(sql, req.body.id);
			results = await queryPromise(sql);
			pageCount = Math.ceil(results.length / 4)
			page = Math.ceil(req.body.sothutu / 4);  
			danhsachnhanvien = [];
			k = 0;
			for (var i = page * 4 - 3; i <= page * 4 && i <= results.length; i++) {
				danhsachnhanvien[k] = results[i - 1]; 
				k++;
			} 
			dsnv_pagecount = {
					'danhsachnhanvien': danhsachnhanvien,
					'pageCount': pageCount

			}; 
			res.write(JSON.stringify(dsnv_pagecount)); 
			res.end();
		}
	})
})
  
// Xem thong tin chi tiet cua nhan vien
app.get('/thongTinChiTietNhanVien/:id', async function(req, res) { 
	var sql = `select MaNV, SoDienThoai, DiaChi, Email, HoTen, ChucVu from nhanvien 
	where id = ?`;
	sql = mysql.format(sql, req.params.id);
	try {
		results = await queryPromise(sql);
		res.write(JSON.stringify({MaNV: results[0].MaNV, SoDienThoai: results[0].SoDienThoai, 
			DiaChi: results[0].DiaChi, Email: results[0].Email, HoTen: results[0].HoTen, 
			ChucVu: results[0].ChucVu}));
	} catch (SQLException) {
		res.write('0');
	} 
	res.end();
})

// Lay danh sach tai khoan cua nguoi dung
app.get('/danhSachTaiKhoan', async function(req, res) {
	var pageSize = 4,
		pageCount,
		currentPage = 1;
	danhSachTaiKhoan = new Array(); 
	display_danhSachTaiKhoan = new Array();
	var k = 0;
	var sql; 
	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}
	// Hien thi danh sach tai khoan
	if (req.query.TenTk == undefined || req.query.TenTk.trim() == "") { 
		sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, docgia where TenTk = MaThe`;
		try { 
			docgia = await queryPromise(sql);
			for (var i = 0; i < docgia.length; i++) { 
				danhSachTaiKhoan[k] = docgia[i];
				k++;
			} 
			sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, nhanvien where TenTk = MaNV`;
			try { 
				nhanvien = await queryPromise(sql);
				for (var i = 0; i < nhanvien.length; i++) {
					danhSachTaiKhoan[k] = nhanvien[i];
					k++;
				} 
				pageCount = Math.ceil(danhSachTaiKhoan.length/pageSize);

				for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
					if (danhSachTaiKhoan.length>i)
						{
							display_danhSachTaiKhoan.push(danhSachTaiKhoan[i]);
						} 
				res.render('views/pages/quan-ly-tai-khoan', { danhSachTaiKhoan: display_danhSachTaiKhoan, 
																pageSize: pageSize, 
																pageCount: pageCount, 
																currentPage: currentPage, 
																TenTk: '' });
			} catch(Exception) {
				res.send('ERROR');
			}
		} catch(Exception) {
			res.send('ERROR');
		} 
	} 
	// Tim kiem tai khoan
	else {
		var TenTk = [];
		var noi_dung_tim_kiem = "%" + req.query.TenTk + "%";
		sql = `select distinct TenTk from login, docgia where (TenTk like ? or docgia.HoTen like ? or docgia.DiaChi like ? or
				docgia.Email like ? or docgia.SoDienThoai like ?) and docgia.MaThe = login.TenTk`;
		try {
			sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
				noi_dung_tim_kiem, noi_dung_tim_kiem]); 
			results = await queryPromise(sql);
			for (var i = 0; i < results.length; i++) {
				TenTk.push(results[i]);
			}
		} catch (Exception) {
			res.send('ERROR');
		}
		sql = `select distinct TenTk from login, nhanvien where (TenTk like ? or nhanvien.HoTen like ? or nhanvien.DiaChi like ? or
				nhanvien.Email like ? or nhanvien.SoDienThoai like ?) and nhanvien.MaNV = login.TenTk`;
		try {
			sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
				noi_dung_tim_kiem, noi_dung_tim_kiem]);  
			results = await queryPromise(sql);
			for (var i = 0; i < results.length; i++) {
				TenTk.push(results[i]);
			} 
		} catch (Exception) {
			res.send('ERROR');
		}
		for (var t = 0; t < TenTk.length; t++) { 
			try { 
				sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, docgia where TenTk = MaThe and TenTk = ?`;
				sql = mysql.format(sql, TenTk[t].TenTk);
				docgia = await queryPromise(sql);
				for (var i = 0; i < docgia.length; i++) { 
					danhSachTaiKhoan[k] = docgia[i];
					k++;
				} 
				sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, nhanvien where TenTk = MaNV and TenTk = ?`;
				sql = mysql.format(sql, TenTk[t].TenTk);
				try { 
					nhanvien = await queryPromise(sql);
					for (var i = 0; i < nhanvien.length; i++) {
						danhSachTaiKhoan[k] = nhanvien[i];
						k++;
					}   
				} catch(Exception) {
					res.send('ERROR'); 
				}
			} catch(Exception) {
				res.send('ERROR'); 
			} 
		}
		pageCount = Math.ceil(danhSachTaiKhoan.length/pageSize);
		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
				if (danhSachTaiKhoan.length>i)
					{
						display_danhSachTaiKhoan.push(danhSachTaiKhoan[i]);
					} 
		res.render('views/pages/quan-ly-tai-khoan', { 	danhSachTaiKhoan: display_danhSachTaiKhoan,
													  	pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage,
														TenTk: req.query.TenTk }); 
 	} 
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
// Reset mat khau
app.post('/resetMatKhau', json.json(), function(req, res) {
	TenTk = req.body.TenTk;
	MatKhau = req.body.MatKhau;
	sql = "update login set MatKhau = ? where TenTk = ?";
	sql = mysql.format(sql, [MatKhau, TenTk]); 
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
