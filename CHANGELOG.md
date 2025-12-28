# node-version

## 4.0.2

### Patch Changes

- 7d02149: test: verify OIDC publishing with fixed workflow config

## 4.0.1

### Patch Changes

- e09df4a: test: verify npm trusted publishing with OIDC

## 4.0.0

### Major Changes

- # v4.0.0

  ## Breaking Changes

  - **ESM Only**: The package is now pure ESM. CommonJS support has been dropped.

  ## New Features

  - **Enhanced Version Comparison**: Added `isAtLeast`, `is`, `isAbove`, `isBelow`, and `isAtMost` methods.
  - **LTS Support**: Added `isLTS` and `ltsName` to identify Long Term Support releases.
  - **EOL Support**: Added `isEOL` to check if the current Node.js version has reached End-of-Life.
  - **Improved Types**: Added exported `NodeVersion` interface for better TypeScript integration.
  - **Direct Export**: Added a `version` constant as a default-like export for easier access.

  ## Tooling & Infrastructure

  - Modernized build system using `tsdown`.
  - Integrated `changesets` for automated releases.
  - Switched to `biome` for unified linting and formatting.
  - Updated `tsconfig` to modern standards.
