module.exports = function() {
	var express = require('express');
	var router = express.Router();

	//Render Home Page
	router.get('/', function(req, res) {
		const context = {};
		context.jsscripts = [];
		context.title = "Home";
		res.render('index', context);
	});

	/*router.POST('/Team', function(req, res) {
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

	router.DELETE('/Team:Abbreviation', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM Team WHERE Abbreviation = ?";
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

	router.put('/Team:Abbreviation', function(req, res) {
		var mysql = req.app.get('mysql');
		console.log(req body);
		console.log(req.params.ID_Team);
		var sql = "UPDATE Team SET Name = ?, City = ?, State = ?, Country = ?, Stadium = ? WHERE ID_Team = Abbreviation";
		var inserts = [req.body.Name, req.body.City, req.body.State, req.body.Country, req.body.Stadium, req.body.Abbreviation]
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
	});*/
				       
	return router;
}();
