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
				//window.location = '#/login';
			}						
			 var get = {sessionId:session};	
			 //console.log(get);			 
			 return Handler(get).then(function(res){			 	
			 	if (Object.keys(res).length==0){	
				//window.location = '#/login';
				}
				return res;
			 });
			}						
		})

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.service('api',function($http,$q){		
			
			return ({
			        postdata : postdata,			      
			        finddata : finddata,
			        clientid : clientid,
			        whocanAssess : whocanAssess
					});
					function postdata(obj,Url){
						var request = $http({
						url:URL,			
						method: 'POST',
						data:obj,
						cache:true
						});
						return request.then(function(res){
							console.log(res);
							return res.data
						} ,function(res){
							return res.data
						});
					}					
					function finddata(codeObj,URL){
						var request = $http({
						url:URL,
						method: 'GET',
						params : codeObj,
						cache : true
						});
						return request.then(function(response) {
							//console.log(response.data);
							return response.data;
						} , errorCB);		
					}
					function whocanAssess(codeObj,URL){
						var request = $http({
						url:URL,
						method: 'GET',
						params : codeObj,
						cache : true
						});
						return request.then(function(response) {
							//console.log(response.data);
							return response.data;
						} , errorCB);		
					}
					function clientid(params,URL){
					    var request = $http({
						url:URL,
						method: 'GET',
						params : params,
						cache : true
						});
						return request.then(function(res){
							return res.data;
						})			
					}

					function success(res){
						return res.data;
					}
					function errorCB(res){
						console.log('Back-end API@php Or DB server not reachable');
						return res.data;
					}
			})