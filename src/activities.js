let footprintState = null;
let domainState = null;
let passwordPracticeComplete = false;

function renderFootprintAudit(step) {

  // ── Items ──────────────────────────────────────────────────────────────────
  // Each item: { id, label, category: 'active'|'passive', weight: 1|2|3,
  //             tooltip: short explanation of why this contributes }
  // weight: 1 = minor, 2 = moderate, 3 = significant
  // ──────────────────────────────────────────────────────────────────────────
  const ITEMS = step.items;

  // Store state
  footprintState = { checked: new Set(), items: ITEMS, submitted: false };

  const activeItems  = ITEMS.filter(i => i.category === 'active');
  const passiveItems = ITEMS.filter(i => i.category === 'passive');

  function buildGroup(items) {
    return items.map(item => `
      <label id="fp-row-${item.id}" class="footprint-row">
        <div style="position:relative;flex-shrink:0;margin-top:2px">
          <input type="checkbox" id="fp-cb-${item.id}"
            data-footprint="${item.id}" aria-labelledby="fp-label-${item.id}"
            style="width:18px;height:18px;accent-color:var(--teal);cursor:pointer;margin:0">
        </div>
        <div style="flex:1">
          <div id="fp-label-${item.id}" style="font-size:14px;color:var(--navy);line-height:1.5">${item.label}</div>
          <div style="font-size:12px;color:var(--slate-light);margin-top:4px;line-height:1.5;display:none" id="fp-tip-${item.id}">${item.tooltip}</div>
        </div>
        <div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
          padding:3px 8px;border-radius:100px;flex-shrink:0;margin-top:3px;
          background:${item.weight === 3 ? 'rgba(192,57,43,0.10)' : item.weight === 2 ? 'rgba(200,146,42,0.12)' : 'rgba(15,34,64,0.06)'};
          color:${item.weight === 3 ? '#c0392b' : item.weight === 2 ? '#8a6010' : 'var(--slate-light)'}">
          ${item.weight === 3 ? 'High' : item.weight === 2 ? 'Med' : 'Low'}
        </div>
      </label>
    `).join('');
  }

  document.getElementById('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge scenario">Interactive</span>
        <div class="content-card-title">What Does Your Footprint Look Like?</div>
      </div>
      <div class="content-card-body">
        <div class="scenario-text">
          Check everything that applies to you - honestly. This isn't a test with right or wrong answers. It's a mirror. No one sees your responses; this runs entirely in your browser.
        </div>
        <div style="font-size:13px;color:var(--slate-light);margin:-8px 0 28px;font-style:italic">Click any item after checking it to see why it matters.</div>

        <!-- Live footprint size meter -->
        <div style="background:var(--cream);border-radius:var(--radius-md);padding:20px 24px;margin-bottom:28px;border:1px solid rgba(15,34,64,0.08)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <span style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate-light)">Your Footprint Size</span>
            <span id="fp-size-label" style="font-size:13px;font-weight:700;color:var(--slate-light)">None yet</span>
          </div>
          <div style="height:10px;background:rgba(15,34,64,0.08);border-radius:10px;overflow:hidden;margin-bottom:10px">
            <div id="fp-meter" style="height:100%;width:0%;border-radius:10px;transition:width 0.5s,background 0.5s;background:var(--teal)"></div>
          </div>
          <div id="fp-breakdown" style="display:flex;gap:16px;font-size:12px;color:var(--slate-light)">
            <span>👣 Active: <strong id="fp-active-count">0</strong></span>
            <span>🕵️ Passive: <strong id="fp-passive-count">0</strong></span>
            <span id="fp-breach-flag" style="display:none;color:var(--error)">⚠️ Possible breach exposure</span>
          </div>
        </div>

        <!-- Active section -->
        <div style="margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <div style="width:10px;height:10px;border-radius:50%;background:var(--teal);flex-shrink:0"></div>
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate)">Active Footprint - things you deliberately put out</div>
          </div>
          ${buildGroup(activeItems)}
        </div>

        <!-- Passive section -->
        <div style="margin-top:24px;margin-bottom:28px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <div style="width:10px;height:10px;border-radius:50%;background:var(--navy-mid);flex-shrink:0"></div>
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate)">Passive Footprint - collected without you actively sharing</div>
          </div>
          ${buildGroup(passiveItems)}
        </div>

        <div class="card-nav">
          ${backBtnHTML()}
          <button class="btn-nav primary" data-action="footprint-submit">See My Footprint Analysis →</button>
        </div>
      </div>
    </div>

    <!-- Results card -->
    <div id="fp-results" style="display:none;margin-top:20px">
      <div class="content-card">
        <div class="content-card-header">
          <span class="content-type-badge lesson">Your Results</span>
          <div class="content-card-title" id="fp-results-title">Footprint Analysis</div>
        </div>
        <div class="content-card-body">
          <div id="fp-results-body"></div>
          <div class="card-nav" style="margin-top:28px">
            ${backBtnHTML()}
            <button class="btn-nav primary" data-action="next-step">Continue →</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function fpToggle(id) {
  const state = footprintState;
  const cb    = document.getElementById('fp-cb-' + id);
  const tip   = document.getElementById('fp-tip-' + id);
  if (!state || !cb || !tip) return;

  if (cb.checked) {
    state.checked.add(id);
    if (tip) tip.style.display = 'block';
  } else {
    state.checked.delete(id);
    if (tip) tip.style.display = 'none';
  }

  state.submitted = false;
  document.getElementById('fp-results').style.display = 'none';
  fpUpdateMeter();
}

function fpUpdateMeter() {
  const state      = footprintState;
  const checkedItems = state.items.filter(i => state.checked.has(i.id));
  const totalWeight  = state.items.reduce((s, i) => s + i.weight, 0);
  const userWeight   = checkedItems.reduce((s, i) => s + i.weight, 0);
  const pct          = Math.round((userWeight / totalWeight) * 100);

  const activeCount  = checkedItems.filter(i => i.category === 'active').length;
  const passiveCount = checkedItems.filter(i => i.category === 'passive').length;
  const hasBreach    = state.checked.has('p6');

  // Meter color
  const color = pct >= 65 ? '#c0392b' : pct >= 35 ? '#c8922a' : 'var(--teal)';
  const label = pct >= 65 ? 'Large' : pct >= 35 ? 'Moderate' : pct > 0 ? 'Small' : 'None yet';

  document.getElementById('fp-meter').style.width      = Math.max(pct, pct > 0 ? 4 : 0) + '%';
  document.getElementById('fp-meter').style.background = color;
  document.getElementById('fp-size-label').textContent  = label;
  document.getElementById('fp-size-label').style.color  = color;
  document.getElementById('fp-active-count').textContent  = activeCount;
  document.getElementById('fp-passive-count').textContent = passiveCount;
  document.getElementById('fp-breach-flag').style.display = hasBreach ? 'inline' : 'none';
}

function fpSubmit() {
  const state       = footprintState;
  if (!state) return;
  state.submitted = true;
  const checkedItems = state.items.filter(i => state.checked.has(i.id));
  const totalWeight  = state.items.reduce((s, i) => s + i.weight, 0);
  const userWeight   = checkedItems.reduce((s, i) => s + i.weight, 0);
  const pct          = Math.round((userWeight / totalWeight) * 100);
  const count        = checkedItems.length;

  const activeChecked  = checkedItems.filter(i => i.category === 'active');
  const passiveChecked = checkedItems.filter(i => i.category === 'passive');
  const highRisk       = checkedItems.filter(i => i.weight === 3);
  const hasBreach      = state.checked.has('p6');

  // ── Headline + tone ──
  let headline, emoji, tone, meterColor;
  if (pct >= 65) {
    headline = 'Your footprint is large'; emoji = '🔴';
    tone = `You've checked ${count} of ${state.items.length} items - and several are high-impact. That's not a judgment; it's the reality for most people who've been online for years. The goal isn't zero footprint - it's <strong>understanding what's out there and making deliberate choices going forward</strong>.`;
    meterColor = '#c0392b';
  } else if (pct >= 35) {
    headline = 'Your footprint is moderate'; emoji = '🟡';
    tone = `You've checked ${count} of ${state.items.length} items. You're not starting from scratch, but you're also not overexposed. A few targeted changes - especially on the high and medium items - can meaningfully reduce your risk without overhauling how you use the internet.`;
    meterColor = '#c8922a';
  } else if (pct > 0) {
    headline = 'Your footprint is relatively small'; emoji = '🟢';
    tone = `You've checked ${count} of ${state.items.length} items - you're more careful than most. That said, even a small footprint has real-world implications. And the passive items in particular can accumulate without you noticing.`;
    meterColor = 'var(--teal)';
  } else {
    headline = 'Nothing checked - yet'; emoji = '⬜';
    tone = `Either you've had a very offline week, or this is a moment to sit with it honestly. Most college students would check at least 6–8 items on this list without thinking hard. That's not a problem - it's just useful information.`;
    meterColor = 'var(--slate-light)';
  }

  // ── High risk callouts ──
  const highRiskHTML = highRisk.length ? `
    <div style="margin-bottom:20px">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--error);margin-bottom:10px">⚠️ High-impact items you checked</div>
      ${highRisk.map(item => `
        <div style="padding:12px 16px;background:rgba(192,57,43,0.06);border:1px solid rgba(192,57,43,0.15);
          border-radius:var(--radius-sm);margin-bottom:8px;font-size:13.5px;color:var(--navy);line-height:1.5">
          <strong>${item.label}</strong>
          <div style="font-size:12.5px;color:var(--slate);margin-top:4px">${item.tooltip}</div>
        </div>
      `).join('')}
    </div>` : '';

  // ── Breach callout ──
  const breachHTML = hasBreach ? `
    <div style="padding:14px 18px;background:rgba(192,57,43,0.07);border:1px solid rgba(192,57,43,0.2);
      border-radius:var(--radius-sm);margin-bottom:20px;font-size:13.5px;line-height:1.6;color:var(--navy)">
      <strong style="color:var(--error)">⚠️ You may have breach exposure</strong><br>
      Most people's email and password data has appeared in at least one breach without them knowing.
      Check <a href="https://haveibeenpwned.com" target="_blank" rel="noopener"
        style="color:var(--teal);font-weight:600">haveibeenpwned.com</a> - it's free, safe, and shows you
      exactly which breaches included your email address.
    </div>` : '';

  // ── Actionable takeaways ──
  const takeaways = [];
  if (activeChecked.some(i => i.id === 'a4'))
    takeaways.push('Turn off location tagging on photos before you post, or crop out recognizable landmarks.');
  if (activeChecked.some(i => i.id === 'a7'))
    takeaways.push('Set Instagram and Facebook to require your approval before tagged photos appear on your profile.');
  if (activeChecked.some(i => ['a1','a3','a5'].includes(i.id)))
    takeaways.push('Do a quick Google search of your own name - see what a recruiter, landlord, or stranger would find.');
  if (passiveChecked.some(i => i.id === 'p1'))
    takeaways.push('Consider using a search engine that doesn\'t log queries, like DuckDuckGo, for sensitive searches.');
  if (passiveChecked.some(i => i.id === 'p3'))
    takeaways.push('Audit your app permissions this week: Settings → Privacy - revoke location and camera access for apps that don\'t genuinely need them.');
  if (passiveChecked.some(i => i.id === 'p8'))
    takeaways.push('Install a browser extension like uBlock Origin - it blocks most tracking scripts before they load.');
  if (passiveChecked.some(i => i.id === 'p7'))
    takeaways.push('On public Wi-Fi, stick to HTTPS sites only - look for the padlock icon in the address bar.');
  // Always include one universal tip
  takeaways.push('The question isn\'t "how do I disappear?" - it\'s "am I making deliberate choices?" You can\'t undo the past, but you can change what you do next.');

  const takeawaysHTML = takeaways.length ? `
    <div style="background:var(--cream);border-radius:var(--radius-sm);padding:18px 20px;border:1px solid rgba(15,34,64,0.08)">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate-light);margin-bottom:12px">Concrete next steps for you</div>
      <ul class="lesson-list">
        ${takeaways.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>` : '';

  // ── Passive vs active observation ──
  let balanceNote = '';
  if (passiveChecked.length > activeChecked.length + 2) {
    balanceNote = `<div style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:16px">
      Notably, most of your footprint is <strong>passive</strong> - data collected about you rather than content you chose to share. This is harder to control, but being aware of it changes how you think about the tools you use every day.
    </div>`;
  } else if (activeChecked.length > passiveChecked.length + 2) {
    balanceNote = `<div style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:16px">
      Most of your footprint is <strong>active</strong> - things you've deliberately put out there. These are the most directly controllable: you can audit your profiles, tighten your privacy settings, and think more carefully about what you share going forward.
    </div>`;
  }

  // ── Render results ──
  document.getElementById('fp-results-title').textContent = headline;
  document.getElementById('fp-results-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding:20px 24px;
      background:var(--cream);border-radius:var(--radius-sm);border:1px solid rgba(15,34,64,0.08)">
      <div style="font-size:40px;flex-shrink:0">${emoji}</div>
      <div>
        <div style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--navy);margin-bottom:6px">${headline}</div>
        <div style="height:6px;width:160px;background:rgba(15,34,64,0.08);border-radius:6px;overflow:hidden;margin-bottom:8px">
          <div style="height:100%;width:${pct}%;background:${meterColor};border-radius:6px"></div>
        </div>
        <div style="font-size:13px;color:var(--slate-light)">${count} of ${state.items.length} items · ${activeChecked.length} active, ${passiveChecked.length} passive</div>
      </div>
    </div>

    <div style="font-size:15px;color:var(--slate);line-height:1.75;margin-bottom:20px">${tone}</div>

    ${balanceNote}
    ${breachHTML}
    ${highRiskHTML}
    ${takeawaysHTML}

    <div style="margin-top:20px;padding:14px 18px;background:rgba(26,127,120,0.07);border-radius:var(--radius-sm);font-size:13px;color:var(--slate);line-height:1.6;border:1px solid rgba(26,127,120,0.15)">
      🔒 <strong>Reminder:</strong> your answers weren't recorded. This ran entirely in your browser and nothing was sent anywhere. The exercise only works if you're honest with yourself.
    </div>
  `;

  // Show results and scroll
  document.getElementById('fp-results').style.display = 'block';
  document.getElementById('fp-results-title').tabIndex = -1;
  document.getElementById('fp-results-title').focus({ preventScroll: true });
  document.getElementById('fp-results').scrollIntoView({ block:'start' });
}


function renderDomainQuiz(step) {
  // ── The 8 email addresses ──────────────────────────────────────────────────
  // Each entry: { address, verdict: 'real'|'fake', blurb, flags: [strings] }
  // flags = the specific red flags to highlight after reveal (fake only)
  // ─────────────────────────────────────────────────────────────────────────
  const DOMAINS = step.items;

  // Shuffle for variety on revisit
  const shuffled = shuffle(DOMAINS);

  // Store state on window for access from event handlers
  domainState = {
    items:     shuffled,
    current:   0,
    correct:   0,
    answered:  false
  };

  document.getElementById('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge scenario">Interactive</span>
        <div class="content-card-title">Real or Fake? - Domain Edition</div>
      </div>
      <div class="content-card-body">
        <div class="scenario-text" style="margin-bottom:4px">
          You've just learned how to spot a suspicious email domain. Now put it to the test - ${DOMAINS.length} email addresses, one at a time. Is each one from a legitimate source or a fake?
        </div>
        <div style="font-size:12px;color:var(--slate-light);margin-bottom:28px">Read the full address carefully before deciding.</div>

        <!-- Progress -->
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
          <div style="flex:1;height:4px;background:rgba(15,34,64,0.08);border-radius:4px;overflow:hidden">
            <div id="dq-progress-bar" style="height:100%;width:0%;background:var(--teal);border-radius:4px;transition:width 0.4s"></div>
          </div>
          <div id="dq-counter" style="font-size:12px;font-weight:600;color:var(--slate-light);white-space:nowrap">1 of ${DOMAINS.length}</div>
        </div>

        <!-- Address card -->
        <div id="dq-card" style="
          background:var(--navy);border-radius:var(--radius-md);
          padding:32px 28px;text-align:center;margin-bottom:24px;
          min-height:100px;display:flex;align-items:center;justify-content:center;
        ">
          <div id="dq-address" style="
            font-family:monospace;font-size:clamp(13px,2.5vw,18px);
            color:white;letter-spacing:0.02em;word-break:break-all;line-height:1.5
          "></div>
        </div>

        <!-- Verdict buttons -->
        <div id="dq-buttons" style="display:flex;gap:12px;margin-bottom:20px">
          <button data-action="domain-answer" data-choice="real" style="
            flex:1;padding:16px;border-radius:var(--radius-sm);border:2px solid rgba(26,127,120,0.3);
            background:rgba(26,127,120,0.06);cursor:pointer;font-family:'DM Sans',sans-serif;
            font-size:15px;font-weight:600;color:var(--teal);transition:all 0.18s
          ">
            ✓ Legitimate
          </button>
          <button data-action="domain-answer" data-choice="fake" style="
            flex:1;padding:16px;border-radius:var(--radius-sm);border:2px solid rgba(192,57,43,0.3);
            background:rgba(192,57,43,0.06);cursor:pointer;font-family:'DM Sans',sans-serif;
            font-size:15px;font-weight:600;color:var(--error);transition:all 0.18s
          ">
            ✗ Fake / Suspicious
          </button>
        </div>

        <!-- Feedback area -->
        <div id="dq-feedback" role="status" aria-live="polite" style="display:none"></div>

        <!-- Next / Finish -->
        <div id="dq-next-wrap" style="display:none">
          <button id="dq-next-btn" data-action="domain-next" class="btn-nav primary" style="width:100%">Next →</button>
        </div>

        <!-- Back to previous step (available throughout the quiz) -->
        <div class="card-nav" style="justify-content:flex-start;margin-top:16px">
          ${backBtnHTML()}
        </div>
      </div>
    </div>

    <!-- Results card - hidden until all 8 answered -->
    <div id="dq-results" style="display:none;margin-top:20px">
      <div class="content-card">
        <div class="content-card-header">
          <span class="content-type-badge lesson">Lesson</span>
          <div class="content-card-title">What to Remember</div>
        </div>
        <div class="content-card-body">
          <div id="dq-score-area" style="text-align:center;padding:24px 0 28px"></div>
          <div style="background:var(--cream);border-radius:var(--radius-sm);padding:20px 24px;border:1px solid rgba(15,34,64,0.08)">
            <div style="font-size:20px;margin-bottom:10px">🔍</div>
            <div class="lesson-title" style="font-size:17px;margin-bottom:16px">The Rules for Reading Email Domains</div>
            <div style="display:flex;flex-direction:column;gap:14px">
              <div>
                <div style="font-weight:600;color:var(--navy);font-size:14px;margin-bottom:3px">The real domain is the last part before the first slash</div>
                <div style="font-size:13px;color:var(--slate);line-height:1.6">In <em>accounts.google.com/login</em>, the domain is google.com. In <em>google.com.verify-login.net</em>, the domain is verify-login.net.</div>
              </div>
              <div>
                <div style="font-weight:600;color:var(--navy);font-size:14px;margin-bottom:3px">Subdomains are fine — lookalike domains aren't</div>
                <div style="font-size:13px;color:var(--slate);line-height:1.6">accounts.google.com is Google. google-accounts.com is not.</div>
              </div>
              <div>
                <div style="font-weight:600;color:var(--navy);font-size:14px;margin-bottom:3px">Watch for character swaps</div>
                <div style="font-size:13px;color:var(--slate);line-height:1.6">0 for O, 1 for l, rn for m. Read the full address character by character if something feels off.</div>
              </div>
              <div>
                <div style="font-weight:600;color:var(--navy);font-size:14px;margin-bottom:3px">"Secure", "help", "alert", "support" in a domain means nothing</div>
                <div style="font-size:13px;color:var(--slate);line-height:1.6">Anyone can register those words. The brand name has to be the actual domain, not just part of a longer string.</div>
              </div>
              <div>
                <div style="font-weight:600;color:var(--navy);font-size:14px;margin-bottom:3px">When in doubt — don't click</div>
                <div style="font-size:13px;color:var(--slate);line-height:1.6">Open a new tab, go directly to the company's website, and log in from there.</div>
              </div>
            </div>
          </div>
          <div class="card-nav" style="margin-top:28px">
            ${backBtnHTML()}
            <button class="btn-nav primary" data-action="next-step">Continue →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  dqRender();
}

function dqRender() {
  const state = domainState;
  const item  = state.items[state.current];
  state.answered = false;

  // Update address display
  document.getElementById('dq-address').textContent = item.address;

  // Highlight the domain part in a different color
  const addr    = item.address;
  const atIdx   = addr.indexOf('@');
  if (atIdx >= 0) {
    const user   = addr.slice(0, atIdx + 1);
    const domain = addr.slice(atIdx + 1);
    document.getElementById('dq-address').innerHTML =
      `<span style="color:rgba(255,255,255,0.7)">${escapeHTML(user)}</span><span style="color:white;font-weight:700">${escapeHTML(domain)}</span>`;
  }

  // Progress
  const pct = Math.round((state.current / state.items.length) * 100);
  document.getElementById('dq-progress-bar').style.width = pct + '%';
  document.getElementById('dq-counter').textContent = `${state.current + 1} of ${state.items.length}`;

  // Reset UI
  document.getElementById('dq-feedback').style.display  = 'none';
  document.getElementById('dq-feedback').innerHTML      = '';
  document.getElementById('dq-next-wrap').style.display = 'none';
  document.getElementById('dq-buttons').style.display   = 'flex';

  // Re-enable buttons
  document.querySelectorAll('#dq-buttons button').forEach(b => {
    b.disabled = false;
    b.style.opacity = '1';
  });
}

function dqAnswer(choice) {
  const state = domainState;
  if (!state || state.answered || !['real', 'fake'].includes(choice)) return;
  state.answered = true;

  const item     = state.items[state.current];
  const correct  = choice === item.verdict;
  if (correct) state.correct++;

  // Disable buttons
  document.querySelectorAll('#dq-buttons button').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.5';
  });

  // Build feedback
  const isLast = state.current === state.items.length - 1;
  const flagsHTML = item.flags.length
    ? `<div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">
        ${item.flags.map(f => `
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:#7a3020">
            <span style="flex-shrink:0">🚩</span>${f}
          </div>`).join('')}
       </div>`
    : '';

  const correctLabel  = item.verdict === 'real'
    ? '<span style="color:var(--teal);font-weight:700">✓ Legitimate</span>'
    : '<span style="color:var(--error);font-weight:700">✗ Fake / Suspicious</span>';

  const verdictBg = item.verdict === 'real'
    ? 'rgba(26,127,120,0.09)' : 'rgba(192,57,43,0.07)';
  const verdictBorder = item.verdict === 'real'
    ? 'rgba(26,127,120,0.25)' : 'rgba(192,57,43,0.2)';

  const resultIcon = correct ? '✓' : '✗';
  const resultColor = correct ? 'var(--teal)' : 'var(--error)';
  const resultText  = correct ? 'Correct' : 'Not quite';

  document.getElementById('dq-feedback').style.display = 'block';
  document.getElementById('dq-feedback').innerHTML = `
    <div style="
      background:${verdictBg};border:1px solid ${verdictBorder};
      border-radius:var(--radius-sm);padding:16px 18px;margin-bottom:14px
    ">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:16px;color:${resultColor};font-weight:700">${resultIcon} ${resultText}</span>
        <span style="font-size:13px;color:var(--slate-light)">- this address is ${correctLabel}</span>
      </div>
      <div style="font-size:13.5px;color:var(--slate);line-height:1.65">${item.blurb}</div>
      ${flagsHTML}
    </div>
  `;

  // Show next/finish button
  document.getElementById('dq-next-wrap').style.display = 'block';
  document.getElementById('dq-next-btn').textContent = isLast ? 'See Results →' : 'Next →';
}

function dqNext() {
  const state = domainState;
  if (!state || !state.answered || state.current >= state.items.length) return;
  state.current++;

  if (state.current >= state.items.length) {
    dqShowResults();
  } else {
    dqRender();
    window.scrollTo(0, 0);
  }
}

function dqShowResults() {
  const state  = domainState;
  const total  = state.items.length;
  const score  = state.correct;
  const pct    = Math.round((score / total) * 100);

  // Fill progress bar to 100%
  document.getElementById('dq-progress-bar').style.width = '100%';
  document.getElementById('dq-counter').textContent = `${total} of ${total}`;

  // Hide the main card's action area
  document.getElementById('dq-buttons').style.display   = 'none';
  document.getElementById('dq-feedback').style.display  = 'none';
  document.getElementById('dq-next-wrap').style.display = 'none';

  // Swap address card to summary
  document.getElementById('dq-card').style.background = 'var(--cream)';
  document.getElementById('dq-card').style.border = '1px solid rgba(15,34,64,0.08)';
  document.getElementById('dq-address').innerHTML = `
    <div style="text-align:center">
      <div style="font-family:'DM Serif Display',serif;font-size:32px;color:var(--navy);margin-bottom:4px">${score}/${total}</div>
      <div style="font-size:14px;color:var(--slate-light)">${pct}% correct</div>
    </div>
  `;

  // Score message
  let msg;
  if (score === total)      msg = "Perfect - you caught every one. This is exactly the level of attention domain checking requires.";
  else if (score >= total - 1) msg = "Strong result. The tricky ones are designed to be - attackers invest real effort in making lookalike domains convincing.";
  else if (score >= total - 3) msg = "Decent - but a few slipped through. Review the ones you missed and look for the pattern: what made them look legitimate?";
  else                      msg = "Several slipped through - that's normal for a first pass. The explanation for each address shows exactly what to look for next time.";

  document.getElementById('dq-score-area').innerHTML = `
    <div style="font-size:18px;margin-bottom:10px">${score === total ? '🎯' : score >= total - 2 ? '👍' : '📚'}</div>
    <div style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--navy);margin-bottom:8px">${score === total ? 'Perfect score!' : score + ' out of ' + total}</div>
    <div style="font-size:14px;color:var(--slate-light);line-height:1.6;max-width:420px;margin:0 auto">${msg}</div>
  `;

  // Show results card
  const results = document.getElementById('dq-results');
  results.style.display = 'block';
  const title = results.querySelector('.content-card-title');
  title.tabIndex = -1;
  title.focus({ preventScroll: true });
  results.scrollIntoView({ block: 'start' });
}


function renderPasswordLab() {
  passwordPracticeComplete = false;
  document.getElementById('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge scenario">Interactive</span>
        <div class="content-card-title">Password Strength Lab</div>
      </div>
      <div class="content-card-body">
        <div class="scenario-text">
          Now it's your turn to build a strong password. Type one below and watch how it holds up against real attack criteria - then use what you learn to strengthen it.<br><br>
          <strong>Don't use a real password you actually use.</strong> Build a new one here. The goal is to understand what "strong" actually means in practice.
        </div>

        <!-- Input -->
        <div style="position:relative;margin-bottom:20px">
          <label class="sr-only" for="pw-input">Practice password (do not use a real password)</label>
          <input
            type="password"
            id="pw-input"
            placeholder="Type a password to test..."
            maxlength="128"
            autocomplete="new-password"
            style="
              width:100%;padding:14px 48px 14px 18px;
              border:1.5px solid rgba(15,34,64,0.15);border-radius:var(--radius-sm);
              font-family:'DM Sans',sans-serif;font-size:16px;color:var(--navy);
              background:var(--warm-white);outline:none;transition:border-color 0.2s;
              letter-spacing:0.08em;
            "
          >
          <button data-action="password-visibility" id="pw-eye" aria-label="Show practice password" aria-pressed="false" style="
            position:absolute;right:14px;top:50%;transform:translateY(-50%);
            background:none;border:none;cursor:pointer;font-size:18px;color:var(--slate-light);
            padding:4px;line-height:1;min-width:44px;min-height:44px
          ">👁</button>
        </div>

        <!-- Strength meter bar -->
        <div style="margin-bottom:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--slate-light)">Strength</span>
            <span id="pw-rating-label" role="status" style="font-size:13px;font-weight:700;color:var(--slate-light)">-</span>
          </div>
          <div style="height:6px;background:rgba(15,34,64,0.08);border-radius:6px;overflow:hidden">
            <div id="pw-meter-bar" style="height:100%;width:0%;border-radius:6px;transition:width 0.4s,background 0.4s"></div>
          </div>
        </div>

        <!-- Character composition row -->
        <div id="pw-composition" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px"></div>

        <!-- Time to crack -->
        <div id="pw-crack-row" style="display:none;background:var(--cream);border-radius:var(--radius-sm);padding:14px 18px;margin-bottom:16px;border:1px solid rgba(15,34,64,0.08)">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate-light);margin-bottom:4px">Estimated time to crack</div>
          <div id="pw-crack-time" style="font-size:22px;font-weight:600;font-family:'DM Serif Display',serif;color:var(--navy)"></div>
          <div id="pw-crack-method" style="font-size:12px;color:var(--slate-light);margin-top:2px"></div>
        </div>

        <!-- Weakness flags -->
        <div id="pw-warnings" style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px"></div>

        <!-- Gated continue - only unlocks on Strong -->
        <div id="pw-gate" style="display:none">
          <div style="background:rgba(26,127,120,0.08);border:1px solid rgba(26,127,120,0.2);border-radius:var(--radius-sm);padding:16px 20px;margin-bottom:20px">
            <div style="font-size:13px;font-weight:700;color:var(--teal);margin-bottom:6px">✓ Strong password achieved!</div>
            <div style="font-size:13px;color:var(--slate);line-height:1.6">
              Good work - if you can remember this one, feel free to use it. But you don't have to memorize passwords like this at all: a password manager will generate and remember passwords even stronger than this one for you, automatically.
            </div>
          </div>
        </div>

        <div class="card-nav">
          ${backBtnHTML()}
          <button class="btn-nav primary" id="pw-continue-btn" data-action="password-tips" disabled style="opacity:0.4">
            Continue - see tips →
          </button>
        </div>
      </div>
    </div>

    <!-- Tips card - hidden until strong password achieved -->
    <div id="pw-tips-card" style="display:none;margin-top:20px">
      <div class="content-card">
        <div class="content-card-header">
          <span class="content-type-badge lesson">Lesson</span>
          <div class="content-card-title">Making Passwords Actually Stick</div>
        </div>
        <div class="content-card-body">
          <span class="lesson-icon">💡</span>
          <div class="lesson-body">Here are the techniques that make a password strong <em>and</em> memorable - without resorting to predictable patterns:</div>

          <div style="background:var(--cream);border-radius:var(--radius-sm);padding:20px 24px;margin-top:20px;border:1px solid rgba(15,34,64,0.08)">
            <div style="font-size:20px;margin-bottom:10px">🔀</div>
            <div class="lesson-title" style="font-size:18px">Techniques That Actually Work</div>
            <ul class="lesson-list" style="margin-top:12px">
              <li><strong>Use a passphrase - then make it yours</strong> - string three or four genuinely unrelated words together and add a number or symbol between them: <em>correct-horse-battery-staple</em> becomes <em>Correct!Horse#Battery99</em> - long, hard to brute-force, and easier to remember than a random string. The length alone does most of the work.</li>
              <li><strong>Lead with a special character or number</strong> - most people add symbols at the end (Password1!). Putting one at the front or middle - <em>!MyDogRan2019</em> - breaks the predictable patterns cracking tools expect. Not a substitute for length, but a meaningful addition.</li>
              <li><strong>Avoid obvious substitutions as your only strategy</strong> - swapping a for @ or e for 3 is a known technique that cracking tools account for explicitly. "P@ssw0rd" is in breach databases. These substitutions can help as one element of a longer password, but they're not strong on their own.</li>
              <li><strong>Length beats complexity</strong> - a 16-character passphrase with just lowercase letters has more entropy than an 8-character password with symbols. Prioritize length first, then add variety.</li>
            </ul>
          </div>

          <div style="background:var(--cream);border-radius:var(--radius-sm);padding:20px 24px;margin-top:16px;border:1px solid rgba(15,34,64,0.08)">
            <div style="font-size:20px;margin-bottom:10px">🗝️</div>
            <div class="lesson-title" style="font-size:18px">The Real Answer: Just Use a Password Manager</div>
            <div class="lesson-body" style="margin-top:8px">
              No manual technique beats a randomly generated 20-character password you never have to remember or type. Password managers generate, store, and auto-fill credentials for every account - and they protect them properly. Your passwords are stored in an <strong>encrypted vault</strong>: even if the password manager company's servers were breached, the data is mathematically scrambled without your master password. Here are the most reputable free options:
            </div>
            <ul class="lesson-list" style="margin-top:12px">
              <li>
                <strong><a href="https://bitwarden.com" target="_blank" rel="noopener" style="color:var(--teal);text-decoration:none">Bitwarden</a></strong> - fully open-source (independently audited), free forever, works on every device and browser. The most reputable free option for most people. Uses AES-256 encryption. Can be self-hosted if you want full control over your vault.
              </li>
              <li>
                <strong><a href="https://keepassxc.org" target="_blank" rel="noopener" style="color:var(--teal);text-decoration:none">KeePassXC</a></strong> - stores your encrypted vault entirely locally - no cloud, no company servers, no subscription. Completely free and open-source. Best if you're privacy-focused and primarily use one device.
              </li>
              <li>
                <strong>Apple Passwords / iCloud Keychain</strong> - built into every iPhone, iPad, and Mac. Free, end-to-end encrypted, and deeply integrated - generates and fills passwords automatically in Safari and most apps. Strong choice if you're in the Apple ecosystem.
              </li>
              <li>
                <strong>Google Password Manager</strong> - built into Chrome and Android, free, and encrypted. Generates and saves strong passwords automatically. Good option if you're already in the Google ecosystem and use Chrome across devices.
              </li>
            </ul>
            <div style="margin-top:12px;padding:12px 16px;background:rgba(26,127,120,0.07);border-radius:6px;font-size:13px;color:var(--slate)">
              💬 <strong>The bottom line:</strong> pick any one of these and start using it today. Even using a password manager for just your most important accounts - email, banking, university login - is a massive improvement over reusing passwords.
            </div>
          </div>

          <div class="card-nav" style="margin-top:28px">
            ${backBtnHTML()}
            <button class="btn-nav primary" data-action="next-step">Continue →</button>
          </div>
        </div>
      </div>
    </div>
  `;

}

function togglePwVisibility() {
  const input = document.getElementById('pw-input');
  const btn   = document.getElementById('pw-eye');
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else                           { input.type = 'password'; btn.textContent = '👁'; }
  btn.setAttribute('aria-pressed', String(input.type === 'text'));
  btn.setAttribute('aria-label', input.type === 'text' ? 'Hide practice password' : 'Show practice password');
}

function showPasswordTips() {
  if (document.getElementById('pw-continue-btn').disabled) return;
  passwordPracticeComplete = true;
  const tips = document.getElementById('pw-tips-card');
  tips.style.display = 'block';
  const title = tips.querySelector('.content-card-title');
  title.tabIndex = -1;
  title.focus({ preventScroll: true });
  tips.scrollIntoView({ block: 'start' });
}

// ── Password analysis engine ──

// Top 50 most-breached passwords - instantly "Weak" regardless of composition
const BREACHED_PASSWORDS = new Set([
  'password','password1','password123','123456','123456789','12345678','1234567',
  '12345','1234567890','qwerty','abc123','monkey','1234','dragon','master',
  'letmein','login','welcome','admin','iloveyou','sunshine','princess','shadow',
  'superman','batman','trustno1','000000','111111','666666','112233','121212',
  'pass','test','1q2w3e','qwerty123','q1w2e3r4','1qaz2wsx','zxcvbnm',
  'password!','password1!','passw0rd','pa$$word','p@ssword','p@$$w0rd',
  'summer2024','winter2024','spring2024','fall2024','welcome1','admin123'
]);

const COMMON_NAMES = new Set([
  'james','john','robert','michael','william','david','richard','joseph','thomas','charles',
  'mary','patricia','jennifer','linda','barbara','elizabeth','susan','jessica','sarah','karen',
  'emma','olivia','noah','liam','sophia','ava','isabella','mia','ethan','mason','lucas','logan',
  'alex','chris','taylor','jordan','morgan','casey','riley','jamie','sam','ryan','tyler'
]);

const COMMON_WORDS = new Set([
  'password','welcome','login','admin','letmein','qwerty','abc','test','user','pass',
  'monkey','dragon','master','sunshine','princess','shadow','superman','batman','iloveyou',
  'trustno','football','baseball','soccer','hockey','basketball','tennis',
  'summer','winter','spring','autumn','january','february','march','april','may','june',
  'july','august','september','october','november','december'
]);

const GEO_WORDS = new Set([
  'america','american','united','states','california','texas','florida','newyork','chicago',
  'london','paris','berlin','tokyo','sydney','canada','mexico','brazil','china','india',
  'australia','england','france','germany','spain','italy','russia','korea','japan',
  'harvard','stanford','yale','mit','ucla','usc','columbia','duke','cornell','oxford',
  'university','college','school','campus'
]);

function analyzePassword() {
  const raw   = document.getElementById('pw-input').value;
  const lower = raw.toLowerCase();

  if (!raw) { resetPasswordUI(); return; }

  // ── Composition ──
  const len        = raw.length;
  const hasLower   = /[a-z]/.test(raw);
  const hasUpper   = /[A-Z]/.test(raw);
  const hasNumber  = /[0-9]/.test(raw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(raw);
  const charTypes  = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  // ── Weakness flags ──
  const warnings = [];

  // Breached password list check (rainbow table simulation)
  if (BREACHED_PASSWORDS.has(lower)) {
    warnings.push({ icon:'💀', text:'This exact password (or a close variant) appears in breach databases - attackers try these first, before any other attack. It would be cracked instantly.' });
  }

  // Year pattern 1900–2026
  if (/(?:19|20)\d{2}/.test(raw)) {
    warnings.push({ icon:'📅', text:'Contains a year - attackers\' tools specifically try year patterns (1900–2026) as they\'re extremely common in passwords.' });
  }

  // Student's own name check - split on spaces so "Rohan George" checks both "rohan" and "george"
  const nameParts = studentName.toLowerCase().split(/\s+/).filter(p => p.length >= 3);
  const nameFromUser = nameParts.some(part => lower.includes(part));
  if (nameFromUser) {
    const matchedPart = nameParts.find(part => lower.includes(part));
    warnings.push({ icon:'🪪', text:`Contains part of your own name ("${escapeHTML(matchedPart)}") - personal details are among the first things attackers try, especially if they found your name from a public profile.` });
  }

  // Common name check (generic list, separate from personal name above)
  const nameMatch = !nameFromUser && [...COMMON_NAMES].some(n => lower.includes(n) && n.length >= 4);
  if (nameMatch) {
    warnings.push({ icon:'👤', text:'Contains a common first name - these appear in every dictionary attack wordlist and are tried automatically.' });
  }

  // Common word check
  const wordMatch = [...COMMON_WORDS].some(w => lower.includes(w));
  if (wordMatch) {
    warnings.push({ icon:'📖', text:'Contains a common word or phrase - dictionary attacks target these specifically before trying random combinations.' });
  }

  // Geo/university
  const geoMatch = [...GEO_WORDS].some(w => lower.includes(w));
  if (geoMatch) {
    warnings.push({ icon:'🌍', text:'Contains a city, country, or university name - targeted wordlists include these for attacks aimed at students and professionals.' });
  }

  // Keyboard walk / sequential run
  if (/qwerty|asdf|zxcv|1234|2345|3456|4567|5678|6789|7890|abcd|qazwsx|1qaz|zaq1/.test(lower)) {
    warnings.push({ icon:'⌨️', text:'Contains a keyboard sequence or number run - attackers\' tools try all common keyboard walks automatically.' });
  }

  // Repeated characters
  if (/(.)\1{2,}/.test(raw)) {
    warnings.push({ icon:'🔁', text:'Contains 3+ repeated characters - this drastically reduces effective entropy and is caught by modern cracking rules.' });
  }

  // Only one character type
  if (charTypes === 1) {
    warnings.push({ icon:'🔡', text:'Uses only one character type - mixing cases, numbers, and symbols multiplies the number of possible combinations exponentially.' });
  }

  // Length warnings
  if (len < 8) {
    warnings.push({ icon:'📏', text:'Under 8 characters - brute-forceable in seconds with a consumer GPU, let alone a dedicated cracking rig.' });
  } else if (len < 12) {
    warnings.push({ icon:'📏', text:'Under 12 characters - modern GPU clusters can brute-force 8–11 character passwords. Every additional character makes this exponentially harder.' });
  }

  // ── Score (0–100) ──
  // Length: primary driver. 12+ chars with variety is genuinely strong.
  let score = 0;
  if (len >= 20)      score += 45;
  else if (len >= 16) score += 38;
  else if (len >= 12) score += 30;
  else if (len >= 8)  score += 16;
  else                score += 5;

  // Character variety bonus
  if (charTypes >= 4) score += 30;
  else if (charTypes === 3) score += 20;
  else if (charTypes === 2) score += 10;

  // Unpredictability bonus - reward lengths beyond 12 even with fewer types
  if (len >= 16 && charTypes >= 2) score += 10;
  if (len >= 20 && charTypes >= 2) score += 5;

  // Deduct for each distinct weakness (not cumulative overkill)
  score -= Math.min(warnings.length * 12, 60);

  // Breached password is always Weak regardless
  const isBreached = BREACHED_PASSWORDS.has(lower);
  if (isBreached) score = 0;

  score = Math.max(0, Math.min(100, score));

  // ── Rating ──
  // Strong: 12+ chars, 2+ types, no warnings, not breached
  // A 16-char passphrase with uppercase+lowercase is genuinely strong.
  // A 12-char with upper+lower+number+symbol and no flags is strong.
  let rating, ratingColor, barColor, barWidth;
  if (!isBreached && score >= 50 && len >= 12 && charTypes >= 2 && warnings.length === 0) {
    rating = 'Strong'; ratingColor = '#1a7f78'; barColor = '#1a7f78'; barWidth = '100%';
  } else if (!isBreached && score >= 30 && len >= 8 && warnings.length <= 1) {
    rating = 'Okay';   ratingColor = '#c8922a'; barColor = '#c8922a'; barWidth = `${Math.max(45, score)}%`;
  } else {
    rating = 'Weak';   ratingColor = '#c0392b'; barColor = '#c0392b'; barWidth = `${Math.max(10, Math.min(score, 40))}%`;
  }

  // ── Time to crack estimate ──
  // ponytail: legacy teaching heuristic, not measured security; replace after curriculum review.
  let charSpace = 0;
  if (hasLower)   charSpace += 26;
  if (hasUpper)   charSpace += 26;
  if (hasNumber)  charSpace += 10;
  if (hasSpecial) charSpace += 32;
  charSpace = Math.max(charSpace, 10);

  let combos = Math.pow(charSpace, len);

  // Dictionary/pattern penalty: known patterns reduce effective search space dramatically
  if (isBreached)          combos = 1;
  else if (warnings.length >= 3) combos = combos / 1e9;
  else if (warnings.length === 2) combos = combos / 1e6;
  else if (warnings.length === 1) combos = combos / 1e3;
  combos = Math.max(combos, 1);

  const guessesPerSec = 1e12; // 1 trillion/sec
  const seconds = combos / guessesPerSec;

  let crackTime, crackMethod;
  if (seconds < 0.001)        { crackTime = 'Instantly';                    crackMethod = 'Already in breach databases - no attack needed'; }
  else if (seconds < 1)       { crackTime = 'Under a second';               crackMethod = 'Brute force, basic hardware'; }
  else if (seconds < 60)      { crackTime = `${Math.round(seconds)}s`;      crackMethod = 'Brute force attack'; }
  else if (seconds < 3600)    { crackTime = `${Math.round(seconds/60)} min`; crackMethod = 'Brute force or dictionary attack'; }
  else if (seconds < 86400)   { crackTime = `${Math.round(seconds/3600)} hours`;   crackMethod = 'GPU-accelerated brute force'; }
  else if (seconds < 2.628e6) { crackTime = `${Math.round(seconds/86400)} days`;   crackMethod = 'High-end GPU cluster'; }
  else if (seconds < 3.156e7) { crackTime = `${Math.round(seconds/2.628e6)} months`; crackMethod = 'Distributed cracking'; }
  else if (seconds < 3.156e9) { crackTime = `${Math.round(seconds/3.156e7)} years`;  crackMethod = 'Large-scale distributed attack'; }
  else if (seconds < 3.156e12){ crackTime = `${(seconds/3.156e9).toFixed(0)}k years`; crackMethod = 'Effectively uncrackable with current tech'; }
  else                        { crackTime = 'Millions+ years';               crackMethod = 'Beyond any foreseeable attack'; }

  // ── Render UI ──
  // Meter bar
  document.getElementById('pw-meter-bar').style.width    = barWidth;
  document.getElementById('pw-meter-bar').style.background = barColor;
  document.getElementById('pw-rating-label').textContent  = rating;
  document.getElementById('pw-rating-label').style.color  = ratingColor;

  // Crack time
  document.getElementById('pw-crack-row').style.display  = 'block';
  document.getElementById('pw-crack-time').textContent   = crackTime;
  document.getElementById('pw-crack-time').style.color   = ratingColor;
  document.getElementById('pw-crack-method').textContent = `At 1 trillion guesses/sec - ${crackMethod}`;

  // Composition chips
  const chips = [
    { label: `${len} chars`, active: len >= 12, icon: '📏' },
    { label: 'Lowercase',    active: hasLower,   icon: 'a' },
    { label: 'Uppercase',    active: hasUpper,   icon: 'A' },
    { label: 'Numbers',      active: hasNumber,  icon: '1' },
    { label: 'Symbols',      active: hasSpecial, icon: '#' }
  ];
  document.getElementById('pw-composition').innerHTML = chips.map(c => `
    <div style="
      display:inline-flex;align-items:center;gap:6px;
      padding:5px 12px;border-radius:100px;font-size:12px;font-weight:600;
      background:${c.active ? 'rgba(26,127,120,0.10)' : 'rgba(15,34,64,0.05)'};
      color:${c.active ? 'var(--teal)' : 'var(--locked)'};
      border:1px solid ${c.active ? 'rgba(26,127,120,0.25)' : 'rgba(15,34,64,0.08)'};
      transition:all 0.2s
    ">
      <span style="font-size:10px">${c.active ? '✓' : '○'}</span>${c.icon} ${c.label}
    </div>
  `).join('');

  // Warning flags
  document.getElementById('pw-warnings').innerHTML = warnings.map(w => `
    <div style="
      display:flex;align-items:flex-start;gap:10px;padding:10px 14px;
      background:rgba(192,57,43,0.06);border:1px solid rgba(192,57,43,0.15);
      border-radius:var(--radius-sm);font-size:13px;color:#7a3020;line-height:1.5
    ">
      <span style="flex-shrink:0;margin-top:1px">${w.icon}</span>${w.text}
    </div>
  `).join('');

  // Gate
  const isStrong = rating === 'Strong';
  document.getElementById('pw-gate').style.display = isStrong ? 'block' : 'none';
  const continueBtn = document.getElementById('pw-continue-btn');
  continueBtn.disabled  = !isStrong;
  continueBtn.style.opacity = isStrong ? '1' : '0.4';

  // Input border feedback
  const inp = document.getElementById('pw-input');
  inp.style.borderColor = rating === 'Strong' ? 'var(--teal)' : rating === 'Okay' ? '#c8922a' : 'rgba(192,57,43,0.5)';
}

function resetPasswordUI() {
  document.getElementById('pw-meter-bar').style.width    = '0%';
  document.getElementById('pw-rating-label').textContent = '-';
  document.getElementById('pw-rating-label').style.color = 'var(--slate-light)';
  document.getElementById('pw-crack-row').style.display  = 'none';
  document.getElementById('pw-composition').innerHTML    = '';
  document.getElementById('pw-warnings').innerHTML       = '';
  document.getElementById('pw-gate').style.display       = 'none';
  document.getElementById('pw-continue-btn').disabled    = true;
  document.getElementById('pw-continue-btn').style.opacity = '0.4';
  document.getElementById('pw-input').style.borderColor  = 'rgba(15,34,64,0.15)';
}
