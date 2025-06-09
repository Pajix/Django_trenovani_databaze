// Zakázání odeslání formuláře pomocí Enter
const formularVstup = document.getElementById("zakaznik-form");
if (formularVstup) {
    formularVstup.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
}

// Inicializace mapy
let mapa;
let aktualniZnacka;

function inicializovatMapu() {
    const mapaElement = document.getElementById('map');
    if (!mapaElement) return;

    mapa = L.map('map').setView([50.0755, 14.4378], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);

    // Přidání posluchačů událostí pro řádky tabulky
    nastavitKlikaciRadky();
}

function nastavitKlikaciRadky() {
    // Kontrola, zda je tabulka již načtená
    const kontrolaTabulky = setInterval(() => {
        const radky = document.querySelectorAll('table.zakaznici-table tbody tr');
        if (radky.length > 0) {
            clearInterval(kontrolaTabulky);

            // Číslování řádků
            radky.forEach((radek, index) => {
                let bunka = radek.querySelector('td');
                if (bunka) {
                    bunka.textContent = index + 1;
                }
            });

            // Přidání klikacích událostí
            if (window.zakazniciData) {
                window.zakazniciData.forEach((zakaznik, index) => {
                    const radek = document.querySelector(`tr[data-index="${index}"]`);
                    if (radek) {
                        radek.style.cursor = 'pointer';
                        radek.addEventListener('click', () => zobrazitZakaznikaNaMape(zakaznik));
                    }
                });
            }
        }
    }, 100);
}

function zobrazitZakaznikaNaMape(zakaznik) {
    if (!zakaznik.latitude || !zakaznik.longitude) return;

    // Odstranění předchozí značky
    if (aktualniZnacka) {
        mapa.removeLayer(aktualniZnacka);
    }

    // Vytvoření nové značky
    aktualniZnacka = L.marker(
        [parseFloat(zakaznik.latitude), parseFloat(zakaznik.longitude)],
        {
            icon: L.icon({
                iconUrl: '/static/zakaznici/icons/icon_shop.png',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            })
        }
    ).addTo(mapa)
    .bindPopup(zakaznik.nazev)
    .openPopup();

    // Přiblížení na značku
    mapa.setView([zakaznik.latitude, zakaznik.longitude], 15);
}

// Inicializace po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    inicializovatMapu();
    inicializovatRazeniTabulky();
});

// Funkce pro řazení tabulky
function inicializovatRazeniTabulky() {
    const tabulka = document.querySelector('.zakaznici-table');
    if (!tabulka) return;

    const hlavicky = tabulka.querySelectorAll('thead th');
    let smerRazeni = {};

    hlavicky.forEach((hlavicka, index) => {
        hlavicka.style.cursor = 'pointer';
        hlavicka.addEventListener('click', () => {
            const smer = smerRazeni[index] === 'vzestupne' ? 'sestupne' : 'vzestupne';
            smerRazeni = {};
            smerRazeni[index] = smer;

            const tbody = tabulka.querySelector('tbody');
            const radky = Array.from(tbody.querySelectorAll('tr'));

            radky.sort((a, b) => {
                const bunkaA = a.children[index].textContent.trim();
                const bunkaB = b.children[index].textContent.trim();
                const cisloA = parseFloat(bunkaA.replace(',', '.'));
                const cisloB = parseFloat(bunkaB.replace(/,/g, ''));

                if (!isNaN(cisloA) && !isNaN(cisloB)) {
                    return smer === 'vzestupne' ? cisloA - cisloB : cisloB - cisloA;
                } else {
                    if (bunkaA < bunkaB) return smer === 'vzestupne' ? -1 : 1;
                    if (bunkaA > bunkaB) return smer === 'vzestupne' ? 1 : -1;
                    return 0;
                }
            });

            // Odstranění stávajících řádků
            radky.forEach(radek => tbody.removeChild(radek));

            // Přidání seřazených řádků
            radky.forEach(radek => tbody.appendChild(radek));

            // Obnovení číslování
            nastavitKlikaciRadky();
        });
    });
}