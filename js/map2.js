//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt
var time;
var aanvullendelocaties = [];
var routelocaties = [];


var offset = 4;
var formData = document.getElementById("overlay-form");
var place = []
var rootlocations;

//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt

//init map
var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.667998, 139.783823], 
    zoom: 9
});





var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.667998, 139.783823], 
    zoom: 9
});

var markerOptionsFinish = {
    icon: tomtom.L.icon({
        iconUrl: 'images/finish.png',
        iconSize: [30, 34],
        iconAnchor: [15, 34]
    })
};

var markerOptionsWaypiont = {
    icon: tomtom.L.icon({
        iconUrl: 'images/waypoint.png',
        iconSize: [30, 34],
        iconAnchor: [15, 34]
    })
};

var markerOptionsStart = {
    icon: tomtom.L.icon({
        iconUrl: 'images/start.png',
        iconSize: [30, 34],
        iconAnchor: [15, 34]
    })
};





async function generateRoute(form){
    start = await textToLatLonRequest(form.elements[0].value)
    routelocaties.push(start[0] + "," + start[1])

    await extralocaties(form, form.elements[2].value);

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


async function extralocaties(form, query) {
    time = form.elements[3].value;
    time = parseFloat(time);
    time = (time * 2) - 2;

    var latlon = await textToLatLonRequest(form.elements[0].value)

    var results = await getCategoryLocations(query, time, {lat: latlon[0], lon: latlon[1]})

    for (var i = 0; i < results.length; i++){
        routelocaties.push(results[i]["position"]["lat"] + "," + results[i]["position"]["lon"])
    }
}


async function searchFromHeader() {
    var searchBlock = document.getElementById("search-block");

    var coordinates = await textToLatLonRequest(searchBlock.value)

    map.setView(coordinates, 12);
}


function textToLatLonRequest(query) {
    return new Promise(resolve => {
        const http = new XMLHttpRequest();
        const url='https://api.tomtom.com/search/2/search/' + query + '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
        http.open("GET", url);
        http.setRequestHeader("Content-Type", "text/plain");
        http.send();
        http.onreadystatechange=(e)=>{
            resultsResponse = JSON.parse(http.responseText);
    
            var lat = resultsResponse["results"][0]["position"]["lat"];
            var lon = resultsResponse["results"][0]["position"]["lon"];
            resolve([lat, lon]);
        }
    });
}


async function getCategoryLocations(query, resultCount, center) {
    var results;
    await tomtom.categorySearch()
        .query(query)
        .center(center)
        .limit(resultCount)
        .go()
        .then(function(value) {
            results = value;
        });

    return results;
}
