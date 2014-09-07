'use strict';

var _ = require('lodash');
var Event = require('./event.model');

var Busstop = require('../busstop/busstop.model');
var Utils = require('../../components/util/util');
// Get list of events
exports.index = function(req, res) {
	Event.find(function (err, events) {
		if(err) { return handleError(res, err); }
		return res.json(200, events);
	});
};

// Get a single event
exports.show = function(req, res) {
	var gladGubbe;
	console.log("id " + req.params.id);
	Event.findById(req.params.id, function (err, event) {
		if(err) { return handleError(res, err); }
		if(!event) { return res.send(404); }
		Utils.getWeather(event.location, function(data) {
			parseWeather(data, function(datan) {
				console.log("DATA"  + datan);
				gladGubbe = datan;
				console.log("GLAD GUBBE :) = " + gladGubbe);
				var returnList = { 'event':event, 'weather':gladGubbe};
				return res.json(200, returnList);
			});
		}, handleErrorWeather);
	});
};

// Creates a new event in the DB.
exports.create = function(req, res) {
	Event.create(req.body, function(err, event) {
		if(err) { return handleError(res, err); }
		Utils.nearestBusstop({xCoord:event.location[0], yCoord:event.location[1]}, function(nearestBusstop){
			Busstop.findById(nearestBusstop['@id'], function(err, busstop){
				if (busstop) {
					busstop.events.push({
						_id: event._id,
						name: event.name,
						description: event.description,
						date: event.date
					});
					busstop.save();
				}else{
					Busstop.create({
						_id: nearestBusstop['@id'],
						name: nearestBusstop['name'],
						location: [ nearestBusstop['@x'], nearestBusstop['@y'] ],
						events: [{
							_id: event._id,
							name: event.name,
							description: event.description,
							date: event.date
						}]
					},function(err, busstop){

					});
				}
			});

		});
		return res.json(201, event);
	});
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Event.findById(req.params.id, function (err, event) {
		if (err) { return handleError(res, err); }
		if(!event) { return res.send(404); }
		var updated = _.merge(event, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, event);
		});
	});
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
	Event.findById(req.params.id, function (err, event) {
		if(err) { return handleError(res, err); }
		if(!event) { return res.send(404); }
		event.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};
function parseWeather(data, success) {
	var result = [];
	console.log(data);
	if(data.charAt(0) === '<') {
		return null;
	}
	var dagar = JSON.parse(data).timeseries;
	for(var i=0; i<5;i++) {
		if(dagar[i].pit>0.5) {
			result[i] = { 'element':dagar[i], 'rank':0};
		} else if(dagar[i].pit>0.1) {
			result[i] = { 'element': dagar[i], 'rank':1} ;
		} else if(dagar[i].tcc>4) {
			result[i] = { 'element': dagar[i], 'rank':2} ;
		} else {
			result[i] = { 'element': dagar[i], 'rank':3} ;
		}
	}
	console.log("res " + result);
	success(result);
}
function handleError(res, err) {
	return res.send(500, err);
}
function handleErrorWeather(res, err) {
	return res.send(500, err);
}
