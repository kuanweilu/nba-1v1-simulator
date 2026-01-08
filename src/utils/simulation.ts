import { Player, GameResult, SimulationResult, Analysis } from '../types';

// 計算單次進攻的得分機率
function calculateScoringProbability(
  attacker: Player,
  defender: Player
): number {
  const attackerStats = attacker.stats;
  const defenderStats = defender.stats;

  // 進攻方的綜合進攻能力
  const offensiveRating =
    attackerStats.offense * 0.35 +
    attackerStats.skill * 0.25 +
    attackerStats.athleticism * 0.2 +
    attackerStats.physical * 0.1 +
    attackerStats.clutch * 0.1;

  // 防守方的綜合防守能力
  const defensiveRating =
    defenderStats.defense * 0.4 +
    defenderStats.athleticism * 0.25 +
    defenderStats.physical * 0.2 +
    defenderStats.skill * 0.15;

  // 身高差異加成 (每英寸 1.5%)
  const heightDiff = attacker.height - defender.height;
  const heightBonus = heightDiff * 0.015;

  // 基礎得分機率
  let baseProbability = offensiveRating / (offensiveRating + defensiveRating);

  // 加入身高加成
  baseProbability += heightBonus;

  // 確保機率在合理範圍內 (25% - 75%)
  return Math.max(0.25, Math.min(0.75, baseProbability));
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
      // A 進攻
      const scoringProb = calculateScoringProbability(playerA, playerB);
      if (Math.random() < scoringProb) {
        scoreA++;
        // 進球後繼續持球
      } else {
        // 失誤或被防守，換邊
        possession = 'B';
      }
    } else {
      // B 進攻
      const scoringProb = calculateScoringProbability(playerB, playerA);
      if (Math.random() < scoringProb) {
        scoreB++;
        // 進球後繼續持球
      } else {
        // 失誤或被防守，換邊
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

  // 比較各項能力
  const compareStats = (
    stat: keyof typeof winner.stats,
    label: string
  ) => {
    const diff = winner.stats[stat] - loser.stats[stat];
    if (diff > 5) {
      winnerAdvantages.push(`${label}較強 (${winner.stats[stat]} vs ${loser.stats[stat]})`);
      if (diff > 10) {
        keyFactors.push(`${winner.name} 的${label}明顯優於 ${loser.name}`);
      }
    } else if (diff < -5) {
      loserAdvantages.push(`${label}較強 (${loser.stats[stat]} vs ${winner.stats[stat]})`);
    }
  };

  compareStats('offense', '進攻能力');
  compareStats('defense', '防守能力');
  compareStats('athleticism', '運動能力');
  compareStats('skill', '技術');
  compareStats('physical', '身體素質');
  compareStats('clutch', '關鍵時刻表現');

  // 身高分析
  const heightDiff = winner.height - loser.height;
  if (heightDiff > 3) {
    keyFactors.push(`${winner.name} 身高優勢 (+${heightDiff} 英寸)`);
    winnerAdvantages.push(`身高優勢 (${Math.floor(winner.height / 12)}'${winner.height % 12}" vs ${Math.floor(loser.height / 12)}'${loser.height % 12}")`);
  } else if (heightDiff < -3) {
    loserAdvantages.push(`身高優勢 (${Math.floor(loser.height / 12)}'${loser.height % 12}" vs ${Math.floor(winner.height / 12)}'${winner.height % 12}")`);
  }

  // 總體評分
  const winnerOverall = Object.values(winner.stats).reduce((a, b) => a + b, 0) / 6;
  const loserOverall = Object.values(loser.stats).reduce((a, b) => a + b, 0) / 6;
  if (winnerOverall > loserOverall + 3) {
    keyFactors.push(`${winner.name} 的整體能力評分較高`);
  }

  // 如果關鍵因素不足，添加一些通用分析
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
