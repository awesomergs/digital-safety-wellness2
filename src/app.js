const byId = id => document.getElementById(id);
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
    byId(view).style.display = view === id ? 'block' : 'none';
  }
  document.body.dataset.view = id;
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
    byId('name-error').style.display = 'block';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  studentName = name;
  input.removeAttribute('aria-invalid');
  byId('name-error').style.display = 'none';
  showHub();
}

function renderHub() {
  byId('display-name').textContent = studentName.split(/\s+/)[0];
  const completed = moduleProgress.filter(Boolean).length;
  byId('hub-progress-text').textContent = `${completed} of ${COURSE_MODULES.length} modules completed`;
  byId('modules-grid').innerHTML = COURSE_MODULES.map((module, index) => {
    const done = moduleProgress[index];
    const unlocked = moduleProgress.slice(0, index).every(Boolean);
    const status = done ? 'completed' : unlocked ? 'unlocked' : 'locked';
    const action = done ? 'Review' : 'Start';
    return `
      <div class="module-card ${status}">
        <div class="card-bar"></div>
        <div class="card-inner">
          <div class="card-header">
            <div>
              <div class="module-number">Module ${index + 1}</div>
              <h2>${escapeHTML(module.short)}</h2>
            </div>
            <div class="progress-ring-wrap" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <circle class="ring-bg" cx="24" cy="24" r="18"/>
                <circle class="ring-fill" cx="24" cy="24" r="18" style="stroke-dashoffset:${done ? 0 : 113}"/>
              </svg>
              <div class="ring-icon">${done ? '✓' : unlocked ? index + 1 : '🔒'}</div>
            </div>
          </div>
          <div class="topics">${module.topics.map(topic => `<div class="topic-item"><div class="topic-dot"></div>${escapeHTML(topic)}</div>`).join('')}</div>
          <div class="card-footer">
            <div class="card-meta">
              <div class="meta-pill">⏱ ${escapeHTML(module.time)}</div>
              <div class="meta-pill">📋 ${module.steps.filter(step => step.type === 'scenario').length} scenarios</div>
            </div>
            <button class="card-action" data-action="module" data-index="${index}"
              aria-label="${action} Module ${index + 1}: ${escapeHTML(module.short)}" ${unlocked ? '' : 'disabled'}>
              ${done ? 'Review ↩' : unlocked ? 'Start →' : '🔒 Locked'}
            </button>
          </div>
        </div>
        ${unlocked ? '' : `<div class="lock-overlay"><div class="lock-message">🔒 Complete Module ${index} first</div></div>`}
      </div>`;
  }).join('');

  const allDone = moduleProgress.every(Boolean);
  byId('final-exam-card-inner').className = `module-card ${finalExamPassed ? 'completed' : allDone ? 'unlocked' : 'locked'}`;
  const examButton = byId('exam-card-btn');
  examButton.disabled = !allDone;
  examButton.className = 'card-action';
  examButton.textContent = finalExamPassed ? 'Review ↩' : allDone ? 'Start →' : '🔒 Locked';
  byId('exam-card-status').textContent = finalExamPassed ? 'Passed ✓' : allDone ? 'Ready to take' : `Complete all ${COURSE_MODULES.length} modules to unlock`;
  byId('exam-question-count').textContent = `📋 ${FINAL_EXAM_QUESTIONS.length} questions`;
  byId('exam-lock-overlay').style.display = allDone ? 'none' : 'flex';
  byId('exam-ring-fill').style.strokeDashoffset = finalExamPassed ? '0' : '113';
  byId('completion-banner').style.display = allDone && !finalExamPassed ? 'flex' : 'none';
  byId('cert-ready-banner').style.display = finalExamPassed ? 'flex' : 'none';
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
  byId('module-view-title').textContent = `Module ${index + 1}: ${COURSE_MODULES[index].short}`;
  showView('module-view');
  renderStep();
}

function renderStep() {
  const steps = COURSE_MODULES[currentModule].steps;
  const step = steps[currentStep];
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
  return prevBackableStep() < 0 ? '' : '<button class="btn-nav secondary" data-action="previous-step">← Back</button>';
}

function renderLesson(step) {
  const cards = (step.cards || []).map(card => `
    <div style="background:var(--cream);border-radius:var(--radius-sm);padding:20px 24px;margin-top:20px;border:1px solid rgba(15,34,64,0.08)">
      <div style="font-size:20px;margin-bottom:10px" aria-hidden="true">${card.icon}</div>
      <h3 class="lesson-title" style="font-size:18px">${escapeHTML(card.title)}</h3>
      <div class="lesson-body">${card.body}</div>
      ${card.video ? `<figure style="margin-top:20px">
        <a class="lesson-video-link" href="${escapeHTML(card.video.watchUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Watch: ${escapeHTML(card.video.title)} (opens on YouTube in a new tab)">
          <img class="lesson-video-thumb" loading="lazy" src="${escapeHTML(card.video.thumbnail)}" alt="" />
          <span class="lesson-video-play" aria-hidden="true">▶</span>
        </a>
        <figcaption class="video-caption">${escapeHTML(card.video.title)} - opens on YouTube in a new tab.${card.video.caption ? ' ' + escapeHTML(card.video.caption) : ''}</figcaption>
      </figure>` : ''}
    </div>`).join('');
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge lesson">Lesson</span>
        <h2 class="content-card-title">${escapeHTML(step.title)}</h2>
      </div>
      <div class="content-card-body">
        <span class="lesson-icon" aria-hidden="true">${step.icon}</span>
        <div class="lesson-body">${step.body}</div>
        ${cards}
        <div class="card-nav" style="margin-top:28px">
          ${backBtnHTML()}
          <button class="btn-nav primary" data-action="next-step">Continue →</button>
        </div>
      </div>
    </div>`;
}

function renderScenario(step) {
  const image = step.image ? `
    <figure style="margin:20px 0">
      <img src="${escapeHTML(step.image.src)}" alt="${escapeHTML(step.image.alt)}" loading="lazy" decoding="async"
        style="width:100%;display:block;max-height:400px;object-fit:contain">
      ${step.image.caption ? `<figcaption class="video-caption">${escapeHTML(step.image.caption)}</figcaption>` : ''}
    </figure>` : '';
  byId('step-container').innerHTML = `
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge scenario">${escapeHTML(step.badge || 'Scenario')}</span>
        <h2 class="content-card-title">${escapeHTML(step.title)}</h2>
      </div>
      <div class="content-card-body">
        <div class="scenario-text">${step.text}</div>
        ${image}
        ${step.highlight ? `<div class="scenario-highlight">${step.highlight}</div>` : ''}
        <div class="card-nav">
          ${backBtnHTML()}
          <button class="btn-nav primary" data-action="next-step">What happens next →</button>
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
  const label = multi ? 'Select all that apply' : question.format === 'truefalse' ? 'True or False' : question.format === 'branching' ? 'What would you do?' : 'Choose one';
  const moduleLabel = question.module === 0 ? 'Applied Judgment' : `Module ${question.module}`;
  if (final) setProgress('exam-progress-fill', Math.round(assessment.index / assessment.questions.length * 100));
  container.innerHTML = `
    ${practice ? '' : `<div class="test-header">
      ${final ? '' : `<h2>${escapeHTML(COURSE_MODULES[currentModule].steps[currentStep].title)}</h2>
        <p>Module ${currentModule + 1} · ${assessment.questions.length} questions · Need ${PASS_PERCENT}% to pass</p>`}
      <div class="test-counter">Question ${assessment.index + 1} of ${assessment.questions.length}</div>
      ${final ? `<div class="test-counter">${moduleLabel}</div>` : ''}
    </div>`}
    <div class="content-card">
      <div class="content-card-header">
        <span class="content-type-badge ${practice ? 'question' : 'test'}">${practice ? 'Question' : final ? 'Final Exam' : 'Mini-Test'}</span>
        <h2 class="content-card-title">${label}</h2>
      </div>
      <div class="content-card-body">
        <p class="question-text" id="assessment-prompt" tabindex="-1">${question.question}</p>
        <div class="options-list" role="group" aria-labelledby="assessment-prompt">
          ${question.options.map((option, index) => `
            <button class="option-btn" id="answer-${index}" type="button" data-action="answer" data-index="${index}" ${multi ? 'aria-pressed="false"' : ''}>
              <span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
              <span>${escapeHTML(option.text)}</span>
            </button>`).join('')}
        </div>
        <div class="feedback-box" id="assessment-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
        <div class="card-nav">
          ${multi ? '<button class="btn-nav secondary" id="assessment-submit" data-action="submit-answer" disabled>Submit Answer</button>' : ''}
          <button class="btn-nav primary" id="assessment-next" data-action="assessment-next" hidden>
            ${practice ? 'Continue →' : assessment.index < assessment.questions.length - 1 ? 'Next Question →' : 'See Results →'}
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
  feedback.style.display = 'block';
  feedback.className = `feedback-box ${type === 'hint' ? 'hint' : type === 'correct' ? 'correct-feedback' : 'wrong-feedback'}`;
  const hint = assessmentKind === 'practice' && assessment.question.hint ? assessment.question.hint : 'Not quite - take another look.';
  feedback.innerHTML = type === 'hint'
    ? `<span class="feedback-label">Hint</span>${hint}${multi ? `<br><br>${wrong.length} incorrect selection(s); ${missing.length} correct answer(s) still missing. Remove incorrect choices and select the missing answers.` : ''}`
    : `<span class="feedback-label">${type === 'correct' ? 'Correct' : "Here's why"}</span>${assessment.question.explanation}`;
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
        <div class="score-screen">
          <div class="score-circle">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle class="score-circle-bg" cx="50" cy="50" r="45"/>
              <circle class="score-circle-fill ${result.passed ? 'passing' : 'failing'}" cx="50" cy="50" r="45"
                style="stroke-dashoffset:${283 - 283 * result.percentage / 100}"/>
            </svg>
            <div class="score-number">${result.percentage}%</div>
          </div>
          <h2>${result.passed ? final ? '🎓 Congratulations!' : '🎉 Well done!' : '📚 Not quite yet'}</h2>
          <p>${result.correct} out of ${result.total} correct - ${result.passed
            ? final ? "You've passed the Final Exam! Your certificate is ready." : "You've passed this module. On to the next one!"
            : `You need ${PASS_PERCENT}% to pass. Review the material and try again.`}</p>
          <div class="card-nav" style="justify-content:center">
            ${result.passed
              ? `<button class="btn-nav primary" data-action="${final ? 'certificate' : 'complete-module'}">${final ? 'View My Certificate 🛡️' : `Complete Module ${currentModule + 1} →`}</button>`
              : `<button class="btn-nav secondary" data-action="retake">${final ? 'Retake Final Exam' : 'Retake Mini-Test'}</button>`}
            <button class="btn-nav secondary" data-action="hub">← Back to Modules</button>
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
    <div class="cert-module-item"><div class="cert-check" aria-hidden="true">✓</div><span>${escapeHTML(module.short)}</span></div>`).join('');
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
  credits: showCredits,
  'close-credits': closeCredits,
};

let creditsOpener = null;

function showCredits(button) {
  creditsOpener = button || document.activeElement;
  const overlay = byId('credits-overlay');
  overlay.hidden = false;
  byId('credits-modal').focus();
}

function closeCredits() {
  const overlay = byId('credits-overlay');
  if (overlay.hidden) return;
  overlay.hidden = true;
  creditsOpener?.focus();
  creditsOpener = null;
}

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
byId('credits-overlay').addEventListener('click', event => {
  if (event.target === event.currentTarget) closeCredits();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeCredits();
});
