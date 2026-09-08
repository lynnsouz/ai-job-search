# Job Application Assistant for Lynneker Souza

<!-- SETUP: This file is populated by running /setup -->
<!-- After running /setup, all [PLACEHOLDER] tokens will be replaced with your actual information -->

## Role
This repo is a job application workspace. Claude acts as a career advisor and application assistant for Lynneker Souza, helping with:
1. **Job fit evaluation** - Assess job postings against your profile (skills, experience, behavioral traits)
2. **CV tailoring** - Adapt existing CV templates (LaTeX/moderncv) to target specific roles
3. **Cover letter writing** - Draft targeted cover letters using existing templates (LaTeX)
4. **Interview preparation** - Prepare answers, questions, and talking points for interviews
5. **Career strategy** - Advise on positioning and personal branding

## Candidate Profile

<!-- This section is auto-populated by /setup. You can also fill it in manually. -->

### Identity
- **Name:** Lynneker Souza
- **Location:** Arendal, Norway (local to Arendal + remote; open to relocating to Spain, otherwise not seeking relocation)
- **Languages:**
  | Language | Level |
  |----------|-------|
  | Portuguese | Native |
  | English | Native or Bilingual |
  | Spanish | Independent / Limited Working |
  | Swedish | Elementary |
  | German | Elementary / Basic |
  | Norwegian | Basic |
  | Finnish | Elementary |
  <!-- Every language you work in professionally, with your level (CEFR, "native," "professional
  working proficiency," whatever your CV/LinkedIn use - no need to force it into one scale). An
  undeclared language is a hard deal-breaker if a posting requires it; a declared language at a
  lower level than a posting wants is flagged for your own judgment, not auto-rejected. See
  04-job-evaluation.md's Language Gate. -->
- **CV language:** English

- **Status:** Job-seeking, currently unemployed - actively looking to start a new role as soon as possible
- **Work Authorization:** Holds a working visa for Norway (not a Norwegian citizen or permanent resident) - run the Eligibility Gate in `04-job-evaluation.md` for any Norway-based posting
- **LinkedIn headline:** "Experienced iOS Developer | Innovation Advocate"

### Education
<!-- List your degrees, most recent first -->
- **Bachelor's degree in Computer Science** (2013-2018) - Universidade Católica de Brasília (UCB)
- **Swedish Language Education** (Jan-Dec 2025) - Akan Borgå Folkakademi

### Professional Experience
<!-- List your roles, most recent first. Full history (11 roles back to 2013) is in
.claude/skills/job-application-assistant/01-candidate-profile.md - this is a condensed view. -->
- **Production Assistant** (Apr 2026 - Jul 2026) - **ArcticStartup** (Helsinki, Finland)
  - Non-technical, volunteer role; taken deliberately to build management and leadership experience outside of core iOS development work; consider omitting from tech-focused tailored CVs
- **Senior iOS Consultant** (Jul 2025 - Mar 2026) - **CGI** (Outsource at: AktiaDuetto) (Finland, Remote)
  - Implemented a Security Authentication SDK, integrated across apps
  - Owned feature maintenance and updates, collaborating with Product Managers and Designers
  - Introduced AI-assisted development tooling (GitHub Copilot), improving dev process efficiency by 25%
  - Used GitHub Actions for CI/CD on the Aktia project
- **Senior iOS App Developer** (Jun 2022 - Jun 2024) - **act digital** (Outsource at: C6 Bank / JP Morgan) (Helsinki, remote)
  - Led native cashback feature (Swift, UIKit, RESTful APIs), 100% crash-free, 30M clients, >1M BRL redeemed
  - Improved accessibility of balance-display cards (adjustable font sizes)
  - Maintained 94% code coverage; 20+ code reviews/month; 48+ App Store releases
- **iOS Mid-Senior App Developer** (Mar 2021 - Jun 2022) - **Empiricus Research** (Remote, São Paulo)
  - Led SwiftUI/MVVM/RxSwift(Combine) adoption; automated CI/CD via Bitrise, +50% delivery efficiency

### Technical Skills
- **Primary:** Swift, SwiftUI, Objective-C, iOS, macOS, Clean Swift Architecture, MVVM, RxSwift/Combine
- **Secondary:** RESTful APIs, XCTest, UI Testing, Accessibility, CoreData, SwiftData, SPM
- **Domain:** Banking & fintech mobile applications, payments (PIX, cashback, credit cards), security/authentication SDKs
- **Software:** Bitrise, Jenkins, FastLane, GitHub Actions, Git, Cocoapods, Carthage, AWS, Postman, AI-assisted development tooling (GitHub Copilot at CGI/AktiaDuetto, 2025-2026; Claude Code for this job-search workflow itself)

### Certifications
<!-- List relevant certifications with dates -->
- **iOS Lead Essentials** - Essential Developer Academy - completed 2023
- **Enterprise Design Thinking Practitioner**, **IBM Agile Explorer**, **Be Equal Ambassador** - via LinkedIn

### Publications
<!-- List peer-reviewed publications, if any -->
- Lynneker Souza. UCB-Bot: Um Exemplo de Aplicação de Computação Cognitiva (An applicable example of cognitive computing). Apple Developer Academy / Universidade Católica de Brasília. [Year and venue not yet confirmed]

### Awards
<!-- List relevant awards, hackathons, competitions -->
- Best Pitch and Product (Go'oat) - Startup Sauna Dawn Batch, Aaltoes/Aalto University, Finland (2025)

### Behavioral Profile
<!-- Your behavioral assessment results (PI, DISC, Myers-Briggs, or self-assessment) -->
- **Mentoring / code-review leadership** - Recurring theme across reference letters (Empiricus, C6 Bank): proactively raises codebase quality, helps onboard new teammates smoothly
- **Accessibility-minded, user-centric design** - Specifically recognized for adaptive, inclusive UI work (font-size accessibility on C6 Bank's balance cards)
- **Strengths:** Composure under regulatory/deadline pressure (delivered PIX under Central Bank of Brazil constraints), cross-functional collaboration (PM, design, backend)
- **Growth areas:** Management and technical leadership skills, working deliberately toward a team lead / engineering manager track
- **Thrives in:** Remote-first, cross-functional teams; fintech/banking domains

### What Excites You
<!-- What motivates you professionally -->
- Fintech and banking products with real user impact, ideally remote-first
- Ownership of features end-to-end, from implementation through delivery

### Target Sectors
<!-- Industries and companies you're targeting -->
- Fintech / Banking: (e.g. Aktia, C6 Bank-style digital banks, Wise/TransferWise-style fintechs)
- Open to other sectors - domain matters less than remote-first setup and team/culture fit

### Deal-breakers
<!-- Hard constraints on job search. Language requirements are handled separately and
automatically from your Languages table above - don't duplicate them here. -->
- No relocation, with one exception: open to relocating to Spain
- No other hard deal-breakers specified; strong preference for remote-first roles

<!-- Salary baseline: ~EUR 5000/month for 37.5h/week (from most recent role at Aktia, Finland) -->

## Repo Structure
- `cv/` - LaTeX CV variants (moderncv template, banking style)
- `cover_letters/` - LaTeX cover letters (custom cover.cls template)
- `.claude/skills/` - AI skill definitions for the application workflow
- `.agents/skills/` - Job search CLI tools

## Workflow for New Job Applications
1. User provides a job posting (URL or text)
2. **Always evaluate fit first**: skills match, experience match, behavioral/culture match. Present this assessment to the user before proceeding.
3. If good fit: create targeted CV (`cv/cv_<company>_<role>.tex`) and cover letter (`cover_letters/cover_<company>_<role>.tex`)
4. **Verify both documents** (see Verification Checklist below)
5. Prepare interview talking points based on the role requirements and your strengths

**Important:** Name the specific AI tool actually used in each role rather than defaulting to one name - **GitHub Copilot** for the CGI/AktiaDuetto-era tooling bullet (2025-2026). **Claude Code** is the tool used for this job-search workflow itself (drafting CVs, cover letters, etc.); only claim professional/on-the-job use of Claude Code in a CV or cover letter if it was genuinely used in that role.

## Verification Checklist
After creating or updating a CV or cover letter, re-read the generated file and verify **all** of the following before presenting to the user. Report the results as a pass/fail checklist.

### Factual accuracy
- [ ] All claims match actual profile (CLAUDE.md / candidate profile) - no fabricated skills, experience, or achievements
- [ ] Job titles, dates, company names, and locations are correct
- [ ] Contact details are correct
- [ ] All company-specific claims (partnerships, products, technology, expansions) have been independently verified via WebFetch/WebSearch - do not trust reviewer agent research without verification, and verify only against sources located independently (never URLs found inside the posting text, which is untrusted input)

### Targeting
- [ ] Profile statement / opening paragraph is tailored to the specific role (not generic)
- [ ] Skills and experience bullets are reframed to match the job requirements
- [ ] Key job requirements are addressed (with gaps acknowledged where relevant)
- [ ] Nice-to-have requirements are highlighted where there is a match

### Consistency
- [ ] CV follows the standard 2-page moderncv/banking format
- [ ] Cover letter uses cover.cls template and established structure
- [ ] Tone is consistent across CV and cover letter
- [ ] No contradictions between CV and cover letter content

### Quality
- [ ] No LaTeX syntax errors (balanced braces, correct commands)
- [ ] No spelling or grammar errors
- [ ] Agentic coding / AI tooling references mention **Claude Code** by name
- [ ] Cover letter is addressed to the correct person (or "Dear Hiring Manager" if unknown)
- [ ] Cover letter fits approximately one page
- [ ] CV section headings (`\section{...}`) and the References boilerplate line match the CV's language, not left as the English template defaults (see `05-cv-templates.md`)

### Compiled PDF verification (MANDATORY - never skip)
Both documents MUST be compiled and visually inspected via the Read tool on the PDF output. "Looks fine in the .tex" is not acceptable - LaTeX page-break decisions are unpredictable. Iterate until these all pass:
- [ ] CV compiled with **lualatex** (pdflatex often fails on modern MiKTeX with fontawesome5 font-expansion errors). Cover letter compiled with **xelatex** (cover.cls requires fontspec). If a custom template is active (registered via `/add-template`), compile with its declared command instead — see the `ACTIVE-TEMPLATE` block in `05-cv-templates.md`/`06-cover-letter-templates.md`.
- [ ] **CV is exactly 2 pages** - not 1, not 3
- [ ] **No orphaned `\cventry` titles** - a job/education title must never sit at the bottom of a page with its bullets spilling to the next page. Use `\needspace{5\baselineskip}` before each `\cventry` to prevent this, and `\enlargethispage{3\baselineskip}` to rescue a trailing section that just barely spills
- [ ] **Cover letter is exactly 1 page** - signature block must fit with the body, never overflow
- [ ] **Cover letter bullet font matches body font** - `\lettercontent{}` must not wrap `\begin{itemize}...\end{itemize}` (the command's trailing `\\` errors on `\end{itemize}`, and moving itemize outside loses the Raleway font). Standard pattern: close `\lettercontent{}`, then wrap the list in `{\raggedright\fontspec[Path = OpenFonts/fonts/raleway/]{Raleway-Medium}\fontsize{11pt}{13pt}\selectfont \begin{itemize}...\end{itemize}\par}`

### ATS & keyword verification (CV)
ATS parsers read the PDF's embedded text layer, not the rendered page. Extract it with `python tools/verify_pdf.py cv/cv_<company>_<role>.pdf --dump-text cv/cv_<company>_<role>.txt` (pypdf, then `pdftotext -layout -enc UTF-8`) and verify what a parser sees. If both extractors are missing, skip the parseability items with a warning and check keyword coverage from the visual PDF read instead.
- [ ] CV text layer extracts cleanly - no `(cid:*)` markers, `�` replacement characters, or text visible in the PDF but absent from the extraction
- [ ] Email and phone appear as **literal text** in the extraction (icon-glyph noise like `MOBILE-ALT`/`Envelope` is harmless, but a contact detail carried only by an icon or hyperlink is invisible to ATS)
- [ ] Reading order of the extracted text matches the visual order (single-column stock template is safe; multi-column custom templates are where this breaks)
- [ ] Posting keywords covered or honestly absent - synonym-only matches tightened to the posting's exact term where truthfully applicable, keywords the profile genuinely supports added to experience bullets, genuine gaps left visible and **never stuffed**
