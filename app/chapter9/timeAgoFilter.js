(function (angular) {
  'use strict';

  var TimeAgo = function () {
    var ONE_MINUTE = 1000 * 60,
      ONE_HOUR = ONE_MINUTE * 60,
      ONE_DAY = ONE_HOUR * 24,
      ONE_MONTH = ONE_DAY * 30;

    return function (ts, optShowSecondsMessage) {
      if (optShowSecondsMessage !== false) {
        optShowSecondsMessage = true;
      }

      var currentTime = new Date().getTime();
      var diff = currentTime - ts;
      if (diff < ONE_MINUTE && optShowSecondsMessage) {
        return 'seconds ago';
      } else if (diff < ONE_HOUR) {
        return 'minutes ago';
      } else if (diff < ONE_DAY) {
        return 'hours ago';
      } else if (diff < ONE_MONTH) {
        return 'days ago';
      } else {
        return 'months ago';
      }
    };
  };

  angular.module('filtersApp', [])
    .filter('timeAgo', [TimeAgo]);
})(angular);
