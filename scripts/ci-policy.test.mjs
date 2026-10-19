import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';

const ROOT = join(import.meta.dirname, '..');
const POLICY = join(ROOT, 'scripts', 'ci-policy.mjs');

function runPolicy(rootDir) {
  const env = { ...process.env };
  env.CI_POLICY_ROOT = rootDir;
  return spawnSync(process.execPath, [POLICY], { encoding: 'utf8', env });
}

test('ci-policy script', async (t) => {
  await t.test('passes on repository workflows', () => {
    const result = runPolicy(ROOT);
    assert.equal(result.status, 0, result.stderr || result.stdout);
  });

  await t.test('fails when build-test job is missing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ci-policy-'));
    mkdirSync(join(dir, '.github', 'workflows'), { recursive: true });
    cpSync(join(ROOT, '.github', 'dependabot.yml'), join(dir, '.github', 'dependabot.yml'));
    writeFileSync(join(dir, '.github/workflows/ci.yml'), readMinimalCiMissingBuildTest());
    const result = runPolicy(dir);
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, /build-test/);
  });
});

function readMinimalCiMissingBuildTest() {
  return `name: ci
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
concurrency:
  group: ci
  cancel-in-progress: true
jobs:
  changes:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: dorny/paths-filter@7b450fff21473bca461d4b92ce414b9d0420d706
  ci-policy:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - run: echo ok
`;
}
