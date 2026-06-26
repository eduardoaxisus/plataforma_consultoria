// AXISUS - Client Portal Views

function renderClientDashboard() {
  const cs = AXISUS.cases[0];
  const user = AXISUS.state.currentUser;

  const phaseConfig = {
    define:   { label: 'Define',    color: '#6366F1', n: 1 },
    diagnose: { label: 'Diagnose',  color: '#F59E0B', n: 2 },
    design:   { label: 'Design',    color: '#3B82F6', n: 3 },
    decide:   { label: 'Decide',    color: '#8B5CF6', n: 4 },
    deliver:  { label: 'Deliver',   color: '#10B981', n: 5 },
  };

  const phases = Object.entries(phaseConfig);
  const currentN = phaseConfig[cs.fase_atual].n;

  const stepperHtml = `
    <div class="stepper">
      ${phases.map(([key, cfg], i) => {
        const phase = cs.phases[key];
        const isCompleted = cfg.n < currentN;
        const isActive = key === cs.fase_atual;
        return `
          <div class="step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
            ${i < phases.length - 1 ? `<div class="step-line ${isCompleted ? 'completed' : ''}"></div>` : ''}
            <div class="step-circle">${isCompleted ? icon('check', 14) : cfg.n}</div>
            <div class="step-label">${cfg.label}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  return `
    <div style="max-width:900px">
      <div class="mb-6">
        <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;">Olá, ${user.name.split(' ')[0]}!</h1>
        <p class="text-secondary">Acompanhe o andamento do seu diagnóstico AXISUS</p>
      </div>

      <!-- Hero Card do Caso -->
      <div class="card card-lg mb-4" style="border-left:4px solid var(--primary);">
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="text-xs text-muted mb-1">${cs.codigo} · ${cs.produto}</div>
            <div style="font-size:18px;font-weight:700;line-height:1.3;max-width:600px;">${cs.problema_reformulado}</div>
          </div>
          <span class="badge badge-green">Em Andamento</span>
        </div>

        ${stepperHtml}

        <div style="background:var(--surface-2);border-radius:10px;padding:14px;margin-top:4px;" class="flex items-center gap-3">
          ${icon('alert', 18)}
          <div>
            <div style="font-size:13px;font-weight:600;">Próxima ação esperada</div>
            <div class="text-sm text-secondary">Aguardar exportação do histórico de pedidos (GA4 + Shopify) para análise de co-compra — prazo: 12/05/2026</div>
          </div>
        </div>
      </div>

      <!-- 3 cards de status -->
      <div class="grid-3 mb-4">
        <div class="stat-card">
          <div class="stat-label">Progresso Geral</div>
          <div class="stat-value">${cs.progresso}%</div>
          <div class="progress-bar mt-2"><div class="progress-fill" style="width:${cs.progresso}%"></div></div>
          <div class="text-xs text-muted">${cs.dias_decorridos} de ${cs.prazo_dias} dias</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Fase Atual</div>
          <div style="font-size:22px;font-weight:800;color:var(--primary);">${phaseConfig[cs.fase_atual].label}</div>
          <div class="badge badge-yellow">Em andamento</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Franqueado Responsável</div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
            <div class="user-avatar" style="background:var(--primary);color:white;width:40px;height:40px;">AP</div>
            <div>
              <div style="font-size:14px;font-weight:600;">${cs.franchisee}</div>
              <div class="text-xs text-muted">Nível ${cs.franchisee_nivel}</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm mt-3" onclick="navigate('client_chat')">${icon('message',14)} Falar</button>
        </div>
      </div>

      <!-- Casos anteriores -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Todos os Casos</div>
            <div class="card-subtitle">Histórico de diagnósticos AXISUS</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="navigate('client_case')">${icon('eye',14)} Ver Detalhes</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Código</th><th>Problema</th><th>Produto</th><th>Status</th><th>Progresso</th><th>Ação</th>
            </tr></thead>
            <tbody>
              ${AXISUS.cases.map(c => `
                <tr>
                  <td><span class="font-semibold text-sm">${c.codigo}</span></td>
                  <td style="max-width:240px;"><span class="text-sm">${c.problema_inicial}</span></td>
                  <td><span class="badge badge-blue">${c.produto}</span></td>
                  <td><span class="badge ${c.status === 'active' ? 'badge-green' : 'badge-gray'}">${c.status === 'active' ? 'Ativo' : 'Encerrado'}</span></td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <div class="progress-bar" style="width:80px;"><div class="progress-fill" style="width:${c.progresso}%"></div></div>
                      <span class="text-xs">${c.progresso}%</span>
                    </div>
                  </td>
                  <td><button class="btn btn-ghost btn-sm" onclick="navigate('client_case')">${icon('eye',14)} Ver</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function bindClientDashboardEvents() {}

function renderClientCase() {
  const cs = AXISUS.cases[0];
  const activeTab = AXISUS.state.params?.tab || 'andamento';

  return `
    <div style="max-width:960px">
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <button class="btn btn-ghost btn-sm" onclick="navigate('client_dashboard')">${icon('arrow_right',14)}</button>
            <span class="text-muted text-sm">Casos /</span>
            <span class="font-semibold text-sm">${cs.codigo}</span>
          </div>
          <h1 style="font-size:20px;font-weight:800;">${cs.client}</h1>
          <p class="text-secondary text-sm">${cs.produto} · Contrato: R$ ${cs.valor_contrato.toLocaleString('pt-BR')}</p>
        </div>
        <span class="badge badge-green" style="font-size:13px;padding:6px 14px;">Fase: ${cs.fase_atual.charAt(0).toUpperCase() + cs.fase_atual.slice(1)}</span>
      </div>

      <div class="tabs" data-group="case-tabs">
        ${['andamento','docs','requests','meetings','messages','financial'].map(t => {
          const labels = { andamento:'Andamento', docs:'Documentos', requests:'Dados Solicitados', meetings:'Reuniões', messages:'Mensagens', financial:'Financeiro' };
          return `<button class="tab-btn ${t === activeTab ? 'active' : ''}" data-tab="${t}">${labels[t]}</button>`;
        }).join('')}
      </div>

      <!-- ANDAMENTO -->
      <div class="tab-content ${activeTab !== 'andamento' ? 'hidden' : ''}" data-group="case-tabs" data-tab="andamento">
        ${renderCaseTimeline(cs)}
      </div>

      <!-- DOCUMENTOS -->
      <div class="tab-content ${activeTab !== 'docs' ? 'hidden' : ''}" data-group="case-tabs" data-tab="docs">
        ${renderClientDocs(cs)}
      </div>

      <!-- DADOS SOLICITADOS -->
      <div class="tab-content ${activeTab !== 'requests' ? 'hidden' : ''}" data-group="case-tabs" data-tab="requests">
        ${renderDataRequests(cs)}
      </div>

      <!-- REUNIÕES -->
      <div class="tab-content ${activeTab !== 'meetings' ? 'hidden' : ''}" data-group="case-tabs" data-tab="meetings">
        ${renderMeetings(cs)}
      </div>

      <!-- MENSAGENS -->
      <div class="tab-content ${activeTab !== 'messages' ? 'hidden' : ''}" data-group="case-tabs" data-tab="messages">
        ${renderChatBox(cs.messages, 'client')}
      </div>

      <!-- FINANCEIRO -->
      <div class="tab-content ${activeTab !== 'financial' ? 'hidden' : ''}" data-group="case-tabs" data-tab="financial">
        ${renderClientFinancial(cs)}
      </div>
    </div>
  `;
}

function renderCaseTimeline(cs) {
  const phases = [
    { key: 'define',   label: 'Define',   desc: 'Briefing, delimitação do problema e mapa de stakeholders.' },
    { key: 'diagnose', label: 'Diagnose', desc: 'Análise de causa raiz com Ishikawa e validação com dados.' },
    { key: 'design',   label: 'Design',   desc: 'Geração e avaliação de alternativas de solução.' },
    { key: 'decide',   label: 'Decide',   desc: 'Seleção da melhor alternativa e plano de implementação.' },
    { key: 'deliver',  label: 'Deliver',  desc: 'Montagem do A3 Expandido e apresentação executiva.' },
  ];
  const phaseMap = { define:1, diagnose:2, design:3, decide:4, deliver:5 };
  const currentN = phaseMap[cs.fase_atual];

  return `
    <div class="card">
      <div class="card-title mb-4">Linha do Tempo do Caso</div>
      <div class="timeline">
        ${phases.map((p, i) => {
          const ph = cs.phases[p.key];
          const n = i + 1;
          const isCompleted = n < currentN;
          const isActive = n === currentN;
          const statusClass = isCompleted ? 'completed' : isActive ? 'active' : 'pending';

          return `
            <div class="timeline-item">
              ${i < phases.length - 1 ? '<div class="timeline-line"></div>' : ''}
              <div class="timeline-dot ${statusClass}"></div>
              <div class="timeline-content">
                <div class="flex items-center justify-between">
                  <div class="timeline-title">
                    ${icon(isCompleted ? 'check' : isActive ? 'briefcase' : 'calendar', 14)}
                    ${p.label}
                    ${isActive ? '<span class="badge badge-yellow" style="margin-left:8px;">Em andamento</span>' : ''}
                    ${isCompleted ? '<span class="badge badge-green" style="margin-left:8px;">Concluído</span>' : ''}
                  </div>
                  <div class="text-xs text-muted">
                    ${ph.data_inicio ? `Início: ${ph.data_inicio}` : 'Não iniciado'}
                    ${ph.data_fim ? ` · Fim: ${ph.data_fim}` : ''}
                  </div>
                </div>
                <div class="timeline-desc">${p.desc}</div>
                ${ph.prazo ? `<div class="text-xs text-muted mt-1">Prazo: ${ph.prazo} dias · Real: ${ph.real || '—'} dias</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderClientDocs(cs) {
  const docs = [
    { nome: 'Proposta Comercial AXISUS', tipo: 'Proposta', data: '2026-03-28', status: 'signed' },
    { nome: 'Contrato de Prestação de Serviços', tipo: 'Contrato', data: '2026-04-01', status: 'signed' },
    { nome: 'A3 Expandido — Relatório Final', tipo: 'Entregável', data: null, status: 'pending' },
    { nome: 'Apresentação Executiva', tipo: 'Apresentação', data: null, status: 'pending' },
  ];

  return `
    <div class="card">
      <div class="card-title mb-4">Documentos do Caso</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${docs.map(d => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;border:1px solid var(--border);border-radius:10px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:10px;background:var(--surface-3);display:flex;align-items:center;justify-content:center;">${icon('file',20)}</div>
              <div>
                <div class="font-semibold text-sm">${d.nome}</div>
                <div class="text-xs text-muted">${d.tipo} ${d.data ? `· ${d.data}` : '· Ainda não disponível'}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              ${d.status === 'signed' ? '<span class="badge badge-green">Assinado</span>' : '<span class="badge badge-gray">Pendente</span>'}
              ${d.status === 'signed' ? `<button class="btn btn-secondary btn-sm">${icon('download',14)} Baixar</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderDataRequests(cs) {
  const statusMap = {
    pending:  { label: 'Pendente',   cls: 'badge-red'    },
    sent:     { label: 'Enviado',    cls: 'badge-yellow' },
    received: { label: 'Confirmado', cls: 'badge-green'  },
  };

  return `
    <div class="card">
      <div class="card-title mb-4">Dados Solicitados pelo Especialista</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${cs.data_requests.map(r => {
          const st = statusMap[r.status];
          return `
            <div style="border:1px solid var(--border);border-radius:10px;padding:16px;">
              <div class="flex items-start justify-between mb-2">
                <div class="font-semibold text-sm">${r.desc}</div>
                <span class="badge ${st.cls}">${st.label}</span>
              </div>
              <div class="text-xs text-muted mb-3">Formato esperado: ${r.formato} · Prazo: ${r.prazo}</div>
              ${r.status === 'pending' ? `
                <div class="upload-zone" onclick="showToast('Selecione os arquivos para envio','info')">
                  <div style="margin-bottom:8px">${icon('upload', 24)}</div>
                  <div class="font-semibold text-sm">Clique ou arraste os arquivos aqui</div>
                  <div class="text-xs text-muted">Excel, CSV, PDF, Imagens, ZIP · máx 50MB</div>
                </div>
              ` : `
                <div class="alert alert-success">
                  ${icon('check',16)} Arquivo recebido e confirmado pelo especialista
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderMeetings(cs) {
  const typeLabel = {
    briefing_inicial:    'Briefing Inicial',
    workshop_ishikawa:   'Workshop Ishikawa',
    apresentacao_a3:     'Apresentação do A3',
    checkin_30:          'Check-in 30 dias',
    checkin_60:          'Check-in 60 dias',
    checkin_90:          'Check-in 90 dias',
  };

  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Reuniões</div>
        <button class="btn btn-primary btn-sm">${icon('plus',14)} Agendar Reunião</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${cs.meetings.map(m => `
          <div style="display:flex;align-items:center;gap:16px;padding:14px;border:1px solid var(--border);border-radius:10px;">
            <div style="width:48px;text-align:center;flex-shrink:0;">
              <div style="font-size:20px;font-weight:800;color:var(--primary);line-height:1;">${m.data.split('-')[2]}</div>
              <div class="text-xs text-muted">${['','jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][parseInt(m.data.split('-')[1])]}</div>
            </div>
            <div style="flex:1;">
              <div class="font-semibold text-sm">${typeLabel[m.tipo] || m.tipo}</div>
              <div class="text-xs text-muted">${m.hora} · ${m.status === 'completed' ? 'Realizada' : 'Agendada'}</div>
              ${m.notas ? `<div class="text-sm" style="color:var(--text-secondary);margin-top:4px;">${m.notas}</div>` : ''}
            </div>
            <div class="flex items-center gap-2">
              <span class="badge ${m.status === 'completed' ? 'badge-green' : 'badge-blue'}">${m.status === 'completed' ? 'Realizada' : 'Agendada'}</span>
              ${m.link ? `<a href="${m.link}" class="btn btn-secondary btn-sm" target="_blank">${icon('arrow_right',14)} Entrar</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderChatBox(messages, userRole) {
  return `
    <div class="card" style="padding:0;">
      <div class="card-header" style="padding:16px 20px;border-bottom:1px solid var(--border);">
        <div>
          <div class="card-title">Chat com o Especialista</div>
          <div class="card-subtitle">Ana Paula Rodrigues · Online</div>
        </div>
        <div style="width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>
      </div>
      <div class="chat-container" style="border:none;border-radius:0;">
        <div class="chat-messages" id="chat-messages">
          ${messages.map(m => `
            <div class="chat-msg ${m.own ? 'own' : ''}">
              <div class="chat-avatar">${m.avatar}</div>
              <div>
                <div class="chat-bubble">${m.content}</div>
                <div class="chat-time">${m.sender} · ${m.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input-area">
          <button class="btn btn-ghost btn-icon">${icon('paperclip',18)}</button>
          <input class="chat-input" id="chat-input" type="text" placeholder="Digite uma mensagem..." />
          <button class="btn btn-primary btn-icon" onclick="sendChatMessage()">${icon('send',18)}</button>
        </div>
      </div>
    </div>
  `;
}

function renderClientFinancial(cs) {
  const statusMap = { paid: { label: 'Pago', cls: 'badge-green' }, pending: { label: 'Pendente', cls: 'badge-yellow' }, overdue: { label: 'Vencido', cls: 'badge-red' } };
  return `
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div class="grid-2">
        <div class="stat-card">
          <div class="stat-label">Valor do Contrato</div>
          <div class="stat-value">R$ ${cs.valor_contrato.toLocaleString('pt-BR')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Situação</div>
          <div style="font-size:20px;font-weight:800;color:var(--accent);">Regular</div>
          <div class="text-xs text-muted">Pagamentos em dia</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title mb-4">Faturas</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Descrição</th><th>Valor</th><th>Vencimento</th><th>Status</th><th>Ação</th></tr></thead>
            <tbody>
              ${cs.invoices.map(inv => {
                const st = statusMap[inv.status];
                return `<tr>
                  <td class="text-sm">${inv.desc}</td>
                  <td class="font-semibold">R$ ${inv.valor.toLocaleString('pt-BR')}</td>
                  <td class="text-sm">${inv.venc}</td>
                  <td><span class="badge ${st.cls}">${st.label}</span></td>
                  <td>
                    ${inv.status === 'pending' ? `
                      <button class="btn btn-primary btn-sm" onclick="showToast('Gerando boleto/Pix via Asaas...','info')">${icon('dollar',14)} Pagar</button>
                    ` : `
                      <button class="btn btn-ghost btn-sm" onclick="showToast('Baixando NF...')">NF ${icon('download',14)}</button>
                    `}
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderClientChat() {
  return `
    <div style="max-width:700px">
      <h1 class="text-xl font-bold mb-6">Mensagens</h1>
      ${renderChatBox(AXISUS.cases[0].messages, 'client')}
    </div>
  `;
}

function renderClientNPS() {
  return `
    <div style="max-width:600px;margin:0 auto;">
      <div class="card card-lg">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:48px;margin-bottom:8px;">🎉</div>
          <h1 style="font-size:24px;font-weight:800;margin-bottom:8px;">Parabéns pela conclusão!</h1>
          <p class="text-secondary">Seu diagnóstico AXISUS foi entregue. Gostaríamos de saber sua opinião.</p>
        </div>

        <div class="form-group mb-6">
          <label class="form-label" style="text-align:center;display:block;margin-bottom:16px;">
            De 0 a 10, quanto você recomendaria a AXISUS a um colega ou parceiro?
          </label>
          <div class="nps-grid" id="nps-grid">
            ${Array.from({length:11}, (_,i) => `
              <button class="nps-btn" onclick="selectNPS(${i})" id="nps-${i}">${i}</button>
            `).join('')}
          </div>
          <div class="flex justify-between mt-2">
            <span class="text-xs text-muted">Muito improvável</span>
            <span class="text-xs text-muted">Muito provável</span>
          </div>
        </div>

        <div class="form-group mb-4">
          <label class="form-label">Principais pontos fortes da AXISUS</label>
          <textarea class="form-textarea" placeholder="O que mais te impressionou no processo?"></textarea>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">O que podemos melhorar?</label>
          <textarea class="form-textarea" placeholder="Sua opinião nos ajuda a evoluir"></textarea>
        </div>
        <div class="form-group mb-6">
          <label class="form-label">Comentário aberto</label>
          <textarea class="form-textarea" placeholder="Qualquer outro feedback é bem-vindo"></textarea>
        </div>

        <button class="btn btn-primary w-full btn-lg" onclick="submitNPS()">Enviar Avaliação e Agendar Check-ins</button>
      </div>
    </div>
  `;
}

function bindClientCaseEvents() {}
function bindClientDashboardEvents() {}
function bindChatEvents() {}
function bindNPSEvents() {}

function selectNPS(n) {
  document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById(`nps-${n}`)?.classList.add('selected');
}

function submitNPS() {
  showToast('Avaliação enviada! Obrigado pelo feedback.');
  setTimeout(() => navigate('client_dashboard'), 1500);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input?.value.trim()) return;
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg own';
  div.innerHTML = `
    <div class="chat-avatar">CM</div>
    <div>
      <div class="chat-bubble">${input.value}</div>
      <div class="chat-time">Você · agora</div>
    </div>
  `;
  msgs?.appendChild(div);
  msgs?.scrollTo(0, msgs.scrollHeight);
  input.value = '';
}
