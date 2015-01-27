describe("Stock widget directive rendering", function () {
  var compile, mockBackend, rootScope;

  beforeEach(module('stockMarketApp'));
  // step 1. Get the $compile service injected into our test.
  beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it("should render HTML based on scope correctly", function () {
    // step 2. Set up our directive instance HTML.
    var scope = rootScope.$new();
    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';
    // step 3. Create and set up our scope with the necessary variables.
    mockBackend.expectGET('stock.html')
      .respond(
        '<div ng-bind="stockTitle"></div><div ng-bind="stockData.price"></div>'
      );
    // step 4. Determine the template to load because our server is mocked out.
    var element = compile(
      '<div stock-widget stock-data="myStock" stock-title="This is {{title}}"></div>'
    )(scope);
    // step 5. Instantiate an instance of our directive using the $compile service.
    scope.$digest();
    mockBackend.flush();
    // step 6. Write our expectations for rendering and behavior.
    expect(element.html()).toEqual(
      '<div ng-bind="stockTitle" class="ng-binding">This is the best</div>' +
      '<div ng-bind="stockData.price" class="ng-binding">100</div>'
    );
  });

  it("should have functions and data on scope currectly", function () {
    var scope = rootScope.$new(),
      scopeClickCalled = '';

    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';
    scope.userClick = function (stockPrice, stockPrevious, stockName) {
      scopeClickCalled = stockPrice + ';' + stockPrevious + ';' + stockName;
    };

    mockBackend.expectGET('stock.html')
      .respond(
        '<div ng-bind="stockTitle"></div><div ng-bind="stockData.price"></div>'
      );

    var element = compile(
      '<div stock-widget' +
      ' stock-data="myStock"' +
      ' stock-title="This is {{title}}"' +
      ' when-select="userClick(stockPrice, stockPrevious, stockName)"></div>'
    )(scope);

    scope.$digest();
    mockBackend.flush();

    var compiledElementScope = element.isolateScope();
    expect(compiledElementScope.stockData)
      .toEqual(scope.myStock);
    expect(compiledElementScope.getChange(compiledElementScope.stockData))
      .toEqual(-50);

    expect(scopeClickCalled).toEqual('');
    compiledElementScope.onSelect();
    expect(scopeClickCalled).toEqual('100;200;Best Stock');

  });
});
