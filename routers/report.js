var router = module.exports = require('express').Router(),
  Report = require('../db/models/report');

/*!
 * Create a report
 */
router.post('/create', function(req, res, next){
  var report = new Report(req.body);
  report.save(function(err, report){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json(report);
  });
});

/*!
 * display reports 
 */
router.get('/search', function(req, res, next){
  
  var coords = req.query.coordinates.split(',');

  // Find points within a mile of a point
  Report.geoNear({
    type: 'Point',
    coordinates: coords
  }, { 
    spherical: true,
    distanceMultiplier: 3959,
    maxDistance: 5/3959 // 5 miles?
  }, function(err, reports) {
    if(err){
      res.status(500).end();
    }
    res.json(reports);
  });

});