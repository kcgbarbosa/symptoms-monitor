import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import EntriesPage from './pages/EntriesPage.jsx';
import TrendsPage from './pages/TrendsPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

function App() {
  const { initAuth } = useAuthStore();
  useEffect(() => {
    const subscription = initAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
            <Route path="entries" element={<EntriesPage />} />
            <Route path="trends" element={<TrendsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
