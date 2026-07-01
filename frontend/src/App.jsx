import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import EntriesPage from './pages/EntriesPage.jsx';
import TrendsPage from './pages/TrendsPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth" element={<AuthPage />} />
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
