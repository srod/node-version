# Palette's Journal

## 2026-01-01 - strict vs loose comparison confusion
**Learning:** Developers might assume `is()` behaves like `isAtLeast()` regarding normalization (e.g. stripping 'v' prefix), but it performs strict equality. This is a potential DX pitfall.
**Action:** Explicitly document the strictness of `is()` and the fail-closed behavior of comparison methods in JSDoc to prevent confusion.
