var express = require('express');
var router = express();
var crud = require('mysql-crud');
var helperview = require('../core/helperShowJson');

router.get('/idpost/:id', function(req, res) {
	var user_crud = crud(req.mysql, 'ikimara_like');
	user_crud.load({
		id_post : req.params.id
	}, function(err, val) {
		var msg = err;
		if (val.length <= 0) {
			msg = "postingan tidak ditemukan";
		}
		helperview.showjsontoview(res, msg, val);
	});

});

router.post('/add', function(req, res) {
	var jsonData = JSON.parse(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_like');
	user_crud.create(jsonData, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/delete', function(req, res) {
	var jsonData = JSON.stringify(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_like');
	user_crud.destroy({
		id_post : jsonData.id_post
	}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

module.exports = router;