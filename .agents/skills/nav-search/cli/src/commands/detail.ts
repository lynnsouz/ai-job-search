import { BASE_URL, rscFetch, parseDetailPayload, writeError } from "../helpers.js"

export interface DetailOpts {
  id: string
  format: "json" | "plain"
}

const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i

/** Accept a raw posting UUID or a full detail-page URL. */
function normalizeId(input: string): string | null {
  const m = input.match(UUID_RE)
  return m ? m[0] : null
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const id = normalizeId(opts.id)
  if (!id) {
    writeError(`Could not parse a job UUID from "${opts.id}"`, "BAD_ID")
    return 1
  }
  try {
    const rsc = await rscFetch(`${BASE_URL}/stilling/${id}`)
    if (!rsc) {
      writeError("Job not found", "NOT_FOUND")
      return 1
    }
    const job = parseDetailPayload(rsc, id)
    if (job.title === "(untitled)" && !job.company) {
      writeError("Job not found", "NOT_FOUND")
      return 1
    }

    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "—"}`,
        "",
        job.reference ? `Reference: ${job.reference}` : "",
        job.applicationDue ? `Application due: ${job.applicationDue}` : "",
        job.date ? `Published: ${job.date}` : "",
        job.expires ? `Expires: ${job.expires}` : "",
        "",
        job.description || "(no summary)",
        "",
        `URL: ${job.url}`,
      ].filter((l) => l !== "")
      process.stdout.write(lines.join("\n") + "\n")
    } else {
      process.stdout.write(JSON.stringify(job, null, 2) + "\n")
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "DETAIL_FAILED")
    return 1
  }
}
