module.exports = function() {
	var express = require('express');
	var router = express.Router();
	
	function getPosition(res, mysql, context, complete) {
		var sql = "SELECT ID_Position, Position_Group FROM `Position` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Position = results;
			complete();
		});
	 };
						 
	function getPlayer(res, mysql, context, complete) {
		var sql = "SELECT ID_Player, First_Name, Last_Name, Team FROM `Player` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Player = results;
			complete();
		});
	};
						 
	router.get('/', function(req, res) {
			var callbackCount = 0;
			const context = {};
			context.title = "Position";
			context.jsscripts = [];
			var mysql = req.app.get('mysql');
			getPlayer(res,mysql, context, complete);
			getPosition(res, mysql, context, complete);
			function complete() {
				callbackCount++;
				if(callbackCount >= 2) {
					console.log(context.Position);
					res.render('Position', context);
				}
			}
		});
			
	router.post('/', function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Player_Position` (ID_Player, ID_Position) VALUES (?,?)";
		var inserts = [req.body.player, req.body.position];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				return res.status(400).send(JSON.stringify(error));
			} else {
				res.redirect('/Position');
			}
		});
	});
	
	return router;
}();
