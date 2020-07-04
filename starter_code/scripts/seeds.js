require('../config/db.config');
const process = require('process');
const Artist = require('../models/Artist.model');

const artists = [
	{
		name: 'Muse',
		albums: ['Simulation Theory', 'Drones', 'The 2nd Law', 'The Resistance', 'Black Holes and Revelations'],
		artistType: 'band',
		images: ['https://i.scdn.co/image/12450535621500d6e519275f2c52d49c00a0168f'],
		genre: 'rock'
	},
	{
		name: 'The Beatles',
		albums: ['Abbey Road', 'Live at the BBC', 'Let It Be', 'Yellow Submarine', 'The Beatles', 'Help!'],
		artistType: 'band',
		images: ['https://i.scdn.co/image/6b2a709752ef9c7aaf0d270344157f6cd2e0f1a7'],
		genre: 'rock'
	},
	{
		name: 'Queen',
		albums: ['A Night at the Opera', 'Live at Wembley Stadium', 'Innuendo', 'A Kind of Magic', 'The Game'],
		artistType: 'band',
		images: ['https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982'],
		genre: 'rock'
	},
	{
		name: 'Ariana Grande',
		albums: ['thank u, next', 'Sweetener', 'Dangerous Woman', 'My Everything', 'Yours Truly'],
		images: ['https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a'],
		artistType: 'singer',
		genre: 'pop'
	}
];

Artist.deleteMany({})
	.then(() => Artist.insertMany(artists))
	.then((artistsFromDb) => {
		console.log('Inserted artists');
	})
	.catch((e) => console.log(e))
	.finally(() => process.exit());
