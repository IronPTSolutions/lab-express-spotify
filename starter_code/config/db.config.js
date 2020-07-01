const process = require('process');
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb://localhost/spotify-mongoose',
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
	.catch(err => console.error('Error connecting to mongo', err));

process
	.on('SIGINT', () => {
		mongoose.connection.close().then(() => console.log('Disconnected on SIGINT'));
	});