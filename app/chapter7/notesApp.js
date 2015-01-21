(function (angular) {
  'use strict';

  var ItemService = function () {
      var items = [
        {
          id: 1,
          label: 'Item 0'
      },
        {
          id: 2,
          label: 'Item 1'
      },
    ];

      return {
        list: function () {
          return items;
        },
        add: function (item) {
          items.push(item);
        }
      };
    },
    ItemCtrl = function (ItemService) {
      var _this = this;

      _this.items = ItemService.list();
    };

  angular.module('notesApp', [])
    .factory('ItemService', [ItemService])
    .controller('ItemCtrl', ['ItemService', ItemCtrl]);
})(angular);
