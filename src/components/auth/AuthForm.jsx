import { useState } from 'react';
import { supabase } from '../../config/supabase.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const fieldLabel = 'text-sm font-medium text-foreground';

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
        <span className="font-medium text-foreground">{email}</span>.
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
    setFormError('');
    let error;
    if (isLogin) {
      ({ error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
    }
    setLoading(false);

    if (error) {
      if (isLogin) {
        setFormError("Incorrect email or password. Don't have an account?");
      } else if (error.message.toLowerCase().includes('already registered')) {
        setEmailError(
          'An account with this email already exists. Try signing in.'
        );
      } else {
        toast.error(error.message);
      }
    } else if (!isLogin) {
      setSignUpSuccess(true);
    } else {
      navigate('/');
    }
  };

  if (signUpSuccess) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {heading}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setSignUpSuccess(false);
            setEmail('');
            setPassword('');
          }}
        >
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        {!isLogin && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            New Account
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          {heading}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className={fieldLabel}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setFormError('');
            }}
            aria-invalid={Boolean(emailError)}
          />
          {emailError && (
            <p className="text-xs text-destructive">{emailError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className={fieldLabel}>
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
                setFormError('');
              }}
              className="pr-11"
              aria-invalid={Boolean(passwordError)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {passwordError && (
            <p className="text-xs text-destructive">{passwordError}</p>
          )}
        </div>

        {formError && (
          <p className="text-sm text-destructive">
            {formError}{' '}
            {isLogin && (
              <button
                type="button"
                onClick={onToggle}
                className="font-medium underline"
              >
                Sign up
              </button>
            )}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="animate-spin" />}
          {isLogin ? 'Sign in' : 'Create account'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={onToggle}
            className="font-medium text-primary hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
