'use strict';

var pos = {
		'yCoord':'58.394127',
		'xCoord':'15.561469'
};

angular.module('eshApp')
  .controller('EventCtrl', function ($scope, $http) {

    $scope.busstop = {};
    $scope.currentLocation="NO DATA";

    

   var timer = setInterval(function(){
    	$scope.getCurrentLocation();
    	$http.get('/api/busstops/-1/'+$scope.currentLocation)
	    	.success(function(busstops) {
	    		console.log("SVAR: "+busstops);
		    	//$scope.busstop = busstops[0];
		    	//console.log($scope.busstop)
	   		 });
	   
    },4000);
	
     $scope.getCurrentLocation=function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          $scope.currentLocation=JSON.stringify("{'lon':"+position.coords.longitude+",'lat':"+position.coords.latitude+"}");
          console.log($scope.currentLocation);
        });
      } else {
          console.log("No location could be found");
      }
    }
});
