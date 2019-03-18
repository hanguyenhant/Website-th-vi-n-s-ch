// Khoi tao server
const express = require("express");
const jsonParser = require("body-parser") ; 
var app = express();   
app.listen(3000, function() {console.log("Server is running")});

app.use(jsonParser.urlencoded({ extended: true }));
 
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
app.get('/', function(req, res) { 
	res.render('public/trangchu', {data: null, message: null});
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
			res.render('public/trangchu', {data: null, message:'error'}); 
		}
    // Dung => chuyen sang trang da dang nhap
		else {
			res.render('public/trangchu', {data: req.body.username, message: 'ok'});
		}
	}) 
}) 
 