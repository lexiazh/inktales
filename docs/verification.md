# Verification

## Current UI refresh

- TypeScript strict check and 14 automated checks pass.
- Checks include all twelve lesson records and stroke counts; essential assets and licenses; offline status and answers; malformed, cross-origin and oversized requests; mocked provider success/failure/rate limits; secret boundaries; initial Flashcards rendering; twelve distinct subject-focused illustrations; completion and backward-compatible local progress; all 36 historical forms with sources and public-domain/CC0 licenses.
- All twelve generated illustrations were visually inspected in a contact sheet.
- The local preview responds with HTTP 200. Local browser testing requires renewed authorization because an earlier browser access request was declined. The published private page is available for responsive verification.
- The learning page uses a viewport-sized frame, a fixed left navigation, and no reading-area scrolling. The main completion action follows a correct practice answer; the old memory-rating row and its keyboard shortcuts are removed.
- Gemini was not configured or called live; provider tests use a stub and dummy key.
- Language-teacher and representative beginner usability review remain pending.
