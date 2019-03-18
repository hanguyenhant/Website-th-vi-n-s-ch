const express = require("express");
const jsonParser = require("body-parser") ;
const mysql = require("mysql");  
// var flash = require('express-flash');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
 
var app = express(); 
// app.use(cookieParser('secretString'));
// app.use(session({cookie: { maxAge: 60000 }}));
// app.use(flash());


app.set('views', __dirname);
// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(jsonParser.urlencoded({ extended: true })); 
var path = require ('path');
app.use(express.static(path.join(__dirname + '.../public')));
 
// Ket noi nodejs voi mysql
var con = mysql.createConnection({
	database: 'laptrinhweb',
	host: 'localhost',
	user: 'root',
	password: '123456'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
});
 
app.get('/', (req, res) => {

	// console.log("Lay duoc: " + req.query.message);
	res.render('front-end/trangchu', {data: null, message: null});
})
app.post('/login', function(req, res) {
	var sql = "select * from login where TenTk = ? and MatKhau = ?";
	sql = mysql.format(sql, [req.body.username, req.body.password]);
	con.query(sql, function(err, results) {
		if(err) throw err;
		if (results.length == 0) { 
			res.render('front-end/trangchu', {data: null, message:'error'});
			//res.redirect('/?message=' + 'error'); 
		}
		else {
			res.render('front-end/trangchu', {data: req.body.username, message: 'ok'});
		}
	}) 
}) 

app.listen(3000, () => console.log("Server is running"));