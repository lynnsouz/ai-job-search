# Graph Report - ai-job-search  (2026-11-24)

## Corpus Check
- 212 files · ~173,885 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: (none) 11, .ttf 10, .otf 9)

## Summary
- 2528 nodes · 3629 edges · 161 communities (137 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1c7a8cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- freehire-search/cli/src/helpers.ts
- jobindex-search/cli/src/commands/detail.ts
- parse_sheet
- run_guards
- RankCommandSpec
- Section-by-Section Tailoring
- jobbank-search/cli/src/helpers.ts
- STAR Candidates (Complete Manually)
- ApplyRecordsApplication
- gupy-search/cli/src/helpers.ts
- verify_pdf.py
- Path C: Interview Mode
- section
- Examples
- Changelog
- nav-search/cli/src/helpers.ts
- allowed
- Filter Reference Tables
- jobdanmark-cli
- Candidate Profile
- test_upstream_triage.py
- match_score
- test_company_research_cache.py
- jobbank-search/cli/package.json
- jobdanmark-search/cli/package.json
- jobindex-search/cli/package.json
- sys
- pathlib
- ref_bunli_core
- jobnet-search/cli/package.json
- jobnet-cli
- jobnet-search/cli/src/cli.ts
- Upskill
- steps
- linkedin-search/cli/src/commands/search.ts
- Usage examples
- /expand - Competency Expansion from Documents and Online Presence
- Writing Style Guide
- Cover Letter Templates and Tailoring Guide
- search_company
- Step 6: Present Final Output
- Job Evaluation Framework
- UpstreamCheckerRepoFixture
- jobdanmark-search/cli/src/commands/detail.ts
- jobindex-cli
- Execution Steps
- test_salary_lookup.py
- run_linter
- freehire-search/cli/package.json
- gupy-search/cli/package.json
- compilerOptions
- compilerOptions
- compilerOptions
- compilerOptions
- Jobnet-Search Skill
- linkedin-search/cli/package.json
- nav-search/cli/package.json
- salary_lookup.py
- test_reset_command.py
- Usage examples
- Usage examples
- subprocess
- TestSoftTwoHundred
- ref_path
- ValidateDataTests
- /gmail-sync - Sync Application Status from Gmail
- /interview - Prepare for an Interview on a Tracked Application
- Work Experience
- jobs
- cli-checks
- test_latex_guidance.py
- UpskillSkillSpec
- jobnet-search/cli/src/commands/search.ts
- linkedin-search/cli/src/helpers.ts
- test_robots_check.py
- Behavioral Profile
- AI Job Search
- ref_bun_test
- Search Queries for Job Scraper
- WORK EXPERIENCE
- re
- test_scrape_provenance.py
- compilerOptions
- freehire Search Skill
- compilerOptions
- jobdanmark-search/cli/src/helpers.ts
- compilerOptions
- compilerOptions
- Candidate Profile
- /add-portal - Generate a Job-Portal Search Skill for Your Local Market
- /add-template - Register a Custom CV or Cover Letter Template
- /html-report - Generate Application Tracker Dashboard
- /notion-sync - Push Ranked Jobs and Applications to a Notion Database
- /outcome - Record the Result of an Application
- Documents Folder
- test_placeholder_integrity.py
- Salary Benchmark Tool
- jobdanmark-search/cli/src/commands/search.ts
- Jobindex URL Reference
- jobnet-search/cli/src/commands/detail.ts
- NAV (arbeidsplassen.nav.no) URL Reference
- /reset - Reset Candidate Profile Data
- Web Research and Fetching
- run
- Gupy Search Skill
- LinkedIn Search Skill
- Workflow
- Setup Guide
- test_scrape_contract.py
- jobbank-search/cli/tests/helpers.ts
- NAV (arbeidsplassen.nav.no) Search Skill
- README.md
- /rank - Triage Scraped Jobs into a Ranked Shortlist
- Application Form Fields
- Contributing
- Customization
- FrameworkVersionGateTests
- OutcomeFollowupBranchSpec
- Job Application Assistant for Lynneker Souza
- jobnet-search/cli/tests/helpers.ts
- nav-search/cli/tests/helpers.ts
- check_upstream_updates.py
- with
- 1. Prerequisites
- check_framework_version.py
- lint_skills.py
- freehire-cli
- gupy-search/cli/tests/helpers.ts
- linkedin-search/cli/tests/helpers.ts
- nav-cli
- discover-clis
- format_entry
- HtmlReportGitignoreTests
- TestBulletBracketTrap
- NotionSyncCommandSpec
- TestArgumentHardening
- Gupy - URL & Data Reference
- linkedin-cli
- Quick start
- Troubleshooting
- HtmlReportCommandFileTests
- ValidateFlagTests
- gupy-cli
- LinkedIn Jobs URL Reference
- gemini-research-expert.md
- on
- HtmlReportTrackerFieldTests
- PULL_REQUEST_TEMPLATE.md
- dependency-review
- latex-smoke
- Custom Templates
- HtmlReportLintIntegrationTests
- ReadmeImageReferences
- kristoffer_lundquist_propely_linkedin.md

## God Nodes (most connected - your core abstractions)
1. `run_guards()` - 30 edges
2. `parse_sheet()` - 27 edges
3. `match_score()` - 26 edges
4. `DetectColumnTypeTests` - 24 edges
5. `RankCommandSpec` - 24 edges
6. `FakeWorksheet` - 23 edges
7. `allowed()` - 22 edges
8. `search_company()` - 21 edges
9. `_sections()` - 17 edges
10. `section()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Added` --references--> `apiPost()`  [INFERRED]
  CHANGELOG.md → .agents/skills/jobdanmark-search/cli/src/helpers.ts
- `Added` --references--> `HookGuardTests`  [INFERRED]
  CHANGELOG.md → tests/test_security_guards.py
- `Fixed` --references--> `parseIntFlag()`  [INFERRED]
  CHANGELOG.md → .agents/skills/freehire-search/cli/src/cli.ts
- `Fixed` --references--> `normalizeSearchItem()`  [INFERRED]
  CHANGELOG.md → .agents/skills/jobbank-search/cli/src/commands/search.ts
- `Added` --references--> `parseSearchPage()`  [INFERRED]
  CHANGELOG.md → .agents/skills/jobindex-search/cli/src/helpers.ts

## Import Cycles
- None detected.

## Communities (161 total, 24 thin omitted)

### Community 0 - "freehire-search/cli/src/helpers.ts"
Cohesion: 0.06
Nodes (45): ALIAS, commaList(), Flags, FlagValue, KNOWN_FLAGS, main(), parseFlags(), parseIntFlag() (+37 more)

### Community 1 - "jobindex-search/cli/src/commands/detail.ts"
Cohesion: 0.08
Nodes (36): argv, commands, invoked, bodyText(), buildUrl(), DANISH_MONTHS, decodeHtmlEntities(), detail (+28 more)

### Community 2 - "parse_sheet"
Cohesion: 0.09
Nodes (8): CompoundCategoryPairingTests, DetectColumnTypeTests, FakeWorksheet, ParseNumericCellLocaleTests, detect_column_type(), header_matches(), parse_numeric_cell(), parse_sheet()

### Community 3 - "run_guards"
Cohesion: 0.10
Nodes (9): CleanTreeTests, GitignoreGuardTests, GitignoreNegationTests, GuardRepoFixture, HookGuardTests, ManifestGuardTests, PermissionGuardTests, RealRepoTests (+1 more)

### Community 5 - "Section-by-Section Tailoring"
Cohesion: 0.05
Nodes (37): Envelope, ATS Parseability, Check tenure against visible output, Color overrides, Compile-and-Inspect Loop (MANDATORY), Compile command, Core Competencies / Skills Section (Best Practice), CV Templates and Tailoring Guide (+29 more)

### Community 6 - "jobbank-search/cli/src/helpers.ts"
Cohesion: 0.12
Nodes (23): argv, commands, invoked, detail, outputPlain(), normalizeSearchItem(), outputPlain(), outputTable() (+15 more)

### Community 7 - "STAR Candidates (Complete Manually)"
Cohesion: 0.05
Nodes (36): A Discarded Experiment or Feature (Learning from Work That Was Dropped), About Culture (use these to prevent disappointment), About Tech & Growth, About the Role, About the Team, After the Application (Best Practice), C6 Bank Balance Cards and Font-Size Accessibility (Accessibility / User Focus), Common Tough Questions (+28 more)

### Community 8 - "ApplyRecordsApplication"
Cohesion: 0.06
Nodes (6): ApplyArchivesThePosting, ApplyRecordsApplication, ArchiveNameIsOnePathComponent, DeadlineSurvivesEveryWrite, DraftedMeansDraftedToEveryReader, section()

### Community 9 - "gupy-search/cli/src/helpers.ts"
Cohesion: 0.13
Nodes (31): fail(), Flags, KNOWN_FLAGS, main(), parseFlags(), parsePositiveInt(), DetailOpts, runDetail() (+23 more)

### Community 10 - "verify_pdf.py"
Cohesion: 0.12
Nodes (13): ParsePageCountTests, RunToolTests, VerifyPdfTests, build_parser(), _extract_pdftotext(), _extract_pypdf(), extract_text_layer(), main() (+5 more)

### Community 11 - "Path C: Interview Mode"
Cohesion: 0.06
Nodes (32): 1. Update `CLAUDE.md`, 2. Populate `01-candidate-profile.md` *(Path B and C; skip if Path A populated it)*, 3. Populate `02-behavioral-profile.md` *(Path B and C; skip if Path A populated it)*, 4. Update `04-job-evaluation.md` *(Path B and C; skip if Path A populated it)*, 5. Update `05-cv-templates.md` *(Path B and C; skip if Path A populated it)*, 6. Update `07-interview-prep.md` *(Path B and C; skip if Path A populated it)*, 7. Update `cv/cv_example.tex`, 8. Generate `.claude/skills/job-scraper/search-queries.md` (+24 more)

### Community 12 - "section"
Cohesion: 0.08
Nodes (4): ReaderCases, ReadersBucketMap, section(), VocabularyBlockExists

### Community 13 - "Examples"
Cohesion: 0.06
Nodes (30): Base URL, CSS Selectors, Data Analysis Jobs Posted in Last 7 Days, Education Area (udd), Examples, Filter Tables, Full-Time IT Jobs in Copenhagen, Full URL Pattern (+22 more)

### Community 14 - "Changelog"
Cohesion: 0.07
Nodes (30): [1.0.0] - 2026-07-22, [1.1.0] - 2026-07-30, [1.2.0] - 2026-08-01, [1.3.0] - 2026-08-03, [1.4.0] - 2026-08-07, [1.5.0] - 2026-08-12, [1.6.0] - 2026-08-19, Added (+22 more)

### Community 15 - "nav-search/cli/src/helpers.ts"
Cohesion: 0.16
Nodes (25): Flags, KNOWN_FLAGS, main(), parseFlags(), DetailOpts, normalizeId(), runDetail(), buildUrl() (+17 more)

### Community 16 - "allowed"
Cohesion: 0.11
Nodes (5): TestAgentSelection, TestPathRules, TestPercentEncodedRules, allowed(), _groups()

### Community 17 - "Filter Reference Tables"
Cohesion: 0.07
Nodes (27): Commands, `detail` — Full job detail, Education Field (`--education` / `udd`), Error handling, Example, Example, Field details, Field details (+19 more)

### Community 18 - "jobdanmark-cli"
Cohesion: 0.07
Nodes (27): `autocomplete` — Suggest job titles and categories, Categories, `categories` — List categories with live job counts, Commands, `detail` — Full job posting detail, Error handling, Example, Example (+19 more)

### Community 19 - "Candidate Profile"
Cohesion: 0.07
Nodes (27): Assessments, Awards, Candidate Profile, Certifications, Domain Expertise, Education, Freelance iOS Developer (Jan 2016 - Jan 2017), Hobbies & Interests (+19 more)

### Community 20 - "test_upstream_triage.py"
Cohesion: 0.17
Nodes (8): AlreadyAppliedTests, git(), MissingUpstreamRefTests, RelevanceFilterTests, TriageRepoFixture, UpToDateTests, WontPortTests, WorkflowGuardTests

### Community 21 - "match_score"
Cohesion: 0.11
Nodes (7): match_score(), MatchScoreTests, TestMatchScoreAnglicize, TestMatchScoreExactMatch, TestMatchScoreNoOverlap, TestMatchScoreShortQuery, TestMatchScoreSubstring

### Community 22 - "test_company_research_cache.py"
Cohesion: 0.10
Nodes (6): _apply_research_step(), _interview_research_step(), _sections(), TestApplyWiring, TestCacheDefinition, TestInterviewWiring

### Community 23 - "jobbank-search/cli/package.json"
Cohesion: 0.10
Nodes (25): bin, jobbank, dependencies, @bunli/core@0.9.1, @bunli/utils@0.6.0, node-html-parser@^6.1.13, zod@^3.23.0, description (+17 more)

### Community 24 - "jobdanmark-search/cli/package.json"
Cohesion: 0.10
Nodes (25): bin, jobdanmark, dependencies, @bunli/core@0.9.1, @bunli/utils@0.6.0, node-html-parser@^6.1.0, zod@^3.23.0, description (+17 more)

### Community 25 - "jobindex-search/cli/package.json"
Cohesion: 0.10
Nodes (25): bin, jobindex, dependencies, @bunli/core@0.9.1, @bunli/utils@0.6.0, node-html-parser@^6.1.13, zod@^3.23.0, description (+17 more)

### Community 26 - "sys"
Cohesion: 0.14
Nodes (7): GitignorePatternBehaviorTests, main(), check_gitignore(), check_package_manifests(), check_permissions(), _hook_commands(), main()

### Community 28 - "ref_bunli_core"
Cohesion: 0.16
Nodes (18): argv, commands, invoked, autocomplete, AutocompleteGroup, AutocompleteItem, outputPlain(), outputTable() (+10 more)

### Community 29 - "jobnet-search/cli/package.json"
Cohesion: 0.10
Nodes (23): bin, jobnet, dependencies, @bunli/core@0.9.1, @bunli/utils@0.6.0, zod@^3.23.0, description, devDependencies (+15 more)

### Community 30 - "jobnet-cli"
Cohesion: 0.08
Nodes (23): Commands, `detail` — Full job ad detail, Error handling, Example, Example, Example, Example, Flags (+15 more)

### Community 31 - "jobnet-search/cli/src/cli.ts"
Cohesion: 0.15
Nodes (15): argv, commands, invoked, Occupation, OccupationAlias, occupations, outputPlain(), outputTable() (+7 more)

### Community 32 - "Upskill"
Cohesion: 0.08
Nodes (23): Aggregate mode, Aggregate mode, Compose the report, Confirm to user, Diff against profile, Diff section (aggregate mode only), For each gap:, Group by theme (+15 more)

### Community 33 - "steps"
Cohesion: 0.08
Nodes (23): GH_REPO, GH_TOKEN, jobs, triage, name, on, schedule, workflow_dispatch (+15 more)

### Community 34 - "linkedin-search/cli/src/commands/search.ts"
Cohesion: 0.17
Nodes (18): Flags, KNOWN_FLAGS, main(), parseFlags(), DetailOpts, normalizeId(), runDetail(), buildUrl() (+10 more)

### Community 35 - "Usage examples"
Cohesion: 0.09
Nodes (21): Apprentice positions in all of Denmark, Autocomplete job titles and categories, Categories, Commands, Find jobs in zip code 8000, Full details for a specific job posting, Full job detail, How to use effectively (+13 more)

### Community 36 - "/expand - Competency Expansion from Documents and Online Presence"
Cohesion: 0.09
Nodes (21): 1a. documents/cv/, 1b. documents/linkedin/, 1c. documents/diplomas/, 1d. documents/references/, 1e. GitHub Profile, 1f. Other URLs in Profile, Additions to `01-candidate-profile.md`, Additions to `02-behavioral-profile.md` (+13 more)

### Community 37 - "Writing Style Guide"
Cohesion: 0.09
Nodes (21): Application Headline (Best Practice), Body Paragraphs - Task-Solving Focus, Bullet Point Style, Closing, Company-Specific Paragraph, Consulting/Advisory roles, Cover Letter Structure, Critical Rules (+13 more)

### Community 38 - "Cover Letter Templates and Tailoring Guide"
Cohesion: 0.10
Nodes (20): Bullet Lists, Checklist Before Finalizing, Compile-and-Inspect Loop (MANDATORY), Compile command, Cover Letter Templates and Tailoring Guide, Document Structure, Email-Only Application (Brokers / "send your CV to" postings), Forward-Looking Bullet Lead-In (+12 more)

### Community 39 - "search_company"
Cohesion: 0.22
Nodes (7): search_company(), _entry(), _make_data(), SearchCompanyRefactoredTests, TestSearchCompanyBasicMatch, TestSearchCompanyCityFilter, TestSearchCompanyScoreThreshold

### Community 40 - "Step 6: Present Final Output"
Cohesion: 0.10
Nodes (19): 5b. Inspect layout, 5c. Iterate until clean, 5d. ATS & keyword verification (CV), 5e. Clean up build artifacts, Application-Form Fields (Optional Third Artifact), /apply - Drafter-Reviewer Job Application Workflow, Cover Letter (`cover_letters/CL_Lynneker_Souza_<role>_<company><COVER_EXT>`), CV (`cv/CV_Lynneker_Souza_<role>_<company><CV_EXT>`) (+11 more)

### Community 41 - "Job Evaluation Framework"
Cohesion: 0.10
Nodes (19): 1. Technical Skills Match (0-100), 2. Experience Match (0-100), 3. Behavioral/Culture Fit (0-100), 4. Location & Logistics (Pass/Fail + Notes), 5. Career Alignment & Motivation (0-100), 6. Salary Benchmark (Optional), Calibration from Past Applications, Company Research Cache (+11 more)

### Community 42 - "UpstreamCheckerRepoFixture"
Cohesion: 0.19
Nodes (5): DirectCloneFallbackTests, ForkWithoutUpstreamRemoteTests, UpstreamCheckerRepoFixture, UpstreamRefMissingFileTests, UpstreamRemotePresentTests

### Community 43 - "jobdanmark-search/cli/src/commands/detail.ts"
Cohesion: 0.18
Nodes (14): cleanText(), detail, DetailResult, findJobPostingJsonLd(), fromJsonLd(), fromRenderedHtml(), isJobPosting(), JsonLdJobPosting (+6 more)

### Community 44 - "jobindex-cli"
Cohesion: 0.11
Nodes (18): Commands, `detail` — Fetch full job listing detail, Error handling, Example, Example, Flags, Flags, Installation (+10 more)

### Community 45 - "Execution Steps"
Cohesion: 0.11
Nodes (18): 1a. Check bun availability, 1b. Run CLI tools (primary — run these in parallel where possible), 1c. WebSearch fallback, Execution Steps, How It Works, Important Rules, Invocation, Job Scraper (+10 more)

### Community 46 - "test_salary_lookup.py"
Cohesion: 0.14
Nodes (6): anglicize(), extract_core_words(), match_score_optimized(), normalize(), SearchCompanyTests, UtilityTests

### Community 47 - "run_linter"
Cohesion: 0.19
Nodes (4): LinterRepoFixture, run_linter(), SettingsShapeTests, SkillAndCommandCheckTests

### Community 48 - "freehire-search/cli/package.json"
Cohesion: 0.12
Nodes (17): bin, freehire-search, dependencies, description, devDependencies, @types/bun@1.3.14, typescript@^5.4.0, @types/bun (+9 more)

### Community 49 - "gupy-search/cli/package.json"
Cohesion: 0.12
Nodes (17): bin, gupy-search, dependencies, description, devDependencies, @types/bun@1.3.14, typescript@^5.4.0, @types/bun (+9 more)

### Community 50 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, lib, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitAny, noUnusedLocals, noUnusedParameters (+9 more)

### Community 51 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, lib, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitAny, noUnusedLocals, noUnusedParameters (+9 more)

### Community 52 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, lib, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitAny, noUnusedLocals, noUnusedParameters (+9 more)

### Community 53 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, lib, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitAny, noUnusedLocals, noUnusedParameters (+9 more)

### Community 54 - "Jobnet-Search Skill"
Cohesion: 0.11
Nodes (17): Commands, Discover occupation terms, Full details of a job ad, Full job ad detail, How to use effectively, IT jobs near Aarhus within 30km, Jobnet-Search Skill, Jobs in Copenhagen area (+9 more)

### Community 55 - "linkedin-search/cli/package.json"
Cohesion: 0.12
Nodes (17): bin, linkedin-search, dependencies, description, devDependencies, @types/bun@1.3.14, typescript@^5.4.0, @types/bun (+9 more)

### Community 56 - "nav-search/cli/package.json"
Cohesion: 0.12
Nodes (17): bin, nav-search, dependencies, description, devDependencies, @types/bun@1.3.14, typescript@^5.4.0, @types/bun (+9 more)

### Community 57 - "salary_lookup.py"
Cohesion: 0.17
Nodes (7): collect_validation_issues(), fail_data_error(), load_data(), main(), print_validation_report(), read_raw_data(), validate_data()

### Community 58 - "test_reset_command.py"
Cohesion: 0.15
Nodes (5): section(), setup_step3_skill_files(), TestResetCoversEveryDocumentsSubfolder, TestResetCoversEveryPersonalizedSkillFile, tracked_document_subfolders()

### Community 59 - "Usage examples"
Cohesion: 0.12
Nodes (16): Commands, Find data scientist jobs in Copenhagen, Full details for a specific job, Full job detail, Graduate trainee positions for new graduates, How to use effectively, IT jobs in Aarhus or Copenhagen, Jobbank Search Skill (+8 more)

### Community 60 - "Usage examples"
Cohesion: 0.12
Nodes (16): Commands, Data engineer jobs in Copenhagen, Fetch full job detail, Find Python jobs posted in the last 7 days, Full-stack developer jobs, page 2, Get full details for a specific job, Graphic designer jobs — all time, by relevance, How to use effectively (+8 more)

### Community 61 - "subprocess"
Cohesion: 0.24
Nodes (11): commit_cell(), files_touched(), git(), load_wontport(), main(), patch_id(), path_exists(), _print_crossref() (+3 more)

### Community 62 - "TestSoftTwoHundred"
Cohesion: 0.15
Nodes (3): TestSoftTwoHundred, waf(), is_robots_body()

### Community 63 - "ref_path"
Cohesion: 0.15
Nodes (6): CLI_PATH, CLIResult, runCLI(), CLI_PATH, CLIResult, runCLI()

### Community 65 - "/gmail-sync - Sync Application Status from Gmail"
Cohesion: 0.13
Nodes (14): /gmail-sync - Sync Application Status from Gmail, Important Rules, Step 0: Prerequisites, Step 10: Present Closing Summary, Step 1: Parse Input, Step 2: Load State, Step 3: Build the Search Query, Step 4: Filter to New Messages (+6 more)

### Community 66 - "/interview - Prepare for an Interview on a Tracked Application"
Cohesion: 0.13
Nodes (14): 1. Likely questions, 2. STAR answer mapping, 3. Consistency brief, 4. Tough questions, customized, 5. Questions to ask, 6. Logistics, Important Rules, /interview - Prepare for an Interview on a Tracked Application (+6 more)

### Community 67 - "Work Experience"
Cohesion: 0.13
Nodes (14): Apple Developer Academy (BEPiD) · Universidade Católica de Brasília, Education & Certifications, Hi there 👋 I'm Lynneker, Highlights, iOS Engineer · IBM (at Santander) · Brazil, iOS Mid-Senior App Developer · Empiricus Research · Brazil, remote, iOS Software Engineer · everis (an NTT Data company) · Brazil, Mobile Developer · Orbit Labs · Brazil (+6 more)

### Community 68 - "jobs"
Cohesion: 0.13
Nodes (14): jobs, lint, placeholder-integrity, security-guards, name, runs-on, name, permissions (+6 more)

### Community 69 - "cli-checks"
Cohesion: 0.15
Nodes (15): if, name, needs, runs-on, strategy, cli-checks, strategy, container (+7 more)

### Community 70 - "test_latex_guidance.py"
Cohesion: 0.19
Nodes (3): section(), TestAtsExtractionEncoding, TestSpecialCharacterGuidance

### Community 72 - "jobnet-search/cli/src/commands/search.ts"
Cohesion: 0.23
Nodes (11): buildSearchParams(), createSearchOutput(), JobAdRaw, JobAdResult, outputPlain(), outputTable(), search, SearchApiResponse (+3 more)

### Community 73 - "linkedin-search/cli/src/helpers.ts"
Cohesion: 0.29
Nodes (9): clean(), decodeHtmlEntities(), extractDivContent(), JobCard, JobDetail, numericEntity(), parseJobCards(), parseJobDetail() (+1 more)

### Community 74 - "test_robots_check.py"
Cohesion: 0.16
Nodes (5): Fixed, TestCli, _fetch(), gate(), _match()

### Community 75 - "Behavioral Profile"
Cohesion: 0.14
Nodes (13): Behavioral Profile, Cognitive / problem-solving test (`Fairsight_Cognitive_2026-04-20.pdf`), Core Behavioral Drives, Formal Assessment: Fairsight (2026-04-20), Growth Areas (frame positively in applications), How You Work Best, Job personality profile (`Fairsight_Job_Personality_2026-04-20.pdf`), Management Style Preferences (+5 more)

### Community 76 - "AI Job Search"
Cohesion: 0.14
Nodes (14): Acknowledgements, AI Job Search, Career path discovery, Contributing, Does it actually work?, File structure, How `/apply` works, License (+6 more)

### Community 77 - "ref_bun_test"
Cohesion: 0.19
Nodes (3): CLI_PATH, CLIResult, runCLI()

### Community 78 - "Search Queries for Job Scraper"
Cohesion: 0.15
Nodes (12): Adapting Queries, Date Filter, Installed portal CLIs (primary for `/scrape`), Language Filter, Location Filter, Priority 1: iOS / Mobile Engineering (Mid-Senior / Senior), Priority 2: Fintech / Banking Domain, Priority 3: Adjacent Native Mobile Roles (+4 more)

### Community 79 - "WORK EXPERIENCE"
Cohesion: 0.15
Nodes (12): ACT Digital - C6 Bank, BEPiD(Brazilian Education Program for iOS Development) or Apple Developer Academy, CGI - AktiaBank, Empiricus Research, everis an NTT Data Company, Hi there 👋, IBM, SKILLS (+4 more)

### Community 80 - "re"
Cohesion: 0.22
Nodes (4): section(), TestForkWarningsAtTheDecisionPoint, TestSetupChecksOriginBeforeWriting, strip_type_patterns()

### Community 81 - "test_scrape_provenance.py"
Cohesion: 0.17
Nodes (3): ScrapeProvenanceSpec, _steps(), TestRecencyFallback

### Community 82 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowImportingTsExtensions, module, moduleResolution, noEmit, skipLibCheck, strict, target (+3 more)

### Community 83 - "freehire Search Skill"
Cohesion: 0.17
Nodes (11): Commands, Fetch full job detail, freehire Search Skill, ℹ️ Hosted-service dependency (best-effort, no SLA), Notes, Output formats, Partial data, ⚠️ Scope: tech-focused (+3 more)

### Community 84 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowImportingTsExtensions, module, moduleResolution, noEmit, skipLibCheck, strict, target (+3 more)

### Community 85 - "jobdanmark-search/cli/src/helpers.ts"
Cohesion: 0.27
Nodes (4): apiFetch(), apiPost(), USER_AGENT, wrappers

### Community 86 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowImportingTsExtensions, module, moduleResolution, noEmit, skipLibCheck, strict, target (+3 more)

### Community 87 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowImportingTsExtensions, module, moduleResolution, noEmit, skipLibCheck, strict, target (+3 more)

### Community 88 - "Candidate Profile"
Cohesion: 0.17
Nodes (12): Awards, Behavioral Profile, Candidate Profile, Certifications, Deal-breakers, Education, Identity, Professional Experience (+4 more)

### Community 89 - "/add-portal - Generate a Job-Portal Search Skill for Your Local Market"
Cohesion: 0.17
Nodes (11): /add-portal - Generate a Job-Portal Search Skill for Your Local Market, Design Principles, File specifics, Step 0: Parse Arguments, Step 1: Interview - Portal Basics, Step 2: Investigate the Portal, Step 3: Scaffold the Skill, Step 4: Test-Run a Live Query (MANDATORY) (+3 more)

### Community 90 - "/add-template - Register a Custom CV or Cover Letter Template"
Cohesion: 0.17
Nodes (11): /add-template - Register a Custom CV or Cover Letter Template, Design Principles, List Mode, Step 0: Parse Arguments, Step 1: Template Type and Source, Step 2: Capture Template Instructions, Step 3: Store the Template, Step 4: Verify the Template Compiles (MANDATORY) (+3 more)

### Community 91 - "/html-report - Generate Application Tracker Dashboard"
Cohesion: 0.17
Nodes (11): Charts (inline SVG), Design Principles, Design spec, /html-report - Generate Application Tracker Dashboard, Layout, Step 0: Parse Arguments, Step 1: Collect Data, Step 2: Compute Summary Stats (+3 more)

### Community 92 - "/notion-sync - Push Ranked Jobs and Applications to a Notion Database"
Cohesion: 0.17
Nodes (11): Adapting to Another Tool (forks), Important Rules, Lane: `/html-report` vs `/notion-sync`, /notion-sync - Push Ranked Jobs and Applications to a Notion Database, Step 0: Parse Input, Step 1: Preflight the Connection *(Notion binding)*, Step 2: Build the Sync Set (local data only - no external calls yet), Step 3: Load Sync State and Locate the Database *(Notion binding)* (+3 more)

### Community 93 - "/outcome - Record the Result of an Application"
Cohesion: 0.17
Nodes (11): Important Rules, /outcome - Record the Result of an Application, Step 0: Parse Input, Step 1: Load State and Identify the Application, Step 2: Collect What Happened, Step 2b: Follow-Up Branch (chase a quiet application), Step 3: Archive the Application Materials, Step 4: Update the Tracker (+3 more)

### Community 94 - "Documents Folder"
Cohesion: 0.17
Nodes (11): applications/, cv/, diplomas/, Documents Folder, File Format Notes, Files within each application folder, Folder Structure, linkedin/ (+3 more)

### Community 95 - "test_placeholder_integrity.py"
Cohesion: 0.18
Nodes (3): personalize_cv(), TestCvSentinelsAreDataLocated, TestProfileSentinelIsDataLocated

### Community 96 - "Salary Benchmark Tool"
Cohesion: 0.17
Nodes (11): Data format, Fields, How it works, Important notes, Option A: Create salary_data.json manually, Option B: Convert from Excel, Option C: Build from research, Salary Benchmark Tool (+3 more)

### Community 97 - "jobdanmark-search/cli/src/commands/search.ts"
Cohesion: 0.31
Nodes (8): ApiSearchItem, ApiSearchResponse, extractCity(), normalizeItem(), outputPlain(), outputTable(), search, toContractDate()

### Community 98 - "Jobindex URL Reference"
Cohesion: 0.18
Nodes (10): Areas (geography), Base URL, Categories, Examples, Filters Available via UI Only, Full URL Pattern, Job Card Extraction, Jobindex URL Reference (+2 more)

### Community 99 - "jobnet-search/cli/src/commands/detail.ts"
Cohesion: 0.35
Nodes (9): detail, DetailApiResponse, formatDetailPlain(), outputPlain(), outputTable(), prepareDetail(), stripHtml(), detail() (+1 more)

### Community 100 - "NAV (arbeidsplassen.nav.no) URL Reference"
Cohesion: 0.18
Nodes (10): Access, Ad object fields (search results), Detail page RSC payload — the full description does NOT inline cleanly, Detail page URL, Facets (from `aggregations`), Location filter — full county list, NAV (arbeidsplassen.nav.no) URL Reference, Notes (+2 more)

### Community 101 - "/reset - Reset Candidate Profile Data"
Cohesion: 0.18
Nodes (10): Documents reset, If scope includes `documents`:, If scope includes `profile`:, Profile reset, /reset - Reset Candidate Profile Data, Step 0: Parse Scope from Arguments, Step 1: Show Exactly What Will Be Cleared, Step 2: Require Explicit Confirmation (+2 more)

### Community 102 - "Web Research and Fetching"
Cohesion: 0.18
Nodes (10): Check robots.txt before retrying (required), Escalation order, Extracting text from the saved HTML, Login walls are a different failure, Prefer the employer's own posting, The 403 problem (read this before concluding a page is unavailable), The retry: curl with browser headers, Trust boundary (applies to everything below) (+2 more)

### Community 103 - "run"
Cohesion: 0.38
Nodes (11): steps, steps, steps, steps, steps, steps, if, name (+3 more)

### Community 104 - "Gupy Search Skill"
Cohesion: 0.20
Nodes (9): Commands, Fetch full job detail, Gupy Search Skill, Notes, Output formats, ⚠️ Personal use only, Search job listings, Usage examples (+1 more)

### Community 105 - "LinkedIn Search Skill"
Cohesion: 0.20
Nodes (9): Commands, Fetch full job detail, LinkedIn Search Skill, Notes, Output formats, ⚠️ Personal use only, Search job listings, Usage examples (+1 more)

### Community 106 - "Workflow"
Cohesion: 0.20
Nodes (9): Job Application Assistant, Quick Commands, Reference Files, Step 1: Research & Evaluate Fit, Step 2: Tailor CV, Step 3: Write Cover Letter, Step 3b: Record the Application, Step 4: Interview Preparation (+1 more)

### Community 107 - "Setup Guide"
Cohesion: 0.20
Nodes (10): 2. Fork and clone, 3. Install job search CLI dependencies, 4. Run the setup interview, 5. Optional: Set up salary benchmarking, 6. Test the workflow, 7. Compile your documents, 8. Pulling upstream updates into your fork, Re-running setup (+2 more)

### Community 108 - "test_scrape_contract.py"
Cohesion: 0.27
Nodes (3): derive_contract_fields(), ScrapeSearchOutputContractTests, search_output_source()

### Community 109 - "jobbank-search/cli/tests/helpers.ts"
Cohesion: 0.28
Nodes (3): CLI_PATH, CLIResult, runCLI()

### Community 110 - "NAV (arbeidsplassen.nav.no) Search Skill"
Cohesion: 0.22
Nodes (8): Commands, Fetch job detail, NAV (arbeidsplassen.nav.no) Search Skill, Notes, Output formats, Search job listings, Usage examples, When to use this skill

### Community 111 - "README.md"
Cohesion: 0.25
Nodes (4): Reporting a vulnerability, Scope notes, Security Policy, Threat model, honestly stated

### Community 112 - "/rank - Triage Scraped Jobs into a Ranked Shortlist"
Cohesion: 0.22
Nodes (8): Important Rules, /rank - Triage Scraped Jobs into a Ranked Shortlist, Step 0: Parse Input, Step 1: Load State, Step 2: Batch-Fetch and Score, Step 3: Aggregate and Rank, Step 4: Update State, Step 5: Present the Shortlist

### Community 113 - "Application Form Fields"
Cohesion: 0.22
Nodes (8): Application Form Fields, Field type: hard character limits, Field type: self-introduction paragraph, Field type: structured project entries, Output format, The rule that governs everything here, Verification before handing it over, When this applies

### Community 114 - "Contributing"
Cohesion: 0.22
Nodes (9): Building for your own market? Do this instead, Claims get verified, Contributing, Porting to another AI runtime? Forks too, Practical notes, The bar for new commands, The one rule everything follows from, What gets declined (+1 more)

### Community 115 - "Customization"
Cohesion: 0.22
Nodes (9): Custom templates, Customization, Extending the framework: portals, templates, criteria - and borrowing from other forks, Job search tools, Salary benchmarking, Starting over, Staying up to date, Updating your search queries (+1 more)

### Community 118 - "Job Application Assistant for Lynneker Souza"
Cohesion: 0.25
Nodes (6): Agent Guidelines: AI Job Search, Thin-Pointer Design (Single Source of Truth), Job Application Assistant for Lynneker Souza, Role, Verification Checklist, Workflow for New Job Applications

### Community 119 - "jobnet-search/cli/tests/helpers.ts"
Cohesion: 0.32
Nodes (3): CLI_PATH, CLIResult, runCLI()

### Community 120 - "nav-search/cli/tests/helpers.ts"
Cohesion: 0.32
Nodes (6): CLI_PATH, CLIResult, parseJSON(), runCLI(), JobCard, SearchResponse

### Community 121 - "check_upstream_updates.py"
Cohesion: 0.46
Nodes (5): get_framework_version_from_text(), get_remote_url(), main(), parse_semver(), run_git()

### Community 122 - "with"
Cohesion: 0.25
Nodes (8): python-tests, name, runs-on, steps, with, fail-on-severity, fetch-depth, python-version

### Community 123 - "1. Prerequisites"
Cohesion: 0.25
Nodes (8): 1. Prerequisites, Bun (for job search tools), Claude Code, LaTeX (for compiling CVs and cover letters), Minimal TeX install: TinyTeX/BasicTeX, Optional: ATS text extraction (pypdf, then pdftotext), Python, Windows: Basic MiKTeX

### Community 124 - "check_framework_version.py"
Cohesion: 0.46
Nodes (5): get_base_commit(), has_non_trivial_changes(), main(), parse_frontmatter(), run_git()

### Community 125 - "lint_skills.py"
Cohesion: 0.50
Nodes (5): check_command(), check_settings(), check_skill(), main(), rel()

### Community 126 - "freehire-cli"
Cohesion: 0.29
Nodes (6): Commands, freehire-cli, Installation, Quick examples, Search flags, Self-hosting / base URL

### Community 127 - "gupy-search/cli/tests/helpers.ts"
Cohesion: 0.38
Nodes (5): CLI_PATH, CLIResult, parseJSON(), runCLI(), SearchOut

### Community 128 - "linkedin-search/cli/tests/helpers.ts"
Cohesion: 0.33
Nodes (3): CLI_PATH, CLIResult, runCLI()

### Community 129 - "nav-cli"
Cohesion: 0.29
Nodes (6): Commands, Installation, Known limitation: `detail` returns a summary, not the full posting body, nav-cli, Quick examples, Search flags

### Community 130 - "discover-clis"
Cohesion: 0.29
Nodes (7): name, outputs, runs-on, steps, discover-clis, tools, id

### Community 136 - "Gupy - URL & Data Reference"
Cohesion: 0.33
Nodes (5): Access rules, Detail page, Gupy - URL & Data Reference, Response, Search endpoint

### Community 137 - "linkedin-cli"
Cohesion: 0.33
Nodes (5): Commands, Installation, linkedin-cli, Quick examples, Search flags

### Community 138 - "Quick start"
Cohesion: 0.33
Nodes (6): 1. Fork and clone, 2. Install job search tools, 3. Set up your profile, 4. Search for jobs, 5. Apply to a job, Quick start

### Community 139 - "Troubleshooting"
Cohesion: 0.33
Nodes (6): Fonts not found in cover letter, Job search CLI tools not working, LaTeX compilation errors, "salary_data.json not found", Stale `.claude/settings.local.json` from an older clone, Troubleshooting

### Community 142 - "gupy-cli"
Cohesion: 0.40
Nodes (4): Development, gupy-cli, Setup, Usage

### Community 143 - "LinkedIn Jobs URL Reference"
Cohesion: 0.40
Nodes (4): Detail, LinkedIn Jobs URL Reference, Notes, Search

### Community 144 - "gemini-research-expert.md"
Cohesion: 0.40
Nodes (4): Operational Guidelines, Your Communication Style, Your Primary Tool, Your Research Methodology

### Community 145 - "on"
Cohesion: 0.40
Nodes (5): on, pull_request, push, workflow_dispatch, branches

### Community 147 - "PULL_REQUEST_TEMPLATE.md"
Cohesion: 0.50
Nodes (3): Failing case / reproduction (for fixes), Verification, What changed and why

### Community 148 - "dependency-review"
Cohesion: 0.50
Nodes (4): if, name, runs-on, dependency-review

### Community 149 - "latex-smoke"
Cohesion: 0.50
Nodes (4): latex-smoke, container, name, runs-on

### Community 150 - "Custom Templates"
Cohesion: 0.50
Nodes (3): Custom Templates, How it works, Layout

## Knowledge Gaps
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Fixed` connect `jobnet-search/cli/src/commands/detail.ts` to `re`, `parse_sheet`, `Changelog`, `jobbank-search/cli/src/helpers.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `freehire-search/cli/src/helpers.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06093189964157706 - nodes in this community are weakly interconnected._
- **Why does `header_matches()` connect `parse_sheet` to `re`, `sys`, `jobnet-search/cli/src/commands/detail.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `jobindex-search/cli/src/commands/detail.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08081632653061224 - nodes in this community are weakly interconnected._
- **Why does `strip_type_patterns()` connect `re` to `parse_sheet`, `sys`, `jobnet-search/cli/src/commands/detail.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `parse_sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.09371980676328502 - nodes in this community are weakly interconnected._
- **Should `run_guards` be split into smaller, more focused modules?**
  _Cohesion score 0.09513742071881606 - nodes in this community are weakly interconnected._