module.exports = function() {
	var express = require('express');
	var router = express.Router();



router.POST('/Coach', function(req, res) {
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO Coach (First_Name, Last_Name, Team) VALUES (?, ?, ?)";
	var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Team];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		else {
			res.redirect('/Coach');
		}
	});
});
