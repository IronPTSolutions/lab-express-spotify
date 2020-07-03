const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		image: String,
		artistType: {
			type: String,
			required: true,
			enum: ['band', 'singer']
		},
		genre: {
			type: String,
			enum: ['rock', 'pop', 'blues', 'jazz']
		}
	}
);

artistSchema.virtual('albums', {
	ref: 'Album',
	localField: '_id',
	foreignField: 'artist'
});

const Artist = mongoose.model('Artist', artistSchema); // artists

module.exports = Artist;
