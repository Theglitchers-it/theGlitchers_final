/* ===================================
   INDEX.JS - TheGlitchers
   Script specifici per la homepage
   =================================== */

// ===================================
// RIFERIMENTI ELEMENTI
// ===================================
const heroVideo = document.getElementById('hero-video');
const musicBtn = document.getElementById('music-btn');
const musicBtnMobile = document.getElementById('music-btn-mobile');
const audio = document.getElementById('bg-music');
const playIcon = document.getElementById('play-icon');
const playIconMobile = document.getElementById('play-icon-mobile');
const eqContainer = document.getElementById('eq-container');
const eqContainerMobile = document.getElementById('eq-container-mobile');
const enterScreen = document.getElementById('enter-screen');
const startTrigger = document.getElementById('start-trigger');

// ===================================
// AUTO-SKIP ENTER SCREEN
// ===================================
// Controlla se l'utente ha già visto l'ENTER screen in questa sessione
// oppure se arriva da un'altra pagina del sito
const hasSeenEnter = sessionStorage.getItem('hasSeenEnter');
const referrer = document.referrer;
const isFromSameSite = referrer && (
    referrer.includes('projects.html') ||
    referrer.includes('team.html') ||
    referrer.includes('madlab.html') ||
    referrer.includes('careers.html')
);

if (hasSeenEnter || isFromSameSite) {
    // Salta l'animazione ENTER
    enterScreen.style.display = 'none';

    // Attiva subito le animazioni hero
    document.querySelector('.hero-left')?.classList.add('active');
    document.querySelector('.hero-right')?.classList.add('active');
    document.querySelector('.hero-center')?.classList.add('active');
}

// ===================================
// GESTIONE PARALLASSE MOUSE (Hero Video)
// ===================================
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    // Effetto Parallasse Hero
    const moveX = (clientX - window.innerWidth / 2) * 0.012;
    const moveY = (clientY - window.innerHeight / 2) * 0.012;

    if (heroVideo) {
        heroVideo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
});

// ===================================
// LOGICA AUDIO: ENTER SCREEN
// ===================================
startTrigger.addEventListener('click', () => {
    // Salva in sessionStorage che l'utente ha visto l'ENTER screen
    sessionStorage.setItem('hasSeenEnter', 'true');

    // Imposta il tempo di inizio al secondo 18
    audio.currentTime = 18;
    audio.volume = 0; // Parte muto per il fade-in

    audio.play().then(() => {
        // Effetto Fade-in: aumenta il volume gradualmente
        let fadeIn = setInterval(() => {
            if (audio.volume < 0.1) {
                audio.volume = Math.min(audio.volume + 0.05, 0.1);
            } else {
                clearInterval(fadeIn);
            }
        }, 100);

        // Attiva UI Audio (desktop e mobile)
        if (musicBtn) {
            musicBtn.classList.add('is-playing');
            eqContainer.classList.remove('hidden');
            playIcon.classList.add('hidden');
        }
        if (musicBtnMobile) {
            musicBtnMobile.classList.add('is-playing');
            eqContainerMobile.classList.remove('hidden');
            playIconMobile.classList.add('hidden');
        }
    }).catch(err => console.log("Errore riproduzione:", err));

    // Nasconde l'overlay
    enterScreen.style.opacity = '0';
    setTimeout(() => {
        enterScreen.style.display = 'none';
    }, 1000);

    // ATTIVA ANIMAZIONI HERO
    setTimeout(() => {
        document.querySelector('.hero-left')?.classList.add('active');
        document.querySelector('.hero-right')?.classList.add('active');
        document.querySelector('.hero-center')?.classList.add('active');
    }, 1200);
});

// ===================================
// LOGICA AUDIO: TOGGLE PLAY/PAUSE
// ===================================

// Funzione per sincronizzare UI
function updateMusicUI(isPlaying) {
    if (isPlaying) {
        if (musicBtn) {
            musicBtn.classList.add('is-playing');
            eqContainer.classList.remove('hidden');
            playIcon.classList.add('hidden');
        }
        if (musicBtnMobile) {
            musicBtnMobile.classList.add('is-playing');
            eqContainerMobile.classList.remove('hidden');
            playIconMobile.classList.add('hidden');
        }
    } else {
        if (musicBtn) {
            musicBtn.classList.remove('is-playing');
            eqContainer.classList.add('hidden');
            playIcon.classList.remove('hidden');
        }
        if (musicBtnMobile) {
            musicBtnMobile.classList.remove('is-playing');
            eqContainerMobile.classList.add('hidden');
            playIconMobile.classList.remove('hidden');
        }
    }
}

// Desktop
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateMusicUI(!audio.paused);
    });
}

// Mobile
if (musicBtnMobile) {
    musicBtnMobile.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateMusicUI(!audio.paused);
    });
}
