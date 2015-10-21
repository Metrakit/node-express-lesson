var mongoose     = require('mongoose');
var pollSchema   = mongoose.Schema({ip: 'String'});
var answerSchema = mongoose.Schema({answer: 'Text', votes: [pollSchema]});

exports.voteSchema = mongoose.Schema({
	question: {type: 'String', required: true},
	choice: [answerSchema]
});