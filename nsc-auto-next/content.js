(() => {
  const state = { enabled: true, speed: 2, lastClick: 0 };
  const COOLDOWN_MS = 800;
  const NEXT_SEL =
    '#nav-controls button#next, section#bottom-bar button#next, button#next';

  chrome.storage.sync.get({ enabled: true, speed: 2 }, (v) => {
    state.enabled = v.enabled;
    state.speed = Number(v.speed) || 1;
  });
  chrome.storage.onChanged.addListener((ch) => {
    if (ch.enabled) state.enabled = ch.enabled.newValue;
    if (ch.speed) state.speed = Number(ch.speed.newValue) || 1;
  });

  const visible = (el) => {
    if (!el?.getBoundingClientRect) return false;
    if (el.style.display === 'none') return false;
    if (el.classList.contains('hidden')) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  const clickable = (el) => {
    if (!visible(el)) return false;
    if (el.getAttribute('aria-disabled') === 'true' || el.disabled) return false;
    if (el.classList.contains('disabled')) return false;
    return true;
  };

  const isQuizSlide = () => {
    // Only treat as quiz when Submit is actually shown (Storyline keeps it in DOM hidden).
    for (const sel of ['#submit', '#nav-controls button#submit']) {
      const el = document.querySelector(sel);
      if (visible(el)) return true;
    }
    return !!document.querySelector('[data-model-id][class*="quiz"], .quiz-slide');
  };

  const clickNext = () => {
    const btn = document.querySelector(NEXT_SEL);
    if (!clickable(btn)) return;
    const now = Date.now();
    if (now - state.lastClick < COOLDOWN_MS) return;
    state.lastClick = now;
    try {
      btn.focus();
      btn.click();
    } catch (_) {}
  };

  const setSpeed = (target) => {
    const want = String(target);
    for (const el of document.querySelectorAll(
      '#playback-speed [role="menuitemcheckbox"][data-speed]'
    )) {
      if (el.getAttribute('data-speed') === want && el.getAttribute('aria-checked') !== 'true') {
        el.click();
        return;
      }
    }
  };

  const tick = () => {
    if (!state.enabled) return;
    if (state.speed !== 1) setSpeed(state.speed);
    if (!isQuizSlide()) clickNext();
  };

  new MutationObserver(tick).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['aria-disabled', 'style', 'class', 'disabled'],
  });
  setInterval(tick, 1000);
  tick();
})();
