//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt

// fs = require("fs");

// var data = JSON.parse(fs.readFileSync('../data.json').toString())

var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.676814, 139.764176], 
    zoom: 10
  });




  


var offset = 4;

function generateRoute(form){
    var formData = document.getElementById("overlay-form");
    var place = []
    for(var i = offset; i < numberOffMustSees + offset; i++){
        place.push(form.elements[i].value);
    }
    
    
    console.log(place, form.elements[0].value, form.elements[1].value);
    startEndLocation = (form.elements[0].value + ":" + form.elements[1].value).toString()

    rootlocations = (form.elements[0].value).toString();

    console.log(place.length);

    for (var i = 0; i < place.length; i++){
        rootlocations = (rootlocations + ":" + (place[i]).toString()).toString()
    }

    rootlocations = (rootlocations + ":" + form.elements[1].value).toString()

    tomtom.routing() 
        .locations(rootlocations)
        .go().then(function(routeJson) {
            var route = tomtom.L.geoJson(routeJson, {
                style: {color: '#8800EB', opacity: 0.6, weight: 4}
            }).addTo(map);
            map.fitBounds(route.getBounds(), {padding: [5, 5]});
    });
};

