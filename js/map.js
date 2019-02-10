// //api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt
// firsttime = true;

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


function searchFromHeader() {
    searchBlock = document.getElementById("search-block");

    const http = new XMLHttpRequest();
    const url='https://api.tomtom.com/search/2/search/' + searchBlock.value + '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
    http.open("GET", url);
    http.setRequestHeader("Content-Type", "text/plain");
    http.send();
    http.onreadystatechange=(e)=>{
        resultsResponse = JSON.parse(http.responseText);

        var lat = resultsResponse["results"][0]["position"]["lat"];
        var lon = resultsResponse["results"][0]["position"]["lon"];
        map.setView([lat, lon], 12);
    }
}


var offset = 4;
var formData = document.getElementById("overlay-form");
var place = []
var rootlocations;

function generateRoute(form){


    addToPlaces(form, 0, false);

    for(var i = offset; i < numberOffMustSees + offset; i++){
        // if (i == numberOffMustSees + offset - 1){
        //     lastTime = true;
        // } else{
        //     lastTime = false;
        // }
        console.log(i);
        addToPlaces(form, i, false);
    }

    addToPlaces(form, 1, false);

    setTimeout(function(){
        routes()
    }, 1000);

    
};


function routes() {
    rootlocations = "";
    for (var i = 0; i < place.length; i++){
        console.log(i)
        var plc = place[i].split(",")

        if (i == place.length - 1){
            var marker = tomtom.L.marker(plc, markerOptionsFinish).addTo(map);
        }   
        else if (i == 0){
            var marker = tomtom.L.marker(plc, markerOptionsStart).addTo(map);
        }   
        else if (i != 0){
            var marker = tomtom.L.marker(plc, markerOptionsWaypiont).addTo(map);
        }

        rootlocations = (rootlocations + ":" + (place[i]).toString())


    }
    // for (var i = 0; i < place.length; i++){
    //     if(i=0){
    //         rootlocations = place[i].toString()
    //     } else {
    //         rootlocations = (rootlocations + ":" + (place[i]).toString())
    //     }
    // }

    rootlocations = rootlocations.substr(1);
    
    tomtom.routing() 
        .locations(rootlocations)
        .go().then(function(routeJson) {
            var route = tomtom.L.geoJson(routeJson, {
                style: {color: '#8800EB', opacity: 0.6, weight: 4}
            }).addTo(map);
            map.fitBounds(route.getBounds(), {padding: [10, 10]});
    });
}



function addToPlaces(form, formIndex, lastTime) {
    console.log("doing addtoplaces");
    firsttime = true;
    const http = new XMLHttpRequest();
    const url='https://api.tomtom.com/search/2/search/' + form.elements[formIndex].value+ '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
    http.open("GET", url);
    http.setRequestHeader("Content-Type", "text/plain");
    http.send();
    http.onreadystatechange=(e)=>{
        resultsResponse = JSON.parse(http.responseText);


        var lat = resultsResponse["results"][0]["position"]["lat"];
        var lon = resultsResponse["results"][0]["position"]["lon"];

        place.push(lat + "," + lon);

        
        console.log(lastTime)
        if (lastTime) {
            
            console.log("routesss");
            routes();
        }
    }
}