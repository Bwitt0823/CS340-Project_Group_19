module.exports = function() {
	var express = require('express');
	var router = express.Router();



	router.POST('/Player', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO Player (First_Name, Last_Name, College, Number, Team) VALUES (?, ?, ?, ?, ?)";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.College, req.body.Number, req.body.Team];
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

	router.DELETE('/Player:ID_Player', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM Player WHERE ID_Player = ?";
		var inserts = [req.params.ID_Player];
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
