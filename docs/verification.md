# Verification

## Current UI refresh

- TypeScript strict check and 14 automated checks pass.
- Checks include all twelve lesson records and stroke counts; essential assets and licenses; offline status and answers; malformed, cross-origin and oversized requests; mocked provider success/failure/rate limits; secret boundaries; initial Flashcards rendering; twelve distinct subject-focused illustrations; completion and backward-compatible local progress; all 36 historical forms with sources and public-domain/CC0 licenses.
- All twelve generated illustrations were visually inspected in a contact sheet.
- The local preview responds with HTTP 200. The user authorized this round of browser testing. Layouts were inspected at 1440×900, 1280×720, 800×600, 390×844, and 360×640. Document and visible lesson-panel scroll dimensions fit their viewports; all twelve stories fit at 360×640. Story, writing, and practice tabs were checked on desktop and small mobile layouts. Main controls remained inside the card.
- The learning page uses a viewport-sized frame, a fixed left navigation, and no reading-area scrolling. The main completion action follows a correct practice answer; the old memory-rating row and its keyboard shortcuts are removed.
- Gemini was not configured or called live; provider tests use a stub and dummy key.
- Language-teacher and representative beginner usability review remain pending.

- Browser interactions verified: stroke playback returns to replay; tracing starts; wrong answers keep completion disabled; a correct answer enables completion and advances to the next lesson; progress survives a reload on the journey page. Keyboard focus activates the same historical-form highlight as hover. No browser console errors were observed. Saved desktop and phone screenshots live in the ignored `outputs/` directory.
- Fine-grained stroke-tracing accuracy and Mandarin speech output were not evaluated on physical touch/audio devices.

## Four-screen reference update

- Built on deployed version 2 (ae66a13), matching local/GitHub/Sites source at the start. Existing progress keys, stroke data, historical sources, API behavior and illustrations are retained.
- 17 automated checks cover the prior 14 cases, plus Again preserving learned records, real journey/date-boundary calculations, and bundled Momo/Kai assets. TypeScript strict checking passes.
- Browser layouts checked at 1440×900, 1280×720, 800×600, 390×844 and 360×640. Story/writing/practice panels fit at the latter four responsive sizes; all twelve stories fit at 360×640. Flashcards have no document or panel overflow at those sizes. Characters and Journey use natural vertical document flow, with no horizontal overflow on mobile.
- Browser interactions checked: index lesson selection, playback, tracing start, wrong/correct practice answers and conditional completion, completion advance, × Again advance plus immediate revisit, ✓ Got it advance, ready-to-revisit jump, bookmarks, Saved filter, pinyin search, Momo offline suggestions and New chat. Progress, bookmarks and due state survived a reload.
- Momo's phone input remains visible at 360×640. Settings opens on mobile without affecting saved data. Real Mandarin audio output, physical touch tracing accuracy, and a physical phone keyboard were not evaluated. Live Gemini remains unconfigured; provider checks use stubs.

## Annotated flashcard simplification

- Removed the flashcard title/tagline, the visible Character index label, category/stroke metadata, and the two secondary lesson tabs from the card. The index is centered relative to the frame. Review controls show only × and ✓, retaining accessible names and tooltips.
- Strokes now plays the bundled Hanzi Writer stroke paths in the character's position on the illustration. The static Kai glyph returns after playback. Replay works; switching characters during playback clears the old overlay. A shared, retryable script loader prevents duplicate loading between illustration playback and the writing dialog.
- Practice writing opens a native dialog with playback, tracing, and a subsequent meaning question. Wrong answers keep completion disabled; correct completion saves progress, closes the dialog and advances. Momo's authored writing guidance points to these current controls.
- 18 automated checks and TypeScript pass, including concurrent/retry script loading and the simplified initial markup. Browser checks at 1319×711, 800×600, 390×844 and 360×640 show centered index (zero center offset) and no document/story overflow. The writing dialog fits at 360×640. Playback, replay, mid-animation lesson switching, tracing start and the complete question flow were exercised.
