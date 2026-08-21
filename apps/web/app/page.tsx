import { features, stats } from "./components/rawdata";
import { StatsComponent } from "./components/StatGrid";
import { FeaturesComponent } from "./components/FeaturesGrid";
import { Footer ,Navbar } from "./components/layout";
import { CTA, HeroSection } from "./components/home";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased">
      <Navbar />

       <HeroSection/>

      <section className="border-y border-gray-200 bg-white">
           <StatsComponent items={stats}/>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-black">
          Everything an on-call engineer needs
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-gray-600">
          One dashboard for checks, status pages, and alerting — no duct tape required.
        </p>
   <FeaturesComponent items={features}/>
      </section>

    <CTA/>

     <Footer/>
    </main>
  );
}