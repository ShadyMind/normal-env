#!/usr/bin/env node

'use strict';

const { promisify } = require('node:util');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { rmSync, statSync } = require('node:fs'); 
const { updateVersion } = require('./update-version');

const SPAWN_OPTIONS = {
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr]
};

(async () => {
  const buildDir = path.resolve(process.cwd(), './build');
  try {
    const buildDirStat = statSync(buildDir);
    if (buildDirStat.isDirectory()) {
      rmSync(buildDir, { recursive: true });
    }
    console.log('Previous build directory removed.');
  } catch (ex) {}

  spawnSync('npm run test', [], SPAWN_OPTIONS);
  console.log('All tests passed.');
  
  spawnSync('npm run build', [], SPAWN_OPTIONS);
  console.log('Application built.');

  await updateVersion();
  console.log('Package.json file version updated.');
})();