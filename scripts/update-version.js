const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const versionIncrement = require('semver/functions/inc');

const VALID_TYPES = [
  'major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'
];

const isValidVersionType = (type) => VALID_TYPES.includes(type);
const getVersionFromArgs = () => process.argv.slice(2).find(isValidVersionType);

async function updateVersion() {
  const type = getVersionFromArgs();

  if (type === undefined) {
    throw new Error(`Invalid type "${type}". Possible types "${VALID_TYPES.join('", "')}".`);
  }

  const file = path.resolve(process.cwd(), 'package.json');
  const buffer = await readFile(file);
  const data = JSON.parse(buffer.toString());
  data['version'] = versionIncrement(data['version'], type);
  await writeFile(file, JSON.stringify(data, null, 2));
}

module.exports.updateVersion = updateVersion;