# InkTales reference UI refresh

Base: deployed version 2 / commit ae66a1344d8f8ecd0326e250d65b2a6c21d308ad. Local source, Sites source, and GitHub were reconciled before editing; no existing local edits were present.

The four owner-provided reference images inform the shared paper palette, left rail, character illustrations, journey dashboard, and Momo welcome page. Reference numbers and placeholder glyphs are not course data. The dashboard uses persisted progress and bookmarks. Its seven-day chart counts characters by the most recent practice date, not total study time or estimated accuracy.

Flashcards retain listening, stroke playback, tracing, practice questions, bookmarks, full screen, sourced evolution, and the companion drawer. The index selects any lesson. × Again schedules an immediate revisit and preserves an existing learned flag; ✓ Got it marks the character learned and advances. Correct practice answers still enable Complete & continue. Existing local-storage keys and earlier records remain compatible.

All twelve English mnemonics were rewritten as short, playful scenes while keeping historical evidence separate. The three actual sourced ancient forms remain; the unsourced large-seal stage in the reference is not fabricated.

Chinese text uses self-hosted LXGW WenKai Regular 1.530, obtained from https://github.com/lxgw/LxgwWenKai/releases/tag/v1.530 under SIL OFL 1.1 (public/assets/LXGW-WenKai-OFL.txt). A 5.7 KB course subset loads first, with an extended Chinese font for additional chat text. The subset internal family is renamed InkTales Kai. Latin text retains Cormorant Garamond and DM Sans.

Momo is named consistently in navigation, the full chat, the lesson drawer, and the provider's tutor instruction. Offline mode remains explicitly labeled and live AI configuration is preserved.

## Momo artwork

Built-in imagegen was used. Deployed asset: public/assets/momo.webp, resized to 600×600 and encoded as WebP. Generated original is retained outside the repository.

Final prompt:

> Use case: illustration-story. Asset type: small companion avatar for InkTales, a refined beginner Chinese learning web app. Create one original friendly watercolor ink creature named Momo: a round soft charcoal-black ink puff, warm ivory face, two simple closed smiling eyes, tiny smile, subtle blush, little ink droplets around the top. Similar mood to a gentle painted ink spirit, not any existing cartoon. Delicate real watercolor washes and brush edges, warm rice-paper ivory and muted sage palette. Single centered character, face clearly readable at small size, plenty of clear space around its silhouette. Square image, solid warm ivory background #fbf8f1. No text, letters, logos, scenery, frame or watermark.

## Subsequent annotation pass

The card's heading/tagline, visible index label, category metadata and secondary tabs were removed. The select is centered. Review buttons retain only their symbols with accessible names/tooltips. Strokes plays directly over the illustrated character, with a static Kai glyph restored afterward; writing and questions remain available in the Practice writing dialog.
