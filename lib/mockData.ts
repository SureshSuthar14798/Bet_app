
import { Match, BetRecord } from '../types';
const footballvideo = "/videos/bgFootball.mp4";
const Baseballvideo = "/videos/bgBaseball.mp4";
const Basketballvideo = "/videos/bgBasketball.mp4";

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
    videoUrl: Basketballvideo
  },
  {
    id: '3',
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
    soldOut: 32.1,
    videoUrl: Baseballvideo
  },
  {
    id: '4',
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
    videoUrl: footballvideo
  },
  {
    id: '5',
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
    videoUrl: Basketballvideo
  },
  {
    id: '6',
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
    videoUrl: footballvideo
  },
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
