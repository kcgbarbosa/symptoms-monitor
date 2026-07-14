import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import EntriesPage from './pages/EntriesPage.jsx';
import TrendsPage from './pages/TrendsPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

const router = createBrowserRouter([
  { path: '/auth', element: <AuthPage /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'entries', element: <EntriesPage /> },
          { path: 'trends', element: <TrendsPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const { initAuth } = useAuthStore();
  useEffect(() => {
    const subscription = initAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
