var router = module.exports = require('express').Router(),
  Report = require('../db/models/report');

/*!
 * Create a report
 */
router.post('/create', function(req, res, next){
  var report = new Report(req.body);
  report.save(function(err, result){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json(result);
  });
});

/*!
 * display reports 
 */
router.get('/search', function(req, res, next){
  
  var latitude = parseFloat(req.query.latitude);
  var longitude = parseFloat(req.query.longitude);
  var distance = req.query.distance || 1;

  // Find points within a mile of a point
  Report.geoNear({
    type: 'Point',
    coordinates: [longitude, latitude]
  }, { 
    spherical: true,
    distanceMultiplier: 3959,
    minDistance: 0,
    maxDistance: distance/3959
  }, function(err, reports) {
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json(reports);
  });

});