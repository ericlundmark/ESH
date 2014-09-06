'use strict';

var https = require("https");
var http = require('http');
module.exports.nearestBusstop = function(position, success, error){
	var radius = 500;
	var str = '';
	var options = {
		method: 'GET',
		host: 'api.trafiklab.se',
		path: '/samtrafiken/resrobot/StationsInZone.json'+
			'?key=DgKtW2dvK9XZRnjrYeXhptwDJP6RDUNj'+
			'&centerX='+position.xCoord+
			'&centerY='+position.yCoord+
			'&radius=' + radius+
			'&coordSys=WGS84'+
			'&apiVersion=2.1'
	};
	var req = https.request(options, function(response){
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			var result = JSON.parse(str).stationsinzoneresult.location[0];
			if (result) {
				success(result);
			}else{
				error(404);
			}
		});
	}).end();
};
