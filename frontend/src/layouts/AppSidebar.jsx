import { NavLink, useNavigate } from 'react-router-dom';
import {
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
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
          aria-label="Sylvius"
          className="flex items-center gap-2.5 px-1 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-serif text-lg font-bold text-primary-foreground">
            S
          </div>
          <span className="truncate font-serif text-3xl font-semibold italic tracking-tight text-primary group-data-[collapsible=icon]:hidden">
            Sylvius
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

        <SidebarMenu className="mt-1.5">
          <SidebarMenuItem>
            {session ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    onClick={handleSignOut}
                    aria-label="Sign out"
                    size="lg"
                    className="text-base [&_svg]:size-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
                  >
                    <LogOut />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      Sign out
                    </span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  Signed in as {session.user.email}
                </TooltipContent>
              </Tooltip>
            ) : isDemoMode ? (
              <SidebarMenuButton
                onClick={handleExitDemo}
                tooltip="Exit Demo"
                aria-label="Exit Demo"
                size="lg"
                className="hidden text-base [&_svg]:size-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
              >
                <LogOut />
                <span className="truncate group-data-[collapsible=icon]:hidden">
                  Exit Demo
                </span>
              </SidebarMenuButton>
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
                    className="text-base [&_svg]:size-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
                  >
                    <LogIn />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      Log in
                    </span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            )}
          </SidebarMenuItem>
        </SidebarMenu>

        {isDemoMode && (
          <div className="mt-1.5 flex flex-col items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2 group-data-[collapsible=icon]:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExitDemo}
              className="w-full bg-primary/10 hover:bg-primary/15"
            >
              Exit Demo
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
