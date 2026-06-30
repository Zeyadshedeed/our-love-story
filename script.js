/* ========================================================
   OUR LOVE STORY — Enhanced JavaScript v2.0
   ======================================================== */

// === Configuration ===
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
const loadingScreen = document.getElementById('loadingScreen');
const constellationCanvas = document.getElementById('constellationCanvas');
const shootingStarsContainer = document.getElementById('shootingStars');
const confettiCanvas = document.getElementById('confettiCanvas');

/* ========================================================
   LOADING SCREEN
   ======================================================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Start hero animations after loader
        setTimeout(startHeroAnimations, 300);
    }, 2800);
});

/* ========================================================
   TYPEWRITER EFFECT
   ======================================================== */
function startHeroAnimations() {
    // Trigger fade-ins
    document.querySelectorAll('.hero-content .fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 250);
    });

    // Typewriter
    const text = 'Our Love Story';
    const typewriterEl = document.getElementById('typewriterText');
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typewriterEl.textContent += text[charIndex];
            charIndex++;
            setTimeout(typeChar, 120 + Math.random() * 60);
        }
    }

    setTimeout(typeChar, 600);
}

/* ========================================================
   CONSTELLATION CANVAS
   ======================================================== */
const constellationCtx = constellationCanvas.getContext('2d');
let constellationStars = [];
let mousePos = { x: -1000, y: -1000 };

function resizeConstellationCanvas() {
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;
}

function initConstellationStars() {
    constellationStars = [];
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    for (let i = 0; i < count; i++) {
        constellationStars.push({
            x: Math.random() * constellationCanvas.width,
            y: Math.random() * constellationCanvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
}

function drawConstellation() {
    constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);

    constellationStars.forEach((star, i) => {
        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around
        if (star.x < 0) star.x = constellationCanvas.width;
        if (star.x > constellationCanvas.width) star.x = 0;
        if (star.y < 0) star.y = constellationCanvas.height;
        if (star.y > constellationCanvas.height) star.y = 0;

        // Draw star
        constellationCtx.beginPath();
        constellationCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        constellationCtx.fillStyle = `rgba(255, 200, 255, ${star.alpha})`;
        constellationCtx.fill();

        // Connect nearby stars
        for (let j = i + 1; j < constellationStars.length; j++) {
            const other = constellationStars[j];
            const dx = star.x - other.x;
            const dy = star.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                constellationCtx.beginPath();
                constellationCtx.moveTo(star.x, star.y);
                constellationCtx.lineTo(other.x, other.y);
                constellationCtx.strokeStyle = `rgba(233, 30, 144, ${0.15 * (1 - dist / 120)})`;
                constellationCtx.lineWidth = 0.5;
                constellationCtx.stroke();
            }
        }

        // Connect to mouse
        const mdx = star.x - mousePos.x;
        const mdy = star.y - mousePos.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 180) {
            constellationCtx.beginPath();
            constellationCtx.moveTo(star.x, star.y);
            constellationCtx.lineTo(mousePos.x, mousePos.y);
            constellationCtx.strokeStyle = `rgba(255, 215, 0, ${0.3 * (1 - mDist / 180)})`;
            constellationCtx.lineWidth = 0.8;
            constellationCtx.stroke();

            // Gently attract stars to mouse
            star.vx += (mousePos.x - star.x) * 0.00005;
            star.vy += (mousePos.y - star.y) * 0.00005;
        }
    });

    requestAnimationFrame(drawConstellation);
}

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

resizeConstellationCanvas();
initConstellationStars();
drawConstellation();

window.addEventListener('resize', () => {
    resizeConstellationCanvas();
    initConstellationStars();
});

/* ========================================================
   SHOOTING STARS
   ======================================================== */
function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startX = Math.random() * window.innerWidth * 0.6;
    const startY = Math.random() * window.innerHeight * 0.4;
    const duration = Math.random() * 1.5 + 0.8;
    const width = Math.random() * 80 + 60;

    star.style.cssText = `
        left: ${startX}px;
        top: ${startY}px;
        width: ${width}px;
        animation-duration: ${duration}s;
    `;

    shootingStarsContainer.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}

// Random shooting stars every 4-10 seconds
function scheduleShootingStar() {
    createShootingStar();
    setTimeout(scheduleShootingStar, Math.random() * 6000 + 4000);
}
setTimeout(scheduleShootingStar, 3000);

/* ========================================================
   LIVE COUNTER (enhanced with flip animation)
   ======================================================== */
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

    animateValue(daysEl, daysStr);
    animateValue(hoursEl, hoursStr);
    animateValue(minutesEl, minsStr);
    animateValue(secondsEl, secsStr);

    if (miniDaysEl) miniDaysEl.textContent = daysStr;
    if (miniHoursEl) miniHoursEl.textContent = hoursStr;
    if (miniMinutesEl) miniMinutesEl.textContent = minsStr;
    if (miniSecondsEl) miniSecondsEl.textContent = secsStr;
}

function animateValue(element, newValue) {
    if (!element) return;
    if (element.textContent !== newValue) {
        element.classList.add('flip');
        setTimeout(() => {
            element.textContent = newValue;
            setTimeout(() => element.classList.remove('flip'), 200);
        }, 200);
    }
}

updateCounter();
setInterval(updateCounter, 1000);

/* ========================================================
   SCROLL PROGRESS BAR
   ======================================================== */
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

/* ========================================================
   NAVIGATION DOTS
   ======================================================== */
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

/* ========================================================
   SCROLL REVEAL ANIMATIONS
   ======================================================== */
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up, .story-text, .reveal-text, .glowing-text');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.85;

        if (elementTop < revealPoint) {
            element.classList.add('visible');
        }
    });
}

/* ========================================================
   FLOATING HEARTS (enhanced with sway)
   ======================================================== */
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['♥', '♡', '❤', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 7)];

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
    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, (duration + delay) * 1000);
}

for (let i = 0; i < 15; i++) {
    setTimeout(() => createFloatingHeart(), i * 800);
}
setInterval(createFloatingHeart, 3000);

/* ========================================================
   HERO PARTICLES (STARS)
   ======================================================== */
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

/* ========================================================
   SECTION FLOATING PARTICLES
   ======================================================== */
document.querySelectorAll('.section-particles').forEach(container => {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${['var(--color-gold)', 'var(--color-primary-light)', '#fff'][Math.floor(Math.random() * 3)]};
        `;
        container.appendChild(particle);
    }
});

/* ========================================================
   3D TILT EFFECT ON IMAGES
   ======================================================== */
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

/* ========================================================
   PARALLAX EFFECT
   ======================================================== */
function parallaxEffect() {
    const scrollY = window.scrollY;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
}

/* ========================================================
   CONFETTI ON FINAL SECTION
   ======================================================== */
let confettiStarted = false;
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
let confettiPieces = [];

function initConfetti() {
    if (!confettiCanvas || confettiStarted) return;
    confettiStarted = true;

    const section = document.getElementById('section-6');
    if (!section) return;

    confettiCanvas.width = section.offsetWidth;
    confettiCanvas.height = section.offsetHeight;

    const colors = ['#e91e90', '#ff6eb4', '#ffd700', '#ff4081', '#9b59b6', '#fff', '#f5a623'];

    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height,
            w: Math.random() * 8 + 4,
            h: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 1,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 8,
            alpha: 1
        });
    }

    animateConfetti();
}

function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let alive = false;
    confettiPieces.forEach(p => {
        if (p.alpha <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vy += 0.02;

        if (p.y > confettiCanvas.height) {
            p.alpha -= 0.02;
        }

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        confettiCtx.restore();
    });

    if (alive) {
        requestAnimationFrame(animateConfetti);
    }
}

/* ========================================================
   MUSIC / AMBIENT SOUND (enhanced with melody)
   ======================================================== */
let audioContext = null;
let isPlaying = false;

function createAmbientSound() {
    if (audioContext) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillators = [];

    // Warm pad chord: C major 7 spread
    const notes = [130.81, 164.81, 196.00, 246.94, 329.63]; // C3, E3, G3, B3, E4

    notes.forEach((freq) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        osc.detune.setValueAtTime(Math.random() * 10 - 5, audioContext.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);

        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();

        oscillators.push({ osc, gain });
    });

    // Gentle melody layer
    const melodyNotes = [523.25, 659.25, 783.99, 659.25, 523.25, 392.00, 523.25, 659.25];
    let noteIndex = 0;

    function playMelodyNote() {
        if (!isPlaying || !audioContext) return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melodyNotes[noteIndex], audioContext.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioContext.currentTime);

        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 0.3);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 2.5);

        noteIndex = (noteIndex + 1) % melodyNotes.length;
        setTimeout(playMelodyNote, 2500);
    }

    setTimeout(playMelodyNote, 2000);

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
            setTimeout(() => audioContext.suspend(), 1100);
        }
        musicToggle.classList.remove('playing');
        isPlaying = false;
    }
}

musicToggle.addEventListener('click', toggleMusic);

/* ========================================================
   CURSOR SPARKLE EFFECT (enhanced)
   ======================================================== */
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 40) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 5 + 3;
    const colors = ['#ff6eb4', '#ffd700', '#ff4081', '#fff', '#e91e90'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 ${size * 2}px ${color};
        transition: all 0.6s ease-out;
        opacity: 1;
    `;

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${offsetX}px, ${offsetY + 20}px) scale(0)`;
        sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 600);
}

/* ========================================================
   CLICK RIPPLE EFFECT
   ======================================================== */
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        border: 2px solid var(--color-primary-light);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        opacity: 0.6;
        transition: all 0.6s ease-out;
    `;

    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.width = '80px';
        ripple.style.height = '80px';
        ripple.style.opacity = '0';
    });

    setTimeout(() => ripple.remove(), 600);

    // Heart burst on click
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const angle = (Math.PI * 2 / 5) * i;
            const dist = 40 + Math.random() * 30;
            heart.textContent = '♥';
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: ${10 + Math.random() * 8}px;
                color: hsl(${330 + Math.random() * 30}, 80%, 65%);
                pointer-events: none;
                z-index: 9999;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                opacity: 1;
            `;
            document.body.appendChild(heart);

            requestAnimationFrame(() => {
                heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 30}px) scale(0)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => heart.remove(), 800);
        }, i * 50);
    }
});

/* ========================================================
   SCROLL-TRIGGERED SECTION CONFETTI
   ======================================================== */
const finalSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initConfetti();
            finalSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const finalSection = document.getElementById('section-6');
if (finalSection) {
    finalSectionObserver.observe(finalSection);
}

/* ========================================================
   EVENT LISTENERS
   ======================================================== */
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavDots();
    revealOnScroll();
    parallaxEffect();
}, { passive: true });

window.addEventListener('load', () => {
    revealOnScroll();
    updateScrollProgress();
    updateNavDots();
});

/* ========================================================
   EASTER EGG: Love Code
   ======================================================== */
const loveCode = ['l', 'o', 'v', 'e'];
let loveIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === loveCode[loveIndex]) {
        loveIndex++;
        if (loveIndex === loveCode.length) {
            for (let i = 0; i < 40; i++) {
                setTimeout(() => createFloatingHeart(), i * 80);
            }
            // Also trigger shooting stars
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createShootingStar(), i * 300);
            }
            loveIndex = 0;
        }
    } else {
        loveIndex = 0;
    }
});

/* ========================================================
   TOUCH SUPPORT FOR MOBILE
   ======================================================== */
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createSparkle(
                touch.clientX + (Math.random() - 0.5) * 30,
                touch.clientY + (Math.random() - 0.5) * 30
            );
        }, i * 100);
    }
}, { passive: true });
