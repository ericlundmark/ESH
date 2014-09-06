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
module.exports.getWeather = function(position, success, error){
	var radius = 500;
	var str = '';
	console.log("post " + position[0]);
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
		if (result) {
			success(result);
		}else{
			error(404);
		}
	});
	}).end(); 
}
