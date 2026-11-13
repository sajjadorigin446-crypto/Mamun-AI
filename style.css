
:root {
  --bg: #080808;
  --panel: #101010;
  --panel2: #171717;
  --border: #29251b;
  --gold: #d4af37;
  --gold-light: #e8cb78;
  --text: #f4f0e8;
  --muted: #858585;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: Inter, sans-serif;
  height: 100dvh;
  overflow: hidden;
}

button, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  display: flex;
  height: 100dvh;
  width: 100%;
}

/* SIDEBAR */

.sidebar {
  width: 270px;
  flex-shrink: 0;
  background: #0c0c0c;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 5px 5px 27px;
}

.brand-logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg,#e8cb78,#9c7622);
  color: #080808;
  font-size: 25px;
  font-weight: 800;
  box-shadow: 0 0 20px #d4af3730;
}

.brand h2 {
  font-size: 18px;
}

.brand h2 span,
.top-brand span {
  color: var(--gold);
}

.brand small {
  font-size: 9px;
  letter-spacing: 1.5px;
  color: var(--muted);
}

.close-sidebar {
  display: none !important;
  margin-left: auto;
}

.new-chat {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 13px;
  background: #19170f;
  color: var(--gold-light);
  border: 1px solid #57451c;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  transition: .25s;
}

.new-chat:hover {
  background: #262012;
  border-color: var(--gold);
}

.side-label {
  font-size: 10px;
  letter-spacing: 1.5px;
  color: #777;
  margin: 30px 7px 13px;
}

.history-list {
  overflow-y: auto;
  flex: 1;
}

.history-item {
  padding: 11px;
  margin-bottom: 5px;
  border-radius: 8px;
  color: #aaa;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item:hover,
.history-item.active {
  background: #1c1a14;
  color: var(--gold-light);
}

.sidebar-bottom {
  border-top: 1px solid var(--border);
  padding-top: 15px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold);
  font-weight: 700;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-info strong {
  display: block;
  font-size: 11px;
}

.profile-info small {
  color: var(--muted);
  font-size: 9px;
}

/* MAIN */

.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.topbar {
  height: 66px;
  flex-shrink: 0;
  padding: 0 25px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0b0b0b;
}

.top-left,
.top-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.top-brand {
  font-weight: 700;
  font-size: 16px;
}

.icon-btn {
  width: 35px;
  height: 35px;
  border: 1px solid transparent;
  background: transparent;
  color: #aaa;
  border-radius: 8px;
}

.icon-btn:hover {
  color: var(--gold);
  background: #1c1a14;
}

.status {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 10px;
  color: #999;
}

.status-dot {
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background: #c69f36;
  box-shadow: 0 0 8px #c69f36;
}

/* CHAT */

.chat-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 30px 20px;
  scroll-behavior: smooth;
}

.welcome {
  max-width: 680px;
  margin: 7vh auto 30px;
  text-align: center;
}

.welcome-icon {
  width: 90px;
  height: 90px;
  border-radius: 27px;
  background: linear-gradient(145deg,#1b1912,#0e0e0e);
  border: 1px solid #69521d;
  display: grid;
  place-items: center;
  margin: 0 auto 25px;
  position: relative;
  box-shadow: 0 0 45px #d4af3714;
}

.welcome-icon span {
  font-size: 48px;
  font-weight: 800;
  color: var(--gold);
}

.orbit {
  position: absolute;
  inset: -9px;
  border: 1px solid #d4af3730;
  border-radius: 32px;
  transform: rotate(25deg);
}

.orbit-two {
  transform: rotate(-25deg);
}

.welcome-tag {
  color: var(--gold);
  letter-spacing: 3px;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 15px;
}

.welcome h1 {
  font-size: clamp(24px,4vw,35px);
  font-weight: 700;
}

.welcome h1 span {
  color: var(--gold);
}

.welcome p {
  color: #888;
  font-size: 13px;
  line-height: 1.7;
  margin: 13px 0 28px;
}

.suggestions {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 10px;
  max-width: 500px;
  margin: auto;
}

.suggestion {
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #111;
  color: #ccc;
  font-size: 11px;
  transition: .2s;
}

.suggestion i {
  color: var(--gold);
}

.suggestion:hover {
  border-color: var(--gold);
  background: #19160f;
}

/* MESSAGES */

.messages {
  max-width: 850px;
  margin: 0 auto;
  width: 100%;
}

.message {
  display: flex;
  gap: 13px;
  margin: 23px 0;
  animation: appear .25s ease;
}

@keyframes appear {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-avatar {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
}

.user .message-avatar {
  background: #282828;
  color: white;
}

.assistant .message-avatar {
  background: #2a2110;
  color: var(--gold);
  border: 1px solid #55431e;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-role {
  font-size: 11px;
  font-weight: 700;
  margin: 5px 0 9px;
}

.message-text {
  font-size: 13px;
  color: #dedbd3;
  line-height: 1.85;
  overflow-wrap: anywhere;
}

.message-text pre {
  background: #111;
  border: 1px solid var(--border);
  padding: 15px;
  border-radius: 9px;
  overflow-x: auto;
  margin: 10px 0;
}

.message-text code {
  color: #e8cb78;
  font-family: monospace;
}

.message-text p {
  margin-bottom: 9px;
}

.message-tools {
  display: flex;
  gap: 7px;
  margin-top: 9px;
}

.message-tools button {
  border: none;
  background: transparent;
  color: #777;
  font-size: 11px;
  padding: 5px;
}

.message-tools button:hover {
  color: var(--gold);
}

.typing {
  color: var(--gold);
  font-size: 12px;
}

/* COMPOSER */

.composer-area {
  padding: 12px 20px 18px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.composer {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 11px 12px;
  border: 1px solid #40351d;
  background: #141414;
  border-radius: 15px;
  transition: .2s;
}

.composer:focus-within {
  border-color: var(--gold);
  box-shadow: 0 0 20px #d4af3710;
}

.composer-btn {
  border: none;
  background: transparent;
  color: #888;
  padding: 9px 5px;
}

.composer-btn:hover {
  color: var(--gold);
}

.composer textarea {
  flex: 1;
  resize: none;
  max-height: 150px;
  min-height: 25px;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 13px;
  line-height: 1.6;
  padding: 5px 0;
}

.composer textarea::placeholder {
  color: #777;
}

.composer select {
  background: #201d16;
  color: var(--gold-light);
  border: 1px solid #51421f;
  border-radius: 7px;
  padding: 8px 5px;
  font-size: 10px;
  max-width: 105px;
  outline: none;
}

.send-btn {
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: linear-gradient(145deg,#e8cb78,#ad8429);
  border: none;
  color: #090909;
  font-size: 14px;
}

.send-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.composer-note {
  text-align: center;
  color: #656565;
  font-size: 9px;
  margin-top: 10px;
}

.sidebar-overlay {
  display: none;
}

/* MOBILE */

@media(max-width:760px) {
  .sidebar {
    position: fixed;
    left: -290px;
    top: 0;
    bottom: 0;
    transition: .3s;
    width: 270px;
  }

  .sidebar.open {
    left: 0;
  }

  .close-sidebar {
    display: block !important;
  }

  .sidebar-overlay.show {
    display: block;
    position: fixed;
    inset: 0;
    background: #000a;
    z-index: 9;
  }

  .topbar {
    height: 58px;
    padding: 0 13px;
  }

  .chat-area {
    padding: 18px 12px;
  }

  .welcome {
    margin-top: 7vh;
  }

  .welcome-icon {
    width: 75px;
    height: 75px;
  }

  .welcome-icon span {
    font-size: 40px;
  }

  .suggestions {
    gap: 8px;
  }

  .suggestion {
    padding: 12px 9px;
    font-size: 10px;
  }

  .composer-area {
    padding: 8px 10px 12px;
  }

  .composer {
    gap: 6px;
    padding: 8px;
  }

  .composer select {
    max-width: 83px;
    font-size: 9px;
  }

  .message-text {
    font-size: 12px;
  }
}

@media(max-width:380px) {
  .status {
    display: none;
  }
  .suggestion {
    font-size: 9px;
  }
}
