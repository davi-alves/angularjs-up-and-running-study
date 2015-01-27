(function(module) {
try {
  module = angular.module('myPartials');
} catch (e) {
  module = angular.module('myPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('stock.html',
    '<div class="stock-dash">\n' +
    '    Name:\n' +
    '    <span class="stock-name" ng-bind="stockData.name"></span>\n' +
    '    Price:\n' +
    '    <span class="stock-price" ng-bind="stockData.price | currency"></span>\n' +
    '    Percentage Change:\n' +
    '    <span class="stock-change" ng-bind="getChange(stockData) + \'%\'"></span>\n' +
    '</div>\n' +
    '');
}]);
})();
