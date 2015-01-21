describe('SimpleCtrl', function () {
  beforeEach(module('notesApp'));

  var ctrl, $loc;

  beforeEach(inject(function ($controller, $location) {
    ctrl = $controller('SimpleCtrl');
    $loc = $location;
  }));

  it('should navigate away from current page', function () {
    expect($loc.path()).toEqual('');
    ctrl.navigate1();
    expect($loc.path()).toEqual('/some/where');
  });

  it('should navigate away from current page', function () {
    expect($loc.path()).toEqual('');
    $loc.path('/there');
    ctrl.navigate2();
    expect($loc.path()).toEqual('/some/where/else');
  });
});
