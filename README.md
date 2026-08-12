# Woodshed

A guitar tab library that auto-scrolls while you play. One HTML file, no build step,
no accounts, no subscription.

The songs live in this repo as plain `.txt` files. Everything personal — which shelf a
song sits on, tabs you add yourself, your scroll speed — stays in your own browser and
is never uploaded.

## Setting it up

1. Create a **public** repo (free GitHub Pages only serves public repos).
2. Copy these files into it and push to `main`.
3. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Wait a minute, then open `https://<you>.github.io/<repo>/`.
5. On your phone: Share → **Add to Home Screen**. It launches fullscreen, no browser bars.

Send that same link to anyone. They get the whole library, read-only, with their own
private shelves. Nothing for them to install or sign into.

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

## Running the index locally

```
node scripts/build-index.mjs
```

Node 18+. No dependencies.

## A note on the tabs themselves

Tabs are transcriptions, and most of them are somebody else's work. This is built for
keeping a personal practice library and sharing it with a friend — not for republishing
someone's catalogue. Worth keeping in mind before the repo gets big.
