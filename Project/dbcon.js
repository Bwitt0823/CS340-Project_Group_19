var mysql = require(‘mysql’);
var pool = mysql.createPool({
connectionLimit : 10,
host            : ‘classmysql.engr.oregonstate.edu’, 
user            : ‘cs340_swidera’,
password        : ‘3356’,
database        : ‘cs340_swidera’
});
module.exports.pool = pool;