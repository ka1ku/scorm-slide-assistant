const ALLOWED = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const snap = (v) =>
  ALLOWED.reduce((best, x) => (Math.abs(x - v) < Math.abs(best - v) ? x : best), ALLOWED[0]);

const enabledEl = document.getElementById('enabled');
const speedEl = document.getElementById('speed');
const speedVal = document.getElementById('speed-val');

const fmt = (v) => `${v}×`;

chrome.storage.sync.get({ enabled: true, speed: 2 }, (v) => {
  enabledEl.checked = v.enabled;
  speedEl.value = v.speed;
  speedVal.textContent = fmt(v.speed);
});

enabledEl.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: enabledEl.checked });
});

speedEl.addEventListener('input', () => {
  const s = snap(parseFloat(speedEl.value));
  speedVal.textContent = fmt(s);
});

speedEl.addEventListener('change', () => {
  const s = snap(parseFloat(speedEl.value));
  speedEl.value = s;
  speedVal.textContent = fmt(s);
  chrome.storage.sync.set({ speed: s });
});
