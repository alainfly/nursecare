app = angular.module("logout", ['services']);

app.controller('logout', [ '$scope', 
								   '$http', 
								   'crud_api',
								   'SessionHandling',
								   '$q',
								   'auth',
								   'store',
								   function($scope,$http, crud_api, SessionHandling,$q,auth, store){

          	$scope.logout = function(){
					auth.signout();
					store.remove('profile');
					store.remove('token');

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