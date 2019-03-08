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

	router.DELETE('/:ID_Coach', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = 'DELETE FROM Coach WHERE ID_Coach = ?";
		var inserts = [req.params.ID_Coach];
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
