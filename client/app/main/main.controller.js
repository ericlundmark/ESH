'use strict';

var pos = {
	'yCoord':'58.394127',
	'xCoord':'15.561469'
};
angular.module('eshApp')
.controller('MainCtrl', function ($scope, $http) {
	$scope.busstop = {};

	$http.get('/api/busstops/123/' + JSON.stringify(pos)).success(function(awesomethings) {
		$scope.awesomethings = awesomethings;
		console.log($scope.awesomethings);
	});    

	$http.get('/api/busstops/').success(function(busstops) {
		$scope.busstop = busstops[0];
	});
});
