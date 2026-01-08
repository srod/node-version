## 2024-05-22 - Optimizing version string parsing
**Learning:** For simple string parsing like version numbers, manual `charCodeAt` loops are significantly faster (approx 5x) than using `replace`, `split`, `Regex`, and `Number()` casts, primarily due to avoiding allocations.
**Action:** Use manual parsing for hot-path string operations where strict structure is guaranteed or easy to validate.
