/* =========================================================
   ZIPPY CHICKEN MOMOS — COUNTDOWN TIMER
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const hoursEl = document.getElementById('timerHours');
  const minsEl = document.getElementById('timerMinutes');
  const secsEl = document.getElementById('timerSeconds');

  if (!hoursEl) return;

  // Countdown resets to a fresh 6-hour window whenever it hits zero,
  // simulating a rolling "today's special offer" deadline.
  function getEndTime() {
    const stored = sessionStorageSafeGet('zippy_offer_end');
    if (stored) return parseInt(stored, 10);
    const end = Date.now() + 6 * 60 * 60 * 1000; // 6 hours from now
    sessionStorageSafeSet('zippy_offer_end', String(end));
    return end;
  }

  // Fallback in-memory store if sessionStorage is unavailable
  let memoryStore = {};
  function sessionStorageSafeGet(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return memoryStore[key] || null; }
  }
  function sessionStorageSafeSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch (e) { memoryStore[key] = value; }
  }

  let endTime = getEndTime();

  function tick() {
    let diff = endTime - Date.now();

    if (diff <= 0) {
      endTime = Date.now() + 6 * 60 * 60 * 1000;
      sessionStorageSafeSet('zippy_offer_end', String(endTime));
      diff = endTime - Date.now();
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);

});
