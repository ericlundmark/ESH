'use strict';

var loc; 

angular.module('eshApp')
.controller('EventCtrl', function ($scope, $http, Auth) {
	$scope.busstop = {};
	$scope.hasEvents=function(busstop){
		return busstop && busstop.events && busstop.events.length != 0;
	};
	$scope.isFavorite = function(eventId){
		console.log(Auth.getCurrentUser());
		var events = Auth.getCurrentUser().events;
		if (events.length==0) {return false};
		var event = _.findWhere(events, {_id: eventId});
		return event != undefined;
	}
	$scope.toggleFavorite = function(event){
		var user = Auth.getCurrentUser();
		if (user.events.length==0) {
			user.events.push({
				_id: event._id,
				name: event.name
			});
		}else{
			var result = _.findWhere(user.events, {_id: event._id});
			if (result) {
				var index = user.events.indexOf({
					_id: event._id,
					name: event.name
				});
				user.events.splice(index, 1);
			}
		}
		$http.put('/api/users/' + user._id, user).success(function(user){
			console.log('success');
			console.log(user);
		});
	}
	getCurrentLocation(function(loca) {
		$http.get('/api/busstops/-1/'+JSON.stringify(loca))
		.success(function(busstop) {
			console.log(busstop.name);
			$scope.busstop = busstop;
		}).error(function(){
			console.log('err');
		});
	});

	$scope.$on('$routeChangeStart', function(next, current) {
		clearInterval(timer);
	});
	var timer = setInterval(function(){
		getCurrentLocation(function(loca) {
			$http.get('/api/busstops/-1/'+JSON.stringify(loca))
			.success(function(busstop) {
				console.log(busstop.name);
				$scope.busstop = busstop;
			});
		});
	},10000);

});
function getCurrentLocation(success){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			loc = {
				'xCoord':position.coords.longitude,
				'yCoord':position.coords.latitude
			};
			success(loc);
		});
	} else {
		console.log("No location could be found");
	}
}
