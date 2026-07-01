import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProtectedRoute() {
  const { loading, session } = useAuthStore();

  if (loading) return null;
  if (session) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
}
