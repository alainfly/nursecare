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
       			angular.forEach(auth.profile, function(value,key) {       				
       				if(key=='email'){
       					$scope.email = value;
       				}        				
       			});
       			console.log($scope.email);
       			$scope.sub = function() {
       					var getidpatient = {
										id: 'idpatient',	
										fichepatient:true,
										email:$scope.email
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

   

	

