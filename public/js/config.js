
app = angular.module('config',['ngRoute','auth0', 'angular-storage', 'angular-jwt']);
	
    app.config(['$routeProvider',function($routeProvider,authPovider,$locationProvider) {
        $routeProvider
            // route for the home page
            .when('/', {                
                controller  : 'main',
                templateUrl : 'views/homepage.html',
            })
            // route for the about page
            .when('/patient',{                
                controller  : 'PatientController',
                templateUrl : 'views/patient.html',
                //requiresLogin: true
            })
            .when('/login', {
                templateUrl : 'views/loginPage.html',
                controller  : 'loginControler'
            })
            .when('/calendar', {
                templateUrl : 'views/calendar.html',
                controller  : 'calendarController'
            })
            .otherwise({
                redirectTo: '/'
              })           
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
        clientID: 'pmYggLekcku5rsj8j9EGPXMyxBWBcQ7J',
        loginUrl: '/login'
      });
    })
    app.run(function(auth) {
      // This hooks al auth events to check everything as soon as the app starts
      auth.hookEvents();
              angular.forEach(auth.profile, function(value,key) {               
              if(key=='email'){
                $rootScope.email = value;
                //$scope.hidemenu= false; 
              }

            }); 
    });


/*
    app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
});*/
  
    app.run(function($rootScope, auth, store, jwtHelper, $location) {
      // This events gets triggered on refresh or URL change
      $rootScope.$on('$locationChangeStart', function() {
        var token = store.get('token');
        if (token) {
          console.log($location.path());
          //$rootScope.hidemenu = false;
         // window.location.reload();
         // $('#header-wrapper').show();

          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          } else {
            // Either show the login page or use the refresh token to get a new idToken
            //$rootScope.hidemenu = true;
            $location.path('/login');
          }
         }
       })
      });

