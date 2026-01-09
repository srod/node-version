# Palette's Journal

## 2026-01-03 - Documenting Fail-Closed Behavior
**Learning:** For utility libraries, explicitly documenting "fail-closed" behavior (returning false/undefined instead of throwing) is a critical DX improvement, as users might assume validation errors throw.
**Action:** Always check edge case return values and ensure they are documented in JSDoc/TSDoc.
