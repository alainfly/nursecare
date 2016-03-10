app = angular.module("logout", ['services']);

app.controller('logout', [ '$scope', 
								   '$http', 
								   'crud_api',
								   'SessionHandling',
								   '$q',
								   function($scope,$http, crud_api, SessionHandling,$q){

          	$scope.logout = function(){

       				$scope.ses=localStorage.getItem("I_cter");
    				var sessobj = {
						destroySession:true,
						userCryptedId: $scope.ses 						
					}

					SessionHandling.Handler(sessobj).then(function(res){
					console.log(res);
					 localStorage.clear();
					window.location ='#/login';						
					});


    	}	

        // create a message to display in our view
       // $scope.message = 'Everyone come and see how good I look!';

        
    }]);