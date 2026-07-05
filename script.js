/* =========================================================
   BIRTHDAY SURPRISE WEBSITE — SCRIPT.JS
   Modular vanilla JS. Each feature is its own init function.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initEpisodeIntro();
  initScrollProgress();
  initBackToTop();
  initAddToCalendar();
  initCustomCursor();
  initParticles();
  initFloatingHearts('floatingHearts', 14);
  initNavbar();
  initScrollReveal();
  initCountdown('July 22');
  initDailyNotes('July 22');
  initLetterLock('July 22');
  initBdayExperience('July 22');
  initOpenSurpriseButton();
  initMusicPlayer();
  initGallery();
  initReasons();
  initQuiz();
  initLetterTypewriter();
  initSurprise();
  initHiddenSecret();
  initRipple();
  initFireflies();
  initLoveMeter();
  initScratchCard();
  initOpenWhen();
  initVoiceMessages();
  initTimeCapsule();
  initRingReveal();
  initDevMode();
  initFloatingWishes();
  initEndingChoiceAndCredits();
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

/* ---------------- K-DRAMA STYLE EPISODE INTRO ---------------- */
function initEpisodeIntro() {
  const intro = document.getElementById('episodeIntro');
  const skipBtn = document.getElementById('episodeSkipBtn');
  const particlesContainer = document.getElementById('episodeParticles');
  if (!intro) return;

  let dismissed = false;
  let autoDismissTimer = null;

  // Drifting light particles, same idea as the hero's floating hearts,
  // but plain glowing dots to fit the cinematic mood here.
  if (particlesContainer) {
    const count = window.innerWidth < 768 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'episode-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 6 + Math.random() * 6 + 's';
      p.style.animationDelay = Math.random() * 5 + 's';
      particlesContainer.appendChild(p);
    }
  }

  function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  function unlockScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function showIntro() {
    intro.classList.add('show');
    lockScroll(); // hold the moment — no scrolling during the intro
    // A soft rising piano-style sting, timed to land right as the title
    // scales into view — synthesized, no audio file needed.
    setTimeout(playEpisodeSting, 1300);

    // Auto-dismiss timer starts NOW, from the moment it's actually visible
    // — not from page load — so it always gets a full ~4.3s on screen even
    // if the preloader took a while to clear first (slow connection, large
    // images, the Three.js CDN script, etc.).
    autoDismissTimer = setTimeout(dismissIntro, 4300);
  }

  function dismissIntro() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(autoDismissTimer);
    intro.classList.add('hide');
    intro.classList.remove('show');
    unlockScroll();
    setTimeout(() => intro.remove(), 1100); // clean up after the fade-out finishes
  }

  // Bring the intro in right after the preloader clears, so it feels like
  // the natural next beat rather than competing with it.
  setTimeout(showIntro, 900);

  // Hard safety net: no matter what happens above (a slow connection, an
  // unexpected error, a browser quirk), scrolling is guaranteed to be
  // unlocked and the intro cleared within 10 seconds of page load — so
  // this can never leave the page permanently stuck.
  setTimeout(() => {
    if (!dismissed) dismissIntro();
  }, 10000);

  skipBtn.addEventListener('click', dismissIntro);
  intro.addEventListener('click', (e) => {
    if (e.target === intro) dismissIntro();
  });
}

/* A gentle rising piano-style chord, like a soft OST sting under a title card. */
function playEpisodeSting() {
  playTone(392, 1.4, 'sine', 0.09);           // G4
  setTimeout(() => playTone(494, 1.3, 'sine', 0.08), 180);  // B4
  setTimeout(() => playTone(587, 1.6, 'sine', 0.09), 380);  // D5
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

/* Shared helper: returns whole days remaining until the next occurrence of
   a "Month Day" string (e.g. "July 22"), and whether today IS that day. */
function getDaysUntil(targetDateStr) {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(`${targetDateStr} ${now.getFullYear()}`);
  target = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const isToday = target.getTime() === todayMidnight.getTime();
  if (target < todayMidnight && !isToday) {
    target = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
  }
  const diffDays = Math.round((target - todayMidnight) / (1000 * 60 * 60 * 24));
  return { daysLeft: diffDays, isToday };
}

/* ---------------- DAILY LOVE NOTE ---------------- */
function initDailyNotes(targetDateStr) {
  const grid = document.getElementById('dailyNotesGrid');
  if (!grid) return;

  // Add or edit these freely — one unlocks per real calendar day, counting
  // down to the big day. Sized to 18 so it matches the days remaining —
  // if you deploy this earlier/later, adjust the count to match daysLeft
  // at the time you deploy, so the last card lands exactly on July 22.
 const notes = [
  "Day 18 💌: Hi Ishu ❤️. Today I just wanted to remind you that no matter how busy life gets, you're always one of my favorite thoughts. Every day brings us one step closer to celebrating you.",

  "Day 17 🌸: I hope today made you smile at least once. And if it didn't, here's a little reminder that someone is always cheering for you from the bottom of his heart.",

  "Day 16 ☀️: Sometimes I catch myself smiling for absolutely no reason... and then I realize I was thinking about you again. That's become my favorite habit.",

  "Day 15 💕: I don't think you realize how much happiness you've quietly brought into my life. Thank you for simply being you.",

  "Day 14 🌷: If I could, I'd pause every beautiful moment we spend together so I could relive it again and again. Every memory with you is special to me.",

  "Day 13 ✨: Your birthday is getting closer, and honestly... I'm probably more excited than you are. I can't wait to see your smile.",

  "Day 12 🌹: You deserve every bit of happiness, every dream coming true, and every reason to smile. I hope this year gives you all of that and even more.",

  "Day 11 💖: Some people come into our lives and change everything without even trying. Thank you for being that person in mine.",

  "Day 10 🎀: Double digits left! Soon it'll be your special day, but honestly, every day feels a little brighter because you're in my life.",

  "Day 9 🌙: No matter how ordinary today feels, remember you're someone incredibly special to me. Never forget that.",

  "Day 8 💞: Just one week and one day left. I'm counting every sunrise because each one brings me closer to celebrating the most beautiful person I know.",

  "Day 7 🎉: One week to go! I hope your heart is as excited as mine because your birthday deserves to be as wonderful as you are.",

  "Day 6 🤍: Thank you for every conversation, every laugh, every little moment you've shared with me. They mean more than you probably know.",

  "Day 5 🌼: I hope today reminded you how amazing you are. And if it didn't, let me do it instead—you truly are one of the best things that has ever happened to me.",

  "Day 4 💝: We're almost there! I can't wait to celebrate the day the world received someone as kind, beautiful, and lovable as you.",

  "Day 3 🥰: Only three days left! I hope these little notes have made you smile because making you happy has always been one of my favorite things.",

  "Day 2 🌺: Tomorrow's almost here. I hope you're ready for a day filled with love, smiles, surprises, and reminders of how deeply you're appreciated.",

  "Day 1 🎂: Tomorrow is finally your day. Sleep well tonight, my love. Tomorrow we'll celebrate not just your birthday, but the beautiful person who makes my world brighter every single day. Happy Birthday in advance, Ishu ❤️."
];

  const { daysLeft } = getDaysUntil(targetDateStr);
  // How many notes should be unlocked right now. Notes unlock one by one,
  // in order, as daysLeft counts down toward 0 — so on the day you deploy
  // (with 18 days left), exactly 1 note is unlocked; each day after that,
  // one more opens, until all 18 are open on July 22 itself.
  const unlockedCount = Math.max(0, notes.length - Math.max(daysLeft, 0));

  grid.innerHTML = '';
  notes.forEach((note, i) => {
    const isUnlocked = i < unlockedCount;
    const isUnlockedToday = i === unlockedCount - 1 && isUnlocked;

    const card = document.createElement('div');
    card.className = 'daily-note-card' + (isUnlocked ? '' : ' locked') + (isUnlockedToday ? ' unlocked-today' : '');

    const dayLabel = document.createElement('p');
    dayLabel.className = 'day-label';
    dayLabel.textContent = `Note ${i + 1} of ${notes.length}`;
    card.appendChild(dayLabel);

    if (!isUnlocked) {
      const lockBadge = document.createElement('span');
      lockBadge.className = 'lock-badge';
      lockBadge.textContent = '🔒';
      card.appendChild(lockBadge);

      // Per-card countdown: exactly how many more days until THIS specific
      // card unlocks (1 = tomorrow, 2 = the day after, etc.) — not just a
      // generic "locked" state.
      const daysUntilThisCard = i - unlockedCount + 1;
      const countdown = document.createElement('p');
      countdown.className = 'lock-countdown';
      countdown.textContent = daysUntilThisCard === 1
        ? 'Unlocks tomorrow'
        : `Unlocks in ${daysUntilThisCard} days`;
      card.appendChild(countdown);
    }

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note; // real text kept in DOM; CSS blurs + shows a teaser overlay for locked cards
    card.appendChild(text);

    grid.appendChild(card);
  });
}

/* ---------------- LETTER LOCK (unlocks on the birthday) ---------------- */
function initLetterLock(targetDateStr) {
  const paper = document.getElementById('letterPaper');
  const overlay = document.getElementById('letterLockOverlay');
  const countdownText = document.getElementById('letterLockCountdown');
  if (!paper || !overlay) return;

  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';
  const { daysLeft, isToday } = getDaysUntil(targetDateStr);
  const unlocked = isToday || isPreview;

  if (unlocked) {
    paper.classList.remove('is-locked');
    overlay.classList.remove('show');
  } else {
    paper.classList.add('is-locked');
    overlay.classList.add('show');
    countdownText.textContent = daysLeft === 1
      ? 'Unlocks in 1 day ❤️'
      : `Unlocks in ${daysLeft} days ❤️`;
  }
}

/* =========================================================
   BIRTHDAY EXPERIENCE — full multi-stage sequence, visible
   only on July 22. Everything below is skipped/hidden on
   any other day.
   ========================================================= */
function initBdayExperience(targetDateStr) {
  const teaser = document.getElementById('bdayTeaser');
  const stagesWrap = document.getElementById('bdayStages');
  if (!teaser || !stagesWrap) return;

  // Preview mode: visiting the page with ?preview=true unlocks the full
  // experience regardless of date, for testing. The real link you share
  // (without ?preview=true) still respects the actual July 22 lock.
  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  const { daysLeft, isToday } = getDaysUntil(targetDateStr);
  const unlocked = isToday || isPreview;

  if (!unlocked) {
    teaser.classList.remove('hidden');
    stagesWrap.classList.add('hidden');
    const countdownEl = document.getElementById('bdayTeaserCountdown');
    countdownEl.textContent = daysLeft === 1
      ? 'Come back tomorrow — July 22nd. ❤️'
      : `Come back in ${daysLeft} days — July 22nd. ❤️`;
    return;
  }

  // Unlocked (either it's the real day, or preview mode) — reveal the full experience.
  teaser.classList.add('hidden');
  stagesWrap.classList.remove('hidden');

  if (isPreview && !isToday) {
    const banner = document.createElement('div');
    banner.className = 'preview-banner';
    banner.textContent = '👀 Preview mode — this is only visible to you because of ?preview=true in the URL';
    stagesWrap.prepend(banner);
  }

  function goToStage(stageId) {
    document.querySelectorAll('.stage').forEach((s) => s.classList.remove('active'));
    const next = document.getElementById(stageId);
    if (next) next.classList.add('active');
    duckMusicForTransition();
    if (stageId === 'stage-sky-finale') sfxChime();
  }

  setupCandleStage(() => goToStage('stage-gift'));
  setupGiftStage(() => goToStage('stage-pop-balloons'));
  setupBalloonPopStage(() => goToStage('stage-heart-game'));
  setupHeartGameStage(() => goToStage('stage-letter-reveal'));
  setupLetterRevealStage(() => goToStage('stage-sky-finale'));
  setupSkyFinaleStage();
}

/* Gently dips music volume down and back up on every stage change,
   giving a sense of "transition" without needing separate audio files.
   Uses a fixed base volume (captured once) and cancels any fade already
   in progress, so rapid stage changes can't compound and fade the volume
   down to nothing. */
let __bgMusicBaseVolume = null;
let __bgMusicFadeOut = null;
let __bgMusicFadeIn = null;

function duckMusicForTransition() {
  const audio = document.getElementById('bgMusic');
  if (!audio || audio.paused) return;

  // Cancel any fade already running so effects can't stack.
  clearInterval(__bgMusicFadeOut);
  clearInterval(__bgMusicFadeIn);

  // Capture the "real" volume only once, the first time this runs, so
  // later calls always fade relative to the true normal level.
  if (__bgMusicBaseVolume === null) {
    __bgMusicBaseVolume = audio.volume;
  }
  const base = __bgMusicBaseVolume;
  const duck = (v) => (audio.volume = Math.max(0, Math.min(1, v)));

  let steps = 0;
  __bgMusicFadeOut = setInterval(() => {
    steps++;
    duck(base - (base * steps) / 6);
    if (steps >= 6) {
      clearInterval(__bgMusicFadeOut);
      let stepsBack = 0;
      __bgMusicFadeIn = setInterval(() => {
        stepsBack++;
        duck((base * stepsBack) / 6);
        if (stepsBack >= 6) {
          clearInterval(__bgMusicFadeIn);
          duck(base); // snap exactly back to true base volume, no drift
        }
      }, 90);
    }
  }, 90);
}

/* Also keep the base volume in sync if the visitor manually adjusts the
   slider, so future stage transitions duck relative to their new choice. */
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('volumeSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      __bgMusicBaseVolume = parseFloat(e.target.value);
    });
  }
});

/* =========================================================
   TINY SOUND EFFECTS ENGINE
   Synthesized entirely with the Web Audio API — no sound files
   to add, host, or forget. Each call makes a short, soft tone.
   ========================================================= */
let __sfxCtx = null;
function getSfxContext() {
  if (!__sfxCtx) __sfxCtx = new (window.AudioContext || window.webkitAudioContext)();
  return __sfxCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.15) {
  try {
    const ctx = getSfxContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (e) { /* audio not available — fail silently, effects are decorative */ }
}

function sfxPop() {
  playTone(700, 0.12, 'triangle', 0.18);
  setTimeout(() => playTone(400, 0.1, 'triangle', 0.12), 40);
}
function sfxDing() {
  playTone(880, 0.25, 'sine', 0.15);
  setTimeout(() => playTone(1320, 0.3, 'sine', 0.12), 120);
}
function sfxWhoosh() {
  playTone(200, 0.3, 'sawtooth', 0.08);
}
function sfxChime() {
  [523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.4, 'sine', 0.12), i * 140));
}

/* ---- Stage 1: Blow out the candle (microphone volume detection) ---- */
function setupCandleStage(onComplete) {
  const candle = document.getElementById('stageCandle');
  const flame = document.getElementById('stageFlame');
  const meterFill = document.getElementById('micMeterFill');
  const statusText = document.getElementById('micStatus');
  const manualBtn = document.getElementById('manualBlowBtn');
  let done = false;

  function blowOutCandle() {
    if (done) return;
    done = true;
    candle.classList.add('blown-out');
    sfxWhoosh();
    statusText.textContent = 'Nice blow! 🎉';
    setTimeout(onComplete, 1200);
  }

  manualBtn.addEventListener('click', blowOutCandle);

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusText.textContent = 'Microphone not supported here — use the button below.';
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      statusText.textContent = 'Blow into your mic now… 🎤';
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      let sustainedFrames = 0;
      const BLOW_THRESHOLD = 55; // tweak if too sensitive/insensitive
      const FRAMES_NEEDED = 5;

      function checkVolume() {
        if (done) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        meterFill.style.width = Math.min(100, (avg / 80) * 100) + '%';

        if (avg > BLOW_THRESHOLD) {
          sustainedFrames++;
          if (sustainedFrames >= FRAMES_NEEDED) {
            stream.getTracks().forEach((t) => t.stop());
            blowOutCandle();
            return;
          }
        } else {
          sustainedFrames = 0;
        }
        requestAnimationFrame(checkVolume);
      }
      checkVolume();
    })
    .catch(() => {
      statusText.textContent = 'Microphone access denied — no problem, tap the button below instead.';
    });
}

/* ---- Stage 2: Gift box opens on click ---- */
function setupGiftStage(onComplete) {
  const box = document.getElementById('giftBox');
  const message = document.getElementById('giftMessage');
  const continueBtn = document.getElementById('giftContinueBtn');
  let opened = false;

  box.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    box.classList.add('opened');
    sfxDing();
    message.classList.remove('hidden');
    continueBtn.classList.remove('hidden');
  });

  continueBtn.addEventListener('click', onComplete);
}

/* ---- Stage 3: Pop every balloon ---- */
function setupBalloonPopStage(onComplete) {
  const field = document.getElementById('popBalloonsField');
  const continueBtn = document.getElementById('balloonsContinueBtn');
  const subtitle = document.getElementById('popBalloonsSubtitle');
  const colors = ['#ff6fa5', '#8e6fff', '#f6c667', '#ff9ec4', '#7fd8ff'];
  const total = 8;
  let popped = 0;

  field.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const b = document.createElement('div');
    b.className = 'pop-balloon';
    b.style.left = Math.random() * 85 + '%';
    b.style.top = Math.random() * 70 + '%';
    b.style.background = `radial-gradient(circle at 30% 30%, #fff8, ${colors[i % colors.length]})`;
    b.addEventListener('click', () => {
      if (b.classList.contains('popped')) return;
      b.classList.add('popped');
      sfxPop();
      popped++;
      subtitle.textContent = `${popped} of ${total} popped 🎈`;
      if (popped >= total) continueBtn.classList.remove('hidden');
    });
    field.appendChild(b);
  }

  continueBtn.addEventListener('click', onComplete);
}

/* ---- Stage 4: Heart-catching mini game ---- */
function setupHeartGameStage(onComplete) {
  const canvas = document.getElementById('heartGameCanvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('heartGameStartBtn');
  const continueBtn = document.getElementById('heartGameContinueBtn');
  const scoreEl = document.getElementById('heartGameScore');
  const timerEl = document.getElementById('heartGameTimer');

  let basketX = 0;
  let hearts = [];
  let score = 0;
  let timeLeft = 20;
  let running = false;
  let gameInterval, spawnInterval;

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    basketX = canvas.width / 2;
  }
  window.addEventListener('resize', resize);

  function pointerMove(clientX) {
    const rect = canvas.getBoundingClientRect();
    basketX = Math.max(20, Math.min(canvas.width - 20, clientX - rect.left));
  }
  canvas.addEventListener('mousemove', (e) => pointerMove(e.clientX));
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches[0]) pointerMove(e.touches[0].clientX);
  }, { passive: true });

  function spawnHeart() {
    hearts.push({ x: Math.random() * (canvas.width - 20) + 10, y: -10, speed: 1.5 + Math.random() * 2 });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // basket
    ctx.font = '32px sans-serif';
    ctx.fillText('🧺', basketX - 16, canvas.height - 10);
    // hearts
    ctx.font = '22px sans-serif';
    hearts.forEach((h) => ctx.fillText('❤️', h.x - 11, h.y));
  }

  function tick() {
    hearts.forEach((h) => (h.y += h.speed));
    hearts = hearts.filter((h) => {
      const caught = h.y > canvas.height - 40 && h.y < canvas.height && Math.abs(h.x - basketX) < 28;
      if (caught) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
        return false;
      }
      return h.y < canvas.height + 20;
    });
    draw();
    if (running) requestAnimationFrame(tick);
  }

  function startGame() {
    resize();
    score = 0; timeLeft = 20; hearts = [];
    scoreEl.textContent = 'Score: 0';
    timerEl.textContent = 'Time: 20s';
    startBtn.classList.add('hidden');
    continueBtn.classList.add('hidden');
    running = true;
    tick();
    spawnInterval = setInterval(spawnHeart, 550);
    gameInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    running = false;
    clearInterval(spawnInterval);
    clearInterval(gameInterval);
    timerEl.textContent = 'Time: 0s';
    continueBtn.classList.remove('hidden');
  }

  startBtn.addEventListener('click', startGame);
  continueBtn.addEventListener('click', onComplete);
}

/* ---- Stage 5: Reveal the letter ---- */
function setupLetterRevealStage(onComplete) {
  const goToLetterBtn = document.getElementById('goToLetterBtn');
  const continueBtn = document.getElementById('letterContinueBtn');

  goToLetterBtn.addEventListener('click', () => {
    const letterSection = document.getElementById('letter');
    if (letterSection) letterSection.scrollIntoView({ behavior: 'smooth' });
  });

  continueBtn.addEventListener('click', onComplete);
}

/* ---- Stage 6: Night sky finale with glowing text among stars ---- */
function setupSkyFinaleStage() {
  const replayBtn = document.getElementById('skyReplayBtn');
  replayBtn.addEventListener('click', () => {
    // Simplest reliable "watch it again": reload the page (keeping the
    // current URL, including ?preview=true if present) so every stage
    // resets to its true starting state.
    window.location.reload();
  });

  // Prefer the 3D parallax starfield if Three.js loaded successfully.
  // If the CDN failed (no internet, blocked script, etc.), fall back to
  // the original flat 2D canvas version so the finale never breaks.
  if (window.THREE) {
    setupSkyFinale3D();
  } else {
    setupSkyFinale2DFallback();
  }
}

/* ---- 3D parallax starfield (Three.js) ---- */
function setupSkyFinale3D() {
  const canvas = document.getElementById('skyCanvas');
  const scene3d = document.getElementById('skyScene');

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0620, 0.035);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Soft circular sprite so each star glows instead of showing as a hard square pixel.
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64; spriteCanvas.height = 64;
  const sctx = spriteCanvas.getContext('2d');
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 64, 64);
  const starTexture = new THREE.CanvasTexture(spriteCanvas);

  // Builds one star layer with mixed colors from the site's palette
  // (white / gold / pink / soft purple) for a richer look than plain white.
  function buildStarLayer(count, spread, depthOffset, sizeRange) {
    const palette = [
      [1, 1, 1],          // white
      [0.96, 0.78, 0.4],  // gold
      [1, 0.44, 0.65],    // pink
      [0.56, 0.44, 1]     // purple
    ];
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 + depthOffset;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
      sizes[i] = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // Note: base PointsMaterial uses one fixed size for the whole layer;
    // per-star size variation isn't used here to keep this stable across
    // older WebGL implementations, but varying layer sizes below still
    // gives a good sense of depth.
    const material = new THREE.PointsMaterial({
      size: sizeRange[1],
      map: starTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.95,
      sizeAttenuation: true
    });
    return new THREE.Points(geometry, material);
  }

  const farField = buildStarLayer(1400, 45, -6, [0.09, 0.09]);
  const midField = buildStarLayer(500, 30, 0, [0.14, 0.14]);
  const nearField = buildStarLayer(180, 18, 6, [0.22, 0.22]);
  scene.add(farField, midField, nearField);

  // A few brighter "shooting" stars that occasionally streak across.
  const shootingStars = [];
  function spawnShootingStar() {
    const geo = new THREE.BufferGeometry();
    const start = new THREE.Vector3((Math.random() - 0.5) * 20, 8 + Math.random() * 4, (Math.random() - 0.5) * 10);
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([start.x, start.y, start.z]), 3));
    const mat = new THREE.PointsMaterial({ size: 0.3, map: starTexture, color: 0xffffff, transparent: true, depthWrite: false });
    const point = new THREE.Points(geo, mat);
    scene.add(point);
    shootingStars.push({ point, vx: -0.05 - Math.random() * 0.05, vy: -0.09 - Math.random() * 0.05, life: 1 });
  }
  setInterval(() => { if (Math.random() < 0.6) spawnShootingStar(); }, 2200);

  let mouseX = 0, mouseY = 0;
  let targetRotY = 0, targetRotX = 0;

  function onPointerMove(clientX, clientY) {
    const rect = scene3d.getBoundingClientRect();
    mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = ((clientY - rect.top) / rect.height) * 2 - 1;
    targetRotY = mouseX * 0.3;
    targetRotX = mouseY * 0.18;
  }
  scene3d.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
  scene3d.addEventListener('touchmove', (e) => {
    if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function resize() {
    const w = scene3d.clientWidth;
    const h = scene3d.clientHeight;
    if (w === 0 || h === 0) return; // still hidden — nothing to size yet
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // The key fix: this stage starts hidden (display:none) until the visitor
  // reaches it, so at setup time the container has zero width/height and a
  // one-time resize() call would size the renderer to nothing. A
  // ResizeObserver instead fires automatically the moment the container's
  // real size becomes available (i.e. when the stage's "active" class is
  // added and it becomes visible), so the scene sizes correctly whenever
  // that actually happens — not just once at page load.
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(scene3d);
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    const t = performance.now() * 0.001;

    // Smooth parallax toward the pointer, each layer moving a different
    // amount so the layers feel like they're at different distances,
    // plus a slow constant drift so it's never fully static.
    farField.rotation.y += (targetRotY * 0.6 - farField.rotation.y) * 0.02 + 0.0003;
    farField.rotation.x += (targetRotX * 0.6 - farField.rotation.x) * 0.02;
    midField.rotation.y += (targetRotY - midField.rotation.y) * 0.03 + 0.0006;
    midField.rotation.x += (targetRotX - midField.rotation.x) * 0.03;
    nearField.rotation.y += (targetRotY * 1.7 - nearField.rotation.y) * 0.045 + 0.001;
    nearField.rotation.x += (targetRotX * 1.7 - nearField.rotation.x) * 0.045;

    // Gentle overall twinkle by pulsing opacity slightly over time.
    const pulse = 0.85 + 0.15 * Math.sin(t * 0.8);
    midField.material.opacity = pulse;

    // Animate any active shooting stars, removing them once they fade out.
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const pos = s.point.geometry.attributes.position;
      pos.array[0] += s.vx;
      pos.array[1] += s.vy;
      pos.needsUpdate = true;
      s.life -= 0.012;
      s.point.material.opacity = Math.max(0, s.life);
      if (s.life <= 0) {
        scene.remove(s.point);
        shootingStars.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

/* ---- 2D canvas fallback (used automatically if Three.js fails to load) ---- */
function setupSkyFinale2DFallback() {
  const canvas = document.getElementById('skyCanvas');
  const ctx = canvas.getContext('2d');
  const scene = document.getElementById('skyScene');
  let stars = [];

  function resize() {
    canvas.width = scene.clientWidth;
    canvas.height = scene.clientHeight;
    stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
      phase: Math.random() * Math.PI * 2
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = performance.now() * 0.001;
    stars.forEach((s) => {
      const alpha = 0.4 + 0.6 * Math.abs(Math.sin(t * s.twinkleSpeed * 10 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
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
  const seekBar = document.getElementById('mpSeekBar');
  const currentTimeEl = document.getElementById('mpCurrentTime');
  const durationEl = document.getElementById('mpDuration');
  const favoriteBtn = document.getElementById('mpFavoriteBtn');
  let playing = false;
  let autoStarted = false;
  let favorited = false;

  audio.volume = parseFloat(volumeSlider.value);

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

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
    toggleBtn.textContent = '▶';
  }

  // Manual toggle button always works
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't let this click re-trigger the auto-start listener below
    playing ? pauseMusic() : startMusic();
  });

  volumeSlider.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      favorited = !favorited;
      favoriteBtn.textContent = favorited ? '❤️' : '🤍';
    });
  }

  if (seekBar) {
    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
      }
    });
    seekBar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
      }
    });
  }

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

  document.querySelectorAll('.masonry-item').forEach((figure) => {
    const img = figure.querySelector('img');
    if (!img) return;

    // Show a soft shimmering skeleton until the real photo has actually
    // finished loading, instead of a blank gap or a jarring pop-in.
    figure.classList.add('is-loading');

    function clearSkeleton() {
      figure.classList.remove('is-loading');
    }

    if (img.complete && img.naturalWidth > 0) {
      clearSkeleton(); // already loaded (e.g. from cache) before listeners attached
    } else {
      img.addEventListener('load', clearSkeleton);
    }

    img.addEventListener('error', () => {
      img.onerror = null; // prevent any repeat loop
      img.src = placeholderSVG;
      clearSkeleton();
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
    openRingReveal();
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

/* ---------------- FIREFLIES ---------------- */
function initFireflies() {
  const container = document.getElementById('fireflies');
  if (!container) return;
  const count = window.innerWidth < 768 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = Math.random() * 100 + '%';
    f.style.top = Math.random() * 100 + '%';
    f.style.animationDuration = `${10 + Math.random() * 8}s, ${2 + Math.random() * 2}s`;
    f.style.animationDelay = `${Math.random() * 6}s, ${Math.random() * 3}s`;
    container.appendChild(f);
  }
}

/* ---------------- LOVE METER ---------------- */
function initLoveMeter() {
  const btn = document.getElementById('loveMeterBtn');
  const percentEl = document.getElementById('loveMeterPercent');
  const fillEl = document.getElementById('loveMeterFill');
  if (!btn) return;

  // A deliberately silly, non-linear countup: fast at first, stalls at an
  // "ERROR" moment, then resolves to infinity — just for fun.
  const steps = [10, 45, 82, 99, 'ERROR', '∞'];
  let running = false;

  btn.addEventListener('click', () => {
    if (running) return;
    running = true;
    btn.disabled = true;
    let i = 0;

    function nextStep() {
      const val = steps[i];
      if (val === 'ERROR') {
        percentEl.textContent = 'ERROR ⚠️';
        fillEl.style.width = '100%';
      } else if (val === '∞') {
        percentEl.textContent = 'Infinity ❤️';
        fillEl.style.width = '100%';
      } else {
        percentEl.textContent = val + '%';
        fillEl.style.width = val + '%';
      }
      i++;
      if (i < steps.length) {
        setTimeout(nextStep, val === 'ERROR' ? 900 : 550);
      } else {
        btn.disabled = false;
        running = false;
      }
    }
    nextStep();
  });
}

/* ---------------- SCRATCH CARD ---------------- */
function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.closest('.scratch-card-wrap');

  function resize() {
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    // The scratchable foil layer — a soft metallic-looking gradient.
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#c9c9d6');
    grad.addColorStop(0.5, '#e8e8f0');
    grad.addColorStop(1, '#c9c9d6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '600 16px sans-serif';
    ctx.fillStyle = '#6b5c80';
    ctx.textAlign = 'center';
    ctx.fillText('🎁 Scratch Here 🎁', canvas.width / 2, canvas.height / 2);
  }
  resize();
  window.addEventListener('resize', resize);

  let scratching = false;

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  canvas.addEventListener('mousedown', (e) => { scratching = true; const p = getPos(e); scratchAt(p.x, p.y); });
  canvas.addEventListener('mousemove', (e) => { if (scratching) { const p = getPos(e); scratchAt(p.x, p.y); } });
  window.addEventListener('mouseup', () => (scratching = false));

  canvas.addEventListener('touchstart', (e) => { scratching = true; const p = getPos(e); scratchAt(p.x, p.y); }, { passive: true });
  canvas.addEventListener('touchmove', (e) => { if (scratching) { const p = getPos(e); scratchAt(p.x, p.y); } }, { passive: true });
  canvas.addEventListener('touchend', () => (scratching = false));
}

/* ---------------- OPEN WHEN... ---------------- */
function initOpenWhen() {
  const grid = document.getElementById('openWhenGrid');
  if (!grid) return;

  // Placeholder messages — replace these with real ones whenever you're ready.
const cards = [
  {
    label: "Open when you're sad 💙",
    icon: "🥺",
    message:
      "Hey my love... 💌 I know today might feel heavy, but please remember this—bad days don't last forever. You're stronger than you think, and I'll always be here to listen, hug you (even virtually 🤗), and remind you how amazing you are. Smile a little for me, okay? ❤️"
  },

  {
    label: "Open when you're stressed 😣",
    icon: "🌸",
    message:
      "Take a deep breath, Ishu. 🌷 You don't have to carry the whole world on your shoulders. One step at a time, one problem at a time. Drink some water 💧, stretch a little 🧘‍♀️, and remember... you've already overcome so much. I believe in you more than you know. 💖"
  },

  {
    label: "Open when you miss me 🥹",
    icon: "💞",
    message:
      "Awww... missing me? 🥺❤️ Then close your eyes for a second and imagine I'm holding your hand. 🤝 If I could, I'd teleport to you right now just to see your smile. Until then, keep this little message as a warm hug from me. 🤍 I miss you too... probably even more. 💕"
  },

  {
    label: "Open when you can't sleep 🌙",
    icon: "✨",
    message:
      "Good night, my sleepyhead. 🌙💤 Stop thinking about everything for a while. Wrap yourself in your blanket, take slow breaths, and let your worries rest too. Imagine we're lying under a sky full of stars together. ⭐ Sweet dreams, my beautiful girl. I'll meet you there. ❤️"
  },

  {
    label: "Open when you need motivation 🚀",
    icon: "💪",
    message:
      "Listen to me carefully... 🌸 You are capable, talented, kind, and stronger than you realize. Don't let one difficult day make you doubt yourself. Keep moving forward, even if it's just one tiny step today. I'll always be your biggest supporter. Go make yourself proud—I already am. ❤️✨"
  }
];

  const modal = document.createElement('div');
  modal.className = 'open-when-modal';
  modal.innerHTML = `<div class="open-when-modal-box glass-card"><button class="secret-close" aria-label="Close">&times;</button><p class="secret-emoji">💌</p><p id="openWhenModalText"></p></div>`;
  document.body.appendChild(modal);
  const modalText = modal.querySelector('#openWhenModalText');
  const modalClose = modal.querySelector('.secret-close');

  cards.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'open-when-card';
    card.innerHTML = `<span class="envelope-icon">${c.icon}</span><p class="open-when-label">${c.label}</p>`;
    card.addEventListener('click', () => {
      modalText.textContent = c.message;
      modal.classList.add('show');
    });
    grid.appendChild(card);
  });

  modalClose.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
}

/* ---------------- VOICE MESSAGES ---------------- */
function initVoiceMessages() {
  const grid = document.getElementById('voiceTapesGrid');
  const player = document.getElementById('voiceAudioPlayer');
  if (!grid || !player) return;

  // Placeholder tapes — add real recordings to assets/voice/ and update
  // these paths. Each tape plays one audio file when clicked.
  const tapes = [
    { label: 'Secret Message', src: './assets/Secret%20message.mp3' },
    { label: 'Whenever You Are Sad', src: './assets/Whenever%20you%20are%20sad.mp3' },
    { label: 'Why You Are Feeling Low', src: './assets/Why%20you%20are%20feeling%20low.mp3' }
  ];

  let currentTape = null;

  tapes.forEach((t) => {
    const tape = document.createElement('div');
    tape.className = 'voice-tape';
    tape.innerHTML = `<div class="tape-icon">🎙️</div><p class="tape-label">${t.label}</p>`;
    tape.addEventListener('click', () => {
      document.querySelectorAll('.voice-tape').forEach((el) => el.classList.remove('playing'));
      if (currentTape === tape && !player.paused) {
        player.pause();
        currentTape = null;
        return;
      }
      player.src = t.src;
      player.play().catch(() => {
        alert('Add your recording at ' + t.src + ' to enable this voice message.');
      });
      tape.classList.add('playing');
      currentTape = tape;
    });
    grid.appendChild(tape);
  });

  player.addEventListener('ended', () => {
    document.querySelectorAll('.voice-tape').forEach((el) => el.classList.remove('playing'));
    currentTape = null;
  });
}

/* ---------------- TIME CAPSULE ---------------- */
function initTimeCapsule() {
  const grid = document.getElementById('timeCapsuleGrid');
  if (!grid) return;

  // Placeholder capsules — edit the messages, and add more years by
  // copying the pattern below.
const capsules = [
  {
    year: 2026,
    unlockDate: null,
    message: `Hi Ishu ❤️,

If you're reading this, it means we've reached another beautiful chapter together.

I hope you're smiling as you read these words because that's always been one of my favorite sights.

Thank you for being my comfort, my happiness, and the person who makes ordinary days feel special.

No matter how busy life gets or how much time passes, I hope one thing never changes—that we keep choosing each other every single day.

Happy Birthday once again, my love.

I love you endlessly.

— Jivesh ❤️`
  },

  {
    year: 2027,
    unlockDate: "July 22 2027",
    message: `Happy Birthday, My Love! 🎂❤️

A whole year has passed since I built this little surprise for you.

I wonder where life has taken us by now.

Maybe we've made countless new memories...
Maybe we've travelled somewhere together...
Maybe we're still laughing over the same silly jokes.

Whatever has changed, I hope one thing hasn't...

I still hope your smile is my favorite place.

If you're reading this, know that I'm grateful for every moment we've shared.

Here's to many more birthdays together.

Forever yours,

Jivesh ❤️`
  },

  {
    year: 2028,
    unlockDate: "July 22 2028",
    message: `Dear Future Ishu ❤️,

Two years have passed since this website was created.

Isn't that amazing?

I hope you're happy.
I hope your dreams are coming true.
I hope you're taking care of yourself.

And I hope that whenever life becomes difficult, you remember that you'll always be loved more than you know.

If we're still reading this together, then thank you for continuing this beautiful journey with me.

If life has surprised us in ways we never imagined, I hope those surprises made us stronger.

No matter what happens...

You'll always have a special place in my heart.

Happy Birthday, beautiful.

I love you.

Always.

— Jivesh ❤️`
  }
];
  capsules.forEach((c) => {
    const card = document.createElement('div');
    const isLocked = c.unlockDate && new Date() < new Date(c.unlockDate);
    card.className = 'time-capsule-card' + (isLocked ? ' locked' : '');

    if (isLocked) {
      card.innerHTML = `
        <p class="capsule-year">${c.year}</p>
        <p class="capsule-lock">🔒</p>
        <p class="capsule-unlock-date">Opens on ${c.unlockDate}</p>
      `;
    } else {
      card.innerHTML = `
        <p class="capsule-year">${c.year}</p>
        <p class="capsule-message">${c.message}</p>
      `;
    }
    grid.appendChild(card);
  });
}

/* ---------------- PROPOSAL-STYLE RING REVEAL ---------------- */
function initRingReveal() {
  const overlay = document.getElementById('ringOverlay');
  const box = document.getElementById('ringBox');
  const message = document.getElementById('ringMessage');
  const closeBtn = document.getElementById('ringClose');
  if (!overlay) return;

  box.addEventListener('click', () => {
    box.classList.add('opened');
    setTimeout(() => message.classList.remove('hidden'), 400);
  });

  closeBtn.addEventListener('click', () => closeRingReveal());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeRingReveal(); });

  function closeRingReveal() {
    overlay.classList.remove('open');
    box.classList.remove('opened');
    message.classList.add('hidden');
  }
}
function openRingReveal() {
  const overlay = document.getElementById('ringOverlay');
  if (overlay) overlay.classList.add('open');
}

/* ---------------- SECRET DEVELOPER MODE (type "JIVESH") ---------------- */
function initDevMode() {
  const overlay = document.getElementById('devOverlay');
  const closeBtn = document.getElementById('devClose');
  if (!overlay) return;
  const targetWord = 'JIVESH';
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
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
}

/* ---------------- FLOATING WISHES ---------------- */
function initFloatingWishes() {
  const wish = document.getElementById('floatingWish');
  const popup = document.getElementById('wishMessagePopup');
  if (!wish) return;

  const messages = [
    "You're beautiful.",
    'I miss you.',
    'Today is going to be a good day.',
    "You're stronger than you know.",
    'I\'m grateful for you.',
    'Just checking in — I love you.'
  ];

  function launchWish() {
    wish.classList.remove('hidden');
    wish.style.top = 10 + Math.random() * 60 + '%';
    // Restart the CSS animation
    wish.style.animation = 'none';
    void wish.offsetWidth;
    wish.style.animation = '';

    const handleClick = () => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      popup.textContent = '❤️ ' + msg;
      popup.classList.remove('hidden');
      wish.classList.add('hidden');
      wish.removeEventListener('click', handleClick);
      setTimeout(() => popup.classList.add('hidden'), 3200);
    };
    wish.addEventListener('click', handleClick);

    setTimeout(() => {
      wish.classList.add('hidden');
      wish.removeEventListener('click', handleClick);
    }, 9000);
  }

  setTimeout(launchWish, 8000);
  setInterval(launchWish, 15000);
}

/* ---------------- CHOOSE YOUR ENDING + MOVIE CREDITS + STAR NAMING ---------------- */
function initEndingChoiceAndCredits() {
  const endingChoice = document.getElementById('endingChoice');
  const skyScene = document.getElementById('skyScene');
  const skyEndingText = document.getElementById('skyEndingText');
  const movieCredits = document.getElementById('movieCredits');
  const creditsBtn = document.getElementById('skyCreditsBtn');
  const creditsReplayBtn = document.getElementById('creditsReplayBtn');
  const starPopup = document.getElementById('starNamePopup');
  if (!endingChoice) return;

  const endingTexts = {
    romantic: 'Every star tonight is for you. My favorite person, in my favorite sky.',
    funny: "Every star tonight is for you — yes, I made a whole website, I'm that dramatic.",
    emotional: 'Every star tonight is for you. Thank you for staying, for loving, for being you.',
    party: 'Every star tonight is for you — now let\'s celebrate! 🎉'
  };

  document.querySelectorAll('.ending-choice-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ending = btn.dataset.ending;
      skyEndingText.textContent = endingTexts[ending] || endingTexts.romantic;
      endingChoice.classList.add('hidden');
      skyScene.classList.remove('hidden');
    });
  });

  // Star naming: click anywhere on the sky scene to "name" the nearest star.
  skyScene.addEventListener('click', (e) => {
    if (e.target.closest('.sky-message') || e.target.closest('.star-name-popup')) return;
    const rect = skyScene.getBoundingClientRect();
    starPopup.style.left = (e.clientX - rect.left) + 'px';
    starPopup.style.top = (e.clientY - rect.top) + 'px';
    starPopup.classList.remove('hidden');
    clearTimeout(starPopup._hideTimer);
    starPopup._hideTimer = setTimeout(() => starPopup.classList.add('hidden'), 2600);
  });

  creditsBtn.addEventListener('click', () => {
    skyScene.classList.add('hidden');
    movieCredits.classList.remove('hidden');
  });

  creditsReplayBtn.addEventListener('click', () => window.location.reload());
}
