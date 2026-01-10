## 2026-01-03 - Version String Parsing Optimization
**Learning:** For hot-path string parsing like version comparison, simple char-by-char iteration with `charCodeAt` is significantly faster (~4x-10x) and allocation-free compared to `regex` + `split` + `Number()`.
**Action:** When optimizing low-level parsers, prioritize manual iteration over convenience methods like `split` or `replace`.
