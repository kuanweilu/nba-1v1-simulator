import { Analysis } from '../types';

interface AnalysisReportProps {
  analysis: Analysis;
}

export function AnalysisReport({ analysis }: AnalysisReportProps) {
  const { winner, loser, keyFactors, advantages } = analysis;

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📊</span> 勝負分析報告
      </h2>

      {/* 為什麼會贏 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-nba-orange mb-3">
          為什麼 {winner.name} 會贏？
        </h3>
        <div className="space-y-2">
          {keyFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-gray-300"
            >
              <span className="text-green-500 mt-1">✓</span>
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 優劣勢對比 */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* 獲勝者優勢 */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="text-lg font-bold text-green-500 mb-3 flex items-center gap-2">
            <span>🏆</span> {winner.name} 的優勢
          </h4>
          <ul className="space-y-2">
            {advantages.winner.map((adv, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-green-500">•</span>
                {adv}
              </li>
            ))}
          </ul>
        </div>

        {/* 落敗者優勢 */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="text-lg font-bold text-blue-500 mb-3 flex items-center gap-2">
            <span>💪</span> {loser.name} 的優勢
          </h4>
          <ul className="space-y-2">
            {advantages.loser.map((adv, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-blue-500">•</span>
                {adv}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 詳細文字分析 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">詳細分析</h4>
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p>
            在這場 {winner.name} 對決 {loser.name} 的 100 場 1v1 模擬中，
            <span className="text-nba-orange font-bold"> {winner.name} </span>
            以 {analysis.winPercentage.toFixed(0)}% 的勝率勝出。
          </p>

          <p>
            {winner.name} ({winner.position}, {winner.era})
            身高 {Math.floor(winner.height / 12)}'{winner.height % 12}"，體重 {winner.weight} 磅，
            擁有 {winner.stats.offense} 的進攻能力和 {winner.stats.defense} 的防守能力。
            相比之下，{loser.name} ({loser.position}, {loser.era})
            身高 {Math.floor(loser.height / 12)}'{loser.height % 12}"，體重 {loser.weight} 磅，
            進攻能力 {loser.stats.offense}，防守能力 {loser.stats.defense}。
          </p>

          <p>
            在 1v1 的對決中，{winner.name} 的
            {winner.stats.offense > loser.stats.offense ? '進攻' : '防守'}優勢
            在單挑場景下得到了充分發揮。
            {Math.abs(winner.height - loser.height) > 3 && (
              <>
                此外，{winner.height > loser.height ? winner.name : loser.name} 的身高優勢
                {winner.height > loser.height ? '讓進攻更容易得分' : '在籃下有更好的保護'}。
              </>
            )}
          </p>

          <p>
            最接近的一場比賽比分為 {analysis.closestGame.playerAScore} - {analysis.closestGame.playerBScore}，
            而最大分差的比賽則是 {analysis.biggestBlowout.playerAScore} - {analysis.biggestBlowout.playerBScore}，
            平均每場分差為 {analysis.avgScoreDiff.toFixed(1)} 分。
          </p>

          <p className="text-nba-orange font-semibold">
            結論：雖然 {loser.name} 是一位傳奇球員，但在這個 1v1 模擬系統中，
            {winner.name} 的整體能力組合更適合單挑場景，因此預測能在 100 場對決中
            贏得多數比賽。
          </p>
        </div>
      </div>
    </div>
  );
}
