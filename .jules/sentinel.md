## 2024-05-23 - [Version String Parsing Vulnerability]
**Vulnerability:** The version comparison logic in `src/index.ts` failed to correctly parse version strings prefixed with `v` (e.g., `"v10.0.0"`). The `Number()` function would return `NaN` for segments like `"v10"`, leading to incorrect comparison results (often evaluating as equal due to `NaN` comparison behavior).
**Learning:** Naive number parsing of version strings can be dangerous. Standard semver libraries handle this, but custom implementations must be careful. Specifically, `NaN` in comparisons can lead to "fail open" scenarios where a lower version is considered "at least" a higher version because the check returns false for both `<` and `>`, falling through to equality or default cases.
**Prevention:** Always sanitize version strings (strip non-numeric prefixes) before parsing. When implementing custom version comparison, handle `NaN` explicitly or use a robust library. Ensure inputs are validated or normalized.

## 2026-01-15 - [DoS via Long Version Strings]
**Vulnerability:** The `compareTo` function lacked input length validation, exposing the application to Denial of Service (DoS) attacks via excessively long version strings that consume CPU and memory during parsing (e.g., `trim`, `split`).
**Learning:** Seemingly harmless string operations can become vectors for resource exhaustion if input size is unchecked.
**Prevention:** Enforce strict maximum length limits (e.g., `MAX_VERSION_LENGTH`) on all user-controlled inputs before processing them.
