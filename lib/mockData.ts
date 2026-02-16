
import { Match, Transaction, BetRecord } from '../types';

export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    sport: 'Football',
    league: 'Premier League - Singapore',
    leagueFlag: '⚽',
    homeTeam: { 
      name: 'Balestier Khalsa FC', 
      shortName: 'BAL', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=balestier&backgroundColor=ffd5dc' 
    },
    awayTeam: { 
      name: 'Young Lions FC', 
      shortName: 'YGL', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=lions&backgroundColor=d1f4ff' 
    },
    odds: { 
      home: 2.04, homeLabel: 'UNDER (4)', 
      draw: 1.70, drawLabel: 'OVER (3.5)', 
      away: 2.40, awayLabel: 'OVER (4.5)' 
    },
    time: '11:30',
    isLive: true,
    score: { home: 0, away: 2 },
    profit: '0.57%',
    limit: '3,000 $',
    soldOut: 25.4,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-in-the-grass-near-a-net-4235-large.mp4'
  },
  {
    id: '2',
    sport: 'Football',
    league: 'Champions League',
    leagueFlag: '🇪🇺',
    homeTeam: { 
      name: 'Real Madrid', 
      shortName: 'RMD', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=madrid&backgroundColor=fef3c7' 
    },
    awayTeam: { 
      name: 'Man City', 
      shortName: 'MCI', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=city&backgroundColor=e0f2fe' 
    },
    odds: { 
      home: 1.95, homeLabel: 'HOME', 
      draw: 3.40, drawLabel: 'DRAW', 
      away: 2.10, awayLabel: 'AWAY' 
    },
    time: '21:00',
    isLive: true,
    score: { home: 1, away: 1 },
    profit: '0.82%',
    limit: '5,000 $',
    soldOut: 64.2,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-football-match-in-the-stadium-at-night-4240-large.mp4'
  },
  {
    id: '3',
    sport: 'Basketball',
    league: 'NBA',
    leagueFlag: '🇺🇸',
    homeTeam: { 
      name: 'LA Lakers', 
      shortName: 'LAK', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=lakers&backgroundColor=f3e8ff' 
    },
    awayTeam: { 
      name: 'Golden State', 
      shortName: 'GSW', 
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=warriors&backgroundColor=fffbeb' 
    },
    odds: { 
      home: 1.85, homeLabel: 'UNDER (210.5)', 
      away: 1.95, awayLabel: 'OVER (210.5)' 
    },
    time: '04:21',
    isLive: true,
    score: { home: 88, away: 92 },
    profit: '1.12%',
    limit: '10,000 $',
    soldOut: 12.5,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-dunking-in-a-stadium-at-night-4236-large.mp4'
  },
  {
    id: '4',
    sport: 'Football',
    league: 'Serie A',
    leagueFlag: '🇮🇹',
    homeTeam: { name: 'Juventus', shortName: 'JUV', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=juv' },
    awayTeam: { name: 'AC Milan', shortName: 'ACM', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=milan' },
    odds: { home: 2.15, draw: 3.10, away: 3.40, homeLabel: 'HOME', drawLabel: 'DRAW', awayLabel: 'AWAY' },
    time: '18:45',
    isLive: true,
    score: { home: 2, away: 0 },
    profit: '0.94%',
    limit: '4,500 $',
    soldOut: 45.8,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-stadium-and-ball-4239-large.mp4'
  },
  {
    id: '5',
    sport: 'Football',
    league: 'La Liga',
    leagueFlag: '🇪🇸',
    homeTeam: { name: 'Barcelona', shortName: 'BAR', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=barca' },
    awayTeam: { name: 'Atletico', shortName: 'ATL', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=atl' },
    odds: { home: 1.80, draw: 3.50, away: 4.20, homeLabel: 'UNDER (2.5)', drawLabel: 'EXACT 3', awayLabel: 'OVER (3.5)' },
    time: '20:00',
    isLive: false,
    profit: '0.65%',
    limit: '6,000 $',
    soldOut: 15.2
  },
  {
    id: '6',
    sport: 'Basketball',
    league: 'EuroLeague',
    leagueFlag: '🇪🇺',
    homeTeam: { name: 'Fenerbahce', shortName: 'FEN', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fen' },
    awayTeam: { name: 'Real Madrid', shortName: 'RMB', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=rmb' },
    odds: { home: 1.75, away: 2.05, homeLabel: 'HOME', awayLabel: 'AWAY' },
    time: '19:30',
    isLive: true,
    score: { home: 74, away: 71 },
    profit: '1.25%',
    limit: '8,000 $',
    soldOut: 88.4,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-game-on-court-2300-large.mp4'
  },
  {
    id: '7',
    sport: 'Tennis',
    league: 'Wimbledon',
    leagueFlag: '🎾',
    homeTeam: { name: 'Alcaraz', shortName: 'ALC', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=alc' },
    awayTeam: { name: 'Djokovic', shortName: 'DJO', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=djo' },
    odds: { home: 2.10, away: 1.70, homeLabel: 'SET 1', awayLabel: 'SET 2' },
    time: '14:00',
    isLive: false,
    profit: '2.50%',
    limit: '15,000 $',
    soldOut: 5.0
  },
  {
    id: '8',
    sport: 'Baseball',
    league: 'MLB',
    leagueFlag: '⚾',
    homeTeam: { name: 'NY Yankees', shortName: 'NYY', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=nyy' },
    awayTeam: { name: 'LA Dodgers', shortName: 'LAD', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=lad' },
    odds: { home: 1.90, away: 1.90, homeLabel: 'WIN', awayLabel: 'WIN' },
    time: '01:05',
    isLive: false,
    profit: '0.45%',
    limit: '2,500 $',
    soldOut: 32.1
  },
  {
    id: '9',
    sport: 'Football',
    league: 'Bundesliga',
    leagueFlag: '🇩🇪',
    homeTeam: { name: 'Bayern Munich', shortName: 'FCB', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=bayern' },
    awayTeam: { name: 'Dortmund', shortName: 'BVB', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=bvb' },
    odds: { home: 1.65, draw: 4.20, away: 5.00, homeLabel: '1', drawLabel: 'X', awayLabel: '2' },
    time: '15:30',
    isLive: true,
    score: { home: 3, away: 1 },
    profit: '0.77%',
    limit: '12,000 $',
    soldOut: 95.0,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-football-match-at-the-stadium-at-night-4240-large.mp4'
  },
  {
    id: '10',
    sport: 'Football',
    league: 'Ligue 1',
    leagueFlag: '🇫🇷',
    homeTeam: { name: 'PSG', shortName: 'PSG', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=psg' },
    awayTeam: { name: 'Marseille', shortName: 'MAR', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=mar' },
    odds: { home: 1.40, draw: 5.50, away: 9.00, homeLabel: 'HOME', drawLabel: 'DRAW', awayLabel: 'AWAY' },
    time: '21:00',
    isLive: false,
    profit: '0.55%',
    limit: '20,000 $',
    soldOut: 10.5
  },
  {
    id: '11',
    sport: 'Basketball',
    league: 'WNBA',
    leagueFlag: '🇺🇸',
    homeTeam: { name: 'LV Aces', shortName: 'LVA', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=aces' },
    awayTeam: { name: 'NY Liberty', shortName: 'NYL', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=liberty' },
    odds: { home: 1.95, away: 1.85, homeLabel: 'SPREAD -4.5', awayLabel: 'SPREAD +4.5' },
    time: '03:00',
    isLive: false,
    profit: '1.40%',
    limit: '3,500 $',
    soldOut: 55.2
  },
  {
    id: '12',
    sport: 'Tennis',
    league: 'US Open',
    leagueFlag: '🎾',
    homeTeam: { name: 'Sinner', shortName: 'SIN', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=sinner' },
    awayTeam: { name: 'Medvedev', shortName: 'MED', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=med' },
    odds: { home: 1.60, away: 2.30, homeLabel: 'WIN', awayLabel: 'WIN' },
    time: '17:00',
    isLive: true,
    score: { home: 2, away: 1 },
    profit: '3.10%',
    limit: '7,500 $',
    soldOut: 42.1,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-a-ball-4237-large.mp4'
  },
  {
    id: '13',
    sport: 'Football',
    league: 'K League 1',
    leagueFlag: '🇰🇷',
    homeTeam: { name: 'Ulsan HD', shortName: 'ULS', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=ulsan' },
    awayTeam: { name: 'Jeonbuk', shortName: 'JEO', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=jeonbuk' },
    odds: { home: 2.30, draw: 3.20, away: 2.90, homeLabel: '1', drawLabel: 'X', awayLabel: '2' },
    time: '19:00',
    isLive: true,
    score: { home: 0, away: 0 },
    profit: '1.15%',
    limit: '5,000 $',
    soldOut: 20.8,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-in-the-grass-near-a-net-4235-large.mp4'
  }
];

export const MOCK_USER_BETS: BetRecord[] = [
  {
    id: 'b1',
    matchTitle: 'Real Madrid vs Man City',
    selection: 'Home Winner',
    odds: 2.45,
    stake: 50,
    potentialWin: 122.5,
    status: 'active',
    date: '2024-05-14 14:00'
  }
];
