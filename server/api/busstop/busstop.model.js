'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BusstopSchema = new Schema({
	_id: String,
	name: String,
	coordinate: Coordinate,
	events: [{
		_id: Schema.Types.ObjectId,
		name: String,
		description: String,
	}]
});

module.exports = mongoose.model('Busstop', BusstopSchema);