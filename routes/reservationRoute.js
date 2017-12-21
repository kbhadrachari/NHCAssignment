var express = require('express');
var router = express.Router();

/* Require controller modules*/
var reservation_controller = require('../controllers/reservationController');


/* GET request reservation by  id */
router.get('/reservation/:id', reservation_controller.getReservationByID);

/* GET reservations  */
router.get('/reservations', reservation_controller.getReservations);

/* GET request reservation page */
router.get('/reservation', function(req, res) {
    res.render('index');
  });

/* POST  reservation  */
router.post('/reservation', reservation_controller.addReservation);

/* GET  deeplink reservation  */
router.get('/deeplinkReservations', reservation_controller.getReservations);

module.exports = router;

