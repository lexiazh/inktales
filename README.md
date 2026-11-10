# InkTales

**Learn Chinese characters through pictures, stories, and writing.**

InkTales is an English-first learning website for people meeting Chinese characters for the first time. Each lesson brings together a watercolor illustration, pronunciation, a short memory story, stroke order, and writing practice. The interface takes its visual cues from ink painting and paper.

[Try InkTales](https://inktales-hanzi.vercel.app/)

## What you can explore

- **250 beginner characters** across Nature, People & life, Food & Drink, Places & Transport, and Numbers & Time. Each category has 50 characters.
- **Flashcards** with pinyin, English meanings, example words, audio through your device's Mandarin voice, stroke playback, and tracing.
- **Living Hanzi** scenes that appear as you write each stroke. Completing a character starts an animation connected to its meaning.
- **Characters** gallery with individual watercolor illustrations, search, category filters, and saved characters.
- **13 Fables & Tales** on the Home page, each with an English retelling, a Chinese title, a moral, and a link to a related character.
- **My journey** for learned characters and recent practice. Progress and bookmarks are saved in the current browser.
- **Momo 墨墨**, a course companion that answers from lesson notes. The live website currently uses its clearly labeled offline guide mode. The server also supports an optional Gemini integration.

You can explore as a guest or use Supabase email and password sign-in. Signing in does not sync learning progress between devices.

## Run locally

You need Node.js 22.13 or newer, npm, and a Supabase project with email/password authentication enabled.

```sh
npm ci
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` to your project's URL and publishable key. These values configure the sign-in form. Keep `.env.local` out of Git.

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). For a production build, run `npm run build`. The repository includes the character artwork, stroke data, fonts, and historical-form images used by the lessons.

## Content and attribution

The memory stories and illustrations help learners remember modern meanings. They are teaching aids, not verified explanations of character origins. Where available, the character-evolution strip shows sourced historical forms and links to their records. Details about the artwork, fonts, writing data, historical images, and licenses are on the [credits page](https://inktales-hanzi.vercel.app/credits).

The introductory course notes have not received independent language-teacher review.

The source is publicly viewable. This repository does not currently include a license for reuse of the project code, text, or original artwork. Third-party materials retain their own licenses as described in the credits.
