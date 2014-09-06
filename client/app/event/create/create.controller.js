'use strict';

angular.module('eshApp')
  .controller('CreateCtrl', function ($scope,$location) {
    $scope.message = 'Hello';
    $scope.activityChoosen=false;

    $scope.activityTypeChoosen=function(){
    	$scope.activityChoosen=true;
    }

    $scope.cancel=function(){
    	$location.path('/event');
    }

    $scope.addEvent=function(formData){
    	/*
		Add Event to Database
    	*/
    }

  });
