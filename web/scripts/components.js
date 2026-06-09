/* Shared web UI helpers — BDSec */

function fmtMNT(n, opts) {
  const o = opts || {};
  const digits = o.decimals !== undefined ? o.decimals : (Math.abs(n) >= 1000 ? 0 : 2);
  const formatted = Number(n).toLocaleString('mn-MN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatted + '₮';
}

function fmtPct(n) {
  const sign = n > 0 ? '+' : '';
  return sign + n.toFixed(2) + '%';
}

function fmtChange(n, pct) {
  const sign = n > 0 ? '+' : '';
  return sign + n.toFixed(2) + ' (' + fmtPct(pct) + ')';
}

function stockBySymbol(symbol) {
  if (typeof STOCKS === 'undefined') return null;
  return STOCKS.find(s => s.symbol === symbol) || null;
}

function getStockName(s) {
  return s.mnName || s.name || s.symbol;
}

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  try { lucide.createIcons(); } catch (e) {}
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

function renderStockModalList(containerId, searchId, selectedSymbol, onSelect) {
  const container = document.getElementById(containerId);
  const searchEl = document.getElementById(searchId);
  if (!container || typeof STOCKS === 'undefined') return;

  function render(filter) {
    const q = (filter || '').toLowerCase();
    const list = STOCKS.filter(s =>
      !q || s.symbol.toLowerCase().includes(q) ||
      getStockName(s).toLowerCase().includes(q)
    );
    container.innerHTML = list.map(s => `
      <div class="stock-search-item${s.symbol === selectedSymbol ? ' selected' : ''}"
           data-symbol="${s.symbol}">
        <div>
          <strong>${s.symbol}</strong>
          <span style="font-size:12px;color:var(--color-text-secondary);margin-left:6px">${getStockName(s)}</span>
        </div>
        <span class="mono">${fmtMNT(s.price)}</span>
      </div>`).join('');

    container.querySelectorAll('.stock-search-item').forEach(el => {
      el.addEventListener('click', () => onSelect(el.dataset.symbol));
    });
  }

  if (searchEl) {
    searchEl.oninput = () => render(searchEl.value);
  }
  render('');
}

window.fmtMNT = fmtMNT;
window.fmtPct = fmtPct;
window.fmtChange = fmtChange;
window.stockBySymbol = stockBySymbol;
window.getStockName = getStockName;
window.openModal = openModal;
window.closeModal = closeModal;
window.renderStockModalList = renderStockModalList;

function showToast(msg, type) {
  let el = document.getElementById('web-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'web-toast';
    el.className = 'web-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'web-toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2800);
}

window.showToast = showToast;
