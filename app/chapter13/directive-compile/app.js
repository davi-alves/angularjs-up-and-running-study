(function (angular) {
  'use strict';

  /**
   * dynamicFormApp Module
   *
   * Description
   */
  angular.module('dynamicFormApp', [])
    .controller('MainCtrl', [function () {
      this.username = '';
      this.password = '';
  }])
    .directive('formElement', [function () {
      return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        require: '^form', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        compile: function ($element, $attrs) {
          var expectedInputAttrs = {
            'required': 'required',
            'ng-minlength': 'ngMinlength',
            'ng-pattern': 'ngPattern'
              // more
          };

          // start extracting content from the HTML
          var validationsKeys = $element.find('validation'),
            presentValidationKeys = {},
            inputName = $attrs.name,
            elementHtml;

          angular.forEach(validationsKeys, function (validationKey) {
            validationKey = angular.element(validationKey);
            presentValidationKeys[validationKey.attr('key')] = validationKey.text();
          });

          // start generating final HTML
          elementHtml = '<div>' +
            '<label>' + $attrs.label + '</label>' +
            '<input type="' + $attrs.type + '" name="' + inputName +
            '" ng-model="' + $attrs.bindTo + '"';
          $element.removeAttr('type');
          $element.removeAttr('name');
          // validation attrs
          for (var i in expectedInputAttrs) {
            if ($attrs[expectedInputAttrs[i]] !== undefined) {
              elementHtml += ' ' + i + '="' + $attrs[expectedInputAttrs[i]] + '"';
            }
            $element.removeAttr(i);
          }
          elementHtml += '>';
          // errors
          elementHtml += '<span ng-repeat="(key, text) in validators" ' +
            'ng-show="hasError(key)" ng-bind="text"></span>';
          elementHtml += '</div>';
          $element.html(elementHtml);

          // return link function
          return function ($scope, $element, $attrs, formCtrl) {
            $scope.validators = angular.copy(presentValidationKeys);
            $scope.hasError = function (key) {
              return !!formCtrl[inputName].$error[key];
            };
          };
        }
      };
    }]);
})(angular);
