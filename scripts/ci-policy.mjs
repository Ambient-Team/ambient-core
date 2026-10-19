#!/usr/bin/env node
/**
 * Repository CI policy checks (workflow shape, pins, timeouts, triggers).
 * Run in CI and locally: node scripts/ci-policy.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.CI_POLICY_ROOT
  ? process.env.CI_POLICY_ROOT
  : join(import.meta.dirname, '..');
const WORKFLOWS_DIR = join(ROOT, '.github', 'workflows');
const PATHS_FILTER_PIN = '7b450fff21473bca461d4b92ce414b9d0420d706';

const errors = [];

function fail(message) {
  errors.push(message);
}

function readWorkflow(name) {
  return readFileSync(join(WORKFLOWS_DIR, name), 'utf8');
}

function checkCiWorkflow(text) {
  if (!text.includes('name: ci')) {
    fail('ci.yml: expected workflow name "ci"');
  }
  if (text.includes('workflow_dispatch')) {
    fail('ci.yml: workflow_dispatch is not allowed on the main CI workflow');
  }
  if (!/push:\s*\n\s*branches:\s*(\n\s*-\s*main|\[main\])/m.test(text)) {
    fail('ci.yml: push must be limited to the main branch');
  }
  if (text.includes('on: [push, pull_request]')) {
    fail('ci.yml: use explicit push/pull_request triggers instead of on: [push, pull_request]');
  }
  for (const type of ['opened', 'synchronize', 'reopened', 'ready_for_review']) {
    if (!text.includes(type)) {
      fail(`ci.yml: pull_request.types must include "${type}"`);
    }
  }
  if (!/cancel-in-progress:\s*true/m.test(text)) {
    fail('ci.yml: concurrency.cancel-in-progress must be true');
  }
  if (!text.includes(`dorny/paths-filter@${PATHS_FILTER_PIN}`)) {
    fail(`ci.yml: changes job must pin dorny/paths-filter@${PATHS_FILTER_PIN}`);
  }
  if (!/job:\s*changes|^\s*changes:/m.test(text)) {
    fail('ci.yml: must define a "changes" job');
  }
  if (!/job:\s*ci-policy|^\s*ci-policy:/m.test(text)) {
    fail('ci.yml: must define a "ci-policy" job');
  }
  if (!/^\s*build-test:/m.test(text)) {
    fail('ci.yml: must keep the required "build-test" job');
  }
  if (!/RUN_HEAVY|run_heavy/m.test(text)) {
    fail('ci.yml: heavy steps must be gated with RUN_HEAVY / run_heavy');
  }

  for (const jobName of ['changes', 'ci-policy', 'build-test']) {
    const marker = `  ${jobName}:\n`;
    const start = text.indexOf(marker);
    if (start === -1) {
      fail(`ci.yml: missing job "${jobName}"`);
      continue;
    }
    const rest = text.slice(start + marker.length);
    const nextJob = rest.search(/^ {2}[a-z0-9-]+:\n/m);
    const block = nextJob === -1 ? marker + rest : marker + rest.slice(0, nextJob);
    if (!/timeout-minutes:\s*\d+/m.test(block)) {
      fail(`ci.yml: job "${jobName}" must set timeout-minutes`);
    }
  }

  if (/cache:/m.test(text) && !/package-lock\.json|pom\.xml|pyproject\.toml/m.test(text)) {
    fail('ci.yml: caches must reference an existing lockfile or manifest');
  }
}

function checkDependabot(text) {
  if (!/groups:/m.test(text)) {
    fail('dependabot.yml: must define update groups');
  }
  const limits = [...text.matchAll(/open-pull-requests-limit:\s*(\d+)/g)].map((m) => Number(m[1]));
  if (limits.length === 0) {
    fail('dependabot.yml: must set open-pull-requests-limit');
  }
  for (const limit of limits) {
    if (limit > 2) {
      fail(`dependabot.yml: open-pull-requests-limit ${limit} exceeds policy maximum of 2`);
    }
  }
}

function main() {
  const workflows = readdirSync(WORKFLOWS_DIR).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
  if (!workflows.includes('ci.yml')) {
    fail('missing .github/workflows/ci.yml');
  } else {
    checkCiWorkflow(readWorkflow('ci.yml'));
  }

  const dependabotPath = join(ROOT, '.github', 'dependabot.yml');
  try {
    checkDependabot(readFileSync(dependabotPath, 'utf8'));
  } catch {
    fail('missing .github/dependabot.yml');
  }

  if (errors.length > 0) {
    console.error('CI policy check failed:\n');
    for (const e of errors) {
      console.error(` - ${e}`);
    }
    process.exit(1);
  }
  console.log('CI policy check passed.');
}

main();
