'use strict';

angular.module('eshApp')
  .controller('ShowCtrl', function ($scope, $routeParams) {
    $scope.message = 'Hello';

    //eventId ifrån klickat event på event sidan
    $scope.routeParams = {
    		eventId: $routeParams.eventId
    	}

    $scope.addToPersonalList=function(){
    	
    }
  });
 
