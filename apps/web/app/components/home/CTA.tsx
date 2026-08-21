import Link from "next/link"

export const CTA = () => {
  return (
   <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black">Start watching your stack today</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-600">
            Set up your first monitor in under a minute. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Create free account
          </Link>
        </div>
      </section>
  )
}