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

// ---------- GAME STATE ----------
let score        = 0;
let level        = 1;
let streak       = 0;
let correctAnswer = 0;
let totalTime    = 60;
let timeLeft     = 60;
let gameActive   = false;
let timerInterval = null;
let levelUpPending = false;

// Best score localStorage থেকে load
let bestScore = parseInt(localStorage.getItem('mathBlitzBest') || '0');
bestScoreStart.textContent = bestScore;

// ---------- SCREEN SWITCHER ----------
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ---------- RANDOM HELPERS ----------
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

  // Level অনুযায়ী difficulty বাড়বে
  if (level <= 3) {
    // খুব সহজ: যোগ-বিয়োগ, 1-10
    a = randInt(1, 10);
    b = randInt(1, 10);
    op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) [a, b] = [b, a]; // negative এড়াতে
    answer = op === '+' ? a + b : a - b;

  } else if (level <= 7) {
    // সহজ: 1-20
    a = randInt(1, 20);
    b = randInt(1, 20);
    op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) [a, b] = [b, a];
    answer = op === '+' ? a + b : a - b;

  } else if (level <= 12) {
    // মাঝারি: গুণ যোগ
    const type = randInt(0, 2);
    if (type === 0) {
      a = randInt(2, 12); b = randInt(2, 12);
      op = '×'; answer = a * b;
    } else if (type === 1) {
      a = randInt(10, 50); b = randInt(10, 50);
      op = '+'; answer = a + b;
    } else {
      a = randInt(20, 99); b = randInt(1, 20);
      op = '-'; answer = a - b;
    }

  } else if (level <= 20) {
    // কঠিন: সব অপারেশন
    const type = randInt(0, 3);
    if (type === 0) {
      a = randInt(2, 15); b = randInt(2, 15);
      op = '×'; answer = a * b;
    } else if (type === 1) {
      b = randInt(2, 12);
      answer = randInt(2, 12);
      a = b * answer;
      op = '÷';
    } else if (type === 2) {
      a = randInt(50, 200); b = randInt(50, 200);
      op = '+'; answer = a + b;
    } else {
      a = randInt(50, 200); b = randInt(1, 50);
      op = '-'; answer = a - b;
    }

  } else {
    // Expert: multi-step
    const type = randInt(0, 2);
    if (type === 0) {
      a = randInt(5, 20); b = randInt(2, 10);
      const c = randInt(1, 30);
      op = '×+';
      answer = a * b + c;
      questionText.dataset.custom = `${a} × ${b} + ${c} = ?`;
    } else if (type === 1) {
      a = randInt(20, 100); b = randInt(2, 9);
      op = '÷';
      answer = randInt(2, 12);
      a = b * answer;
    } else {
      a = randInt(100, 500); b = randInt(50, 200);
      op = '-'; answer = a - b;
    }
  }

  correctAnswer = answer;

  // Custom multi-step question
  if (questionText.dataset.custom) {
    const q = questionText.dataset.custom;
    delete questionText.dataset.custom;
    return q;
  }

  return `${a} ${op} ${b} = ?`;
}

// ---------- WRONG ANSWER GENERATOR ----------
function generateOptions(correct) {
  const opts = new Set();
  opts.add(correct);

  while (opts.size < 4) {
    let offset = randInt(1, 10);
    if (Math.random() < 0.5) offset = -offset;
    let wrong = correct + offset;

    // কখনো negative বা duplicate হবে না
    if (wrong >= 0 && wrong !== correct) {
      opts.add(wrong);
    }
  }

  return shuffle([...opts]);
}

// ---------- RENDER QUESTION ----------
function renderQuestion() {
  const question = generateQuestion();
  questionText.textContent = question;

  const options = generateOptions(correctAnswer);

  optionsGrid.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.textContent = options[i];
    btn.dataset.value = options[i];
    btn.classList.remove('correct', 'wrong');
  });
}

// ---------- OPTION CLICK HANDLER ----------
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

// ---------- CORRECT ANSWER ----------
function handleCorrect(btn) {
  btn.classList.add('correct');
  streak++;

  // Score calculation: streak bonus
  const basePoints = 10 + level;
  const streakBonus = Math.min(streak, 10) * 2;
  const points = basePoints + streakBonus;
  score += points;

  scoreDisplay.textContent = score;
  streakText.textContent = `🔥 Streak: ${streak}`;
  showFeedback('✅', '#00f260');

  // প্রতি ৫টা সঠিক উত্তরে level up
  if (streak % 5 === 0) {
    level++;
    levelDisplay.textContent = level;
    showFeedback('⭐ LEVEL UP!', '#ffe259');
    // Time bonus
    timeLeft = Math.min(timeLeft + 3, totalTime);
  }

  // পরের প্রশ্ন (300ms delay)
  setTimeout(() => {
    if (gameActive) renderQuestion();
  }, 300);
}

// ---------- WRONG ANSWER ----------
function handleWrong(btn) {
  btn.classList.add('wrong');
  streak = 0;
  streakText.textContent = `🔥 Streak: 0`;

  // সঠিক উত্তর highlight
  optionsGrid.querySelectorAll('.option-btn').forEach(b => {
    if (parseInt(b.dataset.value) === correctAnswer) {
      b.classList.add('correct');
    }
  });

  // 2 সেকেন্ড time penalty
  timeLeft = Math.max(0, timeLeft - 2);
  showFeedback('❌', '#ff5e62');

  setTimeout(() => {
    if (gameActive) renderQuestion();
  }, 700);
}

// ---------- FEEDBACK POPUP ----------
function showFeedback(text, color) {
  feedback.textContent = text;
  feedback.style.color = color;
  feedback.classList.remove('hidden');
  // Reset animation
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

    if (percent < 30) {
      timerBar.classList.add('warning');
    } else {
      timerBar.classList.remove('warning');
    }

    if (timeLeft <= 0) {
      endGame();
    }
  }, 100);
}

// ---------- START GAME ----------
function startGame() {
  score = 0;
  level = 1;
  streak = 0;
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

  // New record check
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('mathBlitzBest', bestScore);
    bestScoreStart.textContent = bestScore;
    finalBest.textContent = bestScore;
    newRecordBadge.classList.remove('hidden');
  } else {
    newRecordBadge.classList.add('hidden');
  }

  showScreen(gameOverScreen);
}

// ---------- EVENT LISTENERS ----------
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
homeBtn.addEventListener('click', () => {
  bestScoreStart.textContent = bestScore;
  showScreen(startScreen);
});

// ---------- KEYBOARD SUPPORT (desktop) ----------
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  const num = parseInt(e.key);
  if (num >= 1 && num <= 4) {
    const btns = optionsGrid.querySelectorAll('.option-btn');
    if (btns[num - 1]) btns[num - 1].click();
  }
});

// ---------- PREVENT ZOOM ON DOUBLE TAP ----------
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
