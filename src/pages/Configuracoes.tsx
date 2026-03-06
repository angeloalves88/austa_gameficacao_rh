import { useState, useEffect } from 'react';
import { Toast } from '../components/ui/Toast';
import { configuracaoInicial } from '../data/mockData';

const STORAGE_KEY = 'score-saude-config';

export function Configuracoes() {
  const [config, setConfig] = useState(configuracaoInicial);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...configuracaoInicial, ...parsed });
      } catch (_) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setToast('Configurações salvas com sucesso');
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Configurações</h1>

      <div className="max-w-2xl space-y-8">
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Regras de Pontuação (Atendimento PA)</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-green-600 font-medium">•</span>
              <span>Não usou o PA no mês: mantém os pontos atuais</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-medium">•</span>
              <span>Usou a telemedicina e foi orientado a usar o PA: mantém os 100 pts e tem desconto na coparticipação de acordo com a pontuação (ex: 100 pts = 100/100 = 100% desconto; 50 pts = 50/100 = 50% desconto)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 font-medium">•</span>
              <span>Usou a telemedicina e não precisou usar o PA: mantém os pontos, será cobrada a coparticipação, e terá desconto em coparticipação futura (exames, consultas)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-medium">•</span>
              <span>Beneficiário foi direto no PA: perde 10 pontos (sem desconto na coparticipação)</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-800">Parâmetros editáveis</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pontos iniciais por colaborador
            </label>
            <input
              type="number"
              value={config.pontosIniciais}
              onChange={(e) => setConfig((c) => ({ ...c, pontosIniciais: Number(e.target.value) }))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Penalidade por uso direto do PA (caso não urgente)
            </label>
            <input
              type="number"
              value={config.penalidadePADireto}
              onChange={(e) => setConfig((c) => ({ ...c, penalidadePADireto: Number(e.target.value) }))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-slate-500 text-sm mt-1">Ex: -10 pts</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Meta de Score Corporativo
            </label>
            <input
              type="number"
              value={config.metaScoreCorporativo}
              onChange={(e) => setConfig((c) => ({ ...c, metaScoreCorporativo: Number(e.target.value) }))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-slate-500 text-sm mt-1">Ex: 80</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
