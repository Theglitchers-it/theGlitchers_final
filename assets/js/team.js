/* ===================================
   TEAM.JS - TheGlitchers
   Script specifici per team.html
   =================================== */

// Semplice Intersection Observer per attivare le animazioni al passaggio
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
