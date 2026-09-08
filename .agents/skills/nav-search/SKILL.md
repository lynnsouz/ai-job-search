---
name: nav-search
version: 1.0.0
description: >
  Use this skill to search for jobs on arbeidsplassen.nav.no, NAV's (Arbeids- og
  velferdsetaten, Norway's public employment service) job board. Norway-specific
  market, Norwegian-language postings. Trigger phrases: NAV jobs, ledige stillinger,
  jobbsøk Norge, arbeidsplassen, find a job in Norway, Norwegian job search,
  "stillinger i <sted>", search NAV.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/nav-search/cli/src/cli.ts *)
---

# NAV (arbeidsplassen.nav.no) Search Skill

Search live job listings from NAV's job board — Norway's public employment service,
one of the country's largest aggregators of job postings (it mirrors listings from
FINN.no and direct employer submissions alongside its own). No authentication, no API
key, and **zero runtime dependencies** — it runs with just `bun`.

> ⚠️ **Undocumented internal endpoint, not a stable public API.** `robots.txt` fully
> permits automated access, but arbeidsplassen.nav.no is a client-side-rendered
> Next.js app with no published JSON API. This skill reads the same internal React
> Server Components (RSC) payload the site's own frontend uses to hydrate the page
> (fetch the page URL with header `RSC: 1`). That payload's shape is a Next.js/React
> implementation detail, not a versioned contract — a NAV frontend redeploy can
> change it without notice. See `url-reference.md` for exactly what was verified and
> how, and re-verify against a live query if results ever come back empty or garbled.

## When to use this skill

- Search for job openings in Norway by keyword, county, or workplace type (remote/hybrid/onsite)
- Filter by recency (posted within the last N days)
- Get a short summary and key details (reference ID, application deadline, dates) for a specific posting

## Commands

### Search job listings

```bash
bun run .agents/skills/nav-search/cli/src/cli.ts search [flags]
```

Key flags:
- `--query <text>` / `-q <text>` — keyword search (Norwegian job titles/skills, e.g. `"iOS-utvikler"`, `"mobilutvikler"`). Recommended.
- `--location <county>` / `-l <county>` — a Norwegian county (fylke) name, e.g. `"OSLO"`, `"AGDER"`, `"VESTLAND"`. See `url-reference.md` for the full list. Optional.
- `--jobage <days>` — posted within N days, e.g. `1`, `3`, `7`. Omit for all postings.
- `--remote <mode>` — `remote`, `hybrid`, or `onsite` (workplace-type filter).
- `--page <n>` — page number (1-indexed, 25 results per page).
- `--limit <n>` / `-n <n>` — cap total results emitted (client-side).
- `--format json|table|plain` — default `json`.

### Fetch job detail

```bash
bun run .agents/skills/nav-search/cli/src/cli.ts detail <uuid|url> [--format json|plain]
```

`uuid` is the job ID from `search` results (e.g. `899c16a6-717b-4627-85e3-4d8ee8986049`).
You may also pass a full `arbeidsplassen.nav.no/stillinger/stilling/<uuid>` URL.

**Limitation:** returns a short summary (`description`, NAV's own `shortSummary` field),
not the posting's full long-form body text — the full description streams as a separate
internal RSC chunk this CLI does not attempt to parse (see `url-reference.md`). For the
complete posting text, open the `url` field in a browser, or use WebFetch as a fallback
per `.claude/skills/job-application-assistant/09-web-research.md` (note: WebFetch alone
will not render the page either, since it is client-side rendered — a browser tool is
needed for the full body).

## Usage examples

```bash
# iOS developer roles, table view
bun run .agents/skills/nav-search/cli/src/cli.ts search -q "iOS-utvikler" --format table

# Mobile developer roles in Agder (Arendal's county), remote only
bun run .agents/skills/nav-search/cli/src/cli.ts search -q "mobilutvikler" -l "AGDER" --remote remote --format table

# Developer roles posted in the last 3 days
bun run .agents/skills/nav-search/cli/src/cli.ts search -q "utvikler" --jobage 3 --format table

# Full detail for a specific posting
bun run .agents/skills/nav-search/cli/src/cli.ts detail 899c16a6-717b-4627-85e3-4d8ee8986049 --format plain
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default — programmatic use, passing IDs to `detail` |
| `table` | Quick human-readable scanning |
| `plain` | Reading a single job's summary (`detail` command) |

All errors are written to **stderr** as `{ "error": "...", "code": "..." }` and the process exits with code `1`.

## Notes

- Postings are almost entirely in **Norwegian** — write `--query` in Norwegian (e.g. "utvikler" not "developer"), and translate query categories per `search-queries.md`'s Language scope note.
- Many listings originate from FINN.no and are mirrored here (`source: "FINN"` in the raw data); treat NAV as one aggregator among several rather than a fully independent source when deduplicating.
- Pagination is 25 results per page.
- No authentication required; the CLI backs off on 429/5xx like the other shipped portal skills.
