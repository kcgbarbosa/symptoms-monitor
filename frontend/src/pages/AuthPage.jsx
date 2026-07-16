import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import AuthForm from '../components/auth/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/shared/ThemeToggle';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { session, isDemoMode, setDemoMode } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate('/');
  }, [session, navigate]);

  useEffect(() => {
    if (isDemoMode) navigate('/');
  }, [isDemoMode, navigate]);

  return (
    <>
      <div className=" absolute top-0 flex z-30 justify-self-end p-2 lg:p-4">
        <ThemeToggle />
      </div>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
          <div className="flex items-center gap-2">
            <Activity size={22} />
            <Link
              to="/auth"
              className="text-xl font-bold uppercase tracking-tight"
            >
              Symptoms Monitor
            </Link>
          </div>
          <div className="space-y-5">
            <blockquote className="space-y-3">
              <p className="text-3xl font-semibold italic leading-tight">
                “The greatest glory in living lies <br /> not in never falling,
                but in rising every time we fall.”
              </p>
              <cite className="block text-sm not-italic text-primary-foreground">
                – Nelson Mandela
              </cite>
            </blockquote>
            <p className="text-lg leading-relaxed text-primary-foreground">
              Your symptoms are real, and so is your capacity to heal.
            </p>
          </div>

          <p className="text-sm text-primary-foreground">
            Creator: Kevin-Christian Giraldo-Barbosa
          </p>
        </div>

        <div className="flex flex-col bg-card">
          <div className="bg-primary px-8 py-8 text-primary-foreground lg:hidden">
            <div className="mb-3 flex items-center gap-2">
              <Activity size={20} />
              <span className="font-bold uppercase tracking-tight">
                Symptoms Monitor
              </span>
            </div>
            <p className="text-sm text-primary-foreground">
              Track, visualize, and reflect on your health trends
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <AuthForm
                key={isLogin ? 'login' : 'signup'}
                isLogin={isLogin}
                onToggle={() => setIsLogin(!isLogin)}
              />
            </div>
          </div>

          <div className="px-8 pb-8 text-center">
            <p className="mb-2 text-sm text-muted-foreground">
              Just want to look around?
            </p>
            <Button
              variant="outline"
              onClick={() => setDemoMode(true)}
              className="w-full max-w-sm"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
