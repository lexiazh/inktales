# Verification

- TypeScript strict type check passed.
- Production Vinext/Cloudflare build passed.
- 11 automated checks cover: 12 complete lesson records and matching stroke counts; local assets and licenses; offline status; grounded offline meaning answers; unsupported origin/fabricated-source handling; out-of-scope fallback; malformed requests; cross-origin rejection; input-size limit; mocked real-provider success, errors, rate limiting and secret boundaries; server rendering of the initial flashcard.
- Provider tests use a stub and a dummy key. Live Gemini was not called or configured.
- Browser access to the local preview was declined by the browser permission gate. No alternative browser surface was used. Desktop/mobile visual inspection, animation/tracing interaction, local-storage restoration, keyboard navigation and real speech playback are unverified in a browser.
- Language-teacher and representative beginner usability review are still pending.
