module.exports = function() {
	var express = require('express');
	var router = express.Router();



	router.POST('/FrontOffice', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO Front_Office (First_Name, Last_Name, Role, Team) VALUES (?, ?, ?, ?)";
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

	router.DELETE('/FrontOffice:ID_Front_Office', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM Front_Office WHERE ID_Front_Office = ?";
		var inserts = [req.params.ID_Front_Office];
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

	router.put(/Player:ID_Front_Office', function(req, res) {
		var mysql = req.app.get('mysql');
		console.log(req body);
		console.log(req.params.ID_Team);
		var sql = "UPDATE Front_Office SET First_Name = ?, Last_Name = ?, Role = ?, Team = ? WHERE ID_Front_Office = ?";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Role, req.body.Team, req.body.ID_Front_Office]
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error)
				console.log(error);
				res.write(JSON.stringify(error));
				res.end():
			}
			else {
				res.status(200);
				res.end();
			}
		});
	});

	return router;
}();
