export const POSTTEST_PASS_THRESHOLD = 8;

export function isPassed(score, type) {
  if (type === 'posttest') return score >= POSTTEST_PASS_THRESHOLD;
  return false;
}

export function scoreAnswers(questions, answers) {
  const answerMap = new Map();
  for (const a of answers ?? []) {
    if (a && a.questionId != null) answerMap.set(String(a.questionId), Number(a.selectedOption));
  }

  let score = 0;
  const details = questions.map((q) => {
    const selected = answerMap.has(String(q.id)) ? answerMap.get(String(q.id)) : null;
    const isCorrect = selected !== null && selected === Number(q.kunci);
    if (isCorrect) score += 1;
    return { questionId: q.id, selectedOption: selected, isCorrect };
  });

  return { score, total: questions.length, details };
}

export function evaluate(questions, answers, type) {
  const { score, total, details } = scoreAnswers(questions, answers);
  return { score, total, passed: isPassed(score, type), details };
}

export default { POSTTEST_PASS_THRESHOLD, isPassed, scoreAnswers, evaluate };
