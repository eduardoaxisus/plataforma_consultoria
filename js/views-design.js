// ============================================================
// AXISUS — Template Fase Design: T06 (Geração e Avaliação de Alternativas)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ─────────────────────────────────────────────────────────────
// ESTADO DO T06
// ─────────────────────────────────────────────────────────────
// Categorias de alternativas para AI Sprint (Onda 2 — adequação v2)
const T06_CAT_CONFIG = {
  llm_api:     { label: 'LLM via API',           color: '#1E3A8A', bg: '#EFF6FF', text: 'white', textBg: '#1E40AF' },
  rag:         { label: 'RAG',                   color: '#0F6E56', bg: '#ECFDF5', text: 'white', textBg: '#065F46' },
  fine_tuning: { label: 'Fine-tuning',           color: '#6B21A8', bg: '#F5F3FF', text: 'white', textBg: '#5B21B6' },
  modelo_prop: { label: 'Modelo Proprietário',   color: '#7C2D12', bg: '#FFF7ED', text: 'white', textBg: '#9A3412' },
  nao_ia:      { label: 'Solução Não-IA',        color: '#4A5A56', bg: '#F8FAFC', text: 'white', textBg: '#334155' },
  hibrida:     { label: 'Híbrida',               color: '#B45309', bg: '#FFFBEB', text: 'white', textBg: '#92400E' },
};

const T06_STATUS_CONFIG = {
  encaminhada: { label: 'Encaminhada para T07', cls: 'badge-green',  icon: 'check'     },
  descartada:  { label: 'Descartada',           cls: 'badge-red',    icon: 'x'         },
  arquivada:   { label: 'Arquivada',            cls: 'badge-gray',   icon: 'archive'   },
  gerando:     { label: 'Em Avaliação',         cls: 'badge-yellow', icon: 'eye'       },
};

const T06_CRITERIOS = [
  { id: 'aderencia',      label: 'Aderência à Causa Raiz',  pergunta: 'Esta alternativa trata diretamente a causa raiz validada, ou apenas sintoma relacionado?',   critico: true  },
  { id: 'viabilidade',    label: 'Viabilidade Técnica',      pergunta: 'A organização tem competência ou consegue obter para implementar?',                           critico: false },
  { id: 'custo',          label: 'Custo Estimado',           pergunta: 'O custo está dentro da faixa do contrato / orçamento do cliente?',                            critico: false },
  { id: 'prazo',          label: 'Prazo de Implementação',   pergunta: 'É possível implementar dentro do horizonte aceitável para o cliente?',                        critico: false },
  { id: 'complexidade',   label: 'Complexidade Política',    pergunta: 'Há resistência previsível de stakeholders importantes (mapa de T02)?',                        critico: false },
  { id: 'risco',          label: 'Risco de Execução',        pergunta: 'Probabilidade de fracasso técnico ou organizacional na implementação?',                       critico: false },
];

// Alternativas para o caso Petshop Beta (AI Sprint — Onda 2 adequação v2)
const T06_STATE = {
  selectedId: 'a1',
  alternativas: [
    {
      id: 'a1', num: 'A1',
      titulo: 'Recommendation Engine SaaS (Plug-and-play)',
      categoria: 'llm_api',
      descricao: 'Contratar serviço de recomendação via API de terceiros (Nosto, Retail Rocket, ou similar) com integração Shopify nativa. Setup em 2 semanas. IA pré-treinada com comportamento de compra e-commerce.',
      mecanica: 'Avaliação de 3 fornecedores (semana 1). Contratação e integração Shopify (semana 2-3). A/B test com 20% do tráfego (semana 4-6). Roll-out completo (semana 7-8).',
      custo_estimado: 'R$ 6.000-12.000/mês (SaaS recorrente)',
      prazo_meses: 2,
      status: 'encaminhada',
      prioridade: 3,
      origem: 'cliente',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'amarelo', prazo: 'verde', complexidade: 'verde', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Trata sintoma (ausência de recomendação) mas NÃO resolve a causa raiz (catálogo desorganizado). IA recomenda mal se catálogo não tem atributos.',
        viabilidade: 'Integração Shopify simples, disponível hoje.',
        custo: 'R$72-144k/ano recorrente. Caro para impacto limitado sem catálogo organizado.',
        prazo: '2 meses — rápida de implementar.',
        complexidade: 'CFO pode resistir ao custo recorrente sem ROI comprovado.',
        risco: 'Histórico negativo: tentativa de plugin Shopify em 2025 falhou pelo mesmo motivo.',
      },
      pre_requisitos: 'Catálogo com atributos de complementaridade mínimos (ou falha da mesma forma).',
      premissas: 'Plataforma Shopify Plus compatível com APIs dos fornecedores.',
      motivo_descarte: '',
    },
    {
      id: 'a2', num: 'A2',
      titulo: 'LLM via API — Recomendação por Prompt Engineering',
      categoria: 'llm_api',
      descricao: 'Usar Claude ou GPT-4o via API com prompt engineering avançado para gerar recomendações contextuais no checkout. Cada sessão de compra passa pelo LLM que analisa carrinho + perfil + histórico e sugere complementares.',
      mecanica: 'Design dos prompts com contexto de catálogo (semana 1-2). Integração API no checkout Shopify (semana 3-4). Testes de qualidade de recomendação (semana 5-6). A/B test (semana 7-10).',
      custo_estimado: 'R$ 8.000 (desenvolvimento) + ~R$ 3.000/mês (API tokens para 8k pedidos/mês)',
      prazo_meses: 3,
      status: 'encaminhada',
      prioridade: 4,
      origem: 'especialista',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Trata sintoma (falta de recomendação) mas ainda depende de catálogo minimamente estruturado.',
        viabilidade: 'Claude/GPT-4o API disponível, dev com experiência em Shopify necessário.',
        custo: 'Custo baixo. ~R$36k/ano — opção mais barata com IA real.',
        prazo: '3 meses — rápido.',
        complexidade: 'Baixa resistência. Time técnico apoia.',
        risco: 'Qualidade das recomendações cai com catálogo desorganizado. Latência pode ser perceptível no checkout.',
      },
      pre_requisitos: 'Dev full-stack disponível (já existe no time).',
      premissas: 'Catálogo tem pelo menos categoria e marca corretamente preenchidas.',
      motivo_descarte: '',
    },
    {
      id: 'a3', num: 'A3',
      titulo: 'RAG — Recomendação via Base de Co-compra',
      categoria: 'rag',
      descricao: 'Construir base vetorizada com 12 meses de histórico de pedidos + atributos de catálogo. Ao adicionar produto ao carrinho, sistema faz busca semântica nos vetores e sugere os N produtos mais frequentemente co-comprados por clientes similares.',
      mecanica: 'Organizar catálogo com atributos mínimos (semana 1-2). Processar histórico de pedidos em embeddings (semana 3). Construir índice pgvector no Supabase (semana 4). Integração checkout (semana 5-6). A/B test (semana 7-8).',
      custo_estimado: 'R$ 12.000 (desenvolvimento) + R$ 800/mês (Supabase + embedding API)',
      prazo_meses: 2,
      status: 'encaminhada',
      prioridade: 2,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata diretamente a causa raiz: usa dados reais de comportamento de compra.',
        viabilidade: 'Supabase pgvector disponível, OpenAI Embeddings API madura.',
        custo: 'R$12k de implementação + R$9,6k/ano = custo muito competitivo.',
        prazo: '2 meses — mais rápida com maior aderência à causa raiz.',
        complexidade: 'Time aceita bem — é solução técnica concreta.',
        risco: 'Funciona melhor com catálogo organizado — mas melhora progressivamente com o volume de dados.',
      },
      pre_requisitos: 'Histórico de 12 meses de pedidos (disponível). Dev com experiência em vetores.',
      premissas: 'Pelo menos 500 produtos com atributos básicos de categoria.',
      motivo_descarte: '',
    },
    {
      id: 'a4', num: 'A4',
      titulo: 'Fine-tuning — Modelo Treinado com Dados Petshop',
      categoria: 'fine_tuning',
      descricao: 'Fazer fine-tuning de um modelo open-source (LLaMA 3, Mistral) com os dados históricos de compra e catálogo da Petshop Beta. Modelo aprende padrões específicos de co-compra de pets.',
      mecanica: 'Curadoria e formatação do dataset de treinamento (mês 1-2). Fine-tuning em GPU (mês 3). Avaliação e ajuste (mês 4). Deploy em infraestrutura (mês 5). Integração Shopify (mês 6).',
      custo_estimado: 'R$ 35.000 (GPU rental + eng. ML + deployment)',
      prazo_meses: 6,
      status: 'arquivada',
      prioridade: null,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'amarelo', custo: 'amarelo', prazo: 'amarelo', complexidade: 'amarelo', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Alta aderência — modelo aprende padrões reais do negócio.',
        viabilidade: 'Requer engenheiro ML especializado. Time atual não tem essa competência.',
        custo: 'R$35k de implementação é razoável, mas overhead de manutenção do modelo.',
        prazo: '6 meses — mais longo. Perde a urgência da demanda.',
        complexidade: 'CFO vai questionar investimento vs. resultado esperado.',
        risco: 'Dataset pode ser insuficiente (8k pedidos/mês pode não ser volume adequado para fine-tuning).',
      },
      pre_requisitos: 'Engenheiro ML, GPU infrastructure, dataset curado.',
      premissas: 'Volume de dados suficiente e diversificado para treinar modelo útil.',
      motivo_descarte: 'Overkill para o problema. Volume de dados insuficiente. Prazo e custo não justificam vs. RAG (A3) que resolve com custo 3x menor.',
    },
    {
      id: 'a5', num: 'A5',
      titulo: 'Organização do Catálogo (Solução Não-IA)',
      categoria: 'nao_ia',
      descricao: 'Estruturar manualmente os atributos de complementaridade do catálogo: mapear 5.000+ SKUs em 12 categorias, criar relacionamentos "compra com", definir bundles curados por categoria de pet e porte. Sem IA — puro trabalho de curadoria de dados.',
      mecanica: 'Auditoria do catálogo atual (semana 1). Definição de taxonomia de complementaridade (semana 2). Sprint de curadoria com time de catálogo + IA de suporte (semana 3-6). Implementação de seção estática no Shopify (semana 7-8).',
      custo_estimado: 'R$ 15.000 (horas do time + ferramenta PIM)',
      prazo_meses: 2,
      status: 'encaminhada',
      prioridade: 5,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata diretamente a causa raiz — catálogo desorganizado.',
        viabilidade: 'Time de catálogo (Andrea Santos) pode executar com suporte.',
        custo: 'Menor custo de todas as alternativas.',
        prazo: '2 meses.',
        complexidade: 'Baixíssima resistência. Trabalho de curadoria já era demanda latente do time.',
        risco: 'Risco baixo de execução. Mas resultado limitado sem recomendação ativa.',
      },
      pre_requisitos: 'Disponibilidade do time de catálogo para sprint dedicado.',
      premissas: 'Time de catálogo comprometido com manutenção contínua após a organização inicial.',
      motivo_descarte: '',
    },
    {
      id: 'a6', num: 'A6',
      titulo: 'Recommendation Engine SaaS Premium (Solução imaginada em T01)',
      categoria: 'llm_api',
      descricao: 'Contratar o fornecedor SaaS premium avaliado pelo cliente antes do sprint (R$8k/mês). Recommendation engine completo com personalização por perfil, A/B testing nativo e relatórios.',
      mecanica: 'Contratação (semana 1). Onboarding e integração (semana 2-4). Configuração de modelos de recomendação (semana 5-6). Go-live (semana 7).',
      custo_estimado: 'R$ 8.000/mês (R$ 96.000/ano)',
      prazo_meses: 2,
      status: 'descartada',
      prioridade: null,
      origem: 'cliente',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'vermelho', prazo: 'verde', complexidade: 'amarelo', risco: 'vermelho' },
      justificativas: {
        aderencia: 'NÃO resolve causa raiz (catálogo). Mesmo problema da tentativa 2025.',
        viabilidade: 'Tecnicamente simples de implementar.',
        custo: 'R$96k/ano — mais caro que A3 (R$9,6k/ano) com resultado inferior.',
        prazo: '2 meses.',
        complexidade: 'CFO vai questionar R$96k/ano sem garantia de ROI.',
        risco: 'Histórico de falha com solução similar. Alta probabilidade de repetir.',
      },
      pre_requisitos: '',
      premissas: '',
      motivo_descarte: 'Tentativa similar falhou em 2025 pelo mesmo motivo (catálogo desorganizado). Custo 10x superior a A3 com menor aderência à causa raiz.',
    },
    {
      id: 'a7', num: 'A7',
      titulo: 'Modelo Proprietário de Recomendação',
      categoria: 'modelo_prop',
      descricao: 'Treinar modelo de recomendação proprietário do zero com dados históricos da Petshop Beta. Algoritmo de collaborative filtering customizado, treinado e mantido internamente.',
      mecanica: 'Especificação do modelo (mês 1-2). Engenharia de features (mês 3-4). Treinamento e validação (mês 5-6). Deploy e integração (mês 7-8). Monitoramento contínuo.',
      custo_estimado: 'R$ 80.000 (eng. ML + infra) + R$ 5.000/mês manutenção',
      prazo_meses: 8,
      status: 'descartada',
      prioridade: null,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'vermelho', custo: 'vermelho', prazo: 'vermelho', complexidade: 'vermelho', risco: 'vermelho' },
      justificativas: {
        aderencia: 'Tecnicamente poderia resolver — mas completamente desproporcional.',
        viabilidade: 'Exige equipe de ML dedicada que a Petshop Beta não tem e não deve contratar.',
        custo: 'R$80k + R$60k/ano — 8x mais caro que A3 com complexidade desnecessária.',
        prazo: '8 meses — inaceitável.',
        complexidade: 'CFO vai rejeitar imediatamente.',
        risco: 'Risco de projeto de TI clássico: atraso, estouro de budget, resultado abaixo do esperado.',
      },
      pre_requisitos: '',
      premissas: '',
      motivo_descarte: 'Completamente desproporcional ao problema. É a versão "comprar a máquina de R$4,8M" do AI Sprint — solução 10x maior que o necessário.',
    },
    {
      id: 'a8', num: 'A8',
      titulo: 'Híbrida: Curadoria de Catálogo (A5) + RAG (A3)',
      categoria: 'hibrida',
      descricao: 'Combina organização do catálogo (A5) como primeiro passo com RAG de recomendação (A3) como segundo. Semanas 1-4: curadoria intensiva do catálogo. Semanas 5-8: construção do índice RAG e integração checkout. Resultado: recomendação de IA que funciona porque o catálogo está organizado.',
      mecanica: 'Sprint 1 (semana 1-4): Auditoria + curadoria do catálogo (Andrea + time AXISUS). Sprint 2 (semana 5-6): Processamento de histórico de pedidos + embeddings. Sprint 3 (semana 7-8): Integração checkout + A/B test. Go-live semana 9.',
      custo_estimado: 'R$ 24.000 (A5 + A3 com sobreposições) + R$ 800/mês',
      prazo_meses: 2,
      status: 'encaminhada',
      prioridade: 1,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata causa raiz (catálogo desorganizado) E o sintoma (ausência de recomendação). Única alternativa que resolve os dois.',
        viabilidade: 'Time de catálogo + dev disponíveis. Tecnologia madura.',
        custo: 'R$24k única vez + R$9,6k/ano — ROI projetado 12x em 12 meses.',
        prazo: '2 meses. Dentro do sprint.',
        complexidade: 'CFO aprova ao ver ROI claro. Time apoia por ser solução concreta.',
        risco: 'Menor risco de todas as alternativas híbridas. Curadoria garante que IA funcione.',
      },
      pre_requisitos: 'Sprint dedicado de curadoria do catálogo (semanas 1-4).',
      premissas: 'Time de catálogo comprometido com o sprint. Dev disponível a partir da semana 5.',
      motivo_descarte: '',
    },
  ],
  avaliando: 'a8',
};

// ─────────────────────────────────────────────────────────────
// RENDER PRINCIPAL T06
// ─────────────────────────────────────────────────────────────
function renderT06() {
  const selected = T06_STATE.alternativas.find(a => a.id === T06_STATE.selectedId);
  const encaminhadas = T06_STATE.alternativas.filter(a => a.status === 'encaminhada').length;
  const descartadas  = T06_STATE.alternativas.filter(a => a.status === 'descartada').length;
  const total        = T06_STATE.alternativas.length;

  const categUsadas = [...new Set(T06_STATE.alternativas.map(a => a.categoria))];
  const categFaltam = Object.keys(T06_CAT_CONFIG).filter(k => !categUsadas.includes(k));

  return `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - 64px);">

      ${renderBackButton()}

      <!-- ── Barra de ferramentas ── -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t05')" title="Voltar para T05">${icon('arrow_left',14)}</button>
        <div style="flex:1;min-width:200px;">
          <div style="font-size:15px;font-weight:800;">T06 — Geração e Avaliação de Alternativas</div>
          <div style="font-size:11px;color:var(--text-muted);">Gere múltiplas alternativas. Quantidade gera qualidade. Triagem qualitativa antes de priorização matemática.</div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button class="btn btn-secondary btn-sm" onclick="showT06NovaAlt()">${icon('plus',13)} Nova Alternativa</button>
          <button class="btn btn-secondary btn-sm" onclick="showT06SCAMPER()">${icon('search',13)} SCAMPER</button>
          <button class="btn btn-secondary btn-sm" onclick="showT06Morfo()">${icon('chart',13)} Morfológica</button>
          <button class="btn btn-secondary btn-sm" onclick="showT06Library()">${icon('book',13)} Biblioteca</button>
          <button class="btn btn-accent btn-sm"    onclick="showT06AIGenerate()">${icon('ai',13)} Gerar com IA</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="requestGateDesign()">
          ${icon('send',14)} Gate Design
        </button>
      </div>

      <!-- ── Cabeçalho de contexto ── -->
      <div style="background:linear-gradient(135deg,#0A192F,#0D2847);color:white;padding:12px 20px;flex-shrink:0;border-bottom:2px solid rgba(0,212,255,0.3);">
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
          <div style="flex:2;min-width:220px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Causa Raiz Validada em T05</div>
            <div style="font-size:13px;font-weight:700;">Catálogo desorganizado — 68% dos SKUs sem atributos de complementaridade</div>
            <div style="font-size:11px;opacity:0.75;margin-top:3px;">Evidência: 68% SKUs sem "complementares" preenchido · Sessões c/ cross-sell view: 11% vs 60% benchmark</div>
          </div>
          <div style="flex:1;min-width:160px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Métrica-Alvo</div>
            <div style="font-size:13px;font-weight:700;">Cross-sell: 8% → 20-32% · Ticket: R$ 80 → R$ 130</div>
          </div>
          <div style="flex:1;min-width:160px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Restrições (T01)</div>
            <div style="font-size:12px;font-weight:500;">Orçamento ≤ R$ 30k · 1 dev full-stack · Shopify Plus</div>
          </div>
          <div style="text-align:center;background:rgba(255,255,255,0.12);border-radius:10px;padding:10px 16px;flex-shrink:0;">
            <div style="font-size:22px;font-weight:900;">${total}</div>
            <div style="font-size:10px;opacity:0.7;">alternativas geradas</div>
            <div style="font-size:11px;margin-top:4px;">
              <span style="color:#9FE1CB;">${encaminhadas} → T07</span> · 
              <span style="color:#FCA5A5;">${descartadas} descartadas</span>
            </div>
            ${categFaltam.length > 0 ? `<div style="font-size:9px;opacity:0.6;margin-top:4px;">Sem: ${categFaltam.map(k => T06_CAT_CONFIG[k]?.label).join(', ')}</div>` : ''}
          </div>
        </div>
      </div>

      <!-- ── Validação: mínimo 6 alternativas ── -->
      ${total < 6 ? `
        <div style="background:#FEF3C7;border-bottom:1px solid #FCD34D;padding:6px 20px;font-size:12px;color:#92400E;flex-shrink:0;">
          ${icon('alert',13)} O método exige no mínimo 6 alternativas geradas. Use as ferramentas de destravamento para chegar lá. (${total}/6)
        </div>
      ` : ''}

      <!-- ── Layout principal: canvas + painel ── -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Canvas de alternativas -->
        <div style="flex:1;overflow-y:auto;padding:16px;background:var(--surface-2);">
          ${renderT06Canvas()}
        </div>

        <!-- Painel de detalhe/avaliação -->
        <div id="t06-panel" style="width:380px;flex-shrink:0;border-left:1px solid var(--border);background:white;overflow-y:auto;">
          ${renderT06Panel(selected)}
        </div>
      </div>

      <!-- ── Rodapé: estatísticas ── -->
      <div style="background:white;border-top:1px solid var(--border);padding:8px 20px;display:flex;gap:16px;align-items:center;flex-shrink:0;">
        ${Object.entries(T06_CAT_CONFIG).map(([k, cfg]) => {
          const n = T06_STATE.alternativas.filter(a => a.categoria === k).length;
          return `<div style="display:flex;align-items:center;gap:5px;">
            <div style="width:10px;height:10px;border-radius:2px;background:${cfg.color};"></div>
            <span style="font-size:11px;color:var(--text-secondary);">${cfg.label}: <b>${n}</b></span>
          </div>`;
        }).join('')}
        <span style="font-size:11px;color:var(--text-muted);margin-left:auto;">Clique em um card para avaliar · Status automático por critérios</span>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// CANVAS DE ALTERNATIVAS
// ─────────────────────────────────────────────────────────────
function renderT06Canvas() {
  const ativas    = T06_STATE.alternativas.filter(a => a.status !== 'descartada' && a.status !== 'arquivada');
  const descartadas = T06_STATE.alternativas.filter(a => a.status === 'descartada' || a.status === 'arquivada');

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:24px;">
      ${ativas.map(a => renderT06Card(a)).join('')}
      <!-- Card adicionar -->
      <div onclick="showT06NovaAlt()" style="border:2px dashed var(--border);border-radius:12px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;min-height:180px;gap:8px;transition:border-color 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;">${icon('plus',20)}</div>
        <div style="font-size:13px;font-weight:600;color:var(--text-muted);">Nova Alternativa</div>
        <div style="font-size:11px;color:var(--text-muted);text-align:center;">Clique ou use as ferramentas de geração acima</div>
      </div>
    </div>

    ${descartadas.length > 0 ? `
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <div style="height:1px;flex:1;background:var(--border);"></div>
          <span style="font-size:11px;color:var(--text-muted);font-weight:600;white-space:nowrap;">DESCARTADAS / ARQUIVADAS (${descartadas.length})</span>
          <div style="height:1px;flex:1;background:var(--border);"></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;opacity:0.6;">
          ${descartadas.map(a => renderT06Card(a)).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function renderT06Card(a) {
  const cat    = T06_CAT_CONFIG[a.categoria] || T06_CAT_CONFIG.hibrida;
  const stCfg  = T06_STATUS_CONFIG[a.status]  || T06_STATUS_CONFIG.gerando;
  const isSelected = a.id === T06_STATE.selectedId;
  const isDescartada = a.status === 'descartada';

  // Semáforos compactos
  const semaforos = T06_CRITERIOS.map(c => {
    const v = a.avaliacao?.[c.id];
    const colorMap = { verde:'#10B981', amarelo:'#F59E0B', vermelho:'#EF4444' };
    return `<div title="${c.label}" style="width:12px;height:12px;border-radius:50%;background:${colorMap[v] || '#E2E8F0'};flex-shrink:0;"></div>`;
  }).join('');

  const origemMap = { especialista: { label:'Especialista', color:'#065F46' }, ia: { label:'IA',icon:'ai', color:'#5B21B6' }, cliente: { label:'Cliente', color:'#B45309' }, biblioteca: { label:'Biblioteca', color:'#1E40AF' } };
  const orig = origemMap[a.origem] || origemMap.especialista;

  return `
    <div onclick="selectT06Alt('${a.id}')"
      style="background:white;border-radius:12px;border:2px solid ${isSelected ? cat.color : (isDescartada ? 'var(--border)' : 'transparent')};
        box-shadow:${isSelected ? `0 0 0 3px ${cat.color}22` : '0 1px 4px rgba(0,0,0,0.07)'};
        cursor:pointer;overflow:hidden;transition:all 0.2s;
        ${isDescartada ? 'filter:grayscale(0.5);' : ''}">
      <!-- Header colorido -->
      <div style="background:${cat.color};padding:10px 12px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:13px;font-weight:900;color:white;opacity:0.9;">${a.num}</span>
          <span style="font-size:10px;font-weight:600;color:white;opacity:0.8;background:rgba(255,255,255,0.18);padding:2px 6px;border-radius:99px;">${cat.label}</span>
        </div>
        <span class="badge ${stCfg.cls}" style="font-size:10px;">${stCfg.label}</span>
      </div>
      <!-- Corpo -->
      <div style="padding:12px;">
        <div style="font-size:13px;font-weight:700;line-height:1.4;margin-bottom:6px;">${a.titulo}</div>
        <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${a.descricao}</div>
        <!-- Semáforos -->
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;gap:4px;align-items:center;">
            <span style="font-size:10px;color:var(--text-muted);">6 critérios:</span>
            ${semaforos}
          </div>
          <div style="display:flex;align-items:center;gap:4px;">
            <span style="font-size:9px;color:${orig.color};font-weight:600;">${orig.label}</span>
            ${a.custo_estimado ? `<span style="font-size:9px;color:var(--text-muted);">· ${a.custo_estimado.split('(')[0].trim()}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// PAINEL DE DETALHE / AVALIAÇÃO
// ─────────────────────────────────────────────────────────────
function renderT06Panel(a) {
  if (!a) return `
    <div style="padding:24px;text-align:center;color:var(--text-muted);">
      <div style="font-size:32px;margin-bottom:8px;">👆</div>
      <div style="font-size:13px;font-weight:600;">Clique em uma alternativa</div>
      <div style="font-size:12px;margin-top:4px;">para ver detalhes e avaliar</div>
    </div>`;

  const cat   = T06_CAT_CONFIG[a.categoria] || T06_CAT_CONFIG.hibrida;
  const stCfg = T06_STATUS_CONFIG[a.status]  || T06_STATUS_CONFIG.gerando;

  // Vermelhos automáticos
  const vermelhosCount = T06_CRITERIOS.filter(c => a.avaliacao?.[c.id] === 'vermelho').length;
  const aderenciaVermelho = a.avaliacao?.aderencia === 'vermelho';

  return `
    <div style="padding:0;">
      <!-- Header do painel -->
      <div style="background:${cat.color};padding:14px 16px;">
        <div class="flex items-center justify-between mb-1">
          <span style="font-size:11px;color:rgba(255,255,255,0.75);">${a.num} · ${cat.label}</span>
          <span class="badge ${stCfg.cls}" style="font-size:10px;">${stCfg.label}</span>
        </div>
        <div style="font-size:15px;font-weight:800;color:white;line-height:1.3;">${a.titulo}</div>
        ${a.custo_estimado ? `<div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:4px;">${a.custo_estimado}</div>` : ''}
      </div>

      <div style="padding:14px;overflow-y:auto;">

        <!-- BLOCO A: Detalhamento -->
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">A — Detalhamento</div>
          <div class="form-group mb-2">
            <label class="form-label" style="font-size:10px;">Descrição</label>
            <textarea class="form-textarea" rows="3" style="font-size:12px;min-height:72px;">${a.descricao}</textarea>
          </div>
          <div class="form-group mb-2">
            <label class="form-label" style="font-size:10px;">Mecânica (como funciona na prática)</label>
            <textarea class="form-textarea" rows="3" style="font-size:12px;min-height:72px;">${a.mecanica}</textarea>
          </div>
          <div class="grid-2" style="gap:8px;">
            <div class="form-group">
              <label class="form-label" style="font-size:10px;">Custo Estimado</label>
              <input class="form-input" value="${a.custo_estimado}" style="font-size:12px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:10px;">Prazo (meses)</label>
              <input class="form-input" type="number" value="${a.prazo_meses}" style="font-size:12px;">
            </div>
          </div>
          <div class="form-group mb-2">
            <label class="form-label" style="font-size:10px;">Pré-requisitos</label>
            <textarea class="form-textarea" rows="2" style="font-size:12px;min-height:50px;">${a.pre_requisitos}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:10px;">Premissas</label>
            <textarea class="form-textarea" rows="2" style="font-size:12px;min-height:50px;">${a.premissas}</textarea>
          </div>
        </div>

        <!-- BLOCO B: Avaliação preliminar -->
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">B — Avaliação Preliminar (6 Critérios)</div>
          ${T06_CRITERIOS.map(c => {
            const v = a.avaliacao?.[c.id] || 'amarelo';
            const just = a.justificativas?.[c.id] || '';
            return `
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px;${v === 'vermelho' ? 'border-color:#FCA5A5;background:#FEF2F2;' : v === 'verde' ? 'border-color:#A7F3D0;background:#F0FDF4;' : ''}">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;">
                  <div style="font-size:12px;font-weight:700;display:flex;align-items:center;gap:4px;">
                    ${c.critico ? `<span title="Critério crítico — vermelho = descarte automático" style="color:var(--danger);font-size:10px;">★</span>` : ''}
                    ${c.label}
                  </div>
                  <div style="display:flex;gap:4px;">
                    ${['verde','amarelo','vermelho'].map(cor => {
                      const bgMap = { verde:'#10B981', amarelo:'#F59E0B', vermelho:'#EF4444' };
                      return `<button onclick="setT06Criterio('${a.id}','${c.id}','${cor}')"
                        style="width:20px;height:20px;border-radius:50%;background:${bgMap[cor]};border:${v===cor ? '2px solid white;box-shadow:0 0 0 2px '+bgMap[cor] : '2px solid transparent'};cursor:pointer;transition:all 0.15s;"
                        title="${cor}"></button>`;
                    }).join('')}
                  </div>
                </div>
                <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">${c.pergunta}</div>
                <input class="form-input" value="${just}" style="font-size:11px;padding:4px 8px;" placeholder="Justificativa (recomendado)">
              </div>
            `;
          }).join('')}
        </div>

        <!-- BLOCO C: Bloqueios automáticos -->
        ${aderenciaVermelho ? `
          <div class="alert alert-danger mb-3" style="font-size:12px;">
            ${icon('x',14)} <strong>Descarte automático:</strong> aderência à causa raiz = vermelho. Esta alternativa não trata o problema identificado.
          </div>
        ` : vermelhosCount >= 3 ? `
          <div class="alert alert-warning mb-3" style="font-size:12px;">
            ${icon('alert',14)} ${vermelhosCount} critérios em vermelho. Considere descartar — mas pode prosseguir com justificativa.
          </div>
        ` : ''}

        <!-- BLOCO D: Decisão final -->
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">D — Decisão Final</div>

          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
            ${[['encaminhada','Encaminhar p/ T07','btn-accent'],['arquivada','Arquivar','btn-secondary'],['descartada','Descartar','btn-danger']].map(([s,l,cls]) => `
              <button class="btn ${cls} btn-sm ${a.status === s ? '' : 'opacity-60'}"
                style="${a.status !== s ? 'opacity:0.55;' : ''}"
                onclick="setT06Status('${a.id}','${s}')">${l}</button>
            `).join('')}
          </div>

          ${a.status === 'encaminhada' ? `
            <div class="form-group mb-2">
              <label class="form-label" style="font-size:10px;">Prioridade Preliminar para T07</label>
              <input class="form-input" type="number" min="1" max="10" value="${a.prioridade || ''}" style="font-size:13px;font-weight:700;width:80px;" placeholder="1-N">
            </div>
          ` : ''}

          ${a.status === 'descartada' || a.status === 'arquivada' ? `
            <div class="form-group">
              <label class="form-label" style="font-size:10px;">Motivo ${a.status === 'descartada' ? '(obrigatório)' : '(opcional)'}</label>
              <textarea class="form-textarea" rows="2" style="font-size:12px;min-height:56px;"
                placeholder="Registre o motivo para aprendizado futuro...">${a.motivo_descarte}</textarea>
            </div>
          ` : ''}
        </div>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// HELPERS DO T06
// ─────────────────────────────────────────────────────────────
function selectT06Alt(id) {
  T06_STATE.selectedId = id;
  const panel = document.getElementById('t06-panel');
  if (panel) panel.innerHTML = renderT06Panel(T06_STATE.alternativas.find(a => a.id === id));
}

function setT06Criterio(altId, criterioId, valor) {
  const alt = T06_STATE.alternativas.find(a => a.id === altId);
  if (!alt) return;
  if (!alt.avaliacao) alt.avaliacao = {};
  alt.avaliacao[criterioId] = valor;
  if (criterioId === 'aderencia' && valor === 'vermelho') {
    alt.status = 'descartada';
    showToast('Aderência = vermelho → alternativa marcada como descartada automaticamente.', 'error');
  }
  // Refresh
  const panel = document.getElementById('t06-panel');
  if (panel) panel.innerHTML = renderT06Panel(alt);
  refreshT06Canvas();
}

function setT06Status(altId, status) {
  const alt = T06_STATE.alternativas.find(a => a.id === altId);
  if (!alt) return;
  alt.status = status;
  if (status === 'descartada' && !alt.motivo_descarte) {
    showToast('Registre o motivo do descarte para aprendizado futuro.', 'info');
  }
  const panel = document.getElementById('t06-panel');
  if (panel) panel.innerHTML = renderT06Panel(alt);
  refreshT06Canvas();
}

function refreshT06Canvas() {
  const canvas = document.querySelector('[style*="display:grid;grid-template-columns:repeat"]')?.parentElement;
  if (!canvas) { navigate('template_t06'); return; }
  const gridWrapper = canvas.querySelector('[style*="display:grid"]')?.parentElement?.parentElement;
  if (gridWrapper) gridWrapper.innerHTML = renderT06Canvas();
}

// ─────────────────────────────────────────────────────────────
// FERRAMENTA 1 — Nova Alternativa
// ─────────────────────────────────────────────────────────────
function showT06NovaAlt() {
  showModal(`
    <div class="modal" style="max-width:600px;">
      <div class="modal-header">
        <div class="modal-title">Nova Alternativa</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="form-group mb-3">
          <label class="form-label">Título <span style="color:var(--danger)">*</span> <span style="font-size:10px;color:var(--text-muted)">máx. 60 caracteres</span></label>
          <input id="nova-alt-titulo" class="form-input" maxlength="60" placeholder="Ex: Contratar consultor de processos" oninput="this.nextSibling.textContent=this.value.length+'/60'">
          <span style="font-size:10px;color:var(--text-muted);">0/60</span>
        </div>
        <div class="grid-2" style="gap:12px;margin-bottom:12px;">
          <div class="form-group">
            <label class="form-label">Categoria <span style="color:var(--danger)">*</span></label>
            <select id="nova-alt-cat" class="form-select">
              ${Object.entries(T06_CAT_CONFIG).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Custo Estimado</label>
            <input id="nova-alt-custo" class="form-input" placeholder="Ex: R$ 150.000">
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Descrição <span style="color:var(--danger)">*</span> <span style="font-size:10px;color:var(--text-muted)">(200–500 chars)</span></label>
          <textarea id="nova-alt-desc" class="form-textarea" rows="3" style="min-height:80px;" placeholder="O que é esta alternativa e o que ela resolve?"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Mecânica (como funciona na prática)</label>
          <textarea id="nova-alt-mec" class="form-textarea" rows="3" style="min-height:70px;" placeholder="Passos, fases, responsáveis, entregáveis..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="addNovaAlt()">Adicionar ao Canvas</button>
      </div>
    </div>
  `);
}

function addNovaAlt() {
  const titulo = document.getElementById('nova-alt-titulo')?.value?.trim();
  const cat    = document.getElementById('nova-alt-cat')?.value;
  const desc   = document.getElementById('nova-alt-desc')?.value?.trim();
  const mec    = document.getElementById('nova-alt-mec')?.value?.trim();
  const custo  = document.getElementById('nova-alt-custo')?.value?.trim();
  if (!titulo || !desc) { showToast('Preencha título e descrição.', 'error'); return; }
  const n = T06_STATE.alternativas.length + 1;
  const id = 'a' + Date.now();
  T06_STATE.alternativas.push({
    id, num: 'A' + n, titulo, categoria: cat, descricao: desc, mecanica: mec || '',
    custo_estimado: custo, prazo_meses: null, status: 'gerando', prioridade: null,
    origem: 'especialista',
    avaliacao: { aderencia: 'amarelo', viabilidade: 'amarelo', custo: 'amarelo', prazo: 'amarelo', complexidade: 'amarelo', risco: 'amarelo' },
    justificativas: {}, pre_requisitos: '', premissas: '', motivo_descarte: '',
  });
  closeModal();
  navigate('template_t06');
  showToast('Alternativa adicionada! Avalie os 6 critérios no painel.');
}

// ─────────────────────────────────────────────────────────────
// FERRAMENTA 2 — SCAMPER
// ─────────────────────────────────────────────────────────────
function showT06SCAMPER() {
  const perguntas = [
    { letra: 'S', nome: 'Substituir', cor: '#6366F1', pergunta: 'O que pode ser SUBSTITUÍDO? Um processo, responsável, tecnologia, fornecedor?', exemplo: 'Ex: substituir manutenção reativa por contrato performance-based' },
    { letra: 'C', nome: 'Combinar',   cor: '#0891B2', pergunta: 'O que pode ser COMBINADO com outra coisa para criar mais valor?', exemplo: 'Ex: combinar auditoria de catálogo com RAG sobre histórico de pedidos' },
    { letra: 'A', nome: 'Adaptar',    cor: '#10B981', pergunta: 'O que pode ser ADAPTADO de outro setor, caso, empresa para esta situação?', exemplo: 'Ex: adaptar metodologia TPM da indústria automotiva para flexografia' },
    { letra: 'M', nome: 'Modificar',  cor: '#F59E0B', pergunta: 'O que pode ser MODIFICADO, ampliado, reduzido, invertido?', exemplo: 'Ex: modificar escopo do cargo existente para absorver função de manutenção' },
    { letra: 'P', nome: 'Propor outro uso', cor: '#8B5CF6', pergunta: 'Algum recurso existente pode ser reaproveitado de outro jeito?', exemplo: 'Ex: técnico sênior existente pode assumir papel de gestor de manutenção interim' },
    { letra: 'E', nome: 'Eliminar',   cor: '#EF4444', pergunta: 'O que pode ser ELIMINADO sem comprometer o resultado?', exemplo: 'Ex: eliminar manutenção terceirizada parcial que já existe mas não entrega' },
    { letra: 'R', nome: 'Reverter',   cor: '#EC4899', pergunta: 'O que pode ser INVERTIDO ou reorganizado? Mudar a ordem das coisas?', exemplo: 'Ex: inverter a lógica — operadores treinados para diagnosticar, especialista para resolver' },
  ];

  showModal(`
    <div class="modal" style="max-width:720px;">
      <div class="modal-header">
        <div>
          <div style="font-size:11px;color:var(--text-muted);">Ferramenta de Criatividade</div>
          <div class="modal-title">SCAMPER — 7 Perguntas de Destravamento</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('search',13)} Técnica clássica para destravar criatividade. Cada uma das 7 perguntas força você a olhar o problema por um ângulo diferente. Para cada insight, clique em "Adicionar" para criar uma alternativa.</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:12px;padding:8px 12px;background:var(--surface-2);border-radius:8px;">
          <strong>Problema em foco:</strong> Catálogo desorganizado → Cross-sell 8% vs 32% benchmark (Petz/Cobasi)
        </div>
        ${perguntas.map(p => `
          <div style="border-left:4px solid ${p.cor};padding:10px 14px;margin-bottom:10px;background:var(--surface-2);border-radius:0 8px 8px 0;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="width:24px;height:24px;border-radius:50%;background:${p.cor};color:white;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${p.letra}</span>
              <span style="font-size:13px;font-weight:700;">${p.nome}</span>
            </div>
            <div style="font-size:12px;margin-bottom:4px;">${p.pergunta}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;font-style:italic;">${p.exemplo}</div>
            <div style="display:flex;gap:6px;align-items:center;">
              <input class="form-input" style="flex:1;font-size:12px;" placeholder="Sua resposta → alternativa potencial...">
              <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('Alternativa adicionada via SCAMPER!')">Adicionar</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

// ─────────────────────────────────────────────────────────────
// FERRAMENTA 3 — Análise Morfológica
// ─────────────────────────────────────────────────────────────
function showT06Morfo() {
  const dimensoes = [
    { nome: 'Abordagem IA',   opcoes: ['LLM via API', 'RAG semântico', 'Fine-tuning', 'Sem IA (processo)'] },
    { nome: 'Quando',         opcoes: ['Imediato (1-2 sem)', 'Curto prazo (1-2m)', 'Médio prazo (3-4m)', 'Faseado'] },
    { nome: 'Dados',          opcoes: ['Histórico de pedidos', 'Dados de catálogo', 'Comportamento de sessão', 'Dados externos'] },
    { nome: 'Plataforma',     opcoes: ['Shopify native', 'API própria', 'SaaS plug-in', 'Modelo open-source'] },
    { nome: 'Custo/modelo',   opcoes: ['Proprietário (custo zero token)', 'SaaS recorrente', 'API por uso', 'Híbrido'] },
  ];

  showModal(`
    <div class="modal" style="max-width:760px;">
      <div class="modal-header">
        <div>
          <div style="font-size:11px;color:var(--text-muted);">Ferramenta de Criatividade</div>
          <div class="modal-title">Análise Morfológica — Matriz Combinatorial</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('chart',13)} Decompõe o problema em dimensões. Combinações entre dimensões geram alternativas que dificilmente apareceriam em brainstorming livre.</div>
        <div style="overflow-x:auto;">
          <table class="table" style="font-size:12px;min-width:600px;">
            <thead>
              <tr>
                <th style="width:140px;">Dimensão</th>
                <th>Opção 1</th><th>Opção 2</th><th>Opção 3</th><th>Opção 4</th>
              </tr>
            </thead>
            <tbody>
              ${dimensoes.map((d, di) => `
                <tr>
                  <td style="font-weight:700;background:var(--surface-2);">${d.nome}</td>
                  ${d.opcoes.map((o, oi) => `
                    <td style="cursor:pointer;" onclick="toggleMorfoCell(this)"
                      onmouseover="if(!this.classList.contains('morfo-sel'))this.style.background='#F0FDF4'"
                      onmouseout="if(!this.classList.contains('morfo-sel'))this.style.background=''"
                    >${o}</td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:14px;font-size:12px;color:var(--text-secondary);">Clique nas células para selecionar uma opção por dimensão. Combinações selecionadas viram alternativas.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('Combinação morfológica adicionada como nova alternativa!')">Gerar Alternativa com Combinação</button>
      </div>
    </div>
  `);
}

function toggleMorfoCell(td) {
  const row = td.parentElement;
  row.querySelectorAll('td').forEach(cell => { if (cell !== td) { cell.classList.remove('morfo-sel'); cell.style.background = ''; cell.style.fontWeight = ''; } });
  td.classList.toggle('morfo-sel');
  if (td.classList.contains('morfo-sel')) { td.style.background = '#ECFDF5'; td.style.fontWeight = '700'; } else { td.style.background = ''; td.style.fontWeight = ''; }
}

// ─────────────────────────────────────────────────────────────
// FERRAMENTA 4 — Biblioteca
// ─────────────────────────────────────────────────────────────
function showT06Library() {
  const casos = [
    { id: 'CASE-2026-0038', setor: 'E-commerce',    causa: 'Catálogo sem atributos de complementaridade (71% SKUs)', solucao: 'Auditoria de catálogo + RAG sobre histórico de pedidos (A8 Híbrida)', resultado: 'Cross-sell 6% → 24% em 90 dias. Ticket médio +R$ 38.' },
    { id: 'CASE-2025-0051', setor: 'Varejo Digital', causa: 'KPI de GMV ignorando ticket por cliente', solucao: 'Widget de cross-sell no checkout + mudança de KPI para itens/pedido', resultado: 'CTR widget 12,4%. Ticket médio +R$ 42 em 4 meses.' },
    { id: 'CASE-2025-0044', setor: 'Fintech',        causa: 'Onboarding sem personalização por perfil de uso', solucao: 'LLM via API para geração de onboarding personalizado (A2)', resultado: 'Ativação de funcionalidades secundárias +34% em 60 dias.' },
    { id: 'CASE-2024-0055', setor: 'Flexografia', causa: 'Manutenção corretiva-reativa (89% das horas)', solucao: 'TPM completo + autonomous maintenance', resultado: 'Razão corretiva/preventiva 85%/15% → 35%/65% em 8 meses.' },
  ];

  showModal(`
    <div class="modal" style="max-width:720px;">
      <div class="modal-header">
        <div>
          <div style="font-size:11px;color:var(--text-muted);">Ferramenta de Geração</div>
          <div class="modal-title">Biblioteca AXISUS — Casos Similares</div>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3" style="font-size:12px;">${icon('book',13)} Aproveite o aprendizado da rede AXISUS. Casos com causa raiz similar ao seu — soluções e resultados reais.</div>
        ${casos.map(c => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px;">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-blue" style="font-size:10px;">${c.id}</span>
              <span class="badge badge-gray" style="font-size:10px;">${c.setor}</span>
            </div>
            <div style="font-size:12px;font-weight:700;margin-bottom:3px;">${c.causa}</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">Solução: ${c.solucao}</div>
            <div style="font-size:12px;color:var(--accent);font-weight:600;">Resultado: ${c.resultado}</div>
            <div class="flex gap-2 mt-3">
              <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('Alternativa importada da biblioteca!')">Importar como Alternativa</button>
              <button class="btn btn-secondary btn-sm">Ver caso completo</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

// ─────────────────────────────────────────────────────────────
// IA — Geração em lote
// ─────────────────────────────────────────────────────────────
function showT06AIGenerate() {
  showModal(`
    <div class="modal" style="max-width:680px;">
      <div class="modal-header">
        <div class="modal-title">${icon('ai',16)} IA Copiloto — Geração de Alternativas</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-4" style="font-size:12px;">A IA analisou ${T06_STATE.alternativas.length} alternativas já geradas e sugere complementos nas categorias menos exploradas.</div>
        ${[
          { num:'A9', cat:'rag', titulo:'RAG + LLM Híbrido — Busca Semântica + Geração de Contexto', desc:'Combina busca vetorial no histórico de co-compra (A3) com LLM para gerar texto contextual explicando a recomendação ("Clientes que compraram X geralmente levam Y porque..."). Aumenta trust e conversão.', match:'91%' },
          { num:'A10', cat:'nao_ia', titulo:'Widget Visual de Bundles Curados por Raça/Porte do Pet', desc:'Sem IA: criar bundles curados por especialistas (ex: "Kit Filhote Golden" = ração + petisco + brinquedo + coleira). Conversão mais alta por ser proposta específica, não genérica. Custo: R$5k.', match:'79%' },
        ].map(s => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:12px;">
            <div class="flex items-center gap-2 mb-2">
              <span style="font-size:11px;font-weight:800;color:var(--primary);">${s.num}</span>
              <span class="badge" style="background:${T06_CAT_CONFIG[s.cat]?.color || '#4A5A56'};color:white;font-size:10px;">${T06_CAT_CONFIG[s.cat]?.label || s.cat}</span>
              <span style="font-size:10px;color:var(--accent);font-weight:700;margin-left:auto;">Match ${s.match}</span>
            </div>
            <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${s.titulo}</div>
            <div style="font-size:12px;color:var(--text-secondary);">${s.desc}</div>
            <div class="flex gap-2 mt-3">
              <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('Alternativa IA adicionada ao canvas!')">+ Adicionar ao Canvas</button>
              <button class="btn btn-secondary btn-sm" onclick="closeModal()">Ignorar</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
    </div>
  `);
}

// ─────────────────────────────────────────────────────────────
// GATE DESIGN
// ─────────────────────────────────────────────────────────────
function requestGateDesign() {
  const encaminhadas = T06_STATE.alternativas.filter(a => a.status === 'encaminhada');
  const total        = T06_STATE.alternativas.length;
  const categsCobertos = [...new Set(encaminhadas.map(a => a.categoria))];

  if (total < 6) { showToast('Gere pelo menos 6 alternativas antes de solicitar o Gate Design.', 'error'); return; }
  if (encaminhadas.length === 0) { showToast('Encaminhe pelo menos uma alternativa para T07.', 'error'); return; }

  const clienteOriginal = T06_STATE.alternativas.find(a => a.origem === 'cliente');

  showModal(`
    <div class="modal" style="max-width:620px;">
      <div class="modal-header">
        <div class="modal-title">Solicitar Gate Design ao Hub Central</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success mb-4" style="font-size:12px;">
          ${icon('check',14)} <strong>${encaminhadas.length} alternativas encaminhadas para T07</strong> de ${total} geradas.
        </div>

        <div style="background:var(--surface-2);border-radius:10px;padding:14px;font-size:12px;margin-bottom:14px;">
          <div class="font-semibold mb-3">Checklist de Revisão (Hub Central):</div>
          ${[
            [`✅ Mínimo 6 alternativas geradas`, total >= 6],
            [`✅ Variedade de categorias: ${categsCobertos.length} categoria${categsCobertos.length > 1 ? 's' : ''} cobertas`, categsCobertos.length >= 2],
            [`${clienteOriginal ? '✅' : '⚠️'} Solução original do cliente (T01) incluída e avaliada`, !!clienteOriginal],
            [`✅ Todas as encaminhadas têm aderência ≠ vermelho`, encaminhadas.every(a => a.avaliacao?.aderencia !== 'vermelho')],
            [`✅ Alternativas descartadas têm motivo registrado`, T06_STATE.alternativas.filter(a => a.status === 'descartada').every(a => a.motivo_descarte)],
          ].map(([item, ok]) => `
            <div class="flex items-center gap-2 mb-2">
              <span style="font-size:14px;">${ok ? '✅' : '⚠️'}</span>
              <span style="${ok ? '' : 'color:var(--gold);font-weight:600;'}">${item}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom:12px;">
          <div style="font-size:12px;font-weight:700;margin-bottom:8px;">Alternativas encaminhadas para T07:</div>
          ${encaminhadas.sort((a,b) => (a.prioridade||99) - (b.prioridade||99)).map(a => {
            const cat = T06_CAT_CONFIG[a.categoria];
            return `
              <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--surface-2);border-radius:8px;margin-bottom:4px;">
                <span style="font-size:11px;font-weight:800;color:${cat?.color};">${a.num}</span>
                <span style="font-size:12px;flex:1;">${a.titulo}</span>
                <span style="font-size:11px;color:var(--text-muted);">${a.custo_estimado?.split('(')[0]?.trim() || ''}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="form-group">
          <label class="form-label">Comentário para o revisor (opcional)</label>
          <textarea class="form-textarea" rows="2" placeholder="Pontos de atenção, contexto adicional..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-accent" onclick="closeModal();showToast('Gate Design enviado para revisão! Hub Central notificado.')">
          ${icon('send',14)} Enviar para Revisão
        </button>
      </div>
    </div>
  `);
}

function bindT06Events() {}
