app = angular.module('services',[]); 
 //check if session existe

app.service('check_session', function($http,$q){	
			return ({
						Get_checked_session : Get_checked_session,													
					});	
			function Get_checked_session(){
			var session = sessionStorage.getItem("I_cter");
			if (!session){	window.location = '#/login';}											
			return	
			}						
		})
app.service('crud_api',function($http,$q){

			//constant(url,'http://127.0.0.1/infidomeapi/api/api.php');
			
			return ({
			        postdata : postdata,
			        deletedata : deletedata,
			        updatedata : updatedata,
			        finddata : finddata
					});
					function postdata(obj){
						var request = $http({
						url:"http://localhost:8888/api/api.php",			
						method: 'POST',
						data:obj,
						cache:false
						});
						return request.then(function(res){return res.data} ,function(res){return res.data});
					}					
					function finddata(codeObj){
						var request = $http({
						url:"http://localhost:8888/api/api.php",
						method: 'GET',
						params : codeObj,
						cache : false
						});
						return request.then(function(response) {
							//console.log(response.data);
							return response.data;
						} , errorCB);		
					}
					function deletedata(){						
					}

					function updatedata(){						
					}
					
					function success(res){
						return res.data;
					}
					function errorCB(res){
						console.log('Back-end API@php Or DB server not reachable');
						return res.data;
					}
			})