import { statsType } from "../types/monitoring"

export const StatsComponent=({items}:{items:statsType[]})=>{
    return(
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-3xl font-bold text-black">{s.value}</div>
              <div className="mt-1 text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>  
    )
}