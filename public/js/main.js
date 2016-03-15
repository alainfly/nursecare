   app = angular.module("mainApp",['config','patientModule','loginModule','logout']);  


    // create the controller and inject Angular's $scope
    app.controller('main', [ 		'$scope', 
								   '$http', 
								   'crud_api',
								   'SessionHandling',
								   '$q',
								   'auth',
								   function($scope,$http, crud_api, SessionHandling,$q, auth){
        // create a message to display in our view
       // $scope.message = 'Everyone come and see how good I look!';

       $scope.auth = auth;	
       //console.log(auth.profil);

 
        
    }]);

   

	

