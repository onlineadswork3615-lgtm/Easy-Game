/* ============================================
   BRAIN BLITZ - MAIN APP LOGIC (FINAL)
   ============================================ */

// ---------- SCREEN ELEMENTS ----------
const splashScreen    = document.getElementById('splashScreen');
const loginScreen     = document.getElementById('loginScreen');
const loadingScreen   = document.getElementById('loadingScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const statsScreen     = document.getElementById('statsScreen');
const profileScreen   = document.getElementById('profileScreen');

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
const searchInput  = document.getElementById('searchInput');
const catTabs      = document.querySelectorAll('.cat-tab');
const gameCount    = document.getElementById('gameCount');
const emptyState   = document.getElementById('emptyState');

// ---------- STATS ELEMENTS ----------
const statsBackBtn       = document.getElementById('statsBackBtn');
const totalGamesPlayed   = document.getElementById('totalGamesPlayed');
const totalBrainScore    = document.getElementById('totalBrainScore');
const totalStreak        = document.getElementById('totalStreak');
const statsList          = document.getElementById('statsList');

// ---------- PROFILE ELEMENTS ----------
const profileBackBtn     = document.getElementById('profileBackBtn');
const profileAvatarBig   = document.getElementById('profileAvatarBig');
const profileName        = document.getElementById('profileName');
const profileJoined      = document.getElementById('profileJoined');
const profileBrainScore  = document.getElementById('profileBrainScore');
const profileStreak      = document.getElementById('profileStreak');
const profileGames       = document.getElementById('profileGames');
const changeAvatarBtn    = document.getElementById('changeAvatarBtn');
const changeNameBtn      = document.getElementById('changeNameBtn');
const resetBtn           = document.getElementById('resetBtn');

// ---------- MODAL ELEMENTS ----------
const avatarModal         = document.getElementById('avatarModal');
const modalAvatarGrid     = document.getElementById('modalAvatarGrid');
const avatarModalClose    = document.getElementById('avatarModalClose');
const settingsModal       = document.getElementById('settingsModal');
const settingsModalClose  = document.getElementById('settingsModalClose');
const soundToggle         = document.getElementById('soundToggle');
const vibrateToggle       = document.getElementById('vibrateToggle');
const darkToggle          = document.getElementById('darkToggle');

// ---------- LAUNCH OVERLAY ----------
const gameLaunchOverlay   = document.getElementById('gameLaunchOverlay');
const launchIcon          = document.getElementById('launchIcon');
const launchTitle         = document.getElementById('launchTitle');

// ---------- TOAST ----------
const toastBox = document.getElementById('toastBox');

// ============================================
// STATE
// ============================================
let userData = {
  name: 'Player',
  avatar: '🦁',
  brainScore: 0,
  streak: 1,
  lastPlayed: null,
  joined: new Date().toDateString(),
  gamesPlayed: 0,
  gameStats: {},
  settings: {
    sound: true,
    vibrate: true,
    darkMode: true
  }
};

// ============================================
// SCREEN SWITCHER
// ============================================
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  screen.scrollTop = 0;
}

// ============================================
// 1. ON LOAD
// ============================================
window.addEventListener('load', () => {
  const saved = localStorage.getItem('brainBlitzUser');

  if (saved) {
    try {
      userData = { ...userData, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to parse saved user');
    }

    setTimeout(() => {
      showScreen(loadingScreen);
      runLoadingAnimation(() => {
        loadDashboard();
        showScreen(dashboardScreen);
      });
    }, 2600);
  } else {
    setTimeout(() => {
      showScreen(loginScreen);
    }, 2600);
  }
});

// ============================================
// 2. LOGIN LOGIC
// ============================================
nameInput.addEventListener('input', () => {
  const hasName   = nameInput.value.trim().length >= 2;
  const hasAvatar = avatarGrid.querySelector('.avatar-btn.selected') !== null;
  loginBtn.disabled = !(hasName && hasAvatar);
});

avatarGrid.querySelectorAll('.avatar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    avatarGrid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const hasName = nameInput.value.trim().length >= 2;
    loginBtn.disabled = !hasName;
  });
});

loginBtn.addEventListener('click', () => {
  const name   = nameInput.value.trim();
  const avatar = avatarGrid.querySelector('.avatar-btn.selected')?.dataset.avatar;
  if (!name || !avatar) return;

  userData = {
    name: name,
    avatar: avatar,
    brainScore: 0,
    streak: 1,
    lastPlayed: new Date().toDateString(),
    joined: new Date().toDateString(),
    gamesPlayed: 0,
    gameStats: {},
    settings: { sound: true, vibrate: true, darkMode: true }
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
// 4. LOAD DASHBOARD
// ============================================
function loadDashboard() {
  const saved = localStorage.getItem('brainBlitzUser');
  if (saved) {
    try { userData = { ...userData, ...JSON.parse(saved) }; } catch (e) {}
  }

  userAvatar.textContent = userData.avatar || '🦁';
  userName.textContent   = userData.name || 'Player';
  brainScore.textContent = formatNumber(userData.brainScore || 0);
  streakDays.textContent = userData.streak || 1;

  // Apply saved settings
  applySettings();

  checkStreak();
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// 5. STREAK CHECK
// ============================================
function checkStreak() {
  const today = new Date().toDateString();
  const last  = userData.lastPlayed;

  if (!last) {
    userData.streak = 1;
  } else if (last !== today) {
    const lastDate  = new Date(last);
    const todayDate = new Date(today);
    const diffDays  = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      userData.streak = (userData.streak || 0) + 1;
    } else if (diffDays > 1) {
      userData.streak = 1;
    }
  }

  userData.lastPlayed = today;
  saveUser();
  streakDays.textContent = userData.streak;
}

function saveUser() {
  localStorage.setItem('brainBlitzUser', JSON.stringify(userData));
}

// ============================================
// 6. GAME ROUTING
// ============================================
const GAME_ROUTES = {
  math:       { path: 'games/math/math.html',       icon: '🎯', name: 'Math Blitz',       ready: true  },
  memory:     { path: 'games/memory/memory.html',   icon: '🧩', name: 'Memory Match',     ready: false },
  word:       { path: 'games/word/word.html',       icon: '🔤', name: 'Word Builder',     ready: false },
  pattern:    { path: 'games/pattern/pattern.html', icon: '🎨', name: 'Pattern Puzzle',   ready: false },
  sequence:   { path: 'games/sequence/sequence.html', icon: '🔢', name: 'Number Sequence', ready: false },
  logic:      { path: 'games/logic/logic.html',     icon: '🧠', name: 'Logic Puzzle',     ready: false },
  reaction:   { path: 'games/reaction/reaction.html', icon: '⚡', name: 'Reaction Test',   ready: false },
  color:      { path: 'games/color/color.html',     icon: '🌈', name: 'Color Match',      ready: false },
  animal:     { path: 'games/animal/animal.html',   icon: '🐾', name: 'Animal Quiz',      ready: false },
  spelling:   { path: 'games/spelling/spelling.html', icon: '📝', name: 'Spelling Bee',    ready: false },
  quickmath:  { path: 'games/quickmath/quickmath.html', icon: '🧮', name: 'Quick Math',    ready: false },
  sudoku:     { path: 'games/sudoku/sudoku.html',   icon: '🎲', name: 'Mini Sudoku',      ready: false },
  maze:       { path: 'games/maze/maze.html',       icon: '🧭', name: 'Maze Runner',      ready: false },
  difference: { path: 'games/difference/difference.html', icon: '🔍', name: 'Find Difference', ready: false },
  sound:      { path: 'games/sound/sound.html',     icon: '🎵', name: 'Sound Match',      ready: false }
};

gameCards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.game;
    openGame(id);
  });
});

function openGame(gameId) {
  const game = GAME_ROUTES[gameId];
  if (!game) {
    showToast('Game not found');
    return;
  }

  if (game.ready) {
    // Show launch overlay then navigate
    launchIcon.textContent = game.icon;
    launchTitle.textContent = game.name;
    gameLaunchOverlay.classList.remove('hidden');
    requestAnimationFrame(() => gameLaunchOverlay.classList.add('active'));

    setTimeout(() => {
      window.location.href = game.path;
    }, 1300);
  } else {
    showToast('🚧 Coming soon!');
  }
}

// ============================================
// 7. SEARCH & FILTER
// ============================================
let currentCategory = 'all';

function filterGames() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  gameCards.forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    const cat  = card.dataset.cat || '';
    const matchSearch = name.includes(query);
    const matchCat    = currentCategory === 'all' || cat.includes(currentCategory);

    if (matchSearch && matchCat) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  gameCount.textContent = `(${visibleCount})`;
  emptyState.classList.toggle('hidden', visibleCount > 0);
}

searchInput.addEventListener('input', filterGames);

catTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    catTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCategory = tab.dataset.cat;
    filterGames();
  });
});

// ============================================
// 8. BOTTOM NAV
// ============================================
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    if (tab === 'home') {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    } else if (tab === 'stats') {
      loadStats();
      showScreen(statsScreen);
    } else if (tab === 'profile') {
      loadProfile();
      showScreen(profileScreen);
    }
  });
});

statsBackBtn.addEventListener('click', () => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.nav-btn[data-tab="home"]').classList.add('active');
  loadDashboard();
  showScreen(dashboardScreen);
});

profileBackBtn.addEventListener('click', () => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.nav-btn[data-tab="home"]').classList.add('active');
  loadDashboard();
  showScreen(dashboardScreen);
});

// ============================================
// 9. STATS SCREEN
// ============================================
function loadStats() {
  const saved = localStorage.getItem('brainBlitzUser');
  if (saved) {
    try { userData = { ...userData, ...JSON.parse(saved) }; } catch (e) {}
  }

  totalGamesPlayed.textContent = userData.gamesPlayed || 0;
  totalBrainScore.textContent  = formatNumber(userData.brainScore || 0);
  totalStreak.innerHTML        = `${userData.streak || 1} <span>days 🔥</span>`;

  // Best scores list
  statsList.innerHTML = '';
  const stats = userData.gameStats || {};

  const playedGames = Object.keys(stats).filter(k => GAME_ROUTES[k]);

  if (playedGames.length === 0) {
    statsList.innerHTML = `<p style="text-align:center;opacity:0.5;padding:20px;">No games played yet.<br>Start playing to see your scores!</p>`;
    return;
  }

  playedGames
    .sort((a, b) => stats[b] - stats[a])
    .forEach(gameId => {
      const game = GAME_ROUTES[gameId];
      const item = document.createElement('div');
      item.className = 'stats-list-item';
      item.innerHTML = `
        <div class="stats-list-icon">${game.icon}</div>
        <div class="stats-list-info">
          <div class="stats-list-name">${game.name}</div>
          <div class="stats-list-sub">Best Score</div>
        </div>
        <div class="stats-list-score">${formatNumber(stats[gameId])}</div>
      `;
      statsList.appendChild(item);
    });
}

// ============================================
// 10. PROFILE SCREEN
// ============================================
function loadProfile() {
  const saved = localStorage.getItem('brainBlitzUser');
  if (saved) {
    try { userData = { ...userData, ...JSON.parse(saved) }; } catch (e) {}
  }

  profileAvatarBig.textContent = userData.avatar || '🦁';
  profileName.textContent      = userData.name || 'Player';
  profileJoined.textContent    = `📅 Joined ${userData.joined || 'today'}`;
  profileBrainScore.textContent = formatNumber(userData.brainScore || 0);
  profileStreak.textContent    = userData.streak || 1;
  profileGames.textContent     = userData.gamesPlayed || 0;
}

// ============================================
// 11. CHANGE AVATAR
// ============================================
changeAvatarBtn.addEventListener('click', () => {
  modalAvatarGrid.querySelectorAll('.avatar-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.avatar === userData.avatar);
  });
  openModal(avatarModal);
});

modalAvatarGrid.querySelectorAll('.avatar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    userData.avatar = btn.dataset.avatar;
    saveUser();
    modalAvatarGrid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    profileAvatarBig.textContent = userData.avatar;
    userAvatar.textContent = userData.avatar;
    showToast('✅ Avatar updated!');
    setTimeout(() => closeModal(avatarModal), 400);
  });
});

avatarModalClose.addEventListener('click', () => closeModal(avatarModal));

// ============================================
// 12. CHANGE NAME
// ============================================
changeNameBtn.addEventListener('click', () => {
  const newName = prompt('Enter new name:', userData.name);
  if (newName && newName.trim().length >= 2) {
    userData.name = newName.trim().slice(0, 15);
    saveUser();
    profileName.textContent = userData.name;
    userName.textContent = userData.name;
    showToast('✅ Name updated!');
  }
});

// ============================================
// 13. RESET DATA
// ============================================
resetBtn.addEventListener('click', () => {
  if (!confirm('⚠️ Delete all your data? This cannot be undone.')) return;
  localStorage.removeItem('brainBlitzUser');
  localStorage.removeItem('mathBlitzBest');
  showToast('🗑️ Data reset. Reloading...');
  setTimeout(() => window.location.reload(), 1200);
});

// ============================================
// 14. SETTINGS MODAL
// ============================================
settingsBtn.addEventListener('click', () => {
  soundToggle.checked   = userData.settings?.sound !== false;
  vibrateToggle.checked = userData.settings?.vibrate !== false;
  darkToggle.checked    = userData.settings?.darkMode !== false;
  openModal(settingsModal);
});

settingsModalClose.addEventListener('click', () => closeModal(settingsModal));

soundToggle.addEventListener('change', () => {
  if (!userData.settings) userData.settings = {};
  userData.settings.sound = soundToggle.checked;
  saveUser();
});

vibrateToggle.addEventListener('change', () => {
  if (!userData.settings) userData.settings = {};
  userData.settings.vibrate = vibrateToggle.checked;
  saveUser();
});

darkToggle.addEventListener('change', () => {
  if (!userData.settings) userData.settings = {};
  userData.settings.darkMode = darkToggle.checked;
  saveUser();
  applySettings();
});

function applySettings() {
  const s = userData.settings || { darkMode: true };
  if (s.darkMode === false) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
}

// ============================================
// 15. MODAL HELPERS
// ============================================
function openModal(modal) {
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('active'));
}

function closeModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Close modal on background click
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// ============================================
// 16. DAILY CHALLENGE
// ============================================
dailyBtn.addEventListener('click', () => {
  // Route to math game for now
  openGame('math');
});

// ============================================
// 17. TOAST
// ============================================
let toastTimeout = null;

function showToast(message) {
  toastBox.textContent = message;
  toastBox.classList.remove('hidden');
  requestAnimationFrame(() => toastBox.classList.add('active'));

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastBox.classList.remove('active');
    setTimeout(() => toastBox.classList.add('hidden'), 300);
  }, 1800);
}

// ============================================
// 18. PREVENT DOUBLE-TAP ZOOM
// ============================================
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });

// ============================================
// 19. REFRESH DASHBOARD WHEN RETURNING
// ============================================
window.addEventListener('pageshow', (e) => {
  if (e.persisted || performance.navigation?.type === 2) {
    if (dashboardScreen.classList.contains('active')) {
      loadDashboard();
    }
  }
});

// Also refresh on visibility change (when coming back from game)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && dashboardScreen.classList.contains('active')) {
    loadDashboard();
  }
});
