var express = require('express');
var router = express.Router();

var pollController = require('../controllers/poll');

router.get('/', pollController.index)
.get('/list', pollController.list)
.get('/create', pollController.create)
.get('/:id', pollController.show);

module.exports = router;
