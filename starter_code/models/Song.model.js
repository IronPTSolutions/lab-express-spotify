const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		artists: {
			type: [mongoose.SchemaTypes.ObjectId],
			required: true,
			ref: 'Artist'
		},
		album: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'Album'
		},
		duration: String,
	},
	{
		timestamps: true
	}
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;