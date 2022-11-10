array = JSON.parse(localStorage.getItem("station"));

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
                iconUrl: 'greenVelo.png',
                iconSize: [45, 45],
            });
        }

        else {

            var veloIcon = L.icon({
                iconUrl: 'redVelo.png',
                iconSize: [45, 45],
            });
        }

        if (elem.available_bikes <= 3){
            var veloIcon = L.icon({
                iconUrl: 'orangeVelo.png',
                iconSize: [45, 45],
            });
        }

        if (elem.available_bikes == 0){
            var veloIcon = L.icon({
                iconUrl: 'redVelo.png',
                iconSize: [45, 45],
            });
        }

        if (array.includes(elem.number)){

            var veloMark = L.marker([elem.position.lat, elem.position.lng], {icon: veloIcon}).addTo(map);
            veloMark.bindPopup("<p>" + elem.name + "</p><p>velo dispo : " + elem.available_bikes + " / " + 
            elem.bike_stands + "</p><p>" + elem.status + "</p><div class='alignItem'><i class='fa fa-heart' style='font-size:12px;color:red'></i></div>", {className:'stylePopup'});
        }
    }
   
});