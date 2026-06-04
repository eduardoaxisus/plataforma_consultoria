// AXISUS - Candidate Portal Views

function renderCandidateDashboard() {
  const user = AXISUS.state.currentUser;

  const stages = [
    { key: 'received',           label: 'Candidatura Recebida',      done: true  },
    { key: 'in_analysis',        label: 'Em Análise pelo Hub',        done: true  },
    { key: 'approved_interview', label: 'Aprovado para Entrevista',   done: true  },
    { key: 'interviewed',        label: 'Entrevista Realizada',       done: false, active: true },
    { key: 'technical_test',     label: 'Teste Técnico',              done: false },
    { key: 'cof_sent',           label: 'COF Disponível (10 dias)',   done: false },
    { key: 'ready_contract',     label: 'Pronto para Assinar',        done: false },
    { key: 'converted',          label: 'Franqueado AXISUS',         done: false },
  ];

  const currentStage = stages.find(s => s.active) || stages.find(s => !s.done);

  return `
    <div style="max-width:820px">
      <div class="mb-6">
        <h1 style="font-size:22px;font-weight:800;">Sua Candidatura AXISUS</h1>
        <p class="text-secondary">Olá, Roberto! Acompanhe cada etapa do processo.</p>
      </div>

      <!-- Status atual em destaque -->
      <div class="card card-lg mb-6" style="background:linear-gradient(135deg,var(--primary),#065946);color:white;border:none;">
        <div class="text-xs" style="opacity:0.6;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Status atual</div>
        <div style="font-size:22px;font-weight:800;margin-bottom:8px;">Aprovado para Entrevista!</div>
        <div style="opacity:0.8;font-size:14px;margin-bottom:16px;">Você foi aprovado para a etapa de entrevista com o time AXISUS. Agende sua entrevista abaixo.</div>
        <button class="btn btn-accent" onclick="showToast('Redirecionando para agendamento via Cal.com...','info')" style="background:white;color:var(--primary);">
          ${icon('calendar',16)} Agendar Entrevista
        </button>
      </div>

      <!-- Linha do tempo -->
      <div class="card mb-6">
        <div class="card-title mb-4">Processo Seletivo</div>
        <div class="timeline">
          ${stages.map((s, i) => `
            <div class="timeline-item">
              ${i < stages.length - 1 ? `<div class="timeline-line" style="${s.done ? 'background:var(--accent)' : ''}"></div>` : ''}
              <div class="timeline-dot ${s.done ? 'completed' : s.active ? 'active' : 'pending'}"></div>
              <div class="timeline-content" style="padding-bottom:4px">
                <div class="flex items-center gap-2">
                  <div class="timeline-title" style="${s.active ? 'color:var(--primary)' : ''}">${s.label}</div>
                  ${s.done ? '<span class="badge badge-green">Concluído</span>' : s.active ? '<span class="badge badge-yellow pulse">Atual</span>' : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Cards de ação -->
      <div class="grid-2 mb-6">
        <div class="card">
          <div class="card-title mb-2">Próxima ação</div>
          <div class="text-secondary text-sm mb-4">Agende sua entrevista com o time de seleção da AXISUS. A entrevista dura ~60 minutos e aborda experiência, fit cultural e visão de negócio.</div>
          <button class="btn btn-primary w-full" onclick="showToast('Abrindo calendário de agendamento...')">
            ${icon('calendar',14)} Agendar Entrevista
          </button>
        </div>
        <div class="card">
          <div class="card-title mb-2">Seu perfil</div>
          <div style="display:flex;flex-direction:column;gap:6px;font-size:13px;">
            <div class="flex justify-between"><span class="text-muted">Nome</span><span class="font-semibold">Roberto Silva</span></div>
            <div class="flex justify-between"><span class="text-muted">Área</span><span class="font-semibold">Manufatura</span></div>
            <div class="flex justify-between"><span class="text-muted">Certificação</span><span class="font-semibold">Black Belt</span></div>
            <div class="flex justify-between"><span class="text-muted">Cidade</span><span class="font-semibold">São Paulo - SP</span></div>
            <div class="flex justify-between"><span class="text-muted">Experiência</span><span class="font-semibold">12 anos</span></div>
          </div>
        </div>
      </div>

      <!-- O que esperar -->
      <div class="card">
        <div class="card-title mb-4">O que esperar de cada etapa?</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${[
            { n:'01', t:'Análise do Perfil', d:'Avaliamos formação, experiência e aderência ao perfil AXISUS. Até 5 dias úteis.' },
            { n:'02', t:'Entrevista',        d:'Conversa com o time de seleção. 60 min via Google Meet. Foco em competências e fit.' },
            { n:'03', t:'Teste Técnico',     d:'Caso prático para resolver em 7 dias. Simulação real do Método 5D.' },
            { n:'04', t:'COF + 10 dias',     d:'Lei de Franquias: você recebe a Circular de Oferta de Franquia e tem 10 dias para analisar.' },
            { n:'05', t:'Assinatura',        d:'Contrato assinado digitalmente via ClickSign. Pagamento da taxa inicial via Pix/boleto.' },
            { n:'06', t:'Certificação',      d:'80-120h de treinamento na plataforma + banca de avaliação. Bem-vindo à AXISUS!' },
          ].map(item => `
            <div style="padding:14px;border:1px solid var(--border);border-radius:10px;">
              <div style="font-size:11px;font-weight:800;color:var(--primary);margin-bottom:4px;">ETAPA ${item.n}</div>
              <div class="font-semibold text-sm mb-2">${item.t}</div>
              <div class="text-xs text-secondary">${item.d}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function bindCandidateEvents() {}
