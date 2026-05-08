import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, Paperclip, Check, Info, AlertTriangle, X } from "lucide-react";
import clsx from "clsx";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Simulação de banco de dados
const INITIAL_CRITERIA = [
  { id: "1.1.1", title: "Composição por origem de vaga", domain: "A", type: "mandatory", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: true, reason: "" },
  { id: "1.1.2", title: "Indicação de Conselheiros", domain: "A", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: false, method: "", reason: "" },
  { id: "2.3.1", title: "Planejamento Estratégico Institucional", domain: "B", type: "mandatory", status: "emAndamento", hasEvidence: true, evaluated: false, validated: false, included: true, reason: "" },
  { id: "3.1.4", title: "Auditoria de Gestão Financeira", domain: "C", type: "discretionary", status: "pendente", hasEvidence: false, evaluated: false, validated: false, included: false, method: "", reason: "" },
  { id: "4.2.1", title: "Acompanhamento de Obras Paralisadas", domain: "D", type: "mandatory", status: "concluido", hasEvidence: true, evaluated: true, validated: false, included: true, reason: "" },
  { id: "1.2.1", title: "Garantias e Prerrogativas", domain: "A", type: "mandatory", status: "validado", hasEvidence: true, evaluated: true, validated: true, included: true, reason: "" },
];

export function CriteriaManagement() {
  const [activeTab, setActiveTab] = useState("selecao");
  const [criteria, setCriteria] = useState(INITIAL_CRITERIA);
  const [actionModal, setActionModal] = useState<{open: boolean, id: string, type: 'ccq' | 'cav' | null}>({open: false, id: '', type: null});
  const [reasonText, setReasonText] = useState("");

  // Alternar inclusão de critérios discricionários
  const toggleInclude = (id: string) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, included: !c.included } : c));
  };

  // Registrar Evidência
  const addEvidence = (id: string) => {
    setCriteria(prev => prev.map(c => 
      c.id === id ? { ...c, hasEvidence: true, status: c.status === 'pendente' || c.status === 'providencias' ? 'emAndamento' : c.status, reason: "" } : c
    ));
  };

  // Avaliar Critério
  const evaluate = (id: string) => {
    setCriteria(prev => prev.map(c => 
      c.id === id ? { ...c, evaluated: true } : c
    ));
  };

  // Mover no Kanban via Drag and Drop
  const moveStatus = (id: string, newStatus: string) => {
    setCriteria(prev => {
      const item = prev.find(c => c.id === id);
      if (!item) return prev;

      // Regra de negócio: Para ir a "Concluído", precisa de evidência e avaliação.
      if (newStatus === "concluido" || newStatus === "validado") {
        if (!item.hasEvidence || !item.evaluated) {
          alert(`Bloqueado: O critério ${item.id} precisa de evidência registrada e avaliação da CAV antes de ser movido para Concluído/Validado.`);
          return prev;
        }
      }

      return prev.map(c => c.id === id ? { ...c, status: newStatus } : c);
    });
  };

  const handleActionSubmit = () => {
    setCriteria(prev => prev.map(c => {
      if (c.id === actionModal.id) {
        if (actionModal.type === 'ccq') {
          return { ...c, status: 'pendente', evaluated: false, validated: false, reason: reasonText };
        } else if (actionModal.type === 'providencias') {
          return { ...c, status: 'providencias', hasEvidence: false, evaluated: false, validated: false, reason: reasonText };
        }
      }
      return c;
    }));
    setActionModal({open: false, id: '', type: null});
    setReasonText("");
  };

  return (
    <div className="flex flex-col h-full relative">
      <header className="mb-6 flex justify-between items-center px-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gestão dos Critérios</h1>
          <p className="text-slate-500">Acompanhamento, simulação e avaliação</p>
        </div>
        
        <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-white shadow-sm">
          <button 
            onClick={() => setActiveTab("selecao")}
            className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all relative", activeTab === "selecao" ? "bg-slate-800 shadow-sm text-white" : "text-slate-500 hover:bg-slate-800 hover:text-white")}
          >
            1. Seleção Discricionária
          </button>
          <button 
            onClick={() => setActiveTab("gestao")}
            className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all relative", activeTab === "gestao" ? "bg-slate-800 shadow-sm text-white" : "text-slate-500 hover:bg-slate-800 hover:text-white")}
          >
            2. Evidências e Avaliação
          </button>
          <button 
            onClick={() => setActiveTab("kanban")}
            className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all relative", activeTab === "kanban" ? "bg-slate-800 shadow-sm text-white" : "text-slate-500 hover:bg-slate-800 hover:text-white")}
          >
            3. Kanban (Drag & Drop)
          </button>
        </div>
      </header>

      {/* Global Filters */}
      <div className="flex gap-4 mb-6 px-2">
        <div className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full px-4 py-2 flex items-center gap-2 flex-1 max-w-md">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Buscar critérios..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700" />
        </div>
        <button className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full px-6 py-2 flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-white transition-colors">
          <Filter size={16} /> Filtros
        </button>
      </div>

      {activeTab === "selecao" && <SelecaoTab criteria={criteria} onToggleInclude={toggleInclude} />}
      {activeTab === "gestao" && <GestaoTab criteria={criteria} onAddEvidence={addEvidence} onEvaluate={evaluate} />}
      {activeTab === "kanban" && <KanbanTab criteria={criteria} onMove={moveStatus} onOpenAction={(id: string, type: 'ccq' | 'providencias') => setActionModal({open: true, id, type})} />}

      {actionModal.open && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-[2.5rem]">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">
                {actionModal.type === 'ccq' ? 'Discordar da Conclusão' : 'Devolver para Providências'}
              </h3>
              <button onClick={() => setActionModal({open: false, id: '', type: null})} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">
              {actionModal.type === 'ccq' 
                ? 'O card voltará para "Pendente" no Kanban para ser revisado.' 
                : 'O card sairá do Kanban e voltará para a guia de Evidências aguardando providências do responsável.'}
            </p>

            <label className="block text-sm font-semibold text-slate-700 mb-2">Motivo / Orientação:</label>
            <textarea 
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner min-h-[100px] mb-6" 
              placeholder="Descreva o que precisa ser ajustado..."
            ></textarea>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setActionModal({open: false, id: '', type: null})}
                className="px-5 py-2.5 rounded-full text-sm font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleActionSubmit}
                disabled={!reasonText.trim()}
                className="px-5 py-2.5 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SelecaoTab({ criteria, onToggleInclude }: any) {
  const disc = criteria.filter((c: any) => c.type === "discretionary");
  
  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-8 px-2">
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-800 mb-6">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm"><strong>Passo 1:</strong> Selecione quais indicadores discricionários serão avaliados no ciclo atual. Uma vez incluídos, eles aparecerão nas próximas abas para recebimento de evidências.</p>
      </div>

      {disc.map((c: any) => (
        <div key={c.id} className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl p-6 flex flex-col gap-4 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200/50">Discricionário</span>
              <h3 className="text-xl font-bold text-slate-800 mt-3">{c.id} - {c.title}</h3>
              <p className="text-sm text-slate-500 mt-1">Vinculado ao Domínio {c.domain}</p>
            </div>
            <button
              onClick={() => onToggleInclude(c.id)}
              className={clsx("px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2", 
                c.included ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {c.included && <Check size={16} />}
              {c.included ? "Incluído no Ciclo" : "Adicionar ao Ciclo"}
            </button>
          </div>
          {c.included && (
            <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Como este indicador será avaliado pelo Tribunal?</label>
              <textarea 
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm" 
                rows={2} 
                placeholder="Descreva a metodologia ou portaria interna..."
              ></textarea>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GestaoTab({ criteria, onAddEvidence, onEvaluate }: any) {
  // Lista apenas obrigatórios ou discricionários que foram incluídos
  const active = criteria.filter((c: any) => c.type === "mandatory" || c.included);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-8 px-2">
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-emerald-800 mb-6">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm"><strong>Passo 2:</strong> Para os critérios ativos, você deve primeiro <strong>Registrar Evidência</strong> e, em seguida, registrar a <strong>Avaliação da CAV</strong>. Somente critérios com ambos podem ser movidos para concluído no Kanban.</p>
      </div>

      {active.map((c: any) => (
        <div key={c.id} className={clsx("backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[2rem] p-6", c.status === 'providencias' ? "bg-amber-50/80 border-amber-200" : "bg-white/80 border-white")}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <span className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-100 shadow-inner">
                {c.domain}
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{c.id} - {c.title}</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {c.type === 'mandatory' ? 'Obrigatório' : 'Discricionário (Ativo)'}
                </span>
                {c.status === 'providencias' && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-1 ml-2 inline-flex items-center gap-1">
                    <AlertTriangle size={12} /> Aguardando Providências
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {c.hasEvidence && <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Paperclip size={12} /> 1 Evidência Registrada</span>}
              {c.evaluated && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Check size={12} /> Avaliação CAV</span>}
            </div>
          </div>

          {c.reason && (
             <div className="mb-4 bg-amber-100/50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-sm">
               <strong>Motivo do retorno:</strong> {c.reason}
             </div>
          )}

          <div className="flex gap-4 pt-4 border-t border-slate-100/50">
            <button
              onClick={() => onAddEvidence(c.id)}
              disabled={c.hasEvidence}
              className={clsx(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                c.hasEvidence 
                  ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
              )}
            >
              <Paperclip size={16} /> {c.hasEvidence ? 'Evidência Anexada' : '1. Adicionar Evidência'}
            </button>
            <button
              onClick={() => onEvaluate(c.id)}
              disabled={!c.hasEvidence || c.evaluated}
              className={clsx(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                c.evaluated 
                  ? "bg-emerald-50 text-emerald-500 border border-emerald-200 cursor-not-allowed" 
                  : !c.hasEvidence 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
              )}
              title={!c.hasEvidence ? 'Anexe evidência primeiro' : ''}
            >
              <Check size={16} /> {c.evaluated ? 'Avaliado' : '2. Avaliar Critério (CAV)'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanTab({ criteria, onMove, onOpenAction }: any) {
  const active = criteria.filter((c: any) => (c.type === "mandatory" || c.included) && c.status !== "providencias");
  
  const columns = [
    { id: "pendente", title: "Pendente", items: active.filter((c: any) => c.status === "pendente") },
    { id: "emAndamento", title: "Em Andamento", items: active.filter((c: any) => c.status === "emAndamento") },
    { id: "concluido", title: "Concluído", items: active.filter((c: any) => c.status === "concluido") },
    { id: "validado", title: "Validado (CCQ)", items: active.filter((c: any) => c.status === "validado") },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-2 mb-4">
        <p className="text-sm text-slate-500 flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          <strong>Passo 3:</strong> Arraste e solte os cards entre as colunas. Lembre-se: a transição para "Concluído" é bloqueada se o critério não tiver evidência e avaliação.
        </p>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-6 overflow-hidden pb-4 px-2">
        {columns.map(col => (
          <KanbanColumn key={col.id} id={col.id} title={col.title} items={col.items} onDrop={onMove} onOpenAction={onOpenAction} />
        ))}
      </div>
    </DndProvider>
  );
}

function KanbanColumn({ id, title, items, onDrop, onOpenAction }: any) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item: any) => onDrop(item.id, id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  }));

  return (
    <div 
      ref={drop} 
      className={clsx(
        "bg-white/40 backdrop-blur-md border shadow-sm rounded-[2rem] p-4 flex flex-col h-full overflow-hidden transition-all duration-300", 
        isOver ? "border-blue-400 bg-blue-50/60 ring-4 ring-blue-500/10" : "border-white"
      )}
    >
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <span className="bg-white text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-slate-100">{items.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide pb-10">
        {items.map((item: any) => (
          <KanbanCard key={item.id} {...item} onOpenAction={onOpenAction} onMove={onDrop} />
        ))}
        {items.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-300/50 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium">
            Solte aqui
          </div>
        )}
      </div>
    </div>
  );
}

function KanbanCard({ id, title, domain, hasEvidence, evaluated, validated, status, onOpenAction, onMove }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
  }));

  const getDomainColor = (d: string) => {
    const colors: any = {
      'A': 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20',
      'B': 'bg-[#1565C0]/10 text-[#1565C0] border-[#1565C0]/20',
      'C': 'bg-[#F9A825]/10 text-[#F9A825] border-[#F9A825]/20',
      'D': 'bg-[#6A1B9A]/10 text-[#6A1B9A] border-[#6A1B9A]/20',
    };
    return colors[d] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const handleSubmeter = () => {
    const nextStatus = status === 'pendente' ? 'emAndamento' : status === 'emAndamento' ? 'concluido' : 'validado';
    onMove(id, nextStatus);
    setShowMenu(false);
  };

  return (
    <div 
      ref={drag} 
      className={clsx(
        "bg-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border transition-all cursor-grab active:cursor-grabbing group select-none relative", 
        isDragging ? "opacity-40 border-blue-400 scale-95 shadow-none" : "border-slate-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={clsx("text-xs font-bold px-2 py-0.5 rounded-md border", getDomainColor(domain))}>
          Dom {domain}
        </span>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            onBlur={() => setTimeout(() => setShowMenu(false), 200)}
            className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-6 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2 animate-in fade-in slide-in-from-top-2">
              <button 
                onMouseDown={handleSubmeter}
                className="w-full text-left px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 flex items-center justify-between"
              >
                Submeter <span className="opacity-50">&rarr;</span>
              </button>
              <button 
                onMouseDown={() => onOpenAction(id, 'ccq')}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Discordar
              </button>
              <button 
                onMouseDown={() => onOpenAction(id, 'providencias')}
                className="w-full text-left px-4 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50"
              >
                Para Providências
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs font-semibold text-slate-400 mb-1">{id}</div>
      <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-4">{title}</h4>
      
      <div className="flex gap-2 flex-wrap">
        {hasEvidence && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md" title="Tem evidência">
            <Paperclip size={10} /> Evidência
          </div>
        )}
        {evaluated && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md" title="Avaliado CAV">
            <Check size={10} /> CAV
          </div>
        )}
        {validated && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md" title="Validado CCQ">
            <Check size={10} /> CCQ
          </div>
        )}
      </div>
    </div>
  );
}
