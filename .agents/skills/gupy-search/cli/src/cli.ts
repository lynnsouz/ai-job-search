#!/usr/bin/env bun
// Self-contained CLI for searching Brazilian job postings on Gupy (portal.gupy.io).
// Zero runtime dependencies - runs anywhere `bun` is available.
//
// Personal use only. Gupy's candidate terms forbid aggregating, copying or
// duplicating parts of the platform and overloading the service, so keep volume
// low and never use this commercially or for bulk data collection.

import { runSearch, type SearchOpts } from "./commands/search.js"
import { runDetail, type DetailOpts } from "./commands/detail.js"

interface Flags {
  _: string[]
  [k: string]: string | boolean | string[]
}

function parseFlags(argv: string[]): Flags {
  const flags: Flags = { _: [] }
  const alias: Record<string, string> = { q: "query", l: "city", n: "limit", location: "city" }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("-")) {
      const key = alias[a.replace(/^-+/, "")] ?? a.replace(/^-+/, "")
      const next = argv[i + 1]
      if (next === undefined || next.startsWith("-")) {
        flags[key] = true
      } else {
        flags[key] = next
        i++
      }
    } else {
      ;(flags._ as string[]).push(a)
    }
  }
  return flags
}

const HELP = `gupy-cli — search Brazilian job postings on Gupy (portal.gupy.io)

USAGE
  bun run src/cli.ts search --query "<title>" [flags]
  bun run src/cli.ts detail <job-url | subdomain/id> [--format json|plain]

SEARCH FLAGS
  --query, -q <text>         Words in the job TITLE. REQUIRED. e.g. "iOS", "desenvolvedor ios".
  --remote <mode>            remote | hybrid | onsite (workplace type).
  --state <text>             Brazilian state as Gupy writes it, e.g. "São Paulo", "Distrito Federal".
  --location, -l <text>      City, e.g. "São Paulo", "Curitiba".
  --jobage <days>            Published within N days (client-side filter on the fetched page).
  --page <n>                 1-indexed page (20 results/page). Default 1.
  --limit, -n <n>            Cap results emitted (client-side).
  --format <fmt>             json (default) | table | plain.

EXAMPLES
  bun run src/cli.ts search -q "iOS" --remote remote --format table
  bun run src/cli.ts search -q "desenvolvedor ios" --jobage 14 --format table
  bun run src/cli.ts detail https://pagseguro.gupy.io/jobs/12683119 --format plain

Personal use only — Gupy's terms forbid aggregating or copying the platform; keep volume low.
`

const KNOWN_FLAGS: Record<string, Set<string>> = {
  search: new Set(["query", "remote", "state", "city", "jobage", "page", "limit", "format", "help", "h"]),
  detail: new Set(["format", "help", "h"]),
}

function fail(error: string, code: string): number {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
  return 1
}

/** Strict positive-integer parse: rejects "abc", "1.5", "0", "-3". */
function parsePositiveInt(name: string, raw: string | boolean | string[]): number | string {
  if (typeof raw !== "string" || !/^\d+$/.test(raw) || parseInt(raw, 10) < 1) {
    return `--${name} must be a positive whole number, got "${raw}"`
  }
  return parseInt(raw, 10)
}

async function main(): Promise<number> {
  const flags = parseFlags(process.argv.slice(2))
  const cmd = (flags._ as string[])[0]

  if (!cmd || flags.help || flags.h) {
    process.stdout.write(HELP)
    return cmd ? 0 : 1
  }

  const known = KNOWN_FLAGS[cmd]
  if (!known) return fail(`Unknown command "${cmd}"`, "BAD_CMD")
  for (const key of Object.keys(flags)) {
    if (key === "_" || known.has(key)) continue
    return fail(
      `unknown flag --${key} for '${cmd}' - flags are never silently ignored, because a discarded filter changes what the search returns; see --help`,
      "UNKNOWN_FLAG",
    )
  }

  const fmt = typeof flags.format === "string" ? flags.format : "json"

  if (cmd === "search") {
    if (typeof flags.query !== "string" || !flags.query.trim()) {
      return fail('the --query/-q flag is required (e.g. -q "iOS") - an empty query would page through all of Gupy', "NO_QUERY")
    }
    if (!["json", "table", "plain"].includes(fmt)) return fail(`--format must be json, table or plain, got "${fmt}"`, "BAD_ARG")
    if (flags.remote !== undefined && !["remote", "hybrid", "onsite", "on-site"].includes(String(flags.remote).toLowerCase())) {
      return fail(`--remote must be remote, hybrid or onsite, got "${flags.remote}"`, "BAD_ARG")
    }
    for (const k of ["state", "city"]) {
      if (flags[k] !== undefined && typeof flags[k] !== "string") return fail(`--${k === "city" ? "location" : k} needs a value`, "BAD_ARG")
    }
    const nums: Record<string, number | undefined> = {}
    for (const k of ["jobage", "page", "limit"]) {
      if (flags[k] === undefined) continue
      const v = parsePositiveInt(k, flags[k])
      if (typeof v === "string") return fail(v, "BAD_ARG")
      nums[k] = v
    }
    const opts: SearchOpts = {
      query: flags.query.trim(),
      remote: typeof flags.remote === "string" ? flags.remote : undefined,
      state: flags.state as string | undefined,
      city: flags.city as string | undefined,
      jobage: nums.jobage,
      page: nums.page ?? 1,
      limit: nums.limit,
      format: fmt as SearchOpts["format"],
    }
    return runSearch(opts)
  }

  // detail
  const ref = (flags._ as string[])[1]
  if (!ref) return fail("detail requires a job URL or <subdomain>/<id>", "NO_ID")
  if (!["json", "plain"].includes(fmt)) return fail(`--format must be json or plain for detail, got "${fmt}"`, "BAD_ARG")
  const opts: DetailOpts = { ref, format: fmt as DetailOpts["format"] }
  return runDetail(opts)
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e), code: "INTERNAL_ERROR" }) + "\n",
    )
    process.exit(1)
  })
