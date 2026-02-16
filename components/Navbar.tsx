"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, Sun, Moon, Home, History, ArrowUpRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedLogo from './AnimatedLogo';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBetting } from '@/components/providers/BettingProvider';

const Navbar: React.FC = () => {
  const { user, logout, theme, toggleTheme } = useBetting();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home, href: '/home' },
    { id: 'history', label: 'My Bets', icon: History, href: '/my-bets' },
  ];

  const profileMenuItems = [
    { label: 'PROFILE SETTINGS', id: 'profile', href: '/profile' },
    { label: 'DEPOSIT', id: 'wallet', href: '/wallet' },
    { label: 'WITHDRAWAL', id: 'withdraw', href: '/withdraw' },
    { label: 'E-MAIL CONSULTATION', id: 'support', href: '/support' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="h-14 w-full glass sticky top-0 z-50 border-b border-slate-200 dark:border-white/5 backdrop-blur-xl bg-white/80 dark:bg-black/80 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto h-full flex items-center px-4 gap-6">
        {/* Brand with Animated Logo */}
        <Link 
          href="/home"
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0" 
        >
          <AnimatedLogo size="sm" />
          <span className="text-lg font-black italic tracking-tighter text-slate-900 dark:text-white uppercase hidden sm:block">
            NEXUS<span className="text-neon-red">BET</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center h-full flex-1 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`h-full px-4 flex items-center gap-2 transition-all relative text-[11px] font-black uppercase tracking-wider
                  ${isActive 
                    ? 'text-neon-red' 
                    : 'text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white'}
                `}
              >
                <item.icon size={14} className={isActive ? 'text-neon-red' : ''} />
                <span className="hidden md:block">{item.label}</span>
                {isActive && (
                  <MDiv layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-red" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Quick Deposit Link */}
          <Link 
            href="/wallet"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-red/10 border border-neon-red/20 text-neon-red text-[10px] font-black uppercase hover:bg-neon-red hover:text-white transition-all group"
          >
            <span>Deposit</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* User Balance */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full transition-colors">
            <span className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase">USDT</span>
            <span className="text-xs font-black text-neon-red tracking-tight tabular-nums">
              $<AnimatedCounter value={user.balance} decimals={2} />
            </span>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-400 dark:text-white/20 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-1.5 rounded-lg transition-colors ${
                isNotificationsOpen 
                  ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10' 
                  : 'text-slate-400 dark:text-white/20 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-red rounded-full ring-2 ring-white dark:ring-black" />
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <MDiv
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-4 w-80 bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] flex flex-col"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Notifications</span>
                    <button className="text-[9px] font-black text-neon-red uppercase tracking-widest hover:underline">Mark all read</button>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {[
                      { id: 1, title: 'Bet Settled', message: 'Lakers vs GSW (Over 220.5) won!', time: '2m ago', type: 'success' },
                      { id: 2, title: 'Deposit Successful', message: 'Your deposit of $500.00 has been credited.', time: '1h ago', type: 'info' },
                      { id: 3, title: 'System Update', message: 'Maintenance scheduled for 03:00 AM UTC.', time: '5h ago', type: 'warning' }
                    ].map((notif) => (
                      <div key={notif.id} className="px-4 py-3 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            notif.type === 'success' ? 'bg-neon-lime' : 
                            notif.type === 'warning' ? 'bg-yellow-500' : 'bg-neon-blue'
                          }`} />
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-black text-slate-900 dark:text-white leading-tight group-hover:text-neon-red transition-colors">{notif.title}</p>
                            <p className="text-[10px] text-slate-500 dark:text-white/60 leading-tight">{notif.message}</p>
                            <p className="text-[9px] text-slate-400 dark:text-white/30 font-medium pt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <button className="w-full py-2 text-[9px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                      View All Activity
                    </button>
                  </div>
                </MDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer select-none pl-2 border-l border-slate-200 dark:border-white/10"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 p-0.5 bg-white dark:bg-black">
                <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
              </div>
              <ChevronDown size={12} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <MDiv
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-4 z-[60]"
                >
                  <div className="px-4 py-2 mb-4 border-b border-slate-100 dark:border-white/5 pb-4">
                    <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest leading-none mb-2">SIGNED IN AS</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full block text-left px-4 py-2 text-[11px] font-black text-slate-500 dark:text-white/40 hover:text-neon-red hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all uppercase tracking-[0.1em]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-[#fff0f0] dark:bg-neon-red/10 text-neon-red font-black text-[12px] uppercase tracking-widest py-2 rounded-2xl hover:bg-neon-red hover:text-white transition-all shadow-sm"
                    >
                      LOG OUT
                    </button>
                  </div>
                </MDiv>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;