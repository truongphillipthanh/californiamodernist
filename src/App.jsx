import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import MapPage from './pages/MapPage';
import CRMPage from './pages/CRMPage';
import ProjectPage from './pages/ProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell showSidebar={false} />}>
          <Route path="/" element={<MapPage />} />
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
