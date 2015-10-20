var express = require('express');
var router = express.Router();

var db = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	msg = sess.msg;
	sess.msg = false;

  res.render('index', {title: 'Home page', msg: msg});
})
/* Login page */
.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login page'});
})

/* Login action (POST) */
.post('/login', function(req, res, next) {

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

})

/* Logout page */
.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		console.log('User disconnected');
	});
	res.redirect('/');
})

/* Account page */
.get('/account', function(req, res, next) {
	sess = req.session;
	if (sess.auth) {
		res.render('account');
	} else {
		res.redirect('/login');
	}
})
/* Profil page */
.get('/profil/:username', function(req, res, next) {
	var username = req.params.username;
	
	connection = db.connect();
	var request = 'SELECT id, name, login, email, COUNT(*) cc FROM user WHERE login="' + username + '"';
	console.log(request);
	connection.query(request, function(err, results) {
		if (err) throw err;
		if (results[0].cc === 1) {
			res.render('profil', {user: results[0]});
		} else {
			res.render('profil', {user: false});
		}
	});
	
})
/* User list page */
.get('/user-list', function(req, res, next) {
	connection = db.connect();
	var request = 'SELECT id, name, login, email FROM user';
	console.log(request);
	connection.query(request, function(err, results) {
		if (err) throw err;
		res.render('listing', {users: results});
	});
	
})
/* Search action (POST) */
.post('/search', function(req, res, next) {
	
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

});

module.exports = router;
