const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		artists: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: 'Artist'
		},
		album: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Album'
		},
		duration: String
	}
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
