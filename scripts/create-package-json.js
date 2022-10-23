const fs = require('fs/promises');
const npm = require('npm/lib/npm');

(async () => {
    const buffer = await fs.readFile('./package.json');
    const content = JSON.parse(buffer.toString());

    const packageJson = {
        name: content.name,
        version: content.version,
        description: content.description,
        author: content.author,
        keywords: content.keywords,
        contributors: content.contributors,
        dependencies: content.dependencies,
        license: content.dependencies,
        main: './index.js',
        typings: 'index.d.ts',
        browser: './index.js',
        license: content.license,
        bugs: {
            url: "https://github.com/ShadyMind/normal-env/issues"
        },
        bin: {
            // cSpell:ignore normalenv
            normalenv: "./index.js"
        },
        repository: {
            type: 'git',
            url: 'https://github.com/ShadyMind/normal-env.git'
        },
        engines: {
            node: '>=10.13.0'
        },
    }

    await fs.writeFile('./.artifacts/build/package.json', JSON.stringify(packageJson, null, 2))
})();
