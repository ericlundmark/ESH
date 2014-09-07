'use strict';

angular.module('eshApp')
.controller('ShowCtrl', function ($scope, $location, $routeParams, $http, Auth) {
	$scope.message = 'Hello';

    //eventId ifrån klickat event på event sidan
    $scope.routeParams = {
    	eventId: $routeParams.eventId
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

    $scope.addToPersonalList=function(){
    	
    }
    $scope.likeEvent = function(e){
    	$http.put('/api/users/'+Auth.getCurrentUser()._id + "/" + e._id ).success(function(event) {
    		console.log(event);
    	});; 
    };

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
