# Search Queries for Job Scraper

<!-- SETUP: Customize these queries based on your skills, target roles, and location -->

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

**Language scope:** write every query category in every language listed in your CLAUDE.md Languages table (typically 1-2, sometimes more). A posting requiring a language you have *not* declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than you declared in a language you *do* work in is flagged for your own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule. Translate each category's keywords rather than machine-translating word-for-word (e.g. "Frontend Developer" -> "Desarrollador Frontend", not a literal word-for-word translation) if you work in more than one language.

## Search Sites

Primary (your market's job boards - scaffold one with `/add-portal`):
- **finn.no/job** - Norway's largest general job board (WebSearch fallback - no CLI installed)
- **linkedin.com/jobs** - LinkedIn job listings (filter: Norway, Oslo, and remote); also covered by `linkedin-search` CLI
- **nav.no** (arbeidsplassen.nav.no) - Norwegian public employment service job listings; also covered by the `nav-search` CLI (mirrors many FINN.no postings too). Use `--location "AGDER"` for the local county and `--location "OSLO"` for Oslo hybrid roles.
- Also covered by `freehire-search` CLI (aggregates ~50 ATS platforms, including remote-first fintechs and EURES Norway listings; use `--country NO` for Norway, `--country FI` for Finland, and `--remote remote` for remote roles)
- **Finland (added 2026-09-24 - open to relocating to Helsinki and to Finland-based remote roles):** linkedin.com/jobs (filter: Finland, Helsinki), **duunitori.fi**, **jobly.fi** and **tyomarkkinatori.fi** (Finnish public employment service) - WebSearch fallback, no CLI installed

- **Brazil (added 2026-10-22 - fully remote Brazil-based roles only, working from Norway):** linkedin.com/jobs via the `linkedin-search` CLI (`-l "Brazil" --remote remote`), plus the **`gupy-search` CLI** for **gupy.io** (most Brazilian banks/fintechs post here; added 2026-11-09 - run `-q "iOS" --remote remote`, `-q "desenvolvedor ios" --remote remote`, `-q "engenheiro ios" --remote remote` and `-q "mobile" --remote remote`; personal use only, keep volume low; the `site:gupy.io` queries below remain the fallback), plus WebSearch fallback for **programathor.com.br**, **remotar.com.br** and **geekhunter.com.br**. Write these queries in Portuguese as well as English.

Secondary (company career pages via Google):
- Direct Google searches with `site:` filters for known target companies

*Spain portals (infojobs.net, tecnoempleo.com) and Spanish-language queries were removed on 2026-09-23 - the candidate dropped the Spain relocation exception on 2026-09-16.*

## Query Categories

Queries are grouped by priority. Write **each category in every language from your Languages table** (see Language scope above) where the market uses it - here English, plus Norwegian terms for Norwegian portals (NAV/FINN). Combine each query with your location terms (e.g. your city, region, or metro area) where the site supports it.

**Organize by function, not job title.** The same underlying work carries different titles across companies and markets (a "Data Scientist" role at one employer may be posted as "Insights Analyst" or "Data Consultant" at another). Name each priority category after the function it covers, and list several plausible job titles as query variants within that category rather than betting an entire priority tier on one exact title string.

**Excluded role types (hard filter, added 2026-09-23):** fullstack developer, React Native, Flutter, React/Next.js web and similar cross-platform/web-stack roles - never present them, even as Low. Native dual-platform roles (Swift + Kotlin) are fine.

### Priority 1: iOS / Mobile Engineering (Mid-Senior / Senior)

These match your strongest and most desired career direction.

```
site:finn.no "Senior iOS Developer" remote
site:finn.no "iOS-utvikler" Oslo
site:finn.no "iOS Engineer" Norway
site:linkedin.com/jobs "Senior iOS Developer" Norway
site:linkedin.com/jobs "iOS Engineer" remote Europe
site:linkedin.com/jobs "iOS Developer" Oslo hybrid
site:linkedin.com/jobs "iOS Developer" Finland remote
site:linkedin.com/jobs "Senior iOS Engineer" Helsinki
site:duunitori.fi iOS developer Helsinki
site:jobly.fi iOS Helsinki OR etätyö
site:linkedin.com/jobs "Desenvolvedor iOS" remoto Brasil
site:linkedin.com/jobs "Senior iOS Developer" Brazil remote
site:gupy.io "Desenvolvedor iOS" remoto
site:gupy.io "Engenheiro iOS" OR "iOS Engineer" remoto
site:programathor.com.br iOS remoto
site:remotar.com.br iOS
```

### Priority 2: Fintech / Banking Domain

These match your domain expertise in banking and payments.

```
site:finn.no fintech iOS developer Norway OR remote
site:finn.no bank "iOS-utvikler" Oslo
site:linkedin.com/jobs fintech "iOS Developer" Europe remote
site:linkedin.com/jobs payments "mobile engineer" remote
site:linkedin.com/jobs bank "iOS Engineer" Oslo
site:linkedin.com/jobs fintech "iOS" Helsinki OR Finland
site:duunitori.fi pankki iOS
site:gupy.io banco "Desenvolvedor iOS" remoto
site:linkedin.com/jobs fintech "Desenvolvedor iOS" remoto
```

### Priority 3: Adjacent Native Mobile Roles

Adjacent roles you could pivot into (native only - no React Native/Flutter).

```
site:finn.no "Mobile Engineer" Swift Norway
site:finn.no "native apputvikler" iOS
site:linkedin.com/jobs "Senior Mobile Developer" Swift remote
site:linkedin.com/jobs "Mobile Tech Lead" iOS Norway OR remote
```

### Priority 4: Broader Technical / Consulting

Wider net for general technical roles.

```
site:finn.no Swift developer Norway OR remote
site:linkedin.com/jobs "Swift developer" remote
site:finn.no "technical consultant" mobile Norway
site:linkedin.com/jobs "iOS" "Engineering Manager" Norway OR remote
```

## Location Filter

When evaluating results, verify the job location is within reasonable commute distance from your home, or fully remote. Define acceptable areas:
- **Ideal:** fully remote (any location, including employers based elsewhere) - preferred
- **Acceptable:** Arendal and surrounding areas (Agder region); Oslo hybrid with at most 3 office days/week (travelling from Arendal, added 2026-09-23); Helsinki metro area (Helsinki/Espoo/Vantaa) - remote, hybrid or on-site, relocating there; fully remote Finland-based roles (added 2026-09-24; flag Finnish work authorization as unverified); fully remote Brazil-based roles that allow working from abroad (added 2026-10-22; flag "100% remoto" postings that don't say whether abroad is allowed)
- **Borderline:** other Norwegian cities only if remote-friendly (flag to user)
- **Too far:** on-site/hybrid roles requiring relocation anywhere other than Helsinki (including other Finnish cities), Oslo roles with 4-5 office days/week, US-tagged "remote" postings unless they explicitly welcome non-US applicants, and Brazil roles that are hybrid/on-site or require living in Brazil

## Language Filter

Your working languages and levels are in CLAUDE.md's Languages table. When filtering scraped results, apply `04-job-evaluation.md`'s Language Gate: a posting requiring a language you haven't declared at all is excluded; a posting requiring a higher level than you declared in a language you do work in is not excluded, flag it clearly instead (see `job-scraper/SKILL.md`'s Step 3 "Quick Fit Assessment" for how the flag surfaces in `/scrape` output). Postings simply *written* in a language you don't work in, that don't require it on the job, are fine.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- "/scrape [focus_area]" -> relevant category queries + custom focus-specific queries
