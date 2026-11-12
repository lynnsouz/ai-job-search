import {
  SEARCH_URL,
  PAGE_SIZE,
  textFetch,
  parseSearchResponse,
  filterByAge,
  workplaceParam,
  writeError,
  type JobCard,
} from "../helpers.js"

export interface SearchOpts {
  query: string
  city?: string
  state?: string
  remote?: string // "remote" | "hybrid" | "onsite"
  jobage?: number
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

export function buildUrl(opts: SearchOpts): string {
  const params = new URLSearchParams()
  params.set("jobName", opts.query)
  const wt = workplaceParam(opts.remote)
  if (wt) params.set("workplaceType", wt)
  if (opts.state) params.set("state", opts.state)
  if (opts.city) params.set("city", opts.city)
  params.set("sortBy", "publishedDate")
  params.set("sortOrder", "desc")
  params.set("limit", String(PAGE_SIZE))
  params.set("offset", String((opts.page - 1) * PAGE_SIZE))
  return `${SEARCH_URL}?${params.toString()}`
}

function renderTable(cards: JobCard[]): string {
  if (cards.length === 0) return "No results."
  const header =
    "ID".padEnd(9) + " " + "TITLE".padEnd(44) + " " + "COMPANY".padEnd(24) + " " + "WHERE".padEnd(20) + " DATE"
  const rows = cards.map((c) => {
    const where = c.workplaceType === "remote" ? "Remote" : `${c.workplaceType ?? "—"}: ${c.location ?? "—"}`
    return [
      c.id.padEnd(9),
      c.title.slice(0, 44).padEnd(44),
      (c.company || "—").slice(0, 24).padEnd(24),
      where.slice(0, 20).padEnd(20),
      c.date ? c.date.slice(0, 10) : "—",
    ].join(" ")
  })
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(opts: SearchOpts): Promise<number> {
  try {
    const body = await textFetch(buildUrl(opts))
    if (!body) {
      writeError("Search endpoint returned 404 - Gupy may have moved its API; see url-reference.md", "NOT_FOUND")
      return 1
    }
    const { total, cards: all } = parseSearchResponse(body)
    let cards = filterByAge(all, opts.jobage)
    if (opts.limit !== undefined && opts.limit >= 0) cards = cards.slice(0, opts.limit)

    if (opts.format === "table") {
      process.stdout.write(renderTable(cards) + "\n")
    } else if (opts.format === "plain") {
      process.stdout.write(
        (cards.length
          ? cards
              .map(
                (c) =>
                  `${c.title}\n  ${c.company || "—"} · ${c.workplaceType || "—"} · ${c.location || "—"} · ${c.date?.slice(0, 10) || "—"}\n  id: ${c.id}\n  ${c.url}`,
              )
              .join("\n\n")
          : "No results.") + "\n",
      )
    } else {
      process.stdout.write(
        JSON.stringify({ meta: { count: cards.length, page: opts.page, total }, results: cards }, null, 2) + "\n",
      )
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED")
    return 1
  }
}
