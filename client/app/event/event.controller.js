'use strict';

var loc; 

angular.module('eshApp')
.controller('EventCtrl', function ($scope, $http) {
	$scope.busstop = {};
	getCurrentLocation(function(loca) {
		$http.get('/api/busstops/-1/'+JSON.stringify(loca))
		.success(function(busstop) {
			console.log(busstop);
			$scope.busstop = busstop;
		}).error(function(){
			console.log('err');
		});
	});

	var timer = setInterval(function(){
		getCurrentLocation(function(loca) {
			$http.get('/api/busstops/-1/'+JSON.stringify(loca))
			.success(function(busstop) {
				console.log(busstop);
				$scope.busstop = busstop;
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
