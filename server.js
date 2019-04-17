// Khoi tao server
const express = require("express");
const bodyParser = require("body-parser") ;// lấy dữ liệu từ form bên html 
var jsonParser = bodyParser.json();
var app = express();   
app.listen(3000, function() {console.log("Server is running")});

//app.use(bodyParser.urlencoded({ extended: true}));
 
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
	password: ''
});

connect.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
});


// Trang chu 
app.get('/', function(req, res) { 
	
res.render('views/pages/trangchu', {data: null, message: null});
})

// Xu ly dang nhap
app.post('/', function(req, res) {
	//console.log(req);
  // Kiem tra thong tin tai khoan + mat khau cua nguoi dung
	var sql = "select * from login where TenTk = ? and MatKhau = ?";
	sql = mysql.format(sql, [req.body.username, req.body.password]);

	connect.query(sql, function(err, results) {
		if(err) throw err;

    // Sai tai khoan hoac mat khau => dua ra thong bao
		if (results.length == 0) { 
			res.render('views/pages/trangchu', {data: null, message:'error'}); 
		}
    // Dung => chuyen sang trang da dang nhap
		else { 
			res.render('views/pages/trangchu', {data: req.body.username, message: 'ok'});
		}
	}) 
}) 

// danh sách sách
app.get('/list', function(req, res) { 
  var sql = "SELECT * FROM tailieu ";
  connect.query(sql, function (err, results) {
    if (err) throw err;
    //console.log(data);
   res.render('views/admin/product/listtest', {data:results , message: null});
	 });
	// console.log(results.id);
});

// load giao diện cập nhật sản phẩm
app.get('/capnhat/:id', function(req, res) { 
   var id = req.params['id'];

   //console.log(id);

  var sql = 'SELECT * FROM tailieu  WHERE id = ? ' ;
 
	connect.query(sql, [id],function (err, results) {
    if (err) throw err;
  
  //console.log(results);
   res.render('views/admin/product/update', {dulieu:results , thongbao: null});
	 });
	
	
});
  var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var urlencodedParser=jsonParser.urlencoded({ extended: false });
app.post('/capnhat/:id',urlencodedParser,function(req,res){
var id = req.params.id;
console.log(res);
var sql = "UPDATE `tailieu` SET `TenTL`='"+req.body.tentailieu+"',`TenTheLoai`='"+req.body.tentheloai+"',`TenTG`='"+req.body.tentg+"',`TenNXB`='"+req.body.tennxb+"',`NamXB`='"+req.body.namxb+"',`TenNgonNgu`='"+req.body.tenngonngu+"',`NoiDung`='"+req.body.noidung+"',`SoTrang`='"+req.body.sotrang+"',`KhoGiay`='"+req.body.khogiay+"',`LanTB`='"+req.body.lantb+"',`GiaBia`='"+req.body.giabia+"',`SoPH`='"+req.body.soph+"',`NgayPH`='"+req.body.ngayph+"',`TongSo`='"+req.body.tongso+"',`MaVT`='"+req.body.mavt+"',`NgayCN`='"+req.body.ngaycn+"',`MaNV`='"+req.body.manv+"' WHERE `id`=" +id;
sql = mysql.format(sql, id);

connect.query(sql, function(error){
	if(error) console.log(error.message);
	else{
		console.log("cập nhật thành công");
		//res.redirect('/list', {data:results , message: null});
	}
});
return res.redirect('/list');
});



app.get('/addproduct', function(req, res) { 
	
res.render('views/admin/product/add', {data: null, message: null});
})

/*
thao tác thêm sách vào csdl
*/
app.post('/addproduct',urlencodedParser,function(req,res){

//lấy dữ liệu từ bên form
	var TenTL = req.body.TenTL;
	var TenTheLoai = req.body.TenTheLoai;
	var TenTG = req.body.TenTG ;
	var TenNSX  = req.body.TenNSX;
	var NamXB = req.body.NamXB;
	var TenNgonNgu = req.body.TenNgonNgu;
	var NoiDung = req.body.NoiDung;
	var SoTrang = req.body.SoTrang;
	var KhoGiay = req.body.KhoGiay;
	var LanTB = req.body.LanTB;
	var GiaBia = req.body.GiaBia;
	var SoPH = req.body.SoPH;
	var NgayPH = req.body.NgayPH;
	var TongSo = req.body.TongSo;
	var MaVT = req.body.MaVT;
	var NgayCN = req.body.NgayCN;
	var MaNV = req.body.MaNV;

	// câu lệnh thêm
	var sql = "insert into `tailieu`(`TenTL`,`TenTheLoai`, `TenTG`,`TenNXB`,`NamXB`,`TenNgonNgu`,`NoiDung`,`SoTrang`,`KhoGiay`,`LanTB`,`GiaBia`,`SoPH`,`NgayPH`,`TongSo`,`MaVT`,`NgayCN`,`MaNV`) values('"+TenTL+"','"+TenTheLoai+"','"+ TenTG+"','"+TenNSX+"','"+NamXB+"','"+TenNgonNgu+"','"+NoiDung+"','"+SoTrang+"','"+KhoGiay+"','"+LanTB+"','"+GiaBia+"','"+SoPH+"','"+NgayPH+"','"+TongSo+"','"+MaVT+"','"+NgayCN+"','"+MaNV+"')";
	

	connect.query(sql, function(error){
	if(error) console.log(error.message);
	else{
		console.log("thêm thành công");
		
	}
});
return res.redirect('/list');
});



/*
	xóa sách
*/
app.get('/delete/:id', function(req, res){
	var id = req.params.id;
	var sql = "delete from `tailieu` where id="+id;
	connect.query(sql, function(error){
	if(error) console.log(error.message);
	else{
		console.log("xóa thành công");
		
	}
});
// list lại giao diện sách sau khi đã xóa
return res.redirect('/list');

});

app.get('/detail/:TaiLieuId', function(req, res) { 
   var id = req.params['TaiLieuId'];

   //console.log(id);

  var sql = 'SELECT * FROM tailieuchitiet, tailieu  WHERE TaiLieuId = ? AND tailieuchitiet.TaiLieuId = tailieu.id ' ;
 
	connect.query(sql, [id],function (err, results) {
    if (err) throw err;
  
  //console.log(results);
   res.render('views/admin/product/detail', {dulieu:results , thongbao: null});
	 });
	
	//return res.redirect('/list');
});