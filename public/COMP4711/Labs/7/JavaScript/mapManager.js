// 'map' refers to a <div> element with the ID map
window.onload = function () {
    L.mapquest.key = '8Tw9Ag53TZNqueIxAWRzEGt1UxMTqUxS';

    let map = L.mapquest.map('map', {
        center: [0, 0],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    //map.addControl(L.mapquest.control());
    L.mapquest.geocoding().geocode('Vancouver, BC');
}

function searchLocation() {
    let location = document.getElementsByClassName("locationSearch")[0].value;

    L.mapquest.geocoding().geocode(location);
}