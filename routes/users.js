var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.index)
/* Show profil */
.get('/:username', userController.show);

module.exports = router;
