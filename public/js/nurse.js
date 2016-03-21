
app = angular.module('mainApp',['services','config']);
app.controller('shownurseController', [ '$scope', '$http','check_session', function($scope,$http,check_session){
					//redirect to loggin form if session not exist
	       			//check_session.Get_checked_session();		
					$http({
						  method: 'POST',
						  url: 'http://127.0.0.1/infidomeAPI/listnurse.php',
						  data : {email:$scope.email } 
						}).then(function successCallback(response) {
						    // this callback will be called asynchronously
						    // when the response is available
						   // console.log(response.data);
						    $scope.nurse = response.data;
						    }, function errorCallback(response) {
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						    console.log("cant connect to php restfull");
						  });
						
						$scope.toLogin= function(){
									//console.log("sa madcececec");
									sessionStorage.removeItem('email');
									window.location = '/loginPage';
							}
				}]);

app.controller('addnurseController', ['$scope', '$http','check_session', function($scope,$http,check_session){
// encrypte password and send nurse value to benck end for database storage	
$scope.addnurse = function(){
		//console.log($scope.name);	
				var getemail = {
					email : $scope.email
				}
			//check if nurse existe hiere
		//	check_session.checked_if_nurse_exist(getemail).then(function(response){
			//	console.log(response);
			//var resut = 'found';
		//	if (response === "notfound")
		//	{



		//check if email existe

    $http.post('/check_double_email', {				    						
							email : $scope.email,
						})
			.then(function onSuccess(sailsResponse){
				// send an email invitation tonew nurse with link to newuserPassword 					 					
				console.log(sailsResponse.status);	
				console.log("email already in use");
				$scope.errorDuplicateEmail = "Email déja existant";
			})
			.catch(function onError(sailsResponse){
						console.log('not working');
					//toastr.error('not working');
					console.log(sailsResponse.status);


				 $http.post('/addnurse', {	
			    						name: $scope.name,
										lastname: $scope.lastname,
									 	email : $scope.email ,
										inami :$scope.Inami,
										password : "undefined",
									 	telephone : $scope.telephone 
									})
			.then(function onSuccess(sailsResponse){
				// send an email invitation tonew nurse with link to newuserPassword 
					 	var dataObj =	{																							
											type: $scope.email,
											name: $scope.name
										 }								

					$http({
						  method: 'POST',
						  url: 'http://flysyse.com/api/',
						  data : dataObj 
						}).then(function successCallback(response) {
						    // this callback will be called asynchronously
						    // when the response is available
						   // toastr.error('Email envoyer sur a'+ $scope.email );

						    console.log(response);
						  }, function errorCallback(response) {
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						    console.log("cant connect to php restfull");
						  });
						   // $('#exampleModal').modal('close');

			})
			.catch(function onError(sailsResponse){
						//console.log('not working');
					//toastr.error('not working');
				})		


				})

		   

			//}
       /*
			if (response === "found") {
				console.log("email already in use");
				$scope.errorDuplicateEmail = "Email déja existant";
			} */

		//	}); 
				
		}
}]);

