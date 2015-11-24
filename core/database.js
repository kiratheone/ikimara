/**
 * database setup
 */

exports.setup = function (app) {
	var db = require('mysql');

	var connection = db.createPool({
		  host     : '127.0.0.1',
		  user     : 'root',
		  password : '',
		  database : 'ikimaradb'
		});
	
	
	app.use(function(req, res, next) {
		req.mysql   = connection;
        next();
	});
	
};
