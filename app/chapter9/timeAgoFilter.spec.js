describe("timeAgo Filter", function () {
  var filter;

  beforeEach(module('filtersApp'));
  beforeEach(inject(function (timeAgoFilter) {
    filter = timeAgoFilter;
  }));

  it("should respond based on timestamp", function () {
    var currentTime = new Date().getTime();

    currentTime -= 10000;
    expect(filter(currentTime)).toEqual('seconds ago');
    expect(filter(currentTime, false)).toEqual('minutes ago');

    var minutesAgo = currentTime - 1000 * 60;
    expect(filter(minutesAgo)).toEqual('minutes ago');

    var hoursAgo = currentTime - 1000 * 60 * 68;
    expect(filter(hoursAgo)).toEqual('hours ago');

    var daysAgo = currentTime - 1000 * 60 * 60 * 26;
    expect(filter(daysAgo)).toEqual('days ago');

    var monthsAgo = currentTime - 1000 * 60 * 60 * 24 * 32;
    expect(filter(monthsAgo)).toEqual('months ago');
  });
});
