'use strict';

var pos = {
		'yCoord':'58.394127',
		'xCoord':'15.561469'
};
angular.module('eshApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.busstop = {};

    $http.get('/api/busstops/').success(function(busstops) {
      $scope.busstop = busstops[0];
    });
  });
