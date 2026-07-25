/* =========================================================
   ZIPPY CHICKEN MOMOS — SCROLL ANIMATIONS
   Reveal-on-scroll, animated counters, timeline progress
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter-number');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-IN') + suffix;
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Timeline progress line ---------- */
  const timelineProgress = document.getElementById('timelineProgress');
  const cookSection = document.getElementById('cook');

  if (timelineProgress && cookSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineProgress.style.width = '100%';
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    timelineObserver.observe(cookSection);
  }

  /* ---------- Typing effect for eyebrow tag (hero) ---------- */
  const eyebrow = document.querySelector('.hero .eyebrow');
  if (eyebrow) {
    const fullText = eyebrow.textContent.trim();
    eyebrow.textContent = '';
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        eyebrow.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 28);
      }
    }
    setTimeout(typeChar, 300);
  }

  /* ---------- Lazy loading fallback (native loading="lazy" already used) ---------- */
  if ('loading' in HTMLImageElement.prototype === false) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

});
