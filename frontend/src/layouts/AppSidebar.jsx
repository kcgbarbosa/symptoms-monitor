import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  ClipboardList,
  LayoutDashboard,
  LogIn,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useEntriesStore } from '../../store/useEntriesStore.js';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/entries', label: 'Entries', icon: ClipboardList },
  { to: '/trends', label: 'Trends', icon: TrendingUp },
];

const AppSidebar = () => {
  const { session, signOut, isDemoMode, setDemoMode } = useAuthStore();
  const { clearEntries } = useEntriesStore();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleNavClick = (e, to) => {
    if (!isMobile) return;
    e.preventDefault();
    closeMobileSidebar();
    navigate(to, { viewTransition: true });
  };

  const handleSignOut = async () => {
    closeMobileSidebar();
    await signOut();
    navigate('/auth', { viewTransition: true });
  };

  const handleExitDemo = () => {
    clearEntries();
    setDemoMode(false);
    closeMobileSidebar();
    navigate('/auth', { viewTransition: true });
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="px-2 pt-2">
        <NavLink
          to="/"
          onClick={(e) => handleNavClick(e, '/')}
          viewTransition
          aria-label="Symptoms Monitor"
          className="flex items-center gap-2.5 px-1 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Activity className="size-4" />
          </div>
          <span className="truncate text-lg font-bold tracking-tight text-primary group-data-[collapsible=icon]:hidden">
            Symptoms Monitor
          </span>
        </NavLink>
      </SidebarHeader>

      <SidebarSeparator className="mb-2" />

      <SidebarContent>
        <SidebarMenu className="gap-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <SidebarMenuItem key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={(e) => handleNavClick(e, to)}
                viewTransition
                aria-label={label}
              >
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={label}
                    aria-label={label}
                    size="lg"
                    className="text-base [&_svg]:size-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center data-active:shadow-xs"
                  >
                    <Icon />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {label}
                    </span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="gap-2 p-2 group-data-[collapsible=icon]:items-center">
        {session ? (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
            <span className="truncate text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
              {session.user.email}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOut />
            </Button>
          </div>
        ) : isDemoMode ? (
          <div className="flex flex-col gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2 group-data-[collapsible=icon]:hidden">
            <Badge
              variant="secondary"
              className="w-fit uppercase tracking-widest"
            >
              Demo
            </Badge>
            <Button variant="outline" size="sm" onClick={handleExitDemo}>
              Exit Demo
            </Button>
          </div>
        ) : (
          <NavLink
            to="/auth"
            onClick={(e) => handleNavClick(e, '/auth')}
            viewTransition
            aria-label="Log in"
          >
            {({ isActive }) => (
              <SidebarMenuButton
                isActive={isActive}
                tooltip="Log in"
                aria-label="Log in"
                size="lg"
                className="text-base [&_svg]:size-5 group-data-[collapsible=icon]:justify-center"
              >
                <LogIn />
                <span className="truncate group-data-[collapsible=icon]:hidden">
                  Log in
                </span>
              </SidebarMenuButton>
            )}
          </NavLink>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
