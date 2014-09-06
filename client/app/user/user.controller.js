'use strict';

angular.module('eshApp')
  .controller('UserCtrl', function ($scope, $http) {
    $scope.message = 'Hello';


    $scope.user = {};

    $http.get('/api/users/me').success(function(users) {
    	$scope.user = users;
    	console.log(users.events)
    });

  });
