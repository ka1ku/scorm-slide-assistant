// Keeps Storyline/SCORM players running when the tab is in the background.
(() => {
  const hide = () => false;
  try {
    for (const k of ['hidden', 'webkitHidden']) {
      Object.defineProperty(document, k, { configurable: true, get: hide });
    }
    for (const k of ['visibilityState', 'webkitVisibilityState']) {
      Object.defineProperty(document, k, { configurable: true, get: () => 'visible' });
    }
    document.hasFocus = () => true;
  } catch (_) {}

  const noop = () => {};
  for (const [obj, prop] of [
    [document, 'onvisibilitychange'],
    [window, 'onblur'],
    [window, 'onpagehide'],
  ]) {
    try {
      Object.defineProperty(obj, prop, { configurable: true, get: () => null, set: noop });
    } catch (_) {}
  }

  const block = new Set([
    'visibilitychange',
    'webkitvisibilitychange',
    'blur',
    'focusout',
    'pagehide',
    'freeze',
  ]);
  const add = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (typeof type === 'string' && block.has(type.toLowerCase())) return;
    return add.call(this, type, listener, options);
  };

  for (const type of block) {
    window.addEventListener(type, (e) => e.stopImmediatePropagation(), true);
  }
})();
