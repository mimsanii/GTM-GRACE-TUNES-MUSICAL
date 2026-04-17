/* ============================================================
   GRACE TUNES MUSICAL — Shared JavaScript
   ============================================================ */

// ===== NAV: Detect dark hero and set link colors =====
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Check if page has a dark hero (fullscreen)
  const hero = document.getElementById('hero') || document.querySelector('.inner-hero');
  if (hero) nav.classList.add('dark-bg');

  // Set active link
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav-ul a[data-page]').forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add('active-link');
  });

  // Scroll handler: swap to solid when scrolled
  function onScroll() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('solid', scrolled);
    nav.classList.toggle('dark-bg', !scrolled && !!hero);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== CURSOR =====
(function initCursor() {
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  const hoverEls = 'a,button,[data-hover],.scard,.tcard,.pitem,.c-row,.vm-card,.ps-tile,.btn,.logo-wrap,.instr-card,.ipill,.staff-card,.class-card,.mob-nav-item,.fsoc';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
})();

// ===== SCROLL PROGRESS =====
(function initScrollProg() {
  const prog = document.getElementById('scroll-prog');
  if (!prog) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
  }, { passive: true });
})();

// ===== REVEAL ON SCROLL =====
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));
})();

// ===== COUNTER ANIMATION =====
(function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const t = parseInt(e.target.dataset.to);
        if (isNaN(t)) return;
        let t0 = null;
        (function step(now) {
          if (!t0) t0 = now;
          const p = Math.min((now - t0) / 1800, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          e.target.textContent = Math.round(ease * t) + '+';
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-to]').forEach(el => obs.observe(el));
})();

// ===== AMBIENT PARTICLES =====
(function initParticles() {
  const pc = document.getElementById('particles-canvas');
  if (!pc) return;
  const ctx = pc.getContext('2d');
  const pts = [];
  function resize() { pc.width = window.innerWidth; pc.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 38; i++) {
    pts.push({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, r: Math.random()*2+.5, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, o:Math.random()*.35+.08, c:Math.random()>.5?'181,140,79':'113,9,39' });
  }
  (function draw() {
    ctx.clearRect(0,0,pc.width,pc.height);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=pc.width; if(p.x>pc.width)p.x=0;
      if(p.y<0)p.y=pc.height; if(p.y>pc.height)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${p.c},${p.o})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// ===== MOBILE MENU =====
(function initMobileMenu() {
  const hamBtn = document.getElementById('ham');
  const mobNav = document.getElementById('mobnav');
  const backdrop = document.getElementById('mob-backdrop');
  if (!hamBtn) return;
  function open() { hamBtn.classList.add('op'); mobNav.classList.add('op'); backdrop.classList.add('op'); document.body.style.overflow='hidden'; }
  function close() { hamBtn.classList.remove('op'); mobNav.classList.remove('op'); backdrop.classList.remove('op'); document.body.style.overflow=''; }
  window.closeMenu = close;
  hamBtn.addEventListener('click', () => mobNav.classList.contains('op') ? close() : open());
  backdrop.addEventListener('click', close);
})();

// ===== FORM SUBMIT =====
window.doSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('fbtn');
  if (!btn) return;
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!'; btn.style.background = '#2e6e40';
    e.target.reset();
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; btn.disabled = false; }, 4000);
  }, 1400);
};

// ===== MAGNETIC CARDS =====
(function initMagneticCards() {
  document.querySelectorAll('.scard,.tcard,.class-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
})();

// ===== NEWSLETTER FORM =====
(function initNewsletter() {
  document.querySelectorAll('.fnews-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.fnews-btn');
      btn.textContent = '✓ Subscribed!'; btn.style.background = '#2e6e40';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; form.reset(); }, 3000);
    });
  });
})();