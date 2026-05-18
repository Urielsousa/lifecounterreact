export default function DamageHistory({ history }) {
  return (
    <div className="mt-10 bg-zinc-900 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-4">
            Historico
        </h2>


        <div className="flex flex-col gap-2 max-h-60 overflow-auto" >
            {history.map((item, index) => (
                <div 
                key = {index}
                className="bg-zinc-800 p-3 rounded-xl">

                    {item}
                        </div>
            ))}                    
                

        </div>
        </div>
  )
}