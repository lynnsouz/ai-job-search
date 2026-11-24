---
framework_version: 1.4.3
---

# CV Templates and Tailoring Guide

<!-- SETUP: Profile statements and section ordering are personalized by running /setup -->

## Template: LaTeX moderncv (Banking Style)

All CVs use the moderncv LaTeX package with the "banking" style and "blue" color scheme.

**Output file:** `cv/CV_Lynneker_Souza_<role>_<company>.tex`
**Compile with:** **lualatex** on MiKTeX/TeX Live. pdflatex often fails on modern MiKTeX installs with `fontawesome5` font-expansion errors; lualatex handles the same sources cleanly.
**Master reference:** `cv/cv_example.tex` (comprehensive CV with all competencies, experience, and achievements - use as source when building targeted CVs)

### Compile command

```bash
cd cv && lualatex -interaction=nonstopmode CV_Lynneker_Souza_<role>_<company>.tex
```

Expected output: `Output written on CV_Lynneker_Souza_<role>_<company>.pdf (2 pages, ...)`. Any page count other than 2 is a failure that must be fixed before presenting to the user.

## Document Structure

```latex
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{banking}
\moderncvcolor{blue}

% Force the name and section headings to render in moderncv blue (color1).
% Default banking leaves them black: moderncvstylebanking.sty's \colorlet
% copies (not aliases) the pre-scheme accent colour, so the name colours are
% frozen before \moderncvcolor runs. Re-let them after. \namefont is the hook
% every name-style macro routes through, so this also works on moderncv 2.3.1
% (Debian/Ubuntu apt), which has no \firstnamestyle/\lastnamestyle at all.
\renewcommand*{\namefont}{\fontsize{34}{36}\bfseries\upshape}
\colorlet{firstnamecolor}{color1}
\colorlet{lastnamecolor}{color1}
\colorlet{namecolor}{color1}
\renewcommand*{\sectionstyle}[1]{{\sectionfont\color{color1}#1}}

\usepackage[utf8]{inputenc}
% moderncv loads hyperref itself in an \AtEndPreamble hook, so \hypersetup
% must go in an \AtEndPreamble of our own: on moderncv < 2.4 a top-level
% \usepackage{hyperref} clashes with the class's own
% \RequirePackage[unicode]{hyperref}. From 2.4.0 the class passes its options
% through \PassOptionsToPackage instead, which is what removes that clash.
\AtEndPreamble{\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,
    urlcolor=blue,
    pdftitle={[YOUR_NAME] - CV},
    % Keep pdfpagemode=UseNone: this block runs after moderncv's own
    % \AtEndPreamble (moderncv.cls sets pdfpagemode there), so a FullScreen
    % value here would win and open every CV in fullscreen presentation mode.
    pdfpagemode=UseNone,
}}
\usepackage[scale=0.77]{geometry}
\usepackage{import}

% Personal data
\name{[FIRST_NAME]}{[LAST_NAME]}
% If you have no address to list, DELETE this whole line. \address{}{}{} fails
% with "There's no line here to end" on every moderncv version.
\address{[YOUR_ADDRESS]}{}{}
\phone[mobile]{[YOUR_PHONE]}
\email{[YOUR_EMAIL]}
\extrainfo{\href{[YOUR_LINKEDIN_URL]}{LinkedIn}, \href{[YOUR_GITHUB_URL]}{GitHub}, \href{[YOUR_PORTFOLIO_URL]}{Portfolio}}

\begin{document}
\makecvtitle

% 1. Profile statement (1-3 sentences, tailored per role)
% 2. Skills section
% 3. Education section
% 4. Professional Experience section
% 5. Selected Publications (if applicable)
% 6. Honors and Awards (if applicable)
% 7. References

\end{document}
```

### Color overrides

The `\renewcommand*` on `\namefont` and the three `\colorlet` lines in the preamble are required on lualatex+MiKTeX. Without them the name and section headings render in black even though `\moderncvcolor{blue}` is set, which looks inconsistent with the rest of the blue accent scheme (links, bullet markers, contact icons). The cause: `moderncvstylebanking.sty` defines the name colours with `\colorlet`, which *copies* the accent colour as it is before the scheme is applied, so the name colours are frozen to the pre-scheme value; re-assigning them with `\colorlet` after `\moderncvcolor{blue}` (as the preamble does) re-pins them to `color1`. `\namefont` is the shared hook every name-style macro routes through, so the block is version-agnostic - including moderncv 2.3.1 from Debian/Ubuntu apt, which has no `\firstnamestyle`/`\lastnamestyle` at all. Both names render bold; if you prefer regular weight, change `\bfseries` to `\mdseries` in the `\namefont` line (the weight now lives there, so it applies to the whole name). Don't drop the overrides - on most modern installs the defaults render visibly wrong.

### Spacing inside itemize lists (important)

**Do not place `\vspace{...}` between `\item` entries in an `itemize` list.** Even though the source looks symmetric, this pattern occasionally produces a noticeably oversized gap before a single item: the inter-item `\vspace` creates a paragraph break that interacts unpredictably with the list's internal `\itemsep`, so LaTeX renders one of the gaps wider than the rest. Remove the inter-item `\vspace` and let `itemize` use its native uniform spacing.

```latex
% WRONG - intermittently produces an oversized gap before one bullet
\begin{itemize}
\item \textbf{Foo}: ...
\vspace{1pt}
\item \textbf{Bar}: ...
\vspace{1pt}
\item \textbf{Baz}: ...
\end{itemize}

% RIGHT - uniform spacing using the list's native itemsep
\begin{itemize}
\item \textbf{Foo}: ...
\item \textbf{Bar}: ...
\item \textbf{Baz}: ...
\end{itemize}
```

Two related patterns are fine and should be kept:
- `\vspace{1pt}` immediately after `\section{...}` (between section heading and first item) - this is between the heading and the list, not between list items.
- `\vspace{3pt}` between top-level `\cventry` blocks in Professional Experience or Education - this gives breathing room between roles and renders consistently.

### Section headings must match the CV's language (important)

Section headings such as `\section{Core Competencies}`, `Professional Experience`, `Education`, `Languages`, `Publications`, `Honors and Awards`, `References` (and any others your template defines), plus the `Available upon request.` line under References, are all **literal English text baked into the template** - they do not translate themselves. Whenever the CV language (see `CV language` in the candidate profile) is not English, translate every one of these too, whatever they are, not just the body prose - a CV with a fully localized profile statement and bullets sitting under untouched English section headers reads as sloppy and inconsistent, and it's an easy thing to forget precisely because the prose translation is the obvious, visible part of the job. Worked example for Spanish: `Competencias Clave`, `Experiencia Profesional`, `Educaci\'on`, `Idiomas`, `Publicaciones`, `Distinciones y Premios`, `Referencias`, `Disponibles a solicitud.` The same rule applies for any other target language - check this explicitly during the verification pass.

## Section-by-Section Tailoring

### Profile Statement / Elevator Pitch (Best Practice)
This is the most important section to customize. It appears right after `\makecvtitle`.

Write 5-7 lines that function as an "elevator pitch": a concise, compelling introduction explaining why you're qualified for *this specific role*. Focus on what the employer gains from hiring you.

When the role sits outside your home domain, **lead with the domain-transfer argument** - the one or two sentences connecting your background to their problem (e.g. wave physics to radar signal processing) belong in the profile statement's opening, not buried in the cover letter. It is the strongest card a domain-changer holds; play it first.

**Create 2-3 profile statement templates for your main role types:**

**For banking/fintech iOS roles:** *[Used for: dkb_code_factory_ios_engineer_business_banking]*
> Senior iOS Developer with over 8 years of professional experience building and shipping native Swift applications for banking and fintech products, including C6 Bank (30M clients) and Santander (65M clients). Deep expertise in Swift, SwiftUI, and modular architecture (Clean Swift, MVVM), with direct experience on security-critical features, including leading the iOS integration of a third-party Security Authentication SDK across apps at CGI/AktiaDuetto. Strong testing discipline (94% code coverage via XCTest and UI Testing) and a recurring reputation for mentoring peers and raising codebase quality through code review, well suited to building a new mobile-first banking product from the ground up.

**For security/privacy-focused iOS roles:** *[Used for: proton_senior_ios_engineer]*
> Senior iOS Developer with over 8 years of professional experience designing, developing, and maintaining high-performance native Swift applications, including leading the iOS integration of a third-party Security Authentication SDK across a banking client's app suite and a GDPR/LGPD consent feature governing user data-sharing permissions. Strong track record building maintainable, testable mobile architectures (Clean Swift, MVVM) and collaborating across large, multi-team codebases. Recurring reputation for mentoring peers and raising codebase quality through code review, built across international, security-conscious consultancy placements.

**For engineering/technical leadership roles:** *[Used for: vipps_mobilepay_engineering_manager]*
> Senior iOS Engineer with over 8 years of hands-on mobile delivery in banking and fintech, now transitioning into engineering leadership. Consistently the person teams lean on for code quality and process improvement: owning code review (20+ reviews/month), mentoring peers, and driving delivery process improvements such as CI/CD automation and AI-assisted development adoption. Deep native-mobile domain knowledge across iOS, informed by close collaboration with backend, QA, and design throughout every engagement.

**For accessibility/consumer-scale roles:** *[Used for: speechify_ios_engineer]*
> Senior iOS Engineer with over 8 years of experience building and shipping production Swift/SwiftUI applications for user bases in the tens of millions. Combines strong CI/CD and release-engineering practice (Bitrise, Fastlane, Git) with a genuine track record in accessibility-focused UI work, having shipped adaptive, font-size-aware interfaces for a banking app's core screens. Comfortable owning a feature end to end, from technical planning to App Store release, in fully distributed remote teams.

**For platform/infrastructure-ownership roles:** *[Used for: amazon_application_builder_ring_application_services]*
> Senior iOS Developer with over 8 years of professional experience building native Swift applications, including leading the iOS integration of a third-party Security Authentication SDK across multiple apps at CGI/AktiaDuetto - work several apps depend on, not a single feature. Strong testing discipline (94% code coverage via XCTest and UI Testing), CI/CD automation experience (Bitrise, GitHub Actions, Fastlane), and a recurring reputation for mentoring peers and raising codebase quality through code review, well suited to owning a platform or shared-services component that other engineering teams depend on.

**For native dual-platform (Swift + Kotlin) roles:** *[Used for: mode_mobile_sr_mobile_engineer_upcoming_apps]*
> Senior native mobile engineer (iOS) with over 8 years of experience shipping consumer apps to millions of users in fully remote teams, including a 100% crash-free cashback feature serving 30M clients at C6 Bank. Hands-on production experience with Swift, SwiftUI and UIKit, Swift Concurrency (async/await), Combine, CoreData, and XCTest/XCUITest. Used to taking ownership of existing production codebases, with 48+ App Store releases and 94% code coverage. Android is the growth side of the profile: production experience is native iOS - state this plainly rather than implying Kotlin experience.

**For product-company roles adding a new area to a shared app:** *[Used for: vend_app_developer_finn_travel]*
> Senior iOS Developer with over 8 years of professional experience building native Swift and SwiftUI apps used by tens of millions of people, including C6 Bank (30M clients) and the Santander Way credit card app (65M active clients). Has set up the foundations other developers build on: led SwiftUI adoption with MVVM and Combine at Empiricus Research, built its Bitrise CI/CD pipeline (50%+ delivery efficiency gain), and introduced GitHub Copilot at CGI/AktiaDuetto (25% process efficiency gain). Works inside large shared codebases with SPM, async/await and REST APIs, and owns features from architecture through App Store release.

**For primary-iOS-developer roles at smaller product companies:** *[Used for: propely_senior_ios_developer; adjusted 2026-11-06 from "owning a codebase's architecture" and "built and integrated" to match the profile. Propely's rejection named this letter's banking apps, SwiftUI and architecture/release points as interesting.]*
> Senior iOS Developer with over 8 years of experience building native Swift apps in production, including C6 Bank (30M clients) and the Santander Way credit card app (65M active clients). Led SwiftUI adoption with MVVM and Combine at Empiricus Research and uses Swift Concurrency (async/await) in production, most recently integrating a third-party Security Authentication SDK across apps at CGI/AktiaDuetto. Comfortable owning a feature's architecture, quality and release path: 94% code coverage, 48+ App Store releases, CI/CD pipelines built with Bitrise and GitHub Actions, and a 100% crash-free feature at scale. Regularly the person who mentors peers and raises code quality through review, which is the groundwork a future mobile team needs.

**For application-support / technical business analyst roles (non-developer, close to business users):** *[Used for: gard_technical_business_analyst; added by `/setup` Path A 2026-11-18]*
> Hands-on technical generalist with over 8 years of experience building, maintaining and supporting business-critical applications for banks and financial companies, including C6 Bank (30M clients), Santander (65M active clients) and Aktia in Finland. Used to investigating why a system behaves the way it does, working with external suppliers to pin it down, documenting the outcome and taking changes safely through release. Practical SQL experience, a habit of automating recurring work, and clear written and spoken English. Based in Arendal and looking to move into an application-focused role close to the business users.

**For Brazil-based fully remote fintech roles:** *[Used for: ifood_ios_software_engineer_senior; added by `/setup` Path A 2026-11-18]*
> Senior iOS Developer with over 8 years of native iOS experience, building banking and payment features in Swift since 2019 for C6 Bank (30M clients), Santander Way (65M active clients) and Banco do Brasil, plus a Security Authentication SDK at CGI/AktiaDuetto. Treats security, performance and reliability as part of the product: a 100% crash-free cashback feature at C6 Bank (over 1M BRL redeemed) shipped with end-to-end Firebase metrics and 94% code coverage, an LGPD consent feature at Santander, and Keychain for sensitive data. Works across Clean Swift (VIP) and MVVM, UIKit and SwiftUI, with Swift Concurrency (async/await). Brazilian citizen based in Norway, working remotely since 2020.

**For AI-product startup roles:** *[Used for: sowelo_consulting_ios_engineer_fully_remote_in_europe; added by `/setup` Path A 2026-11-18]*
> Senior iOS Engineer with over 8 years of professional experience shipping and supporting consumer-facing iOS apps in Swift and SwiftUI, where reliability and user trust are non-negotiable: banking apps for C6 Bank (30M clients) and Santander (65M active clients). Uses Swift Concurrency (async/await) in production, including integrating a third-party Security Authentication SDK and awaiting its authentication responses across several apps. Owns features end to end, from API integration with backend teams to App Store stability, with a 100% crash-free feature, 94% code coverage via XCTest and 48+ App Store releases. Early prototype work with IBM Watson cognitive computing; production experience with on-device ML is the growth area.

**For consultancy / consultant-network placements:** *[Used for: deploja_ios_engineer; added by `/setup` Path A 2026-11-19]*
> Senior iOS Engineer with over 8 years of iOS development experience, most of it as a consultant inside client teams at banks: C6 Bank (30M clients), Santander Way (65M active clients) and AktiaDuetto in Finland. Writes idiomatic Swift within each team's existing guidelines, across Clean Swift, MVVM, Combine and Swift Concurrency (async/await), and owns features end to end, from REST API integration with backend teams to App Store release. Ships features behind remote toggles that can switch them off in production, measured with end-to-end Firebase metrics. Introduced AI-assisted development (GitHub Copilot) at CGI/AktiaDuetto with a 25% efficiency gain, and uses Claude Code on independent projects. Works fully remote from Norway; Family Ties residence permit pending.

**For shared-code / Kotlin Multiplatform roles:** *[Used for: opinov8_senior_ios_swift_engineer_with_kmp_experience; added by `/setup` Path A 2026-11-19]*
> Senior iOS Engineer with over 8 years of professional experience building native Swift apps in production, most of it as a consultant inside client teams: C6 Bank (30M clients), Santander Way (65M active clients) and AktiaDuetto in Finland. Strong in iOS architecture (Clean Swift, MVVM, Combine) and in working with code that several apps share: led the iOS integration of a third-party Security Authentication SDK across apps with Swift Concurrency (async/await). Introduced AI-assisted development (GitHub Copilot) at CGI/AktiaDuetto with a 25% process efficiency gain, and uses Claude Code for agentic coding workflows outside client work. Has shipped iOS features alongside Android teams working to the same product spec; Kotlin Multiplatform is the growth area. Works fully remote from Norway; Family Ties residence permit pending.

**For AI-training / expert-reviewer contract roles:** *[Used for: afterquery_swiftios_developer_expert; added by `/setup` Path A 2026-11-24]*
> Swift/iOS developer with over 8 years of native iOS work on financial apps at scale: C6 Bank (30M clients), the Santander Way credit card app (65M active clients) and AktiaDuetto in Finland. Deep, hands-on knowledge of Swift, the iOS SDK, UIKit and SwiftUI, state management with MVVM, Clean Swift and Combine/RxSwift, networking with RESTful APIs and async/await, and data persistence with CoreData and SwiftData. Experienced reviewer of other developers' code: 20+ code reviews a month at C6 Bank. Built Property Asset solo in SwiftUI and SwiftData, including an offline-first sync engine. Based in Arendal, Norway, available for remote, asynchronous work.

**For investing / trading fintech roles:** *[Used for: ajaib_sr_ios_engineer_ii_us_stocks; added by `/setup` Path A 2026-11-24]*
> Senior iOS Engineer with over 8 years of native iOS development on regulated, high-traffic financial apps: C6 Bank (30M clients), the Santander Way credit card app (65M active clients) and AktiaDuetto in Finland. Owns features end to end, from technical design with backend and product to App Store release and post-release monitoring, including C6 Bank's cashback feature, 100% crash-free across 30M clients. Built money flows under regulatory constraints (PIX QR-code payments under Central Bank of Brazil rules) and investment features at Empiricus Research. Swift, UIKit and SwiftUI with MVVM, Clean Swift, Combine and async/await; mentors through 20+ code reviews a month. Works fully remote from Norway; Family Ties residence permit pending.

**For tech-lead-manager roles (lead first, line management later):** *[Used for: ōura_tech_lead_manager_healthos_platform; added by `/setup` Path A 2026-11-24]*
> Senior iOS Engineer with over 8 years of hands-on mobile delivery, moving deliberately into technical leadership. Has led technical areas from framing through launch and maintenance: the SwiftUI, MVVM and Combine adoption at Empiricus Research, the iOS integration of a third-party Security Authentication SDK across apps at CGI/AktiaDuetto, and a 100% crash-free cashback feature for 30M clients at C6 Bank. Raises team quality through 20+ code reviews a month, smooth onboarding of new teammates and CI/CD automation (+50% delivery efficiency). Introduced GitHub Copilot at CGI (+25% efficiency) and uses Claude Code in agentic workflows on independent projects. Lived in Finland 2024-2026; based in Norway and ready to relocate to Helsinki.

**For senior IC roles in large, multi-team consumer apps:** *[Used for: wolt_senior_mobile_engineer_ios_new_verticals_emea; added by `/setup` Path A 2026-11-24. "Several teams contribute to the same codebase" is documented for C6 Bank; be ready to describe the Santander team setup if asked.]*
> Senior iOS engineer with over 8 years of native Swift development on large, consumer-facing apps where several teams contribute to the same codebase: C6 Bank (30M clients) and the Santander Way credit card app (65M active clients). Owns features end to end with Product and Design, from technical design through release and the metrics that follow: a 100% crash-free feature, 94% code coverage and 48+ App Store releases. Raises the bar for others through 20+ code reviews a month and onboarding engineers new to the codebase. Uses AI coding tools across the development cycle: introduced GitHub Copilot at CGI (+25% efficiency) and uses Claude Code on independent projects. Based in Norway and relocating to Helsinki.

**Backtrack check for ownership claims:** in the Fartskriver screen the candidate said "I never had the whole application… one module". Claim ownership of features end to end, not of whole apps or codebases, unless a specific role supports it.

Statements labeled *[Used for: <company>_<role>]* were extracted from archived application drafts by `/setup` Path A. They are **phrasing references, never fact sources**: when drafting from one, every factual claim still comes from `01-candidate-profile.md` - a past tailored draft does not vouch for its own accuracy.

### Core Competencies / Skills Section (Best Practice)
Reorder and emphasize based on the role. Use bold category labels.

List **5-7 key competencies** in bullet format, tailored to the specific job. For each competency, briefly explain how it adds value to the position.

Use the posting's own core term in the matching bullet's bold label when it truthfully applies - ATS and skim-reading hiring managers match literally, and "MLOps" in a heading outperforms a paraphrase like "ML Deployment".

### Education
- Always include your highest degrees
- For senior roles, keep education brief (dates and titles only)
- Include thesis topics when relevant to the target role

#### In-progress qualifications must say so explicitly

**A bare year range is not enough.** An entry reading `2025–2026`, seen partway through 2026, looks like a *finished* degree, because a reader skimming a CV treats a closed range as closed. A profile statement that says "currently completing…" does not fix it: the education entry is where a reader checks the credential, so it has to stand on its own.

State completion inside the entry itself:

```latex
\item{\cventry{2025--2026}{[Degree], [Field]}{[Institution]}{[Location]}{}{\vspace{1pt}
In progress, expected [Month Year]. [Relevant topics]
}}
```

Any consistent form works: `In progress, expected <Month Year>.` / `Expected completion <Month Year>.` / a date field of `2025–present`.

Claiming a credential not yet held is a factual misstatement, and it is the kind discovered at transcript or reference check rather than at interview. It costs nothing to prevent. The same applies to in-progress certifications and courses.

**Check for agreement:** for a current student, the profile statement, the education entry, and any availability or work-permit note must all give the same completion date. Contradiction between them is worse than any single version.

### Professional Experience
- Rewrite bullet points to emphasize aspects most relevant to the target role
- Use 4-6 bullets for most recent role, 3-4 for previous, 2-3 for older
- **Emphasize measurable results** where possible: "Reduced processing time by X%", "Model adopted by the team"

#### Check tenure against visible output

Before finalizing, look at each role the way a stranger will: **date span versus how much work is shown.** A two-year role represented by a single project reads as low output, whether or not that is fair. The reader cannot know what filled the time, so they guess, and the guess is unflattering.

This bites hardest on **career changers** (part of the tenure went into learning the new field), on **long-cycle work** (industrial deployment, clinical or regulatory projects, research — one delivery genuinely takes quarters), and on anyone whose employer kept them on a single account or product.

Three honest fixes, in order of preference:

1. **Surface more real work.** Ask what else the period contained. There are often real secondary projects, internal tooling, or support work that never reached the CV because it felt minor. Best fix when the material exists.
2. **Make the phases within the role explicit.** If the span genuinely had stages, say so — an initial period learning the domain or supporting the team, then ownership of the named work through to delivery. A phased arc reads as a growth curve; an undifferentiated multi-year block reads as stagnation.
3. **Name what made the cycle long.** Data collection from a live environment, validation with domain experts, deployment and iteration against real output. Reviewers who know the domain accept this immediately.

**Never** pad with invented projects, and **never** quietly shorten the employment dates so the ratio looks better. Both are discoverable, and both are worse than the perception problem being solved.

**Prepare the interview answer too.** If a long span against little visible output survives these fixes, the question is coming. The candidate needs a ready two-part answer — what actually filled the time, and what the outcome was — recorded in their interview prep rather than improvised in the room.

### Handling Employment Gaps (Best Practice)
If there is a gap in your employment history:
- The gap should be explained matter-of-factly if needed
- Describe how professional development continued during the gap
- Frame as deliberate skill-building and career repositioning

### Publications
- Include Google Scholar link if applicable
- Select 3-4 most relevant publications (not always all of them)
- For non-academic roles, keep brief

### Evidence Links
Wherever the CV names a verifiable artifact - a public project, a hackathon entry, a publication - carry its link (`\href`) so a reader can verify the claim in one click. A CV whose strongest claims are checkable reads as more credible everywhere else too.

### Honors and Awards
- Keep format brief, one line each

### References
- List 2-4 references with name, title, company, and contact
- End with: "More references are available upon request."
- **Do not attach reference letters** - employers typically contact references directly

### LaTeX Special Characters (important)

Postings and profile data arrive as plain text; the CV is LaTeX. Escape these wherever they land in body text - company names, achievement bullets, skill lists:

| Character | Write | Typical trigger |
|---|---|---|
| `&` | `\&` | company names: Bang \& Olufsen, Brüel \& Kjær, H\&M |
| `%` | `\%` | quantified achievements: "cut latency by 40\%" |
| `$` | `\$` | salary and cost figures |
| `#` | `\#` | "ranked \#1", C\# |
| `_` | `\_` | file names, code identifiers |
| `~` | `\textasciitilde{}` | URLs, "approx. 5 years" tildes |
| `^` | `\textasciicircum{}` | version strings, math |

Two failure modes deserve special care:

- **`%` fails silently.** An unescaped `%` starts a LaTeX comment: the compile succeeds with zero errors, and everything after the `%` on that line vanishes from the PDF. `Cut inference latency by 40% and saved DKK 2M annually` renders as "Cut inference latency by 40" - the bullet keeps its impressive-looking fragment and loses the actual result. Quantified achievement bullets are exactly where the guidance steers you ("use numbers where possible"), so check every `%` in every bullet before compiling.
- **`&` fails loudly** inside `\cventry` (alignment-tab errors, `Missing } inserted`). The compile loop catches it, but escape employer names up front rather than debugging the compile.

Related trap: a bullet whose text begins with a literal `[` must be braced - `\item {[text]}` - or LaTeX parses the bracketed text as `\item`'s optional label and renders it clipped off the left page edge with a clean compile. The example CV's placeholder bullets are braced for exactly this reason.

## Compile-and-Inspect Loop (MANDATORY)

After writing the CV and before presenting to the user, always compile and visually inspect the PDF. Iterate until the layout is clean. Workflow:

1. Run `lualatex -interaction=nonstopmode CV_Lynneker_Souza_<role>_<company>.tex`
2. Check the output page count: must be exactly 2
3. Read the PDF via the Read tool and visually inspect both pages
4. Check for **orphaned entries**: a `\cventry` title line must never sit alone at the bottom of page 1 with its bullets on page 2

### Fixing common page-break problems

**Problem: entry title on page 1, bullets orphaned to page 2**
Add `\needspace{5\baselineskip}` immediately before the problematic `\cventry`:
```latex
\needspace{5\baselineskip}
\item{\cventry{YEAR--YEAR}{Role Title}{Organization}{Location}{}{...}}
```
Include `\usepackage{needspace}` in the preamble.

**Caveat - use `\needspace` before entries, never before `\section` headings.** A section-level `\needspace` pushes the entire section (heading plus content) to the next page whenever the request does not fit, stranding empty space above and typically *adding* a page instead of saving one. Apply it only to the individual `\cventry` that actually orphans, and only after a compile shows the orphan.

**Problem: one trailing section spills to page 3 (e.g., References alone on page 3)**
Add `\enlargethispage{3\baselineskip}` before a late section (e.g., before `\section{Honors and Awards}`) to stretch page 2 by a few lines. This is the standard LaTeX rescue for near-miss overflows. (`2-3\baselineskip` is not a legal LaTeX dimension — it compiles but prints a literal stray "-3" onto the page. Use a single value.)

**Problem: 3 pages with significant content on page 3**
Cut content — do not compress geometry or `\vspace`. See "Relevance-weighted cutting" below for the rule.

**Problem: content finishes early on page 2 (feels thin)**
Restore the highest-relevance item that was previously cut — a CV that ends mid-page 2 looks incomplete.

## ATS Parseability

Most employers run CVs through an ATS before a human sees them, and the ATS reads the PDF's embedded **text layer**, not the rendered page. A CV can pass visual inspection and still extract as garbage. After the layout passes the compile-and-inspect loop, verify the text layer:

```bash
python tools/verify_pdf.py cv/CV_Lynneker_Souza_<role>_<company>.pdf --dump-text cv/CV_Lynneker_Souza_<role>_<company>.txt
```

Extraction tries **pypdf** first (`pip install pypdf`, BSD license), then Poppler `pdftotext`. If a fallback still uses `pdftotext -layout`, it must also pass `-enc UTF-8`: Xpdf-based builds default to Latin-1, which makes every non-ASCII character in a perfectly good CV read back as a replacement character. If neither extractor is available, skip the mechanical check with a warning and rely on the visual PDF read for keyword coverage.

What to check in the extraction:

- **Contact details as literal text.** The stock template's fontawesome contact icons extract as glyph names (`MOBILE-ALT`, `Envelope`) - harmless noise, because the actual address and number are printed beside them. The failure mode is a contact detail carried *only* by an icon or a hyperlink (like the `LinkedIn` link text, whose URL is not in the text layer): invisible to an ATS. The email address must always appear as printed text.
- **No garbled output.** `(cid:NNN)` markers or `�` characters mean a font is embedded without a Unicode mapping - an ATS sees the same garbage. This shows up with unusual fonts in custom templates, not with the stock moderncv setup under lualatex.
- **Reading order.** The stock banking style is single-column, so extraction order matches visual order. Custom templates (via `/add-template`) with sidebars or multi-column layouts can interleave unrelated lines; if extraction order is scrambled, the user is trading ATS compatibility for looks and should be told.
- **Keyword coverage.** Match the posting's required/preferred terms against the extracted text, in the posting's language. Prefer the posting's exact term over a synonym when it is truthfully applicable - ATS matching is often literal. Never add a keyword the profile does not support.

### Date fields must be ASCII ranges (confirmed ATS import failure)

This one is worth knowing about because it fails **silently**. A CV that passes every other check in this section - clean extraction, no `(cid:)` markers, contact details intact, correct reading order - can still have its dates dropped on import. In a real Workday resume import, a CV built from this template lost the end date of a short contract role and failed to import **any** education entry at all, forcing manual re-entry. Nothing about the PDF or its text layer looked wrong.

Two independent causes, both easy to avoid:

1. **`--` in a `\cventry` date renders as an en-dash (U+2013), not a hyphen.** LaTeX ligatures `--` (two ASCII hyphens, U+002D) into a single en-dash glyph, so `2016--2024` reaches the PDF text layer as `2016<U+2013>2024`. Many parsers split date ranges only on an ASCII hyphen and see no range at all. Write the date argument with a **single hyphen**:

   ```latex
   \item{\cventry{2016-2024}{Role Title}{Organization}{Location}{}{...}}   % parses
   \item{\cventry{2016--2024}{Role Title}{Organization}{Location}{}{...}}  % en-dash, may not
   ```

   This applies to the **date argument only**. Keep `--` everywhere it is typographically correct in prose, for example a numeric range like `EUR 600k--1M`.

2. **A bare single year gives the parser no end date.** A short contract, mandate or internship written as `\cventry{2016}` imports as a start date with nothing to close it. Use an explicit range, with months where the role ran under a year:

   ```latex
   \item{\cventry{Mar 2016 - Jul 2016}{Contract Role}{Client}{Location}{}{...}}
   ```

   Where a genuine range exists, use it even when a single year would be factually accurate - a degree written `1995` is true but imports worse than `1992-1995`. Do not invent a start date you do not have; a lone graduation year is fine, just expect it to be typed in by hand.

**Add this to the step 5d checks**: after extracting the text layer, confirm every experience entry shows a start *and* an end separated by an ASCII hyphen. Because the failure is silent and invisible in the PDF, the candidate otherwise discovers it only while filling in the application form.

## Page Budget - Hard 2-Page Limit

The CV **must** fit on exactly 2 pages when compiled. Use these content limits as a guide:

| Section | Max budget |
|---------|-----------|
| Profile statement | 3-4 lines |
| Skills | 5 items, each 1-2 lines |
| Most recent role | 4-5 bullets |
| Previous role | 2-3 bullets |
| Older roles | 2 bullets (1 line each) |
| Education | 2-3 entries |
| Publications | 2-3 entries |
| Awards | 3 entries, single line each |
| References | "Available upon request." (single line) |

**If in doubt, cut rather than squeeze.** Reducing `\vspace` or geometry scale to force-fit content makes the CV look cramped.

## Relevance-weighted cutting (the right way to shrink a CV)

**Cut by signal, not by section.** Static priority lists ("remove oldest education first, then shorten the earliest role...") are wrong when a relevant "lower-priority" item is competing with an irrelevant "higher-priority" item. An older-role bullet that speaks directly to the posting is worth more than a recent-role bullet that does not.

For every candidate line, score three things:

1. **Relevance to THIS posting** — does the line hit a named tool, keyword, or stated responsibility in the job ad?
2. **Uniqueness** — is it the only place this claim appears, or is it duplicated elsewhere in the CV?
3. **Narrative load** — does the cover letter depend on it? If cutting the line would force you to rewrite a cover-letter paragraph, it is load-bearing.

Cut the lowest-total-score line first, regardless of which section it sits in.

### Practical order of cuts (easiest → last resort)

1. **Redundancy.** If an achievement appears in both Core Competencies AND a role bullet, the Core Competencies version is usually the cleaner cut (the experience bullet is more concrete evidence).
2. **Profile-statement fluff.** A sentence that just restates what Publications or Skills will show. ("Peer-reviewed publications on X..." is already a Publications entry — profile can claim it once and stop.)
3. **Low-relevance experience bullets.** A bullet about work that does not touch posting keywords, wherever it sits. This cuts across sections before touching the structural list.
4. **Low-relevance supporting content.** An older-role bullet that does not speak to the target role. A certification that does not touch the posting's stack. A language entry that can be condensed to one line.
5. **Low-relevance publications.** Keep 1-2 publications that best match the posting. Cut the rest before touching experience bullets.
6. **Last-resort structural cuts.** Oldest education entry, tightening an older role to 2 bullets, collapsing Certifications into a single line. These only happen if the relevance-weighted cuts above have already been exhausted.

### Pitfalls to avoid

- Do not mechanically cut from the bottom of a static section list without checking relevance. "Cut the oldest role first" is wrong if that role is literally about the skill the posting asks for.
- Do not cut the one concrete example the cover letter leans on. Relevance is measured against the cover letter you wrote, not just the job posting — interviewers will have read both.
- Do not cut to fit if the fit is borderline (2.02 pages). Prefer `\enlargethispage{3\baselineskip}` on a late section for near-misses; reserve content cuts for genuine overflow (content on page 3 that is more than a single trailing section).

## Recommended Section Order

The section order varies by role type:

**For technical / data science / ML roles:**
1. Profile statement / elevator pitch
2. Core competencies / Skills
3. Professional Experience (reverse chronological)
4. Education (reverse chronological)
5. Languages
6. Publications & Awards
7. References

**For domain-specific / specialist roles:**
1. Profile statement / elevator pitch
2. Core competencies / Skills
3. Education (reverse chronological) - credentials are a key qualifier
4. Professional Experience (reverse chronological)
5. Publications & Awards
6. References
