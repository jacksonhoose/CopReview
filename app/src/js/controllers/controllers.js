/*!
 * Main controller
 */
function MainController($http){
  var vm = this;
  vm.showForm = false;
  vm.createAReport = function(){
    vm.showForm = !vm.showForm;
  };
}

/*!
 * form controller
 */
function FormController(Report){
  this.sendReview = function(form){
    /* get coordinate data */
    Report.getCoordinates(form.loc).then(function(location){
      
      /* send report to database */
      var report = _.extend(form, { loc: location });

      return Report.createReport(report).then(function(response){
        console.log('report created', response);
      }).catch(function(err){
        console.log('Form error', err);
      });
      
    });
  };
}
FormController.$inject = ['Report'];

/*!
 * Home controller
 */
function HomeController($state, Report){
  this.search = function(query){
    Report.getCoordinates(query).then(function(location){
      // if the query returns valid coordinates redirect to the map page aiming at the coords
      if(location && location.hasOwnProperty('coordinates')){
        // redirect to reports page
       
        $state.go('reports', {
          latitude: location.coordinates[1],
          longitude: location.coordinates[0],
          distance: 5
        });

      } else {

        console.log('invalid location');

      }
      // otherwise send back validation (not a valid location)
      
    }).catch(function(err){
      // otherwise 
    })
  };
}
HomeController.$inject = ['$state', 'Report'];

/*!
 * MapController
 */
function MapController(uiGmapGoogleMapApi, $stateParams, $location, Report){
  var vm = this;

  // current map
  vm.map = {
    models: [],
    pan: true,
    center: {
      latitude: 42.305950, 
      longitude: -72.644174
    },
    showHeat: true,
    bounds: {},
    zoom: 15,
    heatLayerCallback: function(layer){
      var data = [], pointArray;
      
      vm.map.models.forEach(function(point){
        data.push({ 
          location: new google.maps.LatLng(point.loc.coordinates[1], point.loc.coordinates[0]), 
          weight: point.rating
        });
      });
      
      pointArray = new google.maps.MVCArray(data);
      
      layer.set('gradient', [
        'rgba(255, 1, 1, 0)',
        'rgba(255, 0, 0, 1)',
        'rgba(254, 47, 14, 1)',
        'rgba(253, 121, 35, 1)',
        'rgba(247, 171, 50, 1)',
        'rgba(239, 195, 56, 1)',
        'rgba(120, 193, 56, 1)',
        'rgba(102, 218, 63, 1)',
        'rgba(92, 218, 62, 1)',
        'rgba(72, 218, 62, 1)',
        'rgba(52, 218, 63, 1)',
        'rgba(32, 218, 62, 1)',
        'rgba(18, 218, 62, 1)',
        'rgba(6, 218, 62, 1)'
      ]);

      layer.set('radius', 20);

      layer.setData(pointArray);
    }
  };

  vm.search = function(query){
    Report.getCoordinates(query).then(function(location){
      // if the query returns valid coordinates redirect to the map page aiming at the coords
      if(location && location.hasOwnProperty('coordinates')){
        // update search params to reflect new query
        $location.search({
          latitude: location.coordinates[1],
          longitude: location.coordinates[0],
          distance: 5
        });
       
        // reset current details to null
        executeSearch();

      } else {
        console.log('invalid location');
      }
    });
  };

  // currently displayed details
  vm.currentDetails = null;

  // map point click handler
  vm.showDetails = function(val){
    vm.currentDetails = val.model;
    vm.map.center.latitude = val.model.loc.coordinates[1];
    vm.map.center.longitude = val.model.loc.coordinates[0];
  };

  executeSearch();

  function executeSearch() {
    // populate map with data
    Report.find($stateParams).then(function(results){
      return results.data.map(function(coord){
        return coord.obj;
      });
    }).then(function(models){
      vm.map.models = models;
      vm.currentDetails = null;
      vm.map.center.latitude = $stateParams.latitude;
      vm.map.center.longitude = $stateParams.longitude;
    });
  }
}
MapController.$inject = ['uiGmapGoogleMapApi', '$stateParams', '$location', 'Report'];

angular
  .module('copreview.controllers', [])
  .controller('HomeController', HomeController)
  .controller('MapController', MapController)
  .controller('FormController', FormController)
  .controller('MainController', MainController);