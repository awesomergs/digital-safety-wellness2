# Curriculum Design Refresh

Date: September 20, 2026 (UTC)

## What?

The existing course now uses a light learning workspace: an upfront module
outline, readable lesson columns, consistent answer controls, explicit progress,
and distinct layouts for domain practice, footprint reflection, and password
practice. The certificate follows the same visual system.

The downloadable HTML still works on its own. No framework, runtime package,
account, analytics service, or backend was added. The four modules, question
order within the curriculum, answer keys, retry rules, and 80% passing gates
are preserved. Assessments still shuffle their questions.

## Why?

The user confirmed the audience and direction: college students; clear,
reassuring, lightly playful; readable lessons with scam practice emphasized.
The earlier audit and local screenshots showed inconsistent inline styling,
low-contrast secondary text, nested cards, and practice controls competing with
decorative framing.

The changes address those observed interface issues. They do **not** establish
that students learn more or complete the course faster.

## How?

- Kept the existing vanilla JavaScript, curriculum files, shared assessment
  engine, event delegation, and single-file build.
- Replaced the old page-level card framing with a course outline and unframed
  reading surfaces. The mobile outline uses native `details` and `summary`.
- Shared the module-row renderer between entry and the learner's course path.
- Moved 42 authored inline style attributes into shared presentation classes,
  without changing the curriculum's text or answer data.
- Used native buttons, labeled inputs, checkboxes, disclosure controls, and
  explicit text feedback. Correct, incorrect, locked, and completed states do
  not depend only on color.
- Embedded the two font files and the small Lucide symbol set, including their
  license notices, into the generated download.

## Design Critique

| Before | After | Why |
| --- | --- | --- |
| The name gate hid the curriculum structure | The four-module path is visible before enrollment | Students can see what they are starting |
| Rounded cards inside a large lesson card | A readable column with headings and section rules | Less framing competes with the material |
| Lock explanations depended on hover | Prerequisites remain visible alongside disabled actions | The same information works on touch and keyboard |
| A dark address tile with mixed inline styles | A sender-details panel, eight-round progress, and consistent verdict controls | Makes the existing practice activity easier to inspect |
| Footprint totals became unvalidated risk judgments | Selected-item counts and neutral reflection language | A self-report checklist is not a safety score |
| Password estimates implied real attack predictions | A clearly labeled exercise rating and optional demonstration estimate | Preserves the exercise without implying measurement |
| Incorrect single-choice feedback said to remove a disabled choice | Single choice says "Try another answer"; multiselect says "Remove this choice" | Instructions match the actual retry rules |
| Long transitions, broad `transition: all`, and animated card decoration | Short, property-specific feedback and reduced-motion handling | Frequent course actions remain direct |
| Phone domain choices initially fell below the first screen | Tighter module context, a shorter prompt, and a smaller sender panel | Both choices fit the checked 390px viewport |

The existing scenario sequence, shared grading engine, and one-file
distribution remain useful foundations. Some lessons are still long and
repetitive; that is a curriculum-editing opportunity, not a claim that this
visual pass solved instructional pacing.

## Design System

`src/styles.css` is the source of truth. There is no parallel token JSON or
component framework to keep synchronized.

| Category | Contract |
| --- | --- |
| Voice | Clear, reassuring, lightly playful; no judgmental reflection scores |
| Surfaces | Near-white `--surface`, subtle neutral sections, small semantic tints |
| Primary action | Evergreen `--accent`; success, warning, and error have separate text/background pairs |
| Typography | Red Hat Display for headings; Red Hat Text for reading and controls; monospace only for inspectable addresses |
| Type sizing | Fixed rem sizes, no viewport-based font sizing or negative letter spacing |
| Reading measure | Lesson text capped at `70ch`; normal document flow for long content |
| Spacing | Shared 4, 8, 12, 16, 24, 32, 48, and 64px scale |
| Corners | 6px controls, 8px framed tools; sections are not floating cards |
| Motion | 120ms press feedback and 180ms progress transitions; no perpetual animation |
| Keyboard/motion | Visible focus, no press animation on keyboard focus, instant progress while focus-visible, reduced-motion override |
| Responsive layout | Desktop outline; collapsible mobile outline; stacked narrow-screen controls |

The font choice follows the confirmed voice and a campus reading context.
The previous DM pairing and the default Outfit alternative were rejected;
the Red Hat Display/Text optical pairing was selected after checking the
Google Fonts catalog description. The Latin subsets are bundled, with normal
sans-serif fallbacks for glyphs they do not cover.

### Control Contracts

| Control | States and behavior | Accessibility |
| --- | --- | --- |
| Primary/secondary button | Default, hover, press, disabled; no layout change on hover | Native button, minimum 44px height, visible focus |
| Text input | Labeled, empty, populated, invalid | Native input, minimum 48px height, associated help/error text |
| Answer option | Selected, locked correct, rejected, completed | Native button; multiselect exposes `aria-pressed`; feedback includes text and icons |
| Footprint checkbox | Unchecked, checked, explanatory text | Native checkbox with a full-row label; links are outside the label |
| Progress | Module percentage or completed domain rounds | Named progressbar with current and maximum values |
| Outline/estimate disclosure | Open and closed | Native `details`/`summary`, keyboard operable |
| Feedback | Hint, correct, explanation | Polite live region; completed-answer focus leads to the next action |
| Certificate | Normal reading flow and print layout | Long names wrap; print controls stay outside the certificate |

No loading skeletons were added: these views render synchronously from local
data. No persistence or resume mechanism was added. Leaving a module still
restarts it, and closing/reloading the file still clears progress; the interface
now discloses those limits.

## Accessibility Review

Target: WCAG 2.1 AA checks, with a project preference for 44px control targets.
The 44px target is associated with WCAG 2.1 criterion 2.5.5 **AAA**, not a claim
that it is the AA minimum.

### Checked Contrast

Ratios are calculated from the actual semantic CSS tokens by the Node tests.

| Pair | Foreground | Background | Ratio | Target |
| --- | --- | --- | --- | --- |
| Body text | `#24352c` | `#fcfdfb` | 12.70:1 | 4.5:1 |
| Secondary text | `#56645b` | `#fcfdfb` | 6.11:1 | 4.5:1 |
| Secondary text on soft surface | `#56645b` | `#f1f4ef` | 5.62:1 | 4.5:1 |
| Primary action | `#fcfdfb` | `#256349` | 6.95:1 | 4.5:1 |
| Success feedback | `#236044` | `#eaf3e9` | 6.54:1 | 4.5:1 |
| Warning feedback | `#76550c` | `#fbf4d9` | 6.19:1 | 4.5:1 |
| Error feedback | `#9b353d` | `#fceff0` | 6.31:1 | 4.5:1 |
| Control border | `#78877a` | `#fcfdfb` | 3.71:1 | 3:1 |
| Focus indicator | `#256349` | `#fcfdfb` | 6.95:1 | 3:1 |

### Interaction Evidence

- Empty-name validation and keyboard form submission work.
- Space operates the password visibility control and footprint checkbox.
- Tab moves from completed assessment feedback to the next-question control.
- The accessibility tree exposes question groups, field labels, disclosure
  names, progress, disabled states, and live feedback.
- Desktop 1280px, phone 390px/320px, and tablet 768px layouts were checked.
  The final-build run recorded 109 layout checks with no horizontal overflow.
- Password practice and the certificate were stressed with 200% root text
  sizing. A 60-character synthetic certificate name was also checked at 320px,
  including enlarged text. Temporary browser changes were restored.
- Reduced-motion emulation produced zero-duration button transitions.
- Print CSS keeps the certificate visible while hiding the site header and
  controls.

**Remaining manual checks:** VoiceOver/NVDA, physical touch devices, actual
browser zoom behavior, and actual printer/PDF output. Root text-size emulation
is not a browser-zoom certification. The native preview reports "Printing is
not available", so no PDF export is claimed. These checks are not a blanket
WCAG conformance statement.

## Research Synthesis

Method: source inspection, prior audit screenshots, and synthetic browser
walkthroughs. Student research participants: **0**. No interviews, survey
results, or new research document were supplied for this pass.

| Evidence | Interpretation | Action |
| --- | --- | --- |
| Curriculum structure was hidden behind name entry | Seeing the path may reduce uncertainty before starting | Show the module outline before enrollment |
| Similar controls had different styling and feedback | Consistency may reduce the effort of relearning controls | Share tokens, controls, and feedback patterns |
| Phone practice choices fell below the initial viewport | Course context was taking space from the decision | Tighten the mobile context and prompt |
| Reflection and password labels implied measurement | Students could mistake an exercise output for a safety guarantee | Clarify the scope of those outputs |
| User requested small-team feasibility | Existing activities are a practical base for future game elements | Keep the renderer and authored data rather than add a game engine |

The interpretations are design hypotheses, not measured student outcomes.
No participant quotes, prevalence estimates, or user segments were invented.

When the research arrives, review each module's claims, examples, and assessment
keys together. Domain authenticity assumptions, password guidance, privacy
statistics, platform settings, and legal/reporting claims still need that
review. This pass preserved authored curriculum claims rather than presenting
them as newly verified.

A feasible next game slice is one small, research-backed scam case using the
existing choice/explanation pattern. Test whether students can explain the
warning sign, not just select the expected answer. Timers, leaderboards,
accounts, and a separate engine remain out of scope.

## Verification and Performance

[The machine-readable record](design/verification.json) identifies the generated
artifact by SHA-256 and separates final-build checks from the earlier regression.

- 14 Node tests pass, including grading, authoring validation, escaping,
  contrast, offline assets, and password exercise states.
- Two complete offline course walkthroughs exercised all 74 authored questions
  and eight domain rounds. An additional eight-question failed check-in and
  successful retake verified the completion gate.
- The final-build walkthrough also checked single-choice and multiselect retry
  behavior after the feedback-copy fixes.
- A source comparison confirmed curriculum text, question data, answer keys,
  and module order match the baseline after presentation HTML normalization.
- Across 1,010 synthetic password inputs, ratings, continuation gates, and
  numeric demonstration outputs match the previous implementation.
- Build freshness and `git diff --check` pass. Console snapshots contained no
  warnings/errors; the full CDP event history was not retained.

These are source and local-test results, not deployed monitoring, learning
outcomes, or independently verified curriculum answers.

| Source metric | Before | After |
| --- | ---: | ---: |
| Download bytes | 258,337 | 330,173 |
| Gzip bytes, Node default compression | 69,395 | 130,503 |
| Inline JavaScript bytes, including curriculum data | 221,154 | 196,559 |
| Bundled font files | 0 | 2, totaling 60,832 bytes before base64 encoding |

The JavaScript is about 11% smaller, but the download is about 28% larger
because fonts and licenses are embedded. This trades payload size for
consistent offline typography and removes runtime font-provider requests.
No Lighthouse score, field Core Web Vitals improvement, or speedup is claimed.
Optional video and external resources still need a connection.

## Visual Evidence

Native browser captures use JPEG, with synthetic learner data:

- [Course overview](design/screenshots/01-overview-desktop.jpg)
- [Learning path](design/screenshots/02-path-desktop.jpg)
- [Lesson](design/screenshots/03-lesson-desktop.jpg)
- [Domain practice, desktop](design/screenshots/05-domain-desktop.jpg)
- [Domain practice, phone](design/screenshots/06-domain-mobile.jpg)
- [Footprint reflection](design/screenshots/10-footprint-mobile.jpg)
- [Password practice](design/screenshots/13-password-strong-mobile.jpg)
- [Failed check-in and retry](design/screenshots/14-check-in-retry-desktop.jpg)
- [Final assessment, phone](design/screenshots/17-final-assessment-mobile.jpg)
- [Certificate](design/screenshots/19-certificate-desktop.jpg)
- [Print CSS isolation](design/screenshots/20-certificate-print-layout.jpg)

## Sources and Maintenance

- Confirmed design context: `.impeccable.md`.
- Baseline findings and screenshots: `docs/AUDIT.md` and `docs/audit/`.
- Font catalog: `https://fonts.google.com/specimen/Red+Hat+Display` and
  `https://fonts.google.com/specimen/Red+Hat+Text`.
- Font origin: Google Fonts Red Hat Display v21 and Red Hat Text v19 Latin
  variable WOFF2 subsets. Upstream project:
  `https://github.com/RedHatOfficial/RedHatFont`.
- Icons: Lucide 0.468.0, from
  `https://github.com/lucide-icons/lucide/tree/0.468.0/icons`.
- Licenses: `src/assets/FONT-LICENSE.txt` and `src/assets/ICON-LICENSE.txt`;
  the build includes their notices in the downloadable HTML.
- Contrast standard:
  `https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html`.
- Target-size distinction:
  `https://www.w3.org/WAI/WCAG21/Understanding/target-size.html`.

The existing FigJam artifact is an audit board, not a reusable Figma Design
component library. No Figma file, pull request, deployment, or account setting
was changed in this design pass.
