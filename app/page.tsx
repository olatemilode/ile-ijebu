import { Hero } from "@/components/sections/hero";
import { ExploreGrid } from "@/components/sections/explore-grid";
import { PurposeSplit } from "@/components/sections/purpose-split";
import { FeaturedBusinesses } from "@/components/sections/featured-businesses";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { FeaturedStories } from "@/components/sections/featured-stories";
import { PartnerCta } from "@/components/sections/partner-cta";
import { BeadedDivider } from "@/components/ui/beaded-divider";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExploreGrid />
      <BeadedDivider />
      <PurposeSplit />
      <FeaturedBusinesses />
      <UpcomingEvents />
      <BeadedDivider />
      <FeaturedStories />
      <PartnerCta />
    </main>
  );
}
