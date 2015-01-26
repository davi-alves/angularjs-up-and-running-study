(function (angular) {
  'use strict';

  var StockWidget = function () {
    return {
      templateUrl: 'stock.html',
      restrict: 'A',
      scope: {
        stockData: '=',
        stockTitle: '@',
        whenSelect: '&'
      },
      link: function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(
            ((stock.price - stock.previous) / stock.previous) * 100
          );
        };

        $scope.onSelect = function () {
          $scope.whenSelect({
            stockName: $scope.stockData.name,
            stockPrice: $scope.stockData.price,
            stockPrevious: $scope.stockData.previous
          });
        };
      }
    };
  };

  angular.module('stockMarketApp', [])
    .directive('stockWidegt', [StockWidget]);
})(angular);
