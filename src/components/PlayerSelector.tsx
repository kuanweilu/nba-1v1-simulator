import { Player } from '../types';
import { players } from '../data/players';

interface PlayerSelectorProps {
  selectedPlayer: Player | null;
  onSelect: (player: Player) => void;
  label: string;
  excludePlayerId?: string;
}

export function PlayerSelector({
  selectedPlayer,
  onSelect,
  label,
  excludePlayerId,
}: PlayerSelectorProps) {
  const availablePlayers = excludePlayerId
    ? players.filter(p => p.id !== excludePlayerId)
    : players;

  // 按年代分組
  const playersByEra = availablePlayers.reduce((acc, player) => {
    const era = player.era;
    if (!acc[era]) acc[era] = [];
    acc[era].push(player);
    return acc;
  }, {} as Record<string, Player[]>);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <select
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-nba-orange transition-colors"
        value={selectedPlayer?.id || ''}
        onChange={(e) => {
          const player = players.find(p => p.id === e.target.value);
          if (player) onSelect(player);
        }}
      >
        <option value="">選擇球員...</option>
        {Object.entries(playersByEra).map(([era, eraPlayers]) => (
          <optgroup key={era} label={era}>
            {eraPlayers.map(player => (
              <option key={player.id} value={player.id}>
                {player.name} ({player.position})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
