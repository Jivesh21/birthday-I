/* =========================================================
   BIRTHDAY SURPRISE WEBSITE — SCRIPT.JS
   Modular vanilla JS. Each feature is its own init function.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initBackToTop();
  initAddToCalendar();
  initCustomCursor();
  initParticles();
  initFloatingHearts('floatingHearts', 14);
  initNavbar();
  initScrollReveal();
  initCountdown('July 22');
  initOpenSurpriseButton();
  initMusicPlayer();
  initGallery();
  initReasons();
  initQuiz();
  initLetterTypewriter();
  initSurprise();
  initHiddenSecret();
  initRipple();
});

/* ---------------- PRELOADER ---------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 400);
  });
  // Fallback in case 'load' fires slowly or assets are missing
  setTimeout(() => preloader.classList.add('loaded'), 3000);
}

/* ---------------- SCROLL PROGRESS BAR ---------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

/* ---------------- BACK TO TOP ---------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------- ADD TO CALENDAR ---------------- */
function initAddToCalendar() {
  const btn = document.getElementById('addToCalendarBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const now = new Date();
    let year = now.getFullYear();
    const target = new Date(`July 22 ${year}`);
    if (target < now) year += 1;

    const start = `${year}0722`;
    const endDate = new Date(`July 23 ${year}`);
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Happy Birthday ❤️')}&dates=${start}/${end}&details=${encodeURIComponent('A day to celebrate you!')}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* ---------------- CUSTOM CURSOR ---------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const heart = document.getElementById('cursorHeart');
  if (!dot || window.matchMedia('(max-width: 768px)').matches) return;

  let hx = 0, hy = 0;
  window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    hx = e.clientX; hy = e.clientY;
    heart.style.left = hx + 'px';
    heart.style.top = hy + 'px';
    heart.style.opacity = '0.7';
    clearTimeout(window.__cursorHeartTimeout);
    window.__cursorHeartTimeout = setTimeout(() => (heart.style.opacity = '0'), 400);
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => (dot.style.width = dot.style.height = '18px'));
    el.addEventListener('mouseleave', () => (dot.style.width = dot.style.height = '8px'));
  });
}

/* ---------------- BACKGROUND PARTICLES ---------------- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 18 : 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.width = p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = -Math.random() * 20 + 'px';
    p.style.animationDuration = 8 + Math.random() * 14 + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(p);
  }
}

/* ---------------- FLOATING HEARTS ---------------- */
function initFloatingHearts(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = ['❤', '💕', '💗', '💖'][Math.floor(Math.random() * 4)];
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = 1 + Math.random() * 1.4 + 'rem';
    h.style.animationDuration = 6 + Math.random() * 8 + 's';
    h.style.animationDelay = Math.random() * 8 + 's';
    container.appendChild(h);
  }
}

/* ---------------- NAVBAR ---------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach((link) =>
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    })
  );
}

/* ---------------- SCROLL REVEAL ---------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => observer.observe(t));
}

/* ---------------- COUNTDOWN ---------------- */
function initCountdown(targetDateStr) {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');
  const countdownLabel = document.querySelector('.countdown-label');
  const timerBox = document.getElementById('countdownTimer');

  function getNextTarget() {
    const now = new Date();
    let target = new Date(`${targetDateStr} ${now.getFullYear()}`);
    if (target < now && !isSameDay(target, now)) {
      target = new Date(`${targetDateStr} ${now.getFullYear() + 1}`);
    }
    return target;
  }
  function isSameDay(a, b) {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  }

  function tick() {
    const now = new Date();
    const target = getNextTarget();

    if (isSameDay(now, target)) {
      countdownLabel.textContent = 'Happy Birthday ❤️';
      timerBox.style.display = 'none';
      clearInterval(interval);
      return;
    }

    const diff = target - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  tick();
  const interval = setInterval(tick, 1000);
}

/* ---------------- OPEN SURPRISE BUTTON ---------------- */
function initOpenSurpriseButton() {
  const btn = document.getElementById('openSurpriseBtn');
  btn.addEventListener('click', () => {
    document.getElementById('surprise').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------------- MUSIC PLAYER ----------------
   Browsers block audio from playing automatically on page load — this is a
   hard policy in Chrome, Safari, Firefox, and Edge, not something code can
   override. The closest real-world equivalent to "autoplay" is starting the
   music on the very first interaction the visitor makes with the page
   (a click, tap, or keypress) — so in practice it plays "automatically" the
   moment they engage with the surprise, without needing to find the button.
   The Play/Pause button and volume slider stay available for manual control. */
function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggle');
  const volumeSlider = document.getElementById('volumeSlider');
  let playing = false;
  let autoStarted = false;

  audio.volume = parseFloat(volumeSlider.value);

  function startMusic() {
    if (playing) return;
    audio.play()
      .then(() => {
        playing = true;
        toggleBtn.textContent = '⏸';
      })
      .catch(() => {
        console.warn('Add a track at assets/music/song.mp3 to enable playback.');
      });
  }

  function pauseMusic() {
    audio.pause();
    playing = false;
    toggleBtn.textContent = '🎵';
  }

  // Manual toggle button always works
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't let this click re-trigger the auto-start listener below
    playing ? pauseMusic() : startMusic();
  });

  volumeSlider.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  // Auto-start on the visitor's first interaction anywhere on the page
  function autoStartOnce() {
    if (autoStarted) return;
    autoStarted = true;
    startMusic();
    document.removeEventListener('click', autoStartOnce);
    document.removeEventListener('touchstart', autoStartOnce);
    document.removeEventListener('keydown', autoStartOnce);
  }
  document.addEventListener('click', autoStartOnce, { once: true });
  document.addEventListener('touchstart', autoStartOnce, { once: true });
  document.addEventListener('keydown', autoStartOnce, { once: true });
}

/* Replace broken/missing gallery photos with a soft placeholder, built via a JS-generated
   SVG data-URI rather than an inline HTML attribute (keeps markup clean, no inline JS). */
function initGalleryImageFallback() {
  const placeholderSVG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E" +
    "%3Crect width='100%25' height='100%25' fill='%23f3d9e5'/%3E" +
    "%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='%23a06'%3EPhoto coming soon%3C/text%3E%3C/svg%3E";

  document.querySelectorAll('.masonry-item img').forEach((img) => {
    img.addEventListener('error', () => {
      img.onerror = null; // prevent any repeat loop
      img.src = placeholderSVG;
    });
  });
}

/* ---------------- GALLERY + LIGHTBOX ---------------- */
function initGallery() {
  initGalleryImageFallback();

  const items = Array.from(document.querySelectorAll('.masonry-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = items[index].querySelector('img');
    const caption = items[index].querySelector('figcaption').textContent;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
  }
  function showNext(step) {
    currentIndex = (currentIndex + step + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

/* ---------------- 100 REASONS ---------------- */
function initReasons() {
  const reasons = [
    'The way you laugh at your own jokes before finishing them.',
    'How you make even ordinary days feel like an adventure.',
    'Your kindness to people who don\'t even notice it.',
    'The way you remember tiny details about the people you love.',
    'Your courage to start over whenever you need to.',
    'How your eyes light up when you talk about things you love.',
    'The way you make me feel safe just by being there.',
    'Your terrible/amazing taste in music that I secretly love now.',
    'How you always know exactly what to say when I\'m upset.',
    'The way you dance when you think no one is watching.',
    'Your patience, even when I don\'t deserve it.',
    'How you turn small moments into core memories.',
    'The way you care for the people around you without expecting anything back.',
    'Your smile — genuinely, it changes my whole day.',
    'How honest and real you are, always.',
    'The way you support every single one of my ideas, even the wild ones.',
    'Your hugs. They fix everything.',
    'How you never stop learning and growing.',
    'The way you say my name.',
    'Simply — you. Just you, exactly as you are.'
  ];

  const btn = document.getElementById('reasonBtn');
  const textEl = document.getElementById('reasonText');
  const counterEl = document.getElementById('reasonCounter');
  let shown = new Set();
  let count = 0;

  btn.addEventListener('click', () => {
    textEl.classList.add('fade');
    setTimeout(() => {
      if (shown.size === reasons.length) shown.clear();
      let idx;
      do {
        idx = Math.floor(Math.random() * reasons.length);
      } while (shown.has(idx) && shown.size < reasons.length);
      shown.add(idx);
      textEl.textContent = reasons[idx];
      count++;
      counterEl.textContent = `${count} reason${count === 1 ? '' : 's'} revealed`;
      textEl.classList.remove('fade');
    }, 250);
  });
}

/* ---------------- QUIZ ---------------- */
function initQuiz() {
  const questions = [
    {
      q: 'Where would we go for the perfect date night?',
      options: ['A cozy dinner at home', 'A rooftop restaurant', 'A quiet walk somewhere scenic', 'All of the above, honestly'],
      correct: 3
    },
    {
      q: 'What\'s my favorite way to spend a weekend?',
      options: ['Adventuring outdoors', 'Relaxing at home together', 'Trying a new restaurant', 'A mix of everything'],
      correct: 3
    },
    {
      q: 'Pick the thing that best describes "us":',
      options: ['Comfortable silence', 'Endless laughter', 'Deep conversations', 'All three, always'],
      correct: 3
    },
    {
      q: 'What do I appreciate most about you?',
      options: ['Your humor', 'Your heart', 'Your honesty', 'Every single thing'],
      correct: 3
    },
    {
      q: 'How much do I love you?',
      options: ['A little', 'A lot', 'More than words', 'Immeasurably'],
      correct: 3
    }
  ];

  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const progressFill = document.getElementById('quizProgressFill');
  const progressText = document.getElementById('quizProgressText');
  const quizBody = document.getElementById('quizBody');
  const quizResult = document.getElementById('quizResult');
  const resultEmoji = document.getElementById('quizResultEmoji');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultText = document.getElementById('quizResultText');
  const retryBtn = document.getElementById('quizRetryBtn');

  let current = 0;
  let score = 0;

  function renderQuestion() {
    const item = questions[current];
    questionEl.textContent = item.q;
    optionsEl.innerHTML = '';
    progressFill.style.width = `${(current / questions.length) * 100}%`;
    progressText.textContent = `Question ${current + 1} of ${questions.length}`;

    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(i, btnEl) {
    const item = questions[current];
    const allBtns = optionsEl.querySelectorAll('.quiz-option');
    allBtns.forEach((b) => (b.disabled = true));

    if (i === item.correct) {
      btnEl.classList.add('correct');
      score++;
    } else {
      btnEl.classList.add('wrong');
      allBtns[item.correct].classList.add('correct');
    }

    setTimeout(() => {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }, 900);
  }

  function showResult() {
    quizBody.classList.add('hidden');
    quizResult.classList.remove('hidden');
    progressFill.style.width = '100%';
    progressText.textContent = `Question ${questions.length} of ${questions.length}`;

    const perfect = score === questions.length;
    resultEmoji.textContent = perfect ? '🎉' : score >= questions.length / 2 ? '💗' : '😅';
    resultTitle.textContent = perfect ? 'Perfect Score!' : `You scored ${score}/${questions.length}`;
    resultText.textContent = perfect
      ? 'Of course you got it perfect — you know us better than anyone.'
      : 'Doesn\'t matter what the score says — the real answer is always love.';

    if (perfect) launchConfettiBurst();
  }

  retryBtn.addEventListener('click', () => {
    current = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizBody.classList.remove('hidden');
    renderQuestion();
  });

  renderQuestion();
}

/* Small confetti burst reused for quiz perfect score */
function launchConfettiBurst() {
  const colors = ['#ff6fa5', '#8e6fff', '#f6c667', '#ffffff'];
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = '50%';
    conf.style.top = '40%';
    conf.style.width = '8px';
    conf.style.height = '8px';
    conf.style.background = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = '2px';
    conf.style.zIndex = '3500';
    conf.style.pointerEvents = 'none';
    document.body.appendChild(conf);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 100;

    conf.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      { duration: 1400 + Math.random() * 600, easing: 'cubic-bezier(.22,1,.36,1)' }
    ).onfinish = () => conf.remove();
  }
}

/* ---------------- LETTER TYPEWRITER ---------------- */
function initLetterTypewriter() {
  const paragraphs = document.querySelectorAll('.letter-line, .letter-signature');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSequentially();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  const letterSection = document.getElementById('letter');
  if (letterSection) observer.observe(letterSection);

  function revealSequentially() {
    paragraphs.forEach((p, i) => {
      setTimeout(() => p.classList.add('visible'), i * 700);
    });
  }
}

/* ---------------- SURPRISE SECTION ---------------- */
function initSurprise() {
  initBalloons();
  initFireworks();
  initSurpriseHearts();
  initLoveButton();
  triggerSurpriseOnView();
}

function initBalloons() {
  const container = document.getElementById('balloons');
  const colors = ['#ff6fa5', '#8e6fff', '#f6c667', '#ff9ec4'];
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = Math.random() * 90 + '%';
    b.style.background = `linear-gradient(160deg, ${colors[i % colors.length]}, rgba(255,255,255,.3))`;
    b.style.animationDuration = 10 + Math.random() * 8 + 's';
    b.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(b);
  }
}

function initSurpriseHearts() {
  initFloatingHearts('surpriseHearts', 16);
}

function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let running = false;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5 + 30;
    const color = `hsl(${Math.random() * 360}, 90%, 65%)`;
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 2 + Math.random() * 2.5;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1, color
      });
    }
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.alpha -= 0.015;
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    particles = particles.filter((p) => p.alpha > 0);
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  let fireworkInterval;
  window.__startFireworks = () => {
    if (running) return;
    running = true;
    animate();
    fireworkInterval = setInterval(spawnFirework, 900);
    spawnFirework();
  };
  window.__stopFireworks = () => {
    running = false;
    clearInterval(fireworkInterval);
  };
}

function triggerSurpriseOnView() {
  const surprise = document.getElementById('surprise');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.__startFireworks && window.__startFireworks();
        } else {
          window.__stopFireworks && window.__stopFireworks();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(surprise);
}

function initLoveButton() {
  const btn = document.getElementById('loveBtn');
  btn.addEventListener('click', (e) => {
    heartExplosion(e.clientX, e.clientY);
    launchConfettiBurst();
  });
}

function heartExplosion(x, y) {
  const hearts = ['❤️', '💖', '💗', '💕', '💘'];
  for (let i = 0; i < 24; i++) {
    const h = document.createElement('div');
    h.className = 'heart-particle';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 220;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    h.animate(
      [
        { transform: 'translate(-50%,-50%) scale(0.5)', opacity: 1 },
        { transform: `translate(${dx - 50}%, ${dy - 50}%) scale(1.2)`, opacity: 0 }
      ],
      { duration: 1000 + Math.random() * 700, easing: 'cubic-bezier(.22,1,.36,1)' }
    ).onfinish = () => h.remove();
  }
}

/* ---------------- HIDDEN SECRET (type "LOVE") ---------------- */
function initHiddenSecret() {
  const overlay = document.getElementById('secretOverlay');
  const closeBtn = document.getElementById('secretClose');
  const targetWord = 'LOVE';
  let typed = '';

  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    typed += e.key.toUpperCase();
    if (typed.length > targetWord.length) typed = typed.slice(-targetWord.length);
    if (typed === targetWord) {
      overlay.classList.add('open');
      typed = '';
    }
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}

/* ---------------- RIPPLE BUTTON EFFECT ---------------- */
function initRipple() {
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.remove('rippling');
      // Force reflow to restart animation
      void btn.offsetWidth;
      btn.classList.add('rippling');
    });
  });
}