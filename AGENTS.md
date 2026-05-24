## React structure rules

- Do not put page UI or business logic in `main.jsx`.
- `main.jsx` must only bootstrap React and render `<App />`.
- Keep `App.jsx` small: routing/layout composition only.
- Create reusable components under `src/components/`.
- Create page-level components under `src/pages/`.
- Put hooks in `src/hooks/`.
- Put mock/sample data in `src/data/`.
- Put utility functions in `src/lib/` or `src/utils/`.
- Prefer splitting large JSX blocks into named components.
- If a file grows beyond ~150 lines, consider splitting it.

## UI style rules
Avoid generic AI/SaaS design:
- no gradients unless explicitly requested
- no floating glassmorphism cards by default
- no oversized hero sections with vague marketing copy
- no random emoji/icon decorations
- no perfectly symmetrical template layouts

Prefer realistic product UI:
- use compact spacing and information density
- design around real user tasks, not decoration
- use restrained typography: 2-3 font sizes max per section
- use neutral colors with one subtle accent
- include empty/loading/error states
- make components look like they belong to an actual app
- copy should be specific, not marketing fluff
