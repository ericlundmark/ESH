'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event', {
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });
