/* =============================================
   Web shell — theme, navigation, BDSec
   ============================================= */

const PAGE_MAP = {
  home:             'pages/home.html',
  balance:          'pages/balance.html',
  trade:            'pages/trade.html',
  returns:          'pages/returns.html',
  ipo:              'pages/ipo.html',
  portfolio:        'pages/portfolio.html',
  'all-orders':     'pages/all-orders.html',
  recharge:         'pages/recharge.html',
  withdrawal:       'pages/withdrawal.html',
  history:          'pages/history.html',
  stocks:           'pages/stocks.html',
  bonds:            'pages/bonds.html',
  alerts:           'pages/alerts.html',
  notifications:    'pages/notifications.html',
  faq:              'pages/faq.html',
  about:            'pages/about.html',
  profile:          'pages/profile.html',
  'open-account':   'pages/open-account.html',
  general:          'pages/general.html',
  fee:              'pages/fee.html',
  'opening-process':'pages/opening-process.html',
  broker:           'pages/broker.html',
  kyc:              'pages/kyc.html',
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tradex-theme', theme);

  document.getElementById('icon-sun')?.classList.toggle('hidden', theme === 'light');
  document.getElementById('icon-moon')?.classList.toggle('hidden', theme === 'dark');

  syncFrameTheme(theme);
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(cur === 'light' ? 'dark' : 'light');
}

function syncFrameTheme(theme) {
  try {
    const frame = document.getElementById('page-frame');
    frame?.contentDocument?.documentElement?.setAttribute('data-theme', theme);
  } catch (e) {}
}

function navigateTo(key) {
  const href = PAGE_MAP[key];
  if (!href) return;

  const frame = document.getElementById('page-frame');
  const pageTitle = document.getElementById('page-title');

  frame.src = href;

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`.nav-link[data-page="${key}"]`);
  if (link) {
    link.classList.add('active');
    if (pageTitle) pageTitle.textContent = link.dataset.title || '';
  }

  frame.onload = onFrameLoad;
}

function onFrameLoad() {
  syncFrameTheme(document.documentElement.getAttribute('data-theme'));
  try { lucide.createIcons({ context: document.getElementById('page-frame').contentDocument }); } catch (e) {}
}

function fmtHeader(n) {
  return Number(n).toLocaleString('mn-MN', { maximumFractionDigits: 0 }) + '₮';
}

applyTheme(localStorage.getItem('tradex-theme') || 'dark');

if (typeof WALLET !== 'undefined') {
  const pEl = document.getElementById('hdr-portfolio');
  const aEl = document.getElementById('hdr-available');
  if (pEl) pEl.textContent = fmtHeader(WALLET.portfolioValue);
  if (aEl) aEl.textContent = fmtHeader(WALLET.cashBalance);
}

if (typeof USER !== 'undefined') {
  const nameEl = document.querySelector('#sidebar-user-name');
  const acctEl = document.querySelector('#sidebar-user-acct');
  const initEl = document.querySelector('#sidebar-user-initials');
  if (nameEl) nameEl.textContent = USER.name;
  if (acctEl) acctEl.textContent = WALLET?.accountNo || '';
  if (initEl) initEl.textContent = USER.initials;
}

const frame = document.getElementById('page-frame');
const pageTitle = document.getElementById('page-title');

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.classList.contains('pointer-events-none') || link.classList.contains('nav-link-soon')) return;

  link.addEventListener('click', e => {
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (pageTitle) pageTitle.textContent = link.dataset.title || '';

    frame.src = link.href;
    frame.onload = onFrameLoad;
  });
});

function logout() {
  if (confirm('BDSec-ээс гарах уу?')) {
    window.location.href = '../mobile/login.html';
  }
}

window.navigateTo = navigateTo;
