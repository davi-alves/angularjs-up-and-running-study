describe("Stock widget directive rendering", function () {
  var compile, mockBackend, rootScope;

  beforeEach(module('stockMarketApp'));
  beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it("should render HTML based on scope correctly", function () {
    var scope = rootScope.$new();
    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';

  });
});
