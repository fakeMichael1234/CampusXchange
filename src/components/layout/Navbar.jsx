import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, Search, Bell, Menu, X, User,
  LogOut, Package, Heart, MessageSquare, Settings,
  ChevronDown, ShoppingBag, PlusCircle, Sun, Moon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ currentPath = '/', onNavigate = () => {} }) => {
  const { currentUser, logout, notifications, searchQuery, setSearchQuery } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const profileRef = useRef(null);
  const searchRef  = useRef(null);

  const unreadNotifs  = notifications.filter(n => !n.read).length;
  const isLoggedIn    = !!currentUser;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (searchRef.current  && !searchRef.current.contains(e.target))  setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    onNavigate('/');
  };

  const nav = (path) => {
    setMobileOpen(false);
    setProfileOpen(false);
    onNavigate(path);
  };

  const navLinks = [
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => currentPath === path || (path !== '/' && currentPath.startsWith(path));

  return (
    <header className="sticky top-0 z-[1000] h-16 border-b border-cx-800/80 bg-cx-950/95 backdrop-blur-xl font-sans">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* ── Wordmark ───────────────────────────────────────────── */}
        <button
          onClick={() => nav('/')}
          className="flex items-center space-x-2.5 shrink-0 group"
          aria-label="CampusXchange Home"
        >
          <div className="w-8 h-8 bg-cx-0 text-cx-950 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter shadow-cx-subtle group-hover:scale-105 transition-transform">
            CX
          </div>
          <span className="font-bold text-sm tracking-tight text-cx-0 uppercase font-mono hidden sm:block">
            CAMPUS<span className="font-light text-cx-400">XCHANGE</span>
          </span>
        </button>

        {/* ── Center Nav Links (desktop) ───────────────────────── */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => nav(link.path)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive(link.path)
                  ? 'text-cx-0 bg-cx-900'
                  : 'text-cx-400 hover:text-cx-0 hover:bg-cx-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── Right Actions ─────────────────────────────────────── */}
        <div className="flex items-center space-x-2">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-cx-400 hover:text-cx-0 transition-all duration-300 rounded-lg hover:bg-cx-900 relative group"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <span className="block transition-all duration-300">
              {isDark
                ? <Sun className="w-4 h-4 rotate-0 scale-100 transition-all duration-300" />
                : <Moon className="w-4 h-4 rotate-0 scale-100 transition-all duration-300" />}
            </span>
          </button>

          {/* Search icon */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(s => !s)}
              className="p-2 text-cx-400 hover:text-cx-0 transition-colors rounded-lg hover:bg-cx-900"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-cx-900 border border-cx-750 rounded-xl shadow-cx-card-dark p-3">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { setSearchOpen(false); nav('/marketplace'); } }}
                  placeholder="Search listing on campus..."
                  className="w-full bg-cx-950 border border-cx-700 text-cx-0 text-xs px-3 py-2 rounded-lg placeholder-cx-500 focus:outline-none focus:border-cx-0 font-sans"
                />
              </div>
            )}
          </div>

          {/* Sell button (desktop) */}
          {isLoggedIn && (
            <button
              onClick={() => nav('/dashboard/listings/create')}
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-2 bg-cx-900 border border-cx-750 hover:border-cx-500 rounded-lg text-cx-0 font-mono text-xs font-semibold transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Sell</span>
            </button>
          )}

          {/* Notifications */}
          {isLoggedIn && (
            <button
              onClick={() => nav('/dashboard/notifications')}
              className="relative p-2 text-cx-400 hover:text-cx-0 transition-colors rounded-lg hover:bg-cx-900"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cx-0" />
              )}
            </button>
          )}

          {/* Messages */}
          {isLoggedIn && (
            <button
              onClick={() => nav('/dashboard/messages')}
              className="relative p-2 text-cx-400 hover:text-cx-0 transition-colors rounded-lg hover:bg-cx-900 hidden md:block"
              aria-label="Messages"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}

          {/* Auth: logged in = profile menu, logged out = login + get started */}
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(s => !s)}
                className="flex items-center space-x-2 px-2 py-1.5 rounded-xl hover:bg-cx-900 transition-colors border border-transparent hover:border-cx-750"
                aria-label="Profile menu"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-cx-700"
                />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-cx-0 font-mono leading-none max-w-[100px] truncate">
                    {currentUser.name?.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-cx-500 font-mono mt-0.5 flex items-center space-x-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-cx-400" />
                    <span>Verified</span>
                  </div>
                </div>
                <ChevronDown className={`w-3 h-3 text-cx-500 transition-transform hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-cx-900 border border-cx-750 rounded-xl shadow-cx-card-dark py-1 font-mono text-xs z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-cx-800">
                    <div className="font-bold text-cx-0">{currentUser.name}</div>
                    <div className="text-[10px] text-cx-400 mt-0.5 truncate">{currentUser.college}</div>
                    <div className="mt-1.5 inline-flex items-center space-x-1 bg-cx-950 px-2 py-0.5 rounded border border-cx-750">
                      <ShieldCheck className="w-3 h-3 text-cx-0" />
                      <span className="text-[10px] text-cx-300">Verified Student</span>
                    </div>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: User,         label: 'My Profile',       path: '/dashboard/profile' },
                    { icon: ShoppingBag,  label: 'My Listings',      path: '/dashboard/listings' },
                    { icon: Heart,        label: 'Saved Items',       path: '/dashboard/wishlist' },
                    { icon: MessageSquare,label: 'Messages',          path: '/dashboard/messages' },
                    { icon: Package,      label: 'Purchase History',  path: '/dashboard/purchases' },
                    { icon: Settings,     label: 'Settings',          path: '/dashboard/settings' },
                  ].map(item => (
                    <button
                      key={item.path}
                      onClick={() => nav(item.path)}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-cx-300 hover:text-cx-0 hover:bg-cx-850 transition-colors"
                    >
                      <item.icon className="w-3.5 h-3.5 text-cx-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}

                  <div className="border-t border-cx-800 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-cx-400 hover:text-cx-0 hover:bg-cx-850 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => nav('/login')}
                className="px-3.5 py-2 font-mono text-xs text-cx-300 hover:text-cx-0 transition-colors border border-cx-750 rounded-lg hover:border-cx-500"
              >
                Login
              </button>
              <button
                onClick={() => nav('/signup')}
                className="px-3.5 py-2 font-mono text-xs font-bold text-cx-950 bg-cx-0 rounded-lg hover:bg-cx-200 transition-colors shadow-cx-subtle"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(s => !s)}
            className="md:hidden p-2 text-cx-400 hover:text-cx-0 transition-colors rounded-lg hover:bg-cx-900"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cx-800 bg-cx-950 px-4 pb-4 pt-3 space-y-1 font-mono text-xs">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => nav(link.path)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                isActive(link.path) ? 'text-cx-0 bg-cx-900' : 'text-cx-400 hover:text-cx-0 hover:bg-cx-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isLoggedIn && (
            <>
              <button onClick={() => nav('/dashboard/listings/create')} className="w-full text-left px-4 py-2.5 rounded-lg text-cx-400 hover:text-cx-0 hover:bg-cx-900/60">
                Post an Item
              </button>
              <button onClick={() => nav('/dashboard/messages')} className="w-full text-left px-4 py-2.5 rounded-lg text-cx-400 hover:text-cx-0 hover:bg-cx-900/60">
                Messages
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg text-cx-400 hover:text-cx-0 hover:bg-cx-900/60">
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <div className="flex items-center space-x-2 pt-2">
              <button onClick={() => nav('/login')} className="flex-1 py-2.5 border border-cx-750 rounded-lg text-cx-300 hover:text-cx-0">Login</button>
              <button onClick={() => nav('/signup')} className="flex-1 py-2.5 bg-cx-0 text-cx-950 rounded-lg font-bold">Get Started</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
