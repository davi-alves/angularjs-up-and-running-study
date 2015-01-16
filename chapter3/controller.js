(function (angular) {
  'use strict';

  var ListCtrl = function () {
    var _this = this;

    this.items = [
      {
        id: 1,
        label: 'First',
        done: true
      },
      {
        id: 2,
        label: 'Second',
        done: false
      },
     ];

    this.getDoneClass = function (item) {
      return {
        finished: item.done,
        unfinished: !item.done
      };
    };
  };

  angular.module('notesApp', [])
    .controller('ListCtrl', [ListCtrl]);
})(angular);
