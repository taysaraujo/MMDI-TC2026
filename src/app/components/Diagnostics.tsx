import React from "react";
import { Download, FileText, Plus, BarChart4 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const radarData = [
  { domain: 'A', fullMark: 100, score: 90 },
  { domain: 'B', fullMark: 100, score: 65 },
  { domain: 'C', fullMark: 100, score: 80 },
  { domain: 'D', fullMark: 100, score: 45 },
  { domain: 'E', fullMark: 100, score: 70 },
  { domain: 'F', fullMark: 100, score: 85 },
];

const barData = [
  { name: 'PQATC 01', progresso: 95 },
  { name: 'PQATC 02', progresso: 60 },
  { name: 'PQATC 03', progresso: 40 },
  { name: 'PQATC 04', progresso: 80 },
  { name: 'PQATC 05', progresso: 20 },
];

export function Diagnostics() {
  return (
    <div className="flex flex-col h-full">
      <header className="mb-8 flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Diagnóstico</h1>
          <p className="text-slate-500">Acompanhamento e relatórios do ciclo</p>
        </div>
        
        <button className="bg-slate-800 text-white px-6 py-3.5 rounded-full font-medium hover:bg-slate-900 transition-colors shadow-lg shadow-slate-800/20 flex items-center gap-2">
          <Plus size={18} />
          Novo Relatório
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 px-2">
        <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6 flex flex-col items-center">
          <h3 className="font-bold text-slate-800 mb-6 w-full text-left">Desempenho Geral</h3>
          <div className="w-full h-64 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="domain" tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#1565C0" strokeWidth={2} fill="#42A5F5" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-6">
          <h3 className="font-bold text-slate-800 mb-6">Progresso por PQATC (Destaques)</h3>
          <div className="w-full h-64 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                <Bar dataKey="progresso" fill="#4CAF50" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="px-2 pb-8">
        <h3 className="font-bold text-slate-800 mb-4 px-2">Histórico de Relatórios</h3>
        <div className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {[
                { name: "Diagnóstico Parcial Domínio A", date: "10/05/2024", status: "Publicado" },
                { name: "Relatório de Divergências CAV x CCQ", date: "08/05/2024", status: "Em Revisão" },
                { name: "Sumário Executivo - Reunião Diretoria", date: "01/05/2024", status: "Rascunho" },
              ].map((report, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <span className="font-medium text-slate-700">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">{report.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'Publicado' ? 'bg-emerald-100 text-emerald-800' :
                      report.status === 'Em Revisão' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-2 transition-colors">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
