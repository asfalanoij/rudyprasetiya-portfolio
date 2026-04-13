---
name: visual-style-enhancement
description: Workflow command scaffold for visual-style-enhancement in rudyprasetiya-portfolio.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /visual-style-enhancement

Use this workflow when working on **visual-style-enhancement** in `rudyprasetiya-portfolio`.

## Goal

Enhance or refactor the visual appearance of the site, such as moving inline styles to CSS, adding new CSS classes, or updating animations.

## Common Files

- `css/style.css`
- `index.html`
- `js/main.js`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit css/style.css to add or update styles, animations, or classes.
- Edit index.html to remove inline styles, apply new classes, or update structure for styling.
- Optionally update js/main.js if script-driven visual effects are involved.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.