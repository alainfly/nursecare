app = angular.module('loginModule',['services']);

app.controller('loginControler', [ '$scope', 
								   '$http', 
								   'crud_api',
								   'SessionHandling',
								   '$q',
								   'auth',
								   'store', 
								   '$location',
								   function($scope,$http, crud_api, SessionHandling,$q,auth, store, $location){

	// LoginCtrl.js
	
	  $scope.signin = function() {
	    auth.signin({}, function (profile, token) {
		      // Success callback

		      console.log(profile);
		      store.set('profile', profile);
		      store.set('token', token);
		      $location.path('/');
	    }, function(err) {
		      console.log("Error :(", err);
		      	//$location.path('/');
		    });
		  }

	
	$scope.loginForm = function(){	
	var socket = io();	
		var data = {
					email: $scope.email,
					password: $scope.password,
					login:true 
				} 
				/*
					socket.emit('Pass', {Passwords:$scope.password});
					socket.on('cryptedPassword',function(data){ 
					console.log(data.resp);		
					});
				*/
				crud_api.finddata(data).then(function(result){
				
				angular.forEach(result,function(value,key){	
					//console.log(value.password);
					 $scope.encrypPassword = value.password;
					 $scope.userID = value.id;
					 $scope.email = value.email;
					// console.log(value.password);
			 	});

				
				socket.emit('encrypPassword', {encryptedPassword:$scope.encrypPassword, password:$scope.password});
				socket.on('decryptedPassword', function(data){
				//$(document.body).append(data.message);
				if (data.result){

					//here i'm goin to create new instruction in session service to send datas to sessionHandler in php API's
					//console.log(data.result);
					var sessobj = {
						storeSession:true,
						userCryptedId: $scope.userID						
					}

					SessionHandling.Handler(sessobj).then(function(res){
					console.log(res);
					localStorage.setItem("I_cter",res);
					localStorage.setItem("I_ct", $scope.email);
					window.location='/';
					
					});

					/*
					SessionHandling.sessionHandle(sessionObjej).then(function(response){
						console.log(res);
					},function(response){
						console.log(response);
					});

					*/

					


				} else if (!data.result){
					console.log('not ok');
					}

				});


			//	window.location = '/';
			//	sessionStorage.setItem("I_cter", sailsResponse.data.id);
			//	sessionStorage.setItem("I_ct", sailsResponse.data.email);


				}, function(error){
						console.log('not working');
					$scope.error="mot de pass incorect"


				});

	}

	

}]);