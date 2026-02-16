"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useBetting } from '@/components/providers/BettingProvider';
import { useRouter } from 'next/navigation';

// --- CONFIGURATION ---
// In a real app, use environment variables or a backend validation
const VALID_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
};

export default function LoginPage() {
  const { login, isAuth } = useBetting();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  // Mouse Tracking for Animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for high-end feel
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background Parallax Transforms
  const bgX = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [10, -10]);
  const bgY = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
  
  // Spotlight Position
  const spotlightX = useTransform(smoothMouseX, (val) => val);
  const spotlightY = useTransform(smoothMouseY, (val) => val);

  useEffect(() => {
    if (isAuth) {
      router.push('/home'); 
    }
  }, [isAuth, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Clear error when switching modes or typing
    setError('');
  }, [mode, email, password, confirmPassword]);

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
  };

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // For this specific request, we might want to disable registration or make it just redirect
      // But let's assume we proceed to login similar to the regular flow for now
      // Or block it since user wants "only that account"
      setError('Registration is currently closed. Please login with authorized credentials.');
      return;
    }

    // AUTHENTICATION CHECK
    // Debugging logs to help identify issues
    console.log("Attempting login with:", { email, password });
    console.log("Expected credentials:", VALID_CREDENTIALS);

    if (!VALID_CREDENTIALS.email || !VALID_CREDENTIALS.password) {
      console.error("Environment variables are undefined. Please restart the dev server if you just added .env.local");
      setError('System Error: Credentials not configured.');
      return;
    }

    if (email.trim() === VALID_CREDENTIALS.email && password.trim() === VALID_CREDENTIALS.password) {
      login();
      router.push('/home');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-neon-red transition-colors placeholder:text-transparent font-medium";
  const labelClasses = "text-[10px] font-black text-[#a11c1c] dark:text-white/30 uppercase tracking-[0.2em] block mb-1";
  
  // Cast motion components
  const MDiv = motion.div as any;

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-neon-red selection:text-white">
      
      {/* --- INTERACTIVE BACKGROUND LAYER --- */}
      <MDiv 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: bgX, y: bgY, scale: 1.05 }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale brightness-75"
        >
          <source src="/videos/stadium-bg.mp4" type="video/mp4" />
        </video>
      </MDiv>

      {/* --- DYNAMIC SPOTLIGHT LAYER --- */}
      <MDiv 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 49, 49, 0.15), transparent 80%)`
          )
        }}
      />

      {/* --- GRID MESH OVERLAY --- */}
      <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} 
      />

      <AnimatePresence mode="wait">
        <MDiv
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg relative z-10 p-4 sm:p-8 md:p-0"
        >
          <div className="mb-8 md:mb-12">
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-2 md:mb-4 leading-none"
            >
              {mode === 'register' ? 'REGISTRATION' : 'AUTHENTICATION'}
            </motion.h1>
            <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest leading-relaxed">
              {mode === 'register' 
                ? 'Join the elite ranks. Establish your identity.' 
                : 'Enter your credentials to access the Nexus.'}
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className="space-y-10"
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/50 rounded p-3 flex items-start gap-3 text-red-200"
                >
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              {/* E-MAIL */}
              <div className="relative group">
                <label className={labelClasses}>E-MAIL</label>
                <input 
                  type="email" 
                  required 
                  className={inputClasses} 
                  placeholder="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-px bg-neon-red w-0 group-focus-within:w-full transition-all duration-500" />
              </div>

              {/* PASSWORD */}
              <div className="relative group">
                <label className={labelClasses}>PASSWORD</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    className={inputClasses} 
                    placeholder="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-3 text-white/20 hover:text-neon-red transition-colors"
                  >
                    {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="absolute bottom-0 left-0 h-px bg-neon-red w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </div>

              {mode === 'register' && (
                <MDiv 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-8 overflow-hidden"
                >
                  {/* CONFIRM PASSWORD */}
                  <div className="relative group">
                    <label className={labelClasses}>CONFIRM PASSWORD</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        className={inputClasses} 
                        placeholder="confirm password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 bottom-3 text-white/20 hover:text-neon-red transition-colors"
                      >
                        {!showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <div className="absolute bottom-0 left-0 h-px bg-neon-red w-0 group-focus-within:w-full transition-all duration-500" />
                    </div>
                  </div>

                  {/* REFERRAL CODE */}
                  <div className="relative group">
                    <label className={labelClasses}>REFERRAL CODE (OPTIONAL)</label>
                    <input type="text" className={inputClasses} placeholder="code" />
                    <div className="absolute bottom-0 left-0 h-px bg-neon-red w-0 group-focus-within:w-full transition-all duration-500" />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex gap-4 items-start pt-0 lg:pt-4">
                    <div className="relative flex-shrink-0 h-5">
                      <input 
                        type="checkbox" 
                        required
                        className="peer appearance-none w-5 h-5 border border-white/10 rounded cursor-pointer checked:bg-neon-red checked:border-neon-red transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <p className="text-[12px] leading-snug text-white/40 font-bold uppercase tracking-wider">
                      By ticking this box, you agree that you have read and accepted our <span className="text-white hover:text-neon-red cursor-pointer">Terms and Conditions</span> as well as our <span className="text-white hover:text-neon-red cursor-pointer">Privacy Policy</span>.
                    </p>
                  </div>
                </MDiv>
              )}
              
              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest transition-colors">
                    RECOVERY ACCESS?
                  </button>
                </div>
              )}
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-0 !mt-4">
              <button 
                type="submit"
                className="w-full bg-[#a11c1c] text-white font-black text-base uppercase tracking-[0.3em] lg:py-5 py-3 px-8 rounded flex items-center justify-between hover:brightness-110 active:scale-[0.98] transition-all group shadow-[0_20px_40px_rgba(161,28,28,0.3)]"
              >
                <span>{mode === 'register' ? 'VALIDATE' : 'LOGIN HERE'}</span>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <CheckCircle2 size={20} fill="white" className="text-[#a11c1c]" />
                </div>
              </button>
            </div>

            {/* Switch Mode */}
            <div className="text-center">
              <button 
                type="button"
                onClick={toggleMode}
                className="group flex flex-col items-center gap-2 mx-auto"
              >
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] transition-colors group-hover:text-white/40">
                  {mode === 'login' ? "NEW OPERATIVE?" : "EXISTING OPERATIVE?"}
                </span>
                <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] border-b border-neon-red/0 group-hover:border-neon-red transition-all">
                  {mode === 'login' ? 'REGISTER NOW' : 'AUTHORIZE LINK'}
                </span>
              </button>
            </div>
          </form>
        </MDiv>
      </AnimatePresence>
      
      {/* Decorative Bottom Info */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 text-[8px] font-black text-white/10 uppercase tracking-[0.5em] pointer-events-none hidden md:flex">
        <span>Encrypted Protocol Layer: 0x71...F2</span>
        <span>Secure Session Active</span>
      </div>
    </div>
  );
}
