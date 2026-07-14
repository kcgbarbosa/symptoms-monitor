import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const Layout = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 min-w-0">
          <SidebarTrigger className="m-2" />
          <div className="p-6 lg:p-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Layout;
