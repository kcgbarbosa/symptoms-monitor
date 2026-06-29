import React, { useState } from 'react';
import { supabase } from '../src/config/supabase.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // #TODO FEAT [June 29] - Add comprehensive form validation & error messaging
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
      toast.error(error.message);
    } else {
      toast.success('Sign in successful');
      navigate('/');
    }
  };

  return (
    <main>
      <form>
        <h3>{isLogin ? 'Log in' : 'Sign up'}</h3>
        <label className="pr-3">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className="pr-3">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
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

export default AuthForm;
