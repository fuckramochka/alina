// Application Logic for Alina Machur's Cucumber Project Presentation

// Web Audio Sound FX Generator (no external audio files needed!)
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Crisp cucumber crunch bite sound synthesis
  playCrunch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Multiple rapid noise bursts + frequency filter for realistic veggie crunch
    for (let i = 0; i < 4; i++) {
      const offset = t + i * 0.04;
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 800, offset);
      filter.Q.setValueAtTime(3, offset);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, offset);
      gain.gain.exponentialRampToValueAtTime(0.01, offset + 0.045);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(offset);
      noise.stop(offset + 0.05);
    }
  }

  // Glass jar ping / chime sound
  playJarChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1320, t); // E6
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.6);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.8);
  }

  // Soft UI click
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.08);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }
}

const sfx = new SoundEffects();

// Sound toggle button
const soundToggleBtn = document.getElementById('soundToggleBtn');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    soundToggleBtn.textContent = sfx.enabled ? '🔊' : '🔇';
    soundToggleBtn.title = sfx.enabled ? 'Звук увімкнено' : 'Звук вимкнено';
    if (sfx.enabled) sfx.playClick();
  });
}

// 4 JARS DATA
const jarsData = [
  {
    id: 1,
    title: "Банка №1: «Хрумка Класика»",
    subtitle: "Традиційний рецепт від мами та Аліни",
    specs: "Об'єм: 1.0 л | Посол: помірний | Ступінь хрускоту: 10/10",
    ingredients: [
      "Свіжозібрані огірочки (зібрані 25 липня)",
      "Парасольки свіжого кропу",
      "Листя смородини та вишні для пружності",
      "Зубчики молодого часнику (3 шт.)",
      "Запашний перець горошком",
      "Чиста джерельна вода, сіль, цукор, оцет 9%"
    ],
    secret: "Огірки замочувалися у крижаній воді на 2 години перед закруткою — це гарантує легендарний хрускіт навіть посеред зими!",
    badge: "Головний запас сім'ї"
  },
  {
    id: 2,
    title: "Банка №2: «Пряний Корнішон»",
    subtitle: "Пікантна баночка з французькою гірчицею",
    specs: "Об'єм: 1.0 л | Смак: кисло-солодкий з іскрою",
    ingredients: [
      "Найдрібніші пухирчасті огірочки 6-8 см",
      "Французька зерниста гірчиця (1 ч. л.)",
      "Корінь хрону тертий",
      "Часник та лавровий листок",
      "Солодкувато-пряний маринад"
    ],
    secret: "Додано маленький шматочок свіжого кореня хрону, щоб м'якуш залишався надзвичайно пружним та ароматним.",
    badge: "До святкового столу"
  },
  {
    id: 3,
    title: "Банка №3: «Бабусине Золото»",
    subtitle: "Перевірений часом родинний маринад",
    specs: "Об'єм: 1.0 л | Аромат: насичений кроповий",
    ingredients: [
      "Огірки середнього калібру прямо з лози",
      "Листя дуба для міцності",
      "Духмяний кріп, петрушка",
      "Гвоздика (2 шт.) та чорний перець",
      "Класичний збалансований розсіл"
    ],
    secret: "Секретний інгредієнт бабусі — дубовий листочок, який зберігає природний смарагдовий колір огірка.",
    badge: "Золотий фонд"
  },
  {
    id: 4,
    title: "Банка №4: «Новорічний Тріумф 7-Б»",
    subtitle: "Ексклюзивна баночка строго під ялинку",
    specs: "Об'єм: 1.0 л | Дата відкриття: 31 грудня 2026",
    ingredients: [
      "Добірні найкращі огірки врожаю 25 липня",
      "Асорті зелені: кріп, тархун, смородина",
      "Гострий перчик (одна тоненька скибочка)",
      "Часник та лавр",
      "Святковий маринад з ноткою любові"
    ],
    secret: "Банка запечатана фірмовою наліпкою: «Відкрити в колі рідних або однокласників на Новий Рік!».",
    badge: "Strictly New Year 2027"
  }
];

// Open Jar Modal
const modal = document.getElementById('jarModal');
const modalClose = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalSpecs = document.getElementById('modalSpecs');
const modalIngredients = document.getElementById('modalIngredients');
const modalSecret = document.getElementById('modalSecret');
const modalBadge = document.getElementById('modalBadge');

function openJarModal(jarId) {
  sfx.playJarChime();
  const jar = jarsData.find(j => j.id === jarId);
  if (!jar) return;

  modalTitle.textContent = jar.title;
  modalSubtitle.textContent = jar.subtitle;
  modalSpecs.textContent = jar.specs;
  modalBadge.textContent = jar.badge;
  modalSecret.textContent = jar.secret;

  modalIngredients.innerHTML = '';
  jar.ingredients.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color: var(--accent-lime); margin-right: 8px;">✓</span> ${item}`;
    modalIngredients.appendChild(li);
  });

  modal.classList.add('active');
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    sfx.playClick();
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Lightbox for photos
const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  sfx.playClick();
  lightboxImg.src = src;
  lightbox.classList.add('active');
}

if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

// Crunchy buttons
document.querySelectorAll('.interactive-crunch-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sfx.playCrunch();
    createCrunchParticles(btn);
  });
});

// Presentation Slide Mode Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.pres-slide');
const totalSlides = slides.length;
const slideIndicator = document.getElementById('slideIndicator');
const btnPrevSlide = document.getElementById('btnPrevSlide');
const btnNextSlide = document.getElementById('btnNextSlide');
const btnClosePres = document.getElementById('btnClosePres');
const btnStartPres = document.getElementById('btnStartPres');
const btnStartPresHero = document.getElementById('btnStartPresHero');

function showSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === currentSlide);
  });

  if (slideIndicator) {
    slideIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
  }

  if (btnPrevSlide) btnPrevSlide.disabled = currentSlide === 0;
  if (btnNextSlide) btnNextSlide.disabled = currentSlide === totalSlides - 1;

  sfx.playClick();
  if (currentSlide === totalSlides - 1) {
    triggerConfetti();
  }
}

function openPresentation() {
  document.body.classList.add('presentation-mode');
  showSlide(0);
}

function closePresentation() {
  document.body.classList.remove('presentation-mode');
  sfx.playClick();
}

if (btnStartPres) btnStartPres.addEventListener('click', openPresentation);
if (btnStartPresHero) btnStartPresHero.addEventListener('click', openPresentation);
if (btnClosePres) btnClosePres.addEventListener('click', closePresentation);
if (btnPrevSlide) btnPrevSlide.addEventListener('click', () => showSlide(currentSlide - 1));
if (btnNextSlide) btnNextSlide.addEventListener('click', () => showSlide(currentSlide + 1));

// Keyboard Navigation for slides
window.addEventListener('keydown', (e) => {
  if (document.body.classList.contains('presentation-mode')) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentSlide > 0) showSlide(currentSlide - 1);
    } else if (e.key === 'Escape') {
      closePresentation();
    }
  } else {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) modal.classList.remove('active');
      if (lightbox && lightbox.classList.contains('active')) lightbox.classList.remove('active');
    }
  }
});

// Interactive Confetti System
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#22c55e', '#84cc16', '#4ade80', '#facc15', '#ffffff', '#10b981'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animate();
}

const triggerConfettiBtn = document.getElementById('btnDiplomaCelebrate');
if (triggerConfettiBtn) {
  triggerConfettiBtn.addEventListener('click', () => {
    sfx.playCrunch();
    triggerConfetti();
  });
}

// Particle crunch visual effect around button
function createCrunchParticles(elem) {
  const rect = elem.getBoundingClientRect();
  const count = 12;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.textContent = ['🥒', '✨', '🍃', '⭐'][Math.floor(Math.random() * 4)];
    dot.style.position = 'fixed';
    dot.style.left = `${rect.left + rect.width / 2}px`;
    dot.style.top = `${rect.top + rect.height / 2}px`;
    dot.style.fontSize = `${Math.random() * 14 + 14}px`;
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.transition = 'all 0.7s cubic-bezier(0.2, 1, 0.3, 1)';
    document.body.appendChild(dot);

    const angle = (i / count) * Math.PI * 2;
    const distance = Math.random() * 80 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      dot.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      dot.style.opacity = '0';
    });

    setTimeout(() => dot.remove(), 750);
  }
}

// Ambient Background Leaves Canvas Animation
const ambientCanvas = document.getElementById('ambientCanvas');
if (ambientCanvas) {
  const actx = ambientCanvas.getContext('2d');
  let w = (ambientCanvas.width = window.innerWidth);
  let h = (ambientCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = ambientCanvas.width = window.innerWidth;
    h = ambientCanvas.height = window.innerHeight;
  });

  const leaves = Array.from({ length: 25 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 12 + 8,
    speedY: Math.random() * 0.6 + 0.3,
    speedX: (Math.random() - 0.5) * 0.4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 0.8,
    opacity: Math.random() * 0.25 + 0.1
  }));

  function renderAmbient() {
    actx.clearRect(0, 0, w, h);
    leaves.forEach(l => {
      l.y += l.speedY;
      l.x += l.speedX;
      l.rotation += l.rotSpeed;

      if (l.y > h + 20) {
        l.y = -20;
        l.x = Math.random() * w;
      }

      actx.save();
      actx.translate(l.x, l.y);
      actx.rotate((l.rotation * Math.PI) / 180);
      actx.fillStyle = `rgba(74, 222, 128, ${l.opacity})`;
      actx.beginPath();
      actx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
      actx.fill();
      actx.restore();
    });

    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();
}
