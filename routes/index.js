var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index');
var authController = require('../controllers/auth');

/* GET home page. */
router.get('/', indexController.home)
/* Login page */
.get('/login', authController.login)
/* Login action (POST) */
.post('/login', authController.postLogin)
/* Logout page */
.get('/logout', authController.logout)
/* Account page */
.get('/account', authController.account)
/* Search action (POST) */
.post('/search', indexController.search);

module.exports = router;
