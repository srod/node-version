## 2026-01-03 - [API Consistency Trap]
**Learning:** Inconsistent strictness in API methods (`is` vs `isAtLeast`) creates a hidden trap for users. `isAtLeast` normalizes inputs (strips 'v'), but `is` uses strict equality without normalization.
**Action:** Explicitly document strictness in JSDoc to warn users and clarify invalid input behavior.
