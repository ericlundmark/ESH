'use strict';

angular.module('eshApp')
.controller('ShowCtrl', function ($scope, $location, $routeParams, $http, Auth) {
	$scope.message = 'Hello';

    //eventId ifrån klickat event på event sidan
    $scope.routeParams = {
    	eventId: $routeParams.eventId,
        busStopName:$routeParams.busStopName
    }

    $scope.event = {};
    $scope.googleMap = {};
    $scope.map = {
    	center: {
    		latitude: 58.410807,
    		longitude: 15.621373
    	},
    	zoom:11
    };
    console.log($scope.routeParams.eventId);
    $http.get('/api/events/' + $scope.routeParams.eventId).success(function(event) {
    	$scope.event = event.event;
    	$scope.regn = event.weather;
    	var center = new google.maps.LatLng($scope.event.location[0], $scope.event.location[1]);
    	$scope.map = {center: center, zoom:11};
    	var map = $scope.googleMap.getGMap();	
    	map.setCenter(center);
    	map.marker = new google.maps.Marker({
    		position: center,
    		map: map,
    		title: "HEJ"
    	});
    	map.panTo(center);
    });
    $scope.isFavorite = function(eventId){
    	var events = Auth.getCurrentUser().events;
    	if (events != undefined && events.length==0) {return false};
    	var event = _.findWhere(events, {_id: eventId});
    	return event != undefined;
    }
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
    		}
    	}
    	$http.put('/api/users/'+user._id + "/" + event._id ).success(function(event) {
    		console.log(event);
    	});
    }

    $scope.isSun = function(regn) {

    	return regn >=3;
    }

    var weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];

    $scope.getDay = function(index){
    	var i = index;
    	if (i == 0) {
    		return "Idag"
    	}else if (i == 1) {
    		return "Imorgon "
    	}else {
    		return weekDays[i];
    	};
    	
    }
});
