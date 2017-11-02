var router = require('express').Router();
var modelPlace = require('../models/place');
var modelBooking = require('../models/booking');

//Get place 
router.get('/:id', function (req, res, next) {

    modelPlace.getPlace(req.params.id, (err, rows) => {
        place = rows[0]
        if (typeof place === 'undefined') {
            return res.redirect('/place/');
        }
        res.render('place/get', {data: place});
    });
});

//Get booking information
router.get('/:id/book', function (req, res, next) {
    modelPlace.getPlace(req.params.id, (err, rows) => {
        var place = rows[0]
        modelBooking.getBookingListForId(place.id,req.session.userid, (err, rows) => {
            if(!rows) {
                rows = [];
            }
            res.render('place/booking', {dataPlace: place, dataBooking: rows})
        })
    });
});
//POST booking information
router.post('/:id/book', function (req, res, next) {
    console.log(req.body);
    if (!req.body.dateStart || !req.body.dateEnd) {
        return res.status(500).end();
    }
    modelPlace.getPlace(req.params.id, (err, rows) => {
        var place = rows[0];
        modelBooking.AddBookingInfo(req.body.dateStart, req.body.dateEnd, place, req.session.userid, (err, rows) => {
            if(err) {
                console.log(err);
                return res.status(500).end();
            }
            return res.status(200).end();
        })
    });
});

// Get place list
router.get('/', function (req, res, next) {

    // fetching list
    modelPlace.getList((err, rows) => {
        res.render('place/list', {data: rows})
    });

});

module.exports = router;
