# safeautonomy — website

Static site. No build step, no dependencies. Open `index.html` directly, or run
`node serve.js` and visit <http://localhost:5173> (the server is only for local
preview — it is not needed to deploy).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero video, the three-standard problem framing, the "one safety argument" bridge, services teaser, process, regulatory readiness, about, contact |
| `services.html` | Services overview — the differences between the standards, comparison table, the hazard ecosystem, the three seams, cross-cutting work |
| `service-iso-26262.html` | Sub-page — functional safety |
| `service-sotif.html` | Sub-page — ISO 21448 / SOTIF (includes the Area 1–4 scenario quadrant) |
| `service-safe-ai.html` | Sub-page — ISO/PAS 8800 (includes the 8-stage AI safety lifecycle) |
| `blog.html` | Blog — 6 full articles, expandable in place, filterable by topic |

## Assets

```
assets/css/styles.css   design system — all colours live in :root at the top
assets/js/main.js       nav, dropdown, scroll reveal, blog filter
assets/video/hero.mp4   your video, used as the hero background on every page
assets/img/             put saim.jpg here (see below)
```

## Colours

Taken from the LinkedIn banner and defined once in `assets/css/styles.css`:

| Token | Value | Where it came from |
|---|---|---|
| `--bg` | `#080F16` | banner background |
| `--cyan` | `#29D3D8` | "AI SAFETY EXPERT" |
| `--lime` | `#D8F32E` | tagline, photo frame, arrow |

The banner's clipped-corner frame (top-left + bottom-right) is reused as the
`.cut` / `.frame` / `.post` shape throughout, and the faint grid is the page
background.

## Before going live — placeholders to replace

1. **Portrait.** Save your photo as `assets/img/saim.jpg`, then in `index.html`
   (About section) delete the placeholder `<div class="founder__photo">…</div>`
   and uncomment the `<img>` line directly above it.
2. **Email.** `info@safeautonomy.de` appears on every page. Find-and-replace
   it with your real address.
3. **LinkedIn.** The footer links to `https://www.linkedin.com/` — replace with
   your profile URL (also appears at the end of `blog.html`).
4. **Company details.** Add an imprint / Impressum and privacy policy page if
   you operate from the EU — legally required for a commercial site.
5. **AFGBV.** The site uses AFGBV (Autonome-Fahrzeuge-Genehmigungs- und
   Betriebs-Verordnung) throughout. Confirm this is the regulation you meant.

## Blog

Each post is a native `<details>` element — it expands in place, works without
JavaScript, and is keyboard accessible. To add a post, copy any `<details
class="post reveal" data-topics="…">` block. `data-topics` drives the filter
chips; valid values are `iso26262`, `sotif`, `ai`, `regulation`, `practice`.

If the blog outgrows a single page, split each `<details>` into its own
`blog-<slug>.html` and turn the summaries into links.

## Deploying

Drag the whole folder into Netlify Drop, or push to GitHub and enable Pages.
Both serve it as-is. Note the video is 27 MB — it is already excluded on
screens under 700 px wide (a gradient stands in), but if first-load speed
matters, re-encode it to ~1080p at a lower bitrate.
