var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservationSchema = new Schema(
  {
    id: {type: Number, required: true,min: 1,  max: 9999},
    name: {type: String, required: true, max: 100},
    hotelName: {type: String, required: true, max: 100},
    arrivalDate: {type: Date, default: Date.now, validate: [dateValidator, 'Arrival Date must be today or later and  less than Depature Date']}, 
    departureDate: {type: Date, default: Date.now, validate: [dateValidator, 'Departure Date must be today or later and greater than Arrival Date']} 
  }
);

// function to validate the arrival and depature dates
function dateValidator(value) {
  if (this.arrivalDate < new Date())
    return false;
  if (this.arrivalDate > this.departureDate)
    return false;
  if (this.departureDate < new Date())
    return false;
  return true;
}

module.exports = mongoose.model('Reservation', ReservationSchema,'reservation');