import React, { useState } from 'react';
import { clsx } from 'clsx';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Package, 
  Clock, 
  Heart, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { VerifiedBadge } from '../ui/Badge';
import { IconButton } from '../ui/IconButton';

export const DashboardLayout = ({ children, currentPath, onNavigate }) => {
  const { currentUser, notifications, logout } = useStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { path: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/listings', label: 'My Listings', icon: ShoppingBag },
    { path: '/dashboard/listings/create', label: 'List an Item', icon: PlusCircle },
    { path: '/dashboard/orders', label: 'Orders', icon: Package },
    { path: '/dashboard/purchases', label: 'Purchase History', icon: Clock },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 flex flex-col font-sans">
      
      {/* Top Dashboard Header Bar */}
      <header className="sticky top-0 z-[1020] h-16 bg-cx-950/90 border-b border-cx-700/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => onNavigate('/')} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-cx-0 text-cx-950 rounded flex items-center justify-center font-bold text-sm">
              CX
            </div>
            <span className="font-bold text-sm tracking-tight text-cx-0 uppercase font-mono hidden sm:inline">
              CAMPUS<span className="text-cx-400 font-light">XCHANGE</span>
            </span>
          </div>

          <div className="h-5 w-[1px] bg-cx-800 hidden sm:block" />

          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-2 text-xs font-mono text-cx-400">
            <span>DASHBOARD</span>
            <ChevronRight className="w-3.5 h-3.5 text-cx-600" />
            <span className="text-cx-0 uppercase font-semibold">
              {currentPath.split('/')[2] || 'Overview'}
            </span>
          </div>
        </div>

        {/* User Identity & Actions */}
        <div className="flex items-center space-x-3">
          <VerifiedBadge text={currentUser ? currentUser.college.split(' ')[0] : 'VERIFIED'} size="sm" className="hidden md:inline-flex font-mono" />

          <IconButton
            icon={
              <div className="relative">
                <Bell className="w-4 h-4 text-cx-0" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cx-0 animate-pulse" />
                )}
              </div>
            }
            ariaLabel="Notifications"
            variant="ghost"
            onClick={() => onNavigate('/dashboard/notifications')}
          />

          <div className="h-5 w-[1px] bg-cx-800" />

          <div 
            onClick={() => onNavigate('/dashboard/profile')}
            className="flex items-center space-x-2 cursor-pointer p-1 rounded-cx-md hover:bg-cx-900 transition-colors"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-7 h-7 rounded-full object-cover border border-cx-700"
            />
            <span className="text-xs font-semibold text-cx-0 hidden sm:inline">{currentUser?.name}</span>
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            icon={isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            ariaLabel="Toggle Navigation"
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          />
        </div>
      </header>

      {/* Main Dashboard Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Navigation Sidebar */}
        <aside className={clsx(
          "hidden md:flex flex-col justify-between bg-cx-950 border-r border-cx-700/80 p-3 transition-all duration-300 shrink-0 select-none",
          isSidebarCollapsed ? "w-16" : "w-60"
        )}>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={clsx(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-cx-md text-xs font-medium transition-all group",
                    isActive
                      ? "bg-cx-850 text-cx-0 border border-cx-700 font-semibold shadow-cx-subtle"
                      : "text-cx-400 hover:text-cx-0 hover:bg-cx-900"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={clsx("w-4 h-4 shrink-0", isActive ? "text-cx-0" : "text-cx-500 group-hover:text-cx-300")} />
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isSidebarCollapsed && item.badge > 0 && (
                    <span className="font-mono text-[10px] bg-cx-0 text-cx-950 font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-cx-800">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-cx-md text-xs font-medium text-cx-500 hover:text-cx-0 hover:bg-cx-900 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0 text-cx-500" />
              {!isSidebarCollapsed && <span>Logout Session</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-[1050] bg-cx-950/95 p-4 space-y-2 overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-cx-800">
              <span className="font-mono text-xs text-cx-400 uppercase">DASHBOARD NAVIGATION</span>
              <IconButton icon={<X className="w-5 h-5" />} ariaLabel="Close Menu" onClick={() => setIsMobileDrawerOpen(false)} />
            </div>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      onNavigate(item.path);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-3 rounded-cx-md text-sm font-medium transition-colors",
                      isActive ? "bg-cx-850 text-cx-0 font-semibold border border-cx-700" : "text-cx-400 hover:bg-cx-900"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-cx-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="font-mono text-xs bg-cx-0 text-cx-950 font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cx-950">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
};
