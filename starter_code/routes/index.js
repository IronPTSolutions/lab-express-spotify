const router = require('express').Router();
const Artist = require('../models/Artist.model');

/* router routes */
router.get('/', (req, res) => {
	//res.render('index');
	Artist.find({})
		.then((artistsFromDb) => {
			res.render('artists', { artists: artistsFromDb })
		})
		.catch(e => console.log('Error while finding artists', e));
});

router.get('/artist/:artistId', (req, res) => {
	//res.render('index');
	Artist.findById(req.params.artistId)
		.then((artist) => {
			res.render('artist', artist)
		})
		.catch(e => console.log('Error while finding artist', e));
});

router.get('/artists', (req, res) => {
	spotifyApi.searchArtists(req.query.artist)
		.then(function (data) {
			res.render('artists', {
				artists: data.body.artists.items
			});
		}, function (err) {
			console.log('Something went wrong!', err);
		});
});

router.get('/albums/:artistId', (req, res, next) => {
	spotifyApi.getArtistAlbums(req.params.artistId)
		.then(function (data) {
			res.render('albums', {
				albums: data.body.items
			});
		}, function (err) {
			console.log('Something went wrong!', err);
		});
});

router.get('/tracks/:albumId', (req, res, next) => {
	spotifyApi.getAlbumTracks(req.params.albumId)
		.then(function (data) {
			res.render('tracks', {
				tracks: data.body.items
			});
		}, function (err) {
			console.log('Something went wrong!', err);
		});
});

module.exports = router;