
export interface Team {
  name: string;
  logo: string;
  shortName?: string;
}

export interface Odds {
  home: number;
  draw?: number;
  away: number;
  homeLabel?: string;
  drawLabel?: string;
  awayLabel?: string;
}

export interface Match {
  id: string;
  sport: string;
  league: string;
  leagueFlag?: string;
  homeTeam: Team;
  awayTeam: Team;
  odds: Odds;
  time: string;
  isLive: boolean;
  score?: {
    home: number;
    away: number;
  };
  profit?: string;
  limit?: string;
  soldOut?: number;
  videoUrl?: string;
}

export interface BetSelection {
  matchId: string;
  matchTitle: string;
  selection: 'home' | 'draw' | 'away';
  odds: number;
}

export interface BetRecord {
  id: string;
  matchTitle: string;
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
  status: 'active' | 'won' | 'lost';
  date: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface User {
  name: string;
  email: string;
  balance: number;
  currency: string;
  avatar: string;
  vipLevel: number;
}
