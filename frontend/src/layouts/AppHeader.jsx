import ThemeToggle from '../components/shared/ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur-sm">
      <SidebarTrigger />
      <ThemeToggle />
    </header>
  );
};

export default AppHeader;
