'use strict';

var https = require("https");
var http = require('http');

module.exports.nearestBusstop = function(position, success, error){
	console.log(position.xCoord);
	var radius = 500;
	var str = '';

	var options = {
		method: 'GET',
		host: 'api.trafiklab.se',
		path: '/samtrafiken/resrobot/StationsInZone.json'+
			'?key=DgKtW2dvK9XZRnjrYeXhptwDJP6RDUNj'+
			'&centerX=' + position.xCoord +
			'&centerY=' + position.yCoord +
			'&radius=' + radius +
			'&coordSys=WGS84' +
			'&apiVersion=2.1'
	};
	//console.log("LONGITUDE: "+position);
	var req = https.request(options, function(response){
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			var parsed = JSON.parse(str);
			console.log(parsed);
			var result = parsed.stationsinzoneresult.location[0];
			if (result) {
				success(result);
			}else{
				error(404);
			}
		});
	}).end();
};
