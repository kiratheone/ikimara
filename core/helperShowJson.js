/**
 * module helper buat bantu nampilin json di view
 */


exports.showjsontoview = function(res, msg, val) {
	
	var status = 0;
	var pesan = msg;
	if (!msg) {
		status = 1;
		pesan = "sukses";
	}
	
	res.json({
		status : status,
		pesan : pesan,
		data : val
	});
	
};
