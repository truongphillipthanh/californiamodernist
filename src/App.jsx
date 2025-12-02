import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import MapPage from './pages/MapPage';
import CRMPage from './pages/CRMPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<MapPage />} />
          <Route path="crm" element={<CRMPage />} />
          <Route path="project" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
