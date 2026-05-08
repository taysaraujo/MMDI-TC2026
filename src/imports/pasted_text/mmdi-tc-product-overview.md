1. Visão Geral do Produto
1.1 Contexto e Problema
O Marco de Medição de Desempenho e Impacto dos Tribunais de Contas (MMDI-TC) é um programa conduzido pela ATRICON que avalia institucionalmente os 33 Tribunais de Contas brasileiros (TCU, TCEs, TCMs e TCDFs) em relação à conformidade com padrões de governança, independência institucional, qualidade das auditorias e outros domínios de excelência.

O ciclo de avaliação envolve múltiplas comissões internas em cada Tribunal, centenas de critérios distribuídos em 6 domínios e 25 indicadores (PQATCs), registro de evidências documentais, controle de qualidade e envio de resultados à Secretaria Executiva da Atricon. Atualmente, esse processo carece de um sistema digital integrado, resultando em:
Fragmentação do processo entre planilhas, e-mails e sistemas desconexos;
Ausência de rastreabilidade das evidências registradas;
Dificuldade de monitoramento em tempo real do progresso por parte da Atricon;
Risco de inconsistências entre avaliações da CAV e revisões da CCQ;
Ineficiência na comunicação entre responsáveis por indicadores e comissões avaliadores.

1.2 Solução Proposta
O Sistema Aprimore MMDII-TC é uma plataforma web institucional de gestão completa do ciclo de autoavaliação e controle de qualidade interno do programa MMDI-TC. O sistema centraliza planejamento, registro de evidências, avaliação de critérios, controle de qualidade, indicação de boas práticas e geração de relatórios diagnósticos, com controle de acesso baseado em perfis.

1.3 Objetivos do Produto
Digitalizar e integrar todo o fluxo de trabalho do ciclo MMDI-TC em uma única plataforma;
Garantir controle de acesso granular por perfil de usuário (RI, CAV, CCQ);
Fornecer visibilidade em tempo real do progresso por domínio, PQATC e critério;
Assegurar a rastreabilidade de todas as ações, registros e alterações;
Produzir automaticamente relatórios diagnósticos consolidados ao final do ciclo;
Facilitar a comunicação entre Tribunais e Secretaria Executiva da Atricon.

1.4 Escopo do Produto — Versão 1.0
✅ Dentro do Escopo
Tela 1: Plano de Trabalho com Gantt, KPIs por Domínio, Avisos e Contagem Regressiva
Tela 2: Gestão dos Critérios (seleção discricionária, registro de evidências e avaliação, Kanban)
Tela 3: Boas Práticas (formulário, galeria e votação por estrelas)
Tela 4: Diagnóstico (criação e consulta de relatórios do ciclo)
Gerenciamento de usuários com 3 perfis distintos
Notificações e alertas internos ao sistema
Auditoria de ações (log imutável)


❌ Fora do Escopo (V1.0)
Integração automática com sistemas legados dos Tribunais
Aplicativo móvel nativo (iOS/Android)
Avaliação por pares entre Tribunais diferentes
Módulo financeiro ou de contratos


2. Usuários e Perfis de Acesso
O sistema possui três perfis hierárquicos de usuário. Cada perfil possui capacidades distintas e cumulativas — a CCQ acumula todas as permissões da CAV, e a CAV acumula parte das permissões do RI.

2.1 Perfil 1 — Responsável pelo Indicador (RI)
Atributo
Descrição
Quem é
Servidor técnico ou gestor do Tribunal designado como responsável por um ou mais indicadores (PQATCs/Dimensões)
Quantidade típica
1 a 3 por PQATC, podendo acumular múltiplos indicadores
Escopo de visão
Somente os indicadores e critérios pelos quais é responsável
Principais ações
Registrar evidências, resgatar evidências do ciclo anterior, submeter boas práticas
Pode avaliar critérios?
Não — apenas registra evidências para avaliação da CAV
Acesso ao Gantt?
Somente leitura — visualiza prazos mas não edita


2.2 Perfil 2 — Integrante da Comissão de Avaliação (CAV)
Atributo
Descrição
Quem é
Membro da Comissão de Avaliação do Tribunal, responsável por examinar o desempenho e registrar conclusões
Quantidade típica
3 a 7 membros por Tribunal
Escopo de visão
Todos os indicadores, critérios e evidências do Tribunal
Principais ações
Elaborar Plano de Trabalho, definir indicadores discricionários, avaliar critérios, mover cards no Kanban, registrar boas práticas, formular consultas
Pode alterar avaliação da CCQ?
Não
Acesso ao Gantt?
Leitura e edição (criação de tarefas CAV)


2.3 Perfil 3 — Integrante da Comissão de Controle de Qualidade (CCQ)
Atributo
Descrição
Quem é
Membro da Comissão de Controle de Qualidade, que atua de forma independente revisando as avaliações da CAV
Quantidade típica
2 a 5 membros por Tribunal
Escopo de visão
Total — todos os dados do ciclo do Tribunal
Principais ações
Todas as ações da CAV + revisar e alterar resultados de avaliação + registrar divergências + encerrar a fase
Pode sobrepor avaliação da CAV?
Sim — em caso de divergência não resolvida, prevalece o entendimento da CCQ (regra do programa)
Acesso ao Gantt?
Leitura e edição (criação de tarefas CCQ independentes)


2.4 Matriz de Permissões Consolidada
Funcionalidade / Ação
RI
CAV
CCQ
Visualizar Plano de Trabalho (Gantt)
Sim
Sim
Sim
Criar/editar tarefas no Gantt (próprias)
Não
Sim
Sim
Visualizar KPIs por Domínio
Sim
Sim
Sim
Ver Avisos da Atricon
Sim
Sim
Sim
Selecionar indicadores discricionários
Não
Sim
Sim
Registrar evidências em critérios
Sim
Sim
Sim
Resgatar evidência do ciclo anterior
Sim
Sim
Sim
Avaliar critério (Atende/Não atende)
Não
Sim
Sim
Alterar resultado de avaliação da CAV
Não
Não
Sim
Mover cards no Kanban
Não
Sim
Sim
Submeter Boa Prática
Sim
Sim
Sim
Avaliar aderência de Boa Prática
Não
Sim
Sim
Votar em Boas Práticas (estrelas)
Sim
Sim
Sim
Formular consulta à Secretaria Executiva
Não
Sim
Sim
Registrar divergência formal
Não
Não
Sim
Encerrar fase e comunicar Atricon
Não
Não
Sim
Gerar Relatório de Diagnóstico
Não
Sim
Sim
Visualizar Relatório de Diagnóstico
Sim
Sim
Sim


3. Regras de Negócio
3.1 Estrutura de Dados do MMDI-TC
Os indicadores do programa seguem uma hierarquia rígida de 4 níveis que deve ser refletida fielmente na navegação e nos filtros do sistema:

Nível
Nome
Exemplo
Qtd. no ciclo 2024
1
Domínio
Domínio A — Independência e Marco Legal
6 domínios
2
Indicador / PQATC
PQATC 01 — Composição, Organização e Funcionamento
25 PQATCs
3
Dimensão
1.1 — Ministros e Conselheiros
78 dimensões
4
Critério
1.1.1 — Composição por origem de vaga
472 critérios


Os 6 Domínios e seus PQATCs são:

Domínio
Nome
PQATCs
Total de Critérios
A
Independência e Marco Legal
01
19
B
Governança Interna
02, 03, 04, 05, 06, 07
139
C
Fiscalização e Auditoria
08, 09, 10, 11, 12, 13, 14, 15
145
D
Fiscalização da Infraestrutura e Meio Ambiente
16, 17, 18
46
E
Fiscalização e Auditoria de Políticas Públicas Sociais
19, 20, 21, 22
76
F
Fiscalização e Auditoria da Gestão Fiscal, TI e Transparência
23, 24, 25
47


3.2 Regras de Indicadores Discricionários
RN-01 — Seleção de Indicadores Discricionários


► Apenas a CAV e a CCQ podem registrar a opção formal do Tribunal sobre indicadores discricionários (elegíveis).
► Para cada indicador elegível, o sistema deve exigir que a CAV formalize explicitamente: (a) se o indicador será avaliado no ciclo; e (b) de que forma será avaliado.
► Um indicador discricionário não selecionado é excluído do cálculo de pontuação do ciclo.
► A seleção de indicadores discricionários deve ser concluída antes do início da fase de levantamento de evidências (bloqueio por prazo ou por status do Plano de Trabalho).
► O sistema deve registrar data, hora e identidade do usuário que realizou a seleção (auditoria).
► Uma vez encerrada a fase, a seleção não pode ser alterada sem liberação da Secretaria Executiva da Atricon.

3.3 Regras de Registro de Evidências
RN-02 — Registro e Validação de Evidências


► Qualquer dos 3 perfis pode registrar evidências para critérios. O RI registra dentro do escopo de seus indicadores; CAV e CCQ têm acesso irrestrito.
► Cada evidência deve conter obrigatoriamente: (a) descrição textual da evidência; (b) pelo menos um arquivo anexo (PDF, DOCX, XLSX, JPG, PNG) OU uma URL válida; (c) data de referência da evidência; (d) indicação se é uma evidência nova ou resgatada do ciclo anterior.
► Evidências resgatadas do ciclo anterior devem exibir o ciclo de origem e o status de validação anterior (validada/rejeitada), como informação somente leitura.
► Uma evidência resgatada pode ser reaproveitada diretamente ou substituída por uma nova versão atualizada.
► O sistema deve manter histórico de versões de evidências por critério — toda alteração gera uma nova versão, preservando a anterior.
► Cada arquivo de evidência deve ter no máximo 50 MB. O sistema deve validar tipo e tamanho antes do upload.
► Não há limite de evidências por critério, mas o sistema deve alertar quando mais de 10 evidências estiverem registradas para o mesmo critério (sinal de possível redundância).

3.4 Regras de Avaliação de Critérios
RN-03 — Avaliação e Resultado dos Critérios


► Apenas CAV e CCQ podem avaliar critérios. O RI não tem acesso a este campo.
► Cada critério deve ser avaliado com exatamente um dos seguintes resultados: (a) Atende; (b) Atende Parcialmente; (c) Não Atende; (d) Não se Aplica.
► O resultado 'Não se Aplica' deve ser acompanhado de justificativa textual obrigatória de ao menos 100 caracteres.
► A avaliação 'Atende Parcialmente' deve ser acompanhada de campo descritivo explicando o grau de atendimento.
► A pontuação de cada dimensão é calculada automaticamente pelo sistema conforme a regra definida no manual do MMDI-TC para aquela dimensão (ex.: 'Pontuação = 4: todos os critérios cumpridos; Pontuação = 3: três critérios cumpridos'). A fórmula de cálculo é parametrizável por indicador na base de dados.
► Um critério só pode ser marcado como 'Concluído' no Kanban quando possui pelo menos uma evidência registrada E uma avaliação registrada pela CAV.
► A CAV pode alterar sua própria avaliação até que a CCQ marque o critério como 'Validado'. Após a validação pela CCQ, qualquer alteração exige registro de justificativa.

3.5 Regras da CCQ — Controle de Qualidade
RN-04 — Controle de Qualidade Interno (CCQ)


► A CCQ atua de forma INDEPENDENTE da CAV. Os membros da CCQ não devem ser os mesmos da CAV no mesmo ciclo (validação a ser configurada pelo administrador do Tribunal).
► A CCQ pode alterar o resultado de qualquer avaliação feita pela CAV. Toda alteração realizada pela CCQ gera automaticamente um registro de 'divergência formal' com campos: justificativa (obrigatório, mínimo 200 caracteres), resultado original da CAV, novo resultado da CCQ, data e identificação do membro da CCQ.
► REGRA FUNDAMENTAL: Em caso de divergência entre CAV e CCQ que não possa ser resolvida em consenso, PREVALECE SEMPRE o entendimento da CCQ. O sistema deve exibir esta regra de forma proeminente na interface da CCQ.
► A CCQ pode registrar novas evidências complementares além das registradas pelos RIs e CAV.
► O log de divergências deve estar disponível para consulta pela Secretaria Executiva da Atricon.
► Somente a CCQ pode encerrar a fase de autoavaliação, após certificação de que todos os processos foram adequadamente registrados.

3.6 Regras do Kanban
RN-05 — Kanban de Movimentação de Critérios


► O Kanban exibe os critérios como cards organizados em colunas de status: (1) Pendente → (2) Em Andamento → (3) Concluído → (4) Validado.
► CAV e CCQ podem mover cards por arrastar e soltar (drag and drop). O RI não pode mover cards.
► REGRA DE TRANSIÇÃO — Pendente → Em Andamento: Livre; nenhum pré-requisito.
► REGRA DE TRANSIÇÃO — Em Andamento → Concluído: O critério deve ter ao menos 1 evidência registrada E a avaliação da CAV registrada.
► REGRA DE TRANSIÇÃO — Concluído → Validado: Somente a CCQ pode mover para 'Validado'. Exige revisão e concordância expressa da CCQ.
► Movimentação retroativa (ex.: Validado → Concluído) é permitida apenas para a CCQ e exige justificativa obrigatória.
► Cada movimentação é registrada no log de auditoria com usuário, data/hora e status de origem e destino.
► O Kanban pode ser filtrado por Domínio, PQATC e responsável.

3.7 Regras do Plano de Trabalho
RN-06 — Plano de Trabalho e Gráfico de Gantt


► O sistema carrega automaticamente as etapas obrigatórias do ciclo MMDI-TC como tarefas pré-definidas no Gantt (somente leitura para essas tarefas-base).
► As etapas obrigatórias pré-carregadas são: (1) Planejamento Inicial; (2) Seleção de Indicadores Discricionários; (3) Levantamento de Evidências; (4) Avaliação dos Critérios (CAV); (5) Controle de Qualidade (CCQ); (6) Indicação de Boas Práticas; (7) Encerramento da Fase.
► CAV e CCQ podem adicionar tarefas extras exclusivas do Tribunal. Essas tarefas são editáveis e excluíveis.
► Cada tarefa no Gantt deve conter: Título, Responsável (CAV ou CCQ), Data de Início, Data de Término, Status e Observações.
► O Gantt exibe contagem regressiva em dias para cada tarefa com prazo em aberto.
► Tarefas atrasadas são sinalizadas automaticamente em amarelo (até 3 dias de atraso) ou vermelho (mais de 3 dias de atraso).
► O RI visualiza o Gantt em modo somente leitura — pode ver prazos e status, mas não editar.

3.8 Regras de Boas Práticas
RN-07 — Registro e Votação de Boas Práticas


► Qualquer perfil pode submeter uma boa prática. O formulário de submissão é obrigatório para: Nome da prática, Área/unidade responsável, Descrição detalhada (mín. 300 caracteres), PQATC relacionado, Resultados obtidos e evidências de impacto.
► A CAV avalia a aderência de cada boa prática ao regulamento, com resultado: Aderente / Parcialmente Aderente / Não Aderente, e campo de justificativa obrigatório.
► Somente boas práticas classificadas como 'Aderente' pela CAV podem ser formalizadas como 'Experiência Exitosa' do Tribunal.
► O sistema de votação por estrelas (1 a 5 estrelas) está disponível SOMENTE para integrantes da Atricon (perfil especial fora do escopo do Tribunal). Cada integrante da Atricon vota uma única vez por boa prática.
► A nota média em estrelas é exibida publicamente para todos os perfis, mas o voto individual é anônimo.
► O sistema exibe um ranking das boas práticas por maior pontuação de estrelas, filtrado por Domínio ou PQATC.

3.9 Regras de Encerramento da Fase
RN-08 — Encerramento e Comunicação à Atricon


► O encerramento da fase só pode ser iniciado pela CCQ.
► O botão de encerramento fica bloqueado até que TODOS os critérios obrigatórios do ciclo estejam na coluna 'Validado' do Kanban.
► Antes do encerramento, o sistema exibe um checklist de verificação com todos os itens pendentes que ainda precisam ser concluídos.
► O ato de encerramento gera automaticamente: (a) registro imutável de data, hora e usuário CCQ; (b) snapshot completo do estado do ciclo; (c) notificação automática à Secretaria Executiva da Atricon.
► Após o encerramento, nenhum dado do ciclo pode ser alterado — o sistema entra em modo somente leitura para aquele ciclo. Qualquer reabertura exige autorização da Secretaria Executiva.

4. Especificações das Telas
A seguir estão descritas as quatro telas principais do sistema com seus componentes, comportamentos e regras de interface.

Tela 1 — Plano de Trabalho
Acesso
Todos os perfis podem visualizar. CAV e CCQ podem editar. RI tem acesso somente leitura.


1.1 Gráfico de Gantt
Componente principal da tela, ocupando a maior parte da área de trabalho.

Elemento
Descrição e Comportamento
Linha do tempo
Escala configurável: Dia / Semana / Mês. Padrão: Semana. Barra de navegação horizontal para percorrer o timeline.
Tarefas obrigatórias
Exibidas com fundo cinza mesclado e ícone de cadeado (🔒). Não editáveis pelos Tribunais.
Tarefas do Tribunal
Fundo branco com bordas coloridas por responsável (azul = CAV, verde = CCQ). Editáveis por arrastar.
Barra de progresso da tarefa
Exibe % de conclusão com preenchimento colorido: cinza = pendente, azul = em andamento, verde = concluído, amarelo = atrasado, vermelho = atrasado crítico.
Drag & drop de datas
CAV e CCQ podem arrastar as barras para ajustar datas de início/fim. RI não pode.
Adicionar tarefa
Botão '+ Nova Tarefa' abre modal com campos: Título, Responsável (CAV/CCQ), Início, Fim, Observações.
Tooltip ao passar o mouse
Exibe: Título, Responsável, Início, Fim, Dias restantes, Status atual.
Exportar
Botão 'Exportar PDF' gera snapshot do Gantt no estado atual.


1.2 KPIs por Domínio
Painel lateral direito ou faixa superior com 6 cards de KPI, um por domínio.

Elemento
Descrição
Card por domínio
Exibe: Letra do domínio (A-F), nome abreviado, % de critérios Validados vs. total, barra de progresso colorida.
Cores das barras de progresso
0–33%: vermelho | 34–66%: amarelo | 67–99%: azul | 100%: verde
Clicável
Clicar no card navega diretamente para a aba de Gestão dos Critérios filtrada pelo domínio correspondente.
Atualização
Tempo real — reflete imediatamente qualquer mudança de status no Kanban.


1.3 Avisos da Atricon
Painel de comunicados emitidos pela Secretaria Executiva da Atricon, visível para todos os perfis do Tribunal.

Elemento
Descrição
Lista de avisos
Exibidos em ordem cronológica reversa (mais recentes primeiro). Cada aviso mostra: Título, Data de publicação, Categoria (Prazo / Instrução / Informativo), Texto resumido.
Marcar como lido
Cada usuário pode marcar individualmente um aviso como lido. Avisos não lidos exibem badge colorido.
Aviso crítico
Avisos de Prazo iminente (< 3 dias) são destacados com fundo amarelo pulsante.


1.4 Contagem Regressiva
Exibida de forma proeminente no topo ou em painel dedicado.
Elemento
Descrição
Prazo principal
Data de encerramento da fase de autoavaliação, definida pela Atricon. Exibida em formato 'DD dias HH:mm:ss' com atualização em tempo real.
Próximo prazo interno
Menor prazo de tarefa em aberto no Gantt. Exibido em destaque secundário.
Alerta de urgência
Quando restam menos de 7 dias para o prazo principal, exibe banner de alerta no topo da tela.


Tela 2 — Gestão dos Critérios
Acesso
Todos os perfis, com permissões distintas por aba e ação conforme Seção 2.


A tela é organizada em 3 abas independentes, com barra de filtros global aplicável às 3 abas: Domínio | PQATC | Dimensão | Status | Responsável | Discricionário.

Aba 2.1 — Seleção de Indicadores Discricionários
Elemento
Descrição e Comportamento
Lista de indicadores elegíveis
Exibe somente as dimensões/PQATCs marcados como discricionários no programa. Agrupados por Domínio → PQATC.
Card de indicador discricionário
Exibe: Código (ex.: 3.5), Nome da dimensão, PQATC vinculado, Status atual (Não definido / Incluído no ciclo / Excluído do ciclo).
Toggle de inclusão
CAV e CCQ podem ativar/desativar a inclusão do indicador no ciclo atual. Toggle verde = incluído; cinza = excluído.
Campo 'Como será avaliado'
Ao incluir um indicador, campo texto obrigatório descreve o método de avaliação adotado pelo Tribunal.
Confirmação e bloqueio
Após salvar, o sistema exibe modal de confirmação. Uma vez confirmada, a seleção exibe badge 'Formalizado' e fica bloqueada para edição.
Auditoria
Exibe: usuário que realizou a seleção, data e hora. Disponível no tooltip do badge 'Formalizado'.
Status geral da seleção
Barra de progresso no topo da aba: 'X de Y indicadores discricionários formalizados'.


Aba 2.2 — Gestão dos Critérios (Evidências e Avaliação)
Área principal de trabalho do ciclo. Exibe a hierarquia completa dos critérios.

Elemento
Descrição e Comportamento
Navegação hierárquica
Árvore colapsável: Domínio → PQATC → Dimensão → Critérios. Cada nível exibe contador de progresso (ex.: '4/7 critérios avaliados').
Card de critério
Exibe: Código (ex.: 1.1.1), Texto completo do critério, Fontes normativas, Exemplos de evidência sugeridos, Status (badge colorido), Responsável designado.
Painel de evidências
Ao expandir um critério, exibe todas as evidências registradas com: Descrição, Tipo (Documento/Link/Texto), Arquivo para download, Data, Ciclo de origem (Atual/Anterior), Quem registrou, Data/hora de registro.
Adicionar evidência
Botão '+ Evidência' abre drawer lateral com formulário (campos conforme RN-02). Disponível para RI (no escopo), CAV e CCQ.
Evidência do ciclo anterior
Toggle 'Resgatar do ciclo anterior' exibe evidências validadas previamente. Usuário pode marcar como 'Reaproveitada' ou substituir.
Painel de avaliação (CAV/CCQ)
Seletor de resultado (radio buttons): Atende / Atende Parcialmente / Não Atende / Não se Aplica. Campo de parecer qualitativo. Pontuação parcial calculada automaticamente. Botão 'Salvar Avaliação'.
Revisão CCQ
Bloco separado 'Revisão CCQ': exibe resultado da CAV em cinza, campo para resultado CCQ com justificativa obrigatória se diferente da CAV. Badge 'Divergência Registrada' se houver alteração.
Pontuação calculada
Exibida por dimensão e por PQATC conforme regras do manual. Atualizada em tempo real conforme avaliações são salvas.


Aba 2.3 — Kanban de Critérios
Elemento
Descrição e Comportamento
Colunas
4 colunas fixas, da esquerda para a direita: Pendente | Em Andamento | Concluído | Validado.
Cards
Cada card representa um critério. Exibe: Código, Nome abreviado da dimensão, Responsável, Badge de status de evidência (verde = tem evidência, vermelho = sem evidência), Badge de avaliação (verde = avaliado pela CAV).
Drag & drop
CAV e CCQ arrastam cards entre colunas, respeitando as regras de transição (RN-05). RI não pode arrastar.
Bloqueio com tooltip
Ao tentar mover um card sem pré-requisitos, o sistema exibe tooltip explicativo: 'Este critério precisa de evidência antes de ser movido para Concluído'.
Filtros do Kanban
Filtros por Domínio, PQATC e Responsável. O Kanban exibe apenas os cards correspondentes ao filtro ativo.
Contador por coluna
Cada coluna exibe o número de cards contidos e o percentual sobre o total.
Cor por domínio
Os cards podem ser coloridos pela letra do domínio (A = verde, B = azul, etc.) para identificação visual rápida.


Tela 3 — Boas Práticas
Acesso
Todos os perfis podem submeter e visualizar. CAV e CCQ avaliam aderência. Votação por estrelas é exclusiva de integrantes da Atricon (perfil externo).


3.1 Formulário de Submissão
Campo
Tipo
Obrigatoriedade
Observação
Nome da boa prática
Texto curto
Obrigatório
Máx. 100 caracteres
Área/Unidade responsável
Texto curto
Obrigatório
Nome da unidade do Tribunal
PQATC relacionado
Seleção múltipla
Obrigatório
Lista dos 25 PQATCs
Domínio
Preenchido auto.
Auto
Derivado do PQATC selecionado
Descrição detalhada
Texto longo
Obrigatório
Mínimo 300 caracteres
Objetivos da prática
Texto longo
Obrigatório
Mínimo 150 caracteres
Resultados obtidos / Impacto
Texto longo
Obrigatório
Mínimo 150 caracteres
Evidências de resultado
Upload múltiplo
Opcional
PDF, imagem, DOCX. Máx. 50 MB cada
Link de referência
URL
Opcional
Site, publicação ou documento online
Contato responsável
E-mail
Opcional
Para eventuais perguntas de outros TCs


3.2 Galeria de Boas Práticas
Elemento
Descrição
Card de boa prática
Exibe: Nome, Tribunal de origem, PQATC vinculado, Status de avaliação da CAV, Nota de estrelas (se aplicável), Data de submissão.
Filtros
Por Domínio, PQATC, Status de avaliação, Nota de estrelas, Período.
Ordenação
Por data (mais recente), por nota de estrelas, por Domínio.
Visualização completa
Ao clicar no card, abre modal/drawer com todos os campos da boa prática, histórico de avaliação e comentários.
Badge 'Experiência Exitosa'
Exibido em destaque nos cards formalizados pela CAV como exitosos.
Sistema de estrelas
Visível para todos (nota média), clicável apenas para membros Atricon. Nota de 1 a 5, com média calculada e número de votos exibido.
Ranking
Aba 'Mais Votadas' exibe ranking das boas práticas por nota, filtrado por Domínio.


3.3 Painel de Avaliação da CAV
Elemento
Descrição
Resultado de aderência
Seleção: Aderente / Parcialmente Aderente / Não Aderente. Campo justificativa obrigatório.
Formalização como exitosa
Botão ativo apenas para práticas 'Aderentes'. Ao clicar, exige confirmação e gera badge 'Experiência Exitosa'.
Auditoria
Exibe quem avaliou, quando, e o histórico de alterações no resultado.


Tela 4 — Diagnóstico
Acesso
RI: somente leitura. CAV e CCQ: criar, editar e exportar relatórios.


A Tela de Diagnóstico é o centro de inteligência do ciclo. Permite a criação de relatórios customizados e o acompanhamento do ciclo em tempo real, com geração automática do relatório final ao encerramento.

4.1 Painel de Status do Ciclo (tempo real)
Elemento
Descrição
Scorecard por Domínio
Tabela com: Domínio, Total de critérios, Critérios avaliados, Critérios validados, Pontuação parcial, Pontuação máxima, % de conclusão.
Gráfico radar/teia
Visualização em radar com os 6 domínios nos eixos, mostrando pontuação atual vs. pontuação máxima.
Gráfico de barras horizontal
Progresso por PQATC (0–100%), colorido por status predominante.
Timeline de ações
Feed cronológico de ações relevantes: 'Critério 3.2.1 avaliado por [usuário] em [data]'.


4.2 Criação de Relatórios
Elemento
Descrição
Novo Relatório
CAV e CCQ podem criar relatórios com seleção de: Escopo (ciclo completo / por domínio / por PQATC), Seções incluídas, Período de referência.
Seções disponíveis
Sumário executivo automático, Pontuação por domínio e PQATC, Lista de critérios por status, Evidências registradas (resumo ou completo), Divergências CAV x CCQ, Boas práticas formalizadas, Indicadores discricionários selecionados.
Status do relatório
Rascunho (editável) / Em Revisão / Aprovado / Publicado.
Relatório automático de encerramento
Gerado automaticamente pelo sistema ao registrar o encerramento da fase (RN-08). Contém snapshot completo e imutável do ciclo.
Exportação
PDF e XLSX. O PDF usa template visual com identidade Atricon.


4.3 Histórico de Relatórios
Elemento
Descrição
Lista de relatórios
Exibe todos os relatórios do ciclo: nome, tipo, data de criação, criado por, status, ações (visualizar, exportar, excluir rascunho).
Relatório de encerramento
Destacado com badge especial. Somente leitura. Não pode ser excluído.
Ciclos anteriores
Seletor de ciclo permite acessar relatórios de ciclos anteriores em modo somente leitura.


5. Especificações de Design
5.1 Identidade Visual
Elemento
Especificação
Tema
Ligth Mode obrigatório como padrão; modo Dark como alternativa acessível
Estilo
Glassmorphism — painéis com backdrop-filter: blur(20px), bordas translúcidas rgba, camadas sobrepostas com opacidade
Tom
Tech-premium-institucional: sério e confiável, sem parecer genérico
Referência de layout
Microsoft Dynamics 365 Sales Hub (sidebar + área central + painel direito)


5.2 Paleta de Cores
Token
Cor
Hexadecimal
Uso principal
--color-primary-green
Verde institucional
#2E7D32
Títulos H1, bordas de destaque, botões primários
--color-accent-green
Verde vibrante
#4CAF50
Status 'Validado', badges positivos, ações de sucesso
--color-primary-yellow
Âmbar
#F9A825
Alertas, prazos iminentes, status 'Atrasado'
--color-accent-yellow
Amarelo claro
#FFD54F
Indicadores de atenção, tooltips de aviso
--color-primary-blue
Azul institucional
#1565C0
Títulos H2, links, navbar ativa, CAV
--color-accent-blue
Azul claro
#42A5F5
Dados, gráficos, badges informativos
--color-bg-dark
Fundo escuro profundo
#0A0E1A
Background principal (dark mode)
--color-bg-card
Card glass
rgba(255,255,255,0.04)
Surface de cards e painéis
--color-border-glass
Borda glass
rgba(255,255,255,0.10)
Bordas de cards e inputs
--color-text-primary
Texto principal
#F0F4FF
Corpo de texto (dark mode)
--color-text-secondary
Texto secundário
#8B9CC8
Labels, metadados, placeholders


5.3 Tipografia
Uso
Família
Peso
Tamanho
Display / Títulos de tela
DM Sans ou Plus Jakarta Sans
700 Bold
32–48px
Títulos de seção (H2, H3)
DM Sans ou Plus Jakarta Sans
600 SemiBold
20–28px
Corpo de texto e parágrafos
Inter
400 Regular
14–16px
Labels, metadados, badges
Inter
500 Medium
11–13px
Códigos de indicadores (1.1.1)
JetBrains Mono
500 Medium
13–15px


5.4 Componentes de UI — Especificações
Cards Glassmorphism
CSS de referência para todos os painéis e cards:

background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 16px;
backdrop-filter: blur(20px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

Badges de Status dos Critérios
Status
Cor de fundo
Cor do texto
Ícone
Pendente
#1A2035 (glass)
#8B9CC8
○
Em Andamento
#1A2A40 (glass azul)
#42A5F5
◐
Concluído
#1A2E1A (glass verde)
#4CAF50
◉
Validado
#2E7D32
#FFFFFF
✓
Divergência CCQ
#2E1A1A (glass vermelho)
#EF5350
⚠
Não se Aplica
#2A2A2A (glass)
#757575
—


Layout Global
Zona
Largura
Descrição
Sidebar de navegação
260px (expandida) / 72px (colapsada)
Logo Atricon, menu principal, perfil do usuário, indicador de ciclo ativo
Área de trabalho principal
Flex — ocupa o espaço restante
Conteúdo das 4 telas com header de tela e breadcrumb
Painel contextual direito
320px (quando ativo)
Exibido em contextos específicos: detalhes de critério, evidências, avisos


6. Fluxo Principal do Ciclo
O diagrama a seguir descreve o fluxo sequencial obrigatório do ciclo de autoavaliação, refletindo as etapas do programa MMDI-TC e as transições de estado no sistema:

Etapa
Ação no Sistema
Responsável
Pré-requisito
Resultado
1. Planejamento
Elaborar Plano de Trabalho no Gantt
CAV + CCQ
Ciclo ativo no sistema
Gantt publicado e visível para RI
2. Discricionários
Selecionar indicadores elegíveis na Aba 2.1
CAV
Plano de Trabalho aprovado
Indicadores formalizados e bloqueados
3. Evidências
Registrar evidências por critério na Aba 2.2
RI + CAV + CCQ
Indicadores discricionários definidos
Critérios com evidências registradas
4. Avaliação CAV
Avaliar cada critério na Aba 2.2
CAV
Evidências registradas
Critérios com resultado e parecer
5. Mover no Kanban
Mover cards para 'Concluído' na Aba 2.3
CAV
Avaliação registrada
Critérios em coluna Concluído
6. Boas Práticas
Submeter e formalizar práticas na Tela 3
RI + CAV
Relatório de boas práticas elaborado
Práticas formalizadas como exitosas
7. Revisão CCQ
Revisar avaliações e mover para 'Validado'
CCQ
Todos critérios em 'Concluído'
Critérios Validados; divergências registradas
8. Diagnóstico
Gerar relatório de diagnóstico na Tela 4
CAV + CCQ
Critérios Validados
Relatório em PDF/XLSX disponível
9. Encerramento
Acionar encerramento e comunicar Atricon
CCQ
100% critérios Validados
Fase encerrada; notificação Atricon enviada


7. Requisitos Não Funcionais
7.1 Segurança
Autenticação via SSO institucional (SAML 2.0 / OAuth 2.0) com suporte a autenticação própria como fallback;
Autorização baseada em perfis (RBAC) — todas as permissões definidas na Seção 2 devem ser aplicadas no backend, não apenas no frontend;
Log de auditoria imutável para todas as ações de criação, edição e exclusão (quem fez, o quê, quando);
Criptografia TLS 1.3 para dados em trânsito; AES-256 para dados em repouso;
Sessões com timeout automático após 30 minutos de inatividade;
Backups automáticos diários com retenção mínima de 5 anos (requisito de órgãos públicos).

7.2 Performance
Tempo de resposta < 2 segundos para carregamento das telas principais;
Suporte a acesso concorrente de pelo menos 500 usuários simultâneos;
Upload de evidências: progresso em tempo real; suporte a arquivos de até 50 MB;
O Gantt deve renderizar até 100 tarefas sem degradação perceptível de performance.

7.3 Acessibilidade
Conformidade com WCAG 2.1 nível AA;
Suporte a leitores de tela (NVDA, JAWS);
Contraste mínimo de 4.5:1 para texto em dark mode;
Navegação completa por teclado sem uso de mouse;
Textos alternativos em todos os elementos visuais funcionais.

7.4 Compatibilidade
Browsers suportados: Chrome 110+, Firefox 115+, Edge 110+, Safari 16+;
Responsivo para tablets (largura mínima 768px). Mobile: somente leitura;
Sistema operacional: agnóstico (web).

8. Glossário
Termo
Definição
MMDI-TC
Marco de Medição de Desempenho e Impacto dos Tribunais de Contas — programa de avaliação institucional conduzido pela Atricon
Atricon
Associação dos Membros dos Tribunais de Contas do Brasil
TC / Tribunal
Tribunal de Contas participante do programa (TCU, TCEs, TCMs, TCDFs)
PQATC
Programa Qualidade Agilidade dos Tribunais de Contas — nome dado aos 25 indicadores do programa
Domínio
Agrupamento temático de nível 1 da hierarquia (A, B, C, D, E, F)
Dimensão
Subconjunto de critérios dentro de um PQATC, identificada por código X.Y
Critério
Unidade mínima de avaliação, identificada por código X.Y.Z
RI
Responsável pelo Indicador — perfil de usuário operacional
CAV
Comissão de Avaliação — perfil de usuário com poderes de avaliação
CCQ
Comissão de Controle de Qualidade — perfil de usuário com poderes de revisão e encerramento
Discricionário
Indicador que o Tribunal pode optar por incluir ou excluir do ciclo de avaliação
Ciclo
Período anual ou bienal de avaliação do programa MMDI-TC
Evidência
Documento, arquivo, link ou texto que comprova o atendimento a um critério
Gantt
Diagrama de barras horizontais representando o planejamento temporal das tarefas
Kanban
Método visual de gestão do fluxo de trabalho por colunas de status
PRD
Product Requirements Document — este documento de requisitos de produto


9. Critérios de Aceitação
O produto será considerado pronto para lançamento quando todos os critérios abaixo forem validados em ambiente de homologação com dados reais de um Tribunal piloto:

ID
Critério de Aceitação
Prioridade
CA-01
Os 3 perfis de usuário são distinguidos corretamente e todas as permissões da matriz (Seção 2.4) são aplicadas sem exceção
Crítica
CA-02
O Gantt exibe as 7 etapas obrigatórias pré-carregadas e permite adição de tarefas extras por CAV e CCQ
Alta
CA-03
Os KPIs por domínio refletem o estado real do Kanban em tempo real (latência máxima de 5 segundos)
Alta
CA-04
A seleção de indicadores discricionários gera registro de auditoria e fica bloqueada após confirmação
Crítica
CA-05
Todos os 472 critérios do ciclo 2024 estão cadastrados e navegáveis na hierarquia correta
Crítica
CA-06
O upload de evidências funciona para PDF, DOCX, XLSX, JPG e PNG até 50 MB
Alta
CA-07
As regras de transição do Kanban são respeitadas — o sistema bloqueia movimentações inválidas com mensagem explicativa
Crítica
CA-08
A CCQ consegue alterar o resultado de avaliação da CAV, gerando registro de divergência com justificativa
Crítica
CA-09
O botão de encerramento fica bloqueado enquanto há critérios fora da coluna 'Validado'
Crítica
CA-10
O relatório de encerramento é gerado automaticamente em PDF e XLSX, é imutável e não pode ser excluído
Alta
CA-11
O sistema de votação por estrelas em boas práticas só está disponível para o perfil Atricon
Alta
CA-12
O log de auditoria registra 100% das ações de criação, edição e exclusão com usuário, data e hora
Crítica

