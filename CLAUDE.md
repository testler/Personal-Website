# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Vite dev server (localhost:3000)
npm run build          # production build → build/
npm run preview        # serve the production build locally
```

There is no test runner configured. Verify changes with `npm run build` plus manual checks in the browser.

Deployed to Netlify (`joshua-garst-portfolio-website.netlify.app`). `netlify.toml` defines the SPA fallback, cache/security headers, and **301 redirects for legacy URLs — keep those in sync with `src/content/routes.config.js`**, and always point them at current slugs from `story-routing.config.js`, never at other legacy slugs.

## Architecture

React 19 + Vite. An interactive "graphic-novel / game" portfolio: the entire site is a Twine-style passage graph rendered by one scene component. React Router has only two real routes — `/` (Home, which renders the press-start or welcome-back passage) and `/:passageSlug` (everything else) — plus client-side `<Navigate>` redirects for legacy URLs.

### Passage system (the whole site)

- `src/features/passages/PassageScene.jsx` — renders every passage: character art, dialogue paragraphs (with `$name` / `{NAME_COMMA}` / `{TIME_MODE}` / `{TYPING_SFX}` token substitution), choice buttons, name input, per-passage SEO meta, and the "next destination" suggestion.
- `src/features/passages/CoreHubScene.jsx` + `src/features/core/CoreDodecahedron.jsx` — the 3D dodecahedron hub shown inside the `the-core` passage (`/core`). Tap a face (or its floating label) to select, tap again to confirm and navigate. Labels are DOM buttons positioned imperatively from the frame loop (never via per-frame React state). A collapsible "All destinations" list below the canvas is the keyboard/screen-reader navigation path.
- `src/features/passages/DynamicEnding.jsx` — 3-tier ending (`/ending`) chosen by how many destinations were visited.
- `src/features/passages/PassageExtras.jsx` — per-passage bonus UI (resume downloads, contact links, project showcases) keyed by passage id.
- `src/features/tracking/VisitTrackerProvider.jsx` — player name + visited-destination set, persisted to localStorage. A destination only counts as visited on the passage carrying its `visitKey` (the *last* passage of each section, by design). `hasSignal` (≥3 visited) surfaces the ending banner.
- `src/features/audio/AudioProvider.jsx` — global music toggle; music starts on first user gesture, fetched on demand.

### Content vs. code

All copy and the dialogue graph live in `src/content/`. Edit these, not components, to change site content:

- `story-map.config.js` — every passage node: prompt, paragraphs, choices (`toPassage` / `href`), `photoKey`, `visitKey`, flags (`isCoreHub`, `isEnding`, `nameInput`, `showNextDestination`). Also `DESTINATION_KEYS` / `DESTINATION_TO_PASSAGE` (the 12 trackable destinations).
- `story-routing.config.js` — passage id ↔ URL slug map. **Every node must have a slug here.**
- `core-faces.config.js` — the 12 dodecahedron faces; `id` must match a `DESTINATION_KEYS` entry so visited state lights up.
- `routes.config.js` — legacy-URL client redirects (mirrored as 301s in `netlify.toml`).
- `passage-extras.config.js` — passage id → extras panel config.

Adding a passage = add the node in `story-map.config.js` + a slug in `story-routing.config.js`; if it ends a new section, give it a `visitKey` and add the destination to `DESTINATION_KEYS`, `DESTINATION_TO_PASSAGE`, and (if it gets a face) `core-faces.config.js`. Character photos are mapped from `photoKey` in `STORY_PHOTOS` inside `PassageScene.jsx`.

### SEO / static files

`index.html` carries static meta, JSON-LD, and a full `<noscript>` resume. `public/` holds `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, manifest/icons, and a self-destructing `service-worker.js` (kills the old CRA-era SW — keep it). When career facts change (title, role), update: `story-map.config.js`, `index.html` (meta + noscript), `SchemaMarkup.jsx`, and both `llms*.txt` files.

### Styling

Plain CSS per feature (`PassageScene.css`, `CoreHubScene.css`, `App.css`) over design tokens in `src/theme/tokens.css` and `src/styles/variables.css`. Mobile (≤768px) switches to a vertical layout: character art as background, dialogue panel overlaid with a gradient, choices in a 2-column grid (last odd item spans full width). Desktop pins viewport height; mobile allows page scroll.
