import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { FinancialsPage } from './pages/Financials';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { NoticesPage } from './pages/Notices';
import { AreasPage } from './pages/Areas';
import { ResidentApprovalPage } from './pages/ResidentApproval';
import { SettingsPage } from './pages/Settings';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/home';

  return (
    <Routes>
      <Route path="/home" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/approval" element={<ResidentApprovalPage />} />
              <Route path="/financials" element={<FinancialsPage />} />
              <Route path="/areas" element={<AreasPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
