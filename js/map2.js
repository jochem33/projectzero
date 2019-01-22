//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt

var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.676814, 139.764176], 
    zoom: 12 
  });

  tomtom.routing() 
  .locations('37.7683909618184,-122.51089453697205:37.769167,-122.478468')
  .go().then(function(routeJson) {
      var route = tomtom.L.geoJson(routeJson, {
          style: {color: '#00d7ff', opacity: 0.6, weight: 6}
      }).addTo(map);
      map.fitBounds(route.getBounds(), {padding: [5, 5]});
  });