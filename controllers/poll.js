var mongoose    = require('mongoose');
var mongoConfig = require('../config/mongo');
var db          = mongoose.createConnection(mongoConfig.host, mongoConfig.database);
var voteSchema  = require('../models/poll').voteSchema;
var vote        = db.model('votes', voteSchema);

exports.index = function(req, res, next) {
	res.render('polls/index');
};

exports.list = function(req, res, next) {
	res.render('polls/list');
};

exports.show = function(req, res, next) {
	res.render('polls/show');
};

exports.create = function(req, res, next) {
	res.render('polls/show');
};