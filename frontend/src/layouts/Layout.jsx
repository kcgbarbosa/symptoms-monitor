import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const Layout = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <ThemeToggle />
        <main className="flex-1 min-w-0">
          <SidebarTrigger className="m-2" />
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Layout;
