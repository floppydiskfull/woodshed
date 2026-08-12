# Woodshed

A guitar tab library that auto-scrolls while you play. One HTML file, no build step,
no accounts, no subscription.

**Use it here: <https://floppydiskfull.github.io/woodshed/>**

On your phone, open that link and Share → **Add to Home Screen** — it launches
fullscreen like a native app, and the screen stays awake while it scrolls.

The songs live in this repo as plain `.txt` files. Everything personal — which shelf a
song sits on, tabs you add yourself, your scroll speed — stays in your own browser and
is never uploaded. Anyone with the link gets the whole library, read-only, with their
own private shelves.

## Adding a tab

**From a laptop** — drop a `.txt` file into `tabs/`, commit, done.

**From your phone** — open the repo on github.com, `tabs/` → Add file → Create new file.
Paste and commit.

**From inside the app** — needs a token, see below.

Either way, the `Rebuild tab index` Action regenerates `tabs/index.json` within about a
minute and the tab appears for everyone.

### Tab file format

An optional header, then the tab. Everything after `---` is shown exactly as written.

```
title: Song name
artist: Someone
tuning: E A D G B e
capo: 2
---
e|---0---3---|
B|---1---0---|
```

Without a header, the filename becomes the title.

## Publishing from the app

Optional, and only for people you've added as repo collaborators.

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token
2. Repository access: **Only select repositories** → this one
3. Permissions: **Contents → Read and write**. Nothing else.
4. Paste it into the app's Settings screen.

The token is stored in that browser's local storage, so only put one on a device you
control, and keep the scope to this single repo. Without a token the app is read-only,
which is the right setup for most people.

## Backups

Your own tabs live only in your browser. Settings has three ways to keep them safe:

- **Save backup file** — downloads a dated `woodshed-backup.json` you can stash anywhere
  or send to a friend.
- **Choose auto-backup folder** (desktop Chrome/Edge) — pick a folder once and every
  save writes your tabs there as `.txt` files plus a `backup.json`.
- **Merge into my tabs** — paste any backup and it merges: newer edits win, duplicates
  are skipped, your shelf choices are never overwritten. Safe to repeat, in either
  direction, between any two people.

## Running your own copy

This site is one deployment of the app — the repo is also a kit if you'd rather have
your own library:

1. Fork this repo (or copy the files into a new **public** repo — free GitHub Pages
   only serves public repos). You may want to empty out `tabs/` first.
2. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait a minute, then open `https://<you>.github.io/<repo>/`.

To rebuild the tab index by hand: `node scripts/build-index.mjs` (Node 18+, no
dependencies) — though the Action normally does this for you.

## Release notes

See [CHANGELOG.md](CHANGELOG.md).

## A note on the tabs themselves

Tabs are transcriptions, and most of them are somebody else's work. This is built for
keeping a personal practice library and sharing it with a friend — not for republishing
someone's catalogue. Worth keeping in mind before the repo gets big.
