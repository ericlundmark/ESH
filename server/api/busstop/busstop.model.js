'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BusstopSchema = new Schema({
	_id: Number,
	name: String,
	location: [ Number ],
	events: [{
		_id: Schema.Types.ObjectId,
		name: String,
		description: String,
		date: Date
	}]
});

module.exports = mongoose.model('Busstop', BusstopSchema);
