import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script, createContext, runInContext } from 'node:vm';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const html = read('digital-safety-wellness.html');
const context = createContext({});
const source = [
  ...[1, 2, 3, 4].map(number => read(`src/curriculum/module-${number}.js`)),
  read('src/curriculum/final-exam.js'),
  read('src/course.js'),
].join('\n');
runInContext(source, context);
const api = runInContext(`({
  modules: COURSE_MODULES,
  exam: FINAL_EXAM_QUESTIONS,
  Assessment,
  validate: validateCurriculum,
  shuffle,
  escapeHTML,
})`, context);

const question = format => ({
  format,
  question: 'Which choices are correct?',
  options: format === 'truefalse'
    ? [{ text: 'True', correct: true }, { text: 'False', correct: false }]
    : [
        { text: 'First', correct: true },
        { text: 'Second', correct: format === 'multiselect' },
        { text: 'Third', correct: false },
      ],
  explanation: 'The explanation.',
});

function assessment(questions) {
  assert.equal(typeof api.Assessment, 'function', 'one shared assessment module must exist');
  return new api.Assessment(questions);
}

test('every authored step has a supported renderer', () => {
  const types = ['lesson', 'scenario', 'question', 'interactive', 'minitest'];
  for (const [index, module] of api.modules.entries()) {
    for (const [stepIndex, step] of module.steps.entries()) {
      assert.ok(types.includes(step.type), `Module ${index + 1}, step ${stepIndex + 1}: missing/unknown type`);
    }
  }
});

test('curriculum validation rejects incomplete authoring before distribution', () => {
  assert.equal(typeof api.validate, 'function');
  assert.doesNotThrow(() => api.validate(api.modules, api.exam));
  const modules = structuredClone(api.modules);
  delete modules[1].steps[0].type;
  assert.throws(() => api.validate(modules, api.exam), /module 2.*step 1/i);
  const exam = structuredClone(api.exam);
  exam[0].options.forEach(option => { option.correct = false; });
  assert.throws(() => api.validate(api.modules, exam), /correct answer/i);
});

test('true/false has one attempt and cannot earn credit by elimination', () => {
  const run = assessment([question('truefalse')]);
  run.select(1);
  assert.equal(run.answered, true);
  assert.equal(run.result.correct, 0);
  run.select(0);
  run.submit();
  assert.equal(run.result.correct, 0);
  assert.equal(run.result.answered, 1);
});

test('select-all followed by an unchanged resubmission fails', () => {
  for (const q of api.exam.filter(item => item.format === 'multiselect')) {
    const run = assessment([q]);
    q.options.forEach((_, index) => run.select(index));
    run.submit();
    assert.equal(run.answered, false);
    run.submit();
    assert.equal(run.answered, true);
    assert.equal(run.result.correct, 0);
    assert.equal(run.result.passed, false);
  }
});

test('multiselect retry requires removing wrong picks and adding missing ones', () => {
  const run = assessment([question('multiselect')]);
  run.select(0);
  run.select(2);
  run.submit();
  run.select(0);
  assert.equal(run.selected.has(0), true, 'correct picks stay locked during retry');
  run.select(2);
  run.select(1);
  run.submit();
  assert.equal(run.result.correct, 1);
  run.submit();
  assert.equal(run.result.answered, 1, 'replayed submissions cannot add credit');
});

test('empty and invalid choices do not consume an attempt or advance', () => {
  const run = assessment([question('multiselect')]);
  run.submit();
  for (const index of [-1, 3, NaN, '0']) run.select(index);
  assert.equal(run.attempts, 0);
  assert.equal(run.next(), false);
  assert.equal(run.index, 0);
  assert.equal(run.result.answered, 0);
});

test('single-choice retries cannot repeat a rejected option', () => {
  const run = assessment([question('multiple')]);
  run.select(2);
  run.select(2);
  assert.equal(run.attempts, 1);
  run.select(0);
  assert.equal(run.result.correct, 1);
});

test('80 percent only passes a fully answered assessment', () => {
  const run = assessment(Array.from({ length: 5 }, () => question('truefalse')));
  for (let index = 0; index < 4; index++) {
    run.select(0);
    assert.equal(run.result.passed, false);
    assert.equal(run.next(), true);
  }
  run.select(1);
  assert.equal(run.result.percentage, 80);
  assert.equal(run.result.passed, true);
  assert.equal(run.next(), false);
  assert.equal(run.next(), false);
  assert.equal(run.result.answered, 5);
});

test('shuffle preserves inputs and uses deterministic Fisher-Yates swaps', () => {
  assert.equal(typeof api.shuffle, 'function');
  const input = [1, 2, 3, 4];
  assert.deepEqual(Array.from(api.shuffle(input, () => 0)), [2, 3, 4, 1]);
  assert.deepEqual(input, [1, 2, 3, 4]);
});

test('learner text is escaped before insertion in rich feedback', () => {
  assert.equal(typeof api.escapeHTML, 'function');
  assert.equal(api.escapeHTML('<img src=x onerror="alert(1)"> & \''),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;');
});

test('learner artifact has no debug shortcuts, inline handlers, or PDF scripts', () => {
  assert.equal(/devModeUnlocked|toggleDevMode|DEV: Last Q/.test(html), false, 'no learner-facing debug bypass');
  assert.equal(/\bon(?:click|input|change|mouseover|mouseout|keydown)=/.test(html), false, 'no inline event handlers');
  assert.equal(/<script[^>]+src=/.test(html), false, 'no remote runtime scripts');
  const start = html.indexOf('<script>');
  assert.notEqual(start, -1);
  const script = html.slice(start + '<script>'.length, html.lastIndexOf('</script>'));
  assert.doesNotThrow(() => new Script(script));
});
