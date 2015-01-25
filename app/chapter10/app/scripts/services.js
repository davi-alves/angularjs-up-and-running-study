(function (angular) {
  'use strict';

  var FifaService = function ($http) {
      return {
        getTeams: function () {
          return $http.get('/api/team');
        },

        getTeamDetails: function (code) {
          return $http.get('/api/team/' + code);
        }
      };
    },

    UserService = function ($http) {
      var service = {
        isLoggedIn: false,

        session: function () {
          return $http.get('/api/session')
            .then(function (response) {
              service.isLoggedIn = true;

              return response;
            });
        },

        login: function (user) {
          return $http.post('/api/login', user)
            .then(function (response) {
              service.isLoggedIn = true;

              return response;
            });
        }
      };

      return service;
    };

  angular.module('fifaApp')
    .factory('FifaService', ['$http', FifaService])
    .factory('UserService', ['$http', UserService]);
})(angular);
