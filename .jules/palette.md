# Palette's Journal

## 2026-01-03 - Documenting Fail-Closed Behaviors
**Learning:** In utility libraries, "fail-closed" behavior (returning false for invalid inputs) is excellent for security but can be confusing for developers if not documented. Users might assume a "garbage" version string throws an error, but instead it silently returns false.
**Action:** Always explicitly document the return value for invalid/edge-case inputs in JSDoc, especially when the behavior is "silent failure" rather than throwing an exception.
