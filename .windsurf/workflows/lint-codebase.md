---
description: Lint and format all code using ESLint and Prettier. Fix errors and warnings, but do not change business logic. Summarize issues fixed and files changed.
---

## Lint and Format Codebase Workflow

**Objective:**  
Standardize code style and quality using ESLint and Prettier across the entire project.

### Rules:
1. Run ESLint and Prettier on all code files (JS, TS, JSX, TSX).
2. Automatically fix all fixable errors and warnings.
3. Do not modify business logic, only style, syntax, and formatting.
4. For unresolved lint issues, add comments and suggest solutions.
5. Maintain consistent formatting and readability.

### Output:
- List of files modified, grouped by type of issue fixed.
- Summary of remaining unresolved lint errors (if any).
- One-sentence summary of the lint/format pass.

**Example summary:**  
> Linted and formatted 25 files, fixed all warnings, and added comments for 2 unresolved issues.
