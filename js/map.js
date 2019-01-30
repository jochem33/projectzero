//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt


var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [35.667998, 139.783823], 
    zoom: 9
});


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


    addToPlaces(form, 0)

    for(var i = offset; i < numberOffMustSees + offset; i++){
        // if (i < QuerySplit.length - 1) {
        lastTime = true;
        //     console.log("Laatste loop")
        // }
        
        addToPlaces(form, i, lastTime)
    }

    addToPlaces(form, 1)
};


function routes() {
    rootlocations = "";

    console.log(place)
    console.log(rootlocations)
    console.log(place.lenght)
    for (var i = 0; i < place.length; i++){
        console.log(place[i]);
        var plc = place[i].split(",")
        var marker = tomtom.L.marker(plc).addTo(map);
        rootlocations = (rootlocations + ":" + (place[i]).toString())
    }
    // for (var i = 0; i < place.length; i++){
    //     if(i=0){
    //         rootlocations = place[i].toString()
    //     } else {
    //         rootlocations = (rootlocations + ":" + (place[i]).toString())
    //     }
    // }

    console.log(place)
    console.log(rootlocations)

    rootlocations = rootlocations.substr(1);
    
    tomtom.routing() 
        .locations(rootlocations)
        .go().then(function(routeJson) {
            var route = tomtom.L.geoJson(routeJson, {
                style: {color: '#8800EB', opacity: 0.6, weight: 4}
            }).addTo(map);
            map.fitBounds(route.getBounds(), {padding: [5, 5]});
    });
}



function addToPlaces(form, formIndex, lastTime) {
    const http = new XMLHttpRequest();
        const url='https://api.tomtom.com/search/2/search/' + form.elements[formIndex].value+ '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
        http.open("GET", url);
        http.setRequestHeader("Content-Type", "text/plain");
        http.send();
        http.onreadystatechange=(e)=>{
            resultsResponse = JSON.parse(http.responseText);

            var lat = resultsResponse["results"][0]["position"]["lat"];
            var lon = resultsResponse["results"][0]["position"]["lon"];
            console.log(lat + "," + lon);
            place.push(lat + "," + lon);
            
            // if (lastTime) {
            //     routes();
            // }
            routes();
        }
}