import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SurprisePage from './pages/SurprisePage';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/s/:code" element={<SurprisePage />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="min-h-screen bg-valentine-light" />}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route path="/" element={<Navigate to="/s/demo" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
