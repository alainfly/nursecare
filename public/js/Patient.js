
app = angular.module('mainApp',['services','config']);
app.controller('showPatientController', [ '$scope', 
										  '$http',
										  'check_session',
										  'crud_api', 
										  function($scope,$http,check_session,crud_api){	
										$scope.name="-";										
										$scope.lastname="-";
										$scope.SIS="-";
										$scope.status="-";
										$scope.adresse="-";
										$scope.birth_date="-";
										$scope.doctor = "-";
										$scope.profession = "-";
										$scope.mutuelle ="-";
										$scope.telephone="-";
					//redirect to loggin form if session not exist
	       			//check_session.Get_checked_session();	
	       			//list all Patient	       			
							var data = {
										id_Patient:sessionStorage.getItem("I_cter"),
										listpatient:true 
									} 
							crud_api.finddata(data).then(function(result){
							$scope.patient = result; 
							console.log(result);
							});
							/*
							var getit = sessionStorage.getItem("email");
							console.log(getit+"cool");
							*/
							$scope.toLogin= function(){
									//console.log("sa madcececec");
									sessionStorage.removeItem('email');
									window.location = '/loginPage';
							}	
							

							$scope.patientfiche = function(idpatient){
								var getidpatient = {
										id: idpatient,	
										fichepatient:true
										}
								//console.log(getidpatient);
							crud_api.postdata(getidpatient).then(function(res){								
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
				}]);

app.controller('addpatientController', [ '$scope', 
										 '$q',
										 '$http',
										 'crud_api',
				function($scope,$q,$http,crud_api){
				//get postalcode and city to charge into the select  from db
				var objpostcode = {
								idrequest :"1233-DR",
								objpostcode : "true"
								}
				crud_api.finddata(objpostcode).then(function(result){
				$scope.codes = result; 				
				});
				$scope.addpatient = function(){	
				var x = document.getElementById("value_Id").value;
				console.log(x);
				var codeObj = {
							insetPatient:"insetPatient",
							name: $scope.name,
							lastname: $scope.lastname,
							housenumber : $scope.housenumber,
							street : $scope.street,
							city: $scope.city,
							postalcode: $scope.postalcode,
							SIS :$scope.SIS,
							telephone : $scope.telephone,
							doctor:$scope.doctor,
							birth_date:$scope.birthdate,
							profession:$scope.profession,
							mutuelle:$scope.mutuelle,
							postalcode :"1030"
				}
				console.log($scope.postalcode);
				crud_api.postdata(codeObj).then(function(res){console.log(res);} );		
		}
}]);

