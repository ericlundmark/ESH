'use strict';

angular.module('eshApp')
  .controller('NavbarCtrl', function ($scope, $http, $location, Auth) {
    $scope.menu = [{
      'title': 'Hem',
      'link': '/'
    }];
    $scope.busStopCollection;
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.performSearch=function(searchString){
      $location.path('/search/'+searchString);
    }
});
