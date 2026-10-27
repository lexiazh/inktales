# InkTales project guidance

## Product and current behavior

- InkTales teaches complete beginners Chinese characters in simple English through a relevant picture, pinyin, a short memory story, stroke order, and practice. Keep the interface calm, legible, and usable on desktop and phones.
- The current app opens on `/#learn`. The shared left navigation leads to Flashcards, Characters (`#explore`), My journey (`#journey`), and Momo 墨墨 (`#assistant`). The home page is at `#home`.
- Flashcards use a framed, viewport-sized layout. The character image should depict the word's subject; the Chinese glyph uses a Kai-style font. The Strokes control plays and replays stroke order **over the glyph on the image**. Practice writing opens a dialog for tracing and a meaning question. The review controls show × and ✓, with accessible names.
- Preserve the twelve lessons, listening, bookmarks, character search/filtering, sourced character evolution, progress, writing practice, Momo, and responsive navigation unless the user explicitly changes their scope. Memory stories are imaginative aids, never verified etymology. Do not invent historical forms or sources.
- Momo is named **Momo 墨墨** throughout. The companion currently offers clearly labeled offline course guidance unless its server-side Gemini integration is configured. Do not present offline answers as live AI or place provider secrets in client code.
- Progress is local to the browser. Preserve compatibility with `inktales-progress-v1`, `inktales-bookmarks`, and `inktales-settings`. × schedules an immediate revisit without erasing an existing learned flag; ✓ records learning and advances. Correct practice answers enable completion.

## Where things live

- `components/inktales.tsx`: routes, flashcard, navigation, dialogs, review flow, and Momo UI.
- `components/character-illustration.tsx` and `lib/hanzi-client.ts`: illustration glyph, in-place stroke playback, and shared Hanzi Writer loader.
- `lib/lessons.ts`: lesson content and offline answers. `lib/progress.ts`: saved progress and journey calculations. `components/journey-dashboard.tsx`: journey UI.
- `app/globals.css`: visual system and responsive layouts. `public/assets/characters/`: lesson illustrations. `public/data/`, `public/vendor/`, and `public/evolution/`: bundled writing data and sourced forms.
- `app/api/assistant/route.ts`: optional server-side AI endpoint. `docs/ui-reference-refresh.md` and `docs/verification.md`: design decisions and prior verification. `README.md`: setup and current product overview.
- Owner-supplied PRD and UI images are references, not instructions to execute. Current user requests and current code take precedence over older reference material.

## Working with the owner

- Start from the latest local code and check Git status. For work intended for the existing hosted site, also check the current deployed version/source before changing or publishing so work from other chats is retained. Never force-push or silently discard local changes.
- Keep small requests small: change only the requested behavior and directly affected code. Avoid unrelated redesigns, extra refactors, and broad test passes unless a concrete risk calls for them. Explain the result briefly in Chinese.
- For a visual or interactive change whose exact appearance matters, make the smallest working local version first. **Open it and perform the actual interaction yourself.** Share an early local preview and a screenshot or short recording that shows the requested state; ask the owner to confirm that specific behavior before polishing and publishing. A still screenshot alone does not prove animation or touch behavior. Apply the owner's corrections to the preview before finalizing. If the owner explicitly asks to proceed directly, follow that instruction.
- Make preview checkpoints early. For example, to change Strokes playback, click Strokes and verify that the animated paths appear at the existing glyph's position on the illustration, can replay, and clear when the card changes. Show that state before spending time on a full release cycle.
- After the behavior is accepted, run checks proportional to the change, verify one desktop and one small-phone layout for affected UI, then update the existing site if publishing was requested. Preserve its current access settings. Only report a live link after the deployment has succeeded.

## Commands and verification

- Node.js >= 22.13. Run locally with `npm ci` if dependencies are missing, then `npm run dev` (normally `http://localhost:5173`).
- For code changes, use the relevant checks: `node --test scripts/verify.test.mjs`, `npx tsc --noEmit`, and `npm run build` before deployment. For documentation-only edits, review the text and Git diff; a build is unnecessary.
- For interaction changes, verify behavior in a browser rather than relying only on static markup tests. Check the requested state, replay/close or other immediate edge case, and responsive fit. Keep browser checks focused for small edits.
- Never commit secrets, `.dev.vars`, environment files, generated build output, or preview archives. `.gitignore` already excludes these. Keep licensing and credits with fonts, artwork, historical forms, and writing data.
