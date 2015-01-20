function config($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider, uiGmapGoogleMapApiProvider){

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .state('map', {
      url: '/reports',
      templateUrl: '/views/map.html',
      controller: 'MapController',
      controllerAs: 'MapCtrl'
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
    'ui.router'
    // 'ui.bootstrap'
  ])
  .config(config);
