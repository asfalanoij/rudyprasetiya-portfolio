/* ═══════════════════════════════════════════════════════
   Rudy Hendra Prasetiya — Portfolio · main.js
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Helpers ──────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Year ─────────────────────────────────────────── */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Nav scroll behaviour ─────────────────────────── */
const nav = $('#nav');
const burger = $('#burger');
const drawer = $('#drawer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  drawer.classList.toggle('open');
});

$$('.drawer__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    drawer.classList.remove('open');
  });
});

/* ── Typing Animation ─────────────────────────────── */
const typeEl = $('#type-el');
const words = [
  'GRC Engineer',
  'IT Audit Manager',
  'Risk Strategist',
  'Cybersecurity Analyst',
  'AI Governance Expert',
  'Fraud Examiner',
  'Data Governance Lead',
];

if (typeEl) {
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  const TYPE_SPEED   = 75;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER  = 2000;
  const PAUSE_BEFORE = 400;

  function type() {
    const word = words[wordIdx];

    if (paused) {
      paused = false;
      deleting = true;
      setTimeout(type, PAUSE_BEFORE);
      return;
    }

    if (deleting) {
      typeEl.textContent = word.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, DELETE_SPEED);
    } else {
      typeEl.textContent = word.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        paused = true;
        setTimeout(type, PAUSE_AFTER);
        return;
      }
      setTimeout(type, TYPE_SPEED);
    }
  }

  setTimeout(type, 800);
}

/* ── Canvas — Cyber Network Particles ────────────── */
const canvas = $('#hero-canvas');

if (canvas) {
  const ctx2d = canvas.getContext('2d');
  let W, H, particles, animId;

  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 140;
  const COLORS = ['#00d4ff', '#7b2fbe', '#00ffb3'];

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = Math.random() * 0.3 + 0.1;
      this.r  = Math.random() * 2 + 1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > H + 10 || this.x < -10 || this.x > W + 10) this.reset();
    }

    draw() {
      ctx2d.beginPath();
      ctx2d.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx2d.fillStyle = hexAlpha(this.color, this.alpha);
      ctx2d.fill();
    }
  }

  function hexAlpha(hex, a) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx2d.beginPath();
          ctx2d.moveTo(particles[i].x, particles[i].y);
          ctx2d.lineTo(particles[j].x, particles[j].y);
          ctx2d.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx2d.lineWidth = 0.8;
          ctx2d.stroke();
        }
      }
    }
  }

  function drawGradient() {
    const grd = ctx2d.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, H * 0.8);
    grd.addColorStop(0,   'rgba(0,26,51,0.95)');
    grd.addColorStop(0.5, 'rgba(5,8,16,0.97)');
    grd.addColorStop(1,   'rgba(5,8,16,1)');
    ctx2d.fillStyle = grd;
    ctx2d.fillRect(0, 0, W, H);
  }

  function tick() {
    ctx2d.clearRect(0, 0, W, H);
    drawGradient();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    tick();
  }, { passive: true });

  init();
  tick();
}

/* ── Scroll Reveal ────────────────────────────────── */
const revealEls = $$('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── Active Nav Link ──────────────────────────────── */
const sections = $$('section[id]');
const navLinks = $$('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact Form ─────────────────────────────────── */
const form = $('#contact-form');
const formNote = $('#form-note');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const data      = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res  = await fetch('contact.php', { method: 'POST', body: data });
      const json = await res.json();
      if (formNote) {
        formNote.style.color = json.success ? '#00ffb3' : '#ff6b6b';
        formNote.textContent  = json.success ? '✓ ' + json.message : '✗ ' + json.message;
      }
      if (json.success) form.reset();
    } catch {
      if (formNote) {
        formNote.style.color = '#ff6b6b';
        formNote.textContent  = '✗ Network error — please email rudyhendra@iuj.ac.jp or call +62 811-482-8024.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/* ── Smooth Parallax on Hero ──────────────────────── */
const heroContent = $('.hero__content');
if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity   = 1 - (y / (window.innerHeight * 0.7));
    }
  }, { passive: true });
}
