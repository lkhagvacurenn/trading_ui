/* =============================================
   Wallet data & helpers — shared across
   balance / deposit / withdraw / bank-account pages
   ============================================= */

const WALLET_BALANCES_KEY  = 'bdsec-wallet-balances';
const BANK_ACCOUNTS_KEY    = 'bdsec-bank-accounts';
const DEPOSIT_HISTORY_KEY  = 'bdsec-deposit-history';
const WITHDRAW_HISTORY_KEY = 'bdsec-withdraw-history';
const SAVED_CARD_KEY       = 'bdsec-saved-card';

const DEFAULT_BALANCES = { nominal: 50000, mcsd: 0 };

const DEFAULT_BANK_ACCOUNTS = [
  { id: 'b1', bank: 'Khan Bank',   logo: 'bank01.png', number: '5012345678', holder: 'Lkhagvasuren Battsengel', isDefault: true  },
  { id: 'b2', bank: 'Golomt Bank', logo: 'bank02.png', number: '1234567890', holder: 'Lkhagvasuren Battsengel', isDefault: false },
];

// Receiving account shown for bank-transfer deposits
const COMPANY_BANK_ACCOUNT = {
  bank: 'Khan Bank', logo: 'bank01.png', number: '5000123456', holder: 'BDSec Securities LLC'
};

const PAY_APPS = ['QPay','Socialpay','iPay','Storepay','Lendpay','Nomad','MBank','MobiFinance'];

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

function genId(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 9);
}

/* ── Formatting ── */
function formatMNT(v) {
  return v.toLocaleString('en-US', { minimumFractionDigits: v % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 }) + ' ₮';
}

const STATUS_LABELS = {
  pending:   'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
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

const ACCOUNT_LABELS = { nominal: 'Nominal Account', mcsd: 'MCSD Account' };
const CHANNEL_LABELS = { transfer: 'Bank Transfer', app: 'Banking App', card: 'Card' };

function maskAccountNumber(num) {
  const s = String(num);
  return s.length <= 4 ? s : '•••• ' + s.slice(-4);
}

/* ── Detail modal content ── */
function renderDepositDetail(d) {
  return `
    <div class="verify-row"><span>Account</span><span>${ACCOUNT_LABELS[d.account]}</span></div>
    <div class="verify-row"><span>Amount</span><span>${formatMNT(d.amount)}</span></div>
    <div class="verify-row"><span>Payment Channel</span><span>${CHANNEL_LABELS[d.channel] || d.channel}</span></div>
    <div class="verify-row"><span>Date</span><span>${d.date}</span></div>
    <div class="verify-row"><span>Status</span><span>${STATUS_LABELS[d.status] || d.status}</span></div>
  `;
}
function renderWithdrawDetail(w) {
  const acc = getBankAccounts().find(a => a.id === w.bankAccountId);
  const accName = acc ? `${acc.bank} · ${maskAccountNumber(acc.number)}` : '—';
  const holder  = acc ? acc.holder : '—';
  return `
    <div class="verify-row"><span>Account</span><span>${ACCOUNT_LABELS[w.account]}</span></div>
    <div class="verify-row"><span>Amount</span><span>${formatMNT(w.amount)}</span></div>
    <div class="verify-row"><span>Fee</span><span>${formatMNT(w.fee)}</span></div>
    <div class="verify-row total"><span>Total Deducted</span><span>${formatMNT(w.amount)}</span></div>
    <div class="verify-row"><span>Receiving Account</span><span>${accName}</span></div>
    <div class="verify-row"><span>Account Holder</span><span>${holder}</span></div>
    <div class="verify-row"><span>Date</span><span>${w.date}</span></div>
    <div class="verify-row"><span>Status</span><span>${STATUS_LABELS[w.status] || w.status}</span></div>
  `;
}

/* ── Modal open/close: tells the parent shell to raise the page above the bottom nav ── */
function notifyModalOpen() {
  try { window.parent.postMessage({ type: 'modal-open' }, '*'); } catch (e) {}
}
function notifyModalClose() {
  try { window.parent.postMessage({ type: 'modal-close' }, '*'); } catch (e) {}
}
