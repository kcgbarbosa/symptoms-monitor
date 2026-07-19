import { Outlet, useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const Layout = () => {
  const location = useLocation();
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="max-w-7xl w-full mx-auto p-6 lg:p-8">
            <div
              key={location.pathname}
              className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
            >
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Layout;
