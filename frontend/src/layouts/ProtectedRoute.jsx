import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const response = await supabase.auth.getSession();
      setSession(response.data.session);
      setLoading(false);
    }
    checkSession();
  }, []);

  if (loading) return null;
  if (session) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
}
