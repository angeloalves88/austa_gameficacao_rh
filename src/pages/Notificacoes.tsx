import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { notificacoesData, colaboradoresAltoUsoPA } from '../data/mockData';

export function Notificacoes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Sent' | 'Scheduled'>('All');

  const handleEnviar = () => {
    setModalOpen(false);
    setToast(`✅ Notificação enviada para ${colaboradoresAltoUsoPA} colaboradores`);
  };

  const filtered = notificacoesData; // mock: all are "Sent"

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Notificações</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nova Notificação
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['All', 'Sent', 'Scheduled'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f === 'All' ? 'Todos' : f === 'Sent' ? 'Enviadas' : 'Agendadas'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm">{n.data}</p>
                <p className="text-slate-800 mt-1">{n.mensagem}</p>
                <p className="text-slate-500 text-sm mt-2">
                  {n.audiencia} destinatários · Open rate: {n.openRate}%
                </p>
              </div>
            </div>
          </div>
        ))}
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
