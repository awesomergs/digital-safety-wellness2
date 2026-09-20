const byId = id => document.getElementById(id);
const icon = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`;
const MODULE_ICONS = ['mail', 'fingerprint', 'key-round', 'flag'];
let studentName = '';
const moduleProgress = COURSE_MODULES.map(() => false);
let finalExamPassed = false;
let currentModule = null;
let currentStep = 0;
let assessment = null;
let assessmentKind = null;

function focusContent(container) {
  const target = container.querySelector('.question-text') || container.querySelector('h1, h2, .content-card-title');
  if (target) {
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
  window.scrollTo(0, 0);
}

function showView(id) {
  for (const view of ['name-gate-section', 'module-hub', 'module-view', 'final-exam-view', 'cert-view']) {
    byId(view).hidden = view !== id;
  }
  document.body.dataset.view = id;
  byId('course-rail').hidden = !['module-view', 'final-exam-view'].includes(id);
  byId('header-learner').hidden = !studentName;
  byId('header-learner').textContent = studentName;
  renderOutline();
  if (id !== 'module-view') {
    byId('step-container').replaceChildren();
    footprintState = null;
    domainState = null;
    passwordPracticeComplete = false;
  }
  if (id !== 'final-exam-view') byId('exam-container').replaceChildren();
}

function setProgress(id, percentage) {
  const fill = byId(id);
  fill.style.transform = `scaleX(${percentage / 100})`;
  fill.parentElement.setAttribute('aria-valuenow', String(percentage));
}

function startTraining() {
  const input = byId('student-name-input');
  const name = input.value.trim();
  if (!name || name.length > 60) {
    byId('name-error').hidden = false;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  studentName = name;
  input.removeAttribute('aria-invalid');
  byId('name-error').hidden = true;
  showHub();
}

function moduleRows(preview = false) {
  return COURSE_MODULES.map((module, index) => {
    const done = moduleProgress[index];
    const unlocked = moduleProgress.slice(0, index).every(Boolean);
    const status = done ? 'completed' : unlocked ? 'ready' : 'locked';
    const action = done ? 'Review' : 'Start';
    const activity = module.steps.find(step => step.type === 'interactive');
    const practice = {
      'domain-quiz': 'Spot the suspicious domain',
      'footprint-audit': 'Reflect on your digital footprint',
      'password-lab': 'Try the password lab',
    }[activity?.subtype] || `${module.steps.filter(step => step.type === 'scenario').length} real-world scenarios`;
    return `
      <li class="module-row" data-module="${index + 1}">
        <span class="module-symbol">${icon(MODULE_ICONS[index])}</span>
        <div>
          <div class="module-row-top">
            <span class="module-number">Module 0${index + 1} &middot; ${escapeHTML(module.time)}</span>
            ${preview ? '' : `<span class="module-state ${status}">${done ? `${icon('check')} Complete` : unlocked ? 'Up next' : `${icon('lock-keyhole')} After Module ${index}`}</span>`}
          </div>
          <h3>${escapeHTML(module.short)}</h3>
          <p class="module-topics">${module.topics.map(escapeHTML).join(' &middot; ')}</p>
          <div class="module-row-bottom">
            <span class="activity-meta">${icon('list-checks')} ${practice}</span>
            ${preview ? '' : `<button class="btn-nav ${done || !unlocked ? 'secondary' : 'primary'}" data-action="module" data-index="${index}"
              aria-label="${action} Module ${index + 1}: ${escapeHTML(module.short)}" ${unlocked ? '' : 'disabled'}>
              ${done ? `Review ${icon('rotate-ccw')}` : unlocked ? `Start ${icon('arrow-right')}` : `${icon('lock-keyhole')} Locked`}
            </button>`}
          </div>
        </div>
      </li>`;
  }).join('');
}

function renderOutline() {
  byId('rail-modules').innerHTML = COURSE_MODULES.map((module, index) => {
    const current = currentModule === index && document.body.dataset.view === 'module-view';
    const done = moduleProgress[index];
    const unlocked = moduleProgress.slice(0, index).every(Boolean);
    return `<li class="rail-module" ${current ? 'aria-current="step"' : ''}>
      <span class="rail-number" aria-hidden="true">${done ? icon('check') : String(index + 1).padStart(2, '0')}</span>
      <span><span class="rail-title">${escapeHTML(module.short)}</span>
        <span class="rail-status">${current ? 'In progress' : done ? 'Complete' : unlocked ? 'Ready to start' : 'Locked'}</span></span>
    </li>`;
  }).join('');
}

function renderHub() {
  byId('display-name').textContent = studentName.split(/\s+/)[0];
  const completed = moduleProgress.filter(Boolean).length;
  byId('hub-progress-text').textContent = `${completed} of ${COURSE_MODULES.length} complete`;
  byId('hub-completed-count').textContent = completed;
  setProgress('hub-progress-fill', completed / COURSE_MODULES.length * 100);
  byId('modules-grid').innerHTML = moduleRows();
  const allDone = moduleProgress.every(Boolean);
  const examButton = byId('exam-card-btn');
  examButton.disabled = !allDone;
  examButton.className = `btn-nav ${allDone && !finalExamPassed ? 'primary' : 'secondary'}`;
  examButton.innerHTML = finalExamPassed ? `Retake ${icon('rotate-ccw')}` : allDone ? `Start assessment ${icon('arrow-right')}` : `${icon('lock-keyhole')} Locked`;
  byId('exam-card-status').textContent = finalExamPassed ? 'Passed' : allDone ? 'Ready when you are' : `Complete all ${COURSE_MODULES.length} modules to unlock`;
  byId('exam-question-count').textContent = `${FINAL_EXAM_QUESTIONS.length} questions`;
  byId('completion-banner').hidden = !allDone || finalExamPassed;
  byId('cert-ready-banner').hidden = !finalExamPassed;
}

function showHub() {
  assessment = null;
  assessmentKind = null;
  currentModule = null;
  renderHub();
  showView('module-hub');
  focusContent(byId('module-hub'));
}

function openModule(index) {
  if (!studentName || !Number.isInteger(index) || !COURSE_MODULES[index] || !moduleProgress.slice(0, index).every(Boolean)) return;
  currentModule = index;
  currentStep = 0;
  byId('module-number').textContent = `Module 0${index + 1}`;
  byId('module-view-title').textContent = COURSE_MODULES[index].short;
  showView('module-view');
  renderStep();
}

function renderStep() {
  const steps = COURSE_MODULES[currentModule].steps;
  const step = steps[currentStep];
  byId('step-position').textContent = `Step ${currentStep + 1} of ${steps.length}`;
  byId('step-kind').textContent = { lesson: 'Lesson', scenario: 'Scenario', question: 'Practice', interactive: 'Hands-on activity', minitest: 'Module check-in' }[step.type];
  setProgress('module-progress-fill', Math.round(currentStep / steps.length * 100));
  assessment = null;
  assessmentKind = null;
  switch (step.type) {
    case 'lesson': renderLesson(step); break;
    case 'scenario': renderScenario(step); break;
    case 'question': startAssessment('practice', [step]); break;
    case 'minitest': startAssessment('mini', step.questions); break;
    case 'interactive':
      if (step.subtype === 'domain-quiz') renderDomainQuiz(step);
      if (step.subtype === 'footprint-audit') renderFootprintAudit(step);
      if (step.subtype === 'password-lab') renderPasswordLab();
      break;
  }
  focusContent(byId('step-container'));
}

function nextStep() {
  if (currentModule === null) return;
  const steps = COURSE_MODULES[currentModule].steps;
  const step = steps[currentStep];
  if (step.type === 'question' && !assessment?.answered) return;
  if (step.type === 'minitest') return;
  if (step.subtype === 'domain-quiz' && (!domainState || domainState.current < domainState.items.length)) return;
  if (step.subtype === 'footprint-audit' && !footprintState?.submitted) return;
  if (step.subtype === 'password-lab' && !passwordPracticeComplete) return;
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  }
}

function prevBackableStep() {
  if (currentModule === null || currentStep === 0) return -1;
  const previous = currentStep - 1;
  return ['question', 'minitest'].includes(COURSE_MODULES[currentModule].steps[previous].type) ? -1 : previous;
}

function prevStep() {
  const previous = prevBackableStep();
  if (previous < 0) return;
  currentStep = previous;
  renderStep();
}

function backBtnHTML() {
  return prevBackableStep() < 0 ? '' : `<button class="btn-nav secondary" data-action="previous-step">${icon('arrow-left')} Back</button>`;
}

function renderLesson(step) {
  const cards = (step.cards || []).map(card => `
    <section class="lesson-section">
      ${card.title === step.title ? '' : `<h3 class="lesson-title">${escapeHTML(card.title)}</h3>`}
      <div class="lesson-body">${card.body}</div>
      ${card.video ? `<figure class="lesson-figure">
        <iframe class="lesson-video" loading="lazy" src="${escapeHTML(card.video.src)}" title="${escapeHTML(card.video.title)}"
          allow="encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        ${card.video.caption ? `<figcaption class="video-caption">${escapeHTML(card.video.caption)}</figcaption>` : ''}
      </figure>` : ''}
    </section>`).join('');
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge lesson">${icon('book-open')} Lesson</span>
        <h2 class="content-card-title">${escapeHTML(step.title)}</h2>
      </div>
      <div class="content-card-body">
        <div class="lesson-body">${step.body}</div>
        ${cards}
        <div class="card-nav">
          ${backBtnHTML()}
          <button class="btn-nav primary" data-action="next-step">Continue ${icon('arrow-right')}</button>
        </div>
      </div>
    </div>`;
}

function renderScenario(step) {
  const image = step.image ? `
    <figure class="scenario-image">
      <img src="${escapeHTML(step.image.src)}" alt="${escapeHTML(step.image.alt)}" loading="lazy" decoding="async">
      ${step.image.caption ? `<figcaption class="video-caption">${escapeHTML(step.image.caption)}</figcaption>` : ''}
    </figure>` : '';
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge scenario">${icon('mail')} ${escapeHTML(step.badge || 'Scenario')}</span>
        <h2 class="content-card-title">${escapeHTML(step.title)}</h2>
      </div>
      <div class="content-card-body">
        <div class="scenario-text">${step.text}</div>
        ${image}
        ${step.highlight ? `<blockquote class="scenario-highlight">${step.highlight}</blockquote>` : ''}
        <div class="card-nav">
          ${backBtnHTML()}
          <button class="btn-nav primary" data-action="next-step">What would you do? ${icon('arrow-right')}</button>
        </div>
      </div>
    </div>`;
}

function startAssessment(kind, questions) {
  assessmentKind = kind;
  assessment = new Assessment(questions);
  renderAssessmentQuestion();
}

function renderAssessmentQuestion() {
  const question = assessment.question;
  const multi = question.format === 'multiselect';
  const final = assessmentKind === 'final';
  const practice = assessmentKind === 'practice';
  const container = byId(final ? 'exam-container' : 'step-container');
  const label = multi ? 'Select all that apply' : question.format === 'truefalse' ? 'True or false' : 'Choose one answer';
  const moduleLabel = question.module === 0 ? 'Applied Judgment' : `Module ${question.module}`;
  if (final) {
    setProgress('exam-progress-fill', Math.round(assessment.index / assessment.questions.length * 100));
    byId('exam-position').textContent = `Question ${assessment.index + 1} of ${assessment.questions.length}`;
  }
  container.innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge ${practice ? 'question' : 'test'}">${icon('list-checks')} ${practice ? 'Put it into practice' : final ? moduleLabel : 'Module check-in'}</span>
        ${!practice && !final ? `<p class="meta-text">${escapeHTML(COURSE_MODULES[currentModule].steps[currentStep].title)} &middot; ${PASS_PERCENT}% to pass</p>` : ''}
      </div>
      <div class="content-card-body">
        <div class="assessment-meta"><span id="assessment-instruction">${label}</span>${!practice ? `<span>Question ${assessment.index + 1} / ${assessment.questions.length}</span>` : ''}</div>
        <h2 class="question-text" id="assessment-prompt" tabindex="-1">${question.question}</h2>
        <div class="options-list" role="group" aria-labelledby="assessment-prompt" aria-describedby="assessment-instruction">
          ${question.options.map((option, index) => `
            <button class="option-btn" id="answer-${index}" type="button" data-action="answer" data-index="${index}" ${multi ? 'aria-pressed="false"' : ''}>
              <span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
              <span class="option-copy">${escapeHTML(option.text)}<span class="option-status" hidden></span></span>
            </button>`).join('')}
        </div>
        <div class="feedback-box" id="assessment-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
        <div class="card-nav">
          ${multi ? `<button class="btn-nav primary" id="assessment-submit" data-action="submit-answer" disabled>Check answers ${icon('check')}</button>` : ''}
          <button class="btn-nav primary" id="assessment-next" data-action="assessment-next" hidden>
            ${practice ? 'Continue' : assessment.index < assessment.questions.length - 1 ? 'Next question' : 'See results'} ${icon('arrow-right')}
          </button>
        </div>
      </div>
    </div>`;
  focusContent(container);
}

function updateAssessment() {
  const multi = assessment.question.format === 'multiselect';
  assessment.question.options.forEach((option, index) => {
    const button = byId(`answer-${index}`);
    const selected = assessment.selected.has(index);
    button.className = 'option-btn';
    if (multi) button.setAttribute('aria-pressed', String(selected));
    button.disabled = assessment.answered || assessment.locked.has(index) || (!multi && assessment.rejected.has(index));
    if (assessment.answered) {
      button.classList.add(option.correct ? 'correct' : selected ? 'incorrect' : 'dimmed');
    } else if (assessment.locked.has(index)) {
      button.classList.add('correct');
    } else if (selected) {
      button.classList.add(assessment.rejected.has(index) ? 'incorrect' : 'selected');
    }
    const status = button.querySelector('.option-status');
    status.textContent = button.classList.contains('correct') ? 'Correct answer'
      : button.classList.contains('incorrect') ? assessment.answered ? 'Your answer' : multi ? 'Remove this choice' : 'Try another answer'
      : '';
    status.hidden = !status.textContent;
    button.querySelector('.option-letter').innerHTML = button.classList.contains('correct') ? icon('check')
      : button.classList.contains('incorrect') ? icon('circle-alert') : String.fromCharCode(65 + index);
  });
  const submit = byId('assessment-submit');
  if (submit) {
    submit.hidden = assessment.answered;
    submit.disabled = assessment.selected.size === 0;
  }
  byId('assessment-next').hidden = !assessment.answered;
  if (!assessment.feedback) return;
  const { type, wrong, missing } = assessment.feedback;
  const feedback = byId('assessment-feedback');
  feedback.className = `feedback-box ${type === 'hint' ? 'hint' : type === 'correct' ? 'correct-feedback' : 'wrong-feedback'}`;
  const hint = assessmentKind === 'practice' && assessment.question.hint ? assessment.question.hint : 'Not quite - take another look.';
  feedback.innerHTML = type === 'hint'
    ? `<span class="feedback-label">${icon('circle-alert')} Take another look</span>${hint}${multi ? `<p class="feedback-detail">${wrong.length} incorrect selection(s); ${missing.length} correct answer(s) still missing. Remove incorrect choices and select the missing answers.</p>` : ''}`
    : `<span class="feedback-label">${icon(type === 'correct' ? 'check' : 'book-open')}${type === 'correct' ? 'You got it.' : "Here's why."}</span>${assessment.question.explanation}`;
  if (assessment.answered) {
    feedback.tabIndex = -1;
    feedback.focus({ preventScroll: true });
  }
}

function advanceAssessment() {
  if (!assessment?.answered) return;
  if (assessmentKind === 'practice') return nextStep();
  if (assessment.next()) renderAssessmentQuestion();
  else showAssessmentResults();
}

function showAssessmentResults() {
  const result = assessment.result;
  if (result.answered !== result.total) return;
  const final = assessmentKind === 'final';
  if (final && result.passed) finalExamPassed = true;
  setProgress(final ? 'exam-progress-fill' : 'module-progress-fill', 100);
  const container = byId(final ? 'exam-container' : 'step-container');
  container.innerHTML = `
    <div class="content-card">
      <div class="content-card-body">
        <div class="score-screen" data-passed="${result.passed}">
          <span class="content-type-badge">${icon(result.passed ? 'award' : 'book-open')} ${final ? 'Final assessment' : 'Module check-in'} complete</span>
          <div class="score-number">${result.percentage}%</div>
          <h2>${result.passed ? final ? 'You earned it.' : 'One step more confident.' : 'A little more practice.'}</h2>
          <p>${result.correct} out of ${result.total} correct - ${result.passed
            ? final ? "You've passed the Final Exam! Your certificate is ready." : "You've passed this module. On to the next one!"
            : `You need ${PASS_PERCENT}% to pass. Review the material and try again.`}</p>
          <div class="card-nav">
            ${result.passed
              ? `<button class="btn-nav primary" data-action="${final ? 'certificate' : 'complete-module'}">${final ? 'View certificate' : `Complete Module ${currentModule + 1}`} ${icon('arrow-right')}</button>`
              : `<button class="btn-nav primary" data-action="retake">${icon('rotate-ccw')} ${final ? 'Retake assessment' : 'Try the check-in again'}</button>`}
            <button class="btn-nav secondary" data-action="hub">All modules</button>
          </div>
        </div>
      </div>
    </div>`;
  focusContent(container);
}

function completeModule() {
  if (assessmentKind !== 'mini' || !assessment?.result.passed || currentModule === null) return;
  moduleProgress[currentModule] = true;
  showHub();
}

function startFinalExam() {
  if (!studentName || !moduleProgress.every(Boolean)) return;
  showView('final-exam-view');
  startAssessment('final', FINAL_EXAM_QUESTIONS);
}

function showCertificate() {
  if (!finalExamPassed || !moduleProgress.every(Boolean)) return;
  byId('cert-name').textContent = studentName;
  byId('cert-modules-list').innerHTML = COURSE_MODULES.map(module => `
    <li class="cert-module-item">${icon('check')}<span>${escapeHTML(module.short)}</span></li>`).join('');
  byId('cert-date').textContent = `Completed ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
  showView('cert-view');
  focusContent(byId('cert-view'));
}

const actions = {
  hub: showHub,
  module: button => openModule(Number(button.dataset.index)),
  'next-step': nextStep,
  'previous-step': prevStep,
  answer: button => { if (assessment?.select(Number(button.dataset.index))) updateAssessment(); },
  'submit-answer': () => { if (assessment?.submit()) updateAssessment(); },
  'assessment-next': advanceAssessment,
  'complete-module': completeModule,
  'start-exam': startFinalExam,
  retake: () => assessmentKind === 'final' ? startFinalExam() : renderStep(),
  certificate: showCertificate,
  'print-certificate': () => { if (finalExamPassed && document.body.dataset.view === 'cert-view') window.print(); },
  'domain-answer': button => dqAnswer(button.dataset.choice),
  'domain-next': dqNext,
  'footprint-submit': fpSubmit,
  'password-visibility': togglePwVisibility,
  'password-tips': showPasswordTips,
};

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (button && !button.disabled && Object.hasOwn(actions, button.dataset.action)) actions[button.dataset.action](button);
});
byId('name-form').addEventListener('submit', event => {
  event.preventDefault();
  startTraining();
});
document.addEventListener('input', event => {
  if (event.target.id === 'pw-input') analyzePassword();
});
document.addEventListener('change', event => {
  if (event.target.matches('input[data-footprint]')) fpToggle(event.target.dataset.footprint);
});

byId('course-preview').innerHTML = moduleRows(true);
const desktopOutline = window.matchMedia('(min-width: 801px)');
byId('course-outline').open = desktopOutline.matches;
desktopOutline.addEventListener('change', event => { byId('course-outline').open = event.matches; });
