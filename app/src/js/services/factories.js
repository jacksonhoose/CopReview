function Report($http){

  function getCoordinates(loc){
    // get coordinates
    return $http({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc.split(' ').join('+') + '&key=AIzaSyCsYsB_regJb9-OsTdAgJ43SOcOIC54Z04'
    }).then(function(data){
      if(data.status === 200){
        return data.data.results[0];
      }
    }).then(function(results){
      
      /*
        Store address information along with coordinates
       */
      var loc = {
        // number: {
        //   longName: results.address_components[0].long_name,
        //   shortName: results.address_components[0].short_name
        // },

        // street: {
        //   longName: results.address_components[1].long_name,
        //   shortName: results.address_components[1].short_name
        // },
        
        // city: {
        //   longName: results.address_components[2].long_name,
        //   shortName: results.address_components[2].short_name
        // },
        
        // county: {
        //   longName: results.address_components[3].long_name,
        //   shortName: results.address_components[3].short_name
        // },

        // state: {
        //   longName: results.address_components[4].long_name,
        //   shortName: results.address_components[4].short_name
        // },

        // country: {
        //   longName: results.address_components[5].long_name,
        //   shortName: results.address_components[5].short_name
        // },

        // zipcode: {
        //   longName: results.address_components[6].long_name,
        //   shortName: results.address_components[6].short_name
        // },

        // zipSuffix: {
        //   longName: results.address_components[7].long_name,
        //   shortName: results.address_components[7].short_name
        // },

        coordinates: [results.geometry.location.lng, results.geometry.location.lat]
  
      };

      return loc;

    }).then(function(location){
      return location;
    }).catch(function(err){
      console.log('error getting coordinates');
    });

  }

  function _makeQueryString(obj){
    var keys = Object.keys(obj);
    return keys.reduce(function(string, key, i){
      return i + 1 === keys.length 
        ? string + key + '=' + obj[key].toString()
        : string + key + '=' + obj[key].toString() + '&';
    }, '?');
  }

  function find(query){
    return $http.get('/api/report/search' + _makeQueryString(query));
  }

  function createReport(report){
    return $http.post('/api/report/create', report)
      .then(function(data){
        console.log('DATA', data)
        return data;
      });
  }

  return {
    getCoordinates: getCoordinates,
    createReport: createReport,
    find: find
  };
}

Report.$inject = ['$http'];

function HeatLayer(){
  // Adding 500 Data Points
  var map, pointArray, heatMap;

  var heatData = [];

  function createData(data){
    data.forEach(function(point){
      // create new point
      new google.maps.LatLng(37.751266, -122.403355)
    });

    pointArray = new google.maps.MVCArray(heatData);
    heatMap.setData(pointArray);
  }  

  function changeGradient() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  function changeRadius() {
     heatmap.set('radius', heatmap.get('radius') ? null : 20);
  }

  function changeOpacity() {
     heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
  }

  return {
    createData: createData, 
  };  

}

angular
  .module('copreview.factories', [])
  .factory('Report', Report)
  .factory('HeatLayer', HeatLayer);