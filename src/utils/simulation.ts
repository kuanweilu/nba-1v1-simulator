import { Player, GameResult, SimulationResult, Analysis } from '../types';

// 位置類型：用於判斷錯位情況
type PositionType = 'guard' | 'wing' | 'big';

function getPositionType(position: string): PositionType {
  if (position === 'PG' || position === 'SG') return 'guard';
  if (position === 'SF') return 'wing';
  return 'big'; // PF, C
}

// 計算速度優勢
// 速度差距越大，快的球員優勢越明顯（可以過人、拉開距離）
function calculateSpeedAdvantage(attacker: Player, defender: Player): number {
  const attackerSpeed = attacker.stats.athleticism;
  const defenderSpeed = defender.stats.athleticism;
  const speedDiff = attackerSpeed - defenderSpeed;

  // 速度差距超過 10，每多 1 點增加 1.5% 優勢
  if (speedDiff > 10) {
    return (speedDiff - 10) * 0.015 + 0.05;
  } else if (speedDiff > 0) {
    return speedDiff * 0.005;
  }
  return 0;
}

// 計算射程優勢
// 技術高代表投射能力好，可以在遠距離出手，減少身高劣勢
function calculateRangeAdvantage(attacker: Player, defender: Player): number {
  const attackerSkill = attacker.stats.skill;
  const heightDiff = defender.height - attacker.height; // 防守方身高優勢

  // 如果進攻方技術很高（>90），且對方比自己高很多，射程優勢更明顯
  if (attackerSkill >= 90 && heightDiff > 5) {
    // 技術越高，越能利用射程拉開距離，抵消身高劣勢
    return (attackerSkill - 85) * 0.008;
  }
  return 0;
}

// 計算錯位優勢/劣勢
function calculateMismatchFactor(attacker: Player, defender: Player): number {
  const attackerType = getPositionType(attacker.position);
  const defenderType = getPositionType(defender.position);

  // 後衛 vs 大個子：錯位！
  if (attackerType === 'guard' && defenderType === 'big') {
    const speedDiff = attacker.stats.athleticism - defender.stats.athleticism;
    const skillDiff = attacker.stats.skill - defender.stats.skill;

    // 如果後衛速度快、技術好，可以利用錯位
    // Iverson (athleticism 92, skill 96) vs Shaq (athleticism 92, skill 78)
    // Curry (athleticism 82, skill 99) vs Shaq
    const mismatchAdvantage = (speedDiff * 0.008) + (skillDiff * 0.006);

    // 後衛對大個子，技術和速度的優勢被放大
    return Math.max(0, mismatchAdvantage);
  }

  // 大個子 vs 後衛：低位優勢
  if (attackerType === 'big' && defenderType === 'guard') {
    const heightDiff = attacker.height - defender.height;
    const physicalDiff = attacker.stats.physical - defender.stats.physical;

    // 大個子在低位有優勢，但如果對方速度太快可能被抄截
    const postAdvantage = (heightDiff * 0.008) + (physicalDiff * 0.004);
    const defenderSpeed = defender.stats.athleticism;

    // 如果防守的後衛速度很快，會減少低位優勢（抄截、包夾感）
    const speedPenalty = defenderSpeed > 90 ? (defenderSpeed - 90) * 0.005 : 0;

    return Math.max(0, postAdvantage - speedPenalty);
  }

  return 0;
}

// 計算身高因素（重新設計：只在相近位置時才明顯）
function calculateHeightFactor(attacker: Player, defender: Player): number {
  const attackerType = getPositionType(attacker.position);
  const defenderType = getPositionType(defender.position);
  const heightDiff = attacker.height - defender.height;

  // 同位置對決：身高有適度優勢
  if (attackerType === defenderType) {
    return heightDiff * 0.006; // 每英寸 0.6%
  }

  // 不同位置：身高優勢大幅降低（因為有其他錯位因素）
  return heightDiff * 0.002; // 每英寸只有 0.2%
}

// 計算單次進攻的得分機率（重新設計）
function calculateScoringProbability(
  attacker: Player,
  defender: Player
): number {
  const attackerStats = attacker.stats;
  const defenderStats = defender.stats;

  // === 基礎進攻能力 ===
  const offensiveRating =
    attackerStats.offense * 0.30 +
    attackerStats.skill * 0.30 +      // 提高技術權重
    attackerStats.athleticism * 0.20 + // 速度/運動能力
    attackerStats.clutch * 0.20;       // 關鍵時刻

  // === 基礎防守能力 ===
  const defensiveRating =
    defenderStats.defense * 0.35 +
    defenderStats.athleticism * 0.30 + // 防守也需要速度
    defenderStats.skill * 0.20 +       // 防守技巧
    defenderStats.physical * 0.15;

  // === 基礎得分機率 ===
  let baseProbability = offensiveRating / (offensiveRating + defensiveRating);

  // === 多元因素調整 ===

  // 1. 速度優勢（快打慢）
  const speedAdvantage = calculateSpeedAdvantage(attacker, defender);

  // 2. 射程優勢（射手對大個子）
  const rangeAdvantage = calculateRangeAdvantage(attacker, defender);

  // 3. 錯位因素
  const mismatchFactor = calculateMismatchFactor(attacker, defender);

  // 4. 身高因素（降低影響）
  const heightFactor = calculateHeightFactor(attacker, defender);

  // === 綜合計算 ===
  baseProbability += speedAdvantage;
  baseProbability += rangeAdvantage;
  baseProbability += mismatchFactor;
  baseProbability += heightFactor;

  // 確保機率在合理範圍內 (30% - 70%)
  // 1v1 不會有太極端的差距
  return Math.max(0.30, Math.min(0.70, baseProbability));
}

// 模擬單場比賽 (打到11分，需贏2分)
function simulateSingleGame(playerA: Player, playerB: Player): GameResult {
  let scoreA = 0;
  let scoreB = 0;
  let possession: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';

  const targetScore = 11;
  const minLead = 2;

  while (true) {
    // 檢查是否達到勝利條件
    if (scoreA >= targetScore && scoreA - scoreB >= minLead) {
      break;
    }
    if (scoreB >= targetScore && scoreB - scoreA >= minLead) {
      break;
    }

    if (possession === 'A') {
      const scoringProb = calculateScoringProbability(playerA, playerB);
      if (Math.random() < scoringProb) {
        scoreA++;
      } else {
        possession = 'B';
      }
    } else {
      const scoringProb = calculateScoringProbability(playerB, playerA);
      if (Math.random() < scoringProb) {
        scoreB++;
      } else {
        possession = 'A';
      }
    }

    // 防止無限循環
    if (scoreA + scoreB > 100) {
      break;
    }
  }

  return {
    gameNumber: 0,
    playerAScore: scoreA,
    playerBScore: scoreB,
    winner: scoreA > scoreB ? 'A' : 'B',
  };
}

// 分析錯位情況
function analyzeMismatch(playerA: Player, playerB: Player): string[] {
  const factors: string[] = [];
  const typeA = getPositionType(playerA.position);
  const typeB = getPositionType(playerB.position);

  // 速度差異
  const speedDiff = playerA.stats.athleticism - playerB.stats.athleticism;
  if (Math.abs(speedDiff) > 10) {
    const faster = speedDiff > 0 ? playerA : playerB;
    factors.push(`${faster.name} 的速度優勢讓對手難以防守`);
  }

  // 射程優勢
  if (playerA.stats.skill >= 95 && typeB === 'big') {
    factors.push(`${playerA.name} 可以用遠距離投射拉開空間`);
  }
  if (playerB.stats.skill >= 95 && typeA === 'big') {
    factors.push(`${playerB.name} 可以用遠距離投射拉開空間`);
  }

  // 錯位分析
  if (typeA === 'guard' && typeB === 'big') {
    factors.push(`${playerA.name} 的速度和靈活性在錯位中佔優`);
    factors.push(`${playerB.name} 需要在低位找機會`);
  } else if (typeA === 'big' && typeB === 'guard') {
    factors.push(`${playerA.name} 在低位有身材優勢`);
    factors.push(`${playerB.name} 需要用速度和技巧對抗`);
  }

  return factors;
}

// 生成分析報告
function generateAnalysis(
  playerA: Player,
  playerB: Player,
  games: GameResult[]
): Analysis {
  const playerAWins = games.filter(g => g.winner === 'A').length;
  const playerBWins = games.length - playerAWins;

  const winner = playerAWins > playerBWins ? playerA : playerB;
  const loser = playerAWins > playerBWins ? playerB : playerA;
  const winCount = Math.max(playerAWins, playerBWins);

  // 計算平均分差
  const totalScoreDiff = games.reduce((sum, g) => {
    const diff = playerAWins > playerBWins
      ? g.playerAScore - g.playerBScore
      : g.playerBScore - g.playerAScore;
    return sum + diff;
  }, 0);
  const avgScoreDiff = totalScoreDiff / games.length;

  // 找出最接近和最大分差的比賽
  const sortedByDiff = [...games].sort((a, b) => {
    const diffA = Math.abs(a.playerAScore - a.playerBScore);
    const diffB = Math.abs(b.playerAScore - b.playerBScore);
    return diffA - diffB;
  });
  const closestGame = sortedByDiff[0];
  const biggestBlowout = sortedByDiff[sortedByDiff.length - 1];

  // 分析關鍵因素
  const keyFactors: string[] = [];
  const winnerAdvantages: string[] = [];
  const loserAdvantages: string[] = [];

  // 錯位分析
  const mismatchFactors = analyzeMismatch(winner, loser);
  keyFactors.push(...mismatchFactors.slice(0, 2));

  // 比較各項能力
  const compareStats = (
    stat: keyof typeof winner.stats,
    label: string,
    description: string
  ) => {
    const diff = winner.stats[stat] - loser.stats[stat];
    if (diff > 5) {
      winnerAdvantages.push(`${label}較強 (${winner.stats[stat]} vs ${loser.stats[stat]})`);
      if (diff > 15) {
        keyFactors.push(`${winner.name} 的${description}優勢明顯`);
      }
    } else if (diff < -5) {
      loserAdvantages.push(`${label}較強 (${loser.stats[stat]} vs ${winner.stats[stat]})`);
      if (diff < -15) {
        keyFactors.push(`${loser.name} 的${description}較為突出`);
      }
    }
  };

  compareStats('offense', '進攻能力', '得分能力');
  compareStats('defense', '防守能力', '防守');
  compareStats('athleticism', '運動能力', '速度和爆發力');
  compareStats('skill', '技術', '技術');
  compareStats('physical', '身體素質', '身體對抗');
  compareStats('clutch', '關鍵時刻', '關鍵球處理');

  // 身高分析（降低重要性）
  const heightDiff = winner.height - loser.height;
  const winnerType = getPositionType(winner.position);
  const loserType = getPositionType(loser.position);

  if (heightDiff > 5 && winnerType === loserType) {
    winnerAdvantages.push(`身高優勢 (${Math.floor(winner.height / 12)}'${winner.height % 12}" vs ${Math.floor(loser.height / 12)}'${loser.height % 12}")`);
  } else if (heightDiff < -5 && winnerType === loserType) {
    loserAdvantages.push(`身高優勢 (${Math.floor(loser.height / 12)}'${loser.height % 12}" vs ${Math.floor(winner.height / 12)}'${winner.height % 12}")`);
  }

  // 如果關鍵因素不足，添加通用分析
  if (keyFactors.length === 0) {
    keyFactors.push('兩位球員實力接近，勝負取決於細節');
  }

  return {
    winner,
    loser,
    winPercentage: (winCount / games.length) * 100,
    keyFactors,
    advantages: {
      winner: winnerAdvantages.length > 0 ? winnerAdvantages : ['整體能力平衡'],
      loser: loserAdvantages.length > 0 ? loserAdvantages : ['整體能力平衡'],
    },
    avgScoreDiff,
    closestGame,
    biggestBlowout,
  };
}

// 執行 100 場模擬
export function runSimulation(
  playerA: Player,
  playerB: Player,
  numGames: number = 100
): SimulationResult {
  const games: GameResult[] = [];

  for (let i = 0; i < numGames; i++) {
    const game = simulateSingleGame(playerA, playerB);
    game.gameNumber = i + 1;
    games.push(game);
  }

  const playerAWins = games.filter(g => g.winner === 'A').length;
  const playerBWins = numGames - playerAWins;

  const analysis = generateAnalysis(playerA, playerB, games);

  return {
    playerA,
    playerB,
    playerAWins,
    playerBWins,
    games,
    analysis,
  };
}
