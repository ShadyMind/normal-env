# Normal Env

This project aimed to cover base requirements in work with NODE_ENV environment variable and it equivalent in the other platforms with convenient interface.

## Installation:

With `npm`:

```bash
$ npm i normal-env ( --save-prod | --save-dev )
```

With `yarn`:

```bash
$ yarn add normal-env [ --dev ]
```

## Usage:

### Importing

#### With call require method

```javascript
const { Env } = require("normal-env");
```

#### With import syntax

```javascript
import { Env } from "normal-env";
```

## Run:

### From process.env

```javascript
const env = Env.from(process.env.NODE_ENV);
```

equivalent to:

```javascript
const env = new Env(); // will get from default accessor
```

### From Web StorageAPI

```javascript
const env = Env.from(localStorage.getItem("ENV"));
```

equivalent to:

```javascript
const env = new Env(); // will get from default accessor
```

## Checking:

```javascript
env.isDevelopment();
```

```javascript
env.isTest();
```

```javascript
env.isStage();
```

```javascript
env.isProduction();
```

## Custom environment variables variation map:

```javascript
const env = new Env(undefined, {
  default: "development",
  dev: "development",
  test: "test",
  prod: "production",
});
```

## Definitions:

|   Kind | Member              | Type                     | Description                                             |
| -----: | :------------------ | :----------------------- | :------------------------------------------------------ |
| static | `Env.from`          | `(token: string) => Env` | Gets env as token and create new instance of Env class  |
|        | `Env#toString`      | `() => string`           | Returns normalized environment value                    |
|        | `Env#isCi`          | `() => boolean`          | Returns true if environment variable like `ci`          |
|        | `Env#isDocker`      | `() => boolean`          | Returns true if environment variable like `docker`      |
|        | `Env#isDebug`       | `() => boolean`          | Returns true if environment variable like `debug`       |
|        | `Env#isDevelopment` | `() => boolean`          | Returns true if environment variable like `development` |
|        | `Env#isTest`        | `() => boolean`          | Returns true if environment variable like `test`        |
|        | `Env#isPreview`     | `() => boolean`          | Returns true if environment variable like `preview`     |
|        | `Env#isProduction`  | `() => boolean`          | Returns true if environment variable like `production`  |
