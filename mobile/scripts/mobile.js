/* =============================================
   Mobile shell — theme & bottom-nav routing
   ============================================= */

// ── Theme ──────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tradex-theme', theme);

  document.getElementById('icon-sun')?.classList.toggle('hidden',  theme === 'light');
  document.getElementById('icon-moon')?.classList.toggle('hidden', theme === 'dark');

  syncFrameTheme(theme);
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'light' ? 'dark' : 'light');
}

function syncFrameTheme(theme) {
  try {
    const frame = document.getElementById('page-frame');
    frame?.contentDocument?.documentElement?.setAttribute('data-theme', theme);
  } catch (e) {}
}

applyTheme(localStorage.getItem('tradex-theme') || 'light');


// ── Bottom navigation ──────────────────────────
const frame     = document.getElementById('page-frame');
const pageTitle = document.getElementById('page-title');

function navigate(href, title, pageKey) {
  frame.src = href;
  if (pageTitle) pageTitle.textContent = title;

  // Active state
  document.querySelectorAll('.bottom-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.page === pageKey);
  });

  frame.onload = () => {
    syncFrameTheme(document.documentElement.getAttribute('data-theme'));
    try { lucide.createIcons({ context: frame.contentDocument }); } catch(e) {}
  };
}

document.querySelectorAll('.bottom-tab, .bottom-trade-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const { href, title, page } = btn.dataset;
    if (href) navigate(href, title || page, page);
  });
});
