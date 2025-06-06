// Zakázání odeslání pomocí Enter
document.getElementById('zakaznik-form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// tato část slouží k vložení čísel do první buňky podle počtu řádků
document.addEventListener('DOMContentLoaded', function() {
    // Číslení řádků
    const rows = document.querySelectorAll('table.zakaznici-table tbody tr');
    rows.forEach(function(row, index) {
        // Vloží číslo do první buňky
        let cell = row.querySelector('td');
        if (cell) {
            cell.textContent = index + 1;
        }
    });
});


