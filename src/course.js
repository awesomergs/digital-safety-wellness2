const COURSE_MODULES = [MODULE_1, MODULE_2, MODULE_3, MODULE_4];
const PASS_PERCENT = 80;

function escapeHTML(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function shuffle(values, random = Math.random) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function requireContent(condition, location, message) {
  if (!condition) throw new Error(`${location}: ${message}`);
}

function requireText(value, location, field) {
  requireContent(typeof value === 'string' && value.trim().length > 0, location, `${field} must be nonempty text`);
}

function validateQuestion(question, location) {
  requireContent(question && typeof question === 'object', location, 'question must be an object');
  requireContent(['multiple', 'branching', 'multiselect', 'truefalse'].includes(question.format), location, 'unknown question format');
  requireText(question.question, location, 'question');
  requireText(question.explanation, location, 'explanation');
  requireContent(Array.isArray(question.options) && question.options.length >= 2, location, 'at least two options required');
  for (const option of question.options) {
    requireText(option.text, location, 'option text');
    requireContent(typeof option.correct === 'boolean', location, 'option.correct must be a boolean');
  }
  const correctCount = question.options.filter(option => option.correct).length;
  requireContent(question.format === 'multiselect' ? correctCount > 0 : correctCount === 1, location, 'invalid number of correct answers');
  requireContent(question.format !== 'truefalse' || question.options.length === 2, location, 'true/false needs two options');
}

function validateCurriculum(modules, exam) {
  requireContent(Array.isArray(modules) && modules.length > 0, 'Course', 'modules are required');
  modules.forEach((module, index) => {
    const location = `Module ${index + 1}`;
    for (const field of ['title', 'short', 'time']) requireText(module[field], location, field);
    requireContent(Array.isArray(module.topics) && module.topics.length > 0, location, 'topics are required');
    module.topics.forEach(topic => requireText(topic, location, 'topic'));
    requireContent(Array.isArray(module.steps) && module.steps.length > 0, location, 'steps are required');
    requireContent(module.steps.at(-1).type === 'minitest', location, 'last step must be a mini-test');
    requireContent(module.steps.filter(step => step.type === 'minitest').length === 1, location, 'exactly one mini-test required');
    module.steps.forEach((step, stepIndex) => {
      const at = `${location}, step ${stepIndex + 1}`;
      requireContent(['lesson', 'scenario', 'question', 'interactive', 'minitest'].includes(step.type), at, 'missing/unknown step type');
      if (step.type === 'question') validateQuestion(step, at);
      if (step.type === 'minitest') {
        requireText(step.title, at, 'title');
        requireContent(Array.isArray(step.questions) && step.questions.length > 0, at, 'questions are required');
        step.questions.forEach((question, number) => validateQuestion(question, `${at}, question ${number + 1}`));
      }
      if (step.type === 'lesson' || step.type === 'scenario') {
        requireText(step.title, at, 'title');
        requireText(step.type === 'lesson' ? step.body : step.text, at, 'body');
        if (step.image) {
          requireText(step.image.src, at, 'image source');
          requireText(step.image.alt, at, 'image alt text');
        }
        for (const card of step.cards || []) {
          requireText(card.title, at, 'card title');
          requireText(card.body, at, 'card body');
          if (card.video) {
            requireContent(/^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]+$/.test(card.video.src), at, 'video must use a YouTube privacy-enhanced embed URL');
            requireText(card.video.title, at, 'video title');
          }
        }
      }
      if (step.type === 'interactive') {
        requireContent(['domain-quiz', 'footprint-audit', 'password-lab'].includes(step.subtype), at, 'unknown activity');
        if (step.subtype === 'password-lab') return;
        requireContent(Array.isArray(step.items) && step.items.length > 0, at, 'activity items are required');
        const ids = new Set();
        for (const item of step.items) {
          if (step.subtype === 'domain-quiz') {
            requireText(item.address, at, 'address');
            requireText(item.blurb, at, 'blurb');
            requireContent(['real', 'fake'].includes(item.verdict), at, 'unknown domain verdict');
            requireContent(Array.isArray(item.flags), at, 'flags must be an array');
            item.flags.forEach(flag => requireText(flag, at, 'flag'));
          } else {
            requireContent(/^[a-z][a-z0-9-]*$/.test(item.id) && !ids.has(item.id), at, 'item IDs must be safe and unique');
            ids.add(item.id);
            requireContent(['active', 'passive'].includes(item.category), at, 'unknown footprint category');
            requireContent([1, 2, 3].includes(item.weight), at, 'weight must be 1, 2, or 3');
            requireText(item.label, at, 'label');
            requireText(item.tooltip, at, 'tooltip');
          }
        }
      }
    });
  });
  requireContent(Array.isArray(exam) && exam.length > 0, 'Final exam', 'questions are required');
  exam.forEach((question, index) => {
    const at = `Final exam, question ${index + 1}`;
    validateQuestion(question, at);
    requireContent(Number.isInteger(question.module) && question.module >= 0 && question.module <= modules.length, at, 'unknown module reference');
  });
}

// All three question contexts use the same retry and scoring rules.
class Assessment {
  constructor(questions) {
    requireContent(Array.isArray(questions) && questions.length > 0, 'Assessment', 'questions are required');
    questions.forEach((question, index) => validateQuestion(question, `Assessment question ${index + 1}`));
    this.questions = shuffle(questions);
    this.answers = [];
    this.index = 0;
    this.#resetQuestion();
  }

  #resetQuestion() {
    this.selected = new Set();
    this.locked = new Set();
    this.rejected = new Set();
    this.attempts = 0;
    this.answered = false;
    this.feedback = null;
  }

  get question() { return this.questions[this.index]; }

  select(index) {
    if (this.answered || !Number.isInteger(index) || index < 0 || index >= this.question.options.length || this.locked.has(index)) return false;
    if (this.question.format === 'multiselect') {
      if (this.selected.has(index)) this.selected.delete(index);
      else this.selected.add(index);
    } else {
      if (this.rejected.has(index)) return false;
      this.selected = new Set([index]);
      this.submit();
    }
    return true;
  }

  submit() {
    if (this.answered || this.selected.size === 0) return false;
    const wrong = [...this.selected].filter(index => !this.question.options[index].correct);
    const missing = this.question.options.flatMap((option, index) => option.correct && !this.selected.has(index) ? [index] : []);
    const correct = wrong.length === 0 && missing.length === 0;
    this.attempts++;
    this.answered = correct || this.attempts >= (this.question.format === 'truefalse' ? 1 : 2);
    this.feedback = { type: correct ? 'correct' : this.answered ? 'wrong' : 'hint', wrong, missing };
    if (this.answered) {
      this.answers[this.index] = correct;
    } else {
      for (const index of this.selected) {
        if (this.question.options[index].correct) this.locked.add(index);
        else this.rejected.add(index);
      }
    }
    return true;
  }

  next() {
    if (!this.answered || this.index >= this.questions.length - 1) return false;
    this.index++;
    this.#resetQuestion();
    return true;
  }

  get result() {
    const total = this.questions.length;
    const answered = this.answers.length;
    const correct = this.answers.filter(Boolean).length;
    const percentage = Math.round(correct / total * 100);
    return { total, answered, correct, percentage, passed: answered === total && correct / total * 100 >= PASS_PERCENT };
  }
}
