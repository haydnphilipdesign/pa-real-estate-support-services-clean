---
description: Refactor styles to use only Tailwind CSS utility classes. Remove all inline and external CSS that can be replaced by Tailwind. Summarize and comment on any styles that can’t be migrated.
---

## Tailwind-Only Refactor Workflow

**Objective:**  
Convert all styling for the specified component, page, or project section to use **only Tailwind CSS utility classes**.

### Rules:
1. Refactor all inline and external CSS to equivalent Tailwind utility classes.
2. Remove any legacy, inline, or external CSS that can be replaced by Tailwind.
3. If a style cannot be fully migrated to Tailwind, add a comment explaining why.
4. Keep markup clean—do not leave unused `className` attributes or remnants of old styles.
5. Maintain semantic and accessible HTML.

### Output:
- Updated component or page using Tailwind only.
- List of any remaining non-Tailwind styles with reasons.
- One-sentence summary of changes.

**Example summary:**  
> Migrated all styling to Tailwind, removed legacy CSS, and added accessibility improvements.
