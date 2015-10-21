var express = require('express');
var router = express.Router();

var pollController = require('../controllers/poll');

router.get('/', pollController.index)
.get('/list', pollController.list)
.get('/:id', pollController.show)
.post('/create', pollController.create);

module.exports = router;
