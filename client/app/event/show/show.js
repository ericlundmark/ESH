'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/show', {
        templateUrl: 'app/event/show/show.html',
        controller: 'ShowCtrl'
      });
  });
