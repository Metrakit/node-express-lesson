var config = require('../config/db.json');
var mysql  = require('mysql');

/* DB connection (mysql) */
exports.connect = function() {
	var connection = mysql.createConnection({
		host     : '192.168.1.51',
		user     : 'root',
		password : '0000',
		database : 'node'
	});

	connection.connect(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connecté à MySQL');
		}
	});
	return connection;
};
