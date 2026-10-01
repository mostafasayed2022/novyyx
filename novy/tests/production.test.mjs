import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHmac } from 'node:crypto';

const directory = await mkdtemp(path.join(os.tmpdir(), 'novyx-production-test-'));
const port = 3197;
const base = `http://127.0.0.1:${port}`;
const secret = 'regression-test-secret-at-least-32-characters';
let server;
let cookie;
const json = (data, session) => ({ method: 'POST', headers: { 'Content-Type': 'application/json', ...(session ? { Cookie: session } : {}) }, body: JSON.stringify(data) });

before(async () => {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    env: { ...process.env, TURSO_DATABASE_URL: '', TURSO_AUTH_TOKEN: '', CODECRAFT_API_KEY: '', CLOUDINARY_CLOUD_NAME: '', CLOUDINARY_API_KEY: '', CLOUDINARY_API_SECRET: '', ADMIN_PASSWORD: 'regression-password', AUTH_SECRET: secret, NOVYX_DATA_DIR: directory },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  let stderr = '';
  server.stderr.on('data', (data) => { stderr += data; });
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(`${base}/api/products`)).ok) return; } catch { /* server startup */ }
    if (server.exitCode !== null) throw new Error(`Server exited: ${stderr}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Production server did not start. Run npm run build first.');
});
after(async () => {
  if (server && server.exitCode === null) { server.kill(); await once(server, 'exit'); }
  await rm(directory, { recursive: true, force: true });
});

test('public routes render, unknown product returns 404 and public prices stay private', async () => {
  for (const route of ['/', '/about', '/products', '/products/peptides', '/products/skin-boosters', '/calculator', '/contact', '/admin/login', '/robots.txt', '/sitemap.xml']) {
    assert.equal((await fetch(`${base}${route}`)).status, 200, route);
  }
  const missing = await fetch(`${base}/products/not-a-real-product`);
  assert.ok([200, 404].includes(missing.status));
  assert.match(await missing.text(), /name="robots" content="noindex"/); // Next.js streaming status semantics
  assert.equal((await fetch(`${base}/api/products/not-a-real-product`)).status, 404);
  const products = await (await fetch(`${base}/api/products`)).json();
  assert.ok(products.length > 0);
  assert.ok(products.every((product) => !Object.hasOwn(product, 'price')));
  const product = await (await fetch(`${base}/api/products/${products[0].slug}`)).json();
  assert.ok(!Object.hasOwn(product, 'price'));
  const html = await (await fetch(`${base}/products`)).text();
  assert.ok(!html.includes('\\"price\\":'), 'no real price in RSC catalog payload');
  assert.equal((await fetch(`${base}/api/products?limit=bad`)).status, 400);
  assert.equal((await fetch(`${base}/api/products?ordering=invalid`)).status, 400);
});

test('invalid login is handled, unauthenticated writes are rejected and signed sessions expire on the server', async () => {
  assert.equal((await fetch(`${base}/api/admin/session`, json({ password: 123 }))).status, 401);
  assert.equal((await fetch(`${base}/api/admin/products`)).status, 401);
  const login = await fetch(`${base}/api/admin/session`, json({ password: 'regression-password' }));
  assert.equal(login.status, 200);
  cookie = login.headers.get('set-cookie').split(';')[0];
  assert.equal((await fetch(`${base}/api/admin/products`, { headers: { Cookie: cookie } })).status, 200);
  const payload = `${Math.floor(Date.now() / 1000) - 1}.${'a'.repeat(32)}`;
  const signature = createHmac('sha256', secret).update(`novyx-admin-v2:${payload}`).digest('hex');
  assert.equal((await fetch(`${base}/api/admin/products`, { headers: { Cookie: `novyx_admin_session=${payload}.${signature}` } })).status, 401);
});

test('saving product/hero works without a translation service and rejects invalid media and reserved slugs', async () => {
  const [existing] = await (await fetch(`${base}/api/admin/products`, { headers: { Cookie: cookie } })).json();
  const product = { ...existing, id: undefined, name: 'Regression product', slug: 'regression-product' };
  const created = await fetch(`${base}/api/admin/products`, json(product, cookie));
  assert.equal(created.status, 201);
  const saved = await created.json();
  assert.ok(saved.translationWarning);
  const badImage = await fetch(`${base}/api/admin/products`, json({ ...product, slug: 'regression-image', imageUrl: 'javascript:alert(1)' }, cookie));
  assert.equal(badImage.status, 400);
  assert.equal((await fetch(`${base}/api/admin/products`, json({ ...product, slug: 'peptides' }, cookie))).status, 400);
  const [slide] = await (await fetch(`${base}/api/admin/hero`, { headers: { Cookie: cookie } })).json();
  const hero = await fetch(`${base}/api/admin/hero`, json({ ...slide, id: 'regression-hero', number: '99' }, cookie));
  assert.equal(hero.status, 201);
  assert.ok((await hero.json()).translationWarning);
  assert.equal((await fetch(`${base}/api/admin/hero`, json({ ...slide, id: 'bad-link', productLink: 'javascript:alert(1)' }, cookie))).status, 400);
});

test('concurrent contact requests persist and do not report success on invalid input', async () => {
  assert.equal((await fetch(`${base}/api/contact`, json({}))).status, 400);
  const payload = { firstName: 'Test', lastName: 'User', email: 'test@example.com', company: 'Test Lab', phone: '+201000000000', country: 'Egypt', representation: 'Clinic', message: 'Regression inquiry for local testing only.' };
  const responses = await Promise.all(Array.from({ length: 12 }, () => fetch(`${base}/api/contact`, json(payload))));
  assert.ok(responses.every((response) => response.status === 200));
  const tickets = await Promise.all(responses.map((response) => response.json()));
  const persisted = await (await fetch(`${base}/api/admin/inquiries`, { headers: { Cookie: cookie } })).json();
  assert.ok(tickets.every((ticket) => persisted.some((inquiry) => inquiry.id === ticket.ticketId)));
});
