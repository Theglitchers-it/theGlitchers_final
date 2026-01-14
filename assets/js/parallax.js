/* ===================================
   PARALLAX.JS - TheGlitchers
   Effetto parallasse su scroll per card
   Usato in: projects.html, madlab.html
   =================================== */

(function initParallaxScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const projectCards = document.querySelectorAll('.project-card');

                projectCards.forEach((card, index) => {
                    const speed = index % 2 === 0 ? 0.3 : 0.5;
                    const yPos = -(scrolled * speed);
                    card.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
})();
