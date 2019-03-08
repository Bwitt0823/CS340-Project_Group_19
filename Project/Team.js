Smodule.exports = function() {
	var express = require('express');
	var router = express.Router();



router.POST('/Team', function(req, res) {
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO Coach (Abbreviation, Name, City, State, Country, Stadium) VALUES (?, ?, ?, ?, ?, ?)";
	var inserts = [req.body.Abbreviation, req.body.Name, req.body.City, req.body.State, req.body.Country, req.body.Stadium];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		else {
			res.redirect('/Team');
		}
	});
});
