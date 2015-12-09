/**
 * inisialisasi router
 */

exports.setup = function(app) {

	var testing = require('../routes/_testing');
	var user = require('../routes/users');
	var postingan = require('../routes/post_data');
	var komentar = require('../routes/post_komentar');
	var like = require('../routes/post_like');
	var image_upload = require('../routes/upload_foto');
//	var uploadfoto = require('../routes/post_upload_image');

//	app.use('/api', testing);
	app.use('/api/post/', postingan);
	app.use('/api/post/', image_upload);
	app.use('/api/komentar/', komentar);
	app.use('/api/like/', like);
	app.use('/api/user/', user);
	
//	app.use(function(req, res, next) {
//		res.type('txt').status(404).send('Tidak dapat mengakses halaman ini');
//	});
};
