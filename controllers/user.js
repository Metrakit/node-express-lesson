var db = require('../lib/db');

exports.index = function(req, res, next) {
	connection = db.connect();
	var request = 'SELECT id, name, login, email FROM user';
	console.log(request);
	connection.query(request, function(err, results) {
		if (err) throw err;
		res.render('users/listing', {users: results});
	});
};

exports.show = function(req, res, next) {
	var username = req.params.username;
	connection = db.connect();
	var request = 'SELECT id, name, login, email, COUNT(*) cc FROM user WHERE login="' + username + '"';
	console.log(request);
	connection.query(request, function(err, results) {
		if (err) throw err;
		if (results[0].cc === 1) {
			res.render('users/profil', {user: results[0], title: "Profil of " + results[0].name});
		} else {
			res.render('users/profil', {user: false});
		}
	});
};
