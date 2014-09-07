'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/show/:eventId/:busStopName', {
        templateUrl: 'app/event/show/show.html',
        controller: 'ShowCtrl'
      });
  });