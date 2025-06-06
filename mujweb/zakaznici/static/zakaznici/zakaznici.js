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