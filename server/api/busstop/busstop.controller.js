'use strict';

var currentLocation;
var http = require("http");
var https = require("https");
var _ = require('lodash');
var Busstop = require('./busstop.model');

// Get list of busstops
exports.index = function(req, res) {
	console.log("INDEX");
	Busstop.find(function (err, busstops) {
		if(err) { return handleError(res, err); }
		return res.json(200, busstops);
	});
};

// Get a single busstop
exports.show = function(req, res) {
	console.log("asdfasd");
	Busstop.findById(req.params.id, function (err, busstop) {
		if(err) { return handleError(res, err); }
		if(!busstop) { return res.send(404); }
		return res.json(busstop);
	});
};

// Creates a new busstop in the DB.
exports.create = function(req, res) {
	Busstop.create(req.body, function(err, busstop) {
		if(err) { return handleError(res, err); }
		return res.json(201, busstop);
	});
};

// Updates an existing busstop in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Busstop.findById(req.params.id, function (err, busstop) {
		if (err) { return handleError(res, err); }
		if(!busstop) { return res.send(404); }
		var updated = _.merge(busstop, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, busstop);
		});
	});
};

// Deletes a busstop from the DB.
exports.destroy = function(req, res) {
	Busstop.findById(req.params.id, function (err, busstop) {
		if(err) { return handleError(res, err); }
		if(!busstop) { return res.send(404); }
		busstop.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

exports.currentLocation = function(req, res) {
	var position = JSON.parse(req.params.currentLocation);
	var closestBusstop;
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
			currentLocation = JSON.parse(str).stationsinzoneresult.location[0];
			closestBusstop = {
				'id':currentLocation["@id"],
				"name": currentLocation.name,
				"location": [currentLocation["@x"], currentLocation["@y"]]
			};
			Busstop.findById(7410957, function(err, busstop) {
				if(err) { return handleError(res ,err); }
				if(!busstop) {return res.send(404); }
				return res.json(200,busstop.events); 
			});
		});
	}).end();
};

function handleError(res, err) {
	return res.send(500, err);
}

