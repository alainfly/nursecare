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
// search client id with client email, then get all client's patient 
router.get('/patient', function(req, res){
    var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      if (err) throw err;
      var getId= rows[0]['id'];
      console.log(rows[0]['id']); 
      var queryString ='SELECT * FROM nurse n JOIN mypatient mp ON n.id=mp.id_nurse JOIN patient p ON p.id=mp.id_patient WHERE n.id = ?';   
      connection.query(queryString,[getId], function(err, rows, fields) {
      if (err) throw err; 
      //console.log(JSON.stringify(rows)); 
      var sender= JSON.stringify(rows)
        res.send(sender);  
        //connection.end();
    });

    });

});

router.get('/detailPatient', function(req, res){
    //var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    //connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      //if (err) throw err;
     // var getId= rows[0]['id'];
      console.log(req.query.id); 
      var queryS ='SELECT * FROM patient where patient.id = ?';   
      connection.query(queryS,[req.query.id], function(err, rows, fields) {
      if (err) throw err; 
      //console.log(JSON.stringify(rows)); 
      var sender= JSON.stringify(rows);
        res.send(sender);  
        //connection.end();
    });

  });

// define the about route
router.get('/log', function(req, res) {
  res.send('About birds');
});

module.exports = router;