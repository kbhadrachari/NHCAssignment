var validator = require("validator");
const Reservation = require("../models/reservation");

exports.getReservationByID = function(req, res) {
  return new Promise((resolve, reject) => {
    Reservation.findOne({ id: req.params.id }).then(function(result) {
      if (result) resolve(res.send(result));
      else res.send("Not Found");
    });
  });
};

exports.getReservations = function(req, res) {
  return new Promise((resolve, reject) => {
    var findRes = {};
    if (req.query.name) findRes.name = { $eq: req.query.name };
    if (req.query.hotelName) findRes.hotelName = { $eq: req.query.hotelName };
    if (req.query.arrivalDate)
      findRes.arrivalDate = { $eq: new Date(req.query.arrivalDate) };
    if (req.query.departureDate)
      findRes.departureDate = { $eq: new Date(req.query.departureDate) };
    Reservation.find(findRes).then(function(result) {
      if (result) resolve(res.send(result));
      else res.send("Not Found");
    });
  });
};

exports.addReservation = function(req, res) {
  req.assert("id", "Id is required").notEmpty();
  req.assert("name", "Name is required").notEmpty();
  req.assert("hotelName", "Hotel Name is required").notEmpty();
  req.assert("arrivalDate", "Arrival Date is required").notEmpty();
  req.assert("departureDate", "Departure Date is required").notEmpty();
  var errors = req.validationErrors();

  if (!errors) {
    const reservation = new Reservation(req.body);
    return new Promise((resolve, reject) => {
      reservation
        .save()
        .then(function(errors) {
          res.redirect("/reservation/" + reservation.id);
        })
        .catch(function(errors) {
          var saveErrors = [];
          for (var field in errors.errors) {
            saveErrors.push({
              location: "body",
              parm: field,
              msg: errors.errors[field].message,
              value: errors.errors[field].properties.value
            });
          }
          res.render("index", {
            errors: saveErrors,
            reservation: reservation
          });
        });
    });
  } else {
    //Display Error on page
    res.render("index", {
      errors: errors,
      reservation: req.body
    });
  }
};
