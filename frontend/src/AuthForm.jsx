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
      <h1>Authentication Page</h1>
      <form onSubmit={handleSubmit}>
        <h3>{isLogin ? 'Log in' : 'Sign up'}</h3>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
      <p>
        {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </main>
  );
}

export default Auth;
