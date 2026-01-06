[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![GitHub Actions][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]

# node-version

A lightweight utility to get the current Node.js version parsed into a structured object.

## Features

- 🚀 **Fast and Lightweight**: Barely any overhead.
- 📦 **ESM Only**: Built for modern environments.
- 🛠️ **TypeScript Ready**: Full type definitions included.
- 📅 **LTS & EOL Checks**: Identify LTS releases and End-of-Life versions.
- 🚦 **Comparison Helpers**: `is()`, `isAtLeast()`, `isAbove()`, `isBelow()`, `isAtMost()` checks.

## Installation

```shell
# Using npm
npm install node-version

# Using Yarn
yarn add node-version

# Using pnpm
pnpm add node-version

# Using Bun
bun add node-version
```

## Quick Start

```js
import { version } from 'node-version';

console.log(version);
/*
{
    original: 'v20.10.0', // same as process.version
    short: '20.10',
    long: '20.10.0',
    major: '20',
    minor: '10',
    build: '0',

    isAtLeast: [Function],
    isAbove: [Function],
    isBelow: [Function],
    isAtMost: [Function],
    is: [Function],
    isLTS: true, // or false
    ltsName: 'Iron', // or undefined
    isEOL: false // or true
}
*/
```

## API Reference

### `version`

The pre-instantiated version object for the current process.

### `getVersion()`

Returns a new `NodeVersion` object representing the current process version.

```ts
import { getVersion } from 'node-version';
const v = getVersion();
```

### `NodeVersion` Object

| Property | Type | Description |
| :--- | :--- | :--- |
| `original` | `string` | The version string prefixed with 'v' (e.g., 'v20.10.0'). |
| `short` | `string` | The major and minor version (e.g., '20.10'). |
| `long` | `string` | The full version string (e.g., '20.10.0'). |
| `major` | `string` | The major version number. |
| `minor` | `string` | The minor version number. |
| `build` | `string` | The build/patch version number. |
| `isAtLeast(version)` | `(v: string) => boolean` | Checks if the current version is ≥ the specified version. |
| `isAbove(version)` | `(v: string) => boolean` | Checks if the current version is > the specified version. |
| `isBelow(version)` | `(v: string) => boolean` | Checks if the current version is < the specified version. |
| `isAtMost(version)` | `(v: string) => boolean` | Checks if the current version is ≤ the specified version. |
| `is(version)` | `(v: string) => boolean` | Checks if the current version is exactly the specified version. |
| `isLTS` | `boolean` | `true` if the current version is an [LTS release](https://github.com/nodejs/release#release-schedule). |
| `ltsName` | `string` | The LTS codename (e.g., 'Iron') or `undefined`. |
| `isEOL` | `boolean` | `true` if the current version is past its [End-of-Life date](https://github.com/nodejs/release#end-of-life-releases). |

## Compare Versions

```js
import { version } from 'node-version';

if (version.isAtLeast('20.0.0')) {
  console.log('Running on Node.js 20 or newer');
}

if (version.is('22.0.0')) {
  console.log('Running on exactly Node.js 22.0.0');
}

if (version.isAbove('20.0.0')) {
  console.log('Running on Node.js strictly above 20.0.0');
}

if (version.isBelow('22.0.0')) {
  console.log('Running on Node.js strictly below 22.0.0');
}
```

## ESM Requirements

This package is **ESM-only** and requires **Node.js 20+**.

If you need CommonJS support, use `node-version@3`:

```shell
npm install node-version@3
```

## Development

### Scripts

- `bun run build`: Build the project using `tsdown`.
- `bun run test`: Run tests using `vitest`.
- `bun run lint`: Run linting checks using `biome`.
- `bun run format`: Format the code using `biome`.
- `bun run check-exports`: Verify package exports are correct.

### Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
# Prepare a new version (updates changelog and package.json)
bun run changeset:version

# Publish to NPM
bun run changeset:release
```

## License

MIT

[npm-version-image]: https://img.shields.io/npm/v/node-version.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/node-version.svg
[npm-url]: https://npmjs.org/package/node-version
[github-actions-image]: https://github.com/srod/node-version/workflows/Release/badge.svg
[github-actions-url]: https://github.com/srod/node-version/actions
[codecov-image]: https://codecov.io/gh/srod/node-version/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/srod/node-version
