"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testSchema = new Schema(
  {
    id: {type: Number, required: true,min: 1,  max: 9999},
    name: {type: String, required: true, max: 100},
    hotelName: {type: String, required: true, max: 100},
    arrivalDate: {type: Date, default: Date.now}, 
    departureDate: {type: Date, default: Date.now} 
  }, 
);
const Reservation =  mongoose.model('testreservation', testSchema, 'testreservation')

var testData = Reservation({ id:'112', name: 'Test', hotelName:'Hilton', arrivalDate:'11/01/2018', departureDate:'12/01/2018'});
var testDataWithEmptyId = Reservation({ id:'', name: 'Test', hotelName:'Hilton', arrivalDate:'11/01/2018', departureDate:'12/01/2018'});
var testInvalidData = Reservation({ id:'110', name: 'Test', hotelName:'Hilton', arrivalDate:'11/01/2018', departureDate:'12/01/2018'});


describe('Reservation Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://ds139446.mlab.com:39446/reservation_db',{  user:'resdb', pass: 'reservation',useMongoClient: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Reservation Database', function() {
    //Save object 
    it('New Reservation saved to test database', function(done) {
      var testRes = Reservation(testData);
       testRes.save(done);
    });
    it("Don\'t save empty data to database", function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Reservation(testDataWithEmptyId);
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve previously saved data from  database', function(done) {
      //Look up  object.
      Reservation.find({id: testData.id}, (err, res) => {
        if(err) {throw err;}
        if(res == null ) {throw new Error('No data!');}
        if(res != null && res.length == 0 ) {throw new Error('No data!');}
        done();
      });
    });
    it('Should not retrieve data from  database - no existing reservation', function(done) {
      //Look up  object.
      Reservation.find({id: testInvalidData.id}, (err, res) => {
        if(err) {throw err;}
        if(res == null ) {throw new Error('No data!');}
        if(res != null && res.length == 0 ) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished close connection
  after(function(done){
      mongoose.connection.close(done);  
  });
});
