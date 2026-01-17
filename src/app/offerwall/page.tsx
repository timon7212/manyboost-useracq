"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSectionV2 } from "@/components/sections/v2/hero-section-v2";
import { StatsBannerV2 } from "@/components/sections/v2/stats-banner-v2";
import { AdvantagesSectionV2 } from "@/components/sections/v2/advantages-section-v2";
import { TrafficTypesSectionV2 } from "@/components/sections/v2/traffic-types-section-v2";
import { IntegrationsSectionV2 } from "@/components/sections/v2/integrations-section-v2";
import { AntifraudSectionV2 } from "@/components/sections/v2/antifraud-section-v2";
import { CreatorNetworkSectionV2 } from "@/components/sections/v2/creator-network-section-v2";
import { CtaSectionV2 } from "@/components/sections/v2/cta-section-v2";

export default function GamingUAPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <HeroSectionV2 />
        <StatsBannerV2 />
        <AdvantagesSectionV2 />
        <TrafficTypesSectionV2 />
        <IntegrationsSectionV2 />
        <AntifraudSectionV2 />
        <CreatorNetworkSectionV2 />
        <CtaSectionV2 />
      </main>
      <Footer />
    </>
  );
}
