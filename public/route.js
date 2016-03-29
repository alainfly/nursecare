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
      var queryString ='SELECT * FROM nurse n JOIN mypatient mp ON n.id=mp.id_nurse JOIN patient p ON p.id=mp.id_patient JOIN Adresse adr ON p.AdressID=adr.id WHERE n.id = ?';   
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
    //var queryf = 'SELECT id FROM nurse WHERE nurse.email = ?';
    //connection.query(queryf,[req.query.email], function(err, rows,fields) { 
      //if (err) throw err;
     // var getId= rows[0]['id'];
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
      //console.log(req.query); 
    var check_P ='SELECT * FROM Patient WHERE SIS = ? AND birth_date=?';   
      connection.query(check_P,[req.query.SIS,req.query.birth_date], function(err, rows, fields) {

      if (err) throw err; 
      if (!rows.length) {
        console.log('no find');
                var save_adress = 'INSERT INTO Adresse SET ? ';
                var adresse = { patient_sis:req.query.SIS, 
                                street:req.query.street, 
                                houseNum: req.query.housenumber,                                
                                Postalcode:req.query.postalcode, 
                                country:req.query.country
                                };

        connection.query(save_adress,adresse,function(err,rows,fields){
          var SaveId = rows.insertId; 
         if(err) throw err;
                var AddPatient='INSERT into patient SET ?';

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
                  
                  //console.log(req.query);

                 // todo getid  
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

// define the about route
router.get('/log', function(req, res) {
  res.send('About birds');
});

module.exports = router;