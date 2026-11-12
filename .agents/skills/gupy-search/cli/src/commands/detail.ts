import { textFetch, parseJobRef, parseJobDetail, writeError } from "../helpers.js"

export interface DetailOpts {
  ref: string
  format: "json" | "plain"
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const ref = parseJobRef(opts.ref)
  if (!ref) {
    writeError(
      `Could not resolve "${opts.ref}" - pass the job URL from search results (https://<company>.gupy.io/job/...) or "<company-subdomain>/<id>"; a bare id is not enough because postings only resolve on the company's own subdomain`,
      "BAD_ID",
    )
    return 1
  }
  try {
    const html = await textFetch(`https://${ref.subdomain}.gupy.io/jobs/${ref.id}`, "text/html")
    const job = html ? parseJobDetail(html, ref) : null
    if (!job) {
      writeError(`Job ${ref.id} not found on ${ref.subdomain}.gupy.io (closed, or wrong subdomain)`, "NOT_FOUND")
      return 1
    }

    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "—"} · ${job.workplaceType || "—"} · ${job.location || "—"}${job.country ? ` (${job.country})` : ""}`,
        `Published: ${job.date?.slice(0, 10) || "—"} · Deadline: ${job.deadline?.slice(0, 10) || "—"}`,
        job.steps.length ? `Steps: ${job.steps.join(" → ")}` : "",
        "",
        job.description || "(no description)",
        "",
        `URL: ${job.url}`,
      ].filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "")
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
