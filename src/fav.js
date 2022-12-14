array = JSON.parse(localStorage.getItem("station"));

function reset_fav()
    {
        localStorage.clear()
    }

var map = L.map('map').setView([45.784372, 4.735502], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=7cac7a43f504aceb28611cd25c6626c4075645eb')
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {

    for(let elem of data){

        if (elem.status == 'OPEN') {

            var veloIcon  = L.icon({
                iconUrl: 'images/greenVelo.png',
                iconSize: [45, 45],
            });
        }

        else {

            var veloIcon = L.icon({
                iconUrl: 'images/redVelo.png',
                iconSize: [45, 45],
            });
        }

        if (elem.available_bikes <= 3){
            var veloIcon = L.icon({
                iconUrl: 'images/orangeVelo.png',
                iconSize: [45, 45],
            });
        }

        if (elem.available_bikes == 0){
            var veloIcon = L.icon({
                iconUrl: 'images/redVelo.png',
                iconSize: [45, 45],
            });
        }

        
        if (array.includes(elem.number)) {

        
            var veloMark = L.marker([elem.position.lat, elem.position.lng], {icon: veloIcon}).addTo(map);

            veloMark.bindPopup("<article><h2>" + elem.name + "</h2><h3>velo dispo : " + elem.available_bikes + " / " + elem.bike_stands +
            "</h3><h3>" + elem.status + "</h3><h3><i class='fa fa-heart'></i></h3></article>", {className:'stylePopup'});
        }
    }
   
});