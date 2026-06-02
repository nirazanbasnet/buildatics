# Skill Rules — How Claude (and Cursor) MUST behave in this repo

These are meta-rules. They govern **how** changes are made, not what the code looks like (see `frontend.md`, `design.md` for that).

## The five non-negotiables

1. **Do exactly what was asked. Nothing more.**
   - No drive-by refactors. No "while I was here, I also …". No "I noticed X and fixed it too."
   - If you see something that needs fixing, *mention it in the response*, don't fix it.
   - A bug fix is a bug fix. A formatting pass is a formatting pass. They don't combine.

2. **No hallucination.**
   - Don't reference APIs, props, exports, or files you haven't read.
   - Don't invent library functions. If you're unsure of an API, fetch docs via Context7 MCP (`mcp__claude_ai_Context7__query-docs`) or grep the codebase.
   - Don't assume folder/file paths exist. Check with `ls` or `Read` first.

3. **No new dependencies without asking.**
   - The `package.json` is already large. Propose, then install with `bun add` only after approval.
   - Same for dev dependencies, even small ones.

4. **No destructive operations without explicit confirmation.**
   - Never `rm -rf`, never `git push`, never `git reset --hard`, never `git --force`, never `--no-verify`.
   - Never delete a `templates/{feature}/` folder without confirming.
   - Never edit `/components/` (root UI kit) — it is read-only reference.

5. **Stop when the task is done.**
   - Don't continue improving past the request.
   - Don't write tests unless tests were requested.
   - Don't write docs unless docs were requested.
   - Don't reformat files you didn't otherwise touch.

## How to scope a change

Before writing any code, answer in your head:
- **What file(s) does this change touch?** If the answer is "more than 3 and the task didn't say so," stop and ask.
- **Does this require a new abstraction (helper, hook, component)?** If yes, can the task be done without it? Prefer inline / duplicated code over premature abstraction.
- **Does this require a new dependency?** If yes, stop and ask.
- **Does this touch the root `/components/` UI kit?** Only edit root for kit-level changes (a new shadcn primitive, a bug in a shared primitive). For production tweaks limited to one feature/route, copy from `components/...` → `src/components/...` and import via `@src/components/...`.

## Where new code goes

Use the decision tree in `agent/structure.md` §"Decision tree". When in doubt, choose the narrower scope:
- Single route → `src/app/{route}/_components/`
- One feature, multiple routes → `src/features/{name}/`
- Truly generic → `src/components/`
- Design exploration → `templates/{name}/`

## How to handle ambiguity

1. **Ask a clarifying question** using `AskUserQuestion` when:
   - The folder for new code isn't obvious from the task.
   - A new dependency would be needed.
   - The change crosses zones (e.g., touches both root `/components/` and `src/`).
   - A "small" refactor would change more than 3 unrelated files.

2. **Don't ask** about:
   - Code style (rules are in this folder).
   - Where a token comes from (rules are in `design.md`).
   - Whether to write tests (default: no, unless asked).

## Templates workflow (recap, see `agent/templates.md`)

- Build experiments in `templates/{feature}/`. Multiple variants encouraged.
- Don't import from `templates/` in `src/`. Ever.
- Promotion is manual. Run the checklist in `docs/component-checklist.md`.
- Don't auto-delete templates — they are useful design references.

## Tooling

- Package manager: **Bun**. Use `bun add`, `bun run dev`, `bun run lint`.
- Pre-commit: Husky → lint-staged → ESLint + Prettier. Don't bypass.
- Lint must pass before "done." Run `bun run lint` before reporting completion.

## Communicating to the user

- Short updates only. One sentence per significant action.
- When done: one or two sentences describing what changed and what (if anything) is next. Don't summarise the diff — the user can read it.
- Cite specific files with `path/to/file.ts:42` so they're clickable.
- If you skipped or changed scope from the request, **say so explicitly** at the top of the final message.

## When asked to "review," "audit," or "improve"

- Default to *reporting*, not editing. Produce a list of findings with file:line references and severity. Then ask which to fix.
- "Improve this component" without specifics = stop and ask what dimension (a11y, perf, readability, design system compliance).

## When asked to "make this look better"

- Verify against `agent/design.md` and the existing UI kit first. Most of the time the answer is "use the right token / use the existing primitive."
- If the design genuinely needs iteration, do it in `templates/{feature}/`, not in production code.

## Memory and persistence

- Don't write notes/plans/decisions to random `.md` files. If something is worth persisting:
  - **Project-wide rule** → propose an edit to `CLAUDE.md` or `agent/*.md`.
  - **Design system rule** → propose an edit to `agent/design.md` + `docs/design-system.md`.
  - **Workflow rule** → propose an edit to `agent/skill.md` (this file).
- Don't create `NOTES.md`, `TODO.md`, `THOUGHTS.md`, etc.

## Anti-patterns Claude has been observed doing — banned in this repo

- Renaming variables across the file "for clarity" when the task was a one-line fix.
- Reorganising imports while doing an unrelated change.
- Adding TypeScript generics that aren't used by callers.
- Wrapping working code in `try/catch` "to be safe."
- Adding fallback values for cases that can't happen.
- Adding `// TODO:` for things not in the task.
- Adding new files when an edit to an existing file would do.
- Creating barrel `index.ts` files outside of `src/features/{f}/`.
- Writing JSDoc for self-explanatory functions.
- Splitting a small PR into "phases" and asking which one to do first.

If you're about to do one of these and the user didn't ask, stop.
