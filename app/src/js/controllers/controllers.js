/*!
 * Main controller
 */
function MainController($http){}

/*!
 * form controller
 */
function FormController(Report){
  this.sendReview = function(form){
    /* get coordinate data */
    Report.getCoordinates(form.loc).then(function(location){
      /* send report to database */
      var report = _.extend(form, { loc: location });
      return Report.sendReport(report).then(function(response){
        console.log('response', response);
      }).catch(function(err){
        console.log(err);
      });
    });
  };
}
FormController.$inject = ['Report'];

/*!
 * Home controller
 */
function HomeController(Report){
  this.search = function(query){
    Report.getCoordinates(query).then(function(location){
      console.log(location.coordinates)
    }).catch(function(err){
      //err
    })
  };
}
HomeController.$inject = ['Report'];

/*!
 * MapController
 */
function MapController(uiGmapGoogleMapApi, Report){
  var ctrl = this;

  uiGmapGoogleMapApi.then(function(maps) {

  });

  ctrl.map = {
    models: [],
    center: {
      latitude: 42.305950, 
      longitude: -72.644174
    },
    zoom: 15
  };
}
MapController.$inject = ['uiGmapGoogleMapApi', 'Report'];

angular
  .module('copreview.controllers', [])
  .controller('HomeController', HomeController)
  .controller('MapController', MapController)
  .controller('FormController', FormController)
  .controller('MainController', MainController);