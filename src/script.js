array = JSON.parse(localStorage.getItem("station"));

if (array != null) {
    array = JSON.parse(localStorage.getItem("station"));
}

else {
    array = [];
}

function fav_stock(station)
    {   
        if (!array.includes(station))
        { 
            array.push(station);
            localStorage.setItem("station", JSON.stringify(array));
        }
    }

var map = L.map('map').setView([45.784372, 4.735502], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([45.78216224503831, 4.749269930692929], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);

circle.bindPopup("<p>Campus du numérique</p>").openPopup();

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
        
        var veloMark = L.marker([elem.position.lat, elem.position.lng], {icon: veloIcon}).addTo(map);

        veloMark.bindPopup("<article><h2>" + elem.name + "</h2><h3>velo disponible : " + elem.available_bikes + " / " + elem.bike_stands +
            "</h3><h3>station : " + elem.status + "</h3><button onclick='fav_stock(" + elem.number + 
            ")' id='starBtn'>ajouter favori  <i class='fa fa-heart'></i></button></article>", {className:'stylePopup'});
    }    
});

