app = angular.module('loginModule',['services']);

app.controller('loginControler', [ '$scope', 
								   '$http', 
								    'crud_api',
								    function($scope,$http, crud_api){

	$scope.test="premier test angular";			
	//$scope.hideBarMenu =true;	
	//loginForm.loading= false;	  	
	$scope.loginForm = function(){
		//console.log( $scope.email+''+$scope.password);
			var loginobj= {	 email: $scope.email,
			 				 password: $scope.password,
			 				 from_login:true
						  }

/*
			crud_api.postdata(loginobj).then( function(res) {
			
			angular.forEach(res,function(value,key){	
				console.log(value.password);
			 });

			var Passwords = require('machinepack-passwords');
			// Compare a plaintext password attempt against an already-encrypted version.
			Passwords.checkPassword({
			passwordAttempt: $scope.password,
			encryptedPassword: value.password,
			}).exec({
			// An unexpected error occurred.
			error: function (err){			 
			},
			// Password attempt does not match already-encrypted version
			incorrect: function (){
			 console.log('not correct');
			},
			// OK.
			success: function (){
			 console.log('correct');
			 sessionStorage.setItem("email", $scope.email)
			},
			});

		});
		*/	
		$http.post('/login', {	 email: $scope.email,
								 password: $scope.password
							})
		.then(function onSuccess(sailsResponse){
			console.log(sailsResponse.data.id);
				window.location = '/';
				sessionStorage.setItem("I_cter", sailsResponse.data.id);
				sessionStorage.setItem("I_ct", sailsResponse.data.email);
		})
		.catch(function onError(sailsResponse){
					console.log('not working');
					$scope.error="mot de pass incorect"
		})


	}

	

}]);