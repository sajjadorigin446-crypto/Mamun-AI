
/* =========================================================
   MAMUN AI — CORE ENGINE
   HTML + CSS + VANILLA JAVASCRIPT
   GPTs5 THIRD-PARTY API
   ========================================================= */

"use strict";

/* ================= CONFIGURATION ================= */

const CONFIG = {
  CREATE_URL: "https://gpts5.jsdeliv.com/api",
  CHAT_URL: "https://gpts5.jsdeliv.com/api",
  UPLOAD_URL: "https://gpts6.jsdeliv.com/api",

  UUID: "03a6cccc3844422e9b57207cbacf1ff2",

  // Public prototype only. Do not use a shared ID in production.
  FALLBACK_DEVID: "079728a995b89cfadbf98a4129532e92",

  USER_TYPE: "free",
  VERSION: "1.69",
  LANGUAGE: "en",

  DEFAULT_MODEL: "4o-mini",
  INITIAL_DIALOG: 2
};

/* ================= DOM ELEMENTS ================= */

const $ = id => document.getElementById(id);

const elements = {
  sidebar: $("sidebar"),
  overlay: $("overlay"),
  menuBtn: $("menuBtn"),
  closeSidebar: $("closeSidebar"),

  newChat: $("newChat"),
  newChatTop: $("newChatTop"),
  clearHistory: $("clearHistory"),

  historyList: $("historyList"),
  welcome: $("welcome"),
  messages: $("messages"),
  chatArea: $("chatArea"),

  input: $("messageInput"),
  sendBtn: $("sendBtn"),
  model: $("modelSelect"),

  status: $("connectionStatus"),

  attachBtn: $("attachBtn"),
  fileInput: $("fileInput")
};

/* ================= APP STATE ================= */

const state = {
  devid: null,
  dialog: CONFIG.INITIAL_DIALOG,
  connected: false,
  sending: false,
  currentChatId: null,
  chats: [],
  uploadedFiles: []
};

/* ================= UTILITIES ================= */

function makeId() {
  return Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8);
}

function setStatus(message) {
  elements.status.textContent = message;
}

function scrollToBottom() {
  elements.chatArea.scrollTop =
    elements.chatArea.scrollHeight;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* Basic safe Markdown renderer */

function renderMarkdown(text) {
  let html = escapeHTML(text);

  html = html.replace(
    /```([\s\S]*?)```/g,
    (_, code) => `<pre><code>${code.trim()}</code></pre>`
  );

  html = html.replace(
    /`([^`\n]+)`/g,
    "<code>$1</code>"
  );

  html = html.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  html = html.replace(
    /\*(.*?)\*/g,
    "<em>$1</em>"
  );

  html = html.replace(
    /^### (.*)$/gm,
    "<h3>$1</h3>"
  );

  html = html.replace(
    /^## (.*)$/gm,
    "<h2>$1</h2>"
  );

  html = html.replace(
    /^# (.*)$/gm,
    "<h2>$1</h2>"
  );

  html = html.replace(
    /\n/g,
    "<br>"
  );

  return html;
}

/* ================= MD5 ENGINE ================= */

/*
  Pure JavaScript MD5 implementation.
  Used to calculate the signature described
  in the supplied GPTs5 API specification.
*/

function md5(string) {
  function rotateLeft(x, n) {
    return (x << n) | (x >>> (32 - n));
  }

  function addUnsigned(x, y) {
    const x4 = x & 0x40000000;
    const y4 = y & 0x40000000;
    const x8 = x & 0x80000000;
    const y8 = y & 0x80000000;

    const result = (x & 0x3FFFFFFF) +
                   (y & 0x3FFFFFFF);

    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
    if (x4 | y4) {
      return result & 0x40000000
        ? result ^ 0xC0000000 ^ x8 ^ y8
        : result ^ 0x40000000 ^ x8 ^ y8;
    }

    return result ^ x8 ^ y8;
  }

  function F(x,y,z) { return (x & y) | (~x & z); }
  function G(x,y,z) { return (x & z) | (y & ~z); }
  function H(x,y,z) { return x ^ y ^ z; }
  function I(x,y,z) { return y ^ (x | ~z); }

  function transform(fn,a,b,c,d,x,s,ac) {
    return addUnsigned(
      rotateLeft(
        addUnsigned(
          addUnsigned(a, fn(b,c,d)),
          addUnsigned(x,ac)
        ),s
      ),b
    );
  }

  function utf8(str) {
    return unescape(encodeURIComponent(str));
  }

  function words(str) {
    const bytes = utf8(str);
    const n = bytes.length;
    const blocks = new Array(((n + 8) >>> 6) + 1)
      .fill(0);

    for (let i=0;i<n;i++) {
      blocks[i>>>2] |=
        bytes.charCodeAt(i) << ((i%4)*8);
    }

    blocks[n>>>2] |= 0x80 << ((n%4)*8);

    blocks[blocks.length-2] = n * 8;
    blocks[blocks.length-1] = 0;

    return blocks;
  }

  const x = words(string);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const shifts = [
    7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
    5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
    4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
    6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21
  ];

  const funcs = [F,G,H,I];

  for (let offset=0; offset<x.length; offset+=16) {
    const aa=a, bb=b, cc=c, dd=d;

    for (let j=0;j<64;j++) {
      const round = Math.floor(j/16);
      let k;

      if (round===0) k=j;
      else if (round===1) k=(5*j+1)%16;
      else if (round===2) k=(3*j+5)%16;
      else k=(7*j)%16;

      const ac = Math.floor(
        Math.abs(Math.sin(j+1))*4294967296
      ) | 0;

      const temp = d;
      d=c;
      c=b;
      b=transform(
        funcs[round],a,b,c,d,
        x[offset+k] || 0,
        shifts[j],
        ac
      );
      a=temp;
    }

    a=addUnsigned(a,aa);
    b=addUnsigned(b,bb);
    c=addUnsigned(c,cc);
    d=addUnsigned(d,dd);
  }

  function hex(value) {
    let output = "";

    for(let i=0;i<4;i++) {
      const byte = (value >>> (i*8)) & 255;
      output += byte.toString(16).padStart(2,"0");
    }

    return output;
  }

  return hex(a)+hex(b)+hex(c)+hex(d);
}

/* ================= API SIGNATURE ================= */

function createSignature(dialog) {
  const source =
    state.devid +
    dialog +
    CONFIG.USER_TYPE +
    CONFIG.VERSION;

  return md5(source);
}

/* ================= SESSION ================= */

async function initializeSession() {
  setStatus("Connecting...");

  try {
    const params = new URLSearchParams({
      f: "create",
      uuid: CONFIG.UUID,
      fb: "",
      lang_device: CONFIG.LANGUAGE
    });

    const response = await fetch(
      `${CONFIG.CREATE_URL}?${params}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Session HTTP ${response.status}`);
    }

    const raw = await response.text();
    let data = {};

    try {
      data = JSON.parse(raw);
    } catch {
      data = {};
    }

    /*
      Adapt these keys if the actual create
      endpoint returns a different structure.
    */

    const returnedId =
      data.devid ||
      data.device_id ||
      data.data?.devid ||
      data.data?.device_id;

    state.devid = returnedId || CONFIG.FALLBACK_DEVID;

    state.connected = true;

    setStatus("Connected");

    console.log("Mamun AI session initialized.");

    return true;

  } catch (error) {
    console.error("Session error:", error);

    /*
      The fallback is only for testing.
      It does not prove the API session is valid.
    */

    state.devid = CONFIG.FALLBACK_DEVID;
    state.connected = false;

    setStatus("Connection unavailable");

    return false;
  }
}

/* ================= CHAT MANAGEMENT ================= */

function createNewChat() {
  state.currentChatId = makeId();
  state.dialog = CONFIG.INITIAL_DIALOG;
  state.uploadedFiles = [];

  elements.messages.innerHTML = "";
  elements.welcome.style.display = "block";

  elements.input.value = "";
  elements.input.focus();

  renderHistory();
}

function getCurrentChat() {
  return state.chats.find(
    chat => chat.id === state.currentChatId
  );
}

function saveCurrentChat() {
  const chat = getCurrentChat();
  if (!chat) return;

  try {
    localStorage.setItem(
      "mamun_ai_chats",
      JSON.stringify(state.chats)
    );
  } catch(error) {
    console.warn("Could not save chat:", error);
  }

  renderHistory();
}

function loadHistory() {
  try {
    const stored = localStorage.getItem("mamun_ai_chats");
    state.chats = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(state.chats)) {
      state.chats = [];
    }
  } catch {
    state.chats = [];
  }

  renderHistory();
}

function renderHistory() {
  elements.historyList.innerHTML = "";

  [...state.chats].reverse().forEach(chat => {
    const item = document.createElement("div");

    item.className =
      "history-item" +
      (chat.id === state.currentChatId ? " active" : "");

    item.textContent = chat.title || "New conversation";

    item.title = item.textContent;

    item.addEventListener("click", () => {
      openChat(chat.id);
    });

    elements.historyList.appendChild(item);
  });
}

function openChat(id) {
  const chat = state.chats.find(item => item.id === id);
  if (!chat) return;

  state.currentChatId = id;

  /*
    Start a fresh API dialog when reopening a
    locally saved conversation. Previous server
    context may not be recoverable.
  */

  state.dialog = CONFIG.INITIAL_DIALOG;
  state.uploadedFiles = [];

  elements.messages.innerHTML = "";
  elements.welcome.style.display = "none";

  chat.messages.forEach(message => {
    addMessage(
      message.role,
      message.content,
      false
    );
  });

  renderHistory();
  scrollToBottom();
}

/* ================= MESSAGE UI ================= */

function addMessage(role, content, save = true) {
  elements.welcome.style.display = "none";

  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "U" : "M";

  const contentBox = document.createElement("div");
  contentBox.className = "message-content";

  const name = document.createElement("div");
  name.className = "message-role";
  name.textContent =
    role === "user" ? "You" : "Mamun AI";

  const text = document.createElement("div");
  text.className = "message-text";
  text.innerHTML = renderMarkdown(content);

  contentBox.append(name,text);

  if(role === "assistant") {
    const tools = document.createElement("div");
    tools.className = "message-tools";

    const copy = document.createElement("button");
    copy.innerHTML =
      '<i class="fa-regular fa-copy"></i> Copy';

    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(content);
        copy.innerHTML =
          '<i class="fa-solid fa-check"></i> Copied';
      } catch {
        copy.textContent = "Copy unavailable";
      }
    });

    tools.appendChild(copy);
    contentBox.appendChild(tools);
  }

  wrapper.append(avatar,contentBox);
  elements.messages.appendChild(wrapper);

  if(save) {
    const chat = getCurrentChat();

    if(chat) {
      chat.messages.push({
        role,
        content
      });

      if(role === "user" && chat.messages.length === 1) {
        chat.title = content.slice(0,40);
      }

      chat.updated = Date.now();
      saveCurrentChat();
    }
  }

  scrollToBottom();

  return text;
}

/* ================= API RESPONSE PARSER ================= */

function extractText(value) {
  if (value == null) return "";

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (parsed !== value) return extractText(parsed);
    } catch {}

    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractText).join("");
  }

  if (typeof value === "object") {
    for (const key of [
      "content",
      "text",
      "message",
      "answer",
      "response",
      "output",
      "result"
    ]) {
      if (typeof value[key] === "string") {
        return value[key];
      }
    }

    if (value.choices?.[0]?.message?.content) {
      return extractText(
        value.choices[0].message.content
      );
    }

    if (value.choices?.[0]?.delta?.content) {
      return extractText(
        value.choices[0].delta.content
      );
    }

    if (value.data) return extractText(value.data);

    if (value.choices) return extractText(value.choices);
  }

  return "";
}

function parseAPIResponse(raw) {
  const lines = raw.split(/\r?\n/);
  const chunks = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) continue;
    if (trimmed.startsWith(":")) continue;

    const data = trimmed.startsWith("data:")
      ? trimmed.slice(5).trim()
      : trimmed;

    if (data === "[DONE]") continue;

    try {
      const parsed = JSON.parse(data);
      const text = extractText(parsed);

      if(text) chunks.push(text);
    } catch {
      if(!trimmed.startsWith("event:") &&
         !trimmed.startsWith("id:") &&
         !trimmed.startsWith("retry:")) {
        chunks.push(data);
      }
    }
  }

  if(chunks.length) {
    return chunks.join("");
  }

  return extractText(raw);
}

/* ================= CHAT API ================= */

async function sendToAPI(message) {
  if(!state.devid) {
    throw new Error("Device ID is missing.");
  }

  const dialog = state.dialog;

  const params = new URLSearchParams({
    f: "get_chat",
    devid: state.devid,
    dialog: String(dialog),
    content: message,
    stream: "1",
    usertype: CONFIG.USER_TYPE,
    m: elements.model.value,
    lang_device: CONFIG.LANGUAGE,
    vers: CONFIG.VERSION,
    s: createSignature(dialog)
  });

  const response = await fetch(
    `${CONFIG.CHAT_URL}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Accept": "text/event-stream, application/json, text/plain"
      }
    }
  );

  if(!response.ok) {
    throw new Error(`Chat API HTTP ${response.status}`);
  }

  const raw = await response.text();

  let result = parseAPIResponse(raw);

  if(!result) {
    throw new Error(
      "The API returned an empty or unrecognized response."
    );
  }

  state.dialog++;

  return result;
}

/* ================= SEND MESSAGE ================= */

async function sendMessage() {
  const message = elements.input.value.trim();

  if(!message || state.sending) return;

  if(!state.currentChatId) {
    state.currentChatId = makeId();

    state.chats.push({
      id: state.currentChatId,
      title: message.slice(0,40),
      updated: Date.now(),
      messages: []
    });
  }

  elements.input.value = "";
  elements.input.style.height = "auto";

  addMessage("user",message);

  state.sending = true;
  elements.sendBtn.disabled = true;

  const typing = addMessage(
    "assistant",
    "Mamun AI is thinking..."
  );

  typing.classList.add("typing");

  try {
    if(!state.connected) {
      await initializeSession();
    }

    if(!state.devid) {
      throw new Error("Could not initialize API session.");
    }

    const answer = await sendToAPI(message);

    typing.innerHTML = renderMarkdown(answer);
    typing.classList.remove("typing");

    const chat = getCurrentChat();

    if(chat) {
      chat.messages[chat.messages.length-1].content = answer;
      chat.updated = Date.now();
      saveCurrentChat();
    }

    const parent = typing.parentElement;

    if(parent && !parent.querySelector(".message-tools")) {
      const tools = document.createElement("div");
      tools.className = "message-tools";

      const copy = document.createElement("button");
      copy.innerHTML =
        '<i class="fa-regular fa-copy"></i> Copy';

      copy.onclick = async () => {
        try {
          await navigator.clipboard.writeText(answer);
          copy.textContent = "Copied";
        } catch {}
      };

      tools.appendChild(copy);
      parent.appendChild(tools);
    }

  } catch(error) {
    console.error("Chat error:",error);

    typing.classList.remove("typing");

    typing.textContent =
      "Sorry! " + error.message +
      " Check API availability, CORS and response format.";

    typing.style.color = "#d7a95a";
  }

  state.sending = false;
  elements.sendBtn.disabled = false;

  elements.input.focus();
  scrollToBottom();
}

/* ================= FILE UPLOAD ================= */

async function uploadFile(file) {
  if(!file) return;

  if(!state.devid) {
    await initializeSession();
  }

  if(!state.devid) {
    alert("API session unavailable.");
    return;
  }

  const formData = new FormData();
  formData.append("file",file);
  formData.append("devid",state.devid);

  try {
    setStatus("Uploading...");

    const params = new URLSearchParams({
      f:"upload_file",
      devid:state.devid
    });

    const response = await fetch(
      `${CONFIG.UPLOAD_URL}?${params}`,
      {
        method:"POST",
        body:formData
      }
    );

    const result = await response.text();

    if(!response.ok) {
      throw new Error(`Upload HTTP ${response.status}`);
    }

    state.uploadedFiles.push({
      name:file.name,
      result
    });

    addMessage(
      "assistant",
      `File upload response received for: **${file.name}**\n\n${result.slice(0,800)}`
    );

    setStatus("Connected");

  } catch(error) {
    console.error("Upload error:",error);
    alert("File upload failed: " + error.message);
    setStatus("Upload unavailable");
  }
}

/* ================= EVENT LISTENERS ================= */

elements.sendBtn.addEventListener(
  "click",
  sendMessage
);

elements.input.addEventListener("keydown",event => {
  if(event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

elements.input.addEventListener("input",() => {
  elements.input.style.height = "auto";
  elements.input.style.height =
    Math.min(elements.input.scrollHeight,150) + "px";
});

elements.newChat.addEventListener(
  "click",
  createNewChat
);

elements.newChatTop.addEventListener(
  "click",
  createNewChat
);

elements.clearHistory.addEventListener("click",() => {
  if(!confirm("Delete all saved conversations?")) return;

  state.chats = [];
  state.currentChatId = null;

  localStorage.removeItem("mamun_ai_chats");

  createNewChat();
});

elements.attachBtn.addEventListener("click",() => {
  elements.fileInput.click();
});

elements.fileInput.addEventListener("change",async event => {
  const file = event.target.files[0];

  if(file) await uploadFile(file);

  event.target.value = "";
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click",() => {
    elements.input.value = button.dataset.prompt;
    sendMessage();
  });
});

/* ================= MOBILE SIDEBAR ================= */

function closeSidebar() {
  elements.sidebar.classList.remove("open");
  elements.overlay.classList.remove("show");
}

elements.menuBtn.addEventListener("click",() => {
  elements.sidebar.classList.add("open");
  elements.overlay.classList.add("show");
});

elements.closeSidebar.addEventListener(
  "click",
  closeSidebar
);

elements.overlay.addEventListener(
  "click",
  closeSidebar
);

/* ================= INITIALIZATION ================= */

function initializeApp() {
  loadHistory();

  createNewChat();

  initializeSession();

  console.log(
    "%c MAMUN AI INITIALIZED ",
    "background:#d4af37;color:#080808;font-weight:bold;padding:8px"
  );
}

initializeApp();
