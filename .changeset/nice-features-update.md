---
"node-version": minor
---

- feat: Add `toString()` method to `NodeVersion` object for better DX.
- perf: Optimize version comparison by pre-calculating numeric segments.
- fix: Properly handle 'v' prefix (case-insensitive) and non-numeric segments in version strings.
