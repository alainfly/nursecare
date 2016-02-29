app = angular.module('loginModule',['services']);

app.controller('loginControler', [ '$scope', 
								   '$http', 
								   'crud_api',
								   function($scope,$http, crud_api){

	$scope.test="premier test angular";			
	//$scope.hideBarMenu =true;	
	//loginForm.loading= false;	  	
	$scope.loginForm = function(){
		
		var data = {
					email: $scope.email,
					password: $scope.password,
					login:true 
				} 
				crud_api.finddata(data).then(function(result){

				//console.log(result);
				angular.forEach(result,function(value,key){	
					//console.log(value.password);
					 $scope.encrypPassword = value.password;
					 $scope.userID = value.id;
					 $scope.email = value.email;
			 	});

				var socket = io();
				socket.emit('encrypPassword', {encryptedPassword:$scope.encrypPassword, password:$scope.password});
				socket.on('decryptedPassword', function(data){
				//$(document.body).append(data.message);
				if (data.result){
					sessionStorage.setItem("I_cter", $scope.userID);
					sessionStorage.setItem("I_ct", $scope.email);
					window.location='/';
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