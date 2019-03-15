/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

const express = require('express');
const mysql = require('./dbcon.js');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

const homeRoute = require(path.join(__dirname, "routes/index"));
const playerRoute = require(path.join(__dirname, "routes/Player"));
const coachRoute = require(path.join(__dirname, "routes/Coach"));
const frontOfficeRoute = require(path.join(__dirname, "routes/FrontOffice"));
const teamRoute = require(path.join(__dirname, "routes/Team"));

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', '32818');
app.set('mysql', mysql);

app.use('/', homeRoute);
app.use('/', playerRoute);
app.use('/', coachRoute);
app.use('/', frontOfficeRoute);
app.use('/', teamRoute);

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
