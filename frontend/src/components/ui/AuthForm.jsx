import React, { useState } from 'react';
import { supabase } from '../../config/supabase.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

function AuthForm({ isLogin, onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  let heading;
  let subtitle;
  if (signUpSuccess) {
    heading = 'Check your email';
    subtitle = (
      <>
        We sent a confirmation link to{' '}
        <span className="font-medium text-purple-600">{email}</span>.
      </>
    );
  } else if (isLogin) {
    heading = 'Welcome back';
    subtitle = 'Sign in to continue';
  } else {
    heading = 'Create an account';
    subtitle = 'Start tracking your symptoms today';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!email.includes('@')) {
      setEmailError('Enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    setLoading(true);
    let data, error;
    if (isLogin) {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } else {
      ({ data, error } = await supabase.auth.signUp({ email, password }));
    }
    setLoading(false);

    if (error) {
      if (isLogin) {
        setFormError("Incorrect email or password. Don't have an account?");
      } else {
        toast.error(error.message);
      }
    } else if (!isLogin) {
      if (data.user?.identities?.length === 0) {
        setEmailError(
          'An account with this email already exists. Try signing in.'
        );
      } else {
        setSignUpSuccess(true);
      }
    } else {
      navigate('/');
    }
  };

  if (signUpSuccess) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-1">
            {heading}
          </h1>
          <p className="text-sm text-base-content/60">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSignUpSuccess(false);
            setEmail('');
            setPassword('');
          }}
          className="btn btn-primary w-full text-white"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        {!isLogin && (
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-2">
            New Account
          </p>
        )}
        <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-1">
          {heading}
        </h1>
        <p className="text-sm text-base-content/60">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setFormError('');
            }}
            className={`input input-bordered w-full focus:input-primary ${emailError ? 'input-error' : ''}`}
          />
          {emailError && (
            <label className="label pt-1">
              <span className="label-text-alt text-error">{emailError}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
                setFormError('');
              }}
              className={`input input-bordered w-full pr-12 focus:input-primary ${passwordError ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-ghost btn-sm btn-circle absolute right-2 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordError && (
            <label className="label pt-1">
              <span className="label-text-alt text-error">{passwordError}</span>
            </label>
          )}
        </div>

        {formError && (
          <p className="text-sm text-error">
            {formError}{' '}
            {isLogin && (
              <button
                type="button"
                onClick={onToggle}
                className="underline font-medium"
              >
                Sign up
              </button>
            )}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full text-white ${isLogin ? 'btn-primary' : 'bg-purple-600 hover:bg-purple-700 border-0'}`}
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          {isLogin ? 'Sign in' : 'Create account'}
        </button>

        <p className="text-sm text-center text-base-content/60">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={onToggle}
            className="text-purple-600 font-medium hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
