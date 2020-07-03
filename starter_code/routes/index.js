const router = require('express').Router();
const Artist = require('../models/Artist.model');
const SpotifyWebApi = require('spotify-web-api-node');

/* Spotify API Client config */
const spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET
});

spotifyApi.clientCredentialsGrant()
	.then((data) => {
		spotifyApi.setAccessToken(data.body.access_token);
	}, (err) => {
		console.log('Something went wrong when retrieving an access token', err);
	});

router.get('/', (req, res, next) => {
	//res.render('index');
	Artist.find({})
		.then((artistsFromDb) => {
			res.render('artists', { artists: artistsFromDb })
		})
		.catch(e => next(e));
});

router.get('/artist/create', (req, res, next) => {
	res.render('artist-form');
});

router.post('/artist/create', (req, res, next) => {
	Artist.create(req.body)
		.then((dbArtist) => res.redirect('/'))
		.catch(e => next(e));
});

router.get('/artist/:id/edit', (req, res, next) => {
	Artist.findById(req.params.id)
		.then((artist) => res.render('artist-form', artist))
		.catch(e => next(e));
});

router.post('/artist/:id/edit', (req, res, next) => {
	Artist.findByIdAndUpdate(req.params.id, req.body)
		.then((dbArtist) => res.redirect('/'))
		.catch(e => next(e));
});

router.get('/artist/:id/delete', (req, res, next) => {
	Artist.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/'))
		.catch(e => next(e));
})

router.get('/artist/:artistId', (req, res, next) => {
	//res.render('index');
	Artist.findById(req.params.artistId)
		.then((artist) => {
			res.render('artist', artist)
		})
		.catch(e => next(e));
});

router.get('/artists', (req, res, next) => {
	spotifyApi.searchArtists(req.query.artist)
		.then(function (data) {
			res.render('artists', {
				artists: data.body.artists.items
			});
		}, function (err) {
			next(err);
		});
});

router.get('/albums/:artistId', (req, res, next) => {
	spotifyApi.getArtistAlbums(req.params.artistId)
		.then(function (data) {
			res.render('albums', {
				albums: data.body.items
			});
		}, function (err) {
			next(err);
		});
});

router.get('/tracks/:albumId', (req, res, next) => {
	spotifyApi.getAlbumTracks(req.params.albumId)
		.then(function (data) {
			res.render('tracks', {
				tracks: data.body.items
			});
		}, function (err) {
			next(err);
		});
});

module.exports = router;