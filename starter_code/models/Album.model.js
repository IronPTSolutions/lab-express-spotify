const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		artist: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'Artist'
		},
	},
	{
		timestamps: true
	}
);

albumSchema.virtual('songs', {
	ref: 'Song',
	localField: '_id',
	foreignField: 'album'
})

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;