# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-03
**Stack:** Node.js (20+), TypeScript, Bun, Biome, Vitest, tsdown, Changesets

## OVERVIEW
Lightweight utility to parse, compare, and check Node.js versions (LTS/EOL). 
**ESM-only**. Zero dependencies.

## STRUCTURE
```
.
├── src/
│   ├── index.ts        # Main entry point (logic + exports)
│   ├── types.ts        # Type definitions
│   └── index.test.ts   # Co-located tests
├── .changeset/         # Versioning & release management
├── .github/workflows/  # CI (test.yml, release.yml)
├── biome.json          # Linter/formatter config
├── tsdown.config.ts    # Build config
└── package.json
```

## CODE MAP
| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `getVersion` | Function | `src/index.ts` | Returns parsed `NodeVersion` object for current process. |
| `NodeVersion` | Interface | `src/types.ts` | Structure of version object (major, minor, methods). |
| `EOL_DATES` | Const | `src/index.ts` | Map of Major Version -> End of Life Date. |
| `isAtLeast` | Method | `src/index.ts` | Check if current version >= target. |
| `isLTS` | Prop | `src/index.ts` | Boolean, true if current release is LTS. |

## CONVENTIONS
- **Package Manager**: `bun` (Strictly used for install/run).
- **Linter/Formatter**: `biome`. 4 spaces, double quotes, no semicolons (check biome.json).
- **Build**: `tsdown`. Outputs ESM only to `dist/`.
- **Testing**: `vitest`. Tests co-located with source (`*.test.ts`).
- **Releases**: `changesets`. PRs must include a changeset file.

## COMMANDS
```bash
# Install
bun install

# Development
bun run build         # Build with tsdown
bun run test          # Run vitest
bun run typecheck     # tsc --noEmit
bun run check-exports # Validate package exports (attw)

# Code Quality
bun run lint          # Biome lint
bun run format        # Biome format write

# Release
bun run changeset          # Generate changeset for PR
bun run changeset:version  # Bump versions
bun run changeset:release  # Publish to npm
```

## NOTES
- **ESM Only**: Requires `type: module` in consumer or `.mjs`.
- **Node Support**: Engines set to `>=20.0.0`.
- **Versioning**: strictly semantic. Uses `.changeset` for changelog generation.
- **Security**: Version comparison handles `v` prefixes and validates inputs strictly.
