import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ClientDashboard } from './pages/Dashboard'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Bookings } from './pages/Bookings'
import { Occurrences } from './pages/Occurrences'
import { Shell } from './components/layout/Shell'
import { useQuery } from '@tanstack/react-query'
import { supabase } from './lib/supabase'

function App() {
  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  if (isLoading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
        
        <Route element={session ? <Shell /> : <Navigate to="/login" />}>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/occurrences" element={<Occurrences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
