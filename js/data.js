// AXISUS Platform - Mock Data & State Management

const AXISUS = {
  // ============ STATE ============
  state: {
    currentUser: null,
    currentView: 'landing',
    currentTab: null,
    activeCase: null,
    activeLead: null,
    modal: null,
  },

  // ============ MOCK USERS ============
  users: {
    client: {
      id: 'u1', role: 'client', name: 'Carlos Mendes', email: 'carlos@distribuidorasul.com.br',
      company: 'Distribuidora Sul Ltda', avatar: 'CM', cnpj: '12.345.678/0001-99',
      setor: 'Logística', porte: 'Médio'
    },
    franchisee: {
      id: 'u2', role: 'franchisee', name: 'Ana Paula Rodrigues', email: 'ana@axisus.com.br',
      avatar: 'AP', nivel: 'Pleno', regiao: 'Grande SP - Zona Sul', nps_medio: 9.2,
      casos_ativos: 3, faturamento_mes: 48500
    },
    candidate: {
      id: 'u3', role: 'candidate', name: 'Roberto Silva', email: 'roberto.silva@gmail.com',
      avatar: 'RS', estagio: 'approved_interview'
    },
    hub: {
      id: 'u4', role: 'hub_admin', name: 'Mariana Costa', email: 'mariana@axisus.com.br',
      avatar: 'MC', sub_role: 'hub_admin'
    }
  },

  // ============ MOCK CASES ============
  cases: [
    {
      id: 'c1', codigo: 'CASE-2026-0042', client: 'Distribuidora Sul Ltda',
      problema_inicial: 'Alto custo de frete e atrasos nas entregas causando perda de clientes',
      problema_reformulado: 'Ineficiência no roteirizamento e falta de visibilidade da cadeia logística geram R$ 280k/ano em custos evitáveis.',
      fase_atual: 'deliver', status: 'active', produto: 'Plataforma',
      valor_contrato: 45000, data_inicio: '2026-04-01', prazo_dias: 75,
      dias_decorridos: 68, progresso: 91,
      franchisee: 'Ana Paula Rodrigues', franchisee_nivel: 'Pleno',
      phases: {
        define:    { status: 'completed', data_inicio: '2026-04-01', data_fim: '2026-04-12', prazo: 10, real: 11 },
        diagnose:  { status: 'completed', data_inicio: '2026-04-13', data_fim: '2026-05-02', prazo: 20, real: 19 },
        design:    { status: 'completed', data_inicio: '2026-05-03', data_fim: '2026-05-18', prazo: 15, real: 15 },
        decide:    { status: 'completed', data_inicio: '2026-05-19', data_fim: '2026-06-01', prazo: 10, real: 13 },
        deliver:   { status: 'active',    data_inicio: '2026-06-02', data_fim: null,         prazo: 10, real: null },
      },
      artifacts: [
        { id: 'T01', nome: 'Briefing Inicial',            fase: 'define',    status: 'completed' },
        { id: 'T02', nome: 'Is / Is Not + Stakeholders',  fase: 'define',    status: 'completed' },
        { id: 'T03', nome: 'Quantificação da Dor',        fase: 'define',    status: 'completed' },
        { id: 'T04', nome: 'Ishikawa + 5 Porquês',        fase: 'diagnose',  status: 'completed' },
        { id: 'T05', nome: 'Validação Causa Raiz',        fase: 'diagnose',  status: 'completed' },
        { id: 'T06', nome: 'Canvas de Alternativas',      fase: 'design',    status: 'completed' },
        { id: 'T07', nome: 'Priorização WSJF AXISUS',     fase: 'decide',    status: 'completed' },
        { id: 'T08', nome: '5W2H + Riscos + KPIs',        fase: 'decide',    status: 'completed' },
        { id: 'T09', nome: 'A3 Expandido (Entrega Final)', fase: 'deliver',   status: 'in_progress' },
      ],
      data_requests: [
        { id: 'dr1', desc: 'Planilha de custos de frete (últimos 12 meses)', formato: 'Excel', prazo: '2026-04-20', status: 'received' },
        { id: 'dr2', desc: 'Dados de OEE das rotas (por região)', formato: 'Excel/PDF', prazo: '2026-05-05', status: 'sent' },
        { id: 'dr3', desc: 'Mapeamento de clientes por CEP e frequência', formato: 'CSV', prazo: '2026-05-20', status: 'pending' },
      ],
      meetings: [
        { id: 'm1', tipo: 'briefing_inicial',    data: '2026-04-02', hora: '10:00', status: 'completed', notas: 'Alinhamento inicial. Problema principal: custo frete.' },
        { id: 'm2', tipo: 'workshop_ishikawa',   data: '2026-04-22', hora: '14:00', status: 'completed', notas: 'Mapeadas 7 causas potenciais.' },
        { id: 'm3', tipo: 'apresentacao_a3',     data: '2026-06-10', hora: '09:00', status: 'scheduled', link: 'https://meet.google.com/abc-def-ghi' },
      ],
      invoices: [
        { id: 'inv1', desc: 'Parcela 1/2 — Diagnóstico AXISUS', valor: 22500, status: 'paid',    venc: '2026-04-15', pago: '2026-04-14' },
        { id: 'inv2', desc: 'Parcela 2/2 — Diagnóstico AXISUS', valor: 22500, status: 'pending', venc: '2026-06-15', pago: null },
      ],
      messages: [
        { id: 'msg1', sender: 'Ana Paula', avatar: 'AP', own: false, content: 'Olá Carlos! Recebi os dados de frete. Já estou analisando. Algo mais importante que devo saber?', time: '14h32' },
        { id: 'msg2', sender: 'Carlos', avatar: 'CM', own: true, content: 'Oi Ana! Sim, o problema é maior na região Sul — lá temos 40% dos custos com apenas 18% do volume.', time: '15h10' },
        { id: 'msg3', sender: 'Ana Paula', avatar: 'AP', own: false, content: 'Perfeito, isso é exatamente o que o Ishikawa já apontou como hipótese. Vou validar com os dados. Obrigada!', time: '15h22' },
      ]
    },
    {
      id: 'c2', codigo: 'CASE-2026-0038', client: 'Metalúrgica Primus',
      problema_inicial: 'OEE abaixo de 55% na linha principal',
      problema_reformulado: 'Paradas não planejadas e setup demorado reduzem OEE em 22pp vs. benchmark.',
      fase_atual: 'deliver', status: 'active', produto: 'Plataforma + Visitas',
      valor_contrato: 72000, data_inicio: '2026-02-15', prazo_dias: 75, dias_decorridos: 68, progresso: 91,
      franchisee: 'Ana Paula Rodrigues', franchisee_nivel: 'Pleno'
    }
  ],

  // ============ MOCK LEADS ============
  leads: [
    { id: 'l1', empresa: 'Construtora Beta S.A.',    setor: 'Construção', valor: 55000, estagio: 'qualified',       dias: 3,  contato: 'Felipe Santos', origem: 'hub_inbound' },
    { id: 'l2', empresa: 'Farmácia Rede Saúde',      setor: 'Saúde',     valor: 38000, estagio: 'initial_meeting', dias: 7,  contato: 'Juliana Melo',  origem: 'franchisee' },
    { id: 'l3', empresa: 'Transportadora Veloz',     setor: 'Logística', valor: 42000, estagio: 'proposal_sent',   dias: 12, contato: 'Ricardo Lima',  origem: 'indication' },
    { id: 'l4', empresa: 'Supermercado Express',     setor: 'Varejo',    valor: 28000, estagio: 'negotiation',     dias: 5,  contato: 'Amanda Costa', origem: 'hub_inbound' },
    { id: 'l5', empresa: 'Indústria Têxtil Moderna', setor: 'Ind.',      valor: 65000, estagio: 'cold',            dias: 1,  contato: 'Bruno Alves',  origem: 'hub_marketing' },
    { id: 'l6', empresa: 'Clínica MedCenter',        setor: 'Saúde',     valor: 31000, estagio: 'won',             dias: 20, contato: 'Patrícia Silva', origem: 'indication' },
  ],

  // ============ MOCK FRANCHISEES ============
  franchisees: [
    { id: 'f1', nome: 'Ana Paula Rodrigues', nivel: 'Pleno',  regiao: 'SP - Zona Sul',  casos_ativos: 3, nps: 9.2, status: 'active',   mrr: 3800 },
    { id: 'f2', nome: 'João Carlos Pereira', nivel: 'Sênior', regiao: 'SP - Zona Norte', casos_ativos: 5, nps: 9.5, status: 'active',   mrr: 3800 },
    { id: 'f3', nome: 'Fernanda Lopes',      nivel: 'Júnior', regiao: 'RJ - Capital',    casos_ativos: 1, nps: 8.8, status: 'onboarding', mrr: 2900 },
    { id: 'f4', nome: 'Marcelo Teixeira',    nivel: 'Master', regiao: 'MG - BH',         casos_ativos: 7, nps: 9.7, status: 'active',   mrr: 4500 },
    { id: 'f5', nome: 'Camila Ferreira',     nivel: 'Pleno',  regiao: 'PR - Curitiba',   casos_ativos: 4, nps: 9.0, status: 'active',   mrr: 3800 },
  ],

  // ============ MOCK CANDIDATES ============
  candidates: [
    { id: 'cd1', nome: 'Roberto Silva',   estagio: 'approved_interview', dias: 2,  area: 'Manufatura', cert: 'Black Belt' },
    { id: 'cd2', nome: 'Tatiana Borges',  estagio: 'in_analysis',        dias: 4,  area: 'Logística',  cert: 'PMP' },
    { id: 'cd3', nome: 'Diego Martins',   estagio: 'technical_test',     dias: 5,  area: 'Serviços',   cert: 'Lean' },
    { id: 'cd4', nome: 'Larissa Cunha',   estagio: 'cof_sent',           dias: 6,  area: 'Varejo',     cert: 'Black Belt' },
    { id: 'cd5', nome: 'Eduardo Moraes',  estagio: 'ready_contract',     dias: 11, area: 'Manufatura', cert: 'MBB' },
    { id: 'cd6', nome: 'Priscila Gomes',  estagio: 'converted',          dias: 30, area: 'Saúde',      cert: 'Lean' },
  ],

  // ============ HUB METRICS ============
  hubMetrics: {
    franqueados_ativos: 18,
    casos_em_andamento: 34,
    mrr_licencas: 68400,
    faturamento_rede_mes: 487000,
    nps_medio_rede: 9.1,
    churn_anualizado: 0,
    candidatos_funil: 23,
    leads_mes: 47,
    taxa_conversao_leads: 31,
    ticket_medio: 48200
  },

  // ============ QA REVIEWS ============
  qaReviews: [
    { id: 'qa1', caso: 'CASE-2026-0041', franqueado: 'Fernanda Lopes',   nivel: 'Júnior', prazo: '2026-06-05', status: 'pending',   score: null },
    { id: 'qa2', caso: 'CASE-2026-0039', franqueado: 'Camila Ferreira',  nivel: 'Pleno',  prazo: '2026-06-07', status: 'in_review', score: null },
    { id: 'qa3', caso: 'CASE-2026-0037', franqueado: 'Ana Paula Rodrigues', nivel: 'Pleno', prazo: '2026-05-28', status: 'approved', score: 4 },
  ],

  // ============ PROTOTYPING REQUESTS ============
  protoRequests: [
    { id: 'pr1', franqueado: 'João Carlos Pereira', caso: 'CASE-2026-0040', status: 'in_progress', prazo: '2026-06-10', designer: 'Lucas Design' },
    { id: 'pr2', franqueado: 'Marcelo Teixeira',    caso: 'CASE-2026-0035', status: 'delivered',   prazo: '2026-05-25', designer: 'Lucas Design' },
    { id: 'pr3', franqueado: 'Ana Paula Rodrigues', caso: 'CASE-2026-0042', status: 'new',         prazo: '2026-06-20', designer: null },
  ],

  // ============ LIBRARY CASES (RAG) ============
  libraryCases: [
    {
      id: 'lib1', setor: 'Logística', porte: 'Médio', franqueado: 'Ana Paula Rodrigues',
      titulo: 'Distribuidora Sul — Otimização de Frete',
      data_conclusao: '2026-05-30', consultas_ia: 47, aprovado_rag: true,
      problema_reformulado: 'Ineficiência no roteirizamento e falta de visibilidade da cadeia logística geram R$ 280k/ano em custos evitáveis.',
      causa_raiz: 'Ausência de sistema de roteirização dinâmica e dependência de planilhas manuais por motorista.',
      causa_raiz_categoria: 'Método',
      solucao_implementada: 'Implantação de roteirização dinâmica via API + cross-docking em 3 hubs regionais.',
      resultado: 'R$ 64k/ano de economia • Entregas no prazo: 71% → 94% • NPS cliente: +22 pontos',
      tags: ['logística', 'frete', 'roteirização', 'last-mile'],
      fases: { define: 11, diagnose: 19, design: 15, decide: 13, deliver: 7 }
    },
    {
      id: 'lib2', setor: 'Manufatura', porte: 'Grande', franqueado: 'João Carlos Pereira',
      titulo: 'Metalúrgica Primus — Recuperação de OEE',
      data_conclusao: '2026-06-10', consultas_ia: 62, aprovado_rag: true,
      problema_reformulado: 'Paradas não planejadas e setup longo reduzem OEE em 22pp abaixo do benchmark setorial.',
      causa_raiz: 'Ausência de manutenção preventiva estruturada e setup sem padronização SMED.',
      causa_raiz_categoria: 'Máquina',
      solucao_implementada: 'Programa TPM com pilares Manutenção Autônoma e Planejada + kaizen SMED de 3 dias.',
      resultado: 'OEE: 53% → 74% em 90 dias • Paradas não planejadas -67% • Custo manutenção -R$ 48k/ano',
      tags: ['manufatura', 'OEE', 'TPM', 'SMED', 'paradas'],
      fases: { define: 9, diagnose: 22, design: 14, decide: 11, deliver: 8 }
    },
    {
      id: 'lib3', setor: 'Varejo', porte: 'Médio', franqueado: 'Camila Ferreira',
      titulo: 'Supermercado Express — Ruptura de Estoque',
      data_conclusao: '2026-03-15', consultas_ia: 31, aprovado_rag: true,
      problema_reformulado: 'Ruptura de estoque em itens de alto giro gera R$ 180k/ano em venda perdida e perda de clientes.',
      causa_raiz: 'Curva ABC desatualizada e reposição baseada em histórico simples sem sazonalidade.',
      causa_raiz_categoria: 'Método',
      solucao_implementada: 'Reclassificação ABC-XYZ + reposição baseada em previsão de demanda com sazonalidade.',
      resultado: 'Rupturas: -34% • Venda perdida recuperada: R$ 61k/ano • Giro estoque: +18%',
      tags: ['varejo', 'estoque', 'ruptura', 'ABC', 'demanda'],
      fases: { define: 8, diagnose: 14, design: 11, decide: 9, deliver: 5 }
    },
    {
      id: 'lib4', setor: 'Saúde', porte: 'Pequeno', franqueado: 'Fernanda Lopes',
      titulo: 'Clínica MedCenter — Tempo de Espera',
      data_conclusao: '2026-04-28', consultas_ia: 28, aprovado_rag: true,
      problema_reformulado: 'Tempo médio de espera de 47 minutos gera cancelamentos e NPS negativo em especialidades críticas.',
      causa_raiz: 'Agendamento sem buffer para consultas complexas e ausência de triagem de urgência padronizada.',
      causa_raiz_categoria: 'Método',
      solucao_implementada: 'Sistema de triagem em 3 níveis + agendamento inteligente com buffer dinâmico por especialidade.',
      resultado: 'Tempo espera: 47 min → 18 min • Cancelamentos: -58% • NPS: 6.2 → 8.9',
      tags: ['saúde', 'clínica', 'espera', 'agendamento', 'triagem'],
      fases: { define: 7, diagnose: 12, design: 10, decide: 8, deliver: 6 }
    },
    {
      id: 'lib5', setor: 'Construção', porte: 'Grande', franqueado: 'Marcelo Teixeira',
      titulo: 'Construtora Beta — Atraso de Obras',
      data_conclusao: '2026-02-20', consultas_ia: 39, aprovado_rag: true,
      problema_reformulado: 'Atraso médio de 28 dias nas obras causa multas contratuais de R$ 320k/ano e impacta captação.',
      causa_raiz: 'Planejamento de curto prazo sem look-ahead e ausência de gestão de restrições antes do início de cada frente.',
      causa_raiz_categoria: 'Método',
      solucao_implementada: 'Last Planner System com reuniões semanais de PPC e look-ahead de 4 semanas.',
      resultado: 'PPC: 54% → 81% • Atrasos -72% • Multas contratuais economizadas: R$ 230k',
      tags: ['construção', 'atraso', 'Last Planner', 'PPC', 'look-ahead'],
      fases: { define: 10, diagnose: 18, design: 13, decide: 10, deliver: 7 }
    },
    {
      id: 'lib6', setor: 'Tecnologia', porte: 'Médio', franqueado: 'João Carlos Pereira',
      titulo: 'SoftHouse GX — Entrega de Software',
      data_conclusao: '2026-01-18', consultas_ia: 22, aprovado_rag: true,
      problema_reformulado: 'Taxa de retrabalho de 38% nos sprints atrasa entregas em 2–3 semanas e eleva custo de desenvolvimento.',
      causa_raiz: 'Ausência de Definition of Ready nas histórias: entrada de sprint com requisitos ambíguos.',
      causa_raiz_categoria: 'Método',
      solucao_implementada: 'Implantação de DoR + cerimônia de refinamento obrigatória com critérios INVEST.',
      resultado: 'Retrabalho: 38% → 11% • Velocidade time: +24% • Custo por feature entregue -19%',
      tags: ['tecnologia', 'software', 'agile', 'DoR', 'retrabalho'],
      fases: { define: 6, diagnose: 10, design: 9, decide: 7, deliver: 5 }
    },
    {
      id: 'lib7', setor: 'Alimentação', porte: 'Médio', franqueado: 'Camila Ferreira',
      titulo: 'Frigorífico Delta — Desperdício na Produção',
      data_conclusao: '2025-12-10', consultas_ia: 34, aprovado_rag: true,
      problema_reformulado: 'Desperdício de 8,3% do volume processado gera R$ 190k/ano de perda direta e risco sanitário.',
      causa_raiz: 'Temperatura irregular em câmara de resfriamento por manutenção reativa e falta de monitoramento contínuo.',
      causa_raiz_categoria: 'Máquina',
      solucao_implementada: 'Sensores IoT para temperatura + protocolo de manutenção preventiva em câmaras críticas.',
      resultado: 'Desperdício: 8,3% → 2,1% • Perda financeira recuperada: R$ 118k/ano • Zero autuações sanitárias',
      tags: ['alimentação', 'frigorífico', 'desperdício', 'temperatura', 'IoT'],
      fases: { define: 8, diagnose: 16, design: 11, decide: 9, deliver: 6 }
    },
    {
      id: 'lib8', setor: 'RH / Pessoas', porte: 'Grande', franqueado: 'Marcelo Teixeira',
      titulo: 'Indústria Textil Moderna — Turnover Operacional',
      data_conclusao: '2025-11-25', consultas_ia: 19, aprovado_rag: true,
      problema_reformulado: 'Turnover de 74% ao ano no chão de fábrica gera R$ 420k em custos de rescisão e recontratação.',
      causa_raiz: 'Ausência de feedback estruturado e plano de desenvolvimento individual para operadores nos primeiros 90 dias.',
      causa_raiz_categoria: 'Mão de obra',
      solucao_implementada: 'Programa de 90 dias com mentoria, feedbacks quinzenais e trilha de progressão visível.',
      resultado: 'Turnover: 74% → 31% em 6 meses • Custo rescisão: -R$ 196k/ano • Produtividade turno: +12%',
      tags: ['RH', 'turnover', 'pessoas', 'onboarding', 'retenção'],
      fases: { define: 9, diagnose: 14, design: 12, decide: 10, deliver: 7 }
    },
  ],

  // ============ IA METRICS (Telemetria simulada — Onda 2) ============
  iaMetrics: {
    globalAcceptanceRate: 0.42,
    avgReviewTimeSeconds: 23,
    gateCorrelation: 0.87,
    costPerApprovedCase: 0.43,
    cacheHitRate: 0.38,
    totalCallsMonth: 2600,
    totalCostMonth: 4.31,
    // Especialistas com métricas de uso
    specialists: [
      { nome: 'Ana Paula Rodrigues', nivel: 'Pleno',  usoIACaso: 24, acceptRate: 0.44, alertDependency: false },
      { nome: 'João Carlos Pereira', nivel: 'Sênior', usoIACaso: 27, acceptRate: 0.39, alertDependency: false },
      { nome: 'Fernanda Lopes',      nivel: 'Júnior', usoIACaso: 31, acceptRate: 0.61, alertDependency: false },
      { nome: 'Marcelo Teixeira',    nivel: 'Master', usoIACaso: 22, acceptRate: 0.35, alertDependency: false },
      { nome: 'Camila Ferreira',     nivel: 'Pleno',  usoIACaso: 18, acceptRate: 0.82, alertDependency: true  },
    ],
    // Custos por componente (100 casos/mês, cenário ano 2)
    costBreakdown: [
      { componente: 'Chamadas Sonnet (geração)',     volume: 800,  custoUnit: 0.008,  total: 6.40  },
      { componente: 'Chamadas Haiku (validação)',    volume: 1200, custoUnit: 0.0008, total: 0.96  },
      { componente: 'Busca RAG (vetorial)',          volume: 600,  custoUnit: 0.0001, total: 0.06  },
      { componente: 'Embeddings de novos casos',    volume: 100,  custoUnit: 0.0001, total: 0.01  },
      { componente: 'Cache hits (economia)',         volume: 1040, custoUnit: -0.003, total: -3.12 },
    ],
    // 26 pontos de IA P01–P26
    points: [
      // Fase Define
      { id: 'P01', template: 'T01', fase: 'Define',   categoria: 'geracao',  modelo: 'Claude Sonnet 4',              funcao: 'Sugerir casos similares na biblioteca para o briefing',          acceptRate: 0.51, calls: 128, avgMs: 1840 },
      { id: 'P02', template: 'T01', fase: 'Define',   categoria: 'geracao',  modelo: 'Claude Haiku 4.5',             funcao: 'Sugerir perguntas de aprofundamento para o cliente',              acceptRate: 0.48, calls: 134, avgMs: 620  },
      { id: 'P03', template: 'T01', fase: 'Define',   categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detectar riscos de reformulação prematura no briefing',           acceptRate: 0.33, calls:  89, avgMs: 210  },
      { id: 'P04', template: 'T02', fase: 'Define',   categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Sugestões de escopo para dimensões do Is/Is Not',                acceptRate: 0.44, calls: 112, avgMs: 340  },
      { id: 'P05', template: 'T02', fase: 'Define',   categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Detectar stakeholders esquecidos por setor',                     acceptRate: 0.38, calls:  97, avgMs: 290  },
      { id: 'P06', template: 'T03', fase: 'Define',   categoria: 'geracao',  modelo: 'Claude Haiku 4.5',             funcao: 'Sugerir indicadores por dimensão (4 dimensões × N indicadores)', acceptRate: 0.55, calls: 143, avgMs: 580  },
      { id: 'P07', template: 'T03', fase: 'Define',   categoria: 'curadoria',modelo: 'Claude Sonnet 4',              funcao: 'Pré-rascunho da reformulação do problema',                       acceptRate: 0.71, calls: 138, avgMs: 2210 },
      // Fase Diagnose
      { id: 'P08', template: 'T04', fase: 'Diagnose', categoria: 'geracao',  modelo: 'Claude Sonnet 4',              funcao: 'Sugestão proativa de causas por categoria 6M',                   acceptRate: 0.46, calls: 156, avgMs: 2480 },
      { id: 'P09', template: 'T04', fase: 'Diagnose', categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Busca semântica de casos similares na biblioteca',               acceptRate: 0.39, calls: 141, avgMs: 380  },
      { id: 'P10', template: 'T04', fase: 'Diagnose', categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detecção de anti-padrão "Parada precoce" nos 5 Porquês',         acceptRate: 0.28, calls:  73, avgMs: 180  },
      { id: 'P11', template: 'T04', fase: 'Diagnose', categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detecção de anti-padrão "Sintoma como causa"',                   acceptRate: 0.31, calls:  68, avgMs: 190  },
      { id: 'P12', template: 'T04', fase: 'Diagnose', categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detecção de anti-padrão "Atribuição pessoal"',                   acceptRate: 0.22, calls:  54, avgMs: 175  },
      { id: 'P13', template: 'T05', fase: 'Diagnose', categoria: 'geracao',  modelo: 'Claude Haiku 4.5',             funcao: 'Sugestão de métrica de teste por hipótese',                      acceptRate: 0.43, calls: 119, avgMs: 640  },
      { id: 'P14', template: 'T05', fase: 'Diagnose', categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Sugestão de benchmark com fonte verificável',                    acceptRate: 0.47, calls: 108, avgMs: 310  },
      { id: 'P15', template: 'T05', fase: 'Diagnose', categoria: 'analise',  modelo: 'Computação Local (JS)',         funcao: 'Análise estatística automática (média, mediana, tendência)',     acceptRate: 0.89, calls: 204, avgMs:  42  },
      // Fase Design
      { id: 'P16', template: 'T06', fase: 'Design',   categoria: 'geracao',  modelo: 'Claude Sonnet 4',              funcao: 'Gerar alternativas baseadas em casos com causa raiz similar',    acceptRate: 0.52, calls: 132, avgMs: 2650 },
      { id: 'P17', template: 'T06', fase: 'Design',   categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Suporte ao SCAMPER (7 perguntas pré-populadas)',                  acceptRate: 0.41, calls:  88, avgMs: 320  },
      { id: 'P18', template: 'T06', fase: 'Design',   categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detecção de duplicatas e gaps de categoria nas alternativas',    acceptRate: 0.27, calls:  61, avgMs: 200  },
      { id: 'P19', template: 'T06', fase: 'Design',   categoria: 'rag',      modelo: 'text-embedding-3-large',       funcao: 'Importar alternativas de casos similares na biblioteca',         acceptRate: 0.44, calls:  94, avgMs: 360  },
      // Fase Decide
      { id: 'P20', template: 'T07', fase: 'Decide',   categoria: 'geracao',  modelo: 'Claude Haiku 4.5',             funcao: 'Sugestão de scores Fibonacci baseada em casos similares',        acceptRate: 0.38, calls: 116, avgMs: 590  },
      { id: 'P21', template: 'T07', fase: 'Decide',   categoria: 'validacao',modelo: 'Regex + Haiku',                funcao: 'Detecção de inconsistências entre componentes WSJF',              acceptRate: 0.24, calls:  49, avgMs: 185  },
      { id: 'P22', template: 'T08', fase: 'Decide',   categoria: 'geracao',  modelo: 'Claude Sonnet 4',              funcao: 'Geração de ações 5W2H baseada em casos similares',               acceptRate: 0.49, calls: 124, avgMs: 2320 },
      { id: 'P23', template: 'T08', fase: 'Decide',   categoria: 'geracao',  modelo: 'Claude Haiku 4.5',             funcao: 'Sugestão de riscos por padrão setorial',                         acceptRate: 0.56, calls: 131, avgMs: 710  },
      // Fase Deliver
      { id: 'P24', template: 'T09', fase: 'Deliver',  categoria: 'curadoria',modelo: 'Claude Sonnet 4',              funcao: 'Revisão de coerência narrativa entre templates',                  acceptRate: 0.63, calls:  87, avgMs: 3140 },
      { id: 'P25', template: 'T09', fase: 'Deliver',  categoria: 'curadoria',modelo: 'Claude Sonnet 4',              funcao: 'Sugestão de síntese textual (Background, Current State)',        acceptRate: 0.68, calls:  79, avgMs: 2890 },
      { id: 'P26', template: 'T09', fase: 'Deliver',  categoria: 'curadoria',modelo: 'Claude Sonnet 4',              funcao: 'Detecção de "buracos visuais" no A3',                            acceptRate: 0.41, calls:  72, avgMs: 1640 },
    ]
  }
};
