import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProtectedRoute() {
  const { loading, session, isDemoMode } = useAuthStore();

  if (loading) return null;
  if (session || isDemoMode) return <Outlet />;
  return <Navigate to="/auth" />;
}
