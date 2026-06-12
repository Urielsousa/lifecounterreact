import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import DamageHistory from "./components/DamageHistory";

//guarda todos os jogadores
export default function App() {
  const [player, setPlayer] = useState([]);
  const [history, setHistory] = useState([]);
  const [started, setStarted] = useState(false);

  const startGame = (playerCount, initialLife) => {
    const newPlayer = Array.from({ length: playerCount }, (_, index) => ({
      id: index,
      name: `player ${index + 1}`,
      life: initialLife,
      CommanderDamage: {},
    }));

    setPlayer(newPlayer);
    setStarted(true);
    setHistory([]);
  };

  const updateLife = (id, amount) => {
    setPlayer((prev) =>
      prev.map((player) => {
        if (player.id === id) {
          const updateLife = player.life + amount;

          setHistory((old) => [
            `${player.name} ${amount > 0 ? "ganhou" : "perdeu"} ${Math.abs(amount)} de vida`,
            ...old,
          ]);
          return {
            ...player,
            life: updateLife,
          };
        }

        return player;
      }),
    );
  };

  const updateName = (id, newName) => {
    setPlayer((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p)),
    );
  };

  const addCommanderDamage = (targetId, sourceId, amount) => {
    setPlayer((prev) => {
      const sourceName =
        prev.find((p) => p.id === sourceId)?.name || `player ${sourceId}`;

      const newPlayers = prev.map((p) => {
        if (p.id === targetId) {
          const currentDamage = p.CommanderDamage[sourceId] || 0;

          return {
            ...p,
            CommanderDamage: {
              ...p.CommanderDamage,
              [sourceId]: currentDamage + amount,
            },
          };
        }

        return p;
      });

      const targetName =
        newPlayers.find((p) => p.id === targetId)?.name || `player ${targetId}`;
      setHistory((old) => [
        `${targetName} recebeu ${amount} de Commander Damage de ${sourceName}`,
        ...old,
      ]);

      return newPlayers;
    });
  };

  const changeCommanderDamage = (targetId, sourceId, amount) => {
    setPlayer((prev) =>
      prev.map((P) => {
        if (P.id !== targetId) return P;

        const currentDamage = P.CommanderDamage[sourceId] || 0;

        return {
          ...P,
          CommanderDamage: {
            ...P.CommanderDamage,
            [sourceId]: Math.max(0, currentDamage + amount),
          },
        };
      }),
    );
  };

  const resetGame = () => {
    setStarted(false);
    setPlayer([]);
    setHistory([]);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">
        <h1 className="text-5xl font-black">MTG Life Counter</h1>

        <div className="flex gap-4">
          <button
            onClick={() => startGame(2, 20)}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            2 Players - 20 HP
          </button>

          <button
            onClick={() => startGame(4, 40)}
            className="bg-green-600 px-6 py-3 rounded-xl"
          >
            4 Players - Commander
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-zinc-950 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">MTG Life Counter</h1>

        <button onClick={resetGame} className="bg-red-600 px-4 py-2 rounded-xl">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {player.map((p) => (
          <PlayerCard
            key={p.id}
            player={p}
            allPlayers={player}
            increase={() => updateLife(p.id, 1)}
            decrease={() => updateLife(p.id, -1)}
            updateName={(name) => updateName(p.id, name)}
            addCommanderDamage={addCommanderDamage}
            changeCommanderDamage={changeCommanderDamage}
          />
        ))}
      </div>

      <DamageHistory history={history} />
    </div>
  );
}
