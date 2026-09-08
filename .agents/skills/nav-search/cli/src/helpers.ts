// Data source: arbeidsplassen.nav.no (NAV, Norway's public employment service).
// robots.txt permits full access (Disallow: <empty> for User-agent: *).
//
// The site is a client-side-rendered Next.js App Router app with no plain HTML
// or documented JSON API. Its search/detail pages ARE fetchable as the raw React
// Server Components (RSC) "flight" payload Next.js itself uses to hydrate the
// page client-side: request the same page URL with header `RSC: 1` and the
// response (content-type text/x-component) is a newline-delimited stream of
// `<chunkId>:<data>` entries. The chunk carrying the actual search results
// parses as ordinary JSON once you strip its `<id>:` prefix - verified live via
// browser network inspection (see url-reference.md for the full trail).
//
// This is an internal, undocumented Next.js protocol, not a stable public API.
// It can break on any NAV frontend redeploy that changes chunk shape. Detail
// pages stream their long description as a *separate* text chunk the RSC format
// references by pointer rather than inlining, which defeats simple JSON.parse of
// the whole chunk - so `detail` extracts specific fields (title, employer,
// shortSummary, dates) with a bounded string-field scanner instead of a full
// parse. That scanner is resilient to the surrounding chunk being malformed
// JSON, which a whole-chunk JSON.parse is not.

export const BASE_URL = "https://arbeidsplassen.nav.no/stillinger"

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA = "Mozilla/5.0 (compatible; nav-search-cli/1.0)"

/** Fetch a page's RSC flight payload with exponential backoff on 429/5xx. Returns "" on 404. */
export async function rscFetch(url: string): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/x-component",
        "RSC": "1",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    })
    if (response.status === 429 || response.status >= 500) {
      if (attempt === maxRetries) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      const jitter = Math.floor(Math.random() * 500)
      await new Promise((r) => setTimeout(r, delay + jitter))
      delay = Math.min(delay * 2, 8000)
      continue
    }
    if (response.status === 404) return ""
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }
    return response.text()
  }
  throw new Error("Request failed after max retries")
}

export interface JobCard {
  id: string
  title: string
  company: string | null
  companyUrl: string | null
  location: string | null
  date: string | null
  url: string
}

export interface JobDetail extends JobCard {
  description: string | null
  reference: string | null
  applicationDue: string | null
  expires: string | null
}

interface RawAd {
  uuid: string
  title?: string
  jobTitle?: string
  employer?: { name?: string }
  reference?: string
  published?: string
  locationList?: Array<{ city?: string; county?: string; municipal?: string }>
}

function formatLocation(ad: RawAd): string | null {
  const loc = ad.locationList?.[0]
  if (!loc) return null
  const city = loc.city ? titleCase(loc.city) : null
  const county = loc.county ? titleCase(loc.county) : null
  if (city && county && city.toLowerCase() !== county.toLowerCase()) return `${city}, ${county}`
  return city || county || null
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/(\s+)/)
    .map((w) => (w.trim() ? w[0].toUpperCase() + w.slice(1) : w))
    .join("")
}

/**
 * Find the RSC chunk containing the search results and parse it as JSON.
 * The chunk is a newline-delimited `<id>:<json>` entry; we split the whole
 * payload into such entries and pick the one carrying "searchResult", which
 * (for the search endpoint) is a clean, self-contained JSON array/object with
 * no long free-text fields to trip up the parse.
 */
export function parseSearchPayload(rsc: string): {
  ads: RawAd[]
  totalAds: number
  errors: unknown[]
} {
  const lines = rsc.split("\n")
  const line = lines.find((l) => l.includes('"searchResult"'))
  if (!line) return { ads: [], totalAds: 0, errors: [] }
  const colon = line.indexOf(":")
  const rest = line.slice(colon + 1)
  const parsed = JSON.parse(rest)
  // Payload shape: [..., ..., ..., { searchResult: { ads, totalAds, ... }, errors, ... }]
  const props = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed
  const sr = props?.searchResult ?? { ads: [], totalAds: 0 }
  return { ads: sr.ads ?? [], totalAds: sr.totalAds ?? 0, errors: props?.errors ?? [] }
}

export function adToJobCard(ad: RawAd): JobCard {
  return {
    id: ad.uuid,
    title: ad.title || ad.jobTitle || "(untitled)",
    company: ad.employer?.name ?? null,
    companyUrl: null,
    location: formatLocation(ad),
    date: ad.published ?? null,
    url: `${BASE_URL}/stilling/${ad.uuid}`,
  }
}

/**
 * Bounded scan for `"field":"value"` starting at (or after) `fromIdx`, respecting
 * JSON string escaping. Used instead of a full JSON.parse of the detail page's
 * chunk, because that chunk references its long description via a separate
 * streamed text chunk the RSC format doesn't inline - a whole-chunk parse throws
 * on that reference, but the short fields we need (title, employer, summary,
 * dates) all appear as ordinary inline JSON strings before it.
 */
export function extractStringField(text: string, field: string, fromIdx = 0): string | null {
  const marker = `"${field}":"`
  const start = text.indexOf(marker, fromIdx)
  if (start === -1) return null
  let i = start + marker.length
  let out = ""
  while (i < text.length) {
    const c = text[i]
    if (c === "\\") {
      out += text[i] + text[i + 1]
      i += 2
      continue
    }
    if (c === '"') break
    out += c
    i++
  }
  try {
    return JSON.parse(`"${out}"`)
  } catch {
    return out
  }
}

export function parseDetailPayload(rsc: string, uuid: string): JobDetail {
  // "adData" anchors the real ad object; searching from this index skips an
  // unrelated 404-fallback component elsewhere in the stream that also has a
  // "title" field.
  const anchor = rsc.indexOf('"adData"')
  const from = anchor === -1 ? 0 : anchor
  const title = extractStringField(rsc, "title", from)
  const company = extractStringField(rsc, "name", from)
  const description = extractStringField(rsc, "shortSummary", from)
  const reference = extractStringField(rsc, "reference", from)
  const applicationDue = extractStringField(rsc, "applicationDueLabel", from)
  const published = extractStringField(rsc, "published", from)
  const expires = extractStringField(rsc, "expires", from)

  return {
    id: uuid,
    title: title || "(untitled)",
    company,
    companyUrl: null,
    location: null,
    date: published,
    url: `${BASE_URL}/stilling/${uuid}`,
    description,
    reference,
    applicationDue,
    expires,
  }
}

/** Job-age in days -> NAV's `published` Elasticsearch date-math value. */
export function jobageToPublished(days: number | undefined): string | null {
  if (!days || days <= 0) return null
  return `now-${days}d`
}

/** Workplace-type flag -> NAV's Norwegian-language `remote` facet value. */
export function remoteToFacet(mode: string | undefined): string | null {
  switch ((mode || "").toLowerCase()) {
    case "remote":
      return "Kun hjemmekontor"
    case "hybrid":
      return "Delvis hjemmekontor"
    case "onsite":
    case "on-site":
      return "Ingen mulighet for hjemmekontor"
    default:
      return null
  }
}
