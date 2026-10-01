import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { sourceLoader } from './source-loader.mjs';

const directory = await mkdtemp(path.join(os.tmpdir(), 'novyx-store-test-'));
process.env.NOVYX_DATA_DIR = directory;
process.env.TURSO_DATABASE_URL = '';
process.env.TURSO_AUTH_TOKEN = '';
const store = sourceLoader()('src/lib/server/content-store.ts');

test('parallel inquiry submissions all persist and a failed operation does not poison the queue', async () => {
  const products = await store.listProducts();
  await assert.rejects(store.createProduct(products[0]), /already exists/);
  const inquiries = await Promise.all(Array.from({ length: 20 }, (_, index) => store.createInquiry('contact', { message: `Regression ${index}` })));
  const persisted = await store.listInquiries();
  assert.equal(new Set(inquiries.map((item) => item.id)).size, 20);
  assert.equal(persisted.length, 20);
  for (const inquiry of inquiries) assert.ok(persisted.some((item) => item.id === inquiry.id));
});

test('corrupt storage is rejected without overwriting the file; queue recovers after restoring it', async () => {
  const file = path.join(directory, 'content.json');
  const original = await readFile(file, 'utf8');
  await writeFile(file, '{corrupt');
  await assert.rejects(store.createInquiry('contact', { message: 'Must not be saved' }));
  assert.equal(await readFile(file, 'utf8'), '{corrupt');
  await writeFile(file, original);
  await store.createInquiry('contact', { message: 'Recovered' });
  assert.equal((await store.listInquiries()).length, 21);
});

test('Turso retries optimistic conflicts without dropping an edit from another instance', async () => {
  const local = JSON.parse(await readFile(path.join(directory, 'content.json'), 'utf8'));
  let data = JSON.stringify(local);
  let conflicted = false;
  const originalFetch = globalThis.fetch;
  process.env.TURSO_DATABASE_URL = 'libsql://regression.invalid';
  process.env.TURSO_AUTH_TOKEN = 'test-token';
  globalThis.fetch = async (_url, options) => {
    const statement = JSON.parse(options.body).requests[0].stmt;
    const args = statement.args.map((item) => item.value);
    let rows = [];
    let cols = [];
    if (statement.sql.startsWith('SELECT')) {
      cols = [{ name: 'data' }]; rows = [[{ type: 'text', value: data }]];
    } else if (statement.sql.startsWith('UPDATE')) {
      if (!conflicted) {
        conflicted = true;
        const other = JSON.parse(data);
        other.inquiries.push({ id: 'other-instance', kind: 'contact', payload: {}, status: 'new', createdAt: new Date().toISOString() });
        data = JSON.stringify(other);
      } else if (args[3] === data) {
        data = args[0]; cols = [{ name: 'id' }]; rows = [[{ type: 'text', value: 'main' }]];
      }
    }
    return Response.json({ results: [{ type: 'ok', response: { result: { cols, rows } } }] });
  };
  try {
    const remote = sourceLoader()('src/lib/server/content-store.ts');
    const created = await remote.createInquiry('contact', { message: 'Remote retry' });
    const persisted = JSON.parse(data);
    assert.ok(conflicted);
    assert.ok(persisted.inquiries.some((item) => item.id === 'other-instance'));
    assert.ok(persisted.inquiries.some((item) => item.id === created.id));
  } finally {
    globalThis.fetch = originalFetch;
    process.env.TURSO_DATABASE_URL = '';
    process.env.TURSO_AUTH_TOKEN = '';
  }
});

test.after(async () => rm(directory, { recursive: true, force: true }));
