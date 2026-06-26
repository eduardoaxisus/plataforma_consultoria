// AXISUS Platform - Router & Render Engine

function navigate(view, params = {}) {
  AXISUS.state.currentView = view;
  AXISUS.state.params = params;
  render();
}

function render() {
  const app = document.getElementById('app');
  const view = AXISUS.state.currentView;

  // Close any modals
  document.querySelectorAll('.modal-overlay').forEach(m => m.remove());

  // Route resolution
  if (view === 'landing') {
    app.innerHTML = renderLanding();
    bindLandingEvents();
  } else if (view === 'login') {
    app.innerHTML = renderLogin();
    bindLoginEvents();
  } else if (view === 'client_dashboard') {
    app.innerHTML = renderAppShell('client', renderClientDashboard());
    bindClientDashboardEvents();
  } else if (view === 'client_case') {
    app.innerHTML = renderAppShell('client', renderClientCase());
    bindClientCaseEvents();
  } else if (view === 'client_chat') {
    app.innerHTML = renderAppShell('client', renderClientChat());
    bindChatEvents();
  } else if (view === 'client_nps') {
    app.innerHTML = renderAppShell('client', renderClientNPS());
    bindNPSEvents();
  } else if (view === 'franchisee_dashboard') {
    app.innerHTML = renderAppShell('franchisee', renderFrancheeDashboard());
    bindFranchiseeDashboardEvents();
  } else if (view === 'franchisee_pipeline') {
    app.innerHTML = renderAppShell('franchisee', renderFrancheePipeline());
    bindPipelineEvents();
  } else if (view === 'franchisee_case') {
    app.innerHTML = renderAppShell('franchisee', renderFrancheeCase());
    bindFrancheeCaseEvents();
  } else if (view === 'franchisee_financial') {
    app.innerHTML = renderAppShell('franchisee', renderFrancheeFinancial());
  } else if (view === 'franchisee_templates') {
    app.innerHTML = renderAppShell('franchisee', renderTemplatesHub());
  } else if (view === 'template_t01') {
    app.innerHTML = renderAppShell('franchisee', renderT01());
    bindT01Events();
  } else if (view === 'template_t02') {
    app.innerHTML = renderAppShell('franchisee', renderT02());
    bindT02Events();
  } else if (view === 'template_t03') {
    app.innerHTML = renderAppShell('franchisee', renderT03());
    bindT03Events();
  } else if (view === 'template_t04') {
    app.innerHTML = renderT04();
    bindT04Events();
  } else if (view === 'template_t05') {
    app.innerHTML = renderT05();
    bindT05Events();
  } else if (view === 'template_t06') {
    app.innerHTML = renderT06();
    bindT06Events();
  } else if (view === 'template_t07') {
    app.innerHTML = renderT07();
    bindT07Events();
  } else if (view === 'template_t08') {
    app.innerHTML = renderT08();
    bindT08Events();
    bindTabEvents();
  } else if (view === 'template_t09') {
    app.innerHTML = renderT09();
    bindT09Events();
    bindTabEvents();
  } else if (view === 'candidate_dashboard') {
    app.innerHTML = renderAppShell('candidate', renderCandidateDashboard());
    bindCandidateEvents();
  } else if (view === 'hub_dashboard') {
    app.innerHTML = renderAppShell('hub', renderHubDashboard());
    bindHubDashboardEvents();
  } else if (view === 'hub_franchisees') {
    app.innerHTML = renderAppShell('hub', renderHubFranchisees());
    bindHubFranchiseesEvents();
  } else if (view === 'hub_candidates') {
    app.innerHTML = renderAppShell('hub', renderHubCandidates());
  } else if (view === 'hub_leads') {
    app.innerHTML = renderAppShell('hub', renderHubLeads());
  } else if (view === 'hub_qa') {
    app.innerHTML = renderAppShell('hub', renderHubQA());
    bindHubQAEvents();
  } else if (view === 'hub_proto') {
    app.innerHTML = renderAppShell('hub', renderHubProto());
  } else if (view === 'hub_library') {
    app.innerHTML = renderAppShell('hub', renderHubLibrary());
  } else if (view === 'hub_ia_quality') {
    app.innerHTML = renderAppShell('hub', renderHubIA());
    bindHubIAEvents();
    bindTabEvents();
  } else if (view === 'hub_financial') {
    app.innerHTML = renderAppShell('hub', renderHubFinancial());
  } else {
    app.innerHTML = `<div style="padding:40px;text-align:center;"><h2>Tela não encontrada</h2><button class="btn btn-primary mt-4" onclick="navigate('landing')">Voltar ao início</button></div>`;
  }

  // Re-bind tab clicks
  bindTabEvents();
}

function renderAppShell(universe, content) {
  return `
    <div class="app-layout">
      ${renderSidebar(universe)}
      <div class="main-content">
        ${renderTopbar(universe)}
        <div class="page-content fade-in">${content}</div>
      </div>
    </div>
  `;
}

function renderSidebar(universe) {
  const menus = {
    client: [
      { icon: 'home',     label: 'Dashboard',    view: 'client_dashboard' },
      { icon: 'briefcase',label: 'Meu Caso',     view: 'client_case' },
      { icon: 'file',     label: 'Documentos',   view: 'client_case', tab: 'docs' },
      { icon: 'upload',   label: 'Enviar Dados', view: 'client_case', tab: 'requests' },
      { icon: 'calendar', label: 'Reuniões',     view: 'client_case', tab: 'meetings' },
      { icon: 'message',  label: 'Mensagens',    view: 'client_chat', badge: '2' },
      { icon: 'dollar',   label: 'Financeiro',   view: 'client_case', tab: 'financial' },
    ],
    franchisee: [
      { icon: 'home',      label: 'Dashboard',    view: 'franchisee_dashboard' },
      { icon: 'funnel',    label: 'Pipeline',     view: 'franchisee_pipeline' },
      { icon: 'briefcase', label: 'Casos',        view: 'franchisee_case' },
      { icon: 'file',      label: 'Método 5D',    view: 'franchisee_templates' },
      { icon: 'message',   label: 'Mensagens',    view: 'franchisee_dashboard', badge: '3' },
      { icon: 'dollar',    label: 'Financeiro',   view: 'franchisee_financial' },
      { icon: 'chart',     label: 'Indicadores',  view: 'franchisee_dashboard' },
    ],
    candidate: [
      { icon: 'home',     label: 'Minha Candidatura', view: 'candidate_dashboard' },
      { icon: 'file',     label: 'Documentos COF',    view: 'candidate_dashboard' },
      { icon: 'message',  label: 'Chat com Hub',      view: 'candidate_dashboard' },
    ],
    hub: [
      { icon: 'home',        label: 'Dashboard',      view: 'hub_dashboard' },
      { icon: 'users',       label: 'Squad & Vendedores', view: 'hub_franchisees' },
      { icon: 'funnel',      label: 'Candidatos',     view: 'hub_candidates' },
      { icon: 'trending_up', label: 'Leads da Rede',  view: 'hub_leads' },
      { icon: 'shield',      label: 'Revisão QA',     view: 'hub_qa', badge: '2' },
      { icon: 'tool',        label: 'Prototipagem',   view: 'hub_proto', badge: '1' },
      { icon: 'book',        label: 'Biblioteca',     view: 'hub_library' },
      { icon: 'ai',          label: 'IA Copiloto',    view: 'hub_ia_quality', badge: '26' },
      { icon: 'dollar',      label: 'Financeiro',     view: 'hub_financial' },
      { icon: 'settings',    label: 'Configurações',  view: 'hub_dashboard' },
    ],
  };

  const user = AXISUS.state.currentUser;
  const universeLabel = { client: 'Portal do Cliente', franchisee: 'Portal do Squad', candidate: 'Candidatura', hub: 'Hub Central' }[universe];

  const items = (menus[universe] || []).map(item => `
    <button class="nav-item ${AXISUS.state.currentView === item.view ? 'active' : ''}"
      onclick="navigate('${item.view}')">
      <span class="icon">${icon(item.icon, 18)}</span>
      ${item.label}
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
    </button>
  `).join('');

  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <h1>AXISUS</h1>
        <span style="color:rgba(0,212,255,0.7);font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;display:block;margin-bottom:2px;">AI-First Studio</span>
        <span>${universeLabel}</span>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-title">Menu</div>
        ${items}
      </div>
      <div class="sidebar-footer">
        <div class="user-card">
          <div class="user-avatar">${user?.avatar || '?'}</div>
          <div class="user-info">
            <div class="user-name">${user?.name || 'Usuário'}</div>
            <div class="user-role">${universeLabel}</div>
          </div>
        </div>
        <button class="nav-item" onclick="doLogout()" style="margin-top:8px">
          <span class="icon">${icon('logout', 18)}</span>
          Sair
        </button>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// Botão de retorno reutilizável para T01–T09
// ─────────────────────────────────────────────────────────────
function renderBackButton(destino = 'franchisee_templates', label = 'Método 5D') {
  return `
    <div style="
      background:#0A192F;
      border-bottom:1px solid rgba(0,212,255,0.15);
      padding:7px 20px;
      display:flex;
      align-items:center;
      gap:10px;
      flex-shrink:0;
    ">
      <button
        onclick="navigate('${destino}')"
        style="
          display:flex;align-items:center;gap:6px;
          background:none;border:none;cursor:pointer;
          color:#00D4FF;font-size:12px;font-weight:600;
          padding:4px 8px;border-radius:6px;
          transition:background 0.15s;
        "
        onmouseover="this.style.background='rgba(0,212,255,0.12)'"
        onmouseout="this.style.background='none'"
      >
        ${icon('arrow_left', 14)} Voltar · ${label}
      </button>
      <span style="font-size:11px;color:rgba(0,212,255,0.35);">|</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.3px;">AXISUS AI-First Studio · Método 5D</span>
    </div>
  `;
}

function renderTopbar(universe) {
  const titles = {
    client:     'Portal do Cliente',
    franchisee: 'Portal do Squad',
    candidate:  'Candidatura AXISUS',
    hub:        'Hub Central AXISUS',
  };

  return `
    <div class="topbar">
      <div class="flex items-center gap-3">
        <div style="font-size:13px;color:var(--text-muted);">
          ${icon('home', 14)} <span style="margin-left:4px">${titles[universe] || 'AXISUS'}</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn btn-ghost btn-icon" title="Notificações" style="position:relative">
          ${icon('bell', 18)}
          <span style="position:absolute;top:6px;right:6px;width:8px;height:8px;background:var(--danger);border-radius:50%;border:2px solid white;"></span>
        </button>
        <button class="btn btn-ghost btn-sm" onclick="navigate('landing')">
          ${icon('home', 14)} Início
        </button>
      </div>
    </div>
  `;
}

function bindTabEvents() {
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs').dataset.group;
      const tabName = btn.dataset.tab;
      document.querySelectorAll(`.tabs[data-group="${tabGroup}"] .tab-btn`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll(`.tab-content[data-group="${tabGroup}"]`).forEach(c => c.classList.add('hidden'));
      const target = document.querySelector(`.tab-content[data-group="${tabGroup}"][data-tab="${tabName}"]`);
      if (target) target.classList.remove('hidden');
    });
  });
}

function doLogout() {
  AXISUS.state.currentUser = null;
  navigate('login');
}

function showModal(html) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = html;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${type === 'success' ? '#065F46' : type === 'error' ? '#991B1B' : '#1E40AF'};
    color: white; padding: 12px 20px; border-radius: 10px;
    font-size: 14px; font-weight: 500; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    animation: fadeIn 0.3s ease; max-width: 360px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
