---
description: Refactor TypeScript code to enforce strict typing. Remove all implicit “any” and add explicit types where missing. Summarize updates and flag unclear areas.
---

## Strict TypeScript Enforcement Workflow

**Objective:**  
Ensure strict typing across all TypeScript code, eliminating implicit `any` and enforcing clear type safety.

### Rules:
1. Search all TypeScript files for implicit `any` types and add explicit types.
2. Update all function parameters, return values, and variables with proper type annotations.
3. If context for a type is unclear, flag it and prompt for clarification.
4. Refactor any unsafe type assertions to safer alternatives.
5. Maintain or improve code readability and structure during updates.

### Output:
- List of files and lines where types were added or clarified.
- Questions for the user if additional context is needed.
- One-sentence summary of changes.

**Example summary:**  
> Added explicit types to 7 files, removed all implicit `any`, and improved function signatures.
