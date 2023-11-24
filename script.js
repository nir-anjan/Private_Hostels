const map = L.map('map');   

const markers =[];

map.setView([8.5445,76.9041],17) 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var marker = L.marker([8.54311,76.90335]).addTo(map);
marker.bindPopup("<b>Mens Hostel , CET <b>");

fetch('data.json')
    .then(response => response.json())
    .then(jsonData =>{
        const cardContainer = document.querySelector('.right');

        jsonData.forEach(data =>{
            const card = document.createElement('div');
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
                const geoUri = `geo:${data.lat},${data.lng}?q=${data.lat},${data.lng}(${data.name})`;
                window.open(geoUri, '_system');
            });


            
        });
    })
    .catch(error => console.error('Error fetching data:', error));