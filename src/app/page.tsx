import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AppsShowcaseSection } from "@/components/sections/apps-showcase-section";
import { GlobalSection } from "@/components/sections/global-section";
import { CompetitionSection } from "@/components/sections/competition-section";
import { ResultsSection } from "@/components/sections/results-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { LtvSection } from "@/components/sections/ltv-section";
import { TeamSection } from "@/components/sections/team-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black overflow-x-hidden">
        <HeroSection />
        <AppsShowcaseSection />
        <GlobalSection />
        <CompetitionSection />
        <ResultsSection />
        <FeaturesSection />
        <LtvSection />
        <TeamSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
