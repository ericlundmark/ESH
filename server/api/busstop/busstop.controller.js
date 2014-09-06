'use strict';

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
		var updated = _.merge(busstop, req.body, function(a, b) {
			return _.isArray(a) ? (a=b) : undefined;
		});
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
	console.log("KOM HIT");
	var stop = makeApiCallToOstgotatrafiken(req.body.position);
	console.log("hej " + stop);
	var e = "hej";
	return res.json(200,e); 
};

function handleError(res, err) {
	return res.send(500, err);
}

function makeApiCallToOstogotaTrafiken(position) {
	var radius = 1000;
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
	https.request(options, function(response){
		var str = ''
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			return JSON.parse(str);
		});
	}).end();
}
