function config($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider, uiGmapGoogleMapApiProvider){

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .state('map', {
      url: '/reports/:coords?',
      templateUrl: '/views/map.html',
      controller: 'MapController',
      controllerAs: 'MapCtrl',
      resolve: {
        results: function($stateParams, Report){
          if($stateParams.coords.length){
            var coords = $stateParams.coords.split(',').map(function(coord){
              return parseFloat(coord);
            });
            return Report.find({ coordinates: coords }).then(function(results){
              console.log(results);
              return results;
            });
          }
          return '';
        }
      }
    });

  $urlRouterProvider.otherwise('/');

  // uiGmapGoogleMapApiProvider.configure({
  //   key: 'AIzaSyCsYsB_regJb9-OsTdAgJ43SOcOIC54Z04',
  //   v: '3.17',
  //   libraries: 'weather,geometry,visualization'
  // });
  
  $locationProvider.html5Mode(true);

}



angular
  .module('copreview', [
    'copreview.controllers',
    'copreview.factories',
    'uiGmapgoogle-maps',
    'ui.router',
    'ui.bootstrap',
  ])
  .config(config);
