import { motion } from "framer-motion";
import { useState } from "react";

export default function PlayerCard({
  player,
  increase,
  decrease,
  addCommanderDamage,
  allPlayers,
  updateName,
}) {
  const otherPlayers = (allPlayers || []).filter((p) => p.id !== player.id);
  const [sourceId, setSourceId] = useState(otherPlayers[0]?.id ?? "");

  return (
    <motion.div
      // whileTap={{ scale: 0.98 }}
      className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700"
    >
      <div className="flex flex-col items-center gap-6">
        <input
          value={player.name}
          className="bg-zinc-800 text-center text-2xl rounded-xl p-2"
          onChange={(e) => updateName(e.target.value)}
        />
      </div>

      <div className="text-8xl font-black text-green-400">{player.life}</div>

      <div className="flex gap-4">
        <button
          onClick={decrease}
          className="bg-red-600 w-20 h-20 rounded-2xl text-4xl"
        >
          -
        </button>

        <button
          onClick={increase}
          className="bg-green-600 w-20 h-20 rounded-2xl text-4xl"
        >
          +
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <select
          value={sourceId}
          onChange={(e) => setSourceId(parseInt(e.target.value, 10))}
          className="bg-zinc-800 rounded-xl p-2 text-sm"
        >
          {otherPlayers.length === 0 && (
            <option value="">Nenhum outro jogador</option>
          )}
          {otherPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            if (!addCommanderDamage) return;
            if (sourceId === "" || sourceId === undefined) {
              alert("Selecione um jogador fonte");
              return;
            }
            addCommanderDamage(player.id, sourceId, 1);
          }}
          className="bg-yellow-600 px-3 py-2 rounded-xl text-sm"
        >
          +1 Commander Damage
        </button>
      </div>

      <div className="mt-3 text-sm text-zinc-300">
        {Object.keys(player.CommanderDamage || {}).length === 0 ? (
          <div>Nenhum Commander Damage registrado</div>
        ) : (
          <ul>
            {Object.entries(player.CommanderDamage).map(([sid, val]) => {
              const name =
                (allPlayers || []).find((p) => p.id === parseInt(sid, 10))
                  ?.name || `player ${sid}`;
              return (
                <li key={sid}>
                  {name}: {val}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
