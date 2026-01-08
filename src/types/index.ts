export interface Player {
  id: string;
  name: string;
  chineseName: string;
  position: string;
  era: string;
  height: number; // in inches
  weight: number; // in lbs
  stats: PlayerStats;
}

export interface PlayerStats {
  offense: number;      // 進攻能力 1-99
  defense: number;      // 防守能力 1-99
  athleticism: number;  // 運動能力 1-99
  skill: number;        // 技術 1-99
  physical: number;     // 身體素質 1-99
  clutch: number;       // 心理素質 1-99
}

export interface SimulationResult {
  playerA: Player;
  playerB: Player;
  playerAWins: number;
  playerBWins: number;
  games: GameResult[];
  analysis: Analysis;
}

export interface GameResult {
  gameNumber: number;
  playerAScore: number;
  playerBScore: number;
  winner: 'A' | 'B';
}

export interface Analysis {
  winner: Player;
  loser: Player;
  winPercentage: number;
  keyFactors: string[];
  advantages: {
    winner: string[];
    loser: string[];
  };
  avgScoreDiff: number;
  closestGame: GameResult;
  biggestBlowout: GameResult;
}
