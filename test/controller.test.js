var request = require("request");

var assert = require('assert');
var base_url = "http://localhost:3000/reservation";
var url_to_test = [
                    'http://localhost:3000/reservation', 
                    'http://localhost:3000/reservations',
                    'http://localhost:3000/reservation/888',
                ];
var testData = { id:'115', name: 'Test', hotelName:'Hilton', arrivalDate:'11/01/2018', departureDate:'12/01/2018'};

describe("Reservations", function() {
  describe("GET /reservation", function() {
    url_to_test.forEach(function(url){
        it("returns status code 200 " + url, function() {        
            request.get(url, function(error, response, body) {
                if(error) {throw error;}
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
  });
  describe("POST /reservation", function() {
    it("returns status code 200 " + base_url, function() {     
        request.post(base_url, function(error, response, testData) {
            if(error) {throw error;}
            assert.equal(200, response.statusCode);
            done();
    });
});
  });
});
