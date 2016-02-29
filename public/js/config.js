
app = angular.module('config',['ngRoute']);
	
    app.config(['$routeProvider',function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {                
                controller  : 'main',
                templateUrl : 'views/homepage.html',
            })
            // route for the about page
            .when('/patient',{                
                controller  : 'PatientController',
                templateUrl : 'views/patient.html'
            })
            .when('/login', {
                templateUrl : 'views/loginPage.html',
                controller  : 'loginControler'
            })         
           
    }]);