import React, { useState } from 'react';
import { supabase } from '../src/config/supabase.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    let error;
    if (isLogin) {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } else {
      ({ data, error } = await supabase.auth.signUp({ email, password }));
    }
    if (error) {
      console.log('Error with handleSubmit', error);
      toast.error('Something went wrong');
    } else {
      navigate('/');
    }
  };

  return (
    <main>
     
    </main>
  );
}

export default Auth;
