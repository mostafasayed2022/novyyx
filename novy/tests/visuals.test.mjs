import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sourceLoader } from './source-loader.mjs';

// Test the public capability snapshot, including landscape touch devices.
test('rich effects are disabled for touch, reduced motion and Data Saver, with a safe SSR snapshot', () => {
  let desktop = false;
  let saveData = false;
  let query;
  globalThis.window = { matchMedia: (value) => { query = value; return { matches: desktop }; } };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { maxTouchPoints: 0, connection: { get saveData() { return saveData; } } } });
  const hooks = sourceLoader({ react: { useSyncExternalStore: (_subscribe, snapshot, server) => ({ client: snapshot(), server: server() }) } })('src/hooks/use-visual-capabilities.ts');
  assert.deepEqual(hooks.useRichVisuals(), { client: false, server: false });
  assert.match(query, /pointer: fine/);
  assert.match(query, /hover: hover/);
  assert.match(query, /prefers-reduced-motion: no-preference/);
  desktop = true;
  assert.equal(hooks.useRichVisuals().client, true);
  navigator.maxTouchPoints = 5;
  assert.equal(hooks.useRichVisuals().client, false); // landscape iPhone/iPad, regardless of viewport width
  navigator.maxTouchPoints = 0;
  saveData = true;
  assert.equal(hooks.useRichVisuals().client, false);
  delete globalThis.window;
});

test('canvas scheduler stops off-screen/hidden and disposes all scheduled work', () => {
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  let intersect;
  let disconnected = false;
  globalThis.requestAnimationFrame = (callback) => { pending.set(++nextId, callback); return nextId; };
  globalThis.cancelAnimationFrame = (id) => pending.delete(id);
  globalThis.IntersectionObserver = class {
    constructor(callback) { intersect = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  globalThis.document = { hidden: false, addEventListener: (type, callback) => listeners.set(type, callback), removeEventListener: (type) => listeners.delete(type) };
  const { startCanvasLoop } = sourceLoader()('src/lib/visuals/canvas-loop.ts');
  let draws = 0;
  const stop = startCanvasLoop({}, () => draws++);
  assert.equal(pending.size, 0);
  intersect([{ isIntersecting: true }]);
  const run = (time) => { const [id, callback] = pending.entries().next().value; pending.delete(id); callback(time); };
  run(40); assert.equal(draws, 1);
  run(50); assert.equal(draws, 1); // capped at 30fps
  intersect([{ isIntersecting: false }]); assert.equal(pending.size, 0);
  intersect([{ isIntersecting: true }]);
  document.hidden = true; listeners.get('visibilitychange')(); assert.equal(pending.size, 0);
  document.hidden = false; listeners.get('visibilitychange')(); assert.equal(pending.size, 1);
  stop(); assert.equal(pending.size, 0); assert.equal(listeners.size, 0); assert.ok(disconnected);
});
