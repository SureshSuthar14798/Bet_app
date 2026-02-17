"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import BettingSlip from '@/components/BettingSlip';
import Footer from '@/components/Footer';
import { useBetting } from '@/components/providers/BettingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingCart } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { showBetSuccess, isAuth } = useBetting();
  const router = useRouter();
  const MDiv = motion.div as any;
  const [isMobileSlipOpen, setIsMobileSlipOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 dark:bg-[#050508]">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,49,49,0.03),transparent_70%)]" />
      </div>

      <Navbar />

      <div className="flex-1 overflow-hidden relative z-10">
        <div className="h-full max-w-[1400px] mx-auto flex flex-col lg:flex-row overflow-hidden relative">
          {/* Main Body - Centered Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 relative z-0">
            {children}
            <div className="mt-12">
               <Footer />
            </div>
          </div>

          {/* ... (Rest of layout: Mobile Overlay, Betting Slip, etc.) ... */}
      
          {/* Mobile Overlay for Betting Slip */}
          <AnimatePresence>
            {isMobileSlipOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSlipOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
            )}
          </AnimatePresence>

          {/* Right Betting Slip - Unchanged */}
          <div className={`
             fixed lg:relative z-50 top-14 lg:top-auto bottom-0 right-0 w-[85%] sm:w-[380px] lg:w-auto h-[calc(100%-3.5rem)] lg:h-full bg-white dark:bg-black transition-transform duration-300 transform 
             ${isMobileSlipOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
             lg:block shadow-2xl lg:shadow-none border-l border-slate-200 dark:border-white/10
          `}>
            <BettingSlip />
          </div>

          {/* Mobile Floating Toggle Button - Unchanged */}
          <button
            onClick={() => setIsMobileSlipOpen(!isMobileSlipOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-neon-red shadow-lg shadow-neon-red/30 flex items-center justify-center text-white active:scale-95 transition-all"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>

      {/* Success Toast - Unchanged */}
      <AnimatePresence>
        {showBetSuccess && (
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[100] bg-white dark:bg-[#1a1a25] border border-neon-red/20 rounded-xl p-3 flex items-center gap-3 shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Success!</p>
              <p className="text-[9px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">Stake deployed successfully</p>
            </div>
          </MDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
