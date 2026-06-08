// ============================================================
// AXISUS — Templates Detalhados Fase Define (T01, T02, T03)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ============ DADOS DE EXEMPLO (caso Embalagens Atlântico) ============
const T01_EXAMPLE = {
  identificacao: {
    caso: 'CASE-2026-0042', empresa: 'Embalagens Atlântico Ltda',
    cnpj: '52.847.193/0001-77', setor: 'Manufatura — Embalagens',
    porte: 'Médio (R$ 32mi/ano · 142 funcionários)',
    especialista: 'Ana Paula Rodrigues (Pleno · SP)',
    produto: 'Plataforma + Visitas Técnicas', data_inicio: '01/04/2026'
  },
  problema_reportado: {
    problema_principal: 'A fábrica não dá conta da demanda. Estamos perdendo pedidos para concorrentes porque o prazo de entrega aumentou de 15 para 28 dias. O comercial diz que precisamos comprar uma nova máquina de impressão flexográfica para aumentar a capacidade. A diretoria está dividida: alguns acham que é falta de equipamento, outros acham que é problema de planejamento. O CFO está pressionando porque a nova máquina custa R$ 4,8 milhões e ainda não sabemos se vai resolver.',
    dor_sentida: 'Perdemos três contratos grandes nos últimos seis meses por causa do prazo. O comercial está desmotivado, a fábrica está estressada com a pressão de produção, e a diretoria está paralisada na decisão de investimento. Se não resolvermos até dezembro, vamos fechar o ano abaixo da meta de receita.',
    solucao_imaginada: 'Comprar uma nova máquina flexográfica de 6 cores. Estamos com proposta de duas fornecedoras (Bobst e Comexi), prazo de entrega 8 meses. Custo estimado R$ 4,8mi.',
    tentativas_anteriores: 'Em 2024, contratamos uma consultoria que recomendou aumentar o turno da fábrica para 3 turnos. Funcionou parcialmente nos primeiros 2 meses, depois os atrasos voltaram. A consultoria atribuiu ao "problema cultural" e não voltou.'
  },
  contexto: {
    areas_afetadas: ['Operações', 'Comercial', 'Financeiro'],
    processo_principal: 'Impressão flexográfica → Corte → Vinco → Expedição',
    quem_reportou: 'João Mendes (Diretor Comercial)',
    tempo_existencia: '6-12 meses', frequencia: 'diaria', urgencia: 5
  },
  expectativas: {
    resultado_90_dias: 'Recomendação clara: comprar a máquina ou não. Se sim, justificar com dados. Se não, identificar onde está o gargalo real e plano de ação.',
    resultado_12_meses: 'Prazo médio de entrega reduzido para 18 dias. Capacidade de aceitar pedidos atualmente recusados por prazo.',
    indicador_sucesso: 'OEE da linha de flexografia + lead time de pedido a entrega.',
    restricoes: 'Decisão precisa ser tomada antes de 31/07. Após essa data, há risco de perder a próxima safra de pedidos do setor de bebidas.',
    aprovacao_depende_de: 'Marcelo Atlântico (CEO) com aval de Patrícia Souza (CFO) e João Mendes (Comercial)'
  }
};

const T02_EXAMPLE = {
  is_is_not: [
    { dimensao: 'ONDE',   is: 'Linha de impressão flexográfica 1 e 2 (galpão A)', is_not: 'Linha de impressão offset (galpão B), expedição, recebimento de matéria-prima', por_que: 'Atrasos concentrados na flexografia. Outras áreas têm OEE normal.', evidencia: 'Relatório OEE ago/set/out 2025' },
    { dimensao: 'QUANDO', is: 'Pedidos com prazo até 18 dias úteis, todos os turnos', is_not: 'Pedidos urgentes (até 48h) — não temos histórico de atrasos nesses', por_que: 'Operação normal afetada, não exceções.', evidencia: 'Base de dados de ordens de produção 2025' },
    { dimensao: 'O QUÊ',  is: 'Embalagens flexográficas para setor de bebidas e alimentos', is_not: 'Embalagens offset para setor cosmético (linha estável)', por_que: 'Setor de bebidas representa 68% do faturamento e 92% dos atrasos.', evidencia: 'Relatório comercial Q3/2025' },
    { dimensao: 'QUANTO', is: 'Atrasos médios de 13 dias úteis sobre prazo combinado, em 38% dos pedidos', is_not: 'Atrasos pontuais menores que 3 dias (considerados aceitáveis)', por_que: 'Limite aceitável é 5 dias úteis pela política comercial.', evidencia: 'Entrevista João Mendes + dados ERP' },
  ],
  stakeholders: [
    { nome: 'Marcelo Atlântico', cargo: 'CEO',                       area: 'Diretoria',  poder: 5, interesse: 5, raci: 'Aprovador',   posicionamento: 'Desconhecido' },
    { nome: 'Patrícia Souza',    cargo: 'CFO',                       area: 'Financeiro', poder: 5, interesse: 4, raci: 'Aprovador',   posicionamento: 'Resistente' },
    { nome: 'João Mendes',       cargo: 'Diretor Comercial',         area: 'Comercial',  poder: 4, interesse: 5, raci: 'Consultado',  posicionamento: 'Apoiador' },
    { nome: 'Roberto Lima',      cargo: 'Gerente de Produção',       area: 'Operações',  poder: 3, interesse: 4, raci: 'Responsável', posicionamento: 'Apoiador' },
    { nome: 'Cláudio Mendes',    cargo: 'Líder de Manutenção',       area: 'Operações',  poder: 2, interesse: 4, raci: 'Consultado',  posicionamento: 'Neutro' },
    { nome: 'Sandra Vieira',     cargo: 'Coordenadora de PCP',       area: 'Operações',  poder: 3, interesse: 5, raci: 'Consultado',  posicionamento: 'Apoiador' },
    { nome: 'Marcos Pereira',    cargo: 'Rep. Sindicato',            area: 'RH',         poder: 3, interesse: 3, raci: 'Informado',   posicionamento: 'Resistente' },
  ]
};

const T03_EXAMPLE = {
  financeira:     { descricao: 'Receita perdida por atrasos, horas-extra para compensar e contratos plurianuais em risco.', indicador: 'Impacto financeiro total (R$/ano)', baseline: 4860000, unidade: 'BRL', benchmark: 0, fonte_benchmark: 'Cálculo interno com dados ERP', gap: -4860000 },
  operacional:    { descricao: 'A linha de flexografia opera 22h/dia mas produz como se rodasse 4h. Paradas, setup, retrabalho e velocidade explicam o gap.', indicador: 'OEE linha flexográfica', baseline: 18, unidade: '%', benchmark: 68, fonte_benchmark: 'Pesquisa ABFlexo 2024', gap: -50 },
  reputacional:   { descricao: 'Três contratos perdidos por prazo. Comercial desmotivado. Percepção de confiabilidade em queda.', indicador: 'NPS clientes B2B', baseline: 58, unidade: 'NPS', benchmark: 72, fonte_benchmark: 'Histórico próprio 2024', gap: -14 },
  estrategica:    { descricao: 'Decisão de R$ 4,8mi paralisada. Janela crítica: segunda safra de pedidos do setor de bebidas.', indicador: 'Contratos plurianuais em risco', baseline: 3, unidade: 'contratos', benchmark: 0, fonte_benchmark: 'Política comercial', gap: 3 },
  calc: { receita_perdida: 1840000, custo_evitavel: 920000, custo_oportunidade: 2100000, penalidade: 0 },
  reformulacao: 'A linha de flexografia opera a 18% de OEE (vs. benchmark 68%), gerando 38% de pedidos atrasados e impacto financeiro estimado em R$ 4,86 milhões/ano. O problema NÃO É falta de capacidade instalada, mas baixa utilização da capacidade existente — 82% da capacidade da máquina atual está sendo desperdiçada em paradas, setup, retrabalho e velocidade subótima. A janela para reverter é o segundo semestre de 2026, antes da próxima safra de pedidos do setor de bebidas.'
};

// ============================================================
// T01 — BRIEFING INICIAL
// ============================================================

function renderT01() {
  const d = T01_EXAMPLE;
  const areas = ['Operações','Logística','Comercial','Financeiro','RH','TI','Qualidade','Jurídico','Marketing','Outros'];

  return `
    <div style="max-width:760px;margin:0 auto;" class="fade-in">

      <!-- Cabeçalho -->
      <div class="flex items-center gap-3 mb-2">
        <button class="btn btn-ghost btn-sm" onclick="navigate('franchisee_case')">${icon('arrow_right',14)}</button>
        <span class="text-muted text-sm">Caso CASE-2026-0042 /</span>
        <span class="font-semibold text-sm">T01 — Briefing Inicial</span>
      </div>
      <div class="card mb-4" style="background:var(--primary);color:white;border:none;padding:20px 24px;">
        <div class="flex items-start justify-between">
          <div>
            <div style="font-size:11px;opacity:0.6;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Fase Define · Template 1 de 3</div>
            <div style="font-size:20px;font-weight:800;">T01 — Briefing Inicial</div>
            <div style="opacity:0.75;font-size:13px;margin-top:4px;">Capture o problema na linguagem do cliente. A reformulação acontece em T03, depois das evidências.</div>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-sm" id="btn-ai-t01" style="background:rgba(255,255,255,0.15);color:white;border:1px solid rgba(255,255,255,0.3);" onclick="showT01AIPanel()" disabled>
              ${icon('ai',14)} Sugestões da Base
            </button>
          </div>
        </div>

        <!-- Progresso dos 4 blocos -->
        <div style="margin-top:16px;display:flex;gap:8px;">
          ${['1','2','3','4'].map((n,i) => `
            <div style="display:flex;align-items:center;gap:6px;">
              <div id="block-indicator-${n}" style="width:24px;height:24px;border-radius:50%;background:${i===0?'white':'rgba(255,255,255,0.2)'};color:${i===0?'var(--primary)':'rgba(255,255,255,0.8)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">${n}</div>
              <span style="font-size:11px;opacity:${i===0?'1':'0.5'};">${['Identificação','Problema','Contexto','Expectativas'][i]}</span>
              ${i<3 ? '<span style="opacity:0.3;margin-left:2px;">›</span>' : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- BLOCO 1 — Identificação -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">1</div>
          <div>
            <div class="card-title">Identificação do Caso</div>
            <div class="card-subtitle">Preenchido automaticamente a partir do cadastro</div>
          </div>
        </div>
        <div class="grid-2" style="gap:12px;">
          ${Object.entries(d.identificacao).map(([k,v]) => {
            const labels = { caso:'Código do Caso', empresa:'Empresa Cliente', cnpj:'CNPJ', setor:'Setor de Atuação', porte:'Porte da Empresa', especialista:'Especialista Responsável', produto:'Produto Contratado', data_inicio:'Data de Início' };
            return `
              <div class="form-group">
                <label class="form-label" style="color:var(--text-secondary);">${labels[k]||k}</label>
                <input class="form-input" value="${v}" readonly style="background:var(--surface-2);color:var(--text-secondary);cursor:default;">
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- BLOCO 2 — Problema reportado -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">2</div>
          <div>
            <div class="card-title">Problema Reportado pelo Cliente</div>
            <div class="card-subtitle">Use as próprias palavras do cliente. Não reformule ainda.</div>
          </div>
        </div>

        <div class="form-group mb-4">
          <label class="form-label">Problema Principal Reportado <span style="color:var(--danger);">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Descreva o problema usando as próprias palavras do cliente. Não reformule ainda.</div>
          <textarea class="form-textarea" id="t01-problema" rows="5"
            placeholder="Ex: Os custos de frete subiram 30% no último ano e os clientes estão reclamando dos atrasos..."
            oninput="validateT01Field('t01-problema',200,1500);checkT01AIButton()"
            style="min-height:120px;">${d.problema_reportado.problema_principal}</textarea>
          <div class="flex justify-between mt-1">
            <div id="t01-problema-hint" class="form-hint"></div>
            <div id="t01-problema-count" style="font-size:11px;color:var(--text-muted);">${d.problema_reportado.problema_principal.length}/1500</div>
          </div>
        </div>

        <div class="form-group mb-4">
          <label class="form-label">Dor Sentida pelo Cliente <span style="color:var(--danger);">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Como o problema afeta o cliente no dia a dia? O que dói?</div>
          <textarea class="form-textarea" id="t01-dor" rows="3"
            placeholder="Ex: Estou perdendo clientes para a concorrência e a margem da operação está caindo..."
            oninput="validateT01Field('t01-dor',100,800);updateCharCount('t01-dor',800)"
            style="min-height:90px;">${d.problema_reportado.dor_sentida}</textarea>
          <div class="flex justify-between mt-1">
            <div id="t01-dor-hint" class="form-hint"></div>
            <div id="t01-dor-count" style="font-size:11px;color:var(--text-muted);">${d.problema_reportado.dor_sentida.length}/800</div>
          </div>
        </div>

        <div class="form-group mb-4">
          <label class="form-label">Solução que o Cliente Já Imagina</label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">O cliente já tem alguma solução em mente? Registre — mesmo que pareça errada.</div>
          <textarea class="form-textarea" id="t01-solucao" rows="2"
            placeholder="Ex: O cliente acha que precisa contratar uma transportadora terceirizada..."
            oninput="checkSolucaoImaginda();updateCharCount('t01-solucao',500)"
            style="min-height:70px;">${d.problema_reportado.solucao_imaginada}</textarea>
          <div class="flex justify-between mt-1">
            <div id="t01-solucao-hint" class="form-hint"></div>
            <div id="t01-solucao-count" style="font-size:11px;color:var(--text-muted);">${d.problema_reportado.solucao_imaginada.length}/500</div>
          </div>
          <div id="t01-solucao-alert" class="alert alert-warning mt-2">
            ${icon('alert',14)} <div style="font-size:13px;"><strong>Atenção:</strong> o cliente já tem solução em mente. Isso é importante registrar, mas o método AXISUS investigará causa raiz antes de validar essa solução.</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tentativas Anteriores de Resolver</label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">O cliente já tentou resolver? Quais soluções foram tentadas e por que não funcionaram?</div>
          <textarea class="form-textarea" id="t01-tentativas" rows="2"
            placeholder="Investigar por que não funcionou frequentemente revela a causa raiz..."
            oninput="checkTentativas();updateCharCount('t01-tentativas',800)"
            style="min-height:70px;">${d.problema_reportado.tentativas_anteriores}</textarea>
          <div id="t01-tentativas-alert" class="alert alert-info mt-2" style="display:flex;">
            ${icon('alert',14)} <div style="font-size:13px;margin-left:8px;">Investigue por que as tentativas anteriores não funcionaram. Frequentemente isso revela a causa raiz.</div>
          </div>
          <div class="flex justify-between mt-1">
            <div></div>
            <div id="t01-tentativas-count" style="font-size:11px;color:var(--text-muted);">${d.problema_reportado.tentativas_anteriores.length}/800</div>
          </div>
        </div>
      </div>

      <!-- BLOCO 3 — Contexto da operação -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">3</div>
          <div>
            <div class="card-title">Contexto da Operação</div>
            <div class="card-subtitle">Onde, quando e como o problema ocorre.</div>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label mb-2">Área / Departamento Afetado <span style="color:var(--danger);">*</span></label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;" id="areas-container">
            ${areas.map(a => `
              <button type="button" class="btn btn-sm ${d.contexto.areas_afetadas.includes(a) ? 'btn-primary' : 'btn-secondary'}"
                onclick="toggleArea(this,'${a}')" data-area="${a}">${a}</button>
            `).join('')}
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Áreas selecionadas pré-populam o T02 (Is/Is Not — dimensão ONDE).</div>
        </div>

        <div class="grid-2" style="gap:14px;">
          <div class="form-group">
            <label class="form-label">Processo Principal Envolvido <span style="color:var(--danger);">*</span></label>
            <input class="form-input" id="t01-processo" value="${d.contexto.processo_principal}" placeholder="Ex: Recebimento → Separação → Expedição">
          </div>
          <div class="form-group">
            <label class="form-label">Quem Reportou Primeiro o Problema <span style="color:var(--danger);">*</span></label>
            <input class="form-input" id="t01-quem-reportou" value="${d.contexto.quem_reportou}" placeholder="Nome e cargo">
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Pré-popula stakeholders no T02.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Há Quanto Tempo o Problema Existe <span style="color:var(--danger);">*</span></label>
            <select class="form-select" id="t01-tempo">
              ${[['menos_1_mes','< 1 mês'],['1_6_meses','1 a 6 meses'],['6_12_meses','6 a 12 meses'],['1_3_anos','1 a 3 anos'],['mais_3_anos','> 3 anos']].map(([v,l]) => `
                <option value="${v}" ${v===d.contexto.tempo_existencia?'selected':''}>${l}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Frequência da Ocorrência <span style="color:var(--danger);">*</span></label>
            <select class="form-select" id="t01-frequencia">
              ${[['diaria','Diária'],['semanal','Semanal'],['mensal','Mensal'],['trimestral','Trimestral'],['eventual','Eventual']].map(([v,l]) => `
                <option value="${v}" ${v===d.contexto.frequencia?'selected':''}>${l}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-group mt-4">
          <label class="form-label">Urgência Percebida pelo Cliente <span style="color:var(--danger);">*</span> <span style="font-weight:400;color:var(--text-muted);">(1 = pode esperar · 5 = crítico)</span></label>
          <div style="display:flex;gap:10px;margin-top:8px;" id="urgencia-buttons">
            ${[1,2,3,4,5].map(n => `
              <button type="button" id="urg-${n}" onclick="selectUrgencia(${n})"
                style="flex:1;padding:12px;border-radius:10px;border:2px solid ${n===d.contexto.urgencia?'var(--primary)':'var(--border)'};
                  background:${n===d.contexto.urgencia?'var(--primary)':'white'};
                  color:${n===d.contexto.urgencia?'white':'var(--text-primary)'};
                  font-size:18px;font-weight:800;cursor:pointer;transition:all 0.15s;">${n}</button>
            `).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:4px;">
            <span>Pode esperar</span><span>Crítico / Urgente</span>
          </div>
        </div>
      </div>

      <!-- BLOCO 4 — Expectativas e restrições -->
      <div class="card mb-6">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">4</div>
          <div>
            <div class="card-title">Expectativas e Restrições</div>
            <div class="card-subtitle">O que o cliente espera receber e o que NÃO pode ser feito.</div>
          </div>
        </div>

        <div class="form-group mb-4">
          <label class="form-label">Resultado Esperado em 90 dias <span style="color:var(--danger);">*</span></label>
          <textarea class="form-textarea" id="t01-result90" rows="2"
            oninput="validateT01Field('t01-result90',200,800);updateCharCount('t01-result90',800)"
            style="min-height:80px;">${d.expectativas.resultado_90_dias}</textarea>
          <div class="flex justify-between mt-1">
            <div id="t01-result90-hint" class="form-hint"></div>
            <div id="t01-result90-count" style="font-size:11px;color:var(--text-muted);">${d.expectativas.resultado_90_dias.length}/800</div>
          </div>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Resultado Esperado em 12 meses <span style="color:var(--danger);">*</span></label>
          <textarea class="form-textarea" id="t01-result12" rows="2"
            oninput="validateT01Field('t01-result12',200,800);updateCharCount('t01-result12',800)"
            style="min-height:80px;">${d.expectativas.resultado_12_meses}</textarea>
          <div class="flex justify-between mt-1">
            <div id="t01-result12-hint" class="form-hint"></div>
            <div id="t01-result12-count" style="font-size:11px;color:var(--text-muted);">${d.expectativas.resultado_12_meses.length}/800</div>
          </div>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Indicador de Sucesso Definido pelo Cliente <span style="color:var(--danger);">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Pré-popula a dimensão de medição prioritária no T03.</div>
          <input class="form-input" id="t01-indicador" value="${d.expectativas.indicador_sucesso}"
            placeholder="Ex: Redução do lead time de entrega para 18 dias úteis">
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Restrições Conhecidas</label>
          <textarea class="form-textarea" id="t01-restricoes" rows="2"
            placeholder='Ex: "não pode envolver demissões", "orçamento máximo R$ 200k"'
            style="min-height:70px;">${d.expectativas.restricoes}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Aprovação Final Depende De <span style="color:var(--danger);">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Identifique quem precisa aprovar o resultado. Pré-popula stakeholders no T02.</div>
          <input class="form-input" id="t01-aprovacao" value="${d.expectativas.aprovacao_depende_de}"
            placeholder="Ex: Diretor de Operações com aval do CFO">
        </div>
      </div>

      <!-- Rodapé de ações -->
      <div class="card" style="position:sticky;bottom:0;z-index:10;border-top:2px solid var(--primary);">
        <div class="flex items-center justify-between">
          <div style="font-size:12px;color:var(--text-muted);" id="t01-autosave-status">
            ${icon('check',14)} Rascunho salvo automaticamente.
          </div>
          <div class="flex gap-2">
            <button class="btn btn-secondary" onclick="saveT01Draft()">Salvar Rascunho</button>
            <button class="btn btn-primary" id="btn-complete-t01" onclick="completeT01()">
              ${icon('check',14)} Marcar como Completo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Painel IA (lateral) -->
    <div id="ai-panel" style="display:none;position:fixed;top:64px;right:0;bottom:0;width:340px;background:white;border-left:1px solid var(--border);overflow-y:auto;z-index:200;box-shadow:-4px 0 20px rgba(0,0,0,0.1);">
      <div style="padding:20px;border-bottom:1px solid var(--border);">
        <div class="flex items-center justify-between mb-1">
          <div style="font-size:15px;font-weight:700;">Sugestões da Base</div>
          <button class="btn btn-ghost btn-icon" onclick="document.getElementById('ai-panel').style.display='none'">${icon('x',18)}</button>
        </div>
        <div style="font-size:12px;color:var(--text-muted);">Baseado na biblioteca de casos AXISUS · Claude Sonnet 4</div>
      </div>
      <div style="padding:16px;">
        <div class="alert alert-info mb-4" style="font-size:12px;">${icon('eye',14)} As sugestões são referências — a decisão final é sempre do especialista.</div>

        <div style="margin-bottom:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);margin-bottom:10px;">Casos Similares na Biblioteca</div>
          ${[
            { setor:'Manufatura', prob:'OEE baixo em linha produtiva', reformulado:'Subutilização de 74% da capacidade instalada por setup e paradas', resultado:'+18pp OEE em 90 dias' },
            { setor:'Logística',  prob:'Atrasos crescentes nas entregas', reformulado:'Roteirização inadequada gera 23% de retrabalho logístico', resultado:'23% redução de custos' },
          ].map(c => `
            <div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;">
              <div class="badge badge-primary" style="margin-bottom:6px;font-size:10px;">${c.setor}</div>
              <div style="font-size:12px;font-weight:600;margin-bottom:4px;">${c.prob}</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px;">Reformulado: "${c.reformulado}"</div>
              <div class="badge badge-green" style="font-size:10px;">${c.resultado}</div>
              <div class="flex gap-1 mt-2">
                <button class="btn btn-primary btn-sm" style="flex:1;" onclick="showToast('Caso aceito como referência!')">Aceitar</button>
                <button class="btn btn-ghost btn-sm" style="flex:1;" onclick="this.closest('div[style]').style.opacity='0.4'">Ignorar</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);margin-bottom:10px;">Perguntas de Aprofundamento</div>
          ${[
            'Qual é o OEE atual de cada linha de produção, medido com os 3 componentes (disponibilidade, performance, qualidade)?',
            'Quais foram as 5 maiores causas de parada não planejada nos últimos 6 meses?',
            'Existe histórico do tempo de setup médio? Variou nos últimos 12 meses?',
            'O retrabalho é registrado sistematicamente? Por turno, por operador, por produto?',
            'A decisão de compra da máquina foi baseada em análise de capacidade ou em proposta comercial das fornecedoras?',
          ].map((q,i) => `
            <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:6px;font-size:12px;">
              <div style="color:var(--text-primary);margin-bottom:6px;">${i+1}. ${q}</div>
              <div class="flex gap-1">
                <button class="btn btn-primary btn-sm" style="font-size:10px;padding:3px 8px;" onclick="showToast('Pergunta copiada!')">Copiar</button>
                <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 8px;" onclick="this.closest('div[style]').style.opacity='0.3'">Ignorar</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);margin-bottom:10px;">Risco de Reformulação Prematura</div>
          <div class="alert alert-warning" style="font-size:12px;">
            ${icon('alert',14)}
            <div style="margin-left:8px;">A solução imaginada (compra de máquina) é típica de diagnósticos de <strong>capacidade</strong>, mas os atrasos reportados frequentemente têm causa raiz em <strong>eficiência e processo</strong>. Recomenda-se validar com dados de OEE antes de qualquer recomendação.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindT01Events() {
  // Auto-save simulado
  setInterval(() => {
    const el = document.getElementById('t01-autosave-status');
    if (el) el.innerHTML = `${icon('check',12)} Salvo às ${new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
  }, 30000);
  checkSolucaoImaginda();
  checkTentativas();
  checkT01AIButton();
}

function validateT01Field(id, min, max) {
  const el = document.getElementById(id);
  const hint = document.getElementById(id + '-hint');
  const count = document.getElementById(id + '-count');
  if (!el) return;
  const len = el.value.length;
  if (count) count.textContent = `${len}/${max}`;
  if (!hint) return;
  if (len < min && len > 0) {
    hint.style.color = 'var(--danger)';
    hint.textContent = `Mínimo ${min} caracteres (${min - len} faltando). Um briefing completo tem mais contexto.`;
    el.style.borderColor = 'var(--danger)';
  } else if (len >= min) {
    hint.style.color = 'var(--accent)';
    hint.textContent = '';
    el.style.borderColor = 'var(--accent)';
  } else {
    hint.textContent = '';
    el.style.borderColor = '';
  }
}

function updateCharCount(id, max) {
  const el = document.getElementById(id);
  const count = document.getElementById(id + '-count');
  if (el && count) count.textContent = `${el.value.length}/${max}`;
}

function checkSolucaoImaginda() {
  const el = document.getElementById('t01-solucao');
  const alert = document.getElementById('t01-solucao-alert');
  if (!el || !alert) return;
  alert.style.display = el.value.length > 20 ? 'flex' : 'none';
}

function checkTentativas() {
  const el = document.getElementById('t01-tentativas');
  const alert = document.getElementById('t01-tentativas-alert');
  if (!el || !alert) return;
  alert.style.display = el.value.length > 20 ? 'flex' : 'none';
}

function checkT01AIButton() {
  const el = document.getElementById('t01-problema');
  const btn = document.getElementById('btn-ai-t01');
  if (!el || !btn) return;
  const enabled = el.value.length >= 200;
  btn.disabled = !enabled;
  btn.title = enabled ? 'Clique para ver sugestões da base de casos AXISUS' : 'Preencha pelo menos o Problema Principal para receber sugestões da base';
  btn.style.opacity = enabled ? '1' : '0.6';
}

function toggleArea(btn, area) {
  const isActive = btn.classList.contains('btn-primary');
  btn.classList.toggle('btn-primary', !isActive);
  btn.classList.toggle('btn-secondary', isActive);
}

function selectUrgencia(n) {
  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`urg-${i}`);
    if (!btn) continue;
    const active = i === n;
    btn.style.background = active ? 'var(--primary)' : 'white';
    btn.style.color = active ? 'white' : 'var(--text-primary)';
    btn.style.borderColor = active ? 'var(--primary)' : 'var(--border)';
  }
}

function showT01AIPanel() {
  const panel = document.getElementById('ai-panel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function saveT01Draft() {
  const el = document.getElementById('t01-autosave-status');
  if (el) el.innerHTML = `${icon('check',12)} Rascunho salvo às ${new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
  showToast('Rascunho salvo.');
}

function completeT01() {
  const required = ['t01-problema','t01-dor','t01-result90','t01-result12','t01-indicador','t01-aprovacao','t01-quem-reportou','t01-processo'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.value.trim().length < 10) {
      if (el) el.style.borderColor = 'var(--danger)';
      valid = false;
    }
  });
  const problema = document.getElementById('t01-problema');
  if (problema && problema.value.length < 200) {
    showToast('Briefing curto demais. O Problema Principal precisa de pelo menos 200 caracteres.', 'error');
    return;
  }
  if (!valid) {
    showToast('Preencha todos os campos obrigatórios antes de concluir.', 'error');
    return;
  }
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Confirmar conclusão do T01</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4">${icon('check',16)} Todos os campos obrigatórios estão preenchidos.</div>
        <p class="text-secondary text-sm">Ao marcar como completo, o T01 ficará disponível para revisão e os dados serão pré-populados no T02 e T03.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('T01 marcado como completo. Próximo passo: T02 (Is/Is Not + Stakeholders).');navigate('template_t02');">
          ${icon('check',14)} Confirmar
        </button>
      </div>
    </div>
  `);
}


// ============================================================
// T02 — IS / IS NOT + STAKEHOLDERS
// ============================================================

function renderT02() {
  const d = T02_EXAMPLE;

  return `
    <div style="max-width:960px;margin:0 auto;" class="fade-in">

      <!-- Cabeçalho -->
      <div class="flex items-center gap-3 mb-2">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t01')">${icon('arrow_right',14)}</button>
        <span class="text-muted text-sm">T01 — Briefing /</span>
        <span class="font-semibold text-sm">T02 — Is / Is Not + Stakeholders</span>
      </div>
      <div class="card mb-4" style="background:var(--primary);color:white;border:none;padding:20px 24px;">
        <div class="flex items-start justify-between">
          <div>
            <div style="font-size:11px;opacity:0.6;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Fase Define · Template 2 de 3</div>
            <div style="font-size:20px;font-weight:800;">T02 — Is / Is Not + Stakeholders</div>
            <div style="opacity:0.75;font-size:13px;margin-top:4px;">Delimite com precisão o que está e o que NÃO está no escopo. Mapeie quem afeta e é afetado pelo problema.</div>
          </div>
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.15);color:white;border:1px solid rgba(255,255,255,0.3);" onclick="showT02StakeholderSuggest()">
            ${icon('ai',14)} Verificar Stakeholders
          </button>
        </div>
      </div>

      <!-- SEÇÃO 1: Is / Is Not -->
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="card-title">Is / Is Not — Delimitação de Escopo</div>
            <div class="card-subtitle">Defina exatamente o que está e o que NÃO está sendo diagnosticado nas 4 dimensões.</div>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:var(--surface-3);">
                <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);border:1px solid var(--border);width:90px;">Dimensão</th>
                <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#166534;border:1px solid var(--border);">IS ✓ — O que faz parte do problema</th>
                <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#991B1B;border:1px solid var(--border);">IS NOT ✗ — O que será excluído</th>
                <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);border:1px solid var(--border);">Por quê?</th>
                <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);border:1px solid var(--border);">Evidência</th>
              </tr>
            </thead>
            <tbody>
              ${d.is_is_not.map((row, idx) => `
                <tr>
                  <td style="padding:12px 14px;border:1px solid var(--border);vertical-align:top;">
                    <div style="background:var(--primary);color:white;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:800;text-align:center;">${row.dimensao}</div>
                    <button class="btn btn-ghost btn-sm" style="margin-top:6px;font-size:10px;width:100%;justify-content:center;" onclick="showIsIsNotAI('${row.dimensao}',${idx})">
                      ${icon('ai',11)} Sugestão IA
                    </button>
                  </td>
                  <td style="padding:4px;border:1px solid var(--border);vertical-align:top;">
                    <textarea style="width:100%;min-height:80px;border:none;outline:none;font-size:13px;padding:8px;font-family:inherit;resize:vertical;background:#F0FDF4;" id="is-${idx}">${row.is}</textarea>
                  </td>
                  <td style="padding:4px;border:1px solid var(--border);vertical-align:top;">
                    <textarea style="width:100%;min-height:80px;border:none;outline:none;font-size:13px;padding:8px;font-family:inherit;resize:vertical;background:#FEF2F2;" id="isnot-${idx}">${row.is_not}</textarea>
                  </td>
                  <td style="padding:4px;border:1px solid var(--border);vertical-align:top;">
                    <textarea style="width:100%;min-height:80px;border:none;outline:none;font-size:13px;padding:8px;font-family:inherit;resize:vertical;" id="porque-${idx}">${row.por_que}</textarea>
                  </td>
                  <td style="padding:4px;border:1px solid var(--border);vertical-align:top;">
                    <textarea style="width:100%;min-height:80px;border:none;outline:none;font-size:13px;padding:8px;font-family:inherit;resize:vertical;color:var(--text-secondary);" id="evidencia-${idx}" placeholder="Fonte dos dados...">${row.evidencia}</textarea>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="alert alert-warning mt-4" style="font-size:12px;">
          ${icon('alert',14)}
          <div style="margin-left:8px;">Se a dimensão QUANTO ainda não está quantificada, tudo bem — o T03 irá aprofundar. Mas estime ordem de grandeza aqui.</div>
        </div>
      </div>

      <!-- SEÇÃO 2: Stakeholders -->
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="card-title">Mapa de Stakeholders</div>
            <div class="card-subtitle">Mínimo 4 stakeholders · Pelo menos 1 Aprovador · Pelo menos 1 com Poder ≥ 4</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="addStakeholder()">
            ${icon('plus',14)} Adicionar
          </button>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;" id="stakeholders-table">
            <thead>
              <tr style="background:var(--surface-3);">
                ${['Nome','Cargo / Função','Área','Poder','Interesse','RACI','Posicionamento',''].map(h => `
                  <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);border:1px solid var(--border);white-space:nowrap;">${h}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody id="stakeholders-body">
              ${d.stakeholders.map((s,i) => renderStakeholderRow(s, i)).join('')}
            </tbody>
          </table>
        </div>

        <!-- Alertas de validação -->
        <div id="stk-alerts" style="margin-top:12px;display:flex;flex-direction:column;gap:6px;">
          ${checkStakeholderAlerts(d.stakeholders)}
        </div>
      </div>

      <!-- SEÇÃO 3: Matriz Poder × Interesse -->
      <div class="card mb-6">
        <div class="card-header">
          <div>
            <div class="card-title">Matriz Poder × Interesse</div>
            <div class="card-subtitle">Visualização dos stakeholders por quadrante estratégico</div>
          </div>
        </div>
        ${renderPowerMatrix(d.stakeholders)}
      </div>

      <!-- Rodapé -->
      <div class="card" style="position:sticky;bottom:0;z-index:10;border-top:2px solid var(--primary);">
        <div class="flex items-center justify-between">
          <div style="font-size:12px;color:var(--text-muted);">${icon('check',14)} Rascunho salvo automaticamente.</div>
          <div class="flex gap-2">
            <button class="btn btn-secondary" onclick="navigate('template_t01')">${icon('arrow_right',14)} Voltar T01</button>
            <button class="btn btn-secondary" onclick="saveT01Draft()">Salvar Rascunho</button>
            <button class="btn btn-primary" onclick="completeT02()">${icon('check',14)} Marcar como Completo</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStakeholderRow(s, i) {
  const raciOpts = ['Responsável','Aprovador','Consultado','Informado'];
  const posOpts = ['Apoiador','Neutro','Resistente','Desconhecido'];
  const posBadge = { Apoiador:'badge-green', Neutro:'badge-gray', Resistente:'badge-red', Desconhecido:'badge-yellow' };

  return `
    <tr id="stk-row-${i}" style="vertical-align:middle;">
      <td style="padding:8px 10px;border:1px solid var(--border);">
        <input value="${s.nome}" style="border:none;outline:none;font-size:13px;font-weight:600;width:100%;font-family:inherit;" placeholder="Nome completo">
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);">
        <input value="${s.cargo}" style="border:none;outline:none;font-size:13px;width:100%;font-family:inherit;" placeholder="Cargo">
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);">
        <input value="${s.area}" style="border:none;outline:none;font-size:13px;width:90px;font-family:inherit;" placeholder="Área">
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);text-align:center;">
        <select style="border:1px solid var(--border);border-radius:6px;padding:4px;font-size:13px;font-weight:700;color:var(--primary);">
          ${[1,2,3,4,5].map(n => `<option ${n===s.poder?'selected':''}>${n}</option>`).join('')}
        </select>
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);text-align:center;">
        <select style="border:1px solid var(--border);border-radius:6px;padding:4px;font-size:13px;font-weight:700;color:#3B82F6;">
          ${[1,2,3,4,5].map(n => `<option ${n===s.interesse?'selected':''}>${n}</option>`).join('')}
        </select>
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);">
        <select style="border:1px solid var(--border);border-radius:6px;padding:4px;font-size:12px;width:100%;">
          ${raciOpts.map(r => `<option ${r===s.raci?'selected':''}>${r}</option>`).join('')}
        </select>
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);">
        <select style="border:1px solid var(--border);border-radius:6px;padding:4px;font-size:12px;width:100%;">
          ${posOpts.map(p => `<option ${p===s.posicionamento?'selected':''}>${p}</option>`).join('')}
        </select>
      </td>
      <td style="padding:8px 10px;border:1px solid var(--border);text-align:center;">
        <button class="btn btn-ghost btn-icon btn-sm" onclick="document.getElementById('stk-row-${i}').remove()" title="Remover">${icon('x',14)}</button>
      </td>
    </tr>
  `;
}

function checkStakeholderAlerts(stks) {
  const alerts = [];
  if (!stks.some(s => s.raci === 'Aprovador')) {
    alerts.push(`<div class="alert alert-danger" style="font-size:12px;">${icon('alert',14)} <span style="margin-left:8px;">Nenhum Aprovador identificado. Identifique quem tem poder de decisão final.</span></div>`);
  }
  if (!stks.some(s => s.poder >= 4)) {
    alerts.push(`<div class="alert alert-warning" style="font-size:12px;">${icon('alert',14)} <span style="margin-left:8px;">Nenhum stakeholder com Poder ≥ 4. Verifique se o decisor foi mapeado.</span></div>`);
  }
  if (stks.every(s => s.posicionamento === 'Apoiador' || s.posicionamento === 'Neutro')) {
    alerts.push(`<div class="alert alert-warning" style="font-size:12px;">${icon('alert',14)} <span style="margin-left:8px;">Cenário improvável: todo problema operacional tem resistência. Verifique se você está mapeando os stakeholders reais.</span></div>`);
  }
  return alerts.join('');
}

function renderPowerMatrix(stks) {
  const quadrantInfo = [
    { label: 'Jogadores Principais',  xRange:[3,5], yRange:[3,5], color:'#065F46', bg:'#D1FAE5', desc:'Alto Poder · Alto Interesse' },
    { label: 'Manter Satisfeitos',    xRange:[0,3], yRange:[3,5], color:'#92400E', bg:'#FEF3C7', desc:'Alto Poder · Baixo Interesse' },
    { label: 'Manter Informados',     xRange:[3,5], yRange:[0,3], color:'#1E40AF', bg:'#DBEAFE', desc:'Baixo Poder · Alto Interesse' },
    { label: 'Monitorar',             xRange:[0,3], yRange:[0,3], color:'#475569', bg:'#F1F5F9', desc:'Baixo Poder · Baixo Interesse' },
  ];

  const posColor = { Apoiador:'#10B981', Neutro:'#6B7280', Resistente:'#EF4444', Desconhecido:'#F59E0B' };

  const W = 400, H = 300, PAD = 40;

  const points = stks.map(s => {
    const x = PAD + ((s.interesse - 1) / 4) * (W - PAD*2);
    const y = H - PAD - ((s.poder - 1) / 4) * (H - PAD*2);
    return { ...s, cx: x, cy: y };
  });

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;">
      <!-- Gráfico SVG -->
      <div>
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;border:1px solid var(--border);border-radius:12px;background:white;">
          <!-- Quadrantes -->
          <rect x="${PAD}" y="${PAD}" width="${(W-PAD*2)/2}" height="${(H-PAD*2)/2}" fill="#FEF3C7" opacity="0.5"/>
          <rect x="${PAD+(W-PAD*2)/2}" y="${PAD}" width="${(W-PAD*2)/2}" height="${(H-PAD*2)/2}" fill="#D1FAE5" opacity="0.5"/>
          <rect x="${PAD}" y="${PAD+(H-PAD*2)/2}" width="${(W-PAD*2)/2}" height="${(H-PAD*2)/2}" fill="#F1F5F9" opacity="0.5"/>
          <rect x="${PAD+(W-PAD*2)/2}" y="${PAD+(H-PAD*2)/2}" width="${(W-PAD*2)/2}" height="${(H-PAD*2)/2}" fill="#DBEAFE" opacity="0.5"/>

          <!-- Rótulos quadrantes -->
          <text x="${PAD+8}" y="${PAD+16}" fill="#92400E" font-size="9" font-weight="600">Manter Satisfeitos</text>
          <text x="${PAD+(W-PAD*2)/2+8}" y="${PAD+16}" fill="#065F46" font-size="9" font-weight="600">Jogadores Principais</text>
          <text x="${PAD+8}" y="${H-PAD-8}" fill="#475569" font-size="9" font-weight="600">Monitorar</text>
          <text x="${PAD+(W-PAD*2)/2+8}" y="${H-PAD-8}" fill="#1E40AF" font-size="9" font-weight="600">Manter Informados</text>

          <!-- Eixos -->
          <line x1="${PAD}" y1="${PAD}" x2="${PAD}" y2="${H-PAD}" stroke="#E2E8F0" stroke-width="1.5"/>
          <line x1="${PAD}" y1="${H-PAD}" x2="${W-PAD}" y2="${H-PAD}" stroke="#E2E8F0" stroke-width="1.5"/>
          <line x1="${W/2}" y1="${PAD}" x2="${W/2}" y2="${H-PAD}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
          <line x1="${PAD}" y1="${H/2}" x2="${W-PAD}" y2="${H/2}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>

          <!-- Labels eixos -->
          <text x="${W/2}" y="${H-6}" fill="#94A3B8" font-size="9" text-anchor="middle">← Interesse →</text>
          <text x="10" y="${H/2}" fill="#94A3B8" font-size="9" text-anchor="middle" transform="rotate(-90,10,${H/2})">← Poder →</text>

          <!-- Valores eixos -->
          ${[1,2,3,4,5].map(n => {
            const xi = PAD + ((n-1)/4)*(W-PAD*2);
            const yi = H - PAD - ((n-1)/4)*(H-PAD*2);
            return `
              <text x="${xi}" y="${H-PAD+12}" fill="#94A3B8" font-size="8" text-anchor="middle">${n}</text>
              <text x="${PAD-6}" y="${yi+3}" fill="#94A3B8" font-size="8" text-anchor="end">${n}</text>
            `;
          }).join('')}

          <!-- Pontos -->
          ${points.map(p => `
            <g>
              <circle cx="${p.cx}" cy="${p.cy}" r="10" fill="${posColor[p.posicionamento]||'#6B7280'}" opacity="0.9"/>
              <text x="${p.cx}" y="${p.cy+4}" fill="white" font-size="8" font-weight="700" text-anchor="middle">${p.nome.split(' ')[0][0]}${p.nome.split(' ').slice(-1)[0][0]}</text>
              <title>${p.nome} · Poder:${p.poder} · Interesse:${p.interesse} · ${p.posicionamento}</title>
            </g>
          `).join('')}
        </svg>
      </div>

      <!-- Legenda -->
      <div>
        <div style="font-size:12px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);">Legenda</div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
          ${Object.entries(posColor).map(([pos, color]) => `
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:12px;height:12px;border-radius:50%;background:${color};flex-shrink:0;"></div>
              <span style="font-size:12px;">${pos}</span>
            </div>
          `).join('')}
        </div>
        <div style="font-size:11px;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-secondary);">Stakeholders</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          ${stks.map(s => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:var(--surface-2);">
              <div style="width:8px;height:8px;border-radius:50%;background:${posColor[s.posicionamento]||'#6B7280'};flex-shrink:0;"></div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.nome}</div>
                <div style="font-size:10px;color:var(--text-muted);">${s.cargo} · P:${s.poder} I:${s.interesse}</div>
              </div>
              <span class="badge ${s.posicionamento==='Resistente'?'badge-red':s.posicionamento==='Apoiador'?'badge-green':s.posicionamento==='Desconhecido'?'badge-yellow':'badge-gray'}" style="font-size:9px;">${s.raci}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function addStakeholder() {
  const tbody = document.getElementById('stakeholders-body');
  if (!tbody) return;
  const i = tbody.querySelectorAll('tr').length;
  const tr = document.createElement('tr');
  tr.id = `stk-row-${i}`;
  tr.innerHTML = renderStakeholderRow({ nome:'', cargo:'', area:'', poder:3, interesse:3, raci:'Consultado', posicionamento:'Desconhecido' }, i);
  tbody.appendChild(tr);
}

function showIsIsNotAI(dimensao, idx) {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div>
          <div class="text-xs text-muted">IA Copiloto · Dimensão</div>
          <div class="modal-title">Sugestões para: ${dimensao}</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('eye',14)} Exemplos de como outros casos AXISUS delimitaram esta dimensão para problemas similares.</div>
        ${[
          { is:'Linha de produção principal (L1 e L2)', isnot:'Linhas auxiliares e área de embalagem final', fonte:'CASE-2025-0031 · Manufatura' },
          { is:'Turnos de produção com ocorrência de parada ≥ 2h/dia', isnot:'Paradas programadas de manutenção preventiva', fonte:'CASE-2025-0028 · Manufatura' },
        ].map(s => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">${s.fonte}</div>
            <div class="grid-2" style="gap:8px;font-size:12px;">
              <div style="background:#F0FDF4;padding:8px;border-radius:6px;"><strong>IS:</strong> ${s.is}</div>
              <div style="background:#FEF2F2;padding:8px;border-radius:6px;"><strong>IS NOT:</strong> ${s.isnot}</div>
            </div>
            <div class="flex gap-2 mt-2">
              <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('Sugestão aceita como referência!')">Aceitar como referência</button>
              <button class="btn btn-ghost btn-sm" onclick="closeModal()">Ignorar</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

function showT02StakeholderSuggest() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Verificar Stakeholders Esquecidos</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('eye',14)} Com base no setor (Manufatura) e nas áreas afetadas, a IA identificou cargos tipicamente envolvidos que podem estar faltando no seu mapa.</div>
        ${[
          { cargo:'Diretor de Qualidade / Quality Manager', motivo:'Em problemas de OEE, qualidade é frequentemente causa ou efeito. Tem dados de retrabalho.', ja_tem:false },
          { cargo:'Engenheiro de Processos / IE',           motivo:'Responsável técnico pelos parâmetros de velocidade e setup. Fonte primária de dados.', ja_tem:false },
          { cargo:'Controller / Analista Financeiro',       motivo:'Responsável pelos dados de custo de hora-máquina e impacto financeiro do atraso.', ja_tem:false },
          { cargo:'Representante do Sindicato / CIPA',      motivo:'Em mudanças de turno ou processo, sindicato pode ser resistência não mapeada.', ja_tem:true },
        ].map(s => `
          <div style="border:1px solid ${s.ja_tem ? 'var(--accent)' : 'var(--border)'};border-radius:10px;padding:12px;margin-bottom:8px;${s.ja_tem?'opacity:0.6':''}">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge ${s.ja_tem?'badge-green':'badge-yellow'}">${s.ja_tem ? 'Já mapeado' : 'Sugerido'}</span>
              <span style="font-size:13px;font-weight:600;">${s.cargo}</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;">${s.motivo}</div>
            ${!s.ja_tem ? `
              <button class="btn btn-primary btn-sm" onclick="addStakeholder();closeModal();showToast('Linha adicionada na tabela de stakeholders!')">
                ${icon('plus',12)} Adicionar na tabela
              </button>
            ` : ''}
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

function completeT02() {
  showToast('T02 marcado como completo. Próximo passo: T03 (Quantificação da Dor).');
  setTimeout(() => navigate('template_t03'), 1500);
}

function bindT02Events() {}


// ============================================================
// T03 — QUANTIFICAÇÃO DA DOR
// ============================================================

function renderT03() {
  const d = T03_EXAMPLE;

  const dims = [
    { key:'financeira',  label:'Financeira',   icon_name:'dollar',   color:'#10B981', bg:'#F0FDF4', desc:'Quanto este problema custa por ano? Receita perdida, custo evitável, oportunidade não realizada.' },
    { key:'operacional', label:'Operacional',  icon_name:'chart',    color:'#3B82F6', bg:'#EFF6FF', desc:'Que indicador operacional está fora do benchmark? OEE, lead time, qualidade, produtividade.' },
    { key:'reputacional',label:'Reputacional', icon_name:'star',     color:'#8B5CF6', bg:'#EDE9FE', desc:'Como o problema afeta a percepção de clientes, mercado, equipe? NPS, churn, employer branding.' },
    { key:'estrategica', label:'Estratégica',  icon_name:'trending_up', color:'#F59E0B', bg:'#FFFBEB', desc:'Quais decisões estratégicas estão paralisadas ou em risco? Investimentos, contratos, expansão.' },
  ];

  const calcTotal = d.calc.receita_perdida + d.calc.custo_evitavel + d.calc.custo_oportunidade + d.calc.penalidade;

  return `
    <div style="max-width:900px;margin:0 auto;" class="fade-in">

      <!-- Cabeçalho -->
      <div class="flex items-center gap-3 mb-2">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t02')">${icon('arrow_right',14)}</button>
        <span class="text-muted text-sm">T02 — Is/Is Not /</span>
        <span class="font-semibold text-sm">T03 — Quantificação da Dor</span>
      </div>
      <div class="card mb-4" style="background:var(--primary);color:white;border:none;padding:20px 24px;">
        <div style="font-size:11px;opacity:0.6;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Fase Define · Template 3 de 3</div>
        <div style="font-size:20px;font-weight:800;">T03 — Quantificação da Dor</div>
        <div style="opacity:0.75;font-size:13px;margin-top:4px;">Transforme o problema qualitativo em problema com magnitude conhecida. Sem números, o problema é negociável.</div>
      </div>

      <!-- BLOCO 1: 4 dimensões em grid 2×2 -->
      <div class="grid-2 mb-4">
        ${dims.map(dim => {
          const val = d[dim.key];
          const gapPositivo = (dim.key === 'financeira' || dim.key === 'estrategica') ? val.gap < 0 : val.gap < 0;
          const gapClass = gapPositivo ? 'text-danger' : 'text-accent';

          return `
            <div class="card" style="border-left:4px solid ${dim.color};">
              <div class="flex items-center gap-3 mb-3">
                <div style="width:36px;height:36px;border-radius:10px;background:${dim.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon(dim.icon_name, 18)}</div>
                <div>
                  <div style="font-size:14px;font-weight:700;color:${dim.color};">Dimensão ${dim.label}</div>
                  <div style="font-size:11px;color:var(--text-muted);">${dim.desc}</div>
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label" style="font-size:11px;">Descrição da dor nesta dimensão</label>
                <textarea class="form-textarea" rows="2" style="min-height:60px;font-size:12px;">${val.descricao}</textarea>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                <div class="form-group">
                  <label class="form-label" style="font-size:11px;">Indicador Principal</label>
                  <input class="form-input" style="font-size:12px;" value="${val.indicador}"
                    placeholder="Ex: OEE, Lead Time, NPS...">
                  <button class="btn btn-ghost btn-sm mt-1" style="font-size:10px;width:100%;justify-content:center;" onclick="showIndicatorSuggest('${dim.label}')">
                    ${icon('ai',10)} Indicadores típicos
                  </button>
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:11px;">Unidade</label>
                  <select class="form-select" style="font-size:12px;">
                    ${['BRL','%','NPS','dias','unidades','contratos','pontos'].map(u => `<option ${u===val.unidade?'selected':''}>${u}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                <div class="form-group">
                  <label class="form-label" style="font-size:11px;color:var(--danger);">Baseline Atual</label>
                  <input class="form-input" type="number" value="${val.baseline}" style="font-size:13px;font-weight:700;"
                    oninput="updateGap(this,'${dim.key}')" id="baseline-${dim.key}">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:11px;color:var(--accent);">Benchmark Referência</label>
                  <div style="display:flex;gap:4px;">
                    <input class="form-input" type="number" value="${val.benchmark}" style="font-size:13px;font-weight:700;"
                      oninput="updateGap(this,'${dim.key}')" id="benchmark-${dim.key}" flex:1>
                    <button class="btn btn-ghost btn-icon btn-sm" onclick="showBenchmarkSuggest('${dim.label}','${val.indicador}')" title="Sugerir benchmark via IA" style="flex-shrink:0;">${icon('ai',14)}</button>
                  </div>
                </div>
              </div>

              <div class="form-group mb-2">
                <label class="form-label" style="font-size:11px;">Fonte do Benchmark <span style="color:var(--danger);">*</span></label>
                <input class="form-input" value="${val.fonte_benchmark}" style="font-size:11px;" placeholder="Sebrae, ABM, histórico próprio, literatura...">
              </div>

              <div style="background:${dim.bg};border-radius:8px;padding:10px;text-align:center;">
                <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${dim.color};margin-bottom:4px;">Gap Identificado</div>
                <div id="gap-${dim.key}" style="font-size:22px;font-weight:900;${Math.abs(val.gap) > 0 ? 'color:var(--danger)' : 'color:var(--accent)'}">${val.gap > 0 ? '+' : ''}${val.gap}${val.unidade === '%' ? 'pp' : val.unidade === 'BRL' ? '' : ' '}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- BLOCO 2: Calculadora de Impacto Financeiro -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">2</div>
          <div>
            <div class="card-title">Cálculo de Impacto Financeiro</div>
            <div class="card-subtitle">Quantifique o impacto total em R$/ano. Estimativas são válidas — indique premissas.</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
          ${[
            { key:'receita_perdida',   label:'Receita Perdida (R$/ano)',             hint:'Volume perdido × ticket médio × frequência', val: d.calc.receita_perdida },
            { key:'custo_evitavel',    label:'Custo Evitável (R$/ano)',              hint:'Ineficiência atual × volume × custo unitário', val: d.calc.custo_evitavel },
            { key:'custo_oportunidade',label:'Custo de Oportunidade (R$/ano)',       hint:'Receita não realizada por restrição operacional', val: d.calc.custo_oportunidade },
            { key:'penalidade',        label:'Multa / Penalidade Contratual (R$/ano)',hint:'Se aplicável', val: d.calc.penalidade },
          ].map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface-2);border-radius:10px;">
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;">${item.label}</div>
                <div style="font-size:11px;color:var(--text-muted);">${item.hint}</div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="font-size:13px;color:var(--text-muted);">R$</span>
                <input type="number" class="form-input" value="${item.val}" id="calc-${item.key}"
                  style="width:150px;text-align:right;font-size:15px;font-weight:700;"
                  oninput="updateCalcTotal()">
              </div>
            </div>
          `).join('')}

          <div style="display:flex;align-items:center;gap:12px;padding:16px 16px;background:var(--primary);border-radius:10px;color:white;">
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;">Total Estimado (R$/ano)</div>
              <div style="font-size:11px;opacity:0.7;">Soma de todos os componentes acima</div>
            </div>
            <div style="font-size:28px;font-weight:900;" id="calc-total">
              R$ ${calcTotal.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Premissas do Cálculo</label>
          <textarea class="form-textarea" rows="2" placeholder="Descreva as premissas e fontes usadas no cálculo para que o Hub possa validar..." style="min-height:60px;font-size:12px;">Dados extraídos do ERP da empresa (módulo produção). Volume de pedidos atrasados calculado sobre base histórica 2025. Ticket médio apurado pela área comercial. Contratos plurianuais avaliados pelo valor contratual remanescente.</textarea>
        </div>
        ${calcTotal < 50000 ? `
          <div class="alert alert-danger mt-3" style="font-size:12px;">
            ${icon('alert',14)} Impacto financeiro abaixo do mínimo viável para projeto AXISUS. Reavalie as premissas do cálculo.
          </div>
        ` : `
          <div class="alert alert-success mt-3" style="font-size:12px;">
            ${icon('check',14)} Impacto financeiro expressivo — justifica diagnóstico estruturado.
          </div>
        `}
      </div>

      <!-- BLOCO 3: Tendência -->
      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">3</div>
          <div>
            <div class="card-title">Tendência do Indicador Principal</div>
            <div class="card-subtitle">Evolução do OEE nos últimos 12 meses</div>
          </div>
        </div>

        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 8px;">
          ${[{m:'Jun',v:22},{m:'Jul',v:20},{m:'Ago',v:19},{m:'Set',v:18},{m:'Out',v:17},{m:'Nov',v:18},{m:'Dez',v:16},{m:'Jan',v:17},{m:'Fev',v:19},{m:'Mar',v:18},{m:'Abr',v:18},{m:'Mai',v:18}].map(p => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;">
              <span style="font-size:9px;color:var(--text-muted);">${p.v}%</span>
              <div style="width:100%;background:var(--danger);border-radius:3px 3px 0 0;height:${p.v*2}px;opacity:0.85;"></div>
              <span style="font-size:9px;color:var(--text-muted);">${p.m}</span>
            </div>
          `).join('')}
        </div>

        <div class="alert alert-danger mt-3" style="font-size:12px;">
          ${icon('trending_up',14)} <div style="margin-left:8px;"><strong>Tendência Decrescente</strong> — OEE em queda contínua nos últimos 12 meses. Sugere causa estrutural, não evento pontual.</div>
        </div>
      </div>

      <!-- BLOCO 4: Reformulação do Problema -->
      <div class="card mb-6" style="border:2px solid var(--primary);">
        <div class="flex items-center gap-2 mb-4">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;">4</div>
          <div>
            <div class="card-title">Reformulação do Problema</div>
            <div class="card-subtitle">Produto final do T03. O problema reformulado é o que será diagnosticado na Fase Diagnose.</div>
          </div>
          <button class="btn btn-accent btn-sm" style="margin-left:auto;" onclick="suggestReformulacao()">
            ${icon('ai',14)} Sugerir Reformulação
          </button>
        </div>

        <div class="alert alert-info mb-4" style="font-size:12px;">
          ${icon('eye',14)}
          <div style="margin-left:8px;">
            <strong>Problema reportado (T01):</strong> "A fábrica não dá conta da demanda. Precisamos comprar uma nova máquina flexográfica de R$ 4,8 milhões."
          </div>
        </div>

        <div class="form-group mb-2">
          <label class="form-label">Problema Reformulado <span style="color:var(--danger);">*</span></label>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Deve conter: (1) gap específico em magnitude, (2) impacto financeiro anual, (3) horizonte temporal.</div>
          <textarea class="form-textarea" id="t03-reformulacao" rows="4"
            oninput="validateReformulacao()"
            style="min-height:120px;font-size:14px;line-height:1.7;font-weight:500;border:2px solid var(--primary);">${d.reformulacao}</textarea>
          <div id="t03-reformulacao-hint" class="form-hint"></div>
        </div>

        <div id="reforma-ok" class="alert alert-success" style="font-size:12px;">
          ${icon('check',14)} A reformulação contém magnitude quantificada. Pronto para o Gate Define.
        </div>
      </div>

      <!-- Gate Define -->
      <div class="card mb-6" style="background:linear-gradient(135deg, #F0FDF4, #ECFDF5);border:1px solid #BBF7D0;">
        <div class="flex items-center gap-3 mb-4">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;">${icon('shield',20)}</div>
          <div>
            <div style="font-size:16px;font-weight:800;color:#065F46;">Gate Define — Critérios de Aprovação</div>
            <div style="font-size:12px;color:#047857;">O Hub Central revisará antes de liberar a Fase Diagnose.</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[
            { ok:true,  text:'T01 completo (problema na linguagem do cliente)' },
            { ok:true,  text:'T02 completo (Is/Is Not delimitado + stakeholders mapeados)' },
            { ok:true,  text:'T03 completo (pelo menos 2 dimensões com baseline + benchmark)' },
            { ok:true,  text:'Impacto financeiro total quantificado (R$ 4.860.000/ano)' },
            { ok:true,  text:'Reformulação do problema com magnitude numérica' },
            { ok:false, text:'Aprovação do cliente no A3 Preliminar (pendente)' },
          ].map(c => `
            <div class="flex items-center gap-3">
              <div style="width:20px;height:20px;border-radius:50%;background:${c.ok?'var(--accent)':'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${c.ok ? icon('check',10) : ''}
              </div>
              <span style="font-size:13px;color:${c.ok?'var(--text-primary)':'var(--text-muted)'};">${c.text}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-accent btn-lg w-full mt-4" onclick="requestGateApproval()" style="justify-content:center;">
          ${icon('send',16)} Solicitar Aprovação do Gate Define ao Hub
        </button>
      </div>

      <!-- Rodapé -->
      <div class="card" style="position:sticky;bottom:0;z-index:10;border-top:2px solid var(--primary);">
        <div class="flex items-center justify-between">
          <div style="font-size:12px;color:var(--text-muted);">${icon('check',14)} Rascunho salvo automaticamente.</div>
          <div class="flex gap-2">
            <button class="btn btn-secondary" onclick="navigate('template_t02')">${icon('arrow_right',14)} Voltar T02</button>
            <button class="btn btn-primary" onclick="completeT03()">${icon('check',14)} Marcar T03 como Completo</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindT03Events() {
  validateReformulacao();
}

function updateGap(input, dimKey) {
  const baseline = parseFloat(document.getElementById(`baseline-${dimKey}`)?.value || 0);
  const benchmark = parseFloat(document.getElementById(`benchmark-${dimKey}`)?.value || 0);
  const gapEl = document.getElementById(`gap-${dimKey}`);
  if (!gapEl) return;
  const gap = baseline - benchmark;
  gapEl.textContent = (gap > 0 ? '+' : '') + gap.toFixed(1);
  gapEl.style.color = gap < 0 ? 'var(--danger)' : 'var(--accent)';
}

function updateCalcTotal() {
  const keys = ['receita_perdida','custo_evitavel','custo_oportunidade','penalidade'];
  const total = keys.reduce((sum, k) => {
    return sum + (parseFloat(document.getElementById(`calc-${k}`)?.value || 0));
  }, 0);
  const el = document.getElementById('calc-total');
  if (el) el.textContent = 'R$ ' + total.toLocaleString('pt-BR');
}

function validateReformulacao() {
  const el = document.getElementById('t03-reformulacao');
  const hint = document.getElementById('t03-reformulacao-hint');
  const ok = document.getElementById('reforma-ok');
  if (!el) return;
  const text = el.value;
  const hasNumber = /\d/.test(text);
  const tooShort = text.length < 200;

  if (!hint || !ok) return;
  if (tooShort && text.length > 0) {
    hint.style.color = 'var(--danger)';
    hint.textContent = `A reformulação deve ter pelo menos 200 caracteres (${200 - text.length} faltando).`;
    ok.style.display = 'none';
  } else if (!hasNumber && text.length > 50) {
    hint.style.color = 'var(--danger)';
    hint.textContent = 'A reformulação deve conter a magnitude quantificada (R$, %, número absoluto).';
    ok.style.display = 'none';
  } else if (text.length >= 200 && hasNumber) {
    hint.textContent = '';
    ok.style.display = 'flex';
  }
}

function showIndicatorSuggest(dimensao) {
  const examples = {
    Financeira:   ['Receita perdida (R$/ano)','Custo de ineficiência (R$/ano)','Custo de oportunidade (R$/ano)','Multas e penalidades (R$/ano)'],
    Operacional:  ['OEE (%)', 'Lead time (dias)', 'First Pass Yield (%)', 'Tempo de setup (min)', 'Taxa de retrabalho (%)'],
    Reputacional: ['NPS (0–10)', 'Taxa de churn (%)', 'Score de confiabilidade', 'Reclamações/mês', 'eNPS (colaboradores)'],
    Estratégica:  ['Contratos em risco (qtd)', 'Projetos paralisados', 'Market share (%)', 'Decisões de investimento pendentes'],
  };
  const opts = examples[dimensao] || [];
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Indicadores · Dimensão ${dimensao}</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('eye',14)} Indicadores típicos para problemas similares nesta dimensão.</div>
        ${opts.map(o => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;">
            <span style="font-size:13px;">${o}</span>
            <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('Indicador copiado: ${o}')">Usar</button>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

function showBenchmarkSuggest(dimensao, indicador) {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Benchmark · ${indicador || dimensao}</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-warning mb-3" style="font-size:12px;">${icon('alert',14)} A IA apresenta faixas de referência com fonte. O benchmark final é responsabilidade do especialista.</div>
        <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:8px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;">Setor Manufatura · Indústria de Embalagens</div>
          <div style="font-size:13px;color:var(--text-primary);margin-bottom:8px;">OEE médio: <strong>58% – 72%</strong></div>
          <div style="font-size:11px;color:var(--text-muted);">Fonte: Pesquisa ABFlexo 2024 · n=143 empresas · Brasil</div>
          <button class="btn btn-primary btn-sm mt-2" onclick="closeModal();showToast('Benchmark 68% aplicado (média ABFlexo 2024)')">Usar 68% (média)</button>
        </div>
        <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:8px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;">Top quartil · Best-in-class</div>
          <div style="font-size:13px;color:var(--text-primary);margin-bottom:8px;">OEE médio: <strong>82% – 90%</strong></div>
          <div style="font-size:11px;color:var(--text-muted);">Fonte: SMRP Metrics 2024</div>
          <button class="btn btn-secondary btn-sm mt-2" onclick="closeModal();showToast('Benchmark 85% (best-in-class) aplicado')">Usar 85% (best-in-class)</button>
        </div>
      </div>
    </div>
  `);
}

function suggestReformulacao() {
  showToast('IA gerando rascunho de reformulação...', 'info');
  setTimeout(() => {
    const el = document.getElementById('t03-reformulacao');
    if (el) {
      el.value = T03_EXAMPLE.reformulacao;
      validateReformulacao();
      showToast('Rascunho gerado. Revise e ajuste antes de marcar como completo.');
    }
  }, 1500);
}

function requestGateApproval() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Solicitar Gate Define</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4">${icon('check',16)} T01, T02 e T03 concluídos. Gate Define pronto para revisão.</div>
        <div class="form-group mb-4">
          <label class="form-label">Comentário para o revisor do Hub (opcional)</label>
          <textarea class="form-textarea" rows="3" placeholder="Alguma observação específica para o revisor? Pontos de atenção, dúvidas, contexto adicional..."></textarea>
        </div>
        <div style="background:var(--surface-2);border-radius:10px;padding:14px;font-size:12px;">
          <div class="font-semibold mb-2">O que acontece após enviar:</div>
          <div class="flex items-center gap-2 mb-1">${icon('check',12)} <span>Hub recebe notificação para revisão</span></div>
          <div class="flex items-center gap-2 mb-1">${icon('check',12)} <span>Prazo de revisão: 1–2 dias úteis</span></div>
          <div class="flex items-center gap-2 mb-1">${icon('check',12)} <span>Se aprovado: caso avança para Fase Diagnose</span></div>
          <div class="flex items-center gap-2">${icon('check',12)} <span>Se ajuste solicitado: você recebe comentários detalhados</span></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('Gate Define enviado para revisão do Hub! Você será notificado em até 2 dias úteis.');">
          ${icon('send',14)} Enviar para Revisão
        </button>
      </div>
    </div>
  `);
}

function completeT03() {
  const ref = document.getElementById('t03-reformulacao');
  if (!ref || ref.value.length < 200 || !/\d/.test(ref.value)) {
    showToast('Complete a Reformulação do Problema com magnitude quantificada antes de concluir.', 'error');
    return;
  }
  showToast('T03 marcado como completo. Fase Define finalizada!');
  setTimeout(() => navigate('franchisee_case'), 1500);
}
