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
		port:8889,
    multipleStatements: true
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

router.get('/search', function(req, res){
  
    var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      if (err) throw err;
      var getId= rows[0]['id'];
      //console.log(rows[0]['id']);        
      function getPNOP(){
          return new Promise(function(resolve, reject){
              var rows = rows;
               var queryString ='SELECT * FROM nurse n JOIN mypatient mp ON n.id=mp.id_nurse JOIN patient p ON p.id=mp.id_patient JOIN Adresse adr ON p.AdressID=adr.id WHERE n.id = ? AND p.name like ? OR p.lastname like ?';   
                 connection.query(queryString,[getId, req.query.search, req.query.search], function(err, rows, fields){
                  if(err){
                      reject(err);
                  }
                  resolve(rows);
              });
          });
      }
      getPNOP().then(function(PNOP){
          var getAccess ='SELECT * FROM Access a JOIN Patient p ON p.id= a.id_patient JOIN Adresse adr ON adr.id=p.AdressID WHERE a.id_nurse = ? AND p.name like ? OR p.lastname like ?';
           connection.query(getAccess,[getId,req.query.search, req.query.search], function (err,rowss,fileds) {             
              //console.log(sender); 
               if (err) throw err; 
                var sender= JSON.stringify(rowss);
                //console.log(sender);             
                var mergeObj = Object.assign(PNOP,rowss);                
                 res.send(JSON.stringify(mergeObj));                      
          });
      }).catch(function(err){
          console.log("An error occured");
      });
    });

 });
router.get('/delete', function (req,res){
    // var todelete = req.query.id;  
    console.log(req.query.id);
     var delquery1 ="DELETE FROM patient WHERE id ="+req.query.id;
      var delquery2 ="DELETE FROM mypatient WHERE id_patient ="+req.query.id;;
       var delquery3 ="DELETE FROM Access WHERE id_patient= "+req.query.id;;
          console.log(delquery1);
     connection.query(delquery1,delquery2,function(err,rows,fields) {
          if (err) throw err;
            connection.query(delquery3,function(err,rows,fields) {
                  if (err) throw err;
                  res.send('patient deleted');
            })
     });   




});



module.exports = router;