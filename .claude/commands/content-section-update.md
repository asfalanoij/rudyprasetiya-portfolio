---
name: content-section-update
description: Workflow command scaffold for content-section-update in rudyprasetiya-portfolio.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /content-section-update

Use this workflow when working on **content-section-update** in `rudyprasetiya-portfolio`.

## Goal

Add or update major content sections such as Experience, Projects, Skills, Certifications, or About in the portfolio.

## Common Files

- `index.html`
- `js/main.js`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit index.html to add or update the relevant section (Experience, Projects, Skills, About, etc.)
- Optionally update js/main.js if interactive behavior or dynamic content is needed (e.g., expandable cards, typing animation).

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.