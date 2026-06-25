/* =============================================
   Wallet data & helpers — shared across
   balance / deposit / withdraw / bank-account pages
   ============================================= */

const WALLET_BALANCES_KEY  = 'bdsec-wallet-balances';
const BANK_ACCOUNTS_KEY    = 'bdsec-bank-accounts';
const DEPOSIT_HISTORY_KEY  = 'bdsec-deposit-history';
const WITHDRAW_HISTORY_KEY = 'bdsec-withdraw-history';
const SAVED_CARD_KEY       = 'bdsec-saved-card';
const SIGNATURE_KEY        = 'bdsec-signature';
const TRIPARTITE_KEY       = 'bdsec-tripartite-agreement';
const PROFILE_KEY          = 'bdsec-user-profile';

const DEFAULT_BALANCES = { nominal: 50000, mcsd: 0 };

const DEFAULT_BANK_ACCOUNTS = [
  { id: 'b1', bank: 'Хаан банк',   logo: 'bank01.png', number: '5012345678', holder: 'Лхагвасүрэн Батцэнгэл', isDefault: true  },
  { id: 'b2', bank: 'Голомт банк', logo: 'bank02.png', number: '1234567890', holder: 'Лхагвасүрэн Батцэнгэл', isDefault: false },
];

// Receiving account shown for bank-transfer deposits
const COMPANY_BANK_ACCOUNT = {
  bank: 'Хаан банк', logo: 'bank01.png', number: '5000123456', holder: 'БиДиСек ҮЦК ХХК'
};

const PAY_APPS = ['Хаан банк','ХХБ Банк','Голомт Банк','Хас Банк','M Банк','Төрийн Банк','Ариг Банк','Toki'];

const WITHDRAW_FEE = 500; // flat fee per withdrawal request, ₮

const SEED_DEPOSIT_HISTORY = [
  { id: 'dep-1003', date: '2026-06-09 14:22', account: 'nominal', amount: 30000, channel: 'transfer', status: 'completed' },
  { id: 'dep-1002', date: '2026-06-05 10:05', account: 'nominal', amount: 20000, channel: 'card',     status: 'completed' },
  { id: 'dep-1001', date: '2026-05-28 09:40', account: 'mcsd',    amount: 10000, channel: 'app',      status: 'cancelled' },
];

const SEED_WITHDRAW_HISTORY = [
  { id: 'wd-2003', date: '2026-06-10 16:10', account: 'nominal', amount: 15000, fee: WITHDRAW_FEE, bankAccountId: 'b1', status: 'pending'   },
  { id: 'wd-2002', date: '2026-06-02 11:30', account: 'nominal', amount: 10000, fee: WITHDRAW_FEE, bankAccountId: 'b1', status: 'completed' },
  { id: 'wd-2001', date: '2026-05-20 13:00', account: 'nominal', amount: 5000,  fee: WITHDRAW_FEE, bankAccountId: 'b2', status: 'cancelled' },
];

/* ── localStorage helpers ── */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function saveJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getBalances()        { return loadJSON(WALLET_BALANCES_KEY, DEFAULT_BALANCES); }
function setBalances(b)       { saveJSON(WALLET_BALANCES_KEY, b); }

function getBankAccounts()    { return loadJSON(BANK_ACCOUNTS_KEY, DEFAULT_BANK_ACCOUNTS); }
function setBankAccounts(l)   { saveJSON(BANK_ACCOUNTS_KEY, l); }

function getDepositHistory()  { return loadJSON(DEPOSIT_HISTORY_KEY, SEED_DEPOSIT_HISTORY); }
function setDepositHistory(l) { saveJSON(DEPOSIT_HISTORY_KEY, l); }

function getWithdrawHistory()  { return loadJSON(WITHDRAW_HISTORY_KEY, SEED_WITHDRAW_HISTORY); }
function setWithdrawHistory(l) { saveJSON(WITHDRAW_HISTORY_KEY, l); }

function getSavedCard()  { return loadJSON(SAVED_CARD_KEY, null); }
function setSavedCard(c) { saveJSON(SAVED_CARD_KEY, c); }

function getSignature()  { return loadJSON(SIGNATURE_KEY, null); }
function setSignature(dataUrl) { saveJSON(SIGNATURE_KEY, dataUrl); }

function getTripartiteAgreement()  { return loadJSON(TRIPARTITE_KEY, null); }
function setTripartiteAgreement(a) { saveJSON(TRIPARTITE_KEY, a); }

const DEFAULT_PROFILE = { username: 'lkhagvasuren10', email: 'blkhagvasuren10@gmail.com', phone: '' };
function getUserProfile()  { return { ...DEFAULT_PROFILE, ...loadJSON(PROFILE_KEY, {}) }; }
function setUserProfile(p) { saveJSON(PROFILE_KEY, { ...getUserProfile(), ...p }); }

/* ── Price alerts ── */
const PRICE_ALERTS_KEY = 'bdsec-price-alerts';

const PRICE_TYPE_LABELS = {
  open:   'Нээлтийн үнэ',
  close:  'Хаалтын үнэ',
  high:   'Дээд үнэ',
  low:    'Доод үнэ',
  last:   'Сүүлийн арилжсан үнэ',
};

const ALERT_CONDITION_LABELS = {
  gt:  'Их',
  lt:  'Бага',
  eq:  'Тэнцүү',
  gte: 'Их буюу тэнцүү',
  lte: 'Бага буюу тэнцүү',
};

function getPriceAlerts()    { return loadJSON(PRICE_ALERTS_KEY, []); }
function setPriceAlerts(arr) { saveJSON(PRICE_ALERTS_KEY, arr); }

function addPriceAlert(alert) {
  const alerts = getPriceAlerts();
  alerts.unshift({
    id: genId('alert'),
    active: true,
    createdDate: new Date().toISOString().slice(0, 10),
    ...alert,
  });
  setPriceAlerts(alerts);
  return alerts;
}

function genId(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 9);
}

/* ── Formatting ── */
function formatMNT(v) {
  return v.toLocaleString('en-US', { minimumFractionDigits: v % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 }) + ' ₮';
}

const STATUS_LABELS = {
  pending:   'Хүлээгдэж буй',
  completed: 'Биелсэн',
  cancelled: 'Цуцлагдсан',
};
const STATUS_BADGE_CLASS = {
  pending:   'badge-warning',
  completed: 'badge-success',
  cancelled: 'badge-error',
};
const STATUS_ICONS = {
  pending:   'clock',
  completed: 'check-circle-2',
  cancelled: 'x-circle',
};
function statusBadge(status) {
  return `<span class="badge ${STATUS_BADGE_CLASS[status] || 'badge-info'}">${STATUS_LABELS[status] || status}</span>`;
}
function statusIcon(status) {
  return `<div class="hist-status-icon ${status}" title="${STATUS_LABELS[status] || status}"><i data-lucide="${STATUS_ICONS[status] || 'circle'}"></i></div>`;
}
function statusIconLarge(status) {
  return `<div class="hist-icon status-${status}" title="${STATUS_LABELS[status] || status}"><i data-lucide="${STATUS_ICONS[status] || 'circle'}"></i></div>`;
}

const ACCOUNT_LABELS = { nominal: 'Номинал Данс', mcsd: 'ҮЦТХТ данс' };
const CHANNEL_LABELS = { transfer: 'Банкны шилжүүлэг', app: 'Банкны апп', card: 'Карт' };

function maskAccountNumber(num) {
  const s = String(num);
  return s.length <= 4 ? s : '•••• ' + s.slice(-4);
}

/* ── Detail modal content ── */
function renderDepositDetail(d) {
  return `
    <div class="verify-row"><span>Данс</span><span>${ACCOUNT_LABELS[d.account]}</span></div>
    <div class="verify-row"><span>Дүн</span><span>${formatMNT(d.amount)}</span></div>
    <div class="verify-row"><span>Төлбөрийн суваг</span><span>${CHANNEL_LABELS[d.channel] || d.channel}</span></div>
    <div class="verify-row"><span>Огноо</span><span>${d.date}</span></div>
    <div class="verify-row"><span>Төлөв</span><span>${STATUS_LABELS[d.status] || d.status}</span></div>
  `;
}
function renderWithdrawDetail(w) {
  const acc = getBankAccounts().find(a => a.id === w.bankAccountId);
  const accName = acc ? `${acc.bank} · ${maskAccountNumber(acc.number)}` : '—';
  const holder  = acc ? acc.holder : '—';
  return `
    <div class="verify-row"><span>Данс</span><span>${ACCOUNT_LABELS[w.account]}</span></div>
    <div class="verify-row"><span>Дүн</span><span>${formatMNT(w.amount)}</span></div>
    <div class="verify-row"><span>Шимтгэл</span><span>${formatMNT(w.fee)}</span></div>
    <div class="verify-row total"><span>Нийт суутгасан</span><span>${formatMNT(w.amount)}</span></div>
    <div class="verify-row"><span>Хүлээн авах данс</span><span>${accName}</span></div>
    <div class="verify-row"><span>Данс Holder</span><span>${holder}</span></div>
    <div class="verify-row"><span>Огноо</span><span>${w.date}</span></div>
    <div class="verify-row"><span>Төлөв</span><span>${STATUS_LABELS[w.status] || w.status}</span></div>
  `;
}

/* ── Modal open/close: tells the parent shell to raise the page above the bottom nav ── */
function notifyModalOpen() {
  try { window.parent.postMessage({ type: 'modal-open' }, '*'); } catch (e) {}
}
function notifyModalClose() {
  try { window.parent.postMessage({ type: 'modal-close' }, '*'); } catch (e) {}
}
