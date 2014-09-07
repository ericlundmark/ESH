'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });
