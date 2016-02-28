
var app = angular.module('config',['ngRoute']);

	app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/loginPage.html',
                controller  : 'loginControler'
            })
            // route for the about page
            .when('/patient', {
                templateUrl : 'views/patient.html',
                controller  : 'showPatientController'
            })
            .when('/infirmier', {
                templateUrl : 'views/nurse.html',
                controller  : 'shownurseController'
            })
            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });