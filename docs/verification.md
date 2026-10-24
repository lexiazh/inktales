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
