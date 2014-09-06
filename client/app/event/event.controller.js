'use strict';

var loc; 

angular.module('eshApp')
.controller('EventCtrl', function ($scope, $http) {

	$scope.busstop = {};

var timer = setInterval(function(){
	getCurrentLocation();
	$http.get('/api/busstops/-1/'+JSON.stringify(loc))
	.success(function(busstops) {
		console.log(busstops.events);
		$scope.busstop = busstops.events;
	});
},4000);


});
function getCurrentLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			loc = {
				'xCoord':position.coords.longitude,
			'yCoord':position.coords.latitude
			};
		});
	} else {
		console.log("No location could be found");
	}
}
