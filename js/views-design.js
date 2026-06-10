// ============================================================
// AXISUS — Template Fase Design: T06 (Geração e Avaliação de Alternativas)
// Especificação Técnica v1.0 · Junho 2026
// ============================================================

// ─────────────────────────────────────────────────────────────
// ESTADO DO T06
// ─────────────────────────────────────────────────────────────
const T06_CAT_CONFIG = {
  organizacional: { label: 'Organizacional', color: '#0F6E56', bg: '#ECFDF5', text: 'white',  textBg: '#065F46' },
  processual:     { label: 'Processual',     color: '#5DCAA5', bg: '#F0FDF4', text: 'white',  textBg: '#047857' },
  tecnologica:    { label: 'Tecnológica',    color: '#1E3A8A', bg: '#EFF6FF', text: 'white',  textBg: '#1E40AF' },
  capacitacao:    { label: 'Capacitação',    color: '#6B21A8', bg: '#F5F3FF', text: 'white',  textBg: '#5B21B6' },
  comercial:      { label: 'Comercial',      color: '#B45309', bg: '#FFFBEB', text: 'white',  textBg: '#92400E' },
  hibrida:        { label: 'Híbrida',        color: '#4A5A56', bg: '#F8FAFC', text: 'white',  textBg: '#334155' },
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

const T06_STATE = {
  selectedId: 'a1',
  alternativas: [
    {
      id: 'a1', num: 'A1',
      titulo: 'Contratar Gestor de Manutenção Sênior',
      categoria: 'organizacional',
      descricao: 'Contratar profissional sênior com experiência em flexografia (ex: ex-gerente de manutenção de outra gráfica do setor) para reestruturar a função inteira: plano preventivo, métricas, capacitação da equipe técnica.',
      mecanica: 'Recrutamento via headhunter especializado em manufatura (2 meses). Ramp-up de 4 meses com mentoria do Hub AXISUS. Entregáveis: plano preventivo em 90 dias, KPIs de manutenção em 60 dias, equipe treinada em 120 dias.',
      custo_estimado: 'R$ 240.000 (12 meses salário + encargos + bonificação)',
      prazo_meses: 6,
      status: 'encaminhada',
      prioridade: 1,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'amarelo', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Trata diretamente a ausência do gestor — causa raiz exata.',
        viabilidade: 'Mercado tem profissionais disponíveis. Salário competitivo.',
        custo: 'R$240k dentro do orçamento disponível (R$600k).',
        prazo: '6 meses dentro do horizonte de 12 meses do cliente.',
        complexidade: 'Pode haver resistência do time atual quanto à liderança nova.',
        risco: 'Risco de fit cultural e retenção após os 12 meses iniciais.',
      },
      pre_requisitos: 'Job description aprovado pela diretoria. Budget HR aprovado.',
      premissas: 'Mercado tem candidatos qualificados em flexografia industrial.',
      motivo_descarte: '',
    },
    {
      id: 'a2', num: 'A2',
      titulo: 'Implementar SMED na Linha Flexográfica',
      categoria: 'processual',
      descricao: 'Aplicar metodologia SMED (Single-Minute Exchange of Die) para reduzir tempo de setup de 45–90 min para 10–15 min. Análise de operações internas vs externas, padronização de procedimentos, kits pré-preparados.',
      mecanica: 'Mapeamento do setup atual com filmagem (semana 1-2). Workshop SMED com equipe (semana 3). Implementação de kits físicos e procedimento padronizado (mês 2-3). Validação com medição pré/pós (mês 4).',
      custo_estimado: 'R$ 80.000 (consultoria SMED + kits físicos + treinamento)',
      prazo_meses: 4,
      status: 'encaminhada',
      prioridade: 3,
      origem: 'especialista',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata sintoma relacionado (setup lento) — não trata ausência do gestor diretamente.',
        viabilidade: 'Metodologia madura, consultores disponíveis, equipe receptiva.',
        custo: 'R$80k é o menor custo entre todas as alternativas.',
        prazo: '4 meses — mais rápida de implementar.',
        complexidade: 'Baixa resistência — melhora condições de trabalho.',
        risco: 'Metodologia consagrada. Risco baixo.',
      },
      pre_requisitos: 'Gestor ou responsável técnico para sustentar as melhorias após a consultoria.',
      premissas: 'Equipe operacional disponível para os workshops e filmagens.',
      motivo_descarte: '',
    },
    {
      id: 'a3', num: 'A3',
      titulo: 'Implementar TPM (Total Productive Maintenance)',
      categoria: 'processual',
      descricao: 'Implementar TPM (Total Productive Maintenance) — manutenção preventiva planejada, autonomous maintenance pelos operadores, manutenção preditiva via sensores de vibração e temperatura.',
      mecanica: 'Diagnóstico da situação atual (mês 1). Piloto em 1 equipamento (mês 2-3). Treinamento autonomous maintenance operadores (mês 3-4). Extensão para toda a linha (mês 5-8). Sensores preditivos opcionais.',
      custo_estimado: 'R$ 180.000 (consultoria TPM + sensores + capacitação)',
      prazo_meses: 8,
      status: 'encaminhada',
      prioridade: 2,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'amarelo', custo: 'verde', prazo: 'amarelo', complexidade: 'amarelo', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Trata diretamente a ausência de manutenção preventiva estruturada.',
        viabilidade: 'Exige mudança cultural significativa. Requer gestor para sustentar.',
        custo: 'R$180k dentro do orçamento.',
        prazo: '8 meses — mais longa, mas abordagem mais completa.',
        complexidade: 'TPM exige mudança de cultura. Possível resistência inicial.',
        risco: 'Risco de recaída sem liderança sustentando — reforça necessidade de A1.',
      },
      pre_requisitos: 'Idealmente combinado com A1 (gestor sênior) para sustentabilidade.',
      premissas: 'Alta liderança comprometida com o processo de mudança cultural.',
      motivo_descarte: '',
    },
    {
      id: 'a4', num: 'A4',
      titulo: 'Sistema OEE Automatizado com IoT',
      categoria: 'tecnologica',
      descricao: 'Implementar sistema de coleta automatizada de OEE com sensores IoT na linha de flexografia. Dashboard real-time, alertas proativos, histórico analítico, integração com ERP.',
      mecanica: 'Especificação técnica (mês 1). Instalação de sensores e integração ERP (mês 2-3). Configuração de dashboards e alertas (mês 4). Treinamento gestores (mês 5). Go-live e sustentação (mês 5+).',
      custo_estimado: 'R$ 95.000 (hardware + software + integração + 1 ano SaaS)',
      prazo_meses: 5,
      status: 'encaminhada',
      prioridade: 4,
      origem: 'ia',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata visibilidade do problema — habilita decisões mas não substitui gestão.',
        viabilidade: 'Mercado maduro em IoT industrial. Integrações disponíveis.',
        custo: 'R$95k razoável para o benefício de visibilidade contínua.',
        prazo: '5 meses viável.',
        complexidade: 'Gestores e diretoria tendem a apoiar — é "tecnologia visível".',
        risco: 'Tecnologia madura. Risco principal é integração ERP legado.',
      },
      pre_requisitos: 'ERP com API ou conectores disponíveis. Ti da empresa colaborativa.',
      premissas: 'Time de TI disponível para integração (estimado 40h).',
      motivo_descarte: '',
    },
    {
      id: 'a5', num: 'A5',
      titulo: 'Terceirização da Manutenção (Outsourcing)',
      categoria: 'organizacional',
      descricao: 'Contratar empresa especializada em manutenção industrial via contrato performance-based com SLA de MTBF e disponibilidade garantidos. Operadores internos liberados para foco exclusivo em produção.',
      mecanica: 'RFP para 3-5 fornecedores especializados (mês 1). Negociação contrato com SLA (mês 2). Onboarding do fornecedor (mês 3). Transição e acompanhamento (mês 3+).',
      custo_estimado: 'R$ 380.000/ano (custo recorrente)',
      prazo_meses: 3,
      status: 'descartada',
      prioridade: null,
      origem: 'especialista',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'vermelho', prazo: 'verde', complexidade: 'amarelo', risco: 'amarelo' },
      justificativas: {
        aderencia: 'Trata sintoma, mas cria dependência externa sem desenvolver capacidade interna.',
        viabilidade: 'Viável operacionalmente — fornecedores existem.',
        custo: 'R$380k/ano recorrente supera em muito o custo de A1 (R$240k única vez).',
        prazo: 'Mais rápida — 3 meses para contratar.',
        complexidade: 'Fornecedor externo pode gerar resistência do time interno.',
        risco: 'Risco de dependência: se fornecedor falhar ou sair, problema volta amplificado.',
      },
      pre_requisitos: '',
      premissas: '',
      motivo_descarte: 'Custo recorrente muito alto (R$380k/ano) vs A1 (R$240k único). Transfere o problema de gestão para um fornecedor sem desenvolver capacidade interna.',
    },
    {
      id: 'a6', num: 'A6',
      titulo: 'Comprar Máquina Flexográfica Nova (Cliente)',
      categoria: 'tecnologica',
      descricao: 'Substituir máquina atual por equipamento novo de 6 cores, conforme proposta original do cliente. Bobst ou Comexi, prazo de entrega 8 meses. Solução originalmente imaginada pelo cliente em T01.',
      mecanica: 'Cotação com Bobst, Comexi e Windmöller (mês 1-2). Aprovação financiamento (mês 3). Fabricação e entrega (mês 4-10). Instalação e comissionamento (mês 11-12). Treinamento e ramp-up (mês 13-14).',
      custo_estimado: 'R$ 4.800.000 (CAPEX + instalação + treinamento + tempo parado)',
      prazo_meses: 14,
      status: 'descartada',
      prioridade: null,
      origem: 'cliente',
      avaliacao: { aderencia: 'vermelho', viabilidade: 'amarelo', custo: 'vermelho', prazo: 'vermelho', complexidade: 'verde', risco: 'vermelho' },
      justificativas: {
        aderencia: 'NÃO trata causa raiz. Máquina nova operando com os mesmos processos também operará a 18% de OEE.',
        viabilidade: 'Exige aprovação de CAPEX R$4,8M. CFO já sinalizou resistência.',
        custo: 'R$4,8M — 20x maior que A1 (R$240k), 10x maior que A8 (R$500k).',
        prazo: '14 meses — fora do horizonte de 12 meses estipulado pelo cliente.',
        complexidade: 'Diretoria comercial apoia, CFO resiste. Conflito já existe.',
        risco: 'OEE não melhora sem mudança de gestão. CAPEX sem ROI garantido.',
      },
      pre_requisitos: '',
      premissas: '',
      motivo_descarte: 'Não trata causa raiz validada em T05. Custo 20x superior às alternativas que resolvem o problema real. Prazo fora do horizonte do cliente.',
    },
    {
      id: 'a7', num: 'A7',
      titulo: 'Recapacitação da Equipe Técnica Existente',
      categoria: 'capacitacao',
      descricao: 'Programa de capacitação de 6 meses para equipe técnica atual em práticas modernas de manutenção, com mentoria externa mensal, certificação Lean Maintenance ao final.',
      mecanica: 'Diagnóstico de gaps de competência (semana 1-2). Seleção e customização do programa (semana 3-4). Módulos mensais + mentoria externa (mês 1-6). Certificação final (mês 6).',
      custo_estimado: 'R$ 65.000 (treinamento + mentoria + horas-equipe)',
      prazo_meses: 6,
      status: 'arquivada',
      prioridade: null,
      origem: 'especialista',
      avaliacao: { aderencia: 'amarelo', viabilidade: 'verde', custo: 'verde', prazo: 'verde', complexidade: 'verde', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata capacitação mas não a estrutura organizacional (cargo ausente desde 2022).',
        viabilidade: 'Plenamente viável operacionalmente.',
        custo: 'R$65k — menor custo entre todas as alternativas.',
        prazo: '6 meses — dentro do horizonte.',
        complexidade: 'Baixíssima resistência — melhora carreira dos técnicos.',
        risco: 'Baixo risco de execução, mas alto risco de não resolver o problema sozinha.',
      },
      pre_requisitos: '',
      premissas: 'Equipe atual permanece após a capacitação (retenção).',
      motivo_descarte: 'Viável mas insuficiente isoladamente. Sem liderança, capacitação não se sustenta.',
    },
    {
      id: 'a8', num: 'A8',
      titulo: 'Pacote Combinado: A1 + A2 + A3 (Híbrida)',
      categoria: 'hibrida',
      descricao: 'Implementação combinada: contratação de gestor sênior (A1) + SMED (A2) + TPM completo (A3). Aborda causa raiz e os principais sintomas simultaneamente, com gestor liderando todos os processos.',
      mecanica: 'Mês 1: Contratação gestor + kick-off SMED. Mês 2-3: Gestor define plano preventivo + SMED piloto. Mês 4-5: TPM piloto com gestor liderando. Mês 6-8: Extensão completa. KPIs monitorados mensalmente.',
      custo_estimado: 'R$ 500.000 (A1+A2+A3 com otimização de sobreposições)',
      prazo_meses: 8,
      status: 'encaminhada',
      prioridade: 1,
      origem: 'especialista',
      avaliacao: { aderencia: 'verde', viabilidade: 'verde', custo: 'amarelo', prazo: 'amarelo', complexidade: 'amarelo', risco: 'verde' },
      justificativas: {
        aderencia: 'Trata causa raiz (gestor) e sintomas principais (setup + manutenção). Mais completo.',
        viabilidade: 'Viável — gestor coordena A2 e A3, criando sinergia.',
        custo: 'R$500k próximo ao limite de R$600k, mas ROI esperado em 2-3 meses.',
        prazo: '8 meses — dentro do horizonte com folga.',
        complexidade: 'Múltiplas mudanças simultâneas geram mais resistência.',
        risco: 'Baixo risco técnico. Risco de overload da equipe durante transição.',
      },
      pre_requisitos: 'Gestor sênior contratado antes de iniciar A2 e A3.',
      premissas: 'Equipe capaz de absorver múltiplas mudanças simultâneas.',
      motivo_descarte: '',
    },
  ],
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

      <!-- ── Barra de ferramentas ── -->
      <div style="background:white;border-bottom:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="navigate('template_t05')">${icon('arrow_right',14)}</button>
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
      <div style="background:linear-gradient(135deg,#04342C,#065F46);color:white;padding:12px 20px;flex-shrink:0;">
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
          <div style="flex:2;min-width:220px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Causa Raiz Validada em T05</div>
            <div style="font-size:13px;font-weight:700;">Ausência de gestor de manutenção (reorganização pós-pandemia não revisada)</div>
            <div style="font-size:11px;opacity:0.75;margin-top:3px;">Evidência: MTBF 47h vs benchmark 240h · Razão corretiva/preventiva 89% / 11%</div>
          </div>
          <div style="flex:1;min-width:160px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Métrica-Alvo</div>
            <div style="font-size:13px;font-weight:700;">OEE: 18% → 50%+ em 12 meses</div>
          </div>
          <div style="flex:1;min-width:160px;">
            <div style="font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">Restrições (T01)</div>
            <div style="font-size:12px;font-weight:500;">Decisão até 31/07/2026 · Orçamento ≤ R$ 600k</div>
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
    { letra: 'C', nome: 'Combinar',   cor: '#0891B2', pergunta: 'O que pode ser COMBINADO com outra coisa para criar mais valor?', exemplo: 'Ex: combinar gestor sênior com sistema OEE automatizado' },
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
          <strong>Problema em foco:</strong> Ausência de gestor de manutenção → MTBF 47h vs 240h benchmark
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
    { nome: 'Quem executa',   opcoes: ['Equipe interna', 'Gestor contratado', 'Consultoria externa', 'Empresa terceirizada'] },
    { nome: 'Quando',         opcoes: ['Imediato (1-3m)', 'Curto prazo (3-6m)', 'Médio prazo (6-12m)', 'Faseado'] },
    { nome: 'Tecnologia',     opcoes: ['Sem TI necessária', 'ERP existente', 'Sistema IoT novo', 'SaaS especializado'] },
    { nome: 'Metodologia',    opcoes: ['TPM', 'SMED', 'Lean Maintenance', 'RCM (Confiabilidade)'] },
    { nome: 'Tipo de mudança',opcoes: ['Organizacional', 'Processual', 'Cultural + treinamento', 'Tecnológica'] },
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
    { id: 'CASE-2025-0031', setor: 'Manufatura', causa: 'Ausência de gestão de manutenção preventiva', solucao: 'Contratação de supervisor de manutenção + plano preventivo (A1+A3)', resultado: 'MTBF 34h → 189h em 6 meses. OEE 22% → 54%.' },
    { id: 'CASE-2025-0019', setor: 'Embalagens', causa: 'Setup demorado sem procedimento padronizado', solucao: 'SMED + treinamento operadores', resultado: 'Setup 4,2h → 1,1h em 3 meses. OEE +12 p.p.' },
    { id: 'CASE-2024-0088', setor: 'Gráfica',    causa: 'OEE baixo por falta de medição e visibilidade', solucao: 'Sistema IoT + dashboard OEE real-time', resultado: 'Identificação de 3 gargalos ocultos. OEE +8 p.p. em 4 meses.' },
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
          { num:'A9', cat:'Tecnológica', titulo:'CMMS (Computerized Maintenance Management System)', desc:'Implementar software de gestão de manutenção para planejar, programar e rastrear ordens de serviço. Exemplos: Limble CMMS, Upkeep, Fiix. Custo: R$45k/ano SaaS.', match:'87%' },
          { num:'A10', cat:'Capacitação', titulo:'Programa de Mentoria Técnica por Especialista Externo', desc:'Contratar especialista senior em flexografia para mentorar equipe técnica por 12 meses (2 dias/mês). Transferência de conhecimento tácito de operações maduras.', match:'82%' },
        ].map(s => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:12px;">
            <div class="flex items-center gap-2 mb-2">
              <span style="font-size:11px;font-weight:800;color:var(--primary);">${s.num}</span>
              <span class="badge" style="background:${T06_CAT_CONFIG[s.cat.toLowerCase()]?.color || '#4A5A56'};color:white;font-size:10px;">${s.cat}</span>
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
