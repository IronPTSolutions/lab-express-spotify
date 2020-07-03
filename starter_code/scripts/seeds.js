require('../config/db.config');
const process = require('process');

const Artist = require('../models/Artist.model');
const Album = require('../models/Album.model');
const Song = require('../models/Song.model');
const mongoose = require('mongoose');

const artists = [
	{
		name: 'Muse',
		albums: [
			{
				name: 'Simulation Theory',
				songs: [
					{
						name: "Algorithm",
						artists: ['Queen'],
						duration: "4:06"
					},
					{
						name: 'The Dark Side',
						artists: [],
						duration: '3:47'
					},
				]
			}, {
				name: 'Drones',
				songs: [
					{
						name: 'Dead Inside',
						artists: [],
						duration: '4:23'
					},
					{
						name: 'Mercy',
						artists: [],
						duration: '3:52'
					},
				]
			}],
		artistType: 'band',
		image: 'https://i.scdn.co/image/12450535621500d6e519275f2c52d49c00a0168f',
		genre: 'rock'
	},
	{
		name: 'The Beatles',
		albums: [
			{
				name: 'Abbey Road',
				songs: [
					{
						name: 'Come Together',
						artists: [],
						duration: '4:19'
					},
					{
						name: 'Here Comes the Sun',
						artists: [],
						duration: '3:06'
					},
				]
			}, {
				name: 'Let It Be',
				songs: [
					{
						name: 'Across The Universe',
						artists: [],
						duration: '3:48'
					},
					{
						name: 'Let It Be',
						artists: [],
						duration: '4:03'
					},
				]
			}],
		artistType: 'band',
		image: 'https://i.scdn.co/image/6b2a709752ef9c7aaf0d270344157f6cd2e0f1a7',
		genre: 'rock'
	},
	{
		name: 'Queen',
		albums: [
			{
				name: 'A night at the Opera',
				songs: [
					{
						name: 'Death on two legs',
						artists: [],
						duration: '3:44'
					},
					{
						name: 'Bohemian Rhapsody',
						artists: [],
						duration: '5:54'
					},
				]
			}, {
				name: 'A Kind of Magic',
				songs: [
					{
						name: 'One Vision',
						artists: [],
						duration: '5:11'
					},
					{
						name: 'Who Wants to Live Forever',
						artists: [],
						duration: '5:15'
					},
				]
			}],
		artistType: 'band',
		image: 'https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982',
		genre: 'rock'
	},
	{
		name: 'Ariana Grande',
		albums: [
			{
				name: 'thank u, next',
				songs: [
					{
						name: 'imagine',
						artists: [],
						duration: '3:32'
					},
					{
						name: 'needy',
						artists: [],
						duration: '2:52'
					},
				]
			}, {
				name: 'Sweetener',
				songs: [
					{
						name: 'raindrops (an angel cried)',
						artists: [],
						duration: '0:38'
					},
					{
						name: 'blazed',
						artists: [],
						duration: '3:16'
					},
				]
			}],
		image: 'https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a',
		artistType: 'singer',
		genre: 'pop'
	}
];

mongoose.connection.dropDatabase()
	.then(() => Artist.insertMany(artists.map(artist => ({ ...artist, albums: undefined }))))
	.then((dbArtists) => Promise.all(
		dbArtists.map(
			(dbArtist) =>
				Album.insertMany(
					artists
						.find(artist => artist.name === dbArtist.name)
						.albums.map(album => ({ ...album, artist: dbArtist.id, songs: undefined }))
				)
		)
	))
	.then((dbArtistsAlbums) =>
		Promise.all(
			dbArtistsAlbums.flatMap(
				(dbAlbums) => {
					return dbAlbums.map(dbAlbum => {
						const album = artists
							.map(artist => artist.albums)
							.reduce((acc, curr) => [...acc, ...curr])
							.find(album => album.name === dbAlbum.name);
						return Song.insertMany(
							album.songs.map(song => ({
								...song,
								album: dbAlbum.id,
								artists: [...song.artists.map(
									songArtist =>
										dbArtistsAlbums.find(dbAlbums => dbAlbums.find(album => artists.find(artist => artist.name === songArtist).albums[0].name === album.name)).artist
								), dbAlbum.artist]
							}))
						)
					})
				}
			)
		)
	)
	.then(() => console.log('Done!'))
	.catch((e) => console.error('Error seeding', e))
	.finally(() => process.exit());
