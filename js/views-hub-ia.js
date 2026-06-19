// AXISUS Platform — Hub IA Copiloto · Onda 2
// Dashboard de Qualidade da IA: 26 pontos P01–P26, 5 métricas, especialistas, custos

// ─── Helpers de categoria ───────────────────────────────────────────────────
const IA_CAT = {
  geracao:   { label: 'Geração',    cls: 'badge-blue',   color: '#1E40AF', bg: '#EFF6FF' },
  rag:       { label: 'RAG',        cls: 'badge-purple', color: '#6B21A8', bg: '#F5F3FF' },
  validacao: { label: 'Validação',  cls: 'badge-yellow', color: '#B45309', bg: '#FFFBEB' },
  analise:   { label: 'Análise',    cls: 'badge-green',  color: '#065F46', bg: '#ECFDF5' },
  curadoria: { label: 'Curadoria',  cls: 'badge-purple', color: '#9D174D', bg: '#FDF2F8' },
};

const FASE_COLOR = {
  Define:   '#065F46', Diagnose: '#1E40AF', Design: '#6B21A8',
  Decide:   '#B45309', Deliver:  '#04342C',
};

function iaAcceptColor(rate) {
  if (rate >= 0.60) return '#065F46';
  if (rate >= 0.35) return '#B45309';
  return '#991B1B';
}

function iaAcceptBadge(rate) {
  const pct = Math.round(rate * 100);
  if (rate >= 0.60) return `<span class="badge badge-green">${pct}%</span>`;
  if (rate >= 0.35) return `<span class="badge badge-yellow">${pct}%</span>`;
  return `<span class="badge badge-red">${pct}%</span>`;
}

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function sparklineSVG(values, w, h, color) {
  if (!values || values.length < 2) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 0.01;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `<svg width="${w}" height="${h}" style="display:block;">
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${pts[pts.length-1].split(',')[0]}" cy="${pts[pts.length-1].split(',')[1]}" r="3" fill="${color}"/>
  </svg>`;
}

// Gera série histórica mock de 8 meses para um ponto
function mockHistory(baseRate, variance) {
  const out = [];
  for (let i = 0; i < 8; i++) {
    const v = Math.max(0.05, Math.min(0.95, baseRate + (Math.random() - 0.5) * variance));
    out.push(parseFloat(v.toFixed(2)));
  }
  out[out.length - 1] = baseRate; // último ponto = valor real
  return out;
}

// ─── Gráfico de barras SVG por fase ─────────────────────────────────────────
function barChartByFase(points) {
  const fases = ['Define', 'Diagnose', 'Design', 'Decide', 'Deliver'];
  const data = fases.map(f => {
    const pts = points.filter(p => p.fase === f);
    const avg = pts.reduce((s, p) => s + p.acceptRate, 0) / (pts.length || 1);
    return { fase: f, avg: parseFloat(avg.toFixed(3)), n: pts.length };
  });
  const svgW = 380, svgH = 120, padL = 50, padB = 30, barW = 44, gap = 16;
  const maxY = 1.0;
  const chartH = svgH - padB;
  const bars = data.map((d, i) => {
    const x = padL + i * (barW + gap);
    const barH = (d.avg / maxY) * chartH;
    const y = chartH - barH;
    const color = FASE_COLOR[d.fase] || '#888';
    const pct = Math.round(d.avg * 100);
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="5" fill="${color}" opacity="0.85"/>
      <text x="${x + barW / 2}" y="${y - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${pct}%</text>
      <text x="${x + barW / 2}" y="${svgH - 6}" text-anchor="middle" font-size="10" fill="var(--text-muted)">${d.fase.substring(0,3)}</text>
      <text x="${x + barW / 2}" y="${svgH - 16}" text-anchor="middle" font-size="9" fill="var(--text-muted)">${d.n}pts</text>
    `;
  });
  // Linha de meta 35%
  const metaY = chartH - (0.35 / maxY) * chartH;
  return `
    <svg width="${svgW}" height="${svgH}">
      <line x1="${padL - 4}" y1="${metaY}" x2="${svgW}" y2="${metaY}"
        stroke="#DC2626" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="${padL - 6}" y="${metaY + 4}" text-anchor="end" font-size="9" fill="#DC2626">meta 35%</text>
      ${bars.join('')}
    </svg>`;
}

// ─── Render principal ────────────────────────────────────────────────────────
function renderHubIA() {
  const m = AXISUS.iaMetrics;
  const pts = m.points;

  const aboveTarget = pts.filter(p => p.acceptRate >= 0.35).length;
  const belowTarget = pts.filter(p => p.acceptRate < 0.20).length;
  const dependAlert = m.specialists.filter(s => s.alertDependency).length;

  return `
    <div class="fade-in">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 style="font-size:24px;font-weight:800;">IA Copiloto — Painel de Qualidade</h1>
          <p class="text-secondary">26 pontos de IA · Método 5D · Onda 2 da especificação AXISUS</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="showToast('Relatório mensal exportado (simulação)')">
            ${icon('file', 14)} Exportar Relatório
          </button>
          <button class="btn btn-primary btn-sm" onclick="showIAPhilosophyModal()">
            ${icon('eye', 14)} Filosofia IA
          </button>
        </div>
      </div>

      <!-- Abas -->
      <div class="tabs mb-4" data-group="ia-tabs">
        <button class="tab-btn active" data-tab="overview">Visão Geral</button>
        <button class="tab-btn" data-tab="pontos">Mapa dos 26 Pontos</button>
        <button class="tab-btn" data-tab="especialistas">Especialistas</button>
        <button class="tab-btn" data-tab="custos">Custos</button>
      </div>

      <!-- ABA: VISÃO GERAL ────────────────────────────────────────────────── -->
      <div class="tab-content" data-group="ia-tabs" data-tab="overview">

        <!-- KPI Cards -->
        <div class="grid-4 mb-6">
          <div class="stat-card">
            <div style="width:40px;height:40px;border-radius:10px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('trending_up', 20)}</div>
            <div class="stat-label">Aceitação Global</div>
            <div class="stat-value">${Math.round(m.globalAcceptanceRate * 100)}%</div>
            <div class="badge badge-green mt-1">Meta: > 35%  ✓</div>
          </div>
          <div class="stat-card">
            <div style="width:40px;height:40px;border-radius:10px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('dollar', 20)}</div>
            <div class="stat-label">Custo / Caso Aprovado</div>
            <div class="stat-value">$${m.costPerApprovedCase.toFixed(2)}</div>
            <div class="badge badge-green mt-1">Meta: &lt; $1,00  ✓</div>
          </div>
          <div class="stat-card">
            <div style="width:40px;height:40px;border-radius:10px;background:#FFFBEB;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('chart', 20)}</div>
            <div class="stat-label">Cache Hit Rate</div>
            <div class="stat-value">${Math.round(m.cacheHitRate * 100)}%</div>
            <div class="badge badge-yellow mt-1">Meta: > 45%  ↑</div>
          </div>
          <div class="stat-card">
            <div style="width:40px;height:40px;border-radius:10px;background:#F5F3FF;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${icon('check', 20)}</div>
            <div class="stat-label">Pontos Acima da Meta</div>
            <div class="stat-value">${aboveTarget}/${pts.length}</div>
            <div class="${belowTarget > 0 ? 'badge badge-yellow' : 'badge badge-green'} mt-1">${belowTarget} abaixo de 20%</div>
          </div>
        </div>

        <!-- Linha 2: Correlação IA×Gate + Gráfico de barras por fase -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">

          <!-- Correlação IA × Gate -->
          <div class="card">
            <div class="card-title mb-1">Correlação IA × Gate</div>
            <div class="card-subtitle mb-4">Casos com uso de IA &gt; 50% têm taxa de aprovação no 1º Gate:</div>
            <div style="display:flex;align-items:flex-end;gap:24px;margin-bottom:16px;">
              <div style="text-align:center;">
                <div style="font-size:36px;font-weight:900;color:var(--primary);">${Math.round(m.gateCorrelation * 100)}%</div>
                <div style="font-size:11px;color:var(--text-muted);">Com uso IA &gt; 50%</div>
              </div>
              <div style="font-size:20px;color:var(--text-muted);">vs</div>
              <div style="text-align:center;">
                <div style="font-size:36px;font-weight:900;color:var(--text-muted);">61%</div>
                <div style="font-size:11px;color:var(--text-muted);">Sem IA (baseline)</div>
              </div>
            </div>
            <div class="alert alert-success" style="font-size:12px;">
              ${icon('trending_up', 14)} Uso de IA está correlacionado com +26pp de aprovação no Gate.
              Meta: &gt; 90% para casos com IA &gt; 50%. <strong>Atual: ${Math.round(m.gateCorrelation * 100)}%.</strong>
            </div>
            <!-- Sparkline de correlação últimos 6 meses -->
            <div style="margin-top:12px;">
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Evolução últimos 8 meses</div>
              ${sparklineSVG([0.71, 0.74, 0.76, 0.79, 0.82, 0.84, 0.85, 0.87], 260, 36, '#065F46')}
            </div>
          </div>

          <!-- Gráfico de aceitação por fase -->
          <div class="card">
            <div class="card-title mb-1">Aceitação por Fase do Método</div>
            <div class="card-subtitle mb-4">Taxa média de aceitação dos pontos de IA em cada fase</div>
            <div style="overflow-x:auto;">
              ${barChartByFase(pts)}
            </div>
            <div class="flex gap-3 mt-3" style="flex-wrap:wrap;">
              ${Object.entries(IA_CAT).map(([k, v]) => `
                <div class="flex items-center gap-1" style="font-size:11px;">
                  <div style="width:8px;height:8px;border-radius:50%;background:${v.color};"></div>
                  <span>${v.label}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Linha 3: Tempo de revisão + alerta dependência -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div class="card">
            <div class="card-title mb-1">Tempo Médio de Revisão</div>
            <div class="card-subtitle mb-4">Quanto o especialista leva para aceitar ou ignorar uma sugestão</div>
            <div style="font-size:48px;font-weight:900;color:var(--primary);margin-bottom:4px;">${m.avgReviewTimeSeconds}s</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;">Média global · Meta: &gt; 15s (engajamento) e &lt; 90s (clareza)</div>
            <div class="alert alert-success" style="font-size:12px;">
              ${icon('check', 14)} ${m.avgReviewTimeSeconds}s está na faixa ideal (15–90s). Especialistas estão lendo as sugestões antes de decidir.
            </div>
          </div>
          <div class="card">
            <div class="card-title mb-1">Alertas de Dependência</div>
            <div class="card-subtitle mb-4">Especialistas com taxa de aceitação &gt; 80% — possível passividade</div>
            ${dependAlert === 0 ? `
              <div class="alert alert-success" style="font-size:12px;">${icon('check',14)} Nenhum especialista com dependência crítica identificada.</div>
            ` : `
              <div class="alert alert-warning" style="font-size:12px;">${icon('alert',14)} ${dependAlert} especialista(s) com padrão de alta dependência identificado(s).</div>
            `}
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">
              ${m.specialists.map(s => `
                <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;padding:8px;border-radius:8px;background:${s.alertDependency ? '#FEF2F2' : 'var(--surface-2)'};">
                  <div style="font-weight:600;">${s.nome.split(' ')[0]} ${s.nome.split(' ')[1] || ''}</div>
                  <div class="flex gap-2 items-center">
                    <span style="color:var(--text-muted);">${Math.round(s.acceptRate * 100)}% aceitação</span>
                    ${s.alertDependency ? `<span class="badge badge-red">Alerta</span>` : `<span class="badge badge-green">OK</span>`}
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- ABA: MAPA DOS 26 PONTOS ─────────────────────────────────────────── -->
      <div class="tab-content hidden" data-group="ia-tabs" data-tab="pontos">

        <!-- Filtros rápidos -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm ia-filter-btn active" data-filter="all" onclick="filterIAPoints('all')">Todos (26)</button>
          ${Object.entries(IA_CAT).map(([k, v]) => {
            const n = pts.filter(p => p.categoria === k).length;
            return `<button class="btn btn-secondary btn-sm ia-filter-btn" data-filter="${k}" onclick="filterIAPoints('${k}')">${v.label} (${n})</button>`;
          }).join('')}
          <button class="btn btn-secondary btn-sm ia-filter-btn" data-filter="below" onclick="filterIAPoints('below')" style="margin-left:auto;">
            ${icon('alert', 12)} Abaixo de 20%
          </button>
        </div>

        <!-- Grid de pontos -->
        <div id="ia-points-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;">
          ${pts.map(p => {
            const cat = IA_CAT[p.categoria] || IA_CAT.geracao;
            const hist = mockHistory(p.acceptRate, 0.15);
            return `
              <div class="ia-point-card" data-categoria="${p.categoria}" data-acceptrate="${p.acceptRate}"
                style="border:1.5px solid var(--border);border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s;"
                onclick="showIAPointDetail('${p.id}')"
                onmouseover="this.style.borderColor='${cat.color}';this.style.background='${cat.bg}'"
                onmouseout="this.style.borderColor='var(--border)';this.style.background='white'">
                <!-- Header do card -->
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <div style="font-weight:900;font-size:12px;color:${cat.color};background:${cat.bg};border:1.5px solid ${cat.color}40;padding:3px 8px;border-radius:6px;">${p.id}</div>
                    <span style="font-size:11px;color:var(--text-muted);">${p.template} · ${p.fase}</span>
                  </div>
                  ${iaAcceptBadge(p.acceptRate)}
                </div>
                <!-- Descrição -->
                <div style="font-size:12px;font-weight:600;margin-bottom:6px;line-height:1.4;">${p.funcao}</div>
                <!-- Footer -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="badge ${cat.cls}" style="font-size:10px;">${cat.label}</span>
                    <span style="font-size:10px;color:var(--text-muted);">${p.calls} calls/mês</span>
                  </div>
                  ${sparklineSVG(hist, 60, 22, cat.color)}
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- Resumo categorias -->
        <div class="card mt-4" style="padding:16px 20px;">
          <div class="card-title mb-3">Distribuição por Categoria</div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;">
            ${Object.entries(IA_CAT).map(([k, v]) => {
              const n = pts.filter(p => p.categoria === k).length;
              const avgRate = pts.filter(p => p.categoria === k).reduce((s, p) => s + p.acceptRate, 0) / (n || 1);
              return `
                <div style="text-align:center;padding:12px;border-radius:10px;background:${v.bg};border:1.5px solid ${v.color}30;">
                  <div style="font-size:22px;font-weight:900;color:${v.color};">${n}</div>
                  <div style="font-size:11px;font-weight:700;color:${v.color};">${v.label}</div>
                  <div style="font-size:10px;color:var(--text-muted);">Aceitação: ${Math.round(avgRate * 100)}%</div>
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- ABA: ESPECIALISTAS ──────────────────────────────────────────────── -->
      <div class="tab-content hidden" data-group="ia-tabs" data-tab="especialistas">
        <div class="card mb-4">
          <div class="card-title mb-1">Padrão de Uso da IA por Especialista</div>
          <div class="card-subtitle mb-4">Uso médio por caso vs taxa de aceitação vs alerta de dependência. Meta: 26 chamadas/caso, aceitação entre 20–80%.</div>
          <div style="overflow-x:auto;">
            <table class="table">
              <thead>
                <tr>
                  <th>Especialista</th><th>Nível</th><th>Uso IA / Caso</th>
                  <th>Taxa Aceitação</th><th>Tempo Médio Rev.</th><th>Dependência</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${m.specialists.map(s => {
                  const usoColor = s.usoIACaso > 30 ? '#B45309' : s.usoIACaso < 15 ? '#6B7280' : '#065F46';
                  const tempoMock = Math.round(18 + Math.random() * 20);
                  return `
                    <tr>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px;">
                          <div class="user-avatar" style="width:28px;height:28px;font-size:10px;">${s.nome.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                          <div>
                            <div style="font-size:12px;font-weight:600;">${s.nome}</div>
                          </div>
                        </div>
                      </td>
                      <td><span class="badge badge-gray">${s.nivel}</span></td>
                      <td>
                        <div class="flex items-center gap-2">
                          <div style="width:60px;height:6px;background:var(--surface-3);border-radius:3px;overflow:hidden;">
                            <div style="height:100%;width:${Math.min(100, (s.usoIACaso/40)*100)}%;background:${usoColor};border-radius:3px;"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600;color:${usoColor};">${s.usoIACaso}</span>
                        </div>
                      </td>
                      <td>${iaAcceptBadge(s.acceptRate)}</td>
                      <td style="font-size:12px;">${tempoMock}s</td>
                      <td>
                        <div style="width:80px;height:20px;">${sparklineSVG(mockHistory(s.acceptRate, 0.12), 80, 20, s.alertDependency ? '#DC2626' : '#065F46')}</div>
                      </td>
                      <td>
                        ${s.alertDependency
                          ? `<span class="badge badge-red">${icon('alert',11)} Alerta</span>`
                          : `<span class="badge badge-green">${icon('check',11)} Normal</span>`}
                      </td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Guia de interpretação -->
        <div class="card" style="padding:16px 20px;">
          <div class="card-title mb-3">Guia de Interpretação</div>
          <div class="grid-3" style="gap:12px;">
            <div style="padding:12px;border-radius:10px;background:#ECFDF5;border:1px solid #059669;">
              <div style="font-size:12px;font-weight:700;color:#065F46;margin-bottom:4px;">Padrão Saudável</div>
              <div style="font-size:11px;color:#065F46;line-height:1.6;">
                • Uso: 22–28 chamadas/caso<br>
                • Aceitação: 20–60%<br>
                • Tempo revisão: 15–90s<br>
                • Nenhum alerta ativo
              </div>
            </div>
            <div style="padding:12px;border-radius:10px;background:#FFFBEB;border:1px solid #D97706;">
              <div style="font-size:12px;font-weight:700;color:#B45309;margin-bottom:4px;">Atenção Necessária</div>
              <div style="font-size:11px;color:#B45309;line-height:1.6;">
                • Uso &gt; 32 chamadas/caso<br>
                • Aceitação &gt; 70% ou &lt; 15%<br>
                • Tempo revisão &lt; 10s<br>
                • Ponto IA abaixo de 20% por 3 meses
              </div>
            </div>
            <div style="padding:12px;border-radius:10px;background:#FEF2F2;border:1px solid #DC2626;">
              <div style="font-size:12px;font-weight:700;color:#991B1B;margin-bottom:4px;">Alerta — Ação Imediata</div>
              <div style="font-size:11px;color:#991B1B;line-height:1.6;">
                • Aceitação &gt; 80% em &gt; 80% dos pontos<br>
                • Indica passividade ou perda de julgamento crítico<br>
                • Ação: sessão de mentoria + revisão Hub
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ABA: CUSTOS ──────────────────────────────────────────────────────── -->
      <div class="tab-content hidden" data-group="ia-tabs" data-tab="custos">

        <!-- Headline -->
        <div class="card mb-4" style="background:linear-gradient(135deg,#04342C,#065F46);color:white;padding:24px;">
          <div style="font-size:13px;opacity:0.7;margin-bottom:4px;">Custo líquido de IA estimado (100 casos/mês · cenário ano 2)</div>
          <div style="font-size:48px;font-weight:900;margin-bottom:8px;">$${m.totalCostMonth.toFixed(2)}/mês</div>
          <div style="font-size:13px;opacity:0.8;">
            Equivale a <strong>0,001% da receita</strong> estimada (100 casos × ticket médio R$ 48k).
            Muito longe do "13× mais que janeiro" que plataformas sem método enfrentam.
          </div>
        </div>

        <!-- Tabela de breakdown -->
        <div class="card mb-4">
          <div class="card-title mb-1">Breakdown de Custos</div>
          <div class="card-subtitle mb-4">Projeção mensal com 100 casos ativos e distribuição de modelos conforme Princípio 1 (modelo apropriado à tarefa)</div>
          <div style="overflow-x:auto;">
            <table class="table">
              <thead>
                <tr><th>Componente</th><th>Volume / Mês</th><th>Custo Unitário</th><th>Total</th><th>% do Custo</th></tr>
              </thead>
              <tbody>
                ${m.costBreakdown.map(c => {
                  const isEconomia = c.total < 0;
                  const totalBruto = m.costBreakdown.filter(x => x.total > 0).reduce((s, x) => s + x.total, 0);
                  const pct = isEconomia ? '-' : `${Math.round((c.total / totalBruto) * 100)}%`;
                  return `
                    <tr>
                      <td style="font-size:12px;font-weight:500;">${c.componente}</td>
                      <td style="font-size:12px;">${c.volume.toLocaleString('pt-BR')}</td>
                      <td style="font-size:12px;font-family:monospace;">$${c.custoUnit >= 0 ? c.custoUnit.toFixed(4) : '(' + Math.abs(c.custoUnit).toFixed(3) + ')'}</td>
                      <td style="font-size:13px;font-weight:700;color:${isEconomia ? '#065F46' : 'var(--text)'};">
                        ${isEconomia ? '-' : ''}$${Math.abs(c.total).toFixed(2)}
                        ${isEconomia ? `<span class="badge badge-green" style="font-size:9px;">economia</span>` : ''}
                      </td>
                      <td style="font-size:12px;color:var(--text-muted);">${pct}</td>
                    </tr>`;
                }).join('')}
                <tr style="background:var(--surface-2);font-weight:800;">
                  <td colspan="3" style="font-size:13px;">CUSTO LÍQUIDO TOTAL / MÊS</td>
                  <td style="font-size:15px;font-weight:900;color:var(--primary);">$${m.totalCostMonth.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Princípios de gestão de custo -->
        <div class="card mb-4">
          <div class="card-title mb-3">4 Princípios de Gestão de Custo AXISUS</div>
          <div class="grid-2" style="gap:12px;">
            ${[
              { n: 1, titulo: 'Modelo Apropriado à Tarefa', desc: 'Sonnet para geração complexa (T04, T06, T08, T09). Haiku para validação e scoring. Computação local para estatística. Embeddings para RAG.', color: '#1E40AF', bg: '#EFF6FF' },
              { n: 2, titulo: 'Cache Agressivo', desc: 'Sugestões de causas cacheadas por setor + porte por 7 dias. Análises estatísticas: cache permanente. Cache hit esperado: 35–45% após 6 meses.', color: '#065F46', bg: '#ECFDF5' },
              { n: 3, titulo: 'RAG Antes de Geração', desc: 'Quando biblioteca tem resposta similar, RAG é mais barato e mais relevante que geração. Economia de até 99% por query RAG vs. Sonnet.', color: '#6B21A8', bg: '#F5F3FF' },
              { n: 4, titulo: 'Rate Limiting por Especialista', desc: 'Cota de 200 chamadas IA/mês incluída na licença. Acima disso: overage proporcional. Evita "clicar IA por reflexo" sem agregar valor.', color: '#B45309', bg: '#FFFBEB' },
            ].map(p => `
              <div style="padding:16px;border-radius:10px;background:${p.bg};border:1.5px solid ${p.color}30;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                  <div style="width:24px;height:24px;border-radius:6px;background:${p.color};display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:800;">${p.n}</div>
                  <div style="font-size:13px;font-weight:700;color:${p.color};">${p.titulo}</div>
                </div>
                <div style="font-size:12px;line-height:1.6;color:${p.color}99;">${p.desc}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Alertas de custo -->
        <div class="card">
          <div class="card-title mb-3">Sinais de Alerta de Custo</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${[
              { cond: false, msg: 'Especialista com média > 50 chamadas IA/caso (média atual: 24)', label: 'OK' },
              { cond: false, msg: 'Cache hit rate < 25% — atual: 38% (crescendo)', label: 'OK' },
              { cond: false, msg: 'Latência média > 8s em ponto crítico — atual: máx. 3,1s (P24)', label: 'OK' },
              { cond: false, msg: 'Crescimento de custo > crescimento de receita — monitorar mensalmente', label: 'Monitorar' },
            ].map(a => `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;background:${a.cond ? '#FEF2F2' : a.label === 'Monitorar' ? '#FFFBEB' : '#ECFDF5'};">
                <span class="${a.cond ? 'badge badge-red' : a.label === 'Monitorar' ? 'badge badge-yellow' : 'badge badge-green'}">${a.label}</span>
                <span style="font-size:12px;">${a.msg}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Bind de eventos ─────────────────────────────────────────────────────────
function bindHubIAEvents() {
  // Tabs são gerenciadas por bindTabEvents() no router
  // Botões de filtro de pontos — re-bind após render
  setTimeout(() => {
    document.querySelectorAll('.ia-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ia-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }, 100);
}

function filterIAPoints(filter) {
  const cards = document.querySelectorAll('.ia-point-card');
  cards.forEach(card => {
    const cat = card.dataset.categoria;
    const rate = parseFloat(card.dataset.acceptrate);
    if (filter === 'all') {
      card.style.display = '';
    } else if (filter === 'below') {
      card.style.display = rate < 0.20 ? '' : 'none';
    } else {
      card.style.display = cat === filter ? '' : 'none';
    }
  });
}

// ─── Modal de detalhe de um ponto IA ─────────────────────────────────────────
function showIAPointDetail(id) {
  const p = AXISUS.iaMetrics.points.find(x => x.id === id);
  if (!p) return;
  const cat = IA_CAT[p.categoria] || IA_CAT.geracao;
  const hist = mockHistory(p.acceptRate, 0.16);
  const histLabels = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

  const exemplosSugestoes = {
    geracao: [
      { texto: 'Roteirização dinâmica com agregação de cargas por CEP cluster', aceito: true },
      { texto: 'Revisão manual de rotas pelo supervisor diário', aceito: false },
    ],
    rag: [
      { texto: 'Caso Lib2 — Metalúrgica Primus (94% similaridade): causa raiz em Máquina', aceito: true },
      { texto: 'Caso Lib5 — Construtora Beta (71% similaridade): causa raiz em Método', aceito: false },
    ],
    validacao: [
      { texto: 'Anti-padrão detectado: "O motorista não segue a rota" → atribuição pessoal, não sistêmica', aceito: true },
      { texto: 'Anti-padrão detectado: "Falta de treinamento" → sintoma, não causa raiz', aceito: false },
    ],
    analise: [
      { texto: 'Média: R$ 23.400/mês · Desvio padrão: R$ 4.200 · Tendência: +8,3%/mês (regressão linear)', aceito: true },
      { texto: 'Outlier detectado: Março 2026 (+2,1σ) — evento atípico, excluir da análise de tendência', aceito: true },
    ],
    curadoria: [
      { texto: 'Gap detectado: seção "Solução Proposta" do A3 não alinha com WSJF do T07 — revisar', aceito: true },
      { texto: 'Síntese gerada para Background: "Distribuidora Sul opera 340 rotas/dia com custo de frete 34% acima do benchmark setorial"', aceito: false },
    ],
  };

  const exemplos = exemplosSugestoes[p.categoria] || exemplosSugestoes.geracao;

  showModal(`
    <div class="modal" style="max-width:600px;width:100%;">
      <div class="modal-header" style="background:${cat.bg};border-bottom:2px solid ${cat.color}30;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
            <div style="font-weight:900;font-size:14px;color:${cat.color};background:white;border:2px solid ${cat.color};padding:3px 10px;border-radius:8px;">${p.id}</div>
            <span class="badge ${cat.cls}">${cat.label}</span>
            <span style="font-size:12px;color:var(--text-muted);">Template ${p.template} · Fase ${p.fase}</span>
          </div>
          <div style="font-size:15px;font-weight:700;">${p.funcao}</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x', 18)}</button>
      </div>
      <div class="modal-body" style="padding:20px;">

        <!-- Métricas do ponto -->
        <div class="grid-3 mb-4" style="gap:10px;">
          <div style="text-align:center;padding:10px;background:var(--surface-2);border-radius:8px;">
            <div style="font-size:22px;font-weight:900;color:${iaAcceptColor(p.acceptRate)};">${Math.round(p.acceptRate * 100)}%</div>
            <div style="font-size:10px;color:var(--text-muted);">Taxa Aceitação</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--surface-2);border-radius:8px;">
            <div style="font-size:22px;font-weight:900;">${p.calls}</div>
            <div style="font-size:10px;color:var(--text-muted);">Calls / Mês</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--surface-2);border-radius:8px;">
            <div style="font-size:22px;font-weight:900;">${p.avgMs < 1000 ? p.avgMs + 'ms' : (p.avgMs/1000).toFixed(1) + 's'}</div>
            <div style="font-size:10px;color:var(--text-muted);">Latência Média</div>
          </div>
        </div>

        <!-- Modelo -->
        <div style="padding:10px 14px;background:${cat.bg};border-radius:8px;margin-bottom:16px;font-size:12px;">
          <strong>Modelo:</strong> ${p.modelo}
        </div>

        <!-- Histórico de aceitação (sparkline grande) -->
        <div style="margin-bottom:16px;">
          <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Evolução da taxa de aceitação (últimos 8 meses)</div>
          <div style="position:relative;">
            ${sparklineSVG(hist, 540, 60, cat.color)}
            <div class="flex justify-between" style="font-size:10px;color:var(--text-muted);margin-top:4px;">
              ${histLabels.map(l => `<span>${l}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Exemplos de sugestões -->
        <div>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Exemplos de saídas deste ponto</div>
          ${exemplos.map(e => `
            <div style="padding:10px 12px;border-radius:8px;border:1.5px solid ${e.aceito ? '#059669' : '#9CA3AF'};background:${e.aceito ? '#ECFDF5' : 'var(--surface-2)'};margin-bottom:8px;font-size:12px;display:flex;gap:10px;align-items:flex-start;">
              <span class="${e.aceito ? 'badge badge-green' : 'badge badge-gray'}" style="flex-shrink:0;margin-top:1px;">${e.aceito ? 'Aceito' : 'Ignorado'}</span>
              <span style="line-height:1.5;">${e.texto}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
        <button class="btn btn-primary" onclick="showToast('Prompt de ${p.id} aberto para refinamento (simulação)')">Refinar Prompt</button>
      </div>
    </div>
  `);
}

// ─── Modal de Filosofia IA ────────────────────────────────────────────────────
function showIAPhilosophyModal() {
  showModal(`
    <div class="modal" style="max-width:560px;width:100%;">
      <div class="modal-header" style="background:linear-gradient(135deg,#04342C,#065F46);color:white;">
        <div>
          <div style="font-size:12px;opacity:0.7;margin-bottom:2px;">Princípio Fundador</div>
          <div style="font-size:18px;font-weight:800;">"A IA é o copiloto. O especialista é o comandante."</div>
        </div>
        <button class="btn btn-ghost btn-icon" style="color:white;" onclick="closeModal()">${icon('x', 18)}</button>
      </div>
      <div class="modal-body" style="padding:20px;">
        ${[
          { titulo: 'IA Contextual, não Conversacional', desc: 'Cada ponto de IA tem contexto específico: qual template, qual fase, qual cliente, qual histórico. A IA não pergunta "como posso ajudar?". Ela já sabe o que está sendo feito.', color: '#065F46' },
          { titulo: 'IA Sugere, Especialista Decide', desc: 'A IA NUNCA preenche campos automaticamente, NUNCA marca decisões como tomadas, NUNCA avança Gates sem ação humana. Toda sugestão precisa de ato explícito de aceitação.', color: '#1E40AF' },
          { titulo: 'IA Aprende com a Rede', desc: 'Sugestões aceitas e rejeitadas são registradas. Casos resolvidos viram base vetorizada (RAG). Esse é o moat crescente: método aplicado em centenas de casos cuja inteligência fica disponível para o próximo especialista.', color: '#6B21A8' },
        ].map(i => `
          <div style="padding:14px;border-radius:10px;border-left:4px solid ${i.color};background:${i.color}08;margin-bottom:10px;">
            <div style="font-size:13px;font-weight:700;color:${i.color};margin-bottom:4px;">${i.titulo}</div>
            <div style="font-size:12px;line-height:1.6;color:var(--text-secondary);">${i.desc}</div>
          </div>`).join('')}
        <div style="padding:14px;border-radius:10px;background:var(--surface-2);margin-top:4px;font-size:12px;color:var(--text-muted);line-height:1.6;">
          <strong>O moat competitivo AXISUS:</strong> A biblioteca crescente de casos, os embeddings refinados por uso real e os padrões de aceitação que calibram qualidade — esses ativos só existem com tempo e volume. Quem chegar segundo precisará de anos de operação real para alcançar a maturidade que a rede AXISUS construiu primeiro.
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="closeModal()">Entendido</button>
      </div>
    </div>
  `);
}
