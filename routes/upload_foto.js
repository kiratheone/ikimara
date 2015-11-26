var express = require('express');
var router = express();
var crypto = require('crypto');
var crud = require('mysql-crud');
var multer = require('multer');
var helperview = require('../core/helperShowJson');
var path = require('path');

var storage = multer.diskStorage({
	destination : path.join(__dirname, '../uploads/images'),
	filename : function(req, file, cb) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			if (err) {
				return cb(err);
			}
			cb(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});
var upload = multer({
	storage : storage
});

router.get('/image/test', function(req, res) {
	// console.log(__dirname+'/../uploads/image');
	res.type('txt').send(path.join(__dirname, '../uploads/images'));

});

router.post('/image/upload', upload.single('image'), function(req, res) {
	console.log(req.body);
	console.log("-----------------");
	console.log(req.file);
	var user_crud = crud(req.mysql, 'ikimara_post');
	user_crud.update({
		id_post : req.body.id_post
	}, {
		gambar : req.file.filename
	}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});
});

module.exports = router;