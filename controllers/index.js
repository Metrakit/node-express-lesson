var db = require('../lib/db');

exports.home = function(req, res, next) {
	sess     = req.session;
	msg      = sess.msg;
	sess.msg = false;
  res.render('index', {title: 'Home page', msg: msg});
};

exports.search = function(req, res, next) {
	// Get the fields
	var fields = req.body;
	
	connection = db.connect();
	var request = 'SELECT id, name, login, email, COUNT(*) cc FROM user WHERE login LIKE "%' + fields.keyword + '%" OR name LIKE "%' + fields.keyword + '%" OR email LIKE "%' + fields.keyword + '%"';
	console.log(request);
	connection.query(request, function(err, results) {
		if (err) throw err;
		if (results[0].cc >= 1) {
			res.render('search', {users: results});
		} else {
			res.render('search', {users: false});
		}
	});
};

