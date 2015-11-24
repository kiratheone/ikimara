/**
 * inisialisasi router
 */

exports.setup = function(app) {

	var testing = require('../routes/_testing');
	var postingan = require('../routes/postingan');
	var uploadfoto = require('../routes/post_upload_image');

	app.use('/api', testing);
	app.use('/api/post/', postingan);
	app.use('/api/post/', uploadfoto);
	app.use(function(req, res, next) {
		res.type('txt').status(404).send('Tidak dapat mengakses halaman ini');
	});
};
