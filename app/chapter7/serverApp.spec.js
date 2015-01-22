describe('MainCtrl Server Calls', function () {
  var ctrl, mockBackend;

  beforeEach(module('serverApp'));
  beforeEach(inject(function ($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note')
      .respond([{
        id: 1,
        label: 'Mock'
      }]);
    ctrl = $controller('MainCtrl');
  }));

  it("should load items from server", function () {
    // before the response the items should be empty
    expect(ctrl.items).toEqual([]);
    // simulate the response
    mockBackend.flush();

    expect(ctrl.items).toEqual([{
      id: 1,
      label: 'Mock'
    }]);
  });

  afterEach(function () {
    // Ensure that all expects on $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure taht all request to the server have responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
