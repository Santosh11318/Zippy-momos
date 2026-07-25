/* =========================================================
   ZIPPY CHICKEN MOMOS — GALLERY SLIDER + LIGHTBOX
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsWrap = document.getElementById('galleryDots');

  if (!track) return;

  const items = Array.from(track.children);

  // Build dots
  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => scrollToIndex(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function scrollToIndex(i) {
    const item = items[i];
    track.scrollTo({ left: item.offsetLeft - 8, behavior: 'smooth' });
  }

  function updateActiveDot() {
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.offsetLeft - scrollLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateActiveDot);
  }, { passive: true });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -340, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 340, behavior: 'smooth' });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const alt = item.querySelector('img').getAttribute('alt');
      lightboxImg.src = full;
      lightboxImg.alt = alt;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

});
