import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, cpSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';

const ROOT = join(import.meta.dirname, '..');
const POLICY = join(ROOT, 'scripts', 'ci-policy.mjs');
const { pathsFilterPin, heavyQualityScripts, actionlintVersion } = await import('./ci-policy.mjs');

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

  await t.test('actionlintVersion matches ci.yml pin', () => {
    const ci = readFileSync(join(ROOT, '.github/workflows/ci.yml'), 'utf8');
    assert.match(ci, new RegExp(`ACTIONLINT_VERSION: "${actionlintVersion}"`));
  });

  await t.test('heavyQualityScripts are wired in ci.yml', () => {
    const ci = readFileSync(join(ROOT, '.github/workflows/ci.yml'), 'utf8');
    for (const script of heavyQualityScripts) {
      assert.match(ci, new RegExp(script.replaceAll('/', '\\/')));
    }
    assert.match(ci, /quality-static:/);
  });

  await t.test('pathsFilterPin matches ci.yml pin', () => {
    assert.equal(
      pathsFilterPin,
      '7b450fff21473bca461d4b92ce414b9d0420d706',
    );
    const ci = readFileSync(join(ROOT, '.github/workflows/ci.yml'), 'utf8');
    assert.match(ci, new RegExp(`dorny/paths-filter@${pathsFilterPin}`));
  });

  await t.test('fails when paths-filter pin is wrong', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ci-policy-pin-'));
    mkdirSync(join(dir, '.github', 'workflows'), { recursive: true });
    cpSync(join(ROOT, '.github', 'dependabot.yml'), join(dir, '.github', 'dependabot.yml'));
    const badCi = readFileSync(join(ROOT, '.github/workflows/ci.yml'), 'utf8').replace(
      pathsFilterPin,
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    );
    writeFileSync(join(dir, '.github/workflows/ci.yml'), badCi);
    const result = runPolicy(dir);
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, /paths-filter/);
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
