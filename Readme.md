[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![GitHub Actions][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]

# Node-version

A quick module that returns current node version parsed into parts.

## Installation

```shell
npm install node-version
# Or Yarn
yarn add node-version
# Or pnpm
pnpm add node-version
```

## Quick Start

```js
import { version } from 'node-version';

/*
console.log(version);

{
    original: 'v0.4.10', // same as process.version
    short: '0.4',
    long: '0.4.10',
    major: '0',
    minor: '4',
    build: '10'
}
*/
```

## Compare Versions

You can check if the current Node.js version is at least a specific version or exactly matches a version:

```js
import { version } from 'node-version';

if (version.isAtLeast('20.0.0')) {
  console.log('Running on Node.js 20 or newer');
}

if (version.is('20.10.0')) {
  console.log('Running on Node.js 20.10.0');
}
```

## Warning

### Version 4.0.0 (ESM-only)

Starting with v4.0.0, this package is **ESM-only** and requires **Node.js 20+**.

```js
// ESM (v4+)
import { version } from 'node-version';
```

If you need CommonJS support, use v3.x:

```shell
npm install node-version@3
```

### Version 1.0.0

Version 1.0.0 break 0.1.0 since its API changes.

Change

```js
var currentVersion = new (require('node-version').version)();
```

To

```js
var currentVersion = require('node-version');
```

## How to publish

To publish a new version, you can use the following commands:

```bash
# For a latest release
bun run publish-latest

# For a beta release
bun run publish-beta
```

Note: Replace `xxx` with your OTP in the `package.json` if needed, or set it via environment variable.

## License

MIT

[npm-version-image]: https://img.shields.io/npm/v/node-version.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/node-version.svg
[npm-url]: https://npmjs.org/package/node-version
[github-actions-image]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsrod%2Fnode-version%2Fbadge%3Fref%3Dmain&style=flat
[github-actions-url]: https://github.com/srod/node-version/actions
[codecov-image]: https://codecov.io/gh/srod/node-version/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/srod/node-version
