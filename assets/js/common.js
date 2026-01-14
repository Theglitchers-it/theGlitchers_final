/* ===================================
   COMMON.JS - TheGlitchers
   Script condivisi da più pagine
   =================================== */

// ===================================
// MENU HAMBURGER TOGGLE
// ===================================
(function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    // Se gli elementi non esistono, esci dalla funzione
    if (!menuToggle || !dropdownMenu || !line1 || !line2 || !line3) {
        return;
    }

    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Apri menu
            dropdownMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            dropdownMenu.classList.add('opacity-100', 'translate-y-0');

            // Trasforma hamburger in X
            line1.style.transform = 'rotate(45deg) translateY(7px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            // Chiudi menu
            dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            dropdownMenu.classList.remove('opacity-100', 'translate-y-0');

            // Ripristina hamburger
            line1.style.transform = 'none';
            line2.style.opacity = '1';
            line3.style.transform = 'none';
        }
    });

    // Chiudi menu quando clicchi su un link
    const menuLinks = dropdownMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
            line1.style.transform = 'none';
            line2.style.opacity = '1';
            line3.style.transform = 'none';
        });
    });

    // Chiudi menu cliccando fuori
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            isMenuOpen = false;
            dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
            line1.style.transform = 'none';
            line2.style.opacity = '1';
            line3.style.transform = 'none';
        }
    });
})();

// ===================================
// INTERSECTION OBSERVER (Animazioni)
// ===================================
(function initScrollAnimations() {
    const animateSections = document.querySelectorAll('.animate-section');

    // Se non ci sono sezioni da animare, esci
    if (animateSections.length === 0) {
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const animType = entry.target.dataset.anim;
                entry.target.classList.add(animType);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Osserva tutte le sezioni animate
    animateSections.forEach(section => {
        observer.observe(section);
    });
})();
