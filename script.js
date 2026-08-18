// ---------- Photos ----------
const photos = [
  'photo/1000026837.jpg',
  'photo/1000026838.jpg',
  'photo/1000026839.jpg',
  'photo/1000026840.jpg',
  'photo/1000026841.jpg',
  'photo/1000026842.jpg',
  'photo/1000026843.jpg',
  'photo/1000026844.jpg',
  'photo/1000026845.jpg',
  'photo/photo_2026-08-18_08-14-26.jpg',
  'photo/photo_2026-08-18_08-14-35.jpg',
  'photo/photo_2026-08-18_08-14-42.jpg',
  'photo/photo_2026-08-18_08-14-45.jpg',
  'photo/photo_2026-08-18_08-14-48.jpg',
  'photo/photo_2026-08-18_08-14-51.jpg',
  'photo/photo_2026-08-18_08-14-54.jpg',
  'photo/photo_2026-08-18_08-14-56.jpg',
  'photo/photo_2026-08-18_08-14-59.jpg',
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Collage (fly-in polaroids) ----------
const collageGrid = document.getElementById('collage-grid');

const FLY_DIRS = [
  { fx: '-70vw', fy: '0' },
  { fx: '70vw', fy: '0' },
  { fx: '0', fy: '-55vh' },
  { fx: '-55vw', fy: '40vh' },
  { fx: '55vw', fy: '-35vh' },
  { fx: '0', fy: '55vh' },
  { fx: '-65vw', fy: '-25vh' },
  { fx: '65vw', fy: '25vh' },
  { fx: '0', fy: '-45vh' },
];
const FINAL_ROT = [-4, 3, -6, 5, -3, 4, -5, 2, -2];

photos.forEach((src, i) => {
  const frame = document.createElement('div');
  frame.className = 'collage-photo reveal-item';
  const dir = FLY_DIRS[i % FLY_DIRS.length];
  const finalRot = FINAL_ROT[i % FINAL_ROT.length];
  frame.style.setProperty('--fx', dir.fx);
  frame.style.setProperty('--fy', dir.fy);
  frame.style.setProperty('--fr', `${finalRot}deg`);
  frame.style.setProperty('--fr0', `${finalRot * 5}deg`);
  frame.style.setProperty('--delay', reducedMotion ? '0ms' : `${i * 150}ms`);

  const img = document.createElement('img');
  img.src = src;
  img.alt = `Юлічка, фото ${i + 1}`;
  img.loading = 'lazy';
  frame.appendChild(img);
  collageGrid.appendChild(frame);
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if (reducedMotion) {
  revealEls.forEach((el) => el.classList.add('in-view'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.classList.contains('money-rain')) spawnMoneyRain();
        if (entry.target.classList.contains('toast')) spawnBubbles();
        if (entry.target.classList.contains('stars')) spawnStars();
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
}

// ---------- Money rain (dedicated section) ----------
function spawnMoneyRain() {
  const decorEl = document.getElementById('money-decor');
  if (!decorEl || reducedMotion) return;
  const COIN_COUNT = 32;
  for (let i = 0; i < COIN_COUNT; i++) {
    const c = document.createElement('span');
    c.className = 'coin';
    const size = 10 + Math.random() * 14;
    c.style.width = `${size}px`;
    c.style.height = `${size}px`;
    c.style.left = `${Math.random() * 100}%`;
    c.style.setProperty('--drift', `${(Math.random() - 0.5) * 140}px`);
    c.style.setProperty('--spin', `${180 + Math.random() * 360}deg`);
    c.style.animationDuration = `${5 + Math.random() * 6}s`;
    c.style.animationDelay = `${Math.random() * 6}s`;
    decorEl.appendChild(c);
  }
  const BILL_EMOJI = ['💵', '💴', '💸'];
  const BILL_COUNT = 14;
  for (let i = 0; i < BILL_COUNT; i++) {
    const b = document.createElement('span');
    b.className = 'bill';
    b.textContent = BILL_EMOJI[i % BILL_EMOJI.length];
    b.style.fontSize = `${1.4 + Math.random() * 1.2}rem`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.setProperty('--drift', `${(Math.random() - 0.5) * 160}px`);
    b.style.setProperty('--spin', `${180 + Math.random() * 360}deg`);
    b.style.animationDuration = `${6 + Math.random() * 6}s`;
    b.style.animationDelay = `${Math.random() * 6}s`;
    decorEl.appendChild(b);
  }
}

// ---------- Champagne bubbles (toast section) ----------
function spawnBubbles() {
  const bubblesEl = document.getElementById('toast-bubbles');
  if (!bubblesEl || reducedMotion) return;
  const BUBBLE_COUNT = 26;
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const b = document.createElement('span');
    b.className = 'bubble';
    const size = 4 + Math.random() * 8;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
    b.style.animationDuration = `${7 + Math.random() * 6}s`;
    b.style.animationDelay = `${Math.random() * 8}s`;
    bubblesEl.appendChild(b);
  }
}

// ---------- Falling stars ----------
function spawnStars() {
  const decorEl = document.getElementById('stars-decor');
  if (!decorEl || reducedMotion) return;

  const TWINKLE_COUNT = 10;
  for (let i = 0; i < TWINKLE_COUNT; i++) {
    const t = document.createElement('span');
    t.className = 'twinkle';
    const size = 1 + Math.random() * 1.5;
    t.style.width = `${size}px`;
    t.style.height = `${size}px`;
    t.style.left = `${Math.random() * 100}%`;
    t.style.top = `${Math.random() * 100}%`;
    t.style.animationDuration = `${2 + Math.random() * 3}s`;
    t.style.animationDelay = `${Math.random() * 4}s`;
    decorEl.appendChild(t);
  }

  const RAIN_COUNT = 30;
  for (let i = 0; i < RAIN_COUNT; i++) {
    const wrap = document.createElement('span');
    wrap.className = 'rain-star';
    const angle = -70 - Math.random() * 12;
    wrap.style.left = `${Math.random() * 100}%`;
    wrap.style.top = `${-10 + Math.random() * 50}%`;
    wrap.style.transform = `rotate(${angle}deg)`;

    const head = document.createElement('span');
    head.className = 'rain-head';
    head.style.animationDuration = `${1.3 + Math.random() * 1}s`;
    head.style.animationDelay = `${(i / RAIN_COUNT) * 6 + Math.random() * 0.8}s`;

    wrap.appendChild(head);
    decorEl.appendChild(wrap);
  }
}

// ---------- Cursor comet trail (stars section) ----------
const starsSection = document.querySelector('.stars');
const starsDecorEl = document.getElementById('stars-decor');
if (starsSection && starsDecorEl && !reducedMotion) {
  let lastSparkTime = 0;
  starsSection.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSparkTime < 35) return;
    lastSparkTime = now;

    const rect = starsSection.getBoundingClientRect();
    const spark = document.createElement('span');
    spark.className = 'cursor-spark';
    const size = 2 + Math.random() * 3;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.left = `${e.clientX - rect.left + (Math.random() - 0.5) * 6}px`;
    spark.style.top = `${e.clientY - rect.top + (Math.random() - 0.5) * 6}px`;
    starsDecorEl.appendChild(spark);
    setTimeout(() => spark.remove(), 750);
  });
}

// ---------- Hero ambient sparks ----------
const sparksEl = document.getElementById('hero-sparks');
if (!reducedMotion) {
  const SPARK_COUNT = 22;
  for (let i = 0; i < SPARK_COUNT; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    const size = 3 + Math.random() * 5;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
    s.style.animationDuration = `${9 + Math.random() * 8}s`;
    s.style.animationDelay = `${Math.random() * 12}s`;
    sparksEl.appendChild(s);
  }
}

// ---------- Hero parallax (mouse follow) ----------
const heroEl = document.querySelector('.hero');
const heroDecorEl = document.querySelector('.hero-decor');
if (heroEl && heroDecorEl && !reducedMotion) {
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    heroDecorEl.style.transform = `translate(${dx * 34}px, ${dy * 24}px)`;
  });
  heroEl.addEventListener('mouseleave', () => {
    heroDecorEl.style.transform = 'translate(0, 0)';
  });
}

// ---------- Wish cards (flip) ----------
document.querySelectorAll('.wish-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ---------- Fireworks ----------
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#e3b04b', '#f0c874', '#ef7a63', '#f7ecd9', '#d1495b'];

function spawnBurst(x, y, count = 60) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60 + Math.random() * 30,
      age: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 2,
    });
  }
}

function randomBurst() {
  const x = window.innerWidth * (0.15 + Math.random() * 0.7);
  const y = window.innerHeight * (0.15 + Math.random() * 0.35);
  spawnBurst(x, y, 70);
}

// continuous ambient salutes, no button needed
let fireworksSuppressed = false;
if (!reducedMotion) {
  const scheduleNextBurst = () => {
    setTimeout(() => {
      if (!fireworksSuppressed) randomBurst();
      scheduleNextBurst();
    }, 1800 + Math.random() * 1800);
  };
  setTimeout(() => { randomBurst(); scheduleNextBurst(); }, 900);
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.age++;
    p.vy += 0.045; // gravity
    p.vx *= 0.99;
    p.vy *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    const alpha = Math.max(0, 1 - p.age / p.life);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  particles = particles.filter((p) => p.age < p.life);
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// ---------- Music (Happy Birthday, synthesized) ----------
let audioCtx = null;
let masterGain = null;
let muted = false;
let melodyLoopTimer = null;

const NOTE = {
  G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25,
  D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
};

// [note, duration in beats]
const MELODY = [
  ['G4', 0.5], ['G4', 0.5], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
  ['G4', 0.5], ['G4', 0.5], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', 0.5], ['G4', 0.5], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
  ['F5', 0.5], ['F5', 0.5], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2],
];

const BEAT = 0.4; // seconds per beat

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playNote(freq, startTime, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(1, startTime + 0.02);
  gain.gain.linearRampToValueAtTime(0, startTime + duration * 0.95);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playMelody() {
  ensureAudio();
  let t = audioCtx.currentTime + 0.05;
  let total = 0;
  MELODY.forEach(([note, beats]) => {
    const dur = beats * BEAT;
    playNote(NOTE[note], t, dur * 0.92);
    t += dur;
    total += dur;
  });
  melodyLoopTimer = setTimeout(playMelody, total * 1000 + 700);
}

// ---------- Controls ----------
const muteBtn = document.getElementById('mute-btn');

function startMusicOnce() {
  ensureAudio();
  if (muted) masterGain.gain.value = 0;
  playMelody();
}
['click', 'touchstart', 'keydown'].forEach((evt) => {
  document.addEventListener(evt, startMusicOnce, { once: true });
});

muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔇' : '🔊';
  if (masterGain) {
    masterGain.gain.setTargetAtTime(muted ? 0 : 0.18, audioCtx.currentTime, 0.05);
  }
});
