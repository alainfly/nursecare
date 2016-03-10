app = angular.module('services',[]); 
 //check if session existe

app.service('SessionHandling', function($http,$q){	
			return ({
						Get_checked_session : Get_checked_session,	
						Handler : Handler 												
					});	

			 function Handler(obj){
				var request = $http({
				url:"http://localhost:8888/api/api.php",			
				method: 'GET',
				params:obj,
				cache:false
				});
				return request.then(function(res){return res.data} ,function(res){return res.data});
			}
			//if the client session is erased, find session id in DB with user id and restore it
			function Get_checked_session(){

			var session = localStorage.getItem("I_cter");
			if (!session){	
				window.location = '#/login';
			}						
			 var get = {sessionId:session};	
			 //console.log(get);			 
			 return Handler(get).then(function(res){			 	
			 	if (Object.keys(res).length==0){	
				window.location = '#/login';
				}
				return res;
			 });
			}						
		})


app.service('crud_api',function($http,$q){		
			
			return ({
			        postdata : postdata,
			        deletedata : deletedata,
			        updatedata : updatedata,
			        finddata : finddata
					});
					function postdata(obj){
						var request = $http({
						url:"http://127.0.0.1:8888/api/api.php",			
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