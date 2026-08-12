# Handoff: Woodshed

Paste this as your first message to Claude Code, from inside the unzipped `woodshed/`
folder. Or leave this file in the repo root and just say "read HANDOFF.md and get started."

---

## What this is

Woodshed is a guitar tab library that auto-scrolls while you play, built to replace
Ultimate Guitar's app. It's a single static HTML file with no build step and no
dependencies, hosted on GitHub Pages.

The architecture worth understanding before you change anything:

- **Songs are files in this repo.** `tabs/*.txt`, one per song, each with an optional
  `title: / artist: / tuning: / capo:` header block terminated by `---`. The app fetches
  `tabs/index.json` over plain HTTP — no auth — so anyone who opens the site gets the
  whole library.
- **Everything personal stays in the browser.** Which shelf a song is on (Working on /
  Done / Know it), tabs the person adds themselves, scroll speed, font size, offline
  cache. In `localStorage` under the key `woodshed`. It is never uploaded.
- **Writing back is optional.** A repo collaborator can paste a fine-grained GitHub
  token into Settings and publish tabs from the app via the Contents API. Everyone else
  is read-only, which is the intended default.

That split is deliberate. One shared library, private shelves per person, no accounts.

## Files

| Path | Purpose |
|---|---|
| `index.html` | The entire app. Vanilla JS, no framework, no build. |
| `tabs/*.txt` | The songs. |
| `tabs/index.json` | Generated listing. Never edit by hand. |
| `scripts/build-index.mjs` | Regenerates `index.json` from the tab files. Node 18+, no deps. |
| `.github/workflows/rebuild-index.yml` | Runs that script on any push touching `tabs/**/*.txt` and commits the result. |
| `README.md` | Setup and tab file format. |

## First job

Get it live:

1. Create a **public** repo (free GitHub Pages only serves public repos) and push `main`.
2. Enable Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
3. Confirm the site loads and both sample tabs open.

## Then verify the parts that were never tested

This was all written without a browser or a live repo, so these are unverified:

- **The fetch path.** Serve locally (`python3 -m http.server`) and confirm the app loads
  `tabs/index.json`, renders both tabs in the library, and opens one. If the list is
  empty, that's the bug to chase first.
- **`repoSlug()` autodetection.** It parses `owner.github.io/repo` out of `location`.
  Check it resolves correctly on a project page — it's shown on the About screen.
- **The Action's first run.** Needs `contents: write`, and the repo may need Settings →
  Actions → Workflow permissions set to read and write. Confirm it commits `index.json`
  and doesn't loop.
- **CDN staleness.** Fetches append `?t=` and use `cache: "no-store"`. Verify a newly
  pushed tab actually appears within a minute or two rather than being served stale.
- **Install to home screen** on a phone: fullscreen, no browser chrome, wake lock holds
  the screen on while auto-scrolling.

## Constraints — please keep these

- **No build step, no dependencies, one HTML file.** That's the point. The person should
  be able to read the whole app in one sitting. No React, no bundler, no npm install.
- **The localStorage schema is versioned.** `SCHEMA` is separate from `APP_VERSION`, and
  `MIGRATIONS` runs old data forward step by step. If you add or rename a stored field,
  bump `SCHEMA` and add a migration. Never delete an existing migration — someone's
  friend may be several versions behind.
- **Bump `APP_VERSION`** on any user-visible change. It's shown in the library footer.
- **Don't touch the visual design without being asked.** Dark slate ink with warm paper
  text and a brass accent, Archivo for UI and JetBrains Mono for tabs. The scrub bar is
  a fretboard with real fret spacing (`1 - 2^(-n/12)`) and correctly placed inlays — that's
  the signature element, not decoration. Resist making it look like a generic dark-mode app.
- **Tab text rendering is sacred.** `white-space: pre`, true monospace, no wrapping,
  no reflowing. Misaligned fret numbers make a tab useless.

## Known gaps, roughly in priority order

1. **No service worker.** Tab content is cached in localStorage, but the app shell itself
   still needs the network on a cold load. Now that it's hosted, a `sw.js` would make it
   genuinely offline. This is the highest-value next thing.
2. **Slug collisions on publish.** Two songs with the same title write to the same
   `tabs/<slug>.txt` and clobber each other. Needs a uniqueness check.
3. **Crude cache eviction.** On a `QuotaExceededError` the whole offline cache is dumped.
   Should evict least-recently-opened instead. localStorage caps around 5MB.
4. **`Fit to width` assumes a 0.6 character-width ratio** for JetBrains Mono rather than
   measuring. Fine in practice, but it's a guess.
5. **No transpose or capo shifting.** Not requested yet.

## Ground rules

- Don't commit any token, and don't ask for one to be pasted into chat. Token setup is
  something the person does in the app's Settings screen on their own device.
- Tabs are transcriptions and mostly someone else's work. This is a personal practice
  library shared with a friend, not a republishing platform. Don't build scrapers for
  Ultimate Guitar or anywhere else — the intended input is paste and commit.
