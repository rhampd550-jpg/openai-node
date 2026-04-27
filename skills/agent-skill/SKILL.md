---
name: agent-skill
description: Create or update reusable AI agent skills that follow Codex skill conventions, including a valid SKILL.md, optional scripts/references/assets, and consistent agents/openai.yaml metadata. Use when a user asks to add, improve, or maintain an agent skill in a repository.
---

# Agent Skill

## Overview

Create skill folders that are compact, reusable, and easy for another agent to execute.
Prefer minimal instructions in `SKILL.md` and move detailed material into `references/` only when needed.

## Workflow

1. Confirm the skill goal from the user request and choose a short hyphenated skill name.
2. Initialize the skill structure with `init_skill.py` (or update an existing folder if it already exists).
3. Write `SKILL.md` with:
   - precise `name`
   - trigger-focused `description` (what it does + when to use it)
   - concise operational steps in imperative form
4. Add resource folders only when they provide repeatable value:
   - `scripts/` for deterministic, repeatable automation
   - `references/` for long or specialized documentation
   - `assets/` for templates or files copied into outputs
5. Ensure `agents/openai.yaml` reflects the skill’s intent and prompt.
6. Validate with `quick_validate.py` and fix any issues before finalizing.

## Authoring Rules

- Keep `SKILL.md` focused on execution, not background theory.
- Avoid creating extra docs like README/CHANGELOG unless explicitly requested.
- Keep variant-specific details in separate reference files and link them from `SKILL.md`.
- Prefer scripts over large inline code blocks when the same logic is reused.
- Remove placeholder TODO text before finishing.

## Validation

Run:

```bash
python /opt/codex/skills/.system/skill-creator/scripts/quick_validate.py <path-to-skill>
```

Do not finalize until validation passes.
