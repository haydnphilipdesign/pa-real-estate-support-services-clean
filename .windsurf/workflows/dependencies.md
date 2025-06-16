---
description: Check package.json for outdated dependencies. Suggest safe updates, summarize breaking changes, and update package.json where appropriate.
---

## Automated Dependency Update Workflow

**Objective:**  
Keep dependencies current and secure by checking for and recommending updates.

### Rules:
1. Review `package.json` for outdated dependencies.
2. For each, check for breaking changes in new versions and summarize risks.
3. Recommend which dependencies can be safely updated.
4. Output an updated `package.json` (or a patch) for safe upgrades.
5. Flag any dependencies that need user review before updating.

### Output:
- List of outdated dependencies and suggested upgrades.
- Summary of breaking changes for each.
- Updated package.json or diff for safe updates.
- One-sentence summary of what was updated.

**Example summary:**  
> Updated 5 dependencies, flagged 2 major upgrades for review, and output updated package.json.
