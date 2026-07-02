import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEntriesStore } from '../../store/useEntriesStore';

export default function ProtectedRoute() {
  const { loading, session } = useAuthStore();
  const { isDemoMode } = useEntriesStore();

  if (loading) return null;
  if (session || isDemoMode) return <Outlet />;
  return <Navigate to="/auth" />;
}
