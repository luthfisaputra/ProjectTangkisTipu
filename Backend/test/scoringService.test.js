import test from 'node:test';
import assert from 'node:assert/strict';
import {
  scoreAnswers,
  evaluate,
  isPassed,
  POSTTEST_PASS_THRESHOLD,
} from '../src/services/scoringService.js';

const questions = [
  { id: 'q1', kunci: 0 },
  { id: 'q2', kunci: 2 },
  { id: 'q3', kunci: 1 },
];

test('scoreAnswers menghitung jawaban benar', () => {
  const { score, total, details } = scoreAnswers(questions, [
    { questionId: 'q1', selectedOption: 0 },
    { questionId: 'q2', selectedOption: 2 },
    { questionId: 'q3', selectedOption: 0 },
  ]);
  assert.equal(score, 2);
  assert.equal(total, 3);
  assert.equal(details[2].isCorrect, false);
});

test('scoreAnswers menangani jawaban kosong', () => {
  const { score, details } = scoreAnswers(questions, []);
  assert.equal(score, 0);
  assert.equal(details.every((d) => d.selectedOption === null), true);
});

test('isPassed posttest lulus jika skor >= 8', () => {
  assert.equal(isPassed(POSTTEST_PASS_THRESHOLD, 'posttest'), true);
  assert.equal(isPassed(7, 'posttest'), false);
  assert.equal(isPassed(10, 'pretest'), false);
});

test('evaluate mengembalikan passed sesuai tipe', () => {
  const qs = Array.from({ length: 10 }, (_, i) => ({ id: `q${i}`, kunci: 1 }));
  const answers = qs.map((q, i) => ({ questionId: q.id, selectedOption: i < 8 ? 1 : 0 }));
  const res = evaluate(qs, answers, 'posttest');
  assert.equal(res.score, 8);
  assert.equal(res.passed, true);
});
