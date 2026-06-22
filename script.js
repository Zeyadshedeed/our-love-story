/* ========================================================
   OUR LOVE STORY — JavaScript
   ======================================================== */

// === Configuration ===
// Start date: December 16, 2025 at approximately 00:58:48
const START_DATE = new Date('2025-12-16T00:58:48');

// === DOM Elements ===
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const miniDaysEl = document.getElementById('miniDays');
const miniHoursEl = document.getElementById('miniHours');
const miniMinutesEl = document.getElementById('miniMinutes');
const miniSecondsEl = document.getElementById('miniSeconds');
const scrollProgress = document.getElementById('scrollProgress');
const heartsContainer = document.getElementById('heartsContainer');
const heroParticles = document.getElementById('heroParticles');
const navDots = document.querySelectorAll('.nav-dot');
const musicToggle = document.getElementById('musicToggle');

// === Live Counter ===
function updateCounter() {
    const now = new Date();
    const diff = now - START_DATE;

    if (diff < 0) return;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const daysStr = String(days);
    const hoursStr = String(hours).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    const secsStr = String(secs).padStart(2, '0');

    // Update main counter with flip animation
    animateValue(daysEl, daysStr);
    animateValue(hoursEl, hoursStr);
    animateValue(minutesEl, minsStr);
    animateValue(secondsEl, secsStr);

    // Update mini counter
    if (miniDaysEl) miniDaysEl.textContent = daysStr;
    if (miniHoursEl) miniHoursEl.textContent = hoursStr;
    if (miniMinutesEl) miniMinutesEl.textContent = minsStr;
    if (miniSecondsEl) miniSecondsEl.textContent = secsStr;
}

function animateValue(element, newValue) {
    if (!element) return;
    if (element.textContent !== newValue) {
        element.style.transform = 'translateY(-4px)';
        element.style.opacity = '0.5';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 150);
    }
}

// Start counter
updateCounter();
setInterval(updateCounter, 1000);

// === Scroll Progress Bar ===
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// === Navigation Dots ===
function updateNavDots() {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[index]) navDots[index].classList.add('active');
        }
    });
}

navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionIndex = dot.getAttribute('data-section');
        const target = document.getElementById(`section-${sectionIndex}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Scroll Reveal Animations ===
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up, .story-text');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.85;

        if (elementTop < revealPoint) {
            element.classList.add('visible');
        }
    });
}

// === Floating Hearts ===
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['♥', '♡', '❤', '💕', '💖'][Math.floor(Math.random() * 5)];

    const size = Math.random() * 16 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 5;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        color: hsl(${330 + Math.random() * 30}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 20}%);
    `;

    heartsContainer.appendChild(heart);

    // Cleanup after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

// Create initial batch of hearts
for (let i = 0; i < 15; i++) {
    setTimeout(() => createFloatingHeart(), i * 800);
}

// Keep creating hearts
setInterval(createFloatingHeart, 3000);

// === Hero Particles (Stars) ===
function createParticles() {
    const count = 60;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 4;

        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${Math.random() > 0.5 ? 'var(--color-gold)' : 'var(--color-primary-light)'};
        `;

        heroParticles.appendChild(particle);
    }
}

createParticles();

// === Parallax Effect ===
function parallaxEffect() {
    const scrollY = window.scrollY;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }

    // Image parallax
    document.querySelectorAll('.story-image').forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            img.style.transform = `translateY(${(progress - 0.5) * 20}px)`;
        }
    });
}

// === Music / Ambient Sound ===
let audioContext = null;
let isPlaying = false;

function createAmbientSound() {
    if (audioContext) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a gentle ambient pad
    const oscillators = [];
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

    notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);

        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 2);

        // Subtle detuning for warmth
        osc.detune.setValueAtTime(Math.random() * 10 - 5, audioContext.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();

        oscillators.push({ osc, gain });
    });

    // Store for cleanup
    audioContext._oscillators = oscillators;
}

function toggleMusic() {
    if (!isPlaying) {
        createAmbientSound();
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        musicToggle.classList.add('playing');
        isPlaying = true;
    } else {
        if (audioContext) {
            audioContext._oscillators.forEach(({ gain }) => {
                gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
            });
            setTimeout(() => {
                audioContext.suspend();
            }, 1100);
        }
        musicToggle.classList.remove('playing');
        isPlaying = false;
    }
}

musicToggle.addEventListener('click', toggleMusic);

// === Cursor Sparkle Effect ===
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        createSparkle(e.clientX, e.clientY);
    }, 50);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${Math.random() > 0.5 ? 'var(--color-primary-light)' : 'var(--color-gold)'};
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnim 0.8s ease-out forwards;
    `;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% { transform: scale(1) translate(0, 0); opacity: 1; }
        100% { 
            transform: scale(0) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(style);

// === Event Listeners ===
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavDots();
    revealOnScroll();
    parallaxEffect();
}, { passive: true });

// Initial calls
window.addEventListener('load', () => {
    revealOnScroll();
    updateScrollProgress();
    updateNavDots();
});

// Trigger reveal for hero elements on load
setTimeout(() => {
    document.querySelectorAll('.hero-content .fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 200);
    });
}, 600);

// === Easter Egg: Konami-style Love Code ===
const loveCode = ['l', 'o', 'v', 'e'];
let loveIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === loveCode[loveIndex]) {
        loveIndex++;
        if (loveIndex === loveCode.length) {
            // Burst of hearts!
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createFloatingHeart(), i * 100);
            }
            loveIndex = 0;
        }
    } else {
        loveIndex = 0;
    }
});
