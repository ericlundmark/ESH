'use strict';

var pos = {
		'yCoord':'58.394127',
		'xCoord':'15.561469'
};
angular.module('eshApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/busstops/123/' + JSON.stringify(pos)).success(function(awesomethings) {
      $scope.awesomethings = awesomethings;
      console.log($scope.awesomethings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
