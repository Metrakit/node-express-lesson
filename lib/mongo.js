var mongoose = require('mongoose');
var config   = require('../config/mongo');

/* DB connection */
exports.connect = function() {
	mongoose.connect('mongodb://' + config.host +'/' + config.database);
};