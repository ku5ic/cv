# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static CV/resume for Sinisa Kusic, authored in Markdown and built into HTML and PDF outputs.

## Build commands

```bash
npm run build:html   # Markdown → HTML via pandoc
npm run build:pdf    # HTML → PDF via Playwright/Chromium
npm run build        # Both in sequence
```

**Prerequisite:** `pandoc` must be installed on the system (`brew install pandoc` on macOS).

## Architecture

The pipeline has three stages:

1. **Content** (`content/cv.md`) — Markdown with pandoc extensions: `fenced_divs`, `bracketed_spans`, `hard_line_breaks`. YAML frontmatter sets `title` and `lang`. Div/span classes drive CSS layout (e.g. `.cv-header`, `.skills-grid`, `.contact-block`, `.avatar`).

2. **HTML generation** (`npm run build:html`) — pandoc renders `content/cv.md` through `templates/base.html` into `docs/index.html`. The template uses `$body$`, `$title$`, `$lang$` pandoc variables. The output references `../assets/cv.css` and `../assets/profile.png` as relative paths.

3. **PDF generation** (`npm run build:pdf`) — `scripts/export-pdf.mjs` launches a headless Chromium via Playwright, loads the HTML file, and prints to PDF.

   > **Known issue:** `export-pdf.mjs` currently reads from `../output/cv.html` but `build:html` writes to `docs/index.html`. The PDF step is broken until these paths are aligned.

## Key files

| File | Purpose |
|---|---|
| `content/cv.md` | Single source of truth for CV content |
| `templates/base.html` | Pandoc HTML template |
| `assets/cv.css` | All visual styling |
| `assets/profile.png` | Profile photo |
| `scripts/export-pdf.mjs` | Playwright-based PDF export |
| `docs/index.html` | Built HTML output (committed, served as GitHub Pages) |

The `output/` directory is gitignored. `docs/` is committed so it can be served directly (e.g. via GitHub Pages).
