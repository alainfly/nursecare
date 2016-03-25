
app = angular.module("patientModule",['services']);

app.controller('PatientController', [ '$scope', 
										  '$http',
										  'SessionHandling',
										  'api',										  
										  'auth',
										  '$rootScope',

										function($scope,$http, SessionHandling, api, auth, $rootScope){


										$('#calendar').html('salut')				
										
/*
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

console.log('alain'.capitalize());
*/

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
							console.log(resultData);
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
			
				$scope.modaleaddpatient = function(){	
				var x = document.getElementById("value_Id").value;
				//console.log(x);
				var codeObj = {
							insetPatient:"insetPatient",
							name: $scope.name,
							pays : $scope.pays,
							lastname: $scope.lastname,
							housenumber : $scope.housenumber,
							street : $scope.street,
							city: $scope.city,
							country: "Belgique",
							postalcode: $scope.postalcode,
							SIS :$scope.SIS,
							telephone : $scope.telephone,
							doctor:$scope.doctor,
							birth_date:$scope.birthdate,
							profession:$scope.profession,
							mutuelle:$scope.mutuelle,
							postalcode :$scope.postalcode,
							genre : x 

				}
				//console.log(codeObj);
				api.finddata(codeObj,'api/addPatient')
				.then(
					function(res){
						console.log(res);
					});		
		}

}]);
