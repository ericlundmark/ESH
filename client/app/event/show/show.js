'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/show/:eventId', {
        templateUrl: 'app/event/show/show.html',
        controller: 'ShowCtrl'
      });
  });