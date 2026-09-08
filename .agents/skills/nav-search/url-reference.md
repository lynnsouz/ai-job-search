# NAV (arbeidsplassen.nav.no) URL Reference

Investigated 2026-09-07 via live browser network inspection (Chrome DevTools
network tab, through the `claude-in-chrome` tool) after static `curl`/`WebFetch`
inspection failed to find any endpoint — the site is a client-side-rendered
Next.js App Router app, so its raw HTML carries no job data at all, only script
tags. A future maintainer hitting parse failures should start by repeating this
same live-inspection process rather than assuming the fields below still exist.

## Access

- `robots.txt` (`https://arbeidsplassen.nav.no/robots.txt`): `User-agent: *` /
  `Disallow:` (empty) — full access permitted for all paths.
- No authentication required for search or detail.
- NAV also publishes an *official*, documented feed API
  (`pam-stilling-feed.ekstern.dev.nav.no`) — but it requires bearer-token
  authentication, which is a materially different proposition (credentialed,
  billed-or-approval-gated) from this skill's approach. Deliberately not used
  here; revisit if NAV ever opens that feed without auth.

## The RSC payload trick

Next.js App Router pages can be requested as their internal "flight" payload
(what the browser fetches to hydrate/soft-navigate) instead of full HTML, by
setting header `RSC: 1` on a GET to the same page URL:

```
GET https://arbeidsplassen.nav.no/stillinger?q=<query>
Headers: RSC: 1
```

Response: `content-type: text/x-component`, a newline-delimited stream of
`<chunkId>:<data>` entries. Most chunks are React element trees or module
references (irrelevant); exactly one chunk (verified id `"42"` in the sample
that produced this doc — **do not hardcode that id**, find it by content) embeds
the actual search results as plain JSON under a `searchResult` key:

```json
{
  "searchResult": {
    "ads": [ /* array of ad objects, see below */ ],
    "totalAds": 6,
    "totalPositions": 9,
    "aggregations": { /* facet counts, see Facets below */ }
  },
  "aggregations": { /* same as above, top-level alias */ },
  "locations": [ /* full county/municipal lookup tree, see Location filter */ ],
  "resultsPerPage": 25
}
```

**Parsing method** (see `cli/src/helpers.ts:parseSearchPayload`): split the raw
response on `"\n"`, find the line containing `"searchResult"`, strip its
`<id>:` prefix, and `JSON.parse` the remainder. This worked reliably in testing
because the search-result chunk has no long free-text fields to break the
parse (`ads[].description` in the *list* view is always `""`).

### Ad object fields (search results)

```json
{
  "uuid": "899c16a6-717b-4627-85e3-4d8ee8986049",
  "score": 15.92,
  "source": "FINN",
  "keywords": "seniorutvikler,native ios,native android,apputvikling",
  "published": "2026-09-07T08:38:16.846751294+02:00",
  "jobTitle": "Senior native apputviklere",
  "title": "Blir du fortsatt litt gira av en skikkelig god app?",
  "description": "",
  "searchtags": [{"label": "C++ utvikler", "score": 1}],
  "searchtagsai": ["Android-utvikler", "Apputvikler", "Swift", "iOS-utvikler"],
  "applicationDue": "Snarest",
  "locationList": [{"country": "NORGE", "address": "Tullins gate 4C", "city": "OSLO", "postalCode": "0166", "county": "OSLO", "municipal": "OSLO"}],
  "location": "",
  "categoryList": [],
  "employer": {"name": "yttr AS"},
  "reference": "475282676",
  "status": "ACTIVE",
  "expires": "2026-09-12T07:05:37.920524+02:00"
}
```

Note: NAV's own `title` field is frequently a catchy headline ("Blir du
fortsatt litt gira av en skikkelig god app?" = "Are you still a little excited
about a really good app?"), while `jobTitle` is the more literal role title
("Senior native apputviklere"). The CLI prefers `title`, falling back to
`jobTitle`, matching what the site itself displays as the primary heading.

### Detail page URL

```
https://arbeidsplassen.nav.no/stillinger/stilling/<uuid>
```

(confirmed via the anchor hrefs on the search results page — `uuid` is the same
value as `ads[].uuid` from search).

### Detail page RSC payload — the full description does NOT inline cleanly

Fetching the detail URL with `RSC: 1` returns a much larger payload containing
an `"adData":{...}` object with the same core fields plus `shortSummary` (a
one-paragraph summary) — but its long-form HTML description is streamed as a
**separate referenced text chunk** (`T<byteLength>,<raw bytes>`) that the
JSON-bearing chunk points to rather than inlines. Splitting the payload into
chunks on `\n(?=[0-9a-f]+:)` and attempting `JSON.parse` on the chunk
containing `"adData"` throws (`Unexpected token 'T'...`) because that chunk's
raw text contains an embedded pointer into the separate text chunk, not valid
JSON at that position. Full flight-protocol chunk resolution (matching `$T`
references across chunks) would be needed to get the complete formatted
description reliably — not implemented here, since it would require
essentially reimplementing `react-server-dom-webpack`'s client parser against
an undocumented, version-coupled format for one field.

**What this CLI does instead** (`cli/src/helpers.ts:parseDetailPayload`):
finds the `"adData"` anchor byte-offset, then does a bounded scan from that
offset for `"fieldName":"..."` string literals (respecting `\"` escaping) —
`title`, `name` (employer), `shortSummary`, `reference`,
`applicationDueLabel`, `published`, `expires`. This is resilient to the rest
of the chunk being malformed JSON, at the cost of only surfacing short fields,
not the full body.

If a full-text description is needed, render the detail URL in an actual
browser (the DOM's `<article>` element contains the fully rendered text, e.g.
via `article.innerText` — verified live) rather than trying to extend this
RSC-chunk approach.

## Query parameters (search)

| Param | Meaning | Values | Verified how |
|---|---|---|---|
| `q` | Free-text query | e.g. `iOS-utvikler` | Used throughout testing |
| `county` | Norwegian county (fylke) filter | uppercase key, e.g. `OSLO`, `AGDER` — see full list below | `county=OSLO` cut a 196-result set to 112 |
| `published` | Posted-within window | Elasticsearch date math: `now-1d`, `now-3d`, `now-7d`, `now/d` | Values observed in the `aggregations.published` facet buckets; `published=now-3d` cut 196→33 |
| `remote` | Workplace-type filter | `Kun hjemmekontor` (remote-only) · `Delvis hjemmekontor` (hybrid) · `Ingen mulighet for hjemmekontor` (onsite) · `Ikke oppgitt` (unspecified) | Values from `aggregations.remote` facet; `remote=Kun hjemmekontor` cut 196→2 |
| `from` | Pagination offset (not page number) | integer, e.g. `0`, `25`, `50` | `from=2` returned a different first result than the default; `page`/`p`/`offset`/`pageNumber` all had **no effect** — do not use those names |

**`from` is a raw result offset, not a 1-indexed page.** The CLI computes it as
`(page - 1) * 25` to present the conventional 1-indexed `--page` flag the
portal-skill contract expects.

### Location filter — full county list

From the search payload's `locations[]` lookup (label in Norwegian, `key` is
the exact value to pass as `--location`):

| key | label |
|---|---|
| OSLO | Oslo |
| AGDER | Agder |
| VESTLAND | Vestland |
| ROGALAND | Rogaland |
| MØRE OG ROMSDAL | Møre og Romsdal |
| NORDLAND | Nordland |
| TROMS | Troms |
| FINNMARK | Finnmark |
| TRØNDELAG | Trøndelag |
| INNLANDET | Innlandet |
| AKERSHUS | Akershus |
| BUSKERUD | Buskerud |
| TELEMARK | Telemark |
| VESTFOLD | Vestfold |
| ØSTFOLD | Østfold |
| KONTINENTALSOKKELEN | (Continental shelf — offshore) |
| SVALBARD | Svalbard |
| JAN MAYEN | Jan Mayen |
| UTLAND | (Abroad) |

A finer `municipal` (kommune) facet exists in the location lookup tree
(`locations[].municipals[]`, keyed like `NORDLAND.BODØ`) but a
`municipal=OSLO.OSLO` test query had **no effect** on result count — the
correct param name/format for municipal-level filtering was not found. Only
`county` is wired into this CLI; revisit if municipality-level filtering
becomes worth the extra investigation.

## Facets (from `aggregations`)

Available facet keys (each an array of `{key, count}` buckets, useful for
understanding what filter values are valid): `remote`, `occupationFirstLevels`,
`needDriversLicense`, `hasSuperraskSoknad`, `under18`, `summerJob`,
`experience`, `extent`, `education`, `workLanguage`, `engagementTypes`,
`published`, `sector`. Only `published` and `remote` are wired into this CLI;
the others are documented here for a future extension.

## Notes

- Data ultimately mixes NAV's own listings with mirrored FINN.no postings
  (`ads[].source` is `"FINN"` for many results) — expect overlap with any
  FINN-based portal skill added later.
- No rate-limit behavior was observed during testing (a handful of requests);
  the CLI still backs off on 429/5xx defensively, matching every other shipped
  portal skill.
