"use strict";

/* ==================== i18n ==================== */
const translations = {
  zh: {
    title: "🍱 今天吃什么",
    pageTitle: "今天吃什么",
    inputLabel: "请输入菜单列表（每行一个菜名）：",
    inputPlaceholder: "例：红烧肉\\n鱼香肉丝\\n番茄炒蛋",
    countPrefix: "每次选择",
    countSuffix: "个菜",
    startButton: "🎲 开始选择",
    historyTitle: "🕘 历史记录",
    noHistory: "暂无记录",
    resultTitle: "✅ 本次选择（{time}）：",
    alertNoMenu: "请先输入菜单",
    githubTooltip: "查看源码",
    themeToggleTooltip: "切换主题",
    saveStatus: "保存中...",
    savedStatus: "已保存",
    // v2.0
    listMode: "📜 列表模式",
    wheelMode: "🎡 转盘模式",
    pickModeLabel: "抽取模式",
    pickModeNormal: "普通",
    pickModeElimination: "排除",
    pickModeAccumulate: "统计",
    pickModeNormalTip: "普通：一次性随机选出多个，不重复",
    pickModeEliminationTip: "排除：每轮抽走一个，选过的不再参与，直到抽完",
    pickModeAccumulateTip: "统计：允许重复选中，累计每个菜的次数",
    antiRepeatLabel: "防吃腻",
    antiRepeatRangeAria: "排除最近几次的选择",
    antiRepeatUnit: "次",
    antiRepeatTip: "开启后，最近 N 次抽中的菜将被排除",
    fallbackNotice: "⚠️ 候选不足，本次已回退纯随机",
    eliminationDone: "🎉 候选已全部排除，本轮已自动重置",
    templateLabel: "模板",
    templateApply: "应用",
    templatePick: "选择模板…",
    templateConfirmReplace: "应用模板将替换当前菜单，是否继续？",
    templateApplied: "已应用模板：{name}",
    exportTooltip: "导出菜单为 txt 文件",
    importTooltip: "从 txt 文件导入菜单",
    shareTooltip: "复制包含菜单的分享链接",
    shareCopied: "🔗 分享链接已复制",
    importConfirmReplace: "导入将替换当前菜单，是否继续？",
    importFailed: "导入失败：无法读取文件",
    loadSharedMenu: "检测到分享的菜单，是否加载？",
    sharedMenuLoaded: "已加载分享的菜单",
    statsTitle: "📊 统计",
    statsClear: "清空统计",
    statsEmpty: "暂无统计数据",
    statsConfirmClear: "确定清空统计数据？",
    historyClear: "🗑 清空",
    historyConfirmClear: "确定清空历史记录？",
    spinButton: "🎡",
    spinButtonAria: "开始旋转转盘",
    spinning: "转动中…",
    wheelNeedItems: "请至少输入 2 个菜单项后再使用转盘",
    wheelResultTitle: "🎡 转盘结果（{time}）：",
    wheelHint: "菜单变更会自动同步到转盘",
  },
  en: {
    title: "🍱 What to Eat Today",
    pageTitle: "What to Eat Today",
    inputLabel: "Please enter menu list (one dish per line):",
    inputPlaceholder: "e.g.: Braised Pork\\nFish-flavored Pork\\nScrambled Eggs with Tomato",
    countPrefix: "Select",
    countSuffix: "dishes each time",
    startButton: "🎲 Start Selection",
    historyTitle: "🕘 History",
    noHistory: "No records",
    resultTitle: "✅ Current Selection ({time}):",
    alertNoMenu: "Please enter menu first",
    githubTooltip: "View Source Code",
    themeToggleTooltip: "Toggle Theme",
    saveStatus: "Saving...",
    savedStatus: "Saved",
    // v2.0
    listMode: "📜 List Mode",
    wheelMode: "🎡 Wheel Mode",
    pickModeLabel: "Mode",
    pickModeNormal: "Normal",
    pickModeElimination: "Elimination",
    pickModeAccumulate: "Accumulate",
    pickModeNormalTip: "Normal: pick several unique dishes at once",
    pickModeEliminationTip: "Elimination: remove each winner from the pool until one is left",
    pickModeAccumulateTip: "Accumulate: repeats allowed, count every win",
    antiRepeatLabel: "Anti-repeat",
    antiRepeatRangeAria: "Exclude dishes picked in the last N rounds",
    antiRepeatUnit: "rounds",
    antiRepeatTip: "When enabled, dishes picked in the last N rounds are excluded",
    fallbackNotice: "⚠️ Not enough candidates, fell back to pure random",
    eliminationDone: "🎉 All candidates eliminated, pool has been reset",
    templateLabel: "Template",
    templateApply: "Apply",
    templatePick: "Choose a template…",
    templateConfirmReplace: "Applying a template will replace the current menu. Continue?",
    templateApplied: "Template applied: {name}",
    exportTooltip: "Export menu as a txt file",
    importTooltip: "Import menu from a txt file",
    shareTooltip: "Copy a share link containing your menu",
    shareCopied: "🔗 Share link copied",
    importConfirmReplace: "Importing will replace the current menu. Continue?",
    importFailed: "Import failed: unable to read the file",
    loadSharedMenu: "A shared menu was detected. Load it?",
    sharedMenuLoaded: "Shared menu loaded",
    statsTitle: "📊 Stats",
    statsClear: "Clear stats",
    statsEmpty: "No stats yet",
    statsConfirmClear: "Clear all stats data?",
    historyClear: "🗑 Clear",
    historyConfirmClear: "Clear all history records?",
    spinButton: "🎡",
    spinButtonAria: "Spin the wheel",
    spinning: "Spinning…",
    wheelNeedItems: "Enter at least 2 menu items to use the wheel",
    wheelResultTitle: "🎡 Wheel Result ({time}):",
    wheelHint: "Menu changes sync to the wheel automatically",
  },
};

/* ==================== Constants ==================== */
const KEYS = {
  menuList: "menuList",
  dishCount: "dishCount",
  mealHistory: "mealHistory",
  language: "preferred-language",
  theme: "preferred-theme",
  appMode: "preferred-app-mode",
  pickMode: "preferred-pick-mode",
  antiRepeat: "anti-repeat-enabled",
  antiRepeatRange: "anti-repeat-range",
  eliminationPool: "elimination-pool",
  dishStats: "dish-stats",
};

const MAX_HISTORY = 20;
const MAX_STATS_ROWS = 20;

const TEMPLATES = [
  {
    id: "home",
    zh: {
      label: "🍱 家常菜",
      items: [
        "红烧肉",
        "鱼香肉丝",
        "番茄炒蛋",
        "麻婆豆腐",
        "糖醋里脊",
        "青椒肉丝",
        "宫保鸡丁",
        "土豆炖牛肉",
        "清炒时蔬",
        "可乐鸡翅",
        "回锅肉",
        "酸辣土豆丝",
        "韭菜炒蛋",
        "红烧排骨",
        "冬瓜汤",
      ],
    },
    en: {
      label: "🍱 Home-style",
      items: [
        "Braised Pork Belly",
        "Yu-Shiang Shredded Pork",
        "Tomato Scrambled Eggs",
        "Mapo Tofu",
        "Sweet & Sour Pork",
        "Shredded Pork with Green Pepper",
        "Kung Pao Chicken",
        "Beef Stew with Potato",
        "Stir-fried Greens",
        "Coke Chicken Wings",
        "Twice-cooked Pork",
        "Hot & Sour Potato Shreds",
        "Leek Scrambled Eggs",
        "Braised Pork Ribs",
        "Winter Melon Soup",
      ],
    },
  },
  {
    id: "takeout",
    zh: {
      label: "🛵 外卖",
      items: [
        "黄焖鸡米饭",
        "麻辣烫",
        "兰州拉面",
        "沙县小吃",
        "汉堡",
        "披萨",
        "寿司",
        "炸鸡",
        "猪脚饭",
        "饺子",
      ],
    },
    en: {
      label: "🛵 Takeout",
      items: [
        "Braised Chicken Rice",
        "Malatang",
        "Lanzhou Noodles",
        "Shaxian Snacks",
        "Burger",
        "Pizza",
        "Sushi",
        "Fried Chicken",
        "Pork Trotter Rice",
        "Dumplings",
      ],
    },
  },
  {
    id: "drinks",
    zh: {
      label: "🧋 饮品",
      items: ["奶茶", "咖啡", "柠檬水", "椰子水", "豆浆", "果汁", "气泡水", "酸奶"],
    },
    en: {
      label: "🧋 Drinks",
      items: [
        "Bubble Tea",
        "Coffee",
        "Lemonade",
        "Coconut Water",
        "Soy Milk",
        "Fruit Juice",
        "Sparkling Water",
        "Yogurt",
      ],
    },
  },
  {
    id: "snacks",
    zh: {
      label: "🍿 零食",
      items: ["薯片", "冰淇淋", "糖葫芦", "坚果", "饼干", "辣条", "蛋糕", "水果沙拉"],
    },
    en: {
      label: "🍿 Snacks",
      items: [
        "Potato Chips",
        "Ice Cream",
        "Candied Haw",
        "Nuts",
        "Cookies",
        "Spicy Strips",
        "Cake",
        "Fruit Salad",
      ],
    },
  },
];

/* ==================== State ==================== */
let currentLang = "zh";
let currentTheme = "auto"; // 'auto', 'light', 'dark'
let pickMode = "normal"; // 'normal', 'elimination', 'accumulate'
let slotTimers = [];
let wheelInstance = null;

/* ==================== DOM refs (script is deferred) ==================== */
const menuInput = document.getElementById("menuInput");
const countInput = document.getElementById("count");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("historyList");
const startButton = document.getElementById("startButton");
const saveStatus = document.getElementById("saveStatus");
const toastEl = document.getElementById("toast");
const wheelResultDiv = document.getElementById("wheelResult");
const wheelCenterBtn = document.getElementById("wheelCenterBtn");

/* ==================== Helpers ==================== */
function t(key) {
  return translations[currentLang][key] || translations.zh[key] || key;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeGetJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSetJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2000);
}

function parseMenu() {
  return menuInput.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.append(tmp);
    tmp.select();
    const ok = document.execCommand("copy");
    tmp.remove();
    return ok;
  }
}

/* ==================== Language & theme ==================== */
function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage || "";
  if (browserLang.startsWith("en")) {
    currentLang = "en";
  } else if (browserLang.startsWith("zh")) {
    currentLang = "zh";
  } else {
    currentLang = "en";
  }

  const savedLang = localStorage.getItem(KEYS.language);
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
  }
}

function detectTheme() {
  const savedTheme = localStorage.getItem(KEYS.theme);
  if (savedTheme && ["auto", "light", "dark"].includes(savedTheme)) {
    currentTheme = savedTheme;
  }
  updateThemeClass();
}

function updateThemeClass() {
  const root = document.documentElement;
  root.classList.remove("light-theme", "dark-theme");

  if (currentTheme === "light") {
    root.classList.add("light-theme");
  } else if (currentTheme === "dark") {
    root.classList.add("dark-theme");
  }

  updateThemeToggleIcon();
  redrawWheelForTheme();
}

function isDarkTheme() {
  if (currentTheme === "dark") return true;
  if (currentTheme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateThemeToggleIcon() {
  const themeToggle = document.getElementById("themeToggle");
  if (currentTheme === "light") {
    themeToggle.textContent = "☀️";
  } else if (currentTheme === "dark") {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "🌓";
  }
}

function toggleTheme() {
  if (currentTheme === "auto") {
    currentTheme = "light";
  } else if (currentTheme === "light") {
    currentTheme = "dark";
  } else {
    currentTheme = "auto";
  }
  localStorage.setItem(KEYS.theme, currentTheme);
  updateThemeClass();
}

function toggleLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem(KEYS.language, currentLang);
  updateUILanguage();
}

/* ==================== UI language ==================== */
function updateUILanguage() {
  document.documentElement.lang = currentLang;
  document.title = t("pageTitle");
  document.getElementById("title").textContent = t("title");
  document.getElementById("githubTooltip").title = t("githubTooltip");
  document.getElementById("themeToggle").title = t("themeToggleTooltip");
  document.getElementById("inputLabel").textContent = t("inputLabel");

  menuInput.placeholder = t("inputPlaceholder").replace(/\\n/g, "\n");

  document.getElementById("countPrefix").textContent = t("countPrefix");
  document.getElementById("countSuffix").textContent = t("countSuffix");
  startButton.textContent = t("startButton");
  document.getElementById("historyTitle").textContent = t("historyTitle");

  document.getElementById("listModeTab").textContent = t("listMode");
  document.getElementById("wheelModeTab").textContent = t("wheelMode");

  // Pick mode select labels
  const pickModeSelect = document.getElementById("pickMode");
  const modeOptionText = {
    normal: t("pickModeNormal"),
    elimination: t("pickModeElimination"),
    accumulate: t("pickModeAccumulate"),
  };
  for (const option of pickModeSelect.options) {
    option.textContent = modeOptionText[option.value];
  }
  pickModeSelect.title = t(`pickMode${cap(pickMode)}Tip`);

  // Anti-repeat
  document.getElementById("pickModeLabel").textContent = t("pickModeLabel");
  document.getElementById("antiRepeatLabel").textContent = t("antiRepeatLabel");
  document.getElementById("antiRepeatRange").setAttribute("aria-label", t("antiRepeatRangeAria"));
  document.getElementById("antiRepeatUnit").textContent = t("antiRepeatUnit");
  document.querySelector(".anti-repeat-group").title = t("antiRepeatTip");

  // Menu tools
  document.getElementById("templateLabel").textContent = t("templateLabel");
  document.getElementById("applyTemplateBtn").textContent = t("templateApply");
  document.getElementById("exportBtn").title = t("exportTooltip");
  document.getElementById("importBtn").title = t("importTooltip");
  document.getElementById("shareBtn").title = t("shareTooltip");
  buildTemplateOptions();

  // Stats & history
  document.getElementById("statsTitle").textContent = t("statsTitle");
  document.getElementById("clearStatsBtn").textContent = t("statsClear");
  document.getElementById("clearHistoryBtn").textContent = t("historyClear");
  wheelCenterBtn.setAttribute("aria-label", t("spinButtonAria"));
  wheelCenterBtn.title = t("spinButtonAria");
  document.getElementById("wheelHint").textContent = t("wheelHint");

  // Empty-state texts that are currently visible
  const noHistoryDiv = historyList.querySelector(".no-history");
  if (noHistoryDiv) noHistoryDiv.textContent = t("noHistory");

  const statsEmptyRow = document.querySelector("#statsList .stats-empty");
  if (statsEmptyRow) statsEmptyRow.textContent = t("statsEmpty");

  // Result section if it exists
  updateResultTitleLanguage(resultDiv, t("resultTitle"));
  updateResultTitleLanguage(wheelResultDiv, t("wheelResultTitle"));
}

function cap(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateResultTitleLanguage(container, template) {
  const h2 = container.querySelector("h2");
  if (!h2) return;
  const timeMatch = h2.textContent.match(/[(（]([^)）]+)[)）]/);
  if (timeMatch) {
    h2.textContent = template.replace("{time}", timeMatch[1]);
  }
}

/* ==================== App mode (list / wheel) ==================== */
function setAppMode(mode) {
  localStorage.setItem(KEYS.appMode, mode);
  const listPanel = document.getElementById("listPanel");
  const wheelPanel = document.getElementById("wheelPanel");
  const listTab = document.getElementById("listModeTab");
  const wheelTab = document.getElementById("wheelModeTab");

  const isWheel = mode === "wheel";
  listPanel.hidden = isWheel;
  wheelPanel.hidden = !isWheel;
  listTab.setAttribute("aria-selected", String(!isWheel));
  wheelTab.setAttribute("aria-selected", String(isWheel));

  if (isWheel) {
    ensureWheel().setItems(parseMenu());
  }
}

function ensureWheel() {
  if (!wheelInstance) {
    wheelInstance = MenuWheel.create(document.getElementById("wheelCanvas"), {
      dark: isDarkTheme(),
      onSpinEnd: handleWheelResult,
    });
  }
  return wheelInstance;
}

function redrawWheelForTheme() {
  if (wheelInstance) {
    wheelInstance.setDark(isDarkTheme());
  }
}

/* ==================== Auto-save ==================== */
let saveTimeout;

function showSaveStatus(text, className = "") {
  saveStatus.textContent = text;
  saveStatus.className = `save-status show ${className}`;
}

function hideSaveStatus() {
  saveStatus.className = "save-status";
}

function autoSave() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  showSaveStatus(t("saveStatus"), "saving");

  saveTimeout = setTimeout(() => {
    localStorage.setItem(KEYS.menuList, menuInput.value);
    syncEliminationPool(parseMenu());
    if (wheelInstance) wheelInstance.setItems(parseMenu());
    showSaveStatus(t("savedStatus"), "saved");
    setTimeout(hideSaveStatus, 2000);
  }, 800);
}

function saveCount() {
  localStorage.setItem(KEYS.dishCount, countInput.value);
}

function setupAutoSave() {
  menuInput.addEventListener("input", autoSave);
  menuInput.addEventListener("paste", autoSave);
  countInput.addEventListener("change", saveCount);
  countInput.addEventListener("input", saveCount);
}

/* ==================== Saved data loading ==================== */
function loadSavedMenu() {
  const saved = localStorage.getItem(KEYS.menuList);
  if (saved) menuInput.value = saved;
}

function loadSavedCount() {
  const saved = localStorage.getItem(KEYS.dishCount);
  if (saved) countInput.value = saved;
}

function loadHistory(excludeLatest = false) {
  const history = safeGetJSON(KEYS.mealHistory, []);
  updateHistoryUI(history, excludeLatest);
}

/* ==================== History ==================== */
function updateHistoryUI(history, excludeLatest) {
  const displayHistory = excludeLatest ? history.slice(0, history.length - 1) : history;
  historyList.textContent = "";

  if (!displayHistory.length) {
    historyList.append(el("div", "no-history", t("noHistory")));
    return;
  }

  displayHistory
    .slice()
    .reverse()
    .forEach((item) => {
      const div = el("div", "history-item");
      const strong = el("strong", null, item.time);
      const ul = document.createElement("ul");
      item.items.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        ul.append(li);
      });
      div.append(strong, ul);
      historyList.append(div);
    });
}

function pushHistory(items) {
  let history = safeGetJSON(KEYS.mealHistory, []);
  history.push({ time: new Date().toLocaleString(), items });
  if (history.length > MAX_HISTORY) {
    history = history.slice(history.length - MAX_HISTORY);
  }
  safeSetJSON(KEYS.mealHistory, history);
}

function clearHistory() {
  if (!window.confirm(t("historyConfirmClear"))) return;
  localStorage.removeItem(KEYS.mealHistory);
  loadHistory();
}

/* ==================== Stats ==================== */
function loadStats() {
  return safeGetJSON(KEYS.dishStats, {});
}

function bumpStats(items) {
  const stats = loadStats();
  items.forEach((name) => {
    stats[name] = (stats[name] || 0) + 1;
  });
  safeSetJSON(KEYS.dishStats, stats);
  renderStats();
}

function renderStats() {
  const stats = loadStats();
  const list = document.getElementById("statsList");
  list.textContent = "";

  const entries = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_STATS_ROWS);

  if (!entries.length) {
    list.append(el("div", "stats-empty", t("statsEmpty")));
    return;
  }

  entries.forEach(([name, count]) => {
    const row = el("div", "stats-row");
    const nameSpan = el("span", "stats-name", name);
    const countSpan = el("span", "stats-count", `×${count}`);
    row.append(nameSpan, countSpan);
    list.append(row);
  });
}

function clearStats() {
  if (!window.confirm(t("statsConfirmClear"))) return;
  localStorage.removeItem(KEYS.dishStats);
  renderStats();
}

/* ==================== Anti-repeat ==================== */
function recentDishes(rounds) {
  const history = safeGetJSON(KEYS.mealHistory, []);
  return new Set(history.slice(-rounds).flatMap((entry) => entry.items));
}

function isAntiRepeatEnabled() {
  return document.getElementById("antiRepeat").checked;
}

function antiRepeatRange() {
  const value = parseInt(document.getElementById("antiRepeatRange").value, 10);
  return Number.isFinite(value) ? Math.max(1, Math.min(value, 10)) : 3;
}

/* ==================== Elimination pool ==================== */
// The pool is stored together with a sorted snapshot of the menu it was
// created from, so that "menu changed" can be distinguished from "items
// were eliminated" (an eliminated pool is a subset of the menu by design).
function eliminationMenuKey(lines) {
  return [...lines].sort().join("\u0000");
}

function syncEliminationPool(lines) {
  const state = safeGetJSON(KEYS.eliminationPool, null);
  const menuKey = eliminationMenuKey(lines);
  if (state && Array.isArray(state.pool) && state.menu === menuKey) return;
  safeSetJSON(KEYS.eliminationPool, { menu: menuKey, pool: [...lines] });
}

function loadEliminationPool(lines) {
  syncEliminationPool(lines);
  const state = safeGetJSON(KEYS.eliminationPool, { pool: [...lines] });
  return Array.isArray(state.pool) ? state.pool : [...lines];
}

function saveEliminationPool(lines, pool) {
  safeSetJSON(KEYS.eliminationPool, { menu: eliminationMenuKey(lines), pool });
}

/* ==================== Picking ==================== */
function setPickMode(mode) {
  pickMode = mode;
  localStorage.setItem(KEYS.pickMode, mode);
  countInput.disabled = mode === "elimination";
  document.getElementById("pickMode").title = t(`pickMode${cap(mode)}Tip`);
}

function pickRandomFrom(pool) {
  const index = Math.floor(Math.random() * pool.length);
  return { item: pool[index], index };
}

function pick() {
  // Abort a running slot animation, if any
  slotTimers.forEach(clearTimeout);
  slotTimers = [];

  const lines = parseMenu();
  if (!lines.length) {
    window.alert(t("alertNoMenu"));
    return;
  }

  localStorage.setItem(KEYS.menuList, menuInput.value);

  let picked = [];
  let notice = null;

  if (pickMode === "elimination") {
    const pool = loadEliminationPool(lines);
    if (!pool.length) {
      pool.push(...lines);
      notice = t("eliminationDone");
    }
    const { item, index } = pickRandomFrom(pool);
    pool.splice(index, 1);
    saveEliminationPool(lines, pool);
    picked = [item];
  } else {
    const requested = parseInt(countInput.value, 10);
    let count = Number.isFinite(requested) ? Math.max(1, Math.min(requested, 100)) : 2;
    let candidates = lines;

    if (isAntiRepeatEnabled()) {
      const excluded = recentDishes(antiRepeatRange());
      const filtered = candidates.filter((name) => !excluded.has(name));
      if (filtered.length >= Math.min(count, candidates.length)) {
        candidates = filtered;
      } else {
        notice = t("fallbackNotice");
      }
    }

    count = Math.min(count, candidates.length);
    if (pickMode === "accumulate") {
      // Repeats allowed — each draw is independent
      for (let i = 0; i < count; i++) {
        picked.push(pickRandomFrom(candidates).item);
      }
    } else {
      // Unique picks
      const temp = [...candidates];
      for (let i = 0; i < count; i++) {
        const { index } = pickRandomFrom(temp);
        picked.push(temp.splice(index, 1)[0]);
      }
    }
  }

  // Persist data before the cosmetic animation
  bumpStats(picked);
  pushHistory(picked);
  animateResult(picked, lines, notice);
}

/* ==================== Slot-machine result animation ==================== */
function animateResult(picked, candidates, notice) {
  resultDiv.textContent = "";

  const h2 = el("h2", null, t("resultTitle").replace("{time}", new Date().toLocaleString()));
  resultDiv.append(h2);

  if (notice) {
    resultDiv.append(el("p", "pick-notice", notice));
  }

  const slots = el("div", "slots");
  const slotNames = picked.map(() => {
    const slot = el("div", "slot");
    const name = el("span", "slot-name");
    slot.append(name);
    slots.append(slot);
    return name;
  });
  resultDiv.append(slots);

  startButton.disabled = true;
  const pool = candidates.length ? candidates : picked;

  picked.forEach((finalName, i) => {
    const nameEl = slotNames[i];
    const cycle = (delay) => {
      if (nameEl.dataset.stopped) return;
      nameEl.textContent = pool[Math.floor(Math.random() * pool.length)];
      slotTimers.push(setTimeout(() => cycle(Math.min(delay + 18, 220)), delay));
    };
    cycle(60);

    slotTimers.push(
      setTimeout(
        () => {
          nameEl.dataset.stopped = "1";
          nameEl.textContent = finalName;
          nameEl.classList.add("final");
          nameEl.closest(".slot").classList.add("final");
          if (i === picked.length - 1) {
            finishResultAnimation(resultDiv);
          }
        },
        900 + i * 350
      )
    );
  });
}

function finishResultAnimation(container) {
  spawnSparkles(container);
  startButton.disabled = false;
  loadHistory(true); // hide the just-added entry, matching previous behaviour
}

function spawnSparkles(container) {
  const emojis = ["✨", "🎉", "🍽️", "🥢", "🎊"];
  for (let i = 0; i < 14; i++) {
    const sparkle = el("span", "sparkle", emojis[i % emojis.length]);
    sparkle.style.left = `${10 + Math.random() * 80}%`;
    sparkle.style.top = `${20 + Math.random() * 60}%`;
    sparkle.style.setProperty("--dx", `${(Math.random() - 0.5) * 140}px`);
    sparkle.style.setProperty("--dy", `${-30 - Math.random() * 70}px`);
    sparkle.style.animationDelay = `${Math.random() * 0.25}s`;
    container.append(sparkle);
    setTimeout(() => sparkle.remove(), 1300);
  }
}

/* ==================== Templates ==================== */
function buildTemplateOptions() {
  const select = document.getElementById("templateSelect");
  const previous = select.value;
  select.textContent = "";

  const placeholder = el("option", null, t("templatePick"));
  placeholder.value = "";
  select.append(placeholder);

  TEMPLATES.forEach((tpl) => {
    const localized = tpl[currentLang];
    const option = el("option", null, localized.label);
    option.value = tpl.id;
    select.append(option);
  });

  select.value = [...select.options].some((o) => o.value === previous) ? previous : "";
}

function applyTemplate() {
  const select = document.getElementById("templateSelect");
  const tpl = TEMPLATES.find((item) => item.id === select.value);
  if (!tpl) return;

  const localized = tpl[currentLang];
  if (menuInput.value.trim() && !window.confirm(t("templateConfirmReplace"))) {
    return;
  }

  menuInput.value = localized.items.join("\n");
  localStorage.setItem(KEYS.menuList, menuInput.value);
  syncEliminationPool(parseMenu());
  if (wheelInstance) wheelInstance.setItems(parseMenu());
  showToast(t("templateApplied").replace("{name}", localized.label));
}

/* ==================== Import / export / share ==================== */
function exportMenu() {
  const menu = menuInput.value;
  if (!menu.trim()) {
    window.alert(t("alertNoMenu"));
    return;
  }
  const blob = new Blob([menu], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "menu.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function importMenu(file) {
  if (!file) return;
  file
    .text()
    .then((text) => {
      if (!text.trim()) return;
      if (menuInput.value.trim() && !window.confirm(t("importConfirmReplace"))) return;
      menuInput.value = text.replace(/\r\n/g, "\n").trimEnd() + "\n";
      localStorage.setItem(KEYS.menuList, menuInput.value);
      syncEliminationPool(parseMenu());
      if (wheelInstance) wheelInstance.setItems(parseMenu());
    })
    .catch(() => window.alert(t("importFailed")));
}

async function shareMenu() {
  const menu = menuInput.value.trim();
  if (!menu) {
    window.alert(t("alertNoMenu"));
    return;
  }
  const url = `${location.origin}${location.pathname}#menu=${encodeURIComponent(menu)}`;
  const ok = await copyToClipboard(url);
  showToast(ok ? t("shareCopied") : url);
}

function maybeLoadSharedMenu() {
  const match = location.hash.match(/^#menu=(.+)$/);
  if (!match) return;
  let menu;
  try {
    menu = decodeURIComponent(match[1]);
  } catch {
    return;
  }
  if (!menu.trim()) return;

  if (window.confirm(t("loadSharedMenu"))) {
    menuInput.value = menu;
    localStorage.setItem(KEYS.menuList, menu);
  }
  history.replaceState(null, "", location.pathname + location.search);
}

/* ==================== Wheel mode ==================== */
function handleWheelResult(item) {
  wheelCenterBtn.disabled = false;
  wheelResultDiv.textContent = "";

  const h2 = el("h2", null, t("wheelResultTitle").replace("{time}", new Date().toLocaleString()));
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.textContent = item;
  ul.append(li);

  wheelResultDiv.append(h2, ul);
  spawnSparkles(wheelResultDiv);

  bumpStats([item]);
  pushHistory([item]);
}

function spinWheel() {
  const items = parseMenu();
  if (items.length < 2) {
    showToast(t("wheelNeedItems"));
    return;
  }
  wheelCenterBtn.disabled = true;
  ensureWheel().setItems(items);
  ensureWheel().spin();
}

/* ==================== Init ==================== */
function loadPreferences() {
  const savedAppMode = localStorage.getItem(KEYS.appMode);
  setAppMode(savedAppMode === "wheel" ? "wheel" : "list");

  const savedPickMode = localStorage.getItem(KEYS.pickMode);
  setPickMode(
    ["normal", "elimination", "accumulate"].includes(savedPickMode) ? savedPickMode : "normal"
  );
  document.getElementById("pickMode").value = pickMode;

  document.getElementById("antiRepeat").checked = localStorage.getItem(KEYS.antiRepeat) === "1";
  const savedRange = parseInt(localStorage.getItem(KEYS.antiRepeatRange), 10);
  if (Number.isFinite(savedRange)) {
    document.getElementById("antiRepeatRange").value = Math.max(1, Math.min(savedRange, 10));
  }
}

function bindEvents() {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("langToggle").addEventListener("click", toggleLanguage);

  document.getElementById("listModeTab").addEventListener("click", () => setAppMode("list"));
  document.getElementById("wheelModeTab").addEventListener("click", () => setAppMode("wheel"));

  document
    .getElementById("pickMode")
    .addEventListener("change", (e) => setPickMode(e.target.value));

  document.getElementById("antiRepeat").addEventListener("change", (e) => {
    localStorage.setItem(KEYS.antiRepeat, e.target.checked ? "1" : "0");
  });
  document.getElementById("antiRepeatRange").addEventListener("change", (e) => {
    localStorage.setItem(KEYS.antiRepeatRange, e.target.value);
  });

  startButton.addEventListener("click", pick);
  document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);
  document.getElementById("clearStatsBtn").addEventListener("click", clearStats);

  document.getElementById("applyTemplateBtn").addEventListener("click", applyTemplate);
  document.getElementById("exportBtn").addEventListener("click", exportMenu);
  document.getElementById("importBtn").addEventListener("click", () => {
    document.getElementById("importFile").click();
  });
  document.getElementById("importFile").addEventListener("change", (e) => {
    importMenu(e.target.files[0]);
    e.target.value = "";
  });
  document.getElementById("shareBtn").addEventListener("click", shareMenu);

  wheelCenterBtn.addEventListener("click", spinWheel);

  window.addEventListener("resize", () => {
    if (wheelInstance) wheelInstance.resize();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redrawWheelForTheme);
}

function init() {
  detectLanguage();
  detectTheme();
  updateUILanguage();
  maybeLoadSharedMenu();
  loadSavedMenu();
  loadSavedCount();
  loadHistory();
  loadPreferences();
  renderStats();
  setupAutoSave();
  bindEvents();
}

init();

/* ==================== PWA ==================== */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {
    /* SW unavailable (e.g. plain http hosting) — the app still works */
  });
}
