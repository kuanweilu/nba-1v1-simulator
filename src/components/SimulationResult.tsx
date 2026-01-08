import { SimulationResult as SimResult } from '../types';

interface SimulationResultProps {
  result: SimResult;
}

export function SimulationResult({ result }: SimulationResultProps) {
  const { playerA, playerB, playerAWins, playerBWins, analysis } = result;
  const total = playerAWins + playerBWins;
  const playerAPercent = (playerAWins / total) * 100;
  const playerBPercent = (playerBWins / total) * 100;

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        模擬結果 (100場)
      </h2>

      {/* 勝負統計 */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-500">{playerAWins}</div>
          <div className="text-sm text-gray-400">{playerA.name}</div>
        </div>
        <div className="text-2xl text-gray-500">-</div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-500">{playerBWins}</div>
          <div className="text-sm text-gray-400">{playerB.name}</div>
        </div>
      </div>

      {/* 勝率條 */}
      <div className="mb-6">
        <div className="h-8 bg-gray-700 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white transition-all duration-1000"
            style={{ width: `${playerAPercent}%` }}
          >
            {playerAPercent >= 15 && `${playerAPercent.toFixed(0)}%`}
          </div>
          <div
            className="h-full bg-red-500 flex items-center justify-center text-sm font-bold text-white transition-all duration-1000"
            style={{ width: `${playerBPercent}%` }}
          >
            {playerBPercent >= 15 && `${playerBPercent.toFixed(0)}%`}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{playerA.name}</span>
          <span>{playerB.name}</span>
        </div>
      </div>

      {/* 圓餅圖 */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="20"
              strokeDasharray={`${playerAPercent * 2.51} ${100 * 2.51}`}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#EF4444"
              strokeWidth="20"
              strokeDasharray={`${playerBPercent * 2.51} ${100 * 2.51}`}
              strokeDashoffset={`${-playerAPercent * 2.51}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-nba-orange">
                {analysis.winPercentage.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400">勝率</div>
            </div>
          </div>
        </div>
      </div>

      {/* 勝者宣告 */}
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg">
        <div className="text-sm text-gray-400 mb-1">預測獲勝者</div>
        <div className="text-3xl font-bold text-nba-orange">
          {analysis.winner.name}
        </div>
        <div className="text-lg text-gray-300 mt-1">
          以 {Math.max(playerAWins, playerBWins)} 勝 {Math.min(playerAWins, playerBWins)} 敗 獲勝
        </div>
      </div>

      {/* 比賽統計 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-400">平均分差</div>
          <div className="text-2xl font-bold text-white">
            {analysis.avgScoreDiff.toFixed(1)}
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-400">最接近比賽</div>
          <div className="text-2xl font-bold text-white">
            {analysis.closestGame.playerAScore} - {analysis.closestGame.playerBScore}
          </div>
        </div>
      </div>
    </div>
  );
}
