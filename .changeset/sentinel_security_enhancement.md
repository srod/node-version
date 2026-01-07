---
"node-version": patch
---

Security: Enforce maximum version string length of 256 characters to prevent potential ReDoS/DoS vectors.
Security: Optimize version validation by replacing regex with character code checks.
