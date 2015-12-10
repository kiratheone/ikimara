var express = require('express');
var router = express();
var crud = require('mysql-crud');
var helperview = require('../core/helperShowJson');

router.get('/id/:id', function(req, res) {
	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.load({
		id_user : req.params.id
	}, function(err, val) {
		var msg = err;
		if (val.length <= 0) {
			msg = "user tidak ditemukan";
		}
		helperview.showjsontoview(res, msg, val);
	});

});

router.post('/login', function(req, res) {
	var jsonData = req.body;
	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.load({
		username : jsonData.username,
		pasword : jsonData.password,
	}, function(err, val) {
		var msg = err;
		if (val.length <= 0) {
			msg = "Username atau Password salah";
		}
		helperview.showjsontoview(res, msg, val);
	});

});

router.post('/register', function(req, res) {
	var jsonData = JSON.parse(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.create(jsonData, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/update', function(req, res) {
	var jsonData = JSON.stringify(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.update({
		id_user : jsonData.id_user
	}, jsonData, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/delete', function(req, res) {
	var jsonData = JSON.stringify(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.destroy({
		id_user : jsonData.id_user
	}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

module.exports = router;