---
description: Automatically stage, commit, and push all changes with a descriptive summary. Warn if there are temp or backup files before committing.
---

## Quick Git Commit and Push Workflow

**Objective:**  
Automate version control hygiene by committing and pushing all changes safely and descriptively.

### Rules:
1. Stage all changes in the repository.
2. Generate a clear, descriptive commit message summarizing the changes.
3. Check for any uncommitted temporary, backup, or old files (e.g., *.bak, backup, temp).
   - If found, list them and prompt for review before committing.
4. Push the commit to the current branch.
5. Confirm successful push and provide a summary.

### Output:
- Commit message used.
- List of temp/backup files detected, if any.
- Confirmation of successful push.

**Example summary:**  
> Committed all changes (“Refactored CSS and updated components”), no backup files detected, pushed to main.
