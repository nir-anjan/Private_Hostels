// Your JSON data
var jsonData = [
    {
        "id": 1,
        "name": "Emaus Hostel",
        "vacancy": 10,
        "lat": 8.54618,
        "lng": 76.90268,
        "phone": "123-456-7890",
        "mess_availability": true,
        "distance_from_college": 2.5
    },
    {
        "id": 2,
        "name": "Ideal Hostel",
        "vacancy": 20,
        "lat": 8.54733,
        "lng": 76.90581,
        "phone": "234-567-8901",
        "mess_availability": false,
        "distance_from_college": 3.0
    },
    {
        "id": 3,
        "name": "Careebia Hostel",
        "vacancy": 30,
        "lat": 8.54748,
        "lng": 76.90561,
        "phone": "345-678-9012",
        "mess_availability": true,
        "distance_from_college": 2.8
    },
    {
        "id": 4,
        "name": "Angels Beth Hostel",
        "vacancy": 40,
        "lat": 8.54774,
        "lng": 76.90808,
        "phone": "456-789-0123",
        "mess_availability": true,
        "distance_from_college": 3.5
    },
    {
        "id": 5,
        "name": "Brothers Lodge",
        "vacancy": 50,
        "lat": 8.54888,
        "lng": 76.90769,
        "phone": "567-890-1234",
        "mess_availability": false,
        "distance_from_college": 2.2
    }
]


const markers =[];
const map = L.map('map');   
map.setView([8.5445,76.9041],17) 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
var marker = L.marker([8.54311,76.90335]).addTo(map);
marker.bindPopup("<b>Mens Hostel , CET <b>");


var cardContainer = document.getElementById('right');

function renderHostels(hostels) {
    cardContainer.innerHTML = '';

    hostels.forEach(data => {
        var card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class='hostel' style="display:flex; justify-content:center;align-items:center;">
                <img style='height:2.5rem ;width:4rem;object-fit:cover;align-self:flex-start;margin-top:5px' src="./assets/hostel.jpg" alt="" />
            </div>
            <div class='details'>
                <h3>${data.name}</h3>
                <p>Vacancy: ${data.vacancy}</p>
                <div class='additional-info' style='display:none;'>
                <p>Phone: ${data.phone}</p>
                <p>Mess Availability: ${data.mess_availability ? 'Yes' : 'No'}</p>
                <p>Distance from College: ${data.distance_from_college} km</p>
                </div>
                <button class='view-more-btn'>View More</button>
            </div>
        `;
        cardContainer.appendChild(card);

        markers[data.id] = L.marker([data.lat, data.lng]).addTo(map);
        markers[data.id].bindPopup(`<b>${data.name}<b>`);

        card.querySelector('.view-more-btn').addEventListener('click', (event) => {
            // Toggle the visibility of additional information
            const additionalInfo = card.querySelector('.additional-info');
            additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';

            card.querySelector('.view-more-btn').innerText = additionalInfo.style.display === 'none' ? 'View More' : 'View Less';
            // Prevent the card click event from being triggered
            event.stopPropagation();
        });

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

    