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
		'&centerX=' + position.xCoord +
		'&centerY=' + position.yCoord +
		'&radius=' + radius +
		'&coordSys=WGS84' +
		'&apiVersion=2.1'
	};
	var req = https.request(options, function(response){
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			var parsed = [];
			if(JSON.parse(str).stationsinzoneresult != undefined) {
				parsed = JSON.parse(str).stationsinzoneresult.location;
			}
			var result = null;
			if(parsed !== undefined && parsed.length > 0) {
				result = parsed[0];
			}
			if (result != null) {
				success(result);
			}
		});
	}).end();
};
module.exports.getWeather = function(position, success, error){
	var radius = 500;
	var str = '';
	console.log("GET WEATHER " + position[0]);
	var options = {
		method: 'GET',
		host:'opendata-download-metfcst.smhi.se',
		path:'/api/category/pmp1.5g/version/1/geopoint' +
		'/lat/'+position[0]+
		'/lon/'+position[1]+
		'/data.json'
	};
	http.request(options, function(response){
		var str = ''
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			var result = str;
			console.log(JSON.stringify(result));
			if (result) {
				if(JSON.stringify(result).charAt(3) == '<') {
					console.log("BLÄ");
					error(404);
				}
				success(result);
			}else{
				error(404);
			}
		});
	}).end(); 
}
