import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { agendamentosData } from '../data/mockData';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { 'pt-BR': ptBR },
});


const todayAppointments = agendamentosData.filter(
  (a) => a.data.getDate() === 5 && a.data.getMonth() === 2 && a.data.getFullYear() === 2025
);

const events = agendamentosData.map((a) => ({
  id: a.id,
  title: `${a.colaborador} - ${a.tipo}`,
  start: a.data,
  end: new Date(a.data.getTime() + 60 * 60 * 1000),
  status: a.status,
}));

function getEventStyle(event: { status?: string }) {
  if (event.status === 'No-show') return { style: { backgroundColor: '#ef4444' } };
  if (event.status === 'Pendente') return { style: { backgroundColor: '#eab308' } };
  return { style: { backgroundColor: '#22c55e' } };
}

export function Agendamentos() {
  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Agendamentos</h1>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8">
        <Calendar
          localizer={localizer}
          culture="pt-BR"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 420 }}
          eventPropGetter={getEventStyle}
          messages={{
            today: 'Hoje',
            previous: 'Anterior',
            next: 'Próximo',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
          }}
        />
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Agendamentos de hoje (05/03)</h3>
        <div className="space-y-2">
          {todayAppointments.map((a) => (
            <div
              key={a.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                a.status === 'No-show' ? 'bg-red-50 border border-red-200' : 'bg-white border border-slate-200'
              }`}
              title={a.status === 'No-show' ? 'Este colaborador perdeu -10 pts' : undefined}
            >
              <div>
                <span className="font-medium text-slate-800">{a.colaborador}</span>
                <span className="text-slate-600 ml-2">— {a.tipo}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-sm ${
                  a.status === 'Confirmado'
                    ? 'bg-green-100 text-green-800'
                    : a.status === 'Pendente'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
