"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, Match, BetSelection, BetRecord } from '@/types';
import { MOCK_USER_BETS } from '@/lib/mockData';

interface BettingContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  selections: BetSelection[];
  placedBets: BetRecord[];
  isAuth: boolean;
  theme: 'dark' | 'light';
  login: () => void;
  logout: () => void;
  toggleTheme: () => void;
  addSelection: (match: Match, selection: 'home' | 'draw' | 'away', odds: number) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  placeBet: (stake: number) => void;
  showBetSuccess: boolean;
}

const BettingContext = createContext<BettingContextType | undefined>(undefined);

export const BettingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Alex Rivera',
    email: 'gusdnd8448@gmail.com',
    balance: 2450.80,
    currency: 'USD',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    vipLevel: 4
  });

  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [placedBets, setPlacedBets] = useState<BetRecord[]>(MOCK_USER_BETS);
  const [isAuth, setIsAuth] = useState(false);
  const [showBetSuccess, setShowBetSuccess] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = useCallback(() => {
    setIsAuth(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const addSelection = useCallback((match: Match, selection: 'home' | 'draw' | 'away', odds: number) => {
    setSelections(prev => {
      // Toggle logic
      if (prev.find(s => s.matchId === match.id && s.selection === selection)) {
        return prev.filter(s => !(s.matchId === match.id && s.selection === selection));
      }
      // Replace existing selection for same match
      const filtered = prev.filter(s => s.matchId !== match.id);
      return [...filtered, {
        matchId: match.id,
        matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        selection,
        odds
      }];
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    // id is matchId-selection (e.g. "1-home")
    const [matchId, selection] = id.split('-');
    setSelections(prev => prev.filter(s => !(s.matchId === matchId && s.selection === selection)));
  }, []);

  const clearSelections = useCallback(() => {
    setSelections([]);
  }, []);

  const placeBet = useCallback((stake: number) => {
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

  return (
    <BettingContext.Provider value={{
      user, setUser, selections, placedBets, isAuth, theme,
      login, logout, toggleTheme,
      addSelection, removeSelection, clearSelections, placeBet,
      showBetSuccess
    }}>
      {children}
    </BettingContext.Provider>
  );
};

export const useBetting = () => {
  const context = useContext(BettingContext);
  if (context === undefined) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
};
