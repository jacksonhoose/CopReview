function Report($http){

  function getCoordinates(loc){
    // get coordinates
    return $http({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc.split(' ').join('+') + '&key=AIzaSyCsYsB_regJb9-OsTdAgJ43SOcOIC54Z04'
    }).then(function(data){
      if(data.status === 200){
        console.log(data);
        return data.data.results[0];
      }
    }).then(function(results){
      /*
        Store address information along with coordinates
       */
      var loc = {
        number: {
          longName: results.address_components[0].long_name,
          shortName: results.address_components[0].short_name
        },

        street: {
          longName: results.address_components[1].long_name,
          shortName: results.address_components[1].short_name
        },
        
        city: {
          longName: results.address_components[2].long_name,
          shortName: results.address_components[2].short_name
        },
        
        county: {
          longName: results.address_components[3].long_name,
          shortName: results.address_components[3].short_name
        },

        state: {
          longName: results.address_components[4].long_name,
          shortName: results.address_components[4].short_name
        },

        country: {
          longName: results.address_components[5].long_name,
          shortName: results.address_components[5].short_name
        },

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
    console.log(_makeQueryString(query));
    return $http.get('/api/report/search' + _makeQueryString(query));
  }

  function sendReport(report){
    return $http.post('/api/report/create', report)
      .then(function(data){
        return data;
      });
  }

  return {
    getCoordinates: getCoordinates,
    sendReport: sendReport,
    find: find
  };
}

Report.$inject = ['$http'];

angular
  .module('copreview.factories', [])
  .factory('Report', Report);