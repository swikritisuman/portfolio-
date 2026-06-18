// ── TYPED ROLE ANIMATION ──
const roles = [
  "Computer Science Graduate",
  "Aspiring Software Developer", 
  "Open to Full-Stack Roles",
  "ML & AI Enthusiast"
];
let idx = 0, char = 0, isDeleting = false;
const target = document.getElementById('typed-role');

function type() {
  if (!target) return;
  const full = roles[idx];
  target.textContent = isDeleting
    ? full.substring(0, char--)
    : full.substring(0, char++);

  if (!isDeleting && char === full.length + 1) {
    isDeleting = true;
    setTimeout(type, 1400);
  } else if (isDeleting && char === 0) {
    isDeleting = false;
    idx = (idx + 1) % roles.length;
    setTimeout(type, 400);
  } else {
    setTimeout(type, isDeleting ? 60 : 100);
  }
}
type();


// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar a');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();


// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');

hamburger?.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('open'));
});


// ── FADE-IN ABOUT SECTION ──
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    el.style.opacity = 1;
  });
});


// ── SPARKLING FALLING STARS ──
const starsWrapper = document.querySelector('.stars-wrapper');
const glowColors = ['#ffffff', '#b6e0ff', '#ffd6f6', '#aaffff', '#c8b6ff'];

function createStar() {
  if (!starsWrapper) return;
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = `${Math.random() * 100}vw`;

  const size = Math.random() * 8 + 8;
  star.style.width  = `${size}px`;
  star.style.height = `${size}px`;

  const duration = Math.random() * 2.5 + 2;
  star.style.animationDuration = `${duration}s`;

  const color = glowColors[Math.floor(Math.random() * glowColors.length)];
  star.style.background = color;
  star.style.boxShadow  = `0 0 8px 4px ${color}, 0 0 16px 6px ${color}`;

  starsWrapper.appendChild(star);
  setTimeout(() => star.remove(), duration * 1000);
}

setInterval(() => {
  for (let i = 0; i < 4; i++) createStar();
}, 1000);


// ── VOICE WELCOME ──
let speechActive = true;
let speechInterval;

function speakMessage(msg) {
  if (!('speechSynthesis' in window) || !speechActive) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(msg);
  utterance.pitch  = 1;
  utterance.rate   = 1;
  utterance.volume = 0.85;
  const voices = speechSynthesis.getVoices();
  if (voices.length) {
    utterance.voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) || voices[0];
  }
  speechSynthesis.speak(utterance);
}

window.addEventListener("DOMContentLoaded", () => {
  const muteBtn = document.querySelector("#mute-btn");
  const message = "Hi! I'm Swikriti. Welcome to my portfolio.";

  setTimeout(() => speakMessage(message), 1200);
  speechInterval = setInterval(() => speakMessage(message), 12000);

  muteBtn?.addEventListener("click", () => {
    speechActive = !speechActive;
    if (!speechActive) {
      speechSynthesis.cancel();
      muteBtn.innerText = "🔇";
    } else {
      muteBtn.innerText = "🔊";
      speakMessage(message);
    }
  });

  speechSynthesis.onvoiceschanged = () => {};
});