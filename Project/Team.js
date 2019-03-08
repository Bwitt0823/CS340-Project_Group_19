module.exports = function() {
	var express = require('express');
	var router = express.Router();



	router.POST('/Team', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO Team (Abbreviation, Name, City, State, Country, Stadium) VALUES (?, ?, ?, ?, ?, ?)";
		var inserts = [req.body.Abbreviation, req.body.Name, req.body.City, req.body.State, req.body.Country, req.body.Stadium];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			else {
				res.redirect('/Player');
			}
		});
	});

	router.DELETE('/Team:ID_Team', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM Team WHERE ID_Team = ?";
		var inserts = [req.params.ID_Team];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error)
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			}
			else {
				res.status(202).end();
			}
		})
	});

	return router;
}();
