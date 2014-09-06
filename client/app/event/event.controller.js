'use strict';

var pos = {
		'yCoord':'58.394127',
		'xCoord':'15.561469'
};

angular.module('eshApp')
  .controller('EventCtrl', function ($scope, $http) {

    $scope.busstop = {};
    $scope.currentLocation="NO DATA";
    $http.get('/api/busstops/').success(function(busstops) {
    	$scope.busstop = busstops[0];
    	console.log($scope.busstop)
    });

   var timer = setInterval(function(){
    	$scope.getCurrentLocation();
    },10000);
	
     $scope.getCurrentLocation=function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          $scope.currentLocation={'lon':position.coords.longitude,'lat':position.coords.latitude};
        });
      } else {
          console.log("No location could be found");
      }
    }
});
