var express = require('express');
var router = express();
var crud = require('mysql-crud');
var multer = require('multer');
var helperview = require('../core/helperShowJson');
var path = require('path');
var upload = multer({
	dest : path.join(__dirname, '../uploads/images'),
	rename: function (fieldname, filename) {
	    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
	  }
});

router.get('/image/test', function(req, res) {
	// console.log(__dirname+'/../uploads/image');
	res.type('txt').send(path.join(__dirname, '../uploads/images'));

});

router.post('/image/upload', upload.single('image'), function(req, res) {
	console.log(req.body);
	console.log("-----------------");
	console.log(req.file);
	res.type('txt').send('welldone');
});

module.exports = router;