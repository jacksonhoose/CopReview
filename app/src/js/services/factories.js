function Report($http){

  function sendReport(report){
    console.log(encodeURIComponent(report.loc));
    // get coordinates
    return $http({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?' + encodeURIComponent(report.loc) + '&key=AIzaSyCsYsB_regJb9-OsTdAgJ43SOcOIC54Z04'
    }).then(function(data){
      console.log(data);
    });
  }

  return {
    sendReport: sendReport
  };
}

Report.$inject = ['$http'];

angular
  .module('copreview.factories', [])
  .factory('Report', Report);