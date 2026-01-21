// Footer Component - Aggiornamento automatico anno copyright
// Questo file viene caricato in tutti i file HTML per gestire il footer in modo centralizzato

document.addEventListener('DOMContentLoaded', function() {
    // Aggiorna l'anno del copyright
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
