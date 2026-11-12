// Data source: Gupy's public job portal (portal.gupy.io), used by most Brazilian
// banks, fintechs and large companies to publish openings.
//
// - Search: the JSON endpoint the portal's own front-end calls,
//   GET https://portal.gupy.io/api/job-search/jobs?jobName=...&limit=...&offset=...
//   No authentication. robots.txt on portal.gupy.io allows everything.
// - Detail: each posting lives on the hiring company's career subdomain,
//   https://<subdomain>.gupy.io/jobs/<id>, a Next.js page whose __NEXT_DATA__
//   script carries the full job as JSON. Subdomain robots.txt allows "/" and
//   disallows only /companies and /candidates.
//
// Personal use only: Gupy's candidate terms forbid aggregating, copying or
// duplicating parts of the platform and overloading the service. Keep volume low.

export const SEARCH_URL = "https://portal.gupy.io/api/job-search/jobs"
export const PAGE_SIZE = 20

const UA = "Mozilla/5.0 (compatible; gupy-cli/1.0)"

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

/** Fetch text with exponential backoff + jitter on 429/5xx. Returns "" on a 404. */
export async function textFetch(url: string, accept = "application/json"): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: { "User-Agent": UA, Accept: accept, "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8" },
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

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export interface JobCard {
  id: string
  title: string
  company: string | null
  location: string | null
  workplaceType: string | null
  date: string | null
  deadline: string | null
  url: string
}

/** Map the CLI's remote|hybrid|onsite to Gupy's workplaceType values. */
export function workplaceParam(mode: string | undefined): string | null {
  switch ((mode || "").toLowerCase()) {
    case "remote":
      return "remote"
    case "hybrid":
      return "hybrid"
    case "onsite":
    case "on-site":
      return "on-site"
    default:
      return null
  }
}

function nonEmpty(v: unknown): string | null {
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null
}

/** Build a human-readable location: "City, State", or "Remote" when no place is given. */
export function formatLocation(city: unknown, state: unknown, workplaceType: unknown): string | null {
  const parts = [nonEmpty(city), nonEmpty(state)].filter((p): p is string => p !== null)
  if (parts.length) return parts.join(", ")
  return workplaceType === "remote" ? "Remote" : null
}

/** Strip Gupy's tracking query (?jobBoardSource=gupy_portal) from a job URL. */
function cleanUrl(url: string): string {
  return url.split("?")[0]
}

/**
 * Parse the search API's JSON. Each item is mapped independently, so one
 * malformed record is skipped instead of breaking the whole result set.
 */
export function parseSearchResponse(body: string): { total: number | null; cards: JobCard[] } {
  const data = JSON.parse(body) as { data?: unknown[]; pagination?: { total?: number } }
  if (!Array.isArray(data.data)) {
    throw new Error("Unexpected search response: no data array")
  }
  const cards: JobCard[] = []
  for (const raw of data.data) {
    try {
      const j = raw as Record<string, unknown>
      const id = j.id !== undefined && j.id !== null ? String(j.id) : null
      const title = nonEmpty(j.name)
      const jobUrl = nonEmpty(j.jobUrl)
      if (!id || !title || !jobUrl) continue
      cards.push({
        id,
        title,
        company: nonEmpty(j.careerPageName),
        location: formatLocation(j.city, j.state, j.workplaceType),
        workplaceType: nonEmpty(j.workplaceType),
        date: nonEmpty(j.publishedDate),
        deadline: nonEmpty(j.applicationDeadline),
        url: cleanUrl(jobUrl),
      })
    } catch {
      continue
    }
  }
  return { total: typeof data.pagination?.total === "number" ? data.pagination.total : null, cards }
}

/** Keep only cards published within the last `days` days (client-side; the API has no age filter). */
export function filterByAge(cards: JobCard[], days: number | undefined, now = Date.now()): JobCard[] {
  if (!days || days <= 0) return cards
  const cutoff = now - days * 86400_000
  return cards.filter((c) => {
    if (!c.date) return false
    const t = Date.parse(c.date)
    return !isNaN(t) && t >= cutoff
  })
}

// ---------------------------------------------------------------------------
// Detail
// ---------------------------------------------------------------------------

export interface JobRef {
  subdomain: string
  id: string
}

/**
 * Resolve a detail reference. Accepts:
 *   - https://<sub>.gupy.io/jobs/<id>
 *   - https://<sub>.gupy.io/job/<base64 {"jobId":...}>?jobBoardSource=...  (what search returns)
 *   - <sub>/<id>
 * A bare numeric id is not enough: postings only resolve on the company's own subdomain.
 */
export function parseJobRef(input: string): JobRef | null {
  const s = input.trim()
  const short = s.match(/^([a-z0-9-]+)\/(\d+)$/i)
  if (short) return { subdomain: short[1].toLowerCase(), id: short[2] }

  const host = s.match(/^https?:\/\/([a-z0-9-]+)\.gupy\.io\/(.*)$/i)
  if (!host) return null
  const subdomain = host[1].toLowerCase()
  if (subdomain === "portal" || subdomain === "www" || subdomain === "login") return null
  const path = host[2].split("?")[0]

  const numeric = path.match(/^jobs\/(\d+)/)
  if (numeric) return { subdomain, id: numeric[1] }

  const encoded = path.match(/^job\/([A-Za-z0-9+/=_-]+)/)
  if (encoded) {
    try {
      const b64 = encoded[1].replace(/-/g, "+").replace(/_/g, "/")
      const decoded = JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as { jobId?: unknown }
      if (decoded.jobId !== undefined && /^\d+$/.test(String(decoded.jobId))) {
        return { subdomain, id: String(decoded.jobId) }
      }
    } catch {
      return null
    }
  }
  return null
}

export interface JobDetail extends JobCard {
  country: string | null
  jobType: string | null
  language: string | null
  quickApply: boolean | null
  steps: string[]
  description: string | null
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

// Named entities common in Portuguese/Spanish postings (Gupy's rich-text editor emits them).
const NAMED: Record<string, string> = {
  aacute: "á", Aacute: "Á", agrave: "à", Agrave: "À", acirc: "â", Acirc: "Â", atilde: "ã", Atilde: "Ã",
  eacute: "é", Eacute: "É", ecirc: "ê", Ecirc: "Ê", iacute: "í", Iacute: "Í",
  oacute: "ó", Oacute: "Ó", ocirc: "ô", Ocirc: "Ô", otilde: "õ", Otilde: "Õ",
  uacute: "ú", Uacute: "Ú", uuml: "ü", Uuml: "Ü", ccedil: "ç", Ccedil: "Ç", ntilde: "ñ", Ntilde: "Ñ",
  ordf: "ª", ordm: "º", deg: "°", iexcl: "¡", iquest: "¿", laquo: "«", raquo: "»",
  ndash: "–", mdash: "—", hellip: "…", bull: "•", middot: "·", rsquo: "’", lsquo: "‘",
  ldquo: "“", rdquo: "”", euro: "€", copy: "©", reg: "®", trade: "™",
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&([A-Za-z]+);/g, (m, name: string) => NAMED[name] ?? m)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, dec) => numericEntity(parseInt(dec, 10)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => numericEntity(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
}

/** Turn a posting's HTML fragment into readable text, keeping paragraph and list breaks. */
export function htmlToText(html: string | null | undefined): string | null {
  if (!html) return null
  const text = html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|li|ul|ol|div|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
  const decoded = decodeHtmlEntities(text)
    .split("\n")
    .map((l) => l.replace(/[ \t ]+/g, " ").trim())
    .join("\n")
    .replace(/^- *\n+(?=\S)/gm, "- ") // <li><p>text</p></li> leaves the text on the next line
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n\n(?=- )/g, "\n") // no blank lines between consecutive bullets
    .trim()
  return decoded || null
}

/** Extract the job object from a career-page HTML document's __NEXT_DATA__ script. */
export function parseJobDetail(html: string, ref: JobRef): JobDetail | null {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
  if (!m) return null
  let job: Record<string, unknown> | undefined
  try {
    job = (JSON.parse(m[1]) as { props?: { pageProps?: { job?: Record<string, unknown> } } }).props?.pageProps?.job
  } catch {
    return null
  }
  if (!job || typeof job !== "object" || !nonEmpty(job.name)) return null

  const sections: [string, unknown][] = [
    ["", job.description],
    ["Responsabilidades e atribuições", job.responsibilities],
    ["Requisitos e qualificações", job.prerequisites],
    ["Informações adicionais / diferenciais", job.relevantExperiences],
  ]
  const description =
    sections
      .map(([heading, body]) => {
        const text = htmlToText(typeof body === "string" ? body : null)
        if (!text) return null
        return heading ? `## ${heading}\n${text}` : text
      })
      .filter((s): s is string => s !== null)
      .join("\n\n") || null

  const careerPage = (job.careerPage ?? {}) as Record<string, unknown>
  const steps = Array.isArray(job.jobSteps)
    ? (job.jobSteps as Record<string, unknown>[]).map((s) => nonEmpty(s?.name)).filter((s): s is string => s !== null)
    : []

  return {
    id: String(job.id ?? ref.id),
    title: String(job.name).trim(),
    company: nonEmpty(careerPage.name),
    location: formatLocation(job.addressCity, job.addressState, job.workplaceType),
    workplaceType: nonEmpty(job.workplaceType),
    date: nonEmpty(job.publishedAt),
    deadline: nonEmpty(job.registerEndDate) ?? nonEmpty(job.expiresAt),
    url: `https://${ref.subdomain}.gupy.io/jobs/${job.id ?? ref.id}`,
    country: nonEmpty(job.addressCountry),
    jobType: nonEmpty(job.jobType),
    language: nonEmpty(job.jobLanguage),
    quickApply: typeof job.quickApply === "boolean" ? job.quickApply : null,
    steps,
    description,
  }
}
