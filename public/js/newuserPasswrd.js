app = angular.module("newuserPasswrd",['directive']);
// A directive to compare passwords in a form by K. Scott Allen
// http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx

app.controller("newuserPasswrdController",['$scope','$http', '$q', function($scope,$http,$q){

		//$scope.confirmPassword=;

		$scope.sendNewpass = function(){
				console.log($scope.email);
				
		//send new password to back end and update user account wth new password
			$http.post('/updatePassword', {	
										   newPassword: $scope.confirmPassword,
										  
										})
			.then(function onSuccess(sailsResponse){
				console.log("ok");
					window.location = '/loginPage';

						    
			})
			.catch(function onError(sailsResponse){
						//console.log('not working');
						//toastr.error('not working');
			})
		}



} ]);