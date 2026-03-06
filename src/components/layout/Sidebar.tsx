import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Bell } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/colaboradores', icon: Users, label: 'Colaboradores' },
  { to: '/agendamentos', icon: Calendar, label: 'Agendamentos' },
  { to: '/notificacoes', icon: Bell, label: 'Notificações' },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-lg font-bold">Score Saúde Corporativo</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
