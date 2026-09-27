import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav = ({ currentPath = '/', onNavigate = () => {} }) => {
  const { messages } = useStore();
  const unreadCount = messages.filter(m => m.unread).length;

  const items = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Search', icon: Search, path: '/marketplace' },
    { label: 'Sell', icon: PlusCircle, path: '/dashboard/listings/create', isPrimary: true },
    { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages', badge: unreadCount },
    { label: 'Account', icon: User, path: '/dashboard' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1010] bg-cx-950/95 backdrop-blur-md border-t border-cx-800 px-2 py-2 flex items-center justify-around font-mono text-[10px]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        
        if (item.isPrimary) {
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className="flex flex-col items-center justify-center text-cx-950 bg-cx-0 p-2 rounded-full font-bold shadow-cx-glow -mt-4 border border-cx-700 hover:scale-105 transition-transform"
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        }

        return (
          <button
            key={item.label}
            onClick={() => onNavigate(item.path)}
            className={`flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded transition-colors ${
              isActive ? 'text-cx-0 font-bold' : 'text-cx-400 hover:text-cx-200'
            }`}
          >
            <div className="relative">
              <Icon className="w-4 h-4" />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-cx-0 text-[8px] text-cx-950 font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
