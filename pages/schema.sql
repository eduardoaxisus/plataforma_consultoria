-- ============================================================
-- AXISUS Platform — Schema SQL Completo (Supabase / PostgreSQL)
-- Versão 1.0 — Junho 2026
-- ============================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- pgvector para RAG

-- ============ ENUMS ============

CREATE TYPE user_role AS ENUM (
  'client', 'franchisee', 'hub_admin', 'hub_operator',
  'hub_reviewer', 'hub_designer', 'candidate'
);

CREATE TYPE user_status AS ENUM ('invited', 'active', 'suspended', 'inactive');

CREATE TYPE setor_type AS ENUM (
  'industria', 'logistica', 'varejo', 'servicos',
  'saude', 'agro', 'construcao', 'outros'
);

CREATE TYPE porte_type AS ENUM ('pequeno', 'medio', 'grande', 'corporate');

CREATE TYPE contact_type AS ENUM ('decisor', 'patrocinador', 'operacional', 'financeiro', 'tecnico');

CREATE TYPE candidate_stage AS ENUM (
  'received', 'in_analysis', 'approved_interview', 'interviewed',
  'technical_test', 'cof_sent', 'legal_period', 'ready_contract',
  'converted', 'rejected'
);

CREATE TYPE franchisee_level AS ENUM ('junior', 'pleno', 'senior', 'master');

CREATE TYPE franchisee_status AS ENUM ('onboarding', 'active', 'on_probation', 'suspended', 'exited');

CREATE TYPE lead_origin AS ENUM (
  'hub_marketing', 'hub_inbound', 'franchisee_prospecting',
  'indication', 'event', 'website'
);

CREATE TYPE lead_stage AS ENUM (
  'cold', 'qualified', 'initial_meeting', 'proposal_sent',
  'negotiation', 'won', 'lost'
);

CREATE TYPE client_status AS ENUM (
  'lead', 'qualified', 'proposal_sent', 'negotiating',
  'client', 'churned', 'lost'
);

CREATE TYPE produto_type AS ENUM ('platform', 'platform_online', 'platform_visits');

CREATE TYPE case_phase AS ENUM ('define', 'diagnose', 'design', 'decide', 'deliver', 'closed');

CREATE TYPE case_status AS ENUM ('active', 'paused', 'completed', 'cancelled');

CREATE TYPE phase_status AS ENUM ('not_started', 'in_progress', 'gate_pending', 'completed', 'blocked');

CREATE TYPE template_type AS ENUM ('T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09');

CREATE TYPE artifact_status AS ENUM ('draft', 'completed', 'reviewed_by_hub', 'needs_revision', 'signed_off_by_client');

CREATE TYPE contract_type AS ENUM ('service_client', 'franchise_franchisee', 'service_internal');

CREATE TYPE contract_status AS ENUM ('draft', 'sent_for_signature', 'signed', 'active', 'completed', 'cancelled');

CREATE TYPE invoice_type AS ENUM (
  'client_service', 'franchisee_license', 'franchisee_marketing',
  'franchisee_initial_fee', 'hub_service'
);

CREATE TYPE invoice_status AS ENUM ('pending', 'sent', 'paid', 'overdue', 'cancelled');

CREATE TYPE payment_method AS ENUM ('boleto', 'pix', 'cartao', 'transferencia');

CREATE TYPE subscription_type AS ENUM ('license_monthly', 'marketing_fee');

CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled');

CREATE TYPE conversation_type AS ENUM (
  'client_franchisee', 'franchisee_hub', 'candidate_hub', 'hub_internal'
);

CREATE TYPE proto_status AS ENUM ('new', 'assigned', 'in_progress', 'in_review', 'delivered', 'cancelled');

CREATE TYPE region_status AS ENUM ('available', 'assigned', 'reserved');

CREATE TYPE meeting_type AS ENUM (
  'briefing_inicial', 'workshop_ishikawa', 'apresentacao_a3',
  'checkin_30', 'checkin_60', 'checkin_90'
);

-- ============ FUNÇÃO PADRÃO: timestamps automáticos ============

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============ GRUPO 1: USUÁRIOS ============

CREATE TABLE users (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE, -- FK para auth.users do Supabase
  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT NOT NULL,
  phone        TEXT,
  cpf          TEXT UNIQUE,
  role         user_role NOT NULL DEFAULT 'client',
  status       user_status NOT NULL DEFAULT 'invited',
  avatar_url   TEXT,
  last_login_at TIMESTAMPTZ,
  preferences  JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  created_by   UUID REFERENCES users(id),
  updated_by   UUID REFERENCES users(id)
);

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID,
  metadata    JSONB DEFAULT '{}',
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- ============ GRUPO 2: CLIENTES ============

CREATE TABLE clients (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  razao_social             TEXT NOT NULL,
  nome_fantasia            TEXT,
  cnpj                     TEXT UNIQUE NOT NULL,
  inscricao_estadual       TEXT,
  setor                    setor_type,
  sub_setor                TEXT,
  porte                    porte_type,
  faturamento_anual_faixa  TEXT,
  num_funcionarios         INTEGER,
  endereco                 JSONB DEFAULT '{}',
  franchisee_responsavel_id UUID REFERENCES users(id),
  status                   client_status DEFAULT 'lead',
  origem                   TEXT,
  tags                     TEXT[] DEFAULT '{}',
  observacoes              TEXT,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW(),
  created_by               UUID REFERENCES users(id),
  updated_by               UUID REFERENCES users(id)
);

CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE client_contacts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id  UUID NOT NULL REFERENCES clients(id),
  user_id    UUID REFERENCES users(id),
  nome       TEXT NOT NULL,
  cargo      TEXT,
  email      TEXT,
  telefone   TEXT,
  tipo       contact_type,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ GRUPO 3: FRANQUEADOS E CANDIDATOS ============

CREATE TABLE regions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome             TEXT NOT NULL,
  tipo             TEXT,
  estados          TEXT[] DEFAULT '{}',
  cidades_inclusas TEXT[] DEFAULT '{}',
  cidades_excluidas TEXT[] DEFAULT '{}',
  status           region_status DEFAULT 'available',
  franchisee_id    UUID REFERENCES users(id),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE candidates (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID REFERENCES users(id),
  full_name                TEXT NOT NULL,
  email                    TEXT NOT NULL,
  phone                    TEXT,
  cpf                      TEXT,
  cidade                   TEXT,
  estado                   TEXT,
  formacao                 TEXT,
  anos_experiencia         INTEGER,
  area_principal           setor_type,
  certificacoes            TEXT[] DEFAULT '{}',
  linkedin_url             TEXT,
  motivacao                TEXT,
  expectativa_receita_12m  TEXT,
  ja_e_pj                  BOOLEAN DEFAULT false,
  capacidade_aporte        TEXT,
  tem_reserva_6m           BOOLEAN,
  estagio                  candidate_stage DEFAULT 'received',
  aprovacao_at             TIMESTAMPTZ,
  rejeicao_motivo          TEXT,
  cof_recebida_at          TIMESTAMPTZ,
  pode_assinar_at          TIMESTAMPTZ GENERATED ALWAYS AS (cof_recebida_at + INTERVAL '10 days') STORED,
  franchisee_id            UUID REFERENCES users(id),
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE franchisees (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                UUID NOT NULL REFERENCES users(id),
  candidate_id           UUID REFERENCES candidates(id),
  nivel                  franchisee_level DEFAULT 'junior',
  data_certificacao      DATE,
  region_id              UUID REFERENCES regions(id),
  cidade_base            TEXT,
  status                 franchisee_status DEFAULT 'onboarding',
  razao_social           TEXT,
  cnpj                   TEXT UNIQUE,
  endereco_pj            JSONB DEFAULT '{}',
  data_contrato_inicio   DATE,
  data_contrato_renovacao DATE,
  taxa_inicial_valor     DECIMAL(10,2),
  taxa_inicial_paga      BOOLEAN DEFAULT false,
  taxa_inicial_paga_at   TIMESTAMPTZ,
  licenca_mensal_valor   DECIMAL(10,2),
  taxa_marketing_valor   DECIMAL(10,2),
  dia_vencimento         INTEGER CHECK (dia_vencimento BETWEEN 1 AND 28),
  asaas_customer_id      TEXT,
  mentor_id              UUID REFERENCES users(id),
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- ============ GRUPO 4: LEADS E CASOS ============

CREATE TABLE leads (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id                UUID REFERENCES clients(id),
  origem                   lead_origin,
  franchisee_id            UUID REFERENCES users(id),
  dor_inicial              TEXT,
  solucao_pre_imaginada    TEXT,
  produto_recomendado      produto_type,
  valor_estimado           DECIMAL(10,2),
  estagio                  lead_stage DEFAULT 'cold',
  data_proxima_acao        DATE,
  proxima_acao_descricao   TEXT,
  motivo_perda             TEXT,
  assigned_at              TIMESTAMPTZ,
  first_response_at        TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW(),
  created_by               UUID REFERENCES users(id),
  updated_by               UUID REFERENCES users(id)
);

-- Cálculo de dias no estágio via view
CREATE VIEW leads_with_days AS
SELECT *, EXTRACT(DAY FROM NOW() - updated_at)::INTEGER AS dias_no_estagio
FROM leads;

CREATE TABLE cases (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo                   TEXT UNIQUE NOT NULL,
  lead_id                  UUID REFERENCES leads(id),
  client_id                UUID REFERENCES clients(id),
  franchisee_id            UUID REFERENCES users(id),
  produto                  produto_type,
  valor_contrato           DECIMAL(10,2),
  data_inicio              DATE,
  data_prevista_fim        DATE,
  data_real_fim            DATE,
  prazo_dias               INTEGER,
  fase_atual               case_phase DEFAULT 'define',
  status                   case_status DEFAULT 'active',
  problema_inicial         TEXT,
  problema_reformulado     TEXT,
  causa_raiz_validada      TEXT,
  alternativa_recomendada  TEXT,
  envolve_software         BOOLEAN DEFAULT false,
  prototype_request_id     UUID, -- FK circular, será adicionada depois
  a3_pdf_url               TEXT,
  nps_score                INTEGER CHECK (nps_score BETWEEN 0 AND 10),
  nps_comentario           TEXT,
  nps_coletado_at          TIMESTAMPTZ,
  adicionado_biblioteca    BOOLEAN DEFAULT false,
  adicionado_biblioteca_at TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW(),
  created_by               UUID REFERENCES users(id),
  updated_by               UUID REFERENCES users(id)
);

-- Sequência para código do caso
CREATE SEQUENCE case_codigo_seq START 1;
CREATE OR REPLACE FUNCTION next_case_codigo()
RETURNS TEXT AS $$
BEGIN
  RETURN 'CASE-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(nextval('case_codigo_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE TABLE case_phases (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id             UUID NOT NULL REFERENCES cases(id),
  phase               case_phase NOT NULL,
  data_inicio         TIMESTAMPTZ,
  data_fim            TIMESTAMPTZ,
  prazo_dias          INTEGER,
  status              phase_status DEFAULT 'not_started',
  gate_aprovado       BOOLEAN DEFAULT false,
  gate_aprovado_por   UUID REFERENCES users(id),
  gate_aprovado_at    TIMESTAMPTZ,
  gate_comentarios    TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(case_id, phase)
);

CREATE TABLE case_artifacts (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id               UUID NOT NULL REFERENCES cases(id),
  template_id           template_type NOT NULL,
  versao                INTEGER DEFAULT 1,
  titulo                TEXT,
  conteudo              JSONB DEFAULT '{}',
  ai_suggested_at       TIMESTAMPTZ,
  ai_model_used         TEXT,
  status                artifact_status DEFAULT 'draft',
  reviewer_id           UUID REFERENCES users(id),
  reviewed_at           TIMESTAMPTZ,
  review_comments       TEXT,
  client_signed_off_at  TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  created_by            UUID REFERENCES users(id),
  updated_by            UUID REFERENCES users(id)
);

CREATE TABLE data_requests (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id          UUID NOT NULL REFERENCES cases(id),
  descricao        TEXT NOT NULL,
  formato_esperado TEXT,
  prazo            DATE,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','sent','received','confirmed')),
  files            JSONB[] DEFAULT '{}',
  enviado_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE meetings (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id              UUID REFERENCES cases(id),
  tipo                 meeting_type NOT NULL,
  data_hora            TIMESTAMPTZ NOT NULL,
  duracao_min          INTEGER DEFAULT 60,
  link_videoconferencia TEXT,
  calcom_event_id      TEXT,
  participantes        JSONB[] DEFAULT '{}',
  status               TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','no_show')),
  notas                TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE checkpoints_30_60_90 (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id              UUID NOT NULL REFERENCES cases(id),
  tipo                 TEXT NOT NULL CHECK (tipo IN ('30','60','90')),
  data_prevista        DATE,
  data_real            DATE,
  status               TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','missed')),
  progresso_relatado   TEXT,
  barreiras_relatadas  TEXT,
  oportunidade_extensao BOOLEAN DEFAULT false,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ============ GRUPO 5: FINANCEIRO ============

CREATE TABLE contracts (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo                   contract_type NOT NULL,
  case_id                UUID REFERENCES cases(id),
  franchisee_id          UUID REFERENCES users(id),
  client_id              UUID REFERENCES clients(id),
  numero                 TEXT UNIQUE NOT NULL,
  valor                  DECIMAL(10,2),
  forma_pagamento        payment_method,
  parcelas               INTEGER DEFAULT 1,
  data_inicio            DATE,
  data_fim               DATE,
  status                 contract_status DEFAULT 'draft',
  clicksign_document_id  TEXT,
  pdf_signed_url         TEXT,
  signed_at              TIMESTAMPTZ,
  template_id            UUID,
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW(),
  created_by             UUID REFERENCES users(id)
);

CREATE TABLE invoices (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero                TEXT UNIQUE NOT NULL,
  tipo                  invoice_type NOT NULL,
  contract_id           UUID REFERENCES contracts(id),
  case_id               UUID REFERENCES cases(id),
  payer_user_id         UUID REFERENCES users(id),
  payer_type            TEXT CHECK (payer_type IN ('client','franchisee')),
  receiver_type         TEXT CHECK (receiver_type IN ('axisus_hub','franchisee')),
  receiver_id           UUID,
  valor_bruto           DECIMAL(10,2) NOT NULL,
  desconto              DECIMAL(10,2) DEFAULT 0,
  valor_liquido         DECIMAL(10,2) NOT NULL,
  data_emissao          DATE DEFAULT CURRENT_DATE,
  data_vencimento       DATE NOT NULL,
  data_pagamento        DATE,
  status                invoice_status DEFAULT 'pending',
  asaas_charge_id       TEXT,
  asaas_invoice_id      TEXT,
  nf_url                TEXT,
  nf_numero             TEXT,
  forma_pagamento       payment_method,
  descricao_servico     TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id        UUID NOT NULL REFERENCES invoices(id),
  valor             DECIMAL(10,2) NOT NULL,
  data_pagamento    TIMESTAMPTZ NOT NULL,
  forma_pagamento   payment_method,
  asaas_payment_id  TEXT,
  status            TEXT DEFAULT 'received' CHECK (status IN ('received','pending_clearance','refunded','failed')),
  comprovante_url   TEXT,
  observacoes       TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  franchisee_id            UUID NOT NULL REFERENCES franchisees(id),
  tipo                     subscription_type NOT NULL,
  valor_mensal             DECIMAL(10,2) NOT NULL,
  dia_vencimento           INTEGER NOT NULL CHECK (dia_vencimento BETWEEN 1 AND 28),
  data_inicio              DATE NOT NULL,
  data_fim                 DATE,
  status                   subscription_status DEFAULT 'active',
  asaas_subscription_id    TEXT,
  forma_pagamento_default  payment_method,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ============ GRUPO 6: COMUNICAÇÃO E HUB ============

CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo            conversation_type NOT NULL,
  context_id      UUID,
  context_type    TEXT,
  participants    UUID[] NOT NULL DEFAULT '{}',
  last_message_at TIMESTAMPTZ,
  archived        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  sender_id       UUID NOT NULL REFERENCES users(id),
  content         TEXT,
  attachments     JSONB[] DEFAULT '{}',
  read_by         UUID[] DEFAULT '{}',
  sent_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at DESC);

CREATE TABLE prototyping_requests (
  id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id                     UUID REFERENCES cases(id),
  franchisee_id               UUID REFERENCES users(id),
  assigned_designer_id        UUID REFERENCES users(id),
  descricao_problema          TEXT,
  alternativa_recomendada     TEXT,
  fluxo_principal             TEXT,
  telas_chave                 TEXT,
  referencias                 JSONB[] DEFAULT '{}',
  prazo_solicitado            DATE,
  status                      proto_status DEFAULT 'new',
  figma_url                   TEXT,
  files_url                   JSONB[] DEFAULT '{}',
  valor_cobrado_franqueado    DECIMAL(10,2),
  delivered_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE qa_reviews (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id             UUID NOT NULL REFERENCES cases(id),
  reviewer_id         UUID REFERENCES users(id),
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_review','approved','approved_with_suggestions','needs_revision')),
  overall_score       INTEGER CHECK (overall_score BETWEEN 1 AND 5),
  comments_by_block   JSONB DEFAULT '{}',
  general_comments    TEXT,
  reviewed_at         TIMESTAMPTZ,
  resubmitted_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE library_cases (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  original_case_id      UUID REFERENCES cases(id),
  setor                 setor_type,
  tipo_problema         TEXT[] DEFAULT '{}',
  tipo_causa_raiz       TEXT[] DEFAULT '{}',
  tipo_solucao          TEXT[] DEFAULT '{}',
  resumo_anonimizado    TEXT,
  a3_anonimizado_url    TEXT,
  resultado_obtido      TEXT,
  roi_anonimizado       TEXT,
  licoes                TEXT,
  embedding             VECTOR(1536), -- OpenAI text-embedding-3-small
  adicionado_por        UUID REFERENCES users(id),
  aprovado_para_uso     BOOLEAN DEFAULT false,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_library_embedding ON library_cases USING ivfflat (embedding vector_cosine_ops);

CREATE TABLE ai_interactions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES users(id),
  case_id       UUID REFERENCES cases(id),
  ai_point      TEXT NOT NULL,
  model_used    TEXT DEFAULT 'claude-sonnet-4',
  prompt        TEXT,
  response      TEXT,
  tokens_input  INTEGER,
  tokens_output INTEGER,
  cost_brl      DECIMAL(10,4),
  feedback      TEXT CHECK (feedback IN ('accepted','edited','rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============ ROW LEVEL SECURITY (RLS) ============

-- Habilitar RLS em todas as tabelas sensíveis
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas de exemplo (expandir conforme necessidade)

-- Usuário vê apenas seus próprios dados
CREATE POLICY users_self_read ON users FOR SELECT
  USING (auth.uid() = auth_user_id);

-- Hub admin vê tudo
CREATE POLICY users_hub_all ON users FOR ALL
  USING (
    EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role IN ('hub_admin', 'hub_operator'))
  );

-- Cliente vê apenas seus casos
CREATE POLICY cases_client_read ON cases FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE franchisee_responsavel_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()
      )
    )
    OR franchisee_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role IN ('hub_admin','hub_operator'))
  );

-- ============ ÍNDICES ADICIONAIS ============

CREATE INDEX idx_cases_franchisee ON cases(franchisee_id);
CREATE INDEX idx_cases_client ON cases(client_id);
CREATE INDEX idx_cases_status ON cases(status, fase_atual);
CREATE INDEX idx_leads_franchisee ON leads(franchisee_id, estagio);
CREATE INDEX idx_invoices_status ON invoices(status, data_vencimento);
CREATE INDEX idx_candidates_estagio ON candidates(estagio);

-- ============ FIM DO SCHEMA ============
