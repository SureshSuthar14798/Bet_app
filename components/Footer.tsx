
import React from 'react';
import AnimatedLogo from './AnimatedLogo';
import { ShieldCheck, Lock, Globe, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white dark:bg-[#050508] border-t border-slate-200 dark:border-white/5 pt-8 lg:pt-16 pb-8 relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[image:radial-gradient(#000_1px,transparent_1px)] dark:bg-[image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-[1400px] mx-auto px-2 lg:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-3 lg:mb-16">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-3 lg:space-y-6">
                        <div className="flex items-center gap-3">
                            <AnimatedLogo size="md" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                                    NEXUS<span className="text-rose-600 dark:text-neon-red">BET</span>
                                </span>
                                <span className="text-[9px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.3em]">
                                    Premier Betting Protocol
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-white/60 font-medium max-w-sm">
                            NexusBet operates under the Global Gaming Authority license (GGA-2024-X99). 
                            We provide a decentralized, high-frequency betting environment secured by 
                            advanced cryptographic protocols.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <ShieldCheck size={14} className="text-rose-600 dark:text-neon-red" />
                                <span className="text-[10px] font-black text-slate-700 dark:text-white/80 uppercase tracking-widest">SSL Secure</span>
                             </div>
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <Lock size={14} className="text-rose-600 dark:text-neon-red" />
                                <span className="text-[10px] font-black text-slate-700 dark:text-white/80 uppercase tracking-widest">Encrypted</span>
                             </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1 h-3 bg-rose-600 dark:bg-neon-red rounded-sm" /> Company
                        </h4>
                        <ul className="space-y-3">
                            {['About Nexus', 'Terms of Service', 'Privacy Policy', 'AML Policy', 'Responsible Gaming'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-[11px] font-bold text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wide">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-4 lg:space-y-6">
                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1 h-3 bg-rose-600 dark:bg-neon-red rounded-sm" /> Official Partners
                        </h4>
                         <div className="grid grid-cols-2 gap-4 opacity-100 dark:opacity-60">
                            {['BetRadar', 'SportIM', 'FIFA', 'eCOGRA'].map(partner => (
                                <div key={partner} className="text-[10px] font-black text-slate-600 dark:text-white/60 uppercase tracking-widest border border-slate-200 dark:border-white/10 px-3 py-2 rounded hover:border-slate-300 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white transition-all cursor-default">
                                    {partner}
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="lg:col-span-3 space-y-4 lg:space-y-6">
                         <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1 h-3 bg-rose-600 dark:bg-neon-red rounded-sm" /> Methodology
                        </h4>
                        <div className="flex flex-wrap gap-3">
                             {['VISA', 'Mastercard', 'USDT', 'Bitcoin', 'Ethereum', 'Skrill'].map(method => (
                                 <span key={method} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-[10px] font-bold text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-default uppercase">
                                     {method}
                                 </span>
                             ))}
                        </div>
                        <div className="pt-2 lg:pt-4">
                            <div className="flex items-start gap-2">
                                <Globe size={14} className="text-slate-400 dark:text-white/40 mt-0.5" />
                                <p className="text-[10px] font-medium text-slate-500 dark:text-white/40 leading-tight">
                                    Services unavailable in: USA, North Korea, Iran, and restricted jurisdictions.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-white/5 pt-4 lg:pt-8">
                     <p className="text-[10px] font-medium text-slate-400 dark:text-white/30 leading-relaxed uppercase tracking-wide text-justify">
                        SELF-EXCLUSION POLICY: NexusBet is committed to responsible gaming. Users may self-exclude at any time via their profile settings. 
                        This platform utilizes blockchain settlement layers for transparency. By accessing this service, you acknowledge that digital asset values 
                        may fluctuate. Participation is strictly for users 18 years and older. © 2024 NexusBet Protocol. All Rights Reserved.
                     </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
