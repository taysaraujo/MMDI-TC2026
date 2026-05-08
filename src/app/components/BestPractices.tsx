import React from "react";
import { Plus, Search, Filter, Star, ShieldCheck, Award } from "lucide-react";

const PRACTICES = [
  {
    id: 1,
    name: "Auditoria Contínua com IA",
    tc: "TCU",
    pqatc: "PQATC 11",
    status: "Aderente",
    exitosa: true,
    stars: 4.8,
    votes: 12,
    date: "10/05/2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Painel de Obras Públicas",
    tc: "TCE-SP",
    pqatc: "PQATC 16",
    status: "Aderente",
    exitosa: true,
    stars: 4.9,
    votes: 34,
    date: "05/05/2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sistema Integrado de Ouvidoria",
    tc: "TCE-PR",
    pqatc: "PQATC 05",
    status: "Parcialmente Aderente",
    exitosa: false,
    stars: 3.5,
    votes: 8,
    date: "28/04/2024",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop"
  }
];

export function BestPractices() {
  return (
    <div className="flex flex-col h-full">
      <header className="mb-8 flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Boas Práticas</h1>
          <p className="text-slate-500">Galeria de experiências e votação</p>
        </div>
        
        <button className="bg-slate-800 text-white px-6 py-3.5 rounded-full font-medium hover:bg-slate-900 transition-colors shadow-lg shadow-slate-800/20 flex items-center gap-2">
          <Plus size={18} />
          Submeter Prática
        </button>
      </header>

      <div className="flex gap-4 mb-8 px-2">
        <div className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full px-4 py-3 flex items-center gap-2 flex-1 max-w-md">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Buscar práticas por nome ou TC..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700" />
        </div>
        <button className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full px-6 py-3 flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-white transition-colors">
          <Filter size={16} /> Domínio / PQATC
        </button>
        <button className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full px-6 py-3 flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-white transition-colors ml-auto">
          Mais Votadas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 overflow-y-auto pb-8">
        {PRACTICES.map(practice => (
          <div key={practice.id} className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden group hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all flex flex-col">
            <div className="h-40 overflow-hidden relative">
              <img src={practice.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                  {practice.tc}
                </span>
              </div>
              {practice.exitosa && (
                <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                  <Award size={12} /> Exitosa
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs font-semibold text-slate-400 mb-2">{practice.pqatc}</div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-4 flex-1">{practice.name}</h3>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{practice.stars}</span>
                  <span className="text-xs text-slate-400">({practice.votes})</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ShieldCheck size={14} /> {practice.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
