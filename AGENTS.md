# AGENTS.md - Regras Operacionais do Painel Executivo COI

Este arquivo deve ser lido antes de qualquer alteração no repositório.

## 1. Objetivo do Projeto

O Painel Executivo COI centraliza o acompanhamento executivo de projetos, entregas, demandas concluídas, incidentes operacionais, pendências e atividades mensais do COI.

O painel deve manter uma visão consistente, verificável e atualizada das iniciativas acompanhadas, sem divergências entre os registros detalhados e os indicadores exibidos.

## 2. Estrutura dos Arquivos Principais

- `index.html`: página principal publicada. Carrega o JSON, calcula indicadores e renderiza o painel.
- `dados_painel_aura.json`: fonte oficial dos dados apresentados pelo painel.
- `README.md`: documentação resumida da versão atual e dos arquivos principais.
- `painel-v3-6.html`: página antiga mantida somente como histórico. Não é a fonte oficial.
- `acompanhamento-mensal-v1.html`: página antiga mantida somente como histórico. Não é a fonte oficial.

Não excluir arquivos históricos sem aprovação explícita.

## 3. Frentes Oficiais

Todo projeto ativo deve pertencer a uma das seguintes frentes:

- `CENTRAL DF`
- `CENTRAL DE ATENDIMENTO`
- `MDS`

Ao incluir uma nova frente, atualizar os agrupamentos e validar o comportamento dos filtros em `index.html`.

## 4. Regras para Atualização de Projetos

- Registrar projetos na lista `projetos` de `dados_painel_aura.json`.
- Preencher `nome`, `area`, `responsavel`, `status`, `prioridade`, `competencia`, `objetivo` e `atividades`.
- Usar uma frente oficial no campo `area`.
- Atualizar `ultimaAtualizacao` somente com a data real da alteração.
- Usar `previsaoConclusao` com uma data válida ou `A definir`.
- Manter os nomes dos projetos consistentes em todas as listas relacionadas.
- Registrar atividades concluídas e pendentes com texto claro e status coerente.

## 5. Regras para Inclusão de Novas Demandas

- Registrar demandas concluídas na lista `demandasConcluidas`.
- Preencher `titulo`, `projeto`, `categoria`, `responsavel`, `periodo`, `status` e `resultado`.
- Incluir somente demandas efetivamente concluídas nessa lista.
- Usar `status: "Concluído"` somente quando houver confirmação da conclusão.

## 6. Regras para Inclusão de Incidentes

- Registrar incidentes na lista `incidentes`.
- Preencher `titulo`, `sistema`, `responsavel`, `abertura`, `prioridade`, `status` e `resultado` ou `causa`.
- Informar `encerramento` somente quando o incidente estiver concluído.
- Manter incidentes não resolvidos com status diferente de `Concluído`.
- Revisar cuidadosamente informações sensíveis antes da publicação.

## 7. Regras para Atualização de Prazos

- Registrar prazos executivos nas listas `proximasEntregas`, `prazos` e `pendencias`, quando aplicável.
- Repetir a mesma data em todas as estruturas relacionadas à mesma entrega.
- Atualizar também o projeto correspondente quando a previsão estiver descrita em `previsaoConclusao` ou `atividades`.
- Usar o formato `DD/MM/AAAA`.
- Usar `A definir` quando ainda não houver data confirmada.
- Pesquisar o texto da entrega no repositório antes de concluir a alteração para evitar prazos divergentes.

## 8. Regras de Datas Futuras

- Não registrar uma atividade, demanda, entrega ou incidente como `Concluído` quando a data for posterior à data real da atualização.
- Para eventos futuros, usar `Pendente`, `Programado`, `Em andamento` ou outro status compatível.
- Não preencher `ultimaAtualizacao` com data futura.
- Antes de qualquer commit, pesquisar datas futuras e revisar todos os itens com status `Concluído`.

## 9. Regras para Atualização do Dashboard

- Não adicionar totais manuais quando o indicador puder ser calculado a partir das listas.
- Preservar o cálculo automático implementado em `index.html`.
- Manter `atividadesConcluidasMes` manual somente enquanto não existir uma lista estruturada específica para esse indicador.
- Ao adicionar novos indicadores, preferir dados derivados da fonte oficial.
- Confirmar visualmente os totais renderizados após qualquer alteração no JSON.

## 10. Processo Obrigatório

Toda alteração deve seguir este fluxo:

1. Criar uma branch específica. Não alterar `main` diretamente.
2. Editar somente os arquivos necessários.
3. Validar a sintaxe de `dados_painel_aura.json`.
4. Abrir e testar `index.html` localmente.
5. Confirmar que o console do navegador não apresenta erros.
6. Apresentar o diff dos arquivos alterados.
7. Criar commit com mensagem objetiva.
8. Publicar a branch.
9. Criar Pull Request para `main`.
10. Aguardar aprovação explícita antes do merge.

Não habilitar merge automático.

## 11. Regras para Cálculo Automático dos Indicadores

O dashboard deve calcular automaticamente:

- `projetosAtivos`: quantidade de itens em `projetos`.
- `tarefasConcluidas`: quantidade de itens em `tarefasConcluidas`.
- `demandasConcluidas`: quantidade de itens em `demandasConcluidas`.
- `incidentesResolvidos`: quantidade de incidentes com status `Concluído`.
- `incidentesAbertos`: quantidade de incidentes com status diferente de `Concluído`.
- `pendenciasExecutivas`: quantidade de itens em `pendencias`.
- `entregasProximas`: soma dos itens de `proximasEntregas.proximos15Dias`, `proximasEntregas.emAndamento` e `proximasEntregas.concluidosRecentemente`.

Não duplicar esses totais manualmente em `dados_painel_aura.json`.

## 12. Checklist Obrigatório Antes de Qualquer Commit

- [ ] A alteração foi feita em uma branch, sem editar `main` diretamente.
- [ ] `dados_painel_aura.json` possui sintaxe JSON válida.
- [ ] Não existem datas futuras marcadas como `Concluído`.
- [ ] Não existem campos `ultimaAtualizacao` com data futura.
- [ ] Prazos repetidos estão consistentes em todas as estruturas relacionadas.
- [ ] Os indicadores são calculados automaticamente e refletem as listas.
- [ ] `index.html` carrega localmente sem erro.
- [ ] O console do navegador não apresenta erros relevantes.
- [ ] O filtro `CENTRAL DF` continua funcionando.
- [ ] O diff contém somente arquivos necessários.
- [ ] Arquivos históricos não foram excluídos sem aprovação.
- [ ] O Pull Request será aberto para revisão antes de qualquer merge.

## Como interpretar atualizações enviadas pelo Anderson

Quando o usuário enviar informações em linguagem natural:

- Identificar automaticamente se é:
  - Novo projeto
  - Atualização de projeto
  - Nova demanda
  - Incidente
  - Pendência
  - Entrega concluída
- Identificar automaticamente a frente:
  - `CENTRAL DF`
  - `CENTRAL DE ATENDIMENTO`
  - `MDS`
- Apresentar o entendimento antes de alterar qualquer arquivo.

Formato obrigatório:

1. O que foi entendido
2. Projeto impactado
3. Frente
4. Arquivos que serão alterados
5. Resumo da alteração

Somente após aprovação do usuário realizar a alteração.

## Modo de uso diário pelo Anderson

Este painel será atualizado a partir de informações enviadas em linguagem natural pelo Anderson, como:

- e-mails recebidos;
- mensagens de WhatsApp;
- atas ou registros de reunião;
- chamados CITSmartX;
- informações de fornecedores;
- decisões gerenciais;
- atualizações de status;
- incidentes;
- novas demandas;
- novos projetos;
- prazos e entregas.

O agente deve interpretar essas informações e organizar automaticamente no Painel Executivo COI.

## Regra principal

O agente nunca deve alterar arquivos, commitar, abrir PR ou publicar diretamente sem antes apresentar o entendimento e pedir aprovação explícita do Anderson.

Antes de qualquer alteração, o agente deve responder com:

1. Entendimento da informação recebida.
2. Classificação:
   - Novo projeto;
   - Atualização de projeto existente;
   - Nova demanda;
   - Incidente;
   - Pendência;
   - Entrega concluída;
   - Atualização de prazo;
   - Atualização de status.
3. Frente identificada:
   - `CENTRAL DF`;
   - `CENTRAL DE ATENDIMENTO`;
   - `MDS`.
4. Projeto impactado ou novo projeto sugerido.
5. Campos que serão atualizados no `dados_painel_aura.json`.
6. Se haverá ou não alteração no `index.html`.
7. Se haverá ou não alteração no `README.md`.
8. Validações que serão executadas.
9. Pergunta obrigatória:
   "Posso aplicar essa atualização e criar a branch de correção?"

Somente após o Anderson responder positivamente, o agente poderá:

1. Criar branch.
2. Atualizar os arquivos necessários.
3. Validar JSON.
4. Testar o carregamento local do painel.
5. Verificar console.
6. Apresentar resumo do diff.
7. Criar commit.
8. Abrir Pull Request.
9. Aguardar nova aprovação para merge.

## Regra de validação final

Mesmo após aplicar as alterações, o agente deve apresentar uma validação final antes da publicação na `main`.

A validação final deve conter:

- Arquivos modificados;
- Resumo do diff;
- Status do JSON;
- Resultado do teste local;
- Resultado do console;
- Quantidade de projetos por frente;
- Métricas calculadas do dashboard;
- Pendências atualizadas;
- Entregas próximas atualizadas;
- Confirmação de que não há datas futuras marcadas como concluídas;
- Confirmação de que não há alteração de layout não solicitada.

O agente deve perguntar:

"Posso abrir o PR para revisão?"

Depois que o PR estiver aberto, o agente deve perguntar:

"Posso fazer o merge na main?"

O merge só poderá ser feito após aprovação explícita do Anderson.

## Como interpretar informações soltas

Quando o Anderson enviar um texto livre, o agente deve:

1. Ler todo o contexto.
2. Identificar nomes de pessoas, áreas, datas, sistemas e entregas.
3. Verificar se já existe projeto correspondente no `dados_painel_aura.json`.
4. Se existir projeto, propor atualização.
5. Se não existir projeto, sugerir criação de novo projeto.
6. Se houver falha, indisponibilidade ou problema operacional, sugerir registro como incidente.
7. Se houver entrega encerrada, sugerir tarefa concluída.
8. Se houver solicitação sem projeto formal, sugerir demanda.
9. Se houver prazo, atualizar próximas entregas e pendências.
10. Nunca duplicar projeto sem verificar se já existe item semelhante.

## Padrão de resposta antes de alterar

Sempre responder neste formato:

### Entendimento

[Resumo do que foi compreendido]

### Classificação

[Projeto / Atualização / Demanda / Incidente / Pendência / Entrega concluída]

### Frente

[CENTRAL DF / CENTRAL DE ATENDIMENTO / MDS]

### Projeto impactado

[Nome do projeto existente ou sugestão de novo projeto]

### Alterações propostas

- [item 1]
- [item 2]
- [item 3]

### Arquivos impactados

- `dados_painel_aura.json`
- `index.html`, se aplicável
- `README.md`, se aplicável

### Validações previstas

- JSON válido;
- painel carregando;
- console sem erro;
- métricas coerentes;
- datas coerentes;
- sem alteração indevida de layout.

### Confirmação obrigatória

Posso aplicar essa atualização e criar a branch de correção?

## Regras de segurança operacional

- Nunca alterar a `main` diretamente.
- Nunca fazer merge sem aprovação.
- Nunca alterar layout sem solicitação.
- Nunca apagar histórico sem autorização.
- Nunca remover arquivos antigos sem autorização.
- Nunca alterar nomes de projetos sem validação.
- Nunca criar duplicidade de projeto.
- Nunca marcar data futura como concluída.
- Nunca deixar métricas manuais divergentes do conteúdo real.
- Sempre preservar o padrão visual atual do painel, salvo pedido contrário.

## Objetivo do comportamento do agente

O agente deve atuar como apoio operacional de PMO do Anderson, interpretando informações brutas do dia a dia e transformando em registros estruturados no Painel Executivo COI, mantendo governança, validação e rastreabilidade por branch, commit e Pull Request.
