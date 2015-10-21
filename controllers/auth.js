var db = require('../lib/db');

exports.login = function(req, res, next) {
	res.render('login', {title: 'Login page'});
};

exports.postLogin = function(req, res, next) {

	req.checkBody('email', 'Adresse e-mail invalide')
		.notEmpty()
		.withMessage('E-mail requis');
	req.checkBody('password', 'Mot de passe invalide')
		.notEmpty().withMessage('Password requis')
		.len(6, 20).withMessage('Password entre 6 et 20 charactères');
	req.sanitizeBody('remember').toBoolean();

	// Validation errors
	var errors = req.validationErrors(true);
	
	// Get the fields
	var fields = req.body;
	
	if (errors) {
		res.render('login', {errors: errors, fields: fields});
	} else {
		connection = db.connect();
		var request = 'SELECT * , COUNT(*) auth FROM user WHERE email="' + fields.email + '" AND password="' + fields.password + '"';
		console.log(request);
		connection.query(request, function(err, results) {
			if (err) throw err;
			if (results[0].auth === 1) {
				sess = req.session;
				sess.user = results[0];
				sess.auth = true;
				sess.msg = "Vous êtes connecté";
				res.redirect('/');
			} else {
				sess.auth = false;
				res.render('login', {errors: true});
			}
		});
	}

};

exports.logout = function(req, res, next) {
	req.session.destroy(function(err) {
		console.log('User disconnected');
	});
	res.redirect('/');
};

exports.account = function(req, res, next) {
	sess = req.session;
	if (sess.auth) {
		res.render('account');
	} else {
		res.redirect('/login');
	}
};