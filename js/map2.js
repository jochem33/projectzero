//api key G0IxuAKMgahregQDlzKW1bBbKkyWQGAt
var time;


async function extralocaties(form) {
    time = form.elements[3].value;
    time = parseFloat(time);
    time = (time * 2) - 2;

    var latlon = await textToLatLonRequest(form.elements[0].value)

    var results = await getCategoryLocations("restaurant", time, {lat: latlon[0], lon: latlon[1]})

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
