import { featuresType } from "../types/monitoring"

export const FeaturesComponent=({items}:{items:featuresType[]})=>{
    return(
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:border-black"
            >
              <h3 className="font-semibold text-black">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div> 
    )
}