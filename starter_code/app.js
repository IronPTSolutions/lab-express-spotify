const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* Spotify API Client config */

const spotifyApi = new SpotifyWebApi({
  clientId: '3531ef1cad0e43f5b041255aa9c38066',
  clientSecret: '22ab1e554338461fac51a5a2d3756bd4'
});

spotifyApi.clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, (err) => {
    console.log('Something went wrong when retrieving an access token', err);
  });

/* Middlewares config */

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/* App routes */

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/artists', (req, res) => {
  let artist = req.query.artist;

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

app.listen(3000);
