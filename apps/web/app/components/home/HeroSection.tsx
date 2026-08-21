import Link from 'next/link'
import { ServicesComponent } from '../ServiceList'
import { services } from '../rawdata'

export const HeroSection = () => {
  return (
       <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 text-center">
         <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
           All systems operational
         </div>
         <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-black">
           Know before your users do.
         </h1>
         <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
           Uptime monitoring, status pages, and on-call alerting in one place.
           Catch outages in seconds, not support tickets.
         </p>
         <div className="mt-8 flex justify-center gap-3">
           <Link
             href="/signup"
             className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
           >
             Monitor for free
           </Link>
           <Link
             href="/signup"
             className="rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-50"
           >
             View live status
           </Link>
         </div>
 
         {/* signature: live-looking status strip */}
      <ServicesComponent items={services}/>
       </section>
  )
}

export default HeroSection