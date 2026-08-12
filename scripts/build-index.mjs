#!/usr/bin/env node
/**
 * Rebuilds tabs/index.json by reading every .txt in tabs/.
 * Each tab file may start with a small header block:
 *
 *   title: Song name
 *   artist: Someone
 *   tuning: E A D G B e
 *   capo: 2
 *   ---
 *   e|---0---3---|
 *
 * The header is optional. Without one, the filename becomes the title.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TABS_DIR = "tabs";
const FIELDS = ["title", "artist", "tuning", "capo"];

function parseHeader(text, fallbackTitle) {
  const meta = { title: fallbackTitle, artist: "", tuning: "", capo: "" };
  const split = text.match(/^([\s\S]*?)\n---\n/);
  if (!split || !/^[A-Za-z]+:/.test(split[1].trim())) return meta;
  for (const line of split[1].split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m && FIELDS.includes(m[1].toLowerCase())) meta[m[1].toLowerCase()] = m[2].trim();
  }
  if (!meta.title) meta.title = fallbackTitle;
  return meta;
}

const titleFromFilename = (name) =>
  name.replace(/\.txt$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const files = (await readdir(TABS_DIR))
  .filter((f) => f.toLowerCase().endsWith(".txt"))
  .sort();

const tabs = [];
for (const file of files) {
  const raw = await readFile(join(TABS_DIR, file), "utf8");
  const meta = parseHeader(raw, titleFromFilename(file));
  tabs.push({ path: `${TABS_DIR}/${file}`, ...meta });
}

tabs.sort((a, b) =>
  a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));

const index = { generated: new Date().toISOString(), count: tabs.length, tabs };
await writeFile(join(TABS_DIR, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`Indexed ${tabs.length} tab${tabs.length === 1 ? "" : "s"}.`);
