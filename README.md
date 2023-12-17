![Normal Env](./docs/images/w-logo.svg#gh-dark-mode-only)
![Normal Env](./docs/images/b-logo.svg#gh-light-mode-only)

[![npm version](https://badge.fury.io/js/normal-env.svg)](https://badge.fury.io/js/normal-env)
[![install size](https://packagephobia.com/badge?p=normal-env@0.1.5)](https://packagephobia.com/result?p=normal-env@0.1.5)

This project aimed to cover base requirements in work with NODE_ENV environment variable and it equivalent in the other platforms with convenient interface.

## Installation:

With `npm`:

```bash
$ npm i normal-env --save-prod ( --save-dev )
```

With `yarn`:

```bash
$ yarn add normal-env [ --dev ]
```

## Usage
```javascript
import { Env } from 'normal-env';

const env = new Env();
const config = fs.readFileSync(`db.${env}.json`).toString();
const connection = db.createConnection({
  ...config,
  debug: env.isDevelopment()
})
```
## What happined here?

* We import named class "Env" (not default exported). It will take data from your environment based on your system (web, node.js, deno or bun);
* Make an instance of this class;
* It can serialize to string so we put it in filename to read. (check config keys in [this file](./src/constants.ts) to find possible variations);
* We put config to abstract database client connection method and extends it with debug property and check is environment in development as a value;

## How it work from terminal?
```bash
$ node ./server.js
```
will set environment to default value "development"

```
$ set NODE_ENV=tst
$ node -r "normal-env" -p "new Env().toString()"
> test
```
will set environment to "test" value

```
$ set NODE_ENV=prod
$ node -r "normal-env" -p "new Env().toString()"
> production
```
will set environment to "production" value

```
$ set NODE_ENV=ci
$ node -r "normal-env" -p "new Env().toString()"
> ci
```
will set environment to "ci" value
