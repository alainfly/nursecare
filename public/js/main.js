   app = angular.module("mainApp",['ngCookies','config','patientModule','loginModule','logout','calendarModule']);  


    // create the controller and inject Angular's $scope
    app.controller('main', [ '$cookies',
    						 '$scope', 
							 '$http', 
							 'api',
							 'SessionHandling',
							 '$q',
							 'auth',
							 '$rootScope',
							 '$location',
							  function($cookies,$scope,$http, api, SessionHandling,$q,auth,$rootScope,$location){  

				//var session = localStorage.getItem("b_rtc");			   	
				//localStorage.setItem('b_rtc','true');
				// $scope.showMenuebared = $location.path() === '/';				

				var session = localStorage.getItem("b_rtc");
				if (!session){	
					//window.location = '#/login';
					//$scope.hidemenu = true;
					$('#menubar').hide();
									
									}
					
				if (session){	
					//window.location = '#/login';
					//$scope.hidemenu = false;
					$('#menubar').show();
					
					//window.location.reload();
				}	  	

       			$scope.auth = auth;	
       			angular.forEach(auth.profile, function(value,key) {       				
       				if(key=='email'){
       					$rootScope.email = value;
       					$scope.hidemenu= false;	
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

   

	

