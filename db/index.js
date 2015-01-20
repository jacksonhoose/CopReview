var mongoose = require('mongoose');
var connection = process.env.NODE_ENV === 'production'
  ? 'mongodb://production/db' // production connection
  : 'mongodb://localhost/MVP'  // development connection

mongoose.connect(connection);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function(){
  console.log('MongoDB connection is open.');
});

module.exports = mongoose.connection;