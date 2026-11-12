// Live smoke tests against portal.gupy.io - a handful of requests, kept low on purpose.
import { describe, expect, test } from "bun:test"
import { runCLI, parseJSON } from "./helpers.ts"

interface SearchOut {
  meta: { count: number; page: number }
  results: { id: string; title: string; url: string; company: string | null }[]
}

describe("search (live)", () => {
  test("returns real iOS postings", async () => {
    const out = parseJSON<SearchOut>(await runCLI(["search", "-q", "iOS", "--limit", "5"]))
    expect(out.meta.page).toBe(1)
    expect(out.results.length).toBeGreaterThan(0)
    for (const r of out.results) {
      expect(r.id).toBeTruthy()
      expect(r.title).toBeTruthy()
      expect(r.url).toMatch(/^https:\/\/[a-z0-9-]+\.gupy\.io\//)
    }
  })
})

describe("argument validation", () => {
  test("unknown flag exits 1 with JSON error on stderr", async () => {
    const r = await runCLI(["search", "-q", "iOS", "--bogus", "x"])
    expect(r.exitCode).toBe(1)
    expect(r.stdout).toBe("")
    expect(JSON.parse(r.stderr).code).toBe("UNKNOWN_FLAG")
  })
  test("missing --query exits 1", async () => {
    const r = await runCLI(["search", "--remote", "remote"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("NO_QUERY")
  })
  test("fractional --page is rejected", async () => {
    const r = await runCLI(["search", "-q", "iOS", "--page", "1.5"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_ARG")
  })
  test("bare numeric id for detail is rejected", async () => {
    const r = await runCLI(["detail", "12683119"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_ID")
  })
})
