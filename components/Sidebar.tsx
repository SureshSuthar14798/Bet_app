
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  PlayCircle, 
  Wallet, 
  History, 
  User, 
  Settings, 
  Menu, 
  Trophy,
  LayoutGrid,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'live', label: 'Live Events', icon: PlayCircle },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'history', label: 'My Bets', icon: History },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;
  const MSpan = motion.span as any;

  return (
    <MDiv
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-full glass border-r border-slate-200 dark:border-white/10 flex flex-col relative transition-all duration-300 overflow-hidden bg-white/60 dark:bg-dark-950/60"
    >
      {/* Brand */}
      <div className="p-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-red to-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(255,49,49,0.3)]">
            <span className="text-white font-black text-xl italic">N</span>
          </div>
          {!isCollapsed && (
            <MSpan 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white transition-colors"
            >
              NEXUS<span className="text-neon-red">BET</span>
            </MSpan>
          )}
        </div>
      </div>

      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
              ${activeTab === item.id 
                ? 'bg-neon-red text-white font-black shadow-lg shadow-neon-red/20' 
                : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
            `}
          >
            <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'group-hover:text-neon-red transition-colors'} />
            {!isCollapsed && <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>}
            {activeTab === item.id && !isCollapsed && (
              <MDiv layoutId="active" className="ml-auto w-1.5 h-1.5 rounded-full bg-white/40" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-white/10 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
              ${activeTab === item.id 
                ? 'bg-neon-red text-white font-black shadow-lg shadow-neon-red/20' 
                : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
            `}
          >
            <item.icon size={22} />
            {!isCollapsed && <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>}
          </button>
        ))}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 dark:text-white/20 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all mt-4"
        >
          <Menu size={22} />
          {!isCollapsed && <span className="text-sm font-bold uppercase">Collapse</span>}
        </button>
      </div>
    </MDiv>
  );
};

export default Sidebar;
