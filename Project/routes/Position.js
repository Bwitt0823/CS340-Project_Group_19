module.exports = function() {
	var express = require('express');
	var router = express.Router();
	
	function getPosition(res, mysql, context, complete) {
		var sql = "SELECT * FROM `Position` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Position = results;
			complete();
	};
						 
	function getPlayer(res, mysql, context, complete) {
		var sql = "SELECT * FROM `Player` WHERE 1";
		mysql.pool.query(sql, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.Player = results;
			complete();
	};
						 
	router.get('/', function(req, res) {
			var callbackCount = 0;
			const contect = {};
			context.title = "Position";
			context.jsscripts = [];
			var mysql = req.app.get('mysql');
			getPlayer(res,mysql, context, complete);
			getPosition(res, mysql, context, complete);
			function complete() {
				callbackCount++;
				if(callbackCount >= 1) {
					console.log(context.Position);
					res.render('Position', context);
				}
			}
		});
	
	return router;
}();
