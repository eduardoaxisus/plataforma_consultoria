// AXISUS - Landing Page & Login Views

function renderLanding() {
  return `
    <div style="background:white;min-height:100vh;">
      <!-- NAV -->
      <nav class="landing-nav">
        <h1>AXISUS</h1>
        <div class="flex items-center gap-3">
          <a href="#metodo" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">Método</a>
          <a href="#produtos" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">Produtos</a>
          <a href="#franquia" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">Seja Franqueado</a>
          <button class="btn btn-secondary btn-sm" onclick="navigate('login')">Acessar Plataforma</button>
        </div>
      </nav>

      <!-- HERO -->
      <section class="hero">
        <div style="display:inline-block;background:rgba(255,255,255,0.1);border-radius:20px;padding:6px 16px;font-size:12px;font-weight:600;letter-spacing:1px;margin-bottom:24px;text-transform:uppercase;">
          Sistema Operacional de Diagnóstico Empresarial
        </div>
        <h2>Traga o problema.<br>Entregamos a solução pronta.</h2>
        <p>A AXISUS transforma desafios complexos em soluções estruturadas com o Método 5D — diagnóstico preciso, causa raiz validada, implementação real.</p>
        <div class="flex gap-3" style="justify-content:center;">
          <button class="btn btn-lg" style="background:white;color:var(--primary);font-weight:700;" onclick="showContactModal()">
            Quero conhecer a AXISUS ${icon('arrow_right',18)}
          </button>
          <button class="btn btn-lg" style="background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.3);" onclick="navigate('login')">
            Acessar Plataforma
          </button>
        </div>

        <!-- Setores -->
        <div style="margin-top:60px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
          ${['Indústria','Logística','Varejo','Saúde','Agro','Construção','Serviços'].map(s => `
            <span style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;">${s}</span>
          `).join('')}
        </div>
      </section>

      <!-- MÉTODO 5D -->
      <section class="section section-center" id="metodo" style="background:var(--surface-2);">
        <h2>O Método 5D AXISUS</h2>
        <p class="lead">Cinco fases estruturadas que transformam qualquer problema empresarial em solução prática e implementável.</p>
        <div class="method-cards">
          ${[
            { n:'D1', name:'Define',    desc:'Definição precisa do problema, mapa de stakeholders e contrato de escopo.' },
            { n:'D2', name:'Diagnose',  desc:'Análise de causa raiz com Ishikawa e 5 Porquês, validada com dados reais.' },
            { n:'D3', name:'Design',    desc:'Geração e avaliação de múltiplas alternativas de solução.' },
            { n:'D4', name:'Decide',    desc:'Seleção da melhor alternativa com WSJF e plano de implementação 5W2H.' },
            { n:'D5', name:'Deliver',   desc:'Entrega do A3 Expandido + apresentação executiva + acompanhamento 30/60/90.' },
          ].map(d => `
            <div class="method-card">
              <div class="method-num">${d.n}</div>
              <div class="method-name">${d.name}</div>
              <div class="method-desc">${d.desc}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- PRODUTOS -->
      <section class="section section-center" id="produtos">
        <h2>Produtos AXISUS</h2>
        <p class="lead">Três formatos adaptados à complexidade e ao momento da sua operação.</p>
        <div class="products-grid">
          ${[
            { icon:'📋', name:'Plataforma',                price:'A partir de R$ 30k',  desc:'Diagnóstico remoto completo. Franqueado conduz todas as fases online, com entregável A3 Expandido e 3 check-ins.', featured:false },
            { icon:'💻', name:'Plataforma + Online',       price:'A partir de R$ 45k',  desc:'Diagnóstico remoto com videoconferências estruturadas. Workshops Ishikawa ao vivo e apresentação executiva.', featured:true  },
            { icon:'🏭', name:'Plataforma + Visitas',      price:'A partir de R$ 72k',  desc:'Diagnóstico presencial com visitas técnicas. Ideal para problemas operacionais complexos.', featured:false },
          ].map(p => `
            <div class="product-card ${p.featured ? 'featured' : ''}">
              ${p.featured ? '<div class="badge badge-primary" style="margin-bottom:12px;">Mais escolhido</div>' : ''}
              <div class="product-icon">
                <span style="font-size:28px;">${p.icon}</span>
              </div>
              <div style="font-size:18px;font-weight:800;margin-bottom:8px;">${p.name}</div>
              <div style="font-size:22px;font-weight:900;color:var(--primary);margin-bottom:12px;">${p.price}</div>
              <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px;">${p.desc}</p>
              <button class="btn ${p.featured ? 'btn-primary' : 'btn-secondary'} w-full" onclick="showContactModal()">
                Solicitar Diagnóstico
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- FRANQUIA -->
      <section class="section" id="franquia" style="background:var(--primary);color:white;">
        <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
          <div>
            <div style="font-size:11px;font-weight:700;letter-spacing:2px;opacity:0.6;text-transform:uppercase;margin-bottom:12px;">Seja Franqueado</div>
            <h2 style="color:white;font-size:36px;font-weight:900;margin-bottom:16px;">Construa seu negócio com o método AXISUS.</h2>
            <p style="opacity:0.8;font-size:16px;margin-bottom:32px;">Para Black Belts, engenheiros e gestores com experiência em manufatura, logística e operações. Sem royalty sobre faturamento.</p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">
              ${['Sem royalty sobre faturamento','Território exclusivo','Biblioteca de casos + IA Copiloto','Suporte do Hub Central','Taxa inicial a partir de R$ 40k'].map(item => `
                <div style="display:flex;align-items:center;gap:10px;font-size:14px;">
                  <div style="width:20px;height:20px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon('check',11)}</div>
                  ${item}
                </div>
              `).join('')}
            </div>
            <button class="btn btn-lg" style="background:white;color:var(--primary);font-weight:700;" onclick="navigate('login');AXISUS.state.loginMode='candidate';">
              Quero Ser Franqueado ${icon('arrow_right',18)}
            </button>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px;">
              <div style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.6;margin-bottom:20px;">Números da Rede</div>
              ${[
                { v:'18',  l:'Franqueados ativos' },
                { v:'34',  l:'Casos em andamento' },
                { v:'9.1', l:'NPS médio da rede' },
                { v:'R$ 0', l:'Royalty sobre faturamento' },
              ].map(s => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span style="opacity:0.7;font-size:14px;">${s.l}</span>
                  <span style="font-size:22px;font-weight:900;">${s.v}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="section section-center">
        <h2>Pronto para resolver o problema?</h2>
        <p class="lead">Preencha o formulário e um especialista AXISUS entrará em contato em até 24h.</p>
        <div style="max-width:480px;margin:0 auto;">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <input class="form-input" type="text" placeholder="Nome completo">
            <input class="form-input" type="email" placeholder="E-mail corporativo">
            <input class="form-input" type="text" placeholder="Empresa">
            <select class="form-select">
              <option value="">Setor da empresa...</option>
              <option>Indústria</option><option>Logística</option><option>Varejo</option>
              <option>Saúde</option><option>Construção</option><option>Outros</option>
            </select>
            <textarea class="form-textarea" placeholder="Descreva brevemente o problema ou desafio..." style="min-height:80px;"></textarea>
            <button class="btn btn-primary btn-lg" style="width:100%;" onclick="showToast('Mensagem enviada! Retornaremos em até 24h.')">
              Enviar e Aguardar Contato ${icon('arrow_right',18)}
            </button>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <div class="footer">
        <div style="font-size:20px;font-weight:800;color:rgba(255,255,255,0.8);margin-bottom:8px;">AXISUS</div>
        <div>Sistema Operacional Integrado de Diagnóstico Empresarial</div>
        <div style="margin-top:8px;font-size:12px;">© 2026 AXISUS · Todos os direitos reservados</div>
      </div>
    </div>
  `;
}

function bindLandingEvents() {}

function showContactModal() {
  showModal(`
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Fale com a AXISUS</div>
        <button class="btn btn-ghost btn-icon" onclick="closeModal()">${icon('x',18)}</button>
      </div>
      <div class="modal-body">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group"><label class="form-label">Nome completo</label><input class="form-input" placeholder="Seu nome"></div>
          <div class="form-group"><label class="form-label">E-mail</label><input class="form-input" type="email" placeholder="email@empresa.com"></div>
          <div class="form-group"><label class="form-label">Empresa</label><input class="form-input" placeholder="Razão social"></div>
          <div class="form-group"><label class="form-label">Setor</label>
            <select class="form-select"><option>Selecione...</option><option>Indústria</option><option>Logística</option><option>Varejo</option><option>Saúde</option></select>
          </div>
          <div class="form-group"><label class="form-label">Problema / Desafio</label><textarea class="form-textarea" placeholder="Descreva o desafio..."></textarea></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal();showToast('Contato enviado! Retornaremos em até 24h.')">Enviar</button>
      </div>
    </div>
  `);
}

// ============ LOGIN ============
function renderLogin() {
  return `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">
          <h1>AXISUS</h1>
          <p>Sistema Operacional Integrado</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input class="form-input" type="email" id="login-email" placeholder="seu@email.com" value="carlos@distribuidorasul.com.br">
          </div>
          <div class="form-group">
            <label class="form-label">Senha</label>
            <input class="form-input" type="password" id="login-password" placeholder="••••••••" value="••••••••">
          </div>
        </div>

        <button class="btn btn-primary btn-lg w-full" onclick="doLogin()" style="margin-bottom:12px;">
          Entrar ${icon('arrow_right', 16)}
        </button>

        <div style="text-align:center;margin-bottom:16px;">
          <button class="btn btn-ghost btn-sm" onclick="showToast('Magic link enviado para seu e-mail!','info')">
            Entrar sem senha (magic link)
          </button>
        </div>

        <div style="border-top:1px solid var(--border);padding-top:16px;">
          <div class="text-xs text-muted text-center mb-3">Acessar como (demo)</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button class="btn btn-secondary btn-sm" onclick="loginAs('client')">Cliente</button>
            <button class="btn btn-secondary btn-sm" onclick="loginAs('franchisee')">Franqueado</button>
            <button class="btn btn-secondary btn-sm" onclick="loginAs('candidate')">Candidato</button>
            <button class="btn btn-secondary btn-sm" onclick="loginAs('hub')">Hub Central</button>
          </div>
        </div>

        <div style="text-align:center;margin-top:16px;">
          <a href="#" style="font-size:12px;color:var(--text-muted);">Esqueci minha senha</a>
        </div>
      </div>
    </div>
  `;
}

function bindLoginEvents() {
  document.getElementById('login-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
}

function doLogin() {
  const email = document.getElementById('login-email')?.value || '';

  if (email.includes('distribuidorasul')) {
    loginAs('client');
  } else if (email.includes('axisus') && email.includes('ana')) {
    loginAs('franchisee');
  } else if (email.includes('hub') || email.includes('mariana')) {
    loginAs('hub');
  } else {
    loginAs('client');
  }
}

function loginAs(role) {
  AXISUS.state.currentUser = AXISUS.users[role];
  const destinations = {
    client:     'client_dashboard',
    franchisee: 'franchisee_dashboard',
    candidate:  'candidate_dashboard',
    hub:        'hub_dashboard',
  };
  navigate(destinations[role] || 'client_dashboard');
}
