var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var mysql = require('mysql');

var connection = mysql.createConnection({
		host :'localhost',
		port:'8889',
		user:'root',
		password:'root',
		database :'nursecare',
		port:8889
});

//connection.connect();
 
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

//return clientID to client  
router.get('/getid',function(req,res){
	
	var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      if (err) throw err;
      var getId= JSON.stringify(rows[0]['id']);
      res.send(getId);

	});
});

module.exports = router;