// ============================================================
// AXISUS — Templates Fase Diagnose: T04 (Ishikawa + 5 Porquês) e T05 (Validação)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ============ ESTADO DO ISHIKAWA — caso Petshop Beta (AI Sprint) ============
const T04_STATE = {
  selectedCauseId: null,
  porqueStep: 0,
  porqueAnswers: [],
  porqueActive: false,
  causas: {
    mao_de_obra: [
      { id: 'c1', texto: 'Time de catálogo sobrecarregado (1 pessoa p/ 5.000+ SKUs)', estado: 'candidata', porques: [], notas: '' },
      { id: 'c2', texto: 'Nenhum profissional treinado em taxonomia de produtos para e-commerce', estado: 'causa_raiz', porques: [
        { ordem:1, pergunta:'Por que sem conhecimento de taxonomia?', resposta:'Contratação focou em curadoria de conteúdo, não em estrutura de dados' },
        { ordem:2, pergunta:'Por que foco errado?',                  resposta:'Nunca houve demanda explícita de um sistema de recomendação' },
        { ordem:3, pergunta:'Por que nunca houve?',                  resposta:'Crescimento foi por volume de clientes, não por aumento de ticket — problema sistêmico ignorado' },
      ], notas:'Confirmado com Andrea Santos (Gerente de Catálogo) na entrevista de diagnóstico.' },
    ],
    metodo: [
      { id: 'c3', texto: 'Ausência de modelo de complementaridade no catálogo', estado: 'causa_raiz', porques: [
        { ordem:1, pergunta:'Por que sem modelo de complementaridade?',    resposta:'Catálogo cresceu de forma orgânica sem arquitetura de dados' },
        { ordem:2, pergunta:'Por que crescimento orgânico?',               resposta:'Produtos adicionados por campanha, não por estratégia de cross-sell' },
        { ordem:3, pergunta:'Por que sem estratégia?',                     resposta:'KPI principal era GMV total, não ticket médio — incentivo errado' },
      ], notas:'68% dos 5.000+ SKUs não têm campo "produtos complementares" preenchido.' },
      { id: 'c4', texto: 'Processo de cadastro de produto não exige atributos de cross-sell', estado: 'em_investigacao', porques: [
        { ordem:1, pergunta:'Por que cadastro sem exigência?', resposta:'Formulário de cadastro no Shopify nunca foi atualizado com campos obrigatórios de complementaridade' },
      ], notas:'' },
    ],
    maquina: [
      { id: 'c5', texto: 'Shopify nativo não tem lógica de recomendação por co-compra', estado: 'candidata', porques: [
        { ordem:1, pergunta:'Por que não tem?', resposta:'Shopify básico não inclui. Requer app pago ou desenvolvimento customizado.' },
      ], notas:'Causa real mas secundária — sem catálogo organizado, nenhum sistema resolve.' },
      { id: 'c6', texto: 'Ausência de ferramenta de análise de cesta de compra', estado: 'rejeitada', porques: [
        { ordem:1, pergunta:'Por que relevante?', resposta:'Google Analytics 4 já tem dados de co-compra, mas nunca foram analisados sistematicamente' },
      ], notas:'Rejeitado: dado existe, o problema é falta de análise e ação, não de ferramenta.' },
    ],
    material: [
      { id: 'c7', texto: 'Dados históricos de co-compra disponíveis mas não estruturados', estado: 'candidata', porques: [], notas:'' },
      { id: 'c8', texto: 'Sem dados de browsing (produtos visualizados mas não comprados)', estado: 'candidata', porques: [], notas:'' },
    ],
    medicao: [
      { id: 'c9', texto: 'KPI principal é GMV total, não ticket médio por pedido', estado: 'causa_raiz', porques: [
        { ordem:1, pergunta:'Por que KPI errado?', resposta:'Estratégia comercial histórica foi crescer a base de clientes, não o ticket por cliente' },
        { ordem:2, pergunta:'Por que estratégia de base?', resposta:'Concorrência de preço era mais fácil de medir que cross-sell. Dashboard de vendas nunca incluiu "itens/pedido".' },
      ], notas:'Causa raiz de 2ª ordem — explica por que ninguém priorizou o problema antes.' },
    ],
    meio_ambiente: [
      { id: 'c10', texto: 'Sazonalidade de pets (verão, fim de ano) muda padrão de co-compra', estado: 'candidata', porques: [], notas:'' },
    ],
  }
};

const T04_6M_CONFIG = {
  mao_de_obra: { label: 'Mão de Obra', color: '#6366F1', bg: '#EEF2FF', angle: -30 },
  metodo:      { label: 'Método',      color: '#F59E0B', bg: '#FFFBEB', angle: -10 },
  maquina:     { label: 'Máquina',     color: '#3B82F6', bg: '#EFF6FF', angle:  10 },
  material:    { label: 'Material',    color: '#10B981', bg: '#F0FDF4', angle:  30 },
  medicao:     { label: 'Medição',     color: '#8B5CF6', bg: '#EDE9FE', angle: -50 },
  meio_ambiente:{ label: 'Meio Amb.',  color: '#EF4444', bg: '#FEF2F2', angle:  50 },
};

const T04_ESTADO_MAP = {
  candidata:         { label: 'Candidata',           color: '#9FE1CB', border: '#5DCAA5', text: '#065F46' },
  em_investigacao:   { label: 'Em Investigação',     color: '#5DCAA5', border: '#10B981', text: '#022c22' },
  causa_raiz:        { label: 'Causa Raiz Candidata',color: '#065F46', border: '#022c22', text: 'white'   },
  rejeitada:         { label: 'Rejeitada',           color: '#F1F5F9', border: '#CBD5E1', text: '#94A3B8' },
  sugestao_ia:       { label: 'Sugestão IA',         color: '#FEF9C3', border: '#F59E0B', text: '#92400E' },
};

// ============================================================
// T04 — ISHIKAWA + 5 PORQUÊS
// ============================================================

function renderT04() {
  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      ${renderBackButton()}

      <!-- Barra de ferramentas -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;gap:12px;flex-shrink:0;">
        <div>
          <button class="btn btn-ghost btn-sm" onclick="navigate('template_t03')" title="Voltar para T03">${icon('arrow_left',14)}</button>
        </div>
        <div style="flex:1;">
          <div style="font-size:16px;font-weight:800;">T04 — Ishikawa + 5 Porquês</div>
          <div style="font-size:11px;color:var(--text-muted);">CASE-2026-0042 · Fase Diagnose · Template 1 de 2</div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="showT04AISuggest()">${icon('ai',14)} Sugerir com IA</button>
          <button class="btn btn-secondary btn-sm" onclick="showToast('Exportando PNG do diagrama...')">${icon('download',14)} Exportar</button>
          <button class="btn btn-secondary btn-sm" onclick="resetT04Zoom()" title="Centralizar">${icon('eye',14)} Centralizar</button>
          <span id="t04-save-status" style="font-size:11px;color:var(--text-muted);align-self:center;">${icon('check',12)} Auto-salvo</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="completeT04()">
          ${icon('check',14)} Solicitar Gate Diagnose
        </button>
      </div>

      <!-- Área principal: canvas + painel -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Canvas do Ishikawa -->
        <div id="t04-canvas" style="flex:1;overflow:auto;background:var(--surface-2);padding:20px;position:relative;"
          onclick="handleCanvasClick(event)">
          ${renderIshikawaCanvas()}
        </div>

        <!-- Painel de inspeção lateral -->
        <div id="t04-panel" style="width:360px;flex-shrink:0;border-left:1px solid var(--border);background:white;overflow-y:auto;display:flex;flex-direction:column;">
          ${renderT04Panel(null)}
        </div>
      </div>

      <!-- Legenda inferior -->
      <div style="background:white;border-top:1px solid var(--border);padding:8px 20px;display:flex;gap:16px;flex-shrink:0;align-items:center;">
        <span style="font-size:11px;color:var(--text-muted);font-weight:600;">LEGENDA:</span>
        ${Object.entries(T04_ESTADO_MAP).map(([k,v]) => `
          <div style="display:flex;align-items:center;gap:5px;">
            <div style="width:12px;height:12px;border-radius:3px;background:${v.color};border:1.5px solid ${v.border};"></div>
            <span style="font-size:11px;color:var(--text-secondary);">${v.label}</span>
          </div>
        `).join('')}
        <span style="font-size:11px;color:var(--text-muted);margin-left:auto;">Clique em uma causa para inspecionar · Duplo-clique em ramo para adicionar</span>
      </div>
    </div>
  `;
}

function renderIshikawaCanvas() {
  const W = 900, H = 520;
  const SPINE_Y = H / 2;
  const SPINE_X1 = 60, SPINE_X2 = W - 120;
  const HEAD_X = W - 60, HEAD_Y = SPINE_Y;

  // 6 ramos: 3 acima, 3 abaixo — distribuídos ao longo da espinha
  const branchPositions = {
    mao_de_obra:   { x: SPINE_X1 + 120, above: true  },
    metodo:        { x: SPINE_X1 + 320, above: true  },
    medicao:       { x: SPINE_X1 + 520, above: true  },
    maquina:       { x: SPINE_X1 + 120, above: false },
    material:      { x: SPINE_X1 + 320, above: false },
    meio_ambiente: { x: SPINE_X1 + 520, above: false },
  };

  const BRANCH_LEN = 140;
  const CAUSE_W = 130, CAUSE_H = 36;

  let svgContent = `
    <!-- Espinha central -->
    <line x1="${SPINE_X1}" y1="${SPINE_Y}" x2="${SPINE_X2}" y2="${SPINE_Y}" stroke="#0A192F" stroke-width="3"/>

    <!-- Seta da cabeça -->
    <polygon points="${SPINE_X2},${SPINE_Y} ${SPINE_X2-20},${SPINE_Y-8} ${SPINE_X2-20},${SPINE_Y+8}" fill="#0A192F"/>

    <!-- Problema central (cabeça) -->
    <rect x="${HEAD_X-60}" y="${HEAD_Y-36}" width="120" height="72" rx="8" fill="#0A192F"/>
    <text x="${HEAD_X}" y="${HEAD_Y-16}" fill="#00D4FF" font-size="8" font-weight="700" text-anchor="middle">Cross-sell: 8%</text>
    <text x="${HEAD_X}" y="${HEAD_Y-4}" fill="white" font-size="7" text-anchor="middle">(vs benchmark</text>
    <text x="${HEAD_X}" y="${HEAD_Y+8}" fill="white" font-size="7" text-anchor="middle">32% Petz/Cobasi)</text>
    <text x="${HEAD_X}" y="${HEAD_Y+22}" fill="rgba(255,255,255,0.5)" font-size="6" text-anchor="middle">Ticket: R$ 80 vs R$ 150</text>
    <text x="${HEAD_X}" y="${HEAD_Y+34}" fill="rgba(0,212,255,0.6)" font-size="6" text-anchor="middle">← Problema</text>
  `;

  // Ramos e causas
  Object.entries(branchPositions).forEach(([catKey, pos]) => {
    const cfg = T04_6M_CONFIG[catKey];
    const causas = T04_STATE.causas[catKey] || [];
    const dir = pos.above ? -1 : 1;
    const bEndX = pos.x - (pos.above ? -20 : -20);
    const bEndY = SPINE_Y + dir * BRANCH_LEN;

    // Linha do ramo
    svgContent += `
      <line x1="${pos.x}" y1="${SPINE_Y}" x2="${bEndX}" y2="${bEndY}"
        stroke="${cfg.color}" stroke-width="2.5"/>
      <rect x="${bEndX - 38}" y="${bEndY + (dir > 0 ? 4 : -22)}" width="76" height="18" rx="4" fill="${cfg.color}"/>
      <text x="${bEndX}" y="${bEndY + (dir > 0 ? 17 : -8)}" fill="white" font-size="10" font-weight="700" text-anchor="middle">${cfg.label}</text>
      <!-- Duplo-clique para adicionar -->
      <rect x="${bEndX-38}" y="${bEndY + (dir > 0 ? 4 : -22)}" width="76" height="18" rx="4" fill="transparent" style="cursor:pointer;"
        ondblclick="addCausa('${catKey}')" title="Duplo-clique para adicionar causa"/>
    `;

    // Causas no ramo
    causas.forEach((c, i) => {
      const cX = bEndX - 10 - (i * (CAUSE_W + 8));
      const cY = bEndY + dir * (10 + i * (CAUSE_H + 6));
      const est = T04_ESTADO_MAP[c.estado] || T04_ESTADO_MAP.candidata;
      const isSelected = T04_STATE.selectedCauseId === c.id;
      const hasRaiz = c.estado === 'causa_raiz';

      // Linha da causa para o ramo
      svgContent += `
        <line x1="${bEndX}" y1="${bEndY}" x2="${cX + CAUSE_W/2}" y2="${cY + CAUSE_H/2}"
          stroke="${cfg.color}" stroke-width="1.5" stroke-dasharray="${c.estado === 'rejeitada' ? '4,3' : 'none'}" opacity="0.6"/>
      `;

      // Nó da causa
      const words = c.texto.split(' ');
      const line1 = words.slice(0, 3).join(' ');
      const line2 = words.slice(3, 6).join(' ');
      const line3 = words.slice(6).join(' ');

      svgContent += `
        <g id="cause-node-${c.id}" onclick="selectCausa('${c.id}')" style="cursor:pointer;">
          <rect x="${cX}" y="${cY}" width="${CAUSE_W}" height="${CAUSE_H}"
            rx="6"
            fill="${est.color}"
            stroke="${isSelected ? '#04342C' : est.border}"
            stroke-width="${isSelected ? 3 : 1.5}"
            ${c.estado === 'sugestao_ia' ? 'stroke-dasharray="4,3"' : ''}
          />
          ${hasRaiz ? `<rect x="${cX+CAUSE_W-18}" y="${cY}" width="18" height="18" rx="0 6 0 0" fill="${cfg.color}" opacity="0.4"/>
            <text x="${cX+CAUSE_W-9}" y="${cY+12}" fill="${cfg.color}" font-size="10" font-weight="900" text-anchor="middle">✓</text>` : ''}
          <text x="${cX + CAUSE_W/2}" y="${cY + 13}" fill="${est.text}" font-size="9" font-weight="600" text-anchor="middle">${line1}</text>
          ${line2 ? `<text x="${cX + CAUSE_W/2}" y="${cY + 23}" fill="${est.text}" font-size="9" text-anchor="middle">${line2}</text>` : ''}
          ${line3 ? `<text x="${cX + CAUSE_W/2}" y="${cY + 32}" fill="${est.text}" font-size="8" text-anchor="middle">${line3.substring(0,18)}…</text>` : ''}
          <title>${c.texto} · ${est.label} · Clique para inspecionar</title>
        </g>
      `;
    });
  });

  // Sumário de causas raiz
  const totalCausas = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.length, 0);
  const causasRaiz = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.filter(c => c.estado === 'causa_raiz').length, 0);

  svgContent += `
    <rect x="10" y="10" width="160" height="44" rx="8" fill="rgba(4,52,44,0.06)" stroke="rgba(4,52,44,0.15)" stroke-width="1"/>
    <text x="20" y="28" fill="#04342C" font-size="10" font-weight="700">Total de causas: ${totalCausas}</text>
    <text x="20" y="44" fill="#065F46" font-size="10" font-weight="700">Causas raiz candidatas: ${causasRaiz}</text>
  `;

  return `
    <div style="overflow:auto;">
      <svg id="ishikawa-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
        style="min-width:${W}px;background:white;border-radius:12px;border:1px solid var(--border);">
        ${svgContent}
      </svg>
    </div>
    <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">
      ${Object.entries(T04_6M_CONFIG).map(([k, cfg]) => {
        const count = (T04_STATE.causas[k] || []).length;
        const raiz = (T04_STATE.causas[k] || []).filter(c => c.estado === 'causa_raiz').length;
        return `
          <div style="display:flex;align-items:center;gap:8px;background:${cfg.bg};border:1px solid ${cfg.color}30;border-radius:8px;padding:6px 12px;">
            <div style="width:10px;height:10px;border-radius:2px;background:${cfg.color};"></div>
            <span style="font-size:12px;font-weight:600;color:${cfg.color};">${cfg.label}</span>
            <span style="font-size:11px;color:var(--text-muted);">${count} causa${count !== 1 ? 's' : ''}</span>
            ${raiz > 0 ? `<span class="badge badge-green" style="font-size:10px;">${raiz} raiz</span>` : ''}
            <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:2px 6px;" ondblclick="addCausa('${k}')" onclick="addCausa('${k}')">+</button>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderT04Panel(causeId) {
  if (!causeId) {
    // Estado: nenhum nó selecionado
    const totalCausas = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.length, 0);
    const causasRaiz = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.filter(c => c.estado === 'causa_raiz').length, 0);
    const rejeitadas = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.filter(c => c.estado === 'rejeitada').length, 0);
    const emInv = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.filter(c => c.estado === 'em_investigacao').length, 0);

    const catCounts = Object.entries(T04_STATE.causas).map(([k, arr]) => ({
      label: T04_6M_CONFIG[k]?.label, count: arr.length, color: T04_6M_CONFIG[k]?.color
    })).sort((a, b) => b.count - a.count);

    const isEmpty = Object.entries(T04_STATE.causas).filter(([k,arr]) => arr.length === 0);

    return `
      <div style="padding:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px;">Resumo da Análise</div>

        <div class="grid-2" style="gap:8px;margin-bottom:16px;">
          <div style="background:var(--surface-2);border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;">${totalCausas}</div>
            <div style="font-size:11px;color:var(--text-muted);">Causas mapeadas</div>
          </div>
          <div style="background:#F0FDF4;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#065F46;">${causasRaiz}</div>
            <div style="font-size:11px;color:var(--text-muted);">Causas raiz candidatas</div>
          </div>
          <div style="background:#FEF9C3;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#92400E;">${emInv}</div>
            <div style="font-size:11px;color:var(--text-muted);">Em investigação</div>
          </div>
          <div style="background:var(--surface-3);border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:var(--text-muted);">${rejeitadas}</div>
            <div style="font-size:11px;color:var(--text-muted);">Rejeitadas</div>
          </div>
        </div>

        <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Distribuição por categoria 6M</div>
        ${catCounts.map(c => `
          <div style="margin-bottom:6px;">
            <div class="flex justify-between" style="font-size:11px;margin-bottom:3px;">
              <span style="color:${c.color};font-weight:600;">${c.label}</span>
              <span>${c.count}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${Math.min(100, c.count / totalCausas * 100)}%;background:${c.color};"></div>
            </div>
          </div>
        `).join('')}

        ${isEmpty.length > 0 ? `
          <div class="alert alert-warning mt-3" style="font-size:11px;">
            ${icon('alert',13)}
            <div style="margin-left:8px;">Categorias vazias: <strong>${isEmpty.map(([k]) => T04_6M_CONFIG[k]?.label).join(', ')}</strong>. Verifique se foram consideradas.</div>
          </div>
        ` : ''}

        <div style="margin-top:16px;font-size:12px;font-weight:600;margin-bottom:8px;">Atalhos de teclado</div>
        ${[
          ['Clique', 'Selecionar causa'],
          ['Ctrl+I', 'Sugestões da IA'],
          ['Ctrl+S', 'Salvar manualmente'],
          ['Esc',    'Cancelar seleção'],
        ].map(([k, v]) => `
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
            <kbd style="background:var(--surface-3);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:10px;font-family:monospace;">${k}</kbd>
            <span style="font-size:12px;color:var(--text-secondary);">${v}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Estado: causa selecionada
  const cause = getCauseById(causeId);
  if (!cause) return renderT04Panel(null);

  const catKey = getCauseCatKey(causeId);
  const cfg = T04_6M_CONFIG[catKey] || {};
  const est = T04_ESTADO_MAP[cause.estado] || T04_ESTADO_MAP.candidata;

  const isPorqueActive = T04_STATE.porqueActive && T04_STATE.selectedCauseId === causeId;

  return `
    <div style="padding:0;">
      <!-- Header do painel -->
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);background:${cfg.bg || 'var(--surface-2)'};">
        <div class="flex items-center justify-between mb-1">
          <span style="font-size:11px;font-weight:700;color:${cfg.color};">● ${cfg.label}</span>
          <span class="badge" style="background:${est.color};color:${est.text};font-size:10px;">${est.label}</span>
        </div>
        <div style="font-size:14px;font-weight:700;color:var(--text-primary);line-height:1.4;">${cause.texto}</div>
      </div>

      <div style="padding:14px 16px;">
        <!-- Botões de ação principais -->
        ${!isPorqueActive ? `
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
            ${cause.estado !== 'causa_raiz' && cause.estado !== 'rejeitada' ? `
              <button class="btn btn-primary btn-sm" onclick="iniciarPorques('${causeId}')">
                ${icon('search',13)} Iniciar 5 Porquês
              </button>
            ` : ''}
            ${cause.porques.length > 0 && cause.estado !== 'causa_raiz' ? `
              <button class="btn btn-accent btn-sm" onclick="marcarComoRaiz('${causeId}')">
                ${icon('check',13)} Marcar como Causa Raiz Candidata
              </button>
            ` : ''}
            ${cause.estado === 'causa_raiz' ? `
              <button class="btn btn-secondary btn-sm" onclick="navigate('template_t05')">
                ${icon('arrow_right',13)} Enviar para T05 (Validação)
              </button>
            ` : ''}
            ${cause.estado !== 'rejeitada' ? `
              <button class="btn btn-danger btn-sm" onclick="rejeitarCausa('${causeId}')">
                ${icon('x',13)} Rejeitar Causa
              </button>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="reverterRejeicao('${causeId}')">
                Reverter Rejeição
              </button>
            `}
          </div>
        ` : ''}

        <!-- 5 Porquês -->
        ${cause.porques.length > 0 || isPorqueActive ? `
          <div style="margin-bottom:16px;">
            <div style="font-size:12px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
              ${icon('search',14)} Árvore de 5 Porquês
            </div>
            ${cause.porques.map((p, i) => `
              <div style="border-left:3px solid ${cfg.color || '#04342C'};padding:8px 12px;margin-bottom:8px;background:var(--surface-2);border-radius:0 8px 8px 0;">
                <div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:3px;">Porquê ${p.ordem}</div>
                <div style="font-size:12px;color:var(--primary);margin-bottom:3px;">❓ ${p.pergunta}</div>
                <div style="font-size:12px;font-weight:500;">${p.resposta}</div>
              </div>
            `).join('')}

            ${isPorqueActive ? `
              <div style="border:2px solid var(--primary);border-radius:10px;padding:12px;background:rgba(4,52,44,0.03);">
                <div style="font-size:12px;font-weight:700;color:var(--primary);margin-bottom:6px;">
                  ❓ Por quê ${cause.porques.length > 0 ? cause.porques[cause.porques.length-1].resposta : cause.texto}?
                </div>
                <textarea class="form-textarea" id="porque-input" rows="2" style="min-height:60px;font-size:12px;"
                  placeholder="Qual é a causa desta resposta?"></textarea>
                <div class="flex gap-2 mt-2">
                  <button class="btn btn-primary btn-sm" onclick="addPorque('${causeId}')">Aprofundar mais</button>
                  <button class="btn btn-accent btn-sm" onclick="addPorqueEMarcar('${causeId}')">Esta é a raiz</button>
                  <button class="btn btn-ghost btn-sm" onclick="cancelarPorques()">Cancelar</button>
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Notas -->
        <div class="form-group mb-3">
          <label class="form-label" style="font-size:11px;">Notas do Especialista</label>
          <textarea class="form-textarea" rows="2" style="font-size:12px;min-height:60px;"
            placeholder="Observações, fontes, entrevistas...">${cause.notas}</textarea>
        </div>

        <!-- Buscar casos similares -->
        <button class="btn btn-secondary btn-sm w-full" onclick="showCaseSimilarSearch('${cause.texto}')">
          ${icon('book',13)} Buscar casos similares na biblioteca
        </button>
      </div>

      ${cause.estado === 'causa_raiz' ? `
        <div style="margin:0 16px 16px;padding:12px;background:linear-gradient(135deg,#F0FDF4,#ECFDF5);border:1px solid #BBF7D0;border-radius:10px;">
          <div style="font-size:12px;font-weight:700;color:#065F46;margin-bottom:4px;">${icon('check',14)} Causa Raiz Candidata</div>
          <div style="font-size:11px;color:#047857;">Esta causa está pronta para validação empírica no T05.</div>
          <button class="btn btn-accent btn-sm mt-2 w-full" onclick="navigate('template_t05')">
            Ir para T05 — Validação →
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// ============ HELPERS DO T04 ============

function getCauseById(id) {
  for (const arr of Object.values(T04_STATE.causas)) {
    const found = arr.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

function getCauseCatKey(id) {
  for (const [k, arr] of Object.entries(T04_STATE.causas)) {
    if (arr.find(c => c.id === id)) return k;
  }
  return null;
}

function selectCausa(id) {
  T04_STATE.selectedCauseId = id;
  T04_STATE.porqueActive = false;
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
  bindTabEvents();
}

function handleCanvasClick(e) {
  if (e.target === document.getElementById('t04-canvas') || e.target.id === 'ishikawa-svg') {
    T04_STATE.selectedCauseId = null;
    T04_STATE.porqueActive = false;
    const panel = document.getElementById('t04-panel');
    if (panel) panel.innerHTML = renderT04Panel(null);
  }
}

function iniciarPorques(id) {
  T04_STATE.porqueActive = true;
  T04_STATE.selectedCauseId = id;
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
}

function addPorque(id) {
  const input = document.getElementById('porque-input');
  if (!input?.value.trim()) { showToast('Preencha a resposta antes de avançar.', 'error'); return; }
  const cause = getCauseById(id);
  if (!cause) return;
  const ordem = cause.porques.length + 1;
  const pergunta = cause.porques.length === 0
    ? `Por quê ${cause.texto}?`
    : `Por quê ${cause.porques[cause.porques.length - 1].resposta}?`;
  cause.porques.push({ ordem, pergunta, resposta: input.value.trim() });
  cause.estado = 'em_investigacao';
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
}

function addPorqueEMarcar(id) {
  const input = document.getElementById('porque-input');
  if (!input?.value.trim()) { showToast('Preencha a resposta antes de marcar como raiz.', 'error'); return; }
  const cause = getCauseById(id);
  if (!cause) return;
  const ordem = cause.porques.length + 1;
  const pergunta = cause.porques.length === 0 ? `Por quê ${cause.texto}?` : `Por quê ${cause.porques[cause.porques.length - 1].resposta}?`;
  cause.porques.push({ ordem, pergunta, resposta: input.value.trim() });
  marcarComoRaiz(id);
}

function marcarComoRaiz(id) {
  const cause = getCauseById(id);
  if (!cause) return;
  cause.estado = 'causa_raiz';
  T04_STATE.porqueActive = false;
  refreshT04Canvas();
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
  showToast('Causa marcada como raiz candidata. Pronta para validação em T05.');
}

function rejeitarCausa(id) {
  const cause = getCauseById(id);
  if (!cause) return;
  const motivo = prompt('Motivo da rejeição (opcional):') || '';
  cause.estado = 'rejeitada';
  cause.notas = motivo ? `Rejeitada: ${motivo}` : cause.notas;
  T04_STATE.porqueActive = false;
  refreshT04Canvas();
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
  showToast('Causa rejeitada. Histórico preservado.');
}

function reverterRejeicao(id) {
  const cause = getCauseById(id);
  if (!cause) return;
  cause.estado = 'candidata';
  refreshT04Canvas();
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(id);
}

function cancelarPorques() {
  T04_STATE.porqueActive = false;
  const panel = document.getElementById('t04-panel');
  if (panel) panel.innerHTML = renderT04Panel(T04_STATE.selectedCauseId);
}

function addCausa(catKey) {
  const texto = prompt(`Nova causa — categoria ${T04_6M_CONFIG[catKey]?.label}:`);
  if (!texto?.trim()) return;
  const id = 'c_' + Date.now();
  T04_STATE.causas[catKey].push({ id, texto: texto.trim(), estado: 'candidata', porques: [], notas: '' });
  refreshT04Canvas();
  showToast('Causa adicionada.');
}

function refreshT04Canvas() {
  const canvas = document.getElementById('t04-canvas');
  if (canvas) canvas.innerHTML = renderIshikawaCanvas();
  const status = document.getElementById('t04-save-status');
  if (status) status.innerHTML = `${icon('check',12)} Salvo ${new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
}

function resetT04Zoom() {
  const canvas = document.getElementById('t04-canvas');
  if (canvas) canvas.scrollTop = 0;
  showToast('Diagrama centralizado.');
}

function showT04AISuggest() {
  showModal(`
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div>
          <div class="text-xs text-muted">IA Copiloto · T04</div>
          <div class="modal-title">Sugestões de Causas por Categoria 6M</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('eye',14)} Com base em 31 casos da biblioteca AXISUS com problema de cross-sell em e-commerce, as causas mais frequentes são:</div>
        ${[
          { cat:'Mão de Obra', color:'#6366F1', causas:['Time de catálogo sobrecarregado sem estrutura de taxonomia (87% dos casos)','Ausência de profissional treinado em arquitetura de dados de produto (71%)','Responsabilidade de catálogo pulverizada sem ownership claro (58%)'] },
          { cat:'Método',      color:'#F59E0B', causas:['Catálogo cresceu organicamente sem modelo de complementaridade (93%)','Processo de cadastro não exige atributos de cross-sell (79%)','KPI focado em GMV total em vez de ticket médio (64%)'] },
          { cat:'Máquina',     color:'#3B82F6', causas:['Plataforma (Shopify nativo) sem lógica de co-compra embutida (61%)','Ausência de análise sistemática de dados de cesta (48%)'] },
        ].map(g => `
          <div style="margin-bottom:14px;">
            <div style="font-size:12px;font-weight:700;color:${g.color};margin-bottom:6px;">${g.cat}</div>
            ${g.causas.map(c => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border:1px solid var(--border);border-radius:8px;margin-bottom:4px;">
                <span style="font-size:12px;">${c}</span>
                <button class="btn btn-primary btn-sm" style="font-size:10px;flex-shrink:0;" onclick="closeModal();showToast('Causa adicionada ao diagrama!')">+ Adicionar</button>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

function showCaseSimilarSearch(causaTexto) {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Casos Similares na Biblioteca</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('ai',14)} Busca semântica por: "${causaTexto}"</div>
        ${[
          { caso:'CASE-2026-0038', setor:'E-commerce', causa:'Catálogo sem atributos de complementaridade — 71% dos SKUs sem "complementares" preenchidos', resultado:'Taxa de cross-sell 6% → 24% em 90 dias após auditoria de catálogo + RAG sobre histórico de pedidos' },
          { caso:'CASE-2025-0051', setor:'Varejo Digital', causa:'KPI de vendas focado em volume de pedidos, ignorando ticket médio por cliente', resultado:'Ticket médio +R$ 42 em 4 meses após mudança de KPI + widget de cross-sell no checkout' },
        ].map(c => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-blue" style="font-size:10px;">${c.caso}</span>
              <span class="badge badge-gray" style="font-size:10px;">${c.setor}</span>
            </div>
            <div style="font-size:12px;font-weight:600;margin-bottom:4px;">${c.causa}</div>
            <div style="font-size:11px;color:var(--text-secondary);">${c.resultado}</div>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

function completeT04() {
  const causasRaiz = Object.values(T04_STATE.causas).reduce((s, arr) => s + arr.filter(c => c.estado === 'causa_raiz').length, 0);
  if (causasRaiz === 0) {
    showToast('Identifique pelo menos 1 causa raiz candidata antes de solicitar o Gate.', 'error'); return;
  }
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Concluir T04 e Ir para T05</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4">${icon('check',16)} ${causasRaiz} causa${causasRaiz > 1 ? 's' : ''} raiz candidata${causasRaiz > 1 ? 's' : ''} identificada${causasRaiz > 1 ? 's' : ''} e prontas para validação.</div>
        <p class="text-secondary text-sm">O T05 receberá automaticamente as causas raiz candidatas para validação empírica com dados do cliente.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Continuar no T04</button>
        <button class="btn btn-primary" onclick="closeModal();navigate('template_t05');">
          Avançar para T05 — Validação →
        </button>
      </div>
    </div>
  `);
}

function bindT04Events() {
  document.addEventListener('keydown', handleT04Keys, { once: true });
}

function handleT04Keys(e) {
  if (e.ctrlKey && e.key === 'i') { e.preventDefault(); showT04AISuggest(); }
  if (e.key === 'Escape') {
    T04_STATE.selectedCauseId = null;
    T04_STATE.porqueActive = false;
    const panel = document.getElementById('t04-panel');
    if (panel) panel.innerHTML = renderT04Panel(null);
  }
}


// ============================================================
// T05 — VALIDAÇÃO DA CAUSA RAIZ COM DADOS
// ============================================================

// T05 DATA — caso Petshop Beta (AI Sprint adequação v2)
const T05_DATA = {
  causas_raiz: [
    {
      id: 'cr1',
      titulo: 'Catálogo desorganizado — sem atributos de complementaridade',
      categoria: 'Método',
      categoria_color: '#F59E0B',
      status: 'validada',
      hipotese: 'O catálogo da Petshop Beta não tem atributos de complementaridade em 68%+ dos SKUs. Isso impede qualquer sistema (com ou sem IA) de recomendar produtos relacionados de forma relevante, explicando a taxa de cross-sell de apenas 8% vs benchmark de 32%.',
      teste: {
        metrica_principal: '% de SKUs sem campo "produtos complementares" preenchido',
        metrica_complementar: '% de clientes que visualizam ao menos 1 produto complementar por sessão',
        periodo: 'Auditoria em 01/05/2026 · Base GA4 jan-abr/2026',
        granularidade: 'Mensal (GA4) + snapshot pontual (catálogo)',
        benchmark: 62,
        unidade: '%',
        criterio: '% SKUs sem complementar > 60% confirma hipótese',
      },
      coleta: {
        fonte: 'Exportação CSV do catálogo Shopify + Google Analytics 4',
        qualidade: 'completo',
        responsavel: 'Andrea Santos (Gerente de Catálogo)',
        data_coleta: '2026-05-06',
      },
      serie: [
        { periodo:'Jan/26', mtbf:71, ratio_corr:12 },
        { periodo:'Fev/26', mtbf:70, ratio_corr:11 },
        { periodo:'Mar/26', mtbf:69, ratio_corr:11 },
        { periodo:'Abr/26', mtbf:68, ratio_corr:11 },
        { periodo:'Mai/26', mtbf:68, ratio_corr:11 },
      ],
      conclusao: 'Hipótese VALIDADA. Auditoria do catálogo confirma: 68% dos 5.340 SKUs ativos não têm o campo "produtos complementares" preenchido. GA4 confirma: apenas 11% das sessões incluem visualização de produto da categoria "complementar" ao produto principal. Benchmark Petz/Cobasi: 60%+. A causa raiz é estrutural e anterior a qualquer decisão de IA.',
    },
    {
      id: 'cr2',
      titulo: 'KPI principal é GMV total, não ticket médio por pedido',
      categoria: 'Medição',
      categoria_color: '#8B5CF6',
      status: 'validada_parcial',
      hipotese: 'O incentivo organizacional (KPI de GMV) nunca motivou foco em cross-sell, o que explica por que o catálogo ficou desorganizado por anos sem que ninguém priorizasse o problema.',
      teste: { metrica_principal: 'Presença de "itens/pedido" no dashboard principal de vendas', benchmark: 100, unidade: '%', criterio: 'Ausência do KPI no dashboard confirma falta de visibilidade' },
      serie: [],
      conclusao: 'Causa de 2ª ordem validada — explica a persistência do problema. KPI de "itens/pedido" não aparece em nenhum dashboard atual. Requer mudança de incentivo junto com a solução técnica.',
    },
  ],
  selectedId: 'cr1',
};

function renderT05() {
  const selected = T05_DATA.causas_raiz.find(c => c.id === T05_DATA.selectedId) || T05_DATA.causas_raiz[0];

  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      ${renderBackButton()}

      <!-- Barra de ferramentas -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;gap:12px;flex-shrink:0;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t04')" title="Voltar para T04">${icon('arrow_left',14)}</button>
        <div style="flex:1;">
          <div style="font-size:16px;font-weight:800;">T05 — Validação da Causa Raiz com Dados</div>
          <div style="font-size:11px;color:var(--text-muted);">Hipótese sem dado é palpite. Aqui, cada causa raiz candidata é testada contra evidência real.</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="requestGateDiagnose()">
          ${icon('send',14)} Solicitar Gate Diagnose
        </button>
      </div>

      <!-- Área principal: 3 colunas -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Coluna 1: Lista de causas -->
        <div style="width:260px;flex-shrink:0;border-right:1px solid var(--border);background:white;overflow-y:auto;">
          <div style="padding:12px 14px;border-bottom:1px solid var(--border);">
            <div style="font-size:12px;font-weight:700;color:var(--text-secondary);">CAUSAS RAIZ CANDIDATAS</div>
            <div style="font-size:11px;color:var(--text-muted);">${T05_DATA.causas_raiz.length} vindo do T04</div>
          </div>
          ${T05_DATA.causas_raiz.map(c => {
            const stMap = {
              validada:         { label:'Validada',     cls:'badge-green'  },
              validada_parcial: { label:'Parcial',      cls:'badge-yellow' },
              rejeitada:        { label:'Rejeitada',    cls:'badge-red'    },
              em_analise:       { label:'Em Análise',   cls:'badge-blue'   },
              aguardando:       { label:'Aguardando',   cls:'badge-gray'   },
            };
            const st = stMap[c.status] || stMap.aguardando;
            const isSelected = c.id === T05_DATA.selectedId;

            return `
              <div onclick="selectT05Causa('${c.id}')"
                style="padding:12px 14px;border-bottom:1px solid var(--border);cursor:pointer;
                  background:${isSelected ? 'rgba(4,52,44,0.05)' : 'white'};
                  border-left:${isSelected ? '3px solid var(--primary)' : '3px solid transparent'};">
                <div class="flex items-center justify-between mb-1">
                  <span style="font-size:11px;font-weight:700;color:${c.categoria_color};">● ${c.categoria}</span>
                  <span class="badge ${st.cls}" style="font-size:10px;">${st.label}</span>
                </div>
                <div style="font-size:13px;font-weight:600;line-height:1.3;">${c.titulo}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Coluna 2: Painel de validação -->
        <div style="flex:1;overflow-y:auto;padding:20px;background:var(--surface-2);">
          ${renderT05ValidationPanel(selected)}
        </div>

        <!-- Coluna 3: Gráficos e evidências -->
        <div style="width:340px;flex-shrink:0;border-left:1px solid var(--border);background:white;overflow-y:auto;">
          ${renderT05EvidencePanel(selected)}
        </div>
      </div>
    </div>
  `;
}

function renderT05ValidationPanel(c) {
  if (!c) return '<div style="padding:20px;color:var(--text-muted);">Selecione uma causa raiz na lista.</div>';

  const stMap = {
    validada:         { label:'Validada',           color:'var(--accent)',   icon:'check'  },
    validada_parcial: { label:'Validada Parcialmente', color:'var(--gold)', icon:'alert'  },
    rejeitada:        { label:'Rejeitada',           color:'var(--danger)',   icon:'x'      },
    em_analise:       { label:'Em Análise',          color:'var(--info)',     icon:'eye'    },
    aguardando:       { label:'Aguardando dados',    color:'var(--text-muted)', icon:'calendar' },
  };
  const st = stMap[c.status] || stMap.aguardando;

  return `
    <div style="max-width:680px;">
      <!-- Header -->
      <div class="card mb-4" style="border-left:4px solid ${c.categoria_color};">
        <div class="flex items-center justify-between mb-2">
          <span class="badge" style="background:${c.categoria_color}20;color:${c.categoria_color};">${c.categoria}</span>
          <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:${st.color};">
            ${icon(st.icon,16)} ${st.label}
          </div>
        </div>
        <div style="font-size:18px;font-weight:800;margin-bottom:4px;">${c.titulo}</div>
      </div>

      <!-- BLOCO A: Hipótese -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-3">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">A</div>
          <div class="card-title">Formulação da Hipótese</div>
        </div>
        <div class="form-group">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">A hipótese deve ser falsificável: deve ser possível provar que está errada.</div>
          <textarea class="form-textarea" rows="4" style="font-size:13px;min-height:100px;">${c.hipotese}</textarea>
        </div>
      </div>

      <!-- BLOCO B: Definição do Teste -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-3">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">B</div>
          <div>
            <div class="card-title">Definição do Teste</div>
            <div class="card-subtitle">Que dado você vai coletar? Qual critério confirma ou refuta a hipótese?</div>
          </div>
        </div>
        <div class="grid-2" style="gap:12px;">
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Métrica Principal <span style="color:var(--danger)">*</span></label>
            <input class="form-input" value="${c.teste.metrica_principal}" style="font-size:12px;">
            <button class="btn btn-ghost btn-sm mt-1" style="font-size:10px;" onclick="showT05MetricSuggest()">
              ${icon('ai',11)} Sugerir métrica (IA)
            </button>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Métrica Complementar</label>
            <input class="form-input" value="${c.teste.metrica_complementar || ''}" style="font-size:12px;" placeholder="Opcional">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Benchmark de Referência</label>
            <div style="display:flex;gap:6px;align-items:center;">
              <input class="form-input" type="number" value="${c.teste.benchmark}" style="font-size:13px;font-weight:700;">
              <span style="font-size:12px;color:var(--text-muted);">${c.teste.unidade}</span>
              <button class="btn btn-ghost btn-icon btn-sm" onclick="showToast('Buscando benchmark na base AXISUS...')">${icon('ai',13)}</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Período de Análise</label>
            <input class="form-input" value="${c.teste.periodo || ''}" style="font-size:12px;">
          </div>
        </div>
        <div class="form-group mt-2">
          <label class="form-label" style="font-size:11px;">Critério Numérico de Confirmação <span style="color:var(--danger)">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">Quando o dado confirma a hipótese? Seja específico.</div>
          <input class="form-input" value="${c.teste.criterio}" style="font-size:12px;">
        </div>
      </div>

      <!-- BLOCO C: Coleta de Dados -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-3">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">C</div>
          <div>
            <div class="card-title">Coleta de Dados</div>
            <div class="card-subtitle">De onde vieram os dados? Quem forneceu? Qual a qualidade?</div>
          </div>
        </div>
        <div class="grid-2" style="gap:12px;">
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Fonte dos Dados</label>
            <input class="form-input" value="${c.coleta?.fonte || ''}" style="font-size:12px;" placeholder="ERP, planilha, relatório...">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Responsável pela Coleta</label>
            <input class="form-input" value="${c.coleta?.responsavel || ''}" style="font-size:12px;">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Data da Coleta</label>
            <input class="form-input" type="date" value="${c.coleta?.data_coleta || ''}" style="font-size:12px;">
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px;">Qualidade do Dado</label>
            <select class="form-select" style="font-size:12px;">
              ${[['completo','✅ Completo'],['parcial','⚠️ Parcial'],['estimado','🔶 Estimado'],['incompleto','❌ Incompleto']].map(([v,l]) => `
                <option value="${v}" ${v===(c.coleta?.qualidade||'parcial')?'selected':''}>${l}</option>
              `).join('')}
            </select>
          </div>
        </div>
        <div style="margin-top:12px;">
          <div class="upload-zone" style="padding:20px;" onclick="showToast('Selecionando arquivos de evidência...')">
            ${icon('upload',20)}
            <div style="font-size:12px;font-weight:600;margin-top:4px;">Anexar evidência (planilha, relatório, print do ERP)</div>
            <div style="font-size:11px;color:var(--text-muted);">Excel, PDF, CSV, imagens</div>
          </div>
        </div>
        ${!c.coleta?.fonte ? `
          <div class="alert alert-danger mt-2" style="font-size:12px;">
            ${icon('alert',13)} Validação sem dado é opinião. Anexe evidência ou solicite dado ao cliente.
          </div>
        ` : ''}
      </div>

      <!-- BLOCO D: Análise e Conclusão -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-3">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">D</div>
          <div>
            <div class="card-title">Análise e Conclusão</div>
            <div class="card-subtitle">O dado confirma ou refuta a hipótese? Por quê?</div>
          </div>
          <button class="btn btn-accent btn-sm" style="margin-left:auto;" onclick="suggestT05Conclusion('${c.id}')">
            ${icon('ai',13)} Gerar Rascunho
          </button>
        </div>

        <div class="form-group mb-3">
          <label class="form-label" style="font-size:11px;">Status da Validação</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${[
              ['validada',         'Validada',              'btn-accent'    ],
              ['validada_parcial', 'Validada Parcialmente', 'btn-warning'   ],
              ['rejeitada',        'Rejeitada',             'btn-danger'    ],
            ].map(([v,l,cls]) => `
              <button class="btn ${cls} btn-sm ${c.status===v ? '' : 'btn-secondary'}"
                onclick="setT05Status('${c.id}','${v}')"
                style="${c.status===v ? '' : 'filter:grayscale(0.6);opacity:0.7;'}">${l}</button>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="font-size:11px;">Justificativa <span style="color:var(--danger)">*</span> (mínimo 150 caracteres)</label>
          <textarea class="form-textarea" id="t05-conclusao-${c.id}" rows="4"
            oninput="validateT05Conclusion(this)"
            style="font-size:13px;min-height:110px;${c.status==='validada' ? 'border-color:var(--accent)' : ''};"
          >${c.conclusao}</textarea>
          <div id="t05-conclusao-hint-${c.id}" class="form-hint"></div>
        </div>

        ${c.status === 'validada' ? `
          <div class="alert alert-success mt-3" style="font-size:12px;">
            ${icon('check',14)} Causa raiz confirmada empiricamente. Pronta para encaminhar à Fase Design (T06).
          </div>
          <div style="margin-top:10px;padding:12px;background:var(--surface-2);border-radius:10px;">
            <div style="font-size:12px;font-weight:700;margin-bottom:8px;">Próximas Etapas para a Fase Design:</div>
            ${['Auditoria do catálogo: mapear os 5.000+ SKUs e preencher atributos de complementaridade','Definir taxonomia de produtos complementares (mínimo: ração → petiscos, higiene → acessórios)','Processar histórico de pedidos (12 meses) para validar co-compra com dados reais','Avaliar alternativas de solução de IA de recomendação com catálogo organizado como pré-requisito'].map(e => `
              <div style="display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:4px;">
                ${icon('arrow_right',12)} ${e}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderT05EvidencePanel(c) {
  if (!c || !c.serie || c.serie.length === 0) {
    return `
      <div style="padding:16px;">
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:12px;">EVIDÊNCIAS</div>
        <div class="alert alert-warning" style="font-size:12px;">${icon('alert',13)} Nenhum dado de série temporal coletado ainda.</div>
      </div>
    `;
  }

  // Calcular estatísticas
  const vals = c.serie.map(d => d.mtbf);
  const media = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  const sorted = [...vals].sort((a, b) => a - b);
  const mediana = sorted.length % 2 === 0
    ? ((sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2).toFixed(1)
    : sorted[Math.floor(sorted.length/2)].toFixed(1);
  const variance = vals.reduce((s, v) => s + Math.pow(v - media, 2), 0) / vals.length;
  const desvio = Math.sqrt(variance).toFixed(1);
  const maxVal = Math.max(...vals, c.teste?.benchmark || 0);
  const benchmark = c.teste?.benchmark || 240;

  const tendencia = vals[vals.length - 1] > vals[0] ? '📈 Crescente' : vals[vals.length - 1] < vals[0] ? '📉 Decrescente' : '➡️ Estável';

  return `
    <div style="padding:16px;">
      <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:12px;">ANÁLISE ESTATÍSTICA</div>

      <!-- Stats rápidas -->
      <div class="grid-2" style="gap:8px;margin-bottom:16px;">
        ${[
          { l:'Média',    v:`${media}%`,   color:'var(--danger)', note:`vs ${benchmark}% meta` },
          { l:'Mediana',  v:`${mediana}%`, color:'var(--danger)', note:'' },
          { l:'Desvio',   v:`${desvio}pp`, color:'var(--gold)',   note:'Variab. baixa'  },
          { l:'Tendência',v: tendencia,     color:'var(--primary)', note:'' },
        ].map(s => `
          <div style="background:var(--surface-2);border-radius:8px;padding:10px;">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">${s.l}</div>
            <div style="font-size:15px;font-weight:800;color:${s.color};">${s.v}</div>
            ${s.note ? `<div style="font-size:10px;color:var(--text-muted);">${s.note}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Gap visual -->
      <div style="background:var(--surface-2);border-radius:10px;padding:12px;margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;margin-bottom:8px;">Gap vs. Benchmark</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:11px;width:60px;">Atual</span>
          <div style="flex:1;background:var(--surface-3);border-radius:99px;height:14px;overflow:hidden;">
            <div style="width:${(media / maxVal * 100).toFixed(0)}%;height:100%;background:var(--danger);border-radius:99px;"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:var(--danger);">${media}%</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:11px;width:60px;">Meta (&lt;30%)</span>
          <div style="flex:1;background:var(--surface-3);border-radius:99px;height:14px;overflow:hidden;">
            <div style="width:${(benchmark / maxVal * 100).toFixed(0)}%;height:100%;background:var(--accent);border-radius:99px;"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:var(--accent);">${benchmark}%</span>
        </div>
        <div style="font-size:11px;color:var(--danger);font-weight:700;margin-top:8px;text-align:center;">
          Gap: ${(media - benchmark).toFixed(1)}pp acima da meta
        </div>
      </div>

      <!-- Gráfico de série temporal — % SKUs sem complementar -->
      <div style="font-size:11px;font-weight:700;margin-bottom:8px;">Série Temporal — % SKUs sem atributo de complementaridade</div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:12px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
          <div style="width:20px;height:2px;background:var(--accent);border-top:2px dashed var(--accent);"></div>
          <span style="font-size:10px;color:var(--accent);">Meta aceitável (&lt;30%)</span>
          <div style="width:16px;height:8px;background:var(--danger);border-radius:2px;margin-left:8px;"></div>
          <span style="font-size:10px;color:var(--danger);">% SKUs sem complementar</span>
        </div>
        <div style="display:flex;align-items:flex-end;gap:4px;height:120px;position:relative;">
          <div style="position:absolute;left:0;right:0;bottom:${(30/maxVal*100)}%;height:1px;background:var(--accent);border-top:2px dashed var(--accent);opacity:0.7;pointer-events:none;"></div>
          ${c.serie.map(d => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;">
              <span style="font-size:9px;color:var(--danger);font-weight:700;">${d.mtbf}%</span>
              <div style="width:100%;background:var(--danger);border-radius:3px 3px 0 0;height:${(d.mtbf/maxVal*110).toFixed(0)}px;opacity:0.85;position:relative;">
                <title>SKUs sem complementar ${d.periodo}: ${d.mtbf}% · Sessões com cross-sell: ${d.ratio_corr}%</title>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:4px;margin-top:4px;">
          ${c.serie.map(d => `<div style="flex:1;font-size:8px;color:var(--text-muted);text-align:center;overflow:hidden;">${d.periodo.split('/')[0]}</div>`).join('')}
        </div>
      </div>

      <!-- Sessões com visualização de complementar -->
      <div style="font-size:11px;font-weight:700;margin-top:14px;margin-bottom:8px;">Sessões com visualização de produto complementar (%)</div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:12px;">
        ${c.serie.map(d => `
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
            <span style="font-size:9px;color:var(--text-muted);width:36px;">${d.periodo.split('/')[0]}</span>
            <div style="flex:1;height:12px;border-radius:99px;overflow:hidden;background:var(--surface-3);">
              <div style="width:${d.ratio_corr}%;height:100%;background:#3B82F6;border-radius:99px;"></div>
            </div>
            <span style="font-size:10px;color:#3B82F6;width:32px;">${d.ratio_corr}%</span>
          </div>
        `).join('')}
        <div style="display:flex;gap:12px;margin-top:8px;font-size:10px;">
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:10px;height:10px;border-radius:2px;background:#3B82F6;"></div> Sessões c/ cross-sell view</div>
          <div style="color:var(--text-muted);">Benchmark Petz: 60%+</div>
        </div>
      </div>

      ${desvio > media * 0.5 ? `
        <div class="alert alert-warning mt-3" style="font-size:11px;">
          ${icon('alert',12)} Alta variabilidade nos dados. Considere se a amostra é representativa.
        </div>
      ` : ''}
    </div>
  `;
}

// ============ HELPERS DO T05 ============

function selectT05Causa(id) {
  T05_DATA.selectedId = id;
  const view = document.querySelector('[style*="display:flex;flex:1;overflow:hidden"]');
  navigate('template_t05');
}

function setT05Status(id, status) {
  const c = T05_DATA.causas_raiz.find(x => x.id === id);
  if (c) { c.status = status; navigate('template_t05'); }
}

function validateT05Conclusion(el) {
  const id = el.id.replace('t05-conclusao-', '');
  const hint = document.getElementById(`t05-conclusao-hint-${id}`);
  if (!hint) return;
  if (el.value.length < 150) {
    hint.style.color = 'var(--danger)';
    hint.textContent = `Mínimo 150 caracteres (${150 - el.value.length} faltando).`;
  } else {
    hint.textContent = '';
    el.style.borderColor = 'var(--accent)';
  }
}

function suggestT05Conclusion(id) {
  showToast('IA gerando rascunho de conclusão...', 'info');
  setTimeout(() => {
    const el = document.getElementById(`t05-conclusao-${id}`);
    if (el) {
      el.value = T05_DATA.causas_raiz.find(x => x.id === id)?.conclusao || 'A hipótese foi VALIDADA. Auditoria do catálogo confirma: 68% dos 5.340 SKUs ativos não têm o campo "produtos complementares" preenchido — 38pp acima da meta de 30%. GA4 confirma: apenas 11% das sessões incluem visualização de produto complementar ao produto principal, vs. 60%+ no benchmark Petz/Cobasi. A tendência estável nos últimos 5 meses indica problema estrutural (não sazonal). A causa raiz "catálogo desorganizado sem atributos de complementaridade" é confirmada empiricamente — é pré-requisito de qualquer solução de IA de recomendação.';
      validateT05Conclusion(el);
      showToast('Rascunho gerado. Revise antes de confirmar.');
    }
  }, 1400);
}

function showT05MetricSuggest() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Sugestão de Métricas de Teste</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('ai',13)} Para hipóteses de cross-sell em e-commerce, as métricas mais utilizadas na biblioteca AXISUS:</div>
        ${[
          { m:'Taxa de cross-sell',                     u:'%',   desc:'% de pedidos com produtos de mais de 1 categoria. Métrica principal — diretamente impactada pela solução.' },
          { m:'Itens por pedido (items per order)',      u:'un.', desc:'Número médio de itens distintos por pedido. Indicador de diversidade de cesta.' },
          { m:'% SKUs sem atributo de complementar',     u:'%',   desc:'Proporção do catálogo sem campo "complementares" preenchido. Baseline para a auditoria.' },
          { m:'CTR do bloco de cross-sell (se existir)', u:'%',   desc:'Taxa de clique em widgets de recomendação. Mede visibilidade e relevância das sugestões.' },
        ].map(m => `
          <div style="display:flex;justify-content:space-between;align-items:start;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;">
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:600;">${m.m} <span class="badge badge-gray" style="font-size:10px;">${m.u}</span></div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${m.desc}</div>
            </div>
            <button class="btn btn-primary btn-sm" style="margin-left:10px;flex-shrink:0;" onclick="closeModal();showToast('Métrica aplicada!')">Usar</button>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

function requestGateDiagnose() {
  const validadas = T05_DATA.causas_raiz.filter(c => c.status === 'validada' || c.status === 'validada_parcial').length;
  if (validadas === 0) {
    showToast('Pelo menos uma causa raiz precisa estar validada antes de solicitar o Gate Diagnose.', 'error'); return;
  }
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Solicitar Gate Diagnose</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4">${icon('check',16)} ${validadas} causa${validadas > 1 ? 's' : ''} raiz validada${validadas > 1 ? 's' : ''} com dados empíricos.</div>
        <div style="background:var(--surface-2);border-radius:10px;padding:14px;font-size:12px;margin-bottom:16px;">
          <div class="font-semibold mb-2">O Hub Central revisará:</div>
          ${['Coerência T04 → T05 (causas validadas vieram do Ishikawa)','Dados anexados são reais (não estimativas sem fonte)','Análise estatística está correta','Conclusões respeitam critério numérico definido'].map(item => `
            <div class="flex items-center gap-2 mb-1">${icon('check',12)} <span>${item}</span></div>
          `).join('')}
        </div>
        <div class="form-group">
          <label class="form-label">Comentário para o revisor (opcional)</label>
          <textarea class="form-textarea" rows="2" placeholder="Pontos de atenção ou contexto adicional para o Hub..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('Gate Diagnose enviado para revisão do Hub! Prazo: 1-2 dias úteis.')">
          ${icon('send',14)} Enviar para Revisão
        </button>
      </div>
    </div>
  `);
}

function bindT05Events() {}
