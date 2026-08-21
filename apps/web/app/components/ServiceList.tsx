import { servicesType } from "../types/monitoring"

export const ServicesComponent = ({items}:{items:servicesType[]}) => {
  return (
       <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-gray-200 bg-white p-4 text-left">
          {items.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between border-b border-gray-100 py-2.5 font-mono text-sm last:border-0"
            >
              <div className="flex items-center gap-2 text-black">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {s.name}
              </div>
              <div className="flex items-center gap-4 text-black">
                <span className="text-gray-500">{s.ms}ms</span>
                <span>{s.status} OK</span>
              </div>
            </div>
          ))}
        </div>
  )
}