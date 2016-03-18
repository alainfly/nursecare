var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var mysql = require('mysql');

var connection = mysql.createConnection({

		host :'localhost',
		port:'8889',
		user:'root',
		password:'root',
		database : 'nursecare',
		port:8889
});
connection.connect();
 
var jwtCheck = jwt({
  secret: new Buffer('3u9AlPPPxcDEuw2SN6hWSr5bBwxHxrUjfttumgwQZyqHDUvN9k5Kj56Hp2AZ9-xe', 'base64'),
  audience: 'pmYggLekcku5rsj8j9EGPXMyxBWBcQ7J'
});
// middleware that is specific to this router
router.use('/',jwtCheck);
router.use(function timeLog(req, res, next) {
  console.log(__dirname, Date.now());
  next();
});
// define the home page route
router.get('/local', function(req, res) {
  //res.send('Birds home page');
     var queryString ='SELECT name, lastname, email FROM nurse where nurse.email = ?';     
    connection.query(queryString,[req.query.email], function(err, rows, fields) {
    if (err) throw err; 
    console.log(JSON.stringify(rows));  
    for (var i=0; i<rows.length; i++) {
        console.log(rows[i].name);  
        res.send({
          nom:rows
         });     
       }
       
    }); 
connection.end();
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');

});

module.exports = router;