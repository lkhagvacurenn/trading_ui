/* =============================================
   Chart utilities — shared across mobile pages
   ============================================= */

/**
 * Renders a line/area chart into a container div.
 * @param {string} id      - container element ID
 * @param {number[]} data  - array of price values
 * @param {object} opts    - { color, height, showGrid, yLabels }
 */
function renderLineChart(id, data, opts = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  const W = el.clientWidth || 375;
  const H = opts.height || 220;
  const color = opts.color || '#3B82F6';
  const pad = { top: 8, right: 56, bottom: 8, left: 0 };

  const min = Math.min(...data) - (Math.max(...data) - Math.min(...data)) * 0.06;
  const max = Math.max(...data) + (Math.max(...data) - Math.min(...data)) * 0.04;
  const range = max - min || 1;

  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const pts = data.map((v, i) => ({
    x: pad.left + (i / (data.length - 1)) * innerW,
    y: pad.top + innerH - ((v - min) / range) * innerH,
  }));

  const linePath = 'M' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L');
  const areaPath = linePath
    + ` L${pts[pts.length-1].x.toFixed(1)},${(pad.top + innerH).toFixed(1)}`
    + ` L${pts[0].x.toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`;

  // Y-axis labels: 3 evenly spaced
  const yLabels = opts.yLabels || [
    (max).toFixed(2),
    ((max + min) / 2).toFixed(2),
    (min).toFixed(2),
  ];
  const yPositions = [pad.top + 4, pad.top + innerH * 0.5, pad.top + innerH - 4];

  // Grid lines
  let gridLines = '';
  if (opts.showGrid !== false) {
    yPositions.forEach(y => {
      gridLines += `<line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${pad.left + innerW}" y2="${y.toFixed(1)}"
                         stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>`;
    });
  }

  // Y-axis label elements
  let yLabelEls = '';
  yLabels.forEach((label, i) => {
    yLabelEls += `<text x="${W - 2}" y="${(yPositions[i] + 4).toFixed(1)}"
      text-anchor="end" font-size="10" fill="var(--color-text-disabled)"
      font-family="IBM Plex Mono, monospace">${label}</text>`;
  });

  el.innerHTML = `
    <svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad_${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.28"/>
          <stop offset="75%" stop-color="${color}" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" fill="url(#grad_${id})"/>
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.2"
            stroke-linejoin="round" stroke-linecap="round"/>
      ${yLabelEls}
    </svg>
  `;
}


/**
 * Renders a candlestick chart into a container div from a price series.
 * Each point in `data` is treated as a close; OHLC for each candle is
 * synthesized from neighboring closes so it works with the same series
 * used by renderLineChart.
 * @param {string} id      - container element ID
 * @param {number[]} data  - array of price values (closes)
 * @param {object} opts    - { upColor, downColor, height, showGrid, yLabels }
 */
function renderCandleChart(id, data, opts = {}) {
  const el = document.getElementById(id);
  if (!el || data.length < 2) return;

  const W = el.clientWidth || 375;
  const H = opts.height || 220;
  const upColor = opts.upColor || '#00C076';
  const downColor = opts.downColor || '#EF4444';
  const pad = { top: 8, right: 56, bottom: 8, left: 0 };

  const candles = data.map((v, i) => {
    const prev = data[i - 1] !== undefined ? data[i - 1] : v;
    const open = prev;
    const close = v;
    const high = Math.max(open, close) * 1.004;
    const low = Math.min(open, close) * 0.996;
    return { open, close, high, low };
  });

  const allVals = candles.flatMap(c => [c.high, c.low]);
  const min = Math.min(...allVals) - (Math.max(...allVals) - Math.min(...allVals)) * 0.06;
  const max = Math.max(...allVals) + (Math.max(...allVals) - Math.min(...allVals)) * 0.04;
  const range = max - min || 1;

  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const slot = innerW / candles.length;
  const bodyW = Math.max(2, slot * 0.6);

  const y = v => pad.top + innerH - ((v - min) / range) * innerH;

  let candleEls = '';
  candles.forEach((c, i) => {
    const x = pad.left + i * slot + slot / 2;
    const isUp = c.close >= c.open;
    const color = isUp ? upColor : downColor;
    const bodyTop = y(Math.max(c.open, c.close));
    const bodyBottom = y(Math.min(c.open, c.close));
    const bodyH = Math.max(1, bodyBottom - bodyTop);
    candleEls += `
      <line x1="${x.toFixed(1)}" y1="${y(c.high).toFixed(1)}" x2="${x.toFixed(1)}" y2="${y(c.low).toFixed(1)}" stroke="${color}" stroke-width="1"/>
      <rect x="${(x - bodyW / 2).toFixed(1)}" y="${bodyTop.toFixed(1)}" width="${bodyW.toFixed(1)}" height="${bodyH.toFixed(1)}" fill="${color}"/>
    `;
  });

  const yLabels = opts.yLabels || [max.toFixed(2), ((max + min) / 2).toFixed(2), min.toFixed(2)];
  const yPositions = [pad.top + 4, pad.top + innerH * 0.5, pad.top + innerH - 4];

  let gridLines = '';
  if (opts.showGrid !== false) {
    yPositions.forEach(yp => {
      gridLines += `<line x1="${pad.left}" y1="${yp.toFixed(1)}" x2="${pad.left + innerW}" y2="${yp.toFixed(1)}"
                         stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>`;
    });
  }

  let yLabelEls = '';
  yLabels.forEach((label, i) => {
    yLabelEls += `<text x="${W - 2}" y="${(yPositions[i] + 4).toFixed(1)}"
      text-anchor="end" font-size="10" fill="var(--color-text-disabled)"
      font-family="IBM Plex Mono, monospace">${label}</text>`;
  });

  el.innerHTML = `
    <svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      ${gridLines}
      ${candleEls}
      ${yLabelEls}
    </svg>
  `;
}


/**
 * Returns SVG markup for a small sparkline (stock card).
 * @param {number[]} data
 * @param {string} color
 * @returns {string} SVG element HTML
 */
function sparkline(data, color = '#3B82F6') {
  const W = 64, H = 30;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * H * 0.85 - H * 0.075,
  ]);
  const path = 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <path d="${path}" fill="none" stroke="${color}" stroke-width="1.8"
          stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}


/**
 * Renders a donut chart.
 * @param {string} id     - container element ID
 * @param {Array}  slices - [{label, value, color}, ...]
 * @param {string} centerLabel
 * @param {string} centerValue
 */
function renderDonut(id, slices, centerLabel, centerValue) {
  const el = document.getElementById(id);
  if (!el) return;

  const r = 60, cx = 80, cy = 80, strokeW = 20;
  const circ = 2 * Math.PI * r; // ~376.99
  const total = slices.reduce((s, sl) => s + sl.value, 0);

  let accAngle = -90; // start at top
  let circles = '';
  const gapDeg = 2.5; // gap between slices, acts as a border

  slices.forEach((sl, i) => {
    const pct = sl.value / total;
    const angleDeg = pct * 360;
    const drawDeg = Math.max(angleDeg - gapDeg, 0);
    const dash = (drawDeg / 360) * circ;
    const gap = circ - dash;
    circles += `
      <circle r="${r}" cx="${cx}" cy="${cy}" fill="none"
              stroke="${sl.color}" stroke-width="${strokeW}"
              stroke-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}"
              stroke-linecap="round"
              transform="rotate(${(accAngle + gapDeg / 2).toFixed(2)} ${cx} ${cy})"/>`;
    accAngle += angleDeg;
  });

  el.innerHTML = `
    <svg width="160" height="160" viewBox="0 0 160 160">
      <!-- Track ring -->
      <circle r="${r}" cx="${cx}" cy="${cy}" fill="none"
              stroke="var(--color-bg-input)" stroke-width="${strokeW}"/>
      ${circles}
      <!-- Center text -->
      <text x="${cx}" y="${cy - 8}" text-anchor="middle"
            font-size="10" fill="var(--color-text-disabled)"
            font-family="IBM Plex Sans, sans-serif">${centerLabel}</text>
      <text x="${cx}" y="${cy + 10}" text-anchor="middle"
            font-size="12" font-weight="700" fill="var(--color-text-primary)"
            font-family="IBM Plex Mono, monospace">${centerValue}</text>
    </svg>
  `;
}
