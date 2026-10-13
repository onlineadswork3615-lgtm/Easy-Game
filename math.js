/* ============================================
   MATH BLITZ - GAME LOGIC
   ============================================ */

// ---------- DOM ELEMENTS ----------
const startScreen     = document.getElementById('startScreen');
const gameScreen      = document.getElementById('gameScreen');
const gameOverScreen  = document.getElementById('gameOverScreen');

const startBtn        = document.getElementById('startBtn');
const restartBtn      = document.getElementById('restartBtn');
const homeBtn         = document.getElementById('homeBtn');
const backBtn         = document.getElementById('backBtn');

const levelDisplay    = document.getElementById('levelDisplay');
const scoreDisplay    = document.getElementById('scoreDisplay');
const timerDisplay    = document.getElementById('timerDisplay');
const timerBar        = document.getElementById('timerBar');
const questionText    = document.getElementById('questionText');
const optionsGrid     = document.getElementById('optionsGrid');
const streakText      = document.getElementById('streakText');
const feedback        = document.getElementById('feedback');

const bestScoreStart  = document.getElementById('bestScoreStart');
const finalScore      = document.getElementById('finalScore');
const finalLevel      = document.getElementById('finalLevel');
const finalBest       = document.getElementById('finalBest');
const newRecordBadge  = document.getElementById('newRecordBadge');

// ---------- STATE ----------
let score = 0;
let level = 1;
let streak = 0;
let correctAnswer = 0;
let totalTime = 60;
let timeLeft = 60;
let gameActive = false;
let timerInterval = null;
let questionsAnswered = 0;

let bestScore = parseInt(localStorage.getItem('mathBlitzBest') || '0');
bestScoreStart.textContent = bestScore;

// ---------- SCREEN SWITCHER ----------
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ---------- HELPERS ----------
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------- QUESTION GENERATOR (UNLIMITED LEVELS) ----------
function generateQuestion() {
  let a, b, op, answer;
  let customQ = null;

  if (level <= 3) {
    a = randInt(1, 10); b = randInt(1, 10);
    op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) [a, b] = [b, a];
    answer = op === '+' ? a + b : a - b;

  } else if (level <= 7) {
    a = randInt(1, 20); b = randInt(1, 20);
    op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) [a, b] = [b, a];
    answer = op === '+' ? a + b : a - b;

  } else if (level <= 12) {
    const type = randInt(0, 2);
    if (type === 0) { a = randInt(2, 12); b = randInt(2, 12); op = '×'; answer = a * b; }
    else if (type === 1) { a = randInt(10, 50); b = randInt(10, 50); op = '+'; answer = a + b; }
    else { a = randInt(20, 99); b = randInt(1, 20); op = '-'; answer = a - b; }

  } else if (level <= 20) {
    const type = randInt(0, 3);
    if (type === 0) { a = randInt(2, 15); b = randInt(2, 15); op = '×'; answer = a * b; }
    else if (type === 1) { b = randInt(2, 12); answer = randInt(2, 12); a = b * answer; op = '÷'; }
    else if (type === 2) { a = randInt(50, 200); b = randInt(50, 200); op = '+'; answer = a + b; }
    else { a = randInt(50, 200); b = randInt(1, 50); op = '-'; answer = a - b; }

  } else {
    const type = randInt(0, 2);
    if (type === 0) {
      a = randInt(5, 20); b = randInt(2, 10);
      const c = randInt(1, 30);
      answer = a * b + c;
      customQ = `${a} × ${b} + ${c} = ?`;
    } else if (type === 1) {
      b = randInt(2, 9); answer = randInt(2, 12); a = b * answer; op = '÷';
    } else {
      a = randInt(100, 500); b = randInt(50, 200); op = '-'; answer = a - b;
    }
  }

  correctAnswer = answer;
  if (customQ) return customQ;
  return `${a} ${op} ${b} = ?`;
}

// ---------- WRONG ANSWER GENERATOR ----------
function generateOptions(correct) {
  const opts = new Set();
  opts.add(correct);

  let attempts = 0;
  while (opts.size < 4 && attempts < 50) {
    attempts++;
    let offset = randInt(1, 10);
    if (Math.random() < 0.5) offset = -offset;
    const wrong = correct + offset;
    if (wrong >= 0 && wrong !== correct) opts.add(wrong);
  }

  // Fallback if not enough
  while (opts.size < 4) {
    opts.add(randInt(0, correct + 20));
  }

  return shuffle([...opts]);
}

// ---------- RENDER QUESTION ----------
function renderQuestion() {
  const question = generateQuestion();
  questionText.textContent = question;
  questionText.style.animation = 'none';
  void questionText.offsetWidth;
  questionText.style.animation = 'questionPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';

  const options = generateOptions(correctAnswer);

  optionsGrid.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.textContent = options[i];
    btn.dataset.value = options[i];
    btn.classList.remove('correct', 'wrong');
  });
}

// ---------- OPTION CLICK ----------
optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!gameActive) return;
    if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

    const selected = parseInt(btn.dataset.value);
    if (selected === correctAnswer) {
      handleCorrect(btn);
    } else {
      handleWrong(btn);
    }
  });
});

// ---------- CORRECT ----------
function handleCorrect(btn) {
  btn.classList.add('correct');
  streak++;
  questionsAnswered++;

  const basePoints = 10 + level;
  const streakBonus = Math.min(streak, 10) * 2;
  const points = basePoints + streakBonus;
  score += points;

  scoreDisplay.textContent = score;
  streakText.textContent = `🔥 Streak: ${streak}`;
  showFeedback('✅', '#00f260');

  if (streak % 5 === 0) {
    level++;
    levelDisplay.textContent = level;
    showFeedback('⭐ LEVEL UP!', '#ffe259');
    timeLeft = Math.min(timeLeft + 3, totalTime);
  }

  setTimeout(() => {
    if (gameActive) renderQuestion();
  }, 300);
}

// ---------- WRONG ----------
function handleWrong(btn) {
  btn.classList.add('wrong');
  streak = 0;
  questionsAnswered++;
  streakText.textContent = `🔥 Streak: 0`;

  optionsGrid.querySelectorAll('.option-btn').forEach(b => {
    if (parseInt(b.dataset.value) === correctAnswer) {
      b.classList.add('correct');
    }
  });

  timeLeft = Math.max(0, timeLeft - 2);
  showFeedback('❌', '#ff5e62');

  setTimeout(() => {
    if (gameActive) renderQuestion();
  }, 700);
}

// ---------- FEEDBACK ----------
function showFeedback(text, color) {
  feedback.textContent = text;
  feedback.style.color = color;
  feedback.classList.remove('hidden');
  feedback.style.animation = 'none';
  void feedback.offsetWidth;
  feedback.style.animation = 'feedbackPop 0.8s ease-out forwards';
  setTimeout(() => feedback.classList.add('hidden'), 800);
}

// ---------- TIMER ----------
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft < 0) timeLeft = 0;

    timerDisplay.textContent = Math.ceil(timeLeft);
    const percent = (timeLeft / totalTime) * 100;
    timerBar.style.width = percent + '%';

    if (percent < 30) timerBar.classList.add('warning');
    else timerBar.classList.remove('warning');

    if (timeLeft <= 0) endGame();
  }, 100);
}

// ---------- START GAME ----------
function startGame() {
  score = 0;
  level = 1;
  streak = 0;
  questionsAnswered = 0;
  timeLeft = totalTime;
  gameActive = true;

  scoreDisplay.textContent = '0';
  levelDisplay.textContent = '1';
  timerDisplay.textContent = totalTime;
  timerBar.style.width = '100%';
  timerBar.classList.remove('warning');
  streakText.textContent = '🔥 Streak: 0';

  showScreen(gameScreen);
  renderQuestion();
  startTimer();
}

// ---------- END GAME ----------
function endGame() {
  gameActive = false;
  clearInterval(timerInterval);

  finalScore.textContent = score;
  finalLevel.textContent = level;
  finalBest.textContent = bestScore;

  // Save best score
  const isNewRecord = score > bestScore;
  if (isNewRecord) {
    bestScore = score;
    localStorage.setItem('mathBlitzBest', bestScore);
    finalBest.textContent = bestScore;
    newRecordBadge.classList.remove('hidden');
  } else {
    newRecordBadge.classList.add('hidden');
  }

  // ===== SEND SCORE TO MAIN APP (Brain Score) =====
  updateBrainScore(score);

  showScreen(gameOverScreen);
}

// ---------- UPDATE BRAIN SCORE (main app) ----------
function updateBrainScore(gameScore) {
  const userData = JSON.parse(localStorage.getItem('brainBlitzUser') || '{}');
  if (!userData.brainScore) userData.brainScore = 0;

  // Add game score to brain score
  userData.brainScore += gameScore;

  // Save per-game best
  if (!userData.gameStats) userData.gameStats = {};
  if (!userData.gameStats.math || gameScore > userData.gameStats.math) {
    userData.gameStats.math = gameScore;
  }

  localStorage.setItem('brainBlitzUser', JSON.stringify(userData));
}

// ---------- EVENTS ----------
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
homeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  const num = parseInt(e.key);
  if (num >= 1 && num <= 4) {
    const btns = optionsGrid.querySelectorAll('.option-btn');
    if (btns[num - 1]) btns[num - 1].click();
  }
});

// Prevent zoom
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
