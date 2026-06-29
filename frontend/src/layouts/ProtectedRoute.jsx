import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(false);
  const session = supabase.auth.getSession();
  if (session) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
}
