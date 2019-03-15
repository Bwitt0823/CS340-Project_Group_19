module.exports = function() {
	var express = require('express');
	var router = express.Router();
	
	/* Coach Home Page*/
	
	//Displays all Coaches
	function getCoach(res, mysql, context, complete) {
		var sql = "SELECT * FROM `Coach` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Coach = results;
			complete();
		});
	};
	
	//Main Coach Page
	router.get('/', function(req, res) {
		callbackCount = 0;
		const context = {};
		context.title = "Coach";
		context.jsscripts = [];
		var mysql = req.app.get('mysql');
		/*getCoach(res, mysql, context, complete);*/
		function complete() {
			callbackCount++;
			if(callbackCount >= 1) {
				console.log(context.Coach);
				res.render('Coach', context);
			}
		}
		complete();
	});
				

	/*router.POST('/Coach', function(req, res) {
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
	
	router.get('/', function(req, res) {

	router.DELETE('/Coach:ID_Coach', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM Coach WHERE ID_Coach = ?";
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

	router.put('/Coach:ID_Coach', function(req, res) {
		var mysql = req.app.get('mysql');
		console.log(req body);
		console.log(req.params.ID_Team);
		var sql = "UPDATE Coach SET First_Name = ?, Last_Name = ?, Team = ? WHERE ID_Coach = ?";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Team, req.body.ID_Coach]
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
	}); */

	return router;
}();
