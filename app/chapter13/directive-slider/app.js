(function (angular) {
  'use strict';

  angular.module('sliderApp', [])
    .controller('MainCtrl', [function () {
      var _this = this;

      _this.selectedValue = 2000;
      _this.textValue = 4000;
      _this.setSelectedValue = function () {
        _this.selectedValue = _this.textValue;
      };
   }])
    .directive('noUiSlider', [function () {
      return {
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        link: function ($scope, $element, $attr, ngModelCtrl) {
          $element.noUiSlider({
            // set to 0 in canse there is not value in ngModelCtrl yet
            start: 0,
            range: {
              // $attr by default give string values, so convert
              min: Number($attr.rangeMin),
              max: Number($attr.rangeMax)
            }
          });

          // When data changes inside AngularJs notify the third
          // party directive of the change
          ngModelCtrl.$render = function () {
            $element.val(ngModelCtrl.$viewValue);
          };

          // when data changes outside of AngularJS
          $element.on('set', function (args) {
            // tells angular to update the UI
            $scope.$apply(function () {
              // set the data within angular
              ngModelCtrl.$setViewValue($element.val());
            });
          });
        }
      };
    }]);
})(angular);
