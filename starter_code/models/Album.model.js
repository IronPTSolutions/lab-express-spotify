const mongoose = require('mongoose');
const Song = require('./Song.model');
const albumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		artist: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Artist'
		}
	}
);

albumSchema.virtual('songs', {
	ref: 'Song',
	foreignField: 'album',
	localField: '_id'
})

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
