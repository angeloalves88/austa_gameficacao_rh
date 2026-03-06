import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Bell, X } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/colaboradores', icon: Users, label: 'Colaboradores' },
  { to: '/agendamentos', icon: Calendar, label: 'Agendamentos' },
  { to: '/notificacoes', icon: Bell, label: 'Notificações' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {onClose && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 min-h-screen bg-slate-800 text-white flex flex-col
          transform transition-transform duration-200 ease-out
          lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between">
          <h1 className="text-lg font-bold">Saúde Premiada</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 -m-2 text-slate-400 hover:text-white"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
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
    </>
  );
}
