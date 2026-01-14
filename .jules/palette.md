## 2026-01-03 - API Consistency and Documentation
**Learning:** In this library, the `is()` comparison method performs strict equality checks (expecting exact matches) while other methods like `isAtLeast()` normalize inputs (handling 'v' prefixes). This inconsistency is a potential "gotcha" for developers consuming the API.
**Action:** When designing or maintaining API surfaces with comparison logic, ensure consistent input handling across all methods, or explicitly document deviations in JSDoc to prevent developer confusion.
