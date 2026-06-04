# AXISUS Platform

**Sistema Operacional Integrado da AXISUS**  
Clientes, Franqueados e Hub Central em uma única plataforma.

---

## Como Abrir

1. Abra a pasta `axisus-platform/`
2. Dê dois cliques em **`index.html`**
3. A plataforma abre no navegador, sem instalação

> Funciona diretamente no navegador (Chrome, Edge, Firefox). Não precisa de servidor.

---

## Demonstração Rápida

Na tela de login, use os botões de demonstração:

| Botão | Acessa |
|---|---|
| **Cliente** | Portal do cliente Carlos Mendes (Distribuidora Sul) |
| **Franqueado** | Portal da Ana Paula Rodrigues (Nível Pleno · SP) |
| **Candidato** | Processo seletivo do Roberto Silva |
| **Hub Central** | Dashboard executivo da AXISUS |

---

## Telas Implementadas

### Portal do Cliente
- `C1` Login / Magic Link
- `C2` Dashboard com progresso do caso e stepper 5D
- `C3` Detalhes do caso (6 abas: Andamento, Documentos, Dados, Reuniões, Mensagens, Financeiro)
- `C4` Upload de dados solicitados
- `C5` Chat com especialista (realtime)
- `C6` Visualização de documentos
- `C7` NPS + agendamento de check-ins

### Portal do Franqueado
- `F1` Landing page pública de franquia
- `F3` Dashboard do candidato (linha do tempo do processo seletivo)
- `F10` Dashboard operacional com KPIs, alertas da IA, pipeline kanban
- `F11` Pipeline comercial (kanban com 6 estágios)
- `F12` Detalhe de lead
- `F13` Caso em andamento com 9 templates do Método 5D
- `F14–F22` Templates individuais (com IA Copiloto)
- `F23` Solicitação de protótipo de software
- `F24` Financeiro pessoal (receitas, despesas, margem, projeção)

### Hub Central
- `H1` Dashboard executivo (KPIs, funnels, alertas, atividade)
- `H2` Gestão de franqueados (tabela filtrável, modal de perfil)
- `H3` Funil de candidatos (kanban)
- `H4` Gestão de leads da rede
- `H5` Fila de revisão QA dos A3s
- `H6` Fila de prototipagem
- `H7` Biblioteca de casos + busca semântica
- `H8` Gestão financeira consolidada

---

## Stack para Produção

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 + Tailwind CSS (Lovable) |
| Backend / DB | Supabase (PostgreSQL + RLS + Auth) |
| IA Copiloto | Anthropic Claude Sonnet 4 |
| Embeddings (RAG) | pgvector + OpenAI text-embedding-3-small |
| Assinatura Digital | ClickSign API |
| Pagamento + NF | Asaas API |
| E-mail Transacional | Resend |
| Agendamento | Cal.com (embedded) |
| Armazenamento | Supabase Storage |

---

## Banco de Dados

O arquivo `pages/schema.sql` contém o schema PostgreSQL completo com:
- **25 tabelas** (users, clients, franchisees, candidates, regions, leads, cases, case_phases, case_artifacts, data_requests, meetings, checkpoints_30_60_90, contracts, invoices, payments, subscriptions, conversations, messages, prototyping_requests, qa_reviews, library_cases, ai_interactions, audit_log, e tabelas de config)
- **Enums** para todos os status e tipos
- **RLS** (Row Level Security) por papel de usuário
- **Índices** otimizados para as queries mais comuns
- **pgvector** para busca semântica na biblioteca de casos

---

## Próximos Passos

1. **Deploy no Lovable** — cole cada seção do schema e as telas como prompts
2. **Criar projeto Supabase** — execute o `schema.sql` na interface do Supabase
3. **Configurar variáveis de ambiente** (Supabase URL/Key, Anthropic API Key, Asaas Key, ClickSign Key, Resend Key)
4. **Conectar integrações** (webhook Asaas para pagamentos, webhook ClickSign para assinaturas)
5. **Configurar RLS** — expandir as políticas de segurança conforme a necessidade

---

## Arquitetura de Papéis

```
client          → Vê apenas seus próprios casos
franchisee      → Vê seus leads, casos, financeiro pessoal
candidate       → Vê apenas sua própria candidatura
hub_admin       → Acesso total: config, financeiro, aprovações
hub_operator    → Operacional: leads, revisões, suporte
hub_reviewer    → Apenas fila de QA
hub_designer    → Apenas fila de prototipagem
```

---

*Versão 1.0 · AXISUS 2026*
