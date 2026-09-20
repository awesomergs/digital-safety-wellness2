let footprintState = null;
let domainState = null;
let passwordPracticeComplete = false;

function renderFootprintAudit(step) {
  footprintState = { checked: new Set(), items: step.items, submitted: false };
  const group = category => step.items.filter(item => item.category === category).map(item => `
    <div class="footprint-item">
      <label class="footprint-row" for="fp-cb-${item.id}">
        <input type="checkbox" id="fp-cb-${item.id}" data-footprint="${item.id}" aria-describedby="fp-tip-${item.id}">
        <span>${escapeHTML(item.label)}</span>
      </label>
      <div class="footprint-tip" id="fp-tip-${item.id}" hidden>${item.tooltip}</div>
    </div>`).join('');

  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge">${icon('fingerprint')} Private reflection</span>
        <h2 class="content-card-title">Your digital footprint</h2>
      </div>
      <p class="activity-intro">Which of these are part of your digital life? There are no right or wrong answers. Your responses stay in this tab.</p>
      <div class="reflection-summary">
        <strong id="fp-selection-status" role="status" aria-live="polite">0 of ${step.items.length} selected</strong>
        <div class="reflection-counts">
          <span>Active <strong id="fp-active-count">0</strong></span>
          <span>Passive <strong id="fp-passive-count">0</strong></span>
        </div>
      </div>
      <fieldset class="footprint-group">
        <legend>What you share</legend>
        <p>Active footprint</p>
        ${group('active')}
      </fieldset>
      <fieldset class="footprint-group">
        <legend>What gets collected</legend>
        <p>Passive footprint</p>
        ${group('passive')}
      </fieldset>
      <div class="card-nav">
        ${backBtnHTML()}
        <button class="btn-nav primary" data-action="footprint-submit">See my reflection ${icon('arrow-right')}</button>
      </div>
      <section class="activity-result" id="fp-results" hidden aria-labelledby="fp-results-title">
        <p class="eyebrow">Your reflection</p>
        <h2 id="fp-results-title" tabindex="-1">A few things to think about.</h2>
        <div id="fp-results-body"></div>
        <div class="card-nav"><button class="btn-nav primary" data-action="next-step">Continue ${icon('arrow-right')}</button></div>
      </section>
    </div>`;
}

function fpToggle(id) {
  const state = footprintState;
  const checkbox = byId('fp-cb-' + id);
  const tip = byId('fp-tip-' + id);
  if (!state || !checkbox || !tip) return;
  if (checkbox.checked) state.checked.add(id);
  else state.checked.delete(id);
  tip.hidden = !checkbox.checked;
  state.submitted = false;
  byId('fp-results').hidden = true;
  const selected = state.items.filter(item => state.checked.has(item.id));
  byId('fp-selection-status').textContent = `${selected.length} of ${state.items.length} selected`;
  byId('fp-active-count').textContent = selected.filter(item => item.category === 'active').length;
  byId('fp-passive-count').textContent = selected.filter(item => item.category === 'passive').length;
}

function fpSubmit() {
  const state = footprintState;
  if (!state) return;
  state.submitted = true;
  const checked = state.items.filter(item => state.checked.has(item.id));
  const active = checked.filter(item => item.category === 'active');
  const passive = checked.filter(item => item.category === 'passive');
  const highImpact = checked.filter(item => item.weight === 3);
  const takeaways = [];
  if (state.checked.has('a4'))
    takeaways.push('Turn off location tagging on photos before you post, or crop out recognizable landmarks.');
  if (state.checked.has('a7'))
    takeaways.push('Set Instagram and Facebook to require your approval before tagged photos appear on your profile.');
  if (active.some(item => ['a1', 'a3', 'a5'].includes(item.id)))
    takeaways.push('Do a quick Google search of your own name - see what a recruiter, landlord, or stranger would find.');
  if (state.checked.has('p1'))
    takeaways.push('Consider using a search engine that doesn\'t log queries, like DuckDuckGo, for sensitive searches.');
  if (state.checked.has('p3'))
    takeaways.push('Audit your app permissions this week: Settings → Privacy - revoke location and camera access for apps that don\'t genuinely need them.');
  if (state.checked.has('p8'))
    takeaways.push('Install a browser extension like uBlock Origin - it blocks most tracking scripts before they load.');
  if (state.checked.has('p7'))
    takeaways.push('On public Wi-Fi, stick to HTTPS sites only - look for the padlock icon in the address bar.');
  takeaways.push('The question isn\'t "how do I disappear?" - it\'s "am I making deliberate choices?" You can\'t undo the past, but you can change what you do next.');

  byId('fp-results-title').textContent = checked.length ? 'A few things to think about.' : 'Nothing selected.';
  byId('fp-results-body').innerHTML = `
    <p class="lesson-body">${checked.length
      ? 'These are the activities you recognized, not a score of your safety. Start with one change that matters to you.'
      : 'You can revisit the checklist or continue. This reflection does not measure your safety online.'}</p>
    <p class="reflection-result-summary">${checked.length} of ${state.items.length} selected &middot; ${active.length} active &middot; ${passive.length} passive</p>
    ${highImpact.map(item => `<section class="lesson-section"><h3 class="lesson-title">${escapeHTML(item.label)}</h3><div class="lesson-body">${item.tooltip}</div></section>`).join('')}
    ${state.checked.has('p6') ? `<section class="lesson-section">
      <h3 class="lesson-title">You selected a known data breach</h3>
      <p class="lesson-body">Check <a href="https://haveibeenpwned.com" target="_blank" rel="noopener">haveibeenpwned.com</a> for breaches involving your email address. This course does not check breach records.</p>
    </section>` : ''}
    <section class="reflection-takeaways">
      <h3>Possible next steps</h3>
      <ul class="lesson-list">${takeaways.map(text => `<li>${text}</li>`).join('')}</ul>
    </section>`;
  byId('fp-results').hidden = false;
  byId('fp-results-title').focus({ preventScroll: true });
  byId('fp-results').scrollIntoView({ block: 'start' });
}

function renderDomainQuiz(step) {
  domainState = { items: shuffle(step.items), current: 0, correct: 0, answered: false };
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge">${icon('mail')} Put it into practice</span>
        <h2 class="content-card-title">Spot the suspicious domain</h2>
      </div>
      <p class="activity-intro">Is this the expected domain or a lookalike?</p>
      <div id="dq-exercise">
        <div class="activity-position">
          <span id="dq-counter"></span>
          <div class="round-track" id="dq-progress" role="progressbar" aria-label="Completed domain rounds" aria-valuemin="0" aria-valuemax="${step.items.length}" aria-valuenow="0"></div>
        </div>
        <div class="sender-panel" id="dq-card">
          <div class="sender-toolbar"><span>${icon('mail')} Sender details</span><span class="meta-text">Practice email</span></div>
          <div class="sender-body">
            <span class="eyebrow">From</span>
            <p class="sender-address" id="dq-address" tabindex="-1"></p>
          </div>
        </div>
        <div class="domain-choices" id="dq-buttons" role="group" aria-label="Your verdict">
          <button class="domain-choice" data-action="domain-answer" data-choice="real">${icon('check')} Looks legitimate</button>
          <button class="domain-choice" data-action="domain-answer" data-choice="fake">${icon('flag')} Looks suspicious</button>
        </div>
        <p class="field-note">Domain-pattern practice, not a check of an email's authenticity.</p>
        <div id="dq-feedback" class="feedback-box" role="status" aria-live="polite" aria-atomic="true"></div>
        <div class="card-nav">
          ${backBtnHTML()}
          <div id="dq-next-wrap" hidden><button id="dq-next-btn" data-action="domain-next" class="btn-nav primary">Next address ${icon('arrow-right')}</button></div>
        </div>
      </div>
      <section id="dq-results" class="activity-result" hidden aria-labelledby="dq-results-title">
        <p class="eyebrow">Practice complete</p>
        <h2 id="dq-results-title" tabindex="-1">A closer look pays off.</h2>
        <div id="dq-score-area"></div>
        <section class="lesson-section">
          <h3 class="lesson-title">The rules for reading email domains</h3>
          <div class="lesson-points">
            <div><h4 class="lesson-point-title">The real domain is the last part before the first slash</h4>
              <p class="lesson-body">In <em>accounts.google.com/login</em>, the domain is google.com. In <em>google.com.verify-login.net</em>, the domain is verify-login.net.</p></div>
            <div><h4 class="lesson-point-title">Subdomains are fine - lookalike domains aren't</h4>
              <p class="lesson-body">accounts.google.com is Google. google-accounts.com is not.</p></div>
            <div><h4 class="lesson-point-title">Watch for character swaps</h4>
              <p class="lesson-body">0 for O, 1 for l, rn for m. Read the full address character by character if something feels off.</p></div>
            <div><h4 class="lesson-point-title">"Secure", "help", "alert", "support" in a domain means nothing</h4>
              <p class="lesson-body">Anyone can register those words. The brand name has to be the actual domain, not just part of a longer string.</p></div>
            <div><h4 class="lesson-point-title">When in doubt - don't click</h4>
              <p class="lesson-body">Open a new tab, go directly to the company's website, and log in from there.</p></div>
          </div>
        </section>
        <div class="card-nav">${backBtnHTML()}<button class="btn-nav primary" data-action="next-step">Continue ${icon('arrow-right')}</button></div>
      </section>
    </div>`;
  dqRender();
}

function dqRender() {
  const state = domainState;
  const item = state.items[state.current];
  state.answered = false;
  const at = item.address.indexOf('@') + 1;
  byId('dq-address').innerHTML = `<span>${escapeHTML(item.address.slice(0, at))}</span><strong>${escapeHTML(item.address.slice(at))}</strong>`;
  byId('dq-counter').textContent = `Round ${state.current + 1} of ${state.items.length}`;
  byId('dq-progress').setAttribute('aria-valuenow', state.current);
  byId('dq-progress').innerHTML = state.items.map((_, index) => `<span class="round-mark ${index < state.current ? 'is-complete' : index === state.current ? 'is-current' : ''}" aria-hidden="true"></span>`).join('');
  byId('dq-feedback').replaceChildren();
  byId('dq-next-wrap').hidden = true;
  document.querySelectorAll('#dq-buttons button').forEach(button => {
    button.disabled = false;
    button.className = 'domain-choice';
  });
}

function dqAnswer(choice) {
  const state = domainState;
  if (!state || state.answered || !['real', 'fake'].includes(choice)) return;
  state.answered = true;
  const item = state.items[state.current];
  const correct = choice === item.verdict;
  if (correct) state.correct++;
  document.querySelectorAll('#dq-buttons button').forEach(button => {
    button.disabled = true;
    if (button.dataset.choice === choice) button.classList.add('is-picked', correct ? 'is-correct' : 'is-incorrect');
  });
  const feedback = byId('dq-feedback');
  feedback.className = `feedback-box ${correct ? 'correct-feedback' : 'wrong-feedback'}`;
  feedback.innerHTML = `
    <span class="feedback-label">${icon(correct ? 'check' : 'book-open')} ${correct ? 'You got it.' : 'Take a closer look.'}</span>
    <p><strong>${item.verdict === 'real' ? 'Expected domain' : 'Suspicious domain'}</strong></p>
    <p>${escapeHTML(item.blurb)}</p>
    ${item.flags.length ? `<ul class="domain-flags">${item.flags.map(flag => `<li>${escapeHTML(flag)}</li>`).join('')}</ul>` : ''}`;
  byId('dq-next-wrap').hidden = false;
  byId('dq-next-btn').innerHTML = `${state.current === state.items.length - 1 ? 'See results' : 'Next address'} ${icon('arrow-right')}`;
  feedback.tabIndex = -1;
  feedback.focus({ preventScroll: true });
}

function dqNext() {
  const state = domainState;
  if (!state || !state.answered || state.current >= state.items.length) return;
  state.current++;
  if (state.current >= state.items.length) dqShowResults();
  else {
    dqRender();
    byId('dq-address').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function dqShowResults() {
  const { correct, items } = domainState;
  byId('dq-exercise').hidden = true;
  byId('dq-results').hidden = false;
  byId('dq-score-area').innerHTML = `<p class="result-count">${correct} / ${items.length}</p>
    <p class="lesson-body">${correct === items.length ? 'You recognized every domain pattern in this round.' : 'Each explanation is a chance to notice one more detail next time.'} Keep these checks in mind.</p>`;
  byId('dq-results-title').focus({ preventScroll: true });
  byId('dq-results').scrollIntoView({ block: 'start' });
}

function renderPasswordLab() {
  passwordPracticeComplete = false;
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge">${icon('key-round')} Put it into practice</span>
        <h2 class="content-card-title">Password lab</h2>
      </div>
      <p class="activity-intro">Try an invented password. Notice how length, variety, and recognizable patterns affect this exercise's rating.</p>
      <div class="practice-notice">${icon('circle-alert')}<p><strong>Never enter a real password.</strong> This is a teaching exercise, not a security assessment or a live breach check.</p></div>
      <label class="field-label" for="pw-input">Practice password</label>
      <div class="password-field" id="pw-field">
        <input type="password" id="pw-input" placeholder="An invented password" maxlength="128" autocomplete="new-password" spellcheck="false" autocapitalize="off" aria-describedby="pw-help">
        <button class="icon-button" data-action="password-visibility" id="pw-eye" aria-label="Show practice password" aria-pressed="false" title="Show practice password">${icon('eye')}</button>
      </div>
      <p class="field-note" id="pw-help">Only this tab processes what you type. Nothing is saved or sent.</p>
      <div class="password-meter" id="pw-meter">
        <div class="password-meter-label"><span>Exercise rating</span><strong id="pw-rating-label" role="status">Not rated</strong></div>
        <div class="progress-track" role="progressbar" aria-label="Password exercise rating" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="progress-fill" id="pw-meter-bar"></div>
        </div>
      </div>
      <div class="password-composition" id="pw-composition"></div>
      <details class="password-estimate" id="pw-crack-row" hidden>
        <summary>Demonstration estimate ${icon('chevron-down')}</summary>
        <p class="estimate-value" id="pw-crack-time"></p>
        <p id="pw-crack-method"></p>
        <p>This simplified model is not a prediction of how long a real password would resist an attack.</p>
      </details>
      <div class="password-warnings" id="pw-warnings"></div>
      <div class="password-ready" id="pw-gate" hidden>${icon('check')}
        <p><strong>Exercise target reached.</strong>Keep the technique, not this password. Do not use this practice password on any account.</p>
      </div>
      <div class="card-nav">
        ${backBtnHTML()}
        <button class="btn-nav primary" id="pw-continue-btn" data-action="password-tips" disabled>Continue to tips ${icon('arrow-right')}</button>
      </div>
      <section class="activity-result" id="pw-tips-card" hidden aria-labelledby="pw-tips-title">
        <p class="eyebrow">Take it with you</p>
        <h2 id="pw-tips-title" tabindex="-1">Making passwords actually stick</h2>
        <p class="lesson-body">Here are the techniques that make a password strong <em>and</em> memorable - without resorting to predictable patterns:</p>
        <section class="lesson-section">
          <h3 class="lesson-title">Techniques that actually work</h3>
          <ul class="lesson-list">
            <li><strong>Use a passphrase - then make it yours</strong> - string three or four genuinely unrelated words together and add a number or symbol between them: <em>correct-horse-battery-staple</em> becomes <em>Correct!Horse#Battery99</em> - long, hard to brute-force, and easier to remember than a random string. The length alone does most of the work.</li>
            <li><strong>Lead with a special character or number</strong> - most people add symbols at the end (Password1!). Putting one at the front or middle - <em>!MyDogRan2019</em> - breaks the predictable patterns cracking tools expect. Not a substitute for length, but a meaningful addition.</li>
            <li><strong>Avoid obvious substitutions as your only strategy</strong> - swapping a for @ or e for 3 is a known technique that cracking tools account for explicitly. "P@ssw0rd" is in breach databases. These substitutions can help as one element of a longer password, but they're not strong on their own.</li>
            <li><strong>Length beats complexity</strong> - a 16-character passphrase with just lowercase letters has more entropy than an 8-character password with symbols. Prioritize length first, then add variety.</li>
          </ul>
        </section>
        <section class="lesson-section">
          <h3 class="lesson-title">The real answer: just use a password manager</h3>
          <p class="lesson-body">No manual technique beats a randomly generated 20-character password you never have to remember or type. Password managers generate, store, and auto-fill credentials for every account - and they protect them properly. Your passwords are stored in an <strong>encrypted vault</strong>: even if the password manager company's servers were breached, the data is mathematically scrambled without your master password. Here are the most reputable free options:</p>
          <ul class="lesson-list">
            <li><strong><a href="https://bitwarden.com" target="_blank" rel="noopener">Bitwarden</a></strong> - fully open-source (independently audited), free forever, works on every device and browser. The most reputable free option for most people. Uses AES-256 encryption. Can be self-hosted if you want full control over your vault.</li>
            <li><strong><a href="https://keepassxc.org" target="_blank" rel="noopener">KeePassXC</a></strong> - stores your encrypted vault entirely locally - no cloud, no company servers, no subscription. Completely free and open-source. Best if you're privacy-focused and primarily use one device.</li>
            <li><strong>Apple Passwords / iCloud Keychain</strong> - built into every iPhone, iPad, and Mac. Free, end-to-end encrypted, and deeply integrated - generates and fills passwords automatically in Safari and most apps. Strong choice if you're in the Apple ecosystem.</li>
            <li><strong>Google Password Manager</strong> - built into Chrome and Android, free, and encrypted. Generates and saves strong passwords automatically. Good option if you're already in the Google ecosystem and use Chrome across devices.</li>
          </ul>
          <p class="support-note"><strong>The bottom line:</strong> pick any one of these and start using it today. Even using a password manager for just your most important accounts - email, banking, university login - is a massive improvement over reusing passwords.</p>
        </section>
        <div class="card-nav">${backBtnHTML()}<button class="btn-nav primary" data-action="next-step">Continue ${icon('arrow-right')}</button></div>
      </section>
    </div>`;
}

function togglePwVisibility() {
  const input = byId('pw-input');
  const button = byId('pw-eye');
  input.type = input.type === 'password' ? 'text' : 'password';
  const visible = input.type === 'text';
  const label = visible ? 'Hide practice password' : 'Show practice password';
  button.innerHTML = icon(visible ? 'eye-off' : 'eye');
  button.setAttribute('aria-pressed', String(visible));
  button.setAttribute('aria-label', label);
  button.title = label;
}

function showPasswordTips() {
  if (byId('pw-continue-btn').disabled) return;
  passwordPracticeComplete = true;
  byId('pw-tips-card').hidden = false;
  byId('pw-tips-title').focus({ preventScroll: true });
  byId('pw-tips-card').scrollIntoView({ block: 'start' });
}

// Retained teaching word lists and rating rules; these are not a live breach lookup.
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
  const raw = byId('pw-input').value;
  const lower = raw.toLowerCase();
  if (!raw) { resetPasswordUI(); return; }

  const len = raw.length;
  const hasLower = /[a-z]/.test(raw);
  const hasUpper = /[A-Z]/.test(raw);
  const hasNumber = /[0-9]/.test(raw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(raw);
  const charTypes = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  const warnings = [];
  if (BREACHED_PASSWORDS.has(lower))
    warnings.push('This exact password (or a close variant) appears in breach databases - attackers try these first, before any other attack. It would be cracked instantly.');
  if (/(?:19|20)\d{2}/.test(raw))
    warnings.push('Contains a year - attackers\' tools specifically try year patterns (1900–2026) as they\'re extremely common in passwords.');

  const nameParts = studentName.toLowerCase().split(/\s+/).filter(part => part.length >= 3);
  const nameFromUser = nameParts.some(part => lower.includes(part));
  if (nameFromUser) {
    const matchedPart = nameParts.find(part => lower.includes(part));
    warnings.push(`Contains part of your own name ("${escapeHTML(matchedPart)}") - personal details are among the first things attackers try, especially if they found your name from a public profile.`);
  }
  if (!nameFromUser && [...COMMON_NAMES].some(name => lower.includes(name) && name.length >= 4))
    warnings.push('Contains a common first name - these appear in every dictionary attack wordlist and are tried automatically.');
  if ([...COMMON_WORDS].some(word => lower.includes(word)))
    warnings.push('Contains a common word or phrase - dictionary attacks target these specifically before trying random combinations.');
  if ([...GEO_WORDS].some(word => lower.includes(word)))
    warnings.push('Contains a city, country, or university name - targeted wordlists include these for attacks aimed at students and professionals.');
  if (/qwerty|asdf|zxcv|1234|2345|3456|4567|5678|6789|7890|abcd|qazwsx|1qaz|zaq1/.test(lower))
    warnings.push('Contains a keyboard sequence or number run - attackers\' tools try all common keyboard walks automatically.');
  if (/(.)\1{2,}/.test(raw))
    warnings.push('Contains 3+ repeated characters - this drastically reduces effective entropy and is caught by modern cracking rules.');
  if (charTypes === 1)
    warnings.push('Uses only one character type - mixing cases, numbers, and symbols multiplies the number of possible combinations exponentially.');
  if (len < 8)
    warnings.push('Under 8 characters - brute-forceable in seconds with a consumer GPU, let alone a dedicated cracking rig.');
  else if (len < 12)
    warnings.push('Under 12 characters - modern GPU clusters can brute-force 8–11 character passwords. Every additional character makes this exponentially harder.');

  let score = len >= 20 ? 45 : len >= 16 ? 38 : len >= 12 ? 30 : len >= 8 ? 16 : 5;
  score += charTypes >= 4 ? 30 : charTypes === 3 ? 20 : charTypes === 2 ? 10 : 0;
  if (len >= 16 && charTypes >= 2) score += 10;
  if (len >= 20 && charTypes >= 2) score += 5;
  score -= Math.min(warnings.length * 12, 60);
  const isBreached = BREACHED_PASSWORDS.has(lower);
  if (isBreached) score = 0;
  score = Math.max(0, Math.min(100, score));

  let rating, percentage;
  if (!isBreached && score >= 50 && len >= 12 && charTypes >= 2 && warnings.length === 0) {
    rating = 'Strong'; percentage = 100;
  } else if (!isBreached && score >= 30 && len >= 8 && warnings.length <= 1) {
    rating = 'Okay'; percentage = Math.max(45, score);
  } else {
    rating = 'Weak'; percentage = Math.max(10, Math.min(score, 40));
  }

  // ponytail: legacy teaching heuristic, not measured security; replace after curriculum review.
  let charSpace = 0;
  if (hasLower) charSpace += 26;
  if (hasUpper) charSpace += 26;
  if (hasNumber) charSpace += 10;
  if (hasSpecial) charSpace += 32;
  charSpace = Math.max(charSpace, 10);
  let combos = Math.pow(charSpace, len);
  if (isBreached) combos = 1;
  else if (warnings.length >= 3) combos /= 1e9;
  else if (warnings.length === 2) combos /= 1e6;
  else if (warnings.length === 1) combos /= 1e3;
  const seconds = Math.max(combos, 1) / 1e12;
  let crackTime;
  if (seconds < 0.001) crackTime = 'Instantly';
  else if (seconds < 1) crackTime = 'Under a second';
  else if (seconds < 60) crackTime = `${Math.round(seconds)}s`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} min`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 2.628e6) crackTime = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 3.156e7) crackTime = `${Math.round(seconds / 2.628e6)} months`;
  else if (seconds < 3.156e9) crackTime = `${Math.round(seconds / 3.156e7)} years`;
  else if (seconds < 3.156e12) crackTime = `${(seconds / 3.156e9).toFixed(0)}k years`;
  else crackTime = 'Millions+ years';

  byId('pw-field').dataset.rating = rating;
  byId('pw-meter').dataset.rating = rating;
  setProgress('pw-meter-bar', percentage);
  byId('pw-rating-label').textContent = rating;
  byId('pw-meter-bar').parentElement.setAttribute('aria-valuetext', rating);
  byId('pw-crack-row').hidden = false;
  byId('pw-crack-time').textContent = crackTime;
  byId('pw-crack-method').textContent = 'Legacy model output at a fixed 1 trillion guesses per second.';
  const composition = [
    { label: `${len} characters`, active: len >= 12, description: len >= 12 ? 'exercise length target met' : 'below the 12-character exercise target' },
    { label: 'Lowercase', active: hasLower },
    { label: 'Uppercase', active: hasUpper },
    { label: 'Numbers', active: hasNumber },
    { label: 'Symbols', active: hasSpecial },
  ];
  byId('pw-composition').innerHTML = composition.map(item => `
    <span class="composition-item" data-active="${item.active}">${item.active ? icon('check') : '<span aria-hidden="true">&minus;</span>'}${item.label}<span class="sr-only">, ${item.description || (item.active ? 'present' : 'missing')}</span></span>`).join('');
  byId('pw-warnings').innerHTML = warnings.map(text => `<p class="password-warning">${icon('circle-alert')}<span>${text}</span></p>`).join('');
  byId('pw-gate').hidden = rating !== 'Strong';
  byId('pw-continue-btn').disabled = rating !== 'Strong';
}

function resetPasswordUI() {
  setProgress('pw-meter-bar', 0);
  byId('pw-meter-bar').parentElement.setAttribute('aria-valuetext', 'Not rated');
  byId('pw-rating-label').textContent = 'Not rated';
  delete byId('pw-meter').dataset.rating;
  delete byId('pw-field').dataset.rating;
  byId('pw-crack-row').hidden = true;
  byId('pw-composition').replaceChildren();
  byId('pw-warnings').replaceChildren();
  byId('pw-gate').hidden = true;
  byId('pw-continue-btn').disabled = true;
}
