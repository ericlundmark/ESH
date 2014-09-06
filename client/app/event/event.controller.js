'use strict';

angular.module('eshApp')
  .controller('EventCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.events = {
    	event: [
	    	{
	    		"eventId": 1,
	    		"name": "bad",
	    		"place": "ekerö"
	    	},
	    	{
	    		"eventId": 2,
	    		"name": "strand",
	    		"place": "söderköping"
	    	},
	    	{
	    		"eventId": 3,
	    		"name": "öl",
	    		"place": "norrland"
	    	}
    	]
    };

    $scope.eventClicked = function(eventId){
    	console.log("clicked event: " + eventId);
    }

});
