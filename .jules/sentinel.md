## 2024-05-23 - [Version String Parsing Vulnerability]
**Vulnerability:** The version comparison logic in `src/index.ts` failed to correctly parse version strings prefixed with `v` (e.g., `"v10.0.0"`). The `Number()` function would return `NaN` for segments like `"v10"`, leading to incorrect comparison results (often evaluating as equal due to `NaN` comparison behavior).
**Learning:** Naive number parsing of version strings can be dangerous. Standard semver libraries handle this, but custom implementations must be careful. Specifically, `NaN` in comparisons can lead to "fail open" scenarios where a lower version is considered "at least" a higher version because the check returns false for both `<` and `>`, falling through to equality or default cases.
**Prevention:** Always sanitize version strings (strip non-numeric prefixes) before parsing. When implementing custom version comparison, handle `NaN` explicitly or use a robust library. Ensure inputs are validated or normalized.

## 2026-01-03 - [DoS in Version Parsing]
**Vulnerability:** The version comparison logic split strings and iterated over them without length limits. A malicious input with millions of characters could cause high CPU and memory usage (DoS).
**Learning:** String operations like `split` and iterations on user-controlled input must be bounded. Even simple logic can be a DoS vector if input size is unchecked.
**Prevention:** Enforce maximum length limits on string inputs before processing. Fail fast and securely (e.g. return NaN or throw) if limits are exceeded.
