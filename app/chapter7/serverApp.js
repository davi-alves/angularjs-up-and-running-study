(function (angular) {
  'use strict';

  var MainCtrl = function ($http) {
    var _this = this;

    _this.items = [];
    _this.errorMessage = '';

    $http.get('/api/note')
      .then(function (response) {
        _this.items = response.data;
      }, function (errResponse) {
        _this.errorMessage = errResponse.data.msg;
      });
  };

  angular.module('serverApp', [])
    .controller('MainCtrl', ['$http', MainCtrl]);
})(angular);
