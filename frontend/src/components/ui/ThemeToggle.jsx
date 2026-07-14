import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../../store/useThemeStore.js';
import { Button } from '@/components/ui/button';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      className="fixed top-4 right-4 z-40 shadow-sm"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggle;
