import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import AuthForm from '../components/ui/AuthForm';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-purple-600 p-12 text-white">
        <div className="flex items-center gap-2">
          <Activity size={24} />
          <span className="font-bold uppercase tracking-tighter text-lg">
            Symptoms Monitor
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Track, visualize, and reflect on your health trends
          </h2>
          <p className="text-purple-200 text-lg">
            Log daily entries, view patterns over time, and take control of your
            wellbeing.
          </p>
        </div>

        <p className="text-purple-300 text-sm">
          © {new Date().getFullYear()} Symptoms Monitor
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
            Track, visualize, and reflect on your health trends.
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
