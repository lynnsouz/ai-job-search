---
framework_version: 1.0.0
---

# Interview Preparation Guide

<!-- SETUP: STAR examples are personalized by running /setup based on your actual experience -->

## STAR Format

Structure answers as: **Situation** (context), **Task** (your responsibility), **Action** (what you did), **Result** (outcome).

Keep answers to 1-2 minutes. Be specific. End with what you learned or would do differently.

## Ready-Made STAR Examples

<!-- These are populated by /setup from your actual experience. Below are templates showing the format. -->

## STAR Candidates (Complete Manually)

*[Stubs added by `/setup` Path A from CV/reference-letter achievements. Fill in the specifics below before using in an interview - do not improvise these live.]*

### Security Authentication SDK (Security / Vendor Collaboration / UX Continuity)
**Source:** CV / 01-candidate-profile.md - Senior Consultant, CGI (Outsource at: AktiaDuetto)
**What happened:** Led the iOS-side migration to a new Security Authentication SDK, working alongside the vendor's own engineering team.
**Why it matters:** Good for "tell me about a security-critical feature you worked on", "describe a technical migration you led", "how do you work with a third-party vendor/team you don't control", "how do you protect user experience during a backend/infra change"
**S/T/A/R stub:**
- Situation: AktiaDuetto (the banking client) needed to replace its existing authentication SDK because it no longer met EU regulatory requirements. The decision to migrate, and the choice of replacement SDK, had already been made before I joined the project.
- Task: Lead the iOS-side implementation of the new SDK across the app suite, ensuring the migration didn't disrupt the existing user experience.
- Action: Worked closely and continuously with the third-party vendor's own engineering team throughout the implementation, since several behaviors of the new SDK differed meaningfully from the old one. Focused specifically on reconciling those differences so the final authentication flow looked and felt identical to the old one from the user's perspective, despite the underlying implementation changing.
- Result: The migration rolled out successfully to the first test group (employees) with no reported issues, validating the approach and the UX-parity work before any wider rollout.

### Native Cashback Feature at Scale (Impact / Reliability)
**Source:** CV / 01-candidate-profile.md - Senior iOS App Developer, act digital (Outsource at: C6 Bank / JP Morgan)
**What happened:** Led implementation of a native cashback feature (Swift, UIKit, RESTful APIs), 100% crash-free, serving 30M clients, driving over 1M BRL in redemptions.
**Why it matters:** Good for "tell me about a feature you shipped that had real business impact", "how do you ensure reliability at scale", "describe a time you led a feature from design to release", "tell me about working under a tight deadline", "how do you handle a competitive/first-to-market pressure"
**S/T/A/R stub:**
- Situation: Cashback was identified as a competitive gap - no other Brazilian bank offered it at the time, so it was a real first-mover advantage opportunity. The Android team had already built the feature; iOS was behind schedule due to a developer shortage on the platform team, so the timeline was tight.
- Task: Lead the native iOS implementation (Swift, UIKit, RESTful APIs) of the cashback feature and catch the platform up to Android under that compressed schedule.
- Action: Split the work into two deliveries to hit the deadline without cutting corners: first, replaced the old webview-based points-redemption page with a native flow; then followed up with fully automatic redemption once the manual flow was stable. Instrumented the feature with Firebase and crash/usage tracking from the start to monitor stability post-launch.
- Result: Zero crash reports on the feature after launch, rolled out to C6 Bank's ~30M-client base within the first month, with over 1M BRL redeemed - confirming both the reliability of the phased approach and that the competitive bet paid off.

### PIX Payment Feature Under Central Bank Deadlines (Composure Under Pressure)
**Source:** CV / 01-candidate-profile.md - iOS Engineer, IBM (Outsource at: Santander Bank); also referenced in reference letters
**What happened:** Built the PIX QR-code payment feature for Santander Enterprise under strict Central Bank of Brazil regulatory deadlines and constraints.
**Why it matters:** Good for "tell me about a time you delivered under tight deadline or regulatory pressure", "how do you handle constraints imposed from outside the team", "how do you balance speed with a non-negotiable quality/security bar"
**S/T/A/R stub:**
- Situation: PIX was created and regulated by Brazil's Central Bank, which required every participating bank to strictly meet its requirements, including fixed feature launch dates with no flexibility on timeline. Santander also required a rigorous security review as a non-negotiable step on top of the Central Bank's own requirements, and the team was short on developers relative to the workload.
- Task: Build the PIX QR-code payment feature for Santander's app in time for the mandated launch date, without cutting the required security review.
- Action: Given the developer shortage, focused on building a fast and precise understanding of the product requirements early so implementation could move efficiently under the compressed timeline, while still meeting the security-review bar both the Central Bank and Santander required before shipping.
- Result: The feature launched on the Central Bank's mandated date. After launch, the pace slowed and further refinements were made calmly, since the core feature was already well-structured and in active use.

### SwiftUI/MVVM Adoption and CI/CD Automation (Technical Leadership / Efficiency)
**Source:** CV / 01-candidate-profile.md - iOS Mid-Senior App Developer, Empiricus Research
**What happened:** Spearheaded SwiftUI adoption using MVVM and RxSwift (Combine), modernizing the codebase, and automated the CI/CD pipeline with Bitrise, improving delivery efficiency by 50%+.
**Why it matters:** Good for "tell me about a time you drove a technical/architectural change", "describe an improvement you made to your team's process or tooling", "how do you identify and fix a process bottleneck"
**S/T/A/R stub:**
- Situation: Builds were created manually, which required a capable machine and real developer time to generate, both for QA testing and for App Store upload. The product already used MVVM, which set the codebase up well to introduce SwiftUI on top of it.
- Task: Introduce SwiftUI into the codebase (built on the existing MVVM architecture, using RxSwift/Combine) and eliminate the manual, developer-time-consuming build process.
- Action: Set up Bitrise to automate the full build pipeline: completing a feature automatically generated a testable build and published it to Firebase, where QA picked it up directly for testing, and finalizing a new version automatically handled the App Store upload.
- Result: Developers no longer had to sit and wait for builds to generate and could work on something else in the meantime - that reclaimed time is where the 50%+ delivery-efficiency improvement came from.

<!-- Add more STAR examples as needed. Aim for 4-6 covering different competencies. -->

### Go'oat: App Talking to Real Hardware (Hardware Integration / Time-Boxed Delivery)
**Source:** 01-candidate-profile.md - Independent Projects, Startup Sauna Dawn Batch (Aaltoes, Aalto University, 2025); details confirmed by user 2026-10-14
**What happened:** As the team's iOS developer, built the Mac and iPad app for a breakfast machine in 2 weeks. The app talked to the machine over its Wi-Fi via a socket connection. The project won Best Pitch and Product.
**Why it matters:** Good for "have you worked with hardware/devices/IoT?", "tell me about a hard technical problem", "tell me about a time you built something from zero under a hard deadline", "what would you do differently?", and as the bridge answer for Bluetooth/BLE gaps (real device communication, just over Wi-Fi instead of BLE)
**S/T/A/R:**
- Situation: At Startup Sauna Dawn Batch in Finland (2025), the team had two weeks to build a product around a breakfast machine.
- Task: As the iOS developer, connect the Mac and iPad app to the machine and start breakfast production from the app.
- Action: Connected the app to the machine's server over a socket connection on the machine's Wi-Fi. The app sent the user's selected breakfast options to start production and listened for the machine's "done" status.
- Result: Worked end to end; the project won Best Pitch and Product.
- Honest limitation / lesson: The tablet had to join the machine's own Wi-Fi network, which had no internet access, so it was cut off from everything else while talking to the machine. The team did not solve this within the two weeks. The lesson: when a phone talks directly to a device, design for offline operation and cloud sync from the start. Present any fixes as "what I'd look at now" (offline-first with sync later; checking how the phone handles a network without internet; Bluetooth keeps the phone's normal connection), never as something that was done.

### Deliberate Management Skill-Building (ArcticStartup Production Assistant)
**Source:** 01-candidate-profile.md - Professional Experience, ArcticStartup (Apr-Jul 2026)
**What happened:** Took a non-technical volunteer role specifically to build management/leadership experience outside core iOS work.
**Why it matters:** Good for "how are you actively working toward becoming a manager/lead", "tell me about a deliberate step you took outside your comfort zone for career growth"
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### Pagar e Receber - Sole Developer on an Unprecedented Feature (Banco do Brasil)
**Source:** 01-candidate-profile.md - Mobile Engineer, Stefanini (Jan-Aug 2019); corroborated by Jose Urbano reference letter (30% MoM growth over 6 consecutive months)
**What happened:** Built an in-app checkout feature with no existing precedent in the banking industry at the time, as the sole mobile developer.
**Why it matters:** Good for "tell me about a time you owned something with no playbook to follow", "describe working without a team to lean on", "tell me about a feature that directly moved a business metric"
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### Volunteer Robotics Instruction (Br.ino Robótica Educacional)
**Source:** 01-candidate-profile.md - Independent Projects, since May 2024
**What happened:** Volunteers teaching robotics classes to underprivileged communities in Brasília, including training other volunteer instructors.
**Why it matters:** Good for "how do you mentor people outside a formal reporting line", "tell me about giving back to your community", culture/values-fit questions
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### Introducing GitHub Copilot at CGI (AI-Assisted Development / Process Improvement)
**Source:** 01-candidate-profile.md - Senior Consultant, CGI (Outsource at: AktiaDuetto); flagged in the Fartskriver screen debrief (2026-10-14), where the answer opened with "mostly by hand"
**What happened:** Introduced GitHub Copilot on the project, improving development process efficiency by 25%.
**Why it matters:** Good for "how do you use AI in your work?", "tell me about a process you improved", "how did you measure the improvement?" Lead with the Copilot result rather than with what was done by hand.
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### C6 Bank Balance Cards and Font-Size Accessibility (Accessibility / User Focus)
**Source:** 01-candidate-profile.md - Senior iOS App Developer, act digital (Outsource at: C6 Bank); Eduardo Scarpellini reference letter
**What happened:** Made the home balance cards adapt to users' font-size preferences.
**Why it matters:** Good for "how do you approach accessibility?", "tell me about a change you made for a specific group of users"
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### Mentoring and Code Review (Informal Technical Leadership)
**Source:** 01-candidate-profile.md - 20+ code reviews a month at C6 Bank; Yannes Meneguelli letter ("blend new coders into our set-up without hitches"); Vinicius Bazan letter (code review raising codebase quality)
**What happened:** Reviewed peers' code regularly and helped new developers settle into the team.
**Why it matters:** Good for "how do you mentor others?", "describe your experience with technical leadership", "how do you raise quality in a team?"
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

### iOS and Android Disagreement with a Product Manager (Handling Disagreement)
**Source:** 01-candidate-profile.md - iOS Engineer, IBM (Outsource at: Santander Bank); stated by user 2026-10-14 (feature name and final outcome not yet recorded)
**What happened:** A feature behaved differently on iOS and Android and the product manager wanted them identical. Explained the iOS navigation differences, and the team agreed to ship as developed and revisit with UX.
**Why it matters:** Good for "tell me about a time you disagreed with a colleague", "how do you push back on product decisions?"
**S/T/A/R stub:**
- Situation:
- Task:
- Action:
- Result:

## Common Tough Questions

### "Why did you leave [previous company]?"
> [PREPARE YOUR ANSWER - be honest, forward-looking, no negativity about former employer]

### "You don't have [specific skill/experience]."
> [PREPARE YOUR ANSWER - acknowledge the gap, bridge to adjacent experience, show willingness to learn]

### "Where do you see yourself in 5 years?"
> [PREPARE YOUR ANSWER - show ambition aligned with the role's growth path]

### "What's your biggest weakness?"
> [PREPARE YOUR ANSWER - genuine weakness with concrete mitigation strategy]

### "Why this company specifically?"
> Customize per company. Must reference: specific projects, company values, market position, or team structure. Never give a generic answer.

## Questions You Should Ask Interviewers

### About the Role
- "What does a typical week look like in this role?"
- "What would success look like in the first 6 months?"
- "What's the biggest challenge the team is facing right now?"

### About the Team
- "How big is the team, and how do you divide work?"
- "What does the development/project lifecycle look like, from idea to production?"
- "How do you onboard new team members?"

### About Tech & Growth
- "What's your current tech stack for [relevant area]?"
- "Is there room to grow into more architectural or strategic decisions?"
- "How does the team stay current with new tools and methods?"

### About Culture (use these to prevent disappointment)
- "How would you describe the team culture?"
- "What does professional development look like here?"
- "Is there flexibility for remote/hybrid work?"
- "What's the balance between development/new projects and maintenance work?"
- "How would you describe the leadership style in this team?"
- "What do people who thrive here have in common?"

## Phone/Video Interview Tips
- Have STAR examples written out (use this file)
- Keep a glass of water nearby
- Smile when speaking (it changes your tone)
- Ask for clarification if a question is vague
- It's OK to take 5 seconds to think before answering
- End with: "Is there anything else you'd like to know about my background?"

## After the Application (Best Practice)

### Follow-Up Etiquette
- **Don't call to "stand out"** or to learn more about the role post-submission - this risks a negative impression
- If the employer specified a timeline, respect it and wait
- If no timeline was given and significant time has passed (2+ weeks), a brief call to ask about status is acceptable
- If you have genuinely new, relevant information to share, a short follow-up is fine

### Thank-You Notes
- When you receive any update (interview invitation, rejection, or status update), send a brief thank-you message
- Express appreciation for their time and the process
- Keep it short (2-3 sentences)

## Roleplay Guidelines
When the user asks for interview practice:
1. Ask which role/company to simulate
2. Start with easy warm-up questions ("Tell me about yourself")
3. Progress to role-specific technical questions
4. Include 1-2 behavioral questions using the competencies from the job posting
5. End with a tough question or curveball
6. After each answer, give brief feedback: what worked, what to sharpen
7. Suggest which STAR example would work best for each question
