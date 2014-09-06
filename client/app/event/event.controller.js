'use strict';

var loc; 

angular.module('eshApp')
  .controller('EventCtrl', function ($scope, $http) {

    $scope.busstop = {};
   
   	var timer = setInterval(function(){
    	$scope.getCurrentLocation();
  		console.log(loc);
  		if(loc !== undefined) {
  		$http.get('/api/busstops/-1/'+JSON.stringify(loc))
	    	.success(function(busstops) {
	    		console.log("SVAR: "+busstops);
		    	//$scope.busstop = busstops[0];
		    	//console.log($scope.busstop)
	   		 });
			}
    },4000);
		
	
     $scope.getCurrentLocation=function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          loc = {
          	'lon':position.coords.longitude,
         		'lat':position.coords.latitude
         	};
        });
      } else {
          console.log("No location could be found");
      }
    }
});
