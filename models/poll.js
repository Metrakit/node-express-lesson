var mongoose     = require('mongoose');
var pollSchema   = mongoose.Schema({ip: 'String'});
var answerSchema = mongoose.Schema({answer: 'String', votes: [pollSchema]});

exports.voteSchema = mongoose.Schema({
	question: {type: 'String', required: true},
	choices: [answerSchema]
});