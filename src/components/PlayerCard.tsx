import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  side: 'left' | 'right';
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">{value}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function PlayerCard({ player, side }: PlayerCardProps) {
  const heightFeet = Math.floor(player.height / 12);
  const heightInches = player.height % 12;

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 ${
      side === 'left' ? 'border-blue-500' : 'border-red-500'
    }`}>
      {/* 球員名稱 */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-white">{player.name}</h3>
        <div className="flex justify-center gap-2 mt-2">
          <span className="px-2 py-1 bg-nba-blue rounded text-sm text-white">
            {player.position}
          </span>
          <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
            {player.era}
          </span>
        </div>
      </div>

      {/* 身體數據 */}
      <div className="flex justify-center gap-6 mb-6 text-center">
        <div>
          <div className="text-2xl font-bold text-white">
            {heightFeet}'{heightInches}"
          </div>
          <div className="text-xs text-gray-400">身高</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{player.weight}</div>
          <div className="text-xs text-gray-400">體重 (lbs)</div>
        </div>
      </div>

      {/* 能力值 */}
      <div className="space-y-1">
        <StatBar label="進攻能力" value={player.stats.offense} color="bg-red-500" />
        <StatBar label="防守能力" value={player.stats.defense} color="bg-blue-500" />
        <StatBar label="運動能力" value={player.stats.athleticism} color="bg-green-500" />
        <StatBar label="技術" value={player.stats.skill} color="bg-yellow-500" />
        <StatBar label="身體素質" value={player.stats.physical} color="bg-purple-500" />
        <StatBar label="關鍵時刻" value={player.stats.clutch} color="bg-nba-orange" />
      </div>

      {/* 總評分 */}
      <div className="mt-4 pt-4 border-t border-gray-700 text-center">
        <div className="text-sm text-gray-400">總評分</div>
        <div className="text-3xl font-bold text-nba-orange">
          {Math.round(
            Object.values(player.stats).reduce((a, b) => a + b, 0) / 6
          )}
        </div>
      </div>
    </div>
  );
}
