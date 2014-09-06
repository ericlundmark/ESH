'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EventSchema = new Schema({
	name: String,
	author: {
		_id: Schema.Types.ObjectId,
		name: String
	},
	created: { type: Date, default: Date.now },
	description: String,
	location: String,
	date: { type: Date, default: null },
	coordinate: Coordinate,
	busStop: {
		_id: String,
		name: String
	}
});

module.exports = mongoose.model('Event', EventSchema);