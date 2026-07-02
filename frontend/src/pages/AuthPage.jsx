import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import AuthForm from '../components/ui/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { session } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate('/');
  }, [session]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-purple-600 p-12 text-white">
        <div className="flex items-center gap-2">
          <Activity size={24} />
          <Link
            to="/auth"
            className="font-bold uppercase tracking-tight text-xl"
          >
            Symptoms Monitor
          </Link>
        </div>
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <h2 className="text-4xl font-bold italic leading-tight">
              "Although the world is full of suffering, it is full also of the
              overcoming of it."
            </h2>
            <cite className="text-purple-300 text-sm block not-italic">
              — Helen Keller
            </cite>
          </blockquote>
          <p className="text-purple-200 text-lg leading-relaxed">
            Your symptoms are real, and so is your capacity to heal. <br />
            Let's monitor your progress, together.
          </p>
        </div>

        <p className="text-purple-300 text-sm">
          Creator: Kevin-Christian Giraldo-Barbosa
        </p>
      </div>

      <div className="flex flex-col bg-base-100">
        <div className="bg-purple-600 text-white px-8 py-8 lg:hidden">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={20} />
            <span className="font-bold uppercase tracking-tighter">
              Symptoms Monitor
            </span>
          </div>
          <p className="text-purple-200 text-sm">
            Track, visualize, and reflect on your health trends
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <AuthForm
              key={isLogin ? 'login' : 'signup'}
              isLogin={isLogin}
              onToggle={() => setIsLogin(!isLogin)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
