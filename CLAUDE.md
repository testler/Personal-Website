# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # dev server (localhost:3000)
npm run build          # production build → build/
npm test -- --env=jsdom            # run tests
npm test -- --env=jsdom --testPathPattern=App  # run single test file
```

Deployed to Netlify (`joshua-garst-portfolio-website.netlify.app`). The `netlify.toml` defines SPA redirect rules, cache headers, and security headers. All routes redirect to `/index.html` for client-side routing.

## Architecture

This is a React 18 interactive portfolio with a graphic-novel / game-like UX metaphor. All pages lazy-load via `React.lazy`.

### Two distinct UI modes

**Core (Home `/`)** — A Three.js dodecahedron rendered with `@react-three/fiber`. Users navigate by clicking faces. The home page runs a multi-phase intro dialogue sequence before revealing the 3D scene. No NavBar is shown on the home route.

**Chapters (`/career`, `/personal-life`, etc.)** — Standard scrollable pages sharing a `ChapterLayout` wrapper (`src/features/chapters/ChapterLayout.jsx`). Each chapter has a `GuideCharacter` that surfaces contextual dialogue. The NavBar appears on all chapter routes.

### Key directories

- `src/content/` — All static data/config. Edit here to update site copy, routes, or dialogue:
  - `chapters.config.js` — Per-chapter content (dialogue, timeline, cards, items)
  - `dialogue.config.js` — Core intro sequences and intent gate options
  - `core-faces.config.js` — Dodecahedron face definitions (label, type, route/href)
  - `story-map.config.js` / `story-routing.config.js` — Passage-to-route mapping
  - `routes.config.js` — Route registry and nav order

- `src/features/` — Feature-level logic separated by concern:
  - `core/` — `CoreScene.jsx` (3D home page orchestrator), `CoreDodecahedron.jsx`
  - `chapters/` — `ChapterLayout.jsx` (shared chapter wrapper), `ChapterChoicePanel.jsx`
  - `guide/` — `GuideCharacter.jsx` (floating avatar with chapter dialogue)
  - `audio/` — `AudioProvider.jsx` (React context for background music toggle)
  - `intent-gate/` — `IntentGatePanel.jsx` (command panel on the Core after intro)

- `src/pages/` — One folder per route. Most pages consume `CHAPTERS_CONTENT` from `chapters.config.js` and render through `ChapterLayout`.

- `src/theme/tokens.css` — CSS custom properties for the design system.

### Content vs. code

Site copy (bio text, dialogue, career details, project descriptions) lives entirely in `src/content/`. Pages and features are mostly presentational wrappers around that config data. When updating site content, edit `src/content/` files rather than page components.

### Audio

`AudioProvider` wraps the app in `src/index.js`. Music state is global and toggled by the floating button in `AppContent`. The Core intro also plays a typing SFX on dialogue advance.

### Guide character

Each chapter page passes `guideEnabled` (persisted to `localStorage`) down to `ChapterLayout`, which renders `GuideCharacter`. Guide dialogue options per chapter are defined in `chapters.config.js` under the `dialogue` key.
