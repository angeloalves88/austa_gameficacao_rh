import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 bg-white min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
