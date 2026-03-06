import { useState, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';
import {
  colaboradoresData,
  departamentos,
  type StatusUsoPA,
} from '../data/mockData';

type Colaborador = (typeof colaboradoresData)[0];

function ScoreBadge({ score }: { score: number }) {
  const variant = score >= 80 ? 'green' : score >= 50 ? 'yellow' : 'red';
  const colors = { green: 'bg-green-100 text-green-800', yellow: 'bg-amber-100 text-amber-800', red: 'bg-red-100 text-red-800' };
  return (
    <span className={`px-2 py-0.5 rounded text-sm font-medium ${colors[variant]}`}>
      {score}
    </span>
  );
}

function StatusUsoPABadge({ status }: { status: StatusUsoPA }) {
  const labels = { NaoUsou: 'Não usou PA', TelemedicinaComPA: 'Telemedicina → PA', TelemedicinaSemPA: 'Telemedicina sem PA', PADireto: 'PA direto' };
  const variants: Record<StatusUsoPA, string> = {
    NaoUsou: 'text-green-600',
    TelemedicinaComPA: 'text-blue-600',
    TelemedicinaSemPA: 'text-amber-600',
    PADireto: 'px-2 py-0.5 rounded text-sm font-medium bg-red-100 text-red-800',
  };
  return <span className={variants[status]}>{labels[status]}</span>;
}

function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ value: v, index: i }));
  return (
    <div className="w-16 sm:w-20 h-6 sm:h-8 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" strokeWidth={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Colaboradores() {
  const [search, setSearch] = useState('');
  const [departamento, setDepartamento] = useState('Todos');
  const [selected, setSelected] = useState<Colaborador | null>(null);

  const filtered = useMemo(() => {
    return colaboradoresData.filter((c) => {
      const matchSearch = c.nome.toLowerCase().includes(search.toLowerCase());
      const matchDept = departamento === 'Todos' || c.departamento === departamento;
      return matchSearch && matchDept;
    });
  }, [search, departamento]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Colaboradores</h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          className="px-4 py-2 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 sm:w-auto w-full"
        >
          {departamentos.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Tabela com scroll horizontal em mobile */}
      <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white -mx-4 sm:mx-0">
        <table className="w-full min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm">Nome</th>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm">Depto</th>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm">Score</th>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm hidden md:table-cell">Último PA</th>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm">Status</th>
              <th className="text-left py-3 px-3 sm:px-4 font-medium text-slate-700 text-sm hidden sm:table-cell">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors active:bg-slate-100"
              >
                <td className="py-3 px-3 sm:px-4 text-sm">{c.nome}</td>
                <td className="py-3 px-3 sm:px-4 text-sm">{c.departamento}</td>
                <td className="py-3 px-3 sm:px-4"><ScoreBadge score={c.score} /></td>
                <td className="py-3 px-3 sm:px-4 text-sm hidden md:table-cell">{c.ultimoUsoPA}</td>
                <td className="py-3 px-3 sm:px-4"><StatusUsoPABadge status={c.statusUsoPA} /></td>
                <td className="py-3 px-3 sm:px-4 hidden sm:table-cell"><Sparkline data={c.tendencia} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto w-full sm:w-96 bg-white border-l border-slate-200 shadow-xl z-40 p-4 sm:p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">Detalhe do colaborador</h2>
            <button
              onClick={() => setSelected(null)}
              className="p-2 -m-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-2xl touch-manipulation"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
          <p className="font-medium text-slate-800">{selected.nome}</p>
          <p className="text-slate-600 text-sm">{selected.departamento}</p>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700">Histórico de Score (últimos 3 meses)</p>
            <div className="h-24 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selected.tendencia.map((v, i) => ({ value: v, mes: i + 1 }))}>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700">Últimos 3 eventos</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• Teleconsulta — 10/02</li>
              <li>• Telemedicina → PA — 15/02</li>
              <li>• Uso PA direto — 28/01</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
