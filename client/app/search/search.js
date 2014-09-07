'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search/:searchString', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
