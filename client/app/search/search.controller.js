'use strict';

angular.module('eshApp')
  .controller('SearchCtrl', function ($scope,$http,$routeParams) {
    $scope.result=[];
    $scope.busStopChoosen=false;
    $scope.busstop;
    $scope.routeParams={
    	searchString: $routeParams.searchString
    }
    $scope.getAllBusStops=function(){
    	console.log("NU");
        $http.get('/api/busstops/')
        .success(function(busstop) {
          $scope.filterRelevantBusStops(busstop);
        }).error(function(){
          console.log('err');
        });
    };

    $scope.filterRelevantBusStops=function(busStops){
      angular.forEach(busStops, function(value, key) {
          if(value.name.toLowerCase().indexOf($scope.routeParams.searchString.toLowerCase())>=0){
            this.push(busStops[key]);
            }
       },$scope.result);
    };

    $scope.showBusStop=function(busStop){
    	$scope.busstop=busStop;
		$scope.busStopChoosen=true;
    }

    //Calls from start
    $scope.getAllBusStops();
  });
