var router = module.exports = require('express').Router(),
  Report = require('../db/models/report');

/*!
 * Create a report
 */
router.post('/create', function(req, res, next){
  var data = req.body;
  var report = new Report(data);
  report.save(function(err, report){
    if(err){
      res.status(500).end();
    }
    res.json(report);
  });
});

/*!
 * display reports 
 */
router.get('/', function(req, res, next){
  var params = req.query;
  // Find points within a mile of a point
  Report.geoNear({
    type: 'Point',
    coordinates:[-72.622342, 42.328964]
  }, { 
    spherical: true,
    distanceMultiplier: 3959,
    maxDistance: 1/3959
  }, function(err, reports) {
    if(err){
      res.status(500).end();
    }
    res.json(reports);
  });

});