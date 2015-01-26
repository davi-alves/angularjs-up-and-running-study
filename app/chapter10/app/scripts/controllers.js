(function (angular) {
  "use strict";

  var MainCtrl = function (UserService) {
      var _this = this;
      _this.userService = UserService;

      UserService.session();
    },

    TeamListCtrl = function (FifaService) {
      var _this = this;
      _this.teams = [];

      FifaService.getTeams()
        .then(function (response) {
          _this.teams = response.data;
        });
    },

    LoginCtrl = function (UserService, $location) {
      var _this = this;
      _this.user = {
        username: '',
        password: ''
      };

      _this.login = function () {
        UserService.login(_this.user)
          .then(function (success) {
            $location.path('/team');
          }, function (error) {
            _this.errorMessage = error.data.msg;
          });
      };
    },

    TeamDetailCtrl = function ($location, $routeParams, FifaService) {
      var _this = this;
      _this.team = {};

      FifaService.getTeamDetails($routeParams.code)
        .then(function (response) {
          _this.team = response.data;
        }, function (error) {
          $location.path('/login');
        });
    };

  angular.module('fifaApp')
    .controller('MainCtrl', ['UserService', MainCtrl])
    .controller('TeamListCtrl', ['FifaService', TeamListCtrl])
    .controller('LoginCtrl', ['UserService', '$location', LoginCtrl])
    .controller('TeamDetailCtrl', ['$location', '$routeParams', 'FifaService', TeamDetailCtrl]);
})(angular);
