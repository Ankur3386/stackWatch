import Link from "next/link"
import Icon from "../Icon"

export const Navbar = () => {
  return (
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22D3A5] shadow-[0_0_10px_#22D3A5]" />
          <Icon/>
        </div>
        <div className="hidden gap-8 text-sm text-[#4F4D4D] md:flex">
          <Link href="/features" className="hover:text-[#E7EDF3]">Features</Link>
          <Link href="/pricing" className="hover:text-[#E7EDF3]">Pricing</Link>
          <Link href="/status" className="hover:text-[#E7EDF3]">Status</Link>
        </div>
        <Link
          href="/signup"
          className="rounded-md bg-[#E7EDF3] px-4 py-2 text-sm font-medium text-[#0A0E12] hover:bg-white"
        >
          Start monitoring
        </Link>
      </nav>
  )
}