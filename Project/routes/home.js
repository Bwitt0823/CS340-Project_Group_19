module.exports = function() {
	const express = require('express');
	const router = express.Router();
	
	//Render Home Page
	router.get('/', function(req, res) {
		const context = {};
		context.jsscripts = [];
		context.title = "Home";
		res.render('index', context);
	});

	
return router;
}();
