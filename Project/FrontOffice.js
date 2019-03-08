module.exports = function() {
	var express = require('express');
	var router = express.Router();



	router.POST('/FrontOffice', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO FrontOffice (First_Name, Last_Name, Role, Team) VALUES (?, ?, ?, ?)";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Role, req.body.Team];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			else {
				res.redirect('/FrontOffice');
			}
		});
	});

	router.DELETE('/FrontOffice:ID_FrontOffice', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM FrontOffice WHERE ID_FrontOffice = ?";
		var inserts = [req.params.ID_FrontOffice];
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
