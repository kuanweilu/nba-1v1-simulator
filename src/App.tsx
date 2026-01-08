import { useState } from 'react';
import { Player, SimulationResult as SimResult } from './types';
import { PlayerSelector } from './components/PlayerSelector';
import { PlayerCard } from './components/PlayerCard';
import { SimulationResult } from './components/SimulationResult';
import { AnalysisReport } from './components/AnalysisReport';
import { runSimulation } from './utils/simulation';

function App() {
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);
  const [result, setResult] = useState<SimResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = async () => {
    if (!playerA || !playerB) return;

    setIsSimulating(true);
    setResult(null);

    // 模擬載入效果
    await new Promise(resolve => setTimeout(resolve, 1500));

    const simulationResult = runSimulation(playerA, playerB, 100);
    setResult(simulationResult);
    setIsSimulating(false);
  };

  const canSimulate = playerA && playerB && playerA.id !== playerB.id;

  return (
    <div className="min-h-screen bg-nba-dark">
      {/* Header */}
      <header className="bg-gradient-to-r from-nba-blue to-blue-800 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🏀 NBA 1v1 模擬器
          </h1>
          <p className="text-gray-300 text-lg">
            選擇兩位 NBA 歷史傳奇球員，模擬 100 場 1v1 對決
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 球員選擇區 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <PlayerSelector
              selectedPlayer={playerA}
              onSelect={setPlayerA}
              label="選擇球員 A"
              excludePlayerId={playerB?.id}
            />
            {playerA && (
              <div className="mt-4">
                <PlayerCard player={playerA} side="left" />
              </div>
            )}
          </div>

          {/* VS */}
          <div className="hidden md:flex absolute left-1/2 top-1/3 -translate-x-1/2 items-center justify-center">
            {playerA && playerB && (
              <div className="text-4xl font-bold text-nba-orange bg-nba-dark px-4 py-2 rounded-full border-2 border-nba-orange">
                VS
              </div>
            )}
          </div>

          <div>
            <PlayerSelector
              selectedPlayer={playerB}
              onSelect={setPlayerB}
              label="選擇球員 B"
              excludePlayerId={playerA?.id}
            />
            {playerB && (
              <div className="mt-4">
                <PlayerCard player={playerB} side="right" />
              </div>
            )}
          </div>
        </div>

        {/* 手機版 VS 標誌 */}
        {playerA && playerB && (
          <div className="md:hidden text-center my-4">
            <span className="text-3xl font-bold text-nba-orange">VS</span>
          </div>
        )}

        {/* 模擬按鈕 */}
        <div className="text-center mb-8">
          <button
            onClick={handleSimulation}
            disabled={!canSimulate || isSimulating}
            className={`
              px-8 py-4 text-xl font-bold rounded-lg transition-all transform
              ${canSimulate && !isSimulating
                ? 'bg-nba-orange hover:bg-orange-600 text-white hover:scale-105 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {isSimulating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                模擬中...
              </span>
            ) : (
              '開始模擬 100 場對決'
            )}
          </button>
          {!canSimulate && playerA && playerB && (
            <p className="text-red-400 mt-2">請選擇不同的球員</p>
          )}
        </div>

        {/* 結果區 */}
        {result && (
          <div className="animate-fade-in">
            <SimulationResult result={result} />
            <AnalysisReport analysis={result.analysis} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>NBA 1v1 模擬器 - 僅供娛樂用途</p>
          <p className="mt-1">球員數據基於歷史表現估算，不代表真實對決結果</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
