import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
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
          { index: true, element: <OverviewPage /> },
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
  }, [initAuth]);
  return (
    <div className="min-h-screen bg-background">
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
