// AXISUS - Franchisee Portal Views

function renderFrancheeDashboard() {
  const user = AXISUS.state.currentUser;
  const m = AXISUS.hubMetrics;

  const alerts = [
    { type: 'danger',  msg: 'Caso CASE-2026-0042 está há 3 dias parado no Gate 2', view: 'franchisee_case' },
    { type: 'warning', msg: 'Cliente Distribuidora Sul aguarda resposta há 22h', view: 'franchisee_case' },
    { type: 'info',    msg: 'Lead Construtora Beta atribuído pelo Hub — responder em 2h', view: 'franchisee_pipeline' },
    { type: 'success', msg: 'A3 do Caso CASE-2026-0038 aprovado pelo QA Hub!', view: 'franchisee_case' },
  ];

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 style="font-size:24px;font-weight:800;">Bom dia, Ana Paula!</h1>
          <p class="text-secondary">Nível Pleno · Grande SP - Zona Sul</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm">${icon('calendar',14)} Agendar Reunião</button>
          <button class="btn btn-primary btn-sm" onclick="navigate('franchisee_pipeline')">${icon('plus',14)} Novo Lead</button>
        </div>
      </div>

      <!-- KPIs -->
      <div class="grid-4 mb-6">
        <div class="stat-card">
          <div style="width:40px;height:40px;border-radius:10px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('briefcase',20)}</div>
          <div class="stat-label">Leads Ativos</div>
          <div class="stat-value">5</div>
          <div class="stat-change up">${icon('arrow_up',12)} 2 novos esta semana</div>
        </div>
        <div class="stat-card">
          <div style="width:40px;height:40px;border-radius:10px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('layers',20)}</div>
          <div class="stat-label">Casos em Andamento</div>
          <div class="stat-value">3</div>
          <div class="stat-change up">${icon('arrow_up',12)} 1 novo este mês</div>
        </div>
        <div class="stat-card">
          <div style="width:40px;height:40px;border-radius:10px;background:#FEF3C7;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('dollar',20)}</div>
          <div class="stat-label">Faturamento Mês</div>
          <div class="stat-value">R$ 48,5k</div>
          <div class="stat-change up">${icon('arrow_up',12)} +12% vs. mês ant.</div>
        </div>
        <div class="stat-card">
          <div style="width:40px;height:40px;border-radius:10px;background:#EDE9FE;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('star',20)}</div>
          <div class="stat-label">NPS Médio</div>
          <div class="stat-value">9.2</div>
          <div class="stat-change up">${icon('arrow_up',12)} Últimos 90 dias</div>
        </div>
      </div>

      <!-- Ações requeridas -->
      <div class="card mb-6">
        <div class="card-header">
          <div class="card-title">Ações Requeridas</div>
          <span class="badge badge-red">${alerts.length} pendentes</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${alerts.map((a, i) => `
            <div class="alert alert-${a.type}" style="cursor:pointer;" onclick="navigate('${a.view}')">
              ${icon(a.type === 'danger' ? 'alert' : a.type === 'warning' ? 'alert' : a.type === 'success' ? 'check' : 'bell', 16)}
              <div style="flex:1;">${a.msg}</div>
              ${icon('arrow_right', 14)}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pipeline + Casos side by side -->
      <div class="grid-2">
        <!-- Mini pipeline -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Pipeline Comercial</div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('franchisee_pipeline')">Ver tudo</button>
          </div>
          ${renderMiniKanban()}
        </div>

        <!-- Casos ativos -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Casos Ativos</div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('franchisee_case')">Ver tudo</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${AXISUS.cases.map(c => `
              <div style="border:1px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;" onclick="navigate('franchisee_case')">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-semibold text-sm">${c.client}</span>
                  <span class="badge badge-blue">${c.fase_atual.charAt(0).toUpperCase() + c.fase_atual.slice(1)}</span>
                </div>
                <div class="text-xs text-muted mb-2">${c.codigo} · ${c.produto}</div>
                <div class="progress-bar"><div class="progress-fill" style="width:${c.progresso}%"></div></div>
                <div class="text-xs text-muted mt-1">${c.progresso}% · ${c.dias_decorridos}/${c.prazo_dias} dias</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMiniKanban() {
  const cols = {
    cold:          { label: 'Cold',    color: '#94A3B8' },
    qualified:     { label: 'Qualif.', color: '#60A5FA' },
    initial_meeting:{ label: 'Reunião', color: '#34D399' },
    proposal_sent: { label: 'Proposta', color: '#FBBF24' },
    negotiation:   { label: 'Negoc.',  color: '#F97316' },
    won:           { label: 'Ganho',   color: '#10B981' },
  };

  return `
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;">
      ${Object.entries(cols).map(([key, cfg]) => {
        const count = AXISUS.leads.filter(l => l.estagio === key).length;
        return `
          <div style="min-width:80px;flex-shrink:0;">
            <div style="background:${cfg.color}20;border:1px solid ${cfg.color}40;border-radius:6px 6px 0 0;padding:6px 8px;text-align:center;">
              <div style="font-size:10px;font-weight:700;color:${cfg.color};">${cfg.label}</div>
            </div>
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:0 0 6px 6px;padding:6px;text-align:center;min-height:60px;">
              <div style="font-size:20px;font-weight:800;color:var(--text-primary);">${count}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function bindFranchiseeDashboardEvents() {}

function renderFrancheePipeline() {
  const cols = [
    { key: 'cold',          label: 'Cold',            color: '#94A3B8' },
    { key: 'qualified',     label: 'Qualificado',     color: '#60A5FA' },
    { key: 'initial_meeting',label: 'Reunião Inicial', color: '#34D399' },
    { key: 'proposal_sent', label: 'Proposta Enviada', color: '#FBBF24' },
    { key: 'negotiation',   label: 'Negociação',      color: '#F97316' },
    { key: 'won',           label: 'Ganho',           color: '#10B981' },
  ];

  const leads = AXISUS.leads;

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Pipeline Comercial</h1>
          <p class="text-secondary text-sm">Gestão completa de leads e oportunidades</p>
        </div>
        <div class="flex gap-2">
          <div style="display:flex;align-items:center;gap:8px;background:white;border:1px solid var(--border);border-radius:8px;padding:8px 12px;">
            ${icon('search',16)} <input type="text" placeholder="Buscar empresa..." style="border:none;outline:none;font-size:13px;width:160px;">
          </div>
          <button class="btn btn-primary btn-sm" onclick="showNewLeadModal()">${icon('plus',14)} Novo Lead</button>
        </div>
      </div>

      <!-- Métricas -->
      <div class="grid-4 mb-6">
        <div class="stat-card">
          <div class="stat-label">Total em Pipeline</div>
          <div class="stat-value">R$ 259k</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Taxa de Conversão</div>
          <div class="stat-value">31%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Ticket Médio</div>
          <div class="stat-value">R$ 43k</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tempo Médio</div>
          <div class="stat-value">18 dias</div>
        </div>
      </div>

      <!-- Kanban -->
      <div class="kanban-board">
        ${cols.map(col => {
          const colLeads = leads.filter(l => l.estagio === col.key);
          return `
            <div class="kanban-col">
              <div class="kanban-col-header" style="border-top:3px solid ${col.color};">
                <span class="kanban-col-title">${col.label}</span>
                <span class="kanban-col-count">${colLeads.length}</span>
              </div>
              <div class="kanban-cards">
                ${colLeads.map(lead => `
                  <div class="kanban-card" onclick="navigate('franchisee_pipeline')">
                    <div class="kanban-card-company">${lead.empresa}</div>
                    <div class="kanban-card-meta">${lead.setor} · ${lead.contato}</div>
                    <div class="kanban-card-meta text-xs" style="margin-top:4px;">
                      <span class="badge badge-gray" style="font-size:10px;">${lead.origem === 'hub_inbound' ? 'Hub' : 'Próprio'}</span>
                    </div>
                    <div class="kanban-card-value">R$ ${(lead.valor/1000).toFixed(0)}k</div>
                    <div class="kanban-card-days">${lead.dias} dias nesta fase</div>
                  </div>
                `).join('')}
                <button class="btn btn-ghost btn-sm w-full" style="justify-content:center;border:1px dashed var(--border);" onclick="showNewLeadModal()">
                  ${icon('plus',14)} Adicionar
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function bindPipelineEvents() {}

function showNewLeadModal() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Novo Lead</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Empresa</label>
            <input class="form-input" type="text" placeholder="Razão Social ou Nome Fantasia">
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Setor</label>
              <select class="form-select">
                <option>Indústria</option><option>Logística</option><option>Varejo</option>
                <option>Serviços</option><option>Saúde</option><option>Agro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Valor Estimado</label>
              <input class="form-input" type="text" placeholder="R$ 40.000">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Nome do Contato</label>
            <input class="form-input" type="text" placeholder="Nome do decisor">
          </div>
          <div class="form-group">
            <label class="form-label">Dor / Problema Inicial</label>
            <textarea class="form-textarea" placeholder="Como o cliente descreveu o problema?"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('Lead criado com sucesso!')">Criar Lead</button>
      </div>
    </div>
  `);
}

function renderFrancheeCase() {
  const cs = AXISUS.cases[0];
  const phaseColors = { define:'#6366F1', diagnose:'#F59E0B', design:'#3B82F6', decide:'#8B5CF6', deliver:'#10B981' };
  const phaseN = { define:1, diagnose:2, design:3, decide:4, deliver:5 };
  const currentN = phaseN[cs.fase_atual];

  return `
    <div>
      <!-- Header do caso -->
      <div class="card mb-4" style="border-top:4px solid ${phaseColors[cs.fase_atual]};">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-xs text-muted mb-1">${cs.codigo} · ${cs.produto} · ${cs.valor_contrato.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</div>
            <h1 style="font-size:18px;font-weight:800;margin-bottom:4px;">${cs.client}</h1>
            <p class="text-secondary text-sm">${cs.problema_reformulado}</p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" onclick="showToast('Solicitação de suporte enviada ao Hub!')">Suporte Sênior</button>
            <button class="btn btn-secondary btn-sm" onclick="showProtoModal()">Solicitar Protótipo</button>
            <button class="btn btn-primary btn-sm" onclick="showToast('Solicitação de revisão QA enviada!')">Revisão QA</button>
          </div>
        </div>

        <!-- Stepper das fases -->
        <div class="stepper">
          ${Object.entries(phaseN).map(([key, n]) => {
            const isCompleted = n < currentN;
            const isActive = key === cs.fase_atual;
            return `
              <div class="step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                ${n < 5 ? `<div class="step-line ${isCompleted ? 'completed' : ''}"></div>` : ''}
                <div class="step-circle">${isCompleted ? icon('check',14) : n}</div>
                <div class="step-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 280px;gap:16px;">
        <!-- Painel principal: templates da fase atual -->
        <div>
          <div class="card mb-4">
            <div class="card-header">
              <div>
                <div class="card-title">Templates — Fase ${cs.fase_atual.charAt(0).toUpperCase() + cs.fase_atual.slice(1)}</div>
                <div class="card-subtitle">Preencha todos os templates para avançar de fase</div>
              </div>
              <button class="btn btn-accent btn-sm" onclick="showToast('Solicitando aprovação do Gate...','info')">
                ${icon('check',14)} Solicitar Gate
              </button>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${cs.artifacts.map(a => {
                const phaseN_map = { define:1, diagnose:2, design:3, decide:4, deliver:5 };
                const artPhaseN = phaseN_map[a.fase];
                const isAccessible = artPhaseN <= currentN;
                const stMap = {
                  completed:   { cls: 'badge-green',  label: 'Completo'    },
                  in_progress: { cls: 'badge-yellow', label: 'Em andamento' },
                  pending:     { cls: 'badge-gray',   label: 'Pendente'     },
                };
                const st = stMap[a.status] || stMap.pending;
                return `
                  <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--border);border-radius:10px;
                    ${!isAccessible ? 'opacity:0.4;' : 'cursor:pointer;'}" ${isAccessible ? `onclick="showTemplateModal('${a.id}','${a.nome}')"` : ''}>
                    <div style="width:36px;height:36px;border-radius:8px;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;">${a.id}</div>
                    <div style="flex:1;">
                      <div class="font-semibold text-sm">${a.nome}</div>
                      <div class="text-xs text-muted">Fase: ${a.fase.charAt(0).toUpperCase() + a.fase.slice(1)}</div>
                    </div>
                    <span class="badge ${st.cls}">${st.label}</span>
                    <button class="btn btn-ghost btn-icon" title="Sugestão IA" onclick="event.stopPropagation();showToast('IA gerando sugestão...')">
                      ${icon('ai',16)}
                    </button>
                    ${isAccessible ? icon('arrow_right',16) : icon('eye',16)}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Gate status -->
          <div class="card">
            <div class="card-title mb-3">Gate da Fase Atual</div>
            <div class="alert alert-warning mb-3">
              ${icon('alert',16)} 1 template ainda em andamento. Complete-o para solicitar aprovação do gate.
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;gap:8px;"><span class="badge badge-green">${icon('check',12)}</span> <span class="text-sm">Ishikawa preenchido com mínimo de 5 causas</span></div>
              <div style="display:flex;align-items:center;gap:8px;"><span class="badge badge-yellow">·</span> <span class="text-sm">Validação de causa raiz com evidência quantitativa</span></div>
              <div style="display:flex;align-items:center;gap:8px;"><span class="badge badge-gray">○</span> <span class="text-sm">Aprovação do cliente para avançar</span></div>
            </div>
          </div>
        </div>

        <!-- Painel lateral -->
        <div>
          <!-- Card do cliente -->
          <div class="card mb-3">
            <div class="card-title mb-3">Cliente</div>
            <div class="flex items-center gap-3 mb-3">
              <div class="user-avatar" style="background:var(--primary);color:white;">CM</div>
              <div>
                <div class="font-semibold text-sm">Carlos Mendes</div>
                <div class="text-xs text-muted">Diretor de Operações</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <button class="btn btn-secondary btn-sm w-full" onclick="navigate('franchisee_case')">${icon('message',14)} Mensagem</button>
              <button class="btn btn-secondary btn-sm w-full">${icon('upload',14)} Solicitar Dado</button>
              <button class="btn btn-secondary btn-sm w-full">${icon('calendar',14)} Reunião</button>
            </div>
          </div>

          <!-- Próximas reuniões -->
          <div class="card mb-3">
            <div class="card-title mb-3">Próximas Reuniões</div>
            ${AXISUS.cases[0].meetings.filter(m => m.status === 'scheduled').map(m => `
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px;">
                <div class="font-semibold text-sm">Apresentação do A3</div>
                <div class="text-xs text-muted">10 jun · 09h00</div>
                <a href="${m.link}" class="btn btn-primary btn-sm mt-2 w-full" style="justify-content:center;" target="_blank">Entrar na Reunião</a>
              </div>
            `).join('')}
          </div>

          <!-- Info do caso -->
          <div class="card">
            <div class="card-title mb-3">Informações</div>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">
              <div class="flex justify-between"><span class="text-muted">Início</span><span class="font-semibold">${cs.data_inicio}</span></div>
              <div class="flex justify-between"><span class="text-muted">Prazo</span><span class="font-semibold">${cs.prazo_dias} dias</span></div>
              <div class="flex justify-between"><span class="text-muted">Decorrido</span><span class="font-semibold">${cs.dias_decorridos} dias</span></div>
              <div class="flex justify-between"><span class="text-muted">Valor</span><span class="font-semibold">R$ ${cs.valor_contrato.toLocaleString('pt-BR')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showTemplateModal(id, nome) {
  // T01, T02, T03 têm telas dedicadas com especificação completa
  const dedicatedRoutes = {
    T01: 'template_t01',
    T02: 'template_t02',
    T03: 'template_t03',
    T04: 'template_t04',
    T05: 'template_t05',
    T06: 'template_t06',
  };

  if (dedicatedRoutes[id]) {
    navigate(dedicatedRoutes[id]);
    return;
  }

  // T04–T09: modal genérico (próximas ondas de desenvolvimento)
  const phaseHints = {
    T04: 'Ishikawa (espinha de peixe) + análise dos 5 Porquês para cada causa identificada.',
    T05: 'Validação da causa raiz com evidência quantitativa — dado real do cliente.',
    T06: 'Canvas de Alternativa: uma tela por alternativa de solução candidata.',
    T07: 'Valor × Complexidade + método WSJF para priorização das alternativas.',
    T08: 'Plano de implementação 5W2H + Matriz de Riscos + KPIs de acompanhamento.',
    T09: 'Montagem do A3 Expandido — entregável final da fase Deliver.',
  };

  showModal(`
    <div class="modal" style="max-width:680px;">
      <div class="modal-header">
        <div>
          <div class="text-xs text-muted">${id} · Fase ${id <= 'T03' ? 'Define' : id <= 'T05' ? 'Diagnose' : id === 'T06' ? 'Design' : id <= 'T08' ? 'Decide' : 'Deliver'}</div>
          <div class="modal-title">${nome}</div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-accent btn-sm" onclick="showToast('IA gerando sugestão com base na biblioteca de casos...')">
            ${icon('ai',14)} Sugerir com IA
          </button>
          <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
        </div>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-4">${icon('eye',16)} ${phaseHints[id] || 'Preencha todos os campos conforme a metodologia AXISUS 5D.'}</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Análise Principal</label>
            <textarea class="form-textarea" rows="4" placeholder="Preencha a análise conforme o template ${id}..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Evidências / Dados de Suporte</label>
            <textarea class="form-textarea" placeholder="Cole dados, métricas, análises que suportam esta etapa..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Conclusão / Insight Principal</label>
            <textarea class="form-textarea" placeholder="Principal conclusão desta etapa para a próxima fase..."></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Salvar Rascunho</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('${id} marcado como completo!')">Marcar como Completo</button>
      </div>
    </div>
  `);
}

function showProtoModal() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Solicitar Protótipo de Software</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-4">${icon('eye',16)} O Hub cobrará R$ 2.800 por protótipo entregue. Prazo médio: 5 dias úteis.</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Descrição do Problema</label>
            <textarea class="form-textarea" placeholder="Qual problema o software deve resolver?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Alternativa Recomendada</label>
            <textarea class="form-textarea" placeholder="Qual solução foi selecionada no T07?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Telas-Chave Necessárias</label>
            <textarea class="form-textarea" placeholder="Liste as principais telas/fluxos que precisam ser prototipados"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Prazo Desejado</label>
            <input class="form-input" type="date">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('Solicitação enviada ao time de prototipagem!')">Enviar Solicitação</button>
      </div>
    </div>
  `);
}

function bindFrancheeCaseEvents() {}

function renderFrancheeFinancial() {
  return `
    <div style="max-width:900px">
      <div class="mb-6">
        <h1 class="text-xl font-bold">Financeiro</h1>
        <p class="text-secondary text-sm">Gestão financeira do seu negócio AXISUS</p>
      </div>

      <div class="tabs" data-group="fin-tabs">
        <button class="tab-btn active" data-tab="receitas">Receitas (Clientes)</button>
        <button class="tab-btn" data-tab="despesas">Despesas com Hub</button>
        <button class="tab-btn" data-tab="margem">Margem por Caso</button>
        <button class="tab-btn" data-tab="projecao">Projeção 90 dias</button>
      </div>

      <div class="tab-content" data-group="fin-tabs" data-tab="receitas">
        <div class="grid-3 mb-4">
          <div class="stat-card"><div class="stat-label">Faturamento Mês</div><div class="stat-value">R$ 48,5k</div></div>
          <div class="stat-card"><div class="stat-label">Faturamento Trimestre</div><div class="stat-value">R$ 127k</div></div>
          <div class="stat-card"><div class="stat-label">Faturamento Ano</div><div class="stat-value">R$ 421k</div></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Caso</th><th>Cliente</th><th>Descrição</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td class="text-sm font-semibold">CASE-2026-0042</td>
                <td class="text-sm">Distribuidora Sul</td>
                <td class="text-sm">Parcela 1/2</td>
                <td class="font-semibold">R$ 22.500</td>
                <td class="text-sm">15/04/2026</td>
                <td><span class="badge badge-green">Pago</span></td>
              </tr>
              <tr>
                <td class="text-sm font-semibold">CASE-2026-0042</td>
                <td class="text-sm">Distribuidora Sul</td>
                <td class="text-sm">Parcela 2/2</td>
                <td class="font-semibold">R$ 22.500</td>
                <td class="text-sm">15/06/2026</td>
                <td><span class="badge badge-yellow">Pendente</span></td>
              </tr>
              <tr>
                <td class="text-sm font-semibold">CASE-2026-0038</td>
                <td class="text-sm">Metalúrgica Primus</td>
                <td class="text-sm">Parcela 2/3</td>
                <td class="font-semibold">R$ 24.000</td>
                <td class="text-sm">01/06/2026</td>
                <td><span class="badge badge-green">Pago</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="tab-content hidden" data-group="fin-tabs" data-tab="despesas">
        <div class="grid-2 mb-4">
          <div class="stat-card"><div class="stat-label">Licença Mensal</div><div class="stat-value">R$ 3.800</div><div class="text-xs text-muted">Vence dia 10 · Boleto</div></div>
          <div class="stat-card"><div class="stat-label">Taxa de Marketing</div><div class="stat-value">R$ 950</div><div class="text-xs text-muted">Incluída na licença</div></div>
        </div>
        <div class="card">
          <div class="card-title mb-4">Cobranças do Hub</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Licença</td><td>Licença mensal — Jun/2026</td><td>R$ 3.800</td><td><span class="badge badge-green">Pago</span></td></tr>
                <tr><td>Licença</td><td>Licença mensal — Jul/2026</td><td>R$ 3.800</td><td><span class="badge badge-yellow">Pendente</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="tab-content hidden" data-group="fin-tabs" data-tab="margem">
        <div class="card">
          <div class="card-title mb-4">Margem por Caso</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Caso</th><th>Cliente</th><th>Faturado</th><th>Custos Hub</th><th>Margem</th><th>%</th></tr></thead>
              <tbody>
                <tr>
                  <td class="font-semibold text-sm">CASE-2026-0042</td><td class="text-sm">Distribuidora Sul</td>
                  <td class="font-semibold">R$ 45.000</td><td class="text-sm">R$ 5.700</td>
                  <td class="font-semibold text-accent">R$ 39.300</td><td><span class="badge badge-green">87%</span></td>
                </tr>
                <tr>
                  <td class="font-semibold text-sm">CASE-2026-0038</td><td class="text-sm">Metalúrgica Primus</td>
                  <td class="font-semibold">R$ 72.000</td><td class="text-sm">R$ 8.500</td>
                  <td class="font-semibold text-accent">R$ 63.500</td><td><span class="badge badge-green">88%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="tab-content hidden" data-group="fin-tabs" data-tab="projecao">
        <div class="card">
          <div class="card-title mb-2">Projeção 90 dias</div>
          <div class="card-subtitle mb-4">Com base no pipeline atual e compromissos financeiros</div>
          <div class="grid-3 mb-4">
            <div class="stat-card"><div class="stat-label">Junho (estimado)</div><div class="stat-value">R$ 48k</div><div class="badge badge-green mt-1">Confirmado</div></div>
            <div class="stat-card"><div class="stat-label">Julho (estimado)</div><div class="stat-value">R$ 65k</div><div class="badge badge-yellow mt-1">Pipeline</div></div>
            <div class="stat-card"><div class="stat-label">Agosto (estimado)</div><div class="stat-value">R$ 42k</div><div class="badge badge-gray mt-1">Projetado</div></div>
          </div>
          <div class="alert alert-success">${icon('trending_up',16)} Pipeline atual em negociação pode gerar +R$ 97k nos próximos 3 meses.</div>
        </div>
      </div>
    </div>
  `;
}
