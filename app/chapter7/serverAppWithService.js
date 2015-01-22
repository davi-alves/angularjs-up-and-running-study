(function (angular) {
  'use strict';

  var MainCtrl = function (NoteService) {
    var _this = this;

    _this.items = [];
    _this.errorMessage = '';

    NoteService.query()
      .then(function (response) {
        _this.items = response.data;
      }, function (errResponse) {
        _this.errorMessage = errResponse.data.msg;
      });
  };

  var NoteService = function ($http) {
    return {
      query: function () {
        return $http.get('/api/note');
      }
    };
  };

  angular.module('serverApp2', [])
    .factory('NoteService', ['$http', NoteService])
    .controller('MainCtrl', ['NoteService', MainCtrl]);
})(angular);
