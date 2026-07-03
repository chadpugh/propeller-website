# Propeller Build Tracker

Last updated: 2026-07-03

This is the working source of truth for the remaining Propeller site cleanup phases. Keep discovery evidence in `docs/propeller-phase-0-audit.md`; keep day-to-day status, decisions, blockers, and QA notes here.

## Current Status

- Overall status: Phase 0 complete; Phase 1 ready.
- Current phase: Phase 1 - shared list-row foundation and portfolio listing.
- Live HubSpot changes: none made yet.
- Production-write rule: no upload, deploy, template publish, module publish, page edit, HubDB edit, or live content change without an explicit checkpoint and approval.
- MCP status: HubSpot dev MCP is available and read-tested. Use MCP read tools first, then CLI/API/browser fallback only when MCP lacks the needed read capability.

## Status Legend

- Not started: no implementation work begun.
- Ready: discovery is sufficient and work can start.
- In progress: actively being worked.
- Needs Reece: blocked on content, design, or business decision.
- Blocked: blocked on access, permissions, or technical constraint.
- QA: implementation exists and needs review/testing.
- Done: accepted and no known follow-up remains.

## Phase Checklist

| Phase | Area | Status | Done Means | Notes |
| --- | --- | --- | --- | --- |
| 0 | Discovery and build readiness | Done | Audit, inventory, screenshots, MCP reconciliation, access gaps, and Phase 1 path documented. | See `propeller-phase-0-audit.md` and `propeller-content-inventory.csv`. |
| 1 | Shared list-row foundation and portfolio listing | Ready | Portfolio listing is text-forward, alphabetized, responsive, and no longer uses the legacy card/logo grid. Shared pattern is reusable for team. | Start here. Avoid company detail pages. |
| 2 | Team page mockup | Ready | Mockup exists for Reece/team review, using the shared row pattern and a proposed hero/photo treatment. | Do not fully implement before sign-off. |
| 3 | Blog and press room | Ready with access caveat | Blog/press listing layout is cleaned up, full-width, responsive, and has a tag/topic browse path if taxonomy access is available. | Blog scopes are still missing for API-level taxonomy audit. |
| 4 | Ocean MBA | Ready with access caveat | Ocean MBA inherits blog/press styling and uses the correct filtered feed/tag once source is confirmed. | Page is currently draft/public 404. |
| 5 | Pitch/contact | Ready | Existing long form remains functionally intact, with spacing/layout/form polish and mobile overflow fixed. | Do not convert to multi-step. |
| 6 | Individual bio pages | Needs Reece | Scope confirmed, then bio pages get consistent image/layout treatment and optional author-post lists if feasible. | Optional/add-on. |
| Final | Cross-page QA and handoff | Not started | All touched pages pass desktop/mobile QA, no horizontal overflow, newsletter capture is checked, and Reece has review notes. | Run after each implementation phase and again at the end. |

## Phase 1 Working Plan

- Build or adapt one shared text-row visual pattern before deep page-specific work.
- Apply it to the portfolio listing first.
- Keep company detail pages out of scope.
- Prefer alphabetized rows with company name, one-line description, tag(s), and link.
- Use small logos only if they support scanning without returning to a card grid.
- Add a mobile overflow check as part of the first implementation pass.

## Decisions Needed

| Decision | Owner | Needed By | Status | Notes |
| --- | --- | --- | --- | --- |
| Confirm exact HubSpot subscription tier and page-count limit. | Reece / HubSpot admin | Before changing content model | Open | Account reports `STANDARD`; exact limit was not exposed through available read tools. |
| Confirm HubDB availability and whether portfolio/team should move there. | Reece / HubSpot admin | Before choosing long-term data model | Open | Current access key lacks HubDB scopes. |
| Portfolio sort order: pure alphabetical or light grouping plus alphabetical. | Reece | Phase 1 | Open | Default recommendation is pure alphabetical. |
| Portfolio tag taxonomy source. | Reece | Phase 1 | Open | Options: existing sectors, cleaned short tag set, or reuse blog topics. |
| Team hero direction. | Reece / team | Phase 2 mockup | Open | Options: group photo, bento photo grid, fresh shoot, or AI composite. |
| Public clearance for team/action/personal photos. | Reece / team | Phase 2 | Open | Required before publishing photo-heavy team work. |
| Whether individual bio pages are in scope. | Reece | Phase 6 | Open | Published bio pages already exist, but scope is optional. |

## Access And Scope Blockers

| Blocker | Impact | Current Handling |
| --- | --- | --- |
| Missing HubDB scopes | Cannot confirm tables or use HubDB as a committed data path. | Treat HubDB as promising but unconfirmed. |
| Missing blog scopes | Cannot fully audit tags/topics/authors/posts through API. | Use public sitemap, screenshots, and UI/API fallback until scopes are granted. |
| Missing serverless scopes | Cannot list serverless functions through MCP. | Not a blocker for current CMS cleanup unless serverless is discovered in scope. |
| Subscription/page-limit details not exposed | Cannot prove the exact paid-tier constraint from tools alone. | Keep Reece confirmation as an open decision. |

## QA And Evidence Log

| Date | Area | Evidence | Result |
| --- | --- | --- | --- |
| 2026-07-02 | Phase 0 screenshots | `docs/screenshots/` | Desktop/mobile baseline captured for portfolio, about/team, blog, pitch, and press. |
| 2026-07-03 | HubSpot MCP smoke test | MCP CMS root/template listings | MCP is available and read-tested. |
| 2026-07-03 | CLI cleanup | `hs --version` | Single active CLI on agent PATH: `/opt/homebrew/bin/hs`, version `8.9.1`. |

## Deployment Log

| Date | Action | Target | Result | Notes |
| --- | --- | --- | --- | --- |
| 2026-07-03 | Phase 0 documentation only | Repo docs | Pending commit | No live HubSpot production changes. |

## Working Notes

- Keep edits scoped to `hubspot-theme/` unless a phase explicitly requires a different local path.
- Fetch remote HubSpot files to `/tmp` for comparison unless intentionally updating local theme files.
- Leave unrelated dirty files alone, including `.DS_Store`, `prototype/.DS_Store`, and `prototype/slide-backgrounds.html`.
- Prefer MCP for HubSpot reads, especially docs and CMS design-manager listings.
- For HubSpot platform questions, use MCP `search-docs` and `fetch-doc` before planning or implementation.
- For paths under `/PRO-HubUI-CHAD EDIT/`, escape or quote the space when using MCP/CLI listing commands.
