// ============================================================
// AXISUS — Templates Fase Decide: T07 (WSJF AXISUS) e T08 (5W2H + Riscos + KPIs)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ─────────────────────────────────────────────────────────────
// DADOS T07 — WSJF
// ─────────────────────────────────────────────────────────────
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];

const T07_STATE = {
  selectedId: 'a8',
  scoring: [
    {
      id: 'a1', num: 'A1', titulo: 'Contratar Gestor de Manutenção Sênior',
      categoria: 'organizacional', catColor: '#0F6E56',
      custo: 'R$ 240.000', prazo: '6 meses',
      user_value: 13, time_criticality: 13, risk_reduction: 8, job_size: 13,
      aderencia: true,
      just_uv: 'Entrega valor direto ao tratamento da causa raiz. Alto impacto em OEE mas sozinho não resolve todos os sintomas.',
      just_tc: 'Cada mês sem gestor é mais R$400k perdidos em OEE abaixo do potencial.',
      just_rr: 'Reduz risco de continuidade do problema central mas não elimina sintomas processuais.',
      just_js: 'Recrutamento sênior exige 2m + ramp-up 4m. Moderadamente complexo.',
      just_aderencia: 'A1 trata diretamente a causa raiz validada em T05 — ausência do cargo de gestor de manutenção eliminado em 2022.',
    },
    {
      id: 'a2', num: 'A2', titulo: 'Implementar SMED na Linha Flexográfica',
      categoria: 'processual', catColor: '#5DCAA5',
      custo: 'R$ 80.000', prazo: '4 meses',
      user_value: 8, time_criticality: 13, risk_reduction: 5, job_size: 5,
      aderencia: false,
      just_uv: 'Reduz setup de 75min para 15min — ganho tangível mas não trata causa raiz da manutenção.',
      just_tc: 'Setup demorado impacta capacidade diariamente. Urgência real.',
      just_rr: 'Reduz apenas o risco de perda de capacidade por setup — não endereça manutenção.',
      just_js: 'Metodologia madura. 4 meses com consultoria dedicada.',
      just_aderencia: 'A2 trata sintoma relacionado (setup) e não a causa raiz da ausência de gestão de manutenção. Multiplicador 0,5 aplicado.',
    },
    {
      id: 'a3', num: 'A3', titulo: 'Implementar TPM (Total Productive Maintenance)',
      categoria: 'processual', catColor: '#5DCAA5',
      custo: 'R$ 180.000', prazo: '8 meses',
      user_value: 13, time_criticality: 8, risk_reduction: 5, job_size: 8,
      aderencia: true,
      just_uv: 'TPM trata manutenção preventiva diretamente — alto valor se sustentado pelo gestor de A1.',
      just_tc: 'Urgência moderada — melhora é gradual, não imediata.',
      just_rr: 'Reduz risco de falhas não planejadas mas não resolve ausência de liderança.',
      just_js: 'Mudança cultural significativa. 8 meses. Exige gestor para sustentar.',
      just_aderencia: 'A3 trata manutenção preventiva — componente direto da causa raiz validada em T05.',
    },
    {
      id: 'a4', num: 'A4', titulo: 'Sistema OEE Automatizado com IoT',
      categoria: 'tecnologica', catColor: '#1E3A8A',
      custo: 'R$ 95.000', prazo: '5 meses',
      user_value: 5, time_criticality: 5, risk_reduction: 8, job_size: 8,
      aderencia: false,
      just_uv: 'Traz visibilidade mas não muda a realidade operacional por si só.',
      just_tc: 'Sem urgência crítica — a empresa sobreviveu sem dados automatizados até agora.',
      just_rr: 'Reduz risco de decisões cegas. Viabiliza acompanhamento pós-implementação.',
      just_js: 'Projeto técnico de integração — moderado mas não trivial.',
      just_aderencia: 'A4 trata visibilidade do problema mas não a gestão de manutenção em si. Sintoma.',
    },
    {
      id: 'a8', num: 'A8', titulo: 'Pacote Combinado A1 + A2 + A3 (Híbrida)',
      categoria: 'hibrida', catColor: '#4A5A56',
      custo: 'R$ 500.000', prazo: '8 meses',
      user_value: 21, time_criticality: 13, risk_reduction: 13, job_size: 13,
      aderencia: true,
      just_uv: 'Máximo valor: trata causa raiz (A1) + sintomas principais (A2+A3) simultaneamente. Impacto transformador.',
      just_tc: 'Cada mês de atraso perpetua perda de R$405k/mês em OEE subaproveitado.',
      just_rr: 'Abordagem abrangente: reduz riscos de recaída, riscos operacionais e riscos de capacidade.',
      just_js: 'Maior Job Size pelo escopo combinado — mas custo per R$ de WSJF é o mais baixo.',
      just_aderencia: 'A8 inclui A1 que trata diretamente a causa raiz. Além disso, A3 (TPM) também trata a ausência de plano preventivo identificada como causa raiz secundária.',
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

const T08_ACOES = [
  // F1 — Gestão de Manutenção
  { id:'1.1', frente:'F1', titulo:'Definir perfil ideal e remuneração do Gestor de Manutenção Sênior', who:'RH + Diretor Industrial', when:'Sem 1-2', how:'Benchmark salarial + job description', how_much:'R$ 0 / 16h', where:'Interno', why:'Sem perfil claro, processo seletivo falha', dependencias:'—', status:'concluida' },
  { id:'1.2', frente:'F1', titulo:'Publicar edital em canais especializados (LinkedIn, ABFlexo, indicações)', who:'RH', when:'Sem 2-6', how:'Publicação multi-canal com foco em flexografia', how_much:'R$ 8.000 / 40h', where:'Online', why:'Ampliar pool de candidatos qualificados', dependencias:'1.1', status:'em_andamento' },
  { id:'1.3', frente:'F1', titulo:'Conduzir processo seletivo (3 etapas, ≥5 candidatos)', who:'RH + Diretor Industrial', when:'Sem 4-9', how:'Triagem → entrevista técnica → case prático', how_much:'R$ 12.000 / 60h', where:'Escritório + ERP', why:'Validar competência técnica antes da contratação', dependencias:'1.2', status:'pendente' },
  { id:'1.4', frente:'F1', titulo:'Contratar e conduzir onboarding 90 dias', who:'RH + Diretor', when:'Sem 9-21', how:'Contrato CLT + onboarding estruturado + mentoria AXISUS', how_much:'R$ 200.000 / 480h', where:'Planta Galpão A', why:'Integrar gestor com processos e equipe existentes', dependencias:'1.3', status:'pendente' },
  { id:'1.5', frente:'F1', titulo:'Acompanhar performance e marcos 30/60/90 do novo Gestor', who:'Diretor Industrial', when:'Sem 13-26', how:'Check-in semanal + relatório mensal de KPIs', how_much:'R$ 0 / 60h', where:'Planta', why:'Garantir entrega dos marcos de ramp-up', dependencias:'1.4', status:'pendente' },
  // F2 — SMED
  { id:'2.1', frente:'F2', titulo:'Mapear setup atual com filmagem (operações internas e externas)', who:'Consultoria SMED + Supervisor', when:'Sem 1-2', how:'Filmagem + cronometragem de 5 setups consecutivos', how_much:'R$ 8.000 / 24h', where:'Linha flexo', why:'Linha de base para medir ganho pós-SMED', dependencias:'—', status:'em_andamento' },
  { id:'2.2', frente:'F2', titulo:'Workshop SMED com equipe operacional (separar operações internas/externas)', who:'Consultoria + Operadores', when:'Sem 3', how:'1 dia de workshop prático na linha', how_much:'R$ 15.000 / 16h', where:'Linha flexo', why:'Engajar equipe e gerar adesão às mudanças', dependencias:'2.1', status:'pendente' },
  { id:'2.3', frente:'F2', titulo:'Produzir e instalar kits físicos de setup (gabaritos, carrinhos, etiquetas)', who:'Manutenção + Compras', when:'Sem 4-6', how:'Fabricação interna de gabaritos + compra de carrinho de ferramentas', how_much:'R$ 32.000 / 80h', where:'Linha flexo', why:'Hardware que viabiliza o novo procedimento', dependencias:'2.2', status:'pendente' },
  { id:'2.4', frente:'F2', titulo:'Implementar SOP de setup e validar com meta ≤15 min', who:'Supervisor + Operadores', when:'Sem 7-16', how:'SOP documentado + 30 setups de validação com cronometragem', how_much:'R$ 25.000 / 60h', where:'Linha flexo', why:'Confirmar que a meta foi atingida antes de encerrar frente', dependencias:'2.3', status:'pendente' },
  // F3 — TPM
  { id:'3.1', frente:'F3', titulo:'Diagnóstico de maturidade em manutenção (linha de base TPM)', who:'Gestor de Manutenção (F1) + Consultoria', when:'Mês 3', how:'Auditoria de práticas atuais com checklist TPM', how_much:'R$ 18.000 / 40h', where:'Planta', why:'Saber onde estamos antes de implementar TPM', dependencias:'1.4', status:'pendente' },
  { id:'3.2', frente:'F3', titulo:'Elaborar plano preventivo estruturado (todos os equipamentos linha A)', who:'Gestor de Manutenção', when:'Mês 4', how:'FMEA leve + plano preventivo no sistema', how_much:'R$ 0 / 120h (interno)', where:'ERP manutenção', why:'Core do TPM — sem plano, manutenção é sempre reativa', dependencias:'3.1', status:'pendente' },
  { id:'3.3', frente:'F3', titulo:'Treinamento Autonomous Maintenance (AM) para operadores', who:'Gestor + Consultoria', when:'Mês 4-5', how:'12h de treinamento prático + certificação interna', how_much:'R$ 40.000 / 120h', where:'Planta', why:'Operadores identificam anomalias antes de virar falha', dependencias:'3.2', status:'pendente' },
  { id:'3.4', frente:'F3', titulo:'Implementar reunião semanal de manutenção (planejamento preventivo)', who:'Gestor de Manutenção + Supervisores', when:'Mês 5+', how:'Reunião de 1h toda segunda-feira com pauta estruturada', how_much:'R$ 0 / recorrente', where:'Sala de reuniões Galpão A', why:'Institucionalizar a rotina preventiva', dependencias:'3.2', status:'pendente' },
  { id:'3.5', frente:'F3', titulo:'Validar melhora de MTBF (marco: ≥120h em mês 6)', who:'Gestor + Diretor Industrial', when:'Mês 6', how:'Medição de MTBF nos 30 dias anteriores ao marco', how_much:'R$ 0 / 8h', where:'ERP', why:'Critério de sucesso da frente F3', dependencias:'3.4', status:'pendente' },
  // F4 — Integração
  { id:'4.1', frente:'F4', titulo:'Implementar dashboard OEE (sistema IoT opcional ou manual aprimorado)', who:'TI + Gestor de Manutenção', when:'Mês 2-5', how:'Sensores IoT na linha ou planilha estruturada com coleta diária', how_much:'R$ 0 (manual) ou R$95k (IoT)', where:'Linha flexo + sistemas', why:'Visibilidade real-time do OEE para decisões ágeis', dependencias:'1.4', status:'pendente' },
  { id:'4.2', frente:'F4', titulo:'Revisão geral de KPIs e encaminhamento ao T09 (A3 Expandido)', who:'Consultor AXISUS + Diretor Industrial', when:'Mês 8', how:'Reunião de avaliação de marco final com todos os líderes de frente', how_much:'R$ 0 / 8h', where:'Escritório', why:'Avaliar se o caso está pronto para entrega (Fase Deliver)', dependencias:'todos', status:'pendente' },
];

const T08_RISCOS = [
  { id:'R01', descricao:'Resistência ativa do CFO à contratação do gestor', categoria:'stakeholder', prob:4, imp:5, mitigacao:'Apresentar business case com payback em 60 dias antes da contratação. CFO presente em todas as reuniões de aprovação. Comunicação semanal de marcos financeiros.', contingencia:'Se CFO bloquear após 30 dias: escalar para CEO com acordo de blindagem já assinado (R07). Considerar remuneração variável por resultado para reduzir resistência.', responsavel:'Diretor Industrial' },
  { id:'R02', descricao:'Não encontrar gestor qualificado em 6 meses', categoria:'pessoas', prob:3, imp:5, mitigacao:'Acionar 3 head-hunters em paralelo desde o início. Rede AXISUS pode indicar perfis de casos anteriores.', contingencia:'Plano B: candidato sub-ideal com mentoria externa mensal por 6 meses até contratar o ideal.', responsavel:'RH' },
  { id:'R03', descricao:'Sindicato resistir a mudanças do SMED', categoria:'stakeholder', prob:3, imp:4, mitigacao:'Apresentar SMED como redução de stress operacional (menos correria). Incluir representante sindical nos workshops SMED como observador.', contingencia:'Se resistência formalizada: negociar bônus por adesão com representante sindical. Nunca impor unilateralmente.', responsavel:'RH + Supervisor' },
  { id:'R04', descricao:'Operadores não engajarem com TPM Autonomous Maintenance', categoria:'pessoas', prob:4, imp:3, mitigacao:'Treinamento gamificado com pontuação. Reconhecimento público dos primeiros adotantes. Tempo dedicado durante turno (não horas extras).', contingencia:'Iniciar com piloto voluntário em equipe mais receptiva. Expandir somente após successo do piloto.', responsavel:'Gestor de Manutenção' },
  { id:'R05', descricao:'Atraso na entrega de sensores IoT (F4)', categoria:'fornecedor', prob:2, imp:3, mitigacao:'Pedido com 30 dias de buffer. Fornecedor backup pré-qualificado antes da compra principal.', contingencia:'Operar com planilha manual aprimorada enquanto sensores não chegam — custo zero.', responsavel:'TI + Compras' },
  { id:'R06', descricao:'Conflito de prioridades entre as 3 frentes paralelas', categoria:'execucao', prob:4, imp:4, mitigacao:'PMO leve: 1h/semana de sync entre líderes de frente. Comitê executivo mensal para decisões de prioridade.', contingencia:'Se conflito escalado: Diretor Industrial árbitro final. Sequencializar frentes temporariamente se necessário.', responsavel:'Consultor AXISUS' },
  { id:'R07', descricao:'CEO mudar prioridade antes de concluir (nova "urgência")', categoria:'stakeholder', prob:3, imp:5, mitigacao:'Acordo formal de blindagem por 8 meses, assinado pelo CEO antes do início. Marco financeiro mensal para demonstrar progresso.', contingencia:'Se mudança de prioridade for inevitável: documentar estágio atual e retomar com menor esforço possível.', responsavel:'Diretor Industrial' },
  { id:'R08', descricao:'Performance abaixo do esperado nos primeiros 90 dias gerando dúvida', categoria:'execucao', prob:3, imp:3, mitigacao:'Comunicar curva esperada de adoção ao CEO/CFO no kick-off (resultados a partir do mês 4). Marcos intermediários validados em 30/60/90.', contingencia:'Se questionamento surgir: reunião imediata de contexto com gráfico de curva de adoção esperada vs real.', responsavel:'Consultor AXISUS' },
];

const T08_KPIS = [
  { id:'K01', nome:'OEE linha flexografia', tipo:'resultado', unidade:'%', baseline:18, a30:22, a60:28, a90:36, a365:60, freq:'Diária', fonte:'Sistema OEE / Apontamento', responsavel:'Gerente de Produção', icon:'chart' },
  { id:'K02', nome:'MTBF — tempo médio entre falhas', tipo:'direcionador', unidade:'horas', baseline:47, a30:52, a60:72, a90:120, a365:210, freq:'Semanal', fonte:'ERP Manutenção', responsavel:'Gestor de Manutenção', icon:'tool' },
  { id:'K03', nome:'Razão preventiva/corretiva', tipo:'direcionador', unidade:'%prev', baseline:11, a30:15, a60:30, a90:50, a365:70, freq:'Mensal', fonte:'ERP Manutenção', responsavel:'Gestor de Manutenção', icon:'shield' },
  { id:'K04', nome:'Lead time pedido → entrega', tipo:'resultado', unidade:'dias', baseline:28, a30:26, a60:24, a90:20, a365:15, freq:'Semanal', fonte:'ERP Comercial', responsavel:'Gerente de Operações', icon:'calendar', inverter:true },
  { id:'K05', nome:'% pedidos no prazo (OTD)', tipo:'resultado', unidade:'%', baseline:62, a30:68, a60:75, a90:85, a365:95, freq:'Semanal', fonte:'ERP Comercial', responsavel:'Gerente Comercial', icon:'check' },
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
          <div style="font-size:13px;font-weight:800;">A8 — Pacote Híbrido A1+A2+A3 · WSJF 3,62 (#1)</div>
        </div>
        <div style="height:32px;width:1px;background:rgba(255,255,255,0.15);flex-shrink:0;"></div>
        <div style="font-size:12px;font-weight:500;opacity:0.85;">R$ 500.000 · 8 meses (paralelizado) · 16 ações · 4 frentes</div>
        <div style="margin-left:auto;display:flex;gap:12px;">
          ${[['16','Ações 5W2H'],['8','Riscos'],['5','KPIs']].map(([n,l]) => `<div style="text-align:center;"><div style="font-size:18px;font-weight:900;">${n}</div><div style="font-size:10px;opacity:0.6;">${l}</div></div>`).join('')}
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
