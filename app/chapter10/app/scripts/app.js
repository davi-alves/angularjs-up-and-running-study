(function (angular) {
  "use strict";

  angular.module('fifaApp', ['ngRoute'])
    .config(['$routeProvider',
      function ($routeProvider) {

        $routeProvider
        // listing
        .when('/', {
          templateUrl: 'views/team_list.html',
          controller: 'TeamListCtrl as teamListCtrl'
        })
        // login
        .when('/login', {
          templateUrl: 'views/login.html'
        })
        // team detail
        .when('/team/:code', {
          templateUrl: 'views/team_details.html',
          controller: 'TeamDetailCtrl as teamDetailCtrl',
          resolve: {
            // use this resolver to ensure the user session
            auth: ['$q', '$location', 'UserService',
              function ($q, $location, UserService) {
                return UserService.session()
                  .then(
                    function (success) {}, // on succes do nothing
                    function (err) { // on error prevent the page from loading and redirect to login
                      $location.path('/login');
                      $location.replace();
                      return $q.reject(err); // pass the error throught the pipe of promises
                    }
                  );
            }]
          }
        });

        $routeProvider.otherwise({
          redirectTo: '/'
        });
    }]);
})(angular);
