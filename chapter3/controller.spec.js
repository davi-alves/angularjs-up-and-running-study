describe('Controller: ListCtrl', function () {
  var ctrl = null;

  // instantiate a new version of the module for each test
  beforeEach(module('notesApp'));

  // instantiate the controller for each test
  beforeEach(inject(function ($controller) {
    ctrl = $controller('ListCtrl');
  }));

  it('should have items available on load', function () {
    expect(ctrl.items).toEqual([
      {
        id: 1,
        label: 'First',
        done: true
        },
      {
        id: 2,
        label: 'Second',
        done: false
        }
      ]);
  });

  it('should have highlight items based on state', function () {
    var item = {
      id: 1,
      label: 'First',
      done: true
    };

    var actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeTruthy();
    expect(actualClass.unfinished).toBeFalsy();

    item.done = false;
    actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeFalsy();
    expect(actualClass.unfinished).toBeTruthy();
  });
});
