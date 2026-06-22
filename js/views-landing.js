// AXISUS - Landing Page & Login Views

function renderLanding() {
  return `
    <div style="background:white;min-height:100vh;">
      <!-- NAV -->
      <nav class="landing-nav">
        <div style="display:flex;align-items:center;gap:10px;">
          <h1 style="letter-spacing:-0.5px;">AXISUS</h1>
          <span style="font-size:11px;font-weight:600;color:var(--accent);letter-spacing:1.5px;text-transform:uppercase;padding:2px 8px;border:1px solid rgba(0,212,255,0.4);border-radius:20px;">AI-First Studio</span>
        </div>
        <div class="flex items-center gap-3">
          <a href="#metodo" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">Método 5D</a>
          <a href="#produtos" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">AI Sprint</a>
          <a href="#squad" style="color:rgba(255,255,255,0.7);font-size:14px;text-decoration:none;">Seja do Squad</a>
          <button class="btn btn-secondary btn-sm" onclick="navigate('login')">Acessar Plataforma</button>
        </div>
      </nav>

      <!-- HERO -->
      <section class="hero">
        <div style="display:inline-block;background:rgba(0,212,255,0.12);border:1px solid rgba(0,212,255,0.35);border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;margin-bottom:28px;text-transform:uppercase;color:#00D4FF;">
          AI-First Studio · Método 5D · 5 dias úteis
        </div>
        <h2>Inteligência Aplicada.<br><span style="color:#00D4FF;">Com método.</span></h2>
        <p style="font-size:18px;max-width:620px;">Somos AI-First com método. Traga o problema — entregamos protótipo funcional de IA em uma semana, com causa raiz validada e ROI comprovado.</p>
        <div style="font-size:13px;letter-spacing:2px;font-weight:600;opacity:0.5;margin:-16px 0 32px;text-transform:uppercase;">Intelligence. Automated. Impact. Amplified.</div>
        <div class="flex gap-3" style="justify-content:center;">
          <button class="btn btn-lg" style="background:#00D4FF;color:#0A192F;font-weight:700;" onclick="showContactModal()">
            Quero um AI Sprint ${icon('arrow_right',18)}
          </button>
          <button class="btn btn-lg" style="background:rgba(255,255,255,0.08);color:white;border:1px solid rgba(255,255,255,0.2);" onclick="navigate('login')">
            Acessar Plataforma
          </button>
        </div>

        <!-- Setores -->
        <div style="margin-top:60px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
          ${['E-commerce','Fintech','Saúde Digital','Logística','Educação','Construção','RH Tech'].map(s => `
            <span style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);">${s}</span>
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
        <h2>AI Sprint AXISUS</h2>
        <p class="lead">Três pacotes adaptados ao momento da sua empresa. Todos entregam protótipo funcional ao final.</p>
        <div class="products-grid">
          ${[
            { icon:'🚀', name:'Essencial',              price:'A partir de R$ 24k',  desc:'Sprint de 2 semanas: diagnóstico + causa raiz + protótipo em GitHub. Ideal para startups e PMEs que precisam validar rápido.', featured:false },
            { icon:'💻', name:'Pleno',                  price:'A partir de R$ 48k',  desc:'Sprint completo com protótipo funcional em SaaS dedicado (Supabase) + acompanhamento 30/60/90 dias de adoção.', featured:true  },
            { icon:'⭐', name:'Premium',                price:'A partir de R$ 96k',  desc:'AI Sprint + squad dedicado por 60 dias + integração com sistemas existentes + treinamento da equipe do cliente.', featured:false },
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
                Solicitar AI Sprint
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SQUAD -->
      <section class="section" id="squad" style="background:var(--primary);color:white;">
        <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
          <div>
            <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#00D4FF;text-transform:uppercase;margin-bottom:12px;">Junte-se ao Squad AXISUS</div>
            <h2 style="color:white;font-size:36px;font-weight:900;margin-bottom:16px;line-height:1.1;">Aplique o Método 5D em sprints de IA.</h2>
            <p style="opacity:0.75;font-size:15px;margin-bottom:28px;">Para profissionais de negócio e tecnologia que querem trabalhar com diagnóstico real + IA. Sem hype — com método. 1 sprint/semana, squad fixo de 4 pessoas.</p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">
              ${[
                'Método 5D — diagnóstico real, não templates vazios',
                'Em 30% dos sprints, recomendamos não-IA — e o cliente confia mais por isso',
                'IA Copiloto em todos os 9 templates',
                'Cliente recebe o código via GitHub — sem amarras',
                'Comissão progressiva por performance'
              ].map(item => `
                <div style="display:flex;align-items:center;gap:10px;font-size:14px;">
                  <div style="width:20px;height:20px;border-radius:50%;background:#00D4FF;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon('check',11)}</div>
                  ${item}
                </div>
              `).join('')}
            </div>
            <button class="btn btn-lg" style="background:#00D4FF;color:#0A192F;font-weight:700;" onclick="navigate('login');AXISUS.state.loginMode='candidate';">
              Quero Entrar no Squad ${icon('arrow_right',18)}
            </button>
          </div>
          <div>
            <div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:16px;padding:28px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00D4FF;margin-bottom:20px;">Números do Estúdio</div>
              ${[
                { v:'4',   l:'Membros do Squad' },
                { v:'7',   l:'Casos em andamento' },
                { v:'9.4', l:'NPS médio dos clientes' },
                { v:'1sem',l:'Duração do AI Sprint (mínimo)' },
              ].map(s => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="opacity:0.6;font-size:14px;">${s.l}</span>
                  <span style="font-size:22px;font-weight:900;color:#00D4FF;">${s.v}</span>
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
        <div style="font-size:20px;font-weight:800;color:rgba(255,255,255,0.8);margin-bottom:4px;">AXISUS</div>
        <div style="font-size:12px;letter-spacing:2px;color:#00D4FF;font-weight:600;text-transform:uppercase;margin-bottom:8px;">AI-First Studio</div>
        <div>Intelligence. Automated. Impact. Amplified.</div>
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
          <p style="color:var(--accent);font-weight:600;letter-spacing:1px;text-transform:uppercase;font-size:11px;">AI-First Studio</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input class="form-input" type="email" id="login-email" placeholder="seu@email.com" value="renato@petshopbeta.com.br">
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
            <button class="btn btn-secondary btn-sm" onclick="loginAs('franchisee')">Squad AXISUS</button>
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

  if (email.includes('petshop') || email.includes('distribuidorasul')) {
    loginAs('client');
  } else if (email.includes('axisus') && email.includes('eduardo')) {
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
