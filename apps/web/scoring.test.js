import test from 'node:test';
import assert from 'node:assert/strict';

import {
  QUESTIONS,
  RESULT_TYPES,
  buildBiasedAnswers,
  scoreAnswers,
} from './scoring.js';

test('question bank has 40 scored questions across four balanced axes', () => {
  assert.equal(QUESTIONS.length, 40);

  const counts = QUESTIONS.reduce((acc, question) => {
    acc[question.axis] = (acc[question.axis] || 0) + 1;
    return acc;
  }, {});

  assert.deepEqual(counts, { EI: 10, SN: 10, TF: 10, JP: 10 });
});

test('result catalog includes all 16 music personality types', () => {
  assert.equal(Object.keys(RESULT_TYPES).length, 16);
  assert.ok(RESULT_TYPES['M-ENFP']);
  assert.ok(RESULT_TYPES['M-ISTJ']);
});

test('scoring produces a high-confidence M-ENFP fixture', () => {
  const result = scoreAnswers(buildBiasedAnswers({ EI: 'E', SN: 'N', TF: 'F', JP: 'P' }));

  assert.equal(result.typeCode, 'M-ENFP');
  assert.equal(result.confidence, 'high');
  assert.equal(result.axes.EI.winner, 'E');
  assert.equal(result.axes.SN.winner, 'N');
  assert.equal(result.axes.TF.winner, 'F');
  assert.equal(result.axes.JP.winner, 'P');
});

test('scoring produces a high-confidence M-ISTJ fixture', () => {
  const result = scoreAnswers(buildBiasedAnswers({ EI: 'I', SN: 'S', TF: 'T', JP: 'J' }));

  assert.equal(result.typeCode, 'M-ISTJ');
  assert.equal(result.confidence, 'high');
});

test('neutral answers produce low confidence and deterministic tie-break letters', () => {
  const answers = Object.fromEntries(QUESTIONS.map((question) => [question.id, 3]));
  const result = scoreAnswers(answers);

  assert.equal(result.typeCode, 'M-ISFP');
  assert.equal(result.confidence, 'low');
  assert.equal(result.axes.EI.tieBreakReason, 'neutral-default');
});

test('missing required answers are rejected', () => {
  const answers = buildBiasedAnswers({ EI: 'E', SN: 'N', TF: 'F', JP: 'P' });
  delete answers.EI01;

  assert.throws(() => scoreAnswers(answers), /Missing answer for EI01/);
});
