
app = angular.module('config',['ngRoute','auth0', 'angular-storage', 'angular-jwt']);
	
    app.config(['$routeProvider',function($routeProvider,authPovider) {
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
            });


           
    }]);

    app.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
      // ...

      // We're annotating this function so that the `store` is injected correctly when this file is minified
      jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        // Return the saved token
        return store.get('token');
      }];

      $httpProvider.interceptors.push('jwtInterceptor');
      // ...
    });
    app.config(function (authProvider) {
    authProvider.init({
        domain: 'flysys.eu.auth0.com',
        clientID: 'pmYggLekcku5rsj8j9EGPXMyxBWBcQ7J'
      });
    })
    app.run(function(auth) {
      // This hooks al auth events to check everything as soon as the app starts
      auth.hookEvents();
    });