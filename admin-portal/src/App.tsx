import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { FinancialsPage } from './pages/Financials';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { NoticesPage } from './pages/Notices';
import { ReservationsPage } from './pages/Reservations';
import { ResidentApprovalPage } from './pages/ResidentApproval';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/home';
  const isAdminPage = !isAuthPage;

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
              <Route path="/residents" element={<ResidentApprovalPage />} />
              <Route path="/financials" element={<FinancialsPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/notices" element={<NoticesPage />} />
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
