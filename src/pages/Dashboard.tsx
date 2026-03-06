import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Megaphone } from 'lucide-react';
import { Gauge } from '../components/charts/Gauge';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import {
  kpiData,
  scoreData,
  paVsTeleconsultaData,
  statusUsoPAData,
  colaboradoresAltoUsoPA,
} from '../data/mockData';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleEnviar = () => {
    setModalOpen(false);
    setToast(`✅ Notificação enviada para ${colaboradoresAltoUsoPA} colaboradores`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base shrink-0"
        >
          <Megaphone size={18} />
          <span className="hidden sm:inline">Enviar Lembrete (Alto Uso PA)</span>
          <span className="sm:hidden">Enviar Lembrete</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <p className="text-slate-600 text-xs sm:text-sm mb-1">Bonificação estimada ao final do contrato</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 flex items-center gap-2">
            R$ {kpiData.economiaEstimada.toLocaleString('pt-BR')}
            <TrendingUp size={20} className="sm:w-6 sm:h-6 shrink-0" />
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <p className="text-slate-600 text-xs sm:text-sm mb-1">Migração para Telemedicina</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 flex items-center gap-2">
            +{kpiData.migracaoTeleconsulta}%
            <TrendingUp size={20} className="sm:w-6 sm:h-6 shrink-0" />
          </p>
        </div>
      </div>

      <div className="mb-6 lg:mb-8">
        <Gauge
          value={scoreData.valor}
          title="Score de Uso Consciente da Empresa"
          status={scoreData.status}
          meta={`Meta trimestral: ${scoreData.meta}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">PA Direto vs Teleconsulta</h3>
          <div className="w-full h-[220px] sm:h-[250px] min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paVsTeleconsultaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="PA" fill="#3b82f6" name="PA Direto" />
                <Bar dataKey="Teleconsulta" fill="#22c55e" name="Teleconsulta" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Status de Uso do PA</h3>
          <div className="w-full h-[220px] sm:h-[250px] min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusUsoPAData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {statusUsoPAData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number | undefined) => `${v ?? 0}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enviar Notificação Push"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prévia da mensagem</label>
            <p className="bg-slate-100 p-3 rounded-lg text-slate-800 text-sm">
              Use a telemedicina primeiro! Evite idas desnecessárias ao PA e mantenha seus pontos.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Público-alvo</label>
            <p className="text-slate-800 text-sm">
              {colaboradoresAltoUsoPA} colaboradores com alto uso de PA direto
            </p>
          </div>
          <button
            onClick={handleEnviar}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-manipulation"
          >
            Enviar Agora
          </button>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
