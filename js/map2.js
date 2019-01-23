//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt


var offset = 4;
var formData = document.getElementById("overlay-form");
var place = []
var rootlocations;

function generateRoute(form){



    for(var i = offset; i < numberOffMustSees + offset; i++){

        const http = new XMLHttpRequest();
        const url='https://api.tomtom.com/search/2/search/' + form.elements[i].value+ '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
        http.open("GET", url);
        http.setRequestHeader("Content-Type", "text/plain");
        http.send();
        http.onreadystatechange=(e)=>{
            resultsResponse = JSON.parse(http.responseText);

            var lat = resultsResponse["results"][0]["position"]["lat"];
            var lon = resultsResponse["results"][0]["position"]["lon"];
            console.log(lat + "," + lon);
            place.push(lat + "," + lon);

        }
    }
    
    // console.log(place, form.elements[0].value, form.elements[1].value);
    // startEndLocation = (form.elements[0].value + ":" + form.elements[1].value).toString()
    // console.log(startEndLocation)

    const http = new XMLHttpRequest();
    const url='https://api.tomtom.com/search/2/search/' + form.elements[0].value + '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
    http.open("GET", url);
    http.setRequestHeader("Content-Type", "text/plain");
    http.send();
    http.onreadystatechange=(e)=>{
        resultsResponse = JSON.parse(http.responseText);

        var lat = resultsResponse["results"][0]["position"]["lat"];
        var lon = resultsResponse["results"][0]["position"]["lon"];
        console.log(lat + "," + lon);
        place.push(lat + "," + lon);

    }



    const http2 = new XMLHttpRequest();
    const url2 ='https://api.tomtom.com/search/2/search/' + form.elements[1].value + '.JSON?key=G0IxuAKMgahregQDlzKW1bBbKkyWQGAt&typeahead=false&limit=10';
    http2.open("GET", url2);
    http2.setRequestHeader("Content-Type", "text/plain");
    http2.send();
    http2.onreadystatechange=(e)=>{
        resultsResponse = JSON.parse(http2.responseText);

        var lat = resultsResponse["results"][0]["position"]["lat"];
        var lon = resultsResponse["results"][0]["position"]["lon"];
        console.log(lat + "," + lon);
        place.push(lat + "," + lon);

        routes()
    }


    
};


function routes() {
    rootlocations = "";

    console.log(place)
    console.log(rootlocations)
    console.log(place.leght)
    for (var i = 0; i < place.length; i++){
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
