describe('MainCtrl Server Calls', function () {
  var ctrl, mockBackend;

  beforeEach(module('serverApp2'));
  beforeEach(inject(function ($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note')
      .respond(404, {
        msg: 'Not Found'
      });
    ctrl = $controller('MainCtrl');
  }));

  it("should handle error while loading items", function () {
    // before the response the items should be empty
    expect(ctrl.items).toEqual([]);
    // simulate the response
    mockBackend.flush();

    expect(ctrl.items).toEqual([]);
    expect(ctrl.errorMessage).toEqual('Not Found');
  });

  afterEach(function () {
    // Ensure that all expects on $httpBackend were called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure taht all request to the server have responded
    mockBackend.verifyNoOutstandingRequest();
  });
});
