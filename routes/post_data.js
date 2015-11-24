var express = require('express');
var router = express();
var crud = require('mysql-crud');
var helperview = require('../core/helperShowJson');

router.get('/all', function(req, res) {
	var user_crud = crud(req.mysql, 'ikimara_view_post');
	user_crud.load({}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/add', function(req, res) {
	var jsonData = JSON.parse(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_post');
	user_crud.create(jsonData, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/delete', function(req, res) {
	var jsonData = JSON.stringify(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_post');
	user_crud.destroy({
		id_post : jsonData.id_post
	}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});

router.post('/update', function(req, res) {
	var jsonData = JSON.stringify(req.body.jsondata);
	var user_crud = crud(req.mysql, 'ikimara_post');
	user_crud.update({
		id_post : jsonData.id_post
	}, jsonData, function(err, val) {
		helperview.showjsontoview(res, err, val);
	});

});
module.exports = router;