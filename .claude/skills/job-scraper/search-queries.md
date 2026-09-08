# Search Queries for Job Scraper

<!-- SETUP: Customize these queries based on your skills, target roles, and location -->

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

**Language scope:** write every query category in every language listed in your CLAUDE.md Languages table (typically 1-2, sometimes more). A posting requiring a language you have *not* declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than you declared in a language you *do* work in is flagged for your own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule. Translate each category's keywords rather than machine-translating word-for-word (e.g. "Frontend Developer" -> "Desarrollador Frontend", not a literal word-for-word translation) if you work in more than one language.

## Search Sites

Primary (your market's job boards - scaffold one with `/add-portal`):
- **finn.no/job** - Norway's largest general job board
- **linkedin.com/jobs** - LinkedIn job listings (filter: Norway / Arendal, and remote); also covered by `linkedin-search` CLI
- **nav.no** (arbeidsplassen.nav.no) - Norwegian public employment service job listings; also covered by the `nav-search` CLI (mirrors many FINN.no postings too). Use `--location "AGDER"` for the local county.
- **infojobs.net** - Spain's largest general job board (WebSearch fallback - no CLI installed)
- **tecnoempleo.com** - Spain-focused IT/tech job board (WebSearch fallback - no CLI installed)
- Also covered by `freehire-search` CLI (aggregates ~50 ATS platforms, including remote-first fintechs, which can surface Spain-based remote employers too)

Secondary (company career pages via Google):
- Direct Google searches with `site:` filters for known target companies

## Query Categories

Queries are grouped by priority. Write **each category in every language from your Languages table** (see Language scope above). Combine each query with your location terms (e.g. your city, region, or metro area) where the site supports it.

**Organize by function, not job title.** The same underlying work carries different titles across companies and markets (a "Data Scientist" role at one employer may be posted as "Insights Analyst" or "Data Consultant" at another). Name each priority category after the function it covers, and list several plausible job titles as query variants within that category rather than betting an entire priority tier on one exact title string.

### Priority 1: iOS / Mobile Engineering (Mid-Senior / Senior)

These match your strongest and most desired career direction.

```
site:finn.no "Senior iOS Developer" remote
site:finn.no "iOS Engineer" Norway
site:finn.no "Mobile Developer" Swift remote
site:linkedin.com/jobs "Senior iOS Developer" Norway
site:linkedin.com/jobs "iOS Engineer" remote
site:infojobs.net "Desarrollador iOS" remoto
site:tecnoempleo.com "Desarrollador iOS" teletrabajo
site:linkedin.com/jobs "Desarrollador iOS Senior" España remoto
```

### Priority 2: Fintech / Banking Domain

These match your domain expertise in banking and payments.

```
site:finn.no fintech iOS developer Norway OR remote
site:finn.no banking mobile developer Norway
site:linkedin.com/jobs fintech "iOS Developer" Europe remote
site:linkedin.com/jobs payments "mobile engineer" remote
site:infojobs.net fintech "desarrollador iOS" remoto
site:tecnoempleo.com banca "desarrollador móvil" teletrabajo
site:linkedin.com/jobs pagos "ingeniero móvil" España remoto
```

### Priority 3: Adjacent Mobile / Cross-Platform Roles

Adjacent roles you could pivot into.

```
site:finn.no "Mobile Engineer" Swift Norway
site:linkedin.com/jobs "Senior Mobile Developer" Swift remote
site:infojobs.net "Ingeniero Mobile" Swift remoto
site:linkedin.com/jobs "Desarrollador Mobile Senior" Swift España remoto
```

### Priority 4: Broader Technical / Consulting

Wider net for general technical roles.

```
site:finn.no Swift developer Norway OR remote
site:linkedin.com/jobs "Swift developer" remote
site:finn.no "technical consultant" mobile Norway
site:infojobs.net desarrollador Swift remoto
site:tecnoempleo.com "consultor técnico" mobile teletrabajo
```

## Location Filter

When evaluating results, verify the job location is within reasonable commute distance from your home, or fully remote. Define acceptable areas:
- Arendal and surrounding areas (Agder region)
- Fully remote (any location, including Spain-based employers) - preferred
- On-site roles in Spain (acceptable - open to relocating there)
- Other Norwegian cities (borderline - only if hybrid/remote-friendly)
- On-site roles outside Norway and Spain requiring relocation (too far - not seeking relocation)

## Language Filter

Your working languages and levels are in CLAUDE.md's Languages table. When filtering scraped results, apply `04-job-evaluation.md`'s Language Gate: a posting requiring a language you haven't declared at all is excluded; a posting requiring a higher level than you declared in a language you do work in is not excluded, flag it clearly instead (see `job-scraper/SKILL.md`'s Step 3 "Quick Fit Assessment" for how the flag surfaces in `/scrape` output). Postings simply *written* in a language you don't work in, that don't require it on the job, are fine.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- "/scrape [focus_area]" -> relevant category queries + custom focus-specific queries
