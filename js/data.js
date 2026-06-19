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

  // ============ LIBRARY CASES ============
  libraryCases: [
    { id: 'lib1', setor: 'Logística',   problema: 'Custo de frete elevado',      solucao: 'Roteirização dinâmica + cross-docking', roi: '23% redução de custos', lições: 3 },
    { id: 'lib2', setor: 'Manufatura',  problema: 'OEE abaixo do benchmark',     solucao: 'SMED + TPM nas paradas críticas',       roi: '+18pp de OEE em 90 dias', lições: 5 },
    { id: 'lib3', setor: 'Varejo',      problema: 'Ruptura de estoque',          solucao: 'Reposição baseada em demanda prevista', roi: '34% menos rupturas',    lições: 2 },
    { id: 'lib4', setor: 'Saúde',       problema: 'Fila de atendimento longa',   solucao: 'Triagem ágil + agendamento inteligente', roi: '40% redução espera',  lições: 4 },
    { id: 'lib5', setor: 'Construção',  problema: 'Atraso de obras recorrente',  solucao: 'Planejamento pull + pronto para execução', roi: '28 dias adiantado',  lições: 3 },
  ]
};
