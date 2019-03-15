module.exports = function() {
	var express = require('express');
	var router = express.Router();
	
	/* Coach Home Page*/
	
	//Displays all Coaches
	function getCoach(res, mysql, context, complete) {
		var sql = "SELECT First_Name, Last_Name, Team FROM `Coach` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Coach = results;
			complete();
		});
	};
	
	//Display all Coaches
	router.get('/', function(req, res) {
		callbackCount = 0;
		const context = {};
		context.title = "Coach";
		context.jsscripts = ["deleteCoach.js"];
		var mysql = req.app.get('mysql');
		getCoach(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if(callbackCount >= 1) {
				console.log(context.Coach);
				res.render('Coach', context);
			}
		}
	});
				
	//Create a new Coach
	router.post('/', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Coach` (First_Name, Last_Name, Team) VALUES (?, ?, ?)";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Team];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				return res.status(400).send(JSON.stringify(error));
			}
			else {
				res.redirect('/Coach');
			}
		});
	});

	//Delete a Coach
	/*NEED TO FIX CODE TO HAVE THE FUNCTION CALLED TO REMOVE THE COACH, {{ID_Coach}} is not pulling into Coach.handlebars*/
	router.delete('/:cid', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `COACH` WHERE ID_Coach = ?";
		var inserts = [req.params.cid];
		sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
			if(err) {
				return res.status(400).send(JSON.stringify(err));
			} else {
				res.sendStatus(200).end();
			}
		});
	});
	
	/* Update Coach Page*/
	/*NEED TO UPDATE CODE TO ALLOW UPDATE PAGE TO RENDER, {{ID_Coach}} is not pulling into Coach.handlebars*/
	//Render Update Coach Page
	router.get('/UpdateCoach/:cid', function(req, res) {
		const context = {};
		var mysql = req.app.get('mysql');
		console.log(req.body);
		console.log(req.params.cid);
		var sql = "SELECT First_Name, Last_Name, Team FROM `Coach` WHERE ID_Coach = ?";
		var inserts = [req.params.cid]
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error || results.length == 0) {
				return res.render('404');
			} else {
				context.Coach = results[0];
				res.render("UpdateCoach", context);
			}
		});
	}); 
	
	//Update Coach
	router.post('UpdateCoach/:cid', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "UPDATE Coach SET First_Name = ?, Last_Name = ?, Team = ? WHERE ID_Coach = ?";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Team, req.params.cid];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				return res.render('404');
			} else {
				res.redirect('/Coach');
			}
		});
	});
		
	return router;
}();
