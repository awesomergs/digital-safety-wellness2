# Digital Safety & Wellness Curriculum

An interactive course that teaches students the essentials of staying safe and well online. Learners work through four short modules - covering scams and social engineering, social media and digital well-being, account security and passwords, and reporting and student rights - each with lessons, scenarios, and hands-on tools. A final exam wraps up the course and unlocks a printable completion certificate.

## How to open it (step by step)

You don't need to install anything. The whole course is one file that opens in a web browser (like Chrome, Safari, Edge, or Firefox) - the same kind of program you use to visit websites.

**Step 1 - Download the course file from GitHub**

1. Click the file named `digital-safety-wellness.html`. (If you see a list, this is the one to click.)
2. Now you're looking at a page of code - don't worry, that's normal. Look at the top-right area of that code box for a **download button**. It looks like a small downward arrow (⬇), and if you hover over it, it says **"Download raw file"**. Click it.
3. The file saves to your computer - usually into your **Downloads** folder.

> Tip: If you don't see the arrow button, look for a button labeled **"Raw"** or **"..."** (three dots) near the top-right of the code box - the download option is there too.

**Step 2 - Open the file you just downloaded**

The easiest way is to **double-click it**:

1. Find the file named `digital-safety-wellness.html` in your **Downloads** folder (or wherever downloads go on your computer).
2. Double-click it.
3. It should open in your web browser automatically. That's it - you're ready to start!

**If double-clicking opens the wrong thing**

Sometimes double-clicking opens a program full of confusing text instead of the course. If that happens:

1. **Right-click** the `digital-safety-wellness.html` file (on a Mac, hold the Control key and click).
2. In the little menu that pops up, hover over **"Open with"**.
3. Choose your web browser from the list - for example **Google Chrome**, **Safari**, **Microsoft Edge**, or **Firefox**.
4. The course will open in that browser.

**Another way that always works: drag it in**

1. Open your web browser first (click its icon, the way you normally do to go online).
2. Find the downloaded `digital-safety-wellness.html` file on your computer.
3. Click and hold the file, drag it on top of the open browser window, and let go.
4. The course appears.

## How to take the course

1. Type your name in the box to begin.
2. Go through the four modules in order. Each one unlocks the next after you finish it.
3. After all four modules, take the final exam.
4. Pass the exam and you'll get a personalized certificate you can print or save.

**A couple of things to know:**

- Lessons, activities, assessments, and certificate printing work without internet. Optional web fonts and the embedded video need a connection and contact their respective providers.
- Your progress is **not saved** if you close the tab or browser, so try to finish the whole course in one sitting. If you close it, you'll have to start over from the beginning.
- On the certificate, choose **Print / Save PDF**, then use your browser's printer or PDF destination. This opens a print dialog instead of downloading a PDF automatically.
- Use only an invented password in the practice lab. The lab is a teaching exercise, not a security assessment or a live breach lookup. Names and activity responses are kept in this tab's memory; there is no account, database, or analytics integration.

## Design notes

A few ideas guided how the course looks and feels:

- **One step at a time.** Each module is broken into small steps - a single lesson, scenario, or question per screen - so learners are never faced with a wall of text. The sequential unlocking (and 80%-to-pass gates) keeps everyone on a shared path and gives a clear sense of progress.

- **Learning by doing.** Rather than only telling students what to do, the modules include hands-on tools (spotting fake domains, auditing a digital footprint, testing real password strength) so the lessons stick through practice.

- **A reward to finish on.** The personalized, printable certificate gives learners a concrete goal and a sense of accomplishment for completing the course.

- **Zero friction to run.** The whole thing is a single self-contained file with no install or setup, so it can be handed to a student, teacher, or school and just opened in a browser.

## For Contributors

The downloadable HTML is generated. **Edit `src/`, not `digital-safety-wellness.html`.** Learners still download just the one HTML file.

| File | Responsibility |
| --- | --- |
| `src/curriculum/module-1.js` through `module-4.js` | One authoring file per curriculum module, including its mini-test and activity data |
| `src/curriculum/final-exam.js` | Final exam questions |
| `src/course.js` | Curriculum validation, shared assessment rules, shuffling, and text escaping |
| `src/app.js` | Navigation, rendering, completion gates, and event handling |
| `src/activities.js` | Domain practice, footprint reflection, and password lab |
| `src/shell.html` and `src/styles.css` | Page structure and the existing visual design |

With Node.js 22 or newer, no package installation is needed:

```sh
node scripts/build.mjs
node --test tests/course.test.mjs
node scripts/build.mjs --check
```

Open the generated `digital-safety-wellness.html` in a browser and commit it alongside source changes. CI checks that the download matches its sources and that the curriculum and assessment rules are valid. Content HTML is trusted, repository-authored material; this is not an importer for untrusted HTML or remote course data.

The checks catch missing step types, invalid question/answer data, stale builds, and grading regressions. A wrong true/false answer finishes that question; other questions permit one retry. Wrong multiselect choices must be explicitly removed. A fully answered assessment must reach 80% to pass.

See [the audit and next-phase backlog](docs/AUDIT.md) for evidence, remaining design/content risks, and a small-team approach to the next scam-spotting activity. Visual redesign, research-led curriculum revisions, persistent progress, and new game mechanics are separate follow-ups. This self-contained teaching course is not a tamper-proof examination or an accredited credential.
