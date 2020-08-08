var mysql = require('mysql');

var conMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'sistemas_vendas'
	});
}

module.exports = function() {
	return conMySQL;
}	