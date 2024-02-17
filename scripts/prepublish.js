#!/usr/bin/env node

'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { rmSync, statSync } = require('node:fs'); 
const { updateVersion } = require('./update-version');
const webpack = require('webpack');
require('ts-node').register();

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
  
  webpack(
    require('../webpack.config.ts').default,
    async (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats && stats.hasErrors()) {
        console.error(stats.toString());
      }
      console.log('Application built.');

      await updateVersion();
      console.log('Package.json file version updated.');

    }
  );

})();