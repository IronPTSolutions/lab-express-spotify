const Artist = require('../models/Artist.model');
const router = require('express').Router();

router.get('/', (req, res) => {
	//res.render('index');
	Artist.find({})
		.then((artistsFromDb) => {
			res.render('artists', { artists: artistsFromDb })
		})
		.catch(e => console.log('Error while finding artists', e));
});

router.get('/artist/create', (req, res) => {
	res.render('artist-form');
});

router.post('/artist/create', (req, res) => {
	const body = req.body;
	body.albums = body.albums.split(',');
	Artist.create(body)
		.then((dbArtist) => {
			console.log(dbArtist);
			res.redirect('/');
		})
		.catch(e => console.error("AAAh", e));
});

router.get('/artist/:id/edit', (req, res) => {
	Artist.findById(req.params.id)
		.then((dbArtist) => res.render('artist-form', dbArtist))
		.catch(e => console.log('Error while finding artist', e));
});

router.post('/artist/:id/edit', (req, res) => {
	const body = req.body;
	body.albums = body.albums.split(',');
	Artist.findByIdAndUpdate(req.params.id, body)
		.then((dbArtist) => {
			console.log(dbArtist);
			res.redirect('/');
		})
		.catch(e => console.error("AAAh", e));
});

router.get('/artist/:artistId', (req, res) => {
	Artist.findById(req.params.artistId)
		.then((artist) => {
			res.render('artist', artist)
		})
		.catch(e => console.log('Error while finding artist', e));
});

router.get('/artist/:id/delete', (req, res) => {
	Artist.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/'))
		.catch(e => console.log('Error while deleting artist', e));
})

module.exports = router;