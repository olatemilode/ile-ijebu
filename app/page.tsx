import { Hero } from "@/components/sections/hero";
import { ExploreGrid } from "@/components/sections/explore-grid";
import { EventCountdown } from "@/components/sections/event-countdown";
import { PurposeSplit } from "@/components/sections/purpose-split";
import { PartnerCta } from "@/components/sections/partner-cta";
import { BeadedDivider } from "@/components/ui/beaded-divider";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExploreGrid />
      <BeadedDivider />
      <EventCountdown />
      <PurposeSplit />      
      <BeadedDivider />
      <PartnerCta />
    </main>
  );
}
