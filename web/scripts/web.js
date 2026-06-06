/* =============================================
   Web shell — theme & navigation
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

// Init
applyTheme(localStorage.getItem('tradex-theme') || 'light');


// ── Navigation ─────────────────────────────────
const frame = document.getElementById('page-frame');
const pageTitle = document.getElementById('page-title');

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (pageTitle) pageTitle.textContent = link.dataset.title || '';

    frame.src = link.href;
    frame.onload = () => {
      syncFrameTheme(document.documentElement.getAttribute('data-theme'));
      try { lucide.createIcons({ context: frame.contentDocument }); } catch(e) {}
    };
  });
});


// ── Auth ───────────────────────────────────────
function logout() {
  if (confirm('Sign out of TradeX?')) {
    window.location.href = '../pages/login.html';
  }
}
