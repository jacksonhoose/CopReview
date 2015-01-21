function fullHeight(){
  var directive = {};
  directive.restrict = 'A';
  directive.link = function(scope, el, attrs){
    // var header = angular.element(document.getElementsByTagName('header')[0]);
    // angular.element(window).on('resize', function(e){
    //   el.css('height', window.outerHeight);
    // });
  };

  return directive;
}

angular
  .module('copreview.directives', [])
  .directive('fullHeight', fullHeight);