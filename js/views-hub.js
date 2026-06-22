// AXISUS - Hub Central Views

function renderHubDashboard() {
  const m = AXISUS.hubMetrics;

  const alerts = [
    { type: 'warning', msg: 'Gate Deliver pendente de revisão — CASE-2026-0042 (Petshop Beta)' },
    { type: 'info',    msg: '2 casos com sprint ativo aguardando check-in do squad' },
    { type: 'info',    msg: '3 leads qualificados sem squad atribuído — aguardam >12h' },
    { type: 'success', msg: 'MRR SaaS atingiu R$ 18.4k — crescimento de 14% MoM' },
  ];

  const recentActivity = [
    { icon: 'check',  color: 'var(--accent)',   text: 'A3 Petshop Beta enviado ao cliente — Eduardo Ricatto (Squad Líder)', time: '18 min atrás' },
    { icon: 'star',   color: '#F59E0B',          text: 'Caso Construtora Atlântica aprovado no Gate Diagnose — Ana Paula', time: '1h atrás' },
    { icon: 'users',  color: 'var(--info)',       text: 'Novo candidato: Eduardo Moraes — IA / Dados / MBB', time: '2h atrás' },
    { icon: 'dollar', color: '#6366F1',           text: 'Pagamento SaaS recebido — Fintech Crédito Ágil · R$ 2.400/mês', time: '3h atrás' },
    { icon: 'shield', color: 'var(--primary)',    text: 'A3 aprovado no QA — CASE-2026-0041 (FitLife)', time: '5h atrás' },
  ];

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 style="font-size:24px;font-weight:800;">Dashboard Executivo</h1>
          <p class="text-secondary">Hub Central AXISUS · Quarta, 03 Jun 2026</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm">${icon('download',14)} Relatório</button>
          <button class="btn btn-primary btn-sm" onclick="navigate('hub_franchisees')">${icon('plus',14)} Novo Sprint</button>
        </div>
      </div>

      <!-- KPIs Principais -->
      <div class="grid-4 mb-6">
        <div class="stat-card" style="border-top:3px solid var(--primary);">
          <div style="width:40px;height:40px;border-radius:10px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('users',20)}</div>
          <div class="stat-label">Membros do Squad</div>
          <div class="stat-value">${m.squad_membros || m.franqueados_ativos}</div>
          <div class="stat-change up">${icon('arrow_up',12)} 4 ativos · 1 onboarding</div>
        </div>
        <div class="stat-card" style="border-top:3px solid #3B82F6;">
          <div style="width:40px;height:40px;border-radius:10px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('layers',20)}</div>
          <div class="stat-label">Casos em Andamento</div>
          <div class="stat-value">${m.casos_em_andamento}</div>
          <div class="stat-change up">${icon('arrow_up',12)} +8 este mês</div>
        </div>
        <div class="stat-card" style="border-top:3px solid #10B981;">
          <div style="width:40px;height:40px;border-radius:10px;background:#F0FDF4;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('dollar',20)}</div>
          <div class="stat-label">MRR (SaaS)</div>
          <div class="stat-value">R$ ${((m.mrr_saas||m.mrr_licencas)/1000).toFixed(1)}k</div>
          <div class="stat-change up">${icon('arrow_up',12)} +12% MoM</div>
        </div>
        <div class="stat-card" style="border-top:3px solid #F59E0B;">
          <div style="width:40px;height:40px;border-radius:10px;background:#FFFBEB;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('chart',20)}</div>
          <div class="stat-label">Fat. AI Sprint (Mês)</div>
          <div class="stat-value">R$ ${((m.faturamento_sprints_mes||m.faturamento_rede_mes)/1000).toFixed(0)}k</div>
          <div class="stat-change up">${icon('arrow_up',12)} +19% MoM</div>
        </div>
      </div>

      <!-- Segunda linha KPIs -->
      <div class="grid-3 mb-6">
        <div class="stat-card">
          <div class="stat-label">NPS Médio da Rede</div>
          <div class="stat-value">${m.nps_medio_rede}</div>
          <div class="text-xs text-muted">Zona de Excelência (9–10)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Candidatos no Funil</div>
          <div class="stat-value">${m.candidatos_funil}</div>
          <div class="stat-change up">${icon('arrow_up',12)} 6 novos este mês</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Taxa Conversão Leads</div>
          <div class="stat-value">${m.taxa_conversao_leads}%</div>
          <div class="text-xs text-muted">Ticket Médio: R$ ${(m.ticket_medio/1000).toFixed(1)}k</div>
        </div>
      </div>

      <div class="grid-2">
        <!-- Alertas -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Alertas e Atenção</div>
            <span class="badge badge-red">${alerts.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${alerts.map(a => `
              <div class="alert alert-${a.type}">
                ${icon(a.type === 'danger' ? 'alert' : a.type === 'warning' ? 'alert' : 'bell', 14)}
                <div style="font-size:13px;">${a.msg}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Atividade recente -->
        <div class="card">
          <div class="card-title mb-4">Atividade Recente</div>
          <div class="timeline">
            ${recentActivity.map((a, i) => `
              <div class="timeline-item">
                ${i < recentActivity.length - 1 ? '<div class="timeline-line"></div>' : ''}
                <div class="timeline-dot" style="background:${a.color};width:10px;height:10px;margin-top:5px;"></div>
                <div class="timeline-content">
                  <div class="text-sm">${a.text}</div>
                  <div class="text-xs text-muted mt-1">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindHubDashboardEvents() {}

function renderHubFranchisees() {
  const nivelBadge = { junior:'badge-blue', pleno:'badge-purple', senior:'badge-yellow', master:'badge-red' };
  const statusBadge = { active:'badge-green', onboarding:'badge-blue', on_probation:'badge-yellow', suspended:'badge-red' };
  const statusLabel = { active:'Ativo', onboarding:'Certificação', on_probation:'Probatório', suspended:'Suspenso' };

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Squad & Vendedores Regionais</h1>
          <p class="text-secondary text-sm">${AXISUS.franchisees.length} franqueados cadastrados</p>
        </div>
        <div class="flex gap-2">
          <div style="display:flex;align-items:center;gap:8px;background:white;border:1px solid var(--border);border-radius:8px;padding:8px 12px;">
            ${icon('search',16)} <input type="text" placeholder="Buscar franqueado..." style="border:none;outline:none;font-size:13px;width:180px;">
          </div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Abrindo cadastro manual de franqueado...')">${icon('plus',14)} Adicionar</button>
        </div>
      </div>

      <!-- Métricas quick -->
      <div class="grid-4 mb-6">
        <div class="stat-card"><div class="stat-label">Ativos</div><div class="stat-value">14</div></div>
        <div class="stat-card"><div class="stat-label">Em Certificação</div><div class="stat-value">2</div></div>
        <div class="stat-card"><div class="stat-label">MRR Total</div><div class="stat-value">R$ 68,4k</div></div>
        <div class="stat-card"><div class="stat-label">NPS Médio</div><div class="stat-value">9.1</div></div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Membro / Squad</th><th>Nível</th><th>Especialidade</th><th>Casos Ativos</th><th>NPS</th><th>Status</th><th>MRR</th><th>Ações</th>
          </tr></thead>
          <tbody>
            ${AXISUS.franchisees.map(f => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div class="user-avatar" style="background:var(--primary);color:white;width:32px;height:32px;font-size:12px;">${f.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                    <div>
                      <div class="font-semibold text-sm">${f.nome}</div>
                      <div class="text-xs text-muted">${f.regiao}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge ${nivelBadge[f.nivel.toLowerCase()]}">${f.nivel}</span></td>
                <td class="text-sm">${f.regiao}</td>
                <td><span class="font-bold">${f.casos_ativos}</span></td>
                <td>
                  <span class="font-bold ${f.nps >= 9 ? 'text-accent' : f.nps >= 7 ? 'text-warning' : 'text-danger'}">${f.nps}</span>
                </td>
                <td><span class="badge ${statusBadge[f.status]}">${statusLabel[f.status]}</span></td>
                <td class="font-semibold text-sm">R$ ${f.mrr.toLocaleString('pt-BR')}</td>
                <td>
                  <div class="flex gap-1">
                    <button class="btn btn-ghost btn-icon btn-sm" title="Ver perfil" onclick="showFranchiseeModal('${f.nome}')">${icon('eye',14)}</button>
                    <button class="btn btn-ghost btn-icon btn-sm" title="Mensagem">${icon('message',14)}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function showFranchiseeModal(nome) {
  showModal(`
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div class="modal-title">${nome}</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="tabs" data-group="fr-modal-tabs">
          <button class="tab-btn active" data-tab="perfil">Perfil</button>
          <button class="tab-btn" data-tab="casos">Casos</button>
          <button class="tab-btn" data-tab="financeiro">Financeiro</button>
          <button class="tab-btn" data-tab="comunicacao">Comunicação</button>
        </div>
        <div class="tab-content" data-group="fr-modal-tabs" data-tab="perfil">
          <div class="grid-2 mb-4">
            <div class="form-group"><label class="form-label">Nível</label><input class="form-input" value="Pleno" readonly></div>
            <div class="form-group"><label class="form-label">Região</label><input class="form-input" value="Grande SP - Zona Sul" readonly></div>
            <div class="form-group"><label class="form-label">Data Contrato</label><input class="form-input" value="01/04/2025" readonly></div>
            <div class="form-group"><label class="form-label">Status</label><input class="form-input" value="Ativo" readonly></div>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" onclick="showToast('Alterando nível...')">Alterar Nível</button>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Abrindo agendamento 1:1...')">Agendar 1:1</button>
            <button class="btn btn-danger btn-sm" onclick="closeModal();showToast('Membro suspenso.','error')">Suspender</button>
          </div>
        </div>
        <div class="tab-content hidden" data-group="fr-modal-tabs" data-tab="casos">
          <div class="text-secondary text-sm">3 casos ativos · NPS médio 9.2</div>
        </div>
        <div class="tab-content hidden" data-group="fr-modal-tabs" data-tab="financeiro">
          <div class="text-secondary text-sm">MRR: R$ 3.800 · Status: regular</div>
        </div>
        <div class="tab-content hidden" data-group="fr-modal-tabs" data-tab="comunicacao">
          ${renderChatBox([], 'hub')}
        </div>
      </div>
    </div>
  `);
}

function bindHubFranchiseesEvents() {}

function renderHubCandidates() {
  const cols = [
    { key: 'received',           label: 'Recebidos'       },
    { key: 'in_analysis',        label: 'Em Análise'      },
    { key: 'approved_interview', label: 'Entrevista'       },
    { key: 'technical_test',     label: 'Teste Técnico'   },
    { key: 'cof_sent',           label: 'COF (10 dias)'   },
    { key: 'ready_contract',     label: 'Pronto Contrato' },
    { key: 'converted',          label: 'Convertido'      },
  ];

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Funil de Candidatos</h1>
          <p class="text-secondary text-sm">${AXISUS.candidates.length} candidatos no funil</p>
        </div>
      </div>

      <div class="kanban-board" style="padding-bottom:16px">
        ${cols.map(col => {
          const cands = AXISUS.candidates.filter(c => c.estagio === col.key);
          return `
            <div class="kanban-col" style="min-width:200px;width:200px;">
              <div class="kanban-col-header">
                <span class="kanban-col-title">${col.label}</span>
                <span class="kanban-col-count">${cands.length}</span>
              </div>
              <div class="kanban-cards">
                ${cands.map(c => `
                  <div class="kanban-card" onclick="showCandidateModal('${c.nome}')">
                    <div class="kanban-card-company">${c.nome}</div>
                    <div class="kanban-card-meta">${c.area}</div>
                    <div style="margin-top:6px;"><span class="badge badge-blue" style="font-size:10px;">${c.cert}</span></div>
                    <div class="kanban-card-days">${c.dias} dias nesta fase</div>
                  </div>
                `).join('')}
                ${cands.length === 0 ? `<div class="text-xs text-muted" style="text-align:center;padding:16px;">—</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function showCandidateModal(nome) {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${nome}</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-4">${icon('eye',16)} Candidato em fase de entrevista.</div>
        <div class="grid-2 mb-4">
          <div><span class="text-muted text-xs">Área</span><div class="font-semibold">Manufatura</div></div>
          <div><span class="text-muted text-xs">Certificação</span><div class="font-semibold">Black Belt</div></div>
          <div><span class="text-muted text-xs">Cidade</span><div class="font-semibold">São Paulo - SP</div></div>
          <div><span class="text-muted text-xs">Experiência</span><div class="font-semibold">12 anos</div></div>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Comentários do avaliador</label>
          <textarea class="form-textarea" placeholder="Adicione observações sobre o candidato..."></textarea>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-accent" onclick="closeModal();showToast('Candidato aprovado para próxima etapa!')">Aprovar</button>
          <button class="btn btn-secondary" onclick="closeModal();showToast('Reprovação registrada.','error')">Reprovar</button>
          <button class="btn btn-secondary" onclick="closeModal();showToast('E-mail enviado ao candidato!')">Enviar E-mail</button>
        </div>
      </div>
    </div>
  `);
}

function renderHubLeads() {
  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Leads da Rede</h1>
          <p class="text-secondary text-sm">Leads gerados pelo Hub que precisam ser atribuídos a franqueados</p>
        </div>
        <button class="btn btn-primary btn-sm">${icon('plus',14)} Novo Lead</button>
      </div>

      <div class="grid-4 mb-6">
        <div class="stat-card"><div class="stat-label">Leads este mês</div><div class="stat-value">47</div></div>
        <div class="stat-card"><div class="stat-label">Não atribuídos</div><div class="stat-value" style="color:var(--danger);">4</div></div>
        <div class="stat-card"><div class="stat-label">Sem resposta +24h</div><div class="stat-value" style="color:var(--gold);">2</div></div>
        <div class="stat-card"><div class="stat-label">Taxa Conversão</div><div class="stat-value">31%</div></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Leads Pendentes de Atribuição</div>
          <span class="badge badge-red">4 aguardando</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Empresa</th><th>Setor</th><th>Valor Est.</th><th>Origem</th><th>Região</th><th>Status</th><th>Ação</th></tr></thead>
            <tbody>
              ${AXISUS.leads.map(l => `
                <tr>
                  <td><span class="font-semibold text-sm">${l.empresa}</span><br><span class="text-xs text-muted">${l.contato}</span></td>
                  <td><span class="badge badge-gray">${l.setor}</span></td>
                  <td class="font-semibold">R$ ${(l.valor/1000).toFixed(0)}k</td>
                  <td class="text-xs">${l.origem === 'hub_inbound' ? '🔵 Hub Inbound' : l.origem === 'hub_marketing' ? '🟣 Marketing' : l.origem === 'vendor' ? '🟠 Vendedor' : '🟢 Indicação'}</td>
                  <td class="text-xs text-muted">SP - Zona Sul</td>
                  <td><span class="badge ${l.estagio === 'won' ? 'badge-green' : l.estagio === 'cold' ? 'badge-gray' : 'badge-blue'}">${l.estagio.replace('_',' ')}</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="showToast('Lead atribuído a Ana Paula Rodrigues!')">Atribuir</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderHubQA() {
  const statusMap = {
    pending:   { label: 'Na Fila',      cls: 'badge-gray'   },
    in_review: { label: 'Em Revisão',  cls: 'badge-yellow' },
    approved:  { label: 'Aprovado',    cls: 'badge-green'  },
    needs_revision: { label: 'Revisar', cls: 'badge-red'   },
  };

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Fila de Revisão QA</h1>
          <p class="text-secondary text-sm">Revisão de qualidade dos A3s antes da entrega ao cliente</p>
        </div>
      </div>

      <div class="grid-3 mb-6">
        <div class="stat-card"><div class="stat-label">Na Fila</div><div class="stat-value">2</div></div>
        <div class="stat-card"><div class="stat-label">Aprovação 1ª instância</div><div class="stat-value">74%</div></div>
        <div class="stat-card"><div class="stat-label">Tempo Médio Revisão</div><div class="stat-value">1.8 dias</div></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        ${AXISUS.qaReviews.map(qa => {
          const st = statusMap[qa.status];
          return `
            <div class="card" style="display:flex;align-items:center;gap:16px;">
              <div style="flex:1;">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold">${qa.caso}</span>
                  <span class="badge ${st.cls}">${st.label}</span>
                  ${qa.nivel === 'Júnior' ? '<span class="badge badge-blue">Revisão Obrigatória (Júnior)</span>' : ''}
                </div>
                <div class="text-sm text-secondary">${qa.franqueado} · Prazo: ${qa.prazo}</div>
                ${qa.score ? `<div class="text-xs text-muted mt-1">Pontuação: ${qa.score}/5</div>` : ''}
              </div>
              <div class="flex gap-2">
                <button class="btn btn-secondary btn-sm" onclick="showQAReviewModal('${qa.caso}')">${icon('eye',14)} Revisar A3</button>
                ${qa.status !== 'approved' ? `
                  <button class="btn btn-accent btn-sm" onclick="showToast('A3 aprovado! Squad notificado.')">Aprovar</button>
                  <button class="btn btn-danger btn-sm" onclick="showToast('Revisão solicitada ao franqueado.')">Requerer Revisão</button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function showQAReviewModal(caso) {
  showModal(`
    <div class="modal" style="max-width:720px;">
      <div class="modal-header">
        <div>
          <div class="text-xs text-muted">Revisão QA</div>
          <div class="modal-title">${caso}</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${['Definição do Problema', 'Análise de Causa Raiz', 'Validação com Dados', 'Canvas de Alternativas', 'A3 Expandido Final'].map((bloco, i) => `
            <div style="border:1px solid var(--border);border-radius:10px;padding:14px;">
              <div class="flex items-center justify-between mb-2">
                <div class="font-semibold text-sm">${bloco}</div>
                <div class="flex gap-1">
                  ${[1,2,3,4,5].map(n => `<button style="width:28px;height:28px;border-radius:6px;border:1.5px solid var(--border);background:white;font-size:12px;font-weight:700;cursor:pointer;" onclick="this.style.background='var(--primary)';this.style.color='white'">${n}</button>`).join('')}
                </div>
              </div>
              <textarea class="form-textarea" style="min-height:60px;" placeholder="Comentários sobre ${bloco.toLowerCase()}..."></textarea>
            </div>
          `).join('')}
          <div class="form-group">
            <label class="form-label">Comentário Geral</label>
            <textarea class="form-textarea" placeholder="Resumo da revisão para o franqueado..."></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-warning btn-sm" onclick="closeModal();showToast('Revisão solicitada com sugestões!')">Aprovar com Sugestões</button>
        <button class="btn btn-danger btn-sm" onclick="closeModal();showToast('Revisão crítica solicitada.')">Requerer Revisão</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('A3 aprovado! Cliente pode receber entregável.')">Aprovar</button>
      </div>
    </div>
  `);
}

function bindHubQAEvents() {}

function renderHubProto() {
  const statusMap = { new:'badge-gray', assigned:'badge-blue', in_progress:'badge-yellow', in_review:'badge-purple', delivered:'badge-green', cancelled:'badge-red' };
  const statusLabel = { new:'Novo', assigned:'Atribuído', in_progress:'Em Produção', in_review:'Em Revisão', delivered:'Entregue', cancelled:'Cancelado' };

  return `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold">Fila de Prototipagem</h1>
          <p class="text-secondary text-sm">Solicitações de protótipo de software dos franqueados</p>
        </div>
      </div>

      <div class="grid-3 mb-6">
        <div class="stat-card"><div class="stat-label">Em Produção</div><div class="stat-value">1</div></div>
        <div class="stat-card"><div class="stat-label">Novos</div><div class="stat-value" style="color:var(--danger);">1</div></div>
        <div class="stat-card"><div class="stat-label">Entregues (mês)</div><div class="stat-value">3</div></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        ${AXISUS.protoRequests.map(pr => `
          <div class="card" style="display:flex;align-items:center;gap:16px;">
            <div style="flex:1;">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold">${pr.caso}</span>
                <span class="badge ${statusMap[pr.status]}">${statusLabel[pr.status]}</span>
              </div>
              <div class="text-sm text-secondary">${pr.franqueado} · Prazo: ${pr.prazo}</div>
              ${pr.designer ? `<div class="text-xs text-muted mt-1">Designer: ${pr.designer}</div>` : '<div class="text-xs text-danger mt-1">Sem designer atribuído</div>'}
            </div>
            <div class="flex gap-2">
              ${pr.status === 'new' ? `<button class="btn btn-primary btn-sm" onclick="showToast('Designer atribuído!')">Atribuir Designer</button>` : ''}
              ${pr.status === 'in_progress' ? `<button class="btn btn-secondary btn-sm" onclick="showToast('Abrindo protótipo no Figma...')">Ver Figma</button>` : ''}
              ${pr.status === 'delivered' ? `<button class="btn btn-ghost btn-sm" onclick="showToast('Link do Figma copiado!')">${icon('download',14)} Figma</button>` : ''}
              <button class="btn btn-ghost btn-sm">${icon('message',14)}</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderHubLibrary() {
  const cases = AXISUS.libraryCases;
  const setores = [...new Set(cases.map(c => c.setor))];
  const totalConsultas = cases.reduce((s, c) => s + c.consultas_ia, 0);

  const setorColors = {
    'Logística':    { color: '#1E40AF', bg: '#EFF6FF' },
    'Manufatura':   { color: '#065F46', bg: '#ECFDF5' },
    'Varejo':       { color: '#B45309', bg: '#FFFBEB' },
    'Saúde':        { color: '#9D174D', bg: '#FDF2F8' },
    'Construção':   { color: '#6B21A8', bg: '#F5F3FF' },
    'Tecnologia':   { color: '#0369A1', bg: '#F0F9FF' },
    'Alimentação':  { color: '#065F46', bg: '#F0FDF4' },
    'RH / Pessoas': { color: '#7C3AED', bg: '#F5F3FF' },
  };

  return `
    <div class="fade-in">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 style="font-size:24px;font-weight:800;">Biblioteca de Casos</h1>
          <p class="text-secondary">Casos anonimizados que alimentam o IA Copiloto via RAG · ${cases.length} casos · ${cases.filter(c=>c.aprovado_rag).length} aprovados para IA</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="showToast('Filtros avançados — em breve')">
            ${icon('settings', 14)} Filtros
          </button>
          <button class="btn btn-primary btn-sm" onclick="showToast('Formulário de novo caso — em breve')">
            ${icon('plus', 14)} Adicionar Caso
          </button>
        </div>
      </div>

      <!-- Stats no topo -->
      <div class="grid-4 mb-6">
        <div class="stat-card">
          <div class="stat-label">Casos na Biblioteca</div>
          <div class="stat-value">${cases.length}</div>
          <div class="badge badge-green mt-1">+3 este mês</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Aprovados para RAG</div>
          <div class="stat-value">${cases.filter(c=>c.aprovado_rag).length}</div>
          <div class="badge badge-green mt-1">${Math.round(cases.filter(c=>c.aprovado_rag).length/cases.length*100)}% aprovação</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Consultas IA este mês</div>
          <div class="stat-value">${totalConsultas}</div>
          <div class="badge badge-yellow mt-1">↑ 18% vs. mês anterior</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Setores Cobertos</div>
          <div class="stat-value">${setores.length}</div>
          <div class="badge badge-gray mt-1">${setores.slice(0,2).join(', ')}...</div>
        </div>
      </div>

      <!-- Busca Semântica -->
      <div class="card mb-4" style="padding:16px 20px;">
        <div class="flex items-center gap-3 mb-3">
          <div style="display:flex;align-items:center;gap:8px;background:var(--surface-2);border:1.5px solid var(--border);border-radius:8px;padding:9px 14px;flex:1;">
            ${icon('search', 16)}
            <input id="lib-search" type="text" placeholder="Buscar por setor, problema, causa raiz, solução..." style="border:none;outline:none;font-size:13px;width:100%;background:transparent;">
          </div>
          <button class="btn btn-accent btn-sm" onclick="runSemanticSearch()">
            ${icon('ai', 14)} Busca Semântica (IA)
          </button>
        </div>
        <!-- Filtros rápidos por setor -->
        <div class="flex gap-2" style="flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm lib-filter active" data-setor="all" onclick="filterLibrary('all')">Todos</button>
          ${setores.map(s => {
            const sc = setorColors[s] || { color: '#374151', bg: '#F9FAFB' };
            return `<button class="btn btn-secondary btn-sm lib-filter" data-setor="${s}" onclick="filterLibrary('${s}')"
              style="border-color:${sc.color}40;" >${s}</button>`;
          }).join('')}
        </div>
      </div>

      <!-- Resultado de busca semântica (oculto por padrão) -->
      <div id="semantic-result" class="card mb-4 hidden" style="border-left:4px solid var(--accent);padding:16px 20px;">
        <div class="flex items-center gap-2 mb-3">
          ${icon('ai', 16)}
          <div style="font-size:13px;font-weight:700;">Resultado da Busca Semântica</div>
          <button class="btn btn-ghost btn-sm" style="margin-left:auto;font-size:11px;" onclick="document.getElementById('semantic-result').classList.add('hidden')">Limpar</button>
        </div>
        <div id="semantic-result-content"></div>
      </div>

      <!-- Grid de casos -->
      <div id="lib-grid" style="display:flex;flex-direction:column;gap:12px;">
        ${cases.map(c => {
          const sc = setorColors[c.setor] || { color: '#374151', bg: '#F9FAFB' };
          const diasFases = Object.values(c.fases).reduce((s, v) => s + v, 0);
          return `
            <div class="lib-case-card" data-setor="${c.setor}"
              style="border:1.5px solid var(--border);border-radius:12px;overflow:hidden;transition:all 0.15s;">
              <!-- Header do card -->
              <div style="display:flex;align-items:center;gap:14px;padding:14px 18px;cursor:pointer;background:white;"
                onclick="toggleLibCase('${c.id}')">
                <!-- Setor badge -->
                <div style="width:44px;height:44px;border-radius:10px;background:${sc.bg};border:1.5px solid ${sc.color}30;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <span style="font-size:10px;font-weight:800;color:${sc.color};text-align:center;line-height:1.2;">${c.setor.substring(0,4)}</span>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:13px;font-weight:700;margin-bottom:2px;">${c.titulo}</div>
                  <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.problema_reformulado}</div>
                </div>
                <div class="flex items-center gap-2" style="flex-shrink:0;">
                  <span style="font-size:10px;padding:3px 8px;border-radius:6px;background:${sc.bg};color:${sc.color};font-weight:700;">${c.setor}</span>
                  ${c.aprovado_rag ? `<span class="badge badge-green" style="font-size:10px;">${icon('ai',10)} RAG</span>` : `<span class="badge badge-gray" style="font-size:10px;">Pendente</span>`}
                  <span style="font-size:10px;color:var(--text-muted);">${c.consultas_ia} consultas</span>
                  <div style="width:16px;height:16px;color:var(--text-muted);" id="chevron-${c.id}">${icon('arrow_right', 14)}</div>
                </div>
              </div>
              <!-- Body expansível -->
              <div id="lib-body-${c.id}" class="hidden" style="border-top:1px solid var(--border);background:var(--surface-2);">
                <div style="padding:16px 18px;">
                  <div class="grid-2" style="gap:16px;margin-bottom:16px;">
                    <!-- Coluna 1: Problema e causa -->
                    <div>
                      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Problema Reformulado</div>
                      <div style="font-size:12px;line-height:1.6;margin-bottom:12px;">${c.problema_reformulado}</div>
                      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Causa Raiz Validada</div>
                      <div style="font-size:12px;line-height:1.6;padding:10px;background:white;border-radius:8px;border-left:3px solid ${sc.color};">
                        <span style="font-size:10px;font-weight:700;color:${sc.color};">[${c.causa_raiz_categoria}]</span> ${c.causa_raiz}
                      </div>
                    </div>
                    <!-- Coluna 2: Solução e resultado -->
                    <div>
                      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Solução Implementada</div>
                      <div style="font-size:12px;line-height:1.6;margin-bottom:12px;">${c.solucao_implementada}</div>
                      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Resultado Quantificado</div>
                      <div style="font-size:12px;line-height:1.6;padding:10px;background:#ECFDF5;border-radius:8px;border-left:3px solid #059669;color:#065F46;font-weight:600;">
                        ${c.resultado}
                      </div>
                    </div>
                  </div>
                  <!-- Timeline de fases -->
                  <div>
                    <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px;">Duração por Fase (dias)</div>
                    <div class="flex gap-1" style="height:28px;">
                      ${Object.entries(c.fases).map(([fase, dias]) => {
                        const pct = Math.round((dias / diasFases) * 100);
                        const faseColor = { define:'#065F46', diagnose:'#1E40AF', design:'#6B21A8', decide:'#B45309', deliver:'#04342C' }[fase] || '#888';
                        return `
                          <div title="${fase.charAt(0).toUpperCase()+fase.slice(1)}: ${dias} dias"
                            style="flex:${pct};background:${faseColor};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:white;font-weight:700;min-width:24px;overflow:hidden;">
                            ${dias}d
                          </div>`;
                      }).join('')}
                    </div>
                    <div class="flex gap-1 mt-1">
                      ${Object.keys(c.fases).map(fase => {
                        const faseColor = { define:'#065F46', diagnose:'#1E40AF', design:'#6B21A8', decide:'#B45309', deliver:'#04342C' }[fase] || '#888';
                        return `<div style="flex:1;font-size:9px;color:${faseColor};text-align:center;">${fase.substring(0,3)}</div>`;
                      }).join('')}
                    </div>
                  </div>
                  <!-- Tags e ações -->
                  <div class="flex items-center justify-between mt-3">
                    <div class="flex gap-1" style="flex-wrap:wrap;">
                      ${c.tags.map(t => `<span style="font-size:10px;padding:2px 7px;border-radius:4px;background:${sc.bg};color:${sc.color};font-weight:600;">#${t}</span>`).join('')}
                    </div>
                    <div class="flex gap-2">
                      <button class="btn btn-ghost btn-sm" style="font-size:11px;" onclick="showToast('Caso ${c.id} copiado como referência para o caso atual')">
                        ${icon('file', 12)} Usar como Referência
                      </button>
                      <button class="btn btn-accent btn-sm" style="font-size:11px;" onclick="showToast('IA buscando padrões similares ao ${c.id}...')">
                        ${icon('ai', 12)} Buscar Similares
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>

      <!-- Distribuição por setor -->
      <div class="card mt-6" style="padding:16px 20px;">
        <div class="card-title mb-3">Distribuição por Setor</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${setores.map(s => {
            const n = cases.filter(c => c.setor === s).length;
            const pct = Math.round((n / cases.length) * 100);
            const sc = setorColors[s] || { color: '#374151', bg: '#F9FAFB' };
            const consultas = cases.filter(c=>c.setor===s).reduce((x,c)=>x+c.consultas_ia,0);
            return `
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:90px;font-size:12px;font-weight:600;color:${sc.color};">${s}</div>
                <div style="flex:1;height:8px;background:var(--surface-3);border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${pct}%;background:${sc.color};border-radius:4px;"></div>
                </div>
                <div style="width:32px;font-size:12px;font-weight:700;text-align:right;">${pct}%</div>
                <div style="width:60px;font-size:11px;color:var(--text-muted);">${consultas} consult.</div>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleLibCase(id) {
  const body = document.getElementById('lib-body-' + id);
  const chevron = document.getElementById('chevron-' + id);
  if (!body) return;
  const isHidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !isHidden);
  if (chevron) chevron.style.transform = isHidden ? 'rotate(90deg)' : '';
}

function filterLibrary(setor) {
  document.querySelectorAll('.lib-filter').forEach(b => {
    b.classList.toggle('active', b.dataset.setor === setor);
  });
  document.querySelectorAll('.lib-case-card').forEach(card => {
    card.style.display = (setor === 'all' || card.dataset.setor === setor) ? '' : 'none';
  });
}

function runSemanticSearch() {
  const query = document.getElementById('lib-search')?.value?.trim();
  if (!query) { showToast('Digite algo para buscar', 'error'); return; }
  showToast('Buscando via embeddings semânticos...');
  const result = document.getElementById('semantic-result');
  const content = document.getElementById('semantic-result-content');
  if (!result || !content) return;
  result.classList.remove('hidden');
  content.innerHTML = `<div style="font-size:12px;color:var(--text-muted);">Calculando similaridade vetorial...</div>`;
  setTimeout(() => {
    const matches = AXISUS.libraryCases.slice(0, 3).map((c, i) => {
      const score = [94, 81, 67][i];
      const sc = { 'Logística': { color: '#1E40AF', bg: '#EFF6FF' }, 'Manufatura': { color: '#065F46', bg: '#ECFDF5' } };
      const col = sc[c.setor] || { color: '#374151', bg: '#F9FAFB' };
      return `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;border:1px solid var(--border);margin-bottom:8px;background:white;">
          <div style="font-size:15px;font-weight:900;color:${score>=80?'#065F46':score>=65?'#B45309':'#6B7280'};width:36px;text-align:center;">${score}%</div>
          <div style="flex:1;">
            <div style="font-size:12px;font-weight:700;">${c.titulo}</div>
            <div style="font-size:11px;color:var(--text-muted);">${c.causa_raiz.substring(0,80)}...</div>
          </div>
          <span style="font-size:10px;padding:3px 8px;border-radius:6px;background:${col.bg};color:${col.color};font-weight:700;">${c.setor}</span>
          <button class="btn btn-accent btn-sm" style="font-size:11px;" onclick="showToast('Caso ${c.id} selecionado como referência RAG')">Usar</button>
        </div>`;
    });
    content.innerHTML = `
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">
        ${icon('ai',13)} Encontrados <strong>3 casos similares</strong> para: "<em>${query}</em>" · Ordenados por score de similaridade vetorial
      </div>
      ${matches.join('')}`;
  }, 1400);
}

function renderHubFinancial() {
  return `
    <div>
      <div class="mb-6">
        <h1 class="text-xl font-bold">Gestão Financeira da Rede</h1>
        <p class="text-secondary text-sm">Visão consolidada de toda a operação financeira AXISUS</p>
      </div>

      <div class="tabs" data-group="hub-fin-tabs">
        <button class="tab-btn active" data-tab="executivo">Visão Executiva</button>
        <button class="tab-btn" data-tab="licencas">Licenças</button>
        <button class="tab-btn" data-tab="clientes">Clientes</button>
        <button class="tab-btn" data-tab="inadimplencia">Inadimplência</button>
      </div>

      <div class="tab-content" data-group="hub-fin-tabs" data-tab="executivo">
        <div class="grid-4 mb-6">
          <div class="stat-card"><div class="stat-label">MRR (Licenças + MKT)</div><div class="stat-value">R$ 68,4k</div><div class="stat-change up">${icon('arrow_up',12)} +12% MoM</div></div>
          <div class="stat-card"><div class="stat-label">Fat. Clientes (mês)</div><div class="stat-value">R$ 487k</div><div class="stat-change up">${icon('arrow_up',12)} +19% MoM</div></div>
          <div class="stat-card"><div class="stat-label">Inadimplência</div><div class="stat-value" style="color:var(--accent);">0%</div><div class="text-xs text-muted">Zero inadimplências</div></div>
          <div class="stat-card"><div class="stat-label">Receita Bruta Total</div><div class="stat-value">R$ 555k</div><div class="text-xs text-muted">Jun/2026</div></div>
        </div>

        <!-- Gráfico simplificado -->
        <div class="card mb-4">
          <div class="card-title mb-4">Faturamento Últimos 6 Meses</div>
          <div class="bar-chart">
            ${[{m:'Jan',v:65},{m:'Fev',v:78},{m:'Mar',v:82},{m:'Abr',v:91},{m:'Mai',v:103},{m:'Jun',v:115}].map(d => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="font-size:10px;color:var(--text-muted);">R$${d.v}k</div>
                <div style="width:100%;height:${d.v}px;background:var(--primary);border-radius:4px 4px 0 0;opacity:0.8;"></div>
                <div style="font-size:10px;color:var(--text-muted);">${d.m}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="tab-content hidden" data-group="hub-fin-tabs" data-tab="licencas">
        <div class="card">
          <div class="card-title mb-4">Cobranças de Licença</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Cliente / Squad</th><th>Tipo</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr></thead>
              <tbody>
                ${AXISUS.franchisees.map(f => `
                  <tr>
                    <td class="font-semibold text-sm">${f.nome}</td>
                    <td><span class="badge badge-blue">Licença Mensal</span></td>
                    <td class="font-semibold">R$ ${f.mrr.toLocaleString('pt-BR')}</td>
                    <td class="text-sm">10/07/2026</td>
                    <td><span class="badge badge-green">Em Dia</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="tab-content hidden" data-group="hub-fin-tabs" data-tab="clientes">
        <div class="alert alert-info">${icon('eye',16)} Faturamento de clientes consolidado de todos os franqueados da rede.</div>
        <div class="card mt-4">
          <div class="card-title mb-2">Top Casos por Valor</div>
          <div class="text-secondary text-sm">Integração com Asaas — dados em tempo real.</div>
        </div>
      </div>

      <div class="tab-content hidden" data-group="hub-fin-tabs" data-tab="inadimplencia">
        <div class="alert alert-success mt-2">${icon('check',16)} Nenhuma inadimplência registrada. Todos os pagamentos estão em dia.</div>
      </div>
    </div>
  `;
}
