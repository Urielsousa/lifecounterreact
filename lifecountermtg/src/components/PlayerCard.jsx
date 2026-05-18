import { motion } from "framer-motion";

export default function PlayerCard({ player, increase, decrease }) {

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-zinc-900 rounded-3xl p-6 border border-zinc-700"
    >
      <div className="flex flex-col items-center gap-6">
        <input
          value={player.name}
          className="bg-zinc-800 text-center text-2xl rounded-xl p-2"
          readOnly
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
    </motion.div>
  );
}
