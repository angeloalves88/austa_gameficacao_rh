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
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Megaphone size={18} />
          Enviar Lembrete (Alto Uso PA)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Bonificação estimada ao final do contrato</p>
          <p className="text-2xl font-bold text-green-600 flex items-center gap-2">
            R$ {kpiData.economiaEstimada.toLocaleString('pt-BR')}
            <TrendingUp size={24} />
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Migração para Telemedicina</p>
          <p className="text-2xl font-bold text-green-600 flex items-center gap-2">
            +{kpiData.migracaoTeleconsulta}%
            <TrendingUp size={24} />
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Uso Consciente do PA</p>
          <p className="text-2xl font-bold text-amber-500 flex items-center gap-2">
            {kpiData.usoConscientePA}%
          </p>
        </div>
      </div>

      <div className="mb-8">
        <Gauge
          value={scoreData.valor}
          title="Score de Uso Consciente da Empresa"
          status={scoreData.status}
          meta={`Meta trimestral: ${scoreData.meta}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">PA Direto vs Teleconsulta</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paVsTeleconsultaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PA" fill="#3b82f6" name="PA Direto" />
              <Bar dataKey="Teleconsulta" fill="#22c55e" name="Teleconsulta" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Status de Uso do PA</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusUsoPAData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enviar Notificação Push"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prévia da mensagem</label>
            <p className="bg-slate-100 p-3 rounded-lg text-slate-800">
              Use a telemedicina primeiro! Evite idas desnecessárias ao PA e mantenha seus pontos.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Público-alvo</label>
            <p className="text-slate-800">
              {colaboradoresAltoUsoPA} colaboradores com alto uso de PA direto
            </p>
          </div>
          <button
            onClick={handleEnviar}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar Agora
          </button>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
