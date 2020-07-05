const mongoose = require('mongoose');
require('./Song.model');
const albumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		artist: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Artist'
		},
		image: {
			type: String,
			default: 'https://www.nierle.com/pic/2161b.jpg'
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
