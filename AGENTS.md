# AGENTS.md

Project-level instructions for agents working on `music-test` from this Codex workspace.

This project is a music-preference personality test site. The product should infer playful, explainable personality results from a user's listening habits, music taste, artist preferences, listening scenes, and related choices. It should feel closer to an interactive personality test than a clinical assessment.

At the start of every new task for this project, read this file before acting.

## Project Purpose

- Build `music-test`, a website for music-based personality testing.
- The test asks questions such as what songs a user listens to, which singers or bands they like, how long they listen each day, what scenes they listen in, how they discover music, and what emotions or aesthetics they prefer.
- The result should map music taste into a clear personality-style outcome with a memorable name, explanation, tags, strengths, possible blind spots, and shareable summary.
- The site may take inspiration from ACGTI, SBTI, MBTI-style sites, and other personality-test projects, but must not copy their branding, result taxonomy, questions, copy, scoring, or UI directly.
- Treat the result as entertainment and self-reflection, not medical, psychological, hiring, school, or diagnostic advice.

## Reference Projects

Use these only as references for product shape, routing, deployment habits, and backend/admin patterns:

- `tianxingleo/ACGTI`: anime/community-style personality testing reference.
- `UnluckyNinja/SBTI-test`: SBTI-style test reference.
- `https://acgti.tianxingleo.top/`, `https://sbti.unun.dev/`, and `https://mbti.mobi/`: public personality-test UX references.
- `YiRanLi333/yiranli-platform`: important reference for backend style, visitor/person access, ID lookup, admin patterns, and NAS deployment habits.

When internet access is available, agents may research additional music/personality-test references. Keep research notes factual and do not import copyrighted text, question sets, result descriptions, or protected assets.

## Expected Product Shape

- A public test flow with polished question screens, progress, answer persistence, and a result page.
- A result model that is explainable: every result should be traceable to answer dimensions or scoring weights.
- Stable result IDs or slugs so users can revisit or share a result page.
- Backend storage for submissions, result lookup, visitor or access records, and future admin review.
- Admin or internal tooling can be modeled after `yiranli-platform`, especially for visit tracking, ID lookup, and content/result management.
- The initial version should prioritize a complete, coherent test loop over too many result types.

## Question And Scoring Principles

- Design questions around music behavior, preference, discovery, emotion, social listening, collection habits, live/performance interest, rhythm/lyrics focus, nostalgia, and openness to new genres.
- Avoid invasive demographic questions unless they directly serve the product and are optional.
- Avoid implying that one music taste is superior to another.
- Keep scoring transparent enough that future agents can debug why a user received a result.
- Prefer a small set of dimensions first, such as energy, novelty, emotionality, sociality, lyric-focus, genre-breadth, nostalgia, and routine-vs-exploration.
- Make result copy warm, specific, and non-judgmental. Do not write generic horoscope filler.

## Stack And Architecture Direction

- The exact stack is not finalized yet. Before implementation, inspect the repository and any project plan/spec files.
- Prefer architecture compatible with NAS deployment and GitHub push workflows.
- Use `yiranli-platform` as a backend reference when implementing visitor access, ID lookup, admin behavior, persistence, deployment, or operational conventions.
- Keep frontend, backend, scoring logic, and content data clearly separated.
- Keep scoring definitions in structured data or well-named modules, not buried inside UI components.
- Write code so questions/results can be edited without changing unrelated UI or backend logic.

## NAS And Deployment Rules

- The user prefers not to run this project locally. Assume normal development and verification may happen on the NAS once the remote project exists.
- Do not assume this Windows folder is the production source of truth after NAS deployment is established. Read the current NAS files before remote edits.
- Use explicit SSH for NAS work when relevant:

```bash
ssh -i "$HOME/.ssh/id_ed25519_yiranli_nas" -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=8 YiyiYi@192.168.10.12
```

- In Codex on Windows, non-escalated SSH may fail to read the key. If so, request escalation and retry with the explicit key.
- Avoid unsafe PowerShell to SSH writes. Do not send raw Chinese text, long templates, JSON, SQL, Vue/React files, or env content through inline remote shell scripts.
- Prefer byte-safe editing paths such as repository edits, UTF-8 upload, base64 transfer, or remote patch files that are verified before use.
- Never print, commit, or expose secrets, tokens, cookies, private keys, `.env` files, `.pem` files, or `.key` files.

## GitHub And Push Rule

- This repository may not have a GitHub remote yet. Before pushing, inspect `git remote -v`.
- When the GitHub repository is created, use the intended project repository remote, likely under `YiRanLi333`, unless the user specifies another owner/name.
- After any completed task that changes source, docs, deployment config, data definitions, or other tracked project files:
  1. Run verification appropriate to the risk level. Docs-only changes may use inspection.
  2. Inspect `git status --short`.
  3. Stage only intended files.
  4. Confirm no secrets, local env files, dependencies, private keys, build artifacts, or generated output directories are staged.
  5. Commit with a concise message describing the actual change.
  6. Push to GitHub when a remote exists and the user has not said to avoid pushing.

## Skill Behavior

- If `using-superpowers` is available, use it for project-start, workflow, NAS, deployment, or cross-project-reference work.
- If `taste-skill` / `design-taste-frontend` is available and the task involves frontend, UI, animation, visual polish, landing/result pages, or redesign, use it before design or implementation.
- If those skills are unavailable in a future session, manually follow their relevant rules: read project instructions first, infer the design direction before building, avoid generic AI-looking UI, respect NAS safety, and verify before claiming completion.
- Do not install or pull skills into the project repository unless the user explicitly asks. Installed Codex skills should normally live under the Codex skills directory, not inside application source.

## Frontend Product Direction

- Build the actual test experience as the first screen, not a marketing landing page, unless the user explicitly asks for a landing page.
- Personality-test UI should feel polished, musical, and interactive, but not noisy or template-like.
- Use visual assets or generated bitmap assets when building public-facing pages. Avoid pure text-only minimalism for final UI.
- Make question controls ergonomic: single choice, multi-choice, sliders, ranking, search/select for artists or genres, and clear progress states where appropriate.
- Result pages should be shareable and visually distinctive, with stable layout on mobile and desktop.
- Do not use visible instructional filler explaining obvious UI mechanics.
- Keep accessibility in mind: keyboard navigation, focus states, contrast, reduced-motion behavior, and readable mobile text.

## Backend And Data Rules

- Store submissions and results with enough metadata to support lookup, debugging, analytics, and abuse prevention.
- Do not store more personal data than needed for the test.
- If user identity, visitor IDs, access logs, or admin lookup are implemented, follow the safer patterns from `yiranli-platform` where applicable.
- Result generation must be deterministic for the same submitted answers unless a deliberate random seed is stored.
- Keep migrations, schemas, and seed data explicit and reviewable.

## Testing And Verification

- For docs-only edits, inspect the rendered/changed Markdown and run `git diff --check` when useful.
- For scoring changes, add or update focused tests that prove representative answer sets produce expected dimensions/results.
- For backend changes, test persistence, lookup, validation, and error cases.
- For frontend changes, verify desktop and mobile layouts, question flow, result rendering, loading, empty, and error states.
- Before saying a NAS deployment is fixed or live, verify the running service, logs, and the relevant public URL.

## User Preference Rules

- If the user says in Chinese or English that they do not want edits yet, want text first, or want a plan first, do not edit yet. Explain the plan and wait for approval.
- If the user asks for direct action, proceed end to end: inspect, edit safely, verify, commit, push when configured, and report the result.
- The user often wants practical execution rather than long theory. Keep updates concise and keep moving once the direction is clear.

## Future Agent First-Step Checklist

1. Read this `AGENTS.md`.
2. Inspect the current repository files and `git status --short`.
3. Check `git remote -v` before assuming GitHub push is configured.
4. If NAS work is involved, inspect the current NAS source before editing.
5. If using `yiranli-platform` as a reference, read its current project instructions and relevant backend/admin files before copying patterns.
6. If frontend/result-page work is involved, apply `taste-skill` or its equivalent design rules.
7. Then act according to the newest user request.
