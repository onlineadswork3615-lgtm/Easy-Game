/* ============================================
   BRAIN BLITZ - MAIN STYLES (FINAL)
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Segoe UI', 'Poppins', -apple-system, sans-serif;
  user-select: none;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0f0c29;
  color: #fff;
}

/* ============================================
   SCREEN SYSTEM
   ============================================ */
.screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.96);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  overflow-y: auto;
  overflow-x: hidden;
}

.screen.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.hidden {
  display: none !important;
}

/* ============================================
   SPLASH SCREEN
   ============================================ */
#splashScreen {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.splash-logo {
  font-size: 110px;
  animation: splashFloat 2s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(255,255,255,0.7));
}

@keyframes splashFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-20px) scale(1.05); }
}

.splash-title {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: 3px;
  background: linear-gradient(90deg, #fff, #ffe259, #ffa751);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 30px rgba(255,226,89,0.5);
}

.splash-sub {
  font-size: 14px;
  letter-spacing: 5px;
  opacity: 0.85;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.splash-loader {
  width: 200px;
  height: 6px;
  background: rgba(255,255,255,0.25);
  border-radius: 10px;
  overflow: hidden;
}

.splash-loader-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #ffe259, #ffa751);
  border-radius: 10px;
  animation: splashLoad 2.5s ease-in-out forwards;
}

@keyframes splashLoad {
  0%   { width: 0%; }
  100% { width: 100%; }
}

/* ============================================
   LOGIN SCREEN
   ============================================ */
#loginScreen {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.22);
  border-radius: 28px;
  padding: 30px 24px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: cardIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes cardIn {
  0%   { transform: scale(0.8) translateY(30px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

.login-logo {
  font-size: 62px;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.5));
}

.login-title {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 4px;
}

.login-sub {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 22px;
}

.name-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 16px;
  outline: none;
  transition: border 0.2s, background 0.2s;
  margin-bottom: 22px;
}

.name-input::placeholder {
  color: rgba(255,255,255,0.55);
  font-weight: 500;
}

.name-input:focus {
  border-color: #ffe259;
  background: rgba(255,255,255,0.22);
}

.avatar-label {
  font-size: 13px;
  letter-spacing: 2px;
  opacity: 0.85;
  margin-bottom: 14px;
  text-transform: uppercase;
  font-weight: 600;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 26px;
}

.avatar-btn {
  aspect-ratio: 1;
  font-size: 30px;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s, border 0.2s;
}

.avatar-btn:active {
  transform: scale(0.9);
}

.avatar-btn.selected {
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border-color: #fff;
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255,226,89,0.7);
}

.btn-primary {
  width: 100%;
  padding: 18px;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #6a11cb;
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255,226,89,0.4);
  transition: transform 0.15s, opacity 0.2s;
}

.btn-primary:active {
  transform: scale(0.96);
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* ============================================
   LOADING SCREEN
   ============================================ */
#loadingScreen {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.loading-brain {
  font-size: 90px;
  animation: brainSpin 1.5s linear infinite;
  filter: drop-shadow(0 0 25px rgba(255,255,255,0.6));
}

@keyframes brainSpin {
  0%   { transform: rotateY(0deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.1); }
  100% { transform: rotateY(360deg) scale(1); }
}

.loading-text {
  font-size: 16px;
  letter-spacing: 3px;
  opacity: 0.9;
  text-transform: uppercase;
}

.loading-bar-wrap {
  width: 240px;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
  overflow: hidden;
}

.loading-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #ffe259, #ffa751);
  border-radius: 10px;
  transition: width 0.15s linear;
}

.loading-percent {
  font-size: 22px;
  font-weight: 900;
  color: #ffe259;
}

/* ============================================
   DASHBOARD SCREEN
   ============================================ */
#dashboardScreen {
  background: linear-gradient(180deg, #1a1040 0%, #0f0c29 100%);
  padding: 20px 18px 100px;
  gap: 16px;
}

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(255,226,89,0.4);
}

.greet-small {
  font-size: 12px;
  opacity: 0.7;
  letter-spacing: 1px;
}

.greet-name {
  font-size: 18px;
  font-weight: 800;
}

.settings-btn {
  width: 44px;
  height: 44px;
  font-size: 20px;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
}

.settings-btn:active {
  transform: scale(0.9);
  background: rgba(255,255,255,0.2);
}

.brain-score-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 22px;
  box-shadow: 0 12px 30px rgba(106,17,203,0.4);
  position: relative;
  overflow: hidden;
}

.brain-score-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(255,226,89,0.25), transparent 70%);
  border-radius: 50%;
}

.brain-score-icon {
  font-size: 48px;
  filter: drop-shadow(0 0 15px rgba(255,255,255,0.6));
}

.brain-score-info {
  flex: 1;
}

.brain-score-label {
  font-size: 11px;
  letter-spacing: 3px;
  opacity: 0.85;
  font-weight: 700;
  margin-bottom: 2px;
}

.brain-score-value {
  font-size: 32px;
  font-weight: 900;
  color: #ffe259;
}

.brain-streak {
  text-align: right;
  position: relative;
  z-index: 1;
}

.streak-num {
  font-size: 26px;
  font-weight: 900;
  color: #ffe259;
}

.streak-lbl {
  font-size: 11px;
  opacity: 0.85;
  letter-spacing: 1px;
}

.daily-challenge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,226,89,0.35);
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

.daily-challenge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,226,89,0.08), transparent);
  pointer-events: none;
}

.dc-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 2px;
}

.dc-sub {
  font-size: 12px;
  opacity: 0.7;
}

.dc-btn {
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 1px;
  color: #6a11cb;
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255,226,89,0.4);
  transition: transform 0.15s;
}

.dc-btn:active {
  transform: scale(0.94);
}

.search-wrap {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 16px;
  outline: none;
  transition: border 0.2s, background 0.2s;
}

.search-input::placeholder {
  color: rgba(255,255,255,0.5);
}

.search-input:focus {
  border-color: #ffe259;
  background: rgba(255,255,255,0.12);
}

.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.cat-tab {
  padding: 8px 18px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 50px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.cat-tab.active {
  color: #6a11cb;
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(255,226,89,0.4);
}

.cat-tab:active {
  transform: scale(0.94);
}

.section-title {
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: 800;
  opacity: 0.75;
  margin-top: 6px;
  padding-left: 4px;
}

.section-title span {
  color: #ffe259;
  opacity: 1;
}

.games-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.game-card {
  padding: 22px 14px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.15s, background 0.25s, border 0.25s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #fff;
}

.game-card:active {
  transform: scale(0.96);
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,226,89,0.6);
}

.game-card.hidden {
  display: none;
}

.game-icon {
  font-size: 40px;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));
}

.game-name {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.game-desc {
  font-size: 11px;
  opacity: 0.65;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  opacity: 0.7;
}

.empty-state p {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 13px !important;
  font-weight: 500 !important;
  opacity: 0.6;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(15, 12, 41, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1.5px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  z-index: 50;
}

.nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s, transform 0.15s;
}

.nav-btn span {
  font-size: 22px;
}

.nav-btn small {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

.nav-btn.active {
  color: #ffe259;
}

.nav-btn:active {
  transform: scale(0.9);
}

/* ============================================
   SUB HEADER (Stats, Profile)
   ============================================ */
.sub-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: rgba(15, 12, 41, 0.95);
  border-bottom: 1.5px solid rgba(255,255,255,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.sub-header h2 {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
}

.back-btn {
  width: 42px;
  height: 42px;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
}

.back-btn:active {
  transform: scale(0.9);
  background: rgba(255,255,255,0.2);
}

.header-spacer {
  width: 42px;
}

/* ============================================
   STATS SCREEN
   ============================================ */
#statsScreen {
  background: linear-gradient(180deg, #1a1040 0%, #0f0c29 100%);
}

.stats-content {
  padding: 20px 18px 40px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stat-card {
  padding: 20px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-card-label {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 700;
  opacity: 0.7;
}

.stat-card-value {
  font-size: 26px;
  font-weight: 900;
  color: #ffe259;
}

.stat-card-value span {
  font-size: 13px;
  opacity: 0.8;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stats-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 16px;
}

.stats-list-icon {
  font-size: 26px;
}

.stats-list-info {
  flex: 1;
}

.stats-list-name {
  font-size: 14px;
  font-weight: 800;
}

.stats-list-sub {
  font-size: 11px;
  opacity: 0.6;
}

.stats-list-score {
  font-size: 20px;
  font-weight: 900;
  color: #ffe259;
}

/* ============================================
   PROFILE SCREEN
   ============================================ */
#profileScreen {
  background: linear-gradient(180deg, #1a1040 0%, #0f0c29 100%);
}

.profile-content {
  padding: 30px 18px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.profile-avatar-big {
  width: 110px;
  height: 110px;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffe259, #ffa751);
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(255,226,89,0.5);
  margin-bottom: 4px;
}

.profile-name {
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 1px;
}

.profile-joined {
  font-size: 13px;
  opacity: 0.6;
  margin-bottom: 10px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 12px;
}

.profile-stat-box {
  padding: 16px 10px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: 16px;
  text-align: center;
}

.psb-value {
  font-size: 22px;
  font-weight: 900;
  color: #ffe259;
}

.psb-label {
  font-size: 11px;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-top: 2px;
}

.profile-action-btn {
  width: 100%;
  max-width: 340px;
  padding: 16px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
}

.profile-action-btn:active {
  transform: scale(0.97);
  background: rgba(255,255,255,0.15);
}

.profile-action-btn.danger {
  color: #ff7a85;
  border-color: rgba(255,90,100,0.4);
}

.profile-action-btn.danger:active {
  background: rgba(255,90,100,0.15);
}

/* ============================================
   MODALS
   ============================================ */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 200;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  width: 100%;
  max-width: 380px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 26px 22px;
  background: linear-gradient(180deg, #1f1247 0%, #140b30 100%);
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transform: scale(0.9);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal.active .modal-content {
  transform: scale(1);
}

.modal-content h3 {
  font-size: 20px;
  font-weight: 900;
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.modal-avatar-grid {
  margin-bottom: 8px;
}

.modal-close-btn {
  width: 100%;
  padding: 14px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
}

.modal-close-btn:active {
  transform: scale(0.97);
  background: rgba(255,255,255,0.2);
}

/* Settings rows */
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: rgba(255,255,255,0.2);
  border-radius: 50px;
  transition: 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  height: 22px;
  width: 22px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked + .slider {
  background: linear-gradient(135deg, #ffe259, #ffa751);
}

.switch input:checked + .slider::before {
  transform: translateX(22px);
}

.settings-about {
  text-align: center;
  font-size: 12px;
  opacity: 0.6;
  line-height: 1.6;
  padding: 10px 0;
}

/* ============================================
   GAME LAUNCH OVERLAY
   ============================================ */
.game-launch-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.game-launch-overlay.active {
  opacity: 1;
  visibility: visible;
}

.launch-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 20px;
  text-align: center;
}

.launch-icon {
  font-size: 100px;
  animation: launchFloat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(255,255,255,0.6));
}

@keyframes launchFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-15px) scale(1.08); }
}

.launch-title {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #fff, #ffe259);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.launch-sub {
  font-size: 14px;
  letter-spacing: 2px;
  opacity: 0.85;
  text-transform: uppercase;
}

.launch-loader {
  width: 200px;
  height: 6px;
  background: rgba(255,255,255,0.25);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 8px;
}

.launch-loader-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #ffe259, #ffa751);
  border-radius: 10px;
  animation: launchLoad 1.2s ease-in-out forwards;
}

@keyframes launchLoad {
  0%   { width: 0%; }
  100% { width: 100%; }
}

/* ============================================
   TOAST
   ============================================ */
.toast-box {
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
  max-width: 90vw;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toast-box.active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 380px) {
  .splash-title { font-size: 38px; }
  .splash-logo { font-size: 90px; }
  .login-logo { font-size: 52px; }
  .login-title { font-size: 24px; }
  .avatar-btn { font-size: 24px; }
  .brain-score-value { font-size: 26px; }
  .brain-score-icon { font-size: 40px; }
  .game-icon { font-size: 34px; }
  .game-name { font-size: 12px; }
  .game-desc { font-size: 10px; }
  .launch-title { font-size: 26px; }
  .launch-icon { font-size: 80px; }
}

@media (max-height: 700px) {
  .splash-logo { font-size: 80px; }
  .splash-title { font-size: 36px; }
  .splash-sub { margin-bottom: 20px; }
  .login-card { padding: 22px 18px; }
  .login-logo { font-size: 48px; }
  .name-input { padding: 13px 16px; margin-bottom: 16px; }
  .avatar-grid { gap: 8px; margin-bottom: 18px; }
  .avatar-btn { font-size: 24px; }
  .btn-primary { padding: 15px; }
  .brain-score-card { padding: 16px; }
  .brain-score-icon { font-size: 40px; }
  .brain-score-value { font-size: 26px; }
}

/* ============================================
   DARK MODE OFF (LIGHT THEME)
   ============================================ */
body.light-mode {
  background: #f4f4ff;
  color: #1a1040;
}

body.light-mode .screen {
  color: #1a1040;
}

body.light-mode #dashboardScreen,
body.light-mode #statsScreen,
body.light-mode #profileScreen {
  background: linear-gradient(180deg, #f4f4ff 0%, #e6e2f5 100%);
}

body.light-mode .game-card,
body.light-mode .stat-card,
body.light-mode .stats-list-item,
body.light-mode .profile-stat-box,
body.light-mode .profile-action-btn,
body.light-mode .daily-challenge,
body.light-mode .search-input,
body.light-mode .cat-tab,
body.light-mode .setting-row {
  background: rgba(0,0,0,0.05);
  border-color: rgba(0,0,0,0.1);
  color: #1a1040;
}

body.light-mode .greet-small,
body.light-mode .section-title,
body.light-mode .game-desc {
  color: rgba(26,16,64,0.7);
}

body.light-mode .bottom-nav,
body.light-mode .sub-header {
  background: rgba(255,255,255,0.95);
  border-color: rgba(0,0,0,0.08);
}

body.light-mode .nav-btn {
  color: rgba(26,16,64,0.5);
}

body.light-mode .nav-btn.active {
  color: #6a11cb;
}

body.light-mode .back-btn {
  color: #1a1040;
  background: rgba(0,0,0,0.06);
  border-color: rgba(0,0,0,0.1);
}

body.light-mode .modal-content {
  background: linear-gradient(180deg, #ffffff 0%, #f4f4ff 100%);
  border-color: rgba(0,0,0,0.1);
  color: #1a1040;
}
