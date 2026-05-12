import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, Paperclip, Check, Info, AlertTriangle, X, UploadCloud, Link as LinkIcon, Calendar, History, ListChecks, Plus, Trash2, FileText, FileSpreadsheet, Image as ImageIcon, Edit2 } from "lucide-react";
import clsx from "clsx";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Simulação de permissão: true = usuário é da CAV, false = usuário é RI ou CCQ
const isUserCAV = true; 

export interface Evidence {
  id: string;
  name: string;
  fileOrUrl: string;
  date: string;
  isEditing?: boolean;
}

export interface Criterion {
  id: string;
  title: string;
  domain: string;
  dimension: string;
  indicator: string;
  type: string;
  status: string;
  hasEvidence: boolean;
  evaluated: boolean;
  validated: boolean;
  included: boolean;
  reason: string;
  discordanceText?: string; // Armazena a justificativa da CCQ
  method?: string;
  expectedProof: string;
  evidenceExamples: string;
  evidences: Evidence[];
  evidencePrev: string;
  evaluationRI: string;
  evaluationCAV: string;
  evaluationCCQ: string;
  optedOut?: boolean;
}

const INITIAL_CRITERIA: Criterion[] = [
  // --- DOMÍNIO A ---
  { 
    id: "1.1.1", title: "Composição por origem de vaga", domain: "A", dimension: "Estrutura", indicator: "QATC 01", type: "mandatory", status: "validado", hasEvidence: true, evaluated: true, validated: true, included: true, reason: "", discordanceText: "",
    expectedProof: "Espera-se a comprovação legal da origem das vagas do Tribunal de Contas, demonstrando a devida proporcionalidade definida pela Constituição.", evidenceExamples: "Constituição Estadual, Atos de Nomeação.", evidences: [{ id: "ev1", name: "Decreto de Nomeação nº 123/2023", fileOrUrl: "decreto_123.pdf", date: "2023-01-15" }], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "atende", evaluationCCQ: "atende" 
  },
  { 
    id: "1.1.2", title: "Indicação de Conselheiros", domain: "A", dimension: "Estrutura", indicator: "QATC 01", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: false, reason: "", discordanceText: "",
    expectedProof: "Comprovação da origem funcional nas indicações do Executivo.", evidenceExamples: "Ato de nomeação, currículo.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "1.2.1", title: "Garantias e Prerrogativas", domain: "A", dimension: "Independência", indicator: "QATC 02", type: "mandatory", status: "concluido", hasEvidence: true, evaluated: true, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Documentação normativa assegurando vitaliciedade e inamovibilidade.", evidenceExamples: "Constituição Estadual, Estatuto.", evidences: [{ id: "ev2", name: "Constituição Estadual (Art. 50)", fileOrUrl: "const_estadual_art50.pdf", date: "1989-10-05" }], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "atende", evaluationCCQ: "" 
  },
  { 
    id: "1.2.2", title: "Autonomia Financeira", domain: "A", dimension: "Independência", indicator: "QATC 02", type: "mandatory", status: "emAndamento", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Comprovação de elaboração e gestão da própria proposta orçamentária.", evidenceExamples: "Proposta orçamentária do TC encaminhada ao Legislativo.", evidences: [], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "1.3.1", title: "Código de Ética Publicado e Divulgado", domain: "A", dimension: "Ética e Integridade", indicator: "QATC 03", type: "mandatory", status: "emAndamento", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "TC possui Código de Ética aprovado e com ampla divulgação.", evidenceExamples: "Resolução de aprovação, link da intranet.", evidences: [], evidencePrev: "", 
    evaluationRI: "nao_atende", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "1.3.2", title: "Mecanismos de Prevenção a Fraudes", domain: "A", dimension: "Ética e Integridade", indicator: "QATC 03", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Atuação de comitês de integridade ou políticas antifraude.", evidenceExamples: "Plano de Integridade aprovado, relatórios do comitê.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },

  // --- DOMÍNIO B ---
  { 
    id: "2.1.1", title: "Planejamento Estratégico Institucional", domain: "B", dimension: "Governança", indicator: "QATC 04", type: "mandatory", status: "validado", hasEvidence: true, evaluated: true, validated: true, included: true, reason: "", discordanceText: "",
    expectedProof: "Plano Estratégico formalmente aprovado e vigente.", evidenceExamples: "Documento do Plano Estratégico, Portaria.", evidences: [{ id: "ev3", name: "Plano Estratégico 2021-2025", fileOrUrl: "https://tc.gov.br/pe", date: "2021-02-10" }], evidencePrev: "pe_2020.pdf", 
    evaluationRI: "atende", evaluationCAV: "atende", evaluationCCQ: "atende" 
  },
  { 
    id: "2.1.2", title: "Gestão de Riscos Institucionais", domain: "B", dimension: "Governança", indicator: "QATC 04", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Metodologia implementada para identificação e mitigação de riscos corporativos.", evidenceExamples: "Matriz de Riscos, Política de Gestão de Riscos.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "2.2.1", title: "Política de Gestão de Pessoas", domain: "B", dimension: "Gestão Interna", indicator: "QATC 05", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Política formal de gestão com diretrizes de capacitação e avaliação.", evidenceExamples: "Manual de Gestão de Pessoas.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "2.3.1", title: "Plano Anual de Capacitação", domain: "B", dimension: "Gestão Interna", indicator: "QATC 05", type: "mandatory", status: "emAndamento", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Elaboração e execução do PAC.", evidenceExamples: "PAC aprovado, relatórios de cursos.", evidences: [], evidencePrev: "", 
    evaluationRI: "na", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "2.4.1", title: "Governança de TI e Segurança", domain: "B", dimension: "Tecnologia", indicator: "QATC 06", type: "mandatory", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Implementação de segurança da informação e comitê de TI.", evidenceExamples: "PDTI, Política de Segurança da Informação.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "2.4.2", title: "Plano de Continuidade de Negócios", domain: "B", dimension: "Tecnologia", indicator: "QATC 06", type: "mandatory", status: "concluido", hasEvidence: true, evaluated: true, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Plano estruturado para recuperação de sistemas críticos em desastres.", evidenceExamples: "Documento PCN, relatórios de testes de redundância.", evidences: [{ id: "ev_pcn", name: "PCN - Data Center", fileOrUrl: "pcn_2023.pdf", date: "2023-10-15" }], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "nao_atende", evaluationCCQ: "" 
  },

  // --- DOMÍNIO C ---
  { 
    id: "3.1.1", title: "Auditorias Operacionais Regulares", domain: "C", dimension: "Fiscalização", indicator: "QATC 07", type: "mandatory", status: "concluido", hasEvidence: true, evaluated: true, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Realização periódica de auditorias em educação e saúde.", evidenceExamples: "Relatórios de auditoria, PAF.", evidences: [{ id: "ev4", name: "Relatório Anual 2023", fileOrUrl: "relatorio_aud.pdf", date: "2024-01-30" }], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "atende", evaluationCCQ: "" 
  },
  { 
    id: "3.1.2", title: "Uso de IA no Cruzamento de Dados", domain: "C", dimension: "Inovação", indicator: "QATC 08", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Uso de ferramentas automatizadas para análise massiva.", evidenceExamples: "Apresentação do sistema, relatórios de malhas finas.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "3.2.1", title: "Acompanhamento de Obras Paralisadas", domain: "C", dimension: "Resultados", indicator: "QATC 09", type: "mandatory", status: "validado", hasEvidence: true, evaluated: true, validated: true, included: true, reason: "", discordanceText: "",
    expectedProof: "Identificação e registro das obras públicas paralisadas.", evidenceExamples: "Painel de obras, ofícios de cobrança.", evidences: [{ id: "ev5", name: "Painel de Obras 2024", fileOrUrl: "https://obras.tc.gov.br", date: "2024-04-01" }], evidencePrev: "", 
    evaluationRI: "atende", evaluationCAV: "atende", evaluationCCQ: "atende" 
  },
  { 
    id: "3.2.2", title: "Avaliação de Renúncias de Receitas", domain: "C", dimension: "Resultados", indicator: "QATC 09", type: "mandatory", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Fiscalização sobre o impacto das renúncias fiscais e incentivos.", evidenceExamples: "Relatórios de contas de governo, auditorias tributárias.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "3.3.1", title: "Controle da Folha de Pagamento", domain: "C", dimension: "Fiscalização", indicator: "QATC 10", type: "mandatory", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "", discordanceText: "",
    expectedProof: "Fiscalização contínua das folhas de jurisdicionados.", evidenceExamples: "Relatórios de trilhas de auditoria.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "3.3.2", title: "Fiscalização de Concessões e PPPs", domain: "C", dimension: "Fiscalização", indicator: "QATC 10", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Atuação no acompanhamento de grandes contratos de concessão e Parcerias Público-Privadas.", evidenceExamples: "Acórdãos de auditoria em concessões rodoviárias/saneamento.", evidences: [], evidencePrev: "", 
    evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },

  // --- CARDS DA REGRA ESPECÍFICA (DISCRICIONÁRIOS D, E, F) ---
  { 
    id: "4.3.1", title: "Fiscalização de Obras Inacabadas", domain: "D", dimension: "Fiscalização", indicator: "QATC 17", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Sistemática de auditoria e acompanhamento de obras inacabadas.", evidenceExamples: "Relatório gerencial.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "4.3.2", title: "Acompanhamento de Metas Sociais", domain: "D", dimension: "Controle Social", indicator: "QATC 18", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Verificação do cumprimento de metas sociais.", evidenceExamples: "Auditoria operacional em políticas sociais.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "5.2.1", title: "Capacitação do Controle Interno", domain: "E", dimension: "Relações", indicator: "QATC 21", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Realização de eventos para servidores do Controle Interno.", evidenceExamples: "Listas de presença.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "5.2.2", title: "Diretrizes Conjuntas com SCI", domain: "E", dimension: "Relações", indicator: "QATC 22", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Normativos orientativos com o Controle Interno.", evidenceExamples: "Resoluções conjuntas.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "6.3.1", title: "Sustentabilidade Hídrica", domain: "F", dimension: "Socioambiental", indicator: "QATC 24", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Ações focadas na redução do consumo de água.", evidenceExamples: "Relatório PLS.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  },
  { 
    id: "6.3.2", title: "Sustentabilidade Energética", domain: "F", dimension: "Socioambiental", indicator: "QATC 25", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, optedOut: false, reason: "", discordanceText: "",
    expectedProof: "Ações para eficiência energética.", evidenceExamples: "Faturas de energia comprovando redução.", evidences: [], evidencePrev: "", evaluationRI: "", evaluationCAV: "", evaluationCCQ: "" 
  }
];

const PREVIOUS_FILES = [
  "Relatório_Gestão_2022.pdf",
  "Portaria_015_2021.docx",
  "Evidencia_Obras_CicloAnterior.xlsx",
  "Ato_Normativo_09_2022.pdf"
];

const getFileThumbnail = (url: string) => {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('.pdf') || lower.includes('.docx') || lower.includes('.doc')) {
    return <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop" alt="Doc Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply" />;
  }
  if (lower.includes('.xls') || lower.includes('.csv')) {
     return <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=400&auto=format&fit=crop" alt="Planilha Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply" />;
  }
  if (lower.startsWith('http')) {
    return <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=400&auto=format&fit=crop" alt="Web Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply" />;
  }
  return <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format&fit=crop" alt="Preview genérico" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply" />;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "S/ Data";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

export function CriteriaManagement() {
  const [criteria, setCriteria] = useState<Criterion[]>(INITIAL_CRITERIA);
  const [groupBy, setGroupBy] = useState("none");
  const [actionModal, setActionModal] = useState<{open: boolean, id: string}>({open: false, id: ''});
  const [reasonText, setReasonText] = useState("");

  const [evidenceModal, setEvidenceModal] = useState<{open: boolean, id: string | null}>({open: false, id: null});
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [prevCycle, setPrevCycle] = useState("");
  
  const [evalRI, setEvalRI] = useState("");
  const [evalCAV, setEvalCAV] = useState("");
  const [evalCCQ, setEvalCCQ] = useState("");
  const [evalCCQDiscordance, setEvalCCQDiscordance] = useState("");
  
  const [showPrevDropdown, setShowPrevDropdown] = useState(false);

  const statuses = [
    { id: "pendente", title: "Pendente (RI)" },
    { id: "emAndamento", title: "Em Andamento (CAV)" },
    { id: "concluido", title: "Concluído (CCQ)" },
    { id: "validado", title: "Validado" },
  ];

  const handleToggleOptOut = (id: string, currentOptedOut: boolean) => {
    if (!isUserCAV) return; 

    const item = criteria.find(c => c.id === id);
    if (!item) return;

    const isTurningOff = !currentOptedOut;

    if (isTurningOff) {
      const activeDisc = criteria.filter(c => c.type === 'discretionary' && !c.optedOut);
      if (activeDisc.length <= 3) {
        alert("Atenção CAV: O sistema exige no mínimo 3 indicadores discricionários ativos para o ciclo. Você não pode desligar este.");
        return;
      }

      const checkRule = (ind1: string, ind2: string, dom: string) => {
        if (item.indicator === ind1 || item.indicator === ind2) {
          const otherInd = item.indicator === ind1 ? ind2 : ind1;
          const otherItem = criteria.find(c => c.domain === dom && c.type === "discretionary" && c.indicator === otherInd);
          if (otherItem && otherItem.optedOut) {
            alert(`Bloqueado: A matriz exige no mínimo 1 indicador selecionado entre o ${ind1} e o ${ind2} no Domínio ${dom}. O outro já encontra-se inativo.`);
            return true;
          }
        }
        return false;
      };

      if (checkRule("QATC 17", "QATC 18", "D")) return;
      if (checkRule("QATC 21", "QATC 22", "E")) return;
      if (checkRule("QATC 24", "QATC 25", "F")) return;
    }

    setCriteria(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          optedOut: isTurningOff,
          status: isTurningOff ? 'validado' : 'pendente',
          evaluationRI: isTurningOff ? '' : c.evaluationRI,
          evaluationCAV: isTurningOff ? '' : c.evaluationCAV,
          evaluationCCQ: isTurningOff ? '' : c.evaluationCCQ
        };
      }
      return c;
    }));
  };

  const moveStatus = (id: string, newStatus: string) => {
    setCriteria(prev => {
      const item = prev.find(c => c.id === id);
      if (!item || item.optedOut) return prev; 

      if (newStatus === "concluido" || newStatus === "validado") {
        if (!item.hasEvidence || (!item.evaluationRI && !item.evaluationCAV)) {
          alert(`Bloqueado: O critério ${item.id} precisa de evidência registrada e avaliação antes de avançar. Dê um duplo clique no card para preencher.`);
          return prev;
        }
      }
      
      // Ao avançar o status, limpa o aviso de "providências" no card.
      return prev.map(c => c.id === id ? { ...c, status: newStatus, reason: "" } : c);
    });
  };

  const handleOpenEvidence = (id: string) => {
    const item = criteria.find(c => c.id === id);
    if (item && !item.optedOut) {
      const initialEvidences = item.evidences && item.evidences.length > 0 
        ? item.evidences.map(ev => ({ ...ev, isEditing: false }))
        : [{ id: Math.random().toString(36).substring(7), name: "", fileOrUrl: "", date: "", isEditing: true }];
        
      setEvidenceList(initialEvidences);
      setPrevCycle(item.evidencePrev || "");
      
      setEvalRI(item.evaluationRI || "");
      setEvalCAV(item.evaluationCAV || "");
      setEvalCCQ(item.evaluationCCQ || "");
      setEvalCCQDiscordance(item.discordanceText || "");
      
      setShowPrevDropdown(false);
      setEvidenceModal({ open: true, id });
    }
  };

  const addEmptyEvidence = () => {
    setEvidenceList([...evidenceList, { id: Math.random().toString(36).substring(7), name: "", fileOrUrl: "", date: "", isEditing: true }]);
  };

  const updateEvidence = (id: string, field: keyof Evidence, value: any) => {
    setEvidenceList(prev => prev.map(ev => ev.id === id ? { ...ev, [field]: value } : ev));
  };

  const removeEvidence = (id: string) => {
    setEvidenceList(prev => {
      const filtered = prev.filter(ev => ev.id !== id);
      return filtered.length > 0 
        ? filtered 
        : [{ id: Math.random().toString(36).substring(7), name: "", fileOrUrl: "", date: "", isEditing: true }];
    });
  };

  const handleSaveEvidence = () => {
    setCriteria(prev => prev.map(c => {
      if (c.id === evidenceModal.id) {
        const validEvidences = evidenceList
          .filter(ev => ev.name.trim() !== "" || ev.fileOrUrl.trim() !== "")
          .map(({ isEditing, ...rest }) => rest);

        const hasEv = validEvidences.length > 0 || !!prevCycle.trim();
        
        return { 
          ...c, 
          evidences: validEvidences,
          evidencePrev: prevCycle,
          evaluationRI: evalRI,
          evaluationCAV: evalCAV,
          evaluationCCQ: evalCCQ,
          discordanceText: evalCCQDiscordance, // Salva o texto da CCQ caso preenchido
          hasEvidence: hasEv,
          evaluated: !!evalRI || !!evalCAV || !!evalCCQ
        };
      }
      return c;
    }));
    setEvidenceModal({ open: false, id: null });
  };

  const handleActionSubmit = () => {
    setCriteria(prev => prev.map(c => {
      if (c.id === actionModal.id) {
        // Modal de Providências: Retorna o card 1 fase para trás e registra o aviso no card
        const newStatus = c.status === 'concluido' ? 'emAndamento' : 'pendente';
        return { ...c, status: newStatus, reason: reasonText };
      }
      return c;
    }));
    setActionModal({open: false, id: ''});
    setReasonText("");
  };

  const currentCrit = criteria.find(c => c.id === evidenceModal.id);

  // --- HELPERS DA UI DE AVALIAÇÃO NO MODAL ---
  const renderReadOnlyEval = (title: string, value: string) => {
    if (!value) return null;
    const isAtende = value === 'atende';
    const isNaoAtende = value === 'nao_atende';
    
    return (
      <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
        <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
          {isAtende ? <Check size={14} className="text-emerald-500" /> : isNaoAtende ? <X size={14} className="text-red-500" /> : <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-slate-400 text-slate-400 flex items-center justify-center text-[6px] font-bold">NA</div>}
          {title}
        </span>
        <span className={clsx(
          "text-xs font-bold px-2 py-1 rounded",
          isAtende ? "bg-emerald-100 text-emerald-700" :
          isNaoAtende ? "bg-red-100 text-red-700" :
          "bg-slate-100 text-slate-600"
        )}>
          {isAtende ? "Atende" : isNaoAtende ? "Não Atende" : "Não se Aplica"}
        </span>
      </div>
    );
  };

  const renderEditableEval = (title: string, stateValue: string, setStateFn: (val: string) => void) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3">
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 sm:mb-0">
        <ListChecks size={16} className="text-slate-400" /> {title}
      </label>
      <div className="flex bg-slate-100/70 p-1 rounded-lg border border-slate-200/60 w-full sm:w-auto">
        <label className={clsx("flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center justify-center", stateValue === 'atende' ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50")}>
          <input type="radio" name="active_eval" value="atende" className="hidden" checked={stateValue === 'atende'} onChange={(e) => setStateFn(e.target.value)} />
          Atende
        </label>
        
        <label className={clsx("flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center justify-center", stateValue === 'nao_atende' ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50")}>
          <input type="radio" name="active_eval" value="nao_atende" className="hidden" checked={stateValue === 'nao_atende'} onChange={(e) => setStateFn(e.target.value)} />
          Não Atende
        </label>
        
        <label className={clsx("flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center justify-center", stateValue === 'na' ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50")}>
          <input type="radio" name="active_eval" value="na" className="hidden" checked={stateValue === 'na'} onChange={(e) => setStateFn(e.target.value)} />
          N/A
        </label>
      </div>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full relative">
        <header className="mb-6 flex justify-between items-end px-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gestão dos Critérios</h1>
            <p className="text-slate-500">Acompanhamento e avaliação visual do MMD-TC</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500">Agrupe por:</span>
            <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-sm">
              <button onClick={() => setGroupBy("none")} className={clsx("px-4 py-1.5 rounded-full text-xs font-bold transition-all", groupBy === "none" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-800")}>Nenhum</button>
              <button onClick={() => setGroupBy("domain")} className={clsx("px-4 py-1.5 rounded-full text-xs font-bold transition-all", groupBy === "domain" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-800")}>Domínio</button>
              <button onClick={() => setGroupBy("dimension")} className={clsx("px-4 py-1.5 rounded-full text-xs font-bold transition-all", groupBy === "dimension" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-800")}>Dimensão</button>
              <button onClick={() => setGroupBy("indicator")} className={clsx("px-4 py-1.5 rounded-full text-xs font-bold transition-all", groupBy === "indicator" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-800")}>Indicador / QATC</button>
            </div>
          </div>
        </header>

        {/* KANBAN RENDER AREA */}
        {groupBy === 'none' ? (
          <div className="flex-1 grid grid-cols-4 gap-6 overflow-hidden pb-4 px-2">
            {statuses.map(col => (
              <KanbanColumn key={col.id} id={col.id} title={col.title} items={criteria.filter(c => c.status === col.id)} onDrop={moveStatus} onOpenAction={(id: string) => setActionModal({open: true, id})} onOpenEvidence={handleOpenEvidence} onToggleOptOut={handleToggleOptOut} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden pb-4 px-2">
            <div className="grid grid-cols-4 gap-6 px-4 mb-3">
              {statuses.map(col => (
                <div key={col.id} className="font-bold text-slate-700 text-sm flex justify-between items-center">
                  {col.title}
                  <span className="bg-slate-200/60 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{criteria.filter(c => c.status === col.id).length}</span>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-1">
              {Array.from(new Set(criteria.map(c => c[groupBy as keyof Criterion]))).sort().map(groupVal => {
                const groupItems = criteria.filter(c => c[groupBy as keyof Criterion] === groupVal);
                const headerBg = "bg-slate-700 text-white";

                return (
                  <div key={groupVal as string} className="bg-white/40 backdrop-blur-md border border-white shadow-sm rounded-[2rem] p-3 flex flex-col gap-3">
                    <div className={clsx("w-full px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center justify-between", headerBg)}>
                      <span>{groupBy === 'domain' ? 'Domínio' : groupBy === 'dimension' ? 'Dimensão' : 'Indicador / QATC'}: {groupVal as string}</span>
                      <span className="bg-black/10 px-2.5 py-0.5 rounded-full text-xs font-bold">{groupItems.length}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                      {statuses.map(col => (
                        <KanbanColumn key={`${groupVal}-${col.id}`} id={col.id} title={col.title} items={groupItems.filter(c => c.status === col.id)} onDrop={moveStatus} onOpenAction={(id: string) => setActionModal({open: true, id})} onOpenEvidence={handleOpenEvidence} onToggleOptOut={handleToggleOptOut} hideHeader={true} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* DICA DISCRETA NO RODAPÉ */}
        <div className="mt-4 flex justify-end px-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info size={14} className="shrink-0 text-slate-400" />
            <span><strong className="text-slate-600 font-semibold">Dica:</strong> Dê um duplo clique no card para inserir evidências. {isUserCAV && "A CAV pode usar o botão no card para desligar indicadores discricionários."}</span>
          </div>
        </div>

        {/* MODAL DE EVIDÊNCIAS E AVALIAÇÃO */}
        {evidenceModal.open && currentCrit && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl max-w-3xl w-full border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">Critério {currentCrit.id}</span>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight pr-6">{currentCrit.title}</h3>
                </div>
                <button onClick={() => setEvidenceModal({open: false, id: null})} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors shrink-0">
                  <X size={20} />
                </button>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-8 text-sm">
                <p className="text-slate-700 font-bold mb-1 flex items-center gap-1.5"><Info size={16} className="text-slate-400" /> O que se espera como comprovação deste critério:</p>
                <p className="text-slate-600 mb-3 leading-relaxed">{currentCrit.expectedProof || "Documentação legal comprovando os requisitos exigidos."}</p>
                
                <p className="text-slate-700 font-bold mb-1 flex items-center gap-1.5"><Paperclip size={16} className="text-slate-400" /> Exemplos de evidências aceitas:</p>
                <p className="text-slate-600 leading-relaxed">{currentCrit.evidenceExamples || "Portarias, Resoluções, Leis ou Atos oficiais."}</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <UploadCloud size={18} className="text-slate-500" /> Evidências Anexadas ao Critério
                    </label>
                    <div className="flex items-center gap-2">
                      {prevCycle ? (
                        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg pl-3 pr-1 py-1 shadow-sm">
                          <History size={14} className="text-slate-500" />
                          <span className="text-xs font-semibold text-slate-700 max-w-[150px] truncate" title={prevCycle}>{prevCycle}</span>
                          <button onClick={() => setPrevCycle("")} className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-red-500 transition-colors">
                             <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <button 
                            onClick={() => PREVIOUS_FILES.length > 0 && setShowPrevDropdown(!showPrevDropdown)}
                            className={clsx(
                              "text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border",
                              PREVIOUS_FILES.length > 0 
                                ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 shadow-sm" 
                                : "bg-transparent text-slate-400 border-transparent opacity-60 cursor-not-allowed"
                            )}
                          >
                            <History size={14} /> Resgatar Anterior
                          </button>
                          
                          {showPrevDropdown && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setShowPrevDropdown(false)}></div>
                              <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase px-3 mb-1">Arquivos Disponíveis</p>
                                {PREVIOUS_FILES.map(file => (
                                  <button key={file} onClick={() => { setPrevCycle(file); setShowPrevDropdown(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors truncate">
                                    {file}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      <button onClick={addEmptyEvidence} className="text-xs font-bold text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm">
                        <Plus size={14} /> Nova
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {evidenceList.map((ev, index) => {
                      if (ev.isEditing) {
                        return (
                          <div key={ev.id} className="col-span-full bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-0 relative shadow-sm">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-300">#{index + 1}</span>
                              <button onClick={() => removeEvidence(ev.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1 bg-white rounded-md hover:bg-red-50" title="Remover evidência"><Trash2 size={16} /></button>
                            </div>
                            <div className="w-full border-2 border-dashed border-slate-200 rounded-xl py-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer mb-4 mt-2">
                              <UploadCloud size={24} className="mb-2 text-slate-400" />
                              <span className="text-sm font-medium text-slate-600">Arraste o arquivo aqui ou clique para selecionar</span>
                            </div>
                            <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100 flex flex-col gap-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Nome da evidência</label>
                                  <input value={ev.name} onChange={e => updateEvidence(ev.id, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Ex: Portaria nº 123/2024" />
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Data de referência</label>
                                  <input type="date" value={ev.date} onChange={e => updateEvidence(ev.id, 'date', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-600" />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Link comprobatório</label>
                                <div className="relative">
                                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input value={ev.fileOrUrl} onChange={e => updateEvidence(ev.id, 'fileOrUrl', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Caso prefira, insira uma URL válida aqui..." />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <button onClick={() => updateEvidence(ev.id, 'isEditing', false)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-900 transition-colors">OK</button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={ev.id} className="relative group border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col bg-white h-48 hover:border-slate-300 transition-all hover:shadow-md">
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => updateEvidence(ev.id, 'isEditing', true)} className="p-1.5 bg-white/90 backdrop-blur rounded-md shadow-sm text-slate-600 hover:text-blue-600 border border-slate-100" title="Editar informações"><Edit2 size={14} /></button>
                            <button onClick={() => removeEvidence(ev.id)} className="p-1.5 bg-white/90 backdrop-blur rounded-md shadow-sm text-slate-600 hover:text-red-500 border border-slate-100" title="Remover evidência"><Trash2 size={14} /></button>
                          </div>
                          <div className="flex-1 bg-slate-100 relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                            {getFileThumbnail(ev.fileOrUrl)}
                            {ev.fileOrUrl && (
                              <div className="absolute top-2 left-2 bg-slate-800/80 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase">
                                {ev.fileOrUrl.startsWith('http') ? 'LINK' : ev.fileOrUrl.split('.').pop()?.substring(0,4) || 'FILE'}
                              </div>
                            )}
                          </div>
                          <div className="p-3 border-t border-slate-100 bg-white">
                            <p className="text-xs font-bold text-slate-700 truncate mb-0.5" title={ev.name}>{ev.name || "Sem Nome"}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><Calendar size={10}/> {formatDate(ev.date)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* --- SEÇÃO: AVALIAÇÃO E HISTÓRICO COMPACTO --- */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  
                  {/* Histórico Leitura */}
                  {(currentCrit.status !== 'pendente') && (
                    <div className="bg-white border border-slate-200 rounded-xl px-4 py-1 mb-4 shadow-sm">
                      {currentCrit.status !== 'pendente' && renderReadOnlyEval("Avaliação Prévia (RI)", evalRI)}
                      {(currentCrit.status === 'concluido' || currentCrit.status === 'validado') && renderReadOnlyEval("Avaliação (CAV)", evalCAV)}
                      
                      {currentCrit.status === 'validado' && (
                        <>
                          {renderReadOnlyEval("Avaliação Final (CCQ)", evalCCQ)}
                          {/* Exibe de forma discreta a justificativa da CCQ, se existir */}
                          {currentCrit.discordanceText && (
                            <div className="mb-3 mt-1 px-1">
                              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-600">
                                <strong className="text-slate-700 block mb-0.5">Justificativa / Observação (CCQ):</strong>
                                {currentCrit.discordanceText}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Inputs liberados apenas para a fase ativa */}
                  {(currentCrit.status === 'pendente') && renderEditableEval("Sua Avaliação (RI)", evalRI, setEvalRI)}
                  
                  {currentCrit.status === 'emAndamento' && renderEditableEval("Sua Avaliação (CAV)", evalCAV, setEvalCAV)}
                  
                  {currentCrit.status === 'concluido' && (
                    <div className="space-y-4">
                      {renderEditableEval("Sua Avaliação (CCQ)", evalCCQ, setEvalCCQ)}
                      
                      {/* Campo Opcional de Justificativa/Discordância da CCQ */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                          <Edit2 size={16} className="text-slate-400" /> Justificativa / Discordância (Opcional)
                        </label>
                        <p className="text-xs text-slate-500 mb-3">Caso não concorde com a avaliação da CAV ou queira adicionar observações sobre a pontuação, registre abaixo.</p>
                        <textarea 
                          value={evalCCQDiscordance}
                          onChange={(e) => setEvalCCQDiscordance(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                          placeholder="Digite sua justificativa..."
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
              
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                <button onClick={() => setEvidenceModal({open: false, id: null})} className="px-6 py-3 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
                <button onClick={handleSaveEvidence} className="px-8 py-3 rounded-full text-sm font-bold bg-slate-800 text-white hover:bg-slate-900 shadow-md shadow-slate-800/10 transition-all">Concluir</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Ações secundárias (Somente Devolver para Providências) */}
        {actionModal.open && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-[2.5rem]">
            <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border border-slate-100 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">
                  Devolver para Providências
                </h3>
                <button onClick={() => setActionModal({open: false, id: ''})} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <textarea 
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-inner min-h-[100px] mb-6" 
                placeholder="Descreva a ação a ser tomada (Ex: Falta anexar a portaria x)..."
              ></textarea>
              <div className="flex justify-end gap-3">
                <button onClick={() => setActionModal({open: false, id: ''})} className="px-5 py-2.5 rounded-full text-sm font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button onClick={handleActionSubmit} disabled={!reasonText.trim()} className="px-5 py-2.5 rounded-full text-sm font-bold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

function KanbanColumn({ id, title, items, onDrop, onOpenAction, onOpenEvidence, onToggleOptOut, hideHeader = false }: any) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item: any) => onDrop(item.id, id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  }));

  return (
    <div ref={drop as any} className={clsx("bg-white/40 backdrop-blur-md shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300", hideHeader ? "rounded-2xl p-2 min-h-[140px] border border-transparent" : "rounded-[2rem] p-4 border border-white", isOver && "border-slate-400 bg-slate-100/60 ring-4 ring-slate-200")}>
      {!hideHeader && (
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-slate-700">{title}</h3>
        </div>
      )}
      <div className={clsx("flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide", hideHeader ? "pb-2" : "pb-10")}>
        {items.map((item: any) => (
          <KanbanCard key={item.id} {...item} onOpenAction={onOpenAction} onMove={onDrop} onOpenEvidence={onOpenEvidence} onToggleOptOut={onToggleOptOut} />
        ))}
        {items.length === 0 && (
          <div className="h-full min-h-[80px] border-2 border-dashed border-slate-300/40 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">Solte aqui</div>
        )}
      </div>
    </div>
  );
}

function KanbanCard({ id, title, domain, indicator, type, hasEvidence, evaluated, status, evaluationRI, evaluationCAV, evaluationCCQ, optedOut, reason, onOpenAction, onMove, onOpenEvidence, onToggleOptOut }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id },
    canDrag: !optedOut && status !== 'validado', // Impede de arrastar cards já validados ou desligados
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
  }));

  const getDomainColor = (d: string) => {
    if (optedOut) return 'bg-slate-100 text-slate-400 border-slate-200';
    const colors: any = {
      'A': 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20',
      'B': 'bg-[#1565C0]/10 text-[#1565C0] border-[#1565C0]/20',
      'C': 'bg-[#F9A825]/10 text-[#F9A825] border-[#F9A825]/20',
      'D': 'bg-[#6A1B9A]/10 text-[#6A1B9A] border-[#6A1B9A]/20',
      'E': 'bg-[#00838F]/10 text-[#00838F] border-[#00838F]/20',
      'F': 'bg-[#C62828]/10 text-[#C62828] border-[#C62828]/20',
    };
    return colors[d] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const handleSubmeter = () => {
    const nextStatus = status === 'pendente' ? 'emAndamento' : status === 'emAndamento' ? 'concluido' : 'validado';
    onMove(id, nextStatus);
    setShowMenu(false);
  };

  const getEvalColor = (isActive: boolean, val: string) => {
    if (!isActive) return "bg-slate-100 text-slate-400 border border-slate-200";
    if (val === 'atende') return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (val === 'nao_atende') return "bg-red-100 text-red-700 border border-red-200";
    if (val === 'na') return "bg-slate-200 text-slate-700 border border-slate-300";
    return "bg-slate-100 text-slate-400";
  };

  const getEvalIcon = (val: string) => {
    if (val === 'nao_atende') return <X size={10} />;
    if (val === 'na') return <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-current flex items-center justify-center text-[5px] font-bold">NA</div>;
    return <Check size={10} />;
  };

  const ccqActive = !!evaluationCCQ;
  const cavActive = !!evaluationCAV && !evaluationCCQ;
  const riActive = !!evaluationRI && !evaluationCAV && !evaluationCCQ;

  const isTargetDiscretionary = type === 'discretionary' && ['D', 'E', 'F'].includes(domain);

  return (
    <div 
      ref={drag as any} 
      onDoubleClick={() => !optedOut && onOpenEvidence(id)}
      className={clsx(
        "rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border transition-all relative select-none", 
        optedOut ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white cursor-grab active:cursor-grabbing hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-slate-300",
        isDragging && "opacity-40 border-slate-300 scale-95 shadow-none"
      )}
      title={optedOut ? "Critério não avaliado neste ciclo" : "Duplo clique para abrir evidências e avaliar"}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-md border", getDomainColor(domain))}>Dom {domain}</span>
          
          {isTargetDiscretionary && (
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleOptOut(id, !!optedOut); }}
                disabled={!isUserCAV}
                className={clsx(
                  "relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none",
                  !optedOut ? "bg-emerald-500" : "bg-slate-300",
                  !isUserCAV && "opacity-50 cursor-not-allowed"
                )}
                title={!isUserCAV ? "Apenas membros da CAV podem alterar" : !optedOut ? "Desligar indicador (Não Avaliado)" : "Ligar indicador"}
              >
                <span className={clsx("inline-block h-3 w-3 transform rounded-full bg-white transition-transform", !optedOut ? "translate-x-3.5" : "translate-x-0.5")} />
              </button>
            </div>
          )}
        </div>
        
        {/* MENU TRÊS PONTOS BLINDADO POR FASE */}
        {!optedOut && status !== 'validado' && (
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} 
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
            >
              <MoreHorizontal size={18} />
            </button>
            
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}></div>
                <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2 animate-in fade-in slide-in-from-top-2">
                  
                  {/* FASE: PENDENTE OU EM ANDAMENTO (SUBMETER) */}
                  {(status === 'pendente' || status === 'emAndamento') && (
                    <button onClick={(e) => { e.stopPropagation(); handleSubmeter(); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                      Submeter <span className="opacity-50">&rarr;</span>
                    </button>
                  )}

                  {/* FASE: CONCLUÍDO (ENCERRAR) */}
                  {status === 'concluido' && (
                    <button onClick={(e) => { e.stopPropagation(); handleSubmeter(); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center justify-between">
                      Encerrar <span className="opacity-50">&rarr;</span>
                    </button>
                  )}

                  {/* FASE: EM ANDAMENTO OU CONCLUÍDO (PROVIDÊNCIAS) */}
                  {(status === 'emAndamento' || status === 'concluido') && (
                    <button onClick={(e) => { e.stopPropagation(); onOpenAction(id); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 border-t border-slate-100">
                      Para Providências
                    </button>
                  )}

                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className={clsx("text-[10px] font-semibold mb-1 flex items-center gap-1", optedOut ? "text-slate-400" : "text-slate-400")}>{id} • {indicator}</div>
      <h4 className={clsx("font-semibold text-sm leading-tight mb-3", optedOut ? "text-slate-500 line-through" : "text-slate-800")}>{title}</h4>
      
      {/* EXIBIÇÃO DO ALERTA DE PROVIDÊNCIAS (SE HOUVER) */}
      {!optedOut && reason && (
        <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-2.5 flex items-start gap-2 mb-3">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5">Ação Necessária:</span>
            <p className="text-[11px] text-amber-700 leading-tight">{reason}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {optedOut ? (
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded-md">
             Não Avaliado
          </div>
        ) : (
          <>
            {hasEvidence && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200" title="Tem evidência">
                <Paperclip size={10} /> Evidência
              </div>
            )}
            
            {!!evaluationRI && (
              <div className={clsx("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-colors", getEvalColor(riActive, evaluationRI))} title="Avaliação RI">
                {getEvalIcon(evaluationRI)} RI
              </div>
            )}

            {!!evaluationCAV && (
              <div className={clsx("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-colors", getEvalColor(cavActive, evaluationCAV))} title="Avaliação CAV">
                {getEvalIcon(evaluationCAV)} CAV
              </div>
            )}

            {!!evaluationCCQ && (
              <div className={clsx("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-colors", getEvalColor(ccqActive, evaluationCCQ))} title="Validação CCQ">
                {getEvalIcon(evaluationCCQ)} CCQ
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}