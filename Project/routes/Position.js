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
	
	/* Position Home Page*/
	
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
  
  //Displays all Players
	function getPlayer(res, mysql, context, complete) {
		var sql = "SELECT ID_Player AS pid, First_Name, Last_Name, Team FROM `Player`";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Player = results;
			complete();
		});
	};
	
	
	//Display all Coaches and Players
	router.get('/', function(req, res) {
		var callbackCount = 0;
		const context = {};
		context.title = "Coach";
		//context.jsscripts = ["deleteCoach.js"];
		var mysql = req.app.get('mysql');
		getTeam(res, mysql, context, complete);		
		getCoach(res, mysql, context, complete);
    		getPlayer(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if(callbackCount >= 3) {
				console.log(context.Coach);
				console.log(context.Player);
				res.render('Coach', context);
				res.render('Player', context);
			}
		}
	});
				
