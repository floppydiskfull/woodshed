# Changelog

The version shown in the app's library footer (and on the About screen) corresponds
to the entries here.

## 1.3.0 — 2026-08-12

- **Restore is now a true merge.** Pasting a backup matches tabs by id and keeps
  whichever copy was edited most recently, skips exact duplicates, and only fills in
  shelf choices your device hasn't made. Re-importing the same backup is a no-op, so
  swapping backups between two people is always safe.
- **Save backup file** (Settings): downloads a dated `woodshed-backup.json`.
- **Auto-backup folder** (Settings, desktop Chrome/Edge only): pick a folder once and
  every save writes your tabs there as `.txt` files plus a `backup.json`.
- The app now asks the browser to persist its storage, reducing the chance of saved
  tabs being evicted on phones.

## 1.2.0 — 2026-08-12

- **Find online** (editor): opens a web search for the typed title and artist, for
  finding a tab to copy. A link out, not a scraper.
- **Paste cleanup** (editor): pasting into the Tab field strips Ultimate Guitar
  `[tab]`/`[ch]` markers, zero-width characters, and trailing whitespace, and converts
  non-breaking spaces, unicode dashes, and smart quotes to ASCII width-for-width, so
  column alignment survives. Clean pastes are left untouched.

## 1.1.0 — initial deployment

- First live version: shared library from `tabs/*.txt`, private shelves
  (Working on / Done / Know it), auto-scroll player with fretboard scrub bar,
  offline cache, in-app publishing via fine-grained token, backup and restore.
