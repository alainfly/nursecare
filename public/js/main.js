   app = angular.module("mainApp",['config','patientModule','loginModule','logout']);  


    // create the controller and inject Angular's $scope
    app.controller('main', [ '$scope', 
								   '$http', 
								   'crud_api',
								   'SessionHandling',
								   '$q',
								   function($scope,$http, crud_api, SessionHandling,$q){
        // create a message to display in our view
       // $scope.message = 'Everyone come and see how good I look!';

       var socket = io();

       socket.on('clientlost',function(instruct){

       	console.log("disconnected");
/*
       				$scope.ses=sessionStorage.getItem("I_cter");
    				var sessobj = {
						destroySession:true,
						userCryptedId: $scope.ses 						
					}

					SessionHandling.Handler(sessobj).then(function(res){
					console.log(res);
					//localStorage.clear();
					//window.location ='#/login';						
					});*/
       })

 
        
    }]);

   

	

