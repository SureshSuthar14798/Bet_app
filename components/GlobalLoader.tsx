
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const GlobalLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;
  const MH2 = motion.h2 as any;

  return (
    <MDiv
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#020205] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-red/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative flex flex-col items-center gap-6">
        <AnimatedLogo size="xl" />
        
        <div className="space-y-4 w-64 text-center">
          <MH2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-black italic tracking-[0.3em] text-xs uppercase"
          >
            Nexus Protocol Initializing
          </MH2>
          
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <MDiv 
              className="h-full bg-neon-red shadow-[0_0_15px_#ff3131]"
              style={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[8px] font-black text-white/30 tracking-widest uppercase">
            <span>Securing Connection</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">
        <span>Encrypted Link: 0x71...F2</span>
        <span>Version 4.2.0-STABLE</span>
      </div>
    </MDiv>
  );
};

export default GlobalLoader;
