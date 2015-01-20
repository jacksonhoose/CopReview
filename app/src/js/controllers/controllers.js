function MainController($http){
  
}

function FormController($http, Report){
  this.sendReview = function(form){
    Report.sendReport(form).then(function(data){
      console.log('done')
    });
  };
}
FormController.$inject = ['$http', 'Report'];

function HomeController(){
  
}

function MapController(uiGmapGoogleMapApi){
  var ctrl = this;

  ctrl.map = {
    models: [],
    center: {
      latitude: 42.305950, 
      longitude: -72.644174
    },
    zoom: 15
  };

 
}

MapController.$inject = ['uiGmapGoogleMapApi'];

angular
  .module('copreview.controllers', [])
  .controller('HomeController', HomeController)
  .controller('MapController', MapController)
  .controller('FormController', FormController)
  .controller('MainController', MainController);