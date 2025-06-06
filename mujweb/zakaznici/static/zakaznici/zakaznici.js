// Zakázání odeslání pomocí Enter
document.getElementById('zakaznik-form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// Validace před odesláním (volitelné)
//document.getElementById('submit-btn').addEventListener('click', function(e) {
//    const form = document.getElementById('zakaznik-form');
//    if (!form.checkValidity()) {
//        e.preventDefault();
//        alert('Vyplňte prosím všechna povinná pole správně.');
//    }
//});

document.addEventListener('DOMContentLoaded', function() {
    // inicializace mapy
    var map = L.map('map').setView([50.0755, 14.4378], 13); // nastav výchozí souřadnice (např. Praha)

    // Přidej tile layer (mapové dlaždice)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Příklad přidání markeru (například z dat zákazníka)
    // Můžeš načíst data z Django a dynamicky je přidat
    // Například:
    var customerLatitude = 50.0755; // nahraď aktuálními hodnotami
    var customerLongitude = 14.4378;

    L.marker([customerLatitude, customerLongitude]).addTo(map)
        .bindPopup('Zákazník zde').openPopup();
});