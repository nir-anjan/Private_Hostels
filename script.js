// Your JSON data
var jsonData = [
    {
        "id": 1,
        "name": "Emaus Hostel",
        "vacancy": 10,
        "lat": 8.54618,
        "lng": 76.90268
    },
    {
        "id": 2,
        "name": "Ideal Hostel",
        "vacancy": 20,
        "lat": 8.54733,
        "lng": 76.90581
    },
    {
        "id": 3,
        "name": "Careebia Hostel",
        "vacancy": 30,
        "lat": 8.54748,
        "lng": 76.90561
    },
    {
        "id": 4,
        "name": "Angels Beth Hostel",
        "vacancy": 40,
        "lat": 8.54774,
        "lng": 76.90808
    },
    {
        "id": 5,
        "name": "Brothers Lodge",
        "vacancy": 50,
        "lat": 8.54888,
        "lng": 76.90769
    }
];

const markers =[];
const map = L.map('map');   
map.setView([8.5445,76.9041],17) 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
var marker = L.marker([8.54311,76.90335]).addTo(map);
marker.bindPopup("<b>Mens Hostel , CET <b>");


var cardContainer = document.getElementById('right');

function renderHostels(hostels)
{
    cardContainer.innerHTML = '';

    hostels.forEach(data =>{
        var card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${data.name}</h3>
            <p>Vacancy: ${data.vacancy}</p>
        `;
        cardContainer.appendChild(card);

        markers[data.id] = L.marker([data.lat,data.lng]).addTo(map);
        markers[data.id].bindPopup(`<b>${data.name}<b>`);
        card.addEventListener('click', () => {
            // Set the view of the map to the clicked card's location
            map.setView([data.lat, data.lng], 17);
            markers[data.id].openPopup();


        });

        markers[data.id].on('click', () => {
            // Open Google Maps with the marker's location
            const googleMapsUrl = `https://www.google.com/maps?q=${data.lat},${data.lng}`;
            window.open(googleMapsUrl, '_blank');
        });


        
    });
}


function searchHostels() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();

    var filteredHostels = jsonData.filter(function (hostel) {
        return hostel.name.toLowerCase().includes(searchInput);
    });

    renderHostels(filteredHostels);
}
    renderHostels(jsonData);