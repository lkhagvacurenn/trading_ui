/* ── Onboarding state utilities ──
 * Reads the three localStorage keys set by:
 *   open-account.html  → 'bdsec-account-opened'
 *   kyc.html           → 'bdsec-kyc-done'
 *   tripartite.html    → 'bdsec-tripartite-agreement' (JSON {signed:true})
 */

function isAccountOpened() {
  const v = localStorage.getItem('bdsec-account-opened');
  return v === 'true' || v === '1';
}

function isKYCDone() {
  const v = localStorage.getItem('bdsec-kyc-done');
  return v === 'true' || v === '1';
}

function isTripartiteSigned() {
  try {
    const d = JSON.parse(localStorage.getItem('bdsec-tripartite-agreement') || 'null');
    return !!(d && d.signed);
  } catch(e) { return false; }
}

function isFullyOnboarded() {
  return isAccountOpened() && isKYCDone() && isTripartiteSigned();
}

/* Returns the page key for the next incomplete step, or null if done. */
function nextOnboardingStep() {
  if (!isAccountOpened()) return 'open-account';
  if (!isKYCDone())       return 'kyc';
  if (!isTripartiteSigned()) return 'tripartite';
  return null;
}

/* Navigate to the next incomplete onboarding step. */
function goToNextOnboardingStep() {
  const step = nextOnboardingStep();
  if (!step) return;
  try { window.parent.navigateTo(step); } catch(e) { window.location.href = step + '.html'; }
}

/*
 * Render an onboarding gate card into `container`.
 * Steps beyond requiredSteps are not shown.
 *   requiredSteps: array of step keys to show, e.g. ['open-account','kyc','tripartite']
 *   title: heading text
 *   subtitle: description text
 */
function renderOnboardingGate(container, { title, subtitle, requiredSteps } = {}) {
  const steps = (requiredSteps || ['open-account', 'kyc', 'tripartite']).map(key => ({
    key,
    label:   { 'open-account': 'Данс нээх', kyc: 'KYC баталгаажуулах', tripartite: 'Гурвалсан гэрээ' }[key],
    done:    { 'open-account': isAccountOpened(), kyc: isKYCDone(), tripartite: isTripartiteSigned() }[key],
  }));

  const nextStep  = steps.find(s => !s.done);
  const btnLabel  = nextStep ? `${nextStep.label} →` : 'Дуусгах';

  container.innerHTML = `
    <div class="onb-gate">
      <div class="onb-gate-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div class="onb-gate-title">${title || 'Дансаа идэвхжүүлнэ үү'}</div>
      <div class="onb-gate-sub">${subtitle || 'Доорх алхмуудыг дуусгаснаар бүрэн боломжтой болно.'}</div>
      <div class="onb-steps">
        ${steps.map((s, i) => `
          <div class="onb-step ${s.done ? 'done' : nextStep && nextStep.key === s.key ? 'active' : ''}">
            <div class="onb-step-num">${s.done
              ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
              : i + 1}</div>
            <span class="onb-step-label">${s.label}</span>
            ${s.done ? '<span class="onb-step-badge">Дууссан</span>' : nextStep && nextStep.key === s.key ? '<span class="onb-step-badge pending">Одоогийн</span>' : ''}
          </div>`).join('')}
      </div>
      ${nextStep ? `<button class="onb-gate-btn" onclick="goToNextOnboardingStep()">${btnLabel}</button>` : ''}
    </div>`;
}
