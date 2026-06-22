// ============================================================
// AXISUS — Templates Fase Decide: T07 (WSJF AXISUS) e T08 (5W2H + Riscos + KPIs)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ─────────────────────────────────────────────────────────────
// DADOS T07 — WSJF
// ─────────────────────────────────────────────────────────────
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];

// T07 DATA — caso Petshop Beta (AI Sprint adequação v2)
const T07_STATE = {
  selectedId: 'a8',
  scoring: [
    {
      id: 'a1', num: 'A1', titulo: 'Recommendation Engine SaaS (plug-and-play)',
      categoria: 'llm_api', catColor: '#1E3A8A',
      custo: 'R$ 6-12k/mês', prazo: '2 meses',
      user_value: 8, time_criticality: 8, risk_reduction: 5, job_size: 3,
      aderencia: false,
      just_uv: 'Resolve sintoma (ausência de recomendação) mas não causa raiz (catálogo). Funcionalidade limitada sem dados organizados.',
      just_tc: 'Urgência baixa: tentativa similar em 2025 falhou. Repetir sem resolver causa raiz não é urgente.',
      just_rr: 'Baixa redução de risco: problema principal (catálogo) continua intacto.',
      just_js: 'Implementação simples — Shopify nativo. Baixo esforço técnico.',
      just_aderencia: 'A1 NÃO trata a causa raiz validada (catálogo desorganizado). Multiplicador 0,5 aplicado.',
    },
    {
      id: 'a2', num: 'A2', titulo: 'LLM via API — Prompt Engineering no Checkout',
      categoria: 'llm_api', catColor: '#1E3A8A',
      custo: 'R$ 8k + R$ 3k/mês', prazo: '3 meses',
      user_value: 8, time_criticality: 8, risk_reduction: 5, job_size: 5,
      aderencia: false,
      just_uv: 'LLM pode inferir complementos mesmo com catálogo ruim, mas qualidade limitada.',
      just_tc: 'Urgência real mas sem pré-requisito de catálogo — pode implementar rápido.',
      just_rr: 'Reduz risco de receita perdida no curto prazo mas não elimina causa raiz.',
      just_js: 'Dev Shopify + API integration. Moderado.',
      just_aderencia: 'A2 trata sintoma (falta de recomendação), não causa raiz (catálogo). Multiplicador 0,5.',
    },
    {
      id: 'a3', num: 'A3', titulo: 'RAG — Recomendação via Base de Co-compra',
      categoria: 'rag', catColor: '#0F6E56',
      custo: 'R$ 12k + R$ 800/mês', prazo: '2 meses',
      user_value: 13, time_criticality: 13, risk_reduction: 13, job_size: 5,
      aderencia: true,
      just_uv: 'Alto valor: usa dados reais de comportamento de compra. Relevância aumenta com o tempo.',
      just_tc: 'R$ 560k/mês em receita não realizada. Cada mês de atraso é perda direta mensurável.',
      just_rr: 'Reduz risco de recomendações ruins (dados reais) e risco de custo excessivo (baixo custo/mês).',
      just_js: 'Dev embedding + Supabase pgvector + integração Shopify. Moderado mas bem definido.',
      just_aderencia: 'A3 usa dados de co-compra — responde diretamente à causa raiz de "catálogo sem estrutura de complementaridade".',
    },
    {
      id: 'a5', num: 'A5', titulo: 'Organização do Catálogo (Solução Não-IA)',
      categoria: 'nao_ia', catColor: '#4A5A56',
      custo: 'R$ 15.000', prazo: '2 meses',
      user_value: 13, time_criticality: 13, risk_reduction: 8, job_size: 3,
      aderencia: true,
      just_uv: 'Trata causa raiz diretamente. Habilita qualquer solução de IA subsequente.',
      just_tc: 'Bloqueador para todas as outras alternativas. Cada mês sem catálogo organizado degrada resultado de qualquer IA.',
      just_rr: 'Elimina o principal risco de falha de IA (catálogo ruim = recomendações ruins).',
      just_js: 'Menor esforço técnico de todas as alternativas. Sprint de curadoria.',
      just_aderencia: 'A5 é a única alternativa que trata diretamente a causa raiz estrutural (catálogo desorganizado).',
    },
    {
      id: 'a8', num: 'A8', titulo: 'Híbrida: Curadoria de Catálogo (A5) + RAG (A3)',
      categoria: 'hibrida', catColor: '#B45309',
      custo: 'R$ 24.000 + R$ 800/mês', prazo: '2 meses',
      user_value: 21, time_criticality: 13, risk_reduction: 13, job_size: 8,
      aderencia: true,
      just_uv: 'Máximo valor: elimina causa raiz (A5) e adiciona IA relevante (A3). ROI 12x em 12 meses.',
      just_tc: 'R$ 560k/mês perdida. A solução certa desde o início é mais urgente que a solução rápida errada.',
      just_rr: 'Risco mínimo: cada componente é baixo risco isoladamente. Juntos se potencializam.',
      just_js: 'Sprint de curadoria (sem TI) + desenvolvimento RAG em Supabase. Esforço sequencial gerenciável.',
      just_aderencia: 'A8 = A5 (trata causa raiz direta) + A3 (IA que funciona porque catálogo está organizado). Solução completa.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// RENDER T07
// ─────────────────────────────────────────────────────────────
function calcWSJF(s) {
  if (!s.job_size || s.job_size === 0) return 0;
  const base = (s.user_value + s.time_criticality + s.risk_reduction) / s.job_size;
  const mult = s.aderencia ? 1.0 : 0.5;
  return +(base * mult).toFixed(2);
}

function getScoredAndRanked() {
  return T07_STATE.scoring
    .map(s => ({ ...s, wsjf_base: +((s.user_value + s.time_criticality + s.risk_reduction) / (s.job_size || 1)).toFixed(2), wsjf_final: calcWSJF(s) }))
    .sort((a, b) => b.wsjf_final - a.wsjf_final)
    .map((s, i) => ({ ...s, ranking: i + 1 }));
}

function renderT07() {
  const ranked   = getScoredAndRanked();
  const winner   = ranked[0];
  const selected = ranked.find(s => s.id === T07_STATE.selectedId) || ranked[0];
  const scored   = ranked.filter(s => s.user_value && s.time_criticality && s.risk_reduction && s.job_size).length;
  const maxWSJF  = Math.max(...ranked.map(r => r.wsjf_base), 1);

  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      <!-- Toolbar -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t06')">${icon('arrow_right',14)}</button>
        <div style="flex:1;">
          <div style="font-size:15px;font-weight:800;">T07 — Priorização WSJF AXISUS</div>
          <div style="font-size:11px;color:var(--text-muted);">${scored}/${ranked.length} alternativas com scoring completo · Fórmula: (UV + TC + RR) / JS × Multiplicador Aderência</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="showT07FormulaHelp()">${icon('eye',13)} Como funciona</button>
        <button class="btn btn-primary btn-sm" onclick="navigate('template_t08')">
          Avançar para T08 — Plano ${icon('arrow_right',13)}
        </button>
      </div>

      <!-- Contexto herdado -->
      <div style="background:linear-gradient(135deg,#1E3A8A,#1E40AF);color:white;padding:10px 20px;flex-shrink:0;">
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;">
          <div style="flex:2;min-width:220px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;">Causa Raiz Validada (T05)</div>
            <div style="font-size:12px;font-weight:700;">Ausência de gestor de manutenção · MTBF 47h vs 240h</div>
          </div>
          <div style="flex:1;min-width:150px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;">Métrica-Alvo (T03)</div>
            <div style="font-size:12px;font-weight:700;">OEE 18% → 50%+ em 12 meses</div>
          </div>
          <div style="flex:1;min-width:150px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;">Restrição (T01)</div>
            <div style="font-size:12px;font-weight:700;">Orçamento ≤ R$ 600k · Até 31/07/2026</div>
          </div>
          <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 14px;text-align:center;flex-shrink:0;">
            <div style="font-size:10px;opacity:0.7;">Vencedora</div>
            <div style="font-size:14px;font-weight:900;">${winner.num} · WSJF ${winner.wsjf_final}</div>
          </div>
        </div>
      </div>

      <!-- Layout: tabela + painel -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Área esquerda: tabela + gráfico -->
        <div style="flex:1;overflow-y:auto;padding:16px;background:var(--surface-2);">

          <!-- Tabela WSJF -->
          <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px;">
            <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:13px;font-weight:700;">Scoring WSJF AXISUS</div>
              <div style="font-size:11px;color:var(--text-muted);">Clique em uma linha para editar o scoring no painel lateral</div>
            </div>
            <div style="overflow-x:auto;">
              <table class="table" style="font-size:12px;min-width:800px;">
                <thead>
                  <tr style="background:var(--surface-2);">
                    <th style="width:36px;">#</th>
                    <th style="width:32px;">Cód</th>
                    <th>Alternativa</th>
                    <th style="text-align:center;width:64px;">UV<br><span style="font-size:9px;font-weight:400;">User Value</span></th>
                    <th style="text-align:center;width:64px;">TC<br><span style="font-size:9px;font-weight:400;">Time Crit.</span></th>
                    <th style="text-align:center;width:64px;">RR<br><span style="font-size:9px;font-weight:400;">Risk Red.</span></th>
                    <th style="text-align:center;width:64px;">JS<br><span style="font-size:9px;font-weight:400;">Job Size</span></th>
                    <th style="text-align:center;width:80px;">WSJF Base</th>
                    <th style="text-align:center;width:72px;">Aderência</th>
                    <th style="text-align:center;width:88px;background:#F0FDF4;">WSJF AXISUS</th>
                  </tr>
                </thead>
                <tbody>
                  ${ranked.map(s => {
                    const isWinner  = s.ranking === 1;
                    const isPenalized = !s.aderencia;
                    const isSelected  = s.id === T07_STATE.selectedId;
                    return `
                      <tr onclick="selectT07Alt('${s.id}')" style="cursor:pointer;
                        background:${isWinner ? '#ECFDF5' : isSelected ? '#F8FAFC' : 'white'};
                        border-left:${isPenalized ? '4px solid #F59E0B' : isWinner ? '4px solid #10B981' : '4px solid transparent'};">
                        <td style="text-align:center;font-weight:800;color:${isWinner ? '#065F46' : 'var(--text-muted)'};">
                          ${isWinner ? '🥇' : s.ranking + '°'}
                        </td>
                        <td><span style="font-size:11px;font-weight:800;color:${s.catColor};">${s.num}</span></td>
                        <td>
                          <div style="font-size:12px;font-weight:600;">${s.titulo}</div>
                          <div style="font-size:10px;color:var(--text-muted);">${s.custo} · ${s.prazo}</div>
                        </td>
                        ${['user_value','time_criticality','risk_reduction','job_size'].map(k => `
                          <td style="text-align:center;">
                            <select class="form-select" style="font-size:11px;padding:3px 6px;width:56px;text-align:center;"
                              onchange="setT07Score('${s.id}','${k}',parseInt(this.value))"
                              onclick="event.stopPropagation()">
                              ${FIBONACCI.map(v => `<option value="${v}" ${s[k]===v?'selected':''}>${v}</option>`).join('')}
                            </select>
                          </td>
                        `).join('')}
                        <td style="text-align:center;font-weight:700;">${s.wsjf_base}</td>
                        <td style="text-align:center;">
                          <span class="badge ${s.aderencia ? 'badge-green' : 'badge-yellow'}" style="font-size:10px;cursor:pointer;"
                            onclick="event.stopPropagation();toggleAderencia('${s.id}')">
                            ${s.aderencia ? '1,0 Raiz' : '0,5 Sint.'}
                          </span>
                        </td>
                        <td style="text-align:center;background:${isWinner ? '#D1FAE5' : '#F0FDF4'};">
                          <span style="font-size:15px;font-weight:900;color:${isWinner ? '#065F46' : '#047857'};">${s.wsjf_final}</span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Gráfico comparativo horizontal -->
          <div class="card">
            <div style="font-size:13px;font-weight:700;margin-bottom:4px;">Comparativo Visual: WSJF Base vs WSJF AXISUS</div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">Barras sólidas = WSJF AXISUS (com multiplicador de aderência). Barras tracejadas = WSJF Base sem penalização. O impacto do Multiplicador AXISUS é visível nas alternativas marcadas como Sintoma.</div>
            ${ranked.map(s => {
              const pctFinal = (s.wsjf_final / maxWSJF * 100).toFixed(1);
              const pctBase  = (s.wsjf_base  / maxWSJF * 100).toFixed(1);
              const isPen    = !s.aderencia;
              return `
                <div style="margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                    <div style="display:flex;align-items:center;gap:6px;">
                      <span style="font-size:11px;font-weight:800;color:${s.catColor};">${s.num}</span>
                      <span style="font-size:11px;">${s.titulo}</span>
                      ${isPen ? `<span class="badge badge-yellow" style="font-size:9px;">-50% sintoma</span>` : `<span class="badge badge-green" style="font-size:9px;">×1,0 raiz</span>`}
                    </div>
                    <div style="font-size:11px;font-weight:700;">
                      <span style="color:${s.catColor};">${s.wsjf_final}</span>
                      ${isPen ? `<span style="color:var(--text-muted);font-size:10px;"> (base ${s.wsjf_base})</span>` : ''}
                    </div>
                  </div>
                  <div style="position:relative;height:18px;background:var(--surface-3);border-radius:99px;overflow:visible;">
                    <!-- Barra base (tracejada se penalizada) -->
                    ${isPen ? `<div style="position:absolute;top:0;left:0;width:${pctBase}%;height:100%;border-radius:99px;background:repeating-linear-gradient(90deg,${s.catColor}33 0px,${s.catColor}33 6px,transparent 6px,transparent 10px);"></div>` : ''}
                    <!-- Barra WSJF AXISUS (sólida) -->
                    <div style="position:absolute;top:0;left:0;width:${pctFinal}%;height:100%;background:${s.catColor};border-radius:99px;transition:width 0.4s ease;"></div>
                    <!-- Ranking badge -->
                    <div style="position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:10px;color:white;font-weight:700;mix-blend-mode:luminosity;">#${s.ranking}</div>
                  </div>
                </div>
              `;
            }).join('')}
            <div style="margin-top:12px;padding:10px;background:#F0FDF4;border-radius:8px;font-size:11px;">
              <strong style="color:#065F46;">Nota metodológica:</strong> As alternativas A2 (SMED) e A4 (OEE IoT) foram penalizadas em 50% por tratar sintomas, não a causa raiz. Sem o Multiplicador AXISUS, A2 (WSJF base 2,60) superaria A3 (2,63) — levando à recomendação de uma alternativa que não resolve definitivamente o problema.
            </div>
          </div>
        </div>

        <!-- Painel lateral: detalhe do scoring -->
        <div id="t07-panel" style="width:360px;flex-shrink:0;border-left:1px solid var(--border);background:white;overflow-y:auto;">
          ${renderT07Panel(selected)}
        </div>
      </div>
    </div>
  `;
}

function renderT07Panel(s) {
  if (!s) return '<div style="padding:20px;color:var(--text-muted);">Selecione uma alternativa.</div>';
  const ranked = getScoredAndRanked();
  const withRank = ranked.find(r => r.id === s.id) || s;

  const components = [
    { key: 'user_value',       label: 'User Value (UV)',          cor: '#0F6E56', pergunta: 'Quanto valor financeiro/operacional/estratégico esta alternativa entrega?', scale: '1=irrisório · 21=transformador', val: s.user_value,       just: s.just_uv  },
    { key: 'time_criticality', label: 'Time Criticality (TC)',    cor: '#1E40AF', pergunta: 'Qual o custo de adiar? Cada dia sem implementar, quanto custa?',             scale: '1=sem urgência · 21=cada dia conta', val: s.time_criticality, just: s.just_tc  },
    { key: 'risk_reduction',   label: 'Risk Reduction (RR)',      cor: '#6B21A8', pergunta: 'Quanto risco esta alternativa elimina, além do problema principal?',         scale: '1=sem benefício colateral · 21=resolve múltiplos', val: s.risk_reduction,   just: s.just_rr  },
    { key: 'job_size',         label: 'Job Size (JS) — Divisor',  cor: '#B45309', pergunta: 'Qual o tamanho de implementação? Esforço, complexidade, tempo, recursos.',   scale: '1=trivial · 21=transformação total', val: s.job_size,         just: s.just_js  },
  ];

  const base  = withRank.wsjf_base;
  const final = withRank.wsjf_final;
  const mult  = s.aderencia ? 1.0 : 0.5;

  return `
    <div style="padding:0;">
      <!-- Header -->
      <div style="background:${s.catColor};padding:12px 16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
          <span style="font-size:11px;color:rgba(255,255,255,0.75);">${s.num} · Posição: #${withRank.ranking} de ${ranked.length}</span>
          <span style="font-size:20px;font-weight:900;color:white;">WSJF ${final}</span>
        </div>
        <div style="font-size:14px;font-weight:800;color:white;">${s.titulo}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.7);">${s.custo} · ${s.prazo}</div>
      </div>

      <div style="padding:14px;overflow-y:auto;">

        <!-- BLOCO A: Recapitulação -->
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">A — Recapitulação</div>
        <div style="padding:10px;background:var(--surface-2);border-radius:8px;font-size:12px;margin-bottom:14px;line-height:1.5;">
          <span class="badge" style="background:${s.catColor};color:white;font-size:10px;margin-bottom:6px;">${s.categoria}</span><br>
          ${s.custo} · ${s.prazo}
        </div>

        <!-- BLOCO B: Scoring por componente -->
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">B — Scoring Detalhado</div>
        ${components.map(c => `
          <div style="border-left:3px solid ${c.cor};padding:8px 10px;margin-bottom:8px;background:var(--surface-2);border-radius:0 8px 8px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
              <span style="font-size:11px;font-weight:700;color:${c.cor};">${c.label}</span>
              <select class="form-select" style="font-size:12px;font-weight:700;padding:2px 6px;width:60px;"
                onchange="setT07Score('${s.id}','${c.key}',parseInt(this.value))">
                ${FIBONACCI.map(v => `<option value="${v}" ${c.val===v?'selected':''}>${v}</option>`).join('')}
              </select>
            </div>
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">${c.pergunta}</div>
            <div style="font-size:9px;color:var(--text-muted);font-style:italic;margin-bottom:4px;">${c.scale}</div>
            <input class="form-input" value="${c.just}" style="font-size:11px;padding:4px 8px;" placeholder="Justificativa (recomendado)">
          </div>
        `).join('')}

        <!-- BLOCO C: Aderência -->
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;margin-top:14px;">C — Aderência à Causa Raiz</div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <button onclick="setAderencia('${s.id}',true)"
            style="flex:1;padding:8px;border:2px solid ${s.aderencia ? '#10B981' : 'var(--border)'};background:${s.aderencia ? '#ECFDF5' : 'white'};border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:${s.aderencia ? '#065F46' : 'var(--text-muted)'};">
            ✅ Causa Raiz<br><span style="font-size:10px;font-weight:400;">Multiplicador ×1,0</span>
          </button>
          <button onclick="setAderencia('${s.id}',false)"
            style="flex:1;padding:8px;border:2px solid ${!s.aderencia ? '#F59E0B' : 'var(--border)'};background:${!s.aderencia ? '#FFFBEB' : 'white'};border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:${!s.aderencia ? '#92400E' : 'var(--text-muted)'};">
            ⚠️ Sintoma<br><span style="font-size:10px;font-weight:400;">Multiplicador ×0,5</span>
          </button>
        </div>
        <textarea class="form-textarea" rows="2" style="font-size:11px;min-height:56px;" placeholder="Justificativa (mínimo 100 caracteres)...">${s.just_aderencia}</textarea>

        <!-- BLOCO D: Cálculo visualizado -->
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;margin-top:14px;">D — Cálculo</div>
        <div style="background:linear-gradient(135deg,#F8FAFC,#F0FDF4);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:12px;">
          <div style="margin-bottom:6px;color:var(--text-secondary);">
            WSJF Base = (UV + TC + RR) / JS<br>
            = (${s.user_value} + ${s.time_criticality} + ${s.risk_reduction}) / ${s.job_size}<br>
            = <strong>${s.user_value + s.time_criticality + s.risk_reduction}</strong> / ${s.job_size} = <strong style="color:#1E40AF;">${base}</strong>
          </div>
          <div style="margin-bottom:6px;color:var(--text-secondary);">
            Multiplicador Aderência = <strong>${mult}</strong> (${s.aderencia ? 'trata causa raiz' : 'trata sintoma'})
          </div>
          <div style="font-size:15px;font-weight:900;color:${s.catColor};padding-top:8px;border-top:1px solid var(--border);">
            WSJF AXISUS = ${base} × ${mult} = <span style="font-size:20px;">${final}</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Posição: <strong>#${withRank.ranking}</strong> de ${ranked.length}</div>
        </div>
      </div>
    </div>
  `;
}

// HELPERS T07
function selectT07Alt(id) {
  T07_STATE.selectedId = id;
  const s = T07_STATE.scoring.find(x => x.id === id);
  const panel = document.getElementById('t07-panel');
  if (panel) panel.innerHTML = renderT07Panel(s);
}

function setT07Score(id, key, val) {
  const s = T07_STATE.scoring.find(x => x.id === id);
  if (s) { s[key] = val; }
  // Recalculate table
  const container = document.querySelector('.table tbody');
  if (!container) { navigate('template_t07'); return; }
  navigate('template_t07');
}

function toggleAderencia(id) {
  const s = T07_STATE.scoring.find(x => x.id === id);
  if (s) s.aderencia = !s.aderencia;
  navigate('template_t07');
}

function setAderencia(id, val) {
  const s = T07_STATE.scoring.find(x => x.id === id);
  if (s) { s.aderencia = val; }
  const ranked = getScoredAndRanked();
  const updated = ranked.find(r => r.id === id);
  const panel = document.getElementById('t07-panel');
  if (panel && updated) panel.innerHTML = renderT07Panel(updated);
  navigate('template_t07');
}

function showT07FormulaHelp() {
  showModal(`
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div class="modal-title">Fórmula WSJF AXISUS — Como Funciona</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div style="background:linear-gradient(135deg,#1E3A8A,#1E40AF);color:white;border-radius:12px;padding:16px;text-align:center;margin-bottom:16px;">
          <div style="font-size:11px;opacity:0.7;margin-bottom:4px;">FÓRMULA WSJF AXISUS</div>
          <div style="font-size:18px;font-weight:800;">WSJF Final = ((UV + TC + RR) / JS) × Mult. Aderência</div>
          <div style="font-size:11px;opacity:0.7;margin-top:4px;">Mult. Aderência: 1,0 (causa raiz) · 0,5 (sintoma)</div>
        </div>
        ${[
          { comp:'User Value (UV)', cor:'#0F6E56', desc:'Valor entregue ao cliente. Financeiro, operacional, estratégico. Refere-se ao gap da métrica-alvo de T03.' },
          { comp:'Time Criticality (TC)', cor:'#1E40AF', desc:'Urgência temporal. Custo de atraso. Quanto mais cedo implementado, mais valor é gerado.' },
          { comp:'Risk Reduction (RR)', cor:'#6B21A8', desc:'Oportunidades / riscos eliminados além do problema principal. Benefícios colaterais.' },
          { comp:'Job Size (JS) — divisor', cor:'#B45309', desc:'Tamanho da implementação. Esforço, complexidade, pessoas envolvidas, prazo. Maior JS penaliza.' },
        ].map(c => `
          <div style="display:flex;gap:10px;margin-bottom:10px;">
            <div style="width:3px;background:${c.cor};border-radius:99px;flex-shrink:0;"></div>
            <div><div style="font-size:12px;font-weight:700;color:${c.cor};">${c.comp}</div><div style="font-size:12px;color:var(--text-secondary);">${c.desc}</div></div>
          </div>
        `).join('')}
        <div style="background:#FEF3C7;border-radius:10px;padding:12px;margin-top:12px;">
          <div style="font-size:12px;font-weight:700;color:#92400E;margin-bottom:4px;">Adaptação AXISUS — Multiplicador de Aderência</div>
          <div style="font-size:12px;color:#92400E;">Alternativas que tratam apenas sintoma são penalizadas em 50%. Isso força a recomendação de soluções que resolvem definitivamente o problema — não apenas aliviam a dor temporariamente.</div>
        </div>
        <div style="background:var(--surface-2);border-radius:10px;padding:10px;margin-top:10px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:4px;">Escala Fibonacci</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">${FIBONACCI.map(v => `<span style="padding:4px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-weight:700;">${v}</span>`).join('')}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Escala não linear que força decisões discretas e evita falsa precisão de valores livres.</div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal()">Fechar</button></div>
    </div>
  `);
}

function bindT07Events() {}

// ═══════════════════════════════════════════════════════════
// T08 — 5W2H EXPANDIDO + RISCOS + KPIs
// ═══════════════════════════════════════════════════════════

// T08 ACOES — caso Petshop Beta (AI Sprint adequação v2)
const T08_ACOES = [
  // F1 — Curadoria do Catálogo (pré-requisito para a IA)
  { id:'1.1', frente:'F1', titulo:'Auditoria do catálogo: mapear % de SKUs sem atributos de complementaridade', who:'Andrea Santos (Catálogo) + Eduardo (Squad)', when:'Sem 1', how:'Exportar CSV Shopify + análise de campos vazios', how_much:'R$ 0 / 8h', where:'Shopify Admin + planilha', why:'Confirmar baseline antes de definir escopo da curadoria', dependencias:'—', status:'concluida' },
  { id:'1.2', frente:'F1', titulo:'Definir taxonomia de complementaridade por categoria de pet (raça, porte, necessidade)', who:'Andrea Santos + Squad AXISUS', when:'Sem 1-2', how:'Workshop de 4h + documento de taxonomia', how_much:'R$ 0 / 12h', where:'Remoto + Shopify', why:'Catálogo precisa de estrutura antes de dados', dependencias:'1.1', status:'concluida' },
  { id:'1.3', frente:'F1', titulo:'Sprint de curadoria: mapear relações de complementaridade nos top 500 SKUs (80% do GMV)', who:'Andrea Santos + freelancer de catálogo', when:'Sem 2-4', how:'Planilha de curadoria com IA de suporte (GPT-4o para sugerir relações)', how_much:'R$ 8.000 / 120h', where:'Shopify Admin', why:'Top 500 SKUs cobrem 80% dos pedidos — impacto imediato', dependencias:'1.2', status:'em_andamento' },
  { id:'1.4', frente:'F1', titulo:'Criar campo "produtos_complementares" obrigatório no formulário de cadastro Shopify', who:'Dev full-stack (Daniel + TI)', when:'Sem 3', how:'Shopify metafields customizados', how_much:'R$ 2.000 / 8h', where:'Shopify Admin', why:'Garantir que novos produtos já entrem com a estrutura correta', dependencias:'1.2', status:'pendente' },
  { id:'1.5', frente:'F1', titulo:'Expandir curadoria para os 2.000 SKUs restantes de alta relevância', who:'Andrea Santos + time de catálogo', when:'Sem 5-8', how:'Processo recorrente (4h/semana) usando IA para sugerir relações', how_much:'R$ 0 / 64h', where:'Shopify Admin', why:'Ampliar cobertura da IA progressivamente', dependencias:'1.3', status:'pendente' },
  // F2 — RAG: construção da base vetorizada
  { id:'2.1', frente:'F2', titulo:'Processar histórico de 12 meses de pedidos e gerar embeddings de co-compra', who:'Dev full-stack (Daniel)', when:'Sem 5', how:'Script Python + OpenAI Embeddings API + Supabase pgvector', how_much:'R$ 500 / 16h', where:'Supabase', why:'Base vetorizada é o coração do RAG de recomendação', dependencias:'1.3', status:'pendente' },
  { id:'2.2', frente:'F2', titulo:'Desenvolver endpoint de recomendação RAG (top-5 produtos para dado carrinho)', who:'Dev full-stack (Daniel)', when:'Sem 5-6', how:'API Node/Python + query pgvector + ranqueamento por relevância', how_much:'R$ 3.000 / 24h', where:'Supabase + Vercel', why:'API que o Shopify vai consumir em tempo real', dependencias:'2.1', status:'pendente' },
  { id:'2.3', frente:'F2', titulo:'Integrar endpoint de recomendação no checkout Shopify (widget "Clientes também levaram")', who:'Dev full-stack (Daniel)', when:'Sem 6-7', how:'Shopify Theme + Liquid template + API call', how_much:'R$ 5.000 / 32h', where:'Shopify storefront', why:'Ponto de conversão: produto certo na hora certa', dependencias:'2.2', status:'pendente' },
  { id:'2.4', frente:'F2', titulo:'A/B test: 50% tráfego com recomendação RAG vs 50% sem (4 semanas)', who:'Daniel Oliveira + Pedro Silva (Marketing)', when:'Sem 8-12', how:'Shopify nativo A/B + Google Analytics 4', how_much:'R$ 0 / 8h', where:'Shopify + GA4', why:'Validar impacto antes de roll-out total', dependencias:'2.3', status:'pendente' },
  // F3 — KPIs e acompanhamento
  { id:'3.1', frente:'F3', titulo:'Configurar dashboard de cross-sell em tempo real (GA4 + Shopify Analytics)', who:'Pedro Silva (Marketing) + Dev', when:'Sem 7', how:'Google Looker Studio + Shopify Webhooks', how_much:'R$ 0 / 8h', where:'Looker Studio', why:'Visibilidade do impacto da IA em tempo real', dependencias:'2.3', status:'pendente' },
  { id:'3.2', frente:'F3', titulo:'Treinamento do time: como interpretar dados de cross-sell e ajustar curadoria', who:'Eduardo (Squad) + Andrea + Daniel', when:'Sem 9', how:'Sessão de 2h com dashboard ao vivo', how_much:'R$ 0 / 8h', where:'Remoto', why:'Time autônomo para manutenção do sistema após o sprint', dependencias:'3.1', status:'pendente' },
  { id:'3.3', frente:'F3', titulo:'Roll-out completo + entrega do A3 ao CEO e CFO', who:'Eduardo (Squad Líder)', when:'Sem 10', how:'Reunião formal de entrega + A3 digital + PDF anonimizado', how_much:'R$ 0 / 4h', where:'Reunião Petshop Beta', why:'Encerramento formal do AI Sprint', dependencias:'todos', status:'pendente' },
];

const T08_RISCOS = [
  { id:'R01', descricao:'CFO bloquear aprovação de orçamento antes do início', categoria:'stakeholder', prob:4, imp:5, mitigacao:'Apresentar simulação de ROI conservador (8% → 20% cross-sell = +R$110k/mês) antes da aprovação. Mostrar payback em <30 dias.', contingencia:'Se bloqueio persistir: iniciar F1 (curadoria, custo zero) enquanto negociação acontece. Demonstrar resultado parcial antes de pedir aprovação de F2.', responsavel:'Eduardo (Squad)' },
  { id:'R02', descricao:'Time de catálogo não ter capacidade para o sprint de curadoria', categoria:'pessoas', prob:3, imp:5, mitigacao:'Contratar freelancer para suporte à curadoria (R$8k já no orçamento). Andrea supervisiona, não executa tudo.', contingencia:'Reducir escopo do sprint para top 200 SKUs (em vez de 500) na primeira iteração. Ampliar nas semanas 5-8.', responsavel:'Andrea Santos' },
  { id:'R03', descricao:'Dev full-stack (Daniel) não ter disponibilidade durante o sprint', categoria:'pessoas', prob:3, imp:4, mitigacao:'Alinhar dedicação do dev antes do início. F1 (curadoria) não requer dev — buffer de 4 semanas para F2.', contingencia:'Contratar dev freelance para integração Shopify. R$5-8k adicional. Prazo estende 2 semanas.', responsavel:'Daniel Oliveira + Eduardo' },
  { id:'R04', descricao:'Qualidade das recomendações RAG abaixo do esperado no A/B test', categoria:'execucao', prob:3, imp:4, mitigacao:'A/B test permite detecção precoce. Taxa de cliques < 5% aciona revisão do modelo antes do roll-out.', contingencia:'Ajuste de parâmetros do RAG (número de vizinhos, threshold de similaridade). Se não melhorar, fallback para regras manuais curadas.', responsavel:'Dev + Eduardo' },
  { id:'R05', descricao:'Custo de tokens API Supabase/OpenAI escalar além do projetado', categoria:'financeiro', prob:2, imp:3, mitigacao:'Implementar cache de embeddings para produtos já processados. Custo por embedding só ocorre quando catálogo muda.', contingencia:'Cap mensal no Supabase (R$800/mês conforme orçado). Alertas automáticos se ultrapassar 80% do cap.', responsavel:'Dev' },
  { id:'R06', descricao:'Plataforma Shopify limitando customizações do checkout', categoria:'tecnico', prob:2, imp:4, mitigacao:'Shopify Plus já verificado — permite customizações avançadas no checkout.', contingencia:'Se limitação específica aparecer: widget na página de produto (pré-checkout) como alternativa.', responsavel:'Dev' },
];

const T08_KPIS = [
  { id:'K01', nome:'Taxa de cross-sell (% pedidos com >1 categoria)', tipo:'resultado', unidade:'%', baseline:8, a30:8, a60:12, a90:20, a365:32, freq:'Semanal', fonte:'Shopify Analytics + GA4', responsavel:'Daniel Oliveira', icon:'chart' },
  { id:'K02', nome:'Ticket médio por pedido', tipo:'resultado', unidade:'BRL', baseline:80, a30:80, a60:90, a90:105, a365:130, freq:'Semanal', fonte:'Shopify Analytics', responsavel:'Daniel Oliveira', icon:'money' },
  { id:'K03', nome:'% clientes que veem produtos complementares por sessão', tipo:'direcionador', unidade:'%', baseline:11, a30:15, a60:35, a90:55, a365:62, freq:'Semanal', fonte:'GA4 — Evento product_impression complementar', responsavel:'Pedro Silva', icon:'eye' },
  { id:'K04', nome:'Taxa de cliques no widget de recomendação (CTR)', tipo:'direcionador', unidade:'%', baseline:3.2, a30:3.2, a60:6, a90:9, a365:12, freq:'Diária', fonte:'GA4 + Shopify Events', responsavel:'Pedro Silva', icon:'check' },
  { id:'K05', nome:'NPS de clientes (e-commerce)', tipo:'resultado', unidade:'NPS', baseline:52, a30:52, a60:55, a90:58, a365:65, freq:'Mensal', fonte:'Pesquisa NPS mensal', responsavel:'Daniel Oliveira', icon:'star' },
];

function renderT08() {
  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      <!-- Toolbar -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t07')">${icon('arrow_right',14)}</button>
        <div style="flex:1;">
          <div style="font-size:15px;font-weight:800;">T08 — Plano de Implementação (5W2H + Riscos + KPIs)</div>
          <div style="font-size:11px;color:var(--text-muted);">Plano sério tem três dimensões: ações concretas, riscos mapeados, indicadores de acompanhamento. Sem as três, é boa intenção.</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="showT08AISuggest()">${icon('ai',13)} Sugerir com IA</button>
        <button class="btn btn-primary btn-sm" onclick="requestGateDecide()">
          ${icon('send',14)} Gate Decide
        </button>
      </div>

      <!-- Contexto herdado -->
      <div style="background:linear-gradient(135deg,#4A5A56,#334155);color:white;padding:8px 20px;flex-shrink:0;display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
        <div>
          <span style="font-size:10px;opacity:0.6;">Alternativa Escolhida (T07)</span>
          <div style="font-size:13px;font-weight:800;">A8 — Híbrida: Curadoria Catálogo + RAG · WSJF 3,80 (#1)</div>
        </div>
        <div style="height:32px;width:1px;background:rgba(255,255,255,0.15);flex-shrink:0;"></div>
        <div style="font-size:12px;font-weight:500;opacity:0.85;">R$ 24.000 + R$ 800/mês · 2 meses (sprint) · 13 ações · 3 frentes</div>
        <div style="margin-left:auto;display:flex;gap:12px;">
          ${[['13','Ações 5W2H'],['6','Riscos'],['5','KPIs']].map(([n,l]) => `<div style="text-align:center;"><div style="font-size:18px;font-weight:900;">${n}</div><div style="font-size:10px;opacity:0.6;">${l}</div></div>`).join('')}
        </div>
      </div>

      <!-- Abas -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:0 20px;flex-shrink:0;">
        <div class="tabs" data-group="t08">
          <button class="tab-btn active" data-tab="acoes">📋 5W2H (${T08_ACOES.length} ações)</button>
          <button class="tab-btn" data-tab="riscos">⚠️ Riscos (${T08_RISCOS.length})</button>
          <button class="tab-btn" data-tab="kpis">📊 KPIs (${T08_KPIS.length})</button>
        </div>
      </div>

      <!-- Conteúdo das abas -->
      <div style="flex:1;overflow-y:auto;padding:20px;background:var(--surface-2);">

        <!-- ABA 1: 5W2H -->
        <div class="tab-content" data-group="t08" data-tab="acoes">
          ${renderT08Acoes()}
        </div>

        <!-- ABA 2: Riscos -->
        <div class="tab-content hidden" data-group="t08" data-tab="riscos">
          ${renderT08Riscos()}
        </div>

        <!-- ABA 3: KPIs -->
        <div class="tab-content hidden" data-group="t08" data-tab="kpis">
          ${renderT08KPIs()}
        </div>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// ABA 5W2H
// ─────────────────────────────────────────────────────────────
function renderT08Acoes() {
  const frentes = { F1: { label: 'F1 — Gestão de Manutenção (A1)', color: '#0F6E56', custo: 'R$ 240k', prazo: '6 meses' }, F2: { label: 'F2 — Setup SMED (A2)', color: '#5DCAA5', custo: 'R$ 80k', prazo: '4 meses' }, F3: { label: 'F3 — TPM (A3)', color: '#1E40AF', custo: 'R$ 180k', prazo: '8 meses' }, F4: { label: 'F4 — Integração e KPIs', color: '#6B21A8', custo: 'R$ 0', prazo: '12 meses' } };
  const stMap = { concluida: { cls:'badge-green', l:'Concluída' }, em_andamento: { cls:'badge-blue', l:'Em andamento' }, pendente: { cls:'badge-gray', l:'Pendente' } };

  const totalCusto = 500000;
  const acoesPendentes = T08_ACOES.filter(a => a.status === 'pendente').length;

  return `
    <div style="margin-bottom:14px;display:flex;gap:12px;flex-wrap:wrap;">
      ${Object.entries(frentes).map(([k,f]) => {
        const acoes = T08_ACOES.filter(a => a.frente === k);
        const done = acoes.filter(a => a.status === 'concluida').length;
        return `
          <div style="flex:1;min-width:180px;background:white;border-radius:10px;padding:12px;border-left:4px solid ${f.color};">
            <div style="font-size:12px;font-weight:700;color:${f.color};">${f.label}</div>
            <div style="font-size:11px;color:var(--text-muted);">${f.custo} · ${f.prazo} · ${acoes.length} ações</div>
            <div class="progress-bar mt-2">
              <div class="progress-fill" style="width:${(done/acoes.length*100).toFixed(0)}%;background:${f.color};"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <button class="btn btn-secondary btn-sm mb-3" onclick="showToast('Ação adicionada ao plano!')">${icon('plus',13)} Adicionar Ação</button>

    <div style="overflow-x:auto;">
      <table class="table" style="font-size:12px;min-width:1100px;">
        <thead>
          <tr style="background:white;">
            <th style="width:40px;">ID</th>
            <th style="width:60px;">Frente</th>
            <th style="width:260px;">What — O Quê</th>
            <th style="width:120px;">Who — Quem</th>
            <th style="width:80px;">When — Quando</th>
            <th style="width:80px;">How Much — Quanto</th>
            <th style="width:120px;">Where — Onde</th>
            <th style="width:80px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${T08_ACOES.map(a => {
            const frente = frentes[a.frente];
            const st = stMap[a.status] || stMap.pendente;
            return `
              <tr style="${a.status === 'concluida' ? 'opacity:0.6;' : ''}">
                <td style="font-size:11px;font-weight:700;color:${frente?.color || '#666'};">${a.id}</td>
                <td><span class="badge" style="background:${frente?.color || '#666'}20;color:${frente?.color || '#666'};font-size:10px;">${a.frente}</span></td>
                <td>
                  <div style="font-weight:600;">${a.titulo}</div>
                  ${a.dependencias !== '—' ? `<div style="font-size:10px;color:var(--text-muted);">↩ ${a.dependencias}</div>` : ''}
                </td>
                <td style="font-size:11px;">${a.who}</td>
                <td style="font-size:11px;font-weight:600;">${a.when}</td>
                <td style="font-size:11px;">${a.how_much}</td>
                <td style="font-size:11px;">${a.where}</td>
                <td><span class="badge ${st.cls}" style="font-size:10px;">${st.l}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
        <tfoot>
          <tr style="background:var(--surface-2);font-weight:700;">
            <td colspan="5" style="font-size:12px;">TOTAL: ${T08_ACOES.length} ações · ${acoesPendentes} pendentes</td>
            <td style="font-size:12px;">R$ 500.000</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Gantt simplificado -->
    <div class="card mt-4">
      <div style="font-size:13px;font-weight:700;margin-bottom:12px;">Cronograma por Frente (Gantt)</div>
      ${Object.entries(frentes).map(([k, f]) => {
        const semanas = { F1:[1,26], F2:[1,16], F3:[9,34], F4:[9,52] }[k] || [1,12];
        const pct1 = ((semanas[0] - 1) / 52 * 100).toFixed(1);
        const pctW = ((semanas[1] - semanas[0]) / 52 * 100).toFixed(1);
        return `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="width:160px;font-size:11px;font-weight:600;color:${f.color};">${k}</div>
            <div style="flex:1;height:22px;background:var(--surface-3);border-radius:99px;position:relative;">
              <div style="position:absolute;left:${pct1}%;width:${pctW}%;height:100%;background:${f.color};border-radius:99px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:10px;color:white;font-weight:600;white-space:nowrap;overflow:hidden;padding:0 6px;">${f.prazo}</span>
              </div>
            </div>
            <div style="width:60px;font-size:11px;color:var(--text-muted);text-align:right;">${f.custo}</div>
          </div>
        `;
      }).join('')}
      <div style="display:flex;justify-content:space-between;margin-top:4px;padding:0 170px 0 0;">
        <span style="font-size:10px;color:var(--text-muted);">Sem 1</span>
        <span style="font-size:10px;color:var(--text-muted);">Mês 3</span>
        <span style="font-size:10px;color:var(--text-muted);">Mês 6</span>
        <span style="font-size:10px;color:var(--text-muted);">Mês 8</span>
        <span style="font-size:10px;color:var(--text-muted);">Mês 12</span>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// ABA RISCOS
// ─────────────────────────────────────────────────────────────
function renderT08Riscos() {
  const catColors = { stakeholder:'#EF4444', pessoas:'#F59E0B', fornecedor:'#6366F1', execucao:'#3B82F6' };

  // Heatmap 5x5
  const cells = [];
  for (let imp = 5; imp >= 1; imp--) {
    for (let prob = 1; prob <= 5; prob++) {
      const score = prob * imp;
      const bg = score >= 20 ? '#FEE2E2' : score >= 15 ? '#FEF3C7' : score >= 9 ? '#FFFBEB' : '#F0FDF4';
      const border = score >= 20 ? '#EF4444' : score >= 15 ? '#F59E0B' : score >= 9 ? '#FCD34D' : '#A7F3D0';
      const riscos = T08_RISCOS.filter(r => r.prob === prob && r.imp === imp);
      cells.push(`
        <div style="position:relative;width:52px;height:52px;background:${bg};border:1.5px solid ${border};border-radius:6px;display:flex;align-items:center;justify-content:center;flex-direction:column;">
          <span style="font-size:10px;font-weight:700;color:${score >= 15 ? '#92400E' : '#047857'};">${score}</span>
          ${riscos.map(r => `<div style="width:16px;height:16px;border-radius:50%;background:${catColors[r.categoria] || '#666'};border:2px solid white;margin:1px;display:flex;align-items:center;justify-content:center;" title="${r.id}: ${r.descricao}"><span style="font-size:8px;color:white;font-weight:800;">${r.id.replace('R','')}</span></div>`).join('')}
        </div>
      `);
    }
  }

  return `
    <div class="grid-2" style="gap:20px;align-items:start;">
      <!-- Heatmap -->
      <div class="card">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px;">Heatmap de Riscos (Probabilidade × Impacto)</div>
        <div style="display:flex;gap:4px;align-items:flex-end;margin-bottom:4px;">
          <div style="width:52px;text-align:center;font-size:10px;color:var(--text-muted);writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);height:260px;display:flex;align-items:center;">← Impacto →</div>
          <div>
            ${[5,4,3,2,1].map(imp => `
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:4px;">
                <span style="width:12px;font-size:10px;color:var(--text-muted);text-align:right;">${imp}</span>
                ${[1,2,3,4,5].map(prob => {
                  const score = prob * imp;
                  const bg = score >= 20 ? '#FEE2E2' : score >= 15 ? '#FEF3C7' : score >= 9 ? '#FFFBEB' : '#F0FDF4';
                  const border = score >= 20 ? '#EF4444' : score >= 15 ? '#F59E0B' : score >= 9 ? '#FCD34D' : '#A7F3D0';
                  const riscos = T08_RISCOS.filter(r => r.prob === prob && r.imp === imp);
                  return `
                    <div style="width:52px;height:52px;background:${bg};border:1.5px solid ${border};border-radius:6px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1px;position:relative;">
                      <span style="position:absolute;top:2px;right:4px;font-size:9px;font-weight:700;color:${score >= 15 ? '#92400E' : '#047857'};">${score}</span>
                      ${riscos.map(r => `<div style="width:16px;height:16px;border-radius:50%;background:${catColors[r.categoria] || '#666'};border:1px solid white;display:flex;align-items:center;justify-content:center;" title="${r.id}: ${r.descricao}"><span style="font-size:8px;color:white;font-weight:900;">${r.id.replace('R0','')}</span></div>`).join('')}
                    </div>
                  `;
                }).join('')}
              </div>
            `).join('')}
            <div style="display:flex;gap:4px;margin-top:4px;padding-left:16px;">
              ${[1,2,3,4,5].map(p => `<div style="width:52px;text-align:center;font-size:10px;color:var(--text-muted);">${p}</div>`).join('')}
            </div>
            <div style="text-align:center;margin-top:4px;font-size:10px;color:var(--text-muted);padding-left:16px;">← Probabilidade →</div>
          </div>
        </div>
        <!-- Legenda categorias -->
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${Object.entries(catColors).map(([k,c]) => `<div style="display:flex;align-items:center;gap:4px;"><div style="width:10px;height:10px;border-radius:50%;background:${c};"></div><span style="font-size:10px;">${k}</span></div>`).join('')}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-size:10px;color:var(--text-muted);">
          <span style="padding:2px 6px;background:#FEE2E2;border-radius:4px;border:1px solid #EF4444;">≥20 Crítico</span>
          <span style="padding:2px 6px;background:#FEF3C7;border-radius:4px;border:1px solid #F59E0B;">15-19 Alto</span>
          <span style="padding:2px 6px;background:#FFFBEB;border-radius:4px;border:1px solid #FCD34D;">9-14 Médio</span>
          <span style="padding:2px 6px;background:#F0FDF4;border-radius:4px;border:1px solid #A7F3D0;">≤8 Baixo</span>
        </div>
      </div>

      <!-- Sumário riscos críticos -->
      <div>
        <div class="alert alert-danger mb-3" style="font-size:12px;">
          ${icon('alert',14)} <strong>${T08_RISCOS.filter(r => r.prob * r.imp >= 15).length} riscos com score ≥ 15</strong> exigem plano de contingência preenchido.
        </div>
        ${T08_RISCOS.filter(r => r.prob * r.imp >= 15).map(r => {
          const score = r.prob * r.imp;
          return `
            <div style="border:1px solid ${score >= 20 ? '#EF4444' : '#F59E0B'};background:${score >= 20 ? '#FEF2F2' : '#FFFBEB'};border-radius:10px;padding:10px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <span style="font-size:11px;font-weight:800;color:${score >= 20 ? '#991B1B' : '#92400E'};">${r.id}</span>
                <span style="font-size:10px;">Prob ${r.prob} × Imp ${r.imp} =</span>
                <span style="font-size:13px;font-weight:900;color:${score >= 20 ? '#EF4444' : '#F59E0B'};">${score}</span>
                <span class="badge" style="background:${catColors[r.categoria]}20;color:${catColors[r.categoria]};font-size:10px;">${r.categoria}</span>
              </div>
              <div style="font-size:12px;font-weight:600;margin-bottom:4px;">${r.descricao}</div>
              <div style="font-size:11px;color:var(--text-secondary);">🛡️ ${r.mitigacao.substring(0, 80)}...</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Tabela de riscos -->
    <div class="card mt-4" style="padding:0;overflow:hidden;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:13px;font-weight:700;">Matriz de Riscos Detalhada</div>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Risco adicionado!')">${icon('plus',13)} Adicionar Risco</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="table" style="font-size:12px;min-width:900px;">
          <thead>
            <tr><th>ID</th><th>Risco</th><th>Cat.</th><th style="text-align:center;">Prob</th><th style="text-align:center;">Imp</th><th style="text-align:center;">Score</th><th style="width:200px;">Plano de Mitigação</th><th>Resp.</th></tr>
          </thead>
          <tbody>
            ${T08_RISCOS.sort((a,b) => (b.prob*b.imp)-(a.prob*a.imp)).map(r => {
              const score = r.prob * r.imp;
              const scoreCls = score >= 20 ? 'badge-red' : score >= 15 ? 'badge-yellow' : score >= 9 ? 'badge-yellow' : 'badge-green';
              return `
                <tr>
                  <td style="font-weight:700;">${r.id}</td>
                  <td>
                    <div style="font-weight:600;">${r.descricao}</div>
                    ${score >= 15 ? `<div style="font-size:10px;color:#92400E;">🚨 Contingência: ${r.contingencia?.substring(0,60)}...</div>` : ''}
                  </td>
                  <td><span class="badge" style="background:${catColors[r.categoria]}20;color:${catColors[r.categoria]};font-size:10px;">${r.categoria}</span></td>
                  <td style="text-align:center;">${r.prob}</td>
                  <td style="text-align:center;">${r.imp}</td>
                  <td style="text-align:center;"><span class="badge ${scoreCls}">${score}</span></td>
                  <td style="font-size:11px;">${r.mitigacao.substring(0,70)}...</td>
                  <td style="font-size:11px;">${r.responsavel}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// ABA KPIs
// ─────────────────────────────────────────────────────────────
function renderT08KPIs() {
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-bottom:20px;">
      ${T08_KPIS.map(k => {
        const isInv = k.inverter;
        const targets = [k.a30, k.a60, k.a90, k.a365];
        const maxV = isInv ? k.baseline : Math.max(...targets, k.baseline);
        const minV = isInv ? Math.min(...targets) : k.baseline;
        const tipoColor = k.tipo === 'resultado' ? '#0F6E56' : '#1E40AF';

        return `
          <div class="card">
            <div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:10px;">
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                  <span class="badge" style="background:${tipoColor}20;color:${tipoColor};font-size:10px;">${k.tipo}</span>
                  <span style="font-size:10px;color:var(--text-muted);">${k.freq}</span>
                </div>
                <div style="font-size:13px;font-weight:700;">${k.nome}</div>
                <div style="font-size:11px;color:var(--text-muted);">${k.responsavel} · ${k.fonte}</div>
              </div>
              <div style="background:${tipoColor};border-radius:8px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${icon(k.icon, 18, 'white')}
              </div>
            </div>

            <!-- Sparkline de metas -->
            <div style="display:flex;align-items:flex-end;gap:6px;height:60px;margin-bottom:8px;position:relative;">
              ${[k.baseline, k.a30, k.a60, k.a90, k.a365].map((v, i) => {
                const labels = ['Agora','30d','60d','90d','12m'];
                const range = Math.abs(maxV - minV) || 1;
                const pct = isInv ? ((k.baseline - v) / range * 100 + 20) : ((v - minV) / range * 100 + 20);
                const clampedPct = Math.min(100, Math.max(20, pct));
                const isBase = i === 0;
                const barColor = isBase ? '#CBD5E1' : tipoColor;
                return `
                  <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;">
                    <span style="font-size:9px;color:${isBase ? 'var(--text-muted)' : tipoColor};font-weight:700;">${v}${k.unidade === '%' || k.unidade === '%prev' ? '%' : ''}</span>
                    <div style="width:100%;background:${barColor};border-radius:4px 4px 0 0;height:${clampedPct * 0.55}px;opacity:${isBase ? 0.4 : 1};transition:height 0.4s;"></div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="display:flex;gap:6px;">
              ${['Baseline','30d','60d','90d','12m'].map((l,i) => `<div style="flex:1;text-align:center;font-size:9px;color:var(--text-muted);">${l}</div>`).join('')}
            </div>

            <!-- Gap baseline → meta final -->
            <div style="margin-top:10px;background:var(--surface-2);border-radius:8px;padding:8px;display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:11px;">
                <span style="color:var(--text-muted);">Baseline: </span>
                <strong>${k.baseline}${k.unidade.includes('%') ? '%' : ' ' + k.unidade}</strong>
              </div>
              <div style="font-size:18px;color:var(--text-muted);">→</div>
              <div style="font-size:11px;">
                <span style="color:var(--text-muted);">Meta 12m: </span>
                <strong style="color:${tipoColor};">${k.a365}${k.unidade.includes('%') ? '%' : ' ' + k.unidade}</strong>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12px;font-weight:800;color:${tipoColor};">
                  ${isInv ? '-' : '+'}${Math.abs(k.a365 - k.baseline)}${k.unidade.includes('%') ? 'p.p.' : ' ' + k.unidade}
                </div>
                <div style="font-size:9px;color:var(--text-muted);">melhoria</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Tabela consolidada -->
    <div class="card" style="padding:0;overflow:hidden;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:13px;font-weight:700;">KPIs — Metas por Marco</div>
        <button class="btn btn-secondary btn-sm" onclick="showToast('KPI adicionado!')">${icon('plus',13)} Adicionar KPI</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="table" style="font-size:12px;min-width:700px;">
          <thead>
            <tr><th>ID</th><th>KPI</th><th>Tipo</th><th style="text-align:center;">Baseline</th><th style="text-align:center;">30 dias</th><th style="text-align:center;">60 dias</th><th style="text-align:center;">90 dias</th><th style="text-align:center;background:#F0FDF4;">12 meses</th><th>Responsável</th></tr>
          </thead>
          <tbody>
            ${T08_KPIS.map(k => {
              const tipoColor = k.tipo === 'resultado' ? '#0F6E56' : '#1E40AF';
              const fmt = v => `${v}${k.unidade.includes('%') ? '%' : ' ' + k.unidade}`;
              return `
                <tr>
                  <td style="font-weight:700;">${k.id}</td>
                  <td><div style="font-weight:600;">${k.nome}</div><div style="font-size:10px;color:var(--text-muted);">${k.fonte}</div></td>
                  <td><span class="badge" style="background:${tipoColor}20;color:${tipoColor};font-size:10px;">${k.tipo}</span></td>
                  <td style="text-align:center;">${fmt(k.baseline)}</td>
                  <td style="text-align:center;color:#1E40AF;font-weight:600;">${fmt(k.a30)}</td>
                  <td style="text-align:center;color:#047857;font-weight:600;">${fmt(k.a60)}</td>
                  <td style="text-align:center;color:#065F46;font-weight:600;">${fmt(k.a90)}</td>
                  <td style="text-align:center;background:#F0FDF4;font-weight:800;color:${tipoColor};">${fmt(k.a365)}</td>
                  <td style="font-size:11px;">${k.responsavel}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="alert alert-info mt-4" style="font-size:12px;">
      ${icon('eye',13)} K01 (OEE) conecta-se diretamente com a métrica-alvo de T03 (OEE 18% → 50%+). K02 e K03 são direcionadores que predizem o OEE — se MTBF e razão preventiva/corretiva melhoram, OEE melhora. Monitorar os três conjuntamente.
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// GATE DECIDE
// ─────────────────────────────────────────────────────────────
function requestGateDecide() {
  const riscosCriticos = T08_RISCOS.filter(r => r.prob * r.imp >= 20);
  const riscosAlto     = T08_RISCOS.filter(r => r.prob * r.imp >= 15);

  showModal(`
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div class="modal-title">Solicitar Gate Decide ao Hub Central</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4">${icon('check',14)} Fase Decide completa. T07 (WSJF) e T08 (5W2H+Riscos+KPIs) prontos.</div>

        <div style="background:var(--surface-2);border-radius:10px;padding:14px;font-size:12px;margin-bottom:14px;">
          <div class="font-semibold mb-3">Checklist de Revisão (Hub Central):</div>
          ${[
            ['Coerência T05→T06→T07: alternativa vencedora trata causa raiz validada', true],
            ['Cálculo WSJF AXISUS correto (verificação aritmética)', true],
            [`Plano 5W2H com ${T08_ACOES.length} ações (mínimo 8)`, T08_ACOES.length >= 8],
            [`${T08_RISCOS.length} riscos mapeados (mínimo 6)`, T08_RISCOS.length >= 6],
            [`${riscosAlto.length} riscos alto/crítico com plano de contingência`, true],
            [`${T08_KPIS.length} KPIs definidos (mínimo 4) com marcos 30/60/90`, T08_KPIS.length >= 4],
            ['KPIs conectados com métrica-alvo de T03 (OEE)', true],
            ['Custos consistentes entre T07 e T08 (R$500k)', true],
          ].map(([item, ok]) => `
            <div class="flex items-center gap-2 mb-2">
              <span>${ok ? '✅' : '⚠️'}</span>
              <span style="${ok ? '' : 'color:var(--gold);font-weight:600;'}">${item}</span>
            </div>
          `).join('')}
        </div>

        <div class="grid-2" style="gap:10px;margin-bottom:12px;">
          <div style="background:#F0FDF4;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:900;color:#065F46;">A8</div>
            <div style="font-size:11px;color:var(--text-muted);">Alternativa escolhida</div>
            <div style="font-size:11px;font-weight:600;color:#065F46;">WSJF 3,62 — #1 de 5</div>
          </div>
          <div style="background:#EFF6FF;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:900;color:#1E40AF;">R$ 500k</div>
            <div style="font-size:11px;color:var(--text-muted);">Investimento</div>
            <div style="font-size:11px;font-weight:600;color:#1E40AF;">Payback estimado: 37 dias</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Comentário para o revisor</label>
          <textarea class="form-textarea" rows="2" placeholder="Pontos de atenção, contexto adicional..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('Gate Decide enviado! Hub Central notificado. Próxima fase: Deliver → T09.')">
          ${icon('send',14)} Enviar para Revisão
        </button>
      </div>
    </div>
  `);
}

function showT08AISuggest() {
  showModal(`
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div class="modal-title">${icon('ai',16)} IA Copiloto — Sugestões para T08</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">Com base em 23 casos similares (gestão de manutenção em manufatura), a IA identificou:</div>
        <div style="margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;">⏱️ Alerta de Prazo</div>
          <div style="background:#FEF3C7;border-radius:8px;padding:10px;font-size:12px;color:#92400E;">Em casos parecidos, a Frente F1 (contratação) tomou em média 9 meses, não 6. Você está estimando 6 meses — considere adicionar 30% de buffer.</div>
        </div>
        <div style="margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;">⚠️ Risco Não Mapeado</div>
          <div style="background:#FEF3C7;border-radius:8px;padding:10px;font-size:12px;color:#92400E;">Em 78% dos casos com stakeholder resistente (CFO neste caso), houve tentativa de revisão do orçamento no mês 3. Você tem mitigação para este momento específico?</div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;">📊 KPI Sugerido</div>
          <div style="background:#F0FDF4;border-radius:8px;padding:10px;font-size:12px;color:#065F46;">Adicionar K06: "Taxa de atendimento ao plano preventivo" (% de OMs preventivas executadas no prazo). É o leading indicator mais preciso de MTBF futuro.</div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal()">Fechar</button></div>
    </div>
  `);
}

function bindT08Events() {}
