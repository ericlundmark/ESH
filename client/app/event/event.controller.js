'use strict';

var loc; 

angular.module('eshApp')
.controller('EventCtrl', function ($scope, $http, Auth) {
	$scope.busstop = {};
	$scope.count=0;
	$scope.hasEvents=function(busstop){

		if (busstop.events in window) {
			return true;
		};

		return busstop && busstop.events && busstop.events.length != 0;
	};
	$scope.hasBusstop=function(busstop){
		return (typeof busstop.name != 'undefined');
	};
	$scope.isFavorite = function(eventId){
		var events = Auth.getCurrentUser().events;
		if (events != undefined && events.length==0) {return false};
		var event = _.findWhere(events, {_id: eventId});
		return event != undefined;
	};
	$scope.getCurrentLocation=function(success){
		var coord=[
			{
			'xCoord':15.560445,
			'yCoord':58.394302
			},
			{
			'xCoord':15.566557,
			'yCoord':58.394497

			},
			{
			'xCoord':15.571025,
			'yCoord':58.397079
			},
			{
			'xCoord':15.571947,
			'yCoord':58.400368
			}
		];
		loc=coord[$scope.count];
		success(loc);

		/*
			Riktig GPS-NAV nedan
		*/

		/*
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
		*/
	}; 

	$scope.toggleFavorite = function(event){
		var user = Auth.getCurrentUser();
      if (user != undefined && user.events!= undefined && user.events.length==0) {
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
		} else {
			user.events.push({
				_id: event._id,
				name: event.name
			});
		}
	}
	$http.put('/api/users/'+user._id + "/" + event._id ).success(function(event) {
		console.log(event);
	});
	}
	$scope.getCurrentLocation(function(loca) {
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
		$scope.getCurrentLocation(function(loca) {
			console.log(loca);
			$http.get('/api/busstops/-1/'+JSON.stringify(loca))
			.success(function(busstop) {
				console.log(busstop.name);
				$scope.busstop = busstop;
			});
		});
		if($scope.count==3){
			$scope.count=0;
		}else{
			$scope.count=$scope.count+1
		}
	},10000);
	
});


