/* ========================================================
   OUR LOVE STORY — Ultimate JavaScript v3.0
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
const scrollProgressGlow = document.getElementById('scrollProgressGlow');
const heartsContainer = document.getElementById('heartsContainer');
const petalsContainer = document.getElementById('petalsContainer');
const orbsContainer = document.getElementById('orbsContainer');
const heroParticles = document.getElementById('heroParticles');
const navDots = document.querySelectorAll('.nav-dot');
const musicToggle = document.getElementById('musicToggle');
const musicBars = document.getElementById('musicBars');
const loadingScreen = document.getElementById('loadingScreen');
const constellationCanvas = document.getElementById('constellationCanvas');
const shootingStarsContainer = document.getElementById('shootingStars');
const confettiCanvas = document.getElementById('confettiCanvas');
const backToTop = document.getElementById('backToTop');

/* ========================================================
   LOADING SCREEN & INITIAL ANIMATIONS
   ======================================================== */
window.addEventListener('DOMContentLoaded', () => {
    const fillEl = document.getElementById('loaderBarFill');
    const percentEl = document.getElementById('loaderPercentage');
    const messageEl = document.getElementById('loaderMessage');
    
    const messages = [
        "Unfolding our memories...",
        "Tuning the stars...",
        "Counting 188 days of smiles...",
        "Polishing the sunset paths...",
        "Preparing forever..."
    ];
    
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            if (percentEl) percentEl.textContent = "100%";
            if (fillEl) fillEl.style.width = "100%";
            if (messageEl) messageEl.textContent = "Welcome to our story ♡";
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(startHeroAnimations, 800);
            }, 800);
        } else {
            if (percentEl) percentEl.textContent = `${progress}%`;
            if (fillEl) fillEl.style.width = `${progress}%`;
            
            // Switch messages based on progress
            const msgIndex = Math.min(messages.length - 1, Math.floor(progress / 20));
            if (messageEl) messageEl.textContent = messages[msgIndex];
        }
    }, 120);
});

function startHeroAnimations() {
    // Reveal Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.classList.add('visible');

    // Reveal Tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        setTimeout(() => {
            tagline.classList.add('visible');
        }, 1200);
    }

    // Reveal Divider
    const divider = document.querySelector('.hero-heart-divider');
    if (divider) {
        setTimeout(() => {
            divider.classList.add('visible');
        }, 800);
    }

    // Trigger typewriter title
    const titleText = 'Our Love Story';
    const typewriterEl = document.getElementById('typewriterText');
    let charIndex = 0;

    function typeChar() {
        if (charIndex < titleText.length) {
            typewriterEl.textContent += titleText[charIndex];
            charIndex++;
            setTimeout(typeChar, 100 + Math.random() * 50);
        } else {
            // Finished typing, show typewriter cursor pulse
            const cursor = document.querySelector('.typewriter-cursor');
            if (cursor) cursor.style.animation = 'cursorBlink 0.8s step-end infinite';
        }
    }

    setTimeout(typeChar, 500);

    // Fade-in other hero content
    document.querySelectorAll('.hero-content .fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 200 + 400);
    });
}

/* ========================================================
   CONSTELLATION CANVAS
   ======================================================== */
const constellationCtx = constellationCanvas ? constellationCanvas.getContext('2d') : null;
let constellationStars = [];
let mousePos = { x: -2000, y: -2000 };

function resizeConstellationCanvas() {
    if (!constellationCanvas) return;
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;
}

function initConstellationStars() {
    if (!constellationCanvas) return;
    constellationStars = [];
    const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    for (let i = 0; i < count; i++) {
        constellationStars.push({
            x: Math.random() * constellationCanvas.width,
            y: Math.random() * constellationCanvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: Math.random() * 1.8 + 0.4,
            alpha: Math.random() * 0.6 + 0.2,
            phase: Math.random() * Math.PI
        });
    }
}

function drawConstellation() {
    if (!constellationCtx || !constellationCanvas) return;
    constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);

    constellationStars.forEach((star, i) => {
        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Wrap edges
        if (star.x < 0) star.x = constellationCanvas.width;
        if (star.x > constellationCanvas.width) star.x = 0;
        if (star.y < 0) star.y = constellationCanvas.height;
        if (star.y > constellationCanvas.height) star.y = 0;

        // Pulsing glow
        star.phase += 0.01;
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(star.phase) * 0.15);

        // Draw star
        constellationCtx.beginPath();
        constellationCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        constellationCtx.fillStyle = `rgba(232, 160, 191, ${currentAlpha})`;
        constellationCtx.fill();

        // Connect stars
        for (let j = i + 1; j < constellationStars.length; j++) {
            const other = constellationStars[j];
            const dx = star.x - other.x;
            const dy = star.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                constellationCtx.beginPath();
                constellationCtx.moveTo(star.x, star.y);
                constellationCtx.lineTo(other.x, other.y);
                constellationCtx.strokeStyle = `rgba(184, 169, 232, ${0.12 * (1 - dist / 100)})`;
                constellationCtx.lineWidth = 0.5;
                constellationCtx.stroke();
            }
        }

        // Connect to mouse
        const mdx = star.x - mousePos.x;
        const mdy = star.y - mousePos.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
            constellationCtx.beginPath();
            constellationCtx.moveTo(star.x, star.y);
            constellationCtx.lineTo(mousePos.x, mousePos.y);
            constellationCtx.strokeStyle = `rgba(247, 215, 148, ${0.25 * (1 - mDist / 160)})`;
            constellationCtx.lineWidth = 0.7;
            constellationCtx.stroke();
        }
    });

    requestAnimationFrame(drawConstellation);
}

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

document.addEventListener('mouseleave', () => {
    mousePos = { x: -2000, y: -2000 };
});

if (constellationCanvas) {
    resizeConstellationCanvas();
    initConstellationStars();
    drawConstellation();
    window.addEventListener('resize', () => {
        resizeConstellationCanvas();
        initConstellationStars();
    });
}

/* ========================================================
   SHOOTING STARS
   ======================================================== */
function createShootingStar() {
    if (!shootingStarsContainer) return;
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startX = Math.random() * window.innerWidth * 0.7;
    const startY = Math.random() * window.innerHeight * 0.3;
    const duration = Math.random() * 1.8 + 0.8;
    const width = Math.random() * 120 + 80;

    star.style.cssText = `
        left: ${startX}px;
        top: ${startY}px;
        width: ${width}px;
        animation-duration: ${duration}s;
    `;

    shootingStarsContainer.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}

// Random loop
function scheduleShootingStars() {
    createShootingStar();
    setTimeout(scheduleShootingStars, Math.random() * 7000 + 4000);
}
setTimeout(scheduleShootingStars, 2000);

/* ========================================================
   LIVE COUNTER (enhanced with flip digit mechanics)
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

    animateDigit(daysEl, daysStr);
    animateDigit(hoursEl, hoursStr);
    animateDigit(minutesEl, minsStr);
    animateDigit(secondsEl, secsStr);

    if (miniDaysEl) miniDaysEl.textContent = daysStr;
    if (miniHoursEl) miniHoursEl.textContent = hoursStr;
    if (miniMinutesEl) miniMinutesEl.textContent = minsStr;
    if (miniSecondsEl) miniSecondsEl.textContent = secsStr;
}

function animateDigit(element, newValue) {
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
   FLOATING ELEMENTS (Hearts, Rose Petals, Glowing Orbs)
   ======================================================== */
function createFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['♥', '♡', '❤', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 7)];

    const size = Math.random() * 18 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 14 + 10;
    const delay = Math.random() * 4;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        color: hsl(${330 + Math.random() * 25}, ${80 + Math.random() * 20}%, ${65 + Math.random() * 15}%);
    `;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay) * 1000);
}

function createFloatingPetal() {
    if (!petalsContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('floating-petal');

    const sizeW = Math.random() * 10 + 6;
    const sizeH = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 12;
    const delay = Math.random() * 5;

    // Soft rose golds, coral pinks, and peaches
    const colors = ['#e8a0bf', '#ffdeb9', '#ffd2d2', '#f0c27f', '#ffbfa3'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.cssText = `
        left: ${left}%;
        width: ${sizeW}px;
        height: ${sizeH}px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), (duration + delay) * 1000);
}

function createFloatingOrb() {
    if (!orbsContainer) return;
    const orb = document.createElement('div');
    const size = Math.random() * 40 + 10;
    const left = Math.random() * 100;
    const bottom = Math.random() * 40 + 5;
    const duration = Math.random() * 8 + 6;

    orb.classList.add('floating-orb');
    orb.style.cssText = `
        left: ${left}%;
        bottom: ${bottom}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(232, 160, 191, 0.15) 0%, rgba(184, 169, 232, 0.02) 70%, transparent 100%);
        animation-duration: ${duration}s;
    `;

    orbsContainer.appendChild(orb);
    setTimeout(() => orb.remove(), duration * 1000);
}

// Generate initial batches
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 600);
    setTimeout(createFloatingPetal, i * 700);
}

// Set up generation loops
setInterval(createFloatingHeart, 3200);
setInterval(createFloatingPetal, 4000);
setInterval(createFloatingOrb, 5000);

/* ========================================================
   HERO STARS
   ======================================================== */
function createHeroStars() {
    if (!heroParticles) return;
    const count = 70;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('hero-particle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2.5 + 0.8;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;

        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${Math.random() > 0.4 ? 'var(--rose)' : 'var(--gold)'};
            opacity: ${Math.random() * 0.7 + 0.3};
        `;

        heroParticles.appendChild(star);
    }
}
createHeroStars();

/* ========================================================
   SECTION STARS
   ======================================================== */
document.querySelectorAll('.section-particles').forEach(container => {
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.classList.add('hero-particle');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const duration = Math.random() * 6 + 3;
        const delay = Math.random() * 5;

        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${['var(--rose)', 'var(--gold)', '#fff'][Math.floor(Math.random() * 3)]};
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        container.appendChild(star);
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
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.6s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

/* ========================================================
   SCROLL PROGRESS & BACK TO TOP
   ======================================================== */
function handleScrollEffects() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Progress Bar
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
    if (scrollProgressGlow) scrollProgressGlow.style.opacity = scrollPercent > 5 ? '1' : '0';

    // Back to Top Button
    if (backToTop) {
        if (scrollTop > window.innerHeight * 0.7) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Navigation active state
    const sections = document.querySelectorAll('.section');
    const scrollHalf = scrollTop + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollHalf >= top && scrollHalf < bottom) {
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[index]) navDots[index].classList.add('active');
        }
    });

    // Parallax on Hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollTop < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollTop * 0.35}px)`;
        heroContent.style.opacity = 1 - (scrollTop / window.innerHeight) * 1.1;
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

window.addEventListener('scroll', handleScrollEffects, { passive: true });

/* ========================================================
   SCROLL REVEAL ANIMATIONS & BREAKOUT INTERACTIONS
   ======================================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Check if it's an image wrapper to add custom scroll active state
            if (entry.target.classList.contains('story-image-wrapper')) {
                entry.target.dataset.active = "true";
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Elements to observe
document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up, .story-text, .reveal-text, .glowing-text, .hero-subtitle, .hero-heart-divider, .story-image-wrapper').forEach(el => {
    revealObserver.observe(el);
});

// Dynamic image breakout parallax shift on scroll
function handleImageBreakoutShift() {
    document.querySelectorAll('.story-image-wrapper[data-active="true"]').forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // Calculate vertical progress relative to viewport center
        const progress = (rect.top + rect.height / 2 - viewHeight / 2) / (viewHeight / 2);
        
        // Softly slide up/down relative to scroll depth
        const translateY = Math.max(-50, Math.min(50, progress * -35));
        
        // Softly shift horizontally depending on breakout side
        let translateX = 0;
        if (wrapper.classList.contains('breakout-image-left')) {
            translateX = -110 + Math.max(-20, Math.min(20, progress * -15));
        } else if (wrapper.classList.contains('breakout-image-right')) {
            translateX = 110 + Math.max(-20, Math.min(20, progress * 15));
        }
        
        wrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1.04)`;
    });
}
window.addEventListener('scroll', handleImageBreakoutShift, { passive: true });

/* ========================================================
   CONFETTI EXPLOSION (Final Section)
   ======================================================== */
let confettiRunning = false;
let confettiPieces = [];
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

function triggerConfetti() {
    if (!confettiCanvas || confettiRunning) return;
    confettiRunning = true;

    const section = document.getElementById('section-6');
    if (!section) return;

    confettiCanvas.width = section.offsetWidth;
    confettiCanvas.height = section.offsetHeight;

    const colors = ['#e8a0bf', '#ffdeb9', '#f0c27f', '#ff5fa2', '#b8a9e8', '#ffffff'];

    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height - 20,
            sizeW: Math.random() * 8 + 4,
            sizeH: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 1.5,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            alpha: 1
        });
    }

    animateConfetti();
}

function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = false;

    confettiPieces.forEach(p => {
        if (p.alpha <= 0) return;
        active = true;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vy += 0.025; // gravity

        if (p.y > confettiCanvas.height) {
            p.alpha -= 0.02;
        }

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.sizeW / 2, -p.sizeH / 2, p.sizeW, p.sizeH);
        confettiCtx.restore();
    });

    if (active) {
        requestAnimationFrame(animateConfetti);
    }
}

// Observe final section
const finalSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerConfetti();
            finalSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const finalSection = document.getElementById('section-6');
if (finalSection) finalSectionObserver.observe(finalSection);

/* ========================================================
   AMBIENT CHORDS & MELODY
   ======================================================== */
let audioCtx = null;
let isMusicPlaying = false;

function initAudio() {
    if (audioCtx) return;

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // warm rose-gold pad oscillators
    const chordFrequencies = [130.81, 164.81, 196.00, 246.94, 329.63]; // C3, E3, G3, B3, E4
    const oscillators = [];

    chordFrequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.detune.setValueAtTime(Math.random() * 12 - 6, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 3.0); // smooth fade-in

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        oscillators.push({ osc, gain });
    });

    // Soft melody layer loop
    const melodyNotes = [523.25, 659.25, 783.99, 659.25, 523.25, 392.00, 523.25, 659.25];
    let noteIndex = 0;

    function playMelodyStep() {
        if (!isMusicPlaying || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melodyNotes[noteIndex], audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.4);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 2.5);

        noteIndex = (noteIndex + 1) % melodyNotes.length;
        setTimeout(playMelodyStep, 2600);
    }

    setTimeout(playMelodyStep, 3000);
    audioCtx._oscillators = oscillators;
}

function toggleMusic() {
    if (!isMusicPlaying) {
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        musicToggle.classList.add('playing');
        if (musicBars) musicBars.classList.add('active');
        isMusicPlaying = true;
    } else {
        if (audioCtx) {
            audioCtx._oscillators.forEach(o => {
                o.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
            });
            setTimeout(() => {
                audioCtx.suspend();
            }, 1100);
        }
        musicToggle.classList.remove('playing');
        if (musicBars) musicBars.classList.remove('active');
        isMusicPlaying = false;
    }
}

if (musicToggle) musicToggle.addEventListener('click', toggleMusic);

/* ========================================================
   CLICK RIPPLE & EXPLOSION OF HEARTS
   ======================================================== */
document.addEventListener('click', (e) => {
    // Avoid click ripple on interactive elements
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.nav-dot')) return;

    // Ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0; height: 0;
        border: 2px solid var(--rose);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        opacity: 0.6;
        transition: all 0.7s cubic-bezier(0.1, 0.8, 0.3, 1);
    `;
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 700);

    // Heart explosion
    const count = 5;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.textContent = '♥';
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = 45 + Math.random() * 35;
            h.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: ${12 + Math.random() * 8}px;
                color: hsl(${330 + Math.random() * 30}, 85%, 68%);
                pointer-events: none;
                z-index: 9999;
                transition: all 0.9s cubic-bezier(0.1, 0.8, 0.3, 1);
                opacity: 1;
            `;
            document.body.appendChild(h);

            requestAnimationFrame(() => {
                h.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 25}px) scale(0)`;
                h.style.opacity = '0';
            });
            setTimeout(() => h.remove(), 950);
        }, i * 35);
    }
});

/* ========================================================
   SPARKLE CURSOR TRAILS (optimized)
   ======================================================== */
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 35) {
        createTrailSparkle(e.clientX, e.clientY);
        lastTrailTime = now;
    }
});

function createTrailSparkle(x, y) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 4 + 3;
    const colors = ['#e8a0bf', '#ffdeb9', '#f0c27f', '#ffffff', '#ff5fa2'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const driftX = (Math.random() - 0.5) * 25;
    const driftY = (Math.random() - 0.5) * 25 + 10;

    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
        z-index: 9999;
        transition: all 0.7s cubic-bezier(0.1, 0.8, 0.3, 1);
        opacity: 1;
    `;
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${driftX}px, ${driftY}px) scale(0)`;
        sparkle.style.opacity = '0';
    });
    setTimeout(() => sparkle.remove(), 700);
}

/* ========================================================
   TOUCH SPARKS (Mobile optimization)
   ======================================================== */
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createTrailSparkle(
                touch.clientX + (Math.random() - 0.5) * 30,
                touch.clientY + (Math.random() - 0.5) * 30
            );
        }, i * 80);
    }
}, { passive: true });

/* ========================================================
   EASTER EGG: typing "love"
   ======================================================== */
const keySequence = ['l', 'o', 'v', 'e'];
let sequenceIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === keySequence[sequenceIndex]) {
        sequenceIndex++;
        if (sequenceIndex === keySequence.length) {
            // Heart storm
            for (let i = 0; i < 50; i++) {
                setTimeout(createFloatingHeart, i * 60);
            }
            // Shooting stars storm
            for (let i = 0; i < 6; i++) {
                setTimeout(createShootingStar, i * 250);
            }
            sequenceIndex = 0;
        }
    } else {
        sequenceIndex = 0;
    }
});
