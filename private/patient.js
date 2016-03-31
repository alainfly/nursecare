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
// search client id with client email, then get all client's patient 

router.get('/patient', function(req, res){
  
    var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      if (err) throw err;
      var getId= rows[0]['id'];
      //console.log(rows[0]['id']);        
      function getPNOP(){
          return new Promise(function(resolve, reject){
              var rows = rows;
               var queryString ='SELECT * FROM nurse n JOIN mypatient mp ON n.id=mp.id_nurse JOIN patient p ON p.id=mp.id_patient JOIN Adresse adr ON p.AdressID=adr.id WHERE n.id = ?';   
                 connection.query(queryString,[getId], function(err, rows, fields){
                  if(err){
                      reject(err);
                  }
                  resolve(rows);
              });
          });
      }
      getPNOP().then(function(PNOP){
          var getAccess ='SELECT * FROM Access a JOIN Patient p ON p.id= a.id_patient JOIN Adresse adr ON adr.id=p.AdressID WHERE a.id_nurse = ? ';
           connection.query(getAccess,[getId], function (err,rowss,fileds) {             
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

//Permission on patient file 
router.get('/access', function(req, res){
  console.log(req.query.id);
var queryaccess ='SELECT name, lastname FROM nurse n JOIN Access a ON n.id=a.id_nurse WHERE a.id_patient = ? ';   
      connection.query(queryaccess,[req.query.id], function(err, rows, fields) {        
      if (err) throw err; 
      var accesCB= JSON.stringify(rows);
      console.log(accesCB);
        res.send(rows); 
      });
});
//return list of nurse
router.get('/nurse',function(req,res){
  var querynurse = 'SELECT name, lastname, id FROM nurse';
  connection.query(querynurse, function(err,rows,fields){
    res.send(JSON.stringify(rows));
  });
});
//Adding permition and access to table Access (access on patient record)
router.get('/addaccess', function (req,res){
    var queryAddaccess= 'INSERT INTO Access SET ?';
    var varAccess = {
                    id_patient : req.query.idpatient,
                    id_nurse : req.query.idnurse
                }
    connection.query(queryAddaccess,varAccess, function(err, rows,fields){
      res.send('permission created');
    });
});
//return Patient with adresse
router.get('/detailPatient', function(req, res){
       console.log(req.query.id); 
      var queryS ='SELECT * FROM patient p JOIN Adresse adr ON p.id = adr.id where p.id = ?';   
      connection.query(queryS,[req.query.id], function(err, rows, fields) {
      if (err) throw err; 
      //console.log(JSON.stringify(rows)); 
      var sender= JSON.stringify(rows);
        res.send(sender);  
        //connection.end();
    });
  });
router.get('/postcode', function(req, res){ 
      var postQ ='SELECT * FROM postalcode';   
      connection.query(postQ,function(err, rows, fields) {
         //console.log(rows); 
      if (err) throw err; 
      //console.log(JSON.stringify(rows)); 
      var sender= JSON.stringify(rows);
        res.send(sender);  
        //connection.end();
    });
  });
router.get('/addPatient', function(req, res){
      //Get Patient id and create new adresse 
      var check_P ='SELECT * FROM Patient WHERE SIS = ? AND birth_date=?';   
      connection.query(check_P,[req.query.SIS,req.query.birth_date], function(err, rows, fields) {
      if (err) throw err; 
      if (!rows.length) {
                var save_adress = 'INSERT INTO Adresse SET ? ';
                var adresse = { patient_sis:req.query.SIS, 
                                street:req.query.street, 
                                houseNum: req.query.housenumber,                                
                                Postalcode:req.query.postalcode, 
                                country:req.query.country
                                };
        //get new patient's id adresse                        
        connection.query(save_adress,adresse,function(err,rows,fields){
          var SaveId = rows.insertId; 
         if(err) throw err;
                var AddPatient='INSERT into patient SET ?';
                var Access='INSERT into Access SET ?';
                var AccessObj= {
                                id_patient: SaveId,
                                id_nurse : req.query.idnurse
                                } 
                    
                var patientjSON = {
                    SIS:req.query.SIS,
                    birth_date:req.query.birth_date,
                    Medecin:req.query.doctor,
                    gender:req.query.genre,
                    groupeSanguin:req.query.group,
                    gsm:req.query.gsm,                              
                    lastname:req.query.lastname,
                    mutuelle:req.query.mutuelle,
                    name:req.query.name,                    
                    profession:req.query.profession,                    
                    telephone:req.query.telephone, 
                    AdressID : SaveId,
                    sexe : req.query.sexe
                  }
                  
                 connection.query(Access,AccessObj, function(err,rows,fields){
                 //var getId = rows.insertId;
                 if (err) throw err;
                  //res.send("done");
                  });
                 // creating new patient
              connection.query(AddPatient,patientjSON, function(err,rows,fields){
              var getId = rows.insertId;
              if (err) throw err;
              res.send('data saved');              
              var queryz = "INSERT INTO mypatient SET ?";
              var val = {
                            id_patient : getId,
                            id_nurse : req.query.idnurse
              } 
              console.log(val);
              connection.query(queryz,val,function(err,rows,fields){
                if (err) throw err;
                  console.log('patient assigned to nurse');
              });
          });          
        });
      };   
    });
  });

module.exports = router;