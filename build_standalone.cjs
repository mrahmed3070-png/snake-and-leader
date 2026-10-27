const fs = require('fs');

const boardB64 = fs.readFileSync('board.base64.txt', 'utf8').trim();
const titleB64 = fs.readFileSync('title.base64.txt', 'utf8').trim();
const avatarB64 = fs.readFileSync('avatar.base64.txt', 'utf8').trim();

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snakes and Ladder - لعبة السلم والثعبان التعليمية</title>
  <meta name="description" content="لعبة السلم والثعبان التعليمية التفاعلية مع 20 سؤالاً ونرد ثلاثي الأبعاد وكؤوس تفاعلية." />
  <meta property="og:title" content="Snakes and Ladder - لعبة السلم والثعبان" />
  <meta property="og:description" content="لعبة السلم والثعبان التعليمية التفاعلية مع 20 سؤالاً ونرد ثلاثي الأبعاد وكؤوس تفاعلية." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <style>
    /* RESET & CORE TYPOGRAPHY */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg-dark-1: #040c1e;
      --bg-dark-2: #081d42;
      --bg-dark-3: #0b2b63;
      --accent-cyan: #40e8ff;
      --accent-blue: #0876ed;
      --accent-purple: #582bc2;
      --accent-gold: #ffd85b;
      --accent-gold-dark: #b8860b;
      --cream-panel: #fdfbf7;
      --cream-text: #faebd7;
      --color-p1: #ff5d66;
      --color-p2: #1878ee;
      --color-p3: #18a75b;
      --color-p4: #8a4de1;
      --color-p5: #ef8b20;
      --font-family: 'Segoe UI', Tahoma, 'Trebuchet MS', 'Arial Rounded MT Bold', sans-serif;
    }

    body {
      font-family: var(--font-family);
      background: radial-gradient(circle at 50% 20%, #0d3170 0%, #081d42 45%, #040c1e 100%);
      color: #ffffff;
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible {
      outline: 3px solid var(--accent-cyan);
      outline-offset: 2px;
    }

    /* HEADER */
    .app-header {
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      position: relative;
      z-index: 10;
    }

    .title-image-wrapper {
      display: flex;
      align-items: center;
    }

    .title-image {
      width: min(72vw, 720px);
      height: 120px;
      object-fit: cover;
      object-position: left 40%;
      filter: drop-shadow(0 4px 14px rgba(4, 18, 56, 0.85));
      border-radius: 8px;
      user-select: none;
      pointer-events: none;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: nowrap;
    }

    .header-btn {
      padding: 10px 18px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #123d80 0%, #08214d 100%);
      border: 2px solid var(--accent-cyan);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(64, 232, 255, 0.4);
      transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      white-space: nowrap;
    }

    .header-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(64, 232, 255, 0.35);
      background: linear-gradient(135deg, #184e9f 0%, #0c2d66 100%);
    }

    .header-btn:active {
      transform: translateY(1px);
    }

    /* MAIN CONTAINER */
    .app-main {
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      padding: 10px 20px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* VIEW SCREENS */
    .view-screen {
      width: 100%;
    }

    .view-screen.hidden {
      display: none !important;
    }

    /* SETTINGS SCREEN */
    .settings-container {
      max-width: 780px;
      margin: 10px auto 30px;
      background: rgba(10, 31, 71, 0.92);
      backdrop-filter: blur(12px);
      border: 3px solid var(--accent-cyan);
      border-radius: 24px;
      padding: 32px 28px;
      box-shadow: 0 0 40px rgba(64, 232, 255, 0.25), 0 20px 50px rgba(0, 0, 0, 0.6);
    }

    .settings-heading {
      font-size: clamp(1.8rem, 3.5vw, 2.4rem);
      font-weight: 800;
      color: #ffffff;
      text-align: center;
      text-shadow: 0 2px 10px rgba(64, 232, 255, 0.5);
      margin-bottom: 6px;
    }

    .settings-subtitle {
      text-align: center;
      color: #b8d5ff;
      font-size: 1.05rem;
      margin-bottom: 24px;
    }

    .settings-section-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--accent-gold);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    }

    /* PLAY MODE CARDS */
    .mode-cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .mode-card {
      background: linear-gradient(135deg, rgba(14, 45, 99, 0.8) 0%, rgba(8, 25, 61, 0.9) 100%);
      border: 2px solid #2358aa;
      border-radius: 16px;
      padding: 18px 16px;
      color: #ffffff;
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .mode-card:hover {
      border-color: var(--accent-cyan);
      transform: translateY(-2px);
    }

    .mode-card[aria-pressed="true"] {
      border-color: var(--accent-cyan);
      outline: 3px solid var(--accent-cyan);
      background: linear-gradient(135deg, #144f9c 0%, #0c336b 100%);
      box-shadow: 0 0 20px rgba(64, 232, 255, 0.5), inset 0 0 12px rgba(64, 232, 255, 0.3);
    }

    /* PLAYER COUNT SELECTOR */
    .player-count-box {
      margin-top: -12px;
      margin-bottom: 24px;
      padding: 14px;
      background: rgba(7, 21, 51, 0.75);
      border-radius: 14px;
      border: 1px solid #1f4f96;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }

    .count-buttons-group {
      display: flex;
      gap: 8px;
    }

    .count-btn {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 2px solid #27589e;
      background: #0d2856;
      color: #ffffff;
      font-size: 1.15rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .count-btn:hover {
      border-color: var(--accent-cyan);
    }

    .count-btn.active {
      background: linear-gradient(135deg, #0876ed 0%, #054894 100%);
      border-color: var(--accent-cyan);
      box-shadow: 0 0 12px rgba(64, 232, 255, 0.6);
      transform: scale(1.08);
    }

    /* PLAYER NAMES INPUTS */
    .player-names-container {
      background: rgba(7, 21, 51, 0.7);
      border-radius: 16px;
      border: 1px solid #1a427f;
      padding: 18px;
      margin-bottom: 24px;
    }

    .player-name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .player-name-row:last-child {
      margin-bottom: 0;
    }

    .player-badge-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: 800;
      color: #ffffff;
      flex-shrink: 0;
    }

    .player-name-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      background: #07193b;
      border: 1.5px solid #234f91;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      transition: border-color 0.2s;
    }

    .player-name-input:focus {
      border-color: var(--accent-cyan);
    }

    .names-action-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
      gap: 10px;
    }

    .btn-green {
      background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
      color: #ffffff;
      border: 2px solid #86efac;
      border-radius: 12px;
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-green:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(34, 197, 94, 0.5);
      background: linear-gradient(135deg, #28d666 0%, #169345 100%);
    }

    .btn-green:active {
      transform: translateY(1px);
    }

    .names-status-tag {
      font-size: 0.95rem;
      font-weight: 700;
    }

    .names-status-tag.saved {
      color: #4ade80;
    }

    .names-status-tag.unsaved {
      color: #fbbf24;
    }

    /* QUESTIONS DETAILS */
    .questions-details-box {
      background: rgba(7, 21, 51, 0.7);
      border-radius: 16px;
      border: 1px solid #1a427f;
      padding: 14px 18px;
      margin-bottom: 28px;
    }

    .questions-details-box summary {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--accent-gold);
      cursor: pointer;
      padding: 6px 0;
      user-select: none;
    }

    .questions-content {
      padding-top: 18px;
    }

    /* PRESETS ROW */
    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .preset-btn {
      padding: 8px 14px;
      background: #143e77;
      border: 1.5px solid var(--accent-cyan);
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-btn:hover {
      background: #1c55a3;
      box-shadow: 0 0 10px rgba(64, 232, 255, 0.4);
    }

    .tabs-header {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .tab-btn {
      padding: 8px 16px;
      background: #0d2856;
      border: 1.5px solid #27589e;
      border-radius: 10px;
      color: #cbd5e1;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.15s ease;
    }

    .tab-btn.active {
      background: #0876ed;
      border-color: var(--accent-cyan);
      color: #ffffff;
    }

    .bulk-textareas-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }

    .bulk-textareas-grid label {
      display: block;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: #93c5fd;
    }

    .bulk-textarea {
      width: 100%;
      height: 180px;
      padding: 10px;
      background: #07193b;
      border: 1.5px solid #234f91;
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      resize: vertical;
      line-height: 1.5;
    }

    .single-editor-box {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .single-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .single-input-row label {
      width: 130px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #93c5fd;
    }

    .single-input-row select, .single-input-row input {
      flex: 1;
      min-width: 200px;
      padding: 10px 14px;
      border-radius: 10px;
      background: #07193b;
      border: 1.5px solid #234f91;
      color: #ffffff;
      font-size: 0.95rem;
    }

    .single-btn-group {
      display: flex;
      gap: 10px;
      margin-top: 6px;
    }

    .btn-secondary {
      background: #1e3a68;
      border: 1.5px solid #3869b0;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-secondary:hover {
      background: #274b85;
      border-color: var(--accent-cyan);
    }

    .btn-danger {
      background: #831823;
      border: 1.5px solid #f87171;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-danger:hover {
      background: #991b1b;
    }

    .questions-feedback-msg {
      margin-top: 10px;
      font-size: 0.95rem;
      font-weight: 700;
      min-height: 22px;
    }

    .questions-feedback-msg.success {
      color: #4ade80;
    }

    .questions-feedback-msg.error {
      color: #f87171;
    }

    .btn-start-game {
      width: 100%;
      padding: 16px 24px;
      border-radius: 16px;
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
      color: #ffffff;
      border: 3px solid #86efac;
      font-size: 1.35rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 0 25px rgba(34, 197, 94, 0.45), 0 8px 20px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .btn-start-game:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 35px rgba(34, 197, 94, 0.65), 0 12px 24px rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg, #2ade6e 0%, #16b553 50%, #15803d 100%);
    }

    .btn-start-game:active {
      transform: translateY(1px);
    }

    /* GAME PLAY SCREEN */
    .game-actions-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .nav-btn {
      padding: 8px 16px;
      border-radius: 10px;
      background: #0f2d5c;
      border: 1.5px solid var(--accent-cyan);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .nav-btn:hover {
      background: #18488e;
      box-shadow: 0 0 10px rgba(64, 232, 255, 0.4);
    }

    .game-layout-grid {
      display: grid;
      grid-template-columns: 1fr 310px;
      gap: clamp(14px, 2vw, 24px);
      align-items: start;
    }

    .board-column {
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-width: 0;
    }

    /* BOARD METALLIC FRAME */
    .board-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 5 / 4;
      border-radius: 20px;
      overflow: hidden;
      border: 4px solid var(--accent-cyan);
      box-shadow: 0 0 35px rgba(255, 215, 0, 0.45), 0 0 70px rgba(8, 118, 237, 0.35), inset 0 0 15px rgba(64, 232, 255, 0.6);
      background: #02112b;
      user-select: none;
      direction: ltr !important; /* Keep board grid geometry 100% stable */
    }

    /* MANDATORY BOARD PICTURE PLACEMENT */
    .board-bg-image {
      position: absolute;
      left: 49.5%;
      top: 52.8%;
      width: 120%;
      height: 123%;
      transform: translate(-50%, -50%);
      object-fit: fill;
      pointer-events: none;
      user-select: none;
      z-index: 1;
    }

    /* 5 COLUMNS X 4 ROWS HIT GRID */
    .board-grid-overlay {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
      z-index: 2;
      direction: ltr !important;
    }

    .square-hit-cell {
      position: relative;
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
    }

    /* QUESTION MARK BUTTONS */
    .question-mark-btn {
      position: absolute;
      top: 11%;
      right: 7%;
      width: clamp(20px, 3.2vw, 30px);
      height: clamp(20px, 3.2vw, 30px);
      border-radius: 50%;
      border: 2px solid #ffffff;
      color: #ffffff;
      font-weight: 900;
      font-size: clamp(12px, 1.8vw, 17px);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      z-index: 3;
      padding: 0;
      line-height: 1;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .square-hit-cell[data-square="10"] .question-mark-btn {
      right: 24% !important;
    }

    .question-mark-btn:hover {
      transform: scale(1.15);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
    }

    .question-mark-btn.col-1 { background: #18a75b; }
    .question-mark-btn.col-2 { background: #1878ee; }
    .question-mark-btn.col-3 { background: #8a4de1; }
    .question-mark-btn.col-4 { background: #ff5d66; }
    .question-mark-btn.col-5 { background: #ef8b20; }

    .question-mark-btn.has-saved-question {
      background: #18a75b !important;
      box-shadow: 0 0 10px #22c55e, 0 2px 5px rgba(0, 0, 0, 0.35) !important;
    }

    /* STARTING DOCK */
    .starting-dock {
      background: linear-gradient(135deg, #07193b 0%, #030d22 100%);
      border: 3px solid var(--accent-blue);
      border-radius: 16px;
      padding: 12px 18px;
      box-shadow: inset 0 0 12px rgba(8, 118, 237, 0.4), 0 6px 16px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      position: relative;
    }

    .dock-label {
      font-weight: 800;
      font-size: 0.95rem;
      letter-spacing: 1px;
      color: var(--accent-cyan);
      text-shadow: 0 0 8px rgba(64, 232, 255, 0.5);
      white-space: nowrap;
    }

    .dock-slots {
      flex: 1;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      position: relative;
      direction: ltr !important;
    }

    /* TOKENS */
    .player-token {
      width: clamp(24px, 4vw, 42px);
      height: clamp(24px, 4vw, 42px);
      border-radius: 50%;
      border: 2.5px solid #ffffff;
      color: #ffffff;
      font-weight: 900;
      font-size: clamp(12px, 2vw, 18px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 3px 6px rgba(255, 255, 255, 0.55), inset 0 -3px 6px rgba(0, 0, 0, 0.4);
      position: absolute;
      z-index: 10;
      user-select: none;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: left 0.25s cubic-bezier(0.25, 1, 0.5, 1), top 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .player-token.hop {
      animation: tokenHopAnim 0.28s ease-in-out;
    }

    @keyframes tokenHopAnim {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -85%) scale(1.22);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.8);
      }
    }

    /* CONTROL COLUMN */
    .controls-column {
      position: sticky;
      top: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .control-panel-box {
      background: var(--cream-panel);
      border: 4px solid var(--accent-cyan);
      box-shadow: 0 0 0 3px var(--accent-blue), 0 12px 30px rgba(0, 0, 0, 0.6);
      border-radius: 22px;
      padding: 18px 16px;
      color: #0b1f47;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
    }

    .current-turn-banner {
      background: linear-gradient(135deg, #092353 0%, #051433 100%);
      border-radius: 14px;
      padding: 10px 14px;
      color: #ffffff;
      text-align: center;
      border: 2px solid #1a4f9b;
      box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.2);
    }

    .turn-label-small {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--accent-cyan);
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .turn-player-name {
      font-size: 1.25rem;
      font-weight: 900;
    }

    .turn-status-text {
      text-align: center;
      font-size: 0.95rem;
      font-weight: 700;
      color: #1e3a68;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.35;
    }

    /* AVATAR + DICE STAGE */
    .avatar-dice-stage {
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 8px;
      padding: 8px 4px;
      direction: ltr !important;
    }

    .avatar-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .avatar-floating-qmarks {
      display: flex;
      gap: 4px;
      margin-bottom: -4px;
      z-index: 2;
    }

    .floating-qmark {
      font-weight: 900;
      font-size: 1.15rem;
      color: #0876ed;
      text-shadow: 0 0 6px rgba(64, 232, 255, 0.8);
      animation: qmarkFloat 2s ease-in-out infinite alternate;
    }

    .floating-qmark:nth-child(2) {
      animation-delay: 0.4s;
      color: #e11d48;
    }

    .floating-qmark:nth-child(3) {
      animation-delay: 0.8s;
      color: #16a34a;
    }

    @keyframes qmarkFloat {
      0% { transform: translateY(0px) scale(1); }
      100% { transform: translateY(-7px) scale(1.18); }
    }

    .avatar-img-box {
      width: 84px;
      height: 84px;
      border-radius: 18px;
      border: 3px solid var(--accent-blue);
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      background: #0d2856;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      user-select: none;
    }

    /* 3D DICE SYSTEM */
    .dice-container-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .dice-stationary-btn {
      width: 96px;
      height: 96px;
      background: transparent;
      border: none;
      cursor: pointer;
      perspective: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0;
      outline: none;
    }

    .dice-stationary-btn:focus-visible {
      outline: 3px solid var(--accent-blue);
      border-radius: 18px;
    }

    .dice-stationary-btn[disabled] {
      cursor: not-allowed;
      opacity: 0.85;
    }

    .dice-cube {
      width: 76px;
      height: 76px;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateX(-12deg) rotateY(16deg);
      transition: transform 1s cubic-bezier(0.2, 0.85, 0.35, 1.2);
    }

    .dice-face {
      position: absolute;
      width: 76px;
      height: 76px;
      border-radius: 15px;
      background: linear-gradient(135deg, #32dfff 0%, #087cf4 35%, #0a439f 70%, #061c52 100%);
      border: 2.5px solid var(--accent-gold);
      box-shadow: inset 0 0 10px rgba(50, 223, 255, 0.6), 0 0 12px rgba(255, 216, 91, 0.25);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      padding: 8px;
      box-sizing: border-box;
      backface-visibility: visible;
    }

    /* Face orientations: half-cube distance is 38px */
    .face-1 { transform: rotateY(0deg) translateZ(38px); }
    .face-2 { transform: rotateY(180deg) translateZ(38px); }
    .face-3 { transform: rotateY(90deg) translateZ(38px); }
    .face-4 { transform: rotateY(-90deg) translateZ(38px); }
    .face-5 { transform: rotateX(90deg) translateZ(38px); }
    .face-6 { transform: rotateX(-90deg) translateZ(38px); }

    .dice-pip {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fff7be 0%, #ffd85b 55%, #b5800a 100%);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5), 0 0 6px #ffd85b;
      align-self: center;
      justify-self: center;
    }

    .btn-move-action {
      background: linear-gradient(135deg, #0876ed 0%, #0352ab 100%);
      border: 2px solid var(--accent-cyan);
      color: #ffffff;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 8px 16px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(64, 232, 255, 0.6);
      transition: all 0.15s ease;
      animation: pulseGlow 1.2s infinite alternate;
    }

    @keyframes pulseGlow {
      0% { box-shadow: 0 0 10px rgba(64, 232, 255, 0.4); transform: scale(1); }
      100% { box-shadow: 0 0 20px rgba(64, 232, 255, 0.8); transform: scale(1.04); }
    }

    /* PLAYERS LIST IN CONTROL PANEL */
    .control-players-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .player-card-row {
      background: #f0ecdf;
      border: 2px solid #ded6c2;
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      transition: all 0.2s ease;
    }

    .player-card-row.active {
      border-color: #0876ed;
      outline: 2.5px solid #0876ed;
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(8, 118, 237, 0.25);
    }

    .player-card-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 0.95rem;
      color: #0c2049;
    }

    .player-card-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
    }

    .player-card-trophy {
      font-weight: 800;
      font-size: 0.9rem;
      color: #b45309;
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 3px 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }

    /* FOOTER SIGNATURE */
    .author-signature {
      margin-top: 10px;
      text-align: center;
      user-select: none;
      direction: ltr;
    }

    .author-name {
      display: block;
      font-weight: 700;
      color: var(--accent-gold);
      font-size: 1.05rem;
      text-shadow: 0 0 10px rgba(255, 216, 91, 0.5);
      margin-bottom: 2px;
    }

    .author-title {
      display: block;
      color: var(--cream-text);
      font-size: 0.85rem;
      opacity: 0.9;
    }

    /* MODAL DIALOG */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(3, 10, 26, 0.85);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-overlay.hidden {
      display: none !important;
    }

    .modal-box {
      background: linear-gradient(135deg, #0d2757 0%, #061533 100%);
      border: 3px solid var(--accent-cyan);
      border-radius: 20px;
      width: 100%;
      max-width: 540px;
      padding: 24px;
      color: #ffffff;
      box-shadow: 0 0 40px rgba(64, 232, 255, 0.35), 0 20px 50px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
    }

    .modal-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--accent-gold);
      text-shadow: 0 0 8px rgba(255, 216, 91, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-question-text {
      background: rgba(4, 15, 38, 0.8);
      border: 1.5px solid #1a4f91;
      border-radius: 12px;
      padding: 14px 16px;
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.5;
      color: #e2e8f0;
    }

    .modal-input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      background: #030f26;
      border: 2px solid #25589e;
      color: #ffffff;
      font-size: 1.05rem;
      font-weight: 600;
    }

    .modal-input:focus {
      border-color: var(--accent-cyan);
    }

    .modal-feedback {
      font-size: 1rem;
      font-weight: 700;
      min-height: 24px;
      margin-top: 8px;
    }

    .modal-feedback.success { color: #4ade80; }
    .modal-feedback.error { color: #f87171; }
    .modal-feedback.info { color: #93c5fd; }

    .modal-buttons-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 14px;
    }

    /* SNAKE CRYING OVERLAY */
    .snake-cry-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      background: rgba(0, 0, 0, 0.85);
      border: 3px solid #f87171;
      border-radius: 28px;
      padding: 24px 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 90;
      pointer-events: none;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .snake-cry-popup.active {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    .snake-cry-emoji {
      font-size: 4rem;
      line-height: 1;
      animation: cryShake 0.4s infinite alternate;
    }

    @keyframes cryShake {
      0% { transform: rotate(-5deg); }
      100% { transform: rotate(5deg); }
    }

    .snake-cry-text {
      color: #fca5a5;
      font-weight: 800;
      font-size: 1.2rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    }

    /* VICTORY OVERLAY */
    .victory-overlay {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at 50% 40%, rgba(13, 49, 112, 0.95) 0%, rgba(4, 12, 30, 0.98) 100%);
      z-index: 110;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px;
      text-align: center;
      overflow: hidden;
    }

    .victory-overlay.hidden {
      display: none !important;
    }

    .victory-card {
      background: rgba(6, 20, 50, 0.92);
      border: 4px solid var(--accent-gold);
      box-shadow: 0 0 60px rgba(255, 215, 0, 0.5), 0 20px 60px rgba(0, 0, 0, 0.8);
      border-radius: 28px;
      padding: 36px 32px;
      max-width: 560px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
      z-index: 2;
      animation: victoryPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes victoryPop {
      0% { transform: scale(0.6); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .victory-trophy {
      font-size: 5rem;
      line-height: 1;
      filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.8));
      animation: trophyFloat 2s infinite alternate ease-in-out;
    }

    @keyframes trophyFloat {
      0% { transform: translateY(0px) rotate(-3deg); }
      100% { transform: translateY(-10px) rotate(3deg); }
    }

    .victory-heading {
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--accent-gold);
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
      letter-spacing: 1px;
    }

    .victory-player-name {
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
    }

    .victory-reason {
      font-size: 1.2rem;
      color: #93c5fd;
      font-weight: 600;
    }

    .btn-play-again {
      margin-top: 12px;
      padding: 14px 32px;
      border-radius: 16px;
      background: linear-gradient(135deg, #ffd85b 0%, #d97706 100%);
      border: 2px solid #ffffff;
      color: #081d42;
      font-size: 1.2rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 0 25px rgba(255, 216, 91, 0.6);
      transition: all 0.2s ease;
    }

    .btn-play-again:hover {
      transform: scale(1.05);
      box-shadow: 0 0 35px rgba(255, 216, 91, 0.8);
    }

    /* CONFETTI CANVAS / PARTICLES */
    .confetti-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .confetti-piece {
      position: absolute;
      width: 10px;
      height: 14px;
      top: -20px;
      border-radius: 2px;
      opacity: 0.9;
      animation: confettiFall 3.2s linear infinite;
    }

    @keyframes confettiFall {
      0% {
        transform: translateY(0) rotateX(0deg) rotateZ(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(105vh) rotateX(720deg) rotateZ(360deg);
        opacity: 0.2;
      }
    }

    /* RESPONSIVE BREAKPOINTS */
    @media (max-width: 850px) {
      .game-layout-grid {
        grid-template-columns: 1fr;
      }

      .controls-column {
        position: static;
        max-width: 440px;
        margin: 0 auto;
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .app-header {
        padding: 8px 12px;
      }

      .title-image {
        width: min(64vw, 250px);
        height: 46px;
      }

      .header-btn {
        padding: 6px 10px;
        font-size: 0.82rem;
      }

      .app-main {
        padding: 6px 12px 30px;
      }

      .settings-container {
        padding: 20px 14px;
      }

      .mode-cards-grid {
        grid-template-columns: 1fr;
      }

      .bulk-textareas-grid {
        grid-template-columns: 1fr;
      }

      .board-frame {
        border-radius: 14px;
        border-width: 3px;
      }

      .control-panel-box {
        padding: 14px 12px;
      }
    }

    /* ACCESSIBILITY: REDUCED MOTION */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* ACCESSIBILITY: SR ONLY */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="app-header">
    <div class="title-image-wrapper">
      <img src="${titleB64}" alt="SNAKES AND LADDER" class="title-image" />
    </div>
    <div class="header-actions">
      <button id="langToggleBtn" class="header-btn" aria-label="Toggle language">
        🌐 English
      </button>
      <button id="soundToggleBtn" class="header-btn" aria-pressed="true" aria-label="Toggle sound effects">
        🔊 الصوت يعمل
      </button>
    </div>
  </header>

  <!-- MAIN VIEWPORT -->
  <main class="app-main">

    <!-- 1. SETTINGS SCREEN -->
    <section id="settingsScreen" class="view-screen" aria-labelledby="settingsHeading">
      <div class="settings-container">
        <h1 id="settingsHeading" class="settings-heading">إعداد اللعبة التعليمية</h1>
        <p id="settingsSubtitle" class="settings-subtitle">اختر طريقة اللعب، واحفظ أسماء اللاعبين، وأدر الأسئلة التعليمية العشرين (20 سؤالاً).</p>

        <!-- PLAY MODE SELECTOR -->
        <div id="chooseModeTitle" class="settings-section-title">🎮 اختر طريقة اللعب</div>
        <div class="mode-cards-grid" role="group" aria-label="Game mode selection">
          <button type="button" id="modeVsCpuBtn" class="mode-card" aria-pressed="true">
            <span style="font-size: 1.8rem;">🤖</span>
            <span id="modeVsCpuText">ضد الكمبيوتر</span>
          </button>
          <button type="button" id="modeVariousBtn" class="mode-card" aria-pressed="false">
            <span style="font-size: 1.8rem;">👥</span>
            <span id="modeVariousText">لاعبون محليون</span>
          </button>
        </div>

        <!-- PLAYER COUNT (SHOWN FOR VARIOUS PLAYERS) -->
        <div id="playerCountBox" class="player-count-box" style="display: none;">
          <span id="playerCountLabel" style="font-weight: 700; color: #93c5fd;">عدد اللاعبين (2 إلى 5):</span>
          <div class="count-buttons-group" role="group" aria-label="Number of players">
            <button type="button" class="count-btn active" data-count="2">2</button>
            <button type="button" class="count-btn" data-count="3">3</button>
            <button type="button" class="count-btn" data-count="4">4</button>
            <button type="button" class="count-btn" data-count="5">5</button>
          </div>
        </div>

        <!-- PLAYER NAMES -->
        <div id="playerNamesTitle" class="settings-section-title">✏️ أسماء اللاعبين</div>
        <div class="player-names-container">
          <div id="playerNamesList">
            <!-- Dynamic name input rows -->
          </div>
          <div class="names-action-bar">
            <button type="button" id="saveNamesBtn" class="btn-green">
              💾 حفظ أسماء اللاعبين
            </button>
            <span id="namesStatusTag" class="names-status-tag" aria-live="polite"></span>
          </div>
        </div>

        <!-- QUESTION EDITOR DETAILS -->
        <details class="questions-details-box" open>
          <summary id="questionsSummary">الأسئلة التعليمية (20 سؤالاً بالتمام)</summary>
          <div class="questions-content">

            <!-- PRESET QUESTIONS ONE-CLICK BUTTONS -->
            <div class="presets-row">
              <span style="font-weight: 700; color: #93c5fd; align-self: center; font-size: 0.9rem;">نماذج الأسئلة:</span>
              <button type="button" id="loadArabic20Btn" class="preset-btn">
                ✨ تحميل 20 سؤالاً تعليمياً بالعربية
              </button>
              <button type="button" id="loadEnglish20Btn" class="preset-btn">
                📖 Load 20 English Questions
              </button>
              <button type="button" id="clearAllQuestionsBtn" class="preset-btn" style="border-color: #f87171; background: #55161d;">
                🗑️ مسح الكل
              </button>
            </div>

            <div class="tabs-header" role="tablist">
              <button type="button" id="tabBulkBtn" class="tab-btn active" role="tab" aria-selected="true">المحرر الجماعي (20 سطر)</button>
              <button type="button" id="tabSingleBtn" class="tab-btn" role="tab" aria-selected="false">محرر خانة محددة (1-20)</button>
            </div>

            <!-- BULK TAB -->
            <div id="bulkEditorView">
              <div class="bulk-textareas-grid">
                <div>
                  <label id="bulkQLabel" for="bulkQuestionsArea">الأسئلة (سطر لكل خانة من 1 إلى 20):</label>
                  <textarea id="bulkQuestionsArea" class="bulk-textarea" placeholder="السطر 1: ما ناتج 3 + 4؟&#10;السطر 2: ما هو أسرع حيوان بري؟"></textarea>
                </div>
                <div>
                  <label id="bulkALabel" for="bulkAnswersArea">الإجابات الصحيحة (سطر لكل إجابة):</label>
                  <textarea id="bulkAnswersArea" class="bulk-textarea" placeholder="السطر 1: 7&#10;السطر 2: الفهد"></textarea>
                </div>
              </div>
              <button type="button" id="importBulkBtn" class="btn-green" style="padding: 8px 18px; font-size: 0.95rem;">
                📥 حفظ واستيراد الأسئلة
              </button>
            </div>

            <!-- SINGLE SQUARE TAB -->
            <div id="singleEditorView" style="display: none;">
              <div class="single-editor-box">
                <div class="single-input-row">
                  <label id="chooseSqLabel" for="squareSelect">اختر الخانة:</label>
                  <select id="squareSelect">
                    <!-- 1 to 20 options populated by JS -->
                  </select>
                </div>
                <div class="single-input-row">
                  <label id="singleQLabel" for="singleQuestionInput">السؤال:</label>
                  <input type="text" id="singleQuestionInput" placeholder="أدخل السؤال لهذه الخانة" />
                </div>
                <div class="single-input-row">
                  <label id="singleALabel" for="singleAnswerInput">الإجابة الصحيحة:</label>
                  <input type="text" id="singleAnswerInput" placeholder="أدخل الإجابة الصحيحة المحددة" />
                </div>
                <div class="single-btn-group">
                  <button type="button" id="saveSingleSquareBtn" class="btn-green" style="padding: 8px 16px; font-size: 0.95rem;">
                    حفظ هذه الخانة
                  </button>
                  <button type="button" id="clearSingleSquareBtn" class="btn-danger">
                    تفريغ هذه الخانة
                  </button>
                </div>
              </div>
            </div>

            <div id="questionsStatusMsg" class="questions-feedback-msg" aria-live="polite"></div>
          </div>
        </details>

        <!-- START GAME BUTTON -->
        <button type="button" id="startGameBtn" class="btn-start-game">
          بدء اللعبة الآن ▶
        </button>
      </div>
    </section>

    <!-- 2. GAME PLAY SCREEN -->
    <section id="gameScreen" class="view-screen hidden" aria-labelledby="gameBoardHeading">
      <h2 id="gameBoardHeading" class="sr-only">لوحة لعبة السلم والثعبان التعليمية</h2>

      <!-- TOP ACTION BAR -->
      <div class="game-actions-bar">
        <button type="button" id="backToSettingsBtn" class="nav-btn">
          ← العودة للإعدادات
        </button>
        <button type="button" id="restartGameBtn" class="nav-btn">
          ↻ إعادة اللعبة
        </button>
      </div>

      <!-- BOARD + CONTROLS LAYOUT -->
      <div class="game-layout-grid">
        <!-- LEFT COLUMN: BOARD AND STARTING DOCK -->
        <div class="board-column">
          <!-- BOARD FRAME -->
          <div id="boardFrame" class="board-frame" role="region" aria-label="Snakes and Ladder 20 Square Board">
            <!-- MANDATORY BOARD IMAGE -->
            <img src="${boardB64}" alt="Snakes and Ladder Game Board Art" class="board-bg-image" />

            <!-- HIT GRID (5 cols x 4 rows) -->
            <div id="boardGrid" class="board-grid-overlay">
              <!-- Dynamically populated 20 square cells in serpentine order -->
            </div>
          </div>

          <!-- STARTING DOCK (Directly below board) -->
          <div class="starting-dock" role="region" aria-label="Starting Dock">
            <span id="dockLabel" class="dock-label">منصة البداية (STARTING DOCK)</span>
            <div id="dockSlots" class="dock-slots">
              <!-- Tokens resting at 0 -->
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: CONTROL PANEL -->
        <aside class="controls-column" aria-label="Game controls and player info">
          <div class="control-panel-box">
            <!-- CURRENT TURN BANNER -->
            <div class="current-turn-banner">
              <div id="currentTurnLabel" class="turn-label-small">الدور الحالي (CURRENT TURN)</div>
              <div id="activePlayerName" class="turn-player-name">اللاعب 1</div>
            </div>

            <!-- STATUS DISPLAY -->
            <div id="gameStatusText" class="turn-status-text" aria-live="polite">
              انقر على النرد لرميه.
            </div>

            <!-- AVATAR + DICE STAGE -->
            <div class="avatar-dice-stage">
              <!-- AVATAR WITH 3 FLOATING QUESTION MARKS -->
              <div class="avatar-wrapper" aria-hidden="true">
                <div class="avatar-floating-qmarks">
                  <span class="floating-qmark">?</span>
                  <span class="floating-qmark">?</span>
                  <span class="floating-qmark">?</span>
                </div>
                <div class="avatar-img-box">
                  <img src="${avatarB64}" alt="Snakes and Ladder Avatar" class="avatar-img" />
                </div>
              </div>

              <!-- STATIONARY 96x96 BUTTON HOUSING 76x76 3D CUBE -->
              <div class="dice-container-box">
                <button type="button" id="diceBtn" class="dice-stationary-btn" aria-label="Roll the dice">
                  <div id="diceCube" class="dice-cube">
                    <!-- Face 1 -->
                    <div class="dice-face face-1">
                      <div></div><div></div><div></div>
                      <div></div><div class="dice-pip"></div><div></div>
                      <div></div><div></div><div></div>
                    </div>
                    <!-- Face 2 -->
                    <div class="dice-face face-2">
                      <div class="dice-pip"></div><div></div><div></div>
                      <div></div><div></div><div></div>
                      <div></div><div></div><div class="dice-pip"></div>
                    </div>
                    <!-- Face 3 -->
                    <div class="dice-face face-3">
                      <div class="dice-pip"></div><div></div><div></div>
                      <div></div><div class="dice-pip"></div><div></div>
                      <div></div><div></div><div class="dice-pip"></div>
                    </div>
                    <!-- Face 4 -->
                    <div class="dice-face face-4">
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                      <div></div><div></div><div></div>
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                    </div>
                    <!-- Face 5 -->
                    <div class="dice-face face-5">
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                      <div></div><div class="dice-pip"></div><div></div>
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                    </div>
                    <!-- Face 6 -->
                    <div class="dice-face face-6">
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                      <div class="dice-pip"></div><div></div><div class="dice-pip"></div>
                    </div>
                  </div>
                </button>
                <button type="button" id="moveActionBtn" class="btn-move-action" style="display: none;">
                  تحريك خانة 1
                </button>
              </div>
            </div>

            <!-- PLAYERS LIST & TROPHY PROGRESS -->
            <div id="playersListContainer" class="control-players-list" role="region" aria-label="Player scores and trophies">
              <!-- Dynamically populated player cards -->
            </div>
          </div>

          <!-- FOOTER SIGNATURE OUTSIDE CONTROL BOX -->
          <footer class="author-signature" aria-label="Author signature">
            <span class="author-name">Dr.Abir Wafa</span>
            <span class="author-title">Head of EdTech at Edulixa</span>
          </footer>
        </aside>
      </div>
    </section>

  </main>

  <!-- QUESTION MODAL DIALOG -->
  <div id="questionModal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="modalSquareTitle">
    <div class="modal-box">
      <div class="modal-title">
        <span id="modalSquareTitle">سؤال الخانة</span>
        <span id="modalSquareIcon" style="font-size: 1.4rem;">❓</span>
      </div>
      <div id="modalQuestionText" class="modal-question-text">
        نص السؤال التعليمي...
      </div>
      <form id="questionForm" onsubmit="return false;">
        <label id="answerInputLabel" for="modalAnswerInput" class="sr-only">إجابتك</label>
        <input type="text" id="modalAnswerInput" class="modal-input" placeholder="اكتب إجابتك هنا..." autocomplete="off" />
        <div id="modalFeedbackMsg" class="modal-feedback" aria-live="polite"></div>
        <div class="modal-buttons-row">
          <button type="button" id="closeModalBtn" class="btn-secondary">إغلاق</button>
          <button type="submit" id="submitAnswerBtn" class="btn-green" style="padding: 10px 18px;">تحقق من الإجابة</button>
        </div>
      </form>
    </div>
  </div>

  <!-- SNAKE CRYING POPUP -->
  <div id="snakeCryPopup" class="snake-cry-popup" aria-hidden="true">
    <div class="snake-cry-emoji">😭</div>
    <div id="snakeCryText" class="snake-cry-text">لدغة ثعبان! تراجع للخلف!</div>
  </div>

  <!-- VICTORY OVERLAY -->
  <div id="victoryOverlay" class="victory-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="victoryHeading">
    <div id="confettiContainer" class="confetti-container"></div>
    <div class="victory-card">
      <div class="victory-trophy">🏆</div>
      <h2 id="victoryHeading" class="victory-heading">مبروك الفوز!</h2>
      <div id="victoryPlayerName" class="victory-player-name">اللاعب 1</div>
      <div id="victoryReason" class="victory-reason">فاز بجمع خمسة كؤوس!</div>
      <button type="button" id="playAgainBtn" class="btn-play-again">
        اللعب مجدداً ↻
      </button>
    </div>
  </div>

  <script>
    /* =========================================================================
       SNAKES AND LADDER - PRODUCTION STATE & GAME ENGINE
       ========================================================================= */

    const DEFAULT_COLORS = ['#ff5d66', '#1878ee', '#18a75b', '#8a4de1', '#ef8b20'];

    // Ladders and Snakes specifications
    const LADDERS = {
      2: 9,
      7: 14,
      12: 19
    };

    const SNAKES = {
      11: 10,
      13: 8,
      15: 6
    };

    // 20 square serpentine grid definition:
    // Row 1 (top):    20, 19, 18, 17, 16
    // Row 2:          11, 12, 13, 14, 15
    // Row 3:          10,  9,  8,  7,  6
    // Row 4 (bottom):  1,  2,  3,  4,  5
    const SERPENTINE_ROWS = [
      [20, 19, 18, 17, 16],
      [11, 12, 13, 14, 15],
      [10, 9, 8, 7, 6],
      [1, 2, 3, 4, 5]
    ];

    // 20 EXACT EDUCATIONAL QUESTIONS IN ARABIC
    const ARABIC_QUESTIONS_20 = [
      { q: "ما ناتج جمع 3 + 4؟", a: "7 / سبعة" },
      { q: "ما هو أسرع حيوان بري على اليابسة؟", a: "الفهد / فهد" },
      { q: "ما هو اللون الناتج عن خلط الأزرق والأصفر؟", a: "أخضر / اخضر" },
      { q: "كم عدد أرجل العنكبوت؟", a: "8 / ثمانية" },
      { q: "ما ناتج طرح 10 - 6؟", a: "4 / اربعة" },
      { q: "ما هو الشكل الهندسي المكون من 3 أضلاع؟", a: "مثلث / المثلث" },
      { q: "ما هو عكس كلمة بارد؟", a: "حار / ساخن" },
      { q: "ما اسم الكوكب الذي نعيش عليه؟", a: "الأرض / كوكب الأرض / الارض" },
      { q: "كم عدد أيام الأسبوع؟", a: "7 / سبعة" },
      { q: "ما ناتج ضرب 5 × 2؟", a: "10 / عشرة" },
      { q: "ما هي عاصمة المملكة العربية السعودية؟", a: "الرياض" },
      { q: "ما هي عاصمة جمهورية مصر العربية؟", a: "القاهرة" },
      { q: "ما ناتج قسمة 15 ÷ 3؟", a: "5 / خمسة" },
      { q: "ماذا ينتج النحل؟", a: "العسل / عسل" },
      { q: "كم شهراً في السنة الميلادية؟", a: "12 / اثنا عشر" },
      { q: "ما ناتج جمع 9 + 8؟", a: "17 / سبعة عشر" },
      { q: "طائر لا يطير ويعيش في الجليد ويجيد السباحة؟", a: "البطريق / بطريق" },
      { q: "ما ناتج طرح 20 - 11؟", a: "9 / تسعة" },
      { q: "ما هو أكبر محيط في العالم؟", a: "الهادئ / المحيط الهادئ" },
      { q: "ما ناتج ضرب 6 × 3؟", a: "18 / ثمانية عشر" }
    ];

    // 20 EXACT EDUCATIONAL QUESTIONS IN ENGLISH
    const ENGLISH_QUESTIONS_20 = [
      { q: "What is 3 + 4?", a: "7 / seven" },
      { q: "What is the fastest land animal on Earth?", a: "cheetah" },
      { q: "What color do blue and yellow make when mixed?", a: "green" },
      { q: "How many legs does a spider have?", a: "8 / eight" },
      { q: "What is 10 minus 6?", a: "4 / four" },
      { q: "Which geometric shape has 3 sides?", a: "triangle" },
      { q: "What is the opposite of cold?", a: "hot / warm" },
      { q: "What planet do we live on?", a: "earth / the earth" },
      { q: "How many days are in a week?", a: "7 / seven" },
      { q: "What is 5 x 2?", a: "10 / ten" },
      { q: "What is the capital of Saudi Arabia?", a: "riyadh" },
      { q: "What is the capital of Egypt?", a: "cairo" },
      { q: "What is 15 divided by 3?", a: "5 / five" },
      { q: "What sweet liquid do bees make?", a: "honey" },
      { q: "How many months are in a year?", a: "12 / twelve" },
      { q: "What is 9 + 8?", a: "17 / seventeen" },
      { q: "Which flightless bird lives in ice and swims well?", a: "penguin" },
      { q: "What is 20 minus 11?", a: "9 / nine" },
      { q: "What is the largest ocean in the world?", a: "pacific / pacific ocean" },
      { q: "What is 6 x 3?", a: "18 / eighteen" }
    ];

    // Audio effects engine (Web Audio API)
    class SoundEngine {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }

      initContext() {
        if (!this.ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            this.ctx = new AudioCtx();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }

      playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.18, startTime = 0) {
        if (!this.enabled) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
      }

      playSave() {
        if (!this.enabled) return;
        this.initContext();
        this.playTone(587.33, 'sine', 0.12, 0.15, 0);
        this.playTone(880, 'sine', 0.22, 0.18, 0.08);
      }

      playRoll() {
        if (!this.enabled) return;
        this.initContext();
        for (let i = 0; i < 6; i++) {
          this.playTone(180 + Math.random() * 120, 'triangle', 0.06, 0.1, i * 0.12);
        }
      }

      playStep() {
        if (!this.enabled) return;
        this.initContext();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.14);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }

      playBlocked() {
        if (!this.enabled) return;
        this.initContext();
        this.playTone(150, 'sawtooth', 0.2, 0.12, 0);
        this.playTone(110, 'sawtooth', 0.25, 0.14, 0.1);
      }

      playLadder() {
        if (!this.enabled) return;
        this.initContext();
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
        notes.forEach((f, idx) => {
          this.playTone(f, 'sine', 0.2, 0.16, idx * 0.09);
        });
      }

      playSnake() {
        if (!this.enabled) return;
        this.initContext();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.45);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      }

      playWrong() {
        if (!this.enabled) return;
        this.initContext();
        this.playTone(220, 'square', 0.18, 0.12, 0);
        this.playTone(180, 'square', 0.24, 0.12, 0.12);
      }

      playCorrect() {
        if (!this.enabled) return;
        this.initContext();
        const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
        notes.forEach((f, idx) => {
          this.playTone(f, 'triangle', 0.22, 0.15, idx * 0.08);
        });
      }

      playVictory() {
        if (!this.enabled) return;
        this.initContext();
        const fanfare = [
          { f: 523.25, d: 0.15, t: 0 },
          { f: 659.25, d: 0.15, t: 0.15 },
          { f: 783.99, d: 0.25, t: 0.3 },
          { f: 1046.5, d: 0.5, t: 0.55 }
        ];
        fanfare.forEach(n => {
          this.playTone(n.f, 'triangle', n.d, 0.22, n.t);
          this.playTone(n.f * 1.5, 'sine', n.d, 0.1, n.t);
        });
      }
    }

    const sound = new SoundEngine();

    // Master Game State Object
    const state = {
      lang: 'ar', // 'ar' or 'en'
      mode: 'vs-computer', // 'vs-computer' | 'various-players'
      playerCount: 2,
      savedNames: ['', '', '', '', ''],
      namesDirty: false,
      players: [],
      activeIdx: 0,
      rolledValue: 1,
      busy: false,
      questions: Array.from({ length: 20 }, () => ({ q: '', a: '' })),
      openSquare: null,
      gameOver: false,
      movePending: false
    };

    // DOM Elements
    const elements = {
      langToggleBtn: document.getElementById('langToggleBtn'),
      soundToggleBtn: document.getElementById('soundToggleBtn'),
      settingsScreen: document.getElementById('settingsScreen'),
      gameScreen: document.getElementById('gameScreen'),
      settingsHeading: document.getElementById('settingsHeading'),
      settingsSubtitle: document.getElementById('settingsSubtitle'),
      chooseModeTitle: document.getElementById('chooseModeTitle'),
      modeVsCpuBtn: document.getElementById('modeVsCpuBtn'),
      modeVsCpuText: document.getElementById('modeVsCpuText'),
      modeVariousBtn: document.getElementById('modeVariousBtn'),
      modeVariousText: document.getElementById('modeVariousText'),
      playerCountBox: document.getElementById('playerCountBox'),
      playerCountLabel: document.getElementById('playerCountLabel'),
      playerNamesTitle: document.getElementById('playerNamesTitle'),
      playerNamesList: document.getElementById('playerNamesList'),
      saveNamesBtn: document.getElementById('saveNamesBtn'),
      namesStatusTag: document.getElementById('namesStatusTag'),
      questionsSummary: document.getElementById('questionsSummary'),
      loadArabic20Btn: document.getElementById('loadArabic20Btn'),
      loadEnglish20Btn: document.getElementById('loadEnglish20Btn'),
      clearAllQuestionsBtn: document.getElementById('clearAllQuestionsBtn'),
      tabBulkBtn: document.getElementById('tabBulkBtn'),
      tabSingleBtn: document.getElementById('tabSingleBtn'),
      bulkEditorView: document.getElementById('bulkEditorView'),
      singleEditorView: document.getElementById('singleEditorView'),
      bulkQLabel: document.getElementById('bulkQLabel'),
      bulkALabel: document.getElementById('bulkALabel'),
      bulkQuestionsArea: document.getElementById('bulkQuestionsArea'),
      bulkAnswersArea: document.getElementById('bulkAnswersArea'),
      importBulkBtn: document.getElementById('importBulkBtn'),
      chooseSqLabel: document.getElementById('chooseSqLabel'),
      squareSelect: document.getElementById('squareSelect'),
      singleQLabel: document.getElementById('singleQLabel'),
      singleQuestionInput: document.getElementById('singleQuestionInput'),
      singleALabel: document.getElementById('singleALabel'),
      singleAnswerInput: document.getElementById('singleAnswerInput'),
      saveSingleSquareBtn: document.getElementById('saveSingleSquareBtn'),
      clearSingleSquareBtn: document.getElementById('clearSingleSquareBtn'),
      questionsStatusMsg: document.getElementById('questionsStatusMsg'),
      startGameBtn: document.getElementById('startGameBtn'),
      backToSettingsBtn: document.getElementById('backToSettingsBtn'),
      restartGameBtn: document.getElementById('restartGameBtn'),
      boardFrame: document.getElementById('boardFrame'),
      boardGrid: document.getElementById('boardGrid'),
      dockLabel: document.getElementById('dockLabel'),
      dockSlots: document.getElementById('dockSlots'),
      currentTurnLabel: document.getElementById('currentTurnLabel'),
      activePlayerName: document.getElementById('activePlayerName'),
      gameStatusText: document.getElementById('gameStatusText'),
      diceBtn: document.getElementById('diceBtn'),
      diceCube: document.getElementById('diceCube'),
      moveActionBtn: document.getElementById('moveActionBtn'),
      playersListContainer: document.getElementById('playersListContainer'),
      questionModal: document.getElementById('questionModal'),
      modalSquareTitle: document.getElementById('modalSquareTitle'),
      modalSquareIcon: document.getElementById('modalSquareIcon'),
      modalQuestionText: document.getElementById('modalQuestionText'),
      modalAnswerInput: document.getElementById('modalAnswerInput'),
      modalFeedbackMsg: document.getElementById('modalFeedbackMsg'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      submitAnswerBtn: document.getElementById('submitAnswerBtn'),
      questionForm: document.getElementById('questionForm'),
      snakeCryPopup: document.getElementById('snakeCryPopup'),
      snakeCryText: document.getElementById('snakeCryText'),
      victoryOverlay: document.getElementById('victoryOverlay'),
      confettiContainer: document.getElementById('confettiContainer'),
      victoryHeading: document.getElementById('victoryHeading'),
      victoryPlayerName: document.getElementById('victoryPlayerName'),
      victoryReason: document.getElementById('victoryReason'),
      playAgainBtn: document.getElementById('playAgainBtn')
    };

    // Helper: Normalize answers (bilingual Arabic & English smart matcher)
    function normalizeAnswer(str) {
      if (!str) return '';
      let s = String(str).trim().toLowerCase();
      // Normalize Arabic numerals to standard digits
      s = s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
      // Remove Arabic Tashkeel / Harakat
      s = s.replace(/[\u064B-\u065F\u0670]/g, '');
      // Normalize Alef variations
      s = s.replace(/[أإآ]/g, 'ا');
      // Normalize Taa Marbuta
      s = s.replace(/ة/g, 'ه');
      // Normalize Alef Maqsura
      s = s.replace(/ى/g, 'ي');
      // Collapse whitespace
      s = s.replace(/\\s+/g, ' ');
      return s;
    }

    // Check if user answer matches any valid stored answer
    function checkAnswerMatch(userAnswer, storedAnswer) {
      const normUser = normalizeAnswer(userAnswer);
      if (!normUser) return false;

      const validList = String(storedAnswer)
        .split(/[/,،]/)
        .map(a => normalizeAnswer(a))
        .filter(Boolean);

      for (const valid of validList) {
        if (normUser === valid) return true;
        // Check Arabic "ال" prefix variation (e.g. فهد vs الفهد)
        if (normUser.startsWith('ال') && normUser.slice(2) === valid) return true;
        if (valid.startsWith('ال') && valid.slice(2) === normUser) return true;
        // Check numeric equality
        if (!isNaN(normUser) && !isNaN(valid) && Number(normUser) === Number(valid)) return true;
      }
      return false;
    }

    // Apply Language UI Strings
    function applyLanguageStrings() {
      const isAr = state.lang === 'ar';
      document.documentElement.lang = isAr ? 'ar' : 'en';
      document.documentElement.dir = isAr ? 'rtl' : 'ltr';

      elements.langToggleBtn.textContent = isAr ? '🌐 English' : '🌐 العربية';
      elements.soundToggleBtn.textContent = isAr 
        ? (sound.enabled ? '🔊 الصوت يعمل' : '🔇 كتم الصوت')
        : (sound.enabled ? '🔊 Sound on' : '🔇 Sound off');

      if (isAr) {
        elements.settingsHeading.textContent = 'إعداد اللعبة التعليمية';
        elements.settingsSubtitle.textContent = 'اختر طريقة اللعب، واحفظ أسماء اللاعبين، وأدر الأسئلة التعليمية العشرين (20 سؤالاً).';
        elements.chooseModeTitle.textContent = '🎮 اختر طريقة اللعب';
        elements.modeVsCpuText.textContent = 'ضد الكمبيوتر';
        elements.modeVariousText.textContent = 'لاعبون محليون';
        elements.playerCountLabel.textContent = 'عدد اللاعبين (2 إلى 5):';
        elements.playerNamesTitle.textContent = '✏️ أسماء اللاعبين';
        elements.saveNamesBtn.textContent = '💾 حفظ أسماء اللاعبين';
        elements.questionsSummary.textContent = 'الأسئلة التعليمية (20 سؤالاً بالتمام)';
        elements.tabBulkBtn.textContent = 'المحرر الجماعي (20 سطر)';
        elements.tabSingleBtn.textContent = 'محرر خانة محددة (1-20)';
        elements.bulkQLabel.textContent = 'الأسئلة (سطر لكل خانة من 1 إلى 20):';
        elements.bulkALabel.textContent = 'الإجابات الصحيحة (سطر لكل إجابة):';
        elements.importBulkBtn.textContent = '📥 حفظ واستيراد الأسئلة';
        elements.chooseSqLabel.textContent = 'اختر الخانة:';
        elements.singleQLabel.textContent = 'السؤال:';
        elements.singleALabel.textContent = 'الإجابة الصحيحة:';
        elements.saveSingleSquareBtn.textContent = 'حفظ هذه الخانة';
        elements.clearSingleSquareBtn.textContent = 'تفريغ هذه الخانة';
        elements.startGameBtn.textContent = 'بدء اللعبة الآن ▶';
        elements.backToSettingsBtn.textContent = '← العودة للإعدادات';
        elements.restartGameBtn.textContent = '↻ إعادة اللعبة';
        elements.dockLabel.textContent = 'منصة البداية (STARTING DOCK)';
        elements.currentTurnLabel.textContent = 'الدور الحالي (CURRENT TURN)';
        elements.closeModalBtn.textContent = 'إغلاق';
        elements.submitAnswerBtn.textContent = 'تحقق من الإجابة';
        elements.victoryHeading.textContent = 'مبروك الفوز!';
        elements.playAgainBtn.textContent = 'اللعب مجدداً ↻';
      } else {
        elements.settingsHeading.textContent = 'Set up your game';
        elements.settingsSubtitle.textContent = 'Choose how to play, save the player names, and manage your 20 learning questions.';
        elements.chooseModeTitle.textContent = '🎮 Choose play mode';
        elements.modeVsCpuText.textContent = 'Versus computer';
        elements.modeVariousText.textContent = 'Various players';
        elements.playerCountLabel.textContent = 'Number of players (2–5):';
        elements.playerNamesTitle.textContent = '✏️ Player names';
        elements.saveNamesBtn.textContent = '💾 Save player names';
        elements.questionsSummary.textContent = 'Learning questions (exact 20 questions)';
        elements.tabBulkBtn.textContent = 'Bulk editor (20 lines)';
        elements.tabSingleBtn.textContent = 'Single square editor (1-20)';
        elements.bulkQLabel.textContent = 'Questions, one per line (1 to 20):';
        elements.bulkALabel.textContent = 'Answers, one per line:';
        elements.importBulkBtn.textContent = '📥 Import bulk questions';
        elements.chooseSqLabel.textContent = 'Choose square:';
        elements.singleQLabel.textContent = 'Question:';
        elements.singleALabel.textContent = 'Exact answer:';
        elements.saveSingleSquareBtn.textContent = 'Save this square';
        elements.clearSingleSquareBtn.textContent = 'Clear this square';
        elements.startGameBtn.textContent = 'Start the game ▶';
        elements.backToSettingsBtn.textContent = '← Back to settings';
        elements.restartGameBtn.textContent = '↻ Restart game';
        elements.dockLabel.textContent = 'STARTING DOCK';
        elements.currentTurnLabel.textContent = 'CURRENT TURN';
        elements.closeModalBtn.textContent = 'Close';
        elements.submitAnswerBtn.textContent = 'Check my answer';
        elements.victoryHeading.textContent = 'Victory!';
        elements.playAgainBtn.textContent = 'Play again ↻';
      }

      renderSettingsInputs();
      populateSquareSelect();
      populateBulkEditor();
      updateTurnUI();
    }

    // Persistence: Load & Save
    function loadSavedState() {
      try {
        const rawNames = localStorage.getItem('snakeTrailNames');
        if (rawNames) {
          const parsed = JSON.parse(rawNames);
          if (Array.isArray(parsed)) {
            for (let i = 0; i < 5; i++) {
              state.savedNames[i] = typeof parsed[i] === 'string' ? parsed[i].slice(0, 22) : '';
            }
          }
        }
      } catch (err) {
        console.warn('Could not read saved names:', err);
      }

      try {
        const rawQuestions = localStorage.getItem('snakeTrailQuestions');
        if (rawQuestions) {
          const parsed = JSON.parse(rawQuestions);
          if (Array.isArray(parsed) && parsed.length === 20 && parsed.some(x => x.q && x.q.trim())) {
            state.questions = parsed.map(item => ({
              q: typeof item?.q === 'string' ? item.q : '',
              a: typeof item?.a === 'string' ? item.a : ''
            }));
          } else {
            state.questions = ARABIC_QUESTIONS_20.map(item => ({ ...item }));
            saveQuestionsToStorage();
          }
        } else {
          state.questions = ARABIC_QUESTIONS_20.map(item => ({ ...item }));
          saveQuestionsToStorage();
        }
      } catch (err) {
        console.warn('Could not read questions, using Arabic defaults:', err);
        state.questions = ARABIC_QUESTIONS_20.map(item => ({ ...item }));
      }
    }

    function saveNamesToStorage() {
      try {
        localStorage.setItem('snakeTrailNames', JSON.stringify(state.savedNames));
        state.namesDirty = false;
        const validCount = state.savedNames.filter(n => n.trim() !== '').length;
        const msg = state.lang === 'ar' ? \`✓ تم حفظ أسماء \${validCount} لاعبين\` : \`✓ \${validCount} names saved\`;
        elements.namesStatusTag.textContent = msg;
        elements.namesStatusTag.className = 'names-status-tag saved';
        sound.playSave();
      } catch (err) {
        console.error('Failed to save names:', err);
      }
    }

    function saveQuestionsToStorage() {
      try {
        localStorage.setItem('snakeTrailQuestions', JSON.stringify(state.questions));
        updateBoardQuestionBadges();
      } catch (err) {
        console.error('Failed to save questions:', err);
      }
    }

    // Build Settings Inputs
    function renderSettingsInputs() {
      elements.playerNamesList.innerHTML = '';
      const totalInputs = state.mode === 'vs-computer' ? 1 : state.playerCount;
      const isAr = state.lang === 'ar';

      for (let i = 0; i < totalInputs; i++) {
        const row = document.createElement('div');
        row.className = 'player-name-row';

        const dot = document.createElement('div');
        dot.className = 'player-badge-dot';
        dot.style.background = DEFAULT_COLORS[i];
        dot.textContent = i + 1;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'player-name-input';
        input.maxLength = 22;
        input.placeholder = isAr 
          ? \`اسم اللاعب \${i + 1} (اختياري، الافتراضي: لاعب \${i + 1})\`
          : \`Player \${i + 1} name (optional, defaults to P\${i + 1})\`;
        input.value = state.savedNames[i] || '';
        input.setAttribute('aria-label', \`Player \${i + 1} Name\`);

        input.addEventListener('input', (e) => {
          state.savedNames[i] = e.target.value.slice(0, 22);
          state.namesDirty = true;
          elements.namesStatusTag.textContent = isAr ? 'تعديلات غير محفوظة' : 'Unsaved changes';
          elements.namesStatusTag.className = 'names-status-tag unsaved';
        });

        row.appendChild(dot);
        row.appendChild(input);
        elements.playerNamesList.appendChild(row);
      }

      if (state.mode === 'vs-computer') {
        const cpuRow = document.createElement('div');
        cpuRow.className = 'player-name-row';
        const cpuDot = document.createElement('div');
        cpuDot.className = 'player-badge-dot';
        cpuDot.style.background = DEFAULT_COLORS[1];
        cpuDot.textContent = '🤖';

        const cpuInput = document.createElement('input');
        cpuInput.type = 'text';
        cpuInput.className = 'player-name-input';
        cpuInput.value = isAr ? 'الكمبيوتر (CPU)' : 'CPU';
        cpuInput.disabled = true;
        cpuInput.style.opacity = '0.75';
        cpuInput.setAttribute('aria-label', 'Computer opponent');

        cpuRow.appendChild(cpuDot);
        cpuRow.appendChild(cpuInput);
        elements.playerNamesList.appendChild(cpuRow);
      }

      const savedCount = state.savedNames.filter(n => n.trim() !== '').length;
      if (savedCount > 0 && !state.namesDirty) {
        elements.namesStatusTag.textContent = isAr ? \`✓ تم حفظ أسماء \${savedCount} لاعبين\` : \`✓ \${savedCount} names saved\`;
        elements.namesStatusTag.className = 'names-status-tag saved';
      } else if (state.namesDirty) {
        elements.namesStatusTag.textContent = isAr ? 'تعديلات غير محفوظة' : 'Unsaved changes';
        elements.namesStatusTag.className = 'names-status-tag unsaved';
      } else {
        elements.namesStatusTag.textContent = '';
      }
    }

    // Populate Square Dropdown for Single Editor
    function populateSquareSelect() {
      elements.squareSelect.innerHTML = '';
      const isAr = state.lang === 'ar';
      for (let i = 1; i <= 20; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        const qRecord = state.questions[i - 1];
        const hasQ = qRecord && qRecord.q.trim() !== '';
        opt.textContent = isAr 
          ? \`الخانة \${i} \${hasQ ? '✓' : '(فارغة)'}\`
          : \`Square \${i} \${hasQ ? '✓' : '(empty)'}\`;
        elements.squareSelect.appendChild(opt);
      }
      loadSingleSquareToInputs(1);
    }

    function loadSingleSquareToInputs(sqNum) {
      const record = state.questions[sqNum - 1] || { q: '', a: '' };
      elements.singleQuestionInput.value = record.q || '';
      elements.singleAnswerInput.value = record.a || '';
    }

    // Populate Bulk Editor from State (Exactly 20 questions)
    function populateBulkEditor() {
      const qLines = [];
      const aLines = [];
      for (let i = 0; i < 20; i++) {
        const item = state.questions[i] || { q: '', a: '' };
        qLines.push(item.q.trim());
        aLines.push(item.a.trim());
      }
      elements.bulkQuestionsArea.value = qLines.join('\\n');
      elements.bulkAnswersArea.value = aLines.join('\\n');
    }

    // Create Board Grid Elements
    function buildBoardGrid() {
      elements.boardGrid.innerHTML = '';

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          const squareNum = SERPENTINE_ROWS[r][c];
          const cell = document.createElement('div');
          cell.className = 'square-hit-cell';
          cell.dataset.square = squareNum;
          cell.dataset.row = r;
          cell.dataset.col = c;

          const qBtn = document.createElement('button');
          qBtn.type = 'button';
          qBtn.className = \`question-mark-btn col-\${c + 1}\`;
          qBtn.textContent = '?';
          qBtn.setAttribute('aria-label', \`Open question for square \${squareNum}\`);
          qBtn.dataset.square = squareNum;

          qBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSquareQuestion(squareNum);
          });

          cell.appendChild(qBtn);
          elements.boardGrid.appendChild(cell);
        }
      }
      updateBoardQuestionBadges();
    }

    // Update Question Badges Glow & Status
    function updateBoardQuestionBadges() {
      const buttons = elements.boardGrid.querySelectorAll('.question-mark-btn');
      buttons.forEach(btn => {
        const sq = parseInt(btn.dataset.square, 10);
        const record = state.questions[sq - 1];
        if (record && record.q.trim() !== '') {
          btn.classList.add('has-saved-question');
        } else {
          btn.classList.remove('has-saved-question');
        }
      });
    }

    // Initialize Game Session
    function startGameSession() {
      state.players = [];
      state.activeIdx = 0;
      state.rolledValue = 1;
      state.busy = false;
      state.gameOver = false;
      state.movePending = false;
      const isAr = state.lang === 'ar';

      if (state.mode === 'vs-computer') {
        const p1Default = isAr ? 'اللاعب 1' : 'P1';
        const p1Name = state.savedNames[0].trim() || p1Default;
        state.players.push({
          id: 1,
          name: p1Name,
          color: DEFAULT_COLORS[0],
          pos: 0,
          trophies: 0,
          isCPU: false,
          earnedSquares: new Set()
        });
        state.players.push({
          id: 2,
          name: isAr ? 'الكمبيوتر' : 'CPU',
          color: DEFAULT_COLORS[1],
          pos: 0,
          trophies: 0,
          isCPU: true,
          earnedSquares: new Set()
        });
      } else {
        for (let i = 0; i < state.playerCount; i++) {
          const pDefault = isAr ? \`اللاعب \${i + 1}\` : \`P\${i + 1}\`;
          const pName = state.savedNames[i].trim() || pDefault;
          state.players.push({
            id: i + 1,
            name: pName,
            color: DEFAULT_COLORS[i],
            pos: 0,
            trophies: 0,
            isCPU: false,
            earnedSquares: new Set()
          });
        }
      }

      elements.settingsScreen.classList.add('hidden');
      elements.gameScreen.classList.remove('hidden');
      elements.victoryOverlay.classList.add('hidden');
      elements.moveActionBtn.style.display = 'none';
      elements.diceBtn.disabled = false;

      renderPlayerCards();
      renderTokenElements();
      updateTurnUI();
      repositionAllTokens();

      sound.initContext();
    }

    // Restart Active Game (preserves names & questions)
    function restartGame() {
      if (state.busy) return;
      state.activeIdx = 0;
      state.rolledValue = 1;
      state.busy = false;
      state.gameOver = false;
      state.movePending = false;

      state.players.forEach(p => {
        p.pos = 0;
        p.trophies = 0;
        p.earnedSquares = new Set();
      });

      elements.victoryOverlay.classList.add('hidden');
      elements.moveActionBtn.style.display = 'none';
      elements.diceBtn.disabled = false;

      renderPlayerCards();
      updateTurnUI();
      repositionAllTokens();
      const isAr = state.lang === 'ar';
      setStatusText(isAr ? 'تمت إعادة ضبط اللعبة! انقر على النرد لبدء الرمي.' : 'Game restarted! Click the dice to roll.');
    }

    // Render Player Cards in Control Panel
    function renderPlayerCards() {
      elements.playersListContainer.innerHTML = '';
      state.players.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = \`player-card-row \${idx === state.activeIdx ? 'active' : ''}\`;
        card.id = \`playerCard-\${p.id}\`;

        const info = document.createElement('div');
        info.className = 'player-card-info';

        const dot = document.createElement('div');
        dot.className = 'player-card-dot';
        dot.style.background = p.color;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = p.name;

        info.appendChild(dot);
        info.appendChild(nameSpan);

        const trophySpan = document.createElement('div');
        trophySpan.className = 'player-card-trophy';
        trophySpan.id = \`playerTrophy-\${p.id}\`;
        trophySpan.innerHTML = \`🏆 \${p.trophies}/5\`;

        card.appendChild(info);
        card.appendChild(trophySpan);
        elements.playersListContainer.appendChild(card);
      });
    }

    // Render Token DOM elements
    function renderTokenElements() {
      document.querySelectorAll('.player-token').forEach(t => t.remove());

      state.players.forEach(p => {
        const token = document.createElement('div');
        token.className = 'player-token';
        token.id = \`token-\${p.id}\`;
        token.style.background = \`radial-gradient(circle at 35% 35%, #ffffff 0%, \${p.color} 45%, #000000 100%)\`;
        token.textContent = p.isCPU ? (state.lang === 'ar' ? 'ك' : 'C') : p.id;
        token.setAttribute('aria-label', \`\${p.name} token\`);
        elements.boardFrame.appendChild(token);
      });
    }

    // Update Turn Display & Active Card
    function updateTurnUI() {
      const activePlayer = state.players[state.activeIdx];
      if (!activePlayer) return;

      elements.activePlayerName.textContent = activePlayer.name;
      elements.activePlayerName.style.color = activePlayer.color;

      state.players.forEach((p, idx) => {
        const card = document.getElementById(\`playerCard-\${p.id}\`);
        if (card) {
          if (idx === state.activeIdx) {
            card.classList.add('active');
            card.style.outlineColor = p.color;
            card.style.borderColor = p.color;
          } else {
            card.classList.remove('active');
            card.style.outlineColor = 'transparent';
            card.style.borderColor = '#ded6c2';
          }
        }
      });

      const isAr = state.lang === 'ar';
      if (activePlayer.isCPU && !state.gameOver && !state.busy) {
        setStatusText(isAr ? 'دور الكمبيوتر الآن. يقوم برمي النرد...' : "CPU's turn. Rolling...");
        elements.diceBtn.disabled = true;
        elements.moveActionBtn.style.display = 'none';
        setTimeout(() => {
          if (!state.gameOver && state.players[state.activeIdx]?.isCPU) {
            handleDiceRoll(true);
          }
        }, 700);
      } else if (!state.gameOver && !state.busy) {
        elements.diceBtn.disabled = false;
        setStatusText(isAr 
          ? \`دور \${activePlayer.name}. انقر على النرد للرمي.\` 
          : \`\${activePlayer.name}'s turn. Click the dice to roll.\`);
      }
    }

    function setStatusText(msg) {
      elements.gameStatusText.textContent = msg;
    }

    // Token Centering & Multi-player Layout Geometry
    function repositionAllTokens() {
      const boardRect = elements.boardFrame.getBoundingClientRect();
      const dockRect = elements.dockSlots.getBoundingClientRect();

      const groups = {};
      state.players.forEach(p => {
        if (!groups[p.pos]) groups[p.pos] = [];
        groups[p.pos].push(p);
      });

      Object.entries(groups).forEach(([posStr, playerGroup]) => {
        const pos = parseInt(posStr, 10);
        let centerX, centerY;

        if (pos === 0) {
          const relativeDockLeft = dockRect.left - boardRect.left;
          const relativeDockTop = dockRect.top - boardRect.top;
          const dockSpacing = Math.min(46, (dockRect.width - 20) / Math.max(playerGroup.length, 1));

          playerGroup.forEach((p, idx) => {
            const tokenEl = document.getElementById(\`token-\${p.id}\`);
            if (!tokenEl) return;
            const x = relativeDockLeft + 20 + idx * dockSpacing + 16;
            const y = relativeDockTop + dockRect.height / 2;
            tokenEl.style.left = \`\${x}px\`;
            tokenEl.style.top = \`\${y}px\`;
          });
          return;
        }

        const cell = elements.boardGrid.querySelector(\`[data-square="\${pos}"]\`);
        if (!cell) return;
        const cellRect = cell.getBoundingClientRect();
        centerX = (cellRect.left - boardRect.left) + cellRect.width / 2;
        centerY = (cellRect.top - boardRect.top) + cellRect.height / 2;

        const count = playerGroup.length;
        const spread = Math.min(13, cellRect.width * 0.16);

        playerGroup.forEach((p, idx) => {
          const tokenEl = document.getElementById(\`token-\${p.id}\`);
          if (!tokenEl) return;

          let offX = 0;
          let offY = 0;

          if (count === 1) {
            // Lone token: EXACT geometric center
            offX = 0;
            offY = 0;
          } else if (count === 2) {
            offX = idx === 0 ? -spread : spread;
            offY = 0;
          } else if (count === 3) {
            if (idx === 0) { offX = -spread; offY = -spread * 0.8; }
            else if (idx === 1) { offX = spread; offY = -spread * 0.8; }
            else { offX = 0; offY = spread * 0.85; }
          } else if (count === 4) {
            offX = (idx % 2 === 0) ? -spread : spread;
            offY = idx < 2 ? -spread : spread;
          } else if (count === 5) {
            if (idx === 0) { offX = -spread; offY = -spread; }
            else if (idx === 1) { offX = spread; offY = -spread; }
            else if (idx === 2) { offX = -spread; offY = spread; }
            else if (idx === 3) { offX = spread; offY = spread; }
            else { offX = 0; offY = 0; }
          }

          tokenEl.style.left = \`\${centerX + offX}px\`;
          tokenEl.style.top = \`\${centerY + offY}px\`;
        });
      });
    }

    // 3D Dice Rotations
    const DICE_FACE_ORIENTATIONS = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 180 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: -90, y: 0 },
      6: { x: 90, y: 0 }
    };

    function handleDiceRoll(isCPU = false) {
      if (state.busy || state.gameOver) return;
      if (state.movePending) return;

      const activePlayer = state.players[state.activeIdx];
      if (!activePlayer) return;

      state.busy = true;
      elements.diceBtn.disabled = true;
      elements.moveActionBtn.style.display = 'none';

      sound.playRoll();

      const roll = Math.floor(Math.random() * 6) + 1;
      state.rolledValue = roll;

      const baseOrient = DICE_FACE_ORIENTATIONS[roll];
      const extraSpinsX = (2 + Math.floor(Math.random() * 2)) * 360;
      const extraSpinsY = (2 + Math.floor(Math.random() * 2)) * 360;
      const restingTiltX = -12;
      const restingTiltY = 16;

      const finalRotX = baseOrient.x + extraSpinsX + restingTiltX;
      const finalRotY = baseOrient.y + extraSpinsY + restingTiltY;

      elements.diceCube.style.transform = \`rotateX(\${finalRotX}deg) rotateY(\${finalRotY}deg)\`;

      setTimeout(() => {
        state.busy = false;
        const player = state.players[state.activeIdx];
        if (!player || state.gameOver) return;
        const isAr = state.lang === 'ar';

        if (isCPU) {
          setStatusText(isAr ? \`حصل الكمبيوتر على \${roll}! يتحرك الآن...\` : \`CPU rolled a \${roll}! Moving...\`);
          setTimeout(() => {
            executePlayerMove();
          }, 650);
        } else {
          state.movePending = true;
          const spaceWord = isAr 
            ? (roll === 1 ? 'خانة واحدة' : \`\${roll} خانات\`) 
            : (roll === 1 ? '1 space' : \`\${roll} spaces\`);
          elements.moveActionBtn.textContent = isAr ? \`تحريك \${spaceWord}\` : \`Move \${spaceWord}\`;
          elements.moveActionBtn.style.display = 'inline-block';
          setStatusText(isAr 
            ? \`حصلت على \${roll}! انقر على "تحريك \${spaceWord}" للتقدم.\` 
            : \`You rolled a \${roll}! Click "Move \${spaceWord}" to advance.\`);
        }
      }, 1050);
    }

    // Step-by-Step Movement Logic
    async function executePlayerMove() {
      state.movePending = false;
      elements.moveActionBtn.style.display = 'none';
      state.busy = true;
      elements.diceBtn.disabled = true;

      const player = state.players[state.activeIdx];
      const roll = state.rolledValue;
      const targetPos = player.pos + roll;
      const isAr = state.lang === 'ar';

      // Overshoot Check: must land exactly on 20
      if (targetPos > 20) {
        sound.playBlocked();
        setStatusText(isAr 
          ? \`يحتاج \${player.name} إلى رمية دقيقة للوصول إلى 20. الرمز يبقى في مكانه.\` 
          : \`\${player.name} needs an exact roll. The token stays put.\`);
        await sleep(1500);
        state.busy = false;
        advanceTurn();
        return;
      }

      // Move one square at a time
      while (player.pos < targetPos) {
        player.pos++;
        const tokenEl = document.getElementById(\`token-\${player.id}\`);
        if (tokenEl) {
          tokenEl.classList.add('hop');
          setTimeout(() => tokenEl.classList.remove('hop'), 250);
        }
        sound.playStep();
        repositionAllTokens();
        setStatusText(isAr ? \`يتحرك \${player.name} إلى الخانة \${player.pos}...\` : \`\${player.name} is moving to square \${player.pos}...\`);
        await sleep(350);
      }

      // Check win at 20
      if (player.pos === 20) {
        declareVictory(player, isAr ? 'وصل إلى الخانة 20 بالتمام!' : 'reached square 20!');
        return;
      }

      // Check Ladders
      if (LADDERS[player.pos]) {
        const dest = LADDERS[player.pos];
        setStatusText(isAr ? \`سلم رائع! صعد \${player.name} إلى الخانة \${dest}.\` : \`Ladder! \${player.name} climbs to square \${dest}.\`);
        sound.playLadder();
        await sleep(600);
        player.pos = dest;
        repositionAllTokens();
        await sleep(700);

        if (player.pos === 20) {
          declareVictory(player, isAr ? 'صعد السلم إلى الخانة 20!' : 'climbed the ladder to square 20!');
          return;
        }
      }

      // Check Snakes
      if (SNAKES[player.pos]) {
        const dest = SNAKES[player.pos];
        setStatusText(isAr ? \`يا للأسف! لدغ الثعبان \${player.name} وانزلق إلى الخانة \${dest}.\` : \`Oh no! A snake bites \${player.name} and slides the token down to square \${dest}.\`);
        sound.playSnake();
        showSnakeCry(isAr ? \`لدغة ثعبان أصابت \${player.name}!\` : \`A snake bit \${player.name}!\`);
        await sleep(700);
        player.pos = dest;
        repositionAllTokens();
        await sleep(900);
      }

      state.busy = false;
      advanceTurn();
    }

    function showSnakeCry(text) {
      elements.snakeCryText.textContent = text;
      elements.snakeCryPopup.classList.add('active');
      setTimeout(() => {
        elements.snakeCryPopup.classList.remove('active');
      }, 1300);
    }

    // Advance to Next Player
    function advanceTurn() {
      if (state.gameOver) return;
      state.activeIdx = (state.activeIdx + 1) % state.players.length;
      updateTurnUI();
    }

    // Questions and Trophy Handling
    function openSquareQuestion(squareNum) {
      if (state.busy || state.gameOver) return;
      const activePlayer = state.players[state.activeIdx];
      if (!activePlayer || activePlayer.isCPU) {
        return;
      }

      state.openSquare = squareNum;
      const record = state.questions[squareNum - 1];
      const isAr = state.lang === 'ar';

      if (!record || !record.q.trim()) {
        setStatusText(isAr 
          ? \`لا يوجد سؤال محفوظ للخانة \${squareNum} بعد. يمكنك إضافته من الإعدادات.\` 
          : \`No question is saved for square \${squareNum} yet. Add it in settings.\`);
        return;
      }

      elements.modalSquareTitle.textContent = isAr ? \`سؤال الخانة \${squareNum}\` : \`Square \${squareNum} question\`;
      elements.modalQuestionText.textContent = record.q;
      elements.modalAnswerInput.value = '';
      elements.modalFeedbackMsg.textContent = '';
      elements.modalFeedbackMsg.className = 'modal-feedback';
      elements.questionModal.classList.remove('hidden');

      setTimeout(() => {
        elements.modalAnswerInput.focus();
      }, 50);
    }

    function handleQuestionSubmit() {
      const sq = state.openSquare;
      if (!sq) return;
      const record = state.questions[sq - 1];
      if (!record) return;

      const player = state.players[state.activeIdx];
      const userAns = elements.modalAnswerInput.value;
      const isCorrect = checkAnswerMatch(userAns, record.a);
      const isAr = state.lang === 'ar';

      if (isCorrect) {
        if (player.earnedSquares.has(sq)) {
          sound.playCorrect();
          elements.modalFeedbackMsg.textContent = isAr 
            ? 'إجابة صحيحة! ولكنك حصلت بالفعل على كأس هذه الخانة سابقاً.'
            : 'Correct! You already earned the trophy for this square.';
          elements.modalFeedbackMsg.className = 'modal-feedback info';
        } else {
          player.earnedSquares.add(sq);
          player.trophies++;
          sound.playCorrect();

          const trophyEl = document.getElementById(\`playerTrophy-\${player.id}\`);
          if (trophyEl) {
            trophyEl.innerHTML = \`🏆 \${player.trophies}/5\`;
          }

          elements.modalFeedbackMsg.textContent = isAr 
            ? 'إجابة ممتازة وصحيحة! حصلت على كأس جديد! ✨🏆'
            : 'Correct! Trophy earned! ✨🏆';
          elements.modalFeedbackMsg.className = 'modal-feedback success';

          // Check 5 trophies win condition
          if (player.trophies >= 5) {
            setTimeout(() => {
              closeModal();
              player.pos = 20;
              repositionAllTokens();
              declareVictory(player, isAr ? 'فاز بجمع خمسة كؤوس ذهبية!' : 'collected five trophies!');
            }, 1000);
            return;
          }
        }
      } else {
        sound.playWrong();
        elements.modalFeedbackMsg.textContent = isAr 
          ? 'إجابة غير دقيقة—حاول مرة أخرى وتأكد من صحة الكلمات.'
          : 'Not quite—try again. Check spelling and spacing.';
        elements.modalFeedbackMsg.className = 'modal-feedback error';
      }
    }

    function closeModal() {
      elements.questionModal.classList.add('hidden');
      state.openSquare = null;
    }

    // Victory Celebration
    function declareVictory(player, reason) {
      state.gameOver = true;
      state.busy = false;
      elements.diceBtn.disabled = true;
      elements.moveActionBtn.style.display = 'none';

      elements.victoryPlayerName.textContent = player.name;
      elements.victoryReason.textContent = reason;
      elements.victoryOverlay.classList.remove('hidden');

      createConfetti();
      sound.playVictory();
    }

    function createConfetti() {
      elements.confettiContainer.innerHTML = '';
      const colors = ['#ffd85b', '#40e8ff', '#ff5d66', '#18a75b', '#8a4de1', '#ffffff', '#fb923c'];
      for (let i = 0; i < 90; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = (Math.random() * 2) + 's';
        piece.style.animationDuration = (2.2 + Math.random() * 2) + 's';
        piece.style.width = (8 + Math.random() * 8) + 'px';
        piece.style.height = (10 + Math.random() * 10) + 'px';
        elements.confettiContainer.appendChild(piece);
      }
    }

    // Utility: Sleep promise
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // EVENT LISTENERS & WIRING
    function initEventListeners() {
      // Language Toggle
      elements.langToggleBtn.addEventListener('click', () => {
        state.lang = state.lang === 'ar' ? 'en' : 'ar';
        applyLanguageStrings();
      });

      // Sound Toggle
      elements.soundToggleBtn.addEventListener('click', () => {
        sound.initContext();
        sound.enabled = !sound.enabled;
        elements.soundToggleBtn.setAttribute('aria-pressed', sound.enabled ? 'true' : 'false');
        const isAr = state.lang === 'ar';
        elements.soundToggleBtn.textContent = sound.enabled 
          ? (isAr ? '🔊 الصوت يعمل' : '🔊 Sound on') 
          : (isAr ? '🔇 كتم الصوت' : '🔇 Sound off');
      });

      // Play Mode buttons
      elements.modeVsCpuBtn.addEventListener('click', () => {
        state.mode = 'vs-computer';
        elements.modeVsCpuBtn.setAttribute('aria-pressed', 'true');
        elements.modeVariousBtn.setAttribute('aria-pressed', 'false');
        elements.playerCountBox.style.display = 'none';
        renderSettingsInputs();
      });

      elements.modeVariousBtn.addEventListener('click', () => {
        state.mode = 'various-players';
        elements.modeVsCpuBtn.setAttribute('aria-pressed', 'false');
        elements.modeVariousBtn.setAttribute('aria-pressed', 'true');
        elements.playerCountBox.style.display = 'flex';
        renderSettingsInputs();
      });

      // Player Count buttons
      elements.playerCountBox.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.playerCountBox.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.playerCount = parseInt(btn.dataset.count, 10);
          renderSettingsInputs();
        });
      });

      // Save Names Button
      elements.saveNamesBtn.addEventListener('click', () => {
        saveNamesToStorage();
      });

      // Preset 20 Questions Buttons
      elements.loadArabic20Btn.addEventListener('click', () => {
        state.questions = ARABIC_QUESTIONS_20.map(item => ({ ...item }));
        saveQuestionsToStorage();
        populateSquareSelect();
        populateBulkEditor();
        elements.questionsStatusMsg.textContent = '✓ تم تحميل الأسئلة العشرين (20 سؤالاً بالعربية) بنجاح!';
        elements.questionsStatusMsg.className = 'questions-feedback-msg success';
        sound.playSave();
      });

      elements.loadEnglish20Btn.addEventListener('click', () => {
        state.questions = ENGLISH_QUESTIONS_20.map(item => ({ ...item }));
        saveQuestionsToStorage();
        populateSquareSelect();
        populateBulkEditor();
        elements.questionsStatusMsg.textContent = '✓ Loaded 20 English questions successfully!';
        elements.questionsStatusMsg.className = 'questions-feedback-msg success';
        sound.playSave();
      });

      elements.clearAllQuestionsBtn.addEventListener('click', () => {
        state.questions = Array.from({ length: 20 }, () => ({ q: '', a: '' }));
        saveQuestionsToStorage();
        populateSquareSelect();
        populateBulkEditor();
        elements.questionsStatusMsg.textContent = state.lang === 'ar' ? 'تم تفريغ كافة الأسئلة.' : 'All questions cleared.';
        elements.questionsStatusMsg.className = 'questions-feedback-msg info';
        sound.playSave();
      });

      // Question Editor Tabs
      elements.tabBulkBtn.addEventListener('click', () => {
        elements.tabBulkBtn.classList.add('active');
        elements.tabBulkBtn.setAttribute('aria-selected', 'true');
        elements.tabSingleBtn.classList.remove('active');
        elements.tabSingleBtn.setAttribute('aria-selected', 'false');
        elements.bulkEditorView.style.display = 'block';
        elements.singleEditorView.style.display = 'none';
        elements.questionsStatusMsg.textContent = '';
      });

      elements.tabSingleBtn.addEventListener('click', () => {
        elements.tabSingleBtn.classList.add('active');
        elements.tabSingleBtn.setAttribute('aria-selected', 'true');
        elements.tabBulkBtn.classList.remove('active');
        elements.tabBulkBtn.setAttribute('aria-selected', 'false');
        elements.singleEditorView.style.display = 'block';
        elements.bulkEditorView.style.display = 'none';
        elements.questionsStatusMsg.textContent = '';
      });

      // Bulk Import
      elements.importBulkBtn.addEventListener('click', () => {
        const rawQ = elements.bulkQuestionsArea.value.split('\\n').map(l => l.trim()).filter(Boolean);
        const rawA = elements.bulkAnswersArea.value.split('\\n').map(l => l.trim()).filter(Boolean);
        const isAr = state.lang === 'ar';

        if (rawQ.length === 0 || rawA.length === 0) {
          elements.questionsStatusMsg.textContent = isAr 
            ? 'يرجى كتابة سؤال واحد وإجابة واحدة متطابقة على الأقل.' 
            : 'Please enter at least 1 question and 1 matching answer.';
          elements.questionsStatusMsg.className = 'questions-feedback-msg error';
          sound.playWrong();
          return;
        }

        if (rawQ.length !== rawA.length) {
          elements.questionsStatusMsg.textContent = isAr 
            ? \`يجب أن يتساوى عدد أسطر الأسئلة (\${rawQ.length}) مع أسطر الإجابات (\${rawA.length}).\`
            : \`Line counts must match (Questions: \${rawQ.length}, Answers: \${rawA.length}).\`;
          elements.questionsStatusMsg.className = 'questions-feedback-msg error';
          sound.playWrong();
          return;
        }

        if (rawQ.length > 20) {
          elements.questionsStatusMsg.textContent = isAr 
            ? 'الحد الأقصى المسموح به هو 20 سؤالاً بالتمام.'
            : 'You can import a maximum of 20 questions.';
          elements.questionsStatusMsg.className = 'questions-feedback-msg error';
          sound.playWrong();
          return;
        }

        for (let i = 0; i < 20; i++) {
          if (i < rawQ.length) {
            state.questions[i] = { q: rawQ[i], a: rawA[i] };
          } else {
            state.questions[i] = { q: '', a: '' };
          }
        }

        saveQuestionsToStorage();
        populateSquareSelect();
        elements.questionsStatusMsg.textContent = isAr 
          ? \`✓ تم استيراد \${rawQ.length} سؤالاً بنجاح!\` 
          : \`✓ Imported \${rawQ.length} questions successfully!\`;
        elements.questionsStatusMsg.className = 'questions-feedback-msg success';
        sound.playSave();
      });

      // Single Editor Square Dropdown
      elements.squareSelect.addEventListener('change', (e) => {
        loadSingleSquareToInputs(parseInt(e.target.value, 10));
        elements.questionsStatusMsg.textContent = '';
      });

      // Single Editor Save
      elements.saveSingleSquareBtn.addEventListener('click', () => {
        const sq = parseInt(elements.squareSelect.value, 10);
        const qVal = elements.singleQuestionInput.value.trim();
        const aVal = elements.singleAnswerInput.value.trim();
        const isAr = state.lang === 'ar';

        state.questions[sq - 1] = { q: qVal, a: aVal };
        saveQuestionsToStorage();
        populateSquareSelect();
        elements.squareSelect.value = sq;
        elements.questionsStatusMsg.textContent = isAr 
          ? \`✓ تم حفظ سؤال الخانة \${sq} بنجاح!\` 
          : \`✓ Square \${sq} saved successfully!\`;
        elements.questionsStatusMsg.className = 'questions-feedback-msg success';
        sound.playSave();
      });

      // Single Editor Clear
      elements.clearSingleSquareBtn.addEventListener('click', () => {
        const sq = parseInt(elements.squareSelect.value, 10);
        state.questions[sq - 1] = { q: '', a: '' };
        elements.singleQuestionInput.value = '';
        elements.singleAnswerInput.value = '';
        saveQuestionsToStorage();
        populateSquareSelect();
        elements.squareSelect.value = sq;
        const isAr = state.lang === 'ar';
        elements.questionsStatusMsg.textContent = isAr 
          ? \`✓ تم تفريغ سؤال الخانة \${sq}.\` 
          : \`✓ Square \${sq} cleared.\`;
        elements.questionsStatusMsg.className = 'questions-feedback-msg success';
        sound.playSave();
      });

      // Start Game
      elements.startGameBtn.addEventListener('click', () => {
        startGameSession();
      });

      // Back to Settings
      elements.backToSettingsBtn.addEventListener('click', () => {
        elements.gameScreen.classList.add('hidden');
        elements.settingsScreen.classList.remove('hidden');
        populateBulkEditor();
        populateSquareSelect();
      });

      // Restart Game
      elements.restartGameBtn.addEventListener('click', () => {
        restartGame();
      });

      // Dice Click
      elements.diceBtn.addEventListener('click', () => {
        handleDiceRoll(false);
      });

      // Move Action Button Click
      elements.moveActionBtn.addEventListener('click', () => {
        executePlayerMove();
      });

      // Question Modal Form & Buttons
      elements.questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleQuestionSubmit();
      });

      elements.closeModalBtn.addEventListener('click', () => {
        closeModal();
      });

      // Play Again Button on Victory
      elements.playAgainBtn.addEventListener('click', () => {
        elements.victoryOverlay.classList.add('hidden');
        startGameSession();
      });

      // Keyboard Accessibility: Escape to close modal
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.questionModal.classList.contains('hidden')) {
          closeModal();
        }
      });

      // Window Resize: re-calculate token positions accurately
      window.addEventListener('resize', () => {
        repositionAllTokens();
      });
    }

    // BOOTSTRAP APP
    function init() {
      loadSavedState();
      applyLanguageStrings();
      buildBoardGrid();
      initEventListeners();
    }

    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('snake-learning-game-latest-edition.html', html, 'utf8');
console.log('Successfully generated index.html and snake-learning-game-latest-edition.html with 20 questions');
