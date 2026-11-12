import { describe, expect, test } from "bun:test"
import { parseSearchResponse, parseJobRef, parseJobDetail, filterByAge, htmlToText } from "../src/helpers.ts"

describe("parseSearchResponse", () => {
  test("maps fields and skips malformed records", () => {
    const body = JSON.stringify({
      data: [
        {
          id: 1,
          name: "Desenvolvedor iOS",
          careerPageName: "Banco X",
          city: "",
          state: "",
          workplaceType: "remote",
          publishedDate: "2026-11-01T00:00:00.000Z",
          applicationDeadline: null,
          jobUrl: "https://bancox.gupy.io/job/abc=?jobBoardSource=gupy_portal",
        },
        { id: 2, name: "", jobUrl: "https://y.gupy.io/jobs/2" },
        null,
        { id: 3, name: "iOS Pleno", city: "Curitiba", state: "Paraná", workplaceType: "hybrid", jobUrl: "https://z.gupy.io/jobs/3" },
      ],
      pagination: { total: 3 },
    })
    const { total, cards } = parseSearchResponse(body)
    expect(total).toBe(3)
    expect(cards.length).toBe(2)
    expect(cards[0]).toEqual({
      id: "1",
      title: "Desenvolvedor iOS",
      company: "Banco X",
      location: "Remote",
      workplaceType: "remote",
      date: "2026-11-01T00:00:00.000Z",
      deadline: null,
      url: "https://bancox.gupy.io/job/abc=",
    })
    expect(cards[1].location).toBe("Curitiba, Paraná")
    expect(cards[1].company).toBeNull()
  })

  test("throws on an unexpected shape", () => {
    expect(() => parseSearchResponse(JSON.stringify({ message: "Failed to fetch jobs" }))).toThrow()
  })
})

describe("parseJobRef", () => {
  test("numeric job URL", () => {
    expect(parseJobRef("https://pagseguro.gupy.io/jobs/12683119")).toEqual({ subdomain: "pagseguro", id: "12683119" })
  })
  test("base64 job URL from search results", () => {
    const b64 = Buffer.from(JSON.stringify({ jobId: 12683119, source: "gupy_portal" })).toString("base64")
    expect(parseJobRef(`https://pagseguro.gupy.io/job/${b64}?jobBoardSource=gupy_portal`)).toEqual({
      subdomain: "pagseguro",
      id: "12683119",
    })
  })
  test("subdomain/id shorthand", () => {
    expect(parseJobRef("verity/12702253")).toEqual({ subdomain: "verity", id: "12702253" })
  })
  test("rejects bare ids and portal URLs", () => {
    expect(parseJobRef("12683119")).toBeNull()
    expect(parseJobRef("https://portal.gupy.io/job-search/term=ios")).toBeNull()
  })
})

describe("parseJobDetail", () => {
  test("extracts the job from __NEXT_DATA__ and joins sections", () => {
    const job = {
      id: 9,
      name: "iOS Sênior",
      description: "<p>Sobre n&oacute;s &amp; voc&ecirc;</p>",
      responsibilities: "<ul><li>Construir features</li><li>Revisar c&#243;digo</li></ul>",
      prerequisites: "<p>Swift</p>",
      relevantExperiences: null,
      careerPage: { name: "Banco X" },
      workplaceType: "remote",
      addressCity: "",
      addressState: "",
      addressCountry: "Brasil",
      publishedAt: "2026-11-01T00:00:00.000Z",
      registerEndDate: "2026-12-31",
      jobSteps: [{ name: "Cadastro" }, { name: "Entrevista" }],
      quickApply: false,
    }
    const html = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ props: { pageProps: { job } } })}</script></html>`
    const d = parseJobDetail(html, { subdomain: "bancox", id: "9" })!
    expect(d.title).toBe("iOS Sênior")
    expect(d.company).toBe("Banco X")
    expect(d.url).toBe("https://bancox.gupy.io/jobs/9")
    expect(d.steps).toEqual(["Cadastro", "Entrevista"])
    expect(d.description).toContain("- Construir features")
    expect(d.description).toContain("Revisar código")
    expect(d.description).toContain("## Requisitos e qualificações\nSwift")
    expect(d.description).not.toContain("<")
  })
  test("returns null when the page has no job", () => {
    expect(parseJobDetail("<html></html>", { subdomain: "x", id: "1" })).toBeNull()
  })
})

describe("helpers", () => {
  test("filterByAge drops old and undated cards", () => {
    const now = Date.parse("2026-11-10T00:00:00Z")
    const base = { id: "1", title: "t", company: null, location: null, workplaceType: null, deadline: null, url: "u" }
    const cards = [
      { ...base, date: "2026-11-08T00:00:00Z" },
      { ...base, date: "2026-10-01T00:00:00Z" },
      { ...base, date: null },
    ]
    expect(filterByAge(cards, 7, now).length).toBe(1)
    expect(filterByAge(cards, undefined, now).length).toBe(3)
  })
  test("htmlToText handles empty input", () => {
    expect(htmlToText(null)).toBeNull()
    expect(htmlToText("<p> </p>")).toBeNull()
  })
})
