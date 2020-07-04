require('dotenv').config();
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

/* App routes */
const router = require('./routes/index');
app.use('/', router);

app.listen(3000);
