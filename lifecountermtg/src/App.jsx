import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import DamageHistory from "./components/DamageHistory";

export default function App() {
  const [player, setPlayer] = useState([]);
  const [history, setHistory] = useState([]);
  const [started, setStarted] = useState(false);

  const startGame = (playerCount, initialLife) => {
    const newPlayer = Array.from({ length: playerCount }, (_, index) => ({
      id: index,
      name: `player ${index + 1}`,
      life: initialLife,
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
        {player.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            increase={() => updateLife(player.id, 1)}
            decrease={() => updateLife(player.id, -1)}
          />
        ))}
      </div>

      <DamageHistory history={history} />
    </div>
  );
}
