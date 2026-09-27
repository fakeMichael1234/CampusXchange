import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  Layers, 
  ShoppingBag, 
  ArrowRightLeft, 
  ShieldCheck, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Inbox,
  User,
  Sliders,
  LogOut
} from 'lucide-react';
import { VerifiedBadge } from '../ui/Badge';

export const Sidebar = ({ 
  activeSection = 'all', 
  onSelectSection = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {} 
}) => {
  const categories = [
    { id: 'all', label: 'All Campus Listings', icon: <Layers className="w-4 h-4" />, count: 142 },
    { id: 'electronics', label: 'Tech & Electronics', icon: <ShoppingBag className="w-4 h-4" />, count: 58 },
    { id: 'textbooks', label: 'Textbooks & Notes', icon: <Inbox className="w-4 h-4" />, count: 44 },
    { id: 'exchange', label: 'Peer Exchanges', icon: <ArrowRightLeft className="w-4 h-4" />, count: 22 },
    { id: 'trending', label: 'Trending Items', icon: <TrendingUp className="w-4 h-4" />, count: 18 },
  ];

  const adminLinks = [
    { id: 'verification', label: 'Campus Verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'preferences', label: 'System Tokens', icon: <Sliders className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={clsx(
      "h-full bg-cx-950 border-r border-cx-700/80 flex flex-col justify-between transition-all duration-300 relative select-none shrink-0",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Top Header & Collapse Toggle */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-cx-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs uppercase tracking-wider text-cx-400 font-semibold">
                MARKETPLACE
              </span>
            </div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-cx-md bg-cx-900 border border-cx-700 text-cx-400 hover:text-cx-0 hover:border-cx-500 transition-colors mx-auto"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories Section */}
        <div className="p-2 space-y-6 mt-2">
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono text-cx-500 uppercase tracking-wider">
                Categories
              </div>
            )}
            <div className="space-y-1">
              {categories.map((cat) => {
                const isActive = activeSection === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectSection(cat.id)}
                    title={isCollapsed ? cat.label : undefined}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2 rounded-cx-md text-xs font-medium transition-all group",
                      isActive 
                        ? "bg-cx-850 text-cx-0 border border-cx-700 font-semibold shadow-cx-subtle" 
                        : "text-cx-400 hover:text-cx-0 hover:bg-cx-900"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={clsx(isActive ? "text-cx-0" : "text-cx-500 group-hover:text-cx-300")}>
                        {cat.icon}
                      </span>
                      {!isCollapsed && <span className="truncate">{cat.label}</span>}
                    </div>

                    {!isCollapsed && (
                      <span className="font-mono text-[10px] text-cx-500 bg-cx-900 px-1.5 py-0.5 rounded border border-cx-800">
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Links */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono text-cx-500 uppercase tracking-wider">
                System & Verified
              </div>
            )}
            <div className="space-y-1">
              {adminLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onSelectSection(link.id)}
                    title={isCollapsed ? link.label : undefined}
                    className={clsx(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-cx-md text-xs font-medium transition-all group",
                      isActive 
                        ? "bg-cx-850 text-cx-0 border border-cx-700 font-semibold" 
                        : "text-cx-400 hover:text-cx-0 hover:bg-cx-900"
                    )}
                  >
                    <span className={clsx(isActive ? "text-cx-0" : "text-cx-500 group-hover:text-cx-300")}>
                      {link.icon}
                    </span>
                    {!isCollapsed && <span className="truncate">{link.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer User Info */}
      <div className="p-3 border-t border-cx-800">
        {!isCollapsed ? (
          <div className="flex items-center justify-between p-2 rounded-cx-lg bg-cx-900 border border-cx-800">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-cx-800 border border-cx-700 flex items-center justify-center font-mono font-bold text-xs text-cx-0 shrink-0">
                JD
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-medium text-cx-0 truncate">John Doe</span>
                <span className="text-[10px] font-mono text-cx-500 truncate">mit.edu verified</span>
              </div>
            </div>
            <button className="text-cx-500 hover:text-cx-0 p-1 transition-colors" aria-label="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="w-9 h-9 mx-auto rounded-full bg-cx-800 border border-cx-700 flex items-center justify-center font-mono font-bold text-xs text-cx-0">
            JD
          </div>
        )}
      </div>
    </aside>
  );
};
