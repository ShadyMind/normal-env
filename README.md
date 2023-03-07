# Normal Env

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
  debug: config.isDevelopment()
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
$ NODE_ENV=tst ./server.js
```
will set environment to "test" value

```
$ NODE_ENV=prod ./server.js
```
will set environment to "production" value

```
$ NODE_ENV=ci ./server.js
```
will set environment to "ci" value
