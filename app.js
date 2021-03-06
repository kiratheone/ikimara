var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./core/route');
var db = require('./core/database');

var app = express();
var crud = require('mysql-crud');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// DB setup
db.setup(app);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

var GeoJSON = require('geojson');

app.get('/web', function(req, res, next) {

	var user_crud = crud(req.mysql, 'ikimara_view_post');
	user_crud.load({}, function(err, val) {
		var value = JSON.stringify(val);

		GeoJSON.parse(JSON.parse(value), {
			Point : [ 'latitude', 'longitude' ]
		}, function(geojson) {
			console.log(JSON.stringify(geojson));
		});

		res.render('webview', {
			data : value
		});
	});
});

app.get('/geojson', function(req, res, next) {

	var user_crud = crud(req.mysql, 'ikimara_geojson');
	user_crud.load({}, function(err, val) {
		var value = JSON.stringify(val);

		GeoJSON.parse(JSON.parse(value), {
			Point : [ 'latitude', 'longitude' ]
		}, function(geojson) {
			res.json(geojson.features);
		});
	});
});
// router setup
router.setup(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
