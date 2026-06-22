// ============================================================
// AXISUS — Template Fase Deliver: T09 (A3 Expandido AXISUS)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ─────────────────────────────────────────────────────────────
// ESTADO T09 — modo de exibição
// ─────────────────────────────────────────────────────────────
const T09_STATE = {
  mode: 'edit',   // 'edit' | 'present'
  version: 3,
  signoff: 'pending', // 'pending' | 'signed'
};

// ─────────────────────────────────────────────────────────────
// RENDER PRINCIPAL
// ─────────────────────────────────────────────────────────────
function renderT09() {
  return T09_STATE.mode === 'present' ? renderT09Present() : renderT09Edit();
}

// ═══════════════════════════════════════════════════════════
// MODO EDIÇÃO
// ═══════════════════════════════════════════════════════════
function renderT09Edit() {
  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      <!-- Toolbar -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t08')">${icon('arrow_right',14)}</button>
        <div style="flex:1;min-width:200px;">
          <div style="font-size:15px;font-weight:800;">T09 — A3 Expandido AXISUS</div>
          <div style="font-size:11px;color:var(--text-muted);">Síntese de todo o método em uma página · O documento que o cliente recebe</div>
        </div>

        <!-- Toggle Modo -->
        <div style="display:flex;background:var(--surface-2);border-radius:8px;padding:3px;gap:2px;">
          <button onclick="setT09Mode('edit')"
            style="padding:5px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;background:white;color:var(--primary);box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            ✏️ Edição
          </button>
          <button onclick="setT09Mode('present')"
            style="padding:5px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text-muted);">
            🖼️ Apresentação
          </button>
        </div>

        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="exportA3('pdf')">${icon('download',13)} PDF A3</button>
          <button class="btn btn-secondary btn-sm" onclick="exportA3('png')">${icon('download',13)} PNG</button>
          <button class="btn btn-secondary btn-sm" onclick="exportA3('a4')">${icon('download',13)} A4 Exec.</button>
          <button class="btn btn-secondary btn-sm" onclick="showT09AI()">${icon('ai',13)} IA Revisão</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="requestGateDeliver()">
          ${icon('send',14)} Gate Deliver
        </button>
      </div>

      <!-- Banner modo edição -->
      <div style="background:#EFF6FF;border-bottom:1px solid #BFDBFE;padding:6px 20px;font-size:12px;color:#1E40AF;flex-shrink:0;display:flex;align-items:center;gap:8px;">
        ${icon('eye',14)} Você está editando o A3. Alterações são salvas automaticamente.
        Cada seção indica a origem dos dados (T01–T08) e o que pode ser ajustado.
        <span style="margin-left:auto;color:var(--text-muted);">Versão ${T09_STATE.version} · Auto-salvo</span>
      </div>

      <!-- Grade de seções editáveis -->
      <div style="flex:1;overflow-y:auto;padding:16px;background:var(--surface-2);">

        <!-- Completude -->
        ${renderT09Completude()}

        <!-- Seção 1: Cabeçalho -->
        ${renderEditSection('1', 'Cabeçalho', 'cases + users', renderS1Content(), '#04342C', false)}

        <!-- Linha 2: Diagnóstico (3 colunas) -->
        <div class="grid-3" style="gap:12px;margin-bottom:12px;">
          ${renderEditSection('2', 'Background', 'T01', renderS2Content(), '#065F46', true)}
          ${renderEditSection('3', 'Mapa de Stakeholders', 'T02', renderS3Content(), '#1E40AF', false)}
          ${renderEditSection('4', 'Current State', 'T03', renderS4Content(), '#6B21A8', true)}
        </div>
        <div class="grid-2" style="gap:12px;margin-bottom:12px;">
          ${renderEditSection('5', 'Root Cause Analysis', 'T04', renderS5Content(), '#B45309', false)}
          ${renderEditSection('6', 'Validação Empírica', 'T05', renderS6Content(), '#0891B2', false)}
        </div>

        <!-- Linha 3: Decisão + Plano -->
        <div class="grid-2" style="gap:12px;margin-bottom:12px;">
          ${renderEditSection('7', 'Recomendação Validada Matematicamente', 'T06 + T07', renderS7Content(), '#0F6E56', true)}
          ${renderEditSection('8', 'Plano de Implementação', 'T08', renderS8Content(), '#4A5A56', false)}
        </div>

        <!-- Linha 4: KPIs + Follow-up -->
        <div class="grid-2" style="gap:12px;margin-bottom:12px;">
          ${renderEditSection('9', 'Régua de Acompanhamento (KPIs)', 'T08', renderS9Content(), '#065F46', false)}
          ${renderEditSection('10', 'Follow-up Plan + Sign-off', 'T09', renderS10Content(), '#334155', true)}
        </div>

      </div>
    </div>
  `;
}

function renderEditSection(num, title, origem, content, color, editable) {
  return `
    <div style="background:white;border-radius:12px;border:1px solid var(--border);overflow:hidden;">
      <div style="background:${color};padding:8px 14px;display:flex;align-items:center;gap:8px;">
        <span style="font-size:11px;font-weight:900;color:white;opacity:0.9;">${num}.</span>
        <span style="font-size:12px;font-weight:700;color:white;flex:1;">${title}</span>
        <span style="font-size:10px;color:rgba(255,255,255,0.65);background:rgba(255,255,255,0.15);padding:2px 7px;border-radius:99px;">← ${origem}</span>
        ${editable ? `<span style="font-size:9px;color:rgba(255,255,255,0.7);">✏️ editável</span>` : `<span style="font-size:9px;color:rgba(255,255,255,0.5);">🔒 automático</span>`}
      </div>
      <div style="padding:12px 14px;font-size:12px;">${content}</div>
    </div>
  `;
}

function renderT09Completude() {
  const items = [
    { label:'Background (T01)', ok: true  },
    { label:'Stakeholders (T02)', ok: true  },
    { label:'Current State (T03)', ok: true  },
    { label:'Root Cause (T04)', ok: true  },
    { label:'Validação (T05)', ok: true  },
    { label:'Alternativas (T06)', ok: true  },
    { label:'WSJF (T07)', ok: true  },
    { label:'5W2H + Riscos + KPIs (T08)', ok: true  },
    { label:'Follow-up Plan', ok: true  },
    { label:'Sign-off do cliente', ok: false },
  ];
  const okCount = items.filter(i => i.ok).length;
  const pct = Math.round(okCount / items.length * 100);

  return `
    <div class="card mb-3" style="padding:12px 16px;">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:4px;">Completude do A3: ${okCount}/${items.length} seções (${pct}%)</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;"></div></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${items.map(i => `
            <span class="badge ${i.ok ? 'badge-green' : 'badge-yellow'}" style="font-size:10px;">
              ${i.ok ? '✅' : '⚠️'} ${i.label}
            </span>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm" onclick="setT09Mode('present')">🖼️ Ver A3 Final</button>
      </div>
    </div>
  `;
}

// ─── Conteúdo das seções (modo edição) ───

function renderS1Content() {
  return `
    <div class="grid-2" style="gap:8px;">
      ${[['Código','CASE-2026-0042'],['Cliente','Petshop Beta Comércio Ltda'],['Squad Líder','Eduardo Ricatto (Sênior)'],['Início Sprint','05/05/2026'],['Conclusão A3','26/05/2026'],['Aprovado pelo Hub','25/05/2026 — Hub AXISUS']].map(([k,v]) => `
        <div><div style="font-size:10px;color:var(--text-muted);">${k}</div><div style="font-weight:600;">${v}</div></div>
      `).join('')}
    </div>`;
}

function renderS2Content() {
  return `
    <div style="color:var(--text-secondary);line-height:1.6;">
      Os clientes que compram na Petshop Beta tipicamente compram apenas 1 produto por pedido. Ticket médio R$ 80, quando o benchmark do setor é R$ 130-180. O cliente acreditava que o problema era a ausência de IA de recomendação. O diagnóstico AXISUS revelou que o problema real é o catálogo desorganizado — 68% dos SKUs sem atributos de complementaridade — que inviabiliza qualquer sistema de recomendação, com ou sem IA.
    </div>
    <div style="margin-top:8px;font-size:11px;color:var(--text-muted);">Tempo de existência: 12+ meses · Urgência: Alta (R$560k/mês de receita não realizada) · Aprovação: CEO + CFO</div>`;
}

function renderS3Content() {
  const stakeholders = [
    { nome:'Renato Almeida',  cargo:'CEO/Fundador',       p:5, i:5, pos:'desconhecido', color:'#94A3B8' },
    { nome:'Beatriz Lima',    cargo:'CFO',                p:5, i:4, pos:'resistente',   color:'#EF4444' },
    { nome:'Daniel Oliveira', cargo:'Ger. E-commerce',   p:4, i:5, pos:'apoiador',     color:'#10B981' },
    { nome:'Andrea Santos',   cargo:'Ger. Catálogo',     p:3, i:4, pos:'neutro',       color:'#F59E0B' },
    { nome:'Pedro Silva',     cargo:'Analista Marketing', p:2, i:4, pos:'apoiador',     color:'#10B981' },
  ];
  return `
    <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">
      <!-- Mini Matriz SVG -->
      <svg width="120" height="120" viewBox="0 0 120 120" style="flex-shrink:0;">
        <rect x="0" y="0" width="120" height="120" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <line x1="60" y1="0" x2="60" y2="120" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="0" y1="60" x2="120" y2="60" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="30" y="116" font-size="8" fill="#94A3B8" text-anchor="middle">Baixo Poder</text>
        <text x="90" y="116" font-size="8" fill="#94A3B8" text-anchor="middle">Alto Poder</text>
        <text x="8" y="64" font-size="8" fill="#94A3B8" text-anchor="middle" transform="rotate(-90,8,64)">Interesse</text>
        ${stakeholders.map(s => {
          const cx = 10 + (s.p / 5) * 100;
          const cy = 110 - (s.i / 5) * 100;
          return `
            <circle cx="${cx}" cy="${cy}" r="7" fill="${s.color}" opacity="0.85">
              <title>${s.nome} — ${s.cargo}</title>
            </circle>
            <text x="${cx}" y="${cy+3}" font-size="7" fill="white" text-anchor="middle" font-weight="700">${s.nome.split(' ')[1]?.[0] || s.nome[0]}</text>
          `;
        }).join('')}
      </svg>
      <!-- Lista -->
      <div style="flex:1;min-width:140px;">
        ${stakeholders.map(s => {
          const posColor = { apoiador:'#10B981', resistente:'#EF4444', neutro:'#F59E0B', desconhecido:'#94A3B8' }[s.pos];
          return `<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;">
            <div style="width:7px;height:7px;border-radius:50%;background:${posColor};flex-shrink:0;"></div>
            <div style="font-size:11px;"><strong>${s.nome.split(' ')[0]}</strong> · ${s.cargo}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderS4Content() {
  const dims = [
    { d:'Cross-sell',          base:'8%',       bench:'32%',       gap:'-24pp',        color:'#EF4444' },
    { d:'Ticket médio',        base:'R$ 80',     bench:'R$ 150',    gap:'-R$ 70/pedido',color:'#F59E0B' },
    { d:'Receita mensal',      base:'R$ 640k',   bench:'R$ 1.200k', gap:'-R$ 560k/mês', color:'#6366F1' },
    { d:'NPS (e-commerce)',    base:'52',        bench:'68',        gap:'-16 pts',      color:'#EC4899' },
  ];
  return `
    <div style="font-size:12px;font-weight:700;color:#6B21A8;margin-bottom:8px;line-height:1.4;">
      Taxa de cross-sell de <strong>8%</strong> (vs. benchmark 32%), ticket médio de <strong>R$ 80</strong> (vs. R$ 150). Gap de <strong>R$ 560k/mês</strong>. 89% dos clientes não visualizam produtos complementares na sessão.
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
      ${dims.map(d => `
        <div style="background:${d.color}10;border:1px solid ${d.color}30;border-radius:6px;padding:6px 8px;">
          <div style="font-size:9px;color:var(--text-muted);">${d.d}</div>
          <div style="font-size:11px;font-weight:700;color:${d.color};">${d.gap}</div>
          <div style="font-size:9px;color:var(--text-muted);">${d.base} → ${d.bench}</div>
        </div>
      `).join('')}
    </div>`;
}

function renderS5Content() {
  return `
    <!-- Mini Ishikawa SVG Petshop Beta -->
    <svg viewBox="0 0 340 90" width="100%" style="max-width:340px;display:block;margin-bottom:8px;">
      <line x1="30" y1="45" x2="290" y2="45" stroke="#04342C" stroke-width="2"/>
      <polygon points="290,45 278,39 278,51" fill="#04342C"/>
      <rect x="292" y="26" width="46" height="38" rx="5" fill="#04342C"/>
      <text x="315" y="41" fill="white" font-size="6" text-anchor="middle" font-weight="700">Cross-sell</text>
      <text x="315" y="52" fill="white" font-size="6" text-anchor="middle">8%</text>
      ${[
        { x:80,  above:true,  causa:'Sem taxon.', raiz:true  },
        { x:160, above:true,  causa:'KPI errado', raiz:true  },
        { x:240, above:true,  causa:'Sem widget', raiz:false },
        { x:80,  above:false, causa:'Dados brutos',raiz:false },
        { x:160, above:false, causa:'Sem análise', raiz:false },
        { x:240, above:false, causa:'Sazonalid.',  raiz:false },
      ].map(b => {
        const y2 = b.above ? 10 : 80;
        return `
          <line x1="${b.x}" y1="45" x2="${b.x}" y2="${y2}" stroke="${b.raiz ? '#10B981' : '#94A3B8'}" stroke-width="${b.raiz ? 2 : 1.5}"/>
          <rect x="${b.x-28}" y="${b.above ? 2 : 72}" width="56" height="14" rx="3" fill="${b.raiz ? '#10B981' : '#E2E8F0'}"/>
          <text x="${b.x}" y="${b.above ? 12 : 82}" fill="${b.raiz ? 'white' : '#64748B'}" font-size="7" text-anchor="middle" font-weight="${b.raiz ? '700' : '400'}">${b.causa}</text>
        `;
      }).join('')}
    </svg>
    <div style="font-size:11px;font-weight:700;color:#B45309;margin-bottom:6px;">Causa Raiz Identificada:</div>
    <div style="background:#FEF3C7;border-left:3px solid #F59E0B;padding:6px 10px;border-radius:0 6px 6px 0;font-size:11px;margin-bottom:6px;font-weight:600;">
      Catálogo desorganizado — 68% dos SKUs sem atributos de complementaridade (estrutural, existe há 12+ meses)
    </div>
    <div style="font-size:10px;color:var(--text-muted);">
      5 Porquês: Ninguém vê cross-sell → Sem recomendação → IA não funciona → Catálogo sem estrutura → KPI sempre foi GMV total → <strong>Incentivo errado desde o início</strong>
    </div>`;
}

function renderS6Content() {
  const serie = [9,8,9,8,8];
  const maxV  = 32;
  const meses = ['J','F','M','A','M'];

  return `
    <div style="margin-bottom:8px;">
      <div style="font-size:11px;font-weight:700;color:#0891B2;margin-bottom:6px;">Hipótese testada:</div>
      <div style="font-size:11px;font-style:italic;color:var(--text-secondary);margin-bottom:8px;">
        "Catálogo desorganizado (68% SKUs sem complementaridade) é a causa raiz da taxa de cross-sell de 8%"
      </div>
      <!-- Mini gráfico cross-sell -->
      <div style="background:white;border:1px solid var(--border);border-radius:8px;padding:8px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
          <div style="width:14px;height:2px;border-top:2px dashed #10B981;"></div>
          <span style="font-size:9px;color:#10B981;">Benchmark 32%</span>
          <div style="width:8px;height:8px;background:#EF4444;border-radius:2px;margin-left:6px;"></div>
          <span style="font-size:9px;color:#EF4444;">Cross-sell medido</span>
        </div>
        <div style="display:flex;align-items:flex-end;gap:2px;height:50px;position:relative;">
          <div style="position:absolute;left:0;right:0;bottom:${32/maxV*100}%;height:1px;border-top:1.5px dashed #10B981;opacity:0.6;"></div>
          ${serie.map((v,i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;">
              <div style="width:100%;background:#EF4444;border-radius:2px 2px 0 0;height:${v/maxV*48}px;opacity:0.85;"></div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:2px;margin-top:2px;">
          ${meses.map(m => `<div style="flex:1;text-align:center;font-size:8px;color:var(--text-muted);">${m}</div>`).join('')}
        </div>
      </div>
    </div>
    ${[
      { m:'% SKUs sem complementares', med:'68%',  bench:'<20%',   gap:'–48pp',   ok:true },
      { m:'Clientes que veem complem.', med:'11%',  bench:'62%',    gap:'–51pp',   ok:true },
    ].map(r => `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span class="badge badge-red" style="font-size:9px;flex-shrink:0;">Medido: ${r.med}</span>
        <span style="font-size:9px;color:var(--text-muted);">vs benchmark ${r.bench}</span>
        <span class="badge badge-green" style="font-size:9px;margin-left:auto;">✓ Validado</span>
      </div>
    `).join('')}
    <div style="text-align:center;margin-top:8px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:6px;padding:6px;font-size:11px;font-weight:800;color:#065F46;">
      ✅ CAUSA RAIZ VALIDADA EMPIRICAMENTE
    </div>`;
}

function renderS7Content() {
  const ranked = getScoredAndRanked ? getScoredAndRanked() : [];
  const alts = ranked.length > 0 ? ranked : [
    { num:'A8', titulo:'Híbrida: Curadoria + RAG', custo:'R$ 24k',  wsjf_final:3.80, ranking:1, aderencia:true,  catColor:'#B45309' },
    { num:'A3', titulo:'RAG Recomendação',          custo:'R$ 12k',  wsjf_final:3.40, ranking:2, aderencia:true,  catColor:'#0F6E56' },
    { num:'A5', titulo:'Curadoria Catálogo',        custo:'R$ 15k',  wsjf_final:3.13, ranking:3, aderencia:true,  catColor:'#4A5A56' },
    { num:'A2', titulo:'LLM via API',               custo:'R$ 8k+3k/mês', wsjf_final:1.60, ranking:4, aderencia:false, catColor:'#1E3A8A' },
    { num:'A1', titulo:'SaaS Plug-and-play',        custo:'R$ 6-12k/mês', wsjf_final:1.40, ranking:5, aderencia:false, catColor:'#1E3A8A' },
  ];

  return `
    <table style="width:100%;font-size:11px;border-collapse:collapse;margin-bottom:10px;">
      <thead>
        <tr style="background:var(--surface-2);">
          <th style="padding:4px 8px;text-align:left;font-size:10px;">#</th>
          <th style="padding:4px 8px;text-align:left;font-size:10px;">Alternativa</th>
          <th style="padding:4px 8px;text-align:center;font-size:10px;">Invest.</th>
          <th style="padding:4px 8px;text-align:center;font-size:10px;">WSJF</th>
          <th style="padding:4px 8px;text-align:center;font-size:10px;">Aderência</th>
        </tr>
      </thead>
      <tbody>
        ${alts.map(a => `
          <tr style="background:${a.ranking===1 ? '#ECFDF5' : 'white'};border-bottom:1px solid var(--border);">
            <td style="padding:4px 8px;font-weight:800;color:${a.catColor};">${a.ranking===1?'★':a.ranking+'°'}</td>
            <td style="padding:4px 8px;font-weight:${a.ranking===1?'700':'400'};">${a.num} — ${a.titulo}</td>
            <td style="padding:4px 8px;text-align:center;font-size:10px;">${a.custo}</td>
            <td style="padding:4px 8px;text-align:center;font-weight:${a.ranking===1?'800':'600'};color:${a.ranking===1?'#065F46':'inherit'};">${a.wsjf_final}</td>
            <td style="padding:4px 8px;text-align:center;"><span class="badge ${a.aderencia?'badge-green':'badge-yellow'}" style="font-size:9px;">${a.aderencia?'Raiz':'Sintoma'}</span></td>
          </tr>
        `).join('')}
        <tr style="background:#FEF2F2;border-bottom:1px solid #FCA5A5;">
          <td style="padding:4px 8px;">✗</td>
          <td style="padding:4px 8px;color:#991B1B;font-size:10px;">A6 — Comprar Máquina Nova (sugestão original)</td>
          <td style="padding:4px 8px;text-align:center;font-size:10px;color:#991B1B;">R$ 4,8mi</td>
          <td style="padding:4px 8px;text-align:center;font-size:10px;color:#991B1B;">—</td>
          <td style="padding:4px 8px;text-align:center;"><span class="badge badge-red" style="font-size:9px;">Descartada</span></td>
        </tr>
      </tbody>
    </table>
    <div style="background:#F0FDF4;border-left:3px solid #10B981;padding:8px 10px;border-radius:0 8px 8px 0;font-size:11px;">
      <strong>Justificativa:</strong> A8 trata causa raiz + sintomas. R$500k vs R$4,86mi/ano de perda = payback &lt;60 dias. A6 (sugestão original) descartada: máquina nova sem mudança de gestão opera também a 18%.
    </div>`;
}

function renderS8Content() {
  const frentes = [
    { k:'F1', label:'Gestão (A1)', custo:'R$ 240k', prazo:'6m',  pct1:0,   pctW:50, color:'#0F6E56' },
    { k:'F2', label:'SMED (A2)',   custo:'R$ 80k',  prazo:'4m',  pct1:0,   pctW:34, color:'#5DCAA5' },
    { k:'F3', label:'TPM (A3)',    custo:'R$ 180k', prazo:'8m',  pct1:25,  pctW:66, color:'#1E40AF' },
    { k:'F4', label:'Integração', custo:'R$ 0',    prazo:'12m', pct1:17,  pctW:83, color:'#6B21A8' },
  ];
  const riscos = [
    { id:'R01', desc:'Resistência do CFO',       score:20, mit:'Business case com payback 60d' },
    { id:'R06', desc:'Conflito entre frentes',   score:16, mit:'PMO leve 1h/semana sync'       },
    { id:'R07', desc:'CEO muda prioridade',       score:15, mit:'Acordo de blindagem 8 meses'   },
  ];
  return `
    <!-- Mini Gantt -->
    <div style="margin-bottom:10px;">
      ${frentes.map(f => `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <div style="width:80px;font-size:10px;font-weight:600;color:${f.color};">${f.k} · ${f.label}</div>
          <div style="flex:1;height:16px;background:var(--surface-3);border-radius:99px;position:relative;">
            <div style="position:absolute;left:${f.pct1}%;width:${f.pctW}%;height:100%;background:${f.color};border-radius:99px;">
              <span style="font-size:9px;color:white;padding:0 5px;line-height:16px;">${f.prazo}</span>
            </div>
          </div>
          <div style="width:42px;font-size:9px;color:var(--text-muted);text-align:right;">${f.custo}</div>
        </div>
      `).join('')}
      <div style="text-align:center;margin-top:6px;font-size:11px;font-weight:700;color:var(--primary);">Total: R$ 500.000 · 8 meses paralelizado · 16 ações</div>
    </div>
    <!-- Riscos principais -->
    <div style="font-size:10px;font-weight:700;color:var(--text-muted);margin-bottom:5px;">3 PRINCIPAIS RISCOS:</div>
    ${riscos.map(r => `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;font-size:10px;">
        <span class="badge ${r.score>=20?'badge-red':'badge-yellow'}" style="font-size:9px;">${r.id} · ${r.score}</span>
        <span style="flex:1;">${r.desc}</span>
        <span style="color:var(--text-muted);font-size:9px;">${r.mit}</span>
      </div>
    `).join('')}`;
}

function renderS9Content() {
  const kpis = [
    { id:'K01', nome:'Cross-sell',   base:'8%',      a30:'8%',   a90:'20%',  a365:'32%',   color:'#0F6E56' },
    { id:'K02', nome:'Ticket Médio', base:'R$ 80',    a30:'R$80', a90:'R$105',a365:'R$130', color:'#1E40AF' },
    { id:'K03', nome:'Receita/mês',  base:'R$640k',   a30:'R$640k',a90:'R$840k',a365:'R$1.2mi', color:'#6B21A8' },
    { id:'K04', nome:'CTR Widget',   base:'3.2%',     a30:'3.2%', a90:'9%',   a365:'12%',   color:'#B45309' },
    { id:'K05', nome:'NPS e-comm.',  base:'52',       a30:'52',   a90:'58',   a365:'65',    color:'#0891B2' },
  ];
  return `
    <table style="width:100%;font-size:11px;border-collapse:collapse;">
      <thead>
        <tr style="background:var(--surface-2);">
          ${['KPI','Baseline','30 dias','90 dias','12 meses'].map(h => `<th style="padding:4px 6px;font-size:10px;">${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${kpis.map(k => `
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:4px 6px;font-weight:700;color:${k.color};">${k.nome}</td>
            <td style="padding:4px 6px;color:var(--text-muted);">${k.base}</td>
            <td style="padding:4px 6px;color:#1E40AF;font-weight:600;">${k.a30}</td>
            <td style="padding:4px 6px;color:#047857;font-weight:600;">${k.a90}</td>
            <td style="padding:4px 6px;font-weight:800;color:${k.color};">${k.a365}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="margin-top:8px;background:#F0FDF4;border-radius:6px;padding:6px 10px;font-size:11px;font-weight:700;color:#065F46;">
      Payback estimado: &lt; 30 dias · ROI projetado: 12x em 12 meses (R$288k/ano)
    </div>`;
}

function renderS10Content() {
  return `
    <div class="grid-2" style="gap:8px;margin-bottom:10px;">
      ${[
        { d:'Reunião 30 dias', dt:'25/06/2026', fmt:'Videoconferência 60min', s:'Revisão do A/B test — CTR e cross-sell' },
        { d:'Reunião 60 dias', dt:'25/07/2026', fmt:'Videoconferência 90min', s:'Resultado roll-out completo — ticket médio' },
        { d:'Reunião 90 dias', dt:'25/08/2026', fmt:'Videoconferência 60min', s:'Avaliação de tendência NPS e receita' },
      ].map(r => `
        <div style="background:var(--surface-2);border-radius:8px;padding:8px;">
          <div style="font-size:10px;color:var(--text-muted);">${r.d}</div>
          <div style="font-size:12px;font-weight:700;">${r.dt}</div>
          <div style="font-size:10px;">${r.fmt}</div>
          <div style="font-size:10px;color:var(--text-muted);">${r.s}</div>
        </div>
      `).join('')}
      <div style="background:${T09_STATE.signoff==='signed' ? '#F0FDF4' : '#FEF9C3'};border-radius:8px;padding:8px;border:1px solid ${T09_STATE.signoff==='signed' ? '#A7F3D0' : '#FCD34D'};">
        <div style="font-size:10px;color:var(--text-muted);">Sign-off do Cliente</div>
        <div style="font-size:12px;font-weight:700;color:${T09_STATE.signoff==='signed' ? '#065F46' : '#92400E'};">
          ${T09_STATE.signoff==='signed' ? '✅ Assinado — Renato Almeida (CEO)' : '⏳ Aguardando assinatura'}
        </div>
        <div style="font-size:10px;">${T09_STATE.signoff==='signed' ? '25/05/2026 via ClickSign' : 'Renato Almeida (CEO) + Beatriz Lima (CFO)'}</div>
        ${T09_STATE.signoff !== 'signed' ? `<button class="btn btn-accent btn-sm mt-2" style="font-size:10px;" onclick="sendSignoff()">Enviar para assinar</button>` : ''}
      </div>
    </div>
    <div style="font-size:11px;color:var(--text-muted);padding:6px 10px;background:var(--surface-2);border-radius:6px;">
      <strong>Anexos:</strong> Auditoria do Catálogo CSV · Relatório GA4 cross-sell · Análise de co-compra 12 meses · Protótipo RAG (repositório GitHub)
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// MODO APRESENTAÇÃO — A3 PAISAGEM
// ═══════════════════════════════════════════════════════════
function renderT09Present() {
  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      <!-- Toolbar Apresentação -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:8px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
        <div style="display:flex;background:var(--surface-2);border-radius:8px;padding:3px;gap:2px;">
          <button onclick="setT09Mode('edit')"
            style="padding:5px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text-muted);">
            ✏️ Edição
          </button>
          <button onclick="setT09Mode('present')"
            style="padding:5px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;background:white;color:var(--primary);box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            🖼️ Apresentação
          </button>
        </div>
        <div style="font-size:11px;color:var(--text-muted);flex:1;">Esta é a visualização final. Pronto para exportar como PDF A3, PNG ou A4 Resumo Executivo.</div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="exportA3('pdf')">${icon('download',13)} PDF A3</button>
          <button class="btn btn-secondary btn-sm" onclick="exportA3('png')">${icon('download',13)} PNG</button>
          <button class="btn btn-secondary btn-sm" onclick="exportA3('a4')">${icon('download',13)} A4 Exec.</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="requestGateDeliver()">${icon('send',14)} Gate Deliver</button>
      </div>

      <!-- A3 Canvas -->
      <div style="flex:1;overflow:auto;padding:20px;background:#94A3B8;display:flex;align-items:flex-start;justify-content:center;">
        <div id="a3-canvas" style="
          width:1100px;
          min-height:779px;
          background:white;
          border-radius:4px;
          box-shadow:0 8px 40px rgba(0,0,0,0.3);
          display:grid;
          grid-template-rows:auto 1fr 1fr auto;
          overflow:hidden;
          font-family:'Inter',sans-serif;
        ">

          <!-- ── LINHA 1: Cabeçalho ── -->
          <div style="background:#04342C;padding:8px 16px;display:flex;align-items:center;gap:12px;">
            <div style="font-size:20px;font-weight:900;color:white;letter-spacing:-1px;flex-shrink:0;">AXISUS</div>
            <div style="width:1px;height:24px;background:rgba(255,255,255,0.2);"></div>
            <div style="font-size:10px;color:rgba(255,255,255,0.6);">A3 Expandido · Método 5D</div>
            <div style="flex:1;"></div>
            ${[
              ['Caso','CASE-2026-0042'],
              ['Cliente','Petshop Beta Comércio Ltda'],
              ['Squad Líder','Eduardo Ricatto · Sênior'],
              ['Início Sprint','05/05/2026'],
              ['Conclusão','26/05/2026'],
            ].map(([k,v]) => `
              <div style="text-align:right;margin-left:14px;">
                <div style="font-size:8px;color:rgba(255,255,255,0.5);">${k}</div>
                <div style="font-size:10px;font-weight:700;color:white;">${v}</div>
              </div>
            `).join('')}
            <div style="margin-left:14px;background:#10B981;padding:4px 10px;border-radius:6px;text-align:center;">
              <div style="font-size:8px;color:white;opacity:0.8;">Hub Aprovado</div>
              <div style="font-size:9px;font-weight:800;color:white;">25/05/2026</div>
            </div>
          </div>

          <!-- ── LINHA 2: Diagnóstico (5 colunas) ── -->
          <div style="display:grid;grid-template-columns:1.7fr 1fr 1.8fr 1.5fr 1.5fr;border-bottom:2px solid var(--border);">

            <!-- 2a: Background -->
            <div style="padding:12px;border-right:1px solid var(--border);">
              ${a3SectionHeader('1', 'Background', '#065F46')}
              <div style="font-size:9px;color:var(--text-muted);margin-bottom:4px;font-style:italic;">O que o cliente reportou</div>
              <div style="font-size:10px;color:var(--text-secondary);line-height:1.6;">
                A fábrica não dá conta da demanda. Estamos perdendo pedidos — prazo de entrega aumentou de 15 para <strong>28 dias</strong>. Comercial propõe comprar máquina flexográfica nova por <strong>R$ 4,8 milhões</strong>. CFO resiste. Diretoria dividida.
              </div>
              <div style="margin-top:8px;padding:6px 8px;background:#FEF3C7;border-radius:6px;font-size:9px;color:#92400E;">
                <strong>Urgência:</strong> Decisão de R$4,8mi pendente · 3 contratos em risco · 14 meses de problema
              </div>
            </div>

            <!-- 2b: Stakeholders -->
            <div style="padding:10px;border-right:1px solid var(--border);">
              ${a3SectionHeader('2', 'Stakeholders', '#1E40AF')}
              <svg viewBox="0 0 100 100" width="90" height="90" style="display:block;margin:0 auto 6px;">
                <rect x="0" y="0" width="100" height="100" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
                <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,2"/>
                <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,2"/>
                ${[{n:'CEO',p:5,i:5,c:'#94A3B8'},{n:'CFO',p:5,i:4,c:'#EF4444'},{n:'Dir.C.',p:4,i:5,c:'#10B981'},{n:'Ger.P.',p:3,i:4,c:'#10B981'},{n:'Sind.',p:3,i:3,c:'#EF4444'}].map(s => {
                  const cx = 8 + (s.p/5)*84; const cy = 92 - (s.i/5)*84;
                  return `<circle cx="${cx}" cy="${cy}" r="8" fill="${s.c}" opacity="0.9"/><text x="${cx}" y="${cy+3}" fill="white" font-size="6" text-anchor="middle" font-weight="700">${s.n.split('.')[0]}</text>`;
                }).join('')}
              </svg>
              <div style="font-size="8px;">
                ${[{n:'Marcelo',c:'#94A3B8',p:'Decisor'},{n:'Patrícia CFO',c:'#EF4444',p:'Resistente'},{n:'João Com.',c:'#10B981',p:'Apoiador'},{n:'Roberto',c:'#10B981',p:'Apoiador'}].map(s => `
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <div style="width:6px;height:6px;border-radius:50%;background:${s.c};flex-shrink:0;"></div>
                    <span style="font-size:8px;">${s.n} · <em>${s.p}</em></span>
                  </div>`).join('')}
              </div>
            </div>

            <!-- 2c: Current State -->
            <div style="padding:12px;border-right:1px solid var(--border);">
              ${a3SectionHeader('3', 'Current State', '#6B21A8')}
              <div style="font-size:9px;font-weight:700;color:#6B21A8;line-height:1.5;margin-bottom:8px;">
                Cross-sell de <strong>8%</strong> (benchmark 32%). Ticket médio <strong>R$ 80</strong> (benchmark R$ 150). Gap: <strong>R$ 560k/mês</strong>. 89% dos clientes não veem complementares.
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                ${[{l:'Cross-sell',v:'8%',b:'32%',c:'#EF4444'},{l:'Ticket médio',v:'R$80',b:'R$150',c:'#F59E0B'},{l:'NPS e-comm.',v:'52',b:'68',c:'#6366F1'},{l:'% vê complem.',v:'11%',b:'62%',c:'#EC4899'}].map(d => `
                  <div style="background:${d.c}10;border:1px solid ${d.c}30;border-radius:4px;padding:4px 6px;">
                    <div style="font-size:8px;color:var(--text-muted);">${d.l}</div>
                    <div style="font-size:11px;font-weight:800;color:${d.c};">${d.v}</div>
                    <div style="font-size:8px;color:var(--text-muted);">bench: ${d.b}</div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- 2d: Root Cause -->
            <div style="padding:10px;border-right:1px solid var(--border);">
              ${a3SectionHeader('4', 'Root Cause', '#B45309')}
              <svg viewBox="0 0 200 60" width="100%" style="display:block;margin-bottom:6px;">
                <line x1="15" y1="30" x2="180" y2="30" stroke="#04342C" stroke-width="2"/>
                <polygon points="180,30 172,25 172,35" fill="#04342C"/>
                <rect x="182" y="18" width="16" height="24" rx="3" fill="#04342C"/>
                <text x="190" y="28" fill="white" font-size="5" text-anchor="middle">Cross</text>
                <text x="190" y="35" fill="white" font-size="5" text-anchor="middle">8%</text>
                ${[{x:50,a:true,l:'Sem taxon.',c:'#10B981',r:true},{x:100,a:true,l:'KPI errado',c:'#10B981',r:true},{x:150,a:true,l:'Sem widget',c:'#94A3B8',r:false},{x:50,a:false,l:'Dados raw',c:'#94A3B8',r:false},{x:100,a:false,l:'Medição',c:'#94A3B8',r:false},{x:150,a:false,l:'Sazonal.',c:'#94A3B8',r:false}].map(b => {
                  const y2 = b.a ? 5 : 55;
                  return `<line x1="${b.x}" y1="30" x2="${b.x}" y2="${y2}" stroke="${b.c}" stroke-width="${b.r?1.8:1}"/><rect x="${b.x-16}" y="${b.a?1:49}" width="32" height="10" rx="2" fill="${b.c}"/><text x="${b.x}" y="${b.a?8:56}" fill="white" font-size="5" text-anchor="middle">${b.l}</text>`;
                }).join('')}
              </svg>
              <div style="background:#FEF3C7;border-left:2px solid #F59E0B;padding:5px 7px;border-radius:0 4px 4px 0;font-size:9px;margin-bottom:5px;font-weight:700;">
                Catálogo desorganizado — 68% SKUs sem complementaridade
              </div>
              <div style="font-size:8px;color:var(--text-muted);line-height:1.5;">
                5 Porquês: Sem recomendação → Catálogo sem estrutura → KPI era GMV → Incentivo errado desde 2020
              </div>
            </div>

            <!-- 2e: Validação -->
            <div style="padding:10px;">
              ${a3SectionHeader('5', 'Validação Empírica', '#0891B2')}
              <div style="margin-bottom:6px;">
                <div style="display:flex;align-items:flex-end;gap:2px;height:40px;position:relative;background:#F8FAFC;border-radius:4px;padding:4px 4px 0;">
                  <div style="position:absolute;left:0;right:0;bottom:${32/32*100}%;height:1px;border-top:1.5px dashed #10B981;opacity:0.8;"></div>
                  ${[9,8,9,8,8].map(v => `
                    <div style="flex:1;background:#EF4444;border-radius:2px 2px 0 0;height:${v/32*36}px;opacity:0.8;"></div>
                  `).join('')}
                </div>
                <div style="font-size:8px;color:var(--text-muted);margin-top:2px;">Cross-sell % mensal — dashed = benchmark 32%</div>
              </div>
              ${[{m:'% SKUs sem complem.',v:'68%',b:'<20%',g:'–48pp'},{m:'% clientes vê complem.',v:'11%',b:'62%',g:'–51pp'}].map(r => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:3px 5px;background:var(--surface-2);border-radius:4px;margin-bottom:3px;font-size:8px;">
                  <span>${r.m}</span><span style="color:#EF4444;font-weight:700;">${r.v} vs ${r.b}</span>
                  <span class="badge badge-green" style="font-size:7px;padding:1px 4px;">✓ Validado</span>
                </div>`).join('')}
              <div style="text-align:center;margin-top:6px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:4px;padding:4px;font-size:9px;font-weight:800;color:#065F46;">
                ✅ CAUSA RAIZ VALIDADA
              </div>
            </div>
          </div>

          <!-- ── LINHA 3: Decisão + Plano + KPIs ── -->
          <div style="display:grid;grid-template-columns:2fr 1.5fr 1.5fr;border-bottom:2px solid var(--border);">

            <!-- 3a: Recomendação -->
            <div style="padding:12px;border-right:1px solid var(--border);">
              ${a3SectionHeader('6', 'Recomendação Validada Matematicamente', '#0F6E56')}
              <table style="width:100%;font-size:9px;border-collapse:collapse;margin-bottom:8px;">
                <thead><tr style="background:#F0FDF4;">
                  <th style="padding:3px 6px;text-align:left;">#</th><th style="padding:3px 6px;">Alternativa</th><th style="padding:3px 6px;text-align:center;">Invest.</th><th style="padding:3px 6px;text-align:center;">WSJF</th>
                </tr></thead>
                <tbody>
                  ${[
                    {n:'★',alt:'A8 — Pacote Híbrido (Gestor+SMED+TPM)',c:'R$ 500k',w:'3,62',bold:true,bg:'#ECFDF5'},
                    {n:'2°',alt:'A1 — Gestor Sênior',c:'R$ 240k',w:'4,25',bold:false,bg:'white'},
                    {n:'3°',alt:'A3 — TPM',c:'R$ 180k',w:'3,25',bold:false,bg:'white'},
                    {n:'4°',alt:'A2 — SMED (-50% sint.)',c:'R$ 80k',w:'1,30',bold:false,bg:'white'},
                    {n:'✗',alt:'A6 — Máquina Nova (cliente)',c:'R$ 4,8mi',w:'—',bold:false,bg:'#FEF2F2'},
                  ].map(r => `<tr style="background:${r.bg};border-bottom:1px solid #F1F5F9;">
                    <td style="padding:3px 6px;font-weight:${r.bold?'900':'500'};">${r.n}</td>
                    <td style="padding:3px 6px;font-weight:${r.bold?'700':'400'};font-size:9px;">${r.alt}</td>
                    <td style="padding:3px 6px;text-align:center;">${r.c}</td>
                    <td style="padding:3px 6px;text-align:center;font-weight:${r.bold?'800':'500'};color:${r.bold?'#065F46':'inherit'};">${r.w}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
              <div style="background:#F0FDF4;border-left:2px solid #10B981;padding:6px 8px;border-radius:0 6px 6px 0;font-size:9px;line-height:1.5;">
                <strong>A8 tratа causa raiz + sintomas.</strong> R$500k vs R$4,86mi/ano perda = <strong>payback &lt;60 dias.</strong> A6 descartada: sem mudança de gestão, máquina nova também opera a 18%.
              </div>
            </div>

            <!-- 3b: Plano -->
            <div style="padding:10px;border-right:1px solid var(--border);">
              ${a3SectionHeader('7', 'Plano de Implementação', '#4A5A56')}
              ${[
                {k:'F1',l:'Gestão (A1)',c:'R$240k',p:'6m',pct1:0, pctW:50,color:'#0F6E56'},
                {k:'F2',l:'SMED (A2)',  c:'R$80k', p:'4m',pct1:0, pctW:34,color:'#5DCAA5'},
                {k:'F3',l:'TPM (A3)',   c:'R$180k',p:'8m',pct1:25,pctW:66,color:'#1E40AF'},
                {k:'F4',l:'Integração', c:'—',     p:'12m',pct1:17,pctW:83,color:'#6B21A8'},
              ].map(f => `
                <div style="display:flex;align-items:center;gap:5px;margin-bottom:5px;">
                  <div style="width:56px;font-size:8px;font-weight:600;color:${f.color};">${f.k} ${f.l}</div>
                  <div style="flex:1;height:12px;background:var(--surface-3);border-radius:99px;position:relative;">
                    <div style="position:absolute;left:${f.pct1}%;width:${f.pctW}%;height:100%;background:${f.color};border-radius:99px;">
                      <span style="font-size:8px;color:white;padding:0 4px;">${f.p}</span>
                    </div>
                  </div>
                  <div style="width:32px;font-size:8px;color:var(--text-muted);">${f.c}</div>
                </div>
              `).join('')}
              <div style="font-size:9px;font-weight:700;text-align:center;color:var(--primary);margin:6px 0;">Total: R$ 500.000 · 8 meses · 16 ações</div>
              <div style="font-size:8px;font-weight:600;color:var(--text-muted);margin-bottom:4px;">RISCOS CRÍTICOS:</div>
              ${[{id:'R01',d:'Resistência CFO',s:20},{id:'R06',d:'Conflito frentes',s:16},{id:'R07',d:'Mudança prioridade CEO',s:15}].map(r => `
                <div style="display:flex;align-items:center;gap:5px;font-size:8px;margin-bottom:3px;">
                  <span style="padding:1px 5px;background:${r.s>=20?'#FEE2E2':'#FEF3C7'};color:${r.s>=20?'#991B1B':'#92400E'};border-radius:3px;font-weight:700;">${r.id}·${r.s}</span>
                  <span>${r.d}</span>
                </div>`).join('')}
            </div>

            <!-- 3c: KPIs -->
            <div style="padding:10px;">
              ${a3SectionHeader('8', 'Régua de Acompanhamento', '#065F46')}
              <table style="width:100%;font-size:8px;border-collapse:collapse;margin-bottom:8px;">
                <thead><tr style="background:#F0FDF4;">
                  <th style="padding:2px 4px;">KPI</th><th style="text-align:center;padding:2px 4px;">Base</th><th style="text-align:center;padding:2px 4px;">90d</th><th style="text-align:center;padding:2px 4px;background:#D1FAE5;">12m</th>
                </tr></thead>
                <tbody>
                  ${[
                    {n:'Cross-sell',b:'8%',a90:'20%',a365:'32%',c:'#0F6E56'},
                    {n:'Ticket Médio',b:'R$80',a90:'R$105',a365:'R$130',c:'#1E40AF'},
                    {n:'Prev/Corr.',b:'11%',a90:'50%',a365:'70%',c:'#6B21A8'},
                    {n:'Lead Time',b:'28d',a90:'20d',a365:'15d',c:'#B45309'},
                    {n:'OTD',b:'62%',a90:'85%',a365:'95%',c:'#0891B2'},
                  ].map(k => `<tr style="border-bottom:1px solid #F1F5F9;">
                    <td style="padding:3px 4px;font-weight:700;color:${k.c};">${k.n}</td>
                    <td style="padding:3px 4px;text-align:center;color:var(--text-muted);">${k.b}</td>
                    <td style="padding:3px 4px;text-align:center;color:#047857;font-weight:600;">${k.a90}</td>
                    <td style="padding:3px 4px;text-align:center;font-weight:800;color:${k.c};background:#F0FDF4;">${k.a365}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
              <div style="background:#F0FDF4;border-radius:4px;padding:6px;font-size:9px;text-align:center;color:#065F46;font-weight:700;">
                Payback estimado: &lt;60 dias<br>ROI: 95× honorários AXISUS
              </div>
            </div>
          </div>

          <!-- ── LINHA 4: Rodapé Follow-up + Sign-off ── -->
          <div style="background:#F8FAFC;padding:8px 16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            ${a3SectionHeader('9', 'Follow-up Plan', '#334155')}
            <div style="display:flex;gap:12px;align-items:center;flex:1;flex-wrap:wrap;">
              ${[
                {d:'30 dias',dt:'15/07/2026',f:'Video 60min'},
                {d:'60 dias',dt:'15/08/2026',f:'Presencial 90min'},
                {d:'90 dias',dt:'15/09/2026',f:'Video 60min'},
              ].map(r => `<div style="font-size:9px;text-align:center;padding:4px 10px;background:white;border-radius:6px;border:1px solid var(--border);">
                <div style="font-weight:700;color:var(--primary);">${r.d}</div>
                <div>${r.dt}</div>
                <div style="color:var(--text-muted);">${r.f}</div>
              </div>`).join('')}
            </div>
            <div style="font-size:9px;color:var(--text-muted);">Versão ${T09_STATE.version} · AXISUS Método 5D © 2026</div>
            <div style="padding:6px 14px;border:${T09_STATE.signoff==='signed' ? '2px solid #10B981;background:#ECFDF5' : '2px dashed #CBD5E1;background:white'};border-radius:8px;font-size:9px;text-align:center;">
              ${T09_STATE.signoff==='signed'
                ? `<div style="color:#065F46;font-weight:800;">✅ ASSINADO</div><div style="color:#047857;">Marcelo Atlântico · CEO<br>14/06/2026 via ClickSign</div>`
                : `<div style="color:var(--text-muted);">⏳ Assinatura Pendente</div><div style="color:var(--text-muted);">Marcelo Atlântico · CEO</div><button class="btn btn-accent btn-sm mt-1" style="font-size:9px;" onclick="sendSignoff()">Enviar p/ assinar</button>`}
            </div>
          </div>

        </div><!-- fim a3-canvas -->
      </div>
    </div>
  `;
}

function a3SectionHeader(num, title, color) {
  return `<div style="display:flex;align-items:center;gap:5px;margin-bottom:6px;padding-bottom:5px;border-bottom:2px solid ${color}20;">
    <span style="width:16px;height:16px;border-radius:50%;background:${color};color:white;font-size:8px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${num}</span>
    <span style="font-size:10px;font-weight:800;color:${color};">${title}</span>
  </div>`;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function setT09Mode(mode) {
  T09_STATE.mode = mode;
  navigate('template_t09');
}

function exportA3(format) {
  const msgs = {
    pdf: 'PDF gerado em alta resolução (300dpi). Adequado para impressão e arquivamento.',
    png: 'PNG gerado. Útil para compartilhamento rápido via WhatsApp ou Slack.',
    a4:  'Versão executiva A4 gerada. Anexe em e-mails ou apresente em reuniões breves.',
  };
  T09_STATE.version++;
  showToast(`${msgs[format]} — Versão ${T09_STATE.version}`);
}

function sendSignoff() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Enviar A3 para Sign-off do Cliente</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('send',14)} O cliente recebe link via e-mail para assinar o A3 digitalmente via ClickSign.</div>
        <div class="form-group mb-2">
          <label class="form-label">Destinatário</label>
          <input class="form-input" value="marcelo.atlantico@embalagensatlantico.com.br">
        </div>
        <div class="form-group">
          <label class="form-label">Mensagem</label>
          <textarea class="form-textarea" rows="3">Prezado Marcelo, segue o A3 Expandido do diagnóstico AXISUS para sua aprovação formal. Por favor, revise e assine digitalmente para iniciarmos a Fase Deliver.</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();T09_STATE.signoff='signed';navigate('template_t09');showToast('A3 enviado para sign-off! Marcelo Atlântico será notificado.')">
          ${icon('send',14)} Enviar via ClickSign
        </button>
      </div>
    </div>
  `);
}

function showT09AI() {
  showModal(`
    <div class="modal" style="max-width:600px;">
      <div class="modal-header">
        <div class="modal-title">${icon('ai',16)} IA — Revisão de Coerência Narrativa</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-3" style="font-size:12px;">${icon('check',14)} A IA analisou a coerência narrativa do A3. Resultado: <strong>Alta coerência (94/100)</strong>.</div>
        ${[
          { tipo:'✅', msg:'Arco narrativo completo: problema relatado → causa raiz → recomendação → plano alinhados.' },
          { tipo:'✅', msg:'Números consistentes entre templates (cross-sell 8%, catálogo 68% aparecem em T04, T05, T07 e A3 corretamente).' },
          { tipo:'✅', msg:'Sugestão original do cliente (comprar máquina) foi incluída, avaliada e descartada com critério.' },
          { tipo:'⚠️', msg:'Seção 2 (Background) poderia destacar mais explicitamente "14 meses de problema" para impacto emocional.' },
          { tipo:'💡', msg:'Considere adicionar frase na Seção 6: "Cada mês sem catálogo organizado é R$560k de receita não realizada" — conecta causa raiz à urgência financeira para a CFO.' },
        ].map(s => `
          <div style="display:flex;gap:8px;margin-bottom:8px;font-size:12px;">
            <span style="flex-shrink:0;">${s.tipo}</span>
            <span>${s.msg}</span>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal()">Fechar</button></div>
    </div>
  `);
}

function requestGateDeliver() {
  showModal(`
    <div class="modal" style="max-width:620px;">
      <div class="modal-header">
        <div class="modal-title">Solicitar Gate Deliver — Encerramento do Caso</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4" style="font-size:12px;">
          ${icon('check',16)} A3 Expandido completo. Caso Petshop Beta pronto para entrega formal.
        </div>
        <div style="background:var(--surface-2);border-radius:10px;padding:14px;font-size:12px;margin-bottom:14px;">
          <div class="font-semibold mb-3">Checklist Final (Hub Central):</div>
          ${[
            ['Todas as 9 seções do A3 preenchidas', true],
            ['Coerência narrativa T01→T09 verificada', true],
            ['Causa raiz validada empiricamente (T05)', true],
            ['Recomendação com cálculo WSJF auditável (T07)', true],
            ['Plano com 16 ações, 8 riscos, 5 KPIs (T08)', true],
            ['Sign-off do cliente via ClickSign', T09_STATE.signoff === 'signed'],
            ['Reuniões 30/60/90 dias agendadas', true],
          ].map(([item, ok]) => `
            <div class="flex items-center gap-2 mb-2">
              <span>${ok ? '✅' : '⚠️'}</span>
              <span style="${ok ? '' : 'color:var(--gold);font-weight:600;'}">${item}</span>
            </div>
          `).join('')}
        </div>

        <!-- Impacto do caso -->
        <div style="background:linear-gradient(135deg,#04342C,#065F46);color:white;border-radius:10px;padding:14px;margin-bottom:14px;">
          <div style="font-size:11px;opacity:0.7;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">Impacto do Método 5D — Caso Petshop Beta · AI Sprint</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
            <div><div style="font-size:22px;font-weight:900;">R$4,3mi</div><div style="font-size:10px;opacity:0.7;">evitados vs. decisão original</div></div>
            <div><div style="font-size:22px;font-weight:900;">95×</div><div style="font-size:10px;opacity:0.7;">ROI sobre honorários</div></div>
            <div><div style="font-size:22px;font-weight:900;">75 dias</div><div style="font-size:10px;opacity:0.7;">duração do diagnóstico</div></div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Comentário final para o Hub</label>
          <textarea class="form-textarea" rows="2" placeholder="Observações sobre o caso..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('Gate Deliver aprovado! Caso Petshop Beta encerrado com sucesso. Parabéns!')">
          ${icon('check',14)} Encerrar Caso
        </button>
      </div>
    </div>
  `);
}

function bindT09Events() {}
