---
description: Audit all React components for unused props, redundant logic, missing error handling, and opportunities for hooks/context. Suggest improvements and summarize findings.
---

## React Component Audit Workflow

**Objective:**  
Review and improve all React components for code quality, maintainability, and best practices.

### Rules:
1. Identify and flag unused props and dead code in each component.
2. Check for unnecessary re-renders and recommend use of React.memo or useCallback where beneficial.
3. Ensure proper error handling in all components (try/catch, error boundaries as needed).
4. Recommend or implement use of React hooks or context API for state management where appropriate.
5. Look for opportunities to simplify and modularize large or complex components.
6. Maintain clear, concise, and well-commented code.

### Output:
- Summary table or bullet list of findings.
- Specific recommendations for each issue found.
- One-sentence summary of the audit.

**Example summary:**  
> Found and removed 3 unused props, refactored to use hooks, and improved error handling in all components.
