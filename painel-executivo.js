const app = document.getElementById('app');
const menuVersion = document.getElementById('menuVersion');
const jsonVersion = document.getElementById('jsonVersion');
const jsonUpdate = document.getElementById('jsonUpdate');

function txt(v){ return v === undefined || v === null ? '' : String(v); }
function esc(v){ return txt(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pessoa(v){ return esc(v).replace(/\bDaiana\b/g,'Daiane Ribeiro').replace(/\bDaiane\b(?!\s+Ribeiro)/g,'Daiane Ribeiro'); }
function done(x){ return /concluído|concluido|finalizado|finalizada/i.test(txt(x.status)); }
function badge(v){ return v ? '<span class="badge">' + esc(v) + '</span>' : ''; }

function aplicarExtras(base, extra){
  extra = extra || {};
  base.projetos = base.projetos || [];
  base.tarefasConcluidas = base.tarefasConcluidas || [];
  base.pendencias = base.pendencias || [];
  base.proximasEntregas = base.proximasEntregas || {};
  base.proximasEntregas.proximos15Dias = base.proximasEntregas.proximos15Dias || [];
  base.proximasEntregas.emAndamento = base.proximasEntregas.emAndamento || [];
  base.proximasEntregas.concluidosRecentemente = base.proximasEntregas.concluidosRecentemente || [];

  (extra.ajustesProjetos || []).forEach(a => {
    const p = base.projetos.find(x => x.nome === a.nomeOriginal || x.nome === a.nome);
    if (!p) return;
    if (a.nome) p.nome = a.nome;
    if (a.objetivo) p.objetivo = a.objetivo;
    if (a.ultimaAtualizacao) p.ultimaAtualizacao = a.ultimaAtualizacao;
    if (a.area) p.area = a.area;
    p.atividades = p.atividades || [];
    (a.atividadesRemover || []).forEach(r => { p.atividades = p.atividades.filter(x => x !== r); });
    (a.atividadesAdicionar || []).forEach(x => { if (!p.atividades.includes(x)) p.atividades.push(x); });
  });

  (extra.projetos || []).forEach(p => { if (!base.projetos.some(x => x.nome === p.nome)) base.projetos.push(p); });
  (extra.tarefasConcluidas || []).forEach(t => { if (!base.tarefasConcluidas.some(x => x.projeto === t.projeto && x.data === t.data && x.tarefa === t.tarefa)) base.tarefasConcluidas.push(t); });
  (extra.pendencias || []).forEach(p => { if (!base.pendencias.some(x => x.projeto === p.projeto && x.pendencia === p.pendencia)) base.pendencias.push(p); });
  (extra.concluidosRecentemente || []).forEach(e => { if (!base.proximasEntregas.concluidosRecentemente.some(x => x.projeto === e.projeto && x.data === e.data && x.entrega === e.entrega)) base.proximasEntregas.concluidosRecentemente.unshift(e); });

  if (extra.versaoExtra) base.versao = extra.versaoExtra;
  if (extra.ultimaAtualizacaoExtra) base.ultimaAtualizacao = extra.ultimaAtualizacaoExtra;
  if (extra.observacaoExtra) base.observacao = extra.observacaoExtra;
  return base;
}

function lista(arr){
  if (!arr || !arr.length) return '<p class="empty">Sem registros.</p>';
  return '<ul>' + arr.map(x => '<li>' + pessoa(x) + '</li>').join('') + '</ul>';
}

function cardProjeto(p){
  return '<article class="card"><h3>' + esc(p.nome) + '</h3>' +
    '<div class="meta">Responsável: ' + pessoa(p.responsavel) + '<br>Início: ' + esc(p.inicio || 'A definir') + ' | Previsão: ' + esc(p.previsaoConclusao || 'A definir') + '</div>' +
    '<p>' + esc(p.objetivo || '') + '</p>' +
    badge(p.status) + badge(p.prioridade) + badge(p.progresso ? 'Progresso: ' + p.progresso : '') +
    '<details><summary>Ver detalhes</summary>' + lista(p.atividades) + '</details></article>';
}

function render(data){
  const projetos = data.projetos || [];
  const ativos = projetos.filter(p => !done(p));
  const tarefas = data.tarefasConcluidas || [];
  const pendencias = data.pendencias || [];
  const entregas = data.proximasEntregas || {};
  const recentes = entregas.concluidosRecentemente || [];
  const areas = [...new Set(projetos.map(p => p.area || 'OUTROS'))];

  menuVersion.textContent = 'Painel COI v' + (data.versao || '');
  jsonVersion.textContent = 'Base JSON: v' + (data.versao || '');
  jsonUpdate.textContent = 'Atualização: ' + (data.ultimaAtualizacao || '');

  let html = '';
  html += '<div class="note"><b>Painel carregado.</b><br><b>Última atualização:</b> ' + esc(data.ultimaAtualizacao || '') + '<br><b>Gerente MDS:</b> Daiane Ribeiro<br>' + esc(data.observacao || '') + '</div>';
  html += '<section id="dashboard" class="section"><h2>Dashboard Executivo</h2><div class="metrics">' +
    '<div class="metric"><span>Projetos ativos</span><strong>' + ativos.length + '</strong></div>' +
    '<div class="metric"><span>Total de projetos</span><strong>' + projetos.length + '</strong></div>' +
    '<div class="metric"><span>Tarefas concluídas</span><strong>' + tarefas.length + '</strong></div>' +
    '<div class="metric"><span>Pendências</span><strong>' + pendencias.length + '</strong></div>' +
    '<div class="metric"><span>Concluídos recentes</span><strong>' + recentes.length + '</strong></div>' +
    '<div class="metric"><span>Frentes</span><strong>' + areas.length + '</strong></div>' +
    '</div></section>';

  html += '<section id="projetos" class="section"><h2>Projetos por Frente</h2>';
  areas.forEach(area => {
    const ps = projetos.filter(p => (p.area || 'OUTROS') === area && !done(p));
    if (!ps.length) return;
    html += '<div class="area-panel"><div class="area-head"><h3>📁 ' + esc(area) + '</h3><span class="area-count">' + ps.length + ' projeto(s)</span></div><div class="project-grid">' + ps.map(cardProjeto).join('') + '</div></div>';
  });
  html += '</section>';

  html += '<section id="tarefas" class="section"><h2>Tarefas Concluídas</h2><div class="task-grid">' + tarefas.slice(-12).reverse().map(t => '<article class="task-card"><h3>' + esc(t.tarefa) + '</h3><div class="meta">Projeto: ' + esc(t.projeto) + '<br>Data: ' + esc(t.data) + '<br>Responsável: ' + pessoa(t.responsavel) + '</div>' + badge(t.status) + '</article>').join('') + '</div></section>';

  html += '<section id="pendencias" class="section"><h2>Pendências Executivas</h2><div class="tablewrap"><table><thead><tr><th>Prazo</th><th>Pendência</th><th>Projeto</th><th>Responsável</th><th>Status</th></tr></thead><tbody>' + pendencias.map(p => '<tr><td>' + esc(p.prazo) + '</td><td>' + esc(p.pendencia) + '</td><td>' + esc(p.projeto) + '</td><td>' + pessoa(p.responsavel) + '</td><td>' + badge(p.status) + '</td></tr>').join('') + '</tbody></table></div></section>';

  app.className = '';
  app.innerHTML = html;
}

async function iniciar(){
  try {
    app.innerHTML = 'Carregando dados...';
    const base = await fetch('dados_painel_aura.json?cache=' + Date.now()).then(r => { if (!r.ok) throw new Error('Falha no dados_painel_aura.json'); return r.json(); });
    let extra = {};
    try { extra = await fetch('projetos_extra.json?cache=' + Date.now()).then(r => r.ok ? r.json() : {}); } catch(e) { extra = {}; }
    render(aplicarExtras(base, extra));
  } catch (err) {
    app.className = 'note';
    app.innerHTML = '<b>Erro ao carregar o painel.</b><br>' + esc(err.message || err);
  }
}

iniciar();
