
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Landmark, CreditCard, Wallet as WalletIcon, ExternalLink } from 'lucide-react';

import { useRouter } from 'next/navigation';

const WalletPage: React.FC = () => {
  const router = useRouter();

  const depositMethods = [
    {
      id: 'deposit-bank',
      name: 'Bank Transfer',
      icon: <Landmark size={40} className="text-white" />,
      limit: 'US$:3,000 ~ 50,000',
      isIcon: true
    },
    {
      id: 'skrill',
      name: 'Skrill',
      logo: 'SKRILL',
      limit: 'Set by supplier',
      isMax: true
    },
    {
      id: 'neteller',
      name: 'NETELLER',
      logo: 'NETELLER',
      limit: 'US$ 50 ~ 10,000(Week)\nMonth Max: 50,000',
      isLimit: true
    },
    {
      id: 'payz',
      name: 'Payz',
      logo: 'payz',
      limit: 'Set by supplier',
      isMax: true
    },
    {
      id: 'usdt',
      name: 'USDT TRC20',
      icon: <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-black text-xl">₮</div>,
      limit: 'US$:50 ~ 100,000',
      isIcon: true
    },
    {
      id: 'visa',
      name: 'Visa & Master',
      logo: 'VISA / MC',
      limit: 'US$:50 ~ 2,500',
      isLimit: true
    }
  ];

  const handleMethodSelect = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-10 w-full">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">DEPOSIT</h1>
          <p className="text-sm font-bold text-slate-400 dark:text-white/60">Select deposit method</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12">
          {depositMethods.map((method) => (
            <div 
              key={method.id} 
              className="flex flex-col items-center space-y-4 group cursor-pointer"
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="w-full aspect-square bg-[#a11c1c] rounded-[2rem] flex flex-col items-center justify-center p-4 transition-all group-hover:scale-105 group-hover:rotate-1 shadow-[0_15px_35px_rgba(161,28,28,0.3)] border border-white/10 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                {method.isIcon ? (
                  <div className="flex flex-col items-center gap-2">
                     {method.icon}
                     <span className="text-[10px] font-black uppercase tracking-tighter text-white">{method.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-black italic text-white tracking-tighter uppercase">
                      {method.id === 'visa' ? (
                        <div className="flex flex-col items-center leading-tight">
                          <span className="text-xl">VISA</span>
                          <div className="h-[1px] w-full bg-white/20 my-0.5" />
                          <span className="text-[9px] opacity-70">MasterCard</span>
                        </div>
                      ) : method.logo}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight text-white/80">{method.name}</span>
                  </div>
                )}
              </div>
              <div className="text-center space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 italic">
                  {method.isMax ? 'maximum' : 'Limit'}
                </p>
                <p className="text-[10px] font-black text-slate-700 dark:text-white/80 whitespace-pre-line leading-tight">
                  {method.limit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal/Info Text */}
        <div className="pt-16 border-t border-slate-200 dark:border-white/5 space-y-6 max-w-5xl">
          <p className="text-[10px] leading-relaxed text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">
            SML makes every effort to ensure that our prize payout processing rules are fair to our customers and allow us to continue to provide the best odds online without charging any fees.
            We will waive transaction fees where possible, but if you do not exceed our deposit rollover requirement (3x the deposit amount), you will be subject to a 10% processing fee of the withdrawal amount (minimum fee: $20 USD or currency equivalent) and other applicable withdrawal fees.
            Please note that we reserve the right to refuse withdrawals if rollover requirements are not met.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
