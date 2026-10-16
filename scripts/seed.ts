// Populates Supabase with sample published content so the site isn't
// empty on first run. Uses the service-role key, so it bypasses RLS.
//
// Run with: npm run seed
// (requires .env.local to have SUPABASE_SERVICE_ROLE_KEY set)

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function seed() {
  console.log("Seeding businesses…");
  await supabase.from("businesses").insert([
    {
      name: "Ìjẹ̀bú Garden Suites",
      slug: "ijebu-garden-suites",
      category: "hospitality",
      description:
        "A quiet boutique stay in Ijebu-Ode with a garden courtyard, ten rooms, and breakfast rooted in local cuisine.",
      address: "Ijebu-Ode, Ogun State",
      phone: "+234 800 000 0001",
      verified: true,
      status: "published",
    },
    {
      name: "Mama Rachael's Kitchen",
      slug: "mama-rachaels-kitchen",
      category: "food-and-dining",
      description:
        "Traditional Ijebu garri, ẹ̀wà àgòyìn and soups made fresh daily, a favorite for three generations of locals.",
      address: "Odo-Ori Market, Ijebu-Ode",
      whatsapp: "+234 800 000 0002",
      verified: true,
      status: "published",
    },
    {
      name: "Alárẹ Studio",
      slug: "alare-studio",
      category: "photography-and-creative",
      description:
        "Photography and event coverage specializing in Ijebu traditional ceremonies and portraiture.",
      address: "Ijebu-Ode, Ogun State",
      status: "pending",
    },
  ]);

  console.log("Seeding places…");
  await supabase.from("places").insert([
    {
      name: "Awujale's Palace",
      slug: "awujale-palace",
      type: "palace",
      description: "The royal palace of the Awujale of Ijebuland, seat of the traditional monarchy.",
      address: "Ijebu-Ode, Ogun State",
      status: "published",
    },
    {
      name: "Tinuade Cocoa House",
      slug: "tinuade-cocoa-house",
      type: "heritage",
      description: "A restored heritage building showcasing Ijebuland's cocoa trading history.",
      status: "published",
    },
  ]);

  console.log("Seeding events…");
  const today = new Date();
  const in10days = new Date(today.getTime() + 10 * 86400000).toISOString().split("T")[0];
  const in30days = new Date(today.getTime() + 30 * 86400000).toISOString().split("T")[0];

  await supabase.from("events").insert([
    {
      title: "Ojude Oba Festival",
      slug: "ojude-oba-festival",
      event_date: in30days,
      event_time: "9:00 AM",
      location: "Ijebu-Ode",
      organizer: "Ijebuland Traditional Council",
      description:
        "One of the most vibrant cultural festivals in Yorubaland, bringing together age-grade groups, horse riders, and the Ijebu community from around the world.",
      status: "published",
    },
    {
      title: "Ijebu Business Mixer",
      slug: "ijebu-business-mixer",
      event_date: in10days,
      event_time: "5:00 PM",
      location: "Ijebu-Ode",
      organizer: "Ilé Ìjẹ̀bú",
      description: "An evening connecting local business owners for collaboration and community.",
      status: "published",
    },
  ]);

  console.log("Seeding stories…");
  await supabase.from("stories").insert([
    {
      title: "The Weavers of Aṣọ Òkè: Keeping a Craft Alive",
      slug: "weavers-of-aso-oke",
      category: "heritage",
      excerpt: "Inside the looms of Ijebu-Ode, where strip-weaving traditions are passed hand to hand.",
      body: "For generations, the weavers of Ijebuland have kept the tradition of aṣọ òkè alive, thread by thread.\n\nEach pattern carries meaning — colors chosen for celebration, for mourning, for chieftaincy. Today a small but committed group of artisans continues the craft, training the next generation even as demand shifts toward machine-made cloth.\n\nThis is their story.",
      published_at: new Date().toISOString(),
      status: "published",
    },
    {
      title: "Meet the Woman Behind Ijebu-Ode's Busiest Market Stall",
      slug: "busiest-market-stall",
      category: "people",
      excerpt: "Forty years, one stall, and a reputation that spans the whole state.",
      published_at: new Date().toISOString(),
      status: "published",
    },
  ]);

  console.log("Done. Check your Supabase table editor to confirm.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
