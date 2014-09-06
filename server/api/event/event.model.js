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
	location: [ Number ],
	date: { type: Date, default: null },
	outdoor: { type: Boolean, default: false },
	busStop: {
		_id: Number,
		name: String
	}
});

module.exports = mongoose.model('Event', EventSchema);
