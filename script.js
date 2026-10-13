/* ============================================
   BRAIN BLITZ - MAIN APP LOGIC
   ============================================ */

// ---------- SCREEN ELEMENTS ----------
const splashScreen    = document.getElementById('splashScreen');
const loginScreen     = document.getElementById('loginScreen');
const loadingScreen   = document.getElementById('loadingScreen');
const dashboardScreen = document.getElementById('dashboardScreen');

// ---------- LOGIN ELEMENTS ----------
const nameInput  = document.getElementById('nameInput');
const avatarGrid = document.getElementById('avatarGrid');
const loginBtn   = document.getElementById('loginBtn');

// ---------- LOADING ELEMENTS ----------
const loadingBar     = document.getElementById('loadingBar');
const loadingPercent = document.getElementById('loadingPercent');

// ---------- DASHBOARD ELEMENTS ----------
const userAvatar   = document.getElementById('userAvatar');
const userName     = document.getElementById('userName');
const brainScore   = document.getElementById('brainScore');
const streakDays   = document.getElementById('streakDays');
const dailyBtn     = document.getElementById('dailyBtn');
const settingsBtn  = document.getElementById('settingsBtn');
const gameCards    = document.querySelectorAll('.game-card');

// ---------- STATE ----------
let userData = {
  name: 'Player',
  avatar: '🦁',
  brainScore: 0,
  streak: 1,
  lastPlayed: null
};

// ---------- SCREEN SWITCHER ----------
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  // Scroll top
  screen.scrollTop = 0;
}

// ============================================
// 1. SPLASH → LOGIN
// ============================================
window.addEventListener('load', () => {
  // Check if user already exists
  const saved = localStorage.getItem('brainBlitzUser');

  if (saved) {
    userData = JSON.parse(saved);
    // Splash দিয়ে সরাসরি loading → dashboard
    setTimeout(() => {
      showScreen(loadingScreen);
      runLoadingAnimation(() => {
        loadDashboard();
        showScreen(dashboardScreen);
      });
    }, 2600);
  } else {
    // নতুন user → login
    setTimeout(() => {
      showScreen(loginScreen);
    }, 2600);
  }
});

// ============================================
// 2. LOGIN LOGIC
// ============================================

// Name input validation
nameInput.addEventListener('input', () => {
  const hasName   = nameInput.value.trim().length >= 2;
  const hasAvatar = avatarGrid.querySelector('.avatar-btn.selected') !== null;
  loginBtn.disabled = !(hasName && hasAvatar);
});

// Avatar select
avatarGrid.querySelectorAll('.avatar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    avatarGrid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Validate
    const hasName   = nameInput.value.trim().length >= 2;
    loginBtn.disabled = !hasName;
  });
});

// Login button
loginBtn.addEventListener('click', () => {
  const name   = nameInput.value.trim();
  const avatar = avatarGrid.querySelector('.avatar-btn.selected')?.dataset.avatar;

  if (!name || !avatar) return;

  userData = {
    name: name,
    avatar: avatar,
    brainScore: 0,
    streak: 1,
    lastPlayed: new Date().toDateString()
  };

  localStorage.setItem('brainBlitzUser', JSON.stringify(userData));

  showScreen(loadingScreen);
  runLoadingAnimation(() => {
    loadDashboard();
    showScreen(dashboardScreen);
  });
});

// ============================================
// 3. LOADING ANIMATION
// ============================================
function runLoadingAnimation(callback) {
  let progress = 0;
  loadingBar.style.width = '0%';
  loadingPercent.textContent = '0%';

  const interval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(callback, 400);
    }
    loadingBar.style.width = progress + '%';
    loadingPercent.textContent = Math.floor(progress) + '%';
  }, 120);
}

// ============================================
// 4. DASHBOARD LOADER
// ============================================
function loadDashboard() {
  userAvatar.textContent = userData.avatar || '🦁';
  userName.textContent   = userData.name || 'Player';
  brainScore.textContent = formatNumber(userData.brainScore || 0);
  streakDays.textContent = userData.streak || 1;

  // Check streak
  checkStreak();
}

// ---------- NUMBER FORMAT (1000 → 1,000) ----------
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ---------- STREAK LOGIC ----------
function checkStreak() {
  const today = new Date().toDateString();
  const last  = userData.lastPlayed;

  if (!last) {
    userData.streak = 1;
  } else if (last === today) {
    // Same day, no change
  } else {
    const lastDate = new Date(last);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      userData.streak = (userData.streak || 0) + 1;
    } else if (diffDays > 1) {
      userData.streak = 1;
    }
  }

  userData.lastPlayed = today;
  localStorage.setItem('brainBlitzUser', JSON.stringify(userData));
  streakDays.textContent = userData.streak;
}

// ============================================
// 5. GAME CARD CLICK → route to game
// ============================================
gameCards.forEach(card => {
  card.addEventListener('click', () => {
    const game = card.dataset.game;
    openGame(game);
  });
});

function openGame(gameId) {
  const routes = {
    math:    'games/math/math.html',
    memory:  'games/memory/memory.html',
    word:    'games/word/word.html',
    pattern: 'games/pattern/pattern.html'
  };

  const path = routes[gameId];
  if (!path) {
    showToast('Game not found');
    return;
  }

  // Check if file exists (only math ready now)
  if (gameId === 'math') {
    window.location.href = path;
  } else {
    showToast('🚧 Coming soon!');
  }
}

// ============================================
// 6. DAILY CHALLENGE
// ============================================
dailyBtn.addEventListener('click', () => {
  showToast('🎯 Daily Challenge starting...');
});

// ============================================
// 7. SETTINGS
// ============================================
settingsBtn.addEventListener('click', () => {
  showToast('⚙️ Settings coming soon');
});

// ============================================
// 8. TOAST NOTIFICATION
// ============================================
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: linear-gradient(135deg, #ffe259, #ffa751);
    color: #6a11cb;
    padding: 14px 26px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 1px;
    box-shadow: 0 10px 30px rgba(255,226,89,0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    white-space: nowrap;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

// ============================================
// 9. BOTTOM NAV (placeholder)
// ============================================
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    if (tab === 'home') {
      // already home
    } else if (tab === 'stats') {
      showToast('📊 Stats coming soon');
    } else if (tab === 'profile') {
      showToast('👤 Profile coming soon');
    }
  });
});

// ============================================
// 10. PREVENT ZOOM ON DOUBLE TAP
// ============================================
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
