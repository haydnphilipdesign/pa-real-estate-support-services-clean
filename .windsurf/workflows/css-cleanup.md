---
description: Clean up and consolidate all CSS. Remove duplicates, unused styles, and obsolete files. Do not create new stylesheets. Ensure consistent naming and summarize changes when done.
---

## CSS Cleanup and Consolidation Workflow

**Objective:**  
Systematically clean up all CSS in the project for maintainability, consistency, and clarity.

### Rules:
1. **Do NOT create new CSS files** unless specifically instructed.
2. **Consolidate all CSS** into the existing main stylesheet(s) where possible.
3. **Remove:**
   - Duplicate classes or rules.
   - Obsolete or unused styles and selectors.
   - Commented-out legacy code and backup CSS blocks.
4. **No backup, copy, or old files:**  
   Never create or leave files named “backup”, “old”, “copy”, etc.
5. **Consistent naming:**  
   Use a clear, project-wide naming convention for classes and selectors (e.g., BEM or specified convention).
6. **After cleanup:**  
   - Leave clear comments above any major changes or removals.
   - At the top of the stylesheet, add a brief summary of what was changed.
7. **If unsure** where a style belongs or if it is needed, prompt the user for clarification.

### Output:
- A single, cleaned-up CSS file (or the original files improved).
- One-sentence summary of what was changed, added, or removed.
- Any questions or suggestions for further cleanup.

---

**Example summary:**  
> Removed 14 unused classes, merged duplicate button styles, and deleted obsolete “temp” file. All styles now consolidated in `main.css`.

