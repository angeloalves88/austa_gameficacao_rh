import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Colaboradores } from './pages/Colaboradores';
import { Agendamentos } from './pages/Agendamentos';
import { Notificacoes } from './pages/Notificacoes';
import { Configuracoes } from './pages/Configuracoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="agendamentos" element={<Agendamentos />} />
          <Route path="notificacoes" element={<Notificacoes />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
