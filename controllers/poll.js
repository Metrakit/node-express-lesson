var mongoose    = require('mongoose');
var mongoConfig = require('../config/mongo');
var db          = mongoose.createConnection(mongoConfig.host, mongoConfig.database);
var voteSchema  = require('../models/poll').voteSchema;
var vote        = db.model('votes', voteSchema);

exports.index = function(req, res, next) {
	res.render('polls/index');
};

exports.list = function(req, res, next) {
	vote.find({}, function(error, results) {
		res.render('polls/list', {votes: results});
	});
};

exports.show = function(req, res, next) {
	var id = req.params.id;
	vote.findById(id, function(err, result) {
		console.log(result);
	});
	res.render('polls/show');
};

exports.create = function(req, res, next) {
	record = {
		question: 'Quel est votre langage préféré ?',
		choices: [
			{
				answer: 'PHP',
				votes: [{ip: '192.168.1.1'}, {ip: '192.168.1.2'}, {ip: '192.168.1.3'}]
			},
			{
				answer: 'Node.js',
				votes: [{ip: '192.168.1.6'}, {ip: '192.168.1.11'}, {ip: '192.168.1.9'}, {ip: '192.168.1.20'}]
			},
			{
				answer: 'Assembleur x86',
				votes: [{ip: '192.168.1.5'}, {ip: '192.168.1.12'}]
			},
			{
				answer: 'Chinois',
				votes: [{ip: '192.168.1.22'}, {ip: '192.168.1.14'}]
			}
		]
	};

	var voteModel = new vote(record);
	voteModel.save(function(err, result) {
		if (err | !result) {
			console.log('ERREUR créaton mongo');
		}
		res.json(result);
	});

	//res.render('polls/show');
};