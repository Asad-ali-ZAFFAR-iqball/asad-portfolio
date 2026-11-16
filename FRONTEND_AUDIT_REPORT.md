# Frontend Audit Report — Asad.dev Portfolio

**Date:** 2026-11-16 · **Commit audited:** `d7eb09c` plus the uncommitted review fixes in the working tree
**Scope:** whole site (one page, static export) · **No source files were changed during this audit.**

## How this audit was done

| Method | What was covered |
|---|---|
| Code inspection | Every component, hook, data file, `globals.css` and `tailwind.config.ts`, plus `package.json` and `public/` |
| Browser testing | **Real.** Production build (`next build`, static export) served locally, driven by headless Chrome (puppeteer-core) |
| Viewports | 320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1600 and 1920 px, each in **light and dark** (22 runs) |
| Automated checks per run | Horizontal overflow, console errors, failed requests, broken images, tap-target sizes, heading outline |
| Interaction tests | Theme toggle and persistence, mobile menu (open, Escape), anchor targets, keyboard Tab order and focus styles, empty contact form submit |
| Accessibility | axe-core (WCAG 2.0/2.1/2.2 A/AA plus best practice) at 375 and 1440 px in both themes |
| Performance | Lighthouse 12, mobile and desktop presets |
| Screenshots | Every section at 375, 768 and 1440 px in both themes, the mobile menu and the form error state |

**Clean results:** zero console errors, zero failed network requests and zero broken images in all 22 runs. Every in-page anchor resolves. Body backgrounds are exactly `#F0F5F7` (light) and `#101422` (dark). The theme toggle switches and saves to `localStorage`. Lighthouse scores Accessibility, Best Practices and SEO at **100** on both mobile and desktop. axe found **no colour-contrast failures** in either theme. CLS is 0.001–0.004.

**Caveats:**
- The local server didn't gzip responses, so real hosting will transfer less. Bundle and blocking findings still hold.
- WebGL ran in software (SwiftShader), so desktop hero timings are pessimistic.

### Architecture summary
- **Structure:** A one-page Next.js 14 static export (`output: "export"`). `layout.tsx` and `page.tsx` are server components, but all 9 sections are `"use client"`, so almost the whole page hydrates.
- **Content:** Typed TypeScript files in `src/data/`. Nothing is fetched at runtime.
- **Styling:** Tailwind. Every colour family is overridden to point at per-theme RGB variables in `globals.css`, so only the palette can render. Shared surfaces are `.glass-panel`, `.glass-glow` and `.icon-tile`.
- **Libraries:**
  - Motion: framer-motion, everywhere.
  - 3D hero: `@react-three/fiber` and three, lazy-loaded and desktop-only.
  - Forms: react-hook-form + zod, sending through a `mailto:` link.
  - Theme: next-themes.

---

## Findings

Priority levels: **CRITICAL** (fix now) · **HIGH** (significant) · **MEDIUM** (quality) · **LOW** (refinement).
No CRITICAL issues were found. Nothing is broken for most visitors, and the site is accessible to automated checkers.

### Responsive design

#### R1. Tablet navbar overflows; Resume button and theme toggle are cut off — HIGH
- **Where:** `src/components/layout/Navbar.tsx:91` (`hidden md:flex`), `:141` (`hidden md:inline-flex`), `:150` (`md:hidden`)
- **Evidence:** At 768 px the right-hand actions span x=736–864 px, past the 768 px edge. At 820 px they span to 864 px. The screenshot shows the theme toggle half-clipped and the Resume button gone. `body { overflow-x: hidden }` hides the overflow, so there's no scrollbar, just clipped content.
- **Why it matters:** iPad portrait users (768–834 px) can't reach the Resume button and barely reach the theme toggle.
- **Fix:** Switch the desktop/mobile split from `md:` to `lg:` on those three elements and the mobile panel (`:167`). Seven links plus the logo and actions need about 900 px.

#### R2. Hero name underline is mispositioned when the name wraps — MEDIUM
- **Where:** `src/components/sections/Hero.tsx:133-145` (absolute underline inside an inline `<span className="relative">`)
- **Evidence:** At 1440 px the name wraps onto two lines ("Asad Ali / Zaffar"). The underline then floats over the "Laravel Developer | Full-Stack" subtitle (screenshot `light-1440-hero`). It's correct at 768 px, where the name fits on one line.
- **Why it matters:** This is the first thing every desktop visitor sees, and it looks like a rendering glitch.
- **Fix:** Use `text-decoration` on the name (`underline decoration-4 underline-offset-8 decoration-brand-500`), which follows wrapped lines. Or keep the name on one line with `whitespace-nowrap` at `lg` and up.

#### R3. Focusing an invalid form field hides it under the fixed navbar — MEDIUM
- **Where:** `src/components/sections/Contact.tsx` (inputs); fixed header in `Navbar.tsx:66`
- **Evidence:** Submitting the empty form scrolls to the first invalid field ("Full Name"), which lands under the navbar (screenshot `light-1440-form-errors`).
- **Fix:** Add `scroll-margin-top: 6rem` to form controls (`scroll-mt-24` in `inputClasses`). One class.

#### Responsive checks that passed
- No horizontal scroll at any of the 11 widths.
- Project images keep their 2:1 box with no layout shift.
- The mobile menu, hero buttons, filters and footer stack correctly at 320–430 px.

### UI/UX design

#### U1. Hard-coded "tech cloud" lists skills the CV doesn't have — HIGH
- **Where:** `src/components/sections/Skills.tsx:230-234`
- **Problem:** The list hard-codes "Node.js, Python, PostgreSQL, Kafka, Kubernetes, GraphQL, Django, Terraform, Go, Elasticsearch". None of these appear in `src/data/skills.ts`; the data lists MySQL, not PostgreSQL. It looks like a leftover from a template.
- **Why it matters:** Recruiters read these as claimed skills, and an interviewer may ask about Kafka or Go.
- **Fix:** Build the badges from `skillCategories`, or delete the block.

#### U2. Garbled education titles — MEDIUM
- **Where:** `src/components/sections/Education.tsx:28` renders `{degree} in {field}`, with data from `src/data/education.ts`.
- **Evidence:** The rendered headings read "Bachelor of Science in Computer Science (BSCS) in Computer Programming & Specific Applications" and "Intermediate in ICS (Intermediate in Computer Science)".
- **Fix:** Show `degree` as the title and `field` as a subtitle, or clean up the data.

#### U3. Stats shown twice — LOW
- **Where:** Hero (`Hero.tsx:231-247`) and About (`About.tsx:127-140`) both render the same four stat cards.
- **Fix:** Keep the hero version and drop the About copy, or show different numbers there.

#### U4. Decorative floating shapes in Contact look like stray empty boxes in light mode — LOW
- **Where:** `src/components/sections/Contact.tsx:160-162`
- **Evidence:** Since light surfaces became white, these `glass-panel` squares render as plain white tiles floating beside the form (screenshot `light-1440-footer`, left side).
- **Fix:** Use `dark:block hidden` (show them only in dark mode), or delete them.

#### U5. Footer heart emoji is off-palette — LOW
- **Where:** `src/components/layout/Footer.tsx:55` ("Built with Next.js & ❤️")
- **Why it matters:** It's the only red on the site, which breaks the strict 8-colour rule.
- **Fix:** Use a lucide `Heart` icon with `fill-current text-brand-500`, or plain text.

#### U6. Skill-level legend dots are all the same colour — LOW
- **Where:** `src/components/sections/Skills.tsx:201-208` and `src/lib/utils.ts:60-68` (`getSkillLevelColor`)
- **Problem:** Emerald, blue, violet and amber all fold into the brand colour now, so the legend can't distinguish levels.
- **Fix:** Drop the dot legend; the level text already says "Expert" or "Advanced".

#### U7. Pointer cursor on cards that do nothing — LOW
- **Where:** `src/components/ui/GlassCard.tsx:36`
- **Problem:** `hover` adds `cursor-pointer` to cards that aren't clickable (About, Projects and Education cards).
- **Fix:** Delete that line.

#### U8. Invalid class `h-13` — LOW
- **Where:** `src/components/ui/Button.tsx:59`
- **Problem:** Tailwind has no `h-13`, so large buttons size from padding only, unlike `sm` and `md`.
- **Fix:** Use `h-14` or `h-[52px]`.

### Color & theme

The palette is correctly applied. Every Tailwind colour resolves to the 8 colours or mixes of them. The computed body colours are exact, there are no contrast failures, and themes don't mix. Remaining items:

#### C1. Theme toggle doesn't say what it does or what state it's in — MEDIUM
- **Where:** `Navbar.tsx` theme button (`aria-label="Toggle theme"`)
- **Evidence:** `aria-pressed` is null and the label never changes.
- **Fix:** `aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}`.

#### C2. Hero 3D particles are rebuilt and leak GPU memory on every theme switch — LOW
- **Where:** `src/components/sections/HeroScene.tsx:63-76`
- **Problem:** A new `BufferGeometry` with new random positions is created when `palette` changes and is never disposed. The particles also jump to new positions.
- **Fix:** Build the positions once and update only the colour attribute, or dispose the old geometry in a cleanup.

### Performance (Lighthouse 12)

| | Performance | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|
| Mobile | **46** | 4.8 s | **7.5 s** | 670 ms | 0.001 | 5.3 s |
| Desktop | **46** | 1.8 s | 2.4 s | **860 ms** | 0.004 | 3.4 s |

#### P1. Hero text stays invisible until JavaScript hydrates and animates — HIGH (main LCP cause)
- **Where:** `src/components/sections/Hero.tsx:112-116` (`initial="hidden"`, `animate={mounted ? "visible" : "hidden"}`; item variants start at `opacity: 0`)
- **Evidence:** The LCP element is the hero name `<span class="relative">`. Lighthouse puts **7.06 s of mobile LCP in "render delay"** (2.2 s on desktop). The text is in the HTML but rendered with `opacity:0` until JS loads, hydrates, the `mounted` effect fires, and the stagger runs. With JavaScript disabled or failing, the hero never appears.
- **Fix:**
  - Remove the `mounted` gate.
  - Give the h1 and tagline `initial={false}`, or animate only `y` on above-the-fold items and never `opacity`.

#### P2. Google Fonts loaded through a render-blocking CSS `@import` — HIGH
- **Where:** `src/app/globals.css:1`; `src/app/layout.tsx:10-14` sets up `next/font` Inter, but nothing uses its `--font-inter` variable.
- **Evidence:**
  - Lighthouse flags the fonts.googleapis.com stylesheet as render-blocking: about 3.1 s potential saving on mobile, 1.4 s on desktop.
  - It loads 7 Inter weights plus JetBrains Mono.
  - Every visit sends the visitor's IP to Google.
- **Fix:**
  - Delete the `@import`.
  - Point Tailwind `sans` and the body font at `var(--font-inter)`.
  - Add `JetBrains_Mono` through `next/font` with `variable: "--font-mono"`.
  - Load only the weights actually used.

#### P3. Heavy JavaScript on load — MEDIUM
- **Evidence:**
  - First Load JS is 186 kB (the route is 46.2 kB).
  - Lighthouse estimates 228 KiB of unused JS on mobile and 592 KiB on desktop. Desktop includes the 346 KB three.js chunk, which is lazy-loaded as intended but still large.
  - TBT is 670–860 ms, and script bootup takes 2.2–2.5 s.
- **Causes, verified in code:**
  - All sections are client components using the full `motion` import, including near-static ones (Services, Education, Testimonials).
  - The typing effect re-renders the whole Hero every 50–80 ms (`Hero.tsx:66`, `useTypingEffect.ts`), and keeps going after the hero scrolls away.
  - `useScrollProgress` sets state on every scroll event, which re-renders the whole Navbar (`useScrollProgress.ts:12-20`, `Navbar.tsx:30`).
- **Fix:**
  - Wrap the app in `LazyMotion features={domAnimation}` and use `m.*` components.
  - Move the typing effect into a small `<TypedText/>` child, paused when off screen.
  - Use framer's `useScroll()` → `scaleX: scrollYProgress` for the progress bar, which means zero re-renders, and delete `useScrollProgress.ts`.

#### P4. Expensive glass material on the 3D shapes — LOW
- **Where:** `HeroScene.tsx:46-56`
- **Problem:** `transmission={0.9}` on 6 meshes makes three.js render an extra pass every frame.
- **Fix:** Use plain `opacity` or a `MeshStandardMaterial`.

#### P5. 6.1 MB of unused PNGs shipped with every deploy — LOW
- **Where:** `public/images/projects/*.png` (11 files, for example `keynest.png` at 1.8 MB)
- **Evidence:** Nothing references them; the site uses the `.webp` versions, which are 12–43 KB each and properly lazy-loaded with width and height set.
- **Fix:** Move the PNGs out of `public/`.

#### P6. `loading.tsx` is never shown — LOW
- **Where:** `src/app/loading.tsx`
- **Problem:** It's a single static route with no async work, so the Suspense fallback never renders.
- **Fix:** Delete the file.

### Accessibility (WCAG 2.2 AA)

Lighthouse Accessibility is 100, axe found **1 rule violation**, and contrast passes everywhere. The issues below are ones automated tools miss, each confirmed in the browser.

#### A1. Form errors are not linked to their fields — HIGH
- **Where:** `Contact.tsx:51-61` (`Field`) and `:197-254` (inputs)
- **Evidence:** After an empty submit, every input has `aria-invalid=null`, `aria-describedby=null` and `required=false`. "Required" is only a visual `*`.
- **Why it matters:** A screen reader announces "Full Name, edit text" and never says why the form failed (WCAG 3.3.1, 1.3.1).
- **Fix:** Give each error `<p>` an id, then on each input set `aria-invalid`, `aria-describedby` pointing at that id, and `aria-required`. Add `role="alert"` to the error text.

#### A2. Animations ignore "reduce motion"; the typing text can't be paused — HIGH
- **Where:**
  - No `MotionConfig reducedMotion="user"` anywhere.
  - Infinite framer animations: `Hero.tsx:91-105, 262-265`, `About.tsx:66-70`, `Skills.tsx:125-129`, `Projects.tsx:217-221`, `Contact.tsx:154-158`.
  - The typing effect in `Hero.tsx:66` runs forever.
- **Why it matters:** The CSS reduced-motion rule only covers CSS animations. Users who asked for less motion still get drifting orbs, a bouncing scroll cue, and text that rewrites itself every 75 ms with no pause control (WCAG 2.2.2, Level A). Screen readers may also read half-typed words.
- **Fix:**
  - Add `<MotionConfig reducedMotion="user">` in the layout.
  - Render a static phrase when reduced motion is on.
  - Mark the typed text `aria-hidden` and add an sr-only static version.

#### A3. Mobile menu doesn't expose its state, ignores Escape, and doesn't manage focus — MEDIUM
- **Where:** `Navbar.tsx:147-194`
- **Evidence:**
  - `aria-expanded` and `aria-controls` are null.
  - The menu stays open after pressing Escape.
  - Focus stays on the toggle while Tab walks the page behind the menu.
- **Fix:**
  - Add `aria-expanded={mobileOpen}` and `aria-controls="mobile-menu"`.
  - Close on Escape and return focus to the button.
  - Move the menu inside `<nav>`.

#### A4. Interactive content nested inside a button — MEDIUM (axe: `nested-interactive`, serious)
- **Where:** `src/components/sections/Experience.tsx:69-139`
- **Problem:** Each experience card is a `<button>` that contains an `<h3>` and the company `<a>` link. That's invalid HTML. The card reads as one long button label, the heading drops out of heading navigation, and there's a link inside a button.
- **Fix:** Keep the heading and link outside, and make only the "Show more/less" row the button (with `aria-expanded` and `aria-controls`).

#### A5. Skill category selector doesn't say which one is selected — MEDIUM
- **Where:** `Skills.tsx:73-81`
- **Fix:** Add `aria-pressed={isActive}`. The project filters already do this.

#### A6. Focus is lost after the form "sends" — MEDIUM
- **Where:** `Contact.tsx:175-197`
- **Problem:** The form is swapped for a success panel, so focus drops to `<body>` with no announcement.
- **Fix:** Add `role="status"` to the success panel, or focus it with `tabIndex={-1}`.

#### A7. Smaller accessibility items — LOW
- Links that open a new tab don't say so: Resume, hero CV, footer, Contact, Experience. Copy the sr-only "(opens in new tab)" pattern from `Projects.tsx:187`.
- Decorative elements aren't `aria-hidden`: the "●" legend glyphs (`Skills.tsx:201-208`) and the "Scroll" cue (`Hero.tsx:253-269`).
- Heading levels: Education's group headings and its cards are both `<h3>` (`Education.tsx:27, 81, 138, 159`). The cards should be `<h4>`.
- `AnimatedSection` defaults to `<section>`, so About nests two sections inside `section#about` (`About.tsx:82, 153`). Pass `as="div"`.
- Keyboard focus is visible on every control tested (2–3 px outline; buttons add a ring). The skip link works.

### Functionality

#### F1. Contact form clears the message before it's actually sent — HIGH
- **Where:** `Contact.tsx:140-143`
- **Problem:** It sets `window.location.href = mailto:…`, then immediately calls `reset()` and shows "success".
- **Why it matters:** Visitors with no mail app configured (common on Windows and with webmail-only users) see nothing happen, and their typed message is gone.
- **Fix:**
  - Don't call `reset()`.
  - Show a "Copy message" or "Open in Gmail" fallback.
  - Add `.trim()` and `.max(1500)` to the schema. Whitespace-only input currently passes, and very long `mailto:` URLs get truncated.

#### F2. Wrong nav item highlighted at the top of the page — MEDIUM
- **Where:** `src/hooks/useActiveSection.ts:10`, `Navbar.tsx:22`
- **Evidence:** On load, "About" is highlighted while the hero is on screen (screenshots at 768 and 1440 px). `#hero` and `#references` aren't observed, so "Education" also stays lit over References.
- **Fix:** Start with `""` and observe `hero` and `references` too.

#### F3. Experience duration can mismatch between build and visit — LOW
- **Where:** `src/lib/utils.ts:21-35` (`calculateDuration` uses `new Date()` for "Present")
- **Problem:** The static HTML freezes the duration at build time ("2 yrs 11 mo"). After the next month boundary, the browser computes a different value and React reports a hydration mismatch. No mismatch appeared today. `new Date("Dec 2023")` also depends on non-standard date parsing.
- **Fix:** Parse "Mon YYYY" manually and render the "Present" duration client-side only.

#### F4. Navigation from the 404 page does nothing — LOW
- **Where:** `Navbar.tsx:12-20` and `Footer.tsx:62` use bare `#about`-style links.
- **Problem:** On `/asad-portfolio/anything` (the 404 page), clicking a nav link only changes the hash.
- **Fix:** Use `withBasePath("/") + "#about"` and so on.

#### F5. Footer © year is fixed at build time — LOW
- **Where:** `Footer.tsx:5` is a server component in a static export.
- **Problem:** The year only updates when you redeploy.

#### Verified working
- Every nav anchor resolves.
- The resume PDF exists and loads; all 14 external, `mailto:` and `tel:` links have correct `target` and `rel`.
- Project filters work.
- Theme toggle switches and persists; the mobile menu opens and closes and its links work.
- Form validation shows all 4 messages.
- No console errors in any run.

### Code quality

#### Q1. Unused dependency `react-type-animation` — MEDIUM
- **Problem:** Nothing imports it; the custom `useTypingEffect` does the typing.
- **Fix:** Remove it from `package.json`.

#### Q2. Dead `ScrollProgress.tsx` (and broken if reused) — LOW
- **Problem:** Nothing imports it, and the Navbar has its own progress bar. Its `useSpring` value is read once per render, so the bar would never move.
- **Fix:** Delete it and the `accent` colours in `tailwind.config.ts` that only it uses.

#### Q3. Social links rebuilt in three places — LOW
- **Where:** `Hero.tsx:47-63`, `Footer.tsx:23-38`, `Contact.tsx:80-104` (each uses `socials.find(...)!`; Contact also hard-codes the handles)
- **Problem:** A changed handle goes stale in Contact, and removing a platform crashes the page.
- **Fix:** Map over `personalInfo.socials` and add a `handle` field there.

#### Q4. Dead code — LOW
- Utils `truncate`, `slugify`, `sleep`.
- Unused props: GlassCard `onClick`; Button `isLoading`, `download`, `ref`. Button's link variant also drops `...props`.
- Unused `AnimatedSection` props.
- Unused types and fields: `Testimonial`, `bio`, `website`, `avatar`, `openToWork`, `Stat.icon`, `caseStudyUrl`, the `logo` fields.
- Two empty background divs: `Experience.tsx:223`, `Education.tsx:126`.

#### Q5. Dead CSS and Tailwind config — LOW
- **`globals.css`:**
  - Unused classes: `.section-padding`, `.container-wide`, `.gradient-border` (which also reads an undefined `var(--bg)`), `.line-clamp-2/3` (built into Tailwind), `.link-underline`, `.prose-invert` rules.
  - `prose` classes in `About.tsx:83` do nothing, because `@tailwindcss/typography` isn't installed.
- **`tailwind.config.ts`:** 7 unused animations and their keyframes, `fontFamily.display` ("Cal Sans" is never loaded), 4 unused shadows, `gradient-radial`/`gradient-conic`, `backdropBlur.xs`, `ease-bounce-sm`.

#### Q6. Minor hook issues — LOW
- `Contact.tsx:143` starts a `setTimeout` that is never cleared.
- `Counter.tsx:15-23` shows the final value, then jumps to 0 and counts up, so the hero "3+" visibly flashes to "0+".

---

## Scores

| Area | Score | Basis |
|---|---|---|
| UI/UX | **76** / 100 | Polished, consistent palette and components. Hurt by the hero underline glitch, unsupported skills cloud, garbled education titles and duplicated stats. |
| Responsive | **74** / 100 | Clean from 320 to 1920 px except the tablet navbar (768–1023 px) and fixed-header focus scrolling. |
| Performance | **48** / 100 | Lighthouse 46 on mobile and desktop. Mobile LCP is 7.5 s, caused by the opacity-gated hero and render-blocking fonts. |
| Accessibility | **74** / 100 | Automated checks 100 with contrast all passing. Real gaps in form error linking, reduced motion, the menu and nested interactive content. |
| Code quality | **72** / 100 | Clear structure and typed data. Some dead code, duplication and re-render hot spots. |
| Functionality | **78** / 100 | Everything works except the mailto data loss, active-nav state and the 404 links. |
| **Overall** | **70** / 100 | |

## Top 10 issues

| # | Issue | Priority |
|---|---|---|
| 1 | P1: Hero text invisible until JS hydrates (7.5 s mobile LCP) | HIGH |
| 2 | P2: Render-blocking Google Fonts `@import` | HIGH |
| 3 | R1: Tablet navbar overflow hides Resume and the theme toggle | HIGH |
| 4 | F1: Contact form clears the message before it's sent | HIGH |
| 5 | U1: Skills cloud lists technologies not on the CV | HIGH |
| 6 | A1: Form errors not linked to fields | HIGH |
| 7 | A2: Motion ignores reduced motion; typing can't be paused | HIGH |
| 8 | R2: Hero underline mispositioned on desktop | MEDIUM |
| 9 | A4: Interactive content inside the Experience card button | MEDIUM |
| 10 | P3: Re-render hot spots and heavy JS (typing, scroll state, full framer) | MEDIUM |

## Recommended roadmap

**Phase 1 — quick wins (about 1–2 h, small diffs, no design change)**
- R1: navbar breakpoint `md` → `lg`.
- P2: switch fonts to `next/font`.
- P1: remove the hero opacity gate.
- U1: build the skills cloud from data, or delete it.
- U2: education titles.
- F1: keep the form data.
- R3: `scroll-mt` on form fields.
- R2: underline via `text-decoration`.
- C1: theme toggle label.

**Phase 2 — accessibility (about 2 h)**
- A1: form ARIA.
- A2: `MotionConfig` and static typed text under reduced motion.
- A3: mobile menu state, Escape and focus.
- A4: Experience card markup.
- A5, A6, A7.

**Phase 3 — performance and cleanup (about 2–3 h)**
- P3: LazyMotion, `<TypedText/>`, `useScroll`.
- P4, C2: hero 3D material and geometry.
- P5, P6, Q1–Q6: delete dead code, PNGs and the unused dependency.
- F2–F5.

**Phase 4 — polish (optional)**
- U3–U8: stats duplication, Contact floating shapes, footer emoji, legend, cursor, `h-13`.

After Phase 1, re-run Lighthouse. I expect mobile LCP to drop below 3 s and the performance score to rise well above 46, but that's not measured yet.

---

## Implementation results — 2026-11-17

All fixes are in the working tree (not committed yet). Verified against a production build (`next build`, static export) served locally. Browser checks used headless Chrome; scores are Lighthouse 12.

### How "before" and "after" were measured
- **Before** is the pre-fix snapshot taken at audit time, rebuilt today. Its First Load JS is 186 kB, the same as in the audit.
- **After** is the current working tree, with First Load JS of 173 kB.
- **Two Lighthouse modes.** "Devtools" applies real CPU and network throttling. "Simulated" is Lighthouse's default, which estimates throttled timings from an unthrottled run. On `localhost` every script finishes before the first paint, so the simulated LCP charges all hydration work to the LCP. That makes the simulated mobile LCP very pessimistic here. The devtools numbers are the fair comparison.
- **Font preload:** Next 14 doesn't emit the Inter preload tag when building on Windows. Its font-manifest plugin matches `/next-font-loader/index.js?` with forward slashes, and Windows paths use backslashes. CI builds on `ubuntu-latest`, so production does get the tag. The "after" runs added that same tag by hand to match production.

### Lighthouse — mobile, devtools throttling (median of 3)

| | Performance | FCP | **LCP** | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|
| Before | 31 | 4.67 s | **9.44 s** | 2,504 ms | 0.005 | 7.5 s |
| After | **57** | 3.80 s | **3.80 s** | 846 ms | 0.024 | 4.7 s |

LCP went from 9.44 s to 3.80 s, a 60% cut. The LCP now happens at the first paint (LCP equals FCP), so the hero no longer waits for JavaScript.

### Lighthouse — simulated (default), median of 3

| | Performance | FCP | LCP | TBT | CLS | Speed Index | A11y / BP / SEO |
|---|---|---|---|---|---|---|---|
| Mobile before | 46 | 4.8 s | 7.5 s | 670 ms | 0.001 | 5.3 s | 100 / 100 / 100 |
| Mobile after | 47 | **2.1 s** | 7.2 s | 1,452 ms | 0.003 | **3.9 s** | 100 / 100 / 100 |
| Desktop before | 46 | 1.8 s | 2.4 s | 860 ms | 0.004 | 3.4 s | 100 / 100 / 100 |
| Desktop after | **58** | **0.5 s** | **2.2 s** | 821 ms | 0.020 | **2.1 s** | 100 / 100 / 100 |

- **Observed (unthrottled) LCP:** mobile went from 2.81 s to 1.17 s.
- **Why simulated mobile TBT is higher:** Lighthouse only counts blocking time after the first paint. The first paint moved 2.7 s earlier, so hydration tasks that used to fall before it now count. Total main-thread work went down slightly, from 8.0 s to 7.8 s.

### Issue status

| Issue | Status | Change and verification |
|---|---|---|
| 1 / P1 Hero hidden until JS | **Fixed** | The hero animates `y` only, never `opacity`, and the `mounted` gate is gone. With JS disabled at 390 px, the h1, typed text, tagline and buttons are all visible and no ancestor is hidden. |
| 2 / P2 Render-blocking Google Fonts | **Fixed** | The `@import` is removed. Inter and JetBrains Mono are self-hosted variable fonts via `next/font` with `display: swap`. Mono has `preload: false` because it's only used for small accents. No requests go to Google. The only render-blocking file left is the site's own CSS. |
| 3 / R1 Tablet navbar | **Fixed** | Breakpoint changed from `md` to `lg`. At 768, 820 and 1023 px the theme toggle and menu button are fully on screen. The menu lists all 7 links plus Download Resume. From 1024 px the desktop links and Resume show. |
| 4 / F1 Contact data loss | **Fixed** | The form is never cleared automatically. After "Send", a status panel offers Copy message and Clear form. The copied text includes the recipient, subject and body. Fields trim whitespace and have max lengths, and whitespace-only input is rejected. |
| 5 / U1 Skills accuracy | **Fixed** | The hard-coded cloud (Kafka, Go, Terraform and others) is replaced by CV technologies only. Every skill row was checked against `public/asad-ali-zaffar.pdf`. Stripe isn't in the CV but stays, because the owner confirmed it. |
| 6 / A1 Form error links | **Fixed** | Inputs have `aria-required`. On error they get `aria-invalid` and `aria-describedby` pointing at `#…-error`. Errors use `role="alert"`, and the status panel is `role="status"` with `aria-live`. The first invalid field gets focus clear of the navbar (`scroll-mt-28`). |
| 7 / A2 Reduced motion | **Fixed** | `<MotionConfig reducedMotion="user">` is set app-wide. With reduced motion on, the typed text is static, the orbs don't move, there's no WebGL canvas and no pause button. Without it, a pause/play button (`aria-pressed`) freezes the typing. Typing also stops when the hero is off screen. Screen readers get the static word list (`sr-only`), and the typed text is `aria-hidden`. |
| 8 / R2 Name underline | **Fixed** | Uses `text-decoration`, which follows the wrapped name. Checked at 375 and 1440 px in both themes. |
| 9 / A4 Nested interactive | **Fixed** | Only the "View details" row is a `<button>` (`aria-expanded`, `aria-controls`). The heading and company link sit outside it. axe reports 0 violations (the audit found 1), and the DOM has 0 nested interactive elements. |
| 10 / P3 Re-renders and JS weight | **Fixed** | `LazyMotion` + `m.*` everywhere, in strict mode. `<TypedText>` is isolated, so its ticks re-render only itself. The progress bar uses `useScroll` with no React state. First Load JS dropped from 186 to 173 kB. `react-type-animation`, `ScrollProgress.tsx`, `useScrollProgress.ts` and `loading.tsx` are removed. |
| P5 Unused PNGs (6.1 MB) | **Fixed** | No source file referenced them. They moved to `assets/originals/projects/`, outside `public/`, so nothing was deleted. |
| R3, C1, C2, A3, A5, A6, A7, F2–F5, U2, U4, U5, U7, U8, Q1, Q2, Q4, Q5 | **Fixed** | Verified in code. A3 (menu Escape and focus return) and F2 (active nav) were also checked in the browser. |
| U6 legend dots all one colour | Open | Dots are `aria-hidden`, so screen readers skip them. Removing them would be a visual change, so it's left for the owner. |
| U3 stats shown twice | Open | Content decision, left as is. |
| P4 glass `transmission` on 3D shapes | Open | Changing it would alter the hero's look. |
| Q3 `socials.find(...)!` in 3 files | Open | Low risk while the data has those platforms. |
| Q6 Counter restarts from 0 | Open | The real value is in the HTML; the count-up is intended. |

### Regressions found during verification, and fixed
1. **Off-centre orbs.** Framer's inline `scale` replaced Tailwind's `-translate-x/y-1/2` on the centre hero orb and the Contact orb. After hydration they jumped 300 px, which gave desktop CLS 0.139. They now centre through motion `x`/`y` (`Hero.tsx`, `Contact.tsx`).
2. **Font-swap shift.** At `xl`, the bold name fits on one line in the fallback font but wraps in Inter. The swap pushed the hero 96 px down (CLS 0.046). The h1 now reserves two lines at `xl` (`xl:min-h-[2em]`), which matches the real layout. No visual change.
3. **Small tap target.** The "View details" buttons were 16 px tall. They're now 24 px (WCAG 2.5.8), with the same visual position (`Experience.tsx`).

### Remaining
- **Simulated mobile LCP (7.2 s)** is dominated by about 5 s of style/layout/paint work from the glass and blur effects across roughly 1,400 DOM nodes, plus hydration. Cutting it further needs design trade-offs: fewer `backdrop-filter` surfaces, or server-rendering the static sections.
- **At 375 px, long typed phrases wrap** to a second line and unwrap, causing tiny shifts of about 0.005 each. This existed before the fixes.
- **Re-measure on the deployed site.** Real hosting gzips responses and is not localhost, so its numbers will differ.

### Verification checklist
- `npm run type-check`: clean. `npm run lint`: no warnings. `next build`: succeeds. The repo has no test suite.
- **22 viewport/theme runs** (320–1920 px, light and dark): 0 console errors, 0 failed requests, 0 broken images, no horizontal scroll. Body colours are exactly `#F0F5F7` and `#101422`.
- **axe** at 375 and 1440 px in both themes: 0 violations.
- **Keyboard:** the skip link jumps to `#main-content`. Tab order runs logo → nav → theme → Resume → hero CTAs → socials, with a visible focus style on every stop. Escape closes the mobile menu and returns focus to its toggle. Enter toggles Experience details.
- **Contact form:** data is kept after Send. Copy fills the clipboard and Clear resets the form. Validation errors are announced and linked to their fields.
- **Theme:** dark on first visit, whatever the OS setting (changed at the owner's request after verification). The toggle persists across reloads, and its label says which theme it switches to.
