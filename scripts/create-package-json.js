const fs = require('fs/promises');

(async () => {
    const buffer = await fs.readFile('./package.json');
    const content = JSON.parse(buffer.toString());

    const packageJson = {
        name: content.name,
        version: content.version,
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
            normalenv: "./index.js"
        },
        repository: {
            type: 'git',
            url: 'https://github.com/ShadyMind/normal-env.git'
        },
        engines: {
            node: '>=0.12'
        },
    }

if (content.devDependencies) {
        packageJson.devDependencies = content.devDependencies;
    }


    if (content.dependencies) {
        packageJson.devDependencies = content.dependencies;
    }

    await fs.writeFile('./.artifacts/build/package.json', JSON.stringify(packageJson, null, 2))
})();

/*
{
    "name": "typescript",
    "author": "Microsoft Corp.",
    "homepage": "https://www.typescriptlang.org/",
    "version": "4.8.4",
    "license": "Apache-2.0",
    "description": "TypeScript is a language for application scale JavaScript development",
    "keywords": [
        "TypeScript",
        "Microsoft",
        "compiler",
        "language",
        "javascript"
    ],
    "bugs": {
        "url": "https://github.com/Microsoft/TypeScript/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/TypeScript.git"
    },
    "main": "./lib/typescript.js",
    "typings": "./lib/typescript.d.ts",
    "bin": {
        "tsc": "./bin/tsc",
        "tsserver": "./bin/tsserver"
    },
    "engines": {
        "node": ">=4.2.0"
    },
    "overrides": {
        "es5-ext": "0.10.53"
    },
    "scripts": {
        "prepare": "gulp build-eslint-rules",
        "pretest": "gulp tests",
        "test": "gulp runtests-parallel --light=false",
        "test:eslint-rules": "gulp run-eslint-rules-tests",
        "build": "npm run build:compiler && npm run build:tests",
        "build:compiler": "gulp local",
        "build:tests": "gulp tests",
        "start": "node lib/tsc",
        "clean": "gulp clean",
        "gulp": "gulp",
        "lint": "gulp lint",
        "lint:ci": "gulp lint --ci",
        "lint:compiler": "gulp lint-compiler",
        "lint:scripts": "gulp lint-scripts",
        "setup-hooks": "node scripts/link-hooks.js"
    },
    "browser": {
        "fs": false,
        "os": false,
        "path": false,
        "crypto": false,
        "buffer": false,
        "@microsoft/typescript-etw": false,
        "source-map-support": false,
        "inspector": false
    },
    "packageManager": "npm@8.15.0",
    "volta": {
        "node": "14.20.0",
        "npm": "8.15.0"
    }
}

*/