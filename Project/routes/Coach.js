module.exports = function() {
	var express = require('express');
	var router = express.Router();
	
	//Get access to Team table for the drop down menus
	 function getTeam(res, mysql, context, complete){
		var sql = "SELECT Abbreviation FROM `Team`";
        	mysql.pool.query(sql, function(error, results, fields){
            		if(error){
                		res.write(JSON.stringify(error));
                		res.end();
           		}
           		context.Team  = results;
            		complete();
        	});
    	}
	
	/* Coach Home Page*/
	
	//Displays all Coaches
	function getCoach(res, mysql, context, complete) {
		var sql = "SELECT ID_Coach AS cid, First_Name, Last_Name, Team FROM `Coach`";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Coach = results;
			complete();
		});
	};
	
	//Displays Selected Coach
	/*function getCoachUpdate(res, mysql, context, complete) {
		var sql = "SELECT First_Name, Last_Name, Team FROM `Coach` WHERE ID_Coach = ?";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Coach = results;
			complete();
		});
	};*/
	
	//Display all Coaches
	router.get('/', function(req, res) {
		var callbackCount = 0;
		const context = {};
		context.title = "Coach";
		context.jsscripts = ["deleteCoach.js"];
		var mysql = req.app.get('mysql');
		getTeam(res, mysql, context, complete);		
		getCoach(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if(callbackCount >= 2) {
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
	router.delete('/:cid', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM `Coach` WHERE ID_Coach = ?";
		var inserts = [req.params.cid];
		sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
			if(err) {
				return res.status(400).send(JSON.stringify(err));
			} else {
				res.status(202).end();
			}
		});
	});
	
	/* Update Coach Page*/
	
	//Display to Update Coach
	router.get('/UpdateCoach/:cid', function(req, res) {
		var callbackCount = 0;
		const context = {};
		context.title = "UpdateCoach";
		context.jsscripts = [];
		var mysql = req.app.get('mysql');
		var sql = "SELECT First_Name, Last_Name FROM `Coach` WHERE ID_Coach=?";
		var inserts = [req.params.cid];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(errror) {
				return res.render('404');
			};
		});
		getTeam(res, mysql, context, complete);		
		/*getCoach(res, mysql, context, complete);*/
		function complete() {
			callbackCount++;
			if(callbackCount >= 2) {
				console.log(context.Coach);
				res.render('UpdateCoach', context);
			}
		}
	});
	
	//Update Coach
	router.post('/UpdateCoach/:cid', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "UPDATE `Coach` SET First_Name = ?, Last_Name = ?, Team = ? WHERE ID_Coach = ?";
		var inserts = [req.body.First_Name, req.body.Last_Name, req.body.Team, req.params.cid];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				re.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/Coach');
			}
		});
	});
		
	return router;
}();
