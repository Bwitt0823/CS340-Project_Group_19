function executeQuery(options, cb) {
if(!options || !options.sql)
  throw (new Error('Invalid sql statement')); 
db.query(options.sql, function (err, result, fields) {
        if (err) throw err;
        cb(result);
    });
}

//Prints player table
    function fetchPlayer(res){
            var options = {
               sql : 'SELECT * FROM Player'
            }
            executeQuery(options, function(result){
            res.write("<table>");
            res.write("<tr>");
            for(var column in result[0]){
                res.write("<td><label>" + column + "</label></td>");
            }
            res.write("</tr>");
            for(var row in result){
                res.write("<tr>");
                for(var column in result[row]){
                    res.write("<td><label>" + result[row][column] + "</label></td>");       
                }
                res.write("</tr>");         
            }
            res.write("</table>");
        });
    }
