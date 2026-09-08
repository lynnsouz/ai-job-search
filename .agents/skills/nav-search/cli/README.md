# nav-cli

CLI for searching jobs on **arbeidsplassen.nav.no**, NAV's (Norway's public
employment service) job board.

**Data source**: NAV's internal Next.js React Server Components (RSC) payload —
not a documented public API. See `../url-reference.md` for what was verified and
how fragile this is.
**Authentication**: None required.
**Dependencies**: None (plain `bun` + `fetch`). `bun install` is optional and only pulls dev type defs.

> ⚠️ Undocumented internal endpoint. `robots.txt` permits access, but the response
> shape is a Next.js implementation detail that can change without notice on any
> NAV frontend redeploy. If results come back empty or garbled, re-verify live
> per `../url-reference.md` before assuming a bug in this CLI.

## Installation

```bash
cd .agents/skills/nav-search/cli
bun install   # optional — only installs TypeScript dev types
```

The CLI runs without any install because it has zero runtime dependencies.

## Commands

| Command | Description |
|---------|-------------|
| `search` | Search for job listings |
| `detail` | Fetch a short summary for a single job listing (not the full body — see limitation below) |

`search` accepts `--format json|table|plain` (default `json`); `detail` accepts `--format json|plain`.
All errors are written to **stderr** as `{ "error": "...", "code": "..." }` with exit code `1`.

## Quick examples

```bash
# iOS developer roles
bun run src/cli.ts search -q "iOS-utvikler" --format table

# Mobile roles in Agder, remote only
bun run src/cli.ts search -q "mobilutvikler" -l "AGDER" --remote remote --format table

# Posted in the last 3 days
bun run src/cli.ts search -q "utvikler" --jobage 3 --format table

# Full detail for one job
bun run src/cli.ts detail 899c16a6-717b-4627-85e3-4d8ee8986049 --format plain
```

See `../SKILL.md` for the full flag reference.

## Search flags

| Flag | Alias | Description |
|------|-------|-------------|
| `--query` | `-q` | Keywords (Norwegian — job title, skill, or role). Recommended. |
| `--location` | `-l` | Norwegian county (fylke), e.g. `"OSLO"`, `"AGDER"`. See `../url-reference.md` for the full list. |
| `--jobage` | | Posted within N days, e.g. `1`, `3`, `7`. |
| `--remote` | | `remote` \| `hybrid` \| `onsite`. |
| `--page` | | 1-indexed page (25 results/page). |
| `--limit` | `-n` | Cap results emitted. |
| `--format` | | `json` \| `table` \| `plain`. |

## Known limitation: `detail` returns a summary, not the full posting body

NAV's frontend streams a posting's long-form description as a separate
internal RSC text chunk this CLI does not parse (would require reimplementing
part of `react-server-dom-webpack`'s client against an undocumented format —
see `../url-reference.md` for the full explanation). `detail` instead returns
NAV's own `shortSummary` field (typically one paragraph) plus reference ID,
dates, and application deadline. For the complete text, open the returned
`url` in a browser.
