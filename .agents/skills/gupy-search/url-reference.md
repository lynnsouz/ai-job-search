# Gupy - URL & Data Reference

Investigated 2026-11-09. Update this file when Gupy changes its endpoints or markup.

## Access rules

| Host | robots.txt | Notes |
|------|-----------|-------|
| `portal.gupy.io` | `User-agent: * / Disallow:` (everything allowed) | Public job board + search API |
| `<company>.gupy.io` | `Allow: /`, `Disallow: /companies`, `Disallow: /candidates` | Career pages; `/jobs/<id>` allowed |
| `www.gupy.io` | Marketing site; only preview/tracking URLs disallowed | Not used |

Terms of use (candidates), https://www.gupy.io/termos-de-uso-recrutamento-e-selecao-candidatos:
no clause on bots/scraping, but users may not *"agregar, copiar ou duplicar partes do Gupy
Recrutamento e Seleção, incluindo oportunidades de trabalho expiradas"*, and may not overload the
service. Hence the personal-use-only warning in `SKILL.md`.

No authentication or API key is needed. Honest UA `Mozilla/5.0 (compatible; gupy-cli/1.0)` is accepted.

## Search endpoint

```
GET https://portal.gupy.io/api/job-search/jobs?jobName=<q>&limit=<n>&offset=<n>[&workplaceType=..][&state=..][&city=..][&sortBy=publishedDate&sortOrder=desc]
```

This is the proxy the portal front-end calls (found in the Next.js bundle; the bundle builds
`/api/v1/jobs?...` against `employability-portal.gupy.io`, which is not publicly reachable,
and the browser goes through `/api/job-search/jobs`).

| Param | Values | Notes |
|-------|--------|-------|
| `jobName` | free text | Substring match on the job **title** only. Empty → whole board (CLI requires a query). |
| `limit` | 1-100 | >100 returns HTTP 400 `{"message":"Failed to fetch jobs"}`. CLI uses 20. |
| `offset` | 0, 20, 40... | Pagination. |
| `workplaceType` | `remote`, `hybrid`, `on-site` | |
| `state` | e.g. `São Paulo`, `Distrito Federal` | Full state name, URL-encoded. |
| `city` | e.g. `Curitiba` | |
| `sortBy` / `sortOrder` | `publishedDate` / `desc` | Default order already appears to be newest first. |
| `type`, `badge`, `isPWD`, `careerPageName` | | Exist in the front-end; not exposed by the CLI. |

There is **no posting-age parameter**; `--jobage` filters `publishedDate` client-side.

### Response

```json
{
  "data": [
    {
      "id": 12683119,
      "name": "Engenheiro de Software Pl. (mobile - iOS)",
      "careerPageName": "PagBank",
      "careerPageUrl": "",
      "careerPageLogo": "https://attachments.gupy.io/...",
      "city": "", "state": "",
      "workplaceType": "remote",
      "publishedDate": "2026-10-16T21:09:48.618Z",
      "applicationDeadline": "2026-12-31T00:00:00.000Z",
      "type": "vacancy_type_effective",
      "description": "<full plain-ish text>",
      "disabilities": true,
      "badges": { ... },
      "jobUrl": "https://pagseguro.gupy.io/job/eyJqb2JJZCI6MTI2ODMxMTksInNvdXJjZSI6Imd1cHlfcG9ydGFsIn0=?jobBoardSource=gupy_portal"
    }
  ],
  "pagination": { "total": 7, "limit": 20, "offset": 0 }
}
```

Mapping: `id`→`id`, `name`→`title`, `careerPageName`→`company`, `city`+`state` (or "Remote")→`location`,
`publishedDate`→`date`, `applicationDeadline`→`deadline`, `jobUrl` minus query string→`url`.

## Detail page

```
GET https://<subdomain>.gupy.io/jobs/<id>
```

- The `jobUrl` from search is `https://<subdomain>.gupy.io/job/<base64>`; the base64 decodes to
  `{"jobId":12683119,"source":"gupy_portal"}`. The CLI decodes it and requests `/jobs/<id>`.
- The id only resolves on the **owning** subdomain (another subdomain returns 404), so a bare id
  is not enough for `detail`.
- The page is Next.js; the job is in `<script id="__NEXT_DATA__">` at `props.pageProps.job`.

| Field | Content |
|-------|---------|
| `name` | Title |
| `description` | HTML: company/role intro |
| `responsibilities` | HTML: "Responsabilidades e atribuições" |
| `prerequisites` | HTML: "Requisitos e qualificações" |
| `relevantExperiences` | HTML: "Informações adicionais" / "Diferenciais" (often benefits) |
| `careerPage.name` | Company display name |
| `workplaceType` | `remote` / `hybrid` / `on-site` |
| `addressCity`, `addressState`, `addressCountry` | Location (`addressCountry` e.g. "Brasil") |
| `publishedAt`, `registerEndDate`, `expiresAt` | Dates |
| `jobSteps[].name` | Hiring pipeline (Cadastro → Triagem → Teste → Entrevista...) |
| `quickApply`, `jobType`, `jobLanguage`, `code` | Misc |

HTML uses `<li><p>…</p></li>` lists and named entities (`&oacute;`, `&ccedil;`, `&nbsp;`); the CLI
decodes a Portuguese/Spanish entity table and collapses list spacing.
