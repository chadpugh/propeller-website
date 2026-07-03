# Propeller Phase 0 Audit

Date: 2026-07-02; MCP reconciliation updated 2026-07-03
Portal: `20619041`
Default CLI account: `chad_cli`

## MCP And Access Status

- Initial Phase 0 discovery ran before HubSpot dev MCP was exposed in this Codex/Antigravity session, so the first pass used HubSpot CLI, read-only HubSpot CMS API calls, public route checks, the public sitemap, and headless Chrome screenshots.
- HubSpot dev MCP is now available as `mcp__hubspotdev` after local setup. Read-only smoke tests succeeded for CMS root listing and remote template listing:
  - CMS root: `@hubspot`, `HubUI`, `HubUI-Theme`, `PRO-HubUI-2022`, `PRO-HubUI-CHAD EDIT`, and `propeller-theme`.
  - `/PRO-HubUI-2022/templates`: `blog-index.html`, `blog-post.html`, `company-post.html`, `flex.html`, `layouts`, `partials`, and `system`.
  - `/PRO-HubUI-CHAD EDIT/templates`: `blog-index.html`, `blog-post.html`, `company-post.html`, `flex.html`, `layouts`, `partials`, `propeller-homepage.fields.json`, `propeller-homepage.html`, and `system`.
  - `/propeller-theme`: `css`, `js`, and `templates`.
- MCP path note: CMS paths containing spaces, such as `/PRO-HubUI-CHAD EDIT/...`, need escaping or shell quoting when using `list_cms_remote_contents`.
- Current local HubSpot CLI is installed at `/opt/homebrew/bin/hs` and reports version `8.9.1`.
- CLI account auth type is `personalaccesskey`; `hs account info` confirms source `hubspot.config.yml`, account ID `20619041`, and account type `STANDARD`.
- MCP project discovery found no `hsproject.json` files under this repo; this is a CMS/theme repo, not a HubSpot developer project repo.
- MCP `get_apps_info` returned no apps for this account, which is expected for the current CMS cleanup work.
- Available scopes include `cms.source_code.read`, `cms.source_code.write`, `cms.pages.site_pages.read`, `cms.pages.landing_pages.read`, `cms.domains.read`, `files`, and CRM read scopes.
- Missing/blocked scopes:
  - `hs hubdb list` failed because the access key is missing required HubDB scopes.
  - CMS blog post, tag, and author API calls returned 403 because required blog scopes are not granted.
  - MCP serverless function listing also failed because the access key is missing required scopes.
  - Subscription tier/page-count limit could not be fully confirmed from available API/CLI access. The account reports `STANDARD`, and the current site inventory shows heavy use of draft standalone pages plus blog posts for live company detail pages.
  - The exposed developer MCP does not currently provide direct page-inventory, blog taxonomy, HubDB table, or subscription-limit read tools, so those Phase 0 findings still rely on CLI/API/UI fallback evidence.

## Content And Page Map

- CMS API returned 46 site pages and 1 landing page.
- Public route checks:
  - `/portfolio`, `/about`, `/press-room`, `/pitch`, `/blog-feed`, and `/brian-halligan` return 200.
  - `/oceanmba` returns 404 publicly because its CMS page is currently `DRAFT`.
  - Draft company page example `/vatn` returns 404 publicly.
- Sitemap parse returned 56 URLs total:
  - 54 `/blog/...` URLs.
  - Non-`/blog/...` sitemap URLs were only `https://propellervc.com/blog` and `https://propellervc.com`.
  - Many company details are live as blog posts, e.g. `/blog/meet-aikido`, `/blog/meet-carbonrun`, `/blog/meet-vatn`, `/blog/meet-blue-energy`, and `/blog/meet-vema-hydrogen`.
- Published standalone bio pages exist for Brian Halligan, Devdutt Yellurkar, Melissa Hanson, Reece Pacheco, Robert Kittler, Rodrigo Prudencio, and Steven Fox.
- Many standalone portfolio-company pages exist as draft site pages. Most older draft company pages still use `PRO-HubUI-2022/templates/flex.html`; newer drafts use `PRO-HubUI-CHAD EDIT/templates/flex.html`.

## Template And Module Ownership

- Live design directories include `/PRO-HubUI-CHAD EDIT/`, `/PRO-HubUI-2022/`, `/propeller-theme/`, `/HubUI-Theme/`, and HubSpot system directories.
- Both `/PRO-HubUI-CHAD EDIT/` and `/PRO-HubUI-2022/` were fetched to `/tmp` only for comparison.
- Active published key pages:
  - Home: `PRO-HubUI-CHAD EDIT/templates/propeller-homepage.html`
  - Portfolio: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module label `Resources Listing`
  - Team/About: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module label `People Listing`
  - Press Room: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module label `Resources Listing`
  - Pitch Us: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module labels `Full-Width Content` and `Form`
  - Blog Feed page: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module label `Blog Feed`
  - Bio pages: `PRO-HubUI-CHAD EDIT/templates/flex.html`, module label `Hero`
- Theme comparison notes:
  - CHAD EDIT differs from PRO-HubUI-2022 by adding Propeller custom assets/scripts/styles, including `css/propeller-styles.css`, `js/propeller-scripts.js`, `js/propeller-background-animation.js`, `templates/propeller-homepage.html`, and `modules/Portfolio`.
  - Local `hubspot-theme/` is close to fetched CHAD EDIT but not identical. Remote CHAD EDIT includes generated `_locales` folders and `templates/propeller-homepage.fields.json`; several module metadata/field files differ.
  - Local blog templates still include legacy references to `/PRO-HubUI-2022/modules/_bop/...`; verify before blog template edits.

## Data Sources And Taxonomy

- Portfolio listing is not using the custom `Portfolio` logo-grid module. The live `/portfolio` page uses `Resources Listing`.
- Press Room also uses `Resources Listing`, so portfolio and press room currently share the same card/filter family.
- Team/About uses `People Listing`, which already contains fields for name, title, image, bio/about link, filters, and social links.
- Blog Feed page uses `Blog Feed`; the live `/blog` route uses the legacy blog listing template.
- Blog tags/topics/authors could not be audited through API because blog scopes are missing. Public sitemap confirms 54 indexed blog posts and 20 company/portfolio-like blog posts.
- HubDB feasibility could not be fully verified because HubDB list access is blocked by missing scopes. Treat HubDB as promising but unconfirmed until access is granted.

## Asset Readiness

| Asset Area | Finding | Status |
| --- | --- | --- |
| Portfolio logos | Home sitemap includes 20+ portfolio logo/image references, including Aikido, Allium, Aquatic Labs, Banyu, Blue Energy, Calcarea, CarbonRun, Ebb, Fleet Robotics, Hum.ai, Indeximate, Navier, Orpheus, pHathom, Rewind, Vatn, Vema, and others. | Likely available |
| Team headshots | `/about` renders large square/rectangular headshot cards. | Available for listed team members |
| Group/action photos | Sitemap includes several team/event-looking images such as `PropellerLeadership-7.jpg`, `linderpix-Propeller-5216-web-v2.jpg`, Ocean MBA event photos, and Reece/team photos. | Needs clearance review |
| Ocean MBA imagery | Public blog posts include many Ocean MBA/WHOI images. | Available, but page is draft |
| Image clearance | No clearance metadata was visible through available read tools. | Needs Reece confirmation |

## Screenshot Notes

Screenshots are saved in `docs/screenshots/`:

- [Portfolio desktop](screenshots/propeller-phase0-portfolio-desktop.png)
- [About/team desktop](screenshots/propeller-phase0-about-desktop.png)
- [Press room desktop](screenshots/propeller-phase0-press-desktop.png)
- [Pitch desktop](screenshots/propeller-phase0-pitch-desktop.png)
- [Blog desktop](screenshots/propeller-phase0-blog-desktop.png)
- [Portfolio mobile](screenshots/propeller-phase0-portfolio-mobile.png)
- [About/team mobile](screenshots/propeller-phase0-about-mobile.png)
- [Blog mobile](screenshots/propeller-phase0-blog-mobile.png)
- [Pitch mobile](screenshots/propeller-phase0-pitch-mobile.png)

Observed layout issues:

- Portfolio desktop is still a large logo/card grid with two dropdown filters. It does not match the planned text-forward list.
- Portfolio mobile clips horizontally: the heading and logo cards extend beyond the viewport.
- Team/About desktop is still a card grid with large headshots and centered card text. Mobile also clips the heading.
- Press Room desktop uses the same card/filter pattern as Portfolio. It has no visible tag/sidebar system in the first viewport.
- Blog desktop uses the legacy blog listing, showing one large post with image, author meta, read-more, and share controls. No topic sidebar appears in the first viewport.
- Blog mobile clips the featured image/title horizontally.
- Pitch desktop is already text-forward and form-focused. Mobile still clips intro copy and form fields horizontally.

## Recommended Phase 1 Path

- Build a shared text-row pattern first, then apply it to portfolio and team. The current `Resources Listing` and `People Listing` modules are too card-oriented for the brief.
- For portfolio, prefer either:
  - A new shared list-row module backed by module fields for the first cleanup pass, or
  - HubDB-backed rows if HubDB access and table permissions are confirmed.
- For team, produce a mockup first using the same row pattern, with optional small square headshots or no listing images, then wait for Reece/team approval before full implementation.
- For blog/press/Ocean MBA, consolidate around blog/topic data only after blog scopes are granted. Avoid building a separate manual tag system unless HubSpot blog taxonomy cannot be exposed.
- Add a global mobile overflow regression gate. Current portfolio, team, blog, and pitch views all show horizontal clipping at `390x844`.
- Treat Ocean MBA as a draft-state decision before styling work. The live route is currently 404, while related Ocean MBA blog posts are published.

## Open Questions For Reece

- Confirm the current HubSpot subscription tier and the exact standalone page limit driving the blog-post structure.
- Confirm whether HubDB is available and whether the project should use it for portfolio/team listing data.
- Confirm final portfolio sort: pure alphabetical, or alphabetical with light metadata/grouping.
- Confirm the tag taxonomy source: reuse current blog topics, create a short new portfolio tag set, or combine both.
- Confirm team-page hero direction: group photo, bento grid from existing photos, fresh group shoot, or AI composite.
- Confirm which team/personal/action photos are cleared for public website use.
- Confirm whether individual bio pages remain in scope, since several standalone bio pages are already published.
