# InkTales

English-first Chinese-character learning, inspired by traditional watercolor landscapes and rice paper. The app opens on the full-page framed flashcard and includes a home page, 12-character explorer, learning path, local progress, bookmarks, sourced historical forms with hover highlights, animated stroke playback, stroke tracing, quizzes, contextual and standalone learning companions.

## Run

Requires Node >=22.13.

```sh
npm ci
npm run dev
```

Local preview: http://localhost:5173

```sh
npx tsc --noEmit
npm run build
```

## Course and imagery

`lib/lessons.ts` contains 12 original lessons. All stories are explicitly labeled mnemonics. No unreviewed historical forms or etymological claims are presented as fact. Stroke data and Hanzi Writer are bundled under `public/data` and `public/vendor`, including licenses. Twelve focused watercolor illustrations live in `public/assets/characters`. Two earlier landscape paintings remain for the home and companion pages. The sourced historical forms and public-domain/CC0 metadata are bundled under `public/evolution` and `lib/evolution-data.json`. The supplied UI reference informed the design and is not distributed.

## Optional real AI

`app/api/assistant/route.ts` is a server-side Gemini generateContent integration. It defaults to clearly labeled offline lesson notes, which require no credentials. Both the standalone companion and lesson drawer share this endpoint.

Configure server runtime values using the Sites environment tools: `GEMINI_API_KEY`, `GEMINI_MODEL`, `AI_ENABLED=true`, and optionally `AI_DAILY_LIMIT`. For local development, use an untracked `.dev.vars` file as supported by Cloudflare. Do not put keys in client code. Review current Gemini pricing, eligibility, regional restrictions, retention/data policies, and set a provider-level spending cap before activation. The request counter is in worker memory and is best effort, not a durable global budget limit. No live provider test was performed without a key.

Questions are 1–600 characters, history is capped to six messages, responses are bounded, and requests time out after 18 seconds. Failures display a clear notice and use the authored lesson fallback. Prompts/responses are not logged by this application. `/credits` documents privacy and licensing.

## Storage

Browser local storage only: `inktales-progress-v1`, `inktales-bookmarks`, and `inktales-settings`. Reset learning progress is available in settings; clear site data to remove all local information. Answer the practice question correctly and choose Complete & continue to save completion. Earlier review records remain intact; no review-rating controls are shown. Flashcards use a fixed viewport layout with a left navigation rail and a historical-form strip.

## Before a public educational launch

Independent language-teacher review, broader browser/device usability testing, and a live-provider evaluation remain necessary. The initial Sites deployment is owner-private. No public-audience change is made.
