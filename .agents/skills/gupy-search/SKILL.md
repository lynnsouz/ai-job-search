---
name: gupy-search
version: 1.0.0
description: >
  Use this skill to search Brazilian job postings on Gupy (portal.gupy.io), the
  recruiting platform most Brazilian banks, fintechs and large companies use
  (e.g. PagBank, Omie, Stefanini, GOL). Covers remote, hybrid and on-site
  roles in Brazil, and fetches a posting's full description. Trigger phrases:
  Gupy, Brazil jobs, Brazilian remote jobs, jobs in Brazil, vagas, vagas de emprego,
  vagas remotas, vaga iOS, desenvolvedor iOS remoto, trabalho remoto Brasil,
  oportunidades de emprego, procurar vagas, buscar vagas na Gupy.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/gupy-search/cli/src/cli.ts *)
---

# Gupy Search Skill

Search live job postings from **Gupy** (`portal.gupy.io`), Brazil's dominant
applicant-tracking platform and public job board. No authentication, no API key,
and **zero runtime dependencies**: it runs with just `bun`.

## ⚠️ Personal use only

Gupy's `robots.txt` allows crawling, but its candidate terms of use forbid users to
*"agregar, copiar ou duplicar partes do Gupy Recrutamento e Seleção"* (aggregate,
copy or duplicate parts of the platform) and to overload the service. This skill reads
listings for **your own job search only**: keep volume low (a few searches per
`/scrape` run, not paging through the whole board), never republish or share the
data, and never use it commercially. Run it on your own responsibility.

## When to use this skill

- Find Brazilian iOS/mobile postings, especially **fully remote** ones (`--remote remote`)
- Narrow to a state or city for hybrid/on-site roles
- Read a posting's full description, requirements, nice-to-haves and hiring steps

## Commands

### Search job listings

```bash
bun run .agents/skills/gupy-search/cli/src/cli.ts search --query "<title words>" [flags]
```

- `--query <text>` / `-q <text>`: **required.** Matched against the job **title** only (not the description), e.g. `"iOS"`, `"desenvolvedor ios"`, `"mobile"`.
- `--remote <mode>`: `remote`, `hybrid`, or `onsite`.
- `--state <text>`: Brazilian state name as Gupy writes it, e.g. `"São Paulo"`, `"Distrito Federal"`, `"Paraná"`.
- `--location <text>` / `-l <text>`: city, e.g. `"São Paulo"`, `"Curitiba"`.
- `--jobage <days>`: published within N days. **Client-side filter** applied to the fetched page (the API has no age parameter). Results come newest first, so page 1 holds the freshest postings.
- `--page <n>`: page number (1-indexed, 20 results per page).
- `--limit <n>` / `-n <n>`: cap results emitted (client-side).
- `--format json|table|plain`: default `json`. JSON `meta` also carries `total` (the API's total hit count).

### Fetch full job detail

```bash
bun run .agents/skills/gupy-search/cli/src/cli.ts detail <job-url | subdomain/id> [--format json|plain]
```

Pass the `url` from search results (`https://<company>.gupy.io/job/<encoded>`), a
`https://<company>.gupy.io/jobs/<id>` URL, or the `<subdomain>/<id>` shorthand
(e.g. `pagseguro/12683119`). A **bare numeric id does not work**, because postings
only resolve on the hiring company's own career subdomain.

## Usage examples

```bash
# Fully remote iOS roles anywhere in Brazil
bun run .agents/skills/gupy-search/cli/src/cli.ts search -q "iOS" --remote remote --format table

# Portuguese title variants, last 14 days
bun run .agents/skills/gupy-search/cli/src/cli.ts search -q "desenvolvedor ios" --jobage 14 --format table
bun run .agents/skills/gupy-search/cli/src/cli.ts search -q "engenheiro ios" --remote remote --format table

# Broader native mobile roles, remote only
bun run .agents/skills/gupy-search/cli/src/cli.ts search -q "mobile" --remote remote --format table

# Mobile roles in São Paulo state (state filter)
bun run .agents/skills/gupy-search/cli/src/cli.ts search -q "mobile" --state "São Paulo" --format table

# Full description of one posting
bun run .agents/skills/gupy-search/cli/src/cli.ts detail pagseguro/12683119 --format plain
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default: programmatic use, passing `url` to `detail` |
| `table` | Quick human-readable scanning |
| `plain` | Reading a single job's full detail (`detail` command) |

Each search result has `id`, `title`, `company`, `location`, `workplaceType`, `date`,
`deadline`, `url` (missing values are `null`). All errors go to **stderr** as
`{ "error": "...", "code": "..." }` with exit code `1`.

## Notes

- **Title-only matching:** `"iOS"` also hits unrelated titles that contain the airport code IOS (Ilhéus), e.g. GOL airport jobs. Filter by title/company when ranking.
- **"Remote" in Brazil usually means remote *within Brazil*:** many postings expect a Brazilian CLT contract, CPF or Brazilian residence. Check each posting for PJ/contractor or international-payroll options before treating it as workable from Norway. Run the Eligibility Gate in `04-job-evaluation.md`.
- **Cross-platform noise:** Gupy mobile postings often list Flutter/React Native alongside Swift (e.g. "Flutter, React Native, Kotlin ou Swift"). Apply the native-iOS-only deal-breaker when ranking.
- **Stale talent pools:** "Banco de Talentos" postings (and some regular ones) stay open for years, so 2022-2024 dates show up in results. Use `--jobage` or check `date` before ranking.
- Postings from Gupy-hosted companies in other Latin American countries (e.g. Stefanini Latam in Santiago) also appear.
- The search API rejects page sizes above 100 (HTTP 400); the CLI uses a fixed 20.
- The CLI retries 429/5xx with exponential backoff and jitter. Keep volume low (see the terms note above).
- Endpoint and field details for maintenance: `url-reference.md`.
