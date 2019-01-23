var map = tomtom.L.map('map', { 
    key: 'G0IxuAKMgahregQDlzKW1bBbKkyWQGAt', 
    basePath: 'sdk', 
    center: [37.769167, -122.478468], 
    zoom: 15 
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
