// Zakázání odeslání pomocí Enter = odeslání formuláře proběhne jen pomocí tlačítka "Odeslat"
const formularVstup = document.getElementById("zakaznik-form")
formularVstup.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()  // Pokud zmáčkne Enter, tak se formulář neodesílá = toto chceme
    }
})

// tato část slouží k vložení čísel do první buňky podle počtu řádků
document.addEventListener('DOMContentLoaded', function() {
    // Číslení řádků
    const rows = document.querySelectorAll('table.zakaznici-table tbody tr')
    rows.forEach(function(row, index) {
        // Vloží číslo do první buňky
        let cell = row.querySelector('td')
        if (cell) {
            cell.textContent = index + 1
        }
    })
})

// Čekáme na plné načtení DOM i všech zdrojů (Leaflet)
window.addEventListener('DOMContentLoaded', function() {
    // Inicializace mapy
    const map = L.map('map').setView([50.0755, 14.4378], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'

    }).addTo(map)

    let currentMarker  // Aktuální marker

    // Dynamické načtení cesty k ikoně
    const iconPath = document.querySelector('script[src*="zakaznici.js"]')
        .getAttribute('src').replace('zakaznici.js', 'icons/icon_shop.png')

    const greenIcon = L.icon({
        iconUrl: iconPath,
        iconSize: [30, 30],
        iconAnchor: [1, 1],
        popupAnchor: [14, 1]
    })

    // Použití dat z globální proměnné
    window.zakazniciData.forEach((zakaznik, index) => {
        const row = document.querySelector(`tr[data-index="${index}"]`)
        if (row) {
            row.addEventListener('click', function() {
                if (zakaznik.latitude && zakaznik.longitude) {
                    if (currentMarker) map.removeLayer(currentMarker)

                    currentMarker = L.marker(
                        [zakaznik.latitude, zakaznik.longitude],
                        {icon: greenIcon}
                    )
                    .addTo(map)
                    .bindPopup(zakaznik.nazev)
                    .openPopup()

                    map.setView([zakaznik.latitude, zakaznik.longitude], 15)
                }
            })
        }
    })
})

// Funkce pro seřazení dat v tabulce po kliknutí na jméno sloupce
// Při kliknutí na hlavičku zjistí, který sloupec je kliknut a odle typu obsahu (číslo nebo text) seřadí řádky
// Přepíná řazení po dalším kliknutí
document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.zakaznici-table')
    const headers = table.querySelectorAll('thead th')
    let sortDirection = {} // uloží směr řazení pro každý sloupec

    headers.forEach((header, index) => {
    header.style.cursor = 'pointer' // indikace, že lze kliknout
    header.addEventListener('click', () => {
          // Zjistíme, jestli se má řadit vzestupně nebo sestupně
          const dir = sortDirection[index] === 'asc' ? 'desc' : 'asc'
          sortDirection = {} // reset ostatních
          sortDirection[index] = dir

          // Seřadíme řádky podle daného sloupce
          const tbody = table.querySelector('tbody')
          const rows = Array.from(tbody.querySelectorAll('tr'))

          rows.sort((a, b) => {
                const cellA = a.children[index].textContent.trim()
                const cellB = b.children[index].textContent.trim()

                // Pokus o převod na číslo
                const aNumber = parseFloat(cellA.replace(',', '.')) // pokud jsou čísla s čárkou
                const bNumber = parseFloat(cellB.replace(',', '.'))

                if (!isNaN(aNumber) && !isNaN(bNumber)) {  // kontrola jestli jsou obě hodnoty čísla
                  // Řadit podle čísel
                  return dir === 'asc' ? aNumber - bNumber : bNumber - aNumber
                } else {
                  // Řadit podle řetězce
                  if (cellA < cellB) return dir === 'asc' ? -1 : 1
                  if (cellA > cellB) return dir === 'asc' ? 1 : -1
                  return 0
                }
          })
          // Přidat seřazené řádky zpět do tbody
          rows.forEach(row => tbody.appendChild(row))
        })
    })
})


















