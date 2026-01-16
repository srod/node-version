## 2024-05-23 - [Version String Parsing Vulnerability]
**Vulnerability:** The version comparison logic in `src/index.ts` failed to correctly parse version strings prefixed with `v` (e.g., `"v10.0.0"`). The `Number()` function would return `NaN` for segments like `"v10"`, leading to incorrect comparison results (often evaluating as equal due to `NaN` comparison behavior).
**Learning:** Naive number parsing of version strings can be dangerous. Standard semver libraries handle this, but custom implementations must be careful. Specifically, `NaN` in comparisons can lead to "fail open" scenarios where a lower version is considered "at least" a higher version because the check returns false for both `<` and `>`, falling through to equality or default cases.
**Prevention:** Always sanitize version strings (strip non-numeric prefixes) before parsing. When implementing custom version comparison, handle `NaN` explicitly or use a robust library. Ensure inputs are validated or normalized.

## 2024-05-23 - [DoS via Unbounded Version Strings]
**Vulnerability:** The `compareTo` function allowed unbounded version strings. Maliciously crafted long strings (e.g., 100k+ chars) could cause CPU/Memory exhaustion during splitting and looping, leading to Denial of Service in synchronous environments.
**Learning:** Utility libraries often assume reasonable input. In security-sensitive contexts (like server validation), assumptions must be enforced. "Fail fast" checks (like length limits) are cheap and effective against resource exhaustion attacks.
**Prevention:** Enforce strict limits on input size for parsing functions. For version strings, 256 characters is generous but safe. Return `NaN` or invalid status early to avoid processing cost.
