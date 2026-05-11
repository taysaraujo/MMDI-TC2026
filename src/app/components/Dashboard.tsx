import React from "react";
import { Plus, MessageSquare, HelpCircle, Settings, CheckCircle2, ChevronRight, TrendingUp, Calendar, AlertCircle, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Dom A", val: 80 },
  { name: "Dom B", val: 45 },
  { name: "Dom C", val: 65 },
  { name: "Dom D", val: 90 },
  { name: "Dom E", val: 30 },
  { name: "Dom F", val: 70 },
];

const topPractices = [
  { id: 1, name: "Painel de Obras Públicas", tc: "TCE-SP", stars: 4.9 },
  { id: 2, name: "Auditoria Contínua com IA", tc: "TCU", stars: 4.8 },
  { id: 3, name: "Sistema Integrado de Ouvidoria", tc: "TCE-PR", stars: 3.5 },
];

export function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex justify-between items-end mb-8 px-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">Bom dia, Roberto!</h1>
          <p className="text-slate-500 text-lg">Vamos tornar este ciclo de avaliação produtivo.</p>
        </div>

        <div className="flex gap-12 items-center">
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-medium mb-1">Critérios avaliados</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-800">142</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-medium mb-1">Prazo Restante</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-800">18</span>
              <span className="text-slate-500 text-lg">dias</span>
            </div>
          </div>
          <button className="bg-slate-800 text-white px-6 py-4 rounded-full font-medium hover:bg-slate-900 transition-colors shadow-lg shadow-slate-800/20 flex items-center gap-2">
            <Plus size={20} />
            Nova Tarefa
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Gantt / Timeline Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white border-b-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Plano de Trabalho</h3>
                <p className="text-sm text-slate-500">Acompanhamento do cronograma MMDI-TC</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600">
                <Calendar size={18} />
              </button>
            </div>

            {/* Timeline UI Fake */}
            <div className="relative pt-6 pb-2">
              {/* Header times */}
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-6 pl-24">
                <span>Mai 01</span>
                <span>Mai 08</span>
                <span>Mai 15</span>
                <span className="text-slate-800 font-bold">Hoje</span>
                <span>Mai 29</span>
                <span>Jun 05</span>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 left-24 flex justify-between pointer-events-none mt-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`w-px h-full ${i === 4 ? 'bg-slate-800' : 'bg-slate-200/60 border-dashed border-l border-slate-300'}`}></div>
                ))}
              </div>

              {/* Tasks */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-right text-sm font-medium text-slate-600">Seleção</div>
                  <div className="h-14 bg-[#e8f5e9] border border-[#c8e6c9] rounded-2xl w-1/3 flex items-center px-4 shadow-sm">
                    <div>
                      <div className="text-sm font-bold text-[#2E7D32]">Indicadores Disc.</div>
                      <div className="text-xs text-[#4CAF50]">Concluído</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-right text-sm font-medium text-slate-600">Evidências</div>
                  <div className="h-14 w-1/4"></div>
                  <div className="h-14 bg-[#e3f2fd] border border-[#bbdefb] rounded-2xl w-1/2 flex items-center px-4 shadow-sm relative">
                    <div>
                      <div className="text-sm font-bold text-[#1565C0]">Levantamento</div>
                      <div className="text-xs text-[#42A5F5]">Em andamento</div>
                    </div>
                    <div className="absolute -right-3 flex -space-x-2">
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                       <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center border-2 border-white shadow-sm font-medium">+3</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 text-right text-sm font-medium text-slate-600">Avaliação</div>
                  <div className="h-14 w-1/2"></div>
                  <div className="h-14 bg-[#fff8e1] border border-[#ffecb3] rounded-2xl w-1/3 flex items-center px-4 shadow-sm opacity-60">
                    <div>
                      <div className="text-sm font-bold text-[#F9A825]">Avaliação CAV</div>
                      <div className="text-xs text-[#FFD54F]">Aguardando</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary / Chart Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white border-b-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6 h-64 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Progresso por Domínio</h3>
                <p className="text-sm text-slate-500">Acompanhamento de critérios avaliados</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600">
                  <Settings size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full mt-4 -ml-4 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 600 }}
                    cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                  />
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke="#1565C0"
                    strokeWidth={3}
                    dot={{r: 4, fill: '#fff', strokeWidth: 2, stroke: '#1565C0'}}
                    activeDot={{r: 6, fill: '#1565C0', strokeWidth: 0, stroke: '#1565C0'}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Avisos / Chat Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white border-b-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors">
                  <HelpCircle size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-800 shadow-sm flex items-center justify-center text-white transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors">
                  <Settings size={18} />
                </button>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-auto relative">
              <div className="absolute -top-3 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-white"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-slate-800">Aviso da Atricon</span>
                <span className="text-xs text-slate-400">09:32</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                A fase de seleção de indicadores discricionários encerra nesta sexta-feira. Não esqueça de formalizar as escolhas do seu Tribunal.
              </p>
            </div>

            <div className="mt-6 bg-white/50 rounded-full py-4 px-6 flex items-center justify-between border border-white">
              <span className="text-slate-400 text-sm">Escreva uma mensagem...</span>
              <div className="flex gap-3 text-slate-400">
                <Plus size={18} />
                <MessageSquare size={18} />
              </div>
            </div>
          </div>

          {/* Ranking de Boas Práticas */}
          <div className="bg-white/60 backdrop-blur-xl border border-white border-b-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6 h-64 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Ranking de Práticas</h3>
                <p className="text-sm text-slate-500">Mais bem avaliadas</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
              {topPractices.map((practice, index) => (
                <div key={practice.id} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm border ${
                      index === 0 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      index === 1 ? 'bg-slate-100 text-slate-600 border-slate-200' :
                      'bg-orange-50 text-orange-800 border-orange-200/50'
                    }`}>
                      {index + 1}º
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-1">{practice.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{practice.tc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{practice.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
