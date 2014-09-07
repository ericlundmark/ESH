'use strict';

angular.module('eshApp')
  .controller('ShowCtrl', function ($scope, $routeParams, $http, Auth) {
    $scope.message = 'Hello';

    //eventId ifrån klickat event på event sidan
    $scope.routeParams = {
    		eventId: $routeParams.eventId
    	}

    $scope.event = {};

    $http.get('/api/events/' + $scope.routeParams.eventId).success(function(event) {
    		$scope.event = JSON.parse(JSON.parse(event)).event;
        $scope.regn = JSON.parse(JSON.parse(event)).weather;
        console.log($scope.regn);
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
  });
 
