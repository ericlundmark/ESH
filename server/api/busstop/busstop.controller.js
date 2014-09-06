'use strict';

var _ = require('lodash');
var Busstop = require('./busstop.model');

// Get list of busstops
exports.index = function(req, res) {
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
	console.log("hej");
};

function handleError(res, err) {
  return res.send(500, err);
}
