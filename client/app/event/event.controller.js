'use strict';

var loc; 

angular.module('eshApp')
.controller('EventCtrl', function ($scope, $http) {

	$scope.busstop = {};
	getCurrentLocation(function(loca) {
		$http.get('/api/busstops/-1/'+JSON.stringify(loca))
		.success(function(busstops) {
			console.log(busstops.events);
			$scope.busstop = busstops.events;
		});
	});

	var timer = setInterval(function(){
		getCurrentLocation(function(loca) {
			$http.get('/api/busstops/-1/'+JSON.stringify(loca))
			.success(function(busstops) {
				console.log(busstops.events);
				$scope.busstop = busstops.events;
			});
		});
	},10000);


});
function getCurrentLocation(sucess){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			loc = {
				'xCoord':position.coords.longitude,
			'yCoord':position.coords.latitude
			};
			sucess(loc);
		});
	} else {
		console.log("No location could be found");
	}
}
