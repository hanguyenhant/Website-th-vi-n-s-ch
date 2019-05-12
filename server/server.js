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
	database: 'laptrinhweb1',
	host: 'localhost',
	user: 'root',
	password: '123456',
	dateStrings: 'date',
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
	var pageSize = 5,
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

	var pageSize = 5,
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
	var pageSize = 5,
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
		sql = 'insert into login (TenTk, MatKhau) values(?, ?)';
		sql = mysql.format(sql, [MaNV, '12345678']);
		connect.query(sql, function(err) {
			if (err) {
				res.write("0");
				res.end();
			}
		})
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
				var pageSize = 5,
					pageCount;
				danhsachnhanvien = [];
				results = await queryPromise("select * from nhanvien order by id desc");
				pageCount = Math.ceil(results.length/pageSize);
				soluong = results.length % pageSize; // so luong nhan vien thuoc trang cuoi cung
				if (soluong == 0) soluong = pageSize;
				for (var i = 0; i < pageSize && i < soluong; i++) {
					danhsachnhanvien[soluong - i - 1] = results[i];
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
app.post('/xoaNhanVien', json.json(), async function(req, res) {
	var sql = "select MaNV from nhanvien where id = ?" ;
	sql = mysql.format(sql, req.body.id);
	result = await queryPromise(sql);
	MaNV = result[0].MaNV;
	sql = `delete from nhanvien where id = ?`; 
	sql = mysql.format(sql, req.body.id);  
	connect.query(sql, async function(err, result) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			// Xoa tai khoan trong bang login 
			sql = "delete from login where TenTk = ?";
			sql = mysql.format(sql, MaNV);
			result_delete = await queryPromise(sql);
			sql = "select * from nhanvien"; 
			sql = mysql.format(sql, req.body.id);
			results = await queryPromise(sql);
			pageSize = 5;
			pageCount = Math.ceil(results.length / pageSize)
			page = req.body.currentPage;  
			danhsachnhanvien = [];
			k = 0;
			for (var i = page * pageSize - (pageSize - 1); i <= page * pageSize && i <= results.length; i++) {
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
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhsachchuacotaikhoan = new Array();
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
	var pageSize = 5,
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

//nha cung cap

// Lay danh sach  nha cung cap
app.get('/danhSachNhaCungCap', async function(req, res) {
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhSachNhaCungCap = new Array(); 
	display_danhSachNhaCungCap = new Array();

	var k = 0;
	var sql; 
	var noi_dung_tim_kiem;
	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}

	// Hien thi danh sach  nha cung cap
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select id, NhaCungCap, DiaChi, Email, SoDienThoai from nhacungcap`;
		noi_dung_tim_kiem = '';
	}
	else //Tim kiem  nha cung cap
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql = `select NhaCungCap, DiaChi, Email, SoDienThoai from nhacungcap where NhaCungCap like ? or DiaChi like ? or Email like ? or SoDienThoai like ?`;
		sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem]); 
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachNhaCungCap = await queryPromise(sql);
		pageCount = Math.ceil(danhSachNhaCungCap.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachNhaCungCap.length>i)
				{
					display_danhSachNhaCungCap.push(danhSachNhaCungCap[i]);
				} 
		res.render('views/pages/quan-ly-nha-cung-cap', { danhSachNhaCungCap: display_danhSachNhaCungCap, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem });
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});

// Them nha cung cap
app.post('/themNhaCungCap', json.json(), async function(req, res) { 
	var sql;
	try {
		sql = `insert into nhacungcap(NhaCungCap, DiaChi, Email, SoDienThoai) 
		values ( ?, ?, ?, ?)`;
		sql = mysql.format(sql, [ req.body.NhaCungCap, req.body.DiaChi, 
			req.body.Email, req.body.SoDienThoai]); 
		connect.query(sql, async function(err, results) {
			if (err) { 
				res.write("0");
				res.end();
			}
			else {
				var pageSize = 5,
					pageCount;
				danhsachnhacungcap = [];
				results = await queryPromise("select * from nhacungcap order by id desc");
				pageCount = Math.ceil(results.length/pageSize);
				soluong = results.length % pageSize; // so luong nhan vien thuoc trang cuoi cung
				if (soluong == 0) soluong = pageSize;
				for (var i = 0; i < pageSize && i < soluong; i++) {
					danhsachnhacungcap[soluong - i - 1] = results[i];
				}
				dsncc_pagecount = {
					'danhsachnhacungcap': danhsachnhacungcap,
					'pageCount': pageCount

				};  
				res.write(JSON.stringify(dsncc_pagecount)); 
				res.end();
			}
		}) 
	} catch (SQLException) {
		res.write("0");
		res.end();
	} 
})
 
// Sua  nha cung cap 
app.post('/suaNhaCungCap', json.json(), function(req, res) {
	var sql = `update nhacungcap set NhaCungCap = ?, SoDienThoai = ?, DiaChi = ?, Email = ? 
	where id = ?`;
	sql = mysql.format(sql, [req.body.NhaCungCap, req.body.SoDienThoai, req.body.DiaChi,
		req.body.Email, req.body.id]); 
	connect.query(sql, async function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select * from nhacungcap where id = ?";
			sql = mysql.format(sql, req.body.id);
			danhsachnhacungcap = await queryPromise(sql); 
			res.write(JSON.stringify(danhsachnhacungcap)); 
			res.end();
		}
	}) 
})

// Xoa  nha cung cap 
app.post('/xoaNhaCungCap', json.json(), function(req, res) {
	var sql = `delete from nhacungcap where id = ?`; 
	sql = mysql.format(sql, req.body.id);  
	connect.query(sql, async function(err, result) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select * from nhacungcap"; 
			sql = mysql.format(sql, req.body.id);
			results = await queryPromise(sql);
			pageCount = Math.ceil(results.length / pageSize)
			page = req.body.currentPage;  
			danhsachnhacungcap = [];
			k = 0;
			for (var i = page * pageSize - (pageSize - 1); i <= page * pageSize && i <= results.length; i++) {
				danhsachnhacungcap[k] = results[i - 1]; 
				k++;
			} 
			dsncc_pagecount = {
					'danhsachnhacungcap': danhsachnhacungcap,
					'pageCount': pageCount

			};  
			res.write(JSON.stringify(dsncc_pagecount)); 
			res.end();
		}
	})
})

// Lay danh sach muon sach
app.get('/quanLyMuonSach', async function(req, res) {
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhSachMuonSach = new Array(); 
	display_danhSachMuonSach = new Array();
	var k = 0;
	var sql; 
	var noi_dung_tim_kiem;
	var TongSoSach, TongTienCoc;
	if (typeof req.query.page != 'undefined') {
		currentPage = req.query.page; 
	}

	// Hien thi danh sach muon sach
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select id, MaThe, date_format(NgayMuon, '%d-%m-%Y %H-%i-%s') as NgayMuon, 
		 ThoiHanMuon, MaNV_Muon, MaNV_Tra, TongSoSach, TongTienCoc from phieu_muon_tra where TrangThai = "Mượn"`;
		noi_dung_tim_kiem = '';
		danhSachMuonSach = await queryPromise(sql); 
		TongSoSach = danhSachMuonSach.reduce(function(TongSoSach, curr){
										TongSoSach += curr.TongSoSach;
									    return TongSoSach;
									    }, 0); 
		TongTienCoc = danhSachMuonSach.reduce(function(TongTienCoc, curr){
									    TongTienCoc += curr.TongTienCoc;
									    return TongTienCoc;
									    }, 0); 
	}
	else //Tim kiem phieu muon
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql = `select id, MaThe, date_format(NgayMuon, '%d-%m-%Y %H-%i-%s') as NgayMuon, 
		 ThoiHanMuon, MaNV_Muon, MaNV_Tra, TongSoSach, TongTienCoc from phieu_muon_tra 
		 where TrangThai = "Mượn" and MaThe like ? or NgayMuon like ? or ThoiHanMuon like ? 
		 or MaNV_Muon like ? or MaNV_Tra like ? or TongTienCoc like ? or TongSoSach like ?`;
		sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem]); 
		 
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachMuonSach = await queryPromise(sql);
		pageCount = Math.ceil(danhSachMuonSach.length/pageSize); 

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachMuonSach.length>i)
				{
					display_danhSachMuonSach.push(danhSachMuonSach[i]);
				} 
		res.render('views/pages/quan-ly-muon-sach', { danhSachMuonSach: display_danhSachMuonSach, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem,
														TongSoSach: TongSoSach,
														TongTienCoc: TongTienCoc });
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});

// Lay thong tin doc gia
app.post("/layTTDocGia", json.json(), function(req, res) { 
	sql = "select HoTen, Email, SoDienThoai from docgia where MaThe = ?"; 
	sql = mysql.format(sql, req.body.MaThe); 
	connect.query(sql, function (err, result) {
		if (err) {
			res.write("0");
			res.end();
		}
		else {
			if (result.length == 0) { 
				res.write("0");
				res.end();
			}
			else {
				res.write(JSON.stringify(result)); 
				res.end();
			}
		}
	})
})

// Lay thong tin sach muon
app.post("/layTTSachMuon", json.json(), function(req, res) { 
	sql = "select tenTL, MaVach, GiaBia from tailieu, tailieuchitiet where MaVach = ? and TaiLieuId = tailieu.id and TinhTrang = ?"; 
	sql = mysql.format(sql, [req.body.MaVach, "chưa mượn"]); 
	connect.query(sql, function (err, result) {
		if (err) {
			res.write("0");
			res.end();
		}
		else {
			if (result.length == 0) { 
				res.write("0");
				res.end();
			}
			else {
				res.write(JSON.stringify(result)); 
				res.end();
			}
		}
	})
})

// Them phieu muon
app.post("/themPhieuMuon", json.json(), async function(req, res) { 
	var NgayMuon = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	MaThe = req.body.MaThe;
	ThoiHanMuon = req.body.ThoiHanMuon;
	MaNV_Muon = req.body.MaNV_Muon;
	TongTienCoc = req.body.TongTienCoc;  
	danhsachmavach = req.body.DanhSachMaVach; 

	sql = "insert into phieu_muon_tra(MaThe, NgayMuon, ThoiHanMuon, MaNV_Muon, TongSoSach, TongTienCoc, TrangThai) values(?, ?, ?, ?, ?, ?, ?)";
	sql = mysql.format(sql, [MaThe, NgayMuon , ThoiHanMuon, MaNV_Muon, danhsachmavach.length, TongTienCoc, "Mượn"]);
	try { 
		result = await queryPromise(sql); 
	} catch(e) {
		res.write("0");
		res.end();
	}
	sql = "select max(id) as id from phieu_muon_tra";
	try {
		IdPhieuMuonTra = await queryPromise(sql);
		IdPhieuMuonTra = IdPhieuMuonTra[0].id;
	} catch(e) {
		res.write("0");
		res.end();
	}
	for (var i = 0; i < danhsachmavach.length; i++) {
		sql = "insert into chi_tiet_muon_tra(IdPhieuMuonTra, MaVach) values(?, ?)";
		sql = mysql.format(sql, [IdPhieuMuonTra, danhsachmavach[i]]);
		try {
			await queryPromise(sql);
			sql = "update tailieuchitiet set TinhTrang = 'mượn' where MaVach = ?";
			sql = mysql.format(sql, danhsachmavach[i]); 
			try {
				await queryPromise(sql);
			} catch(ex) {
				res.write("0");
				res.end();
			}
		} catch(e) {
			res.write("0");
			res.end();
		}
	}
	var pageSize = 5,
			pageCount;
		danhsachmuonsach = [];
	results = await queryPromise(`select id, MaThe, date_format(NgayMuon, '%d-%m-%Y %H-%i-%s') as NgayMuon, 
		 ThoiHanMuon, MaNV_Muon, TongSoSach, TongTienCoc from phieu_muon_tra where TrangThai = "Mượn"
		  order by id desc`);
	TongSoSach = results.reduce(function(TongSoSach, curr){
									TongSoSach += curr.TongSoSach;
								    return TongSoSach;
								    }, 0); 
	TongTienCoc = results.reduce(function(TongTienCoc, curr){
									    TongTienCoc += curr.TongTienCoc;
									    return TongTienCoc;
									    }, 0); 
	pageCount = Math.ceil(results.length/pageSize);
	soluong = results.length % pageSize; // so luong nhan vien thuoc trang cuoi cung
	if (soluong == 0) soluong = pageSize;
	for (var i = 0; i < pageSize && i < soluong; i++) {
		danhsachmuonsach[soluong - i - 1] = results[i];
	}
	ds_pagecount = {
		'danhsachmuonsach': danhsachmuonsach,
		'pageCount': pageCount,
		'TongSoSach': TongSoSach,
		'TongTienCoc': TongTienCoc 
	};    
	res.write(JSON.stringify(ds_pagecount)); 
	res.end();  
})

// Lay thong tin chi tiet cua phieu muon
app.post("/layTTPhieuMuon", json.json(), async function(req, res) {  
	sql = `select docgia.MaThe, HoTen, Email, SoDienThoai, date_format(NgayMuon, '%Y-%m-%d') as NgayMuon, ThoiHanMuon, 
		TongSoSach, TongTienCoc, TrangThai  
		from phieu_muon_tra, docgia where phieu_muon_tra.MaThe = docgia.MaThe 
		and phieu_muon_tra.id = ` + req.body.id;  
	try {  
		thongtindocgia = await queryPromise(sql); 
		sql = `select tailieuchitiet.MaVach, TenTL from phieu_muon_tra, tailieuchitiet, tailieu, chi_tiet_muon_tra  
			where phieu_muon_tra.id = chi_tiet_muon_tra.IdPhieuMuonTra and chi_tiet_muon_tra.MaVach = tailieuchitiet.MaVach
			and tailieu.id = tailieuchitiet.TaiLieuId and phieu_muon_tra.id = ?`; 
		sql = mysql.format(sql, req.body.id); 
		danhsachmuonsach = await queryPromise(sql);

		thongtinchitiet = {
			'danhsachmuonsach': danhsachmuonsach,
			'NgayMuon': thongtindocgia[0].NgayMuon,
			'ThoiHanMuon': thongtindocgia[0].ThoiHanMuon,
			'TongSoSach': thongtindocgia[0].TongSoSach,
			'TongTienCoc': thongtindocgia[0].TongTienCoc,
			'MaThe': thongtindocgia[0].MaThe,
			'HoTen': thongtindocgia[0].HoTen,
			'Email': thongtindocgia[0].Email,
			'SoDienThoai': thongtindocgia[0].SoDienThoai,
			'TrangThai': thongtindocgia[0].TrangThai
		};    

		res.write(JSON.stringify(thongtinchitiet)); 
		res.end();  
	} catch(e) {
		res.write("0");
		res.end();
	}
})

// Lay danh sach tra sach
app.get('/quanLyTraSach', async function(req, res) {
	res.render('views/pages/quan-ly-tra-sach');
});

// Xac nhan tra sach
app.post('/xacNhanTraSach', json.json(), async function(req, res) { 
	var NgayTra = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	sql = "update phieu_muon_tra set NgayTra = ?, MaNV_Tra = ?, TrangThai='Trả' where id = " + req.body.id;  
	sql = mysql.format(sql, [NgayTra, req.body.MaNV_Tra]); 
	 
	try {
		results = await queryPromise(sql); 
	 	danhsachmuonsach = req.body.danhsachmuonsach;
		for (var i = 0; i < danhsachmuonsach.length; i++) { 
			sql = "update tailieuchitiet set TinhTrang = 'chưa mượn' where MaVach = ?";
			sql = mysql.format(sql, danhsachmuonsach[i].MaVach);  
			try {
				await queryPromise(sql); 
			} catch(e) {
				res.write("0");
				res.end();
			}
		}
		res.write('1');
		res.end(); 
	} catch(e) {
		res.write('0');
		res.end();
	} 
})

// Đổi mật khẩu
app.get('/doiMatKhau', async function(req, res) {
	res.render('views/pages/doi-mat-khau');
});

app.post('/doiMatKhau', json.json(), function(req, res) {
	TenTk = req.body.TenTk;
	MatKhauCu = req.body.MatKhauCu;
	MatKhauMoi = req.body.MatKhauMoi;
	sql = "select * from login where TenTk = ? and MatKhau = ?";
	sql = mysql.format(sql, [TenTk, MatKhauCu]);
	connect.query(sql, function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			if (results.length == 0)
			{
				res.write('0');
				res.end();
			}
			else 
			{
				sql = "update login set MatKhau = ? where TenTk = ?";
				sql = mysql.format(sql, [MatKhauMoi, TenTk]); 
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
			}	
		}
	})
});

// Thông tin người dùng
app.get('/thongTinCaNhan', async function(req, res) {
	var TenTk = req.query.username; 
	thongTinCaNhan = new Array();

	sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, docgia where TenTk = MaThe and TenTk = ?`;
	sql = mysql.format(sql, TenTk); 
	try { 
		docgia = await queryPromise(sql);
		if (docgia.length == 0)
		{
			sql = `select TenTk, HoTen, DiaChi, Email, SoDienThoai from login, nhanvien where TenTk = MaNV and TenTk = ?`;
			sql = mysql.format(sql, TenTk); 
			try { 
				nhanvien = await queryPromise(sql);
				thongTinCaNhan.push(nhanvien[0]); 
			}
			catch(Exception) {
				res.send('ERROR');
			}
		}
		else
		{
			thongTinCaNhan.push(docgia[0]); 
		}

	} catch(Exception) {
		res.send('ERROR');
	}

	res.render('views/pages/thong-tin-ca-nhan', {thongTinCaNhan: thongTinCaNhan});
});

app.post('/capNhatThongTin', json.json(), function(req, res) {
	TenTk = req.body.TenTk;
	DiaChi = req.body.DiaChi;
	Email = req.body.Email;
	SoDienThoai = req.body.SoDienThoai;

	if (TenTk.substring(0, 2) == "NV")
	{
		sql = "update nhanvien set DiaChi = ?, Email = ?, SoDienThoai = ? where MaNV = ?";
	}
	else //Độc giả
	{
		sql = "update docgia set DiaChi = ?, Email = ?, SoDienThoai = ? where MaThe = ?";
		
	}
	sql = mysql.format(sql, [DiaChi, Email, SoDienThoai, TenTk]);
	connect.query(sql, function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			capNhatThongTin = {
					'DiaChi': DiaChi,
					'Email': Email,
					'SoDienThoai': SoDienThoai,
			};  

			res.write(JSON.stringify(capNhatThongTin));
			res.end();
		}
	})
});

//Thông tin mượn sách độc giả
app.get('/thongTinMuonSach', async function(req, res) {
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhSachMuonSach = new Array(); 
	display_danhSachMuonSach = new Array();
	var sql; 
	var noi_dung_tim_kiem;
	var tong_so_tien_coc = 0;
	MaThe = req.query.username;

	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}

	// Hien thi danh sach muon sach
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select MaVach, NgayMuon, ThoiHanMuon, TienCoc from muon_tra where TrangThai = "Mượn" and MaThe = ?`;
		sql = mysql.format(sql, MaThe)
		noi_dung_tim_kiem = '';
	}
	else //Tim kiem phieu muon
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql = `select MaVach, NgayMuon, ThoiHanMuon, TienCoc from muon_tra where TrangThai = "Mượn" and MaThe = ? and (MaVach like ? or NgayMuon like ? or ThoiHanMuon like ? or TienCoc like ?)`;
		sql = mysql.format(sql, [MaThe, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem, noi_dung_tim_kiem]); 
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachMuonSach = await queryPromise(sql);
		pageCount = Math.ceil(danhSachMuonSach.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachMuonSach.length>i)
				{
					display_danhSachMuonSach.push(danhSachMuonSach[i]);
				} 
		for (var i=0; i<danhSachMuonSach.length; i++)
		{
			tong_so_tien_coc += parseFloat(danhSachMuonSach[i].TienCoc);
		}
		res.render('views/pages/thong-tin-muon-sach', { danhSachMuonSach: display_danhSachMuonSach, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem,
														username: MaThe,
														tong_so_sach_muon: danhSachMuonSach.length,
														tong_so_tien_coc: tong_so_tien_coc});
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});




// Lay danh sach doc gia
app.get('/danhSachDocGia', async function(req, res) {
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhSachDocGia = new Array(); 
	display_danhSachDocGia = new Array();
	var k = 0;
	var sql; 
	var noi_dung_tim_kiem;
	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}
  //date_format(NgayMuon, '%Y-%m-%d %H-%i-%s') as NgayMuon
	// Hien thi danh sachdoc gia
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select id, MaThe, HoTen, DiaChi, Email, SoDienThoai,  date_format(NgayCap, '%Y-%m-%d ') as NgayCap ,  date_format(HanSD, '%Y-%m-%d ') as HanSD, MaNV,  date_format(NgayCN, '%Y-%m-%d ') as NgayCN from docgia`;
		noi_dung_tim_kiem = '';
	}
	else //Tim kiemdoc gia
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql = `select id, MaThe, HoTen, DiaChi, Email, SoDienThoai,  date_format(NgayCap, '%Y-%m-%d ') as NgayCap ,  date_format(HanSD, '%Y-%m-%d ') as HanSD, MaNV,  date_format(NgayCN, '%Y-%m-%d ') as NgayCN from docgia where MaThe like ? or HoTen like ? or DiaChi like ? or Email like ? or SoDienThoai like ? or MaNV like ?`;
		sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem, noi_dung_tim_kiem]); 
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachDocGia = await queryPromise(sql);
		pageCount = Math.ceil(danhSachDocGia.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachDocGia.length>i)
				{
					display_danhSachDocGia.push(danhSachDocGia[i]);
				} 
		res.render('views/pages/quan-ly-doc-gia', { danhSachDocGia: display_danhSachDocGia, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem });
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});

 
 
 // Them doc gia 
app.post('/themDocGia', json.json(), async function(req, res) { 
	var sql;
	sql = "select MaThe from docgia where id = (select max(id) from docgia)";
	try {
		MaThe = await queryPromise(sql);
		MaThe = MaThe[0].MaThe;
		stt = MaThe.substring(2); 
		stt = parseInt(stt) + 1;
		if (stt.toString().length == 1) {
			MaThe = "DG00" + stt;
		}
		else if (stt.toString().length == 2) {
			MaThe = "DG0" + stt;
		}
		else MaThe = "DG" + stt; 
		sql = 'insert into login (TenTk, MatKhau) values(?, ?)';
		sql = mysql.format(sql, [MaThe, '12345689']);
		connect.query(sql, function(err) {
			if (err) {
				res.write("0");
				res.end();
			}
		})
		sql = `insert into docgia(MaThe, HoTen, DiaChi, Email, SoDienThoai, NgayCap, HanSD, MaNV, NgayCN) 
		values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		sql = mysql.format(sql, [MaThe, req.body.HoTen, req.body.DiaChi, 
			req.body.Email, req.body.SoDienThoai, req.body.NgayCap,
			req.body.HanSD, req.body.MaNV, req.body.NgayCN]); 
		connect.query(sql, async function(err, results) {
			if (err) { 
				res.write("0");
				res.end();
			}
			else {
				var pageSize = 5,
					pageCount;
				danhsachdocgia = [];
				results = await queryPromise("select * from docgia order by id desc");
				pageCount = Math.ceil(results.length/pageSize);
				soluong = results.length % pageSize; // so luong doc gia thuoc trang cuoi cung
				if (soluong == 0) soluong = pageSize;
				for (var i = 0; i < pageSize && i < soluong; i++) {
					danhsachdocgia[soluong - i - 1] = results[i];
				}
				dsdg_pagecount = {
					'danhsachdocgia': danhsachdocgia,
					'pageCount': pageCount

				};  
				res.write(JSON.stringify(dsdg_pagecount)); 
				res.end(); 
			}
		}) 
	} catch (SQLException) {
		res.write("0");
		res.end();
	} 
//console.log(sql);
})
 
 
 
// Suadoc gia 
app.post('/suaDocGia', json.json(), function(req, res) {
	var sql = `update docgia set HoTen = ?, DiaChi = ?, Email = ? , SoDienThoai = ?, 
	NgayCap = ?, HanSD = ?, MaNV = ?,  NgayCN = ?
	where id = ?`;
	sql = mysql.format(sql, [req.body.HoTen, req.body.DiaChi,
		req.body.Email, req.body.SoDienThoai, req.body.NgayCap, req.body.HanSD
		, req.body.MaNV, req.body.NgayCN,req.body.id]); 
	connect.query(sql, async function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select id, MaThe, HoTen, DiaChi, Email, SoDienThoai,  date_format(NgayCap, '%Y-%m-%d') as NgayCap ,  date_format(HanSD, '%Y-%m-%d ') as HanSD, MaNV,  date_format(NgayCN, '%Y-%m-%d') as NgayCN from docgia where id = ?";
			sql = mysql.format(sql, req.body.id);
			danhsachdocgia = await queryPromise(sql); 
			res.write(JSON.stringify(danhsachdocgia)); 
			res.end();
		}
	}) 
})


// Xoa  doc gia 
app.post('/xoaDocGia', json.json(), async function(req, res) {
	var sql = "select MaThe from docgia where id = ?" ;
	sql = mysql.format(sql, req.body.id);
	result = await queryPromise(sql);
	MaThe = result[0].MaThe;
	sql = `delete from docgia where id = ?`; 
	sql = mysql.format(sql, req.body.id);  
	connect.query(sql, async function(err, result) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			// Xoa tai khoan trong bang login 
			sql = "delete from login where TenTk = ?";
			sql = mysql.format(sql, MaThe);
			result_delete = await queryPromise(sql);
			sql = "select * from docgia"; 
			sql = mysql.format(sql, req.body.id);
			results = await queryPromise(sql);
			pageSize = 5;
			pageCount = Math.ceil(results.length / pageSize)
			page = req.body.currentPage;  
			danhsachdocgia = [];
			k = 0;
			for (var i = page * pageSize - (pageSize - 1); i <= page * pageSize && i <= results.length; i++) {
				danhsachdocgia[k] = results[i - 1]; 
				k++;
			} 
			dsdg_pagecount = {
					'danhsachdocgia': danhsachdocgia,
					'pageCount': pageCount

			};  
			res.write(JSON.stringify(dsdg_pagecount)); 
			res.end();
		}
	})
})
  
// Lay danh sach tai lieu
app.get('/danhSachTaiLieu', async function(req, res) {
	var pageSize = 5,
		pageCount,
		currentPage = 1;
	danhSachTaiLieu = new Array(); 
	display_danhSachTaiLieu = new Array();
	var k = 0;
	var sql; 
	var noi_dung_tim_kiem;
	if (typeof req.query.page != 'undefined') {
		currentPage = +req.query.page;
	}

	// Hien thi danh sach tai lieu
	if (req.query.noi_dung_tim_kiem == undefined || req.query.noi_dung_tim_kiem.trim() == "") { 
		sql = `select id, TenTL, TenTheLoai, TenTG, TenNXB, NamXB, TenNgonNgu, NoiDung, SoTrang, KhoGiay, LanTB, GiaBia, SoPH, NgayPH, TongSo, MaVT, NgayCN, MaNV, Anh from tailieu`;
		
		noi_dung_tim_kiem = '';
	}
	else
		//Tim kiem tai lieu
	{
		noi_dung_tim_kiem = "%" + req.query.noi_dung_tim_kiem + "%";
		sql ="select id, TenTL, TenTheLoai, TenTG, TenNXB, NamXB, TenNgonNgu, NoiDung, SoTrang, KhoGiay, LanTB, GiaBia, SoPH, NgayPH, TongSo, MaVT, NgayCN, MaNV, Anh from tailieu where id like ? or TenTL like ? or TenTheLoai like ? or GiaBia like ?" ;
		sql = mysql.format(sql, [noi_dung_tim_kiem, noi_dung_tim_kiem, noi_dung_tim_kiem, 
								noi_dung_tim_kiem, noi_dung_tim_kiem]); 
		
		noi_dung_tim_kiem = req.query.noi_dung_tim_kiem;
	}
	try { 
		danhSachTaiLieu = await queryPromise(sql);
		pageCount = Math.ceil(danhSachTaiLieu.length/pageSize);

		for (var i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++)
			if (danhSachTaiLieu.length>i)
				{
					display_danhSachTaiLieu.push(danhSachTaiLieu[i]);
				} 
		res.render('views/pages/danh-sach-tai-lieu', { danhSachTaiLieu: display_danhSachTaiLieu, 
														pageSize: pageSize, 
														pageCount: pageCount, 
														currentPage: currentPage, 
														noi_dung_tim_kiem: noi_dung_tim_kiem });
		 
	} 
	catch(Exception) {
		res.send('ERROR');
	} 
});

// Them tai lieu
app.post('/themTaiLieu', json.json(), async function(req, res) { 
	var sql;
	try {	
		sql = `INSERT INTO tailieu (TenTL, TenTheLoai, TenTG, TenNXB, NamXB, TenNgonNgu, NoiDung, SoTrang, KhoGiay, LanTB, GiaBia, SoPH, NgayPH, TongSo, MaVT, NgayCN, MaNV, Anh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		sql = mysql.format(sql, [req.body.TenTL, req.body.TenTheLoai, req.body.TenTG, req.body.TenNXB, 
			req.body.NamXB, req.body.TenNgonNgu, req.body.NoiDung, req.body.SoTrang, req.body.KhoGiay, req.body.LanTB, 
			req.body.GiaBia, req.body.SoPH, req.body.NgayPH, req.body.TongSo, req.body.MaVT, req.body.NgayCN,
			req.body.MaNV, req.body.Anh]); 

		connect.query(sql, async function(err, results) {
			if (err) {
				res.write("0");
				res.end();
			}
			else {
				var pageSize = 5,
					pageCount;
				danhsachtailieu = [];
				results = await queryPromise("select * from tailieu order by id desc");

				pageCount = Math.ceil(results.length/pageSize);
				soluong = results.length % pageSize; // so luong tai lieu thuoc trang cuoi cung
				if (soluong == 0) soluong = pageSize;
				for (var i = 0; i < pageSize && i < soluong; i++) {
					danhsachtailieu[soluong - i - 1] = results[i];
				}
				dstl_pagecount = {
					'danhsachtailieu': danhsachtailieu,
					'pageCount': pageCount
				};  
				res.write(JSON.stringify(dstl_pagecount)); 
				res.end();
			}
		}) 
	} catch (SQLException) {
		res.write("0");
		res.end();
	} 
})

// Sua tai lieu 
app.post('/suaTaiLieu', json.json(), function(req, res) {
	var sql = `update tailieu set TenTL = ?, TenTheLoai = ?, TenTG = ?, GiaBia = ? 
	where id = ?`;
	
	sql = mysql.format(sql, [req.body.TenTL, req.body.TenTheLoai, req.body.TenTG,
		req.body.GiaBia, req.body.id]); 
	connect.query(sql, async function(err, results) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			sql = "select * from tailieu where id = ?";
			sql = mysql.format(sql, req.body.id);
			danhsachtailieu = await queryPromise(sql); 
			res.write(JSON.stringify(danhsachtailieu)); 
			res.end();
		}
	})
})

// Xoa tai lieu
app.post('/xoaTaiLieu', json.json(), async function(req, res) {
	sql = `delete from tailieu where id = ?`; 
	sql = mysql.format(sql, req.body.id);  
	connect.query(sql, async function(err, result) {
		if (err) {
			res.write('0');
			res.end();
		}
		else {
			pageSize = 5;
			sql = "select * from tailieu"; 
			sql = mysql.format(sql, req.body.id);
			results = await queryPromise(sql);
			pageCount = Math.ceil(results.length / pageSize)
			page = req.body.currentPage;  
			danhsachtailieu = [];
			k = 0;
			for (var i = page * pageSize - (pageSize - 1); i <= page * pageSize && i <= results.length; i++) {
				danhsachtailieu[k] = results[i - 1]; 
				k++;
			} 
			dstl_pagecount = {
					'danhsachtailieu': danhsachtailieu,
					'pageCount': pageCount

			};  
			res.write(JSON.stringify(dstl_pagecount)); 
			res.end();
		}
	})
})