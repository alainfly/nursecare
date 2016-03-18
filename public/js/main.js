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
       			//$scope.formData = "bonjour alain sa marche ";

       			$scope.sub = function() {
       					var getidpatient = {
										id: 'idpatient',	
										fichepatient:true,
										email:'alainfly3@gmail.com'
										}

       				var request = $http({
						url:"/api/local",
						method: 'GET',
						params : getidpatient,
						cache : false
						});
						return request.then(function(response) {
							console.log(response.data);
							return response.data;
						} , function(err){
							console.log(err);
						});

			     
			    }	
	
 
        
    }]);

   

	

