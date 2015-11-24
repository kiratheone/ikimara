var express = require('express');
var router = express();
var crud = require('mysql-crud');

router.get('/testing', function(req, res) {

	var user_crud = crud(req.mysql, 'ikimara_user');
	user_crud.load({}, function(err, val) {
		res.json({
			sukses : val,
			gagal : err
		});
	});

});

router.post('/testing/post', function(req, res) {
	
	console.log(req.body);
	if (Object.keys(req.body).length <= 0) {
		res.json({
			message : "no data"
		});
	}else {
		res.json(res.body);
	}
});

module.exports = router;