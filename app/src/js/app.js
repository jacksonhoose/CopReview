function config($urlRouterProvider, $stateProvider, $locationProvider){

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl',
      animation: {
        enter: 'slide-in-left-fade',
        leave: 'slide-out-right-fade',
        ease: 'sine',
        speed: 400
      }
    })
    .state('reports', {
      url: '/reports?latitude&longitude&distance',
      templateUrl: '/views/map.html',
      controller: 'MapController',
      controllerAs: 'MapCtrl',
      animation: {
        enter: 'slide-in-left-fade',
        leave: 'slide-out-right-fade',
        ease: 'sine',
        speed: 400
      }
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

angular
  .module('copreview', [
    'copreview.controllers',
    'copreview.factories',
    'copreview.directives',
    'uiGmapgoogle-maps',
    'ui.router',
    'ui.bootstrap',
    'ngFx'
  ])
  .config(config);
