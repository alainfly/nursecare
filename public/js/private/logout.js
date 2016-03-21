app = angular.module("logout", ['services']);

app.controller('logout', [ '$scope', 
								   '$http', 
								   'api',
								   'SessionHandling',
								   '$q',
								   'auth',
								   'store',
								   '$templateCache',
								   '$location',
								   function($scope,$http, api, SessionHandling,$q,auth, store,$templateCache,$location,$window){
								   //	$scope.showMenuebared = $location.path() === '/login';

          	$scope.logout = function(){
					auth.signout();
					store.remove('profile');
					store.remove('token');
					localStorage.clear("b_rtc");
					
       				$scope.ses=localStorage.getItem("I_cter");
    				var sessobj = {
						destroySession:true,
						userCryptedId: $scope.ses 						
					}

					SessionHandling.Handler(sessobj).then(function(res){
					console.log(res);
					localStorage.clear();
					//var url = "http://" + window.location.host + "/";
				        console.log(window.location);
				        //.href = url;
					window.location.href = "http://localhost:3000/#/login";
					//window.location.reload();						
					});


    	}	

        // create a message to display in our view
       // $scope.message = 'Everyone come and see how good I look!';

        
    }]);