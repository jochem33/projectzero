//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt

//init map
var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.667998, 139.783823], 
    zoom: 9
});


var aanvullendelocaties = [];
var routelocaties = [];


var offset = 4;
var formData = document.getElementById("overlay-form");
var place = []
var rootlocations;


async function generateRoute(form){
    start = await textToLatLonRequest(form.elements[0].value)
    routelocaties.push(start[0] + "," + start[1])

    await extralocaties(form);

    for(var i = offset; i < numberOffMustSees + offset; i++){        
        var locatie = await textToLatLonRequest(form.elements[i].value);
        routelocaties.push(locatie[0] + "," + locatie[1]);
    }

    end = await textToLatLonRequest(form.elements[1].value)
    routelocaties.push(end[0] + "," + end[1])



    var rootlocations = "";
    for (var i = 0; i < routelocaties.length; i++){
        var currentLatLon = routelocaties[i].split(",");
        var marker = tomtom.L.marker([currentLatLon[0], currentLatLon[1]]).addTo(map);
        rootlocations = (rootlocations + ":" + (routelocaties[i]).toString())
    }

    rootlocations = rootlocations.substr(1);
    
    await tomtom.routing() 
        .locations(rootlocations)
        .go().then(function(routeJson) {
            var route = tomtom.L.geoJson(routeJson, {
                style: {color: '#8800EB', opacity: 0.6, weight: 4}
            }).addTo(map);
            map.fitBounds(route.getBounds(), {padding: [5, 5]});
    });

    hideGenerateOverlay()
};


// function routes() {
//     rootlocations = "";

//     for (var i = 0; i < place.length; i++){
//         rootlocations = (rootlocations + ":" + (place[i]).toString())
//     }
//     // for (var i = 0; i < place.length; i++){
//     //     if(i=0){
//     //         rootlocations = place[i].toString()
//     //     } else {
//     //         rootlocations = (rootlocations + ":" + (place[i]).toString())
//     //     }
//     // }

//     rootlocations = rootlocations.substr(1);
    
//     tomtom.routing() 
//         .locations(rootlocations)
//         .go().then(function(routeJson) {
//             var route = tomtom.L.geoJson(routeJson, {
//                 style: {color: '#8800EB', opacity: 0.6, weight: 4}
//             }).addTo(map);
//             map.fitBounds(route.getBounds(), {padding: [5, 5]});
//     });
// }



// function addToPlaces(form, formIndex, lastTime) {
//     const http = new XMLHttpRequest();
//         const url='https://api.tomtom.com/search/2/search/' + form.elements[formIndex].value + '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
//         http.open("GET", url);
//         http.setRequestHeader("Content-Type", "text/plain");
//         http.send();
//         http.onreadystatechange=(e)=>{
//             resultsResponse = JSON.parse(http.responseText);

//             var lat = resultsResponse["results"][0]["position"]["lat"];
//             var lon = resultsResponse["results"][0]["position"]["lon"];
//             place.push(lat + "," + lon);
            
//             // if (lastTime) {
//             //     routes();
//             // }
//             routes();
//         }
// }