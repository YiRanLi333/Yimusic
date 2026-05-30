import { QUESTIONS, buildBiasedAnswers, scoreAnswers } from './scoring.js';

const DRAFT_KEY = 'yimusic-demo-answers-v1';
const LABELS = [
  ['1', 'Strongly unlike me'],
  ['2', 'Somewhat unlike me'],
  ['3', 'Not sure'],
  ['4', 'Somewhat like me'],
  ['5', 'Strongly like me'],
];

const state = {
  index: 0,
  answers: loadDraft(),
};

const screens = {
  start: document.querySelector('#start-screen'),
  test: document.querySelector('#test-screen'),
  result: document.querySelector('#result-screen'),
};

const els = {
  startButton: document.querySelector('#start-button'),
  sampleButton: document.querySelector('#sample-button'),
  backToStart: document.querySelector('#back-to-start'),
  progressTitle: document.querySelector('#progress-title'),
  progressFill: document.querySelector('#progress-fill'),
  questionFacet: document.querySelector('#question-facet'),
  questionText: document.querySelector('#question-text'),
  answerOptions: document.querySelector('#answer-options'),
  previousButton: document.querySelector('#previous-button'),
  nextButton: document.querySelector('#next-button'),
  restartButton: document.querySelector('#restart-button'),
  resultCode: document.querySelector('#result-code'),
  resultName: document.querySelector('#result-name'),
  resultTagline: document.querySelector('#result-tagline'),
  resultSummary: document.querySelector('#result-summary'),
  resultAdvice: document.querySelector('#result-advice'),
  confidencePill: document.querySelector('#confidence-pill'),
  axisBreakdown: document.querySelector('#axis-breakdown'),
};

function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state.answers));
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

function startTest() {
  const firstMissing = QUESTIONS.findIndex((question) => !(question.id in state.answers));
  state.index = firstMissing >= 0 ? firstMissing : 0;
  showScreen('test');
  renderQuestion();
}

function renderQuestion() {
  const question = QUESTIONS[state.index];
  const progress = ((state.index + 1) / QUESTIONS.length) * 100;
  els.progressTitle.textContent = `Question ${state.index + 1} of ${QUESTIONS.length}`;
  els.progressFill.style.width = `${progress}%`;
  els.questionFacet.textContent = `${question.axis} · ${question.facet.replaceAll('_', ' ')}`;
  els.questionText.textContent = question.text;
  els.answerOptions.innerHTML = '';

  for (const [value, label] of LABELS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-button';
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', String(state.answers[question.id] === Number(value)));
    button.dataset.selected = String(state.answers[question.id] === Number(value));
    button.innerHTML = `<span>${value}</span><strong>${label}</strong>`;
    button.addEventListener('click', () => {
      state.answers[question.id] = Number(value);
      saveDraft();
      renderQuestion();
    });
    els.answerOptions.appendChild(button);
  }

  els.previousButton.disabled = state.index === 0;
  els.nextButton.disabled = !(question.id in state.answers);
  els.nextButton.textContent = state.index === QUESTIONS.length - 1 ? 'See result' : 'Next';
}

function nextQuestion() {
  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }
  renderResult(scoreAnswers(state.answers));
}

function previousQuestion() {
  if (state.index > 0) {
    state.index -= 1;
    renderQuestion();
  }
}

function renderResult(result) {
  showScreen('result');
  els.resultCode.textContent = result.typeCode;
  els.resultName.textContent = result.result.name;
  els.resultTagline.textContent = result.result.tagline;
  els.resultSummary.textContent = result.result.summary;
  els.resultAdvice.textContent = buildAdvice(result);
  els.confidencePill.textContent = `${result.confidence.toUpperCase()} CONFIDENCE`;
  els.confidencePill.dataset.confidence = result.confidence;
  els.axisBreakdown.innerHTML = '';

  for (const [axisName, axis] of Object.entries(result.axes)) {
    const row = document.createElement('article');
    row.className = 'axis-row';
    row.innerHTML = `
      <div class="axis-meta">
        <strong>${axisName}</strong>
        <span>${axis.leftPole} ${axis.leftPercent}% · ${axis.rightPole} ${axis.rightPercent}%</span>
      </div>
      <div class="axis-line" aria-hidden="true">
        <i style="left: ${axis.rightPole === axis.winner ? axis.rightPercent : axis.leftPercent}%"></i>
      </div>
      <div class="axis-winner">${axis.winner}</div>
    `;
    els.axisBreakdown.appendChild(row);
  }
}

function buildAdvice(result) {
  const lowAxes = Object.entries(result.axes)
    .filter(([, axis]) => axis.confidence === 'low')
    .map(([axisName]) => axisName);
  if (lowAxes.length > 0) {
    return `Your ${lowAxes.join(', ')} axis is flexible. Retake the test on a different day or compare your result with a friend's listening habits.`;
  }
  return 'Save this result, share it with someone who knows your playlists, then try building a playlist that exaggerates your opposite letters.';
}

function resetTest() {
  state.index = 0;
  state.answers = {};
  localStorage.removeItem(DRAFT_KEY);
  showScreen('start');
}

els.startButton.addEventListener('click', startTest);
els.sampleButton.addEventListener('click', () => renderResult(scoreAnswers(buildBiasedAnswers({ EI: 'E', SN: 'N', TF: 'F', JP: 'P' }))));
els.backToStart.addEventListener('click', () => showScreen('start'));
els.previousButton.addEventListener('click', previousQuestion);
els.nextButton.addEventListener('click', nextQuestion);
els.restartButton.addEventListener('click', resetTest);
