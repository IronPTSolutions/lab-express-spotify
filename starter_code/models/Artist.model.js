const mongoose = require('mongoose');
const Album = require('./Album.model');

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
	foreignField: 'artist',
	localField: '_id'
});

const Artist = mongoose.model('Artist', artistSchema); // artists

module.exports = Artist;
