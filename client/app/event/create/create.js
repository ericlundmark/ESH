'use strict';

angular.module('eshApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/create', {
        templateUrl: 'app/event/create/create.html',
        controller: 'CreateCtrl'
      });
  });
