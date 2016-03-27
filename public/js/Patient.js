
app = angular.module("patientModule",['services']);

app.controller('PatientController', [ '$scope', 
										  '$http',
										  'SessionHandling',
										  'api',										  
										  'auth',
										  '$rootScope',

										function($scope,$http, SessionHandling, api, auth, $rootScope){
/*
										$scope.name="";										
										$scope.lastname="";
										$scope.SIS="";
										$scope.status="";
										$scope.adresse="";
										$scope.birth_date="";
										$scope.doctor = "";
										$scope.profession = "";
										$scope.mutuelle ="";
										$scope.telephone="";
*/

		       				//list all Patient
							angular.forEach(auth.profile, function(value,key) {       				
			       				if(key=='email'){
			       					$rootScope.email = value;
			       				}        				
			       			});
							var data = {
										email: $scope.email,
										listpatient:true

										}
							api.finddata(data,'api/patient').then(function(resultData){
							if (!resultData){
								//window.location ="#/";
							}
							$scope.patient = resultData; 
							//console.log(resultData);
							});
       																
							$scope.patientfiche = function(idpatient){

								console.log(idpatient);
								var getidpatient = {
										//email: $scope.email,
										id:idpatient,	
										fichepatient:true
										}
								//console.log(getidpatient);
							api.finddata(getidpatient,'api/detailPatient').then(function(res){
							console.log(res);								
										angular.forEach(res,function(value,key){										
										$scope.name=value.name;										
										$scope.lastname=value.lastname;
										$scope.SIS=value.SIS;
										$scope.status=value.Status;
										$scope.adresse=value.street;
										$scope.birth_date=value.birth_date;
										$scope.doctor = value.Medecin;
										$scope.profession = value.profession;
										$scope.mutuelle =value.Mutuelle;
										$scope.telephone=value.telephone
										})
								});
							}	


							$scope.findpatient= function(){
								console.log($scope.pat);
							}				

				//get postalcode and city to charge into the select  from db
				var obj = {}
				api.finddata(obj,'api/postcode')
				.then(
					function(res){
						//console.log(res.data);
						$scope.codes = res;
					});
				$scope.modaleaddpatient = function(){
				  $scope.myDate = new Date();
				var x = document.getElementById("genreId").value;
				//console.log(x); 
				var mut = document.getElementById("mut").value;
				console.log(mut);

				var g = document.getElementById("groupS").value;
				//console.log(g);
					var postcode = document.getElementById("postcode").value;
				//console.log(postcode);

				var codeObj = {
							insetPatient:"insetPatient",
							name: $scope.name,
							pays : $scope.pays,
							lastname: $scope.lastname,
							housenumber : $scope.housenumber,
							street : $scope.street,
							city: $scope.city,
							country: "Belgique",
							postalcode: postcode,
							SIS :$scope.SIS,
							telephone : $scope.telephone,
							doctor:$scope.doctor,
							birth_date:$scope.birthdate,
							profession:$scope.profession,
							mutuelle:mut,							
							genre : x,
							group : g,  
							gsm : $scope.Gsm

				}
				//console.log(codeObj);
				api.finddata(codeObj,'api/addPatient')
				.then(
					function(res){
						console.log(res);
					});		
		}

}]);
