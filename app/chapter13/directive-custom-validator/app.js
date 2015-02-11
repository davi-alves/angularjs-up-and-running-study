(function (angular) {
  'use strict';

  /**
   * stockMarketApp Module
   *
   * directive-custom-validator
   */
  angular.module('stockMarketApp', [])
    .controller('MainCtrl', [function () {
      this.zip = '1234';
   }])
    .directive('validZip', [function () {
      var zipCodeRegex = /^\d{2}\.?\d{3}[\-|\s]?\d{3}$/g;
      return {
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function ($scope, $element, $attrs, ngModelCtrl) {
          // handle DOM update --> Model update
          ngModelCtrl.$parsers.unshift(function (value) {
            var valid = zipCodeRegex.test(value);
            ngModelCtrl.$setValidity('validZip', valid);
            console.log(value);

            return valid ? value : undefined;
          });

          // handle Model update --> DOM
          ngModelCtrl.$formatters.unshift(function (value) {
            ngModelCtrl.$setValidity('validZip', zipCodeRegex.test(value));

            return value;
          });
        }
      };
   }]);
})(angular);
