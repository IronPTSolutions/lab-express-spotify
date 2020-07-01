const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		images: [String],
		albums: [String],
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
)

const Artist = mongoose.model('Artist', artistSchema); // artists

module.exports = Artist;
