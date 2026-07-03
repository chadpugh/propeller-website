# Propeller Website Development Workflow

Last updated: 2026-07-03

## Project Overview

- Repository: `propeller`
- Local workspace: `/Users/chadpugh/Build/propeller`
- Live site: `https://propellervc.com`
- HubSpot portal ID: `20619041`
- Default HubSpot CLI account: `chad_cli`
- Primary live theme path: `/PRO-HubUI-CHAD EDIT/`
- Local theme directory: `hubspot-theme/`

This repo is being used for a phased cleanup of the existing HubSpot site. The goal is to bring the remaining pages into a clean, consistent, full-width layout without rebuilding the whole site or changing the content model unnecessarily.

## Source Of Truth

Read these before making changes:

- `docs/propeller-build-tracker.md` - live phase checklist, blockers, decisions, QA notes, and deployment log.
- `docs/propeller-phase-0-audit.md` - discovery evidence, page/template map, MCP status, access gaps, screenshots, and recommended Phase 1 path.
- `docs/propeller-content-inventory.csv` - page/content inventory from Phase 0.

Update the tracker as work moves between phases. Keep the audit as historical evidence unless new discovery changes a Phase 0 finding.

## Current Phase

- Phase 0: complete.
- Current phase: Phase 1, shared list-row foundation and portfolio listing.
- Live HubSpot changes for cleanup phases: none yet.

## Production Write Rule

Do not run live write operations without an explicit checkpoint and approval.

This includes:

- `hs upload`
- project upload/deploy
- template publish
- module publish
- HubSpot page edits
- HubDB edits
- live content edits
- remote deletes/moves/renames

Read-only MCP, CLI, API, browser checks, screenshots, and local file edits are fine when they support the active phase.

## HubSpot MCP And CLI

Use the HubSpot dev MCP first for HubSpot reads and docs lookups.

Current confirmed setup:

- MCP namespace: `mcp__hubspotdev`
- Local CLI path: `/opt/homebrew/bin/hs`
- CLI version: `8.9.1`
- Auth source: `hubspot.config.yml`
- Account: `chad_cli`
- Portal ID: `20619041`

MCP notes:

- Use `search-docs` then `fetch-doc` before answering HubSpot platform/API questions or planning HubSpot-specific implementation.
- Use MCP CMS read tools before shelling out to `hs` where possible.
- Paths under `/PRO-HubUI-CHAD EDIT/` contain a space. Escape or quote the path when using MCP/CLI list commands.
- The current developer MCP does not expose all needed Phase 0 reads. Page inventory, blog taxonomy, HubDB tables, and subscription/page limits may still require CLI/API/UI fallback or additional scopes.

Known access gaps:

- HubDB scopes are missing.
- Blog post/tag/author API scopes are missing.
- Serverless listing scopes are missing.
- Exact subscription tier and standalone page limit still need confirmation from Reece or a HubSpot admin.

## Local Directory Map

```text
hubspot-theme/
  css/
    propeller-styles.css
    theme-overrides.css
    elements/_typography.css
    tools/_config.css
  templates/
    propeller-homepage.html
    blog-index.html
    blog-post.html
    company-post.html
    flex.html
    layouts/base.html
  modules/
  globals/
  js/

docs/
  propeller-build-tracker.md
  propeller-phase-0-audit.md
  propeller-content-inventory.csv
  screenshots/

original-production-theme/
  Backup/reference only. Do not modify unless explicitly asked.
```

## Working Safely

1. Read `docs/propeller-build-tracker.md`.
2. Confirm the active phase and status.
3. Read the relevant Phase 0 findings in `docs/propeller-phase-0-audit.md`.
4. Inspect local files before editing.
5. Make scoped local edits.
6. Run the narrowest useful checks.
7. Capture screenshots for UI changes.
8. Update the tracker with status, evidence, blockers, and deployment notes.
9. Ask before any live HubSpot write.

## Phase Order

1. Shared list-row foundation and portfolio listing.
2. Team page mockup only.
3. Blog and press room.
4. Ocean MBA.
5. Pitch/contact.
6. Optional individual bio pages.
7. Cross-page QA and handoff.

Do not fully implement the team page before Reece/team sign-off on the mockup.

## Common Local Files

- `hubspot-theme/css/propeller-styles.css` - primary Propeller custom styles.
- `hubspot-theme/css/theme-overrides.css` - theme override layer.
- `hubspot-theme/templates/flex.html` - current template for several key pages.
- `hubspot-theme/templates/propeller-homepage.html` - homepage template.
- `hubspot-theme/modules/Portfolio/Portfolio.module/` - older portfolio logo-grid module, not the current live `/portfolio` listing owner.

Phase 0 found that live `/portfolio` uses the `Resources Listing` module and live `/about` uses `People Listing`, both on `PRO-HubUI-CHAD EDIT/templates/flex.html`.

## Testing And QA

For touched pages, check:

- Desktop layout.
- Mobile layout at roughly `390x844`.
- Horizontal overflow.
- Header/footer behavior.
- Forms and newsletter capture where relevant.
- No regressions to untouched page types.

Baseline screenshots from Phase 0 are in `docs/screenshots/`.

## Git Hygiene

- Leave unrelated dirty files alone, including `.DS_Store`, `prototype/.DS_Store`, and `prototype/slide-backgrounds.html`.
- Do not modify `original-production-theme/` unless explicitly asked.
- Keep commits phase-oriented when possible.
- Commit Phase 0 docs before implementation work if the user asks for a checkpoint.

## Legacy Notes

The old workflow guidance assumed routine direct uploads to `/PRO-HubUI-CHAD EDIT/` and referenced a narrower homepage/portfolio-logo workflow. The current cleanup is broader and should be driven by the tracker, audit, and explicit live-write checkpoints.
