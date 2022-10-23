const package = require('./package.json');

/** @type {import('@cspell/cspell-types').CSpellSettings} */
const cSpellConfig = {
  version: '0.2',
  name: package.name,
  language: 'en-EN,en-GB',
  enabledLanguageIds: [
    'javascript',
    'typescript',
    'json',
    'markdown',
    'bash'
  ],
  ignorePaths: [
    './package-lock.json'
  ]
};

module.exports = cSpellConfig;
