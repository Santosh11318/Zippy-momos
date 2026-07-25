/* =========================================================
   ZIPPY CHICKEN MOMOS — MAIN JS
   Navbar, mobile menu, dark mode, forms, sticky elements
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky / shrinking navbar ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const stickyBuy = document.getElementById('stickyBuy');
  const heroSection = document.getElementById('hero');

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    navbar.classList.toggle('scrolled', scrollY > 40);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Back to top visibility
    backToTop.classList.toggle('visible', scrollY > 600);

    // Sticky buy bar — show after hero on mobile
    if (window.innerWidth <= 620) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      stickyBuy.classList.toggle('visible', scrollY > heroBottom);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Dark mode toggle ---------- */
  const darkModeToggle = document.getElementById('darkModeToggle');
  const savedTheme = localStorage.getItem ? null : null; // storage note below
  let isDark = false;
  try {
    isDark = document.body.classList.contains('dark-mode');
  } catch (e) { /* no-op */ }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  /* ---------- Ripple effect on buttons ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!wasActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Form validation ---------- */
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const address = document.getElementById('address');

      const nameError = document.getElementById('nameError');
      const phoneError = document.getElementById('phoneError');
      const addressError = document.getElementById('addressError');

      [name, phone, address].forEach(f => f.closest('.form-group').classList.remove('invalid'));
      nameError.textContent = '';
      phoneError.textContent = '';
      addressError.textContent = '';

      if (name.value.trim().length < 2) {
        nameError.textContent = 'Please enter your full name.';
        name.closest('.form-group').classList.add('invalid');
        valid = false;
      }

      const phoneDigits = phone.value.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        phoneError.textContent = 'Enter a valid 10-digit phone number.';
        phone.closest('.form-group').classList.add('invalid');
        valid = false;
      }

      if (address.value.trim().length < 8) {
        addressError.textContent = 'Please enter a complete delivery address.';
        address.closest('.form-group').classList.add('invalid');
        valid = false;
      }

      const successEl = document.getElementById('formSuccess');
      if (valid) {
        successEl.textContent = '🎉 Order placed! We\'ll call you shortly to confirm.';
        orderForm.reset();
      } else {
        successEl.textContent = '';
      }
    });
  }

  /* ---------- Exit intent popup ---------- */
  const exitModal = document.getElementById('exitModal');
  const exitModalClose = document.getElementById('exitModalClose');
  const exitModalCta = document.getElementById('exitModalCta');
  let exitShown = false;

  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitShown) {
      exitShown = true;
      exitModal.classList.add('active');
      exitModal.setAttribute('aria-hidden', 'false');
    }
  });

  function closeExitModal() {
    exitModal.classList.remove('active');
    exitModal.setAttribute('aria-hidden', 'true');
  }
  exitModalClose.addEventListener('click', closeExitModal);
  exitModal.addEventListener('click', (e) => { if (e.target === exitModal) closeExitModal(); });
  exitModalCta.addEventListener('click', closeExitModal);

  /* ---------- Social proof / recently purchased toast ---------- */
  const socialToast = document.getElementById('socialToast');
  const names = ['Ankit from Jaipur', 'Priya from Delhi', 'Rahul from Mumbai', 'Neha from Pune', 'Sameer from Lucknow'];
  const packs = ['1 pack', '2 packs', '3 packs'];
  let toastTimer = null;

  function showSocialToast() {
    const name = names[Math.floor(Math.random() * names.length)];
    const pack = packs[Math.floor(Math.random() * packs.length)];
    const minsAgo = Math.floor(Math.random() * 20) + 1;
    socialToast.textContent = `🥟 ${name} just ordered ${pack} — ${minsAgo} min ago`;
    socialToast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => socialToast.classList.remove('visible'), 4200);
  }

  setTimeout(showSocialToast, 6000);
  setInterval(showSocialToast, 18000);

  /* ---------- Mouse parallax on hero product ---------- */
  const heroVisual = document.getElementById('heroVisual');
  const heroProductImg = document.getElementById('heroProductImg');
  if (heroVisual && heroProductImg && window.matchMedia('(hover: hover)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroProductImg.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroProductImg.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

});
