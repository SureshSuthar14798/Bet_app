
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Match, BetSelection, BetRecord } from './types';
import Navbar from './components/Navbar';
import BettingSlip from './components/BettingSlip';
import GlobalLoader from './components/GlobalLoader';

// Pages
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/Wallet';
import WithdrawPage from './pages/Withdraw';
import LiveMatches from './pages/LiveMatches';
import MyBets from './pages/MyBets';
import ProfilePage from './pages/Profile';
import EditProfile from './pages/EditProfile';
import AuthPage from './pages/Auth';
import MatchDetails from './pages/MatchDetails';
import SupportPage from './pages/Support';
import DepositList from './pages/DepositList';
import WithdrawalList from './pages/WithdrawalList';
import BankTransferDeposit from './pages/BankTransferDeposit';

import { MOCK_MATCHES, MOCK_USER_BETS } from './lib/mockData';
import { CheckCircle2, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [placedBets, setPlacedBets] = useState<BetRecord[]>(MOCK_USER_BETS);
  const [isAuth, setIsAuth] = useState(false);
  const [showBetSuccess, setShowBetSuccess] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [user, setUser] = useState<User>({
    name: 'Alex Rivera',
    email: 'gusdnd8448@gmail.com',
    balance: 2450.80,
    currency: 'USD',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    vipLevel: 4
  });

  // Hash Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      
      // If no hash, go to home or login
      if (!hash) {
        window.location.hash = isAuth ? '#/home' : '#/login';
        return;
      }

      // Handle match details route: #/match/1
      if (hash.startsWith('match/')) {
        const id = hash.split('/')[1];
        setSelectedMatchId(id);
        setActiveTab('home'); // Details overlay on home context
      } else {
        setSelectedMatchId(null);
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuth]);

  // Global App Loader Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500); // 2.5s splash
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = () => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAuth(true);
      setIsAppLoading(false);
      window.location.hash = '#/home';
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuth(false);
    window.location.hash = '#/login';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (tab: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      window.location.hash = `#/${tab}`;
      setIsNavigating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400); 
  };

  const handleMatchSelect = (id: string) => {
    window.location.hash = `#/match/${id}`;
  };

  const handleBetSelect = useCallback((match: Match, selection: 'home' | 'draw' | 'away', odds: number) => {
    setSelections(prev => {
      if (prev.find(s => s.matchId === match.id && s.selection === selection)) {
        return prev.filter(s => !(s.matchId === match.id && s.selection === selection));
      }
      const filtered = prev.filter(s => s.matchId !== match.id);
      return [...filtered, {
        matchId: match.id,
        matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        selection,
        odds
      }];
    });
  }, []);

  const handleRemoveBet = useCallback((id: string) => {
    const [matchId, selection] = id.split('-');
    setSelections(prev => prev.filter(s => !(s.matchId === matchId && s.selection === selection)));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelections([]);
  }, []);

  const handlePlaceBet = useCallback((stake: number) => {
    if (stake <= 0 || stake > user.balance || selections.length === 0) return;

    setUser(prev => ({ ...prev, balance: prev.balance - stake }));

    const newBets: BetRecord[] = selections.map(s => ({
      id: `bet-${Math.random().toString(36).substr(2, 9)}`,
      matchTitle: s.matchTitle,
      selection: s.selection === 'home' ? 'Home Winner' : s.selection === 'away' ? 'Away Winner' : 'Draw',
      odds: s.odds,
      stake: stake / selections.length,
      potentialWin: (stake / selections.length) * s.odds,
      status: 'active',
      date: new Date().toISOString().replace('T', ' ').substr(0, 16)
    }));

    setPlacedBets(prev => [...newBets, ...prev]);
    setSelections([]);
    setShowBetSuccess(true);
    setTimeout(() => setShowBetSuccess(false), 3000);
  }, [selections, user.balance]);

  // Use locally casted components to resolve environment-specific TS errors where motion props are not recognized
  const MDiv = motion.div as any;

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-[#050508] font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <AnimatePresence>
        {isAppLoading && <GlobalLoader />}
      </AnimatePresence>

      {!isAuth && !isAppLoading ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <>
          {/* Background Gradient */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,49,49,0.03),transparent_70%)]" />
          </div>

          <Navbar 
            user={user} 
            onLogout={handleLogout} 
            onNavigate={handleNavigate} 
            activeTab={activeTab}
            theme={theme} 
            onThemeToggle={toggleTheme} 
          />
          
          <div className="flex-1 overflow-hidden relative z-10">
            <div className="h-full max-w-[1400px] mx-auto flex overflow-hidden">
              
              {/* Main Body - Centered Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 relative">
                {/* Inner Page Loading Overlay */}
                <AnimatePresence>
                  {isNavigating && (
                    <MDiv 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 bg-slate-100/50 dark:bg-[#050508]/50 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-neon-red animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-red">Updating Intel...</span>
                      </div>
                    </MDiv>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <MDiv
                    key={`${activeTab}-${selectedMatchId}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    {(() => {
                      if (selectedMatchId) {
                        const match = MOCK_MATCHES.find(m => m.id === selectedMatchId);
                        if (match) return (
                          <MatchDetails 
                            match={match} 
                            onBack={() => window.location.hash = '#/home'}
                            onBetSelect={handleBetSelect}
                            selectedBetId={selections.find(s => s.matchId === match.id)?.matchId + '-' + selections.find(s => s.matchId === match.id)?.selection}
                          />
                        );
                      }

                      switch (activeTab) {
                        case 'home': return <Dashboard onBetSelect={handleBetSelect} onMatchSelect={handleMatchSelect} selectedSelections={selections} />;
                        case 'live': return <LiveMatches onBetSelect={handleBetSelect} onMatchSelect={handleMatchSelect} selectedSelections={selections} />;
                        case 'wallet': return <WalletPage />;
                        case 'withdraw': return <WithdrawPage />;
                        case 'history': return <MyBets placedBets={placedBets} />;
                        case 'profile':
                        case 'settings': return <ProfilePage onNavigate={handleNavigate} />;
                        case 'edit-profile': return <EditProfile onBack={() => handleNavigate('profile')} />;
                        case 'support': return <SupportPage />;
                        case 'deposit-list': return <DepositList onBack={() => handleNavigate('profile')} />;
                        case 'withdrawal-list': return <WithdrawalList onBack={() => handleNavigate('profile')} />;
                        case 'deposit-bank': return <BankTransferDeposit onBack={() => handleNavigate('wallet')} />;
                        default: return (
                          <div className="h-full flex flex-col items-center justify-center text-center p-10">
                            <h2 className="text-xl font-black italic mb-2 uppercase text-slate-900 dark:text-white">Coming Soon</h2>
                            <p className="text-slate-400 dark:text-white/40 max-w-sm text-xs">This feature is currently under active development.</p>
                          </div>
                        );
                      }
                    })()}
                  </MDiv>
                </AnimatePresence>
              </div>

              {/* Right Betting Slip */}
              <BettingSlip 
                selections={selections} 
                onRemove={handleRemoveBet} 
                onClearAll={handleClearAll}
                balance={user.balance} 
                onPlaceBet={handlePlaceBet}
              />
            </div>
          </div>

          {/* Success Toast */}
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
        </>
      )}
    </div>
  );
};

export default App;
