require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* Middlewares config */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/* Mongoose config */
require('./config/db.config');
const Artist = require('./models/Artist.model');

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

/* App routes */
app.get('/', (req, res) => {
  //res.render('index');
  Artist.find({})
    .then((artistsFromDb) => {
      res.render('artists', { artists: artistsFromDb })
    })
    .catch(e => console.log('Error while finding artists', e));
});

app.get('/artist/:artistId', (req, res) => {
  //res.render('index');
  Artist.findById(req.params.artistId)
    .then((artist) => {
      res.render('artist', artist)
    })
    .catch(e => console.log('Error while finding artist', e));
});

app.get('/artists', (req, res) => {
  spotifyApi.searchArtists(req.query.artist)
    .then(function (data) {
      res.render('artists', {
        artists: data.body.artists.items
      });
    }, function (err) {
      console.log('Something went wrong!', err);
    });
});

app.get('/albums/:artistId', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
    .then(function (data) {
      res.render('albums', {
        albums: data.body.items
      });
    }, function (err) {
      console.log('Something went wrong!', err);
    });
});

app.get('/tracks/:albumId', (req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.albumId)
    .then(function (data) {
      res.render('tracks', {
        tracks: data.body.items
      });
    }, function (err) {
      console.log('Something went wrong!', err);
    });
});

app.listen(3001);
