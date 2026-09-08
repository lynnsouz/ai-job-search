import { describe, test, expect } from "bun:test";
import { runCLI, parseJSON } from "./helpers.js";

interface JobCard {
  id: string;
  title: string;
  company: string | null;
  location: string | null;
  date: string | null;
  url: string;
}

interface SearchResponse {
  meta: { count: number; page: number; total: number };
  results: JobCard[];
}

describe("search (live)", () => {
  test("returns at least one result for a realistic query", async () => {
    const result = await runCLI(["search", "-q", "iOS-utvikler", "--limit", "5"]);
    const data = parseJSON<SearchResponse>(result);
    expect(data.results.length).toBeGreaterThan(0);
    const first = data.results[0];
    expect(first.id).toBeTruthy();
    expect(first.title).toBeTruthy();
    expect(first.url).toContain("arbeidsplassen.nav.no");
  });

  test("--jobage filters results", async () => {
    const wide = parseJSON<SearchResponse>(await runCLI(["search", "-q", "utvikler", "--limit", "5"]));
    const narrow = parseJSON<SearchResponse>(
      await runCLI(["search", "-q", "utvikler", "--jobage", "1", "--limit", "5"]),
    );
    expect(narrow.meta.total).toBeLessThanOrEqual(wide.meta.total);
  });
});

describe("detail (live)", () => {
  test("fetches full detail for a search result", async () => {
    const search = parseJSON<SearchResponse>(
      await runCLI(["search", "-q", "iOS-utvikler", "--limit", "1"]),
    );
    expect(search.results.length).toBeGreaterThan(0);
    const id = search.results[0].id;
    const detail = await runCLI(["detail", id, "--format", "plain"]);
    expect(detail.exitCode).toBe(0);
    expect(detail.stdout.length).toBeGreaterThan(0);
  });
});

describe("flag validation", () => {
  test("rejects unknown flag", async () => {
    const result = await runCLI(["search", "--bogus", "x"]);
    expect(result.exitCode).toBe(1);
    const err = JSON.parse(result.stderr);
    expect(err.code).toBe("UNKNOWN_FLAG");
  });

  test("rejects non-numeric --jobage", async () => {
    const result = await runCLI(["search", "-q", "utvikler", "--jobage", "abc"]);
    expect(result.exitCode).toBe(1);
    const err = JSON.parse(result.stderr);
    expect(err.code).toBe("BAD_ARG");
  });

  test("detail requires an id", async () => {
    const result = await runCLI(["detail"]);
    expect(result.exitCode).toBe(1);
    const err = JSON.parse(result.stderr);
    expect(err.code).toBe("NO_ID");
  });
});
