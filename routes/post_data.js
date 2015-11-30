var express = require('express');
var router = express();
var crud = require('mysql-crud');
var helperview = require('../core/helperShowJson');

router.get('/show/:title', function(req, res) {

	var opt;

	if (req.params.title === 'all') {
		opt = '';
	} else if (req.params.title === 'mostliked') {
		opt = {
			custom : "ORDER BY suka DESC"
		};

	} else if (req.params.title === 'time') {
		opt = {
			custom : "ORDER BY tanggal_upload ASC"
		};

	} else if (req.params.title === 'random') {
		opt = {
			custom : "ORDER BY RAND()"
		};
	}

	else {
		var msg = "parameter ngawur";
		helperview.showjsontoview(res, msg, '');
		return;
	}

	var user_crud = crud(req.mysql, 'ikimara_view_post');
	user_crud.load({}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	}, opt);

	// res.type('txt').send(req.params.title);

});

router.post('/show/more', function(req, res) {
	
	var opt = {
			custom : "AND waktu > " + req.body.waktu
		};
	var user_crud = crud(req.mysql, 'ikimara_view_post');
	user_crud.load({}, function(err, val) {
		helperview.showjsontoview(res, err, val);
	}, opt);

	// res.type('txt').send(req.params.title);

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