//Set up mongoose connection
var mongoose = require('mongoose');
//below line is to read db details from constant file.
//var dbConstants = require('../constants/dbConstants')

//below line is to read db details from properties file.
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./constants/dbProps.properties');

var dbURL = properties.get('props.db_url');

mongoose.connect(dbURL, {  user: properties.get('props.db_user'), pass: properties.get('props.db_pass'), useMongoClient: true});

mongoose.connection.once('open', function() {
      console.log("Successfully connected to the database");
})

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose  connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
